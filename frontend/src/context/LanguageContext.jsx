import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  // NavBar
  navBar: {
    home: { Eng: "Home", Urdu: "ہوم" },
    allDoctors: { Eng: "All Doctors", Urdu: "تمام ڈاکٹرز" },
    about: { Eng: "About", Urdu: "ہمارے بارے میں" },
    contact: { Eng: "Contact", Urdu: "رابطہ" },
    myProfile: { Eng: "My Profile", Urdu: "میری پروفائل" },
    myAppointments: { Eng: "My Appointments", Urdu: "میری ملاقاتیں" },
    logout: { Eng: "Logout", Urdu: "لاگ آؤٹ" },
    createAccount: { Eng: "Login", Urdu: "لاگ ان" },
  },

  // Footer
  footer: {
    hospitalName: { Eng: "National Police Hospital", Urdu: "نیشنل پولیس ہسپتال" },
    copyright: { Eng: "© 2025 National Police Hospital", Urdu: "© ۲۰۲۵ نیشنل پولیس ہسپتال" },
    allRights: { Eng: "All Rights Reserved", Urdu: "تمام حقوق محفوظ ہیں" },
    privacy: { Eng: "Privacy", Urdu: "رازداری" },
    terms: { Eng: "Terms", Urdu: "شرائط" },
    contact: { Eng: "Contact", Urdu: "رابطہ" },
  },

  // Home Page
  home: {
    banner: {
      title: { Eng: "Book Appointment With Trusted Doctors", Urdu: "قابل اعتماد ڈاکٹروں کے ساتھ ملاقات بک کریں" },
      subtitle: { Eng: "Browse Through Our Extensive List of Trusted Doctors", Urdu: "ہمارے قابل اعتماد ڈاکٹروں کی فہرست دیکھیں" },
      button: { Eng: "Book appointment", Urdu: "ملاقات بک کریں" },
    },
    specialists: {
      title: { Eng: "Find by Speciality", Urdu: "خصوصیت کے لحاظ سے تلاش کریں" },
    },
    topDoctors: {
      title: { Eng: "Top Doctors to Book", Urdu: "بک کرنے کے لیے اعلیٰ ڈاکٹرز" },
      more: { Eng: "more", Urdu: "مزید" },
      available: { Eng: "Available", Urdu: "دستیاب" },
    },
  },

  // Login
  login: {
    title: { Eng: "National Police Hospital", Urdu: "نیشنل پولیس ہسپتال" },
    email: { Eng: "E-mail", Urdu: "ای میل" },
    emailPlaceholder: { Eng: "your@email.com", Urdu: "آپ_کی@ای_میل.کام" },
    password: { Eng: "Password", Urdu: "پاس ورڈ" },
    passwordPlaceholder: { Eng: "Enter your password", Urdu: "اپنا پاس ورڈ درج کریں" },
    loginButton: { Eng: "Login", Urdu: "لاگ ان" },
    forgotPassword: { Eng: "Forgot Password?", Urdu: "پاس ورڈ بھول گئے؟" },
    noAccount: { Eng: "Don't have an account?", Urdu: "اکاؤنٹ نہیں ہے؟" },
    signUp: { Eng: "Sign up here", Urdu: "یہاں سائن اپ کریں" },
  },

  // SignUp
  signUp: {
    title: { Eng: "National Police Hospital", Urdu: "نیشنل پولیس ہسپتال" },
    fullName: { Eng: "Full Name", Urdu: "پورا نام" },
    fullNamePlaceholder: { Eng: "John Doe", Urdu: "نام درج کریں" },
    email: { Eng: "E-mail", Urdu: "ای میل" },
    emailPlaceholder: { Eng: "your@email.com", Urdu: "آپ_کی@ای_میل.کام" },
    password: { Eng: "Password", Urdu: "پاس ورڈ" },
    passwordPlaceholder: { Eng: "Create a password", Urdu: "پاس ورڈ بنائیں" },
    confirmPassword: { Eng: "Confirm Password", Urdu: "پاس ورڈ کی تصدیق کریں" },
    confirmPasswordPlaceholder: { Eng: "Re-enter your password", Urdu: "اپنا پاس ورڈ دوبارہ درج کریں" },
    signUpButton: { Eng: "Sign Up", Urdu: "سائن اپ" },
    haveAccount: { Eng: "Already have an account?", Urdu: "پہلے سے اکاؤنٹ ہے؟" },
    loginHere: { Eng: "Login here", Urdu: "یہاں لاگ ان کریں" },
  },

  // Forgot Password
  forgotPassword: {
    title: { Eng: "National Police Hospital", Urdu: "نیشنل پولیس ہسپتال" },
    heading: { Eng: "Reset Your Password", Urdu: "اپنا پاس ورڈ دوبارہ ترتیب دیں" },
    description: { Eng: "Enter your email address and we'll send you instructions to reset your password.", Urdu: "اپنا ای میل ایڈریس درج کریں اور ہم آپ کو پاس ورڈ دوبارہ ترتیب دینے کی ہدایات بھیجیں گے۔" },
    email: { Eng: "E-mail", Urdu: "ای میل" },
    emailPlaceholder: { Eng: "your@email.com", Urdu: "آپ_کی@ای_میل.کام" },
    sendButton: { Eng: "Send Reset Link", Urdu: "ری سیٹ لنک بھیجیں" },
    backToLogin: { Eng: "Back to Login", Urdu: "لاگ ان پر واپس جائیں" },
  },

  // MyProfile
  myProfile: {
    menu: {
      profile: { Eng: "My Profile", Urdu: "میری پروفائل" },
      settings: { Eng: "Settings", Urdu: "ترتیبات" },
      logout: { Eng: "Log Out", Urdu: "لاگ آؤٹ" },
    },
    profile: {
      title: { Eng: "Profile Information", Urdu: "پروفائل کی معلومات" },
      fullName: { Eng: "Full Name", Urdu: "پورا نام" },
      email: { Eng: "Email", Urdu: "ای میل" },
      phone: { Eng: "Phone", Urdu: "فون" },
      address: { Eng: "Address", Urdu: "پتہ" },
      gender: { Eng: "Gender", Urdu: "جنس" },
      male: { Eng: "Male", Urdu: "مرد" },
      female: { Eng: "Female", Urdu: "عورت" },
      dob: { Eng: "Date of Birth", Urdu: "تاریخ پیدائش" },
      saveButton: { Eng: "Save Changes", Urdu: "تبدیلیاں محفوظ کریں" },
    },
    settings: {
      title: { Eng: "Settings", Urdu: "ترتیبات" },
      theme: { Eng: "Theme", Urdu: "تھیم" },
      light: { Eng: "Light", Urdu: "روشنی" },
      dark: { Eng: "Dark", Urdu: "تاریک" },
      language: { Eng: "Language", Urdu: "زبان" },
      english: { Eng: "English", Urdu: "انگریزی" },
      urdu: { Eng: "اردو", Urdu: "اردو" },
    },
  },

  // About Page
  about: {
    hero: {
      title: { Eng: "About", Urdu: "ہمارے" },
      titleHighlight: { Eng: "Our Hospital", Urdu: "بارے میں" },
      subtitle: { Eng: "Committed to providing world-class healthcare services with compassion and excellence", Urdu: "ہمدردی اور بہترین خدمات کے ساتھ عالمی معیار کی صحت کی دیکھ بھال فراہم کرنے کے لیے پرعزم" },
    },
    main: {
      heading: { Eng: "Welcome to Your Trusted Healthcare Partner", Urdu: "اپنے قابل اعتماد صحت کی دیکھ بھال کے ساتھی میں خوش آمدید" },
      para1: { Eng: "At our hospital, we are dedicated to delivering exceptional healthcare services that combine cutting-edge medical technology with compassionate care. Our team of highly qualified doctors and healthcare professionals work tirelessly to ensure your well-being.", Urdu: "ہمارے ہسپتال میں، ہم غیر معمولی صحت کی دیکھ بھال کی خدمات فراہم کرنے کے لیے وقف ہیں جو جدید ترین طبی ٹیکنالوجی کو ہمدردانہ دیکھ بھال کے ساتھ ملاتی ہیں۔" },
      para2: { Eng: "We believe in making quality healthcare accessible and convenient for everyone. Our state-of-the-art facilities and patient-centric approach have made us a trusted name in healthcare services across the region.", Urdu: "ہم یقین رکھتے ہیں کہ معیاری صحت کی دیکھ بھال کو سب کے لیے قابل رسائی اور آسان بنایا جائے۔ ہماری جدید ترین سہولیات اور مریض مرکوز نقطہ نظر نے ہمیں خطے میں ایک قابل اعتماد نام بنا دیا ہے۔" },
      stat1: { Eng: "Expert Doctors", Urdu: "ماہر ڈاکٹرز" },
      stat2: { Eng: "Happy Patients", Urdu: "خوش مریض" },
      stat3: { Eng: "Years Experience", Urdu: "سالوں کا تجربہ" },
    },
    mission: {
      title: { Eng: "Our Mission", Urdu: "ہمارا مشن" },
      text: { Eng: "To provide comprehensive, patient-centered healthcare services that improve the health and well-being of our community. We strive to deliver excellence in medical care through innovation, compassion, and dedication to our patients' needs.", Urdu: "جامع، مریض پر مبنی صحت کی دیکھ بھال کی خدمات فراہم کرنا جو ہماری کمیونٹی کی صحت اور بہبود کو بہتر بناتی ہیں۔" },
    },
    vision: {
      title: { Eng: "Our Vision", Urdu: "ہماری ویژن" },
      text: { Eng: "To be the leading healthcare provider recognized for clinical excellence, innovative treatments, and outstanding patient experience. We envision a healthier future where quality healthcare is accessible to all, and every patient receives personalized care.", Urdu: "طبی فضیلت، جدید علاج، اور شاندار مریض کے تجربے کے لیے تسلیم شدہ معروف صحت کی دیکھ بھال فراہم کنندہ بننا۔" },
    },
    whyChoose: {
      title: { Eng: "Why Choose Us", Urdu: "ہمیں کیوں منتخب کریں" },
    },
  },

  // Contact Page
  contact: {
    hero: {
      title: { Eng: "Get In", Urdu: "رابطہ" },
      titleHighlight: { Eng: "Touch", Urdu: "کریں" },
      subtitle: { Eng: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.", Urdu: "سوالات ہیں؟ ہم آپ سے سننا پسند کریں گے۔ ہمیں پیغام بھیجیں اور ہم جلد از جلد جواب دیں گے۔" },
    },
    info: {
      title: { Eng: "Contact Information", Urdu: "رابطے کی معلومات" },
      description: { Eng: "Fill out the form and our team will get back to you within 24 hours. For urgent medical concerns, please call our emergency line.", Urdu: "فارم پُر کریں اور ہماری ٹیم 24 گھنٹوں میں آپ سے رابطہ کرے گی۔ فوری طبی مسائل کے لیے، براہ کرم ہماری ایمرجنسی لائن پر کال کریں۔" },
      email: { Eng: "Email", Urdu: "ای میل" },
      phone: { Eng: "Phone", Urdu: "فون" },
      address: { Eng: "Address", Urdu: "پتہ" },
      workingHours: { Eng: "Working hours", Urdu: "کام کے اوقات" },
      workingHoursText: { Eng: "24/7 Emergency Services", Urdu: "24/7 ایمرجنسی خدمات" },
      connect: { Eng: "Connect With Us", Urdu: "ہم سے جڑیں" },
    },
    form: {
      title: { Eng: "Send us a Message", Urdu: "ہمیں پیغام بھیجیں" },
      name: { Eng: "Your Name", Urdu: "آپ کا نام" },
      namePlaceholder: { Eng: "John Doe", Urdu: "نام درج کریں" },
      email: { Eng: "Your Email", Urdu: "آپ کی ای میل" },
      emailPlaceholder: { Eng: "your@email.com", Urdu: "آپ_کی@ای_میل.کام" },
      subject: { Eng: "Subject", Urdu: "موضوع" },
      subjectPlaceholder: { Eng: "How can we help?", Urdu: "ہم کیسے مدد کر سکتے ہیں؟" },
      message: { Eng: "Message", Urdu: "پیغام" },
      messagePlaceholder: { Eng: "Type your message here...", Urdu: "اپنا پیغام یہاں لکھیں..." },
      sendButton: { Eng: "Send Message", Urdu: "پیغام بھیجیں" },
    },
  },

  // Doctors Page
  doctors: {
    title: { Eng: "Browse through the doctors specialist.", Urdu: "ڈاکٹروں کے ماہرین کو دیکھیں۔" },
    available: { Eng: "Available", Urdu: "دستیاب" },
  },

  // My Appointments
  appointments: {
    title: { Eng: "My Appointments", Urdu: "میری ملاقاتیں" },
    noAppointments: { Eng: "No appointments scheduled", Urdu: "کوئی ملاقات طے نہیں ہے" },
    cancel: { Eng: "Cancel appointment", Urdu: "ملاقات منسوخ کریں" },
    pay: { Eng: "Pay Online", Urdu: "آن لائن ادائیگی کریں" },
  },
};

export const LanguageProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "Eng";
  });

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("Dark mode activated");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Light mode activated");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "Eng" ? "Urdu" : "Eng"));
  };

  const setLanguageMode = (mode) => {
    setLanguage(mode);
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
  };

  const t = (path) => {
    const keys = path.split(".");
    let value = translations;
    for (const key of keys) {
      value = value[key];
      if (!value) return path;
    }
    return value[language] || path;
  };

  const value = {
    theme,
    language,
    toggleTheme,
    toggleLanguage,
    setThemeMode,
    setLanguageMode,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
