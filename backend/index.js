import express from 'express';
import connectDB from './dbconfig/index.js';
import authRoutes from './routes/authRoute.js';
import folderRoutes from './routes/folderRoute.js';
const app = express();

connectDB();
app.use(express.json()); // Don't forget this!

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/folder', folderRoutes);
app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
