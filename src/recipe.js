class Recipe {
  constructor(recipe, ingredientsData, recipeData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.recipeData = recipeData;
  }
  calculateCost() {
  let totalCost = 0;
  this.ingredients.forEach(currentIngredient => {
    this.ingredientsData.forEach(ingredient => {
      if (currentIngredient.id === ingredient.id) {
        totalCost += (ingredient.estimatedCostInCents * currentIngredient.quantity.amount) / 100;
      }
    });
  });
  return totalCost;
}
  getInstructions() {
    return this.instructions;
  }
  filterByTag(currentTag) {
    return this.recipeData.filter(recipe => recipe.tags.includes(currentTag))
  }
  filterByIngredient(selectedIngredient) {
    return this.recipeData.filter(recipe =>
      recipe.ingredients.find(ingredient =>
        ingredient.name === selectedIngredient))
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
