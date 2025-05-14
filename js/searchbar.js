document.getElementById("searchbar_section").style.display = "none";
document.getElementById("searchbar_div").style.display = "none";
localStorage.setItem("searchbarActive", null);

let websites = [];
const websitesContainer = document.getElementById("websites-container");

function switchSearchbarVisibility() {
  if (document.getElementById("searchbar_div").style.display == "none") {
    document.getElementById("searchbar_div").style.display = "block";
  } else {
    document.getElementById("searchbar_div").style.display = "none";
  }
}
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

let searchbarActive = localStorage.getItem("searchbarActive");
const themeSwitch = document.getElementById("searchbarSwitch");
const searchbar_button = document.getElementById("searchbarSwitch");
const enableSearchbar = () => {
  searchbar_button.classList.add("searchbarActive");
  localStorage.setItem("searchbarActive", "active");
};

const disableSearchbar = () => {
  searchbar_button.classList.remove("searchbarActive");
  localStorage.setItem("searchbarActive", null);
};

if (searchbarActive === "active") enableSearchbar();

themeSwitch.addEventListener("click", () => {
  searchbarActive = localStorage.getItem("searchbarActive");
  if (searchbarActive !== "active") {
    enableSearchbar();
  } else {
    disableSearchbar();
  }
});

//USER CONTROLS LOGIC

document.addEventListener("DOMContentLoaded", () => {
  const authControls = document.getElementById("auth-controls");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    authControls.innerHTML = `
      <span>Welcome, ${user.username}!</span>
      <button id="logout-btn" style="margin-left: 10px;">Logout</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  } else {
    authControls.innerHTML = `
      <a class="txt-deco-none txt_header ae_bd" href="signup.html">SIGN UP</a>
      <a class="txt-deco-none txt_header ae_bd" href="login.html">LOGIN</a>
    `;
  }
});
