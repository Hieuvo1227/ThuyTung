# ThuyTung - Overseas Education Promotion Website

ThuyTung is a web application designed to promote overseas study
programs for Vietnamese students. It provides detailed information about
study opportunities abroad, program highlights, and contact options for
interested students.

## Project Structure

- client: Frontend built with Next.js 15 and React 19

- server: Backend built with Express, TypeScript, MongoDB, and Redis

## Requirements

- Node.js (version 18 or later)
- MongoDB (local or remote instance)
- Redis (for session management and caching)
- npm or yarn
- Docker and Docker Compose (optional)


# Setup environment variables
cp .env.example .env
# Edit the .env file with your configuration

# Option 1: Start with Docker
docker-compose up -d

# Option 2: Start development server
npm run dev
```

The backend will run at http://localhost:4040

### 3. Setup and Run Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run at http://localhost:3000

## Key Features

### 1. Program Information

- Browse available study abroad programs
- Detailed program descriptions
- Search and filter by country, field, or level of study

### 2. Student Services

- Guidance on application process
- Scholarship information
- Frequently Asked Questions (FAQ)

### 3. Contact & Support

- Inquiry forms
- Contact information for advisors
- Newsletter subscription

### 4. Admin Panel

- Manage study programs
- Manage inquiries and contacts
- Content management

## Technologies Used

### Backend

- Express with TypeScript
- MongoDB with Mongoose ORM
- Redis (caching and session management)
- JWT Authentication
- Cloudinary (image storage)
- RESTful API with security middleware

### Frontend

- Next.js 15 (App Router) with React 19
- TypeScript
- Tailwind CSS with shadcn/ui and Headless UI
- Tanstack React Query
- Zod validation with React Hook Form
- Zustand (state management)
- Framer Motion animations
- Axios with credentials support

## Server Architecture

### Directory Structure

```
sever/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── utils/
│   │   ├── configs/      # Configuration files
│   │   ├── libs/         # Database connections and utilities
│   │   ├── services/     # Business logic services
│   │   └── types/        # TypeScript type definitions
│   └── index.ts          # Entry point
├── docker-compose.yml    # Docker services configuration
└── .env                  # Environment variables
```

### API Endpoints

The API follows RESTful conventions with these main endpoints:

- **Authentication**: `/api/v1/auth` - Registration, login, verification
- **Programs**: `/api/v1/programs` - Study abroad programs
- **Blogs**: `/api/v1/blogs` - Blog articles
- **Contacts**: `/api/v1/contacts` - Contact submissions
- **FAQs**: `/api/v1/faqs` - Frequently asked questions

All endpoints include CORS protection, rate limiting, and security middleware.

## License

This project is licensed under the MIT License.