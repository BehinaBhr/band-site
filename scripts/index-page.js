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

// const comments = [
//   {
//     name: "Victor Pinto",
//     timestamp: "11/02/2023",
//     text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     name: "Christina Cabrera",
//     timestamp: "10/28/2023",
//     text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     name: "Isaac Tadesse",
//     timestamp: "10/20/2023",
//     text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
// ];

// const commentsEl = document.querySelector(".comments");
// showAllComments(comments);

// function showAllComments(comments) {
//   // remove everything inside commentsEl
//   commentsEl.innerHTML = "";

//   for (let i = 0; i < comments.length; i++) {
//     const comment = comments[i];
//     displayComment(comment);
//   }
// }

// -- Always create the HTML structure with styles before trying to write it via the DOM --
/* <article class="comment">
    <div class="avatar">
        <div avatar--empty"></div>
    </div>
    <div class="comment__info">
        <div class="comment__header">
            <h3 class="comment__name">username</h3>
            <div class="comment__date"></div
        </div>
        <p class="comment__text">usercommenttext</p>
    </div>
</article> */

function displayComment(comment) {
  const commentEl = document.createElement("article");
  commentEl.classList.add("comment");

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
  // dateEl.innerHTML = comment.timestamp;
  dateEl.innerHTML = formattedDate(comment.timestamp);

  commentHeaderEl.appendChild(commentNameEl);
  commentHeaderEl.appendChild(dateEl);

  const commentTextEl = document.createElement("p");
  commentTextEl.classList.add("comment__text");
  commentTextEl.innerText = comment.comment;

  commentInfoEl.appendChild(commentHeaderEl);
  commentInfoEl.appendChild(commentTextEl);

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
  console.log(event.target)
  const name = event.target.name.value;
  const text = event.target.text.value;
  console.log(name);
  console.log(text);

  // current date as timestamp
  let now = dateFormat();

  // // Validation: If name or text is empty, show an error message and end event handler
  if (name === "" || text === "") {
    if (name === "") {
      document.getElementById("comment-name").classList.add("error");
    }

    if (text === "") {
      document.getElementById("comment-text").classList.add("error");
    }
    return;
  }

  // Create a new comment object
  // new comment should be match with what we can do bty postman in post
  const newComment = {
    name: name,
    // timestamp: now,
    comment: text,
  };
  // Add the new comment to the comments array
  // comments.push(newComment);
  await api.postComment(newComment);

  // Display all comments including the new one
  // showAllComments(comments);
  await showAllComments();

  // Clear input fields after submitting a new comment
  event.target.name.value = "";
  event.target.text.value = "";
});

function dateFormat() {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  now = `${m}/${d}/${y}`;
  return now;
}
function formattedDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return `${m}/${d}/${y}`;
}
