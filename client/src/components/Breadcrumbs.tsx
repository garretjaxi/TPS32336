import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      className={`flex items-center gap-2 text-sm text-gray-600 mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

/**
 * Common breadcrumb configurations for different pages
 */
export const BREADCRUMB_CONFIGS = {
  about: [
    { label: "About", href: "/about" },
  ],
  themeParks: [
    { label: "Theme Park Tickets", href: "/theme-park-tickets" },
  ],
  propertyManagement: [
    { label: "Property Management", href: "/property-management" },
  ],
  designServices: [
    { label: "Design Services", href: "/design-services" },
  ],
  community: [
    { label: "Community", href: "/community" },
  ],
  contactUs: [
    { label: "Contact Us", href: "/contact-us" },
  ],
  faq: [
    { label: "FAQ", href: "/faq" },
  ],
  privacyPolicy: [
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  termsOfService: [
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};
