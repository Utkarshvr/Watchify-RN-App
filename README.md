# 🎬 Watchify

> A full-stack video-sharing platform built with React Native, Expo, Express, MongoDB, Socket.io, and Cloudinary.

<p align="center">
  <img src="https://res.cloudinary.com/di7b9ifgh/image/upload/v1711125195/Watchify_Mockup_Screen_1_ceebd10dd3.png" alt="Watchify" width="850"/>
</p>

<p align="center">
  <a href="https://www.youtube.com/shorts/V-HrVVhi1no"
     style="display:inline-block; padding:14px 30px; border-radius:14px; background:#111827; color:#ffffff; font-size:16px; font-weight:700; text-decoration:none; border:1px solid #374151;">
    ▶&nbsp;&nbsp; Watch the Demo
  </a>
</p>

---

## 💡 About Watchify

**Watchify** is a full-stack video-sharing application built from the ground up as a hands-on exploration of modern mobile and backend development.

The app allows users to discover and interact with video content, upload their own videos, create playlists, and engage with other users through likes, comments, and sharing.

Rather than being just a UI prototype, Watchify includes a dedicated backend, database, cloud media storage, authentication, and real-time communication.

---

## ✨ Features

### 🔐 Google Authentication

Sign in using Google for a simple and secure authentication experience.

### 🎥 Video Uploads

Upload videos and make them available to other users through the platform.

### 📚 Playlists

Create and manage custom playlists to organize your favorite content.

### ❤️ Social Interactions

Like, comment on, and share videos with other users.

### ⚡ Real-time Communication

Uses **Socket.io** to enable real-time functionality between the mobile application and backend.

### ☁️ Cloud Media Storage

Video and media assets are handled through **Cloudinary** rather than being stored directly on the application server.

### 📱 Cross-platform Mobile App

Built with **React Native + Expo**, allowing the application to run across supported mobile platforms.

---

## 🏗️ Architecture

Watchify is split into a mobile client and a dedicated backend service.

```text
                       ┌─────────────────────┐
                       │       Watchify      │
                       │    React Native     │
                       │       + Expo        │
                       └──────────┬──────────┘
                                  │
                         REST API / Socket.io
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │   Express Backend   │
                       └──────────┬──────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                ▼                 ▼                 ▼
          ┌──────────┐      ┌───────────┐     ┌───────────┐
          │ MongoDB  │      │ Cloudinary│     │ Socket.io │
          │ Database │      │   Media   │     │ Real-time │
          └──────────┘      └───────────┘     └───────────┘
```

### Components

**Mobile**

* React Native
* Expo
* TypeScript
* Gluestack UI

**Backend**

* Node.js
* Express
* MongoDB
* Socket.io
* Cloudinary
* JWT authentication

---

## 🛠️ Tech Stack

| Layer              | Technologies                   |
| ------------------ | ------------------------------ |
| **Mobile**         | React Native, Expo, TypeScript |
| **UI**             | Gluestack UI                   |
| **Backend**        | Node.js, Express               |
| **Database**       | MongoDB                        |
| **Real-time**      | Socket.io                      |
| **Media Storage**  | Cloudinary                     |
| **Authentication** | Google OAuth, JWT              |

---

## 🎥 Demo

Watch the application in action:

<p align="center">
  <a href="https://www.youtube.com/shorts/V-HrVVhi1no">
    <img src="https://res.cloudinary.com/di7b9ifgh/image/upload/v1711125182/Watchify_Mockup_Screen_2_39ab387f3f.png" alt="Watch Watchify Demo" width="750"/>
  </a>
</p>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js and npm
* MongoDB
* Expo development environment
* A Google OAuth application
* A Cloudinary account

### 1. Clone the mobile application

```bash
git clone https://github.com/Utkarshvr/Watchify-RN-App.git
cd Watchify-RN-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Clone the backend

The backend is maintained in a separate repository:

```bash
git clone https://github.com/Utkarshvr/watchify-server-react_native.git
cd watchify-server-react_native
npm install
```

### 4. Configure environment variables

Create a `.env` file in the backend and configure:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit real API keys, passwords, tokens, or private credentials to the repository.

### 5. Start the backend

```bash
npm start
```

### 6. Start the Expo application

From the mobile application directory:

```bash
npm start
```

Then open the project using Expo Go, an Android emulator, or an iOS simulator.

---

## 📱 Using Watchify

Once the application is running, you can:

1. **Sign in** using Google
2. **Explore** available videos
3. **Upload** your own content
4. **Create playlists**
5. **Like and comment** on videos
6. **Share** content with others

---

## 🧠 What I Learned

Building Watchify gave me practical experience with the challenges involved in developing a full-stack mobile application.

Some of the things I explored:

* Structuring a React Native application
* Building and consuming REST APIs
* Authentication and authorization
* MongoDB data modeling
* Handling media uploads with Cloudinary
* Real-time communication with Socket.io
* Connecting a mobile client to a dedicated backend
* Managing frontend and backend development as separate projects

---

## 🌱 Open Source

Watchify is publicly available for anyone interested in exploring the implementation.

Feel free to:

* ⭐ Star the repository
* 🍴 Fork it
* 🐛 Report issues
* 💡 Suggest improvements
* 🔧 Submit pull requests

---

## 👨‍💻 About

Built by **Utkarsh Verma**.

I'm a developer interested in building web, mobile, and AI products — from the initial idea and interface design all the way to development and deployment.

**Portfolio:** https://uvcodes.vercel.app

**GitHub:** https://github.com/Utkarshvr

---

## 📄 License

See the `LICENSE` file for details.
