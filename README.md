# To-Do App (Django + React + TypeScript)

## 🛠 Tech Stack
- Backend: Django REST Framework
- Frontend: React + TypeScript + TailwindCSS
- Database: SQLite

## 🚀 Setup

### Backend
```bash
cd server/
pipenv install django djangorestframework django-cors-headers
pipenv shell
python manage.py migrate
python manage.py runserver