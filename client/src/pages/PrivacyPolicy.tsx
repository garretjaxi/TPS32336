import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Theme Park Stays ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services. By accessing and using Theme Park Stays, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.`
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      content: `We collect information in various ways, including:

**Information You Provide Directly:**
- Account registration information (name, email address, phone number, password)
- Booking and reservation details (dates, number of guests, property preferences)
- Payment information (processed securely through our payment processor)
- Communication preferences and contact information
- Guest reviews and feedback
- Support requests and inquiries
- VIP list subscription information

**Information Collected Automatically:**
- Device information (browser type, operating system, device type)
- Usage data (pages visited, time spent, links clicked, search queries)
- Location information (approximate location based on IP address)
- Cookies and similar tracking technologies
- Referral source and landing page information`
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      content: `We use the information we collect for various purposes:

- Processing and managing your bookings and reservations
- Processing payments and sending billing information
- Sending transactional emails (confirmations, receipts, check-in instructions)
- Providing customer support and responding to inquiries
- Improving our website and services based on user feedback
- Personalizing your experience and recommending properties
- Sending marketing communications (with your consent)
- Detecting and preventing fraud and security issues
- Complying with legal obligations
- Analyzing usage patterns to improve our platform
- Creating aggregated, anonymized data for business analytics`
    },
    {
      id: 'information-sharing',
      title: 'How We Share Your Information',
      content: `We may share your information in the following circumstances:

**With Service Providers:**
- Payment processors and financial institutions
- Email service providers
- Analytics and hosting providers
- Customer support platforms

**With Property Owners:**
- Your booking details, name, and contact information (necessary for your stay)
- Check-in instructions and property-specific information
- Guest communication and special requests

**For Legal Reasons:**
- When required by law, regulation, or legal process
- To protect our rights, privacy, safety, or property
- To enforce our terms of service
- To prevent fraud or illegal activity

**Business Transfers:**
- In the event of merger, acquisition, or sale of assets
- Your information may be transferred as part of that transaction

We do not sell your personal information to third parties for their marketing purposes.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: `We implement comprehensive security measures to protect your personal information:

- SSL/TLS encryption for all data in transit
- Secure password storage using industry-standard hashing
- Regular security audits and vulnerability assessments
- Access controls and authentication protocols
- Secure payment processing through PCI-DSS compliant providers
- Employee confidentiality agreements

However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. You use our services at your own risk.`
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      content: `Depending on your location, you may have certain rights regarding your personal information:

**Access and Portability:**
- You have the right to access your personal information
- You can request a copy of your data in a portable format

**Correction and Deletion:**
- You can correct inaccurate information
- You can request deletion of your data (subject to legal obligations)

**Opt-Out:**
- You can opt out of marketing communications at any time
- You can disable cookies through your browser settings

**California Residents (CCPA):**
- Right to know what personal information is collected
- Right to delete personal information
- Right to opt-out of the sale of personal information
- Right to non-discrimination for exercising your rights

**European Residents (GDPR):**
- Right to access, rectification, and erasure
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Right to withdraw consent

To exercise any of these rights, please contact us at privacy@themeparkstays.com.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your experience:

**Essential Cookies:**
- Authentication and session management
- Security and fraud prevention
- Functionality and user preferences

**Analytics Cookies:**
- Google Analytics for usage tracking
- Performance monitoring and optimization

**Marketing Cookies:**
- Retargeting and personalized advertising
- Social media integration

You can control cookie settings through your browser. However, disabling cookies may affect website functionality. We also respect Do Not Track (DNT) signals where applicable.`
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links and Services',
      content: `Our website may contain links to third-party websites and services, including:

- Google Maps (location services)
- Stripe (payment processing)
- Houfy (property listings)
- Social media platforms
- Theme park websites

We are not responsible for the privacy practices of these third-party services. We encourage you to review their privacy policies before providing any information. Your use of third-party services is governed by their terms and policies, not ours.`
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      content: `Theme Park Stays does not knowingly collect personal information from children under 13 years of age. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child's account.

For users between 13-18 years of age, we provide additional privacy protections and encourage parental involvement in their online activities.

If you believe we have collected information from a child under 13, please contact us immediately at privacy@themeparkstays.com.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: `We retain your personal information for as long as necessary to:

- Fulfill the purposes outlined in this Privacy Policy
- Maintain your account and provide services
- Comply with legal and regulatory obligations
- Resolve disputes and enforce agreements

Typically, we retain booking information for 7 years for tax and legal purposes. You can request deletion of your account and associated data at any time, subject to legal retention requirements.`
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      content: `Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country.

By using Theme Park Stays, you consent to the transfer of your information to countries outside your country of residence, which may provide different levels of data protection than your home country.

We implement appropriate safeguards, including Standard Contractual Clauses and Privacy Shield mechanisms, to protect your information during international transfers.`
    },
    {
      id: 'updates',
      title: 'Updates to This Privacy Policy',
      content: `We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:

- Posting the updated policy on our website
- Updating the "Last Updated" date
- Sending you an email notification (if required)

Your continued use of Theme Park Stays following the posting of revised Privacy Policy means that you accept and agree to the changes.`
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

**Theme Park Stays**
Email: privacy@themeparkstays.com
Phone: (321) 939-2057
Hours: Monday - Friday, 8:00 AM - 2:00 PM EST

We will respond to your inquiry within 30 days. If you are not satisfied with our response, you may have the right to lodge a complaint with your local data protection authority.`
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[oklch(0.58_0.16_55)] to-[oklch(0.68_0.15_65)] text-white py-16 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Privacy Policy
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Your privacy is important to us. Learn how Theme Park Stays collects, uses, and protects your information.
          </p>
          <p className="text-white/70 text-sm mt-4">Last Updated: March 30, 2026</p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-[oklch(0.98_0.008_80)] border-b border-[oklch(0.92_0.015_75)]">
        <div className="container py-8">
          <h2 className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-[oklch(0.58_0.16_55)] hover:text-[oklch(0.68_0.15_65)] transition-colors text-sm"
              >
                • {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full text-left group"
              >
                <h2 className="text-2xl font-bold text-[oklch(0.18_0.012_55)] group-hover:text-[oklch(0.58_0.16_55)] transition-colors flex items-center justify-between">
                  {section.title}
                  <span className={`text-[oklch(0.58_0.16_55)] transform transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </h2>
              </button>
              
              <div className={`mt-4 text-[oklch(0.4_0.02_60)] leading-relaxed space-y-3 overflow-hidden transition-all duration-300 ${
                expandedSection === section.id ? 'max-h-none' : 'max-h-32 md:max-h-none'
              }`}>
                {section.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {expandedSection !== section.id && (
                <button
                  onClick={() => setExpandedSection(section.id)}
                  className="mt-2 text-[oklch(0.58_0.16_55)] hover:text-[oklch(0.68_0.15_65)] text-sm font-semibold transition-colors"
                >
                  Read More →
                </button>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.68_0.15_65)] text-white rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 pointer-events-none hover:pointer-events-auto"
        style={{
          opacity: window.scrollY > 300 ? 1 : 0,
          pointerEvents: window.scrollY > 300 ? 'auto' : 'none'
        }}
        title="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}
