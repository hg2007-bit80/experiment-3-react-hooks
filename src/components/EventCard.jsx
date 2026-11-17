
function EventCard({ event, onRegister }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="bg-indigo-600 p-4 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">
          {event.title}
        </h2>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-6">
        <p className="mb-4 text-sm text-gray-600 md:text-base">
          {event.description}
        </p>

        <div className="space-y-3 text-sm text-gray-700">
          <p>📅 Date: {event.date}</p>
          <p>⏰ Time: {event.time}</p>
          <p>📍 Location: {event.location}</p>
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={() => onRegister(event)}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-800 md:w-auto"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
