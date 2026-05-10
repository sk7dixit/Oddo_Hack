import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { sql } from './config/db';

import webhookRoutes from './routes/webhookRoutes';
import authRoutes from './routes/authRoutes';
import { clerkMiddleware } from '@clerk/express';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Webhook route needs raw body parser, so it must come BEFORE express.json()
app.use('/api/webhooks', webhookRoutes);

// Global middleware for parsing JSON bodies
app.use(express.json());

// Add clerk middleware
app.use(clerkMiddleware());

// Mount auth routes
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Traveloop API is running.' });
});

// Test database connection
app.get('/api/db-version', async (_req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.json({ version });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
