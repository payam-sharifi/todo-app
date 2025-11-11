# 📝 TodoApp

Eine moderne **Full-Stack-Todo-Anwendung**, gebaut mit **React (Vite + TypeScript)** im Frontend und **Django REST Framework** im Backend.  
Sie enthält eine automatisierte **GitHub Actions CI/CD-Pipeline**, die die App über SSH auf einen Remote-Server mit **PM2** bereitstellt.

FrontEnd   : https://mytodolist.appventuregmbh.com
BackendApi : https://apimytodos.appventuregmbh.com/api/todos
---

## 🏗️ Architekturübersicht

Das Frontend von **TodoApp** folgt dem **CQRS-Muster (Command Query Responsibility Segregation)**, um eine klare Trennung zwischen folgenden Aufgaben zu gewährleisten:  
- **Commands:** Operationen, die den Zustand ändern (z. B. Aufgaben erstellen, aktualisieren, löschen)  
- **Queries:** Operationen, die den Zustand lesen (z. B. Aufgaben abrufen, filtern)

Dieser Ansatz verbessert die Wartbarkeit, Skalierbarkeit und Testbarkeit, indem **Lesen** und **Schreiben** von Daten getrennt werden.

Frontend-Datenabruf und -Mutationen werden implementiert mit:
- **React Query** für Query-Caching und Synchronisation  
- **Axios** für API-Kommunikation  
- **Custom Hooks** (z. B. `useCreateTask`, `useGetTasks`) zur Kapselung der Logik

---

## 🚀 Funktionen

- Aufgaben hinzufügen, bearbeiten, löschen und aktualisieren  
- Aufgaben als erledigt oder offen markieren  
- Aufgaben nach Status filtern (Offen / Aktiv / Abgeschlossen)  
- Responsives UI mit TailwindCSS  
- Pagination via Scroll (Infinite Scroll)  
- RESTful API mit Django REST Framework  
- Toast-Benachrichtigungen für eine flüssige Benutzererfahrung  
- Automatisierte Deployment-Pipeline über GitHub Actions  
- OS: Debian – Nginx + PM2 + Gunicorn für stabiles Backend-Management

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React 19** + **Vite 7** + **TypeScript 5.9**  
- **TailwindCSS 4**  
- **React Query** für Server-State-Management  
- **React Hook Form** für Formularhandling  
- **Axios** für API-Kommunikation  
- **React Toastify** für Benachrichtigungen  

### ⚙️ Backend
- **Django 4.2**  
- **Django REST Framework (DRF)**  
- **django-cors-headers**  
- **django-filter**  
- **python-decouple** für Umgebungsvariablen  
- **Gunicorn** als Produktionsserver  
- **PM2** zur Prozessverwaltung

---

## 🛠️ Lokale Entwicklungsumgebung

1️⃣ Repository klonen:
```bash
git clone https://github.com/payam-sharifi/todo-app.git
cd todo-app
2️⃣ Frontend einrichten:
cd client
npm install
npm run dev
Das Frontend läuft unter http://localhost:5173
3️⃣ Backend einrichten:
cd ../server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Migrationen durchführen
python manage.py migrate
# Server starten
python manage.py runserver
Das Backend läuft unter http://127.0.0.1:8000

🔁 Deployment Schritte
Wenn Code in den Branch master gepusht wird:
GitHub Actions verbindet sich via SSH mit dem Server
Es wird der aktuelle Code vom Repository geholt (git pull origin master)
Das Frontend wird gebaut (npm ci && npm run build)
Backend-Abhängigkeiten werden installiert und Migrationen durchgeführt
Das Django-Backend wird mit PM2 + Gunicorn neu gestartet
✅ Das Deployment ist vollständig automatisiert und erfordert keine manuellen Schritte.

📁 Projektstruktur
todo-app/
│
├── 📂 client/                       # Frontend (React + Vite + TypeScript + CQRS)
│   ├── 📂 src/                      # Quellcode der Anwendung
│   │   ├── 📂 api/                  # Axios-Setup & API-Konfiguration
│   │   ├── 📂 commands/             # CQRS: "Schreib"-Operationen (create, update, delete)
│   │   ├── 📂 queries/              # CQRS: "Lese"-Operationen (fetch tasks, filter)
│   │   ├── 📂 components/           # Wiederverwendbare UI-Komponenten
│   │   ├── 📂 hooks/                # Custom React Hooks
│   │   ├── 📂 pages/                # Seiten-Komponenten (Home, Tasks, etc.)
│   │   ├── 📂 types/                # TypeScript-Typen & Schnittstellen
│   │   └── 📂 utils/                # Hilfsfunktionen, Konstanten
│   │
│   ├── 🧩 eslint.config.js          # ESLint-Konfiguration
│   ├── 🎨 tailwind.config.js        # TailwindCSS Setup
│   ├── ⚙️ vite.config.ts            # Vite-Konfiguration
│   ├── 🧠 tsconfig.json             # TypeScript-Konfiguration
│   ├── 📦 package.json              # Frontend-Abhängigkeiten & Scripts
│   └── 📄 README.md                 # Frontend-spezifische Dokumentation
│
├── ⚙️ server/                       # Backend (Django + DRF)
│   ├── 📂 todos/                    # Django App (Models, Views, Serializers, URLs)
│   ├── 🧠 manage.py                 # Django Management Commands
│   ├── ⚙️ settings.py               # Django-Projekteinstellungen
│   ├── 🌐 urls.py                   # URL-Routing
│   ├── 📦 requirements.txt          # Python-Abhängigkeiten
│   └── ...
│
├── 🔁 .github/
│   └── 📂 workflows/
│       └── 🚀 deploy.yml            # GitHub Actions Deployment Workflow
│
└── 📄 README.md                     # Projekt-Dokumentation (dieses File)

🏗️ Architekturhinweise

Frontend: CQRS trennt „Queries“ (Datenabfrage) von „Commands“ (Mutationen).
Queries: React Query für Caching & Synchronisation
Commands: Axios Mutations + Invalidierung der Queries
Backend: Django REST Framework liefert saubere API-Endpunkte für CRUD-Operationen.
Verwendet django-filter & CORS headers
Bereitgestellt via Gunicorn hinter PM2 für Stabilität
Deployment: Automatisiert über GitHub Actions auf master.
Pull des aktuellen Codes
Frontend Build
Backend-Abhängigkeiten + Migrationen
Neustart des Backends via PM2 + Gunicorn