const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
require('dotenv').config()

app.use(cors());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

// import routes
const riotRoute = require('./routes/Riot')

// use routes
app.use('/riot', riotRoute);



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`nodejs: listening on port ${port}`);
});