const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17  2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club ",
    location: "San Francisco, CA",
  },
];

function createRowEl(title, content){
    const titleEl = document.createElement("h3")
    titleEl.innerText = title
    titleEl.classList.add("show__" + title + "-title")

    const contentEl = document.createElement("div")
    contentEl.innerText = content;
    contentEl.classList.add("show__" + title + "-content")

    const containerEl = document.createElement("div");
    containerEl.classList.add("show__" + title);
    containerEl.appendChild(titleEl)
    containerEl.appendChild(contentEl)
    return containerEl
}

function displayShow(show, index) {
  const id = 'shows-' + index
  const showEl = document.createElement("article");
  showEl.classList.add("show");
  showEl.id = id

  const showDateEl = createRowEl('date', show.date );
  const showVenueEl = createRowEl('venue', show.venue );
  const showLocationEl = createRowEl('location', show.location );

  const showTicketBtnEl = document.createElement("button");
  showTicketBtnEl.classList.add("show__ticket");
  showTicketBtnEl.innerText = "BUY TICKETS";

  showEl.appendChild(showDateEl);
  showEl.appendChild(showVenueEl);
  showEl.appendChild(showLocationEl);
  showEl.appendChild(showTicketBtnEl);

  const showsContainer = document.querySelector('.shows__list');
  showsContainer.appendChild(showEl);
}


for (let i = 0; i < shows.length; i++) {
  displayShow(shows[i], i);
}
