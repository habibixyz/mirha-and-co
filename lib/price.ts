export function formatPrice(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

export function formatDiscount(mrp: number, price: number) {
  if (mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}