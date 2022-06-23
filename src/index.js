/** @format */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookie = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');

const { port, secretSession } = require('./config');
const {connect} = require('./config/database');

const app = express();
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookie());
app.use(session({ secret: secretSession, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
