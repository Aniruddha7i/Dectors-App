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
import { sendAppointmentEmail, sendAppointmentSms } from './middleware/Notification.js';


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
  console.log('Checking for upcoming appointment notifications...');
  
  const now = new Date();
  // Set the time window for reminders (e.g., appointments starting in the next 15 to 16 minutes)
  const reminderTimeStart = new Date(now.getTime() + 15 * 60 * 1000);
  const reminderTimeEnd = new Date(now.getTime() + 16 * 60 * 1000);

  try {
    // Find online appointments that have not yet been notified
    const upcomingAppointments = await appointmentModel.find({
        appointmentType: 'Online',
        notified: { $ne: true }, // Assumes you add a 'notified' field to your model
    });

    for (const appt of upcomingAppointments) {
        // Reconstruct the appointment date from stored strings
        const [day, month, year] = appt.slotDate.split('_');
        const [timePart, ampm] = appt.slotTime.split(' ');
        let [hours, minutes] = timePart.split(':');
        
        hours = parseInt(hours);
        if (ampm === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (ampm === 'AM' && hours === 12) { // Handle midnight case
            hours = 0;
        }

        // Create a Date object for the appointment time
        const appointmentDate = new Date(year, month - 1, day, hours, minutes);

        // Check if the appointment falls within our reminder window
        if (appointmentDate >= reminderTimeStart && appointmentDate < reminderTimeEnd) {
            console.log(`Sending notification for appointment ID: ${appt._id}`);
            
            // Send the email and SMS
            await sendAppointmentEmail(appt);
            await sendAppointmentSms(appt);

            // Mark the appointment as notified to prevent sending reminders again
            await appointmentModel.findByIdAndUpdate(appt._id, { notified: true });
        }
    }
  } catch (error) {
    console.error('Error executing cron job for notifications:', error);
  }
});


app.listen(port, () => console.log('Server started on port:', port));