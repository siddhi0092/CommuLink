import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridMonth from "@fullcalendar/daygrid";
import CardComponent from "../components/Card"; // Import the CardComponent

const Events = () => {
  const [events, setEvents] = useState([
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
  ]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  const registerForEvent = (eventId) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, registered: true } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const title = e.target.eventTitle.value;
    const date = e.target.eventDate.value;
    const description = e.target.eventDescription.value;
    const tags = e.target.eventTags.value.split(",").map((tag) => tag.trim());

    const newEvent = {
      id: events.length + 1,
      title,
      date,
      description,
      image: "https://via.placeholder.com/400x200",
      registered: false,
      tags,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    e.target.reset();
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Forum for Events</h2>

        {/* Registered Events Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events
              .filter((event) => event.registered)
              .map((event) => (
                <CardComponent
                  key={event.id}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  buttonText="Registered"
                  onClick={() => {}}
                  author="Organizer"
                  date={event.date}
                  tags={event.tags}
                  rating={0} // Add a rating if needed
                />
              ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Community Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events
              .filter((event) => !event.registered)
              .map((event) => (
                <CardComponent
                  key={event.id}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  buttonText="Register"
                  onClick={() => registerForEvent(event.id)}
                  author="Organizer"
                  date={event.date}
                  tags={event.tags}
                  rating={0} // Add a rating if needed
                />
              ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Event Calendar</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FullCalendar
              plugins={[dayGridMonth]}
              initialView="dayGridMonth"
              events={events.map((event) => ({
                title: event.title,
                start: event.date,
              }))}
            />
          </div>
        </div>

        {/* Create Your Own Event Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Create Your Own Event</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label htmlFor="eventTitle" className="block text-gray-700 font-bold mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="eventDescription" className="block text-gray-700 font-bold mb-2">
                  Event Description
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter event description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="eventTags" className="block text-gray-700 font-bold mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="eventTags"
                  name="eventTags"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., yoga, fitness, community"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;