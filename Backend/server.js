import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
// app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
// middleware
app.use(express.json());
app.use(cors()) //Without cors(), a request from a different domain (e.g., localhost:3000 making a request to localhost:5000) will fail with a CORS error. By using app.use(cors()), you allow such cross-origin requests.

// api endPoint
app.use('/api/admin',adminRouter) // /api/admin/add-doctor or all-doctor or login


app.get('/',(req,res)=>{
    res.send('API Working');
})

app.listen(port,()=>console.log('server',port))