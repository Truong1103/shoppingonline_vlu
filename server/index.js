const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Test API
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// APIs
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

// ================= ADMIN (React build) =================
app.use(
  '/admin',
  express.static(path.resolve(__dirname, '../client-admin/build'))
);

// FIX: wildcard đúng chuẩn Node 22
app.get('/admin/:path(.*)', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client-admin/build', 'index.html')
  );
});

// ================= CUSTOMER (React build) =================
app.use(
  '/',
  express.static(path.resolve(__dirname, '../client-customer/build'))
);

// FIX: wildcard global
app.get('/:path(.*)', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client-customer/build', 'index.html')
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
