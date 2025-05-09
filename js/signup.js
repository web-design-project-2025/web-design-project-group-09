document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");


  form.addEventListener("submit", async function (e) {

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


    // Hash the password using SHA-256
    const hashedPassword = await hashPassword(password);

    const newUser = { username, email, password: hashedPassword };


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

  // Function to hash string with SHA-256
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

});
