# MediGuide

MediGuide is a work-in-progress symptom log demo. A signed-in user can enter symptoms, save a **simulated** checkup, and review their own history. It is useful for demonstrating authentication and private record storage. It does **not** analyze symptoms, diagnose conditions, use AI or medical databases, assess severity, or recommend treatment.

## Current features and limits

- Email/password signup, sign-in, and sign-out through Supabase Auth. Whether signup requires email confirmation depends on the Supabase project's Auth settings; the UI prompts for confirmation when signup returns no session.
- A symptom entry form with suggestions, duplicate prevention, and a limit of 10 symptoms of at most 100 characters each. Saving writes a record marked `is_simulated = true`; its condition list is empty and its severity value is `Demo` for schema compatibility.
- A private history view that loads 20 records at a time, supports loading more, and shows loading and error states. Records from older app versions remain marked as legacy with an **unverified origin**; they are not silently relabeled as simulations.
- Session changes clear account-specific history and prevent delayed responses from an earlier account from appearing in the current session.

There is no medical assessment service. The app has no UI for editing or deleting records, password recovery, emergency contacts, or medical resources. The “Check Symptoms” and “Medical Resources” quick-navigation buttons are placeholders; “View History” works. Features described here depend on the database setup below.

## Architecture

This repository contains a **single-page React frontend**, Supabase SQL, and no custom backend server. The frontend uses Vite for development and static production builds, Tailwind CSS for styling, and `@supabase/supabase-js` for authentication and database requests. `frontend/index.html` also loads Font Awesome CSS from cdnjs for icons. There is no OpenAI or other medical API integration.

Navigation between dashboard and history uses React state, not URL routes.

The data flow is:

1. The browser signs in through Supabase Auth. The Supabase client receives auth changes and uses the resulting session for database requests.
2. Once the user ID is known, the frontend reads that user's `checkups` through Supabase's generated database API. It requests explicit columns, orders by `created_at` and `id`, and pages results in groups of 20.
3. Saving a demo checkup sends the entered symptoms and an explicitly simulated payload to the same API. The browser updates history only after the insert succeeds.
4. PostgreSQL row-level security (RLS) checks `auth.uid() = user_id`. The user ID supplied by the frontend is **not** an authorization boundary by itself.

## Stack and project structure

- `frontend/` — React application, Vite configuration, Tailwind CSS, npm manifest, and tests. ESLint and Node's built-in test runner provide the available checks.
- `frontend/src/App.jsx` — authenticated user, current view, history, pagination, and request state.
- `frontend/src/pages/` — login, demo dashboard, and history views; `frontend/src/services/` — Supabase Auth and `checkups` queries; `frontend/src/lib/` — client configuration, demo payload, and session guard.
- `supabase/schema.sql` — baseline PostgreSQL table and RLS setup; `supabase/migrations/` — the follow-up SQL migration. Supabase supplies the hosted database, Auth service, and generated database API.

## Database and authorization

The repository defines one application table, `public.checkups`, in [`supabase/schema.sql`](supabase/schema.sql). Its UUID `id` is the primary key. `user_id` is a required foreign key to `auth.users(id)` with `ON DELETE CASCADE`. `created_at` is a timestamp with a database default. The table also stores `symptoms` and `possible_conditions` as text arrays, `severity` and `recommendation` as text, and `is_simulated` as a boolean defaulting to `false`.

New demo records have an empty `possible_conditions` array, `severity = 'Demo'`, and `is_simulated = true`. The schema also permits the legacy severity values `Mild`, `Moderate`, and `Severe`. The migration limits new or updated rows to 1–10 symptoms and at most 1,000 characters across them, at most 10 possible conditions, and a recommendation of at most 1,000 characters. It requires simulated rows to use `Demo` and have no possible conditions. These bounds were added as `NOT VALID` constraints: PostgreSQL enforces them on new and updated rows without assuming older rows already comply.

The schema includes an index on `(user_id, created_at DESC)` and one on `(user_id, created_at DESC, id DESC)` for the history query. The project SQL creates the `pgcrypto` extension for UUID generation. It defines no application triggers or functions.

RLS is enabled on `checkups`. Table access is revoked from the `anon` role and granted to `authenticated` for select, insert, update, and delete. Four policies restrict each of those operations to rows where `auth.uid() = user_id`; update also checks the new row's `user_id`. The app currently calls only select and insert. Supabase's elevated secret/service role is neither required nor suitable for this browser app. Review the **live** project's policies and any additional policies before storing real data; the SQL files describe the intended state, not proof of a deployed state.

## Environment variables

Create `frontend/.env` from the tracked [`frontend/.env.example`](frontend/.env.example). Supply your own values; the example contains variable names only:

```dotenv
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_ANON_KEY=<your-publishable-key>
```

`VITE_SUPABASE_URL` points the browser client at the Supabase project. `VITE_SUPABASE_ANON_KEY` accepts a public publishable key or a legacy `anon` key despite its historical name. Vite embeds both values in browser code. They are public configuration, **not secrets**; access to records depends on Supabase Auth and RLS. Never place a Supabase secret or `service_role` key in either variable or in any `VITE_` variable.

The Vite config allows only these two `VITE_` names and rejects privileged keys and invalid URLs before bundling. A production build requires both values. The dev server can start without them and shows a setup screen. `NEXT_PUBLIC_*` names are unused. `.env` variants and common credential-file types are ignored by Git; keep secrets out of source, logs, and deployment artifacts. Restart Vite after changing `.env`.

## Local development

Prerequisites: Node.js and npm compatible with the checked-in lockfile, plus a Supabase project you control. Run npm commands **inside `frontend`**:

```bash
cd frontend
npm ci
```

Create `frontend/.env`, apply the database SQL in the next section, then start the development server:

```bash
npm run dev
```

The terminal prints the local URL. To check the project:

```bash
npm test
npm run lint
npm run build
npm audit
```

`npm test` uses Node's built-in test runner. The repo has no separate type-check command or end-to-end browser suite. `npm run build` writes the static site to `frontend/dist`; `npm run preview` serves that build locally after a successful build.

## Database setup and migrations

This project uses SQL files and the Supabase SQL Editor; there is no configured Supabase CLI migration runner in the repo. Apply SQL to the **same Supabase project** named in `frontend/.env` or the deployment environment.

- **New project without `public.checkups`:** Run the complete contents of [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor. Then run [`supabase/migrations/001_demo_constraints.sql`](supabase/migrations/001_demo_constraints.sql).
- **Project with the original `public.checkups` table:** Run only `supabase/migrations/001_demo_constraints.sql`. Check that the existing table follows the original schema before applying it.

The migration runs in a transaction and is designed to be rerun without deleting rows. It adds `is_simulated` with a `false` default for older records, permits the `Demo` severity value, adds input constraints and the history index, and establishes authenticated grants and ownership policies. It replaces the named severity constraint and policies inside the transaction; it does not remove data. The updated frontend requires `is_simulated`, so **apply SQL before deploying frontend changes**. If your database has custom policies or schema changes, inspect them before running these files; extra policies are not removed automatically.

After applying the SQL, verify that a signed-in user can save and read their own record, another signed-in user cannot read or change it, and an unauthenticated request cannot read records. These checks have not been established for a live deployment by the repository's unit tests.

## Production deployment

Build from `frontend` with `npm ci` and `npm run build`, and publish the generated `frontend/dist` directory on a static host. If the host asks for paths relative to the repository root, use `frontend` as the base directory and `dist` as the publish directory. Set the two public `VITE_SUPABASE_*` variables in the host's **build environment**; Vite reads them at build time. Configure Supabase Auth's site URL, redirect URLs, and email-confirmation settings for the deployed origin as needed by your chosen sign-in flow.

Apply the SQL and verify RLS before serving the new frontend. The app does not include a backend deployment, a server-side secret, or automated database deployment. Protect any real symptom data according to your project's privacy and retention requirements; the repository does not implement those operational controls.

## Future work

Possible future work includes replacing placeholder navigation, adding record management and account recovery, and adding end-to-end and database-policy tests. Any genuine medical assessment would require a separate, clinically reviewed design; it is not part of this demo.
