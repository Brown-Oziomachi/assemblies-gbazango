"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Church, ArrowLeft, Mail, Phone, Heart, BookOpen, Users, Award,ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MinistersPage() {
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

    const ministers = [
        {
            name: 'Rev. Sunday Asuata',
            title: 'Senior Pastor',
            image: 'pst Asuata.jpg',
            email: 'pastor.emmanuel@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Rev. Asuata has been serving as Senior Pastor for over 15 years, leading our congregation with wisdom, compassion, and a deep commitment to biblical teaching. He holds a Doctorate in Theology and has authored several books on Christian leadership.',
            specialties: []
        },
        {
            name: 'Pastor Grace Okafor',
            title: 'Associate Pastor & Women\'s Ministry Leader',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
            email: 'pastor.grace@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Pastor Grace Okafor is passionate about empowering women and families. With over 10 years of ministry experience, she leads our women\'s ministry and family counseling programs, bringing hope and healing to countless lives.',
            specialties: ['Women\'s Ministry', 'Family Counseling', 'Marriage Enrichment', 'Prayer Ministry']
        },
        {
            name: 'Pastor David Mensah',
            title: 'Youth & Young Adults Pastor',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            email: 'pastor.david@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Pastor David Mensah brings energy and vision to our youth and young adults ministry. His contemporary approach to ministry has helped engage the next generation in meaningful faith experiences and community service.',
            specialties: ['Youth Ministry', 'Worship Leading', 'Discipleship', 'Community Outreach']
        },
        {
            name: 'Pastor Sarah Nwosu',
            title: 'Children\'s Ministry Director',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
            email: 'pastor.sarah@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Pastor Sarah Nwosu has a heart for children and their spiritual development. She creates engaging, age-appropriate programs that help children build a strong foundation in faith while having fun and making friends.',
            specialties: ['Children\'s Ministry', 'Sunday School', 'VBS Programs', 'Family Events']
        },
        {
            name: 'Pastor Michael Eze',
            title: 'Missions & Outreach Coordinator',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            email: 'pastor.michael@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Pastor Michael Eze leads our missions and outreach efforts both locally and internationally. His passion for reaching the lost and serving the community has resulted in numerous successful mission trips and community programs.',
            specialties: ['Missions', 'Community Outreach', 'Evangelism', 'Social Services']
        },
        {
            name: 'Pastor Ruth Adebayo',
            title: 'Worship & Creative Arts Director',
            image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
            email: 'pastor.ruth@aggbazango.org',
            phone: '+234 XXX XXX XXXX',
            bio: 'Pastor Ruth Adebayo oversees all worship and creative arts ministries. Her gifting in worship leading and artistic expression has transformed our services into powerful encounters with God\'s presence.',
            specialties: ['Worship Leading', 'Music Ministry', 'Creative Arts', 'Choir Direction']
        }
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
                            <Church className="w-8 h-8 text-amber-600" />
                            <div className="hidden sm:block">
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
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200"
                        alt="Our Ministers"
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Ministers</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
                            Servant Leaders Called by God
                        </p>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                            Meet the dedicated ministers who shepherd our congregation with love, wisdom, and a passion for God's Kingdom. They are here to serve, guide, and support you on your spiritual journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Ministers Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Pastoral Team</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Each minister brings unique gifts and calling to serve our church family
                            </p>
                        </motion.div>

                        <div className="space-y-16">
                            {ministers.map((minister, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all`}
                                >
                                    {/* Image */}
                                    <div className="lg:w-1/3">
                                        <div className="h-full min-h-[400px] relative overflow-hidden">
                                            <img
                                                src={minister.image}
                                                alt={minister.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-amber-900/50 to-transparent" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:w-2/3 p-8 lg:p-12">
                                        <div className="mb-6">
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{minister.name}</h3>
                                            <p className="text-xl text-amber-600 font-semibold">{minister.title}</p>
                                        </div>

                                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                            {minister.bio}
                                        </p>

                                        {/* Specialties */}
                                        <div className="mb-6">
                                            {/* <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <Award className="w-4 h-4 text-amber-600" />
                                                MINISTRY FOCUS
                                            </h4> */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* {minister.specialties.map((specialty, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))} */}
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        <div className="flex flex-wrap gap-4">
                                            <a
                                                href={`mailto:${minister.email}`}
                                                className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                                            >
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </a>
                                            <a
                                                href={`tel:${minister.phone}`}
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                                            >
                                                <Phone className="w-4 h-4" />
                                                Call
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


                <motion.div
  variants={fadeInUp}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="text-center"
>
  <Link href="/AG/deacons" className="inline-flex items-center mb-10 gap-3 bg-amber-200 text-black font-semibold py-3 px-6 rounded-full shadow-md hover:bg-amber-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
    <span className="text-lg">Meet Our Deacon Board</span>
    <ArrowRight className="w-6 h-6" />
  </Link>
</motion.div>


            {/* Ministry Values */}
            <section className="py-20 bg-linear-to-br from-amber-600 to-amber-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center text-white"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6">
                            Our Ministry Values
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto">
                            The principles that guide our pastoral team
                        </motion.p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border-2 border-white/20">
                                <Heart className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Servant Leadership</h3>
                                <p className="text-amber-100">
                                    Following Christ's example of humble service to others
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border-2 border-white/20">
                                <BookOpen className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Biblical Truth</h3>
                                <p className="text-amber-100">
                                    Grounded in Scripture and Spirit-led wisdom
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border-2 border-white/20">
                                <Users className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Community Care</h3>
                                <p className="text-amber-100">
                                    Committed to the spiritual growth of every member
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Church className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-sm mb-2">&copy; 2025 Assemblies of God Church - Gbazango District. All rights reserved.</p>
                    <p className="text-amber-400 font-semibold">A Community of Faith, Hope, and Love</p>
                </div>
            </footer>
        </div>
    );
}