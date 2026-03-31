import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What makes Theme Park Stays different from other vacation rentals?',
    answer: 'We specialize in vacation homes and rooms specifically designed for families visiting Orlando theme parks. Every property is carefully selected and stocked with complimentary starter supplies. We offer direct booking with no Airbnb fees, instant confirmation, and flexible cancellation policies.',
  },
  {
    id: 'faq-2',
    question: 'How close are your properties to the theme parks?',
    answer: 'Our properties are located in the Four Corners/Kissimmee area, which puts you just 15-25 minutes from Walt Disney World, Universal Studios, LEGOLAND, and SeaWorld. Some homes are among the closest non-resort accommodations to the parks.',
  },
  {
    id: 'faq-3',
    question: 'What is included in every stay?',
    answer: 'Every home includes a fully equipped kitchen, private pool, high-speed Wi-Fi, free parking, smart TVs, washer & dryer, and complimentary starter supplies (toiletries, coffee, basic pantry items). Most properties also include air conditioning, heating, and cable TV.',
  },
  {
    id: 'faq-4',
    question: 'Can I purchase discounted theme park tickets through you?',
    answer: 'Yes! We offer discounted tickets to all four major Orlando parks: Walt Disney World, Universal Studios, SeaWorld, and LEGOLAND. You can purchase tickets directly through our website and save time and money compared to buying at the gate.',
  },
  {
    id: 'faq-5',
    question: 'What guest add-ons are available?',
    answer: 'We offer early check-in, late check-out, fresh flowers, welcome baskets, grocery pre-stocking, mid-stay cleaning, parking passes, and theme park transportation services. These can be added before or after your reservation.',
  },
  {
    id: 'faq-6',
    question: 'Are your properties pet-friendly?',
    answer: 'Some of our properties are pet-friendly! You can filter for pet-friendly homes when browsing our listings. Please contact us for specific pet policies and any additional fees.',
  },
  {
    id: 'faq-7',
    question: 'Do you offer themed rooms or special experiences?',
    answer: 'Yes! Many of our properties feature themed rooms and special designs. We also offer professional design services if you\'re a property owner looking to create or update your vacation rental.',
  },
  {
    id: 'faq-8',
    question: 'How far is the airport from your properties?',
    answer: 'Orlando International Airport (MCO) is approximately 35 minutes from our properties in Kissimmee. We offer theme park transportation services, and many guests arrange their own ground transportation or car rentals.',
  },
  {
    id: 'faq-9',
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policies vary by property. Please contact us directly or check the specific property listing for detailed cancellation terms.',
  },
  {
    id: 'faq-10',
    question: 'Are there grocery stores near your properties?',
    answer: 'Yes! Publix and Walmart are within minutes of every property. We also offer grocery pre-stocking services if you\'d like your fridge stocked before arrival.',
  },
  {
    id: 'faq-11',
    question: 'Do you offer property management services for owners?',
    answer: 'Yes! We help property owners maximize revenue with a hands-off management experience. Our average commission rate is 15%, average occupancy is 87%, and owners earn $5-9k monthly on average.',
  },
  {
    id: 'faq-12',
    question: 'Can you help with home renovations or themed designs?',
    answer: 'Absolutely! We specialize in creating immersive themed environments and elegant luxury spaces. Whether you want a complete transformation or a sophisticated redesign, our design team can help maximize your property\'s appeal and bookings.',
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-foreground/70">Find answers to common questions about Theme Park Stays.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/50 transition"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/60 transition-transform flex-shrink-0 ml-4 ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-accent/20 border-t border-border">
                    <p className="text-foreground/80 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-amber-50 p-8 rounded-lg border border-amber-200 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Didn't find your answer?</h2>
            <p className="text-foreground/70 mb-6">
              Have a specific question? Our team is here to help!
            </p>
            <a
              href="/contact-us"
              className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
