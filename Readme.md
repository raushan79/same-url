# SameURL - URL Shortener API

SameURL is a simple and efficient URL shortening service that allows you to create short, memorable URLs for your long web addresses.

## Features

- Create shortened URLs from long web addresses
- Automatic redirection from shortened URLs to original URLs
- Simple and RESTful API
- MongoDB database for reliable storage
- Easy to deploy and scale

## Tech Stack

- Node.js
- Express.js
- MongoDB
- ES Modules

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sameurl-api.git
cd sameurl-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=7211
MONGO_DB_URI='your_mongodb_connection_string'
BASE_URL='https://sameurl.in'
```

4. Start the server:
```bash
# Development mode
npm run start:dev

# Production mode
npm start
```

## API Documentation

For detailed API documentation, please refer to the [docs](./docs/README.md) directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.