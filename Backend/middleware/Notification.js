import nodemailer from 'nodemailer';
import twilio from 'twilio';

// --- TRANSPORTER & CLIENT SETUP ---
// Initializes the services using credentials from your .env file.
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


// --- 1. IMMEDIATE BOOKING CONFIRMATION (For ALL appointment types) ---

/**
 * Sends a confirmation email immediately after any appointment is booked.
 * This is called by the `appointmentBooking` controller.
 * @param {object} appointment - The full appointment object from the database.
 */
export const sendBookingConfirmationEmail = async (appointment) => {
    try {
        const mailOptions = {
            from: `"Doctor's Clinic" <${process.env.MAIL_USER}>`,
            to: appointment.userData.email,
            subject: 'Appointment Booking Successful!',
            html: `
                <h1>Your Appointment is Confirmed</h1>
                <p>Hi ${appointment.userData.name},</p>
                <p>This is a confirmation that your appointment with <strong>Dr. ${appointment.docData.name}</strong> has been successfully booked.</p>
                <hr>
                <h3>Appointment Details:</h3>
                <ul>
                    <li><strong>Doctor:</strong> Dr. ${appointment.docData.name}</li>
                    <li><strong>Speciality:</strong> ${appointment.docData.speciality}</li>
                    <li><strong>Type:</strong> ${appointment.appointmentType} Checkup</li>
                    <li><strong>Date:</strong> ${appointment.slotDate.replace(/_/g, '/')}</li>
                    <li><strong>Time:</strong> ${appointment.slotTime}</li>
                </ul>
                <p>Thank you for choosing our clinic.</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

/**
 * Sends a confirmation SMS immediately after any appointment is booked.
 * This is called by the `appointmentBooking` controller.
 * @param {object} appointment - The full appointment object from the database.
 */
export const sendBookingConfirmationSms = async (appointment) => {
    // Skips sending if the user has not provided a valid phone number.
    if (!appointment.userData.phone || appointment.userData.phone === '0000000000') {
        console.log(`Skipping confirmation SMS for user ${appointment.userData.name} due to missing phone number.`);
        return;
    }
    try {
        const message = `Booking Confirmed: Your ${appointment.appointmentType} appointment with Dr. ${appointment.docData.name} is set for ${appointment.slotDate.replace(/_/g, '/')} at ${appointment.slotTime}.`;
        
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${appointment.userData.phone}` // IMPORTANT: Adjust country code if necessary
        });
        console.log('Booking confirmation SMS sent successfully.');
    } catch (error) {
        console.error('Error sending booking confirmation SMS:', error);
    }
};


// --- 2. ONLINE MEETING LINK REMINDER (For ONLINE appointments only) ---

/**
 * Sends a reminder email with the meeting link shortly before the appointment.
 * This is called by the scheduled cron job in `server.js`.
 * @param {object} appointment - The full appointment object from the database.
 */
export const sendMeetingLinkEmail = async (appointment) => {
    try {
        const mailOptions = {
            from: `"Doctor's Clinic" <${process.env.MAIL_USER}>`,
            to: appointment.userData.email,
            subject: `Reminder: Your Online Appointment with Dr. ${appointment.docData.name} is soon!`,
            html: `
                <h1>Appointment Reminder</h1>
                <p>Hi ${appointment.userData.name},</p>
                <p>This is a reminder for your online appointment with <strong>Dr. ${appointment.docData.name}</strong>, scheduled for today.</p>
                <p><strong>Date:</strong> ${appointment.slotDate.replace(/_/g, '/')}</p>
                <p><strong>Time:</strong> ${appointment.slotTime}</p>
                <p>Please use the button below to join the meeting at the scheduled time:</p>
                <a href="${appointment.meetingLink}" style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Join Meeting</a>
                <p style="margin-top: 15px;">Or copy this link into your browser: ${appointment.meetingLink}</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Meeting link email sent successfully.');
    } catch (error) {
        console.error('Error sending meeting link email:', error);
    }
};

/**
 * Sends a reminder SMS with the meeting link shortly before the appointment.
 * This is called by the scheduled cron job in `server.js`.
 * @param {object} appointment - The full appointment object from the database.
 */
export const sendMeetingLinkSms = async (appointment) => {
    // Skips sending if the user has not provided a valid phone number.
    if (!appointment.userData.phone || appointment.userData.phone === '0000000000') {
        console.log(`Skipping meeting link SMS for user ${appointment.userData.name} due to missing phone number.`);
        return;
    }
    try {
        const message = `Reminder: Your online appointment with Dr. ${appointment.docData.name} is starting soon. Join here: ${appointment.meetingLink}`;
        
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${appointment.userData.phone}` // IMPORTANT: Adjust country code if necessary
        });
        console.log('Meeting link SMS sent successfully.');
    } catch (error) {
        console.error('Error sending meeting link SMS:', error);
    }
};
