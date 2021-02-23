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
const projectsRouter = require('./routes/projects');
const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');

app.use('/projects', projectsRouter);
app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);


// auth0 login app
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTHORIZE,
  baseURL: 'http://localhost:5000',
  clientID: 'eZ1Mw59npUYHQC4vtCjysuqLDl3mJjyJ',
  issuerBaseURL: 'https://dev-katie.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

