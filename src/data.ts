/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductType, FabricType, PrintMethodType, PortfolioItem, TestimonialItem } from "./types";

export const PRODUCTS: ProductType[] = [
  {
    id: "kaos",
    name: "Kaos Premium (O-Neck)",
    category: "konveksi",
    basePrice: 35000,
    description: "Kaos lengan pendek unisex potongan reguler, nyaman, awet, dan serbaguna untuk kaos acara, komunitas, atau brand distro.",
    imagePlaceholder: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    availableFabrics: ["combed30s", "combed24s", "carded"],
    suggestedMethods: ["dtf", "sablon_manual", "bordir"]
  },
  {
    id: "polo",
    name: "Polo Shirt (Berkerah)",
    category: "konveksi",
    basePrice: 55000,
    description: "Seragam semi-formal berkerah rapi dengan placket kancing depan. Sangat diminati untuk pakaian kantor, panitia, atau seragam toko.",
    imagePlaceholder: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    availableFabrics: ["lacostecvc", "lacostepe"],
    suggestedMethods: ["bordir", "dtf"]
  },
  {
    id: "hoodie",
    name: "Hoodie / Jumper",
    category: "konveksi",
    basePrice: 95000,
    description: "Jaket bertudung premium tanpa ritsleting dengan kantong kanguru di depan. Berpotongan santai, modern, dan tebal melindungi dari dingin.",
    imagePlaceholder: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    availableFabrics: ["fleece", "babyterry"],
    suggestedMethods: ["bordir", "dtf"]
  },
  {
    id: "totebag",
    name: "Totebag Kanvas",
    category: "printing",
    basePrice: 15000,
    description: "Tas jinjing kain eco-friendly berukuran pas, kuat menampung binder/laptop. Sangat direkomendasikan untuk seminar kit, souvenir pernikahan, atau kemasan ramah lingkungan.",
    imagePlaceholder: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    availableFabrics: ["canvas", "blacu"],
    suggestedMethods: ["dtf", "sublime"]
  },
  {
    id: "apron",
    name: "Apron / Celemek Kafe",
    category: "printing",
    basePrice: 40000,
    description: "Celemek pelindung baju kerja barista, koki, atau barista kafe dilengkapi tali lingkar leher, tali pinggang, serta kantong fungsional lebar.",
    imagePlaceholder: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    availableFabrics: ["drill", "canvas"],
    suggestedMethods: ["bordir", "dtf"]
  }
];

export const FABRICS: FabricType[] = [
  {
    id: "combed30s",
    name: "Cotton Combed 30s",
    priceModifier: 10000,
    description: "Kapas 100% alami, adem, tipis namun tidak menerawang, menyerap keringat maksimal. Favorit standar distro Indonesia."
  },
  {
    id: "combed24s",
    name: "Cotton Combed 24s",
    priceModifier: 15000,
    description: "Kapas murni dengan ketebalan sedang (lebih tebal dari 30s). Kaku elegan, sangat tahan dipasang sablon ukuran besar."
  },
  {
    id: "lacostecvc",
    name: "Lacoste CVC Premium",
    priceModifier: 20000,
    description: "Campuran serat katun dan polyester dengan pori-pori rajut khas Polo (pique). Lembut, awet, tidak gampang melar atau berbulu."
  },
  {
    id: "fleece",
    name: "Cotton Fleece Premium",
    priceModifier: 30000,
    description: "Bahan jaket tebal berbulu halus di bagian dalam. Menghangatkan badan dengan sirkulasi udara yang baik (tidak pengap)."
  },
  {
    id: "canvas",
    name: "Canvas Cotton Tebal",
    priceModifier: 12000,
    description: "Kain berserat rapat, kuat, kaku, dan memberikan aksen eksklusif berstektur kasar natural."
  },
  {
    id: "drill",
    name: "American Drill Premium",
    priceModifier: 8000,
    description: "Kain tenun miring yang tangguh, gampang dibersihkan dari tumpahan minyak atau noda, sangat cocok untuk baju dapur/apron."
  },
  {
    id: "carded",
    name: "Cotton Carded Standard",
    priceModifier: 0,
    description: "Cotton ekonomis berserat sedikit kasar di kulit, namun tetap menyerap keringat. Bagus untuk kaos acara massal/promosi."
  },
  {
    id: "lacostepe",
    name: "Lacoste Polyester (PE)",
    priceModifier: 0,
    description: "Bahan pique rajutan polyester yang ekonomis. Sangat awet dari kerutan warna tidak mudah pudar."
  },
  {
    id: "babyterry",
    name: "Babyterry Soft",
    priceModifier: 20000,
    description: "Kain rajutan lingkar halus di dalam yang lembut dan berketebalan sedang (cocok sebagai jaket tipis harian)."
  },
  {
    id: "blacu",
    name: "Blacu Natural",
    priceModifier: 0,
    description: "Kain semi-mentah berwarna krem alami bintik serat kapas, berharga hemat dan bernuansa vintage ramah kantong."
  }
];

export const PRINT_METHODS: PrintMethodType[] = [
  {
    id: "dtf",
    name: "Sablon Digital DTF (Direct to Film)",
    priceModifier: 12000,
    setupCost: 5000,
    description: "Metode cetak digital super presisi dengan tinta CMYK-White yang dtransfer ke kain. Warna cerah tanpa batas warna, fleksibel dan lentur."
  },
  {
    id: "bordir",
    name: "Bordir Komputer Presisi",
    priceModifier: 18000,
    setupCost: 10000,
    description: "Rajutan benang otomatis terkomputerisasi. Hasil sangat rapi, tebal timbul mewah, awet dicuci hingga bertahun-tahun."
  },
  {
    id: "sablon_manual",
    name: "Sablon Manual Plastisol (Min. 24 pcs)",
    priceModifier: 8000,
    setupCost: 0,
    description: "Sablon tinta karet kelas atas dengan ketahanan tahan lama dijemur. Hasil cetak bertekstur premium."
  },
  {
    id: "sublime",
    name: "Cetak Sublimasi Awet",
    priceModifier: 10000,
    setupCost: 0,
    description: "Tinta khusus menyatu langsung ke kain ditarik panas ekstrim. Khusus bahan berwarna putih / terang dan polyester."
  }
];

export const COLOR_OPTIONS = [
  { name: "Hitam Jetblack", hex: "#1a1a1a", textLight: true },
  { name: "Putih Bersih", hex: "#fafafa", textLight: false },
  { name: "Navy Blue", hex: "#1c2e4a", textLight: true },
  { name: "Merah Maroon", hex: "#6b1426", textLight: true },
  { name: "Hijau Botol", hex: "#1b4d3e", textLight: true },
  { name: "Abu-abu Misty", hex: "#b4b8ab", textLight: false },
  { name: "Mustard Gold", hex: "#e5a93b", textLight: false },
  { name: "Pink Pastel", hex: "#f3c1c6", textLight: false }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port1",
    title: "Kaos Komunitas Motor Slankers",
    category: "kaos",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    description: "Kaos seragam komunitas sebanyak 65 pcs berbahan Cotton Combed 30s premium. Dicetak menggunakan Sablon DTF High-color dengan grafik depan-belakang yang tahan cuci setrika.",
    specs: ["Bahan: Cotton Combed 30s", "Format: Sablon Digital DTF", "Warna: Hitam Jetblack", "Jumlah: 65 pcs"]
  },
  {
    id: "port2",
    title: "Polo Shirt Staff Kafe Kopi Abdi",
    category: "polo",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    description: "Pakaian dinas karyawan harian kafe sebanyak 20 pcs berbahan Lacoste CVC. Dilengkapi bordir logo depan di dada kiri dan tulisan barista di lengan kanan menggunakan benang emas mewah.",
    specs: ["Bahan: Lacoste CVC Premium", "Format: Bordir Komputer", "Warna: Hijau Botol", "Jumlah: 20 pcs"]
  },
  {
    id: "port3",
    title: "Hoodie Kelas Angkatan SMAN 1",
    category: "hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    description: "Pemesanan kustom kelas sebanyak 40 pcs jaket berkerudung bahan Cotton Fleece tebal hangat. Menggunakan kombinasi bordir teks timbul di dada depan dan sablon DTF ilustrasi kelas di belakang.",
    specs: ["Bahan: Cotton Fleece Premium", "Format: Bordir & DTF", "Warna: Hitam & Maroon", "Jumlah: 40 pcs"]
  },
  {
    id: "port4",
    title: "Totebag Ramah Lingkungan Toko Roti",
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    description: "Merchandise berisikan hampers toko roti sebanyak 250 pcs menggunakan bahan Blacu Natural bernuansa rustic. Logo vintage satu warna tercetak di sisi depan menggunakan sublim presisi tinggi.",
    specs: ["Bahan: Blacu Natural", "Format: Sublimasi", "Warna: Krem Alami", "Jumlah: 250 pcs"]
  },
  {
    id: "port5",
    title: "Apron Barista Artisan Bakery",
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1595231712425-60d3db5ab16b?q=80&w=600&auto=format&fit=crop",
    description: "Celemek barista premium sebanyak 15 pcs berbahan American Drill hitam pekat. Logo kedai dibordir sangat padat di tengah dada agar anti-luntur walau terkena cipratan air/susu.",
    specs: ["Bahan: American Drill Premium", "Format: Bordir Komputer", "Warna: Hitam", "Jumlah: 15 pcs"]
  },
  {
    id: "port6",
    title: "Kaos Panitia Event Musik Kampus",
    category: "kaos",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    description: "Pakaian seragam panitia konser bertema neon sebanyak 120 pcs kaos Cotton Combed 24s tebal tegak. Sablon depan fluorescent cerah menggunakan DTF berpigmentasi tebal.",
    specs: ["Bahan: Cotton Combed 24s", "Format: Sablon Digital DTF", "Warna: Putih", "Jumlah: 120 pcs"]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test1",
    name: "Budi Setiawan",
    role: "Owner 'Kopi Hangat' Café",
    content: "Pesan apron barista dan polo shirt buat seragam karyawan di sini hasilnya luar biasa! Bordirannya tebal, rapi sekali, dan pengerjaannya cepat meskipun pesannya mendadak. Sangat merekomendasikan konveksi rumahan ini, kualitasnya tidak kalah sama industri pabrik besar!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test2",
    name: "Siti Rahma",
    role: "Panitia Reuni SMA 2",
    content: "Kalkulator harga otomatisnya di website ini membantu kami menghitung anggaran kaos reuni dengan cepat. Baju kaos Combed 30s-nya lembut, adem dipakai seharian. Sablon DTF gambarnya juga elastis, dicuci berulang kali tidak pecah-pecah. Pelayanan admin WhatsApp-nya sangat ramah!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test3",
    name: "Dimas Anggara",
    role: "Vokalis Band 'Gema'",
    content: "Kami order hoodie kustom untuk merchandise band sebanyak 30 pcs. Jahitan pinggirannya kuat, warna marunnya mewah, dan tebal bahannya pas banget. Sablon gambar ilustrasi album di punggung belakang sangat jernih dan detail kecil pun tercetak sempurna. Bakal langganan terus!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test4",
    name: "Laras Prasetyo",
    role: "SMEs Consultant",
    content: "Tertarik pesan totebag kanvas untuk souvenir seminar. Pelayanannya transparan dan pengerjaannya on-time sesuai deadline. Pembagian ukuran S sampai XXL tertata dengan sangat rapi sewaktu dikirim. Sukses terus bisnis konveksi dan cetak printingnya!",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  }
];

export const FAQS = [
  {
    question: "Apakah ada minimal pemesanan (Minimum Order Quantity)?",
    answer: "Untuk jasa Printing (seperti DTF satuan atau Totebag), kami Menerima pesanan tanpa minimal order (bisa satuan!). Namun untuk konveksi jahitan kustom baru (seperti Polo berkerah khusus atau sablon manual), minimal pesanan adalah 12 pcs (1 lusin) per model untuk mengoptimalkan biaya produksi."
  },
  {
    question: "Berapa lama waktu pengerjaan produksi?",
    answer: "Lama waktu produksi sangat bergantung pada jumlah dan antrean workshop kami. Untuk kaos satuan DTF biasanya selesai dalam waktu 1-2 hari kerja. Sedangkan untuk pesanan konveksi jumlah besar (lusinan/ratusan) berkisar antara 7-14 hari kerja setelah desain disepakati."
  },
  {
    question: "Bagaimana cara saya mengirimkan file desain?",
    answer: "Anda dapat mencoba mengunggah desain Anda langsung lewat kustomisasi interaktif di website ini untuk melihat pratinjau instan pada mockup. Saat Anda mengirim pesanan via WhatsApp, Anda bisa melampirkan file mentah beresolusi tinggi (format PNG transparan, PDF, CorelDraw CDR, atau Adobe Illustrator AI) agar hasil cetak maksimal."
  },
  {
    question: "Apakah bisa dikirim ke luar kota / luar pulau?",
    answer: "Tentu saja! Walaupun kami adalah usaha rumahan, kami melayani pengiriman ke seluruh pelosok Indonesia menggunakan berbagai pilihan kurir kargo terpercaya (JNE, J&T, Sicepat, Indah Cargo) dengan harga ongkos kirim bersahabat."
  },
  {
    question: "Apakah saya bisa mendapatkan potongan harga khusus?",
    answer: "Ya! Kami menerapkan diskon kuantitas otomatis yang bisa Anda lihat langsung di kalkulator harga kami. Semakin banyak jumlah pakaian yang Anda pesan (misal di atas 24, 50, atau 100 pcs), harga per item akan otomatis terpangkas signifikan."
  }
];
