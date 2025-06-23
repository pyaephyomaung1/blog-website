import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import route modules
import categoryRoutes from './routes/categoryRoutes';
import articleRoutes from './routes/articleRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files (uploaded images)
// This makes files in 'public/images' accessible via '/images' URL path
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// API Routes
app.use('/api/categories', categoryRoutes); // Categories API endpoints
app.use('/api/articles', articleRoutes);   // Articles API endpoints

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Sports Blog API is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Sports Blog API' });
});

// Catch-all for undefined routes (404 handler)
// This must be placed AFTER all other routes
app.all('*', (req, res) => { // <-- THIS LINE IS CRUCIAL
  res.status(404).json({ message: 'Route not found' });
});

export default app;