# EDUSENS
Educations Platform

## Backend Added

An Express.js backend has been added in `edusens_backend` to provide API endpoints for the React frontend in `edusens`.

### Features
- Test endpoint: `GET /api/test` returns `{ status: 'ok', message: 'EduSens backend is running' }`.
- CORS configured (defaults to `http://localhost:3000`).
- JSON body parsing.

### Prerequisites
- Node.js (LTS 18+ or newer). Verify with `node -v`.

### Install Dependencies
```
cd edusens_backend && npm install
cd ../edusens && npm install
```

### Run Backend (port 5000 by default)
```
cd edusens_backend
npm run dev
```

### Run Frontend (port 3000)
In a new terminal:
```
cd edusens
npm start
```

### Example Frontend Usage
`src/apiClient.js` defines an axios instance. `Home.js` triggers a test request on mount and logs the response in the browser console.

### Environment Variables
- Frontend: `REACT_APP_API_BASE` to override base API URL (default `http://localhost:5000/api`).
- Backend: `PORT` to change server port, `CORS_ORIGIN` (comma-separated origins) to customize allowed origins.

### Adding New Routes
Add them in `edusens_backend/server.js` under the `/api` path. Return JSON.

### Concurrency Option
Optionally install `concurrently` in the root or a scripts package to start both: `npm install -D concurrently` then create a root script. Not added to keep dependencies minimal.

### Folder Structure
```
edusens/          # React frontend
edusens_backend/  # Express backend
```

### Future Enhancements
- Add persistent storage (e.g., PostgreSQL, MongoDB)
- Implement authentication (JWT / session)
- Add integration tests

