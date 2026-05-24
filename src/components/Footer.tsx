/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scissors, Printer, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* Logo & Slogan Column */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent-500 text-slate-950 rounded-lg">
                <div className="flex space-x-0.5">
                  <Scissors className="w-4 h-4" />
                  <Printer className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-display font-black tracking-tight text-white text-lg block leading-none">
                  OwnApparel
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#0ea5e9] block font-bold uppercase">
                  Convection & Printing
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
              Jasa konveksi pakaian rumahan kustom dan digital printing berkualitas tinggi. Mengutamakan bahan katun super adem, jahitan tepi butik presisi, serta sablon DTF resolusi tinggi. Pengerjaan cepat, transparan, dan terpercaya.
            </p>

            {/* Social handles */}
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links Column */}
          <div className="col-span-6 md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
              Navigasi Halaman
            </h4>
            
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <button onClick={() => onNavigate("hero")} className="hover:text-accent-400 transition-colors">Beranda</button>
              </li>
              <li>
                <button onClick={() => onNavigate("layanan")} className="hover:text-accent-400 transition-colors">Layanan Jasa</button>
              </li>
              <li>
                <button onClick={() => onNavigate("kustomisasi")} className="hover:text-accent-400 transition-colors">Kalkulator Interaktif</button>
              </li>
              <li>
                <button onClick={() => onNavigate("portfolio")} className="hover:text-accent-400 transition-colors">Portofolio Kerja</button>
              </li>
              <li>
                <button onClick={() => onNavigate("faq")} className="hover:text-accent-400 transition-colors">Tanya Jawab (FAQ)</button>
              </li>
            </ul>
          </div>

          {/* Coordinates / Contact Info Column */}
          <div className="col-span-6 md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
              Kontak Workshop Kami
            </h4>

            <div className="space-y-3.5 text-xs text-slate-400 font-sans">
              
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  OwnApparel Convection & Printing<br />
                  Jl. Balas Klumprik, Gg. Sadewo Utara No. 10B, Kecamatan Wiyung, Kota Surabaya, Jawa Timur, Indonesia
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-accent-500 shrink-0" />
                <span>+62 897 - 380 - 9698 (WhatsApp Admin)</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <span>kontak@ownapparel.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Credits bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-500 text-[10px] font-mono">
          <div>
            &copy; {currentYear} OwnApparel. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <span>Usaha Konveksi Printing Rumahan Modern</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
