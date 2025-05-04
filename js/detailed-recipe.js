async function loadRecipe() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("id");
  
    const response = await fetch('json/recipes.json');
    const data = await response.json();
  
    const recipe = data.find(r => r.id == id);
  
    if (recipe) {
      document.getElementById("detailed-recipe-title").innerText = recipe.name;
      document.getElementById("detailed-recipe-image").src = recipe.image;
      document.getElementById("detailed-recipe-description").innerText = recipe.time;
    } else {
        // In case, there is no recipe with the given id, we show a default message
      document.getElementById("detailed-recipe-title").innerText = "Recipe not found";
    }
  }
  
  loadRecipe();
  