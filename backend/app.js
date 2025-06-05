// Importing necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');
const productRoutes = require('./Routes/productRoutes');
const Routes = require('./Routes/Routes');
const UserRoutes = require('./Routes/UserRoutes');
const feedbackRoutes = require('./Routes/feedbackRoutes');

const app = express();

// Trust the proxy (important for HTTPS redirect behind proxies like Cloudflare/EB)
app.set('trust proxy', true);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: true, // Or use your frontend origin e.g. 'https://your-frontend.com'
  credentials: true
}));

// Middleware for cookie parsing
app.use(cookieParser());

// HTTPS redirect middleware (for Cloudflare or EB Load Balancer)
app.use((req, res, next) => {
  // Don't redirect for AWS health check
  if (req.url === '/health') return next();

  // Redirect to HTTPS if not secure
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', productRoutes);
app.use('/api/v1/common', Routes);
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the SilaiHub API Home Page!');
});

// Start the server after DB connection
const PORT = process.env.PORT || 8000;
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
