"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Mail, Users, ChevronRight, 
  ArrowLeft, CheckCircle, MessageCircle, Navigation, Gift
} from 'lucide-react';

const JoinUsThisSunday = () => {
  const [selectedService, setSelectedService] = useState('11am');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendees: '1',
    service: '11:00 AM',
    firstTime: 'yes',
    childcare: 'no',
    prayer: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for registering! We can\'t wait to see you this Sunday!');
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
              <ArrowLeft className="w-5 h-5" />
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Join Us This Sunday!
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 mb-2">
            We can't wait to worship with you
          </motion.p>
          <motion.p variants={fadeInUp} className="text-lg text-amber-600 font-semibold">
            Sunday, November 10, 2025
          </motion.p>
        </motion.div>

        {/* Service Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Service Time</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { 
                time: '9:00 AM', 
                id: '9am',
                label: 'Early Morning Service', 
                attendees: '~300 people', 
                vibe: 'Traditional & Reflective',
                description: 'Perfect for early risers who love hymns and a contemplative atmosphere'
              },
              { 
                time: '11:00 AM',
                id: '11am', 
                label: 'Main Service', 
                attendees: '~600 people', 
                vibe: 'Contemporary & Energetic',
                description: 'Modern worship with a full band and dynamic atmosphere'
              }
            ].map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedService(service.id);
                  setFormData({...formData, service: service.time});
                }}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
                  selectedService === service.id
                    ? 'border-amber-500 bg-amber-50 shadow-lg'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-600" />
                    <span className="text-2xl font-bold text-gray-900">{service.time}</span>
                  </div>
                  {selectedService === service.id && (
                    <CheckCircle className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <p className="font-semibold text-gray-900 mb-2">{service.label}</p>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {service.attendees}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-amber-600">♪</span>
                    {service.vibe}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Yourself</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="+234 803 456 7890"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Number of Attendees</label>
                <select
                  value={formData.attendees}
                  onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Is this your first time?</label>
                <select
                  value={formData.firstTime}
                  onChange={(e) => setFormData({...formData, firstTime: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                >
                  <option value="yes">Yes, first time!</option>
                  <option value="no">No, I've been before</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Need Childcare?</label>
                <select
                  value={formData.childcare}
                  onChange={(e) => setFormData({...formData, childcare: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                >
                  <option value="no">No, thanks</option>
                  <option value="yes">Yes, please</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Prayer Requests (Optional)</label>
              <textarea
                value={formData.prayer}
                onChange={(e) => setFormData({...formData, prayer: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors resize-none"
                placeholder="Is there anything we can pray about for you?"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              Confirm My Visit for {formData.service}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              { icon: Mail, text: "You'll receive a confirmation email with all the details within minutes" },
              { icon: MessageCircle, text: "Our welcome team will reach out to answer any questions you may have" },
              { icon: Navigation, text: "We'll send you directions, parking info, and arrival tips" },
              { icon: Gift, text: "Expect a warm welcome and a special first-time visitor gift when you arrive!" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-lg pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <p className="font-bold text-gray-900 mb-1">Location</p>
            <p className="text-sm text-gray-600">123 Faith Avenue<br/>Wuse 2, Abuja</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <p className="font-bold text-gray-900 mb-1">Duration</p>
            <p className="text-sm text-gray-600">Service lasts<br/>approximately 90 minutes</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <p className="font-bold text-gray-900 mb-1">Dress Code</p>
            <p className="text-sm text-gray-600">Come as you are!<br/>Casual is perfectly fine</p>
          </div>
        </motion.div>

        {/* Need More Info Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 mb-3">Want to learn more before registering?</p>
          <a
            href="/AG/visitors"
            className="text-amber-600 font-semibold hover:text-amber-700 inline-flex items-center gap-2 transition-colors"
          >
            Plan Your Visit
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinUsThisSunday;