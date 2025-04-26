let recipes = [];
const recipesContainer = document.getElementById("recipes-container"); // ← ✅ ADD THIS

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

  figure.setAttribute("data-id", recipe.id);
  figure.setAttribute("data-category", recipe.category);
  figure.setAttribute("data-media", recipe.media);
  figure.setAttribute("data-preferences", recipe.preferences.join(" "));

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  figure.appendChild(img);

  const title = document.createElement("strong");
  title.innerText = recipe.name;

  const details = document.createElement("p");
  details.classList.add("recipe-description");
  details.innerHTML = `${"★".repeat(recipe.rating)}<br>${recipe.time}`;

  const caption = document.createElement("figcaption");
  caption.appendChild(title);
  caption.appendChild(details);

  figure.appendChild(caption);

  return figure;
}

loadData();


