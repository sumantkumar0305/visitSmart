🌿 VisitSmart — Discover Hidden Natural Places

VisitSmart is a full-stack nature-focused travel discovery and hotel booking platform. Its main purpose is to help people find natural places that are beautiful, nearby, and often missing from ordinary travel websites.

## The idea behind VisitSmart

Most travel websites suggest popular destinations and well-known tourist attractions. They focus on major cities, famous landmarks, crowded resorts, and locations that are already widely documented online.

But many valuable natural places exist outside those popular lists. A small waterfall near a village, a cold-water stream, a quiet lake, a forest viewpoint, or a local scenic trail may be known by nearby residents but remain difficult for travelers to discover. People may not know these places exist because there is no dedicated platform presenting their images, descriptions, locations, reviews, and nearby hotels together.

VisitSmart is designed to solve this problem. Instead of trying to list every type of tourist attraction, it is dedicated to natural destinations such as:

- Waterfalls and cold-water streams
- Lakes, rivers, and springs
- Forests and natural picnic areas
- Hills, viewpoints, and valleys
- Caves and other natural formations
- Quiet scenic places away from crowded tourist centers

The goal is to give overlooked local natural destinations a clear digital presence and make them easier to discover, understand, visit, and share.

## Problem this website solves

Information about lesser-known natural places is often spread across word of mouth, social media posts, local pages, or incomplete map listings. This creates several problems:

1. Travelers cannot easily find natural places near them.
2. Local waterfalls, lakes, forests, and viewpoints receive less attention than famous tourist sites.
3. Visitors may not find reliable descriptions, images, location information, or nearby accommodation.
4. Local communities and small businesses lose an opportunity to benefit from responsible tourism.
5. Users must search multiple websites to combine destination information, reviews, and hotel options.

VisitSmart brings this information together in one nature-specific application.

## How VisitSmart solves the problem

1. Users discover natural destinations instead of browsing a general list of every tourist location.
2. Search and filters help users find places by keyword, state, or city.
3. Destination pages show descriptions, images, locations, and visitor reviews.
4. Connected hotel listings help users find accommodation near natural places.
5. Room selection and booking summary make trip planning more convenient.
6. User reviews help future visitors make informed decisions.
7. Trip requests allow users to submit their preferences and budget for personalized planning.

## Website workflow

1. The user opens VisitSmart and sees natural destinations.
2. The user searches or filters for a place.
3. The user opens a destination to read its description and location details.
4. The user views images and reviews from other visitors.
5. The user explores hotels connected to that destination.
6. The user selects a hotel, dates, and room quantities.
7. VisitSmart validates the dates and calculates the room total.
8. The user reviews the booking information on the summary/payment page.
9. An authenticated user can also create reviews, update a profile, add hotel information where permitted, and submit a personalized trip request.

## Features

- Nature-focused destination discovery.
- Search and filtering by location and keyword.
- Destination descriptions, images, and location details.
- Destination and hotel reviews with ratings.
- Connected hotel listings near natural destinations.
- Hotel image upload with Cloudinary.
- Room selection and booking summary.
- User signup, login, logout, and profile updates.
- Protected actions for reviews, hotels, and trip requests.
- Responsive interface for desktop and mobile devices.

## Technology stack

### Frontend

- React.js
- Vite
- Material UI (MUI)
- Axios
- React Router
- React Slick and Slick Carousel
- Styled Components and Emotion

### Backend

- Node.js
- Express.js
- MongoDB and Mongoose
- Passport.js with Passport Local
- Express Session and Connect Mongo
- Multer for file uploads
- Cloudinary for image storage
- dotenv for environment configuration

### Deployment services

The frontend and backend can be deployed as separate services. MongoDB Atlas can host the database, Cloudinary can host images, and Render can host the application services.

## Application data flow

```text
React frontend
	|
	| Axios request
	v
Express route
	|
	| Controller validates and processes data
	v
Mongoose model
	|
	v
MongoDB

Hotel image flow:
React form -> Multer -> Cloudinary -> image URL stored with hotel data
```

## Project structure

```text
visitSmart/
├── Backend/
│   ├── Controllers/       # Application and database operations
│   ├── Models/            # MongoDB/Mongoose schemas
│   ├── Routes/            # API route definitions
│   ├── initData/          # Sample natural destination data
│   ├── CloudConfig.js     # Cloudinary configuration
│   ├── init.js            # Database seed script
│   ├── main.js            # Express server entry point
│   └── passportConfig.js  # Passport authentication setup
└── frontend/
	├── public/            # Static assets
	├── src/AllCode/       # Header, destination, hotel, booking, and review modules
	├── src/App.jsx        # Frontend route declarations
	├── src/main.jsx       # React entry point
	└── package.json
```

## Authentication

VisitSmart uses Passport Local authentication with Express Session and MongoDB-backed sessions:

1. The user signs up or logs in.
2. Passport validates the credentials.
3. Express creates a server-side session after successful authentication.
4. Connect Mongo stores the session in MongoDB.
5. The browser sends the session cookie with protected requests.
6. The backend checks the current session and record ownership before allowing profile, review, or hotel mutations.

## Installation and setup

### Requirements

- Node.js and npm.
- MongoDB or MongoDB Atlas.
- Cloudinary credentials for hotel image uploads.

### Install dependencies

```bash
cd Backend
npm install

cd ../frontend
npm install
```

### Configure the backend

Copy `Backend/.env.example` to `Backend/.env` and set your values:

```env
MONGOURL=your_mongodb_connection_string
SESSION_KEY=your_session_secret
PORT=8000
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
NODE_ENV=development
```

Generate a long, unique `SESSION_KEY` (at least 32 characters in production). Never commit `.env` files or use the example values in a deployed service.

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### Seed sample natural places

```bash
cd Backend
npm run seed
```

### Run the backend

```bash
cd Backend
npm start
```

### Run the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

The frontend normally runs at `http://localhost:5173` and the backend at `http://localhost:8000`.

## Deployment

The checked-in [render.yaml](./render.yaml) deploys the frontend and API as separate Render services. It configures the SPA rewrite and `/healthz` health check. In Render, create a Blueprint from this repository and provide the secret values when prompted.

| Service | Recommended platform |
| --- | --- |
| Frontend | Render or another static hosting provider |
| Backend | Render or another Node.js hosting provider |
| Database | MongoDB Atlas |
| Images | Cloudinary |

### Required hosting environment variables

Configure these on the Render API service:

| Variable | Value |
| --- | --- |
| `MONGOURL` | MongoDB Atlas connection URI. Allowlist Render's outbound IPs as required, or use Atlas network access rules appropriate for your deployment. |
| `SESSION_KEY` | A unique random secret of at least 32 characters. |
| `CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUD_API_KEY` | Cloudinary API key. |
| `CLOUD_API_SECRET` | Cloudinary API secret. |
| `FRONTEND_ORIGINS` | Comma-separated exact browser origins, with no trailing slash; e.g. `https://visitsmart.onrender.com`. |
| `NODE_ENV` | `production` (set by the Blueprint). |

Configure `VITE_API_URL` on the Render frontend static site to the API's HTTPS origin (`https://visitsmart-api.onrender.com`). Vite embeds this value at build time, so redeploy the frontend after changing it. Render supplies `PORT` to the backend; do not set a fixed port in the dashboard. Authenticated mutations require the browser's exact frontend origin to be included in `FRONTEND_ORIGINS`.

For a manual deployment, create a Node web service with root directory `Backend`, build command `npm ci`, start command `npm start`, and health-check path `/healthz`. Create a static site with root directory `frontend`, build command `npm ci && npm run build`, publish directory `dist`, and a rewrite from `/*` to `/index.html`. Set the environment variables above and allow the deployed frontend origin in `FRONTEND_ORIGINS`.

### Post-deployment smoke checks

1. Open `https://visitsmart-api.onrender.com/healthz`; expect HTTP 200 and JSON with `"status":"ok"` and `"database":"connected"`.
2. Open the frontend HTTPS URL and confirm that destinations load without browser console CORS/network errors.
3. Sign up or log in, reload the page, and confirm the session remains active; then log out and confirm the session clears.
4. Open a destination, load its reviews, and check a hotel detail page.
5. If testing hotel uploads, submit a supported image and confirm it is available from the returned Cloudinary URL.
6. In Render logs, check for the startup message indicating MongoDB is connected and investigate any 5xx responses or session-store errors.

## Responsible nature tourism

VisitSmart is intended to increase awareness of natural places responsibly. Destination information should encourage visitors to respect local communities, avoid littering, protect wildlife and water sources, follow local rules, and verify safety and access conditions before traveling.

## Future improvements

- Map-based discovery for nearby natural places.
- User submissions for new waterfalls, lakes, springs, forests, and viewpoints.
- Verification and moderation for submitted destinations.
- Safety, accessibility, distance, and travel-time information.
- Responsible-tourism guidance for each destination.
- Real payment gateway integration for confirmed hotel bookings.
- An administration dashboard for reviewing destination submissions.

## Contact

- GitHub: [sumantkumar0305](https://github.com/sumantkumar0305)
- LinkedIn: [sumant-kumar-dev](https://www.linkedin.com/in/sumant-kumar-dev/)
