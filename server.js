// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the CORS package
const middlewares = jsonServer.defaults();

// Make sure the db.json is only read-only and served from memory to avoid errors when deployed to vercel.
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
const router = jsonServer.router(data);

// Enable CORS with specific settings
server.use(cors({
  origin: '*', // Replace this with the frontend's origin
  methods: 'GET,POST,PUT,DELETE,PATHC', // Allow specific methods
  credentials: true, // Allow credentials (if needed)
}));

server.use(middlewares);

// Rewriting routes if necessary
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
