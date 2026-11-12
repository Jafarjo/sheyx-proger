# sheyx-proger

Responsive programming-learning site with Russian, English, and Tajik home-page content, a Node.js API, PostgreSQL storage, student accounts, course applications, and a protected admin area.

## What works

- Separate registration, login, student account, and admin pages.
- Passwords are hashed with bcrypt; login state is stored in server-side PostgreSQL sessions and an HttpOnly cookie.
- New registrations are always students. The administrator is provisioned only from server environment variables.
- Course applications are stored in PostgreSQL. Signed-in students can see their own applications; admins can review all applications and change their status.
- API input validation, parameterized SQL, rate limits, secure response headers, same-origin checks, and role checks.
- Static site assets are served from `public/`; server code and environment files are not in the public directory.

## Run locally

Requirements: Node.js 20+ and a PostgreSQL database.

1. Copy `.env.example` to `.env` (PowerShell: `Copy-Item .env.example .env`) and set `DATABASE_URL`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` with at least 14 characters.
2. Install dependencies and start the app:

   ```bash
   npm ci
   npm start
   ```

3. Open `http://localhost:3000`. The app creates its database tables on startup.
4. Sign in to the admin panel at `http://localhost:3000/admin.html` using the email and password configured in `.env`.

Never commit `.env` or share the admin password. There is no built-in/default admin account.

## Free deployment (Render + Supabase)

The app server and its database are separate services. Render's free web service has an ephemeral filesystem, so this project stores persistent data in PostgreSQL rather than a local SQLite file.

1. Create a PostgreSQL project with Supabase. Copy its connection string; use a session pooler connection if the direct host is not reachable over IPv4. Require SSL.
2. Push this project to a GitHub repository you control.
3. In Render, create a **Blueprint** from that repository and use `render.yaml`, or create a free **Web Service** with:
   - Build command: `npm ci`
   - Start command: `npm start`
   - Health check path: `/api/health`
4. Add these environment variables to the Render service:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = the PostgreSQL connection string from Supabase
   - `ADMIN_EMAIL` = your administrator email
   - `ADMIN_PASSWORD` = a new, unique password of at least 14 characters
5. Deploy. The server creates the schema and administrator account at startup. Open `https://<your-render-service>.onrender.com/admin.html` to use the admin panel.

Supabase and Render free-plan limits, inactivity policies, and availability can change. A free Render service may sleep when idle, and a free database may have storage/compute limits or pause after inactivity. Check both providers' current terms and keep database backups before using this for real student records. A successful deployment still requires creating your own provider accounts and adding the secrets there; no hosting account or credentials are bundled with this project.

## Main routes

- `/` — public course site and application form
- `/register.html` — student registration
- `/login.html` — login
- `/dashboard.html` — signed-in student's profile and applications
- `/admin.html` — administrator dashboard
- `/api/health` — deployment health check
