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
6. The backend checks the current user before allowing protected review, profile, hotel, or trip-request actions.

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

Create `Backend/.env`:

```env
MONGOURL=your_mongodb_connection_string
SESSION_KEY=your_session_secret
PORT=8000
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Seed sample natural places

```bash
cd Backend
npm run seed
```

### Run the backend

```bash
cd Backend
node main.js
```

### Run the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

The frontend normally runs at `http://localhost:5173` and the backend at `http://localhost:8000`.

## Deployment

The frontend and backend can be deployed as separate services:

| Service | Recommended platform |
| --- | --- |
| Frontend | Render or another static hosting provider |
| Backend | Render or another Node.js hosting provider |
| Database | MongoDB Atlas |
| Images | Cloudinary |

Before deployment, update the frontend API URL, add the production frontend URL to the backend CORS configuration, set production environment variables, and enable HTTPS for secure session cookies.

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
