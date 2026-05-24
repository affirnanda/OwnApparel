/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-[#0ea5e9] font-bold uppercase block">
            PERTANYAAN UMUM / INFORMASI UTAMA
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Tanya Jawab (FAQ)
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Temukan jawaban cepat atas beberapa pertanyaan mendasar mengenai proses desain kustom, kain, serta pembayaran.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 border-b border-slate-100 pb-8">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/60 rounded-2xl overflow-hidden bg-slate-50 transition-colors"
              >
                {/* Accordion Toggle trigger */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between font-display font-semibold text-slate-900 hover:text-[#0ea5e9] transition-all text-sm sm:text-base outline-none cursor-pointer"
                >
                  <span className="pr-4 leading-tight flex items-center space-x-2.5">
                    <span className="text-xs font-mono font-black text-[#0ea5e9] bg-sky-50 px-2 py-0.5 rounded shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transform transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-slate-800" : ""
                    }`}
                  />
                </button>

                {/* Accordion panel expandable wrapper */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-4 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner with custom direct consultation invite links */}
        <div className="mt-12 text-center bg-sky-50/55 border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="p-3 bg-white rounded-full inline-block shadow-sm">
            <MessageCircle className="w-5 h-5 text-[#0ea5e9]" />
          </div>
          <h3 className="font-display font-black text-slate-900 text-sm sm:text-base">
            Punya Pertanyaan Spesifik Lainnya?
          </h3>
          <p className="font-sans text-slate-500 text-[11px] sm:text-xs max-w-lg mx-auto leading-relaxed">
            Admin customer support kami siap melayani Anda sepanjang hari kerja. Silakan tanyakan bahan, contoh sablon dtf kustom, nego harga lusinan, dsb langsung lewat chat.
          </p>
          <a
            id="faq-cta-whatsapp-direct"
            href="https://wa.me/628973809698?text=Halo%20OwnApparel%2C%20saya%20punya%20pertanyaan%20mengenai..."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-display text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <span>Tanyakan Sekarang via WA</span>
          </a>
        </div>

      </div>
    </section>
  );
}
