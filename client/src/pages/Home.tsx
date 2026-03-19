/* =============================================================
   Home Page — Theme Park Stays
   Golden Hour Luxury Design
   Assembles all sections in order
   ============================================================= */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FilterSection from "@/components/FilterSection";
import HomesSection from "@/components/HomesSection";
import RoomsSection from "@/components/RoomsSection";
import TicketsSection from "@/components/TicketsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ManagementSection from "@/components/ManagementSection";
import DesignSection from "@/components/DesignSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FilterSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <HomesSection activeFilter={activeFilter} />
      <RoomsSection />
      <TestimonialsSection />
      <TicketsSection />
      <ActivitiesSection />
      <ManagementSection />
      <DesignSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
