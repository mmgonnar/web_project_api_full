# Web Project Around Us - Full Stack Application

Around The U.S. is a full-stack interactive application that allows users to explore and share interesting locations across the United States. This project demonstrates modern web development practices, including responsive design, component-based architecture, and API integration.

## Project Structure

The project is divided into two main parts:

- **Frontend**: A React-based user interface
- **Backend**: A Node.js/Express API server

## Features

### Frontend

- User authentication (login, registration)
- Protected routes for authenticated users
- Profile management (edit profile, update avatar)
- Card management (add, delete, like cards)
- Responsive design for mobile and desktop
- Loading spinner for asynchronous operations
- Error handling and user feedback with tooltips

### Backend

- RESTful API architecture
- User authentication and authorization
- Secure password handling
- Database integration
- File upload handling
- Error handling and validation

## Technologies Used

### Frontend

- React 19.0.0
- React Router DOM 7.2.0
- React Spinners 0.15.0
- Vite 6.2.0 (Build tool)
- ESLint (Code linting)

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Express Validator

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to http://localhost:5173

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API will be available at http://localhost:3000

## API Endpoints

### Authentication

- POST /api/signup - Register a new user
- POST /api/signin - Authenticate user and return a token
- GET /api/users/me - Get current user information

### Users

- GET /api/users - Get all users
- GET /api/users/:userId - Get user by ID
- PATCH /api/users/me - Update user profile
- PATCH /api/users/me/avatar - Update user avatar

### Cards

- GET /api/cards - Get all cards
- POST /api/cards - Create a new card
- DELETE /api/cards/:cardId - Delete a card
- PUT /api/cards/:cardId/likes - Like a card
- DELETE /api/cards/:cardId/likes - Unlike a card

## Development

### Frontend Development

- Uses Vite for fast development and building
- ESLint for code quality
- React Router for navigation
- Component-based architecture

### Backend Development

- RESTful API design
- Middleware for authentication and error handling
- MongoDB for data persistence
- Environment variables for configuration

## Deployment

The frontend can be deployed using the provided deploy script:

```bash
npm run deploy
```

## Contact

If you have any questions, suggestions, or just want to say hello, feel free to reach out:

- **Email:** [mmgonnar@gmail.com](mailto:mmgonnar@gmail.com)
- **LinkedIn:** [/mmgonnar](https://www.linkedin.com/in/mmgonnar/)
- **Twitter:** [@mmgonnar](https://x.com/mmgonnar)

Your feedback and contributions are greatly appreciated!
