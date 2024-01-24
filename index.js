const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Initialize the application
const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection process.env.MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database successfully connected!"))
  .catch((error) => console.log(error));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
const usersRouter = require("./src/routes/userRoute");
app.use("/users", usersRouter);

const propertyRouter = require("./src/routes/propertyRoutes");
app.use("/properties", propertyRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Listening the application
app.listen(port, () => {
  console.log(`House Hunter app listening on port ${port}`);
});
