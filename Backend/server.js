import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorsRoutes.js';
import userRouter from './routes/userRoutes.js';
import medicineRouter from './routes/medicineRoutes.js';

// --- NEW IMPORTS FOR NOTIFICATION SCHEDULING ---
import cron from 'node-cron';
import appointmentModel from './models/appointmentModel.js';
import { sendMeetingLinkEmail, sendMeetingLinkSms } from './middleware/Notification.js';


// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
// app.use(cors());

// for global
app.use(cors({
  origin: "https://backend-server-doctor-app.vercel.app", // Vercel frontend domain
  credentials: true
}));


// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/shop', medicineRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

// --- NEW: CRON JOB FOR SCHEDULED NOTIFICATIONS ---
// This job will run every minute to check for upcoming appointments.
cron.schedule('* * * * *', async () => {
  console.log('Checking for upcoming appointment reminders...');
  
  const now = new Date();
  const reminderTimeStart = new Date(now.getTime() + 15 * 60 * 1000);
  const reminderTimeEnd = new Date(now.getTime() + 16 * 60 * 1000);

  try {
    const upcomingAppointments = await appointmentModel.find({
        appointmentType: 'Online',
        notified: { $ne: true },
    });

    for (const appt of upcomingAppointments) {
        const [day, month, year] = appt.slotDate.split('_');
        const [timePart, ampm] = appt.slotTime.split(' ');
        let [hours, minutes] = timePart.split(':');
        
        hours = parseInt(hours);
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;

        const appointmentDate = new Date(year, month - 1, day, hours, minutes);

        if (appointmentDate >= reminderTimeStart && appointmentDate < reminderTimeEnd) {
            console.log(`Sending meeting link reminder for appointment ID: ${appt._id}`);
            
            await sendMeetingLinkEmail(appt);
            await sendMeetingLinkSms(appt);

            await appointmentModel.findByIdAndUpdate(appt._id, { notified: true });
        }
    }
  } catch (error) {
    console.error('Error in cron job for reminders:', error);
  }
});


app.listen(port, () => console.log('Server started on port:', port));