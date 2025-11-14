# ResumeChecker Frontend

This is a minimal React frontend for the ResumeChecker backend.

Features
- Login / Register (uses `/api/auth`)
- Upload resume (PDF/DOCX) to `/api/resume/upload` and view ATS score
- Modern-looking, simple UI with plain CSS

Getting started
1. From the project root open a terminal and go to the client folder:

```powershell
cd e:\btech\finalProject\client
```

2. Install dependencies:

```powershell
npm install
```

3. Start the dev server:

```powershell
npm start
```

Notes
- The frontend `package.json` sets a proxy to `http://localhost:5000`. Make sure your backend is running on port 5000 (see `backend/server.js`).
- Uploaded files are linked as returned by the backend (it serves `/uploads/*`).
- The app stores the JWT token in `localStorage` under `token` after login.

Next steps / Improvements
- Add form validation and nicer feedback
- Show historical uploads and per-user storage (requires backend changes)
- Replace session storage with a proper state store (Redux / Context)

