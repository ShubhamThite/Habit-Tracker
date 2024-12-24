# Habit-Tracker

Project Overview -
The Habit Tracker application helps users create, manage, and track their daily habits. It includes user authentication, habit tracking, and progress visualization.
------------------------------------------------------------------------------------
# Prerequisites -

Ensure the following software is installed on your system:

1-Node.js (v14 or later)
~ Download and install Node.js from Node.js Official Website.

2-MySQL
~ Install MySQL and ensure the server is running.

3-Git
~ Install Git for version control: Git Official Website.

4-npm (Node Package Manager)
~ Comes with Node.js.

------------------------------------------------------------------------------------
# Steps to Set Up the Project

1. Clone the Repository
(Run command in terminal)
$ git clone <repository_url>
$ cd Habit-Tracker

2. Install Dependencies
(Run command in terminal)
$ npm install

3. Set Up the MySQL Database

~ Create a MySQL database named habit_tracker.
~ Update the database connection details in D:\PROJECT\z\Habit-Tracker\config\mysql.js: 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'habit_tracker',
});

~ Run the following queries to create the required tables:

-- Create the database
CREATE DATABASE habit_tracker;

-- Switch to the database
USE habit_tracker;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE habit_days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('done', 'not done', 'none') DEFAULT 'none',
    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);

4. Run the Application

Start the server:
$ node index.js
(Run command in terminal)

------------------------------------------------------------------------------------
# Features -

~ User authentication (login, signup, reset password).
~ Add, update, and delete habits.
~ Track habits over a week.
~ Mobile-responsive user interface.

# Habit Tracker API DOCUMENTATION

# Endpoints :-

User Authentication -
1. Login
URL: /HabitTracker/loginform
Method: POST
Description: Authenticates a user and starts a session.

2. Sign Up
URL: /HabitTracker/createUser
Method: POST
Description: Creates a new user account.

3. Sign Out
URL: /HabitTracker/signout
Method: GET
Description: Ends the user's session and redirects to the login page.

------------------------------------------------------------------------------------
Habit Management :-
1. Get Habits
URL: /HabitTracker/habits/:userId
Method: GET
Description: Retrieves the list of habits for a user.

2. Add Habit
URL: /HabitTracker/:userId/add-habit
Method: POST
Description: Adds a new habit for the user.

3. Update Today's Habit Status
URL: /HabitTracker/:habitId/update/today
Method: POST
Description: Updates the status of a habit for today.

4. Update Past Habit Status
URL: /HabitTracker/:habitId/update?itemId={index}
Method: GET
Description: Updates the status of a habit for a specific day in the past.

------------------------------------------------------------------------------------
Password Reset :-
1. Send Reset Password Email
URL: /HabitTracker/send-mail
Method: POST
Description: Sends an email to the user with a reset password link.





