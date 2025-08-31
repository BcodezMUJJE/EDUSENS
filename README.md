
# EDUSENS
Educations Platform

## Backend Overview

### Express Backend
- Location: `edusens_backend/server.js`
- Features:
	- REST API with Express.js
	- Test endpoint: `GET /api/test` returns JSON confirmation
	- CORS enabled for frontend communication
	- Modular structure for future scalability

### Strapi Headless CMS
- Location: `edusens_backend/strapi`
- Features:
	- Quickstart setup (SQLite for dev)
	- Course collection type with fields:
		- title (Text)
		- description (Rich Text)
		- duration (Text)
		- category (Enumeration: Beginner, Intermediate, Advanced)
		- video_url (Text)
		- thumbnail (Media upload)
	- REST endpoints:
		- `GET /api/courses` (list all)
		- `GET /api/courses/:id` (single course)
	- Public API permissions for find/findOne (enable in Strapi Admin UI)
	- Media served at `/uploads/` (see CORS/media config below)

## Setup Instructions

### Prerequisites
- Node.js (LTS 18+ or newer). Verify with `node -v`

### Install Dependencies
```bash
cd edusens_backend && npm install
cd edusens_backend/strapi && npm install
cd ../../edusens && npm install
```

### Running Servers
```bash
# Express backend (port 5000)
cd edusens_backend
npm run dev

# Strapi backend (port 1337)
cd edusens_backend/strapi
npm run develop

# React frontend (port 3000)
cd edusens
npm start
```

### Strapi Admin Setup
1. Start Strapi: `npm run develop`
2. Visit: http://localhost:1337/admin
3. Create admin user
4. Go to Settings > Users & Permissions > Roles > Public
5. Enable Course: find & findOne
6. Save
7. Add Course entries via Content Manager

### Example React Integration
Create `src/Components/CoursesList.js`:
```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

export default function CoursesList() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(`${API_BASE}/api/courses?populate=thumbnail`)
			.then(res => {
				setCourses(res.data.data || []);
			})
			.catch(err => {
				console.error('Failed to load courses', err);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading courses...</p>;

	return (
		<div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
			{courses.map(c => {
				const attrs = c.attributes;
				const thumb = attrs.thumbnail?.data?.attributes?.url
					? `${API_BASE}${attrs.thumbnail.data.attributes.url}`
					: null;
				return (
					<div key={c.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.75rem' }}>
						{thumb && <img src={thumb} alt={attrs.title} style={{ width: '100%', borderRadius: 4 }} />}
						<h3 style={{ margin: '0.5rem 0' }}>{attrs.title}</h3>
						<p style={{ fontSize: 14 }}>{attrs.description?.slice(0,120)}...</p>
						<p style={{ fontSize: 12, color: '#555' }}>
							{attrs.category} {attrs.duration && `• ${attrs.duration}`}
						</p>
						{attrs.video_url && (
							<a href={attrs.video_url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#0ea5e9' }}>
								Watch video
							</a>
						)}
					</div>
				);
			})}
		</div>
	);
}
```
Add route in `App.js`:
```javascript
// import CoursesList from './Components/CoursesList';
// <Route path='/courses' element={<CoursesList />} />
```

### CORS & Media
- Strapi serves media at `http://localhost:1337/uploads/...`
- To allow frontend access, ensure CORS origin includes `http://localhost:3000`.
- If needed, add `config/middlewares.ts` in Strapi:
```js
export default [
	'strapi::errors',
	{
		name: 'strapi::cors',
		config: {
			origin: ['http://localhost:3000'],
			headers: '*',
			methods: ['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'],
		},
	},
	'strapi::security',
	'strapi::poweredBy',
	'strapi::logger',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
];
```

### Environment Variables
- Frontend: `REACT_APP_API_BASE` (Express), `REACT_APP_STRAPI_URL` (Strapi)
- Backend: `PORT`, `CORS_ORIGIN` (Express), `HOST`, `PORT` (Strapi)

### Folder Structure
```
edusens/                  # React frontend
edusens_backend/
	server.js               # Express backend
	strapi/                 # Strapi CMS backend
		src/api/course/       # Course content type
			content-types/course/schema.json
			controllers/course.ts
			routes/course.ts
			services/course.ts
		config/
		public/
		.env
```

### Future Enhancements
- Add persistent storage (PostgreSQL, MongoDB)
- Implement authentication (JWT/session)
- Add integration tests

