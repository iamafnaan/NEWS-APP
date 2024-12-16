# Global Gazette News App

## Project Overview

Global Gazette is a modern web application that delivers personalized news from around the world, leveraging cutting-edge web technologies to provide users with a seamless and informative news reading experience.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Authentication:** Firebase Authentication
- **News Sourcing:** External News API

## Features

- Real-time news updates
- User authentication
- Multiple category browsing
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)
- Git

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/iamafnaan/news-app.git
cd news-app
```

### Install Dependencies

#### Frontend Setup
```bash
cd news-app-frontend
npm install
```

#### Backend Setup
```bash
cd ../server
npm install
```

### Environment Configuration

Create `.env` files in both `frontend` and `server` directories:

#### Frontend `.env`
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_NEWS_API_KEY=your_news_api_key
```

#### Backend `.env`
```
PORT=5000
NEWS_API_BASE_URL= your url
```

### Running the Application

#### Start Backend Server
```bash
cd server
npm start
```

#### Start Frontend Development Server
```bash
cd  news-app-frontend
npm run dev
```


## News API Integration

1. Sign up at any news source api
2. Get your API key
3. Configure in the `.env` file

## Deployment

### Frontend Deployment
- Recommended: Netlify, Vercel

### Backend Deployment
- Recommended: vercel
- Ensure all environment variables are configured

## Contributing

1. Fork the repository
2. Create your feature branch 
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request



## Contact

Your Name - Afnaan
email - ahmedafnaan44@gmail.com
