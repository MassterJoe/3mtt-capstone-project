# 3mtt-capstone-project
3MTT capstone project

# TaskMaster

**TaskMaster** is a full-stack web application designed to help users manage their tasks efficiently. It provides features for creating, organizing, and tracking tasks with ease. Built with modern web technologies, TaskMaster ensures a seamless and intuitive user experience.

---

See live site at: https://threemtt-project-dy13.onrender.com
Swagger documentation at https://threemtt-capstone-project-c0vy.onrender.com/api-docs/#/

Project files:
backend branch: https://github.com/MassterJoe/3mtt-capstone-project/tree/backend
frontend branch; https://github.com/MassterJoe/3mtt-capstone-project/tree/frontend
## 🚀 Features

- **User Registration and Authentication**: Secure login and registration using JWT or sessions.
- **Task Management**: Create, update, delete, and organize tasks with attributes like title, description, deadline, and priority.
- **Task Filtering**: Filter tasks by priority or due date.
- **Search Functionality**: Search for tasks by keywords in titles or descriptions.
- **Responsive Design**: A user-friendly interface adaptable to various screen sizes.
- **Data Persistence**: Reliable storage using MongoDB

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB 
---

## ⚙️ Installation and Setup

Follow these steps to set up the project locally:

1. **Clone this Repository**:
    Clone this repository and swictch to backend branch

2. **Install Dependencies**:

    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and configure the following:
    ```
    PORT=3000
    JWT_SECRET=your_jwt_secret
    DB_URI=mongodb://localhost:27017/taskmaster
    ```

4. **Run the Application**:
    ```
    npm start
    ```
    Access the app at `http://localhost:3000`.

---

## 🧪 API Endpoints

| Method | Endpoint                         | Description                  |
|--------|----------------------------------|------------------------------|
| POST   | `/api/auth/register`             | Register a new user          |
| POST   | `/api/auth/login`                | Login a user                 |
| GET    | `/api/tasks`                     | Fetch all tasks              |
| POST   | `/api/tasks`                     | Create a new task            |
| PUT    | `/api/tasks/:id`                 | Update a task by ID          |
| DELETE | `/api/tasks/:id`                 | Delete a task by ID          |
| GET    | `/api/tasks/search?query=:query` | Search tasks by keyword      |

---

## 🚧 Roadmap

- [x] User authentication and registration
- [x] Basic task management
- [x] Task filtering and search
- [ ] Dark mode support
- [ ] Calendar integration for deadlines
- [ ] Notifications and reminders

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, create a feature branch, and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- **Author**: Salawu O. Joseph
---

Enjoy managing your tasks with **TaskMaster**! 🎯