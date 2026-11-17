  
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// 1. Create Context
const EventContext = createContext();

// 2. Event data
const events = [
  {
    id: 1,
    name: "Tech Fest 2026",
    category: "Technology",
    date: "20 November 2026",
    description: "Explore the latest technologies, coding and innovation.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
  },
  {
    id: 2,
    name: "Music Night",
    category: "Music",
    date: "25 November 2026",
    description: "Enjoy an evening filled with live music and entertainment.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600"
  },
  {
    id: 3,
    name: "Sports Championship",
    category: "Sports",
    date: "28 November 2026",
    description: "Participate in exciting sports competitions.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600"
  },
  {
    id: 4,
    name: "Web Development Workshop",
    category: "Technology",
    date: "30 November 2026",
    description: "Learn modern web development and React.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
  }
];

// 3. Context Provider
function EventProvider({ children }) {
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("registeredEvents")) || [];
    } catch {
      return [];
    }
  });

  // 4. useEffect: Save registration data
  useEffect(() => {
    localStorage.setItem(
      "registeredEvents",
      JSON.stringify(registeredEvents)
    );
  }, [registeredEvents]);

  // 5. Registration function
  const registerEvent = (id) => {
    setRegisteredEvents((previous) =>
      previous.includes(id)
        ? previous
        : [...previous, id]
    );
  };

  const unregisterEvent = (id) => {
    setRegisteredEvents((previous) =>
      previous.filter((eventId) => eventId !== id)
    );
  };

  return (
    <EventContext.Provider
      value={{
        registeredEvents,
        registerEvent,
        unregisterEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// 6. Event Card Component
function EventCard({ event }) {
  const {
    registeredEvents,
    registerEvent,
    unregisterEvent
  } = useContext(EventContext);

  const isRegistered = registeredEvents.includes(event.id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <span className="text-sm text-blue-600 font-semibold">
          {event.category}
        </span>

        <h2 className="text-xl font-bold mt-2">
          {event.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {event.date}
        </p>

        <p className="text-gray-600 mt-3">
          {event.description}
        </p>

        {isRegistered ? (
          <button
            onClick={() => unregisterEvent(event.id)}
            className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Registered ✓ (Cancel)
          </button>
        ) : (
          <button
            onClick={() => registerEvent(event.id)}
            className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register Now
          </button>
        )}
      </div>
    </div>
  );
}

// 7. Main Event Page
function EventPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { registeredEvents } = useContext(EventContext);

  // 8. useEffect: Update browser tab title
  useEffect(() => {
    document.title = "Interactive Event Page";
  }, []);

  // 9. Search and filter implementation
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-700 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">
          Event Management System
        </h1>

        <p className="mt-2">
          Discover Events and Register Online
        </p>

        <p className="mt-3 font-semibold">
          My Registrations: {registeredEvents.length}
        </p>
      </header>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto p-6">

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-lg outline-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
          </select>

        </div>

        {/* Event List */}
        <h2 className="text-2xl font-bold mb-5">
          Upcoming Events
        </h2>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No events found!
          </p>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-5 mt-10">
        Experiment 3 - React Hooks and State Management
      </footer>

    </div>
  );
}

// 10. Main App Component
function App() {
  return (
    <EventProvider>
      <EventPage />
    </EventProvider>
  );
}

export default App;
