document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").textContent = user.username;
  document.getElementById("email").textContent = user.email;

  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
