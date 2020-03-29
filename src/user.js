const pantry = require()

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
    this.favoriteRecipes.forEach(recipe => {
      if (recipeToRemove === recipe) {
        this.favoriteRecipes.splice(recipeToRemove, 1);
      }
    })
  }
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




class Poster {
  constructor(url, title) {
    //PROPERTIES HERE
    //Ex: this.url = url;
    //Ex: this.title = title
  }
}

var poster1 = new Poster(url, title)
