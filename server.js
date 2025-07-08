const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");
const db_connect = require("./utils/db");

// Routes
const authRoute = require("./routes/authRoute");
const newsRoute = require("./routes/newsRoute");
const clientNewsRoute = require("./routes/clientNewsRoute");

dotenv.config();

// middleware
app.use(bodyParser.json());

// const corsOptions =
//   process.env.NODE_ENV === "production"
//     ? cors({
//         origin: [process.env.VERCEL_ORIGIN, process.env.VERCEL_ORIGIN_CLIENT],
//       })
//     : cors({
//         origin: ["http://localhost:5173", "http://localhost:3000"],
//       });
// app.use(corsOptions);

const corsOptions = {
  origin: [
    "https://easynews24.vercel.app",
    "https://easynews24.vercel.app/client",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const port = process.env.PORT;

app.use("/", authRoute);
app.use("/", newsRoute);
app.use("/", clientNewsRoute);

app.get("/", (req, res) => {
  res.send("Hello Easy!");
});

db_connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
