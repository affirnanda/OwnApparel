/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Layanan from "./components/Layanan";
import InteractiveConfigurator from "./components/InteractiveConfigurator";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Handle smooth scroll navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // height of the sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scroll spy to highlight active nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "layanan", "kustomisasi", "portfolio", "faq"];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-accent-400 selection:text-slate-950">
      
      {/* Sticky Top Header */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Single-Screen/Landing Sections */}
      <main className="relative overflow-x-hidden">
        
        {/* Hero Banner Area */}
        <Hero
          onStartConfiguring={() => handleNavigate("kustomisasi")}
          onViewPortfolio={() => handleNavigate("portfolio")}
        />

        {/* Services / Layanan Showcase */}
        <Layanan />

        {/* Interactive Custom Model Config & Price Calculator Estimator */}
        <InteractiveConfigurator />

        {/* Filterable Portfolio / Gallery */}
        <Portfolio />

        {/* Verified User Testimonials Grid */}
        <Testimonials />

        {/* Accordions FAQ */}
        <FAQ />

      </main>

      {/* Footer Area with Location, Socials & Credits */}
      <Footer
        onNavigate={handleNavigate}
      />

    </div>
  );
}
