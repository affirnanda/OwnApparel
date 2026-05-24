/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scissors, Printer, ShieldCheck, HeartHandshake, Award, Truck } from "lucide-react";

export default function Layanan() {
  const serviceCategories = [
    {
      title: "Jasa Konveksi Pakaian",
      icon: <Scissors className="w-6 h-6 text-slate-900" />,
      tagline: "Kustomisasi Potongan, Jahitan, & Ukuran",
      description: "Kami melayani pembuatan berbagai kebutuhan sandang skala kecil hingga menengah dengan kualitas jahitan kuat & presisi sekelas distro.",
      items: [
        "Kaos Komunitas & Event (O-Neck, V-Neck, Raglan)",
        "Polo Shirt custom (Pique CVC/Polyester) bordir logo",
        "Hoodie, Jumper, & Jaket Angkatan berbahan fleece hangat",
        "Seragam Kerja karyawan kantor, restoran, & café",
        "Apron (Celemek), Celemek masak barista tahan cipratan",
        "Desain & Pola Kustom sesuai permintaan spesifik"
      ],
      colorAccent: "border-slate-300 bg-slate-50/50"
    },
    {
      title: "Custom Printing & Sablon",
      icon: <Printer className="w-6 h-6 text-slate-900" />,
      tagline: "Teknologi Cetak Modern Ketajaman Tinggi",
      description: "Mengutamakan kualitas ketajaman grafis maksimal tanpa adanya kompromi warna, handfeel lentur, dan awet bertahun-tahun.",
      items: [
        "Sablon Digital DTF (Direct Transfer Film) - Bisa Satuan!",
        "Bordir Komputer Otomatis benang mengkilat timbul mewah",
        "Printing Sublimasi untuk Jersey olahraga / kaos polyester",
        "Totebag Kanvas / Blacu Custom untuk souvenir kit acara",
        "Custom Merchandise (Sticker kustom, gantungan kunci, dsb)",
        "Jasa setting layout desain grafis & tracing gambar pecah"
      ],
      colorAccent: "border-accent-200 bg-sky-50/30"
    }
  ];

  const coreStrengths = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Quality Control Ketat",
      description: "Setiap helai pakaian dipandu proses pemotongan rapi, jahitan presisi, uji cetak tahan cuci, hingga finishing setrika uap rapi."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      title: "Tanpa Minimal Order Cetak",
      description: "Mau punya kaos sablon kreasi sendiri cuma 1 pcs saja? Tentu saja bisa kami layani pakai sablon teknologi digital DTF terbaik."
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: "Bahan Premium Bersertifikat",
      description: "Kami hanya menyediakan bahan katun berserat alami ramah kulit, antibakteri, tidak gampang mengerut serta anti-pudar."
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: "Pengiriman Luas & Packing Aman",
      description: "Kami membungkus setiap pesanan dengan plastik steril kokoh dan mendistribusikannya lewat kurir andalan dengan garansi aman."
    }
  ];

  return (
    <section id="layanan" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-slate-400 font-bold uppercase block">
            KATEGORI PORTFOLIO JASA
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Layanan Unggulan OwnApparel
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Gabungan keahlian jahit profesional kelas busana dengan seni digital cetak visual modern untuk melahirkan produk yang memukau.
          </p>
        </div>

        {/* Dynamic Service Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {serviceCategories.map((service, idx) => (
            <div
              key={idx}
              className={`border rounded-3xl p-8 transition-all hover-perspective ${service.colorAccent}`}
            >
              {/* Card top */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-950 text-xl">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono font-medium text-slate-400 block tracking-wide">
                    {service.tagline}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-slate-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Items List */}
              <ul className="space-y-3 text-sm text-slate-700 font-sans border-t border-slate-200/50 pt-6">
                {service.items.map((item, idy) => (
                  <li key={idy} className="flex items-start space-x-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      {idy + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why choose us banner */}
        <div className="bg-slate-950 text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side explanation */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-accent-400 font-bold uppercase">
                ALASAN MEMILIH KAMI / CO-TRUST
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl leading-snug">
                Kami Menjaga Reputasi Usaha Anda Lewat Kualitas Pakaian
              </h3>
              <p className="font-sans text-slate-400 text-sm leading-relaxed">
                Sebagai konveksi rumahan, kontrol kualitas berada langsung di tangan tangan profesional kami. Jahitan tepi yang double stitch, bahan kaos dingin, dan ketahanan sablon sangat kami prioritaskan.
              </p>
            </div>

            {/* Right side check grids */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreStrengths.map((str, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg inline-block">
                    {str.icon}
                  </div>
                  <h4 className="font-display font-semibold text-slate-100 text-base">
                    {str.title}
                  </h4>
                  <p className="font-sans text-slate-400 text-xs leading-normal">
                    {str.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
