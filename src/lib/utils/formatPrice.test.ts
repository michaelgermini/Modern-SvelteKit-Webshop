import { describe, expect, it } from 'vitest';
import { formatPrice, formatPriceSimple } from './formatPrice';

describe('formatPrice', () => {
	it('formate en EUR', () => {
		expect(formatPrice(1999, 'EUR')).toBe('19,99 €');
	});

	it('formate en USD', () => {
		expect(formatPrice(2500, 'USD')).toBe('$25.00');
	});

	it('formate en CHF', () => {
		expect(formatPrice(1200, 'CHF')).toBe('CHF 12.00');
	});

	it('gère les prix en centimes', () => {
		expect(formatPrice(100, 'EUR')).toBe('1,00 €');
		expect(formatPrice(50, 'EUR')).toBe('0,50 €');
	});
});

describe('formatPriceSimple', () => {
	it('formate simplement en EUR', () => {
		expect(formatPriceSimple(1999, 'EUR')).toBe('19.99 EUR');
	});

	it('formate simplement en USD', () => {
		expect(formatPriceSimple(2500, 'USD')).toBe('25.00 USD');
	});
});
