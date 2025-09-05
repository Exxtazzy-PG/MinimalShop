export const generateSearchSuggestions = (products, query) => {
  if (!query || query.length < 2) return [];

  const suggestions = new Set();
  
  products.forEach(product => {
    const name = product.name.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (name.includes(queryLower)) {
      suggestions.add(product.name);
    }
    
    // Add category suggestions
    if (product.category.toLowerCase().includes(queryLower)) {
      suggestions.add(product.category);
    }
  });

  return Array.from(suggestions).slice(0, 5);
};