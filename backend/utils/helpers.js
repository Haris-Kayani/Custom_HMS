// Format date to readable string
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Format time to 12-hour format
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Generate time slots
export const generateTimeSlots = (startTime, endTime, duration = 30) => {
  const slots = [];
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  
  while (start < end) {
    const hours = start.getHours().toString().padStart(2, '0');
    const minutes = start.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    start.setMinutes(start.getMinutes() + duration);
  }
  
  return slots;
};

// Check if date is in the past
export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

// Get date range
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  
  while (currentDate <= lastDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

// Sanitize string (remove HTML tags, trim, etc.)
export const sanitizeString = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
};

// Generate random string
export const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Pagination helper
export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

// Response helper
export const sendResponse = (res, statusCode, success, data, message = null) => {
  const response = { success };
  
  if (message) response.message = message;
  if (data) response.data = data;
  
  return res.status(statusCode).json(response);
};
