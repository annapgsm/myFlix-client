
# Dark Frame React App

DarkFrame is a single-page React application that serves as the front-end for the myFlix REST API, displaying horror/ thriller movies.

It allows users to browse movies, manage their profiles, and maintain personalized lists of favorite films.

## Overview 

This project is part of a full-stack JavaScript application built using the MERN stack (MongoDB, Express, React, Node.js).
The client consumes a RESTful API for all movie and user-related data. It’s implemented as a single-page application (SPA) with routing, authentication, and responsive UI components.

## Tools & Technologies  

- React - frontend framework
- React router - client-side routing
- Bootstrap - styling and responsive layout
- Parcel- build and bundling Tool
- Redux - state management
- Node.js/ Express - backend and REST endpoints
- MongoDB - database for movie and user data
- JWT (JSON Web Token) - authentication and authorization

## Features
- View a list of all movies with title, image, and description
- Search movies by title
- View detailed information about a selected movie (genre, director, description)
- Register and log in as a user
- Add or remove movies from your favorites
- View and update user profile information
- Delete user account
- Responsive and mobile-friendly design
## Authentication

- Most endpoints require a valid **JWT token**.  
- Obtain a token by logging in with your credentials.  
- Include the token in your request header:  
  ```bash
  Authorization: Bearer <your_token>

## Set up instructions

### Prerequisites
- Node.js and npm installed
- Access to running myFlixAPI

### Steps
1. **Clone the repository**  
   ```bash
   git clone https://github.com/annapgsm/myFlix-client.git
   cd myFlix-client
2. **Install dependencies** 
   ```bash
   npm install
3. **Configure environment  variables**
-  Create a .env file in the root of the project and add:
  ```bash
REACT_APP_API_URL=https://movie-api-o14j.onrender.com/
 ```

- The React app uses this environment variable to make API requests. Make sure your API calls reference `process.env.REACT_APP_API_URL`.

4. **Run the server locally**
 ```bash
   parcel src/index.html 

```
## Deployment
The application is deployed on Netflify and publicly accessible here:

https://darkframe.netlify.app/



