/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useRef, ChangeEvent } from "react";
import { PRODUCTS, FABRICS, PRINT_METHODS, COLOR_OPTIONS } from "../data";
import { SizeBreakdown, ConfiguratorState } from "../types";
import { Shirt, Upload, Move, ZoomIn, Eye, RotateCcw, MessageSquare, HelpCircle, Check, Printer, Scale, RefreshCw } from "lucide-react";

export default function InteractiveConfigurator() {
  // Configurator state
  const [config, setConfig] = useState<ConfiguratorState>({
    product: "kaos",
    fabric: "combed30s",
    printMethod: "dtf",
    color: "#1a1a1a",
    designImage: null,
    designScale: 1.0,
    designPositionX: 50,
    designPositionY: 38,
    designPlacement: "front",
    sizes: { S: 0, M: 5, L: 5, XL: 2, XXL: 0 }
  });

  // Client info state
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    notes: ""
  });

  // Active step navigation (tab) inside configurator
  const [activeTab, setActiveTab] = useState<"product" | "design" | "sizes">("product");

  // File upload reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper selectors
  const selectedProduct = PRODUCTS.find((p) => p.id === config.product) || PRODUCTS[0];
  const selectedFabric = FABRICS.find((f) => f.id === config.fabric) || FABRICS[0];
  const selectedPrintMethod = PRINT_METHODS.find((pm) => pm.id === config.printMethod) || PRINT_METHODS[0];

  // Colors available
  const activeColorObject = COLOR_OPTIONS.find((c) => c.hex === config.color) || COLOR_OPTIONS[0];

  // Handle product selection (updates suggested fabrics as well)
  const handleProductChange = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    const defaultFabric = prod.availableFabrics[0] || "combed30s";
    const defaultMethod = prod.suggestedMethods[0] || "dtf";

    setConfig((prev) => ({
      ...prev,
      product: productId,
      fabric: defaultFabric,
      printMethod: defaultMethod
    }));
  };

  // Upload custom design file
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setConfig((prev) => ({
            ...prev,
            designImage: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDesign = () => {
    setConfig((prev) => ({
      ...prev,
      designImage: null,
      designScale: 1.0,
      designPositionX: 50,
      designPositionY: 38
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset helper
  const resetPlacement = () => {
    setConfig((prev) => ({
      ...prev,
      designScale: 1.0,
      designPositionX: 50,
      designPositionY: 38
    }));
  };

  // Size handler
  const handleSizeChange = (size: keyof SizeBreakdown, val: number) => {
    const cleanVal = isNaN(val) ? 0 : Math.max(0, val);
    setConfig((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: cleanVal
      }
    }));
  };

  // Quick preset sizes
  const applyPresetQuantity = (qty: number) => {
    if (qty === 1) {
      setConfig((prev) => ({
        ...prev,
        sizes: { S: 0, M: 1, L: 0, XL: 0, XXL: 0 }
      }));
    } else if (qty === 12) {
      // 1 lusin
      setConfig((prev) => ({
        ...prev,
        sizes: { S: 2, M: 4, L: 4, XL: 2, XXL: 0 }
      }));
    } else if (qty === 50) {
      setConfig((prev) => ({
        ...prev,
        sizes: { S: 10, M: 15, L: 15, XL: 7, XXL: 3 }
      }));
    }
  };

  // Calculations
  const totalQty = (Object.values(config.sizes) as number[]).reduce((sum, current) => sum + current, 0);
  
  // Base unit cost calculations
  const baseCost = selectedProduct.basePrice;
  const fabricModifier = selectedFabric.priceModifier;
  const printModifier = selectedPrintMethod.priceModifier;
  const unitCost = baseCost + fabricModifier + printModifier;

  // Setup fee (if quantity is small, we append a small screen/file setup setup fee)
  // For instance, < 12 pcs with DTF or Bordir requires extra initial work.
  const needsSetupFee = totalQty > 0 && totalQty < 12;
  const setupCostValue = needsSetupFee ? selectedPrintMethod.setupCost : 0;

  // Unadjusted subtotal
  const subtotal = (unitCost * totalQty) + setupCostValue;

  // Quantity Discount Rate
  // 0-11 pcs: 0% diskon
  // 12-23 pcs (1 lusin+): 5% diskon
  // 24-49 pcs (2 lusin+): 10% diskon
  // 50+ pcs: 15% diskon
  let discountRate = 0;
  if (totalQty >= 50) {
    discountRate = 0.15;
  } else if (totalQty >= 24) {
    discountRate = 0.10;
  } else if (totalQty >= 12) {
    discountRate = 0.05;
  }

  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = subtotal - discountAmount;

  // Format currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Construct structured text and send via WhatsApp API
  const handleSendWhatsApp = () => {
    if (!clientInfo.name.trim()) {
      alert("Silakan masukkan Nama Anda terlebih dahulu.");
      return;
    }

    const sizeLines = (Object.keys(config.sizes) as Array<keyof SizeBreakdown>)
      .filter((sz) => config.sizes[sz] > 0)
      .map((sz) => `- Ukuran ${sz}: ${config.sizes[sz]} pcs`)
      .join("\n");

    const textPayload = `*Form Pemesanan OwnApparel* 🧵👕

*DATA PEMESAN:*
- Nama: ${clientInfo.name}
- Telepon/WA: ${clientInfo.phone || "Tidak diisi"}

*SPESIFIKASI PRODUK:*
- Produk: ${selectedProduct.name}
- Bahan Kain: ${selectedFabric.name}
- Cetak/Sablon: ${selectedPrintMethod.name}
- Warna Kain: ${activeColorObject.name}
- Peletakan Desain: Sisi ${config.designPlacement.toUpperCase()}
- Pratinjau Desain: ${config.designImage ? "Sudah Diunggah ke Mockup" : "Melampirkan via chat"}

*RINCIAN UKURAN & JUMLAH:*
${sizeLines || "- Tidak ada kuantitas ukuran diinput (mohon konsultasi)"}
👉 *Total Kuantitas:* ${totalQty} pcs

*ESTIMASI PENAWARAN HARGA:*
- Harga Satuan Dasar: ${formatIDR(unitCost)}/pcs
- Biaya Setup: ${setupCostValue > 0 ? formatIDR(setupCostValue) : "Gratis / Tanpa Biaya"}
${discountAmount > 0 ? `- Diskon Kuantitas (${discountRate * 100}%): -${formatIDR(discountAmount)}` : ""}
💰 *Total Estimasi Biaya:* ${formatIDR(finalTotal)}

*CATATAN KHUSUS:*
"${clientInfo.notes || "Tidak ada catatan kustom."}"

-------------------
_Pesan digenerate otomatis melalui Interactive Mockup Web. Mohon admin memeriksa desain terlampir._`;

    // WhatsApp target link (format safely)
    const encodedText = encodeURIComponent(textPayload);
    const waUrl = `https://wa.me/628973809698?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  // SVG Garment Mockup Paths Generator
  const renderGarmentSVG = () => {
    const fillValue = config.color;

    switch (config.product) {
      case "kaos":
        return (
          <svg className="w-full h-full max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* T-Shirt Body Outline & Base */}
            <path
              d="M18 20 L27 12 C34 16 43 14 50 14 C57 14 66 16 73 12 L82 20 L74 34 L69 32 L69 82 C69 85 67 87 64 87 L36 87 C33 87 31 85 31 82 L31 32 L26 34 L18 20 Z"
              fill={fillValue}
              stroke="#020617"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Round collar line */}
            <path d="M40 14.5 C43 19.5 57 19.5 60 14.5" stroke="#020617" strokeWidth="2" fill="none" />
            {/* Sleeves stitch details */}
            <path d="M26 34 L21 24" stroke="#020617" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M74 34 L79 24" stroke="#020617" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Bottom stitch hem */}
            <path d="M31 83 L69 83" stroke="#020617" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        );
      case "polo":
        return (
          <svg className="w-full h-full max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Polo Body Base */}
            <path
              d="M18 20 L27 12 C34 16 43 14 50 14 C57 14 66 16 73 12 L82 20 L74 34 L69 32 L69 82 C69 85 67 87 64 87 L36 87 C33 87 31 85 31 82 L31 32 L26 34 L18 20 Z"
              fill={fillValue}
              stroke="#020617"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Collar Fold Left */}
            <path d="M40 14 L50 24 L50 15 Z" fill="#ffffff" fillOpacity="0.15" stroke="#020617" strokeWidth="1.5" />
            {/* Collar Fold Right */}
            <path d="M60 14 L50 24 L50 15 Z" fill="#ffffff" fillOpacity="0.15" stroke="#020617" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Button Placket line */}
            <path d="M50 24 L50 34" stroke="#020617" strokeWidth="1.8" />
            <circle cx="50" cy="27.5" r="1" fill="#020617" />
            <circle cx="50" cy="31.5" r="1" fill="#020617" />
            {/* Rib collar border style */}
            <path d="M26 34 L21 24" stroke="#020617" strokeWidth="1.5" />
            <path d="M74 34 L79 24" stroke="#020617" strokeWidth="1.5" />
          </svg>
        );
      case "hoodie":
        return (
          <svg className="w-full h-full max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hoodie Body and sleeves */}
            <path
              d="M18 25 L30 16 C35 15 42 16 50 16 C58 16 65 15 70 16 L82 25 L73 48 L68 45 L68 82 C68 85 65 87 62 87 L38 87 C35 87 32 85 32 82 L32 45 L27 48 L18 25 Z"
              fill={fillValue}
              stroke="#020617"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Hood outlines */}
            <path d="M33 16 C33 4 41 2 50 2 C59 2 67 4 67 16" stroke="#020617" strokeWidth="2" fill="none" />
            <path d="M33 16 C38 21 44 23 50 23 C56 23 62 21 67 16" stroke="#020617" strokeWidth="1.5" fill="none" />
            {/* Drawstrings */}
            <path d="M47 23 L44 32 C44 33 43 34 42 34" stroke="#020617" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M53 23 L56 31 C56 32 57 32 58 32" stroke="#020617" strokeWidth="1.2" strokeLinecap="round" />
            {/* Kangaro pocket outline */}
            <path d="M38 64 L62 64 L59 52 L41 52 Z" fill="#ffffff" fillOpacity="0.08" stroke="#020617" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Bottom ribs */}
            <path d="M32 82 L68 82" stroke="#020617" strokeWidth="2.5" />
          </svg>
        );
      case "totebag":
        return (
          <svg className="w-full h-full max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Totebag straps */}
            <path d="M38 35 C38 12 43 10 44 10 C46 10 50 28 50 35" stroke="#020617" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M50 35 C50 28 54 10 56 10 C57 10 62 12 62 35" stroke="#020617" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Totebag canvas fold rectangle */}
            <rect x="25" y="35" width="50" height="50" rx="3" fill={fillValue} stroke="#020617" strokeWidth="2.5" />
            {/* Side stitch lines */}
            <path d="M28 35 L28 85" stroke="#020617" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M72 35 L72 85" stroke="#020617" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case "apron":
        return (
          <svg className="w-full h-full max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Neck strap */}
            <path d="M36 24 C36 10 64 10 64 24" stroke="#020617" strokeWidth="2.5" fill="none" />
            {/* Apron bib body shape */}
            <path
              d="M36 24 L64 24 L64 42 C64 42 76 46 76 56 L76 90 L24 90 L24 56 C24 46 36 42 36 42 Z"
              fill={fillValue}
              stroke="#020617"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Waist ties */}
            <path d="M24 56 L10 60" stroke="#020617" strokeWidth="2" strokeLinecap="round" />
            <path d="M76 56 L90 60" stroke="#020617" strokeWidth="2" strokeLinecap="round" />
            {/* Big center pocket */}
            <path d="M36 60 L64 60 L62 78 L38 78 Z" fill="#ffffff" fillOpacity="0.1" stroke="#020617" strokeWidth="1.5" />
            <path d="M50 60 L50 78" stroke="#020617" strokeWidth="1" strokeDasharray="1 1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="kustomisasi" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-[#0ea5e9] font-bold uppercase block">
            INTERACTIVE MOCKUP & ESTIMATOR
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">
            Kustomisasi & Kalkulator Instan
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Rancang mockup pakaian kustom secara visual gratis, upload gambar logo Anda, dan langsung ketahui rincian perkiraan anggaran biaya Anda secara transparan.
          </p>
        </div>

        {/* Workspace Card Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Visualizer Canvas (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md relative sticky top-24">
            
            {/* Canvas Header options */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-accent-500" />
                <span>Pratinjau Virtual</span>
              </span>
              
              {/* Reset placement config button if custom image upload exists */}
              {config.designImage && (
                <button
                  id="btn-reset-mockup"
                  onClick={resetPlacement}
                  className="text-[10px] font-mono font-semibold text-slate-500 hover:text-red-500 flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Atur Ulang Logo</span>
                </button>
              )}
            </div>

            {/* Simulated Cloth Mockup Canvas */}
            <div className="bg-slate-100/70 border border-slate-100 rounded-2xl p-4 h-[380px] flex items-center justify-center relative shadow-inner overflow-hidden">
              
              {/* Dynamic Garment Vector rendered here */}
              <div id="garment-render-viewport" className="w-full h-full flex items-center justify-center relative transition-transform duration-300">
                {renderGarmentSVG()}

                {/* Overlaid Uploaded Custom Design Logo */}
                {config.designImage ? (
                  <div
                    id="mockup-logo-overlay"
                    style={{
                      position: "absolute",
                      left: `${config.designPositionX}%`,
                      top: `${config.designPositionY}%`,
                      transform: `translate(-50%, -50%) scale(${config.designScale})`,
                      width: "55px",
                      height: "55px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none"
                    }}
                    className="border border-dashed border-slate-900/40 bg-white/20 hover:border-accent-500 backdrop-blur-[0.5px] rounded-sm transition-all shadow-sm"
                  >
                    <img
                      src={config.designImage}
                      alt="Uploaded custom design"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  // Default visual indicator
                  <div className="absolute top-[48%] pointer-events-none px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-[9px] text-white select-none text-center">
                    <span className="block font-bold">LOGO SABLON</span>
                    <span className="block opacity-80 text-[7px]" style={{ color: activeColorObject.textLight ? '#ffffff' : '#000000' }}>Silakan Unggah</span>
                  </div>
                )}
              </div>

              {/* Front / Back Toggle Overlay in top right */}
              <div className="absolute top-4 right-4 flex bg-white/90 border border-slate-200 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, designPlacement: "front" }))}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                    config.designPlacement === "front" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Depan
                </button>
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, designPlacement: "back" }))}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                    config.designPlacement === "back" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Belakang
                </button>
              </div>

              {/* Watermark of Business */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-slate-400 select-none">
                📍 OwnApparel Virtual Mockup v1.0
              </div>
            </div>

            {/* Custom Design Interactive Fine-tuners (Sliders) */}
            <div className="mt-5 space-y-4 pt-4 border-t border-slate-100">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="block text-xs font-display font-bold text-slate-900">
                    Sematkan Gambar Logo Sendiri
                  </span>
                  <p className="text-[10px] text-slate-500 leading-none">
                    Pilih file gambar logo / grafis anda (.png, .jpg, .svg)
                  </p>
                </div>

                <div className="flex space-x-2 shrink-0">
                  <button
                    id="btn-upload-trigger"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Gambar</span>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {config.designImage && (
                    <button
                      id="btn-delete-logo"
                      onClick={removeDesign}
                      className="px-2.5 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs transition-all"
                      title="Hapus Desain"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Sliders ONLY when image sits on the clothing */}
              {config.designImage && (
                <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-200">
                    <Move className="w-3.5 h-3.5 text-accent-600" />
                    <span>NAVIGASI ATUR POSISI LOGO</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-slate-700">
                      <span>Ukuran (Skala Logo)</span>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{config.designScale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.30"
                      max="2.50"
                      step="0.05"
                      value={config.designScale}
                      onChange={(e) => setConfig((p) => ({ ...p, designScale: parseFloat(e.target.value) }))}
                      className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-700">
                        <span>Horisontal (X)</span>
                        <span className="font-mono text-[10px] font-bold text-slate-400">{config.designPositionX}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        step="1"
                        value={config.designPositionX}
                        onChange={(e) => setConfig((p) => ({ ...p, designPositionX: parseInt(e.target.value) }))}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-700">
                        <span>Vertikal (Y)</span>
                        <span className="font-mono text-[10px] font-bold text-slate-400">{config.designPositionY}%</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="85"
                        step="1"
                        value={config.designPositionY}
                        onChange={(e) => setConfig((p) => ({ ...p, designPositionY: parseInt(e.target.value) }))}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Controls Panel (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Steps Head Tabs */}
            <div className="flex border-b border-slate-200 bg-white p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("product")}
                className={`flex-1 py-3 text-center text-xs font-display font-bold rounded-lg transition-all ${
                  activeTab === "product"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                1. Pilih Produk & Bahan
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={`flex-1 py-3 text-center text-xs font-display font-bold rounded-lg transition-all ${
                  activeTab === "design"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                2. Metode Cetak & Warna
              </button>
              <button
                onClick={() => setActiveTab("sizes")}
                className={`flex-1 py-3 text-center text-xs font-display font-bold rounded-lg transition-all ${
                  activeTab === "sizes"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                3. Ukuran & Kirim Pesanan
              </button>
            </div>

            {/* Step Content: Tab 1 (Product & Fabric) */}
            {activeTab === "product" && (
              <div className="bg-white border border-slate-200/60 p-6 rounded-3xl space-y-6 shadow-sm">
                {/* Product Select */}
                <div className="space-y-3">
                  <label className="block text-sm font-display font-black text-slate-900">
                    Pilih Jenis Produk Pakaian / Tas
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRODUCTS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductChange(p.id)}
                        className={`border rounded-xl p-4 cursor-pointer text-left transition-all ${
                          config.product === p.id
                            ? "bg-slate-900/5 border-slate-900 ring-2 ring-slate-900"
                            : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Shirt className={`w-4 h-4 ${config.product === p.id ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span className="font-display font-bold text-slate-900 text-sm">{p.name}</span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-500 leading-normal mt-1.5">
                          {p.description}
                        </p>
                        <span className="block text-xs font-mono font-bold text-[#0ea5e9] mt-2">
                          Mulai {formatIDR(p.basePrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fabric Material Selection */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-display font-black text-slate-900">
                      Pilih Jenis Bahan Kain (Fabric Premium)
                    </label>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-medium">
                      REKOMENDASI UNTUK {selectedProduct.name.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {FABRICS.filter((f) => selectedProduct.availableFabrics.includes(f.id)).map((f) => (
                      <div
                        key={f.id}
                        onClick={() => setConfig((p) => ({ ...p, fabric: f.id }))}
                        className={`border rounded-xl p-4 cursor-pointer text-left transition-all ${
                          config.fabric === f.id
                            ? "bg-[#0ea5e9]/5 border-accent-500 ring-2 ring-accent-400/50"
                            : "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-display font-bold text-slate-900 text-sm">{f.name}</span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {f.priceModifier === 0 ? "Standard" : `+ ${formatIDR(f.priceModifier)}/pcs`}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-500 leading-normal mt-1">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Actions Footer */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveTab("design")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-display font-extrabold uppercase tracking-wider shadow-md"
                  >
                    Lanjut ke Metode Cetak & Warna
                  </button>
                </div>
              </div>
            )}

            {/* Step Content: Tab 2 (Design & Colors) */}
            {activeTab === "design" && (
              <div className="bg-white border border-slate-200/60 p-6 rounded-3xl space-y-6 shadow-sm">
                
                {/* Print Method Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-display font-black text-slate-900">
                    Pilih Metode Printing Sablon / Bordir
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {PRINT_METHODS.filter((pm) => selectedProduct.suggestedMethods.includes(pm.id)).map((pm) => (
                      <div
                        key={pm.id}
                        onClick={() => setConfig((p) => ({ ...p, printMethod: pm.id }))}
                        className={`border rounded-xl p-4 cursor-pointer text-left transition-all ${
                          config.printMethod === pm.id
                            ? "bg-[#0ea5e9]/5 border-accent-500 ring-2 ring-accent-400/50"
                            : "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Printer className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-display font-bold text-slate-900 text-sm">{pm.name}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            + {formatIDR(pm.priceModifier)}/pcs
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-500 leading-normal mt-1">
                          {pm.description}
                        </p>
                        {pm.setupCost > 0 && (
                          <div className="text-[9px] font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded inline-block mt-2 font-bold">
                            ⚠️ Minimal order &lt; 12 pcs dikenakan tambahan biaya setup awal {formatIDR(pm.setupCost)} per pesanan.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Selection Palette */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-display font-black text-slate-900">
                    Pilih Warna Kain Pakaian
                  </label>
                  <p className="font-sans text-xs text-slate-500">
                    Warna di bawah merupakan stock standar di workshop, ganti warna untuk merubah mockup virtual di sebelah kiri.
                  </p>

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setConfig((p) => ({ ...p, color: c.hex }))}
                        className={`flex flex-col items-center p-2 rounded-xl border transition-all relative ${
                          config.color === c.hex
                            ? "border-slate-900 ring-2 ring-slate-900/50 bg-slate-50"
                            : "border-slate-200 hover:bg-slate-50/50"
                        }`}
                      >
                        {/* Colored Circle */}
                        <span
                          className={`w-8 h-8 rounded-full border border-slate-200 shadow-inner flex items-center justify-center`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {config.color === c.hex && (
                            <Check className={`w-4 h-4 ${c.textLight ? 'text-white' : 'text-slate-900'}`} />
                          )}
                        </span>
                        
                        {/* Name */}
                        <span className="text-[9px] font-mono text-slate-600 mt-1.5 text-center leading-tight truncate w-full">
                          {c.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step Actions Footer */}
                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveTab("product")}
                    className="px-5 py-3 border border-slate-250 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setActiveTab("sizes")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-display font-extrabold uppercase tracking-wider shadow-md"
                  >
                    Lanjut Isi Jumlah Ukuran
                  </button>
                </div>

              </div>
            )}

            {/* Step Content: Tab 3 (Size Quantities & Send Booking) */}
            {activeTab === "sizes" && (
              <div className="space-y-6">
                
                {/* Sizes Grid */}
                <div className="bg-white border border-slate-200/60 p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <label className="block text-sm font-display font-black text-slate-900">
                      Rincian Jumlah & Ukuran Kaos / Pakaian
                    </label>
                    
                    {/* Size Guide Info modal marker mock */}
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded inline-flex items-center space-x-1 font-mono font-medium">
                      <span>Standard ukuran Unisex Dewasa (cm)</span>
                    </span>
                  </div>

                  <p className="font-sans text-xs text-slate-500 leading-normal">
                    Silakan input jumlah kaos/apron untuk masing-masing ukuran yang Anda butuhkan. Pesanan banyak otomatis memperoleh potongan kuantitas diskon!
                  </p>

                  <div className="grid grid-cols-5 gap-3 pt-2">
                    {(["S", "M", "L", "XL", "XXL"] as Array<keyof SizeBreakdown>).map((size) => (
                      <div key={size} className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 flex flex-col items-center">
                        <span className="font-display font-black text-slate-900 text-sm mb-1">{size}</span>
                        <input
                          type="number"
                          id={`input-size-${size}`}
                          min="0"
                          max="999"
                          value={config.sizes[size]}
                          onChange={(e) => handleSizeChange(size, parseInt(e.target.value))}
                          className="w-full text-center bg-white border border-slate-250 p-1.5 text-xs font-bold rounded-lg focus:ring-1 focus:ring-accent-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Preset Quick Buttons */}
                  <div className="pt-2 flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">PRESET CEPAT:</span>
                    <button
                      onClick={() => applyPresetQuantity(1)}
                      className="px-2.5 py-1 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold rounded"
                    >
                      Bisa Satuan (1 Pcs)
                    </button>
                    <button
                      onClick={() => applyPresetQuantity(12)}
                      className="px-2.5 py-1 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold rounded"
                    >
                      1 Lusin (12 Pcs)
                    </button>
                    <button
                      onClick={() => applyPresetQuantity(50)}
                      className="px-2.5 py-1 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold rounded"
                    >
                      50 Pcs (Besar)
                    </button>
                  </div>
                </div>

                {/* Instant Cost Calculator Board */}
                <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-accent-400 pb-2 border-b border-slate-800">
                    <Scale className="w-4 h-4" />
                    <span>RINCIAN ESTIMASI PENAWARAN HARGA TRANSPARAN</span>
                  </div>

                  <div className="space-y-2 text-xs font-sans text-slate-300">
                    <div className="flex justify-between">
                      <span>Harga Produk Dasar ({selectedProduct.name})</span>
                      <span className="font-mono text-white">{formatIDR(baseCost)}/pcs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tambahan Kategori Bahan ({selectedFabric.name})</span>
                      <span className="font-mono text-white">{fabricModifier === 0 ? "Tanpa tambahan" : `+ ${formatIDR(fabricModifier)}/pcs`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metode Sablon Berjalan ({selectedPrintMethod.name})</span>
                      <span className="font-mono text-white">+ {formatIDR(printModifier)}/pcs</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 my-1 font-semibold text-slate-100 flex justify-between">
                      <span>Biaya Cetak Per Helai Baju</span>
                      <span className="font-mono text-accent-400">{formatIDR(unitCost)}/pcs</span>
                    </div>

                    {needsSetupFee && (
                      <div className="flex justify-between text-yellow-500/90 text-[11px] bg-yellow-500/5 p-2 rounded border border-yellow-500/10">
                        <span>Tambahan Biaya Setup Awal (&lt; 12 Pcs)</span>
                        <span className="font-mono">{formatIDR(setupCostValue)}</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-400/5 p-2 rounded">
                        <span>Diskon Kuantitas Pesanan Lusinan {totalQty} Pcs ({discountRate * 100}%)</span>
                        <span className="font-mono">-{formatIDR(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total Amount large */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                        TOTAL ESTIMASI BIAYA ({totalQty} pcs)
                      </span>
                      {totalQty === 0 && (
                        <p className="text-[10px] text-red-400 font-sans italic mt-0.5">
                          *Silakan isi jumlah ukuran untuk menghitung total biaya.
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-display font-black text-accent-400">
                        {totalQty > 0 ? formatIDR(finalTotal) : formatIDR(0)}
                      </span>
                      {totalQty > 0 && (
                        <span className="block text-[9px] text-slate-400 mt-0.5 font-mono">
                          *Harga belum termasuk ongkos kirim ke alamat luar kota Anda
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking Coordinate Form */}
                <div className="bg-white border border-slate-200/60 p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-slate-900 text-sm">
                      Formulir WhatsApp Hubungi Admin
                    </h4>
                    <p className="font-sans text-xs text-slate-500 leading-normal">
                      Isi biodata Anda, lalu klik tombol kirim untuk mengirimkan spesifikasi pesanan Anda langsung ke kontak WA Admin kami demi proses konfirmasi instan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Nama Lengkap*</label>
                      <input
                        type="text"
                        id="form-input-name"
                        placeholder="Contoh: Ahmad Nanda"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-250 p-2 text-xs font-semibold rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">No. WhatsApp Aktif (Opsional)</label>
                      <input
                        type="text"
                        id="form-input-phone"
                        placeholder="Contoh: 08123456789"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-250 p-2 text-xs font-semibold rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Catatan Kustom (Detail Tambahan/Pertanyaan)</label>
                    <textarea
                      id="form-input-notes"
                      rows={2}
                      placeholder="Jelaskan detail gambar sablon, lokasi cetak lengan kiri, warna ritsleting, tenggat waktu acara, dll..."
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo((p) => ({ ...p, notes: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-250 p-2.5 text-xs font-medium rounded-lg outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                    />
                  </div>

                  {/* Submit Order via WhatsApp direct link */}
                  <button
                    id="btn-whatsapp-submit"
                    onClick={handleSendWhatsApp}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-display font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Kirim Spesifikasi Langsung ke WhatsApp</span>
                  </button>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveTab("design")}
                      className="px-5 py-2.5 border border-slate-250 text-slate-600 rounded-xl text-xs font-semibold"
                    >
                      Batal / Kembali
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono italic flex items-center shrink-0">
                      🔒 Data diproses secara lokal & personal
                    </span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
