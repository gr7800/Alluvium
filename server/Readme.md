
# Chat Application Server

This is the server-side code for a chat application built using Node.js, Express, and MongoDB. The application includes features like user registration, authentication, one-to-one and group chats, and real-time messaging. The code is structured with proper error handling, token-based authentication, and efficient data retrieval using Mongoose.

### Deployed url :- 
```bash
https://alviaum.onrender.com
```


## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [User Routes](#user-routes)
  - [Chat Routes](#chat-routes)
  - [Message Routes](#message-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Chat Model](#chat-model)
  - [Message Model](#message-model)
- [Error Handling](#error-handling)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

### Running the Server

To start the server in development mode, use:

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

## API Documentation

### User Routes

#### Register User

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "pic": "https://example.com/johndoe.jpg"
  }
  ```
- **Response:**
  - **200 OK:** User registered successfully.
  - **400 Bad Request:** Missing fields or user already exists.
  - **500 Internal Server Error:** Server error.

#### Authenticate User

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - **200 OK:** User authenticated successfully.
  - **401 Unauthorized:** Invalid email or password.
  - **500 Internal Server Error:** Server error.

#### Get All Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Query Parameters:**
  - `search`: (Optional) Search users by name or email.
- **Response:**
  - **200 OK:** List of users excluding the logged-in user.
  - **500 Internal Server Error:** Server error.

### Chat Routes

#### Access or Create One-to-One Chat

- **URL:** `/api/chat`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "userId": "64a6e8b4f9d4e22f1a2b7a33"
  }
  ```
- **Response:**
  - **200 OK:** Chat retrieved or created successfully.
  - **400 Bad Request:** UserId not provided.
  - **500 Internal Server Error:** Server error.

#### Fetch All Chats for Logged-In User

- **URL:** `/api/chat`
- **Method:** `GET`
- **Response:**
  - **200 OK:** List of all chats for the user.
  - **500 Internal Server Error:** Server error.

#### Create Group Chat

- **URL:** `/api/chat/group`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "My Group Chat",
    "users": "[\"64a6e8b4f9d4e22f1a2b7a33\", \"64a6e8b4f9d4e22f1a2b7a34\"]"
  }
  ```
- **Response:**
  - **200 OK:** Group chat created successfully.
  - **400 Bad Request:** Missing fields or invalid users data.
  - **500 Internal Server Error:** Server error.

#### Rename Group Chat

- **URL:** `/api/chat/group/rename`
- **Method:** `PUT`
- **Payload:**
  ```json
  {
    "chatId": "64a6e8b4f9d4e22f1a2b7a33",
    "chatName": "New Group Chat Name"
  }
  ```
- **Response:**
  - **200 OK:** Group chat renamed successfully.
  - **404 Not Found:** Chat not found.
  - **500 Internal Server Error:** Server error.

#### Add User to Group Chat

- **URL:** `/api/chat/group/add`
- **Method:** `PUT`
- **Payload:**
  ```json
  {
    "chatId": "64a6e8b4f9d4e22f1a2b7a33",
    "userId": "64a6e8b4f9d4e22f1a2b7a35"
  }
  ```
- **Response:**
  - **200 OK:** User added to group chat successfully.
  - **404 Not Found:** Chat not found.
  - **500 Internal Server Error:** Server error.

#### Remove User from Group Chat

- **URL:** `/api/chat/group/remove`
- **Method:** `PUT`
- **Payload:**
  ```json
  {
    "chatId": "64a6e8b4f9d4e22f1a2b7a33",
    "userId": "64a6e8b4f9d4e22f1a2b7a35"
  }
  ```
- **Response:**
  - **200 OK:** User removed from group chat successfully.
  - **404 Not Found:** Chat not found.
  - **500 Internal Server Error:** Server error.

### Message Routes

#### Send Message

- **URL:** `/api/message`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "content": "Hello, World!",
    "chatId": "64a6e8b4f9d4e22f1a2b7a33"
  }
  ```
- **Response:**
  - **200 OK:** Message sent successfully.
  - **400 Bad Request:** Invalid data provided.
  - **500 Internal Server Error:** Server error.

#### Get All Messages in a Chat

- **URL:** `/api/message/:chatId`
- **Method:** `GET`
- **Response:**
  - **200 OK:** List of messages in the chat.
  - **400 Bad Request:** Error retrieving messages.
  - **500 Internal Server Error:** Server error.

## Models

### User Model

- **Fields:**
  - `name`: String, required
  - `email`: String, required, unique
  - `password`: String, required
  - `pic`: String, default profile picture URL
- **Methods:**
  - `matchPassword(enteredPassword)`: Compares entered password with hashed password.

### Chat Model

- **Fields:**
  - `chatName`: String, trimmed
  - `isGroupChat`: Boolean, default `false`
  - `users`: Array of User ObjectIds
  - `latestMessage`: Message ObjectId
  - `groupAdmin`: User ObjectId
- **Timestamps:** Automatic createdAt and updatedAt fields.

### Message Model

- **Fields:**
  - `sender`: User ObjectId
  - `content`: String, trimmed
  - `chat`: Chat ObjectId
  - `readBy`: Array of User ObjectIds
- **Timestamps:** Automatic createdAt and updatedAt fields.

## Error Handling

The application includes centralized error handling middleware to capture and respond to errors. Custom error messages and stack traces (in development mode) are sent to the client.

## Middleware

### Authentication Middleware

- **Protect:** Ensures that routes are accessible only by authenticated users. Verifies the JWT token and retrieves the user data.

### Error Handling Middleware

- **notFound:** Handles 404 errors for undefined routes.
- **errorHandler:** Handles general errors across the application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
