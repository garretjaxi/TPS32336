# Project TODO - Theme Park Stays Migration

## Migration Tasks

- [x] Audit source project structure and identify all files
- [x] Transfer drizzle schema (listings, orders, booking_inquiries, productInventory tables)
- [x] Transfer server/db.ts with all query helpers
- [x] Transfer server/routers.ts and all sub-routers (listings, booking, admin, shop)
- [x] Transfer server/stripe-webhook.ts and server/storage.ts
- [x] Transfer client/src/pages (Home, About, Explore, Community, PropertyManagement, DesignServices, AdminDashboard, AdminListings, AdminUsers, AdminHome, OrderConfirmation, ComponentShowcase)
- [x] Transfer client/src/components (HomesSection, RoomsSection, StayWithUsSection, ManagementSection, ManagementTeaser, DesignSection, DesignTeaser, HeroSection, AboutSection, SEO, SchemaMarkup, and all other custom components)
- [x] Transfer client/src/index.css with golden hour luxury theme
- [x] Transfer client/index.html with Google Fonts and meta tags
- [x] Transfer client/src/main.tsx with QueryClient configuration
- [x] Transfer client/src/App.tsx with all routes and HelmetProvider
- [x] Transfer i18n setup and translation files
- [x] Transfer robots.txt and sitemap.xml
- [x] Transfer shared types and constants
- [x] Install additional dependencies (nodemailer, react-helmet-async, i18next, @dnd-kit/core, etc.)
- [x] Configure environment variables (JWT, OAuth auto-injected by Manus)
- [x] Set up database schema via migrations (all 5 tables created)
- [x] Seed database with 25 listings (17 homes, 8 rooms/suites)
- [x] Upload all images to CDN and update references
- [x] Fix TypeScript errors (listing_type cast, TiDB-incompatible JSON defaults)
- [x] Verify all pages load correctly
- [x] Verify admin dashboard works
- [x] All 16 tests passing (auth, listings, shop/booking)

## Pending

- [ ] Configure SMTP credentials for email notifications (optional - gracefully skipped when not set)
- [ ] Set admin user role in database after first login via Manus OAuth

## Recent Updates

- [x] Synced all 25 listings (17 homes, 8 rooms) from original project database with real data
- [x] Imported all 25 listings from listings_20260323_064624.csv with accurate property information
  - Homes: $110-$449/night with ratings 4.70-5.00
  - Rooms: $35-$59/night with ratings 4.91-4.99
- [x] Changed "Explore Orlando" navigation to "Theme Park Tickets"
  - Updated route from /explore to /theme-park-tickets
  - Updated page title and SEO metadata
  - Updated all navigation links and buttons
- [x] Added canonical link tag to HTML head for Google SEO redirect
  - Canonical URL: https://www.themeparkstays.com/
- [x] Added radius box image to About page
  - Uploaded location radius map image to CDN
  - Replaced map iframe with radius box visualization
- [x] Updated "View Activities & Shop" button to "View Tickets and Shop"
- [x] Softened white backgrounds throughout site to reduce contrast
  - Updated card and popover colors to oklch(0.98 0.008 80)
  - Changed all page backgrounds from pure white to softer off-white
  - Applied to Home, About, Community, DesignServices, and Explore pages
- [x] Changed Stay With Us section background to light gray oklch(0.94 0.008 80)
- [x] Enhanced hero image with darker sky and centered castle
  - Darkened sky to deep twilight blue/purple to showcase fireworks
  - Centered castle in the middle of the screen for better mobile visibility
  - Improved visual hierarchy and focal point
- [x] Restored full About Us and Theme Park Tickets sections to home page
  - Removed "Learn More About Us" button teaser
  - Integrated AboutSection and GuestAmenitiesSection directly on home page
  - Integrated ActivitiesSection, TicketsSection, and ShopSection directly on home page
  - All content now visible without navigation to separate pages
- [x] Changed "Every Stay Includes" section to dark background
  - Updated GuestAmenitiesSection background to dark oklch(0.18_0.012_55)
  - Updated text colors to white/white-80 for contrast
  - Updated accent text to amber-400 for visual hierarchy
- [x] Reordered Theme Park Tickets section to Tickets + Activities + Shop
  - Moved TicketsSection to appear first
  - Followed by ActivitiesSection (More Orlando Adventures)
  - Followed by ShopSection
- [x] Optimized shop section layout and styling
  - Reduced shop card size to 75% (25% smaller) with scale-75 transform
  - Added vertical scrolling on mobile (max-h-96) while maintaining grid on desktop
  - Darkened shop background to oklch(0.94_0.008_80) to match color scheme
  - Reduced card padding and text sizes for compact mobile view
- [x] Enlarged Vacation Homes and Rooms & Suites buttons
  - Increased padding from px-8 py-3 to px-10 py-4
  - Increased text size from text-sm to text-base
  - Increased icon size from 18px to 20px for better prominence
- [x] Updated "Every Stay Includes" section label to "Every Home Stay Includes"
  - Changed section-label text in GuestAmenitiesSection for better clarity
- [x] Updated shop products with new images and offerings
  - Removed Welcome Basket from shop
  - Renamed Parking Pass to Party Planner ($150)
  - Updated Grocery Pre-Stocking image with professional kitchen/pantry photo
  - Updated Mid-Stay Cleaning image with professional cleaner in action
  - Updated Party Planner image with beautifully decorated backyard celebration setup
- [x] Updated hero image with darker purple/blue sky and repositioned castle
  - Applied darker, richer deep purple/blue twilight sky for dramatic effect
  - Moved castle from center to right side of the image
  - Maintained house, pool, and all ground elements in original positions
  - Fireworks remain vibrant against the darker sky background

## Airtable Integration

- [x] Set up Airtable API authentication and environment variables
- [x] Implement distance calculation from addresses to theme parks (Magic Kingdom, Universal Studios, SeaWorld, LEGOLAND, Airport)
- [x] Create Airtable sync procedure to populate listings database
- [x] Update listings table schema to include address field (for distance calculations only, hidden from UI)
- [ ] Implement distance display on listing cards
- [ ] Test Airtable sync with homes and rooms/suites data
- [ ] Run database migrations to apply schema changes


## Privacy & Legal

- [x] Create comprehensive privacy policy document
- [x] Create privacy policy page component
- [x] Add privacy policy link to footer
- [x] Create comprehensive Terms of Service document
- [x] Create Terms of Service page component
- [x] Add Terms of Service link to footer
- [x] Test both legal pages and footer links

## Bug Fixes

- [x] Fix distance selector dropdown - restructured card to separate distance selector from link wrapper

## Distance Calculator Improvements

- [x] Map each property individually using its unique address coordinates (not city averages)
- [x] Increase driving speed from 40 mph to 50 mph in distance calculations
- [x] Integrate Google Maps Geocoding API to convert addresses to coordinates
- [x] Test updated distance calculations against actual properties

## Server-Side Distance Caching

- [ ] Update database schema to add distance cache columns for each theme park
- [ ] Create distance caching procedure using geocoding API
- [ ] Add admin endpoint to trigger distance calculation for all properties
- [ ] Update listings query to return cached distances
- [ ] Update frontend distance selector to use cached distances
- [ ] Test cached distances display correctly

## Footer Pages

- [x] Create Contact Us page component
- [x] Create FAQ page component
- [x] Update footer links to remove Booking Help and Cancellation Policy
- [x] Update footer links to add Contact Us and FAQ links
- [x] Test all footer links navigate correctly

## Map Adjustments

- [x] Zoom out the map on home page to show wider Orlando area view

## Layout Improvements

- [x] Compact "Your Basecamp for Magic" section by combining elements side-by-side

## Map Pin Corrections

- [x] Fix LEGOLAND pin location to correct coordinates

## SEO Optimization

- [x] Add dynamic meta tags for each page (title, description)
- [x] Add structured data (Schema.org JSON-LD) for properties and business
- [x] Add Open Graph meta tags for social sharing
- [x] Add robots.txt and sitemap.xml
- [ ] Optimize heading hierarchy (H1, H2, H3)
- [ ] Add alt text to all images
- [ ] Implement breadcrumb navigation
- [ ] Add internal linking strategy

## Accessibility & SEO Enhancements

- [x] Add alt text to all property images
- [x] Add alt text to all attraction/theme park images
- [x] Add alt text to all hero and banner images
- [x] Create breadcrumb navigation component
- [x] Add breadcrumbs to About page
- [x] Add breadcrumbs to Theme Park Tickets page
- [x] Add breadcrumbs to Property Management page
- [ ] Add breadcrumbs to Design Services page
- [ ] Add breadcrumbs to Contact Us page
- [ ] Add breadcrumbs to FAQ page

## VIP Modal Features

- [x] Re-enable VIP email signup modal with cookie tracking
- [x] Test modal shows only once per session
- [x] Test modal reappears after cookie clear

## Database Fixes

- [x] Create vip_subscribers table in database schema
- [x] Test VIP signup form submission

## Bug Fixes

- [x] Fix Google Maps API multiple load error on homepage
- [x] Update Contact Us page with new phone number (407-801-3030)
- [x] Update Contact Us page with new business hours (10AM - 8PM EST)
- [x] Update Contact Us page with new email (admin@themeparkstays.com)
- [x] Update location description to 15-25 minutes from parks
- [x] Update amenities list with comprehensive details (AC, heating, cable TV, pool info)
