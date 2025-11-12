"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Church, Facebook, Instagram, Twitter, Youtube, ArrowLeft } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import Footer from '@/components/Footer/page';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [prayerData, setPrayerData] = useState({
        name: '',
        email: '',
        phone: '',
        prayerRequest: '',
        urgent: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [showPrayerModal, setShowPrayerModal] = useState(false);
    const [prayerSubmitStatus, setPrayerSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePrayerChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPrayerData({
            ...prayerData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim values to check for empty strings with only whitespace
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedSubject = formData.subject.trim();
        const trimmedMessage = formData.message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(''); // Clear any previous status

        try {
            await addDoc(collection(db, 'contactMessages'), {
                name: trimmedName,
                email: trimmedEmail,
                phone: formData.phone.trim() || '',
                subject: trimmedSubject,
                message: trimmedMessage,
                status: 'unread',
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            });

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            setTimeout(() => setSubmitStatus(''), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };;

    const handlePrayerSubmit = async (e) => {
        e.preventDefault();

        if (!prayerData.name || !prayerData.email || !prayerData.prayerRequest) {
            setPrayerSubmitStatus('error');
            setTimeout(() => setPrayerSubmitStatus(''), 5000);
            return;
        }

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'prayerRequests'), {
                name: prayerData.name,
                email: prayerData.email,
                phone: prayerData.phone || '',
                prayerRequest: prayerData.prayerRequest,
                urgent: prayerData.urgent,
                status: 'pending',
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            });

            setIsSubmitting(false);
            setPrayerSubmitStatus('success');
            setPrayerData({ name: '', email: '', phone: '', prayerRequest: '', urgent: false });

            setTimeout(() => {
                setPrayerSubmitStatus('');
                setShowPrayerModal(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting prayer request:', error);
            setIsSubmitting(false);
            setPrayerSubmitStatus('error');
            setTimeout(() => setPrayerSubmitStatus(''), 5000);
        }
    };

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

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            info: 'Gbazango, Kubwa, Abuja',
            subInfo: 'Federal Capital Territory, Nigeria',
            color: 'blue'
        },
        {
            icon: Phone,
            title: 'Call Us',
            info: '+234 XXX XXX XXXX',
            subInfo: 'Mon - Fri: 9AM - 5PM',
            color: 'green'
        },
        {
            icon: Mail,
            title: 'Email Us',
            info: 'info@aggbazango.org',
            subInfo: 'We reply within 24 hours',
            color: 'purple'
        },
        {
            icon: Clock,
            title: 'Service Times',
            info: 'Sunday: 8:00 AM & 10:00 AM',
            subInfo: 'Wednesday: 5:30 PM',
            color: 'amber'
        }
    ];

    const socialLinks = [
        { icon: Facebook, url: '#', label: 'Facebook' },
        { icon: Instagram, url: '#', label: 'Instagram' },
        { icon: Twitter, url: '#', label: 'Twitter' },
        { icon: Youtube, url: '#', label: 'Youtube' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </a>
                        <div className="flex items-center gap-3">
                            <img
                                src="/AG.jpeg"
                                alt="AG Church"
                                className="w-10 h-10"
                            />                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                                <p className="text-xs text-amber-600">Gbazango District</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-amber-900/90 to-amber-800/70" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
                            We'd Love to Hear From You
                        </p>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                            Whether you have questions, need prayer, need to contact a leader or want to learn more about our church family,
                            we're here for you. Reach out and let's connect!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Find us, call us, or send us a message
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {contactInfo.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                        className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-amber-300 transition-all"
                                    >
                                        <div className={`w-16 h-16 bg-linear-to-br from-${item.color}-400 to-${item.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-800 font-medium mb-1">{item.info}</p>
                                        <p className="text-gray-600 text-sm">{item.subInfo}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-12"
                    >
                        {/* Contact Form */}
                        <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-xl border-2 border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                                            placeholder="+234 XXX XXX XXXX"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none transition-colors resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                                        ✅ Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                                        ❌ Please check all required fields and try again.
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Map & Social */}
                        <motion.div variants={fadeInUp} className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 h-96">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9876543210!2d7.3569!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMzUuNCJOIDfCsDIxJzI0LjgiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="AG Gbazango Location"
                                ></iframe>
                            </div>

                            <div className="bg-linear-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-xl border-2 border-amber-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {socialLinks.map((social, index) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg flex items-center gap-3 transition-all transform hover:scale-105 border-2 border-amber-100 hover:border-amber-300"
                                            >
                                                <IconComponent className="w-6 h-6 text-amber-600" />
                                                <span className="text-gray-900 font-semibold">{social.label}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Prayer Request CTA */}
            <section className="py-20 bg-linear-to-r from-amber-600 to-amber-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Need Prayer?
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-amber-100 mb-8">
                            Our prayer team is here for you. Submit your prayer request and we'll lift you up.
                        </motion.p>
                        <motion.button
                            variants={fadeInUp}
                            onClick={() => setShowPrayerModal(true)}
                            className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition shadow-xl"
                        >
                            Submit Prayer Request
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Prayer Modal */}
            {showPrayerModal && (
                <div className="fixed inset-0  bg-linear-to-r from-amber-600 to-amber-700 bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Prayer Request</h2>
                                <button
                                    onClick={() => setShowPrayerModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={prayerData.name}
                                        onChange={handlePrayerChange}
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={prayerData.email}
                                            onChange={handlePrayerChange}
                                            className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={prayerData.phone}
                                            onChange={handlePrayerChange}
                                            className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none"
                                            placeholder="+234..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Prayer Request *</label>
                                    <textarea
                                        name="prayerRequest"
                                        value={prayerData.prayerRequest}
                                        onChange={handlePrayerChange}
                                        rows="6"
                                        className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none resize-none"
                                        placeholder="Share your prayer request..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="urgent"
                                        checked={prayerData.urgent}
                                        onChange={handlePrayerChange}
                                        className="w-5 h-5 text-amber-600 border-gray-300 rounded"
                                    />
                                    <label className="ml-3 text-gray-700 font-medium">
                                        This is an urgent prayer request
                                    </label>
                                </div>

                                {prayerSubmitStatus === 'success' && (
                                    <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                                        ✅ Your prayer request has been received. We're praying for you!
                                    </div>
                                )}

                                {prayerSubmitStatus === 'error' && (
                                    <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                                        Please fill in all required fields.
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        onClick={handlePrayerSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                                    </button>
                                    <button
                                        onClick={() => setShowPrayerModal(false)}
                                        className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Church className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-sm mb-2">&copy; 2025 Assemblies of God Church - Gbazango District. All rights reserved.</p>
                    <p className="text-amber-400 font-semibold">A Community of Faith, Hope, and Love</p>
                </div>
            </footer>
            <Footer />
        </div>
    );
}