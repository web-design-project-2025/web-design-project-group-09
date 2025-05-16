document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();


    // Error handling is made in the same way as in the login.js file.
    // This code handles the signup process, including form submission, validation, and error handling.
    // Catch unexpected signup errors
    try {
      const username = document.getElementById("username-input").value.trim();
      const email = document.getElementById("email-input").value.trim();
      const password = document.getElementById("password-input").value.trim();
      const repeatPassword = document.getElementById("repeat-password-input").value.trim();

      if (!username || !email || !password || !repeatPassword) {
        showError("All fields are required.");
        return;
      }

      if (password !== repeatPassword) {
        showError("Passwords do not match.");
        return;
      }

      const usersRaw = localStorage.getItem("users");
      let users = [];

      // If the saved user data is broken or invalid JSON, this catches it
      try {
        users = usersRaw ? JSON.parse(usersRaw) : [];
      } catch (jsonError) {
        showError("Could not read saved user data.");
        return;
      }

      // Check if the email is already used
      if (users.some((user) => user.email === email)) {
        showError("Email already registered.");
        return;
      }

      // Try hashing the password (could fail if browser crypto is broken)
      const hashedPassword = await hashPassword(password);

      const newUser = { username, email, password: hashedPassword };
      users.push(newUser);

      // Saving new user to localStorage might fail (e.g. if browser blocks it)
      try {
        localStorage.setItem("users", JSON.stringify(users));
      } catch (storageError) {
        showError("Could not save your account. Check browser settings.");
        return;
      }

      showSuccess("Account created! Redirecting...");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);

    } catch (err) {
      console.error("Unexpected signup error:", err);
      showError("Something went wrong. Try again.");
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

  async function hashPassword(password) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    } catch (hashError) {
      console.error("Hashing failed:", hashError);
      throw new Error("Password hashing failed");
    }
  }
});
