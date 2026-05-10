import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import budgetRoutes from './routes/budgetRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', budgetRoutes);

app.get('/', (req, res) => {
  res.send('TRAVELOOP Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
