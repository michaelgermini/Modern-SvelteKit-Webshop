export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;          // en cents
  currency: "EUR" | "CHF" | "USD";
  image: string;          // path static/… ou URL
  tags?: string[];
  stock?: number;
  active: boolean;
};
