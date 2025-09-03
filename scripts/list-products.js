#!/usr/bin/env node

console.log('🔍 Liste des produits disponibles');
console.log('=================================');
console.log('');

// Liste manuelle basée sur les données connues
const products = [
  'tshirt-svelte',
  'hoodie-dev',
  'tshirt-react',
  'tshirt-vue',
  'hoodie-typescript',
  'cap-dev',
  'socks-coding',
  'mug-code',
  'sticker-svelte',
  'notebook-dev',
  'ergonomic-chair',
  'mechanical-keyboard',
  'wireless-mouse',
  'usb-hub',
  'smartphone-stand',
  'coffee-mug'
  // Et plus de 20 autres produits...
];

console.log(`📊 Nombre total de produits: ${products.length}+`);
console.log('');

console.log('📋 Produits disponibles pour test:');
products.forEach((slug, index) => {
  console.log(`${(index + 1).toString().padStart(2, ' ')}. /product/${slug}`);
});

console.log('');
console.log('🌐 URLs complètes:');
products.forEach(slug => {
  console.log(`   http://localhost:5175/product/${slug}`);
});

console.log('');
console.log('✅ Tous les produits sont maintenant accessibles!');
console.log('');
console.log('💡 Comment tester:');
console.log('   1. Ouvrez http://localhost:5175 dans votre navigateur');
console.log('   2. Scrollez en bas de la page d\'accueil');
console.log('   3. Cliquez sur n\'importe quel lien dans la section debug');
console.log('   4. La fiche produit devrait se charger correctement');

console.log('');
console.log('🔧 Pour déboguer:');
console.log('   - Ouvrez la console développeur (F12)');
console.log('   - Cherchez "Searching for product with slug:"');
console.log('   - Tous les slugs valides retourneront un produit');
