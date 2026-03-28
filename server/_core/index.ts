import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import * as db from "../db";
import { sdk } from "./sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./cookies";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Dynamic Sitemap Generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const now = new Date().toISOString().split('T')[0];

      // Fetch all listings and products from database
      const listings = await db.getAllListings();
      const products = await db.getProductInventory();

      // Build sitemap XML
      let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Add static pages with high priority
      const staticPages = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/property-management', priority: '0.9', changefreq: 'monthly' },
        { path: '/design-services', priority: '0.8', changefreq: 'monthly' },
        { path: '/about', priority: '0.7', changefreq: 'yearly' },
        { path: '/community', priority: '0.6', changefreq: 'monthly' },
      ];

      staticPages.forEach(page => {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}${page.path}</loc>\n`;
        sitemapXml += `    <lastmod>${now}</lastmod>\n`;
        sitemapXml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        sitemapXml += `    <priority>${page.priority}</priority>\n`;
        sitemapXml += '  </url>\n';
      });

      // Add individual listings (if they have individual detail pages)
      listings.forEach(listing => {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}/#homes</loc>\n`; // Links to homes section; adjust if individual listing pages exist
        sitemapXml += `    <lastmod>${now}</lastmod>\n`;
        sitemapXml += '    <changefreq>weekly</changefreq>\n';
        sitemapXml += '    <priority>0.7</priority>\n';
        sitemapXml += '  </url>\n';
      });

      // Add shop section (products are accessed via the shop section)
      if (products.length > 0) {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}/#shop</loc>\n`;
        sitemapXml += `    <lastmod>${now}</lastmod>\n`;
        sitemapXml += '    <changefreq>weekly</changefreq>\n';
        sitemapXml += '    <priority>0.8</priority>\n';
        sitemapXml += '  </url>\n';
      }

      sitemapXml += '</urlset>';

      res.type('application/xml');
      res.send(sitemapXml);
    } catch (error) {
      console.error('[Sitemap] Generation failed:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Development Admin Login Bypass
  app.get("/api/dev/admin-login", async (req, res) => {
    try {
      const openId = "dev-admin-id";
      const name = "Dev Admin";
      const email = "admin@themeparkstays.com";

      await db.upsertUser({
        openId,
        name,
        email,
        loginMethod: "dev",
        role: "admin",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/admin");
    } catch (error) {
      console.error("[DevAuth] Login failed", error);
      res.status(500).json({ error: "Dev login failed" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
