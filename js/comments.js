document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const commentForm = document.getElementById("comment-form-container");
  const commentInput = document.getElementById("comment-input");
  const submitButton = document.getElementById("submit-comment");
  const commentsContainer = document.getElementById("comments-container");
  const commentCount = document.getElementById("comment-count");

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Load and display comments
  function loadComments() {
    commentsContainer.innerHTML = "";
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    // Comment count
    if (commentCount) {
      commentCount.textContent = `${recipeComments.length} comments`;
    }

    
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
        const index = button.getAttribute("data-index");
        // Remove comment from local storage
        recipeComments.splice(index, 1); 
        allComments[recipeId] = recipeComments;
        localStorage.setItem("comments", JSON.stringify(allComments));
        loadComments(); 
      });
    });
  }

  // Submit new comment
  // Only if user is logged in
  submitButton?.addEventListener("click", () => {
    // Get the text from the box
    const text = commentInput.value.trim();
    if (!text) return;
    // Gets all the existing comments from local storage
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    // Create a new comment object
    // If user is logged in, use username, otherwise use email or "Guest"
    const newComment = {
      username: user?.username,
      text: text,
    };

    // Adds the new comment to the existing comments
    recipeComments.push(newComment);
    allComments[recipeId] = recipeComments;

    // Clears teh text box and re-renders the comments
    // The idea was taken from here
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
