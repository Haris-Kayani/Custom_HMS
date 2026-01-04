import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-blue-500">Our Hospital</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
          Committed to providing world-class healthcare services with compassion and excellence
        </p>
      </div>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20 px-4">
        <div className="flex-1 flex justify-center">
          <img
            src={assets.about_image}
            alt="About Hospital"
            className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to Your Trusted Healthcare Partner
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At our hospital, we are dedicated to delivering exceptional healthcare services 
            that combine cutting-edge medical technology with compassionate care. Our team 
            of highly qualified doctors and healthcare professionals work tirelessly to 
            ensure your well-being.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe in making quality healthcare accessible and convenient for everyone. 
            Our state-of-the-art facilities and patient-centric approach have made us a 
            trusted name in healthcare services across the region.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-500">500+</p>
              <p className="text-gray-600 text-sm">Expert Doctors</p>
            </div>
            <div className="text-center border-l-2 border-gray-200 pl-4">
              <p className="text-4xl font-bold text-blue-500">50K+</p>
              <p className="text-gray-600 text-sm">Happy Patients</p>
            </div>
            <div className="text-center border-l-2 border-gray-200 pl-4">
              <p className="text-4xl font-bold text-blue-500">25+</p>
              <p className="text-gray-600 text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-20 mx-4">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide comprehensive, patient-centered healthcare services that improve 
              the health and well-being of our community. We strive to deliver excellence 
              in medical care through innovation, compassion, and dedication to our patients' 
              needs.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading healthcare provider recognized for clinical excellence, 
              innovative treatments, and outstanding patient experience. We envision a 
              healthier future where quality healthcare is accessible to all, and every 
              patient receives personalized care.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-20 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Medical Team</h3>
            <p className="text-gray-600 leading-relaxed">
              Our highly qualified and experienced doctors specialize in various fields, 
              ensuring you receive the best medical care possible.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Availability</h3>
            <p className="text-gray-600 leading-relaxed">
              Round-the-clock emergency services and support ensure that help is always 
              available when you need it most.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Advanced Technology</h3>
            <p className="text-gray-600 leading-relaxed">
              Equipped with state-of-the-art medical equipment and cutting-edge technology 
              for accurate diagnosis and effective treatment.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Patient-Centric Care</h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize your comfort and well-being, providing personalized care plans 
              tailored to your specific health needs.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Affordable Pricing</h3>
            <p className="text-gray-600 leading-relaxed">
              Quality healthcare doesn't have to be expensive. We offer competitive pricing 
              and various payment options to make care accessible.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Convenient Location</h3>
            <p className="text-gray-600 leading-relaxed">
              Strategically located with easy access and ample parking facilities, making 
              your visit hassle-free and comfortable.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-500 rounded-2xl p-12 text-center mx-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Book your appointment today and experience healthcare excellence with our dedicated team of professionals
        </p>
        <button
          onClick={() => window.location.href = '/doctors'}
          className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Book Appointment Now
        </button>
      </div>
    </div>
  );
};

export default About;