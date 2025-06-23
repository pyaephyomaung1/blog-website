import app from './app'; // Import the Express application
import prisma from './prisma'; // Import the Prisma client singleton

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to the database using Prisma
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📍 Articles API: http://localhost:${PORT}/api/articles`);
      console.log(`📍 Categories API: http://localhost:${PORT}/api/categories`);
    });
  } catch (error: any) {
    console.error('❌ Server startup failed:', error.message);
    console.error('Please ensure your MySQL database is running and accessible.');
    // Optionally log the full error stack for debugging
    // console.error(error);
    process.exit(1); // Exit the process with an error code
  }
}

// Call the function to start the server
startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  await prisma.$disconnect();
  console.log('Database disconnected.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down server...');
  await prisma.$disconnect();
  console.log('Database disconnected.');
  process.exit(0);
});