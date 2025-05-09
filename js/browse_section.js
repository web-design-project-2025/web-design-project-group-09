let items = [];
const itemsContainer = document.getElementById("carousel-line");

async function loadSectionItems() {
  const response = await fetch("json/browse_items.json");
  const data = await response.json();
  items = data;
  renderSectionItems();
}

function renderSectionItems() {
  itemsContainer.innerHTML = "";

  for (let item of items) {
    const itemElement = createItemElement(item);
    itemsContainer.appendChild(itemElement);
  }
}

function createItemElement(item) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const a = document.createElement("a");
  a.href = "detailed-recipe.html?id=" + item.id;

  p.classList.add("ae_bd");
  p.classList.add("carousel_text");
  a.classList.add("txt-deco-none");
  div.classList.add("carousel_item");
  img.setAttribute("src", item.img);
  img.setAttribute("alt", item.alt);
  p.innerText = item.name;

  a.appendChild(img);
  a.appendChild(p);
  div.appendChild(a);

  return div;
}

function setupCarousel() {
  var track = document.querySelector(".carousel-line");
  var prevBtn = document.querySelector(".carousel-btn.prev");
  var nextBtn = document.querySelector(".carousel-btn.next");

  var index = 0;
  var totalAmount = track.children.length;
  console.log(totalAmount);
  var carouselItem = track.querySelector(".carousel_item");
  var itemWidth = carouselItem.offsetWidth + 16;

  var shownItems = 4;

  function updateCarousel() {
    var scrollItems = index * itemWidth;
    track.style.transform = "translateX(-" + scrollItems + "px)";
  }

  nextBtn.addEventListener("click", function () {
    if (index < totalAmount - shownItems) {
      index = index + 1;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (index > 0) {
      index = index - 1;
      updateCarousel();
    }
  });
}
// //call the carousel script after creating elements
loadSectionItems().then(() => setupCarousel());
