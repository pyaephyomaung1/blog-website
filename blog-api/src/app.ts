import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); // Changed from 'combined' to 'dev'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Sports Blog API is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Simple routes for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Sports Blog API' });
});

export default app;