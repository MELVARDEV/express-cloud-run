const express = require('express');
const app = express();
var bodyParser = require('body-parser')



// import routes
const riotRoute = require('./routes/Riot')

// use routes
app.use('/riot', riotRoute);



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`nodejs: listening on port ${port}`);
});