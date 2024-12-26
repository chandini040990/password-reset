const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const cors = require('cors');

//load env variables
dotenv.config();

const app = express();

//middleware to parse the JSON
app.use(express.json());

//cors - middleware to enable cors for all origins
app.use(cors());

connectDB();

//use the user routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>
    console.log(`Server is running at the url http://localhost:${PORT} `)
);