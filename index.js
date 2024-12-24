// Load dependencies
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const ejs = require('ejs');
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();
const port = 3000;

// MySQL Database Connection
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '@Shubh01', // Replace with your MySQL password
    database: 'habit_tracker', // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('DB is not connected:', err);
        process.exit(1);
    } else {
        console.log('DB connected successfully');
    }
});

// MySQL Session Store Configuration
const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'habit_tracker',
});

// Session Middleware
app.use(session({
    name: 'session_name',
    secret: 'session_secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Passport Configuration
require('./config/passport-local-strategy'); // Ensure this file is updated for MySQL
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files configuration
app.use(express.static(path.join(__dirname, 'assets')));

// Express middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require('./routes/route');
app.use('/HabitTracker', routes);

// Default Route
app.get('/', (req, res) => {
    res.redirect('/HabitTracker');
});

// Server Listener
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    } else {
        console.log(`Server is running on http://localhost:3000/HabitTracker`);
    }
});
