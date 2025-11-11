
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Church, Clock, MapPin, Users, Heart, ChevronRight, ArrowRight, CheckCircle, Calendar, Phone, Mail, BookOpen, Flame, Shield, Globe, HandHeart, Utensils, GraduationCap, Stethoscope, Home, Baby, Book, Cross } from 'lucide-react';
import Link from 'next/link';

const PrayerMinistry = () => {
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

    return (
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
                            <Link href="/ministries">
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
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                                        <div className="flex items-center gap-2 text-teal-600 font-semibold mb-4">
                                            <Clock className="w-5 h-5" />
                                            <span className="text-sm">{program.time}</span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{program.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Prayer Focus Areas */}
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
                                What We Pray For
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Our intercession covers every aspect of life and ministry
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {prayerRequests.map((request, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all"
                                >
                                    <CheckCircle className="w-8 h-8 text-teal-600 shrink-0" />
                                    <span className="font-semibold text-gray-900">{request}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 relative overflow-hidden">
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
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Need Prayer? We're Here for You
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-teal-100 mb-8 leading-relaxed"
                        >
                            Submit your prayer request and our team will stand with you in faith
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-teal-900 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Submit Prayer Request
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link href="/ministries">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-teal-900 transition-all"
                                >
                                    Join Prayer Team
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PrayerMinistry;