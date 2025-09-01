# Kaptur-Social-Media-App

Kaptur is a full-stack MERN (MongoDB, Express, React, Node.js) social media application. It provides user authentication (signup/login) with profile pictures, personal profiles, and the ability to create and interact with posts. Users can add or remove friends, upload images with their posts, and like other users’ posts. The UI is responsive and supports dark/light mode via Material-UI theming. A live demo of Kaptur is available on Vercel (link below).

## Live Deployment
The Kaptur app is deployed live on Vercel. You can access the live version here: [kaptur-social-media-app.vercel.app.](https://kaptur-social-media-app.vercel.app)

## Features
- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and bcrypt for password hashing.
- **User Profiles:** Personal profile pages with user information and profile pictures. Users can upload a profile image and view their own details.
- **Friends & Networking:** Users can add or remove friends. The app displays a list of friends on each user’s profile.
- **Social Feed & Posts:** Create and share posts containing text and optional images. The home feed displays posts from all users (or friends), with newest posts shown first.
- **Post Interactions:** Users can like or unlike posts. (Commenting support is present in the data model for future expansion.)
- **Media Uploads:** Upload images for profiles and posts. The backend uses Multer to handle file uploads, storing images in the server’s public assets.
- **Responsive Design & Theme:** The interface uses Material-UI (MUI) for a modern look and supports a dark/light theme toggle. The layout is responsive for different screen sizes.
- **Form Validation:** Client-side form validation is implemented with Formik and Yup to ensure valid input on signup/login and post creation.

## Tech Stack
- **Frontend:** React 18, Material-UI (MUI) for UI components, Redux Toolkit & Redux Persist for state management, React Router v6 for routing, Formik & Yup for form handling, React-Dropzone for file selection, etc.
- **Backend:** Node.js with Express.js to build RESTful APIs, MongoDB with Mongoose for the database, JSON Web Tokens (JWT) for authentication, Bcrypt for password hashing, Multer for handling file uploads, and security middleware like CORS, Helmet, and Morgan for logging.
- **Deployment:** Frontend hosted on Vercel, Backend hosted on Render (with environment variables for MongoDB and JWT secrets).


## Folder Structure
``` bash 
Kaptur-Social-Media-App/
├── client/                  # React frontend
│   ├── public/              # Static files (index.html, images) 
│   └── src/                 # React source code 
│       ├── components/      # Reusable UI components (e.g., FlexBetween) 
│       ├── scenes/          # Page components (HomePage, LoginPage, ProfilePage, Navbar, Widgets)  
│       ├── state/           # Redux setup (store and slices)  
│       ├── theme.js         # Material-UI theme configuration  
│       ├── index.js         # React entry point  
│       └── App.js           # Main App component with routes  
│  
├── server/                  # Express backend  
│   ├── controllers/         # Route controllers (auth, users, posts)  
│   ├── models/              # Mongoose models (User.js, Post.js)  
│   ├── routes/              # API route definitions (auth.js, users.js, posts.js)  
│   ├── middleware/          # Middleware (e.g., JWT auth)  
│   ├── public/              # Public assets (uploaded images in /assets)  
│   ├── index.js             # Main server configuration and route setup  
│   ├── package.json         # Backend dependencies and scripts  
│   └── .env                 # Environment variables (MongoDB URI, JWT secret)  
│  
└── README.md                # Project documentation (this file)
```

## Installation and Running Locally
To set up and run the Kaptur app on your local machine, follow these steps:
### 1. Clone the repository:
``` bash
git clone https://github.com/AsthaBhaskar/Kaptur-Social-Media-App.git
cd Kaptur-Social-Media-App
```
### 2. Setup Environment Variables:
- In the `server/` directory, create a `.env` file with the following (replace values as needed):
``` bash
MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key  
PORT=6001
```

### 3. Install and run the backend:
``` bash
cd server
npm install
npm start
```

This will start the Express server on `http://localhost:6001`. Ensure MongoDB is accessible (the app uses the `MONGO_URL` provided).
### 4. Install and run the frontend:
``` bash
cd ../client
npm install
npm start
```
This will start the React app on `http://localhost:3000`. The frontend is configured to proxy API calls to the backend.
After both server and client are running, open your browser to http://localhost:3000 to view the app.

## Deployment Info
- **Frontend (React):** Deployed on Vercel. Live site: [kaptur-social-media-app.vercel.app.](https://kaptur-social-media-app.vercel.app)
- **Backend (API):** Deployed on Render. (Ensure to set the environment variables MONGO_URL and JWT_SECRET in the Render dashboard to match your MongoDB Atlas URI and secret key.)

## Screenshots
<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/0666c29a-0ee8-4937-a21b-0ce92c884fdd" />
<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/91d896b7-aa38-4617-af00-db12f0b82c9a" />
<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/65499db0-e351-4057-b7f4-8ad0abf5b809" />

