# Scatch - Backened for Bag Selling Platform

Description

This project is a basic backend for a bag-selling platform where an admin manages inventory and customers browse and purchase bags. Built with Node.js, Express.js, MongoDB, and Mongoose, it focuses on backend concepts like CRUD operations, authentication, authorization, and API handling for a secure and efficient platform.

Features
✅ User Registration & Login (with authentication)
✅ Add and Manage Bags (Admin Only)
✅ Secure Passwords with Bcrypt
✅ JSON Web Token (JWT) for Authentication
✅ File Uploads using Multer
✅ Data Storage with MongoDB

Technologies Used 
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JSON Web Tokens (JWT), Bcrypt
Templating Engine: EJS
File Uploads: Multer
Environment Management: dotenv
Session Handling: express-session, connect-flash


API Routes
Method	  Endpoint	                 Description
POST	  /register	                 User registration
POST	  /login	                 User login
GET	      /owners/admin	             Admin panel for adding bags
POST	  /owners/admin/add-bag	     Upload bag details (Admin)


Dependencies
The project uses the following npm packages:c
"bcrypt": "^5.1.1",
"config": "^3.3.12",
"connect-flash": "^0.1.1",
"cookie-parser": "^1.4.7",
"debug": "^4.4.0",
"dotenv": "^16.4.7",
"ejs": "^3.1.10",
"express": "^4.21.2",
"express-session": "^1.18.1",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.11.0",
"multer": "^1.4.5-lts.1"