// Recipe filters

// Get elements by their IDs
var drinks = document.getElementById("drinks");
var meals = document.getElementById("meals");
var desserts = document.getElementById("desserts");
var games = document.getElementById("games");
var animatedMedia = document.getElementById("animated-media");
var printMedia = document.getElementById("print-media");
var liveActionMedia = document.getElementById("live-action-media");
var vegetarian = document.getElementById("vegetarian");
var dairyFree = document.getElementById("dairy-free");
var glutenFree = document.getElementById("gluten-free");
var recipes = document.querySelectorAll(".recipes-container .recipe");

// Function to filter recipes
function filterRecipes() {
  // Initializing an empty array for each category (drinks, meals, desserts) that will store the selected categories
  var selectedCategories = [];
  // If the checkbox is checked, the string is added to the selectedCategories array
  // The idea to use push was taken from this link: https://www.w3schools.com/jsref/jsref_push.asp
  if (drinks.checked) selectedCategories.push("drinks");
  if (meals.checked) selectedCategories.push("meals");
  if (desserts.checked) selectedCategories.push("desserts");

  var selectedMedia = [];
  if (games.checked) selectedMedia.push("games");
  if (animatedMedia.checked) selectedMedia.push("animated-media");
  if (printMedia.checked) selectedMedia.push("print-media");
  if (liveActionMedia.checked) selectedMedia.push("live-action-media");

  var selectedPreferences = [];
  if (vegetarian.checked) selectedPreferences.push("vegetarian");
  if (dairyFree.checked) selectedPreferences.push("dairy-free");
  if (glutenFree.checked) selectedPreferences.push("gluten-free");

  for (var i = 0; i < recipes.length; i++) {
    // Retrives attributes from the recipe elements
    var recipe = recipes[i];
    var recipeCategory = recipe.getAttribute("data-category");
    var recipeMedia = recipe.getAttribute("data-media");
    var recipePreferences = recipe.getAttribute("data-preferences");

    // Checks if the recipe matches the selected categories, media and preferences
    // Stores the results of the checks in the variables
    var matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(recipeCategory);

    // The recipeMedia and recipePreferences are strings, so it needs to be split into an array
    // The idea to use split was taken from this link: https://www.w3schools.com/jsref/jsref_split.asp
    var matchMedia =
      selectedMedia.length === 0 ||
      selectedMedia.every(function (media) {
        return recipeMedia.includes(media);
      });

    var matchPreferences =
      selectedPreferences.length === 0 ||
      selectedPreferences.every(function (pref) {
        return recipePreferences.includes(pref);
      });    

    //If the recipe matches the selected categories, media and preferences, the recipe is displayed
    //The idea to use block and none was taken from this link: https://www.w3schools.com/jsref/prop_style_display.asp
    if (matchCategory && matchMedia && matchPreferences) {
      recipe.style.display = "block";
    } else {
      recipe.style.display = "none";
    }
  }
}

// Idea to use change was taken from here: https://www.w3schools.com/jsref/event_onchange.asp
// Is triggered when the checkbox is changed
drinks.addEventListener("change", filterRecipes);
meals.addEventListener("change", filterRecipes);
desserts.addEventListener("change", filterRecipes);
games.addEventListener("change", filterRecipes);
animatedMedia.addEventListener("change", filterRecipes);
printMedia.addEventListener("change", filterRecipes);
liveActionMedia.addEventListener("change", filterRecipes);
vegetarian.addEventListener("change", filterRecipes);
dairyFree.addEventListener("change", filterRecipes);
glutenFree.addEventListener("change", filterRecipes);

// Initial filter on page load
filterRecipes();
