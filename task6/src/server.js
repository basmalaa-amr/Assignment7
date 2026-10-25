const express = require("express");
const { connectDB } = require("./common/db");

const collectionRoutes = require("./app/collection/collection.route");
const booksRoutes = require("./app/books/books.route");
const logsRoutes = require("./app/logs/logs.route");

const app = express();
app.use(express.json());

app.use("/collection", collectionRoutes);
app.use("/books", booksRoutes);
app.use("/logs", logsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

const PORT = 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  });
