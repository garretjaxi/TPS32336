import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  type: "LocalBusiness" | "VacationRental" | "Product" | "FAQPage" | "Organization";
  data: Record<string, any>;
}

/**
 * VacationRental Schema Example:
 * {
 *   name: "The Royal Palace",
 *   description: "8BR Grand Estate with Theater & Pool",
 *   image: "https://...",
 *   address: {
 *     "@type": "PostalAddress",
 *     streetAddress: "123 Main St",
 *     addressLocality: "Kissimmee",
 *     addressRegion: "FL",
 *     postalCode: "34741",
 *     addressCountry: "US"
 *   },
 *   priceRange: "$399/night",
 *   aggregateRating: {
 *     "@type": "AggregateRating",
 *     ratingValue: "4.96",
 *     reviewCount: "56"
 *   }
 * }
 */

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaData: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  // Add type-specific defaults and validations
  if (type === "VacationRental") {
    schemaData = {
      ...schemaData,
      "@type": "VacationRental",
      petsAllowed: data.petsAllowed || false,
      numberOfBedrooms: data.beds || 0,
      numberOfBathrooms: data.baths || 0,
      occupancy: data.guests || 0,
    };
  } else if (type === "Product") {
    schemaData = {
      ...schemaData,
      "@type": "Product",
      offers: {
        "@type": "Offer",
        price: data.price || 0,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    };
  } else if (type === "FAQPage") {
    // FAQPage expects mainEntity to be an array of Question objects
    schemaData = {
      ...schemaData,
      "@type": "FAQPage",
      mainEntity: data.faqs || [],
    };
  } else if (type === "Organization") {
    schemaData = {
      ...schemaData,
      "@type": "Organization",
      name: data.name || "Theme Park Stays",
      url: data.url || "https://themeparkstays.com",
      logo: data.logo || "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408712/RyzLQxSB3n3EenkWRBno5W/hero-banner-v2_35fef47f.png",
      sameAs: data.sameAs || [],
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
