#!/usr/bin/env node

/**
 * Script pour mettre à jour les chemins des images dans products.ts
 * Remplace les anciennes images par les nouvelles images SVG générées
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapping des anciennes images vers les nouvelles
const imageMapping = {
  '/img/tshirt.png': '/img/products/classic-t-shirt.svg',
  '/img/hoodie.png': '/img/products/comfort-hoodie.svg',
  '/img/mug.png': '/img/products/stainless-steel-bottle.svg',
  '/img/sticker.png': '/img/products/design-handbook.svg'
};

// Fonction pour trouver la meilleure image SVG pour un produit
function findBestImage(productName, tags = []) {
  const imagesDir = join(__dirname, '../static/img/products');
  if (!existsSync(imagesDir)) return null;

  const availableImages = readdirSync(imagesDir)
    .filter(file => file.endsWith('.svg'))
    .map(file => file.replace('.svg', ''));

  // Recherche par nom exact
  const exactMatch = availableImages.find(img =>
    img.toLowerCase() === productName.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  );
  if (exactMatch) return `/img/products/${exactMatch}.svg`;

  // Recherche par mots-clés dans le nom
  const nameWords = productName.toLowerCase().split(/[^a-z0-9]+/);
  for (const word of nameWords) {
    if (word.length > 2) {
      const keywordMatch = availableImages.find(img => img.includes(word));
      if (keywordMatch) return `/img/products/${keywordMatch}.svg`;
    }
  }

  // Recherche par tags
  for (const tag of tags) {
    const tagMatch = availableImages.find(img => img.includes(tag.toLowerCase()));
    if (tagMatch) return `/img/products/${tagMatch}.svg`;
  }

  // Fallback par catégorie
  if (tags.includes('tshirt') || tags.includes('clothing')) {
    return '/img/products/classic-t-shirt.svg';
  }
  if (tags.includes('hoodie')) {
    return '/img/products/comfort-hoodie.svg';
  }
  if (tags.includes('electronics')) {
    return '/img/products/wireless-earbuds.svg';
  }
  if (tags.includes('book')) {
    return '/img/products/programming-guide.svg';
  }
  if (tags.includes('gaming')) {
    return '/img/products/rgb-keyboard.svg';
  }
  if (tags.includes('accessories')) {
    return '/img/products/leather-wallet.svg';
  }
  if (tags.includes('eco')) {
    return '/img/products/bamboo-toothbrush.svg';
  }

  // Image par défaut
  return '/img/products/classic-t-shirt.svg';
}

// Fonction principale de mise à jour
function updateProductImages() {
  console.log('🔄 MISE À JOUR DES IMAGES PRODUIT');
  console.log('='.repeat(60));

  const productsPath = join(__dirname, '../src/lib/services/products.ts');

  try {
    // Lire le fichier
    let content = readFileSync(productsPath, 'utf-8');
    console.log('📖 Fichier products.ts chargé');

    let updatedCount = 0;

    // Remplacer les anciennes images par les nouvelles
    for (const [oldPath, newPath] of Object.entries(imageMapping)) {
      const regex = new RegExp(`image:\\s*"${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
      const beforeCount = (content.match(regex) || []).length;

      if (beforeCount > 0) {
        content = content.replace(regex, `image: "${newPath}"`);
        console.log(`✅ ${oldPath} → ${newPath} (${beforeCount} remplacements)`);
        updatedCount += beforeCount;
      }
    }

    // Mettre à jour les autres produits avec des images appropriées
    const productRegex = /\{\s*id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]*)",\s*price:\s*(\d+),\s*currency:\s*"([^"]+)",\s*image:\s*"([^"]+)",\s*tags:\s*(\[[^\]]*\])/g;

    let match;
    while ((match = productRegex.exec(content)) !== null) {
      const [, id, slug, name, description, price, currency, currentImage, tagsStr] = match;

      // Ne pas remplacer si c'est déjà une image SVG
      if (currentImage.endsWith('.svg')) continue;

      // Parser les tags
      let tags = [];
      try {
        tags = JSON.parse(tagsStr.replace(/'/g, '"'));
      } catch (e) {
        // Si l'analyse échoue, extraire manuellement
        tags = tagsStr.match(/"([^"]+)"/g)?.map(t => t.slice(1, -1)) || [];
      }

      const newImage = findBestImage(name, tags);

      if (newImage && newImage !== currentImage) {
        const oldImagePattern = `image: "${currentImage}"`;
        const newImagePattern = `image: "${newImage}"`;

        content = content.replace(oldImagePattern, newImagePattern);
        console.log(`🎨 ${name}: ${currentImage} → ${newImage}`);
        updatedCount++;
      }
    }

    // Sauvegarder le fichier mis à jour
    writeFileSync(productsPath, content);
    console.log('='.repeat(60));
    console.log(`🎉 Mise à jour terminée ! ${updatedCount} images mises à jour`);
    console.log('');
    console.log('📂 Fichier mis à jour : src/lib/services/products.ts');
    console.log('');
    console.log('🌐 Les produits utilisent maintenant les nouvelles images SVG !');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour :', error.message);
    process.exit(1);
  }
}

// Exécuter la mise à jour
updateProductImages();
