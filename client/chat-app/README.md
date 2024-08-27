
# Chat-Boat

**Chat-Boat** is a modern web application for user authentication and chat management, featuring a login and signup system. This app is built with React and styled using Tailwind CSS. It supports user authentication, error handling, and interactive UI elements.

### Deployed url :- 
```bash
https://alluviumguddu.netlify.app

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
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Chat-Boat application, follow these steps:

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

## Usage

### Login Page

The Login page allows users to authenticate using their email and password. 

- **Email Address**: A field to enter the user's email address.
- **Password**: A field to enter the user's password with an option to toggle visibility.
- **Login Button**: Submits the form and triggers authentication.
- **Guest User Button**: Auto-fills the form with test credentials for quick access.
- **Sign Up Link**: Redirects to the registration page for new users.

### SignUp Page

The SignUp page enables users to create a new account.

- **Name**: A field to enter the user's full name.
- **Email Address**: A field to enter the user's email address.
- **Password**: A field to enter the password with an option to toggle visibility.
- **Confirm Password**: A field to confirm the user's password.
- **Sign Up Button**: Submits the form to create a new account.
- **Login Link**: Redirects to the login page for users with an existing account.

## Components

### Login

- **`Login`**: Handles user login, form submission, and error handling. It includes functionality for password visibility toggle and guest user credentials.

### SignUp

- **`SignUp`**: Manages user registration, including form validation, error handling, and password visibility toggle.

### App

- **`App`**: The main application component that integrates `react-toastify` for notifications and includes route management through `AllRoutes`.

## API Endpoints

### User Login

- **Endpoint**: `POST /api/user/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
  ```

### User Registration

- **Endpoint**: `POST /api/user/register`
- **Description**: Registers a new user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
  ```

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
