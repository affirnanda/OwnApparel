/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PORTFOLIO_ITEMS } from "../data";
import { PortfolioItem } from "../types";
import { ListFilter, X, Grid, Heart, Tag, CheckSquare } from "lucide-react";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<"all" | "kaos" | "polo" | "hoodie" | "merchandise">("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filters: { id: "all" | "kaos" | "polo" | "hoodie" | "merchandise"; label: string }[] = [
    { id: "all", label: "Semua Hasil Kerja" },
    { id: "kaos", label: "Kaos Sablon" },
    { id: "polo", label: "Polo Bordir" },
    { id: "hoodie", label: "Hoodie & Jaket" },
    { id: "merchandise", label: "Totebag & Apron" }
  ];

  const filteredItems = activeFilter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-[#0ea5e9] font-bold uppercase block">
            GALERI HASIL KERJA NYATA
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Portofolio & Galeri Produksi
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Pratinjau riwayat pesanan nyata dari konsumen, mulai kaos reuni akbar hingga pakaian seragam eksklusif kafe modern.
          </p>
        </div>

        {/* Categories Navigation Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((flt) => (
            <button
              key={flt.id}
              onClick={() => setActiveFilter(flt.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-display font-bold transition-all ${
                activeFilter === flt.id
                  ? "bg-slate-900 text-white shadow-md transform scale-105"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group border border-slate-200/60 rounded-3xl overflow-hidden cursor-pointer bg-slate-50 relative hover-perspective"
            >
              {/* Image with overlay effects */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Category Label */}
                <div className="absolute top-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-6">
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  PREMIUM QUALITY PRODUCTION
                </span>
                <h3 className="font-display font-bold text-slate-900 text-base leading-tight group-hover:text-accent-600 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Lower tag counts/specs preview */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-200/50">
                  {item.specs.slice(0, 2).map((sp, idx) => (
                    <span key={idx} className="bg-slate-200/50 text-slate-700 font-mono text-[9px] font-semibold px-2 py-0.5 rounded-md">
                      {sp.split(":")[1]?.trim() || sp}
                    </span>
                  ))}
                  {item.specs.length > 2 && (
                    <span className="text-slate-400 font-mono text-[9px] font-bold self-center ml-1">
                      +{item.specs.length - 2} Lainnya
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Interactive Detail Modal View */}
        {selectedProject && (
          <div
            id="portfolio-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <div className="bg-white rounded-[32px] max-w-xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 shadow-2xl custom-scrollbar border border-slate-200">
              
              {/* Close icon absolute */}
              <button
                id="btn-close-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors"
                aria-label="Tutup Detail"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Hero Category Badge */}
                <div className="inline-block bg-slate-900 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg">
                  PORTFOLIO KATEGORI {selectedProject.category.toUpperCase()}
                </div>

                <h3 className="font-display font-extrabold text-slate-950 text-2xl tracking-tight pr-8 leading-tight">
                  {selectedProject.title}
                </h3>

                {/* Large high resolution image representation */}
                <div className="h-64 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Detailed project review */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono font-bold text-slate-400 tracking-widest uppercase mb-1">
                    DETAIL PENGERJAAN PRODUKSI:
                  </span>
                  <p className="font-sans text-slate-600 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* High quality specification table bullet styles */}
                <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-3">
                  <span className="block text-xs font-mono font-bold text-slate-400 tracking-widest uppercase">
                    SPESIFIKASI BAHAN & CETAK:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-700">
                    {selectedProject.specs.map((spec, idx) => {
                      const [label, val] = spec.split(":");
                      return (
                        <div key={idx} className="flex justify-between border-b border-slate-200/40 pb-1.5 sm:pb-1">
                          <span className="text-slate-500">{label}:</span>
                          <span className="font-bold text-slate-800">{val || ""}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA inside modal linking back to custom screen */}
                <div className="flex border-t border-slate-100 pt-6 justify-between gap-4 items-center">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-3 text-center border border-slate-250 text-slate-700 rounded-xl font-display font-semibold transition-all text-sm"
                  >
                    Kembali
                  </button>
                  <a
                    id="modal-cta-whatsapp"
                    href={`https://wa.me/628973809698?text=Halo%20OwnApparel%2C%20saya%20tertarik%20pesan%20baju%20seperti%20pada%20portfolio%20'${encodeURIComponent(selectedProject.title)}'...`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-center font-display font-bold transition-all text-sm"
                  >
                    Tanya Model Ini
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
