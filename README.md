# E-Commerce Application

This is a simple e-commerce web application built with a Node.js backend and a React frontend. The application allows users to register, log in, view products, add items to their cart, and manage their shopping cart.

## Project Structure

```
e-commerce-app
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- **User Authentication**: Users can sign up and log in using JWT for secure authentication.
- **Product Management**: Admins can create, read, update, and delete products with filtering options based on price and categories.
- **Shopping Cart**: Users can add items to their cart, remove items, and view their cart. Cart items persist even after logging out.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, React Router

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Create a `.env` file and add your MongoDB connection string and any other necessary environment variables.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Create a `.env` file if needed for any environment variables.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the frontend application:
   ```
   npm start
   ```

## API Endpoints

- **Authentication**
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Items**
  - `POST /api/items`: Create a new item.
  - `GET /api/items`: Retrieve all items (with optional filters).
  - `PUT /api/items/:id`: Update an existing item.
  - `DELETE /api/items/:id`: Delete an item.

- **Cart**
  - `POST /api/cart`: Add an item to the cart.
  - `DELETE /api/cart/:id`: Remove an item from the cart.
  - `GET /api/cart`: Retrieve the current user's cart.

## License

This project is licensed under the MIT License.