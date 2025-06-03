# Twitter Clone 🐦

A full-featured Twitter clone built with the MERN stack (MongoDB, Express.js, React, Node.js). Experience real-time social networking with modern UI, authentication, notifications, and more!

---

## 🚀 Features

### Authentication & Security
- User registration and login with JWT authentication
- Secure password hashing (bcrypt)
- HTTP-only cookies for session management
- Protected API routes

### User Profiles
- View and edit profile (avatar, bio, cover image)
- Follow/unfollow users
- See followers and following lists

### Tweets (Posts)
- Create, edit, and delete tweets (with optional images)
- Like/unlike tweets
- Comment on tweets
- View tweet threads and replies

### Feed & Explore
- Personalized timeline: "For You" and "Following" feeds
- Explore trending tweets and users
- "Who to follow" suggestions

### Notifications
- Real-time notifications for likes, comments, and follows
- Notification center with read/unread status

### UI/UX
- Responsive design for mobile and desktop
- Skeleton loaders for smooth experience
- Toast notifications for actions
- Modern dark theme

### Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, DaisyUI, React Query
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Image Uploads:** Cloudinary
- **State Management:** React Query, Context API

---

## 📁 Project Structure

```
twitter-clone/
  backend/
    controllers/
    middleware/
    models/
    routes/
    server.js
    ...
  frontend/
    src/
      components/
      hooks/
      pages/
      utils/
      App.jsx
      ...
    public/
    ...
  .env
  package.json
  README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js & npm
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/yourusername/twitter-clone.git
    cd twitter-clone
    ```

2. **Backend Setup**
    ```sh
    cd backend
    npm install
    # Create a .env file with your MongoDB URI, JWT secret, and Cloudinary keys
    npm run dev
    ```

3. **Frontend Setup**
    ```sh
    cd ../frontend
    npm install
    npm start
    ```

4. **Visit the app**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5000](http://localhost:5000)

