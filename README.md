# 📚 Booknation

The **Booknation Web App** is the front-end application for the Booknation platform, a Full Stack project designed to help users organize, discover, and manage their personal book collections through a modern and intuitive interface.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, the application connects to the Booknation API to provide authentication, collection management, reading progress tracking, personalized goals, and book discovery features.


## 🌐 Live Demo

Access the application here:

[Booknation](https://booknationn.vercel.app/)


## ✨ Features

- 🔐 User registration and authentication
- 📖 Book management and reading progress tracking
- 📁 Creation and organization of custom collections
- 🔍 Book search and discovery
- 🎯 Personalized reading goals
- 📚 Dynamic book data powered by the Google Books API
- 📱 Responsive interface for desktop and mobile devices
- ⚡ Server state management with TanStack Query


## 🛠️ Project Structure

The project is organized into dedicated modules to keep the codebase maintainable, reusable, and easy to scale.

```text
src
├── assets          # Static assets and images
├── components      # Reusable UI components
├── contexts        # Global application contexts
├── data            # Static data
├── pages           # Application pages
├── routes          # Route definitions and protected routes
├── services        # API requests and external services
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles
```


## 🚀 Tech Stack

**Front-End**
- React
- TypeScript
- Vite
- Tailwind CSS

**State Management & Data Fetching**
- TanStack Query
- React Context API

**Routing**
- React Router

**API Communication**
- Axios
- RESTful API integration

**Deployment**
- Vercel


## 🧠 Key Technical Concepts

- Component-Based Architecture
- Reusable Components
- Responsive Design
- Context API
- Server State Management
- RESTful API Integration
- Protected Routes
- Authentication Flow
- Form Handling
- Error and Loading States
- Separation of Concerns
- Type-Safe Development


## 🔄 Application Responsibilities

The web application is responsible for:

- Providing the user interface for the Booknation platform
- Managing authentication state and protected routes
- Sending and retrieving data from the Booknation API
- Displaying books, collections, preferences, and reading goals
- Managing server state and request caching with TanStack Query
- Providing loading, success, and error feedback to users
- Adapting the interface across different screen sizes


## 🎯 Project Goals

This project was developed to deepen my knowledge of modern front-end development while building a complete application connected to a RESTful API.

The main focus was to apply best practices in:

- Component organization
- Responsive interface development
- API integration
- State management
- Type safety
- Reusability
- Maintainability
- User experience