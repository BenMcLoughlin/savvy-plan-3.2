// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors"); // allows/disallows cross-site communication

const app = express();
const PORT = process.env.PORT || 5000; // Step 1

const routes = require("./backend/app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== "development") {
  dotenv.config({ path: "./config.env" });
}
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace("<username>", process.env.DB_USERNAME)
  .replace("<password>", process.env.DB_PASSWORD)
  .replace("<dbname>", process.env.DB_NAME);

// Step 2
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

const whitelist = ["http://localhost:3000", "http://localhost:5000", "https://git.heroku.com/guarded-plains-32530.git"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
// // Step 2
// mongoose.connect(
//   process.env.MONGODB_URI ||
//     process.env.DATABASE_COMPASS.replace("<username>", process.env.DB_USERNAME)
//       .replace("<password>", process.env.DB_PASSWORD)
//       .replace("<dbname>", process.env.DB_NAME),
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
