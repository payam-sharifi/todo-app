# 📝 TodoApp

A modern **full-stack Todo Application** built with **React (Vite + TypeScript)** on the frontend and **Django REST Framework** on the backend.  
It includes an automated **GitHub Actions CI/CD pipeline** that deploys the app to a remote server using SSH and PM2.

FrontEnd   : https://mytodolist.appventuregmbh.com
BackendApi : https://apimytodos.appventuregmbh.com/api/todos

---
## 🏗️ Architecture Overview

The **TodoApp** frontend follows the **CQRS (Command Query Responsibility Segregation)** pattern to ensure clear separation between:
- **Commands:** operations that change state (e.g., create, update, delete tasks)
- **Queries:** operations that read state (e.g., fetch tasks, filter lists)

This approach improves maintainability, scalability, and testing by decoupling how data is **read** from how it’s **written**.

Frontend data fetching and mutation are implemented with:
- **React Query** for queries and cache management
- **Axios** for API communication
- **Custom hooks** (e.g., `useCreateTask`, `useGetTasks`, etc.) to encapsulate logic

---


## 🚀 Features

- Add, edit, and delete, update tasks 
- Mark tasks as completed or pending  
- Filter tasks by status (open / Active / Completed)  
- Responsive UI built with TailwindCSS  
- Pagination By Scroll(InfinitivScroll)
- RESTful API using Django REST Framework  
- Toast notifications and smooth UX  
- Automated deployment pipeline via GitHub Actions  
- OS Debian - NginX + PM2 + Gunicorn for stable backend process management  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React 19** + **Vite 7** + **TypeScript 5.9**
- **TailwindCSS 4**
- **React Query** for server-state management  
- **React Hook Form** for form handling  
- **Axios** for API communication  
- **React Toastify** for notifications  

### ⚙️ Backend
- **Django 4.2**
- **Django REST Framework (DRF)**
- **django-cors-headers**
- **django-filter**
- **python-decouple** for environment configuration  
- **Gunicorn** for production server  
- **PM2** for process management

---
## 🛠️ Local Development Setup

1️⃣ Clone the repository
```bash
git clone https://github.com/payam-sharifi/todo-app.git
cd todo-app

2️⃣ Frontend Setup
cd client
npm install
npm run dev
frontend will run at http://localhost:5173

3️⃣ Backend Setup
cd ../server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Run migrations
python manage.py migrate
# Start local server
python manage.py runserver
Backend runs on http://127.0.0.1:8000


## 📁 Project Structure

⚙️ Deployment Steps:
When code is pushed to the master branch:
GitHub Actions connects to your server via SSH
Pulls the latest code (git pull origin master)
Builds the frontend (npm ci && npm run build)
Installs backend dependencies and runs migrations
Restarts the Django backend with PM2 + Gunicorn
✅ Deployment is fully automated and requires no manual steps once set up.

 
 
Future Improvements can be done:
Add user authentication (login / signup)
Task deadlines and due dates
Search and filter improvements
Drag-and-drop reordering
Dark mode theme
Docker support for easy deployment


## 📁 Project Structure
todo-app/
│
├── 📂 client/ # Frontend (React + Vite + TypeScript + CQRS)
│ ├── 📂 src/ # Application source code
│ │ ├── 📂 api/ # Axios setup & API configuration
│ │ ├── 📂 commands/ # CQRS: "write" operations (create, update, delete)
│ │ ├── 📂 queries/ # CQRS: "read" operations (fetch tasks, filters)
│ │ ├── 📂 components/ # Reusable UI components
│ │ ├── 📂 hooks/ # Custom React hooks
│ │ ├── 📂 pages/ # Page-level components (e.g., Home, Tasks)
│ │ ├── 📂 types/ # TypeScript interfaces & models
│ │ └── 📂 utils/ # Helper functions (formatters, constants)
│ │
│ ├── 🧩 eslint.config.js # ESLint configuration
│ ├── 🎨 tailwind.config.js # TailwindCSS setup
│ ├── ⚙️ vite.config.ts # Vite bundler configuration
│ ├── 🧠 tsconfig.json # TypeScript configuration
│ ├── 📦 package.json # Frontend dependencies & scripts
│ └── 📄 README.md # Frontend-specific documentation
│
├── ⚙️ server/ # Backend (Django + Django REST Framework)
│ ├── 📂 todos/ # Main Django app (models, views, serializers, urls)
│ ├── 🧠 manage.py # Django management commands entry point
│ ├── ⚙️ settings.py # Django project settings
│ ├── 🌐 urls.py # Project-level URL routing
│ ├── 📦 requirements.txt # Python dependencies
│ └── ...
│
├── 🔁 .github/
│ └── 📂 workflows/
│ └── 🚀 deploy.yml # GitHub Actions workflow for automated deployment
│
└── 📄 README.md # Root documentation file

### 🏗️ Architecture Notes

- **Frontend:** Implements **CQRS pattern** — separating “queries” (data fetching) from “commands” (mutations).  
  - Queries: handled with **React Query** for caching and synchronization  
  - Commands: handled via **Axios mutations** with invalidation for UI updates  

- **Backend:** Django REST Framework provides clean API endpoints for tasks (CRUD operations).  
  - Uses **django-filter** and **CORS headers**  
  - Deployed using **Gunicorn** behind **PM2** for stability  

- **Deployment:** Automated via **GitHub Actions** (on push to `master`) using an SSH-based workflow that:
  1. Pulls the latest code  
  2. Builds the frontend  
  3. Installs backend dependencies & runs migrations  
  4. Restarts Django using **PM2 + Gunicorn**