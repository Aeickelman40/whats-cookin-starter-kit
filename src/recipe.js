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
    return this.ingredients.reduce((sum, ingredient) => {
      let matchingIngredient = this.ingredientsData.find(specificIngredient => {
        return specificIngredient.id === ingredient.id;
      });
      let dollars = (((matchingIngredient.estimatedCostInCents) * (ingredient.quantity.amount)) / 100)
      sum += dollars;
      return sum;
    }, 0)
  }
  convertIdsToIngredientNames() {
    
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
