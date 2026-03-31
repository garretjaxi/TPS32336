import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Paintbrush, Layers, Zap, Waves, Bath, ChefHat, ArrowLeft, Phone, Mail, CheckCircle2, Star, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SEO from "@/components/SEO";

/* ── CDN image URLs ── */
const IMAGES = {
  themedBedroom1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/themed-bedroom-1_a6473b2e.webp",
  themedBedroom2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/themed-bedroom-2_2ab4c6ff.jpg",
  themedBedroom3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/themed-bedroom-3_b32889c9.jpeg",
  elegantBedroom1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/elegant-bedroom-1_5149543f.webp",
  elegantBedroom2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/elegant-bedroom-2_aa3e61f3.jpg",
  elegantBedroom3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/elegant-bedroom-3_407bfb19.jpeg",
  gameRoom: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/game-room-1_45a32fa9.jpg",
  livingRoom: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028408649/6MfrdHFh2Y824AHn9CEQNW/living-room-1_06c612bc.jpg",
};

/* ── Services ── */
const services = [
  { icon: Paintbrush, title: "Painting", desc: "Interior and exterior painting with premium finishes. We handle surface prep, priming, and flawless application for a lasting result." },
  { icon: Layers, title: "Flooring", desc: "Hardwood, tile, vinyl plank, and carpet installation. We source quality materials and deliver precise, beautiful floors." },
  { icon: Zap, title: "Electrical", desc: "Licensed electrical work including lighting upgrades, panel work, outlets, and smart home installations." },
  { icon: Waves, title: "Pool", desc: "Pool resurfacing, tile work, equipment upgrades, and full pool area transformations to create a resort-style experience." },
  { icon: Bath, title: "Bathroom Remodel", desc: "Complete bathroom renovations — tile, vanities, fixtures, lighting, and custom shower designs built to impress guests." },
  { icon: ChefHat, title: "Kitchen Remodel", desc: "Full kitchen transformations including cabinetry, countertops, backsplash, appliances, and layout optimization." },
];

/* ── Why NorthTec ── */
const whyItems = [
  { title: "Licensed & Insured", desc: "Every project is backed by full licensing and insurance for your complete peace of mind." },
  { title: "Vacation Rental Specialists", desc: "We understand what guests expect — durable, beautiful spaces that photograph well and hold up to heavy use." },
  { title: "Turnkey Projects", desc: "From design concept to final clean-up, we handle everything so you don't have to coordinate multiple contractors." },
  { title: "On-Time Delivery", desc: "We respect your rental calendar. Projects are planned and executed to minimize downtime and lost revenue." },
];

/* ── Process steps ── */
const processSteps = [
  { num: "01", title: "Free Consultation", desc: "Tell us your vision and property goals. We'll assess the space and provide a detailed, no-obligation quote." },
  { num: "02", title: "Design & Planning", desc: "Our team creates a design plan with material selections, color palettes, and a project timeline." },
  { num: "03", title: "Expert Installation", desc: "Our licensed crew executes the project with precision, keeping you updated at every milestone." },
  { num: "04", title: "Final Walkthrough", desc: "We do a thorough walkthrough together, address any finishing touches, and leave your property spotless." },
];

export default function DesignServices() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const submitInquiry = trpc.booking.submitInquiry.useMutation({
    onSuccess: () => {
      toast.success("Quote Request Sent", {
        description: "We've received your request and will get back to you within 24 hours.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    },
    onError: (error) => {
      toast.error("Submission Failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const scrollToContact = () => {
    document.getElementById("design-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast.error("Missing Information", {
        description: "Please provide at least your name and email address.",
      });
      return;
    }

    submitInquiry.mutate({
      propertyName: "Design Service",
      guestName: formData.fullName,
      guestEmail: formData.email,
      guestPhone: formData.phone,
      message: `Service: ${formData.service}\n\nProject Details: ${formData.message}`,
    });
  };

  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_80)] text-[oklch(0.18_0.012_55)]">
      {/* Floating Back to Site Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold bg-[oklch(0.82_0.14_70)] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-out"
        title="Return to home page"
      >
        ← Back to Site
      </button>
      <SEO 
        title="Themed Room Design & Vacation Rental Remodeling"
        description="Transform your property with Orlando's premier vacation rental design team. We specialize in themed bedrooms, luxury remodels, and turnkey renovations."
      />
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[oklch(0.92_0.015_75)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4" />
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-xl font-bold tracking-tight text-[oklch(0.18_0.012_55)]">NorthTec</span>
            <span className="text-sm text-[oklch(0.5_0.015_55)] hidden sm:block">Interior Design Services</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+14078013030" className="hidden md:flex items-center gap-1.5 text-sm text-[oklch(0.4_0.015_55)] hover:text-[oklch(0.58_0.16_55)] transition-colors">
              <Phone size={14} /> (407) 801-3030
            </a>
            <button
              onClick={scrollToContact}
              className="px-5 py-2 rounded-full text-sm font-semibold bg-[oklch(0.18_0.012_55)] text-white hover:bg-[oklch(0.28_0.012_55)] transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[oklch(0.12_0.015_240)]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.elegantBedroom2})`, opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.1_0.02_240)/90%] via-[oklch(0.1_0.02_240)/60%] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-[oklch(0.72_0.12_65)] text-sm font-semibold tracking-widest uppercase mb-4">
              NorthTec Interior Design
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Transform Your<br />
              <span className="text-[oklch(0.78_0.14_65)] italic font-serif">Vacation Property</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              From themed kids' rooms that wow guests to elegant master suites that command premium rates — NorthTec delivers expert craftsmanship tailored for vacation rental owners in Orlando.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-full text-base font-semibold bg-[oklch(0.68_0.15_65)] text-white hover:bg-[oklch(0.62_0.17_65)] transition-colors shadow-lg"
              >
                Get a Free Quote
              </button>
              <a
                href="tel:+14078013030"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                <Phone size={18} /> (407) 801-3030
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-[oklch(0.18_0.012_55)] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium">
            {["Licensed & Insured", "Vacation Rental Specialists", "Free Consultations", "On-Time Delivery", "Turnkey Projects"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[oklch(0.72_0.12_65)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Themed Bedrooms Gallery ── */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">Gallery</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Themed Bedrooms</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-2xl mx-auto">
              Immersive, story-driven rooms that delight guests of all ages. From Star Wars adventures to princess castles — we bring imagination to life with durable, high-quality finishes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: IMAGES.themedBedroom1, label: "Star Wars Adventure" },
              { src: IMAGES.themedBedroom2, label: "Princess Castle" },
              { src: IMAGES.themedBedroom3, label: "Disney Character Room" },
            ].map((img) => (
              <div key={img.label} className="group relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] bg-gray-100">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Elegant Bedrooms Gallery ── */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">Gallery</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Elegant Bedrooms</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-2xl mx-auto">
              Sophisticated master suites and guest rooms designed to command premium nightly rates. Clean lines, luxurious textures, and timeless palettes that photograph beautifully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: IMAGES.elegantBedroom1, label: "Neutral Luxury Suite" },
              { src: IMAGES.elegantBedroom2, label: "Classic Master Bedroom" },
              { src: IMAGES.elegantBedroom3, label: "5-Star Hotel Style" },
            ].map((img) => (
              <div key={img.label} className="group relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] bg-gray-100">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Game Room + Living Room ── */}
      <section className="py-20 bg-[oklch(0.98_0.006_75)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">Gallery</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Entertainment Spaces</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-2xl mx-auto">
              Game rooms and living spaces that become the heart of every vacation — designed to maximize fun, comfort, and five-star reviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-md aspect-video bg-gray-100">
              <img
                src={IMAGES.gameRoom}
                alt="Game Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[oklch(0.72_0.12_65)] text-xs font-semibold tracking-widest uppercase mb-1">Entertainment</p>
                <h3 className="text-white text-2xl font-bold">Game Room</h3>
                <p className="text-white/80 text-sm mt-1">Arcade machines, pool tables, LED lighting & more</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-md aspect-video bg-gray-100">
              <img
                src={IMAGES.livingRoom}
                alt="Living Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[oklch(0.72_0.12_65)] text-xs font-semibold tracking-widest uppercase mb-1">Common Area</p>
                <h3 className="text-white text-2xl font-bold">Living Room</h3>
                <p className="text-white/80 text-sm mt-1">Open-plan layouts designed for large groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── How It Works ── */}
      {/* ── What We Do ── */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Services Offered</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-2xl mx-auto">
              NorthTec provides end-to-end renovation and design services specifically tailored for vacation rental properties in the Orlando area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="p-8 rounded-2xl border border-[oklch(0.92_0.015_75)] bg-[oklch(0.99_0.004_75)] hover:shadow-lg hover:border-[oklch(0.82_0.12_65)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-[oklch(0.18_0.012_55)] flex items-center justify-center mb-5 group-hover:bg-[oklch(0.62_0.17_65)] transition-colors duration-300">
                  <svc.icon size={26} className="text-[oklch(0.72_0.12_65)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-3">{svc.title}</h3>
                <p className="text-[oklch(0.45_0.015_55)] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why NorthTec ── */}
      <section className="py-20 bg-[oklch(0.12_0.015_240)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[oklch(0.72_0.12_65)] text-sm font-semibold tracking-widest uppercase mb-4">Why NorthTec</p>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Built for Vacation<br />Rental Owners</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                We don't just renovate homes — we build revenue-generating spaces. Every design decision is made with your guests' experience and your bottom line in mind.
              </p>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-full font-semibold bg-[oklch(0.68_0.15_65)] text-white hover:bg-[oklch(0.62_0.17_65)] transition-colors"
              >
                Start Your Project
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyItems.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.68_0.15_65)/20%] flex items-center justify-center mb-4">
                    <Star size={18} className="text-[oklch(0.72_0.12_65)]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Our Process</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg max-w-xl mx-auto">
              From first call to final walkthrough — a seamless, stress-free experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="relative p-7 rounded-2xl bg-white border border-[oklch(0.92_0.015_75)] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.18_0.012_55)] flex items-center justify-center mb-5">
                  <span className="text-[oklch(0.72_0.12_65)] font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="font-bold text-[oklch(0.18_0.012_55)] text-lg mb-2">{step.title}</h3>
                <p className="text-[oklch(0.45_0.015_55)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="design-contact" className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[oklch(0.58_0.14_65)] text-sm font-semibold tracking-widest uppercase mb-3">Get Started</p>
            <h2 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-4">Request a Free Quote</h2>
            <p className="text-[oklch(0.45_0.015_55)] text-lg">
              Tell us about your property and project goals. We'll get back to you within 24 hours with a personalized estimate.
            </p>
          </div>
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/40 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-[oklch(0.3_0.012_55)] mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Smith"
                  className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[oklch(0.3_0.012_55)] mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[oklch(0.3_0.012_55)] mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(407) 000-0000"
                  className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[oklch(0.3_0.012_55)] mb-2">Service Interested In</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors bg-white"
                >
                  <option value="">Select a service…</option>
                  <option>Themed Bedroom</option>
                  <option>Elegant Bedroom</option>
                  <option>Game Room</option>
                  <option>Living Room</option>
                  <option>Painting</option>
                  <option>Flooring</option>
                  <option>Electrical</option>
                  <option>Pool</option>
                  <option>Bathroom Remodel</option>
                  <option>Kitchen Remodel</option>
                  <option>Full Property Renovation</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[oklch(0.3_0.012_55)] mb-2">Tell Us About Your Project</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your property, what you'd like done, and any specific ideas or inspiration you have…"
                className="w-full border border-[oklch(0.88_0.015_75)] rounded-xl px-4 py-3 text-[oklch(0.18_0.012_55)] placeholder-[oklch(0.7_0.01_55)] text-sm outline-none focus:border-[oklch(0.58_0.16_55)] transition-colors resize-none bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={submitInquiry.isPending}
              className="w-full py-4 rounded-xl font-bold text-white bg-[oklch(0.18_0.012_55)] hover:bg-[oklch(0.28_0.012_55)] transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitInquiry.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                "Send My Free Quote Request"
              )}
            </button>
          </form>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[oklch(0.5_0.015_55)]">
              <a href="tel:+14078013030" className="flex items-center gap-2 hover:text-[oklch(0.58_0.16_55)] transition-colors">
                <Phone size={15} /> (407) 801-3030
              </a>
              <span className="hidden sm:block text-[oklch(0.8_0.01_55)]">|</span>
              <a href="mailto:chad@themeparkstays.com" className="flex items-center gap-2 hover:text-[oklch(0.58_0.16_55)] transition-colors">
                <Mail size={15} /> chad@themeparkstays.com
              </a>
            </div>
          </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[oklch(0.12_0.015_240)] text-white/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="font-bold text-white">NorthTec</span> — Interior Design Services for Vacation Rentals
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+14078013030" className="hover:text-white transition-colors">(407) 801-3030</a>
            <a href="mailto:chad@themeparkstays.com" className="hover:text-white transition-colors">chad@themeparkstays.com</a>
          </div>
          <Link href="/" className="hover:text-white transition-colors">← Theme Park Stays</Link>
        </div>
      </footer>

    </div>
  );
}
