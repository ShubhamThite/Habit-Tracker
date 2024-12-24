const db = require('../config/mysql');

// Create users table (ensure to run this query once)
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table ready');
  }
});

module.exports = {
  createUser: (userData, callback) => {
    db.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [userData.name, userData.email, userData.password],
      callback
    );
  },
  getUserByEmail: (email, callback) => {
    db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      callback
    );
  },
};
