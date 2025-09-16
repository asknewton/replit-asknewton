# Overview

AskNewton California is a health insurance guidance platform specifically designed for newcomers to California. The application serves three primary personas: Nomads (remote workers/contractors), Travelers (1-6 month visitors), and Students (F-1/J-1 visa holders). The platform provides personalized insurance recommendations through an intake wizard and connects users with licensed professionals for guidance. Built as a full-stack TypeScript application, it features a React frontend with form-based lead capture, Express.js backend with API endpoints, and PostgreSQL database integration via Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with React 18 and TypeScript, utilizing Vite as the build tool and development server. The architecture follows a component-based design pattern with:

- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management and React Hook Form for form state
- **Form Validation**: Zod schemas with @hookform/resolvers integration
- **Component Structure**: Modular components organized by type (ui/, pages/, components/)

The application uses a wizard-style intake form that progresses through multiple steps, collecting user information and preferences before submitting leads to the backend.

## Backend Architecture
The server-side implementation uses Express.js with TypeScript in an ESM module configuration. Key architectural decisions include:

- **API Design**: RESTful endpoints with structured JSON responses
- **Request Processing**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Integration**: Vite middleware integration for hot module replacement during development

The backend serves both API endpoints and static files, with separate build processes for production deployment.

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations:

- **Schema Definition**: Shared TypeScript schemas between client and server
- **Database Client**: Neon Database serverless PostgreSQL with connection pooling
- **Migration Management**: Drizzle Kit for schema migrations and database synchronization
- **Validation**: Zod schemas for runtime validation matching database constraints

The storage layer includes both database persistence and in-memory fallback for development scenarios.

## Authentication and Authorization
The current implementation uses a simple session-based approach with minimal authentication requirements:

- **Session Management**: Express session handling with PostgreSQL session store
- **User Management**: Basic user creation and lookup functionality
- **Lead Management**: Open lead submission without authentication requirements

This lightweight approach aligns with the lead capture nature of the application.

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Email Services**: Configurable email API integration for lead notifications
- **WhatsApp Integration**: Direct messaging links for immediate user communication
- **Webhook Support**: Configurable webhook forwarding for lead processing
- **Analytics**: Google Analytics integration for user behavior tracking
- **Calendly**: Embedded scheduling for consultation bookings

## UI and Development Libraries
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Consistent iconography throughout the application
- **TanStack Query**: Powerful data synchronization and caching
- **React Hook Form**: Performant form handling with minimal re-renders

## Build and Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire application stack
- **Drizzle Kit**: Database schema management and migration tools
- **ESBuild**: Fast JavaScript bundling for production server builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Validation and Utilities
- **Zod**: Runtime type validation and schema definition
- **clsx & tailwind-merge**: Conditional CSS class management
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: Unique ID generation for various application needs