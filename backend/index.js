import express from 'express';
import connectDB from './dbconfig/index.js';
import authRoutes from './routes/authRoute.js';

const app = express();

connectDB();
app.use(express.json()); // Don't forget this!

app.use('/api/v1/auth', authRoutes);

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
