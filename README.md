🌍 AI Travel Planner

An AI-powered travel planning platform that helps users create personalized travel itineraries, estimate trip budgets, discover accommodation options, and generate destination-specific travel recommendations using Google Gemini AI.

---

🔗 Live Demo

**Frontend:**
ai-travel-planner-4mkw54ohp-jayakesharwanis-projects.vercel.app

Backend API:
https://ai-travel-planner-ai.onrender.com

GitHub Repository:
https://github.com/Jayakesharwani/ai-travel-planner

---

📖 Project Overview

Planning a trip often requires researching destinations, creating schedules, estimating budgets, and organizing travel information from multiple sources.

AI Travel Planner simplifies this process by allowing users to:

- Create trips with destination and travel dates
- Generate complete AI-powered itineraries
- Regenerate individual itinerary days
- Edit itinerary activities manually
- Save customized travel plans
- View estimated travel budgets
- Receive destination-specific travel notes
- Discover hotel recommendations

The goal of this project is to combine modern web technologies with Generative AI to create an intelligent travel assistant that reduces planning effort and improves user experience.

---

✨ Key Features

User Authentication

- Secure registration and login
- JWT-based authentication
- Protected routes

AI Itinerary Generation

- Day-wise travel planning
- Activity recommendations
- Destination-aware schedules

Smart Regeneration

- Regenerate only a specific day instead of the entire itinerary
- Allows iterative travel planning

Editable Itineraries

- Users can modify generated activities
- Save customized plans

Budget Planning

- Flight estimates
- Accommodation estimates
- Food budget estimates
- Activity budget estimates

Travel Intelligence

- Destination notes
- Travel tips
- Hotel suggestions

---

🛠 Tech Stack

Frontend

Technology| Purpose
Next.js 15| React framework
React| UI development
TypeScript| Type safety
Tailwind CSS| Styling
Axios| API communication

Why Next.js?

Next.js was selected because it provides:

- Fast development experience
- Optimized performance
- Component-based architecture
- Excellent deployment support through Vercel

---

Backend

Technology| Purpose
Node.js| Runtime environment
Express.js| REST API framework
TypeScript| Type safety
JWT| Authentication
Mongoose| MongoDB ORM

Why Express?

Express provides:

- Lightweight architecture
- Easy middleware integration
- Fast API development
- Excellent TypeScript support

---

Database

Technology| Purpose
MongoDB Atlas| Cloud database
Mongoose| Schema modeling

Why MongoDB?

Travel itineraries contain nested and flexible structures, making MongoDB a strong fit due to:

- Flexible document schema
- Easy storage of nested itinerary data
- Fast development cycle

---

AI Layer

Technology| Purpose
Google Gemini API| Travel itinerary generation

Why Gemini?

Gemini provides:

- High-quality itinerary generation
- Context-aware recommendations
- Fast response times
- Strong reasoning capabilities

---

🏗 High-Level Architecture

User
 │
 ▼
Next.js Frontend
 │
 ▼
Express Backend API
 │
 ├── Authentication Layer
 │       │
 │       ▼
 │     JWT
 │
 ├── Trip Service
 │       │
 │       ▼
 │   Gemini AI
 │
 └── MongoDB Atlas

Flow

1. User creates a trip.
2. Frontend sends request to backend.
3. Backend stores trip in MongoDB.
4. User clicks Generate Plan.
5. Backend calls Gemini API.
6. Gemini generates itinerary.
7. Backend saves generated content.
8. Frontend displays results.

---

🔐 Authentication & Authorization

Authentication

Authentication is implemented using:

- JWT (JSON Web Tokens)
- Password hashing with bcryptjs

Flow:

Register/Login
      │
      ▼
Generate JWT
      │
      ▼
Store Token
      │
      ▼
Protected Requests

---

Authorization

Protected endpoints require:

Authorization: Bearer <token>

Middleware verifies:

- Token validity
- User identity
- Access permissions

Only authenticated users can:

- Create trips
- Generate itineraries
- Modify itineraries
- Access personal travel data

---

🤖 AI Agent Design

Purpose

The AI agent acts as a travel planning assistant.

Instead of generating generic responses, it:

- Understands destination context
- Considers trip duration
- Uses user interests
- Creates structured day-by-day itineraries

---

Responsibilities

Itinerary Generation

Generates:

- Morning activities
- Afternoon activities
- Evening activities

---

Day Regeneration

Users can regenerate a single day without affecting the entire trip.

This improves usability and reduces AI cost.

---

Destination Intelligence

Provides:

- Local recommendations
- Travel notes
- Suggested accommodations

---

🚀 Creative / Custom Feature

Selective Day Regeneration

One of the most useful custom features implemented is:

Regenerate Individual Day

Most travel planners regenerate the entire itinerary.

This project allows users to:

- Keep existing days
- Regenerate only one specific day
- Preserve manual edits

Benefits:

- Better user control
- Faster iteration
- Lower AI usage costs
- Improved planning flexibility

This feature significantly improves user experience compared to standard AI itinerary generators.

---

📸 Screenshots

Landing Page

"Landing Page" (./screenshots/landing-page.png)

---

Login Page

"Login" (./screenshots/login-page.png)

---

Dashboard

"Dashboard" (./screenshots/dashboard-page.png)

---

Create Trip

"Create Trip" (./screenshots/create-trip-page.png)

---

Trip Details

"Trip Details" (./screenshots/trip-details-page.png)

---

AI Generated Itinerary

"Itinerary" (./screenshots/itinerary-page.png)

---

⚙ Local Setup Instructions

Clone Repository

git clone https://github.com/Jayakesharwani/ai-travel-planner

cd ai-travel-planner

---

Backend Setup

cd backend

npm install

Create ".env"

PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

Run backend:

npm run dev

---

Frontend Setup

cd frontend

npm install

Create ".env.local"

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run frontend:

npm run dev

---

☁ Deployment

Frontend

Platform: Vercel

Environment Variables:

NEXT_PUBLIC_API_URL=https://ai-travel-planner-ai.onrender.com

---

Backend

Platform: Render

Environment Variables:

PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

---

⚖ Key Design Decisions & Trade-offs

Decision 1: MongoDB over SQL

Chosen because itinerary structures are highly nested and flexible.

Trade-off:

- Easier development
- Less strict relational modeling

---

Decision 2: JWT Authentication

Chosen because:

- Stateless
- Easy deployment
- Works well with REST APIs

Trade-off:

- Token revocation is more complex

---

Decision 3: Gemini API

Chosen for strong reasoning and itinerary generation.

Trade-off:

- External dependency
- AI responses may vary

---

Decision 4: Selective Day Regeneration

Chosen to improve usability.

Trade-off:

- Additional backend logic
- More complex AI workflow

---

⚠ Known Limitations

- No real-time flight data integration
- Hotel recommendations are AI-generated, not live bookings
- No PDF export functionality
- No collaborative trip planning
- No offline support
- AI-generated itineraries may occasionally require manual adjustments

---

🔮 Future Improvements

- Flight API Integration
- Google Maps Integration
- Weather Forecast Integration
- PDF Export
- Multi-Currency Support
- Collaborative Planning
- AI Chat Travel Assistant
- Trip Sharing Functionality

---

👨‍💻 Author

Jaya Kesharwani

GitHub:
https://github.com/Jayakesharwani

LinkedIn:
https://www.linkedin.com/in/jaya-kesharwani-894289302/

---

⭐ If you found this project useful, please consider giving it a star.
