

# Chat-Boat

**Chat-Boat** is a modern web application for user authentication and chat management, featuring a login and signup system. This app is built with React and styled using Tailwind CSS. It supports user authentication, error handling, and interactive UI elements.

### Deployed URL (Frontend)

```bash
https://alluviumguddu.netlify.app
```

### Deployed URL (Backend)

```bash
https://alviaum.onrender.com
```

## Features

- **User Authentication**: Secure login and signup functionality.
- **Password Visibility Toggle**: Show or hide password input fields.
- **Error Handling**: Inform users of validation errors and server-side issues using `react-toastify`.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Guest User Option**: Provides a button to auto-fill login credentials for testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Error Handling](#error-handling)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Frontend

To get started with the Chat-Boat frontend, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/chat-boat.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd chat-boat
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   REACT_APP_BASE_URL=<your-api-base-url>
   ```

5. **Start the Development Server**:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

### Backend

To get started with the Chat-Boat backend, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the Server**:

   To start the server in development mode, use:

   ```bash
   npm run dev
   ```

   To start the server in production mode:

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:5000`.

## Usage

### Frontend

#### Login Page

The Login page allows users to authenticate using their email and password.

- **Email Address**: A field to enter the user's email address.
- **Password**: A field to enter the user's password with an option to toggle visibility.
- **Login Button**: Submits the form and triggers authentication.
- **Guest User Button**: Auto-fills the form with test credentials for quick access.
- **Sign Up Link**: Redirects to the registration page for new users.

#### SignUp Page

The SignUp page enables users to create a new account.

- **Name**: A field to enter the user's full name.
- **Email Address**: A field to enter the user's email address.
- **Password**: A field to enter the password with an option to toggle visibility.
- **Confirm Password**: A field to confirm the user's password.
- **Sign Up Button**: Submits the form to create a new account.
- **Login Link**: Redirects to the login page for users with an existing account.

### Backend

#### User Routes

- **Register User**: `POST /api/users/register`
- **Authenticate User**: `POST /api/users/login`
- **Get All Users**: `GET /api/users`

#### Chat Routes

- **Access or Create One-to-One Chat**: `POST /api/chat`
- **Fetch All Chats for Logged-In User**: `GET /api/chat`
- **Create Group Chat**: `POST /api/chat/group`
- **Rename Group Chat**: `PUT /api/chat/group/rename`
- **Add User to Group Chat**: `PUT /api/chat/group/add`
- **Remove User from Group Chat**: `PUT /api/chat/group/remove`

#### Message Routes

- **Send Message**: `POST /api/message`
- **Get All Messages in a Chat**: `GET /api/message/:chatId`

## Models

### User Model

- **Fields**: `name`, `email`, `password`, `pic`
- **Methods**: `matchPassword(enteredPassword)`

### Chat Model

- **Fields**: `chatName`, `isGroupChat`, `users`, `latestMessage`, `groupAdmin`
- **Timestamps**: Automatic createdAt and updatedAt fields.

### Message Model

- **Fields**: `sender`, `content`, `chat`, `readBy`
- **Timestamps**: Automatic createdAt and updatedAt fields.

## Error Handling

The application includes centralized error handling middleware to capture and respond to errors. Custom error messages and stack traces (in development mode) are sent to the client.

## Middleware

### Authentication Middleware

- **Protect**: Ensures that routes are accessible only by authenticated users. Verifies the JWT token and retrieves the user data.

### Error Handling Middleware

- **notFound**: Handles 404 errors for undefined routes.
- **errorHandler**: Handles general errors across the application.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
