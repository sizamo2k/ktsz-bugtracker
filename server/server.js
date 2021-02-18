const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config()

const app = express();
const port = 5000;


app.listen(port, function() {
    console.log("Server is running on Port: " + port);
  });

// connect to database via mongoose
// .env file required to access mongo DB
var mongoUri = process.env.DB_CONNECT_DEFAULT;
mongoose.connect(mongoUri, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true })
  .then(() => 
    console.log('MongoDB database connection established successfully!'))
  .catch(err => {
    console.log(Error, err.message);
});

// Get routes
const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);