// Noluthando Zondi ST10531705 MAST5112 POE Part 3
// utils/formatPrice.js
// turns 95 into "R 95.00" - used on Home, Edit and Statistics
// so the price always looks the same everywhere

export const formatPrice = (price) => `R ${Number(price).toFixed(2)}`;