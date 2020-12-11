const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // allows/disallows cross-site communication
//stripe
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config.env" });
}

const app = require("./backend/app");

const DB = process.env.DATABASE_COMPASS.replace("<username>", process.env.DB_USERNAME)
  .replace("<password>", process.env.DB_PASSWORD)
  .replace("<dbname>", process.env.DB_NAME);

//added a testing change
mongoose
  .connect("mongodb+srv://benMcLoughlin:test123@cluster0.eocq1.mongodb.net/savvy-plan?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

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

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
