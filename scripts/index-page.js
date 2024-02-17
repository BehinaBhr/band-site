const apiKey = "496b1df2-b95b-4686-b99a-bdd3bba2a765";
const api = new BandSiteApi(apiKey);

// Function to display comments on the Bio Page
const commentsEl = document.querySelector(".comments");

async function showAllComments() {
  try {
    const comments = await api.getComments();
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log(comments);
    // remove everything inside commentsEl
    commentsEl.innerHTML = "";

    comments.forEach((comment) => {
      displayComment(comment);
    });
  } catch (error) {
    console.log(error);
  }
}
showAllComments();

function displayComment(comment) {
  const commentEl = document.createElement("article");
  commentEl.classList.add("comment");
  commentEl.id = `comment-${comment.id}`;

  const avatarEl = document.createElement("div");
  avatarEl.classList.add("comment__avatar");
  avatarEl.classList.add("comment__avatar--empty");

  const commentInfoEl = document.createElement("div");
  commentInfoEl.classList.add("comment__info");

  const commentHeaderEl = document.createElement("div");
  commentHeaderEl.classList.add("comment__header");

  const commentNameEl = document.createElement("h3");
  commentNameEl.classList.add("comment__name");
  commentNameEl.innerText = comment.name;

  const dateEl = document.createElement("div");
  dateEl.classList.add("comment__date");
  dateEl.innerHTML = formattedDate(comment.timestamp);

  commentHeaderEl.appendChild(commentNameEl);
  commentHeaderEl.appendChild(dateEl);

  const commentTextEl = document.createElement("p");
  commentTextEl.classList.add("comment__text");
  commentTextEl.innerText = comment.comment;

  const bottonsContainer = document.createElement("div");
  bottonsContainer.classList.add("comment__buttons-container");

  // Likes count
  const likesCount = document.createElement('div')
  likesCount.classList.add('comment__likes-count')
  likesCount.innerHTML = comment.likes

  // Like Button
  const likeButton = document.createElement("button");
  likeButton.classList.add("comment__button");
  likeButton.classList.add("comment__like-icon");
  const likeIcon = document.createElement("img");
  likeIcon.src = "../assets/icons/svg/icon-like.svg";
  likeButton.appendChild(likeIcon);
  likeButton.addEventListener("click", () => handleLike(comment.id, likeButton, likesCount));

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("comment__button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../assets/icons/svg/icon-delete.svg";
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => handleDelete(comment.id));

  bottonsContainer.appendChild(likesCount);
  bottonsContainer.appendChild(likeButton);
  bottonsContainer.appendChild(deleteButton);
  commentInfoEl.appendChild(commentHeaderEl);
  commentInfoEl.appendChild(commentTextEl);
  commentInfoEl.appendChild(bottonsContainer);

  commentEl.appendChild(avatarEl);
  commentEl.appendChild(commentInfoEl);

  commentsEl.appendChild(commentEl);
}

// Related to form:
const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.getElementById("comment-text").classList.remove("error");
  document.getElementById("comment-name").classList.remove("error");

  console.log("Form submitted!");

  // clear error messages on submit, then process form, with fresh validation + error messages
  console.log(event.target);
  const name = event.target.name.value;
  const text = event.target.text.value;
  console.log(name);
  console.log(text);

  // Validation: If name or text is empty, show an error message and end event handler
  if (name === "" || text === "") {
    if (name === "") {
      document.getElementById("comment-name").classList.add("error");
    }

    if (text === "") {
      document.getElementById("comment-text").classList.add("error");
    }
    return;
  }

  // Create a new comment object match with what we can do by postman in post request
  const newComment = {
    name: name,
    comment: text,
  };

  // Add the new comment to the comments array
  await api.postComment(newComment);

  // Display all comments including the new one
  await showAllComments();

  // Clear input fields after submitting a new comment
  event.target.name.value = "";
  event.target.text.value = "";
});

function formattedDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return `${m}/${d}/${y}`;
}

// Function to handle like button click
async function handleLike(commentId, likeButton, likesCount) {
  try {
    const response_data = await api.likeComment(commentId);
    likesCount.innerHTML = response_data.likes
    likeButton.classList.add("comment__button--liked");
    console.log("API Response:", response_data);
  } catch (error) {
    console.log("Error liking comment:", error);
  }
}

// Function to handle delete button click
async function handleDelete(commentId) {
  try {
    await api.deleteComment(commentId);
    // Hide the deleted comment
    document.getElementById(`comment-${commentId}`).classList.add("deleted");
  } catch (error) {
    console.log("Error deleting comment:", error);
  }
}
