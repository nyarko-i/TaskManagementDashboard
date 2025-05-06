
# 📋 Task Management Dashboard

A fully functional Task Management frontend application built using **React**.  
It allows users to create, edit, and manage tasks with due dates, statuses, and file attachments.  
The app is optimized, tested, and well-structured for maintainability and scalability.



## 🚀 Features

- ✅ Create, edit, delete tasks  
- ✅ Assign due dates and status (Pending, In-Progress, Completed)  
- ✅ Upload and preview attachments  
- ✅ Simulated backend interaction (no real server required)  
- ✅ Responsive and clean UI  
- ✅ Form validation and user feedback



## 🛠️ Tech Stack

| **Frontend** | **Testing**   | **Linting & Formatting** | **Other Tools** |
|--------------|----------------|--------------------------|-----------------|
| React | Jest + React Testing Library | ESLint + Prettier | Tailwind CSS  |



## 📂 Project Structure

```

├── public/
├── src/
│   ├── components/
│   │   └──
│   ├── context/
│   │   └── 
│   ├── tests/
│   │   └── 
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.js
├── package.json
└── README.md
└── vite.config.js

```




## 📈 Core Requirements Demonstration

| **Requirement** | **How it is fulfilled** |
|-----------------|-------------------------|
| Fully functional frontend | Users can create, edit, delete tasks with files and status |
| Organized codebase | Components, context, and tests are modularized |
| Core features demo | Task form, validation, mock-auth user assignment |
| Performance optimizations | Minimal re-renders, optimized file previews |
| Unit/component tests | Jest & React Testing Library cover TaskForm |
| ESLint + Prettier config | applied project-wide |



## ⚡ Performance Optimizations Implemented

- ✅ Memoization of expensive file previews with `URL.createObjectURL`  
- ✅ Reduced unnecessary re-renders using controlled components and clean state resets  
- ✅ Minimal component tree depth for fast rendering  
- ✅ TailwindCSS for optimized CSS utility classes (reduced file size)

---

## 🧪 Testing

Unit and component tests implemented using:

- Jest
- React Testing Library

### To run tests:

```bash
npm test
```

Tests cover:

* ✅ Form field rendering
* ✅ Form submission and validation
* ✅ User email auto-assignment mocked and verified

---





## 🗄️ Simulated Backend Interactions & Data Management

* **Authentication** is simulated using a mocked **`useAuthStore`** context that provides a fake user:

* **Task saving** simulates persistence by:

  * Passing form data (including the user’s email) to a parent callback `onSave()`
  * Managing task data locally (no real API calls)

* **File Upload** uses **browser-generated previews** (`URL.createObjectURL`) — no actual file storage

---

## 🧹 How to Run the Project

### Install dependencies

```bash
npm install
```
```bash
npm run dev
```

The app will run on:
```bash
http://localhost:5173
```

*(or `3000` if Create React App was used)*



## 👨🏽‍💻 Author

**Isaac Nyarko**
Frontend Developer
*Ours Limited Intern*

