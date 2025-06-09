# 🏠 RoomSync

RoomSync is a full-stack web application that helps users find ideal roommates and available rooms effortlessly. It combines detailed filters, profile matching, and in-app messaging to make the room/roommate search experience smooth, smart, and personalized.

---

## 🌐 Live Demo

> room-sync-gamma.vercel.app

---

## 📂 Project Structure
```bash
RoomSync/
├── backend/ # Express.js API
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Custom middleware (e.g., auth)
│ ├── .env # Environment config
│ ├── package.json # Dependencies
│ └── server.js # Entry point
│
├── frontend/ # Static HTML/CSS/JS Frontend
│ ├── roomlisting.html
│ ├── room-detail.html
│ ├── roommate_profiles.html
│ ├── *.css
│ └── *.js
│
├── README.md
```

---

## 🛠 Tech Stack

**Frontend**
- HTML5, CSS3 (Flexbox, Grid)
- JavaScript
- Font Awesome
- Google Fonts

**Backend**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv for config

---

## 🌟 Key Features

- 🔍 Smart filters for location, budget, type, and lifestyle
- 🤖 JWT Authentication
- 🧾 Real-time room and roommate listings
- 💬 Built-in chat system
- 📸 Room and profile photo previews
- 🔐 Backend-ready to support secure user login and data handling

---

## 🚀 Getting Started

1. **Clone this Repository**
    ```bash
        git clone https://github.com/sakshishelarr/RoomSync.git
        cd RoomSync

2. **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create a `.env` file with MONGO_URI and PORT
    npm start

3. **Start the server**
    ```bash
      node server.js
      Open frontend/index.html in your browser (or use Live Server).

---

## Credits:
- Designed and built by **@sakshishelarr** 
---
