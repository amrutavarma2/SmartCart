/**
 * Logic to link platform-specific products to global products
 */
const matchProducts = (platformItem, globalProducts) => {
  let bestMatch = null;
  let maxScore = 0;

  for (const product of globalProducts) {
    let score = 0;
    // 1. Exact Name Match
    if (platformItem.name.toLowerCase() === product.name.toLowerCase()) score += 100;
    
    // 2. Brand + Category Match
    if (platformItem.brand === product.brand) score += 40;
    
    // 3. Fuzzy match simulation (Simplified)
    if (platformItem.name.includes(product.brand)) score += 20;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = product;
    }
  }

  return { product: bestMatch, confidence: maxScore };
};

module.exports = { matchProducts };