# 🛒 LumaStore – Full-Stack E-Commerce Web Application

LumaStore is a full-stack e-commerce web application built with Node.js, Express, MongoDB, and EJS.  
It supports user and admin roles, secure authentication, product & order management, and a modern responsive UI with glassmorphism design.

---

## 🚀 Live Demo
🔗 https://ecom-1-w0eb.onrender.com

---

## ✨ Features

### 👤 User Features
- User registration & login with JWT authentication
- Secure password hashing using bcrypt
- Browse products
- Add / remove items from cart
- Place orders
- View order history in **My Account**

### 🛠 Admin Features
- Secure admin login
- Create, edit, and delete products
- View all customer orders
- Update order status (Pending / Completed / Cancelled)
- Protected admin routes with role-based access control

---

## 🔐 Security
- JWT-based authentication with HTTP-only cookies
- Role-based authorization (User / Admin)
- Environment-based configuration for production
- Password hashing using bcrypt
- Admin creation disabled in production mode

---

## 🎨 UI & UX
- Responsive, mobile-first design
- Built with Tailwind CSS
- Modern **glassmorphism (liquid glass) UI**
- Light & Dark mode support
- Clean and minimal admin dashboard

---

## 🧩 Tech Stack

**Frontend**
- EJS (Embedded JavaScript Templates)
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Utilities**
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser
- express-session
- connect-flash

**Deployment**
- Render (Backend hosting)
- MongoDB Atlas (Cloud database)

---

## 🏗 Architecture
This project follows the **MVC (Model-View-Controller)** architecture:
- **Models** → MongoDB schemas and database logic
- **Views** → EJS templates for UI
- **Controllers** → Business logic and request handling
- **Routes & Middleware** → Clean and modular routing

---

## ⚙️ Environment Variables

Create a `.env` file (for local development):

```env
PORT=3000
MONGODB_URL=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
EXPRESSION_SESSION_SECRET=your_session_secret
NODE_ENV=development
```

## ▶️ Run Locally
- git clone https://github.com/Subhajitindia99das/ecom.git
- cd ecom
- npm install
- npm start
