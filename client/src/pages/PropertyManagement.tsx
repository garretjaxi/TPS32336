/* =============================================================
   PropertyManagement — Full-page management services
   Golden Hour Luxury Design — Enhanced with Estaga-inspired UX
   ============================================================= */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  TrendingUp, DollarSign, Camera, HeadphonesIcon, CheckCircle2,
  ArrowRight, Star, BarChart3, Home, ClipboardList, Rocket, Settings,
  PhoneCall, Mail, ChevronDown, ChevronUp, Shield, Clock, Award, Users
} from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/property-mgmt-bg-8zHASx5W8qjwj6V648Mv23.webp";

/* ── Trust Badges ── */
const trustBadges = [
  { icon: Shield, label: "No Cost to Join", sub: "Risk-free entry" },
  { icon: Clock, label: "Cancel Anytime", sub: "No commitments" },
  { icon: TrendingUp, label: "Earn More", sub: "Above market returns" },
  { icon: HeadphonesIcon, label: "24/7 Support", sub: "Always available" },
];

/* ── Platform Logos (text-based) ── */
const platforms = [
  { name: "Airbnb", style: "font-bold text-[#FF5A5F]" },
  { name: "VRBO", style: "font-bold text-[#3D6EAA]" },
  { name: "Houfy", style: "font-bold text-[#1a1a1a]" },
  { name: "Booking.com", style: "font-bold text-[#003580]" },
  { name: "Expedia", style: "font-bold text-[#00355F]" },
  { name: "Google", style: "font-bold text-[#4285F4]" },
];

/* ── Why Features ── */
const whyFeatures = [
  {
    icon: DollarSign,
    title: "Save Time & Earn More",
    desc: "Free yourself from the stress of check-ins, check-outs, and a million other tasks. Our locally owned team handles everything so you can enjoy the profits without doing the work.",
  },
  {
    icon: BarChart3,
    title: "Dynamic Pricing & Smart Revenue",
    desc: "Our pricing software and smart algorithms simultaneously adjust your rates across all booking platforms — accounting for local events, seasonality, holidays, and market demand — to generate the most profit possible every single day.",
  },
  {
    icon: Camera,
    title: "Advertising Done For You",
    desc: "Since we only earn when you earn, we work hard to market your property to the top of search results. Professional photography, optimized listings, and multi-platform distribution ensure maximum visibility and bookings.",
  },
  {
    icon: Star,
    title: "5-Star Review Management",
    desc: "Amazing reviews from satisfied guests are our standard. We provide around-the-clock support and go above and beyond to exceed guest expectations — protecting your ratings and growing your reputation on every platform.",
  },
  {
    icon: Home,
    title: "Proactive Property Care",
    desc: "Before every check-in, our inspection team verifies that cleaning and maintenance meet our quality standard. We handle repairs, restocking, and routine upkeep so your property stays in peak condition year-round.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Portfolio",
    desc: "Managing a vacation rental takes enormous time and effort. Let us remove that constraint so you can focus on acquiring more properties and turbo-charging your net worth — while we handle the day-to-day operations.",
  },
];

/* ── Pricing Tiers ── */
const pricingTiers = [
  {
    name: "Standard",
    tagline: "For hands-on owners who want expert help while keeping management fees low",
    rate: "8%",
    rateLabel: "management fee",
    setupRate: "",
    setupLabel: "",
    popular: false,
    features: [
      "Setup consulting & purchase list",
      "Listing setup & promotion",
      "24/7 guest support backup",
      "Pricing & revenue management",
      "Review management",
      "Compliance support",
      "Cancel anytime",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    tagline: "Enhanced performance oversight for owners focused on maximizing returns",
    rate: "15%",
    rateLabel: "management fee",
    setupRate: "",
    setupLabel: "",
    popular: true,
    features: [
      "Everything in Standard included",
      "Dedicated performance manager",
      "Enhanced pricing & revenue management",
      "Enhanced review management",
      "Professional cleaning coordination",
      "Premium owner support",
    ],
    cta: "Get Started",
  },
  {
    name: "Full Service",
    tagline: "Hands-free ownership with local, on-the-ground management at industry-low fees",
    rate: "18%",
    rateLabel: "management fee",
    setupRate: "",
    setupLabel: "",
    popular: false,
    features: [
      "Everything in Premium included",
      "End-to-end property setup",
      "Dedicated local managers",
      "Free professional photography",
      "Supply restocking",
      "Repair and maintenance",
      "Routine inspections",
    ],
    cta: "Get Started",
  },
];

/* ── Process Steps ── */
const processSteps = [
  {
    num: "01",
    title: "Connect",
    desc: "Reach out and see if your property qualifies. Once approved, we'll finalize the agreement and next steps.",
    icon: PhoneCall,
  },
  {
    num: "02",
    title: "Onboard",
    desc: "We guide you through onboarding and help secure any required permits so you're fully set for launch.",
    icon: ClipboardList,
  },
  {
    num: "03",
    title: "Launch",
    desc: "We create & publish your listing on top platforms, optimizing pricing & content for maximum bookings.",
    icon: Rocket,
  },
  {
    num: "04",
    title: "Manage",
    desc: "We manage everything — guests, cleaning, and pricing — while you relax and earn steady income.",
    icon: Settings,
  },
];

/* ── Stats ── */
const stats = [
  { value: "75%+", label: "Average Occupancy Rate" },
  { value: "$12-15K", label: "Annual Gross Per Room" },
  { value: "4+", label: "Booking Platforms" },
  { value: "20+", label: "Happy Property Owners" },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: "Maria T.",
    location: "Regal Palms",
    stars: 5,
    quote: "Theme Park Stays transformed my vacation home into a consistent income stream. Their team handles everything — I just check my bank statement and smile.",
  },
  {
    name: "James R.",
    location: "Reunion Resort, FL",
    stars: 5,
    quote: "I was skeptical at first, but after the first month I was blown away. Occupancy went up, guest reviews improved, and I haven't had to deal with a single issue myself.",
  },
  {
    name: "Sandra L.",
    location: "Davenport, FL",
    stars: 5,
    quote: "As a remote owner, I needed someone I could trust completely. Theme Park Stays gives me full transparency with monthly reports and is always just a call away.",
  },
];

/* ── FAQ ── */
const faqs = [
  {
    q: "How much is the management fee?",
    a: "Our management fee starts at 8% of the nightly booking rate. Since our fee is based on real value we deliver to you, we don't make a single cent unless your property is doing well — we both have a mutual interest in maximizing your profit.",
  },
  {
    q: "What does full-service property management include?",
    a: "Unlike companies that only provide marketing or housekeeping, we provide a comprehensive service covering everything: guest communication, cleaning coordination, maintenance, dynamic pricing, listing optimization, review management, and more. One company, everything handled.",
  },
  {
    q: "Can I stay in my own property?",
    a: "Absolutely! As long as your property isn't already booked, you're free to stay for as many nights as you wish. Simply let us know in advance and we'll block the dates on your calendar.",
  },
  {
    q: "How do I get paid, and will I receive reports?",
    a: "We believe your listing holds value so you keep it in your name, deposits are made directly to your account via the platform. Our fees are billed monthly. You keep the listing and all of the great reviews should you ever choose to leave.",
  },
  {
    q: "How do you advertise my property?",
    a: "We list your property on all top vacation rental marketplaces including Airbnb, VRBO, Houfy, Booking.com, Expedia, and more. Our team also optimizes your listings for search visibility and uses dynamic pricing to keep you competitive.",
  },
  {
    q: "How do you determine the right price for my listing?",
    a: "Our pricing team uses smart algorithms that continuously adjust your rates based on local events, seasonality, holidays, competitor pricing, and demand patterns — ensuring your property is always priced to maximize both occupancy and revenue.",
  },
  {
    q: "Do you handle cleaning and maintenance?",
    a: "Yes! Our service includes cleaning coordination, maintenance issue resolution, supply restocking, and routine property inspections. We include a cleaning fee in every booking to ensure your property receives the care it needs.",
  },
  {
    q: "Is there a long-term commitment required?",
    a: "No. We believe in earning your business every month. You can cancel our management agreement at any time with no penalties or questions asked. We're confident you'll stay because of the results we deliver.",
  },
];

/* ── FAQ Item Component ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-[oklch(0.92_0.015_75)] rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-white hover:bg-[oklch(0.98_0.008_75)] transition-colors">
        <span className="font-semibold text-[oklch(0.18_0.012_55)] text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp size={18} className="text-[oklch(0.58_0.16_55)] flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-[oklch(0.5_0.015_55)] flex-shrink-0" />
        )}
      </div>
      {open && (
        <div className="px-6 py-4 bg-[oklch(0.98_0.008_75)] border-t border-[oklch(0.92_0.015_75)]">
          <p className="text-[oklch(0.45_0.015_55)] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function PropertyManagement() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.005_75)]" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Navbar strip ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[oklch(0.92_0.015_75)] h-16 flex items-center px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/logo_270d47fd.PNG"
            alt="Theme Park Stays logo"
            className="w-9 h-9 object-contain"
          />
          <div>
            <div className="text-sm font-bold text-[oklch(0.18_0.012_55)] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Theme Park Stays
            </div>
            <div className="text-xs text-[oklch(0.5_0.02_60)]">Orlando, Florida</div>
          </div>
        </button>
        <div className="ml-auto flex items-center gap-4">
          <a href="tel:+14078013030" className="hidden md:flex items-center gap-1.5 text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.58_0.16_55)] transition-colors">
            <PhoneCall size={14} /> (407) 801-3030
          </a>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.58_0.16_55)] transition-colors"
          >
            ← Back to Site
          </button>
          <button
            onClick={scrollToContact}
            className="btn-amber px-5 py-2 rounded-full text-sm font-semibold shadow-md"
          >
            Get Free Estimate
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-16 min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.01_55)]/92 via-[oklch(0.12_0.01_55)]/75 to-[oklch(0.12_0.01_55)]/40" />
        <div className="relative z-10 container py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-10 bg-[oklch(0.68_0.15_65)]" />
              <span className="text-[oklch(0.68_0.15_65)] text-xs font-semibold tracking-[0.25em] uppercase">For Property Owners</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Full-Service<br />
              <span className="italic text-[oklch(0.82_0.14_70)]">Vacation Rental</span><br />
              Management
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-xl">
              Maximize your earnings, minimize your stress. Theme Park Stays handles everything
              so you can enjoy the income without doing the work.
            </p>
            <p className="text-[oklch(0.82_0.14_70)] font-semibold text-base mb-8">
              Management starting at 8% · No cost to join · Cancel anytime
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToContact} className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold">
                Get Free Estimate <ArrowRight size={18} />
              </button>
              <a href="tel:+14078013030" className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">
                <PhoneCall size={18} /> (407) 801-3030
              </a>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
                ))}
              </div>
              <span className="text-white/70 text-sm">Trusted by 20+ Orlando property owners</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-b border-[oklch(0.92_0.015_75)] py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-[oklch(0.97_0.008_75)] flex items-center justify-center flex-shrink-0">
                  <b.icon size={18} className="text-[oklch(0.58_0.16_55)]" />
                </div>
                <div>
                  <div className="font-bold text-[oklch(0.18_0.012_55)] text-sm">{b.label}</div>
                  <div className="text-[oklch(0.55_0.015_55)] text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[oklch(0.18_0.012_55)] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[oklch(0.82_0.14_70)] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Logos ── */}
      <section className="bg-[oklch(0.97_0.008_75)] py-8 border-b border-[oklch(0.92_0.015_75)]">
        <div className="container">
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[oklch(0.55_0.015_55)] mb-6">
            Be Seen by Millions — Listed on All Top Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {platforms.map((p) => (
              <span key={p.name} className={`text-lg md:text-xl ${p.style} opacity-80 hover:opacity-100 transition-opacity`}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.58_0.16_55)] mb-3 block">Why Partner With Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Benefits of Our <span className="italic text-[oklch(0.58_0.16_55)]">Management Services</span>
            </h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-2xl mx-auto">
              As a locally owned Orlando company, we bring a personal touch that national chains simply can't match.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFeatures.map((f) => (
              <div key={f.title} className="group p-8 rounded-2xl border border-[oklch(0.92_0.015_75)] hover:border-[oklch(0.82_0.14_70)] hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full border-2 border-[oklch(0.82_0.14_70)] flex items-center justify-center mb-5 group-hover:bg-[oklch(0.82_0.14_70)]/10 transition-colors">
                  <f.icon size={24} className="text-[oklch(0.58_0.16_55)]" />
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{f.title}</h3>
                <p className="text-[oklch(0.45_0.015_55)] leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={scrollToContact} className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold mx-auto">
              Get Your Free Estimate <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Pricing Tiers ── */}
      <section className="py-20 md:py-28 bg-[oklch(0.97_0.008_75)]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.58_0.16_55)] mb-3 block">Transparent Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Simple, <span className="italic text-[oklch(0.58_0.16_55)]">Honest</span> Plans
            </h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-xl mx-auto">
              No hidden fees. No surprises. We only earn when you earn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.popular
                    ? "bg-[oklch(0.18_0.012_55)] text-white shadow-2xl scale-[1.03]"
                    : "bg-white border border-[oklch(0.92_0.015_75)] text-[oklch(0.18_0.012_55)]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[oklch(0.58_0.16_55)] text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? "text-white" : "text-[oklch(0.18_0.012_55)]"}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${tier.popular ? "text-white/70" : "text-[oklch(0.5_0.015_55)]"}`}>
                    {tier.tagline}
                  </p>
                </div>
                <div className="mb-2">
                  <span className={`text-5xl font-bold ${tier.popular ? "text-[oklch(0.82_0.14_70)]" : "text-[oklch(0.18_0.012_55)]"}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {tier.rate}
                  </span>
                  <span className={`text-sm ml-2 ${tier.popular ? "text-white/60" : "text-[oklch(0.5_0.015_55)]"}`}>{tier.rateLabel}</span>
                </div>
                {tier.setupRate && (
                  <p className={`text-sm mb-8 ${tier.popular ? "text-white/50" : "text-[oklch(0.6_0.01_55)]"}`}>
                    {tier.setupRate} {tier.setupLabel}
                  </p>
                )}
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${tier.popular ? "text-[oklch(0.82_0.14_70)]" : "text-[oklch(0.58_0.16_55)]"}`} />
                      <span className={tier.popular ? "text-white/85" : "text-[oklch(0.35_0.012_55)]"}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    tier.popular
                      ? "bg-[oklch(0.58_0.16_55)] text-white hover:bg-[oklch(0.52_0.16_55)]"
                      : "border-2 border-[oklch(0.82_0.14_70)] text-[oklch(0.58_0.16_55)] hover:bg-[oklch(0.82_0.14_70)]/10"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.58_0.16_55)] mb-3 block">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                3 Simple <span className="italic text-[oklch(0.58_0.16_55)]">Steps</span>
              </h2>
              <p className="text-[oklch(0.45_0.015_55)] text-lg mb-10 leading-relaxed">
                Getting started is simple. We handle everything from onboarding to daily management so you can sit back and earn.
              </p>
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.num} className="flex gap-5 p-5 rounded-xl border border-[oklch(0.92_0.015_75)] hover:border-[oklch(0.82_0.14_70)] hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-[oklch(0.18_0.012_55)] flex items-center justify-center flex-shrink-0 group-hover:bg-[oklch(0.58_0.16_55)] transition-colors">
                      <span className="text-[oklch(0.82_0.14_70)] text-sm font-bold">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[oklch(0.18_0.012_55)] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{step.title}</h3>
                      <p className="text-[oklch(0.45_0.015_55)] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={scrollToContact} className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold mt-8">
                Start Today <ArrowRight size={18} />
              </button>
            </div>
            {/* Right: feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Home, label: "Occupancy", sub: "75%+ average occupancy rate" },
                { icon: TrendingUp, label: "Performance", sub: "$12–15K annual gross per room" },
                { icon: Star, label: "Home Care", sub: "Inspection before check-in" },
                { icon: BarChart3, label: "Distribution", sub: "5+ booking platforms" },
                { icon: Award, label: "Transparency", sub: "Its your account" },
                { icon: Users, label: "Owner Portal", sub: "Real-time reporting & calendar" },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl bg-[oklch(0.97_0.008_75)] border border-[oklch(0.92_0.015_75)] text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[oklch(0.82_0.14_70)] flex items-center justify-center mx-auto mb-3">
                    <item.icon size={20} className="text-[oklch(0.58_0.16_55)]" />
                  </div>
                  <div className="font-bold text-[oklch(0.18_0.012_55)] text-sm mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.label}</div>
                  <div className="text-[oklch(0.5_0.015_55)] text-xs">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-28 bg-[oklch(0.18_0.012_55)]">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.68_0.15_65)] mb-3 block">Owner Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              What Our <span className="italic text-[oklch(0.82_0.14_70)]">Owners Say</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
              ))}
              <span className="text-white/60 text-sm ml-2">5-Star Rated by Property Owners</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-7">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={14} className="text-[oklch(0.82_0.14_70)] fill-[oklch(0.82_0.14_70)]" />
                  ))}
                </div>
                <p className="text-white/85 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.58_0.16_55)] mb-3 block">Questions & Answers</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Frequently Asked <span className="italic text-[oklch(0.58_0.16_55)]">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-[oklch(0.5_0.015_55)] text-sm mb-4">Still have questions? We're happy to help.</p>
            <button onClick={scrollToContact} className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold mx-auto">
              Contact Us <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact-form" className="py-20 md:py-28 bg-[oklch(0.97_0.008_75)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.58_0.16_55)] mb-3 block">Get Started Today</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.18_0.012_55)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Get Your Free <span className="italic text-[oklch(0.58_0.16_55)]">Income Estimate</span>
              </h2>
              <p className="text-[oklch(0.45_0.015_55)] text-lg">
                Tell us about your property and we'll show you exactly how much it could earn.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[oklch(0.92_0.015_75)] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" placeholder="John" className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors" />
                </div>
                <div>
                  <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors" />
              </div>
              <div className="mb-5">
                <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" placeholder="(407) 801-3030" className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors" />
              </div>
              <div className="mb-5">
                <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">Property Location</label>
                <input type="text" placeholder="e.g. Kissimmee, FL" className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors" />
              </div>
              <div className="mb-6">
                <label className="block text-[oklch(0.35_0.012_55)] text-xs font-semibold uppercase tracking-wider mb-2">Tell Us About Your Property</label>
                <textarea rows={4} placeholder="Number of bedrooms, current management situation, questions..." className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors resize-none" />
              </div>
              <button className="btn-amber w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
                Get My Free Estimate <ArrowRight size={18} />
              </button>
              <p className="text-center text-[oklch(0.6_0.01_55)] text-xs mt-4">No commitment required. We'll respond within 24 hours.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[oklch(0.5_0.015_55)] text-sm">
              <a href="tel:+14078013030" className="flex items-center gap-2 hover:text-[oklch(0.58_0.16_55)] transition-colors">
                <PhoneCall size={16} /> (407) 801-3030
              </a>
              <a href="mailto:chad@themeparkstays.com" className="flex items-center gap-2 hover:text-[oklch(0.58_0.16_55)] transition-colors">
                <Mail size={16} /> chad@themeparkstays.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="bg-[oklch(0.12_0.01_55)] py-6 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Theme Park Stays · Orlando, Florida ·{" "}
        <button onClick={() => navigate("/")} className="hover:text-white/70 transition-colors underline underline-offset-2">
          Back to Main Site
        </button>
      </div>

    </div>
  );
}
