const express = require('express');
const mongoose = require('mongoose');
const monkRoutes = require('./routes/monkRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

app.use(express.json()); // Body parser

app.use('/api/monks', monkRoutes);
app.use('/api/videos', videoRoutes);

module.exports = app;