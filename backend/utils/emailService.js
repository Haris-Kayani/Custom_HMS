import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};

// Template for appointment confirmation email
export const sendAppointmentConfirmation = async (userEmail, appointmentDetails) => {
  const message = `
    Dear ${appointmentDetails.patientName},

    Your appointment has been confirmed!

    Appointment Details:
    - Doctor: Dr. ${appointmentDetails.doctorName}
    - Speciality: ${appointmentDetails.speciality}
    - Date: ${appointmentDetails.date}
    - Time: ${appointmentDetails.time}
    - Type: ${appointmentDetails.type}

    Please arrive 10 minutes before your scheduled time.

    Thank you for choosing Custom HMS.

    Best regards,
    Custom HMS Team
  `;
  
  const html = `
    <h2>Appointment Confirmation</h2>
    <p>Dear ${appointmentDetails.patientName},</p>
    <p>Your appointment has been confirmed!</p>
    <h3>Appointment Details:</h3>
    <ul>
      <li><strong>Doctor:</strong> Dr. ${appointmentDetails.doctorName}</li>
      <li><strong>Speciality:</strong> ${appointmentDetails.speciality}</li>
      <li><strong>Date:</strong> ${appointmentDetails.date}</li>
      <li><strong>Time:</strong> ${appointmentDetails.time}</li>
      <li><strong>Type:</strong> ${appointmentDetails.type}</li>
    </ul>
    <p>Please arrive 10 minutes before your scheduled time.</p>
    <p>Thank you for choosing Custom HMS.</p>
  `;

  await sendEmail({
    email: userEmail,
    subject: 'Appointment Confirmation - Custom HMS',
    message,
    html
  });
};

// Template for appointment reminder email
export const sendAppointmentReminder = async (userEmail, appointmentDetails) => {
  const message = `
    Dear ${appointmentDetails.patientName},

    This is a reminder for your upcoming appointment:

    - Doctor: Dr. ${appointmentDetails.doctorName}
    - Date: ${appointmentDetails.date}
    - Time: ${appointmentDetails.time}

    Please don't forget to bring any necessary medical documents.

    Thank you,
    Custom HMS Team
  `;

  await sendEmail({
    email: userEmail,
    subject: 'Appointment Reminder',
    message
  });
};

// Template for appointment cancellation email
export const sendAppointmentCancellation = async (userEmail, appointmentDetails) => {
  const message = `
    Dear ${appointmentDetails.patientName},

    Your appointment has been cancelled.

    Cancelled Appointment Details:
    - Doctor: Dr. ${appointmentDetails.doctorName}
    - Date: ${appointmentDetails.date}
    - Time: ${appointmentDetails.time}
    - Reason: ${appointmentDetails.reason}

    If you wish to reschedule, please book a new appointment through our website.

    Thank you,
    Custom HMS Team
  `;

  await sendEmail({
    email: userEmail,
    subject: 'Appointment Cancelled',
    message
  });
};
