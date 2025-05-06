document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    if (!email || !password) {
      showError("Please fill in both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store logged-in user info (for session/profile use)
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      showSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "profile.html"; // redirect after login
      }, 1500);
    } else {
      showError("Invalid email or password.");
    }
  });

  function showError(msg) {
    errorMessage.style.color = "red";
    errorMessage.textContent = msg;
  }

  function showSuccess(msg) {
    errorMessage.style.color = "green";
    errorMessage.textContent = msg;
  }
});
