document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    /* The idea to use try-catch blocks is to isolate different parts of the code and handle errors in a more granular way.
    This way, if one part fails, it doesn't break the entire process.
    For example, if the JSON parsing fails, we can catch that and show a specific error message instead of crashing the whole login process.
    The idea to use it was taken from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    Also here: https://javascript.info/try-catch
    The idea to use error hadling for the submit event was taken from the talk with chatgpt: https://chatgpt.com/share/6827519e-4ebc-8002-b5d4-c3849cacb61b
    This try-catch wraps the entire login logic.
    It will catch any unexpected errors that might happen anywhere in the process
     */
    try {
      const email = document.getElementById("email-input").value.trim();
      const password = document.getElementById("password-input").value.trim();

      if (!email || !password) {
        showError("Please fill in both fields.");
        return;
      }

      // Gets saved data from local storage
      const usersRaw = localStorage.getItem("users");
      let users = [];

      // This try-catch is only for JSON parsing.
      // If the data in localStorage is broken or not valid JSON, this will catch that error.
      try {
        users = usersRaw ? JSON.parse(usersRaw) : [];
      } catch (jsonError) {
        showError("There was a problem reading user data.");
        return;
      }

      // If JSON is good, we proceed to hash the input password
      const hashedInputPassword = await hashPassword(password);

      // Find a user with matching email and hashed password
      const user = users.find(
        (u) => u.email === email && u.password === hashedInputPassword
      );

      if (user) {
        // This try-catch handles saving the login info.
        // Sometimes localStorage can throw errors (e.g. in private mode or if it's disabled).
        try {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
        } catch (storageError) {
          showError("Unable to save login data. Please check your browser settings.");
          return;
        }

        // Show success message and redirect
        showSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1500);

      } else {
        // If no matching user is found
        showError("Invalid email or password.");
      }

    } catch (err) {
      // Final catch for anything unexpected that might break the login
      console.error("Unexpected error:", err);
      showError("Something went wrong. Please try again.");
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
  // The try-catch here is to catch failures from the crypto API
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
      // Throw the error so it gets caught in the main submit catch block
      throw new Error("Password hashing failed");
    }
  }
});
