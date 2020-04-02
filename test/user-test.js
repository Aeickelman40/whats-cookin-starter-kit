const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user');
const userData = require('../data/test-user.js');
const recipeData = require('../data/test-recipes.js');

describe('User', () => {
  beforeEach(() => {
    user = new User(userData, recipeData);
  });
  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to hold all ingredients in a pantry', function() {
    expect(user.pantry).to.deep.equal(user.pantry);
  });

  it('should be able to favorite a recipe', function() {
    let recipe1 = user.recipeData[0];
    let recipe2 = user.recipeData[1];

    user.addToFavorites(recipe1);

    expect(user.favoriteRecipes).to.deep.equal([recipe1]);
  });

  it('should be able to remove a favorite recipe', function() {
    let recipe1 = user.recipeData[0];

    user.addToFavorites(recipe1);
    expect(user.favoriteRecipes).to.deep.equal([recipe1]);

    user.removeFromFavorites(recipe1);
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should be able to cook a recipe', function() {
    let recipe1 = user.recipeData[0];

    user.cookRecipe(recipe1);
    expect(user.recipesCooked.length).to.equal(1);
  });

  it('should remove from recipes to cook', function() {
    let recipe1 = user.recipeData[0];

    user.addRecipeToQueue(recipe1);
    user.removeFromRecipesToCook(recipe1);
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should add to recipes cooked', function() {
    let recipe1 = user.recipeData[0];

    user.addToRecipesCooked(recipe1);
    expect(user.recipesCooked.length).to.equal(1);
  });
});
