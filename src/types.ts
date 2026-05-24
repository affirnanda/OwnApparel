/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductType {
  id: string;
  name: string;
  category: "konveksi" | "printing" | "kebanyakan";
  basePrice: number;
  description: string;
  imagePlaceholder: string; // fallback shape representation or icon
  availableFabrics: string[];
  suggestedMethods: string[];
}

export interface FabricType {
  id: string;
  name: string;
  priceModifier: number;
  description: string;
}

export interface PrintMethodType {
  id: string;
  name: string;
  priceModifier: number;
  setupCost: number; // For low quantities
  description: string;
}

export interface SizeBreakdown {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface ConfiguratorState {
  product: string; // product id
  fabric: string; // fabric id
  printMethod: string; // print method id
  color: string; // hex or name
  designImage: string | null; // dataURL of uploaded design
  designScale: number; // 0.1 to 2
  designPositionX: number; // percentage offset
  designPositionY: number; // percentage offset
  designPlacement: "front" | "back";
  sizes: SizeBreakdown;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "kaos" | "polo" | "hoodie" | "merchandise";
  image: string;
  description: string;
  specs: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}
