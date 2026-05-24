/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CornerRightDown, Shirt, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface HeroProps {
  onStartConfiguring: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ onStartConfiguring, onViewPortfolio }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-radial from-amber-50/40 via-sky-50/20 to-white overflow-hidden"
    >
      {/* Background Decorative Abstract Shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      {/* Grid background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Promo Pill */}
            <div className="inline-flex items-center space-x-2 bg-slate-900 text-white rounded-full px-4 py-1.5 text-xs font-mono tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>SABLON SATUAN & JAHIT LUSINAN RUMAHAN</span>
            </div>

            {/* Giant Title */}
            <h1 className="font-display font-extrabold text-slate-950 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] sm:leading-none">
              Wujudkan Pakaian Kustom & <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600 relative">
                Cetak Printing Impianmu!
              </span>
            </h1>

            {/* Subtext */}
            <p className="font-sans text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              <strong>OwnApparel</strong> memproduksi pakaian kustom dengan pengerjaan detail tinggi. Kaos komunitas, seragam bisnis, hoodie angkatan, serta berbagai aksesoris merchandise dengan <strong>kualitas jahitan distro</strong> dan <strong>sablon berteknologi modern</strong>.
            </p>

            {/* Key Value Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <div className="flex items-center space-x-2 text-slate-700 font-sans text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Tanpa Minimal Order untuk Cetak DTF</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-sans text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Bahan Katun Combed Premium Adem</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-sans text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Bordir Otomatis Rapi & Awet</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-sans text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Ada Desain Mockup & Hitung Biaya Instan</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                id="hero-cta-simulate"
                onClick={onStartConfiguring}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-display font-bold shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Mulai Simulasikan Desain</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                id="hero-cta-portfolio"
                onClick={onViewPortfolio}
                className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border border-slate-250 text-slate-800 rounded-xl font-display font-semibold hover:bg-slate-50 transition-all duration-300"
              >
                <span>Lihat Hasil Kerja</span>
              </button>
            </div>

            {/* Small trust lines */}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-6 text-slate-500 text-xs font-mono">
              <div>⚡ Cepat & On-Time</div>
              <div>🧵 Jahitan Kualitas Butik</div>
              <div>🚚 Kirim Seluruh Nusantara</div>
            </div>
          </div>

          {/* Right Column Interactive Product Illustration Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl overflow-hidden hover-perspective">
              {/* Card visual elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-bl-full pointer-events-none" />

              {/* Product header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Live Workshop Preview
                  </span>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold">
                  DIPILIH 1.200+ KONSUMEN
                </span>
              </div>

              {/* T-Shirt Illustration View */}
              <div className="bg-slate-50 rounded-2xl p-6 h-64 flex flex-col items-center justify-center relative group">
                {/* Floating tags */}
                <div className="absolute top-3 left-3 bg-white border border-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-500 flex items-center space-x-1 shadow-sm">
                  <span>Kaos Distro</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white border border-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-500 flex items-center space-x-1 shadow-sm">
                  <span>SABLON DTF TAJAM</span>
                </div>

                {/* Simulated garment visual */}
                <Shirt className="w-40 h-40 text-slate-800 transform group-hover:scale-105 transition-transform duration-500 stroke-[1.2]" />

                {/* Mock Logo Overlay on Tshirt */}
                <div className="absolute top-[48%] bg-indigo-600 text-white rounded p-1 px-2 text-[8px] font-bold font-mono uppercase tracking-wider transform -rotate-6 shadow-md shadow-indigo-600/30">
                  CREATIVE INDO
                </div>
              </div>

              {/* Card Bottom: Quick Features info */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>STOK BAHAN UTAMA</span>
                  <span className="text-slate-800 font-bold">READY (Cotton Combed 24s/30s)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-mono">PILIHAN WARNA</span>
                    <span className="block text-xs font-bold text-slate-800">8+ Warna</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-mono">MIN. ORDER</span>
                    <span className="block text-xs font-bold text-slate-800">Bisa Satuan</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-mono">GARANSI REYAD</span>
                    <span className="block text-xs font-bold text-slate-800">100% Retur</span>
                  </div>
                </div>

                <button
                  id="hero-cta-configure-right"
                  onClick={onStartConfiguring}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-display font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Shirt className="w-4 h-4" />
                  <span>Kustom Desain Anda Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
