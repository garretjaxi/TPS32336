import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';
import { useEffect } from 'react';

export default function TermsOfService() {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using the Theme Park Stays website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.

These Terms of Service constitute the entire agreement between you and Theme Park Stays regarding your use of our website and services. We reserve the right to modify these terms at any time. Your continued use of our services following the posting of revised terms means that you accept and agree to the changes.`
    },
    {
      id: 'use-license',
      title: 'License and Use Restrictions',
      content: `Theme Park Stays grants you a limited, non-exclusive, non-transferable license to access and use our website for lawful purposes only. You may not:

- Reproduce, duplicate, copy, or resell any portion of our website or services
- Modify, adapt, translate, or create derivative works based on our content
- Reverse engineer, decompile, or disassemble any part of our services
- Use our website for any unlawful purpose or in violation of any laws
- Attempt to gain unauthorized access to our systems or data
- Engage in any form of harassment, abuse, or threatening behavior
- Transmit viruses, malware, or any harmful code
- Interfere with or disrupt the normal operation of our website
- Collect or track personal information of other users without consent
- Use automated tools, bots, or scrapers to access our website`
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      content: `To access certain features of our website, you may be required to create an account. You agree to:

- Provide accurate, current, and complete information during registration
- Maintain the confidentiality of your password and account credentials
- Accept responsibility for all activities that occur under your account
- Notify us immediately of any unauthorized use of your account
- Comply with all applicable laws and regulations

Theme Park Stays reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent or abusive behavior.`
    },
    {
      id: 'booking-reservations',
      title: 'Booking and Reservations',
      content: `**Booking Process:**
- All bookings are subject to availability and confirmation
- Prices are displayed in USD and include applicable taxes and fees
- A booking is confirmed only when you receive a confirmation email from Theme Park Stays
- You must provide accurate guest information for check-in

**Payment Terms:**
- Payment must be received in full before check-in
- We accept major credit cards and other payment methods as displayed
- All payments are processed securely through our payment processor
- You are responsible for any fees charged by your financial institution

**Cancellation Policy:**
- Cancellations must be made through your account or by contacting us directly
- Refund eligibility depends on the cancellation window and property-specific policies
- Cancellations made 30+ days before check-in: Full refund minus processing fees
- Cancellations made 14-29 days before check-in: 50% refund
- Cancellations made less than 14 days before check-in: No refund
- No-shows will be charged in full with no refund

**Modifications:**
- Changes to reservation dates or property may be allowed subject to availability
- Modification requests must be submitted at least 14 days before check-in
- Additional charges may apply if the new dates or property have higher rates`
    },
    {
      id: 'guest-responsibilities',
      title: 'Guest Responsibilities and Conduct',
      content: `As a guest, you agree to:

**Property Care:**
- Treat the property and all furnishings with respect and care
- Report any damage or maintenance issues immediately
- Follow all house rules provided by the property owner
- Not exceed the maximum occupancy limit
- Keep noise levels reasonable, especially during quiet hours (10 PM - 8 AM)

**Prohibited Activities:**
- No smoking inside the property (unless designated smoking area)
- No illegal drugs or controlled substances
- No unauthorized parties or gatherings
- No commercial activities or filming without permission
- No pets unless explicitly allowed and approved
- No weapons or dangerous items

**Damage and Liability:**
- Guests are responsible for any damage caused during their stay
- Excessive damage charges may be deducted from your security deposit
- Theme Park Stays is not responsible for loss, theft, or damage to guest belongings
- Guests assume all risk for personal injury while on the property

**House Rules:**
- Respect quiet hours and neighboring properties
- Do not disturb other guests or neighbors
- Follow all posted safety and emergency procedures
- Do not remove property items or furnishings
- Dispose of trash properly in designated areas`
    },
    {
      id: 'property-conditions',
      title: 'Property Conditions and Amenities',
      content: `**As-Is Condition:**
- Properties are rented "as-is" with all existing conditions
- Theme Park Stays makes no warranties regarding property condition beyond what is explicitly stated
- Minor wear and tear is normal and expected

**Amenities:**
- Amenities listed are subject to availability and may change
- Equipment and appliances are provided as-is without warranty
- Theme Park Stays is not responsible for malfunction of appliances or utilities
- Internet, cable, and other services are provided as-is with no guaranteed uptime

**Maintenance Issues:**
- Report maintenance issues immediately to receive prompt assistance
- Theme Park Stays will make reasonable efforts to resolve issues quickly
- In case of major issues affecting habitability, alternative accommodation may be offered
- Theme Park Stays is not liable for minor inconveniences or temporary service disruptions`
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      content: `All content on the Theme Park Stays website, including text, images, graphics, logos, and software, is the property of Theme Park Stays or its content suppliers and is protected by international copyright laws.

You may not use, reproduce, modify, or distribute any content without express written permission from Theme Park Stays. This includes but is not limited to:

- Website design and layout
- Property descriptions and photos
- Marketing materials and promotional content
- Software and code
- Trademarks and service marks

Unauthorized use of our intellectual property may result in legal action and damages.`
    },
    {
      id: 'liability-disclaimer',
      title: 'Limitation of Liability',
      content: `**Disclaimer of Warranties:**
Theme Park Stays provides its website and services "as-is" without warranties of any kind, either express or implied. We do not warrant that:

- Our services will be uninterrupted or error-free
- Defects will be corrected
- Our services are free from viruses or harmful components
- The results obtained from using our services will meet your expectations

**Limitation of Liability:**
To the maximum extent permitted by law, Theme Park Stays shall not be liable for:

- Any indirect, incidental, special, or consequential damages
- Loss of profits, revenue, data, or business opportunities
- Personal injury or property damage
- Third-party claims or actions
- Any damages arising from your use or inability to use our services

Your sole remedy for dissatisfaction with our services is to discontinue use and request a refund if eligible.`
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      content: `You agree to indemnify, defend, and hold harmless Theme Park Stays, its owners, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:

- Your violation of these Terms of Service
- Your violation of any applicable laws or regulations
- Your use of our website or services
- Your infringement of any intellectual property rights
- Your conduct or actions as a guest
- Any damage to the property during your stay
- Any personal injury or property damage caused by you

This indemnification obligation applies even if Theme Park Stays has been advised of the possibility of such damages.`
    },
    {
      id: 'third-party-services',
      title: 'Third-Party Services and Links',
      content: `Our website may contain links to third-party websites and services, including:

- Google Maps for location services
- Stripe for payment processing
- Houfy for property listings
- Social media platforms
- Theme park websites

Theme Park Stays is not responsible for:

- The content, accuracy, or availability of third-party websites
- Any transactions or interactions with third-party services
- Any damages or losses resulting from third-party services
- The privacy practices of third-party websites

Your use of third-party services is governed by their terms and policies, not these Terms of Service. We encourage you to review their terms before using their services.`
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution and Governing Law',
      content: `**Governing Law:**
These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.

**Dispute Resolution:**
- Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration
- Arbitration shall be conducted in Orange County, Florida
- Each party shall bear its own costs and attorney fees unless otherwise determined by the arbitrator
- The arbitration shall be conducted under the rules of the American Arbitration Association (AAA)

**Class Action Waiver:**
You agree that any arbitration or legal proceeding shall be conducted on an individual basis, not as a class action or group action.

**Injunctive Relief:**
Notwithstanding the arbitration clause, Theme Park Stays may seek injunctive relief in court for violations of intellectual property rights or other urgent matters.`
    },
    {
      id: 'severability',
      title: 'Severability and Waiver',
      content: `**Severability:**
If any provision of these Terms of Service is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, or if not possible, severed. The remaining provisions shall remain in full force and effect.

**Waiver:**
The failure of Theme Park Stays to enforce any provision of these terms does not constitute a waiver of that provision or any other provision. No waiver is effective unless in writing and signed by an authorized representative of Theme Park Stays.`
    },
    {
      id: 'termination',
      title: 'Termination of Service',
      content: `Theme Park Stays reserves the right to terminate or suspend your access to our website and services at any time, with or without cause, and with or without notice.

Grounds for termination include, but are not limited to:

- Violation of these Terms of Service
- Violation of any applicable laws or regulations
- Fraudulent or abusive behavior
- Damage to property during your stay
- Threatening or harassing behavior
- Non-payment of fees or charges
- Any other conduct deemed inappropriate by Theme Park Stays

Upon termination, your right to use our services ceases immediately. Termination does not relieve you of any obligations or liabilities incurred prior to termination.`
    },
    {
      id: 'contact-support',
      title: 'Contact Us',
      content: `If you have questions, concerns, or disputes regarding these Terms of Service, please contact us:

**Theme Park Stays**
Email: legal@themeparkstays.com
Phone: (321) 939-2057
Hours: Monday - Friday, 8:00 AM - 2:00 PM EST

We will respond to your inquiry within 30 days. If you are not satisfied with our response, you may pursue dispute resolution through arbitration as outlined in these terms.`
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[oklch(0.58_0.16_55)] to-[oklch(0.68_0.15_65)] text-white py-16 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Terms of Service
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Please read these terms carefully before booking or using Theme Park Stays services.
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
