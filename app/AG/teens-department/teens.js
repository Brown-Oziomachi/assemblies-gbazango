"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUsers, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaClock, FaHeart, FaBook, FaAward, FaChartLine, FaUserPlus,
    FaSearch, FaChevronRight, FaStar, FaBullseye, FaComments,
    FaArrowRight, FaCheckCircle, FaTimes, FaUser, FaMobileAlt,
    FaBirthdayCake, FaHome, FaGraduationCap, FaGamepad
} from 'react-icons/fa';
import Link from 'next/link';

const TeensDepartmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        schoolName: '',
        grade: '',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        interests: [],
        hearAboutUs: '',
        message: ''
    });

    const deptInfo = {
        name: "Teens Ministry",
        tagline: "Guiding Teenagers in Their Faith Journey",
        description: "Creating a safe space where teenagers can discover their identity in Christ, build meaningful friendships, and grow in their faith during these crucial years.",
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200',
        gradient: 'from-purple-600 to-indigo-700',
        vision: "To build a community of teenagers who know who they are in Christ, understand their purpose, and are equipped to navigate life's challenges with faith.",
        mission: "Providing a welcoming environment where teens can ask questions, find answers, develop godly character, and build lasting friendships centered on Christ."
    };

    const leader = {
        name: 'Sister Faith Okafor',
        position: 'Teens Ministry Leader',
        email: 'faith.okafor@agchurch.ng',
        phone: '+234 809 555 6666',
        bio: 'Sister Faith has a special heart for teenagers and understands the unique challenges they face. With 6 years in teen ministry, she creates a safe, fun environment where teens can be themselves while growing in Christ.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    };

    const stats = {
        totalMembers: 162,
        activeMembers: 145,
        avgAttendance: 92,
        monthlyGrowth: 10
    };

    const [members] = useState([
        { id: 1, name: 'Sarah Ibrahim', email: 'sarah.i@gmail.com', phone: '0805-123-4567', joinDate: '2024-02-10', role: 'Member', attendance: 93, status: 'Active', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { id: 2, name: 'Emmanuel Chukwu', email: 'emmanuel.c@gmail.com', phone: '0807-234-5678', joinDate: '2023-09-15', role: 'Praise Team', attendance: 88, status: 'Active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { id: 3, name: 'Grace Nnamdi', email: 'grace.n@gmail.com', phone: '0806-345-6789', joinDate: '2024-01-20', role: 'Member', attendance: 91, status: 'Active', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
        { id: 4, name: 'Daniel Okoye', email: 'daniel.o@gmail.com', phone: '0808-456-7890', joinDate: '2023-11-05', role: 'Drama Team', attendance: 86, status: 'Active', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
        { id: 5, name: 'Deborah Eze', email: 'deborah.e@gmail.com', phone: '0809-567-8901', joinDate: '2024-03-12', role: 'Member', attendance: 90, status: 'Active', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150' },
        { id: 6, name: 'Joseph Adamu', email: 'joseph.a@gmail.com', phone: '0805-678-9012', joinDate: '2023-10-18', role: 'Assistant Leader', attendance: 95, status: 'Active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { id: 7, name: 'Rachel Okoro', email: 'rachel.o@gmail.com', phone: '0807-789-0123', joinDate: '2024-04-05', role: 'Member', attendance: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { id: 8, name: 'Samuel Uche', email: 'samuel.u@gmail.com', phone: '0806-890-1234', joinDate: '2023-12-22', role: 'Tech Team', attendance: 92, status: 'Active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' },
    ]);

    const upcomingEvents = [
        {
            id: 1,
            title: 'Teens Game Night',
            date: '2025-11-17',
            time: '5:00 PM',
            location: 'Teen Lounge',
            description: 'Epic games, pizza, and awesome fellowship!',
            attendees: 95
        },
        {
            id: 2,
            title: 'Bible Quiz Competition',
            date: '2025-11-24',
            time: '4:00 PM',
            location: 'Youth Center',
            description: 'Test your Bible knowledge and win amazing prizes',
            attendees: 80
        },
        {
            id: 3,
            title: 'Leadership Boot Camp',
            date: '2025-12-01',
            time: '10:00 AM',
            location: 'Conference Hall',
            description: 'Developing future leaders with godly character',
            attendees: 110
        },
    ];

    const activities = [
        {
            icon: FaBook,
            title: 'Sunday Teen Service',
            schedule: 'Every Sunday, 5:00 PM',
            description: 'Relevant messages and worship designed just for teens'
        },
        {
            icon: FaHeart,
            title: 'Midweek Bible Study',
            schedule: 'Every Wednesday, 5:00 PM',
            description: 'Exploring God\'s Word together in a relaxed setting'
        },
        {
            icon: FaGamepad,
            title: 'Fun Friday Hangout',
            schedule: 'Last Friday, 6:00 PM',
            description: 'Games, movies, and quality time with friends'
        },
        {
            icon: FaStar,
            title: 'Study & Prayer Group',
            schedule: 'Every Saturday, 9:00 AM',
            description: 'Academic excellence meets spiritual growth'
        },
    ];

    const interestOptions = [
        'Worship & Music', 'Drama & Arts', 'Media & Tech', 'Sports & Games',
        'Bible Study', 'Prayer Ministry', 'Leadership', 'Social Activities'
    ];

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const membershipRequest = {
            ...formData,
            department: 'Teens Ministry',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            departmentId: 'teens'
        };

        console.log('Membership Request:', membershipRequest);

        alert('Your application has been submitted successfully! Our team will review and contact you soon.');
        setShowJoinModal(false);
        setFormData({
            fullName: '', email: '', phone: '', dateOfBirth: '', address: '',
            schoolName: '', grade: '', parentName: '', parentPhone: '', parentEmail: '',
            interests: [], hearAboutUs: '', message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold text-white">AG</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Assemblies of God</p>
                                <p className="text-xs text-purple-600">Teens Ministry</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="/" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition">Home</a>
                            <a href="/departments" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition">Departments</a>
                            <button
                                onClick={() => setShowJoinModal(true)}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                            >
                                Join Us
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero with Image */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={deptInfo.image} alt="Teens Ministry" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/70" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">{deptInfo.name}</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-purple-100">{deptInfo.tagline}</p>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">{deptInfo.description}</p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setShowJoinModal(true)}
                                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition flex items-center gap-2"
                            >
                                <FaUserPlus /> Join Ministry
                            </button>
                            <Link href="/AG/teens-department/learn-more">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-12 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Members', value: stats.totalMembers, icon: FaUsers, color: 'purple' },
                            { label: 'Active Members', value: stats.activeMembers, icon: FaCheckCircle, color: 'green' },
                            { label: 'Avg Attendance', value: `${stats.avgAttendance}%`, icon: FaChartLine, color: 'blue' },
                            { label: 'Monthly Growth', value: `+${stats.monthlyGrowth}%`, icon: FaAward, color: 'orange' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200"
                            >
                                <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-600`} />
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: FaHome },
                            { id: 'members', label: 'Members', icon: FaUsers },
                            { id: 'events', label: 'Events', icon: FaCalendarAlt },
                            { id: 'activities', label: 'Activities', icon: FaGamepad }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition ${activeTab === tab.id
                                        ? 'text-purple-600 border-b-2 border-purple-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-xl shadow-sm border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FaBullseye className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{deptInfo.vision}</p>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FaStar className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{deptInfo.mission}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Leader</h2>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <img src={leader.image} alt={leader.name} className="w-full md:w-64 h-64 object-cover rounded-xl" />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                                            <p className="text-lg text-purple-600 font-semibold mb-4">{leader.position}</p>
                                            <p className="text-gray-700 leading-relaxed mb-6">{leader.bio}</p>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaEnvelope className="w-5 h-5 text-purple-600" />
                                                    <a href={`mailto:${leader.email}`} className="hover:text-purple-600">{leader.email}</a>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaPhone className="w-5 h-5 text-purple-600" />
                                                    <a href={`tel:${leader.phone}`} className="hover:text-purple-600">{leader.phone}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'members' && (
                        <motion.div key="members" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                                <h2 className="text-3xl font-bold text-gray-900">Our Members</h2>
                                <div className="relative w-full max-w-md">
                                    <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredMembers.map((member) => (
                                    <motion.div key={member.id} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden">
                                        <div className="relative h-48">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.attendance >= 90 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                                                    }`}>
                                                    {member.attendance}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-sm text-purple-600 font-semibold mb-3">{member.role}</p>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaEnvelope className="w-3 h-3 flex-shrink-0" />
                                                    <span className="truncate">{member.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaPhone className="w-3 h-3 flex-shrink-0" />
                                                    <span>{member.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="w-3 h-3 flex-shrink-0" />
                                                    <span className="text-xs">Joined: {member.joinDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'events' && (
                        <motion.div key="events" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                        <div className="flex gap-6 flex-wrap">
                                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white w-20 h-20 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                                <p className="text-gray-600 mb-4">{event.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <FaClock className="w-4 h-4 text-purple-600" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="w-4 h-4 text-purple-600" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaUsers className="w-4 h-4 text-purple-600" />
                                                        <span>{event.attendees} Expected</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2">
                                                Register <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'activities' && (
                        <motion.div key="activities" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Regular Activities</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {activities.map((activity, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                            <activity.icon className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                                        <p className="text-purple-600 font-semibold text-sm mb-3">{activity.schedule}</p>
                                        <p className="text-gray-600">{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Join Modal */}
            <AnimatePresence>
                {showJoinModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowJoinModal(false)}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8">
                            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-t-2xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">Join Teens Ministry</h2>
                                        <p className="text-purple-100">Fill out the form below to become a member</p>
                                    </div>
                                    <button onClick={() => setShowJoinModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaUser className="text-purple-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="Enter your full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="your.email@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="+234 800 000 0000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address *</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="Enter your full address" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaGraduationCap className="text-purple-600" />
                                        School Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">School Name *</label>
                                            <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="Your school name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Grade/Class *</label>
                                            <select name="grade" value={formData.grade} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                                                <option value="">Select grade</option>
                                                <option value="jss1">JSS 1</option>
                                                <option value="jss2">JSS 2</option>
                                                <option value="jss3">JSS 3</option>
                                                <option value="ss1">SS 1</option>
                                                <option value="ss2">SS 2</option>
                                                <option value="ss3">SS 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaPhone className="text-purple-600" />
                                        Parent/Guardian Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Parent/Guardian Name *</label>
                                            <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="Full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Phone *</label>
                                            <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="+234 800 000 0000" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Email *</label>
                                            <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="parent@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaHeart className="text-purple-600" />
                                        Ministry Interests
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {interestOptions.map((interest) => (
                                                    <label key={interest} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.interests.includes(interest) ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}>
                                                        <input type="checkbox" checked={formData.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} className="text-purple-600 rounded" />
                                                        <span className="text-sm font-medium text-gray-700">{interest}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about us? *</label>
                                            <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                                                <option value="">Select an option</option>
                                                <option value="friend">Friend/Classmate</option>
                                                <option value="family">Family Member</option>
                                                <option value="social">Social Media</option>
                                                <option value="website">Church Website</option>
                                                <option value="service">Sunday Service</option>
                                                <option value="event">Church Event</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message (Optional)</label>
                                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="Tell us more about yourself or any questions you have..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <button type="button" onClick={() => setShowJoinModal(false)} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                                        <FaCheckCircle />
                                        Submit Application
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 text-center">
                                    Your application will be reviewed by our team. We'll contact your parent/guardian within 2-3 business days.
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm">&copy; 2025 Assemblies of God Church - Teens Ministry. All rights reserved.</p>
                    <p className="text-purple-400 font-semibold mt-2">Guiding Teenagers in Their Faith Journey</p>
                </div>
            </footer>
        </div>
    );
};

export default TeensDepartmentPage;