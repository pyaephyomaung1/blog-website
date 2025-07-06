"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Import the Express application
const prisma_1 = __importDefault(require("./prisma")); // Import the Prisma client singleton
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        // Connect to the database using Prisma
        await prisma_1.default.$connect();
        console.log('✅ Database connected successfully');
        // Start the Express server
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📍 Articles API: http://localhost:${PORT}/api/articles`);
            console.log(`📍 Categories API: http://localhost:${PORT}/api/categories`);
        });
    }
    catch (error) {
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
    await prisma_1.default.$disconnect();
    console.log('Database disconnected.');
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\nShutting down server...');
    await prisma_1.default.$disconnect();
    console.log('Database disconnected.');
    process.exit(0);
});
