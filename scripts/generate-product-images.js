#!/usr/bin/env node

/**
 * Générateur d'images produit
 * Crée des images SVG réalistes pour tous les produits
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Couleurs et thèmes par catégorie
const categoryThemes = {
  clothing: {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
    patterns: ['solid', 'striped', 'dotted']
  },
  electronics: {
    colors: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
    patterns: ['solid', 'tech']
  },
  accessories: {
    colors: ['#E74C3C', '#9B59B6', '#3498DB', '#2ECC71', '#F39C12', '#1ABC9C'],
    patterns: ['solid', 'leather', 'metal']
  },
  home: {
    colors: ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#D2B48C'],
    patterns: ['solid', 'wood', 'fabric']
  },
  sports: {
    colors: ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'],
    patterns: ['solid', 'neon']
  },
  books: {
    colors: ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887'],
    patterns: ['solid', 'book']
  },
  gaming: {
    colors: ['#2C3E50', '#34495E', '#E74C3C', '#F39C12', '#9B59B6', '#1ABC9C'],
    patterns: ['solid', 'rgb', 'gaming']
  },
  eco: {
    colors: ['#27AE60', '#2ECC71', '#3498DB', '#9B59B6', '#1ABC9C'],
    patterns: ['solid', 'leaf', 'eco']
  }
};

// Fonctions utilitaires pour générer des images SVG
function generateProductSVG(product, category) {
  const theme = categoryThemes[category] || categoryThemes.clothing;
  const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
  const pattern = theme.patterns[Math.floor(Math.random() * theme.patterns.length)];

  let svgContent = '';

  // Fond dégradé
  svgContent += `
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustColor(color, -20)};stop-opacity:1" />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#bg)"/>
  `;

  // Ajouter des motifs selon le type
  switch (pattern) {
    case 'striped':
      svgContent += generateStripedPattern(color);
      break;
    case 'dotted':
      svgContent += generateDottedPattern(color);
      break;
    case 'tech':
      svgContent += generateTechPattern(color);
      break;
    case 'rgb':
      svgContent += generateRGBPattern();
      break;
    case 'leaf':
      svgContent += generateLeafPattern(color);
      break;
    case 'wood':
      svgContent += generateWoodPattern(color);
      break;
    case 'book':
      svgContent += generateBookPattern(color);
      break;
  }

  // Ajouter le titre du produit
  const words = product.name.split(' ');
  const shortName = words.length > 3 ? words.slice(0, 3).join(' ') : product.name;

  svgContent += `
    <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="14" fill="white"
          text-anchor="middle" font-weight="bold">
      ${shortName}
    </text>
  `;

  return svgContent;
}

function adjustColor(color, amount) {
  // Fonction simple pour ajuster la luminosité d'une couleur hex
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

function generateStripedPattern(color) {
  let pattern = '';
  for (let i = 0; i < 400; i += 20) {
    pattern += `<rect x="0" y="${i}" width="400" height="10" fill="${adjustColor(color, i % 40 === 0 ? 30 : -10)}" opacity="0.3"/>`;
  }
  return pattern;
}

function generateDottedPattern(color) {
  let pattern = '';
  for (let x = 20; x < 380; x += 30) {
    for (let y = 20; y < 380; y += 30) {
      pattern += `<circle cx="${x}" cy="${y}" r="3" fill="${adjustColor(color, 40)}" opacity="0.4"/>`;
    }
  }
  return pattern;
}

function generateTechPattern(color) {
  return `
    <rect x="20" y="20" width="360" height="360" fill="none" stroke="${adjustColor(color, 60)}" stroke-width="2" rx="10"/>
    <circle cx="200" cy="150" r="40" fill="${adjustColor(color, 40)}" opacity="0.6"/>
    <rect x="160" y="120" width="80" height="60" fill="${adjustColor(color, 20)}" opacity="0.5" rx="5"/>
    <circle cx="180" cy="140" r="8" fill="${adjustColor(color, 80)}"/>
    <circle cx="220" cy="140" r="8" fill="${adjustColor(color, 80)}"/>
    <rect x="170" y="160" width="60" height="4" fill="${adjustColor(color, 60)}"/>
  `;
}

function generateRGBPattern() {
  return `
    <rect x="0" y="0" width="133" height="400" fill="#FF0000" opacity="0.3"/>
    <rect x="133" y="0" width="134" height="400" fill="#00FF00" opacity="0.3"/>
    <rect x="267" y="0" width="133" height="400" fill="#0000FF" opacity="0.3"/>
    <text x="200" y="200" font-family="Arial, sans-serif" font-size="24" fill="white"
          text-anchor="middle" font-weight="bold">
      RGB
    </text>
  `;
}

function generateLeafPattern(color) {
  return `
    <path d="M200,50 Q150,100 180,200 Q200,250 220,200 Q250,100 200,50 Z"
          fill="${adjustColor(color, 20)}" opacity="0.6"/>
    <path d="M200,80 Q170,120 185,180 Q200,220 215,180 Q230,120 200,80 Z"
          fill="${adjustColor(color, 40)}" opacity="0.4"/>
    <circle cx="200" cy="150" r="3" fill="${adjustColor(color, 60)}"/>
  `;
}

function generateWoodPattern(color) {
  let pattern = '';
  for (let i = 0; i < 400; i += 8) {
    const opacity = 0.1 + (Math.random() * 0.2);
    pattern += `<rect x="0" y="${i}" width="400" height="4" fill="${adjustColor(color, Math.random() * 40 - 20)}" opacity="${opacity}"/>`;
  }
  return pattern;
}

function generateBookPattern(color) {
  return `
    <rect x="80" y="60" width="240" height="280" fill="${adjustColor(color, 20)}" rx="5"/>
    <rect x="90" y="80" width="220" height="240" fill="${adjustColor(color, -10)}" rx="3"/>
    <line x1="90" y1="120" x2="310" y2="120" stroke="${adjustColor(color, 40)}" stroke-width="2"/>
    <line x1="90" y1="160" x2="310" y2="160" stroke="${adjustColor(color, 40)}" stroke-width="2"/>
    <line x1="90" y1="200" x2="310" y2="200" stroke="${adjustColor(color, 40)}" stroke-width="2"/>
    <line x1="90" y1="240" x2="310" y2="240" stroke="${adjustColor(color, 40)}" stroke-width="2"/>
    <line x1="90" y1="280" x2="310" y2="280" stroke="${adjustColor(color, 40)}" stroke-width="2"/>
  `;
}

// Fonction principale pour générer les images
async function generateProductImages() {
  console.log('🎨 GÉNÉRATION DES IMAGES PRODUIT');
  console.log('='.repeat(60));

  try {
    // Charger les produits depuis le fichier services
    const productsPath = join(__dirname, '../src/lib/services/products.ts');
    const productsContent = readFileSync(productsPath, 'utf-8');

    // Extraire les produits avec une regex
    const productsMatch = productsContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
    if (!productsMatch) {
      throw new Error('Impossible de trouver la définition des produits');
    }

    // Parser les produits (simplifié)
    const productsText = productsMatch[1];
    const productMatches = productsText.match(/\{[^}]*\}/g) || [];

    console.log(`📦 ${productMatches.length} produits trouvés`);

    // Créer le dossier images s'il n'existe pas
    const imagesDir = join(__dirname, '../static/img/products');
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir, { recursive: true });
      console.log('📁 Dossier images créé');
    }

    let generatedCount = 0;

    // Générer une image pour chaque produit
    for (let i = 0; i < productMatches.length; i++) {
      const productText = productMatches[i];

      // Extraire les informations du produit
      const nameMatch = productText.match(/name:\s*"([^"]+)"/);
      const tagsMatch = productText.match(/tags:\s*\[([^\]]*)\]/);

      if (nameMatch) {
        const productName = nameMatch[1];
        let category = 'clothing'; // défaut

        if (tagsMatch) {
          const tagsText = tagsMatch[1];
          // Déterminer la catégorie principale
          if (tagsText.includes('gaming')) category = 'gaming';
          else if (tagsText.includes('electronics')) category = 'electronics';
          else if (tagsText.includes('accessories')) category = 'accessories';
          else if (tagsText.includes('home') || tagsText.includes('garden')) category = 'home';
          else if (tagsText.includes('sports')) category = 'sports';
          else if (tagsText.includes('book')) category = 'books';
          else if (tagsText.includes('eco') || tagsText.includes('sustainable')) category = 'eco';
        }

        // Générer le SVG
        const svgContent = generateProductSVG({ name: productName }, category);

        // Créer le fichier SVG complet
        const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  ${svgContent}
</svg>`;

        // Générer le nom de fichier
        const slug = productName.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        const filename = `${slug}.svg`;
        const filepath = join(imagesDir, filename);

        // Écrire le fichier
        writeFileSync(filepath, fullSvg);

        console.log(`✅ ${filename} (${category})`);
        generatedCount++;
      }
    }

    console.log('='.repeat(60));
    console.log(`🎉 ${generatedCount} images générées avec succès !`);
    console.log('');
    console.log('📂 Images sauvegardées dans : static/img/products/');
    console.log('');
    console.log('🌐 Utilisation dans le code :');
    console.log('  <img src="/img/products/nom-du-produit.svg" alt="Nom du produit" />');
    console.log('');
    console.log('🎨 Caractéristiques des images :');
    console.log('  • Format SVG vectoriel (évolutif)');
    console.log('  • 400x400 pixels');
    console.log('  • Couleurs adaptées par catégorie');
    console.log('  • Motifs personnalisés');
    console.log('  • Texte du produit intégré');

  } catch (error) {
    console.error('❌ Erreur lors de la génération des images :', error.message);
    process.exit(1);
  }
}

// Fonction pour générer des images PNG (si nécessaire)
async function generateProductPNGs() {
  console.log('📷 GÉNÉRATION DES IMAGES PNG');
  console.log('='.repeat(60));

  // Cette fonction pourrait utiliser une bibliothèque comme sharp ou canvas
  // Pour l'instant, on indique simplement comment procéder
  console.log('💡 Pour générer des PNG depuis les SVG :');
  console.log('   npm install sharp');
  console.log('   node scripts/convert-svg-to-png.js');
  console.log('');
  console.log('📦 Alternative : Utiliser les SVG directement');
  console.log('   • Support natif dans tous les navigateurs modernes');
  console.log('   • Taille de fichier optimisée');
  console.log('   • Évolutivité parfaite');
}

// Fonction pour optimiser les images
async function optimizeImages() {
  console.log('⚡ OPTIMISATION DES IMAGES');
  console.log('='.repeat(60));

  console.log('🔧 Outils d\'optimisation recommandés :');
  console.log('   • SVGO pour les SVG');
  console.log('   • sharp pour les conversions');
  console.log('   • imagemin pour les PNG/JPG');
  console.log('');
  console.log('📊 Avantages des SVG :');
  console.log('   • Taille réduite');
  console.log('   • Qualité parfaite à toutes les résolutions');
  console.log('   • Personnalisation facile');
  console.log('   • Animation possible');
}

// Exécuter la génération
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🎨 Générateur d'Images Produit

Usage: node scripts/generate-product-images.js [options]

Options:
  --svg, -s       Générer les images SVG (défaut)
  --png, -p       Générer les images PNG
  --optimize, -o  Optimiser les images existantes
  --help, -h      Afficher cette aide

Exemples:
  node scripts/generate-product-images.js          # Générer SVG
  node scripts/generate-product-images.js --png   # Générer PNG
  node scripts/generate-product-images.js --optimize # Optimiser
    `);
    return;
  }

  if (args.includes('--png') || args.includes('-p')) {
    await generateProductPNGs();
  } else if (args.includes('--optimize') || args.includes('-o')) {
    await optimizeImages();
  } else {
    await generateProductImages();
  }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateProductSVG, generateProductImages };
