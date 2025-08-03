// Parts of this code were inspired by a different code, specifically in usage of:
// Basic structure and logic
// localStorage for persistent data
// Array manipulation with .push() and .splice()
// Basic DOM updates and re-rendering logic
// Deleting array items by index
// the link to the different code: https://stackoverflow.com/questions/64205232/comment-appending-on-the-first-post-only-in-vanilla-javascript


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const commentForm = document.getElementById("comment-form-container");
  const commentInput = document.getElementById("comment-input");
  const submitButton = document.getElementById("submit-comment");
  const commentsContainer = document.getElementById("comments-container");
  const commentCount = document.getElementById("comment-count");

  // Get the recipe ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Load and display comments
  function loadComments() {
    // Clear comment container before adding anything
    commentsContainer.innerHTML = "";
    // Retrieve all comments from localStorage or start with an empty object if none exist
    // The idea was inspired from here: https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/ 
    // It helped a bit to understand how store and read data values in local storage
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    // Comment count
    if (commentCount) {
      commentCount.textContent = `${recipeComments.length} comments`;
    }

// Loop through every comment for this recipe    
recipeComments.forEach(function (c, index) {
  var commentEl = document.createElement("div");
  commentEl.classList.add("comment");

  commentEl.innerHTML = `
    <div class="icon-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="comment-content">
      <strong>${c.username}</strong>
      <p>${c.text}</p>
      <div class="comment-actions">
        <span><i class="fa-solid fa-thumbs-up"></i> 0</span>
        <span><i class="fa-solid fa-reply"></i> Reply</span>
        <button class="delete-comment" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;

  commentsContainer.appendChild(commentEl);
});


    // Attach delete button logic
    const deleteButtons = document.querySelectorAll(".delete-comment");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the index of the comment to delete from the button's data attribute
        const index = button.getAttribute("data-index");
        // Remove comment from local storage
        recipeComments.splice(index, 1); 
        // Update the allComments object with the modified comments array
        allComments[recipeId] = recipeComments;
        // Save the updated comments back to localStorage
        localStorage.setItem("comments", JSON.stringify(allComments));
        loadComments(); 
      });
    });
  }

  // Submit new comment
  // Only if user is logged in
  // The idea to use optional chaining was taken from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  submitButton?.addEventListener("click", () => {
    // Get the text from the box
    // The idea to use trim is taken from here: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const text = commentInput.value.trim();
    if (!text) return;
    // Gets all the existing comments from local storage
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    // Create a new comment object
    // If user is logged in, use username, otherwise use email
    const newComment = {
      username: user?.username,
      text: text,
    };

    // Adds the new comment to the existing comments
    recipeComments.push(newComment);
    allComments[recipeId] = recipeComments;

    // Clears the text box and re-renders the comments
    localStorage.setItem("comments", JSON.stringify(allComments));
    commentInput.value = "";
    loadComments();
  });

  // If user is not logged in
  if (!user && commentForm) {
    commentForm.innerHTML = `<p><a href="login.html">Log in</a> to comment.</p>`;
  }

  loadComments();
});
