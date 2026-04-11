
# DarkFrame (React Client)

DarkFrame is a single-page React application that serves as the client for the MyFlix Movie API. It allows users to browse horror and thriller movies, explore detailed information, and manage a personalized list of favorite films.

The application is built as a responsive SPA using React and Redux, with authentication handled via JWT and data fetched from a RESTful backend.

## Screenshots

## Tech Stack  

### Frontend
- React
- React Router
- Redux

### Styling
- Bootstrap

### Tooling & Deployment
- Parcel
- Netlify

### Backend (separate repository)
- Node.js
- Express
- MongoDB
- JWT Authentication

## Key Features
- Browse a list of all movies
- Search movies by title
- View detailed movie information (genre, director, description)
- Register and log in as a user
- Add and remove movies from favorites
- View and update user profile
- Delete user account
- Responsive design for mobile and desktop

## Architecture Highlights

- Built as a single-page application using React
- Uses Redux for global state management (user data, movies, favorites)
- Handles client-side routing with React Router
- Integrates with a RESTful API for all data operations
- Manages authentication state using JWT tokens stored on the client
- Separates UI components and state logic for maintainability

## Set up instructions

### Prerequisites
- Node.js and npm installed
- Running instance of the MyFlix API 

### Steps
1. **Clone the repository**  
   ```bash
   git clone https://github.com/annapgsm/myFlix-client.git
   cd myFlix-client
2. **Install dependencies** 
   ```bash
   npm install
3. **Environment  variables**
-  Create a .env file in the root of the project and add:
  ```bash
REACT_APP_API_URL=https://movie-api-o14j.onrender.com/
 ```

- The React app uses this environment variable to make API requests. Make sure your API calls reference `process.env.REACT_APP_API_URL`.

4. **Run locally**
 ```bash
   parcel src/index.html 

```
## Deployment
The application is deployed on Netflify:

https://darkframe.netlify.app/

## Learnings
- Built a complete SPA using React and managed global state with Redux
- Implemented client-side routing and protected views based on authentication
- Integrated a frontend application with a RESTful backend API
- Managed authentication state using JWT tokens
- Learned how to structure a scalable React application with reusable components



