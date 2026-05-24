/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Scissors, Printer, Menu, X, Phone } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "hero", label: "Beranda" },
    { id: "layanan", label: "Layanan Kami" },
    { id: "kustomisasi", label: "Desain & Kalkulator" },
    { id: "portfolio", label: "Portofolio" },
    { id: "faq", label: "Tanya Jawab" }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 text-white backdrop-blur-md shadow-lg py-3"
          : "bg-transparent text-slate-900 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="app-logo"
            onClick={() => handleItemClick("hero")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className={`p-2 rounded-lg transition-colors ${
              isScrolled ? "bg-accent-500 text-slate-900" : "bg-slate-900 text-white"
            }`}>
              <div className="flex space-x-0.5">
                <Scissors className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <Printer className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className={`font-display font-black tracking-tight text-xl block leading-none ${
                isScrolled ? "text-white" : "text-slate-950"
              }`}>
                OwnApparel
              </span>
              <span className={`font-mono text-[9px] tracking-widest block font-bold uppercase ${
                isScrolled ? "text-slate-300" : "text-slate-500"
              }`}>
                Convection & Printing
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`font-sans text-sm font-medium transition-colors hover:text-accent-500 relative py-1 ${
                  activeSection === item.id
                    ? isScrolled ? "text-white font-bold" : "text-slate-900 font-bold"
                    : isScrolled ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 rounded-full`} />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              id="cta-whatsapp-header"
              href="https://wa.me/628973809698?text=Halo%20OwnApparel%2C%20saya%20tertarik%20tanya%20mengenai%20pemesanan..."
              target="_blank"
              rel="noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-display text-sm font-semibold shadow-sm transition-all duration-300 ${
                isScrolled
                  ? "bg-accent-500 text-slate-950 hover:bg-accent-600 hover:scale-105"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Admin</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-white hover:bg-slate-800" : "text-slate-900 hover:bg-slate-100"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-slate-900 border-t border-slate-800 shadow-xl"
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium ${
                  activeSection === item.id
                    ? "bg-slate-800 text-accent-400 font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4 border-t border-slate-800">
              <a
                id="mobile-cta-whatsapp"
                href="https://wa.me/628973809698?text=Halo%20OwnApparel%2C%20saya%20tertarik%20tanya%20mengenai%20pemesanan..."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-accent-500 text-slate-950 font-display font-semibold rounded-lg shadow-md"
              >
                <Phone className="w-5 h-5" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
