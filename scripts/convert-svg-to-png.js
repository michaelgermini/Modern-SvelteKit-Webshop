#!/usr/bin/env node

/**
 * Convertisseur SVG vers PNG
 * Utilise Sharp pour convertir les images SVG en PNG
 */

import { readdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Vérifier si Sharp est installé
async function checkSharpInstallation() {
  try {
    await import('sharp');
    return true;
  } catch (error) {
    console.log('📦 Sharp n\'est pas installé. Installation en cours...');
    return false;
  }
}

// Fonction principale de conversion
async function convertSVGtoPNG() {
  console.log('🔄 CONVERSION SVG → PNG');
  console.log('='.repeat(60));

  const sharpInstalled = await checkSharpInstallation();
  if (!sharpInstalled) {
    console.log('❌ Veuillez installer Sharp : npm install sharp');
    console.log('💡 Ou utilisez directement les SVG (recommandé)');
    return;
  }

  const sharp = await import('sharp');
  const svgDir = join(__dirname, '../static/img/products');
  const pngDir = join(__dirname, '../static/img/products/png');

  // Créer le dossier PNG s'il n'existe pas
  if (!existsSync(pngDir)) {
    const { mkdirSync } = await import('fs');
    mkdirSync(pngDir, { recursive: true });
  }

  if (!existsSync(svgDir)) {
    console.log('❌ Dossier SVG non trouvé. Générez d\'abord les SVG.');
    return;
  }

  const files = readdirSync(svgDir).filter(file => extname(file) === '.svg');
  console.log(`📁 ${files.length} fichiers SVG trouvés`);

  let convertedCount = 0;

  for (const file of files) {
    try {
      const svgPath = join(svgDir, file);
      const pngPath = join(pngDir, file.replace('.svg', '.png'));

      await sharp.default(svgPath)
        .resize(400, 400)
        .png({ quality: 90 })
        .toFile(pngPath);

      console.log(`✅ ${file} → ${file.replace('.svg', '.png')}`);
      convertedCount++;

    } catch (error) {
      console.error(`❌ Erreur conversion ${file}:`, error.message);
    }
  }

  console.log('='.repeat(60));
  console.log(`🎉 ${convertedCount} images converties avec succès !`);
  console.log('');
  console.log('📂 PNG sauvegardés dans : static/img/products/png/');
}

// Fonction d'optimisation
async function optimizeImages() {
  console.log('⚡ OPTIMISATION DES IMAGES');
  console.log('='.repeat(60));

  const sharpInstalled = await checkSharpInstallation();
  if (!sharpInstalled) {
    console.log('❌ Veuillez installer Sharp pour l\'optimisation');
    return;
  }

  const sharp = await import('sharp');
  const pngDir = join(__dirname, '../static/img/products/png');

  if (!existsSync(pngDir)) {
    console.log('❌ Dossier PNG non trouvé. Convertissez d\'abord les SVG.');
    return;
  }

  const files = readdirSync(pngDir).filter(file => extname(file) === '.png');
  console.log(`📁 ${files.length} fichiers PNG trouvés`);

  let optimizedCount = 0;

  for (const file of files) {
    try {
      const inputPath = join(pngDir, file);
      const outputPath = join(pngDir, `optimized_${file}`);

      await sharp.default(inputPath)
        .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath);

      console.log(`✅ ${file} optimisé`);
      optimizedCount++;

    } catch (error) {
      console.error(`❌ Erreur optimisation ${file}:`, error.message);
    }
  }

  console.log('='.repeat(60));
  console.log(`🎉 ${optimizedCount} images optimisées !`);
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔄 Convertisseur SVG → PNG

Usage: node scripts/convert-svg-to-png.js [options]

Options:
  --convert, -c    Convertir SVG vers PNG (défaut)
  --optimize, -o   Optimiser les PNG existants
  --help, -h       Afficher cette aide

Exemples:
  node scripts/convert-svg-to-png.js              # Convertir
  node scripts/convert-svg-to-png.js --optimize  # Optimiser
    `);
    return;
  }

  if (args.includes('--optimize') || args.includes('-o')) {
    await optimizeImages();
  } else {
    await convertSVGtoPNG();
  }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { convertSVGtoPNG, optimizeImages };
