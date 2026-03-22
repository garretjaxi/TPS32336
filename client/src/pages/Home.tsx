/* =============================================================
   Home Page — Theme Park Stays
   Composes all landing page sections
   ============================================================= */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HomesSection from "@/components/HomesSection";
import GuestAmenitiesSection from "@/components/GuestAmenitiesSection";
import RoomsSection from "@/components/RoomsSection";
import TicketsSection from "@/components/TicketsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ManagementSection from "@/components/ManagementSection";
import DesignSection from "@/components/DesignSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HomesSection />
        <GuestAmenitiesSection />
        <RoomsSection />
        <TicketsSection />
        <ActivitiesSection />
        <ShopSection />
        <ManagementSection />
        <DesignSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
