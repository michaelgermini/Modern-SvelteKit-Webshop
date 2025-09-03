#!/usr/bin/env node

/**
 * Générateur simple d'images produit
 * Crée des images SVG de base pour les produits
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Liste des produits avec leurs informations de base
const products = [
  // T-shirts
  { name: 'Classic T-Shirt', slug: 'classic-t-shirt', category: 'clothing', color: '#FF6B6B' },
  { name: 'Graphic Tee', slug: 'graphic-tee', category: 'clothing', color: '#4ECDC4' },
  { name: 'Vintage T-Shirt', slug: 'vintage-t-shirt', category: 'clothing', color: '#45B7D1' },
  { name: 'Sport Tee', slug: 'sport-tee', category: 'clothing', color: '#96CEB4' },
  { name: 'Designer Shirt', slug: 'designer-shirt', category: 'clothing', color: '#FFEAA7' },
  { name: 'Limited Edition Tee', slug: 'limited-edition-tee', category: 'clothing', color: '#DDA0DD' },

  // Hoodies
  { name: 'Comfort Hoodie', slug: 'comfort-hoodie', category: 'clothing', color: '#8B4513' },
  { name: 'Zip Hoodie', slug: 'zip-hoodie', category: 'clothing', color: '#D2691E' },
  { name: 'Oversized Hoodie', slug: 'oversized-hoodie', category: 'clothing', color: '#CD853F' },

  // Accessoires
  { name: 'Leather Wallet', slug: 'leather-wallet', category: 'accessories', color: '#8B4513' },
  { name: 'Silicone Case', slug: 'silicone-case', category: 'accessories', color: '#2C3E50' },
  { name: 'Stainless Steel Bottle', slug: 'stainless-steel-bottle', category: 'accessories', color: '#7F8C8D' },
  { name: 'Canvas Tote Bag', slug: 'canvas-tote-bag', category: 'accessories', color: '#D2B48C' },
  { name: 'Wireless Earbuds', slug: 'wireless-earbuds', category: 'electronics', color: '#34495E' },
  { name: 'USB Hub', slug: 'usb-hub', category: 'electronics', color: '#BDC3C7' },
  { name: 'Portable Charger', slug: 'portable-charger', category: 'electronics', color: '#ECF0F1' },

  // Livres
  { name: 'Programming Guide', slug: 'programming-guide', category: 'books', color: '#8B4513' },
  { name: 'Design Handbook', slug: 'design-handbook', category: 'books', color: '#D2691E' },

  // Gaming
  { name: 'RGB Keyboard', slug: 'rgb-keyboard', category: 'gaming', color: '#E74C3C' },
  { name: 'Gaming Mouse', slug: 'gaming-mouse', category: 'gaming', color: '#9B59B6' },
  { name: 'Headset Stand', slug: 'headset-stand', category: 'gaming', color: '#1ABC9C' },

  // Sports
  { name: 'Running Shoes', slug: 'running-shoes', category: 'sports', color: '#E74C3C' },
  { name: 'Yoga Mat', slug: 'yoga-mat', category: 'sports', color: '#2ECC71' },

  // Éco-friendly
  { name: 'Bamboo Toothbrush', slug: 'bamboo-toothbrush', category: 'eco', color: '#27AE60' },
  { name: 'Reusable Bag', slug: 'reusable-bag', category: 'eco', color: '#2ECC71' }
];

// Fonction pour générer une image SVG pour un produit
function generateProductImage(product) {
  const { name, category, color } = product;

  // Fond avec dégradé
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(color, -30)};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Fond -->
  <rect width="100%" height="100%" fill="url(#bg)"/>

  <!-- Motif selon la catégorie -->
  ${generateCategoryPattern(category, color)}

  <!-- Icône du produit -->
  ${generateProductIcon(category, color)}

  <!-- Titre du produit -->
  <text x="50%" y="350" font-family="Arial, sans-serif" font-size="16" fill="white"
        text-anchor="middle" font-weight="bold">
    ${name}
  </text>

  <!-- Badge de catégorie -->
  <rect x="20" y="20" width="80" height="25" fill="rgba(255,255,255,0.2)" rx="12"/>
  <text x="60" y="36" font-family="Arial, sans-serif" font-size="12" fill="white"
        text-anchor="middle" font-weight="bold">
    ${category.toUpperCase()}
  </text>
</svg>`;

  return svg;
}

// Fonction pour ajuster la couleur
function adjustColor(color, amount) {
  const usePound = color[0] === '#';
  const col = usePound ? color.slice(1) : color;

  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = (num >> 8 & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;

  return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16);
}

// Fonction pour générer des motifs selon la catégorie
function generateCategoryPattern(category, color) {
  switch (category) {
    case 'clothing':
      return generateClothingPattern(color);
    case 'electronics':
      return generateElectronicsPattern(color);
    case 'accessories':
      return generateAccessoriesPattern(color);
    case 'gaming':
      return generateGamingPattern(color);
    case 'books':
      return generateBookPattern(color);
    case 'sports':
      return generateSportsPattern(color);
    case 'eco':
      return generateEcoPattern(color);
    default:
      return '';
  }
}

// Fonction pour générer l'icône du produit
function generateProductIcon(category, color) {
  const centerX = 200;
  const centerY = 180;

  switch (category) {
    case 'clothing':
      return `<path d="M${centerX-30} ${centerY} L${centerX+30} ${centerY} L${centerX+20} ${centerY+60} L${centerX-20} ${centerY+60} Z" fill="${adjustColor(color, 40)}" opacity="0.8"/>
              <circle cx="${centerX}" cy="${centerY-10}" r="15" fill="${adjustColor(color, 60)}" opacity="0.6"/>`;

    case 'electronics':
      return `<rect x="${centerX-25}" y="${centerY-20}" width="50" height="40" fill="${adjustColor(color, 40)}" opacity="0.8" rx="5"/>
              <circle cx="${centerX-10}" cy="${centerY}" r="3" fill="${adjustColor(color, 80)}"/>
              <circle cx="${centerX+10}" cy="${centerY}" r="3" fill="${adjustColor(color, 80)}"/>
              <rect x="${centerX-15}" y="${centerY+10}" width="30" height="4" fill="${adjustColor(color, 60)}"/>`;

    case 'accessories':
      return `<rect x="${centerX-20}" y="${centerY-15}" width="40" height="30" fill="${adjustColor(color, 40)}" opacity="0.8" rx="3"/>
              <circle cx="${centerX}" cy="${centerY+10}" r="8" fill="${adjustColor(color, 60)}" opacity="0.7"/>`;

    case 'gaming':
      return `<polygon points="${centerX},${centerY-20} ${centerX+20},${centerY+10} ${centerX-20},${centerY+10}" fill="${adjustColor(color, 40)}" opacity="0.8"/>
              <circle cx="${centerX}" cy="${centerY}" r="8" fill="${adjustColor(color, 80)}" opacity="0.9"/>`;

    case 'books':
      return `<rect x="${centerX-15}" y="${centerY-25}" width="30" height="50" fill="${adjustColor(color, 40)}" opacity="0.8"/>
              <line x1="${centerX-15}" y1="${centerY-10}" x2="${centerX+15}" y2="${centerY-10}" stroke="${adjustColor(color, 60)}" stroke-width="2"/>
              <line x1="${centerX-15}" y1="${centerY}" x2="${centerX+15}" y2="${centerY}" stroke="${adjustColor(color, 60)}" stroke-width="2"/>
              <line x1="${centerX-15}" y1="${centerY+10}" x2="${centerX+15}" y2="${centerY+10}" stroke="${adjustColor(color, 60)}" stroke-width="2"/>`;

    case 'sports':
      return `<ellipse cx="${centerX}" cy="${centerY}" rx="25" ry="15" fill="${adjustColor(color, 40)}" opacity="0.8"/>
              <circle cx="${centerX-8}" cy="${centerY-8}" r="3" fill="${adjustColor(color, 80)}"/>
              <circle cx="${centerX+8}" cy="${centerY-8}" r="3" fill="${adjustColor(color, 80)}"/>`;

    case 'eco':
      return `<path d="M${centerX} ${centerY-20} Q${centerX-20} ${centerY-10} ${centerX-10} ${centerY+20} Q${centerX} ${centerY+10} ${centerX+10} ${centerY+20} Q${centerX+20} ${centerY-10} ${centerX} ${centerY-20} Z" fill="${adjustColor(color, 40)}" opacity="0.8"/>
              <circle cx="${centerX}" cy="${centerY}" r="4" fill="${adjustColor(color, 80)}"/>`;

    default:
      return `<circle cx="${centerX}" cy="${centerY}" r="20" fill="${adjustColor(color, 40)}" opacity="0.8"/>`;
  }
}

// Fonctions pour les motifs de catégorie
function generateClothingPattern(color) {
  return `<rect x="0" y="100" width="400" height="10" fill="${adjustColor(color, 20)}" opacity="0.3"/>
          <rect x="0" y="130" width="400" height="10" fill="${adjustColor(color, 20)}" opacity="0.3"/>
          <rect x="0" y="160" width="400" height="10" fill="${adjustColor(color, 20)}" opacity="0.3"/>`;
}

function generateElectronicsPattern(color) {
  return `<circle cx="50" cy="50" r="3" fill="${adjustColor(color, 40)}" opacity="0.4"/>
          <circle cx="100" cy="80" r="3" fill="${adjustColor(color, 40)}" opacity="0.4"/>
          <circle cx="350" cy="60" r="3" fill="${adjustColor(color, 40)}" opacity="0.4"/>
          <circle cx="300" cy="100" r="3" fill="${adjustColor(color, 40)}" opacity="0.4"/>`;
}

function generateAccessoriesPattern(color) {
  return `<rect x="30" y="70" width="40" height="4" fill="${adjustColor(color, 30)}" opacity="0.3"/>
          <rect x="330" y="80" width="40" height="4" fill="${adjustColor(color, 30)}" opacity="0.3"/>
          <rect x="50" y="320" width="40" height="4" fill="${adjustColor(color, 30)}" opacity="0.3"/>`;
}

function generateGamingPattern(color) {
  return `<rect x="0" y="0" width="133" height="400" fill="${color}" opacity="0.1"/>
          <rect x="133" y="0" width="134" height="400" fill="${adjustColor(color, 40)}" opacity="0.1"/>
          <rect x="267" y="0" width="133" height="400" fill="${adjustColor(color, -20)}" opacity="0.1"/>`;
}

function generateBookPattern(color) {
  return `<rect x="40" y="50" width="320" height="300" fill="${adjustColor(color, 20)}" opacity="0.2"/>
          <line x1="40" y1="100" x2="360" y2="100" stroke="${adjustColor(color, 40)}" stroke-width="2" opacity="0.3"/>
          <line x1="40" y1="140" x2="360" y2="140" stroke="${adjustColor(color, 40)}" stroke-width="2" opacity="0.3"/>
          <line x1="40" y1="180" x2="360" y2="180" stroke="${adjustColor(color, 40)}" stroke-width="2" opacity="0.3"/>`;
}

function generateSportsPattern(color) {
  return `<ellipse cx="100" cy="100" rx="30" ry="20" fill="${adjustColor(color, 30)}" opacity="0.2"/>
          <ellipse cx="300" cy="150" rx="25" ry="15" fill="${adjustColor(color, 30)}" opacity="0.2"/>
          <ellipse cx="200" cy="300" rx="35" ry="25" fill="${adjustColor(color, 30)}" opacity="0.2"/>`;
}

function generateEcoPattern(color) {
  return `<path d="M50,100 Q100,50 150,100 Q100,150 50,100 Z" fill="${adjustColor(color, 20)}" opacity="0.2"/>
          <path d="M250,150 Q300,100 350,150 Q300,200 250,150 Z" fill="${adjustColor(color, 20)}" opacity="0.2"/>
          <path d="M150,250 Q200,200 250,250 Q200,300 150,250 Z" fill="${adjustColor(color, 20)}" opacity="0.2"/>`;
}

// Fonction principale
function generateAllImages() {
  console.log('🎨 GÉNÉRATION DES IMAGES PRODUIT');
  console.log('='.repeat(60));

  const imagesDir = join(__dirname, '../static/img/products');

  // Créer le dossier s'il n'existe pas
  if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir, { recursive: true });
    console.log('📁 Dossier créé : static/img/products/');
  }

  console.log(`📦 Génération de ${products.length} images...`);

  let generatedCount = 0;

  for (const product of products) {
    try {
      const svgContent = generateProductImage(product);
      const filename = `${product.slug}.svg`;
      const filepath = join(imagesDir, filename);

      writeFileSync(filepath, svgContent);
      console.log(`✅ ${filename}`);
      generatedCount++;

    } catch (error) {
      console.error(`❌ Erreur génération ${product.name}:`, error.message);
    }
  }

  console.log('='.repeat(60));
  console.log(`🎉 ${generatedCount} images générées avec succès !`);
  console.log('');
  console.log('📂 Images sauvegardées dans : static/img/products/');
  console.log('');
  console.log('🌐 Utilisation dans le code :');
  console.log('  <img src="/img/products/classic-t-shirt.svg" alt="Classic T-Shirt" />');
  console.log('');
  console.log('🎨 Caractéristiques :');
  console.log('  • Format SVG vectoriel (qualité parfaite)');
  console.log('  • 400x400 pixels');
  console.log('  • Icônes adaptées par catégorie');
  console.log('  • Motifs personnalisés');
  console.log('  • Badge de catégorie');
  console.log('  • Texte du produit intégré');
}

// Exécuter la génération
generateAllImages();
