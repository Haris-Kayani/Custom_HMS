# Custom Hospital Management System (HMS)

A full-stack Hospital Management System built with modern web technologies for managing appointments, doctor profiles, user accounts, and administrative operations.

## 🎯 Project Overview

Custom HMS is a comprehensive healthcare management platform that streamlines patient-doctor interactions, appointment scheduling, and medical record management. The application provides an intuitive interface for patients to book appointments, view doctors, manage their profiles, and for administrators to oversee the entire system.

## 🏗️ System Architecture

The project follows a client-server architecture with:
- **Frontend**: React 19 + Vite (SPA - Single Page Application)
- **Backend**: Node.js + Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **Real-time Features**: Email notifications via Nodemailer
- **File Storage**: Cloudinary for image uploads

## 📋 Key Features

### User Features
- **User Authentication**: JWT-based secure login/register with password hashing (bcryptjs)
- **User Profiles**: Complete profile management with medical history
- **Appointment Booking**: Schedule appointments with doctors
- **Appointment Management**: View, reschedule, and cancel appointments
- **Doctor Search**: Browse doctors by specialization
- **Personal Dashboard**: View appointments and manage profile

### Doctor Features
- **Doctor Profiles**: Display specialization, consultation fees, availability
- **Appointment Management**: Accept/manage patient appointments
- **Medical Records**: Add diagnosis, prescriptions, lab tests

### Admin Features
- **System Management**: Manage users, doctors, and appointments
- **Dashboard Analytics**: Overview of system statistics
- **Doctor Management**: Add, edit, delete doctors
- **Specialist Management**: Manage medical specializations
- **Appointment Control**: Monitor all appointments

### Security & Performance
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Express-validator for all inputs
- **CORS Protection**: Configured for specific origins
- **Helmet.js**: Security headers for HTTP responses
- **Password Hashing**: bcryptjs for secure password storage
- **Email Notifications**: Automated alerts for appointments

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Express.js** | Web framework |
| **Node.js** | Runtime environment |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |
| **Cloudinary** | Cloud image storage |
| **Nodemailer** | Email notifications |
| **Helmet** | Security middleware |
| **CORS** | Cross-origin resource sharing |
| **Express-validator** | Input validation |
| **Morgan** | HTTP request logging |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Tailwind Animate** | Animation utilities |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |
| **Tabler Icons** | Additional icons |
| **React Icons** | Icon components |
| **React Toastify** | Notification system |
| **Next Themes** | Theme management |

## 📁 Project Structure

```
root/
├── backend/                          # Node.js/Express API
│   ├── config/
│   │   ├── database.js              # MongoDB connection configuration
│   │   └── cloudinary.js            # Cloudinary setup
│   ├── controllers/
│   │   ├── authController.js        # Register, login, password reset
│   │   ├── userController.js        # User profile operations
│   │   ├── doctorController.js      # Doctor management
│   │   ├── appointmentController.js # Appointment operations
│   │   ├── adminController.js       # Admin operations
│   │   └── specialistController.js  # Specialist management
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification & authorization
│   │   ├── errorHandler.js          # Global error handling
│   │   ├── rateLimiter.js           # API rate limiting
│   │   └── validation.js            # Input validation rules
│   ├── models/
│   │   ├── User.js                  # Patient schema
│   │   ├── Doctor.js                # Doctor schema
│   │   ├── Appointment.js           # Appointment schema
│   │   ├── Admin.js                 # Admin schema
│   │   └── Specialist.js            # Specialization schema
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   ├── userRoutes.js            # User endpoints
│   │   ├── doctorRoutes.js          # Doctor endpoints
│   │   ├── appointmentRoutes.js     # Appointment endpoints
│   │   ├── adminRoutes.js           # Admin endpoints
│   │   └── specialistRoutes.js      # Specialist endpoints
│   ├── utils/
│   │   ├── emailService.js          # Email sending utilities
│   │   ├── fileUpload.js            # File upload helpers
│   │   ├── cloudinaryService.js     # Cloudinary integration
│   │   └── helpers.js               # General helper functions
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                    # Entry point
│   └── README.md
│
└── frontend/                         # React/Vite application
    ├── src/
    │   ├── components/
    │   │   ├── Appointment.jsx          # Appointment booking form
    │   │   ├── AppointmentBanner.jsx    # Banner component
    │   │   ├── AuthLogo.jsx             # Authentication logo
    │   │   ├── DocterList.jsx           # Doctors listing component
    │   │   ├── Footer.jsx               # Footer component
    │   │   ├── ForgotPassword.jsx       # Password recovery form
    │   │   ├── HeaderBanner.jsx         # Header banner
    │   │   ├── Login.jsx                # Login component
    │   │   ├── NavBar.jsx               # Navigation bar
    │   │   ├── RelatedDoctors.jsx       # Related doctors display
    │   │   ├── SignUp.jsx               # Registration component
    │   │   ├── Specialists.jsx          # Specialists menu
    │   │   └── ui/
    │   │       └── sonner.jsx           # Toast UI wrapper
    │   ├── context/
    │   │   ├── AppContext.jsx           # Global app state
    │   │   └── LanguageContext.jsx      # Multi-language support
    │   ├── pages/
    │   │   ├── About.jsx                # About page
    │   │   ├── Contact.jsx              # Contact page
    │   │   ├── Docters.jsx              # Doctors listing page
    │   │   ├── Home.jsx                 # Home page
    │   │   ├── MyAppointments.jsx       # User appointments page
    │   │   ├── MyProfile.jsx            # User profile page
    │   │   └── error_pages/
    │   │       └── 404_Page.jsx         # 404 error page
    │   ├── services/
    │   │   └── api.js                   # Axios API configuration
    │   ├── lib/
    │   │   └── utils.js                 # Utility functions
    │   ├── assets/
    │   │   └── assets.js                # Static assets
    │   ├── App.jsx                      # Root component
    │   ├── main.jsx                     # React entry point
    │   └── index.css                    # Global styles
    ├── public/
    │   └── images/                      # Static images
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── eslint.config.js
    ├── components.json
    └── index.html
```

## 📊 Database Schema Overview

### User Schema
- Personal information (firstName, lastName, email, mobile)
- Authentication (password, JWT tokens)
- Medical info (dateOfBirth, gender, bloodGroup)
- Address (line1, line2)
- Profile image
- Account status and timestamps

### Doctor Schema
- Basic info (name, email, specialization)
- Professional details (qualification, experience, consultationFee)
- Availability and schedule
- Profile image
- Ratings and reviews
- Patient history

### Appointment Schema
- Patient & Doctor references
- Date & time information
- Appointment type (in-person, video-call, phone-call)
- Status tracking (pending, confirmed, cancelled, completed, no-show)
- Medical details (reason, symptoms, notes)
- Diagnosis & prescriptions
- Lab tests information

### Admin Schema
- Admin credentials and permissions
- Role-based access control

### Specialist Schema
- Specialization details
- Description and image

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance running
- Cloudinary account (for image uploads)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** from `.env.example`
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/custom_hms
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@customhms.com
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/appointments` - Get user appointments

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Create doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor (admin only)
- `DELETE /api/doctors/:id` - Delete doctor (admin only)
- `GET /api/doctors/:id/availability` - Get doctor availability

### Appointments
- `GET /api/appointments` - List appointments (protected)
- `POST /api/appointments` - Create appointment (protected)
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `PUT /api/appointments/:id/status` - Update appointment status

### Specialists
- `GET /api/specialists` - List all specialists
- `GET /api/specialists/:id` - Get specialist details
- `POST /api/specialists` - Create specialist (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - List all users (admin only)
- `GET /api/admin/doctors` - List all doctors (admin only)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication Flow

1. **Registration**: User submits email, password, and personal details
2. **Password Storage**: Password is hashed using bcryptjs before storage
3. **Login**: User provides email and password
4. **Token Generation**: Server generates JWT token valid for 7 days
5. **Token Storage**: Client stores token in localStorage
6. **Protected Routes**: Token sent in Authorization header for API calls
7. **Token Validation**: Middleware verifies token on protected endpoints
8. **Auto-logout**: Token expires after 7 days, user must login again

## 🎨 Frontend Routing

- `/` - Home page with doctor listing and specialists
- `/doctors` - Browse all doctors
- `/doctors/:speciality` - Filter doctors by specialization
- `/doctors/:doctorID/appointment` - Book appointment with doctor
- `/my-appointments` - View user's appointments
- `/my-profile` - Edit user profile
- `/contact` - Contact form
- `/about` - About page
- `/404` - Not found page

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcryptjs with salt rounds
3. **Rate Limiting**: Prevent brute force attacks
4. **CORS Protection**: Whitelist specific origins
5. **Input Validation**: Express-validator on all endpoints
6. **Security Headers**: Helmet.js middleware
7. **HTTP Only Cookies**: Secure token storage
8. **Environment Variables**: Sensitive data in .env files
9. **Error Handling**: Generic error messages to prevent info leakage

## 📧 Email Notifications

The system sends automated emails for:
- Account registration confirmation
- Password reset links
- Appointment confirmation/cancellation
- Appointment reminders

Uses Nodemailer with SMTP configuration.

## 📱 Responsive Design

Built with TailwindCSS 4 for mobile-first responsive design:
- Mobile: 320px and up
- Tablet: 768px and up
- Desktop: 1024px and up

## 🧪 Testing

Currently no automated tests configured. Consider adding:
- Jest for backend unit tests
- Vitest for frontend unit tests
- Supertest for API endpoint testing

## 📝 Logging

Backend uses Morgan for HTTP request logging in development mode.
Log format: `method route statusCode responseTime`

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables on hosting platform
2. Update FRONTEND_URL to production URL
3. Ensure MongoDB URI points to production database
4. Deploy with `npm start`

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Output directory: `dist/`
3. Set API base URL to production backend URL
4. Deploy the `dist/` folder

## 📦 Dependencies Summary

### Backend (Main)
- express (v4.18.2)
- mongoose (v8.0.3)
- jsonwebtoken (v9.0.2)
- bcryptjs (v2.4.3)
- multer (v1.4.5)
- cloudinary (v1.41.0)
- nodemailer (v6.9.7)
- helmet (v7.1.0)
- express-rate-limit (v7.1.5)

### Frontend (Main)
- react (v19.1.1)
- react-router-dom (v7.9.1)
- axios (v1.12.1)
- tailwindcss (v4.1.13)
- sonner (v2.0.7)

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Verify network access if using MongoDB Atlas

### CORS Error
- Check FRONTEND_URL in backend .env
- Verify origin in cors configuration

### Cloudinary Upload Fails
- Verify Cloudinary credentials in .env
- Check file size limits (max 10MB)

### Email Not Sending
- Enable "Less secure app access" for Gmail
- Use app-specific password for Gmail
- Verify SMTP credentials in .env

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [JWT Introduction](https://jwt.io/)

## 📄 License

ISC License

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Check existing issues in repository
- Create a new issue with detailed description
- Include error messages and screenshots

---

**Last Updated**: January 2026
**Current Status**: Active Development
