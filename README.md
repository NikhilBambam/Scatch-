# Scatch - Backend for Bag Selling Platform  

A complete backend solution for a bag e-commerce platform where admins manage inventory and customers browse/purchase bags. Built with Node.js and MongoDB, featuring secure authentication and file uploads, it focuses on backend concepts like CRUD operations, authentication, authorization, and API handling for a secure and efficient platform.

🚀 **Live Demo**: [Add your live demo link here]  

## Features  

🔹 **User Registration & Login** (with secure authentication)  
🔹 **Admin Dashboard** for managing bag inventory  
🔹 **Secure Password Storage** with Bcrypt hashing  
🔹 **JWT Authentication** for protected routes  
🔹 **File Uploads** using Multer for product images  
🔹 **MongoDB Database** with Mongoose for data management  
🔹 **Responsive Navigation** for all devices  

## Technologies Used  

**Backend**: Node.js, Express.js  
**Database**: MongoDB (with Mongoose ODM)  
**Authentication**: JSON Web Tokens (JWT), Bcrypt  
**Templating**: EJS  
**File Upload**: Multer  
**Session Management**: express-session, connect-flash  

## API Routes  

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/register`            | User registration               |
| POST   | `/login`               | User login                      |
| GET    | `/owners/admin`        | Admin panel for managing bags   |
| POST   | `/owners/admin/add-bag`| Add new bag (Admin only)        |

## 🛠️ Installation & Usage  

1. **Clone the repository**:  
   
   git clone https://github.com/NikhilBambam/Scatch-.git


2. Navigate to the project folder:

   cd scatch

3. Install dependencies:

   npm install


4. Start the server:

   nodemon app.js

Demo Login (For Testing)

Quickly test the admin features with these credentials:

🔹 email:nikhil@gmail.com 
🔹 Password: nikhil

🔴 Testing Steps:

 Go to the login page (/login)

 Enter:

 email:nikhil@gmail.com
 Password: nikhil

 Click Login → You'll be redirected to  dashboard


Dependencies:-

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

