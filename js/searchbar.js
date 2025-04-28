document.getElementById("searchbar_section").style.display = "none";

let websites = [];
const websitesContainer = document.getElementById("websites-container");

async function loadSites() {
  const response = await fetch("json/website_list_searchbar.json");
  const data = await response.json();
  websites = data;
  renderWebsites();
}

function renderWebsites() {
  websitesContainer.innerHTML = "";

  for (let website of websites) {
    const websiteElement = createWebsiteElement(website);
    websitesContainer.appendChild(websiteElement);
  }
}

function createWebsiteElement(website) {
  const a = document.createElement("a");
  const figure = document.createElement("figure");
  a.classList.add("website");
  a.classList.add("ae_rg");
  a.classList.add("searchlist");

  figure.setAttribute("data-id", website.id);

  a.setAttribute("href", website.link);

  const title = document.createElement("strong");
  title.innerText = website.name;

  const caption = document.createElement("figcaption");
  caption.appendChild(title);
  figure.appendChild(caption);
  a.appendChild(figure);

  return a;
}
loadSites();

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchbar_Input");
  filter = input.value.toUpperCase();
  section = document.getElementById("searchbar_section");
  li = section.getElementsByClassName("searchlist");

  for (i = 0; i < li.length; i++) {
    figcaption = li[i].getElementsByTagName("figcaption")[0];
    txtValue = figcaption.textContent || figcaption.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }

    if (filter.length > 0) {
      document.getElementById("searchbar_section").style.display = "block";
    } else {
      document.getElementById("searchbar_section").style.display = "none";
    }
  }
}
