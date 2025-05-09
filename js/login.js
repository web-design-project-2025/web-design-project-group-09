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


    const hashedPassword = await hashPassword(password);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === hashedPassword

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
