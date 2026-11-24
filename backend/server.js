
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample event data
let events = [
  {
    id: 1,
    name: "Tech Fest 2026",
    category: "Technology",
    date: "2026-11-20",
    description: "A technology and coding event"
  },
  {
    id: 2,
    name: "Music Night",
    category: "Music",
    date: "2026-11-25",
    description: "A live music event"
  },
  {
    id: 3,
    name: "Sports Championship",
    category: "Sports",
    date: "2026-11-28",
    description: "A college sports competition"
  }
];

// GET: Retrieve all events
app.get("/api/events", (req, res) => {
  res.status(200).json(events);
});

// GET: Retrieve event by ID
app.get("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  res.status(200).json(event);
});

// POST: Create a new event
app.post("/api/events", (req, res) => {
  const { name, category, date, description } = req.body;

  if (!name || !category || !date || !description) {
    return res.status(400).json({
      message: "Please provide all event details"
    });
  }

  const newEvent = {
    id: events.length > 0
      ? Math.max(...events.map((e) => e.id)) + 1
      : 1,
    name,
    category,
    date,
    description
  };

  events.push(newEvent);

  res.status(201).json({
    message: "Event created successfully",
    event: newEvent
  });
});

// PUT: Update an existing event
app.put("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  const { name, category, date, description } = req.body;

  if (!name || !category || !date || !description) {
    return res.status(400).json({
      message: "Please provide all event details"
    });
  }

  event.name = name;
  event.category = category;
  event.date = date;
  event.description = description;

  res.status(200).json({
    message: "Event updated successfully",
    event
  });
});

// DELETE: Remove an event
app.delete("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const eventExists = events.some((e) => e.id === id);

  if (!eventExists) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  events = events.filter((e) => e.id !== id);

  res.status(200).json({
    message: "Event deleted successfully"
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
