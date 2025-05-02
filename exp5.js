const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Serve login page
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
      if (err) {
        res.write('Error loading login page');
      } else {
        res.write(data);
      }
      res.end();
    });
  }

  // Handle login
  else if (url === '/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const email = params.get('email');
      const password = params.get('password');

      if (email === 'rithikn.23it@kongu.edu' && password === '123456') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Welcome</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #8e2de2, #4a00e0);
                height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .welcome-box {
                background: rgba(255, 255, 255, 0.9);
                padding: 3rem 2rem;
                border-radius: 20px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                max-width: 500px;
                text-align: center;
              }
              h2 {
                color: #4a00e0;
                margin-bottom: 1.5rem;
              }
              .btn-custom {
                background-color: #6f42c1;
                color: white;
                padding: 0.6rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 500;
                text-decoration: none;
              }
              .btn-custom:hover {
                background-color: #5a32a3;
              }
            </style>
          </head>
          <body>
            <div class="welcome-box">
              <h2>Welcome to the site, ${email}!</h2>
              <p>Feel free to explore and enjoy your visit.</p>
              <a href="/" class="btn btn-custom mt-3">Logout</a>
            </div>
          </body>
          </html>
        `);
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Invalid</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(to right, #ff4e50, #f9d423);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .card {
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
              }
              .btn-custom {
                background-color: #dc3545;
                color: white;
                border: none;
              }
              .btn-custom:hover {
                background-color: #c82333;
              }
            </style>
          </head>
          <body>
            <div class="card text-center">
              <h2 class="text-danger mb-3">Invalid login!</h2>
              <a href="/" class="btn btn-custom">Try Again</a>
            </div>
          </body>
          </html>
        `);
      }
    });
  }

  // 404 Page
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #000428, #004e92);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }
          a {
            color: #00c9ff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>404 - Page Not Found</h1>
          <p><a href="/">Return to Login</a></p>
        </div>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
