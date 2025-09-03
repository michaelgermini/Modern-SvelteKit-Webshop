# 🎯 Démonstration du Webshop SvelteKit

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Ouvrir http://localhost:5173 dans votre navigateur
```

## ✨ Fonctionnalités à tester

### 1. 🏠 Page d'accueil
- **URL** : `http://localhost:5173/`
- **Fonctionnalités** :
  - Hero section avec call-to-action
  - Grille des 4 produits
  - Section "Pourquoi nous choisir"

### 2. 🛍️ Catalogue des produits
- **Produits disponibles** :
  - T-shirt Svelte (25,00 €)
  - Mug Code (12,00 €)
  - Sticker Svelte (5,00 €)
  - Hoodie Développeur (45,00 €)

### 3. 🛒 Panier
- **URL** : `http://localhost:5173/cart`
- **Fonctionnalités** :
  - Ajouter des produits depuis la page d'accueil
  - Modifier les quantités
  - Supprimer des produits
  - Calcul automatique du total
  - Bouton de paiement Stripe

### 4. 📱 Produit individuel
- **URL** : `http://localhost:5173/product/[slug]`
- **Exemples** :
  - `/product/tshirt-svelte`
  - `/product/mug-code`
  - `/product/sticker-svelte`
  - `/product/hoodie-dev`

## 🔧 Configuration Stripe

Pour tester les paiements :

1. **Créer un compte Stripe** : https://stripe.com
2. **Récupérer les clés API** dans le dashboard
3. **Configurer le fichier `.env`** :

```env
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
PUBLIC_STRIPE_PK=pk_test_votre_cle_publique
BASE_URL=http://localhost:5173
```

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm run test

# Vérifier la qualité du code
npm run lint

# Formater le code
npm run format

# Vérifier les types TypeScript
npm run check
```

## 📱 Responsive Design

Le webshop est entièrement responsive :
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

## ♿ Accessibilité

- **Rôles ARIA** sur les composants
- **Navigation au clavier** supportée
- **Focus management** optimisé
- **Contraste** respectant les standards WCAG

## 🔍 SEO

- **Métadonnées** par page
- **URLs sémantiques** pour les produits
- **Breadcrumbs** de navigation
- **robots.txt** configuré

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📊 Structure des données

### Produit
```typescript
{
  id: "p1",
  slug: "tshirt-svelte",
  name: "T-shirt Svelte",
  description: "100% coton bio, impression Svelte",
  price: 2500,        // 25,00 € (en centimes)
  currency: "EUR",
  image: "/img/tshirt.png",
  tags: ["tshirt", "dev"],
  stock: 42,
  active: true
}
```

### Panier
```typescript
[
  {
    product: Product,
    qty: 2
  }
]
```

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.js` pour changer le thème :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',    // Couleur principale
        600: '#2563eb',
        700: '#1d4ed8'
      }
    }
  }
}
```

### Produits
Ajoutez vos produits dans `src/lib/services/products.ts`

### Styles
Modifiez `src/app.css` pour les styles personnalisés

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de build
```bash
npm run check
npm run lint
npm run format
```

### Problème Stripe
- Vérifiez vos clés API dans `.env`
- Utilisez les clés de test pour le développement
- Vérifiez les logs dans la console

## 📚 Ressources

- **SvelteKit** : https://kit.svelte.dev/
- **Tailwind CSS** : https://tailwindcss.com/
- **Stripe** : https://stripe.com/docs
- **TypeScript** : https://www.typescriptlang.org/

## 🎉 Félicitations !

Votre webshop SvelteKit est maintenant opérationnel ! 

Commencez à vendre en ligne avec une architecture moderne, performante et évolutive. 🚀
