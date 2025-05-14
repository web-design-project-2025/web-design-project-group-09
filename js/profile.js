document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Redirect to login page if no user is logged in
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Display user info in profile
  const usernameEl = document.getElementById("username");
  const emailEl = document.getElementById("email");

  if (usernameEl) usernameEl.textContent = user.username;
  if (emailEl) emailEl.textContent = user.email;

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
