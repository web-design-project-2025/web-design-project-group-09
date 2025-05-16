document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const commentForm = document.getElementById("comment-form-container");
  const commentInput = document.getElementById("comment-input");
  const submitButton = document.getElementById("submit-comment");
  const commentsContainer = document.getElementById("comments-container");
  const commentCount = document.getElementById("comment-count");

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Load existing comments
  function loadComments() {
    commentsContainer.innerHTML = "";
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    // Comment count
    if (commentCount) {
      commentCount.textContent = `${recipeComments.length} comments`;
    }

    recipeComments.forEach((c) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");


      commentElement.innerHTML = `
  <div class="avatar icon-avatar"><i class="fa-solid fa-user"></i></div>
  <div class="comment-content">
    <strong>${c.username}</strong>
    <p>${c.text}</p>
    <div class="comment-actions">
      <span><i class="fa-solid fa-thumbs-up"></i> 0</span>
      <span><i class="fa-solid fa-reply"></i> Reply</span>
    </div>
  </div>
      `;

      commentsContainer.appendChild(commentElement);
    });
  }

  // Post comment
  submitButton?.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const recipeComments = allComments[recipeId] || [];

    const newComment = {
      username: user?.username || user?.email || "Guest",
      text: text,
      timestamp: Date.now()
    };

    recipeComments.push(newComment);
    allComments[recipeId] = recipeComments;

    localStorage.setItem("comments", JSON.stringify(allComments));
    commentInput.value = "";
    loadComments();
  });

  // If not logged in
  if (!user && commentForm) {
    commentForm.innerHTML = `<p><a href="login.html">Log in</a> to comment.</p>`;
  }

  loadComments();
});
