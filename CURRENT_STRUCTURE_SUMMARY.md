# THỦY TÙNG Project - Current Structure Summary

## Overview
THỦY TÙNG is an overseas education promotion platform for Vietnamese students, providing comprehensive study abroad program information and support services.

## Core Features
- **Program Browsing**: Search and filter study abroad programs by country, field, and level
- **Student Services**: Application guidance, scholarship info, FAQ section
- **Contact & Support**: Inquiry forms, advisor contacts, newsletter subscription
- **Admin Panel**: Dashboard for managing programs, contacts, FAQs, and users
- **User Management**: Enhanced user status handling to prevent accidental status changes during logout
- **Language Support**: Google Translate integration with direct language switching between English and Vietnamese
- **Video Introduction**: Enhanced video modal with improved styling and animations

## Technology Stack

### Frontend (Client)
- **Framework**: Next.js 15+ (App Router)
- **Port**: 3000 (development)
- **API URL**: `/api/v1` (proxied to backend)
- **Environment**: 
  - Development: `http://localhost:3000`
  - Production: `https://www.thuytung.edu.vn`

### Backend (Server)
- **Framework**: Express.js
- **Port**: 5000 (updated from 4040)
- **Environment**:
  - Development: `http://localhost:5000`
  - Production: `https://api.thuytung.edu.vn`

## API Endpoints
- `/api/v1/auth` - Authentication
- `/api/v1/programs` - Study programs (public GET, auth required for POST/PATCH/DELETE)
- `/api/v1/faqs` - FAQs (public GET, auth required for POST/PATCH/DELETE)
- `/api/v1/contacts` - Contact submissions (public POST, auth required for GET and resolve)
- `/api/v1/users` - User management (auth required)
- `/api/v1/contacts/:id/resolve/:userId` - Resolve contact inquiries (auth required)

## Directory Structure

### Client (Next.js)
```
client/
├── app/                 # Pages including admin dashboards and public content
│   ├── admin/           # Admin dashboard pages
│   │   ├── contact-dashboard/
│   │   ├── faq-dashboard/
│   │   ├── program-dashboard/
│   │   └── user-dashboard/
│   ├── auth/            # Authentication pages
│   └── ...              # Public pages
├── components/          # Reusable UI components
├── lib/                 # Axios instance and utilities
├── utils/               # Services, stores (Zustand), and types
├── public/              # Static assets
└── src/                 # Source code
```

### Server (Express)
```
sever/
├── controllers/         # Request handlers
├── models/              # Mongoose schemas
├── repositories/        # Data access layer
├── routes/              # API route definitions
│   ├── auth.route.ts    # Authentication routes
│   ├── contact.route.ts # Contact form routes
│   ├── faq.route.ts     # FAQ management routes
│   ├── program.route.ts # Program management routes
│   ├── user.route.ts    # User management routes
│   └── routes.ts        # Main route aggregator
├── services/            # Business logic
└── utils/               # Configs, libraries, templates, and type definitions
```

## Authentication
- Uses JWT tokens stored in HttpOnly cookies
- Public routes include programs, FAQs, contacts (POST only), and all auth endpoints
- Protected routes require authentication via isAuth middleware
- Admin functionality is accessed through the same endpoints with authentication

## Data Flow
1. Frontend makes API calls to `/api/v1/*` endpoints
2. Next.js rewrites `/api/*` requests to the backend server
3. Backend handles authentication and data operations
4. Stores use caching for improved performance

## Detailed Data Processing Flow

### Authentication Flow
1. **Login Request**: User submits credentials via `/api/v1/auth/login`
2. **Credential Validation**: Backend validates email/password against database
3. **JWT Generation**: Upon successful validation, backend generates JWT token
4. **Cookie Setting**: JWT token is stored in HttpOnly cookie with sameSite: 'lax'
5. **Response**: User data and success message returned to frontend
6. **State Management**: Frontend stores user data in Zustand store
7. **Redirect**: User redirected to admin dashboard

### API Request Flow
1. **Frontend Request**: Components make API calls through axios instances
2. **Middleware Processing**: Requests pass through Next.js middleware for authentication check
3. **Proxy Routing**: Next.js rewrites `/api/*` requests to backend server at `http://localhost:5000`
4. **Backend Middleware**: Requests processed by Express middleware (CORS, rate limiting, auth)
5. **Route Handling**: Appropriate controller handles the request
6. **Data Access**: Controllers use repositories to interact with MongoDB
7. **Business Logic**: Services process data and apply business rules
8. **Response**: Data returned to frontend through the same path

### Logout Flow
1. **Logout Request**: User clicks logout button, triggering POST to `/api/v1/auth/logout`
2. **Authentication Check**: Backend verifies user is authenticated via middleware
3. **Cookie Clearing**: Backend clears the JWT token cookie
4. **State Reset**: Frontend clears all Zustand stores
5. **Redirect**: User redirected to login page

## Backend Architecture

### Route Structure
- **Route Aggregation**: All routes are aggregated in `routes.ts` and mounted at `/api/v1`
- **Route Modules**: Each resource has its own route file (auth, programs, contacts, etc.)
- **Middleware Chain**: Routes pass through authentication and other middleware before reaching controllers

### Controller Layer
- **Request Handling**: Controllers receive requests and validate input data
- **Error Handling**: Custom error handling with consistent response format
- **Response Formatting**: Controllers return standardized API responses

### Service Layer
- **Business Logic**: Complex operations and data processing
- **External Integrations**: Email sending, cloud storage, etc.
- **Data Transformation**: Formatting data for different use cases

### Repository Layer
- **Data Access**: Database operations abstracted from controllers
- **Query Building**: Complex database queries built in repositories
- **Model Interaction**: Direct interaction with Mongoose models

### Middleware System
- **Authentication**: JWT token verification for protected routes
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Request limiting to prevent abuse
- **Security**: Various security headers and protections

## Environment Configuration

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_PLACEHOLDER_URL=https://placehold.co
NEXT_PUBLIC_NODE_ENV=development

# Production values (for build)
NEXT_PUBLIC_API_URL=https://api.thuytung.edu.vn/api/v1
NEXT_PUBLIC_SERVER_URL=https://api.thuytung.edu.vn
NEXT_PUBLIC_DOMAIN=https://www.thuytung.edu.vn
NEXT_PUBLIC_NODE_ENV=production
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
CLIENT_URL=https://www.thuytung.edu.vn
PRIVATE_KEY=(long RSA key)
SALT_ROUNDS=10
PRIVATE_CHARS=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()
DATABASE_MONGO_URL=mongodb://localhost:27017/thuytung
REDIS_URL=redis://default:in3Awm7rnfoRZierC27Zz1Q7msGk0qja@redis-16168.c276.us-east-1-2.ec2.redns.redis-cloud.com:16168
ENABLE_QPS_LOGGING=false
CLOUDINARY_URL=cloudinary://329166643222537:QivJgqXWzV9H4Ib24SyyRe2JZBE@domgmbciw
EMAIL_USER=carmaster1205@gmail.com
EMAIL_PASS=uagejxmqhfgqdsdc
ROOT_EMAIL=hieuvo1227@gmail.com
ROOT_PASSWORD=@Hieuvo123gm
```

## IIS Deployment Configuration

### Web.config
The web.config file has been updated to reflect the correct port (5000) and implement proper routing:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <!-- Rule for API requests - proxy to backend -->
                <rule name="API Proxy" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://localhost:5000/api/{R:1}" />
                </rule>
                
                <!-- Rule for static assets - serve from Next.js build -->
                <rule name="Static Assets" stopProcessing="true">
                    <match url="^(?!api/)(.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json))$" />
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
                </rule>
                
                <!-- Rule for all other requests - serve from Next.js (for SPA) -->
                <rule name="Next.js Routes" stopProcessing="true">
                    <match url=".*" />
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
                </rule>
            </rules>
        </rewrite>
        
        <!-- Add security headers -->
        <httpProtocol>
            <customHeaders>
                <add name="X-Content-Type-Options" value="nosniff" />
                <add name="X-Frame-Options" value="DENY" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
            </customHeaders>
        </httpProtocol>
    </system.webServer>
</configuration>
```

## Deployment Requirements

### IIS Site Configuration
1. **Main Site** (www.thuytung.edu.vn) - Points to the Next.js application
2. **API Subdomain** (api.thuytung.edu.vn) - Points to the Express backend

### SSL Configuration
- Ensure both domains have valid SSL certificates
- Configure HTTPS bindings in IIS
- Update environment variables to use HTTPS URLs

## Key Implementation Details

### Public Routes
Public pages like programs and FAQs are accessible without authentication. The auth middleware's PUBLIC_ROUTES list includes:
- `/programs`
- `/faqs` 
- `/contacts` (POST only)
- All auth endpoints

### Admin Functionality
Admin functionality is implemented through the existing API endpoints with authentication required:
- **Program Management**: `/api/v1/programs` (POST, PATCH, DELETE require auth)
- **FAQ Management**: `/api/v1/faqs` (POST, PATCH, DELETE require auth)
- **Contact Management**: `/api/v1/contacts` (GET and resolve require auth)
- **User Management**: `/api/v1/users` (all operations require auth)

### Cookie Configuration
Backend JWT cookies use sameSite: 'lax' to allow cross-port requests between frontend (localhost:3000) and backend (localhost:5000) during development.

### Axios Configuration
Frontend axios instances are configured with:
- `withCredentials: true` to send cookies in cross-origin requests
- Conditional Content-Type setting (not set globally)

## Recent Enhancements

### Contact Form Improvements
The contact form submission process has been enhanced with automated email notifications:
1. **User Confirmation**: After submitting the contact form, users receive an automated thank-you email with their submission details
2. **Team Notification**: The support team receives an immediate notification email at support@thuytung.edu.vn when a new contact request is submitted
3. **Error Handling**: Both email processes include robust error handling to ensure contact submissions are never affected by email delivery issues
4. **Template Consistency**: Both emails use the same professionally designed template for consistent branding

### User Status Management
User status management has been improved to prevent accidental status changes:
1. **Default Status Update**: New users are now created with "active" status by default instead of "pending"
2. **Explicit Status Control**: User status can only be modified through the admin dashboard
3. **Logout Protection**: User status is no longer accidentally changed to "pending" during logout operations
4. **Type Safety**: Enhanced type safety with enum usage for user status values

### Video Modal Enhancement
The video modal component has been redesigned with improved aesthetics:
1. **Modern Design**: Added gradient headers and backdrop blur effects
2. **Enhanced Visuals**: Improved video container styling with better rounded corners
3. **Decorative Elements**: Added corner decorative elements for a premium look
4. **Better Animations**: Added smooth entrance animations for improved user experience

### Google Translate Integration
The Google Translate component has been completely reworked to provide direct language switching:
1. **Language Toggle**: Users can directly switch between English and Vietnamese without showing the Google Translate dropdown
2. **Persistent Preferences**: Language preferences are stored in localStorage for consistent experience
3. **Memory Management**: Proper cleanup of global callback functions to prevent memory leaks
4. **Improved UX**: Disabled button state during initialization for better user feedback

### UI/UX Improvements
Several UI/UX improvements have been implemented:
1. **Scroll-to-Top Button**: Enhanced visibility with proper sizing and border
2. **Navbar Layout**: Balanced layout with proportional width distribution
3. **About Page**: Reduced statistics section size by 1/3 and adjusted "Tầm nhìn và Sứ mệnh" section typography
4. **Hero Section**: Adjusted padding and layout for better visual balance
5. **Container Width**: Updated container configuration for better screen utilization

### Modular Navbar Implementation
The navbar has been restructured into modular components:
1. **TopContactBar**: Separate component for contact information (phone, email, address, working hours)
2. **MainNavbar**: Separate component for main navigation (logo, menu items, action buttons)
3. **Scroll Behavior**: Implemented scroll-based visibility for the top contact bar
4. **Smooth Transitions**: Added smooth animations for navbar position changes