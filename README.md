# Nest.js API

A modern Node.js API built with Nest.js featuring health checks and data filtering endpoints.

## Features

- 🚀 Node.js 25 with latest best practices
- 🏗️ Nest.js framework with TypeScript
- 🏥 Health check endpoint (`/up`) with system monitoring
- 📊 Data endpoint (`/data`) with advanced filtering, searching, and pagination
- 🧪 Comprehensive testing setup with Jest
- 📝 OpenAPI/Swagger documentation
- 🌐 HTTP client with undici for modern performance
- 🔍 ESLint + Prettier for code quality
- 🎯 TypeScript strict mode enabled

## Prerequisites

- Node.js 25+
- npm 10+

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## API Endpoints

### Health Check
- **GET** `/up` - Returns service health status with memory and disk usage

### Data Endpoint
- **GET** `/data` - Returns paginated data with filtering options

#### Query Parameters:
- `category` - Filter by category (e.g., 'technology', 'database', 'security')
- `status` - Filter by status ('active', 'inactive', 'pending')
- `search` - Search in name and description fields
- `sortOrder` - Sort order ('asc' or 'desc')
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

#### Example Requests:
```bash
# Get all data with default pagination
curl http://localhost:3000/data

# Filter by category and status
curl "http://localhost:3000/data?category=technology&status=active"

# Search with pagination
curl "http://localhost:3000/data?search=node&page=1&limit=5"

# Sort in descending order
curl "http://localhost:3000/data?sortOrder=desc"
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:3000/api

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Development

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## Project Structure

```
src/
├── modules/
│   ├── health/           # Health check functionality
│   ├── data/            # Data endpoint with filtering
│   └── http/            # HTTP client service
├── main.ts              # Application entry point
└── app.module.ts        # Root module

test/                    # E2E tests
```

## Technologies

- **Framework**: Nest.js 10.x
- **Runtime**: Node.js 25
- **Language**: TypeScript 5.6
- **HTTP Client**: undici 6.x
- **Testing**: Jest 29.x
- **Documentation**: Swagger/OpenAPI
- **Code Quality**: ESLint 9.x + Prettier 3.x
- **Validation**: class-validator + class-transformer

## License

MIT