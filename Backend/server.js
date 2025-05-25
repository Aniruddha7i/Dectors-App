import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorsRoutes.js';
import userRouter from './routes/userRoutes.js';

// App config
const app = express();
const port = process.env.PORT || 5000;

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// ✅ Recommended CORS setup for multiple frontends
const allowedOrigins = [
  'http://localhost:3000',                    // main frontend (local dev)
  'http://localhost:5173',                    // admin frontend (local dev)
  'https://doctors-g9lfl8ock-aniruddha-chandras-projects.vercel.app',  // main frontend (prod)
  // add other allowed origins here if needed
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// Start server - bind to all interfaces so it's accessible from other devices
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
});
