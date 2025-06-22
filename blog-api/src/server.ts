import 'reflect-metadata';
import * as dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import { AppDataSource } from './config/database';
import app from './app';

const PORT = process.env.PORT || 5000;

// Initialize database connection and start server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  });