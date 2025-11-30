Employee Attendance Management System
TAP Academy Interview Round 2 – Project Submission

Developer: Pragatheesh R A
College: Hindusthan College of Engineering and Technology
Mail: pragatheeshra@gmail.com

------------------------------------------------------------

PROJECT OVERVIEW
This project is a complete Employee Attendance Tracking System built using the MERN Stack.
It supports two main user roles:

Employee – Check-in, check-out, view attendance history, view daily and monthly summary
Manager – View all employee attendance, filter records, export CSV reports, view analytics dashboard

This project fulfills all requirements given by TAP Academy for Interview Round 2.

------------------------------------------------------------

TECHNOLOGIES USED

Frontend
React (Vite)
Axios
CSS
LocalStorage Authentication

Backend
Node.js
Express.js
Mongoose
JWT Authentication
bcrypt password hashing

Database
MongoDB Atlas

------------------------------------------------------------

FEATURES

Employee Features
Login and Register
Daily Check-In
Daily Check-Out
Today’s Attendance Status
Attendance History
Monthly Summary
Employee Dashboard
Logout

Manager Features
Manager Login
View all employees’ attendance
Filter by Employee ID, Date, Status
Export attendance as CSV
Team Summary
Weekly Attendance Trend
Department-wise view
Team Calendar View
Manager Dashboard

------------------------------------------------------------

FOLDER STRUCTURE

tap-attendance-system
   backend
      src
         controllers
         routes
         models
         app.js
      package.json
      .env (not uploaded)
      seed
   frontend
      src
         pages
            Login.jsx
            Employee.jsx
            manager
               ManagerContainer.jsx
               ManagerNavbar.jsx
               ManagerDashboard.jsx
               AllAttendance.jsx
               Reports.jsx
               TeamCalendar.jsx
      package.json
      index.html

------------------------------------------------------------

ENVIRONMENT VARIABLES (.env FILE)
Create a file named .env inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_custom_secret

Do not upload the real .env file to GitHub.

------------------------------------------------------------

SETUP INSTRUCTIONS

Clone the repository:
git clone https://github.com/pragatheesh2552/tap-attendance-system.git

Backend Setup:
cd backend
npm install
npm run dev
Backend will start at http://localhost:5000

Frontend Setup:
cd ../frontend
npm install
npm run dev
Frontend will start at http://localhost:5173

------------------------------------------------------------

HOW TO RUN THE PROJECT

Backend
Ensure .env is created
Run: npm run dev

Frontend
Run: npm run dev
Then open http://localhost:5173

------------------------------------------------------------

DEFAULT LOGIN CREDENTIALS

Manager
Email: manager@example.com
Password: Manager@123

Employee
Email: emp1@example.com
Password: Employee@123

------------------------------------------------------------

API ENDPOINTS

Authentication
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

Employee Attendance
POST /api/attendance/checkin
POST /api/attendance/checkout
GET /api/attendance/my-history
GET /api/attendance/my-summary
GET /api/attendance/today

Manager Attendance
GET /api/attendance/all
GET /api/attendance/employee/:id
GET /api/attendance/summary
GET /api/attendance/export
GET /api/attendance/today-status

Dashboard
GET /api/dashboard/employee
GET /api/dashboard/manager

------------------------------------------------------------

SCREENSHOTS
Add screenshots to a folder named screenshots in the repository.

Recommended screenshots:
Login Page

Employee Dashboard

Check-In / Check-Out

Attendance History

Manager Dashboard
Attendance Table
CSV Export

------------------------------------------------------------

VIDEO DEMONSTRATION
Upload the demo video to Google Drive and paste link here.

Drive Link: <your link here>

------------------------------------------------------------

SUBMISSION DETAILS
This project is submitted for TAP Academy Interview – Round 2 Assignment.
All required features are implemented and demonstrated.

------------------------------------------------------------

FINAL NOTE
This is a complete MERN-based Attendance Management System with role-based login, attendance tracking, analytics, CSV export, and dashboards.
The project is fully functional and ready for evaluation.
