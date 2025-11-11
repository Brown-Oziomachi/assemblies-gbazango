"use client";
import { motion } from 'framer-motion';
import { Users, Award, Heart, ChevronRight, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeadershipPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Deacon Board Members
    const deacons = [
        {
            name: "Deacon John Smith",
            position: "Chairman, Deacon Board",
            profession: "Civil Engineer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        {
            name: "Deaconess Mary Johnson",
            position: "Vice Chairman",
            profession: "Secondary School Teacher",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        {
            name: "Deacon David Okafor",
            position: "Secretary",
            profession: "Accountant",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        {
            name: "Deaconess Grace Adeyemi",
            position: "Treasurer",
            profession: "Banker",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
        },
        {
            name: "Deacon Peter Eze",
            position: "Welfare Officer",
            profession: "Medical Doctor",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
        },
        {
            name: "Deaconess Ruth Bello",
            position: "Women's Ministry Leader",
            profession: "Nurse",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
        },
        {
            name: "Deacon Samuel Okoro",
            position: "Youth Coordinator",
            profession: "IT Consultant",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
        },
        {
            name: "Deaconess Faith Musa",
            position: "Children's Ministry Leader",
            profession: "Primary School Teacher",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Back to Home Button */}
            <Link href="/">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/20 transition-all group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to Home</span>
                </motion.button>
            </Link>

            {/* Hero Section */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative h-[50vh] flex items-center justify-center overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <motion.div
                        variants={fadeInUp}
                        className="inline-block mb-4 px-6 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30"
                    >
                        <span className="text-amber-400 font-semibold">Our Leadership</span>
                    </motion.div>
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Deacon Board
                    </motion.h1>
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Serving with dedication, leading with love, and guiding our congregation with wisdom
                    </motion.p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </motion.div>

            {/* Leadership Values */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-16"
            >
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Users, title: "Servant Leadership", desc: "Leading by example and serving our community" },
                        { icon: Heart, title: "Compassionate Care", desc: "Caring for every member with love and dedication" },
                        { icon: Award, title: "Spiritual Excellence", desc: "Committed to spiritual growth and biblical truth" }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all group"
                        >
                            <value.icon className="w-12 h-12 text-amber-900 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-700">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Deacon Board Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 pb-20"
            >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Meet Our <span className="text-amber-400">Deacon Board</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Dedicated leaders serving our church community with faith and integrity
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {deacons.map((deacon, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="group relative"
                        >
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src={deacon.image} 
                                        alt={deacon.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Info Container */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                        {deacon.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-amber-400 mb-3">
                                        <Award className="w-4 h-4" />
                                        <p className="font-semibold text-sm">{deacon.position}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <ChevronRight className="w-4 h-4" />
                                        <p className="text-sm">{deacon.profession}</p>
                                    </div>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-4xl mx-auto px-4 pb-20 text-center"
            >
                <div className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 backdrop-blur-sm p-12 rounded-3xl border border-amber-500/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Need Guidance or Counseling?
                    </h2>
                    <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                        Our deacon board members are here to support you. Feel free to reach out to any leader based on their area of expertise and professional background.
                    </p>
                    <div className="text-gray-700 text-base mb-6 max-w-2xl mx-auto">
                        Whether you need spiritual guidance, professional advice, or personal counseling, our leaders are available to serve you with love and dedication.
                    </div>
                    <button className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all">
                      <Link href="/contact">Contact a Leader</Link>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}