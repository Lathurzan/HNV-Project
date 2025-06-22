import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 -mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Punctual Delivery Time",
            subtitle: "99% Delivered On Time",
            image:
              "https://storage.googleapis.com/a1aa/image/2168022c-51ac-4f4c-dabb-e49db37fa762.jpg",
            overlay: "bg-yellow-400 bg-opacity-90",
            titleColor: "text-gray-800",
            textColor: "text-gray-900",
          },
          {
            title: "High Technology Factory",
            subtitle: "& Environment Friendly",
            image:
              "https://storage.googleapis.com/a1aa/image/10b75729-54f2-4f4d-6182-e96191f1ff5a.jpg",
            overlay: "bg-black bg-opacity-70",
            titleColor: "text-yellow-400",
            textColor: "text-white",
          },
          {
            title: "High Standard Labors",
            subtitle: "99% QC Passed",
            image:
              "https://storage.googleapis.com/a1aa/image/ce7931b5-7079-4372-3877-95d713d7b5cf.jpg",
            overlay: "bg-black bg-opacity-70",
            titleColor: "text-yellow-400",
            textColor: "text-white",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-56 object-cover"
              width={600}
              height={300}
            />
            <div
              className={`${feature.overlay} absolute inset-0 flex flex-col justify-center items-center text-center px-6 py-10 group-hover:bg-opacity-95 transition rounded-2xl`}
            >
              <h3 className={`${feature.titleColor} text-2xl font-bold mb-2 drop-shadow`}>
                {feature.title}
              </h3>
              <p className={`${feature.textColor} text-base font-medium`}>{feature.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-20 px-4 sm:px-8 md:px-16 lg:px-32"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-16">
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h2 className="text-gray-700 text-2xl font-bold border-b-4 border-yellow-500 pb-2 mb-2 text-center md:text-left">
              Real Hnv Story
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col space-y-8">
            <div className="flex justify-center md:justify-start space-x-8 text-gray-600 text-2xl">
              <i className="fas fa-building" />
              <i className="fas fa-broadcast-tower" />
              <i className="fas fa-battery-full" />
            </div>
            <p className="text-base leading-relaxed max-w-2xl text-gray-700 mx-auto md:mx-0 text-center md:text-left">
              HNV Building started back in [Year of Establishment] with just a
              bunch of passionate people who loved building things. Since then,
              we've grown into a strong team that's all about bringing fresh
              ideas, solid quality, and trust to every project we do.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <button className="bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                Learn More
              </button>
              <button className="border border-yellow-500 text-yellow-600 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-yellow-50 transition">
                Get A Quote
              </button>
            </div>
          </div>
        </div>
        <img
          src="https://storage.googleapis.com/a1aa/image/165a34b7-23b0-4c6d-5130-82be8574f2f7.jpg"
          alt="Light gray factory illustration"
          className="pointer-events-none select-none absolute top-0 right-0 bottom-0 opacity-10 max-w-[400px] hidden md:block"
          width={400}
          height={300}
        />
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-24"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://storage.googleapis.com/a1aa/image/2fd89a5e-537c-4dbb-eeff-7a4a829f9a36.jpg"
            alt="Testimonial background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-700/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-yellow-300 text-3xl font-bold mb-2">
              What Our Clients Say
            </h2>
            <div className="w-24 border-b-4 border-yellow-300 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                quote:
                  "HNV Building has consistently delivered exceptional quality in their construction projects. Their attention to detail and commitment to timelines is remarkable.",
                author: "Janet Joles",
                position: "Purchasing Officer",
                company: "TechCorp Industries",
                image:
                  "https://storage.googleapis.com/a1aa/image/739d10e4-3e39-4f36-c44c-48f9028bffa4.jpg",
              },
              {
                quote:
                  "Working with HNV has been a game-changer for our automotive manufacturing needs. Their precision and reliability are unmatched in the industry.",
                author: "Michael Chen",
                position: "Production Director",
                company: "AutoTech Solutions",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                quote:
                  "The team at HNV consistently demonstrates professionalism and expertise. Their innovative solutions have helped us achieve our construction goals.",
                author: "Sarah Williams",
                position: "Project Manager",
                company: "BuildPro International",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 flex flex-col items-center"
                whileHover={{ scale: 1.04 }}
              >
                <FaQuoteLeft className="text-yellow-300 text-2xl mb-4" />
                <p className="text-white text-base leading-relaxed mb-6 text-center">
                  {testimonial.quote}
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full border-2 border-yellow-300"
                  />
                  <div className="ml-4">
                    <h4 className="text-yellow-300 font-semibold text-lg">
                      {testimonial.author}
                    </h4>
                    <p className="text-white/90 text-sm">{testimonial.position}</p>
                    <p className="text-white/70 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Market Sectors Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-16"
      >
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-gray-700 text-2xl font-bold pb-2 mb-2 text-center">
            Market Sectors
          </h2>
          <div className="w-24 h-1 bg-yellow-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Home Renovation",
              desc: `Complete home transformation including walls, roofing, tiling, plumbing, and flooring.`,
              img: "https://www.letsbemates.com.au/includes/assets/img/webp/uploads/2018/05/9-Creative-home-renovation-tips-for-a-tight-budget.webp",
            },
            {
              title: "Kitchen & Bathroom",
              desc: `Modular kitchen setups, customized bathrooms, tiling, fittings, and waterproofing.`,
              img: "https://csgrenovation.ca/wp-content/uploads/2019/07/Small-kitchen.webp",
            },
            {
              title: "Interior Design",
              desc: `Custom-built shelves, wardrobes, lighting design, and aesthetic room finishing.`,
              img: "https://www.studying-in-uk.org/wp-content/uploads/2019/11/interior-design-in-United-Kingdom.jpg",
            },
            {
              title: "Landscaping & Gardening",
              desc: `Design and build outdoor spaces, garden beds, paving, and water features.`,
              img: "https://cdn.mos.cms.futurecdn.net/HSyM83jpV8YCNyzRScEaNm-1600-80.jpg.webp",
            },
            {
              title: "Outdoor Structures",
              desc: `Fencing, pergolas, decks, patios, and custom outdoor enclosures.`,
              img: "https://www.forestgarden.co.uk/wp-content/uploads/2025/02/AMALFIA_1-scaled-e1740584369585.jpg",
            },
            {
              title: "Maintenance & Repairs",
              desc: `General handyman services, painting, electrical, plumbing, and minor fix-ups.`,
              img: "https://neuroject.com/wp-content/uploads/2023/11/Building-Maintenance-Comprehensive-Guide-2023-Neuroject-01.jpg",
            },
          ].map((sector, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="group hover:shadow-2xl transition-all rounded-2xl overflow-hidden bg-white p-5 border border-gray-100 flex flex-col items-center"
            >
              <img
                src={sector.img}
                alt={sector.title}
                className="w-full h-40 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                {sector.title}
              </h4>
              <p className="text-sm text-gray-600 leading-tight text-center">{sector.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
