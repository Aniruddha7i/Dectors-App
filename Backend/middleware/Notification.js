import nodemailer from 'nodemailer';
import twilio from 'twilio';

// --- NODEMAILER TRANSPORTER SETUP ---
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// --- TWILIO CLIENT SETUP ---
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Sends a notification email for an online appointment.
 * @param {object} appointment - The appointment details object.
 */
export const sendAppointmentEmail = async (appointment) => {
    try {
        const mailOptions = {
            from: `"Doctor's Clinic" <${process.env.MAIL_USER}>`,
            to: appointment.userData.email,
            subject: 'Your Online Appointment is Confirmed!',
            html: `
                <h1>Appointment Confirmed</h1>
                <p>Hi ${appointment.userData.name},</p>
                <p>Your online appointment with <strong>Dr. ${appointment.docData.name}</strong> is confirmed.</p>
                <p><strong>Date:</strong> ${appointment.slotDate.replace(/_/g, '/')}</p>
                <p><strong>Time:</strong> ${appointment.slotTime}</p>
                <p>Please use the following link to join the meeting at the scheduled time:</p>
                <a href="${appointment.meetingLink}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Join Meeting</a>
                <p>Meeting Link: ${appointment.meetingLink}</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

/**
 * Sends a notification SMS for an online appointment.
 * @param {object} appointment - The appointment details object.
 */
export const sendAppointmentSms = async (appointment) => {
    if (!appointment.userData.phone || appointment.userData.phone === '0000000000') {
        console.log('User phone number not available. Skipping SMS.');
        return;
    }
    try {
        const message = `Your online appointment with Dr. ${appointment.docData.name} is confirmed for ${appointment.slotDate} at ${appointment.slotTime}. Join here: ${appointment.meetingLink}`;
        
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${appointment.userData.phone}` // Assuming Indian phone numbers for this example
        });
        console.log('Confirmation SMS sent successfully.');
    } catch (error)
    {
        console.error('Error sending confirmation SMS:', error);
    }
};