# SameURL API Documentation

## Overview

SameURL provides a simple REST API for creating and managing shortened URLs. The API is designed to be easy to use and integrate with your applications.

## Base URL

All API endpoints are relative to the base URL:
```
https://sameurl.in
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Create a Shortened URL

Create a new shortened URL from a long web address.

**Endpoint:** `POST /shorten`

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url/that/needs/to/be/shortened"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Short url created",
  "original_url": "https://example.com/very/long/url/that/needs/to/be/shortened",
  "short_url": "https://sameurl.in/abc123"
}
```

### Check if URL Exists

Check if a URL has already been shortened.

**Endpoint:** `GET /shorten`

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url/that/needs/to/be/shortened"
}
```

**Response:**
- If URL exists:
  ```
  https://sameurl.in/abc123
  ```
- If URL doesn't exist:
  ```json
  {
    "message": "hort url not found"
  }
  ```

### Access Shortened URL

Access a shortened URL to be redirected to the original URL.

**Endpoint:** `GET /:urlId`

**Parameters:**
- `urlId`: The unique identifier of the shortened URL

**Response:**
- If URL exists: Redirects to the original URL
- If URL doesn't exist:
  ```json
  {
    "status": "success",
    "message": "Short url not found//"
  }
  ```

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, there are no rate limits implemented. However, please use the API responsibly.

## Best Practices

1. Always use HTTPS for API requests
2. Handle errors gracefully in your application
3. Cache responses when appropriate
4. Implement proper error handling for network issues

## Example Usage

### Using cURL

```bash
# Create a shortened URL
curl -X POST https://sameurl.in/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/url"}'

# Check if URL exists
curl -X GET https://sameurl.in/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/url"}'
```

### Using JavaScript (Fetch API)

```javascript
// Create a shortened URL
const response = await fetch('https://sameurl.in/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url'
  })
});

const data = await response.json();
console.log(data.short_url);
```

## Support

For support, please open an issue in the GitHub repository or contact the maintainers. 