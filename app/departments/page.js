"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Sparkles, Zap, Baby, Music, HandHeart, Church, ChevronRight, ArrowRight, CheckCircle, Calendar, Clock, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

const MinistriesPage = () => {
    const [selectedMinistry, setSelectedMinistry] = useState(null);

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

    const ministries = [
        {
            icon: Users,
            title: 'Men\'s Fellowship',
            shortDesc: 'Building strong men of faith and leadership',
            fullDesc: 'Our Men\'s Fellowship is dedicated to developing godly men who lead their families, serve their communities, and make an impact for Christ. Through Bible studies, mentorship programs, and fellowship activities, we build brotherhood and spiritual strength.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            link: '/AG/mens-department',
            meetingTime: 'Every 2nd Saturday, 7:00 AM',
            leader: 'Elder John Okafor',
            activities: [
                'Weekly Bible Study & Prayer',
                'Monthly Brotherhood Breakfast',
                'Community Service Projects',
                'Leadership Development Training',
                'Marriage & Fatherhood Seminars'
            ],
            image: '/mens-ministry.jpg'
        },
        {
            icon: Heart,
            title: 'Women\'s Fellowship',
            shortDesc: 'Empowering women in faith and purpose',
            fullDesc: 'The Women\'s Fellowship exists to nurture, encourage, and empower women of all ages to grow in their relationship with Christ. We provide a supportive community where women can discover their God-given gifts and fulfill their divine purpose.',
            color: 'from-pink-500 to-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
            link: '/AG/womens-department',
            meetingTime: 'Every Thursday, 6:00 PM',
            leader: 'Deaconess Grace Adeyemi',
            activities: [
                'Women\'s Bible Study Groups',
                'Prayer & Intercession Meetings',
                'Skills Acquisition Programs',
                'Marriage & Family Workshops',
                'Community Outreach & Charity'
            ],
            image: '/womens-ministry.jpg'
        },
        {
            icon: Sparkles,
            title: 'Youth Ministry',
            shortDesc: 'Empowering the next generation for Christ',
            fullDesc: 'Our Youth Ministry is a dynamic community of young adults (18-35) passionate about knowing God and making Him known. We create an environment where young people can grow spiritually, build meaningful relationships, and discover their purpose in Christ.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            link: '/AG/youth-department',
            meetingTime: 'Every Friday, 6:00 PM',
            leader: 'Pastor David Oluwaseun',
            activities: [
                'Youth Church Services',
                'Campus Missions & Evangelism',
                'Leadership Training Programs',
                'Sports & Recreation Activities',
                'Career & Mentorship Sessions'
            ],
            image: '/youth-ministry.jpg'
        },
        {
            icon: Zap,
            title: 'Teens Ministry',
            shortDesc: 'Guiding teenagers in their faith journey',
            fullDesc: 'The Teens Ministry provides a safe and exciting space for teenagers (13-17) to explore their faith, ask questions, and build lasting friendships. We help teens navigate the challenges of adolescence with biblical wisdom and peer support.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            link: '/AG/teens-department',
            meetingTime: 'Every Sunday, 3:00 PM',
            leader: 'Pastor Emmanuel Chigozie',
            activities: [
                'Teen Church & Worship Sessions',
                'Bible Study & Discipleship',
                'School Holiday Programs',
                'Talent Development Workshops',
                'Sports & Games Nights'
            ],
            image: '/teens-ministry.jpg'
        },
        {
            icon: Baby,
            title: 'Children Ministry',
            shortDesc: 'Nurturing young hearts for Jesus',
            fullDesc: 'Our Children\'s Ministry creates a fun, safe, and engaging environment where children (ages 3-12) can learn about God\'s love through age-appropriate lessons, activities, and worship. We partner with parents to lay a strong spiritual foundation.',
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            link: '/AG/children-department',
            meetingTime: 'Every Sunday, 9:00 AM',
            leader: 'Sister Rebecca Nwosu',
            activities: [
                'Sunday School Classes',
                'Children\'s Church Service',
                'Bible Memory Verse Program',
                'Vacation Bible School (VBS)',
                'Kids Choir & Drama Team'
            ],
            image: '/children-ministry.jpg'
        },
        {
            icon: Music,
            title: 'Worship Team',
            shortDesc: 'Leading the congregation in praise',
            fullDesc: 'The Worship Team is committed to creating an atmosphere where God\'s presence is tangible and hearts are open to worship. Through powerful music and sincere devotion, we lead the church into experiencing the glory of God in every service.',
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
            link: '/AG/worship-team',
            meetingTime: 'Rehearsals: Tuesday & Friday, 5:00 PM',
            leader: 'Minister Johnson Praise',
            activities: [
                'Sunday Worship Services',
                'Special Events & Concerts',
                'Vocal & Instrument Training',
                'Songwriting & Recording',
                'Prayer & Worship Nights'
            ],
            image: '/worship-ministry.jpg'
        },
        {
            icon: HandHeart,
            title: 'Community Outreach',
            shortDesc: 'Serving our neighbors with love',
            fullDesc: 'Our Community Outreach Ministry demonstrates Christ\'s love through practical service to those in need. We believe faith without works is dead, so we actively engage in humanitarian efforts, evangelism, and community development projects.',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            link: '/AG/outreach',
            meetingTime: 'Every 1st Saturday, 8:00 AM',
            leader: 'Deacon Paul Okonkwo',
            activities: [
                'Food Bank & Charity Drives',
                'Prison & Hospital Visitations',
                'Free Medical Outreach',
                'Street Evangelism',
                'Skills Training for Youth'
            ],
            image: '/outreach-ministry.jpg'
        },
        {
            icon: Church,
            title: 'Prayer Ministry',
            shortDesc: 'Interceding for our church and community',
            fullDesc: 'The Prayer Ministry is the powerhouse of our church. We believe in the power of prayer to change lives, situations, and communities. Our intercessors are committed to standing in the gap for the church, our nation, and the world.',
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-200',
            link: '/prayer-ministry',
            meetingTime: 'Daily 5:00 AM & Wednesday 11:00 PM',
            leader: 'Elder Margaret Eze',
            activities: [
                'Early Morning Prayer (Mon-Sat)',
                'Prayer Chain Network',
                'Fasting & Prayer Programs',
                'Intercessory Prayer Meetings',
                'Deliverance & Healing Services'
            ],
            image: '/AG.jpeg'
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-amber-50">
            {/* Hero Section */}
            <section className="relative bg-linear-to-r from-amber-900 via-amber-800 to-amber-700 py-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(30)].map((_, i) => (
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

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        <motion.div variants={scaleIn} className="mx-auto w-24 h-24  backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                            <img
                                src="/logo.png"
                                alt="AG Church"
                                className="w-80 h-70"
                            />                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Our Ministries
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            Discover your place to serve, grow, and make a difference in the body of Christ.
                            Every member is a minister with a unique calling and purpose.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="pt-4"
                        >
                            <Link href="/">
                                <button className="text-white/80 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                    <ChevronRight className="w-5 h-5 rotate-180" />
                                    Back to Home
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Ministry Cards Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase">Get Involved</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Find Your Ministry
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Click on any ministry to learn more about how you can get involved and serve
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ministries.map((ministry, index) => {
                                const IconComponent = ministry.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        whileHover={{ scale: 1.03, y: -8 }}
                                        onClick={() => setSelectedMinistry(ministry)}
                                        className={`group relative ${ministry.bgColor} p-8 rounded-2xl shadow-lg border-2 ${ministry.borderColor} hover:shadow-2xl transition-all cursor-pointer overflow-hidden`}
                                    >
                                        {/* Background Gradient Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${ministry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                        <div className="relative z-10">
                                            <div className={`w-20 h-20 bg-gradient-to-br ${ministry.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                                <IconComponent className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{ministry.title}</h3>
                                            <p className="text-gray-700 mb-4 leading-relaxed">{ministry.shortDesc}</p>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{ministry.meetingTime}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Users className="w-4 h-4" />
                                                    <span>Led by {ministry.leader}</span>
                                                </div>
                                            </div>

                                            <span className="text-amber-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Learn More <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Modal for Ministry Details */}
            {selectedMinistry && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedMinistry(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`${selectedMinistry.bgColor} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
                    >
                        <div className={`bg-gradient-to-r ${selectedMinistry.color} p-8 text-white relative`}>
                            <button
                                onClick={() => setSelectedMinistry(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                            >
                                <span className="text-2xl">×</span>
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <selectedMinistry.icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-bold">{selectedMinistry.title}</h2>
                            </div>
                            <p className="text-lg opacity-90">{selectedMinistry.shortDesc}</p>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* About Section */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Ministry</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">{selectedMinistry.fullDesc}</p>
                            </div>

                            {/* Meeting Details */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className={`${selectedMinistry.bgColor} border-2 ${selectedMinistry.borderColor} rounded-xl p-6`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Clock className="w-6 h-6 text-gray-700" />
                                        <h4 className="font-bold text-gray-900 text-lg">Meeting Time</h4>
                                    </div>
                                    <p className="text-gray-700 font-semibold">{selectedMinistry.meetingTime}</p>
                                </div>
                                <div className={`${selectedMinistry.bgColor} border-2 ${selectedMinistry.borderColor} rounded-xl p-6`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Users className="w-6 h-6 text-gray-700" />
                                        <h4 className="font-bold text-gray-900 text-lg">Ministry Leader</h4>
                                    </div>
                                    <p className="text-gray-700 font-semibold">{selectedMinistry.leader}</p>
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
                                <ul className="space-y-3">
                                    {selectedMinistry.activities.map((activity, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className={`w-6 h-6 text-green-600 shrink-0 mt-0.5`} />
                                            <span className="text-gray-700 text-lg">{activity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link href={selectedMinistry.link} className="flex-1">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full bg-gradient-to-r ${selectedMinistry.color} text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                                    >
                                        Visit Ministry Page
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                                <Link href="/contact" className="flex-1">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full border-2 ${selectedMinistry.borderColor} text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all`}
                                    >
                                        Get Involved
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Call to Action Section */}
            <section className="py-24 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 relative overflow-hidden">
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
                            Ready to Serve?
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-amber-100 mb-8 leading-relaxed"
                        >
                            God has given you unique gifts and talents. Join a ministry today and start making an eternal impact!
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-amber-900 px-10 py-5 max-md:mx-auto rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Join a Ministry
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-amber-900 transition-all"
                                >
                                    Back to Home
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default MinistriesPage;