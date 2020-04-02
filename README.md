# What's Cookin'?

The What's Cookin'? Project is a paired project for Front End Module 2 students at the Turing School of Software and Design. The idea behind the project was to build a site in which users can view recipes, add recipes to cook, view their favorite recipes, and generate a shopping list based on ingredients needed. The main goals of this project were to structure code progression based around Test Driven Design, ES6 classes, and have functions and methods utilize a Singular Responsibility Principal. 

## Contributors

[Collin Kallery](https://github.com/collinkallery)

[Alex Eickelman](https://github.com/Aeickelman40)

## Installing / Getting started

To install and view, run the following commands in your terminal:
```
git clone git@github.com:Aeickelman40/whats-cookin-starter-kit.git
```
cd into the cloned repository
```
npm install
npm run 
cd src
open index.html
```

## Features

While navigating through the website, you will notice a number of key features:

- Unique buttons for the users previously cooked recipes, favorite recipes, recipes they plan on cooking, and a shopping list of required ingredients needed by the user.

- A search bar that can filter desired recipes by the name, ingredients, or tags.

- A search bar to filter items located within the users pantry. 

- Each displayed recipe will have a name, picture for reference, instructions, ingredients, tags, a 3 buttons (favorite this recipe, add the recipe to cooking queue, and request to cook recipe).

- When a user requests to cook a recipe, a function will run that checks the required ingredients with what the user has in the pantry. The DOM will update accordingly to remove ingredients from the pantry and a message will appear notifying the user whether they have all required ingredients or not. If not, the ingredients will be added to the users shopping list. 

## In Action

![](Whats Cookin' ex1.gif)
