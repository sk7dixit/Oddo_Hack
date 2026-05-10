import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';

const logFile = path.join(process.cwd(), 'debug.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

const log = (msg: string) => {
  const entry = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  logStream.write(entry);
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/trips', tripRoutes);

// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  log(`GLOBAL ERROR: ${err.stack || err}`);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Base route
app.get('/', (req, res) => {
  res.send('Traveloop API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
