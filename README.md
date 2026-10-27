# MediGuide

MediGuide is a React/Vite demonstration app for signing in and saving a private symptom log. Its checkup screen is a **simulation**: it does not diagnose conditions, assess severity, use AI or medical databases, or provide treatment advice. Older records created by previous versions remain labeled as legacy records of unverified origin.

## Run locally

```bash
cd frontend
npm ci
```

Create `frontend/.env` using `frontend/.env.example` as the template. Set `VITE_SUPABASE_URL` to your project URL and `VITE_SUPABASE_ANON_KEY` to its **publishable** key (a legacy `anon` key also works). Never use a Supabase secret or `service_role` key in a `VITE_` variable. Vite puts those values in the browser bundle. The `NEXT_PUBLIC_*` variables from other frameworks are unused here.

```bash
npm run dev
```

Vite reads `.env` when it starts; restart the server after changing it. Run commands from `frontend`, not the repository root.

## Database setup

In a new Supabase project, run `supabase/schema.sql`, then `supabase/migrations/001_demo_constraints.sql` in the SQL Editor. For an existing project that already has the original table, run only the migration. Deploy the schema change before deploying the updated frontend, because the frontend writes and reads the new `is_simulated` column. Existing rows receive `false` and remain labeled as legacy records.

The schema enables row level security and policies requiring `auth.uid() = user_id` for reads and writes. Verify the policies in the hosted project before accepting real user data. The project currently holds test data only. Health records are sensitive even in a demo.

## Checks

```bash
cd frontend
npm test
npm run lint
npm run build
npm audit
```

The production build requires the two public Supabase variables and rejects unexpected `VITE_` variables or a privileged Supabase key before bundling. Keep server credentials outside the frontend and its build environment.

MediGuide currently supports signup, login, logout, saving demo checkups, and paginated history viewing. Record editing, deletion, emergency contacts, and medical assessment are not implemented.
