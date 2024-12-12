
import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

// Load environment variables
config();

import newsRoutes from './routes/newsRoutes.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(json());


app.use('/api/news', newsRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;