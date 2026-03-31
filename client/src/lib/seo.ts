/**
 * SEO Utilities for dynamic meta tags and structured data
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export const DEFAULT_SEO: SEOConfig = {
  title: "Orlando Vacation Rentals Near Disney World | Theme Park Stays",
  description: "Premium vacation rentals in Orlando, FL — minutes from Disney World, Universal Studios, LEGOLAND, and SeaWorld. Book direct and save.",
  keywords: "Orlando vacation rentals, Disney World vacation homes, Universal Studios rental, Orlando theme park stays, Orlando family vacation",
  ogType: "website",
  twitterCard: "summary_large_image",
};

export const PAGE_SEO: Record<string, SEOConfig> = {
  home: DEFAULT_SEO,
  about: {
    title: "About Theme Park Stays | Orlando Vacation Rental Management",
    description: "Learn about Theme Park Stays, your trusted partner for premium Orlando vacation rentals near Disney World, Universal Studios, and more.",
    keywords: "about theme park stays, Orlando vacation rental company, property management Orlando",
    ogType: "website",
  },
  "theme-park-tickets": {
    title: "Discounted Theme Park Tickets | Disney, Universal, SeaWorld, LEGOLAND",
    description: "Purchase discounted theme park tickets for Walt Disney World, Universal Studios, SeaWorld, and LEGOLAND Florida directly through Theme Park Stays.",
    keywords: "theme park tickets Orlando, Disney tickets, Universal tickets, SeaWorld tickets, LEGOLAND tickets, discounted tickets",
    ogType: "website",
  },
  "property-management": {
    title: "Vacation Rental Property Management | Orlando | Theme Park Stays",
    description: "Maximize your vacation rental revenue with Theme Park Stays' professional property management services. 87% average occupancy rate.",
    keywords: "property management Orlando, vacation rental management, Airbnb management, short term rental management",
    ogType: "website",
  },
  "design-services": {
    title: "Themed Vacation Rental Design Services | Orlando | Theme Park Stays",
    description: "Transform your vacation rental with our specialized themed design services. Create immersive environments that drive bookings.",
    keywords: "vacation rental design, themed design services, interior design Orlando, property design",
    ogType: "website",
  },
  community: {
    title: "Community & Blog | Theme Park Stays | Orlando Vacation Rental Reviews",
    description: "Read guest reviews, travel tips, and the latest Orlando news from Theme Park Stays community.",
    keywords: "Orlando travel blog, vacation rental reviews, theme park tips, Orlando news",
    ogType: "website",
  },
  "privacy-policy": {
    title: "Privacy Policy | Theme Park Stays",
    description: "Read our privacy policy to understand how Theme Park Stays protects your personal information.",
    keywords: "privacy policy, data protection",
    ogType: "website",
  },
  "terms-of-service": {
    title: "Terms of Service | Theme Park Stays",
    description: "Read our terms of service for vacation rental bookings and services.",
    keywords: "terms of service, booking terms, rental agreement",
    ogType: "website",
  },
  "contact-us": {
    title: "Contact Us | Theme Park Stays | Orlando Vacation Rentals",
    description: "Get in touch with Theme Park Stays. We're here to help with your Orlando vacation rental needs.",
    keywords: "contact theme park stays, customer service, Orlando vacation rental support",
    ogType: "website",
  },
  faq: {
    title: "FAQ | Theme Park Stays | Frequently Asked Questions",
    description: "Find answers to common questions about Theme Park Stays vacation rentals, bookings, and services.",
    keywords: "FAQ, frequently asked questions, vacation rental help, booking questions",
    ogType: "website",
  },
};

/**
 * Generate JSON-LD structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Theme Park Stays",
    description: "Premium vacation rentals in Orlando near Disney World, Universal Studios, LEGOLAND, and SeaWorld",
    url: "https://orlandostay-9cfyw7e3.manus.space",
    telephone: "+1-321-939-2057",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kissimmee",
      addressRegion: "FL",
      postalCode: "34741",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Orlando",
    },
    priceRange: "$$$",
    sameAs: [
      "https://www.facebook.com/themeparkstays",
      "https://www.instagram.com/themeparkstays",
    ],
  };
}

/**
 * Generate JSON-LD structured data for vacation rental property
 */
export function generatePropertySchema(property: {
  name: string;
  description: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  price?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: property.name,
    description: property.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: "Kissimmee",
      addressRegion: "FL",
      addressCountry: "US",
    },
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    occupancy: property.guests,
    image: property.image,
    ...(property.price && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "USD",
      },
    }),
    ...(property.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: property.rating,
        reviewCount: property.reviewCount || 1,
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for breadcrumb navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
