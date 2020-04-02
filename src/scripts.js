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
const shoppingItemHolder = document.querySelector(".shopping-item-holder")
const recipesContainer = document.querySelector("#recipes-container");
const welcomeUserBanner = document.querySelector("#welcome-user-banner");
const searchRecipesButton = document.querySelector("#search-recipes-button");
const searchPantryButton = document.querySelector("#pantry-search-button");
const buyAllButton = document.querySelector("#buy-all-button");
const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
const chosenUser = new User(randomUser);
const chosenPantry = new Pantry(chosenUser, chosenUser.pantry)
const ingredientsList = ingredientsData.map(ingredient => new Ingredient(ingredient))

searchRecipesButton.addEventListener("click", searchRecipes);
searchPantryButton.addEventListener("click", searchPantry);
shoppingListButton.addEventListener("click", showShoppingList);
recipesToCookButton.addEventListener("click", showRecipeQueue);
favoriteRecipesButton.addEventListener("click", showFavoriteRecipes);
cookedRecipesButton.addEventListener("click", showCookedRecipes);
homeButton.addEventListener("click", returnHome);
recipesContainer.addEventListener("click", recipeButtonHandler);
buyAllButton.addEventListener("click", buyIngredients)


window.onload = displayData();

function returnHome() {
  let recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
  recipesContainer.classList.remove("hidden");
  shoppingItemHolder.classList.add("hidden");
  recipeCards.forEach(card => {
    card.classList.remove("hidden");
  })
}

function showCookedRecipes() {
  let cookButtons = Array.from(document.querySelectorAll('.cook-recipe-button'));
  recipesContainer.classList.remove("hidden");
  shoppingItemHolder.classList.add("hidden");
  cookButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.closest(".recipe-card").classList.add("hidden");
    }
  })
}

function showFavoriteRecipes() {
  let favoriteButtons = Array.from(document.querySelectorAll('.favorite-recipe-button'));
  recipesContainer.classList.remove("hidden");
  shoppingItemHolder.classList.add("hidden");
  favoriteButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.closest(".recipe-card").classList.add("hidden");
    }
  })
}

function showRecipeQueue() {
  let queueButtons = Array.from(document.querySelectorAll('.add-to-queue-button'));
  recipesContainer.classList.remove("hidden");
  shoppingItemHolder.classList.add("hidden");
  queueButtons.forEach(button => {
    if (!button.classList.contains("button-active")) {
      button.closest(".recipe-card").classList.add("hidden");
    }
  });
}

function showShoppingList() {
  recipesContainer.classList.add("hidden");
  shoppingItemHolder.classList.remove("hidden");
  chosenUser.shoppingList.forEach(neededIngredient => {
    getIngredientById(neededIngredient);
    console.log(chosenUser.shoppingList);
    shoppingItemHolder.innerHTML += `
    <section class="shopping-list-card">
      <div class="shopping-list-item-name capitalize">
        Needed Ingredient: ${neededIngredient.name}
      </div>
      <div class="shopping-list-item-amount capitalize">
        Amount Needed: ${neededIngredient.amount}
      </div>
      <div class="shopping-list-cost">
        Estimated Cost: ${neededIngredient.estimatedCostInCents}
    </section`
  })
}


function searchRecipes() {
  var recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
  for (var i = 0; i < recipeCards.length; i++) {
    var recipeName = recipeCards[i].querySelector('.recipe-name');
    var recipeIngredient = recipeCards[i].querySelector('.ingredients-box');
    var recipeTag = recipeCards[i].querySelector('.recipe-tags');
    if (recipeName.innerText.includes(searchRecipesInput.value) ||
          recipeIngredient.innerText.includes(searchRecipesInput.value) ||
          recipeTag.innerText.includes(searchRecipesInput.value)) {
          recipeCards[i].classList.remove('hidden');
        } else {
          recipeCards[i].classList.add('hidden');
        }
      }
}

function searchPantry() {
  var ingredientCards = Array.from(document.querySelectorAll('.ingredient-card'));
  console.log(ingredientCards.length);
  for (var i = 0; i < ingredientCards.length; i++) {
    var ingredientName = ingredientCards[i].querySelector('.ingredient-name');
    if (!ingredientName.innerText.includes(searchPantryInput.value)) {
      ingredientCards[i].classList.add('hidden');
    } else {
      ingredientCards[i].classList.remove('hidden');
    }
  }
}

function getIngredientById(ingredientBeingUsed) {
  ingredientsList.forEach(dataIngredient => {
    if (dataIngredient.id == ingredientBeingUsed.ingredient) {
      ingredientBeingUsed.name = dataIngredient.name;
      ingredientBeingUsed.estimatedCostInCents = dataIngredient.estimatedCostInCents;
    }
  })
}

function convertRecipeIdsToIngredientNames(recipe) {
  recipe.ingredients.forEach(ingredient => {
    ingredientsData.find(item => {
      if (ingredient.id === item.id) {
        ingredient.name = item.name;
        ingredient.estimatedCostInCents = item.estimatedCostInCents;
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
    // convertPantryIdsToIngredientNames(userPantry)
    getIngredientById(ingredient);
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
      ingredientsList,
      recipeData);
    newRecipe.ingredients.forEach(ingredient => {
      convertRecipeIdsToIngredientNames(newRecipe);
    })
    let instructions = newRecipe.instructions.map(instruction => `<li>${instruction.instruction}</li>`).join("\n");
    let ingredients = newRecipe.ingredients.map(ingredient => `<li>${ingredient.name}
      (${ingredient.quantity.amount}
       ${ingredient.quantity.unit})</li>`)
       .join("\n");
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
          <button class="recipe-button add-to-queue-button">Add Recipe to Cooking Queue</button>
          <button class="recipe-button cook-recipe-button">Cook This Recipe!</button>
        </div>
        <p class="capitalize recipe-tags">Tags: ${newRecipe.tags}</p>
      </div>
    </section>`
  });
}

function recipeButtonHandler() {
  if (event.target.classList.contains("favorite-recipe-button")) {
    favoriteRecipe(event);
  }
  if (event.target.classList.contains("add-to-queue-button")) {
    addToRecipeQueue(event);
  }
  if (event.target.classList.contains("cook-recipe-button")) {
    cookRecipe(event);
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

function addToRecipeQueue() {
  let chosenRecipe = recipeData.find(recipe => {
    return recipe.id == event.target.closest('.recipe-card').id;
  })
  if (event.target.classList.contains("button-active")) {
    chosenUser.removeFromRecipesToCook(chosenRecipe);
    event.target.classList.remove("button-active");
    event.target.innerText = "Add Recipe to Cooking Queue";
  } else {
    chosenUser.addRecipeToQueue(chosenRecipe);
    event.target.classList.add("button-active");
    event.target.innerText = "Recipe Added to Queue";
  };
}

function buyIngredients() {
    chosenPantry.pushToPantry(chosenUser.shoppingList);
    alert("Items Purchased");
}

function cookRecipe() {
  let chosenRecipe = recipeData.find(recipe => {
    return recipe.id == event.target.closest('.recipe-card').id;
  })
  console.log(chosenPantry.determineIfHasIngredients(chosenRecipe));
  if (chosenPantry.determineIfHasIngredients(chosenRecipe)) {
    chosenUser.addToRecipesCooked(chosenRecipe)
    event.target.classList.add("button-active");
    event.target.disabled = true;
    event.target.innerText = "Already Cooked!"
    alert("Yum! Used ingredients were removed from your pantry.");
  } else {
    chosenUser.pushToShoppingList(chosenPantry.getNeededIngredients(chosenRecipe))
    alert("Uh oh! You don't have enough ingredients. We added them to your shopping list.");
  }
}


// TODO:
// Instantiate all ingredients:
    // maybe when all of the recipes are
    // instantiated, we instantiate the ingredients
    // within each recipe

// Costs:
    // Shopping list:
        // calculate cost of all needed ingredients
        // have "buy all ingredients" button, adds to pantry
    // On recipe card, displays cost for recipe? (needed ingredients)

// Finish Tests:
    // Still a few tests to write for added methods in user & pantry
    // Make sure all methods are being used

// Refactor the three conversion of ID functions into one?

// Refactor for loops into forEach

// Rethink all of the imports of data into classes (ingredientsData, etc)

// Final CSS

// Finish Readme

// Organize the javascipt file

// Organize CSS (specifically organize the properties)

// IF WE HAVE TIME... maybe expandRecipeInfo()
