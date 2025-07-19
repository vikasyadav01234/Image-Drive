import express from 'express';
import connectDB from './dbconfig/index.js';
import authRoutes from './routes/authRoute.js';
import folderRoutes from './routes/folderRoute.js';
import imageRoutes from './routes/imageRoute.js';
import cors from 'cors';

const app = express();

app.use(cors('*'))
connectDB();
app.use(express.json()); // Don't forget this!

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/folder', folderRoutes);
app.use('/api/v1/image',imageRoutes)
app.listen(8000, () => {
  console.log("🚀 Server is running on port 8000");
});
