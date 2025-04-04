# Technical Documentation

## Project Structure

```
sameurl-api/
├── config/           # Configuration files
├── connections/      # Database connection setup
├── constants/        # Application constants
├── controllers/      # Business logic controllers
├── docs/            # Documentation files
├── middlewares/     # Express middleware
├── models/          # Database models
├── routes/          # API route definitions
├── utility/         # Utility functions
├── .env            # Environment variables
├── create-app.js   # Application setup
├── package.json    # Project dependencies
└── server.js       # Server entry point
```

## Core Components

### 1. Server Setup (`server.js` and `create-app.js`)

The application uses Express.js as the web framework. The server setup is split into two files:

- `server.js`: Entry point that imports and initializes the application
- `create-app.js`: Configures Express middleware, database connection, and routes

### 2. Database Model (`models/Url.js`)

The URL model defines the schema for storing shortened URLs:

```javascript
{
  original_url: String,  // The original long URL
  short_url: String     // The shortened URL
}
```

### 3. Routes (`routes/sameurl.js`)

The main API routes are defined in `sameurl.js`:

- `POST /shorten`: Creates a new shortened URL
- `GET /shorten`: Checks if a URL already exists
- `GET /:urlId`: Redirects to the original URL

### 4. Utility Functions (`utility/get-random-short-id.js`)

Contains helper functions for generating random short IDs for URLs.

## Database Connection

The application uses MongoDB Atlas for database storage. The connection is established in `connections/mongo_db.js` using the connection string from environment variables.

## Environment Variables

Required environment variables:

- `PORT`: Server port (default: 7211)
- `MONGO_DB_URI`: MongoDB connection string
- `BASE_URL`: Base URL for shortened links (default: https://sameurl.in)

## Error Handling

The application implements basic error handling:

1. Database errors are caught and logged
2. Invalid requests return appropriate HTTP status codes
3. Missing URLs return 404 responses

## Security Considerations

1. **Input Validation**: All incoming URLs should be validated
2. **HTTPS**: The API should be served over HTTPS
3. **Rate Limiting**: Consider implementing rate limiting for production use
4. **Error Messages**: Generic error messages are returned to prevent information leakage

## Performance Considerations

1. **Database Indexing**: The `short_url` field should be indexed for faster lookups
2. **Caching**: Consider implementing caching for frequently accessed URLs
3. **Connection Pooling**: MongoDB connection pooling is used for better performance

## Deployment

The application can be deployed using:

1. **PM2** (recommended for production):
   ```bash
   npm start
   ```

2. **Development mode**:
   ```bash
   npm run start:dev
   ```

## Monitoring and Logging

1. **Morgan**: HTTP request logging
2. **Console Logging**: Basic error and operation logging
3. **PM2**: Process monitoring in production

## Future Improvements

1. Implement user authentication
2. Add analytics for URL usage
3. Implement rate limiting
4. Add URL expiration
5. Implement custom URL aliases
6. Add bulk URL shortening
7. Implement URL preview
8. Add URL categorization
9. Implement API key authentication
10. Add usage statistics dashboard 