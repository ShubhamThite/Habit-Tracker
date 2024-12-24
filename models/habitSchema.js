const db = require('../config/mysql');

// Create habits table (ensure to run this query once)
db.query(`
  CREATE TABLE IF NOT EXISTS habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating habits table:', err);
  } else {
    console.log('Habits table ready');
  }
});

module.exports = {
  createHabit: (habitName, userId, callback) => {
    db.query(
      `INSERT INTO habits (habit_name, user_id) VALUES (?, ?)`,
      [habitName, userId],
      callback
    );
  },
  getUserHabits: (userId, callback) => {
    db.query(
      `SELECT * FROM habits WHERE user_id = ?`,
      [userId],
      callback
    );
  },
};
