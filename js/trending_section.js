let trendingItems = [];
const trendingContainer = document.getElementById("trending_div");

async function loadSectionItems() {
  const response = await fetch("json/trending_items.json");
  const data = await response.json();
  trendingItems = data;
  renderTrendingItems();
}

function renderTrendingItems() {
  trendingContainer.innerHTML = "";

  for (let trendingItem of trendingItems) {
    const trendingElement = createtrendingElement(trendingItem);
    trendingContainer.appendChild(trendingElement);
  }
}

function createtrendingElement(trendingItem) {
  const article = document.createElement("article");
  const a = document.createElement("a");
  const img_div = document.createElement("div");
  const text_div = document.createElement("div");
  const img = document.createElement("img");
  const texth2 = document.createElement("h2");
  const span = document.createElement("span");
  a.href = "detailed-recipe.html?id=" + trendingItem.id;

  article.classList.add("big_img");
  img_div.classList.add("trending_img");
  text_div.classList.add("trending_text_content");
  img.setAttribute("src", trendingItem.img);
  img.setAttribute("alt", trendingItem.alt);
  img.classList.add("trending_img");
  texth2.classList.add("trending_text");
  span.innerText = trendingItem.name;

  texth2.appendChild(span);
  text_div.appendChild(texth2);
  img_div.appendChild(img);
  a.appendChild(img_div);
  a.appendChild(text_div);
  article.appendChild(a);

  return article;
}

loadSectionItems();
