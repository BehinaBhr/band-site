//https://unit-2-project-api-25c1595833b2.herokuapp.com/showdates?api_key=496b1df2-b95b-4686-b99a-bdd3bba2a765
const apiKey = "496b1df2-b95b-4686-b99a-bdd3bba2a765";
const api = new BandSiteApi(apiKey);

// const commentsEl = document.querySelector(".comments");

async function showAllShows() {
  try {
    const shows = await api.getShows();
    console.log(shows);
    shows.forEach((show, index) => {
      displayShow(show, index);
    });
  } catch (error) {
    console.log(error);
  }
}
showAllShows();


function toggleSelected(showId) {
  // Remove 'selected' class from all show elements
  document.querySelectorAll(".show--selected").forEach((el) => {
    el.classList.remove("show--selected");
  });

  const showEl = document.getElementById(showId);
  showEl.classList.add("show--selected");
}

// const shows = [
//   {
//     date: "Mon Sept 09 2024",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 17  2024",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Oct 12 2024",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 16 2024",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 29 2024",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 18 2024",
//     venue: "Press Club ",
//     location: "San Francisco, CA",
//   },
// ];

function createRowEl(title, content) {
  const titleEl = document.createElement("h3");
  titleEl.innerText = title;
  titleEl.classList.add("show__" + title + "-title");

  const contentEl = document.createElement("div");
  contentEl.innerText = content;
  contentEl.classList.add("show__" + title + "-content");

  const containerEl = document.createElement("div");
  containerEl.classList.add("show__" + title);
  containerEl.appendChild(titleEl);
  containerEl.appendChild(contentEl);
  return containerEl;
}

function displayShow(show, index) {
  const showId = "shows-" + index;
  const showEl = document.createElement("article");
  showEl.classList.add("show");
  showEl.id = showId;

  //const showDateEl = createRowEl("date", show.date);
  const showDateEl = createRowEl("date", formattedDate(show.date));
  // const showVenueEl = createRowEl('venue', show.venue );
  const showVenueEl = createRowEl("venue", show.place);
  const showLocationEl = createRowEl("location", show.location);

  const showInfoContainer = document.createElement("div");
  showInfoContainer.classList.add("show__info");
  showInfoContainer.appendChild(showDateEl);
  showInfoContainer.appendChild(showVenueEl);
  showInfoContainer.appendChild(showLocationEl);

  const showTicketBtnEl = document.createElement("button");
  showTicketBtnEl.classList.add("show__ticket");
  showTicketBtnEl.innerText = "BUY TICKETS";

  showEl.appendChild(showInfoContainer);
  showEl.appendChild(showTicketBtnEl);

  // Add a click event listener to toggle the 'selected' class

  showEl.addEventListener("click", () => toggleSelected(showId));

  const showsContainer = document.querySelector(".shows__list");
  showsContainer.appendChild(showEl);
}

// for (let i = 0; i < shows.length; i++) {
//   displayShow(shows[i], i);
// }

function formattedDate(date) {
  let formedDate = new Date(date);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(formedDate);
}
