document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Elements
  const usernameEl = document.getElementById("username");
  const emailEl = document.getElementById("email");

  const fandomInput = document.getElementById("fandom-input");
  const aboutInput = document.getElementById("about-input");

  const editFandomBtn = document.getElementById("edit-fandom-btn");
  const submitFandomBtn = document.getElementById("submit-fandom-btn");

  const editAboutBtn = document.getElementById("edit-about-btn");
  const submitAboutBtn = document.getElementById("submit-about-btn");

  // Show user info
  if (usernameEl) usernameEl.textContent = user.username;
  if (emailEl) emailEl.textContent = user.email;

  // Load existing profile data if available
  fandomInput.value = user.fandom || "";
  aboutInput.value = user.about || "";

  // Edit and submit for Fandom
  editFandomBtn.addEventListener("click", () => {
    fandomInput.disabled = false;
    submitFandomBtn.style.display = "inline-block";
  });

  submitFandomBtn.addEventListener("click", () => {
    user.fandom = fandomInput.value;
    updateUserInStorage(user);

    fandomInput.disabled = true;
    submitFandomBtn.style.display = "none";
  });

  // Edit and submit for About
  editAboutBtn.addEventListener("click", () => {
    aboutInput.disabled = false;
    submitAboutBtn.style.display = "inline-block";
  });

  submitAboutBtn.addEventListener("click", () => {
    user.about = aboutInput.value;
    updateUserInStorage(user);

    aboutInput.disabled = true;
    submitAboutBtn.style.display = "none";
  });

  // Logout
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }

  // Helper to update both 'users' and 'loggedInUser'
  function updateUserInStorage(updatedUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(newUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  }
});
