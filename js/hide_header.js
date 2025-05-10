const header = document.querySelector(".header");
let lastPosition = 0;

window.addEventListener("scroll", () => {
  let scrollUp = window.scrollY;

  if (scrollUp > lastPosition) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  if (scrollUp === 0) {
    header.classList.remove("header-hidden");
  }

  lastPosition = scrollUp;
});
