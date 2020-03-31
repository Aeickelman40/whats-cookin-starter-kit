class User {
  constructor(user, recipeData, ingredientsData) {
    this.userId = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.recipesCooked = [];
    this.shoppingList = [];
    // check for usage
    this.recipeData = recipeData;
    this.ingredientsData = ingredientsData;
  }
  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }
  removeFromFavorites(recipeToRemove) {
    let matchingRecipe = this.favoriteRecipes.find(recipe => {
      return recipeToRemove.id == recipe.id;
    })
    console.log('matching', matchingRecipe);
    this.favoriteRecipes.splice(matchingRecipe, 1);
  }
  // try for loop 
  cookRecipe(recipeToCook) {
    this.removeFromRecipesToCook(recipeToCook);
    this.addToRecipesCooked(recipeToCook);
    pantry.removeUsedIngredients(recipeToCook);
  }
  removeFromRecipesToCook(recipeToCook) {
    return this.recipesToCook.find(recipe => {
      return recipeToCook.id === recipe.id;
    })
  }
  addToRecipesCooked(recipeCooked) {
    this.recipesCooked.push(recipeCooked);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
