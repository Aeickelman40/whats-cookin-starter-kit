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
const searchRecipesButton = document.querySelector("#search-recipes-button");
const searchPantryButton = document.querySelector("#pantry-search-button");
const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
const chosenUser = new User(randomUser);

// headerButtonsContainer.addEventListener("click", filterMainPageRecipes);
searchRecipesButton.addEventListener("click", searchRecipes);
searchPantryButton.addEventListener("click", searchPantry);
// searchPantryInput.addEventListener("input", searchPantry);
// searchRecipesInput.addEventListener("input", searchRecipes);
shoppingListButton.addEventListener("click", showShoppingList);
recipesToCookButton.addEventListener("click", showRecipeQueue);
favoriteRecipesButton.addEventListener("click", showFavoriteRecipes);
cookedRecipesButton.addEventListener("click", showCookedRecipes);
homeButton.addEventListener("click", returnHome);
recipesContainer.addEventListener("click", recipeButtonHandler);


window.onload = displayData();

function returnHome() {
  let recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
  recipeCards.forEach(card => {
    card.classList.remove("hidden");
  })
}

function showCookedRecipes() {

}

function showFavoriteRecipes() {
  let favoriteButtons = Array.from(document.querySelectorAll('.favorite-recipe-button'));
  favoriteButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.closest(".recipe-card").classList.add("hidden");
    }
  })
}

function showRecipeQueue() {
  let queueButtons = Array.from(document.querySelectorAll('.add-to-queue-button'));
  queueButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.closest(".recipe-card").classList.add("hidden");
    }
  });
}

function showShoppingList() {

}


function searchRecipes() {
  var recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
  for (var i = 0; i < recipeCards.length; i++) {
    var recipeName = recipeCards[i].querySelector('.recipe-name');
    var recipeIngredient = recipeCards[i].querySelector('.recipe-info');
    var recipeTag = recipeCards[i].querySelector('.recipe-tags');
    if (recipeName.innerText.includes(searchRecipesInput.value) ||
          recipeIngredient.innerText.includes(searchRecipesInput.value) ||
          recipeTag.innerText.includes(searchRecipesInput.value)) {
          recipeCards[i].classList.remove('hidden');
        } else {
          recipeCards[i].classList.add('hidden');
        }
      }
  //   if (!recipeName.innerText.includes(searchRecipesInput.value) ||
  //     !recipeIngredient.innerText.includes(searchRecipesInput.value) ||
  //     !recipeTag.innerText.includes(searchRecipesInput.value)) {
  //     recipeCards[i].classList.add('hidden');
  //   } else {
  //     recipeCards[i].classList.remove('hidden');
  //   }
  // }
}

function searchPantry() {
  var ingredientCards = Array.from(document.querySelectorAll('.ingedient-card'));
  for (var i = 0; i < ingredientCards.length; i++) {
    var ingredientName = ingredientCards[i].querySelector('.ingredient- name');
    if (!ingredientName.innerText.includes(searchPantryInput.value)) {
      ingredientCards[i].classList.add('hidden');
    } else {
      ingredientCards[i].classList.remove('hidden');
    }
  }
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
    ingredientsContainer.innerHTML += `
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
    <section id="${newRecipe.id}" class="recipe-card">
      <div class="recipe-name-container">
        <h2 class="recipe-name">${newRecipe.name}</h2>
        <button class="recipe-button favorite-recipe-button">Favorite This Recipe</button>
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
        <p class="capitalize recipe-tags">Tags: ${newRecipe.tags}</p>
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
    return recipe.id == event.target.parentNode.parentNode.id;
  })
  if (event.target.classList.contains("button-active")) {
    chosenUser.removeFromFavorites(chosenRecipe);
    event.target.classList.remove("button-active");
    event.target.innerText = "Favorite This Recipe";
  } else {
    chosenUser.addToFavorites(chosenRecipe);
    event.target.classList.add("button-active");
    event.target.innerText = "In My Favorites!";
  }
}

function addToShoppingList() {
  // on-click of button on specific recipe
  // calls pantry.determineIfHasIngredients()
  // adds needed ingredients to users shopping list
}

function addToRecipeQueue() {
  let chosenRecipe = recipeData.find(recipe => {
    return recipe.id == event.target.closest('.recipe-card').id;
  })
  if (event.target.classList.contains("button-active")) {
    chosenUser.removeFromRecipesToCook(chosenRecipe);
    event.target.classList.remove("button-active");
    event.target.innerText = "Add Recipe to Cooking Queue";
    console.log('removed', chosenUser.recipesToCook)
  } else {
    chosenUser.addRecipeToQueue(chosenRecipe);
    event.target.classList.add("button-active");
    event.target.innerText = "Recipe Added to Queue";
    console.log('added', chosenUser.recipesToCook)
  };
}

function cookRecipe() {
  // on-click of button on specific recipe
  // calls user.cookRecipe()
}
