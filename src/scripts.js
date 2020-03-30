const headerButtonsContainer = document.querySelector(".header-buttons");
const allRecipesButton = document.querySelector("#all-recipes-button");
const homeButton = document.querySelector("#home-button");
const cookedRecipesButton = document.querySelector("#cooked-recipes-button");
const favoriteRecipesButton = document.querySelector("#favorite-recipes-button");
const recipesToCookButton = document.querySelector("#recipes-to-cook-button");
const searchPantryInput = document.querySelector("#search-pantry-input");
const searchRecipesInput = document.querySelector("#search-recipes-input");
const ingredientsContainer = document.querySelector("#ingredients-container");
const recipesContainer = document.querySelector("#recipes-container");

headerButtonsContainer.addEventListener("click", filterMainPageRecipes);
searchPantryInput.addEventListener("input", searchPantry);
searchRecipesInput.addEventListener("input", searchRecipes);

window.onload = displayData();

function filterMainPageRecipes() {
  // function that uses event delegation to show
  // recipes based on which button was clicked
  // if statement / iterator to decide which button was clicked on
    // showAllRecipes();
    // returnToMainPage();
    // showCookedRecipes();
    // showFavoriteRecipes();
    // showRecipeQueue();
}

function showAllRecipes() {
  // called by filterMainPageRecipes
  // shows all available recipes if correct button is clicked
  // get rid of this function, make it just a home button
}


function showCookedRecipes() {
  // called by filterMainPageRecipes
  // shows all recipes a user has cooked
  // if none, shows a message telling a user to cook a recipe
}

function showFavoriteRecipes() {
  // called by filterMainPageRecipes
  // shows a users favorite recipes
  // if none, shows a message telling a user to favorite a recipe
}

function showRecipeQueue () {
  // called by filterMainPageRecipes
  // shows a users queue of recipes to cook
  // if none, shows a message telling a user to add a recipe to the queue
}

// function from checkyoself:
// function filterBySearch() {
//   var taskCards = Array.from(document.querySelectorAll('.task-card'));
//   for (var i = 0; i < taskCards.length; i++) {
//     var todoTitle = taskCards[i].querySelector('.card-title');
//     if (!todoTitle.innerText.includes(searchInput.value)) {
//       taskCards[i].classList.add('hide');
//     } else {
//       taskCards[i].classList.remove('hide');
//     }
//   }
// }

function searchPantry() {
  // function that searches the pantry by ingredient name
}

function searchRecipes() {
  // function that searches the recipes by
  // ingredient, tag, or recipe name  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      let matchingIngredient;
      return recipe.ingredients.find(ingredient => {
        matchingIngredient = this.ingredients.find(specificIngredient => {
          return specificIngredient.id === ingredient.id;
        });
        return (matchingIngredient.name.toLowerCase().includes(searchText)) ||
        (recipe.name.toLowerCase().includes(searchText.toLowerCase()))
      });
    })
  }

function displayData() {
  displayUserInfo();
  displayRecipes();
}

function displayUserInfo() {
  console.log(usersData);
    // instantiates user at random, shows name
    // instantiates pantry from user
    // dynamically creates cards for each ingredient in pantry
}

function displayRecipes() {
  recipeData.forEach(recipe => {
    let newRecipe = new Recipe(recipe,
      ingredientsData,
      recipeData);
    let instructions = newRecipe.instructions.map(instruction => `<li>${instruction.instruction}</li>`).join("\n");
    let ingredients = newRecipe.ingredients.map(ingredient => `<li>${ingredient.id} (${ingredient.quantity.amount} ${ingredient.quantity.unit})</li>`).join("\n");
    recipesContainer.innerHTML += `
    <section class="recipe-card">
      <div class="recipe-name-container">
        <p>${newRecipe.name}</p>
      </div>
      <div class="recipe-info-container">
        <div class="instructions-container">
          <ol>
            ${instructions}
          </ol>
        </div>
        <div class="ingredients-container">
          <ul>
            ${ingredients}
          </ul>
        </div>
        <img src=${newRecipe.image}>
        <p>Tags: ${newRecipe.tags}</p>
      </div>
    </section>`
  });
}

function expandRecipeInfo() {
  // function that makes a specific recipe full-screen,
  // shows instructions and ingredients
}

function favoriteRecipe() {
  // on-click of a star or some sort of favorite button
  // calls user.addToFavorites()
  // changes DOM to show recipe is now a favorite
}

function removeRecipeFromFavorites() {
  // on-click of a star or some sort of favorite button
  // calls user.removeFromFavorites()
  // changes DOM to show recipe is no longer a favorite
}

function showNeededIngredients() {
  // on-click of button on specific recipe
  // calls pantry.determineIfHasIngredients()
  // shows a list of needed ingredients with amounts
}

function addToShoppingList() {
  // on-click of button on specific recipe
  // calls pantry.determineIfHasIngredients()
  // adds needed ingredients to users shopping list
}

function cookRecipe() {
  // on-click of button on specific recipe
  // calls user.cookRecipe()
}
