# Todo Dashboard Application
![Screenshot 2024-12-15 203147](https://github.com/user-attachments/assets/05925309-533d-450b-b2e2-866a7a1dedf2)

## Overview
The Todo Dashboard Application is a feature-rich task management tool designed to help users organize and track their daily tasks effectively. This project was built as part of my learning journey to sharpen my skills in modern web development technologies, focusing on creating a robust, scalable, and user-friendly application.

---

## Features

### Task Management
- Add, update, and delete tasks with ease.
- Categorize tasks and set priorities for better organization.
- Filter tasks by status: **All**, **Completed**, or **In-Progress**.

### Notifications
- Receive real-time notifications for tasks due within 24 hours.
- Built-in notification system leveraging browser APIs.

### Calendar Integration
- Visualize tasks on a calendar for better scheduling and planning.

### User Authentication
- Secure login and user session management using JWT.
- API integration for user authentication and task management.

### Intuitive UI/UX
- Modern, responsive design built with **React** and styled using **Tailwind CSS**.
- Dark-themed interface for better user experience.

---

## Tech Stack

### Frontend
- **React.js**: Component-based architecture for building the user interface.
- **Axios**: For API calls and data fetching.
- **Tailwind CSS**: Modern styling framework for responsive and clean designs.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Framework for creating RESTful APIs.

### Database
- **MongoDB**: NoSQL database for efficient task storage and retrieval.

### Tools & Utilities
- **JWT**: Secure user authentication.
- **Git/GitHub**: Version control and project hosting.
- **Postman**: API testing and development.
- **Date-fns**: For date manipulation.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- A package manager (e.g., npm or yarn)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-dashboard.git
   cd todo-dashboard
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=5000
     ```

4. Start the application:
   ```bash
   cd backend
   npm start
   ```
   Open another terminal for the frontend:
   ```bash
   cd frontend
   npm start
   ```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
.
├── frontend       # React.js frontend application
│   ├── src
│   │   ├── components  # Reusable components (Navbar, Sidebar, etc.)
│   │   ├── pages       # Page components (LoginPage, Dashboard, etc.)
│   │   └── assets      # Images and static assets
│   └── package.json    # Frontend dependencies
├── backend        # Node.js backend application
│   ├── models     # Mongoose models
│   ├── routes     # API routes
│   ├── controllers # Logic for handling requests
│   └── package.json # Backend dependencies
└── README.md      # Project documentation
```

---

## API Endpoints

### User Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login with email and password.
- **POST /api/auth/forgot-password**: Request a password reset.

### Task Management
- **GET /api/todos**: Fetch all tasks.
- **POST /api/todos**: Add a new task.
- **PUT /api/todos/:id**: Update an existing task.
- **DELETE /api/todos/:id**: Delete a task.

---

## Future Enhancements

- **Collaborative Features**: Allow multiple users to collaborate on tasks.
- **Advanced Filtering**: Search by tags, due dates, and priorities.
- **Mobile App**: Build a mobile version for iOS and Android.
- **Recurring Tasks**: Add support for recurring tasks.

---

## Screenshots

### Login Screen
![Screenshot 2024-12-15 203124](https://github.com/user-attachments/assets/5e93478b-77a1-4cc8-a790-b10de5d6ef58)


### Sign Up Screen
![Screenshot 2024-12-15 203132](https://github.com/user-attachments/assets/669596e0-b5df-46d0-8e42-ff7a162eeaeb)


### Dashboard View
![Screenshot 2024-12-15 203147](https://github.com/user-attachments/assets/2786325c-2906-46ac-8263-8fc9e9d116bc)


### Task Management
![Screenshot 2024-12-15 203156](https://github.com/user-attachments/assets/ef4cd43d-34c7-4a44-826d-5fe98dff36d0)


### Calendar View
![Screenshot 2024-12-15 203338](https://github.com/user-attachments/assets/75850e22-3fbb-4422-83a5-19a65f629cbc)


---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
Feel free to reach out to me for collaboration or feedback:
- **LinkedIn**: [Susith Deshan Alwis](https://www.linkedin.com/in/susith-deshan-alwis/)
- **GitHub**: [SusithD](https://github.com/SusithD)
- **Portfolio**: [The Qexle](https://theqexle.com/)

