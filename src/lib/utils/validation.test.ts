import { describe, expect, it } from 'vitest';

// Fonctions de validation à tester
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
}

function isValidPrice(price: number): boolean {
  return typeof price === 'number' && price >= 0 && price <= 1000000 && Number.isFinite(price);
}

function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 0 && quantity <= 10000;
}

function isValidProductName(name: string): boolean {
  return typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 200;
}

function isValidDescription(description: string): boolean {
  return typeof description === 'string' && description.trim().length >= 10 && description.trim().length <= 5000;
}

function sanitizeHtml(input: string): string {
  // Simple sanitization - in production use a proper library
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('user123@test-domain.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user.domain.com')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('isValidSlug', () => {
    it('validates correct slugs', () => {
      expect(isValidSlug('test-product')).toBe(true);
      expect(isValidSlug('product123')).toBe(true);
      expect(isValidSlug('a-b-c-d')).toBe(true);
      expect(isValidSlug('product-name-with-many-words')).toBe(true);
    });

    it('rejects invalid slugs', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug('ab')).toBe(false); // Too short
      expect(isValidSlug('a'.repeat(101))).toBe(false); // Too long
      expect(isValidSlug('Test Product')).toBe(false); // Uppercase
      expect(isValidSlug('test_product')).toBe(false); // Underscore
      expect(isValidSlug('test.product')).toBe(false); // Dot
      expect(isValidSlug('-test-')).toBe(false); // Leading/trailing hyphens
    });
  });

  describe('isValidPrice', () => {
    it('validates correct prices', () => {
      expect(isValidPrice(0)).toBe(true);
      expect(isValidPrice(10.99)).toBe(true);
      expect(isValidPrice(1000000)).toBe(true);
      expect(isValidPrice(999999.99)).toBe(true);
    });

    it('rejects invalid prices', () => {
      expect(isValidPrice(-1)).toBe(false);
      expect(isValidPrice(1000001)).toBe(false);
      expect(isValidPrice(NaN)).toBe(false);
      expect(isValidPrice(Infinity)).toBe(false);
      expect(isValidPrice(-Infinity)).toBe(false);
    });
  });

  describe('isValidQuantity', () => {
    it('validates correct quantities', () => {
      expect(isValidQuantity(0)).toBe(true);
      expect(isValidQuantity(1)).toBe(true);
      expect(isValidQuantity(100)).toBe(true);
      expect(isValidQuantity(10000)).toBe(true);
    });

    it('rejects invalid quantities', () => {
      expect(isValidQuantity(-1)).toBe(false);
      expect(isValidQuantity(10001)).toBe(false);
      expect(isValidQuantity(1.5)).toBe(false);
      expect(isValidQuantity(NaN)).toBe(false);
    });
  });

  describe('isValidProductName', () => {
    it('validates correct product names', () => {
      expect(isValidProductName('Test Product')).toBe(true);
      expect(isValidProductName('A')).toBe(false); // Too short
      expect(isValidProductName('A'.repeat(201))).toBe(false); // Too long
      expect(isValidProductName('   ')).toBe(false); // Only spaces
    });
  });

  describe('isValidDescription', () => {
    it('validates correct descriptions', () => {
      expect(isValidDescription('This is a valid description with enough content.')).toBe(true);
      expect(isValidDescription('Short')).toBe(false); // Too short
      expect(isValidDescription('A'.repeat(5001))).toBe(false); // Too long
    });
  });

  describe('sanitizeHtml', () => {
    it('sanitizes HTML correctly', () => {
      expect(sanitizeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;');
      expect(sanitizeHtml('<b>Bold</b>')).toBe('&lt;b&gt;Bold&lt;/b&gt;');
      expect(sanitizeHtml('"quotes"')).toBe('&quot;quotes&quot;');
    });
  });

  describe('generateSlug', () => {
    it('generates correct slugs', () => {
      expect(generateSlug('Test Product Name')).toBe('test-product-name');
      expect(generateSlug('Product with   multiple   spaces')).toBe('product-with-multiple-spaces');
      expect(generateSlug('Product-with_special.chars!')).toBe('product-with-specialchars');
      expect(generateSlug('  Trimmed Product  ')).toBe('trimmed-product');
    });
  });
});

// Export des fonctions pour les utiliser dans d'autres fichiers
export {
  isValidEmail,
  isValidSlug,
  isValidPrice,
  isValidQuantity,
  isValidProductName,
  isValidDescription,
  sanitizeHtml,
  generateSlug
};
