"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Users, Heart, Sparkles, Zap, Baby, Music, HandHeart, Church, ChevronRight, Volume2, VolumeX, Calendar, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Clock, Book, ArrowRight,ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NotificationBell from '@/components/Notifications';

const AGChurchLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-linear-to-b from-black/60 to-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="rounded-full max-md:w-10 max-md:h-30 w-20 h-40 mt-2"
                            />
                            <div className="">
                                <span className={`font-extrabold text-lg ${scrolled ? 'text-amber-900' : 'text-white'}`}>
                                    Assemblies of God
                                </span>
                                <p className={`text-xs ${scrolled ? 'text-amber-600' : 'text-amber-200'}`}>
                                    Gbazango district- All The Gospel
                                </p>
                            </div>

                        </motion.div>
                        <span className={`font-extrabold text-lg lg:hidden ${scrolled ? 'text-amber-900' : 'text-white'}`}>
                            <NotificationBell />
                        </span>
                        <div className="hidden md:flex items-center space-x-8">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About', href: '/about' },
                                { label: 'Ministers', href: '/ministers' },
                                { label: 'Events', href: '/events' },
                                { label: 'Sermons', href: '/sermons' },
                                { label: 'Contact', href: '/contact' }
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`font-semibold transition-colors duration-300 ${scrolled
                                            ? 'text-gray-700 hover:text-amber-600'
                                            : 'text-white hover:text-amber-400'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Give Online Button */}
                            <Link href="/give-online">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Give Online
                                </motion.button>
                            </Link>
                            <NotificationBell />
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden ${scrolled ? 'text-amber-900' : 'text-white'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About', href: '/about' },
                                { label: 'Ministers', href: '/ministers' },
                                { label: 'Leaders', href: '/AG/deacons' },
                                { label: 'Events', href: '/events' },
                                { label: 'Sermons', href: '/sermons' },
                                { label: 'Departments', href: '/departments' },
                                { label: 'Contact', href: '/contact' },
                                {label: 'Install App', href: '/our-app' }
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="block text-gray-700 hover:text-amber-600 font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                           <div className="flex justify-center mt-6">
  <Link href="/give-online">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-30 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
    >
      Give Online
    </motion.button>
  </Link>
</div>

                        </div>
                    </motion.div>
                )}

            </motion.nav>

            {/* Hero Section with Video */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="relative w-full h-full bg-gray-900/20">
                        {/* Video would go here */}
                        <video
                            className="w-full h-full object-cover brightness-50"
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                            poster="/gba.png"
                        >
                            {/* <source src="/get.mp4" type="video/mp4" /> */}
                        </video>

                        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/70" />
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-8 right-8 flex gap-3 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {/* Logo */}
                        <motion.div
                            variants={scaleIn}
                        >
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="rounded-full w-40 h-60 mt-20 mb-0 mx-auto"
                            />                       </motion.div>

                        {/* Main Heading */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h1
                                className="text-5xl md:text-7xl lg:text-8xl lg:-mt-20 -mt-20 font-bold text-white drop-shadow-2xl leading-tight"
                                style={{
                                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                    fontWeight: 600,
                                    letterSpacing: '-0.01em'
                                }}
                            >
                                Welcome to
                                <br />
                                <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-yellow-400"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                        fontWeight: 700
                                    }}
                                >
                                    Assemblies of God
                                </span>
                            </h1>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl text-amber-200 font-bold italic drop-shadow-lg"
                        >
                            Gbazango district - All The Gospel
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                            style={{ fontFamily: "'Crimson Text', 'Times New Roman', serif", fontWeight: 400 }}
                        >
                            Experience the transforming power of God's presence.
                            Join us for worship, fellowship, and spiritual growth in Christ.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-5 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2"
                            >

                                <Link href="/AG/join-us">
                                    Join Us This Sunday
                                </Link>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-white/10 backdrop-blur-md border-2 border-white text-white px-5 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-amber-900 transition-all flex items-center justify-center gap-2"
                            >
                                <Link href="/AG/live-stream">
                                    Sunday Live Stream
                                </Link>
                                <Play className="w-5 h-5" />
                            </motion.button>
                        </motion.div>

                        {/* Quick Info Bar */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap justify-center gap-6 pt-8"
                        >
                            {[
                                { icon: Calendar, text: 'Sunday 8AM - 12AM' },
                                { icon: MapPin, text: 'Abuja, Nigeria' },
                                { icon: Users, text: '900+ Members' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full">
                                    <item.icon className="w-5 h-5 text-amber-300" />
                                    <span className="text-white font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-2 text-white">
                        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Welcome Section */}
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
                                <span className="text-amber-600 font-bold text-sm tracking-wider uppercase">About Our Church</span>
                                <div className="h-1 bg-linear-to-r from-amber-500 to-amber-600 mt-2" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                A Place Where Faith Comes Alive
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                For over decades, Assemblies of God Church has been a beacon of hope and faith in our community.
                                We are a diverse family united by our love for Christ and commitment to spreading the Gospel.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Whether you're seeking spiritual growth, community connection, or simply exploring faith,
                                you'll find a warm welcome here. Come as you are and experience God's transforming love.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-amber-50 px-6 py-4 rounded-xl">
                                    <Book className="w-8 h-8 text-amber-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">900+</p>
                                        <p className="text-sm text-gray-600">Church Members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-amber-50 px-6 py-4 rounded-xl">
                                    <Heart className="w-8 h-8 text-amber-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">50+</p>
                                        <p className="text-sm text-gray-600">Years Serving</p>
                                    </div>
                                </div>
                                    <Link href="/direction">
                                 <div className="flex items-center gap-3 bg-amber-50 px-6 py-4 rounded-xl">
                                    <ArrowLeft className="w-8 h-8 text-amber-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">Direction</p>
                                        <p className="text-sm text-gray-600">Find your way to church</p>
                                    </div>
                                </div>
                                    </Link>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all group"
                            >
                                <Link href="/about">Learn More About Us</Link>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>

                        <motion.div variants={scaleIn} className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="pst Asuata.jpg"
                                    alt="Church Community"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
                            </div>
                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✝️</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">Join Us</p>
                                        <p className="text-amber-600 font-semibold">Every Sunday</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Service Times */}
            <section className="py-24 bg-linear-to-b from-amber-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp}>
                            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase">Service Schedule</span>
                            <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-amber-600 mx-auto mt-2 mb-4" />
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        >
                            Join Us for Worship
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            We gather together to worship, learn, and grow in our faith
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                day: 'Sunday Service',
                                time: '8:00 AM - 12:00 AM',
                                type: 'Main Worship Service',
                                icon: '⛪',
                                description: 'Join us for powerful worship and inspiring messages'
                            },
                            {
                                day: 'Tuesday Bible Study',
                                time: '6:00 PM',
                                type: 'Mid-Week Service',
                                icon: '📖',
                                description: 'Deep dive into God\'s word together'
                            },
                            {
                                day: 'Thursday Youth Service',
                                time: '6:00 PM',
                                type: 'Youth & Teens Ministry',
                                icon: '🎸',
                                description: 'Dynamic worship for the next generation'
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(217, 119, 6, 0.2)" }}
                                className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-100 hover:border-amber-300 transition-all"
                            >
                                <div className="text-6xl mb-6">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.day}</h3>
                                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-amber-600 mb-3">
                                    <Clock className="w-6 h-6" />
                                    {service.time}
                                </div>
                                <p className="text-amber-700 font-semibold mb-4">{service.type}</p>
                                <p className="text-gray-600">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Ministries */}

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase">Get Involved</span>
                            <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-amber-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Our Ministries
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Find your place to serve and grow in the body of Christ
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Users,
                                    title: 'Men\'s Fellowship',
                                    desc: 'Building strong men of faith and leadership',
                                    color: 'from-blue-500 to-blue-600',
                                    link: '/AG/mens-department'
                                },
                                {
                                    icon: Heart,
                                    title: 'Women\'s Fellowship',
                                    desc: 'Empowering women in faith and purpose',
                                    color: 'from-pink-500 to-pink-600',
                                    link: '/AG/womens-department'
                                },
                                {
                                    icon: Sparkles,
                                    title: 'Youth Ministry',
                                    desc: 'Empowering the next generation for Christ',
                                    color: 'from-green-500 to-green-600',
                                    link: '/AG/youth-department'
                                },
                                {
                                    icon: Zap,
                                    title: 'Teens Ministry',
                                    desc: 'Guiding teenagers in their faith journey',
                                    color: 'from-purple-500 to-purple-600',
                                    link: '/AG/teens-department'
                                },
                                {
                                    icon: Baby,
                                    title: 'Children Ministry',
                                    desc: 'Nurturing young hearts for Jesus',
                                    color: 'from-yellow-500 to-yellow-600',
                                    link: '/AG/children-department'
                                },
                                {
                                    icon: Music,
                                    title: 'Worship Team',
                                    desc: 'Leading the congregation in praise',
                                    color: 'from-indigo-500 to-indigo-600',
                                    link: '/AG/worship-team'
                                },
                                {
                                    icon: HandHeart,
                                    title: 'Community Outreach',
                                    desc: 'Serving our neighbors with love',
                                    color: 'from-red-500 to-red-600',
                                    link: '/outreach'
                                },
                                {
                                    icon: Church,
                                    title: 'Prayer Ministry',
                                    desc: 'Interceding for our church and community',
                                    color: 'from-teal-500 to-teal-600',
                                    link: '/prayer-ministry'
                                }
                            ].map((ministry, index) => {
                                const IconComponent = ministry.icon;
                                return (
                                    <Link key={index} href={ministry.link}>
                                        <motion.div
                                            variants={fadeInUp}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="group relative bg-linear-to-b from-[#B8860B] via-[#FFD700] to-[#B8860B] p-6 rounded-xl shadow-lg border-2 border-[#B8860B] hover:border-[#FFD700] transition-all cursor-pointer h-full overflow-hidden"
                                        >
                                            {/* Diagonal divide effect */}
                                            <div className="absolute inset-0 bg-linear-to-br from-[#B8860B] via-[#DAA520] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="relative z-10">
                                                <div className={`w-16 h-16 bg-linear-to-br ${ministry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{ministry.title}</h3>
                                                <p className="text-gray-800 mb-4">{ministry.desc}</p>
                                                <span className="text-[#8B4513] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Learn More <ChevronRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Call to Action */}
            <section className="py-24 bg-linear-to-r from-amber-900 via-amber-800 to-amber-700 relative overflow-hidden">
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

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={scaleIn} className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                        >
                            Experience God's Transforming Love
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed"
                        >
                            You're invited to join our church family. Come as you are and discover
                            the life-changing power of God's presence.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-amber-900 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Link href="/AG/visitors">
                                    Plan Your Visit
                                </Link>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-amber-900 transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-gray-900 text-gray-300 py-16 overflow-hidden">
                {/* Background video (plays in the footer) */}
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    poster="/footer-poster.jpg"
                >
                    <source src="/get.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay so content is readable */}
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Footer video controls */}
                    <div className="flex justify-end mb-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* About */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-12 w-12  rounded-lg flex items-center justify-center">
                                    <img
                                        src="/logo.png"
                                        alt="Church Logo"
                                        className="rounded-full max-md:w-10 max-md:h-30 w-40 h-30 mt-2"
                                    />                                </div>
                                <span className="text-white font-bold text-lg">Assemblies of God</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                A Spirit-filled church committed to spreading the Gospel and transforming lives through the power of Jesus Christ.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { icon: Facebook, link: '#' },
                                    { icon: Instagram, link: '#' },
                                    { icon: Twitter, link: '#' },
                                    { icon: Youtube, link: '#' }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.link}
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>


{/* Quick Links */}
<div>
    <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
    <ul className="space-y-3">
        {[
            { name: 'About Us', path: '/about' },
            { name: 'Contact Us', path: '/contact' },
            { name: 'Our Beliefs', path: '/AG/belief' },
            { name: 'Leadership', path: '/AG/deacons' },
            { name: 'Ministers', path: '/ministers' },
            { name: 'Events Calendar', path: '/events' },
            { name: 'Sermons', path: '/sermons' },
            { name: 'Departments', path: '/departments' },
            { name: 'Install App', path: '/our-app' }

        ].map((link, i) => (
            <li key={i}>
                <Link 
                    href={link.path} 
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                </Link>
            </li>
        ))}
    </ul>
</div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-semibold">Church Address</p>
                                        <p className="text-gray-400 text-sm">123 Faith Avenue<br />Wuse 2, Abuja, Nigeria</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-semibold">Phone</p>
                                        <p className="text-gray-400 text-sm">+234 803 456 7890</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-semibold">Email</p>
                                        <p className="text-gray-400 text-sm">info@agchurchng.org</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Service Times */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6">Service Times</h3>
                            <ul className="space-y-4">
                                  <li className="bg-gray-800/30 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                      <Clock className="w-4 h-4 text-amber-400" />
                                                      <p className="text-white font-semibold">Sunday School lesson</p>
                                                    </div>
                                                    <p className="text-amber-400 font-bold">
                                                      8:00 AM - 9:00 AM
                                                    </p>
                                                  </li>
                                <li className="bg-gray-800/30 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        <p className="text-white font-semibold">Main Service</p>
                                    </div>
                                    <p className="text-amber-400 font-bold">9:30 AM - 12:00 AM</p>
                                </li>
                                <li className="bg-gray-800/30 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        <p className="text-white font-semibold">Bible Study</p>
                                    </div>
                                    <p className="text-amber-400 font-bold">Tuesday 6:00 PM</p>
                                </li>
                                <li className="bg-gray-800/30 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        <p className="text-white font-semibold">Youth Service</p>
                                    </div>
                                    <p className="text-amber-400 font-bold">Thursday 6:00 PM</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm text-center md:text-left">
                                &copy; 2025 Assemblies of God Church Nigeria. All rights reserved.
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 font-bold">
                                <span className="text-2xl">✝</span>
                                <span className="text-sm">All The Gospel To All The World</span>
                            </div>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Use</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AGChurchLanding;