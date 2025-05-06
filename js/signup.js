document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username-input").value.trim();
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();
    const repeatPassword = document
      .getElementById("repeat-password-input")
      .value.trim();

    if (!username || !email || !password || !repeatPassword) {
      showError("All fields are required.");
      return;
    }

    if (password !== repeatPassword) {
      showError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      showError("Email already registered.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showSuccess("Account created! Redirecting...");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
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
