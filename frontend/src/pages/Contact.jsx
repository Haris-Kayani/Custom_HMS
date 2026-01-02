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
    <div className="flex items-center text-white">
      <div className="mr-4 bg-transparent">
        <Icon size={24} />
      </div>

      <div>
        <p className="text-blue-100 text-xs">{title}</p>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
}

const CONTACT_DATA = [
  { title: "Email", description: "hello@mantine.dev", icon: IconAt },
  { title: "Phone", description: "+49 (800) 335 35 35", icon: IconPhone },
  { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
  { title: "Working hours", description: "8 a.m. – 11 p.m.", icon: IconSun },
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

const socialIcons = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export default function Contact() {
  return (
    <div
      className="
        min-h-[400px]
        rounded-md
        p-10
        sm:p-16
        bg-gradient-to-tr
        from-blue-500
        to-blue-800
      "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[50px]">
        {/* Left Section */}
        <div>
          <h2 className="font-outfit text-black text-3xl font-medium leading-none">
            Contact us
          </h2>

          <p className="text-black-100 max-w-[300px] sm:max-w-full mt-2 mb-8">
            Leave your email and we will get back to you within 24 hours
          </p>

          <ContactIconsList />

          <div className="flex gap-4 mt-6">
            {socialIcons.map((Icon, index) => (
              <button
                key={index}
                className="
                  text-white
                  hover:text-blue-200
                  transition-colors
                "
                aria-label="social-icon"
              >
                <Icon size={22} stroke={1.5} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white rounded-md shadow-lg p-6 flex flex-col gap-4">
          <div>
            <label className="block text-black text-sm mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="
                w-full
                rounded-md
                border
                border-gray-400
                px-3
                py-2
                text-black
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block text-black text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="
                w-full
                rounded-md
                border
                border-gray-400
                px-3
                py-2
                text-black
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block text-black text-sm mb-1">
              Your message
            </label>
            <textarea
              required
              rows={4}
              placeholder="I want to order your goods"
              className="
                w-full
                rounded-md
                border
                border-gray-400
                px-3
                py-2
                text-black
                placeholder-gray-500
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div className="flex justify-end">
            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-2
                rounded-full
                transition
              "
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
