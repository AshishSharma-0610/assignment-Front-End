# EmployWise User Management System

A React-based user management system that integrates with the Reqres API to perform basic user management functions.

## Features

- **Authentication**
  - Login system with email/password
  - Token-based authentication
  - Protected routes

- **User Management**
  - View all users in a paginated list
  - Search users by name or email
  - Edit user details
  - Delete users
  - Responsive card layout

- **UI/UX**
  - Modern, clean interface
  - Loading states and animations
  - Error handling and success messages
  - Responsive design for all devices
  - Interactive components with hover effects

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Vite
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AshishSharma-0610/assignment-Front-End.git
```

2. Navigate to the project directory:
```bash
cd assignment-Front-End
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable components
├── context/           # Context providers
├── pages/             # Page components
├── App.jsx           # Main app component
└── main.jsx         # Entry point
```

## Default Login Credentials

```
Email: eve.holt@reqres.in
Password: cityslicka
```

## Deployment

The project is deployed and can be accessed at: https://assignment-front-end-oh18.vercel.app/

## Features Implemented

1. **Authentication Screen**
   - Login form with email/password
   - Token storage in localStorage
   - Protected routes

2. **User List**
   - Paginated user display
   - Search functionality
   - Responsive card layout
   - Loading states

3. **User Management**
   - Edit user information
   - Delete user with confirmation
   - Success/error notifications
   - Form validation

## Additional Features

- Client-side search and filtering
- React Router for navigation
- Loading states and animations
- Responsive design
- Modern UI with Tailwind CSS
- Error handling and user feedback


## License

MIT
