"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Import route modules
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Enable CORS for cross-origin requests
app.use(express_1.default.json()); // Parse JSON request bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// Serve static files (uploaded images)
// This makes files in 'public/images' accessible via '/images' URL path
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '..', 'public', 'images')));
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default); // Categories API endpoints
app.use('/api/articles', articleRoutes_1.default); // Articles API endpoints
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
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;
