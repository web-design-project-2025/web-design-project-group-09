let recipes = [];
const recipesContainer = document.getElementById("recipes-container");

async function loadData() {
  const response = await fetch('json/recipes.json');
  const data = await response.json();
  recipes = data;
  renderRecipes();
}

function renderRecipes() {
  recipesContainer.innerHTML = "";

  for (let recipe of recipes) {
    const recipeElement = createRecipeElement(recipe);
    recipesContainer.appendChild(recipeElement);
  }
}

function createRecipeElement(recipe) {
  const figure = document.createElement("figure");
  figure.classList.add("recipe");

  // Add data attributes for filtering
  // These attributes will be used in the filtering function to check if the recipe matches the selected filters
  figure.setAttribute("data-id", recipe.id);
  figure.setAttribute("data-category", recipe.category);
  figure.setAttribute("data-media", recipe.media);
  figure.setAttribute("data-preferences", recipe.preferences.join(" "));

  // Create the image element
  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  figure.appendChild(img);

  // Create the title and details elements
  const title = document.createElement("strong");
  title.innerText = recipe.name;

  // Create the details element and set its attributes
  const details = document.createElement("p");
  details.classList.add("recipe-description");
  details.innerHTML = `${"★".repeat(recipe.rating)}<br>${recipe.time}`;

  // Create the caption element and append the title and details to it
  const caption = document.createElement("figcaption");
  caption.appendChild(title);
  caption.appendChild(details);

  figure.appendChild(caption);

  return figure;
}

loadData();

// Filtering
// Define your filter arrays
const categoryFilters = ["drinks", "meals", "desserts"];
const mediaFilters = ["games", "animated-media", "print-media", "live-action-media"];
const preferenceFilters = ["vegetarian", "dairy-free", "gluten-free"];

// Listen for checkbox changes
window.addEventListener("DOMContentLoaded", function() {
  // Concatenate all filter arrays into one to loop through them and add event listeners to each checkbox
  // Allows to easily add or remove filters without changing the code below
  const allFilters = categoryFilters.concat(mediaFilters, preferenceFilters);
  
  for (let i = 0; i < allFilters.length; i++) {
    const checkbox = document.getElementById(allFilters[i]);
    if (checkbox) {
      checkbox.addEventListener("change", filterRecipes);
    }
  }
});

// Filtering recipes function
function filterRecipes() {
  // Create empty arrays to store selected filters
  let selectedCategories = [];
  let selectedMedia = [];
  let selectedPreferences = [];

  // Get selected categories
  for (let i = 0; i < categoryFilters.length; i++) {
    const checkbox = document.getElementById(categoryFilters[i]);
    if (checkbox && checkbox.checked) {
      selectedCategories.push(categoryFilters[i]);
    }
  }

  // Get selected media
  for (let i = 0; i < mediaFilters.length; i++) {
    const checkbox = document.getElementById(mediaFilters[i]);
    if (checkbox && checkbox.checked) {
      selectedMedia.push(mediaFilters[i]);
    }
  }

  // Get selected preferences
  for (let i = 0; i < preferenceFilters.length; i++) {
    const checkbox = document.getElementById(preferenceFilters[i]);
    if (checkbox && checkbox.checked) {
      selectedPreferences.push(preferenceFilters[i]);
    }
  }

  // Filter recipes
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Match category
    // If a category is selected, check if the recipe's category matches any of the selected categories
    let matchesCategory = true;
    if (selectedCategories.length > 0) {
      if (Array.isArray(recipe.category)) {
        matchesCategory = false;
        for (let j = 0; j < selectedCategories.length; j++) {
          // Check if the recipe's category matches any of the selected categories
          if (recipe.category.indexOf(selectedCategories[j]) !== -1) {
            matchesCategory = true;
          }
        }
      } else {
        matchesCategory = selectedCategories.indexOf(recipe.category) !== -1;
      }
    }

    // Match media
    let matchesMedia = true;
    if (selectedMedia.length > 0) {
      if (Array.isArray(recipe.media)) {
        matchesMedia = false;
        for (let j = 0; j < selectedMedia.length; j++) {
          if (recipe.media.indexOf(selectedMedia[j]) !== -1) {
            matchesMedia = true;
          }
        }
      } else {
        matchesMedia = selectedMedia.indexOf(recipe.media) !== -1;
      }
    }

    // Match preferences
    let matchesPreferences = true;
    if (selectedPreferences.length > 0) {
      if (Array.isArray(recipe.preferences)) {
        for (let j = 0; j < selectedPreferences.length; j++) {
          if (recipe.preferences.indexOf(selectedPreferences[j]) === -1) {
            matchesPreferences = false;
          }
        }
      } else {
        matchesPreferences = false;
      }
    }

    if (matchesCategory && matchesMedia && matchesPreferences) {
      filteredRecipes.push(recipe);
    }
  }

  renderFilteredRecipes(filteredRecipes);
}

// Render filtered recipes
function renderFilteredRecipes(filteredList) {
  recipesContainer.innerHTML = "";

  for (let i = 0; i < filteredList.length; i++) {
    const recipeElement = createRecipeElement(filteredList[i]);
    recipesContainer.appendChild(recipeElement);
  }
}