
import React, { useEffect, useState } from "react";

function Experiment4() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from Express backend
  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-3">
        Event Management System
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Events fetched from Node.js and Express API
      </p>

      {loading && (
        <p className="text-center">Loading events...</p>
      )}

      {error && (
        <p className="text-center text-red-600">
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <span className="text-blue-600 font-semibold">
                {event.category}
              </span>

              <h2 className="text-xl font-bold mt-2">
                {event.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Date: {event.date}
              </p>

              <p className="text-gray-700 mt-3">
                {event.description}
              </p>

              <p className="text-sm text-gray-400 mt-4">
                Event ID: {event.id}
              </p>
            </div>
          ))}

        </div>
      )}

      <p className="text-center text-gray-500 mt-10">
        Data received from Express REST API
      </p>

    </div>
  );
}

export default Experiment4;
