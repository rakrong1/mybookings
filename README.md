# MyBookings

A minimal booking application for solo service providers, built with [your tech stack—e.g., NestJS, React, Tailwind CSS, PostgreSQL, Redis, WebSocket].

---

## Assumptions & Decisions

- **Solo-provider scoped**: Only one provider per deployment; simplifies multi-tenancy.
- **Booking duration fixed per service**: No custom lengths to keep scheduling simple.
- **Unique time slot constraint**: Enforced at the DB level for `pending` or `confirmed` statuses.
- **15-minute advance booking**: Ensures realistic booking windows and avoids immediate-scheduling issues.
- **REST + WebSocket API**: Chosen for simplicity and real-time updates.
- **PostgreSQL for persistence**, **Redis for job queuing** and **WebSocket pub/sub**, balancing consistency & responsiveness.

---

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/rakrong1/mybookings.git
   cd mybookings

# If using npm
npm install
# Or using Yarn:
yarn

DATABASE_URL=postgres://user:pass@localhost:5432/mybookings
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_here

# How to Run Locally & Test
npm run dev
npm test

# What You’d Improve with +4 Hours

# If I had an additional 4 hours, I’d enhance the application by:

# Adding robust test coverage for REST endpoints, edge cases, and integration with WebSocket and Redis.

# Implementing better CI/CD: auto-deploy, integration tests, and linting checks.

# Improving observability: structured logs, error tracking, and metrics (e.g., queue length, request latency).

# Enhancing UX: add frontend forms with real-time validation and booking status updates.

# Support for cancellations/confirmation emails and retry logic in job worker pipelines.
