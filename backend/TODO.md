# TODO - MediGuide backend

## Next endpoints
POST /auth/register      # Create new user (name, email, password) -> returns user id or JWT
POST /auth/login         # Login (email, password) -> returns JWT token
POST /symptoms           # Save a symptom (user must be authenticated)
GET  /symptoms/:id       # Get a saved symptom
- POST /diagnoses          # Save a diagnosis (from AI agent or clinician)
- GET  /diagnoses/:id      # Get a diagnosis by id
- GET  /users/:id          # Get user profile (private)
- PUT  /users/:id          # Update user profile
- Add DB integration (e.g., MongoDB with Mongoose)
- Add input validation and auth (JWT)
- Add logging & error handling
