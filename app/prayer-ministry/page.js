"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Church, Clock, Users, Heart, ChevronRight, ArrowRight, CheckCircle, Calendar, BookOpen, Flame, Shield, Globe, HandHeart,ArrowLeft, Cross } from 'lucide-react';
import Link from 'next/link';

export default function PrayerMinistry() {
    const [activeTab, setActiveTab] = useState('overview');

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const prayerPrograms = [
        {
            title: 'Early Morning Prayer',
            time: 'Monday - Saturday, 5:00 AM - 6:00 AM',
            icon: Clock,
            description: 'Start your day with powerful intercession and worship',
            color: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Prayer Chain Network',
            time: '24/7 Prayer Coverage',
            icon: Globe,
            description: 'Join our network of intercessors praying around the clock',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Wednesday Night Vigil',
            time: 'Every Wednesday, 11:00 PM - 2:00 AM',
            icon: Flame,
            description: 'Midnight prayers for breakthrough and deliverance',
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Fasting & Prayer',
            time: 'First Friday of Every Month',
            icon: BookOpen,
            description: 'Corporate fasting for spiritual breakthrough',
            color: 'from-teal-500 to-teal-600'
        },
        {
            title: 'Healing & Deliverance',
            time: 'Last Sunday, After Service',
            icon: Cross,
            description: 'Special prayers for healing and freedom',
            color: 'from-red-500 to-red-600'
        },
        {
            title: 'Prayer Warrior Training',
            time: 'Monthly - 2nd Saturday, 10:00 AM',
            icon: Shield,
            description: 'Equipping believers in spiritual warfare',
            color: 'from-indigo-500 to-indigo-600'
        }
    ];

    const prayerRequests = [
        'Church Growth & Revival',
        'Nation & Government Leaders',
        'Families & Marriages',
        'Youth & Children',
        'Sick & Hurting',
        'Financial Breakthroughs',
        'Salvation of Souls',
        'Protection & Safety'
    ];

    const testimonials = [
        {
            name: 'John Doe',
            role: 'Church Member',
            story: 'Through the Prayer Ministry, I received prayer for healing and God miraculously healed my broken leg. My family now attends every prayer session!'
        },
        {
            name: 'Mary Johnson',
            role: 'Prayer Warrior',
            story: 'I was delivered from depression through the Wednesday Night Vigil prayers. Now I lead the prayer chain network and help others find hope in Jesus.'
        },
        {
            name: 'Samuel Obi',
            role: 'Community Member',
            story: 'The hospital visitation team came to see me during my darkest hour. Their prayers and encouragement reminded me that God cares. I gave my life to Christ!'
        }
    ];

    return (
        <>
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
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                                    <p className="text-xs text-amber-600">Gbazango District</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
        <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 4 + 2,
                                height: Math.random() * 4 + 2,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center space-y-6"
                    >
                        <motion.div variants={scaleIn} className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                            <Church className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Prayer Ministry
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            "The effectual fervent prayer of a righteous man availeth much" - James 5:16
                        </motion.p>
                        <motion.div variants={fadeInUp} className="pt-4">
                            <Link href="/departments">
                                <button className="text-white/80 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                    <ChevronRight className="w-5 h-5 rotate-180" />
                                    Back to All Ministries
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <div className="inline-block">
                                <span className="text-teal-600 font-bold text-sm tracking-wider uppercase">The Powerhouse of the Church</span>
                                <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-600 mt-2" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Where Heaven Meets Earth
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                The Prayer Ministry is the spiritual heartbeat of Assemblies of God Church Gbazango. We are a dedicated team of intercessors who believe in the power of prayer to transform lives, heal the sick, deliver the oppressed, and bring revival to our community.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Led by Elder Margaret Eze, our ministry operates 24/7, covering our church, families, nation, and the world in prayer. We stand in the gap, believing God for miracles, breakthroughs, and supernatural interventions.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-teal-50 px-6 py-4 rounded-xl">
                                    <Users className="w-8 h-8 text-teal-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">150+</p>
                                        <p className="text-sm text-gray-600">Prayer Warriors</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-teal-50 px-6 py-4 rounded-xl">
                                    <Clock className="w-8 h-8 text-teal-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">24/7</p>
                                        <p className="text-sm text-gray-600">Prayer Coverage</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={scaleIn} className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                                    alt="Prayer Ministry"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <p className="text-2xl font-bold mb-2">Elder Margaret Eze</p>
                                    <p className="text-teal-200">Prayer Ministry Leader</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Prayer Programs */}
            <section className="py-24 bg-gradient-to-b from-teal-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-teal-600 font-bold text-sm tracking-wider uppercase">Our Prayer Schedule</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Join Us in Prayer
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Multiple opportunities to connect with God and intercede for others
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {prayerPrograms.map((program, index) => {
                                const IconComponent = program.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.2)" }}
                                        className="bg-white p-8 rounded-2xl shadow-lg border-2 border-teal-100 hover:border-teal-300 transition-all"
                                    >
                                        <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                                        <div className="bg-white rounded-lg p-3 border border-red-200">
                                            <p className="text-sm font-semibold text-red-600">{program.impact}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Schedule Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Monthly Outreach Schedule
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Join us in making a difference every month
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-200 shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                                        <Calendar className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Weekly Activities</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">Every Saturday, 8:00 AM</p>
                                            <p className="text-gray-600">Street Evangelism & Distribution</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">Every Sunday, 2:00 PM</p>
                                            <p className="text-gray-600">Hospital Visitation Teams</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">Every Wednesday, 10:00 AM</p>
                                            <p className="text-gray-600">Prison Ministry Visits</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-200 shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                                        <Clock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Special Events</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">First Saturday</p>
                                            <p className="text-gray-600">Food Bank Distribution Day</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">Quarterly</p>
                                            <p className="text-gray-600">Free Medical Outreach</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-gray-900">Last Saturday</p>
                                            <p className="text-gray-600">Skills Training Sessions</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gradient-to-b from-red-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Lives Transformed</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Stories of Hope
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Real people, real impact, real transformation
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-300 transition-all"
                                >
                                    <div className="mb-6">
                                        <div className="text-red-600 text-5xl mb-4">"</div>
                                        <p className="text-gray-700 italic leading-relaxed">
                                            {testimonial.story}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-red-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Ways to Help */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Ways You Can Help
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Everyone can make a difference - find your way to serve
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-200 shadow-lg text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Volunteer Your Time</h3>
                                <p className="text-gray-600 mb-6">Join our outreach teams and serve directly in the community</p>
                                <Link href="/contact">
                                    <button className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all">
                                        Sign Up to Volunteer
                                    </button>
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200 shadow-lg text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Donate Resources</h3>
                                <p className="text-gray-600 mb-6">Contribute food, clothing, medical supplies, or financial support</p>
                                <Link href="/give-online">
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                                        Make a Donation
                                    </button>
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-200 shadow-lg text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Globe className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Spread the Word</h3>
                                <p className="text-gray-600 mb-6">Share our mission and help us reach more people in need</p>
                                <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition-all">
                                    Share Our Story
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-gradient-to-r from-red-900 via-red-800 to-red-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 3 + 1,
                                height: Math.random() * 3 + 1,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 2 + 1,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={scaleIn} className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                            <HandHeart className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Be the Change You Want to See
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-red-100 mb-8 leading-relaxed"
                        >
                            Join our community outreach team and experience the joy of serving others in Jesus' name
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-red-900 mx-auto px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Join Our Team
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link href="/departments">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-red-900 transition-all"
                                >
                                    Explore Other Ministries
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
        </>
    );
};