/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from "../data";
import { Star, Quote, Heart } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-[#0ea5e9] font-bold uppercase block">
            KATA MEREKA / REVIEW PELANGGAN
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Kepuasan Pelanggan OwnApparel
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Telah dipercaya oleh berbagai jenis industri UMKM, panitia universitas, hingga pemesanan personal rumahan.
          </p>
        </div>

        {/* Testimonials Grid masonry-like */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((tItem) => (
            <div
              key={tItem.id}
              className="bg-white border border-slate-200/60 p-8 rounded-3xl relative shadow-sm hover-perspective flex flex-col justify-between"
            >
              {/* Quote Decorative Icon */}
              <div className="absolute top-6 right-8 text-slate-100 font-serif text-6xl select-none font-bold">
                “
              </div>

              <div className="space-y-4">
                {/* Visual Rating Stars */}
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < tItem.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="font-sans text-slate-600 text-sm leading-relaxed italic relative z-10">
                  "{tItem.content}"
                </p>
              </div>

              {/* Client Info Author bottom */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-slate-100">
                <img
                  src={tItem.avatar}
                  alt={tItem.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shrink-0"
                />
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">
                    {tItem.name}
                  </h4>
                  <span className="font-sans text-xs text-[#0ea5e9] font-semibold">
                    {tItem.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Small verified tag */}
        <div className="flex items-center justify-center space-x-2 mt-12 text-slate-400 text-xs font-mono">
          <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Kami Selalu Mendengar Masukan Konsumen Demi Peningkatan Kualitas</span>
        </div>

      </div>
    </section>
  );
}
