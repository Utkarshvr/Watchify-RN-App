# Watchify

Welcome to **Watchify** – a dynamic video streaming platform designed for seamless entertainment experiences. Whether you're looking to explore a vast library of content, engage with your favorite videos, or connect with fellow enthusiasts, Watchify has you covered. With an intuitive interface and personalized features, Watchify elevates your streaming experience to new heights.

## Features

- **Google Login Integration**: Hassle-free access with secure Google authentication.
- **Video Uploads**: Easily upload your videos and share them with the community.
- **Playlist Creation**: Curate and manage your own playlists to organize your favorite content.
- **Social Sharing**: Share your favorite videos with friends and followers on various social media platforms.
- **Vast Content Library**: Explore a diverse range of multimedia content across different genres.
- **Engagement Tools**: Like, comment, and interact with videos and other users.

## Technologies Used

- **Frontend**: 
  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Gluestack UI Library](https://gluestack.io/)

- **Backend**: 
  - [ExpressJS](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Socket.io](https://socket.io/)
  - [Cloudinary](https://cloudinary.com/)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from [here](https://nodejs.org/).
- MongoDB installed. You can download it from [here](https://www.mongodb.com/try/download/community).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Utkarshvr/Watchify-RN-App
   cd Watchify-RN-App
   ```

2. **Install dependencies for the frontend:**
   ```bash
   npm install
   ```

3. **Install dependencies for the backend:**
   Clone the [Watchify Server Repo](https://github.com/Utkarshvr/watchify-server-react_native)
   ```bash
   git clone https://github.com/Utkarshvr/watchify-server-react_native
   cd watchify-server-react_native
   npm install
   ```

5. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following:
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

### Running the Application

1. **Start the backend server:**

   ```bash
   npm start
   ```

2. **Start the frontend:**
   ```bash
   npm start
   ```

3. **Open the Expo app on your mobile device and scan the QR code** to view the application.

## Usage

- **Google Login**: Use your Google account to log in securely.
- **Upload Videos**: Navigate to the upload section to share your content.
- **Create Playlists**: Organize videos into playlists for easy access.
- **Explore and Engage**: Browse through the content library, like, comment, and share videos.

## Contact

Utkarsh Verma - [utkarshv995@gmail.com](mailto:utkarshv995@gmail.com) - [LinkedIn](https://www.linkedin.com/in/utkarsh-verma-8965a7246/)

Project Link: [https://github.com/Utkarshvr/Watchify-RN-App](https://github.com/Utkarshvr/Watchify-RN-App)
