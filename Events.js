// Sample Data for Events
let events = [
    {
      id: 1,
      title: "Community Cleanup Day",
      date: "2025-03-15",
      description: "Join us for a day of cleaning up our local parks and streets.",
      image: "https://via.placeholder.com/400x200",
      registered: true,
      tags: ["community", "environment"],
    },
    {
      id: 2,
      title: "Local Food Festival",
      date: "2025-04-10",
      description: "Enjoy delicious food from local vendors and restaurants.",
      image: "https://via.placeholder.com/400x200",
      registered: false,
      tags: ["food", "festival"],
    },
    {
      id: 3,
      title: "Yoga in the Park",
      date: "2025-03-20",
      description: "Relax and rejuvenate with a free yoga session in the park.",
      image: "https://via.placeholder.com/400x200",
      registered: false,
      tags: ["yoga", "fitness"],
    },
  ];
  
  // Function to render events
  function renderEvents() {
    const registeredEventsContainer = document.getElementById("registered-events");
    const upcomingEventsContainer = document.getElementById("upcoming-events");
  
    // Clear existing content
    registeredEventsContainer.innerHTML = "";
    upcomingEventsContainer.innerHTML = "";
  
    // Render registered events
    events
      .filter((event) => event.registered)
      .forEach((event) => {
        registeredEventsContainer.innerHTML += createEventCard(event);
      });
  
    // Render upcoming events
    events
      .filter((event) => !event.registered)
      .forEach((event) => {
        upcomingEventsContainer.innerHTML += createEventCard(event);
      });
  
    // Add event listeners to register buttons
    document.querySelectorAll(".register-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const eventId = e.target.dataset.eventId;
        registerForEvent(eventId);
      });
    });
  
    // Render calendar
    renderCalendar();
  }
  
  // Function to create an event card
  function createEventCard(event) {
    return `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${event.image}" class="card-img-top" alt="${event.title}">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text"><strong>Date:</strong> ${event.date}</p>
            <p class="card-text">${event.description}</p>
            <p class="card-text"><strong>Tags:</strong> ${event.tags.join(", ")}</p>
            ${
              event.registered
                ? '<button class="btn btn-success w-100" disabled>Registered</button>'
                : `<button class="btn btn-primary w-100 register-btn" data-event-id="${event.id}">Register</button>`
            }
          </div>
        </div>
      </div>
    `;
  }
  
  // Function to register for an event
  function registerForEvent(eventId) {
    const event = events.find((e) => e.id === parseInt(eventId));
    if (event) {
      event.registered = true;
      localStorage.setItem("events", JSON.stringify(events));
      renderEvents();
    }
  }
  
  // Function to render the calendar
  function renderCalendar() {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      events: events.map((event) => ({
        title: event.title,
        start: event.date,
      })),
    });
    calendar.render();
  }
  
  // Function to handle event creation
  document.getElementById("create-event-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value;
    const tags = document.getElementById("event-tags").value.split(",").map((tag) => tag.trim());
  
    const newEvent = {
      id: events.length + 1,
      title,
      date,
      description,
      image: "https://via.placeholder.com/400x200", // Default image
      registered: false,
      tags,
    };
  
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
    document.getElementById("create-event-form").reset();
  });
  
  // Load events from local storage or use sample data
  const savedEvents = JSON.parse(localStorage.getItem("events"));
  if (savedEvents) {
    events = savedEvents;
  }
  
  // Initial render
  renderEvents();