let currentRecipe = null;

async function loadRecipe() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");

  const response = await fetch("json/recipes.json");
  const data = await response.json();

  // Find the recipe with the given id
  // The idea to use find() was taken from MDN
  // It returns the first recipe that matches the condition
  // We use == to allow for both string and number comparison
  const recipe = data.find((r) => r.id == id);

  if (recipe) {
    currentRecipe = recipe;

    document.getElementById("detailed-recipe-title").innerText = recipe.name;
    document.getElementById("detailed-recipe-image").src = recipe.image;

    renderIngredients(1);
    renderNutrition(1);

    // Extra tip
    const tipBox = document.getElementById("extra-tip-box");
    const tipText = document.getElementById("extra-tip");

    if (recipe.tip && recipe.tip.length > 0) {
      tipBox.style.display = "block";
      tipText.innerText = recipe.tip;
    }

    // Directions
    const directionsContainer = document.getElementById("directions-container");
    let directions = "";

    if (recipe.directions && recipe.directions.length > 0) {
      for (let i = 0; i < recipe.directions.length; i++) {
                // We call step the current step of the recipe for better readability

        const step = recipe.directions[i];
        directions += "<li>";

        // Step title
        if (step.title) {
          directions += `<strong>${step.title}</strong><br>`;
        }

        // Step description
        if (step.description) {
          directions += `<p>${step.description}</p>`;
        }

        // Step image
        if (step.image) {
        // The image property is optional, so we check if it exists before using it
          directions += `<img src="${step.image}" alt="Step ${i + 1} image">`;
        }

        directions += "</li>";
      }
    }

    directionsContainer.innerHTML = directions;
  } else {
    document.getElementById("detailed-recipe-title").innerText = "Recipe not found";
  }
}

// Rendering the ingredients list
// This function takes the number of servings as an argument and updates the ingredients list accordingly
// The ingredients are multiplied by the number of servings
function renderIngredients(servings = 1) {
  const ingredientsList = document.getElementById("ingredients-list");
  let ingredientsHTML = "";

  currentRecipe.ingredients.forEach((ingredient) => {
    // We multiple the base quantity by the sekected number of servings which is a number wso we can use it directly
    const total = ingredient.quantity * servings;
    ingredientsHTML += `<li>${ingredient.name}: ${total} ${ingredient.unit}</li>`;
  });

  ingredientsList.innerHTML = ingredientsHTML;
}

// Rendering the nutrition list
// It uses teh same principles as the renderIngredients function
function renderNutrition(servings = 1) {
  const nutritionList = document.getElementById("nutrition-list");
  let nutritionHTML = "";

  currentRecipe.nutrition.forEach((nutrition) => {
    const total = nutrition.quantity * servings;
    nutritionHTML += `<li>${nutrition.name}: ${total} ${nutrition.unit}</li>`;
  });

  nutritionList.innerHTML = nutritionHTML;
}

// Update servings and toggle selected button
function updateServings(servings) {
  renderIngredients(servings);
  renderNutrition(servings);

  const buttons = document.querySelectorAll(".singular-serving-button");

  for (let i = 0; i < buttons.length; i++) {
    const servingsButton = buttons[i];
    servingsButton.classList.remove("selected");

    if (servingsButton.textContent === servings + "x") {
      servingsButton.classList.add("selected");
    }
  }
}

loadRecipe();
