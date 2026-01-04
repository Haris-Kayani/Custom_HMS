import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconAt,
  IconMapPin,
  IconPhone,
  IconSun,
} from "@tabler/icons-react";

/* -------------------- Contact Icons -------------------- */

function ContactIcon({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg flex-shrink-0">
        <Icon size={24} className="text-blue-500" />
      </div>
      <div>
        <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <p className="text-white font-medium">{description}</p>
      </div>
    </div>
  );
}

const CONTACT_DATA = [
  { title: "Email", description: "hello@hospital.com", icon: IconAt },
  { title: "Phone", description: "+1 (800) 123 4567", icon: IconPhone },
  { title: "Address", description: "123 Healthcare Avenue, Medical District", icon: IconMapPin },
  { title: "Working hours", description: "24/7 Emergency Services", icon: IconSun },
];

function ContactIconsList() {
  return (
    <div className="flex flex-col gap-4">
      {CONTACT_DATA.map((item, index) => (
        <ContactIcon key={index} {...item} />
      ))}
    </div>
  );
}

/* -------------------- Main Component -------------------- */

const socialIcons = [
  { Icon: IconBrandTwitter, label: "Twitter", color: "hover:bg-blue-400" },
  { Icon: IconBrandYoutube, label: "YouTube", color: "hover:bg-red-500" },
  { Icon: IconBrandInstagram, label: "Instagram", color: "hover:bg-pink-500" },
];

export default function Contact() {
  return (
    <div className="py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Get In <span className="text-blue-500">Touch</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Contact Info */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">
                Contact Information
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours. For urgent medical concerns, please call our emergency line.
              </p>
            </div>

            <ContactIconsList />

            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white font-semibold mb-4">Connect With Us</p>
              <div className="flex gap-3">
                {socialIcons.map(({ Icon, label, color }, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white transition-all duration-300 transform hover:scale-110 ${color} shadow-lg`}
                    aria-label={label}
                  >
                    <Icon size={22} stroke={1.5} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                Send Message
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-6">
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Emergency Line Card */}
        <button
          onClick={() => {
            const phoneNumber = "18001234567"; // Emergency number without formatting
            window.open(`https://wa.me/${phoneNumber}`, "_blank");
          }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconPhone size={28} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Emergency Line</h3>
          <p className="text-blue-600 font-semibold text-lg">+92 3335527201</p>
          <p className="text-gray-600 text-sm mt-1">Open in WhatsApp</p>
        </button>

        {/* Email Support Card */}
        <button
          onClick={() => {
            window.location.href = "mailto:support@hospital.com";
          }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-500"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconAt size={28} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Email Support</h3>
          <p className="text-green-600 font-semibold">support@hospital.com</p>
          <p className="text-gray-600 text-sm mt-1">Send us an email</p>
        </button>

        {/* Visit Us Card */}
        <button
          onClick={() => {
            // Google Maps URL with plus code coordinates
            const mapsUrl = "https://www.google.com/maps/place/National+Police+Hospital/@33.6483307,73.0101193,17z/data=!3m1!4b1!4m6!3m5!1s0x38df9500705334a1:0x8837adbfab7bdd29!8m2!3d33.6483263!4d73.0149902!16s%2Fg%2F11vdwx801f?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";
            window.open(mapsUrl, "_blank");
          }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500"
        >
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconMapPin size={28} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Visit Us</h3>
          <p className="text-purple-600 font-semibold">Islamabad, Pakistan</p>
          <p className="text-gray-600 text-sm mt-1">View on Google Maps</p>
        </button>
      </div>
    </div>
  );
}
