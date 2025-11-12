"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
    FaChurch, FaArrowLeft, FaHeart, FaBook, FaUsers, FaGlobeAmericas,
    FaPray, FaHandsHelping, FaCross, FaHistory, FaBullseye, FaStar,
    FaQuoteLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight
} from 'react-icons/fa';
import Footer from '@/components/Footer/page';

const AboutUsPage = () => {
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

    const coreValues = [
        {
            icon: FaBook,
            title: 'Biblical Foundation',
            description: 'We stand firmly on the Word of God as our ultimate authority for faith and practice.',
            color: 'blue'
        },
        {
            icon: FaPray,
            title: 'Spirit-Led Ministry',
            description: 'We believe in the power and presence of the Holy Spirit in all aspects of our ministry.',
            color: 'purple'
        },
        {
            icon: FaHeart,
            title: 'Genuine Love',
            description: 'We cultivate a community where every person is valued, welcomed, and loved unconditionally.',
            color: 'red'
        },
        {
            icon: FaUsers,
            title: 'Community Focus',
            description: 'We are committed to building meaningful relationships and strong fellowship among believers.',
            color: 'green'
        },
        {
            icon: FaGlobeAmericas,
            title: 'Global Impact',
            description: 'We are passionate about reaching the world with the Gospel of Jesus Christ.',
            color: 'orange'
        },
        {
            icon: FaHandsHelping,
            title: 'Servant Leadership',
            description: 'We lead by example, serving God and His people with humility and excellence.',
            color: 'amber'
        }
    ];

    const beliefs = [
        {
            title: 'The Trinity',
            description: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.'
        },
        {
            title: 'Salvation',
            description: 'We believe salvation is received through repentance toward God and faith in Jesus Christ.'
        },
        {
            title: 'The Bible',
            description: 'We believe the Bible is the inspired and infallible Word of God, our supreme authority.'
        },
        {
            title: 'Water Baptism',
            description: 'We believe in baptism by immersion as an outward sign of an inward work of grace.'
        },
        {
            title: 'Holy Communion',
            description: 'We believe in the Lord\'s Supper as a memorial of Christ\'s suffering and death.'
        },
        {
            title: 'Baptism in the Holy Spirit',
            description: 'We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues.'
        },
        {
            title: 'Divine Healing',
            description: 'We believe in divine healing through faith in the name of Jesus Christ.'
        },
        {
            title: 'Second Coming',
            description: 'We believe in the imminent, personal return of our Lord Jesus Christ.'
        }
    ];

    const leadership = [
        {
            name: 'Pastor Emmanuel Eze',
            position: 'Senior Pastor',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            bio: 'Pastor Emmanuel has been serving as Senior Pastor since 2015, leading with vision and passion for God\'s kingdom.'
        },
        {
            name: 'Pastor Grace Eze',
            position: 'Associate Pastor',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
            bio: 'Pastor Grace oversees pastoral care and women\'s ministry, touching lives with compassion and wisdom.'
        },
        {
            name: 'Elder James Okon',
            position: 'Church Administrator',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            bio: 'Elder James manages church operations and serves with dedication to excellence in administration.'
        }
    ];

    const milestones = [
        { year: '1998', event: 'Church Founded', description: 'Assemblies of God Gbazango was established with 25 founding members' },
        { year: '2005', event: 'New Building', description: 'Dedicated our first permanent church building in Gbazango District' },
        { year: '2010', event: 'Youth Center', description: 'Opened dedicated Youth and Teens Ministry Center' },
        { year: '2015', event: 'Expansion', description: 'Expanded sanctuary to accommodate growing congregation' },
        { year: '2020', event: 'Digital Ministry', description: 'Launched online services and digital outreach programs' },
        { year: '2025', event: 'Community Impact', description: 'Serving over 1,200 members with vibrant ministry programs' }
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
                            <FaArrowLeft className="w-5 h-5" />
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
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200"
                        alt="Church Building"
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">About Our Church</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
                            A Community of Faith, Hope, and Love
                        </p>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                            For over 25 years, Assemblies of God Gbazango has been a beacon of light in our community,
                            transforming lives through the power of God's Word and the love of Christ.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Welcome Message */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <FaCross className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to AG Gbazango</h2>
                            <div className="relative">
                                <FaQuoteLeft className="absolute -top-4 -left-4 w-8 h-8 text-amber-200" />
                                <p className="text-xl text-gray-700 leading-relaxed italic px-8">
                                    "We are a Spirit-filled, Christ-centered community dedicated to worshipping God,
                                    winning souls, and making disciples. Our heart is to see every person experience
                                    the transforming power of Jesus Christ and walk in their God-given purpose."
                                </p>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-lg font-bold text-amber-600">Rev Sunday Asuata</p>
                                <p className="text-gray-600">Senior Pastor</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-20 bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <FaHistory className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Over 25 years of faithful service and continuous growth in God's kingdom
                            </p>
                        </motion.div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className=" absolute lg:left-1/2 max-md:left-1 transform -translate-x-1/2 w-1 h-full bg-amber-200" />

                            <div className="space-y-10">
                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className={`lg:flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-amber-100 hover:border-amber-300 transition">
                                                <span className="inline-block px-4 py-1 bg-amber-600 text-white rounded-full text-sm font-bold mb-3">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        </div>

                                        <div className="hidden md:flex w-12 h-12 bg-amber-600 rounded-full shrink-0 items-center justify-center border-4 border-white shadow-lg z-10">
                                            <FaStar className="w-6 h-6 text-white" />
                                        </div>

                                        <div className="flex-1" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <motion.div variants={fadeInUp} className="bg-linear-to-br from-blue-50 to-blue-100 p-10 rounded-2xl shadow-xl border-2 border-blue-200">
                            <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                                <FaBullseye className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To be a transformative church that impacts our community and the world,
                                raising disciples who are passionate about Christ, empowered by the Spirit,
                                and committed to advancing God's kingdom in every sphere of life.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-linear-to-br from-amber-50 to-amber-100 p-10 rounded-2xl shadow-xl border-2 border-amber-200">
                            <div className="w-20 h-20 bg-linear-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mb-6">
                                <FaStar className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To glorify God by winning souls to Christ, nurturing believers to spiritual maturity,
                                equipping them for effective ministry, and serving our community with the love and
                                compassion of Jesus Christ.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The principles that guide everything we do as a church community
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                    className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-amber-300 transition-all"
                                >
                                    <div className={`w-16 h-16 bg-linear-to-br from-${value.color}-400 to-${value.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What We Believe */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <FaBook className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Believe</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Our fundamental truths based on the Word of God
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {beliefs.map((belief, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-amber-50 p-6 rounded-xl border-2 border-amber-100 hover:border-amber-300 transition"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center shrink-0">
                                            <FaCross className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{belief.title}</h3>
                                            <p className="text-gray-700">{belief.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <FaUsers className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Servant leaders dedicated to guiding our church family
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {leadership.map((leader, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition"
                                >
                                    <div className="h-80 overflow-hidden">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                                        <p className="text-amber-600 font-semibold mb-4">{leader.position}</p>
                                        <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-linear-to-r from-amber-600 to-amber-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Come Visit Us
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-amber-100 mb-8">
                            We'd love to meet you! Join us for worship this Sunday.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mb-8 text-white">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                                <FaMapMarkerAlt className="w-8 h-8 mx-auto mb-3" />
                                <h3 className="font-bold mb-2">Location</h3>
                                <p className="text-amber-100">Gbazango District, Abuja</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                                <FaPhone className="w-8 h-8 mx-auto mb-3" />
                                <h3 className="font-bold mb-2">Phone</h3>
                                <p className="text-amber-100">+234 803 456 7890</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                                <FaEnvelope className="w-8 h-8 mx-auto mb-3" />
                                <h3 className="font-bold mb-2">Email</h3>
                                <p className="text-amber-100">info@agchurchng.org</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/AG/visitors"
                                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition shadow-xl"
                            >
                                Plan Your Visit
                                <FaChevronRight className="w-5 h-5" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-amber-600 transition"
                            >
                                Contact Us
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FaChurch className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-sm mb-2">&copy; 2025 Assemblies of God Church - Gbazango District. All rights reserved.</p>
                    <p className="text-amber-400 font-semibold">A Community of Faith, Hope, and Love</p>
                </div>
            </footer>
            <Footer />
        </div>
    );
};

export default AboutUsPage;