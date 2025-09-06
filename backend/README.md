# E-Commerce App Backend

This is the backend part of the E-Commerce application built using Node.js, Express, and MongoDB. The backend provides RESTful APIs for user authentication, item management, and shopping cart functionalities.

## Features

- User Authentication
  - Signup
  - Login
- Item Management
  - Create, Read, Update, Delete (CRUD) operations for items
  - Filtering options by price and categories
- Shopping Cart Management
  - Add items to cart
  - Remove items from cart
  - Persist cart items after logout

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd e-commerce-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following variables:
   ```
   MONGODB_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user
- **POST /api/auth/login**: Authenticate a user

### Items

- **POST /api/items**: Create a new item
- **GET /api/items**: Retrieve all items (with optional filters)
- **PUT /api/items/:id**: Update an existing item
- **DELETE /api/items/:id**: Delete an item

### Cart

- **POST /api/cart**: Add an item to the cart
- **DELETE /api/cart/:id**: Remove an item from the cart
- **GET /api/cart**: Retrieve cart items

## License

This project is licensed under the MIT License.