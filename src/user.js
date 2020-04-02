class User {
  constructor(user, recipeData) {
    this.userId = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.recipesCooked = [];
    this.shoppingList = [];
    this.recipeData = recipeData;
  }
  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }
  removeFromFavorites(recipeToRemove) {
    let matchingRecipeIndex = this.favoriteRecipes.findIndex(recipe => {
      return recipeToRemove.id == recipe.id;
    })
    this.favoriteRecipes.splice(matchingRecipeIndex, 1);
  }
  cookRecipe(recipeToCook) {
    this.removeFromRecipesToCook(recipeToCook);
    this.addToRecipesCooked(recipeToCook);
    pantry.removeUsedIngredients(recipeToCook);
  }
  addRecipeToQueue(recipeToCook) {
    this.recipesToCook.push(recipeToCook)
  }
  removeFromRecipesToCook(recipeToRemove) {
    let matchingRecipeIndex = this.recipesToCook.findIndex(recipe => {
      return recipeToRemove.id == recipe.id;
    })
    this.recipesToCook.splice(matchingRecipeIndex, 1);
  }
  addToRecipesCooked(recipeCooked) {
    this.recipesCooked.push(recipeCooked);
  }
  pushToShoppingList(neededIngredients) {
    neededIngredients.forEach(ingredient => {
      this.shoppingList.push(ingredient);
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
