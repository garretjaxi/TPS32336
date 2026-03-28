import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  twitterHandle?: string;
  ogLocale?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/hero-banner-v2_35fef47f.png",
  keywords,
  author = "Theme Park Stays",
  robots = "index, follow",
  twitterHandle = "@themeparkstays",
  ogLocale = "en_US",
}: SEOProps) {
  const siteTitle = "Theme Park Stays";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Premium vacation rentals in Orlando, FL — minutes from Disney World, Universal Studios, LEGOLAND, and SeaWorld. Book direct and save.";
  const metaDescription = description || defaultDescription;
  const url = typeof window !== "undefined" ? window.location.href : "";
  const finalCanonical = canonical || url;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />
      {finalCanonical && <link rel="canonical" href={finalCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
    </Helmet>
  );
}
