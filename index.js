const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle all routes by serving index.html for client-side routing
// or the specific file if it exists
app.get('*', (req, res) => {
  // Check if the requested file exists in public directory
  const filePath = path.join(__dirname, 'public', req.path);
  
  // If requesting a directory, try to serve index.html from that directory
  if (req.path.endsWith('/')) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  
  // If requesting a specific file that exists, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  
  // If requesting a file that doesn't exist, try to serve index.html
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  
  // If index.html doesn't exist, send a 404
  res.status(404).send('Not found');
});

module.exports = app;