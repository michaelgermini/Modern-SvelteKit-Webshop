export function formatPrice(price: number, currency: string): string {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(price / 100);
}

export function formatPriceSimple(price: number, currency: string): string {
  return `${(price / 100).toFixed(2)} ${currency}`;
}
