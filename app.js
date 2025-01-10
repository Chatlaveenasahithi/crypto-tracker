const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const connectDB = require('./utils/dbConnection');
const fetchCryptoData = require('./jobs/fetchCryptoData');
const statsRoutes = require('./routes/statsRoutes');
const deviationRoutes = require('./routes/deviationRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', statsRoutes);
app.use('/api', deviationRoutes);

// Schedule the background job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
