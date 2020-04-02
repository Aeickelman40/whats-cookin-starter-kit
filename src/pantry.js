class Pantry {
  constructor(user, pantry) {
    this.user = user;
    this.pantry = pantry;
  }
  determineIfHasIngredients(recipe) {
    var neededIngredients = this.getNeededIngredients(recipe);
    if (neededIngredients.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  getNeededIngredients(recipe) {
    let userNeeds = [];
    recipe.ingredients.forEach(recipeIngredient => {
      let pantryItem = this.pantry.find(currentPantryItem => {
        return recipeIngredient.id === currentPantryItem.ingredient;
      });
      if (pantryItem) {
        let difference = this.calculateDifference(recipeIngredient.quantity.amount, pantryItem.amount);
        if (difference > 0) {
          userNeeds.push({
            "ingredient": pantryItem.ingredient,
            "amount": difference
          });
        }
      } else {
        userNeeds.push({
          "ingredient": recipeIngredient.id,
          "amount": recipeIngredient.quantity.amount
        });
      }
    });
    return userNeeds;
  }
  pushToPantry(shoppingList) {
    shoppingList.forEach(shoppingIngredient => {
      let pantryItem = this.pantry.find(currentPantryItem => {
        return shoppingIngredient.ingredient == currentPantryItem.ingredient;
      });
      if (pantryItem) {
        pantryItem.amount = pantryItem.amount + shoppingIngredient.amount;
      } else {
        this.pantry.push({
          "ingredient": shoppingIngredient.ingredient,
          "amount": shoppingIngredient.amount,
          "name": shoppingIngredient.name,
          "estimatedCostInCents": shoppingIngredient.estimatedCostInCents
        });
      }
    })
    console.log('pantry', this.pantry);
  }
  calculateDifference(recipeAmount, pantryAmount) {
    let difference = recipeAmount - pantryAmount;
    return difference;
  }
  removeUsedIngredients(recipe) {
    let modifiedIngredientSupply = [];
    recipe.ingredients.forEach(recipeIngredient => {
      let pantryItem = this.pantry.find(currentPantryItem => {
        return recipeIngredient.id === currentPantryItem.ingredient;
      })
      let newIngredientAmount = pantryItem.amount - recipeIngredient.quantity.amount;
      modifiedIngredientSupply.push({
        "ingredient": recipeIngredient.id,
        "amount": newIngredientAmount
      })
    })
    this.pantry.forEach(oldIngredient => {
      let newIngredient = modifiedIngredientSupply.find(newIngredient => {
        if (oldIngredient.ingredient === newIngredient.ingredient) {
          oldIngredient.amount = newIngredient.amount;
        }
      })
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
