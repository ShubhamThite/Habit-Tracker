// Connect to MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '@Shubh01', // Replace with your MySQL password
    database: 'habit_tracker', // Replace with your MySQL database name
});

connection.connect((err) => {
    if (err) {
        console.error('DB is not connected:', err);
    } else {
        console.log('DB connected successfully');
    }
});

module.exports = connection;
