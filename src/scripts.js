const headerButtonsContainer = document.querySelector(".header-buttons");
const allRecipesButton = document.querySelector("#all-recipes-button");
const homeButton = document.querySelector("#home-button");
const cookedRecipesButton = document.querySelector("#cooked-recipes-button");
const favoriteRecipesButton = document.querySelector("#favorite-recipes-button");
const recipesToCookButton = document.querySelector("#recipes-to-cook-button");
const shoppingListButton = document.querySelector("#shopping-list-button");
const searchPantryInput = document.querySelector("#search-pantry-input");
const searchRecipesInput = document.querySelector("#search-recipes-input");
const ingredientsContainer = document.querySelector("#ingredients-container");
const recipesContainer = document.querySelector("#recipes-container");
const welcomeUserBanner = document.querySelector("#welcome-user-banner");
const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
const chosenUser = new User(randomUser);

// headerButtonsContainer.addEventListener("click", filterMainPageRecipes);
searchPantryInput.addEventListener("input", searchPantry);
searchRecipesInput.addEventListener("input", searchRecipes);
shoppingListButton.addEventListener("click", showShoppingList);
recipesToCookButton.addEventListener("click", showRecipeQueue);
favoriteRecipesButton.addEventListener("click", showFavoriteRecipes);
cookedRecipesButton.addEventListener("click", showCookedRecipes);
homeButton.addEventListener("click", returnHome);
recipesContainer.addEventListener("click", recipeButtonHandler);


window.onload = displayData();

// function filterMainPageRecipes() {
//   // function that uses event delegation to show
//   // recipes based on which button was clicked
//   // if statement / iterator to decide which button was clicked on
//   // showAllRecipes();
//   // returnToMainPage();
//   // showCookedRecipes();
//   // showFavoriteRecipes();
//   // showRecipeQueue();
//
// }

function returnHome() {
  // called by filterMainPageRecipes
  // shows all available recipes if correct button is clicked
  // get rid of this function, make it just a home button
}


function showCookedRecipes() {

}

function showFavoriteRecipes() {
  let favoriteButtons = Array.from(document.querySelectorAll('.favorite-recipe-button'));
  favoriteButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.parentNode.parentNode.classList.add("hidden");
    }
  })
}

function showRecipeQueue() {
  // called by filterMainPageRecipes
  // shows a users queue of recipes to cook
  // if none, shows a message telling a user to add a recipe to the queue
}

function showShoppingList() {

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
  // ingredient, tag, or recipe name
  // let newRecipe = new Recipe(recipe,
  //   ingredientsData,
  //   recipeData);
  // return this.recipes.filter(recipe => {
  //   let matchingIngredient;
  //   return recipe.ingredients.find(ingredient => {
  //     matchingIngredient = this.ingredients.find(specificIngredient => {
  //       return specificIngredient.id === ingredient.id;
  //     });
  //     return (matchingIngredient.name.toLowerCase().includes(searchText)) ||
  //       (recipe.name.toLowerCase().includes(searchText.toLowerCase()))
  //   });
  // })
}



function convertRecipeIdsToIngredientNames(recipe) {
  recipe.ingredients.forEach(ingredient => {
    ingredientsData.find(item => {
      if (ingredient.id === item.id) {
        ingredient.name = item.name;
      }
    })
  })
}

function convertPantryIdsToIngredientNames(pantry) {
  pantry.forEach(ingredient => {
    ingredientsData.find(item => {
      if (ingredient.ingredient === item.id) {
        ingredient.name = item.name;
      }
    })
  })
}

function displayData() {
  displayUserInfo();
  displayRecipes();
}

function displayUserInfo() {
  let userPantry = chosenUser.pantry;
  welcomeUserBanner.innerHTML += `${chosenUser.name}`;
  userPantry.forEach(ingredient => {
    convertPantryIdsToIngredientNames(userPantry)
    ingredientsContainer.innerHTML+= `
    <section class="ingredient-card">
      <p class="ingredient-name capitalize">Ingredient: ${ingredient.name}</p>
      <p class="ingredient-amount">Amount: ${ingredient.amount}</p>
    </section>`
  });
  return chosenUser;
}

function displayRecipes() {
  recipeData.forEach(recipe => {
    let newRecipe = new Recipe(recipe,
      ingredientsData,
      recipeData);
    convertRecipeIdsToIngredientNames(newRecipe)
    let instructions = newRecipe.instructions.map(instruction => `<li>${instruction.instruction}</li>`).join("\n");
    let ingredients = newRecipe.ingredients.map(ingredient => `<li>${ingredient.name} (${ingredient.quantity.amount} ${ingredient.quantity.unit})</li>`).join("\n");
    recipesContainer.innerHTML += `
    <section class="recipe-card">
      <div class="recipe-name-container">
        <h2 class="recipe-name">${newRecipe.name}</h2>
        <button class="recipe-button favorite-recipe-button" id="${newRecipe.id}">Favorite This Recipe</button>
      </div>
      <div class="recipe-info-container">
        <div class="instructions-container">
          <h3 class="recipe-info-header">Cooking Instructions:<h3>
          <ol class="recipe-info">
            ${instructions}
          </ol>
        </div>
        <h3 class="recipe-info-header">Ingredients:<h3>
        <div class="ingredients-box">
          <ul class="recipe-info capitalize">
            ${ingredients}
          </ul>
          <img class="recipe-image" src=${newRecipe.image}>
        </div>
        <div class="recipe-buttons-container">
          <button class="recipe-button add-ingredients-button">Add Ingredients to Shopping List</button>
          <button class="recipe-button add-to-queue-button">Add Recipe to Cooking Queue</button>
        </div>
        <p class="capitalize">Tags: ${newRecipe.tags}</p>
      </div>
    </section>`
  });
}

function expandRecipeInfo() {
  // function that makes a specific recipe full-screen,
  // shows instructions and ingredients
}

function recipeButtonHandler() {
  if (event.target.classList.contains("favorite-recipe-button")) {
    favoriteRecipe(event);
  }
  if (event.target.classList.contains("add-ingredients-button")) {
    addToShoppingList(event);
  }
  if (event.target.classList.contains("add-to-queue-button")) {
    addToRecipeQueue(event);
  }
}

function favoriteRecipe(event) {
  let chosenRecipe = recipeData.find(recipe => {
    return recipe.id == event.target.id;
  })
  if (event.target.classList.contains("button-active")) {
    chosenUser.removeFromFavorites(chosenRecipe);
    event.target.classList.remove("button-active");
    event.target.innerText = "Favorite This Recipe";
    console.log('removed', chosenUser.favoriteRecipes);
  } else {
    chosenUser.addToFavorites(chosenRecipe);
    event.target.classList.add("button-active");
    event.target.innerText = "In My Favorites!";
    console.log('added', chosenUser.favoriteRecipes);
  }
}

function addToShoppingList() {
  // on-click of button on specific recipe
  // calls pantry.determineIfHasIngredients()
  // adds needed ingredients to users shopping list
}

function addToRecipeQueue() {
  // on-click of button on specific recipe
  // calls user.addRecipeToQueue()
  let chosenRecipe = recipeData.find(recipe => {
    return recipe.id == event.target.id;
  });
}

function cookRecipe() {
  // on-click of button on specific recipe
  // calls user.cookRecipe()
}
