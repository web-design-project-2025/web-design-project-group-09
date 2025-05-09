document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    if (!email || !password) {
      showError("Please fill in both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Hash the input password to compare with stored hash
    const hashedInputPassword = await hashPassword(password);

    const user = users.find(
      (u) => u.email === email && u.password === hashedInputPassword
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      showSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "profile.html";
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

  // Hash password with SHA-256 and return as hex string
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
