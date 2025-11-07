"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaUsers, FaHeart, FaHome, FaBook,
  FaArrowLeft, FaChevronRight, FaCoffee, FaParking, FaBaby, FaWheelchair,
  FaMusic, FaTshirt, FaShieldAlt, FaStar, FaCompass, FaInfoCircle
} from 'react-icons/fa';

const PlanYourVisit = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a
              href="/AG"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
              Back to Home
            </a>
            <div className="flex items-center gap-3">
              <img
                src="/AG.jpeg"
                alt="AG Church"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                <p className="text-xs text-amber-600">Gbazango District</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <FaMapMarkerAlt className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Plan Your Visit
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to make your first visit comfortable and welcoming
          </motion.p>
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Arrival',
                icon: FaHome,
                desc: 'Arrive 15-20 minutes early. Our parking team will guide you to a spot, and friendly greeters will welcome you at the door with a smile.'
              },
              {
                step: '2',
                title: 'Check-In',
                icon: FaUsers,
                desc: 'Visit our welcome desk in the lobby for a visitor packet with church info, a small gift, and answers to any questions you may have.'
              },
              {
                step: '3',
                title: 'Worship Experience',
                icon: FaHeart,
                desc: 'Enjoy uplifting worship music, a powerful biblical message, and genuine community. Our services last about 90 minutes.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-amber-600 text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Location & Parking */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Location & Parking</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Church Address</p>
                <p className="text-gray-600 text-lg">123 Faith Avenue<br/>Wuse 2, Abuja, Nigeria</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FaParking className="w-5 h-5 text-amber-600" />
                  Free Parking Available
                </p>
                <p className="text-gray-600">Ample parking spaces available. Our parking team will assist you in finding a convenient spot close to the entrance.</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FaCompass className="w-5 h-5 text-amber-600" />
                  Getting Here
                </p>
                <p className="text-gray-600 mb-3">We're easily accessible from major roads in Abuja. Look for the white building with the cross.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FaCompass className="w-5 h-5" />
                Get Directions
              </motion.button>
            </div>
          </motion.div>

          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Service Times</h2>
            </div>
            <div className="space-y-4">
              {[
                { 
                  day: 'Sunday Morning', 
                  times: ['9:00 AM - Traditional Service', '11:00 AM - Contemporary Service'], 
                  highlight: true,
                  desc: 'Our main worship gatherings'
                },
                { 
                  day: 'Tuesday Bible Study', 
                  times: ['7:00 PM'], 
                  highlight: false,
                  desc: 'Mid-week biblical teaching'
                },
                { 
                  day: 'Thursday Youth Service', 
                  times: ['7:00 PM'], 
                  highlight: false,
                  desc: 'For teens and young adults'
                }
              ].map((service, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl transition-all ${
                    service.highlight 
                      ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300' 
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <p className="font-bold text-gray-900 text-lg mb-2">{service.day}</p>
                  {service.times.map((time, j) => (
                    <p key={j} className="text-amber-700 font-semibold mb-1">{time}</p>
                  ))}
                  <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Amenities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Amenities & Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: FaBaby, 
                title: 'Nursery Care', 
                desc: 'Professional, loving childcare for infants to 3 years old', 
                color: 'pink' 
              },
              { 
                icon: FaBook, 
                title: 'Children\'s Church', 
                desc: 'Age-appropriate programs and activities for kids 4-12 years', 
                color: 'blue' 
              },
              { 
                icon: FaWheelchair, 
                title: 'Fully Accessible', 
                desc: 'Wheelchair accessible entrances, restrooms, and seating areas', 
                color: 'green' 
              },
              { 
                icon: FaCoffee, 
                title: 'Refreshments', 
                desc: 'Free coffee, tea, and snacks available in our café after service', 
                color: 'amber' 
              },
              { 
                icon: FaTshirt, 
                title: 'Casual Dress', 
                desc: 'Come as you are! No dress code - just bring yourself', 
                color: 'purple' 
              },
              { 
                icon: FaShieldAlt, 
                title: 'Safe Environment', 
                desc: 'Professional security team and comprehensive safety protocols', 
                color: 'red' 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="flex items-start gap-4 p-5 rounded-xl hover:bg-amber-50 transition-all border-2 border-gray-100"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What should I wear?',
                a: 'Come as you are! Our congregation dresses in everything from casual jeans to formal attire. What matters most is your heart to worship, not your wardrobe. You\'ll feel comfortable however you dress.'
              },
              {
                q: 'How long is the service?',
                a: 'Our services typically last about 90 minutes, including 25-30 minutes of worship music, announcements, and a 35-40 minute message. We respect your time and aim to finish on schedule.'
              },
              {
                q: 'Is there parking available?',
                a: 'Yes! We have a large, free parking lot with plenty of spaces. Our trained parking team will be there to help you find a spot close to the entrance, especially if you have mobility concerns or small children.'
              },
              {
                q: 'What about my kids?',
                a: 'We love kids! We offer age-appropriate programs for all children: nursery care (0-3 years), children\'s church (4-12 years), and youth ministry (13-18 years). All volunteers are background-checked and trained. Kids are also always welcome in the main service.'
              },
              {
                q: 'Will I be asked to give money?',
                a: 'We do take an offering during the service as part of worship for our members, but you\'re not expected or obligated to give as a first-time visitor. Giving is a personal act of worship for those who call this church home.'
              },
              {
                q: 'What if I need prayer or have questions?',
                a: 'We have a prayer team available after every service who would love to pray with you. You can also visit our welcome desk with any questions, or submit prayer requests online through our website anytime.'
              },
              {
                q: 'Can I bring my Bible?',
                a: 'Absolutely! We encourage it. But don\'t worry if you don\'t have one - the scripture references are displayed on the screens during the message, and Bibles are available at the welcome desk.'
              },
              {
                q: 'What\'s the music style like?',
                a: 'Our 9 AM service features traditional hymns with piano and organ. Our 11 AM service is contemporary with a full band, guitars, drums, and modern worship songs. Both are spirit-filled and uplifting!'
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <FaStar className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <FaInfoCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            We're here to help make your first visit as comfortable as possible. Reach out anytime!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <FaPhone className="w-5 h-5" />
              +234 803 456 7890
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-amber-600 transition-all flex items-center justify-center gap-2"
            >
              <FaEnvelope className="w-5 h-5" />
              info@agchurchng.org
            </motion.button>
          </div>
          <p className="text-amber-100 text-sm">Available Monday - Friday, 9 AM - 5 PM</p>
        </motion.div>

        {/* CTA to Register */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-700 mb-6 text-xl font-semibold">Ready to experience it for yourself?</p>
          <motion.a
            href="/AG/join-us"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Register for This Sunday
            <FaChevronRight className="w-5 h-5" />
          </motion.a>
          <p className="text-gray-500 mt-4 text-sm">No obligation - just letting us know you're coming!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanYourVisit;