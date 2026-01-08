# Custom HMS Backend

Backend server for Custom Hospital Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (User, Doctor, Admin)
- **User Management**: Complete user profile management with medical history tracking
- **Doctor Management**: Doctor profiles with specializations, availability, and consultation fees
- **Appointment System**: Full appointment booking and management system
- **Admin Dashboard**: Comprehensive admin panel for system management
- **Email Notifications**: Automated email notifications for appointments
- **File Uploads**: Image upload support via Cloudinary
- **Security**: Helmet, rate limiting, CORS, and input validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User operations
│   ├── doctorController.js  # Doctor operations
│   ├── appointmentController.js # Appointment management
│   ├── adminController.js   # Admin operations
│   └── specialistController.js # Specialist operations
├── middleware/
│   ├── auth.js              # Authentication & authorization
│   ├── errorHandler.js      # Global error handling
│   ├── rateLimiter.js       # Rate limiting
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User schema
│   ├── Doctor.js            # Doctor schema
│   ├── Appointment.js       # Appointment schema
│   ├── Admin.js             # Admin schema
│   └── Specialist.js        # Specialist schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── userRoutes.js        # User endpoints
│   ├── doctorRoutes.js      # Doctor endpoints
│   ├── appointmentRoutes.js # Appointment endpoints
│   ├── adminRoutes.js       # Admin endpoints
│   └── specialistRoutes.js  # Specialist endpoints
├── utils/
│   ├── emailService.js      # Email utilities
│   ├── fileUpload.js        # File upload utilities
│   ├── cloudinaryService.js # Cloudinary helpers
│   └── helpers.js           # General helpers
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## Installation

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Setup**
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/custom_hms
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:5173

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@customhms.com
FROM_NAME=Custom HMS
```

3. **Database Setup**
Make sure MongoDB is installed and running:
```bash
# Start MongoDB (if using local installation)
mongod
```

Or use MongoDB Atlas (cloud):
- Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and update `MONGODB_URI` in `.env`

4. **Run the Server**

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user/doctor/admin
- `GET /me` - Get current user
- `POST /logout` - Logout user
- `POST /forgot-password` - Request password reset
- `PUT /reset-password/:token` - Reset password

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /update-password` - Update password
- `POST /medical-history` - Add medical history
- `PUT /medical-info` - Update medical info
- `DELETE /account` - Deactivate account

### Doctors (`/api/doctors`)
- `GET /` - Get all doctors (with filters)
- `GET /:id` - Get single doctor
- `GET /specialization/:specialization` - Get doctors by specialization
- `GET /:id/related` - Get related doctors
- `GET /profile/me` - Get doctor profile (auth)
- `PUT /profile` - Update doctor profile (auth)
- `PUT /availability` - Update availability (auth)
- `POST /education` - Add education (auth)
- `POST /awards` - Add award (auth)

### Appointments (`/api/appointments`)
- `POST /` - Create appointment (user)
- `GET /my-appointments` - Get user appointments (user)
- `GET /doctor-appointments` - Get doctor appointments (doctor)
- `GET /stats` - Get appointment statistics (doctor)
- `GET /:id` - Get single appointment
- `PUT /:id/status` - Update status (doctor/admin)
- `PUT /:id/cancel` - Cancel appointment
- `PUT /:id/consultation` - Add consultation notes (doctor)
- `PUT /:id/payment` - Update payment status (admin)

### Admin (`/api/admin`)
- `GET /stats` - Get dashboard statistics
- `GET /users` - Get all users
- `GET /doctors` - Get all doctors
- `GET /appointments` - Get all appointments
- `PUT /doctors/:id/verify` - Verify doctor
- `PUT /users/:id/deactivate` - Deactivate user
- `POST /create` - Create new admin
- `DELETE /:userType/:id` - Delete user

### Specialists (`/api/specialists`)
- `GET /` - Get all specialists
- `GET /:id` - Get single specialist
- `POST /` - Create specialist (admin)
- `PUT /:id` - Update specialist (admin)
- `DELETE /:id` - Delete specialist (admin)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:

**Header:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Or Cookie:**
```
token=YOUR_JWT_TOKEN
```

## Role-Based Access

- **User**: Can book appointments, manage profile, view medical history
- **Doctor**: Can manage appointments, add consultation notes, update profile
- **Admin**: Full system access, user management, statistics

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Testing

Health check endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-08T..."
}
```

## Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Cross-Origin Resource Sharing configured
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: All inputs validated
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Expiration**: Tokens expire after 7 days
- **HTTP-Only Cookies**: Secure token storage

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "custom-hms-backend"
```

3. Set up MongoDB Atlas for cloud database
4. Configure Cloudinary for image uploads
5. Set up email service (Gmail, SendGrid, etc.)
6. Use HTTPS in production
7. Set up proper CORS origins

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
