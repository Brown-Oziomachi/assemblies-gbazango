"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaClock, FaHeart, FaBook, FaAward, FaChartLine, FaUserPlus, 
  FaSearch, FaChevronRight, FaStar, FaBullseye, FaComments, 
  FaArrowRight, FaCheckCircle, FaBolt, FaMusic, FaTrophy,
  FaTimes, FaUser, FaMobileAlt, FaBirthdayCake, FaHome,
  FaGraduationCap, FaChurch
} from 'react-icons/fa';
import Link from 'next/link';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, Timestamp, query, orderBy, where } from 'firebase/firestore';

const YouthDepartmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        educationLevel: '',
        interests: [],
        hearAboutUs: '',
        message: ''
    });

    const deptInfo = {
        name: "Youth Ministry",
        tagline: "Empowering the Next Generation",
        description: "Building a generation of young people who are passionate about God, equipped to make a difference, and ready to lead with integrity.",
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200',
        gradient: 'from-blue-600 to-indigo-700',
        vision: "To raise a generation of young leaders who are on fire for God, impacting their campuses, communities, and the world for Christ.",
        mission: "Creating a vibrant community where youth discover their purpose, develop their gifts, and live out their faith boldly in today's world."
    };

    const leader = {
        name: 'Brother Michael Okoro',
        position: 'Youth Ministry Leader',
        email: 'michael.okoro@agchurch.ng',
        phone: '+234 807 444 5555',
        bio: 'Brother Michael is a dynamic youth pastor with 8 years of experience. He is passionate about mentoring young leaders, contemporary worship, and equipping youth to transform their generation.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
    };

    const stats = {
        totalMembers: 285,
        activeMembers: 256,
        avgAttendance: 95,
        monthlyGrowth: 15
    };

    const [members] = useState([
        { id: 1, name: 'David Mensah', email: 'david.m@gmail.com', phone: '0809-876-5432', joinDate: '2023-04-15', role: 'Worship Leader', attendance: 97, status: 'Active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { id: 2, name: 'Joshua Obi', email: 'joshua.o@gmail.com', phone: '0805-234-5678', joinDate: '2023-06-10', role: 'Member', attendance: 90, status: 'Active', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
        { id: 3, name: 'Daniel Eze', email: 'daniel.e@gmail.com', phone: '0807-345-6789', joinDate: '2024-01-05', role: 'Media Team', attendance: 88, status: 'Active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { id: 4, name: 'Samuel Adamu', email: 'samuel.a@gmail.com', phone: '0806-456-7890', joinDate: '2023-08-20', role: 'Drama Team', attendance: 92, status: 'Active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' },
        { id: 5, name: 'Benjamin Okeke', email: 'benjamin.o@gmail.com', phone: '0808-567-8901', joinDate: '2022-11-15', role: 'Sports Coordinator', attendance: 85, status: 'Active', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
        { id: 6, name: 'Victor Uche', email: 'victor.u@gmail.com', phone: '0803-678-9012', joinDate: '2023-03-25', role: 'Member', attendance: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { id: 7, name: 'Emmanuel Nnamdi', email: 'emmanuel.n@gmail.com', phone: '0805-789-0123', joinDate: '2023-09-18', role: 'Tech Team', attendance: 94, status: 'Active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { id: 8, name: 'Joseph Chukwu', email: 'joseph.c@gmail.com', phone: '0807-890-1234', joinDate: '2024-02-12', role: 'Prayer Team', attendance: 91, status: 'Active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' },
    ]);

    const upcomingEvents = [
        {
            id: 1,
            title: 'Youth Explosion Night',
            date: '2025-11-16',
            time: '6:00 PM',
            location: 'Youth Center',
            description: 'An electrifying night of worship, word, and wonder!',
            attendees: 320
        },
        {
            id: 2,
            title: 'Basketball Tournament',
            date: '2025-11-23',
            time: '3:00 PM',
            location: 'Sports Complex',
            description: 'Fellowship through sports and friendly competition',
            attendees: 150
        },
        {
            id: 3,
            title: 'Career Mentorship Program',
            date: '2025-11-30',
            time: '2:00 PM',
            location: 'Conference Hall',
            description: 'Connecting with professionals and discovering your path',
            attendees: 180
        },
    ];

    const activities = [
        {
            icon: FaMusic,
            title: 'Friday Night Service',
            schedule: 'Every Friday, 7:00 PM',
            description: 'High-energy worship and relevant messages for today\'s youth'
        },
        {
            icon: FaBook,
            title: 'Youth Bible Study',
            schedule: 'Every Sunday, 4:00 PM',
            description: 'Digging deep into God\'s Word with your generation'
        },
        {
            icon: FaTrophy,
            title: 'Sports & Games Night',
            schedule: 'Every Saturday, 5:00 PM',
            description: 'Building community through fun and fitness'
        },
        {
            icon: FaBolt,
            title: 'Creative Arts Workshop',
            schedule: 'Second Thursday, 6:00 PM',
            description: 'Developing talents in music, drama, media, and more'
        },
    ];

    const interestOptions = [
        'Worship & Music', 'Drama & Arts', 'Media & Tech', 'Sports & Recreation',
        'Prayer Ministry', 'Bible Study', 'Community Service', 'Leadership'
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
        
        // Here you would send the form data to your backend/Firebase
        const membershipRequest = {
            ...formData,
            department: 'Youth Ministry',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            departmentId: 'youth'
        };

        console.log('Membership Request:', membershipRequest);
        
        // TODO: Send to Firebase/Backend for admin approval
        await addDoc(collection(db, 'membershipRequests'), membershipRequest);
        
        alert('Your application has been submitted successfully! Our team will review and contact you soon.');
        setShowJoinModal(false);
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            address: '',
            emergencyContact: '',
            emergencyPhone: '',
            educationLevel: '',
            interests: [],
            hearAboutUs: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                                <img
                                    src="/AG.jpeg"
                                    alt="AG Church"
                                    className="w-10 h-10"
                                />                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Assemblies of God</p>
                                <p className="text-xs text-blue-600">Youth Ministry</p>
                            </div>
                        </div>
                        <div className=" md:flex items-center gap-6">
                            <a href="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition max-md:hidden">Home</a>
                            <a href="/departments" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition max-md:text-blue-600">Departments</a>
                            <button 
                                onClick={() => setShowJoinModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition max-md:hidden"
                            >
                                Join Us
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Image */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src={deptInfo.image} 
                        alt="Youth Ministry" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-indigo-900/70" />
                </div>
                
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">{deptInfo.name}</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-blue-100">{deptInfo.tagline}</p>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">{deptInfo.description}</p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setShowJoinModal(true)}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition flex items-center gap-2"
                            >
                                <FaUserPlus /> Join Ministry
                            </button>
                            <Link href="/AG/youth-department/learn-more">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Members', value: stats.totalMembers, icon: FaUsers, color: 'blue' },
                            { label: 'Active Members', value: stats.activeMembers, icon: FaCheckCircle, color: 'green' },
                            { label: 'Avg Attendance', value: `${stats.avgAttendance}%`, icon: FaChartLine, color: 'purple' },
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

            {/* Tabs Navigation */}
            <section className="bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: FaHome },
                            { id: 'members', label: 'Members', icon: FaUsers },
                            { id: 'events', label: 'Events', icon: FaCalendarAlt },
                            { id: 'activities', label: 'Activities', icon: FaTrophy }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition ${
                                    activeTab === tab.id
                                        ? 'text-blue-600 border-b-2 border-blue-600'
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

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Vision & Mission */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-xl shadow-sm border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FaBullseye className="w-6 h-6 text-blue-600" />
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

                            {/* Department Leader */}
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Leader</h2>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full md:w-64 h-64 object-cover rounded-xl"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                                            <p className="text-lg text-blue-600 font-semibold mb-4">{leader.position}</p>
                                            <p className="text-gray-700 leading-relaxed mb-6">{leader.bio}</p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaEnvelope className="w-5 h-5 text-blue-600" />
                                                    <a href={`mailto:${leader.email}`} className="hover:text-blue-600">{leader.email}</a>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaPhone className="w-5 h-5 text-blue-600" />
                                                    <a href={`tel:${leader.phone}`} className="hover:text-blue-600">{leader.phone}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'members' && (
                        <motion.div
                            key="members"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                                <h2 className="text-3xl font-bold text-gray-900">Our Members</h2>
                                <div className="relative w-full max-w-md">
                                    <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredMembers.map((member) => (
                                    <motion.div
                                        key={member.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden"
                                    >
                                        <div className="relative h-48">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    member.attendance >= 90
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-yellow-500 text-white'
                                                }`}>
                                                    {member.attendance}%
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-sm text-blue-600 font-semibold mb-3">{member.role}</p>
                                            
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaEnvelope className="w-3 h-3 shrink-0" />
                                                    <span className="truncate">{member.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaPhone className="w-3 h-3 shrink-0" />
                                                    <span>{member.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="w-3 h-3 shrink-0" />
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
                        <motion.div
                            key="events"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                        <div className="flex gap-6 flex-wrap">
                                            <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white w-20 h-20 rounded-lg flex flex-col items-center justify-center shrink-0">
                                                <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                                <p className="text-gray-600 mb-4">{event.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <FaClock className="w-4 h-4 text-blue-600" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="w-4 h-4 text-blue-600" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaUsers className="w-4 h-4 text-blue-600" />
                                                        <span>{event.attendees} Expected</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                                                Register <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'activities' && (
                        <motion.div
                            key="activities"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Regular Activities</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {activities.map((activity, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                            <activity.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                                        <p className="text-blue-600 font-semibold text-sm mb-3">{activity.schedule}</p>
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setShowJoinModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
                        >
                            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">Join Youth Ministry</h2>
                                        <p className="text-blue-100">Fill out the form below to become a member</p>
                                    </div>
                                    <button
                                        onClick={() => setShowJoinModal(false)}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                                    >
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaUser className="text-blue-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="+234 800 000 0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Home Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="Enter your full address"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Emergency Contact */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaPhone className="text-blue-600" />
                                        Emergency Contact
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Contact Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="emergencyContact"
                                                value={formData.emergencyContact}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="Parent/Guardian name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Contact Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="emergencyPhone"
                                                value={formData.emergencyPhone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="+234 800 000 0000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaGraduationCap className="text-blue-600" />
                                        Additional Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Education Level *
                                            </label>
                                            <select
                                                name="educationLevel"
                                                value={formData.educationLevel}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            >
                                                <option value="">Select education level</option>
                                                <option value="secondary">Secondary School</option>
                                                <option value="undergraduate">Undergraduate</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="postgraduate">Postgraduate</option>
                                                <option value="working">Working Professional</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Areas of Interest (Select all that apply)
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {interestOptions.map((interest) => (
                                                    <label
                                                        key={interest}
                                                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                                                            formData.interests.includes(interest)
                                                                ? 'border-blue-600 bg-blue-50'
                                                                : 'border-gray-300 hover:border-blue-300'
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.interests.includes(interest)}
                                                            onChange={() => handleInterestToggle(interest)}
                                                            className="text-blue-600 rounded"
                                                        />
                                                        <span className="text-sm font-medium text-gray-700">{interest}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                How did you hear about us? *
                                            </label>
                                            <select
                                                name="hearAboutUs"
                                                value={formData.hearAboutUs}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            >
                                                <option value="">Select an option</option>
                                                <option value="friend">Friend/Family</option>
                                                <option value="social">Social Media</option>
                                                <option value="website">Church Website</option>
                                                <option value="service">Sunday Service</option>
                                                <option value="event">Church Event</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Additional Message (Optional)
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                placeholder="Tell us more about yourself or any questions you have..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowJoinModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        <FaCheckCircle />
                                        Submit Application
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 text-center">
                                    Your application will be reviewed by our team. We'll contact you within 2-3 business days.
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm">&copy; 2025 Assemblies of God Church - Youth Ministry. All rights reserved.</p>
                    <p className="text-blue-400 font-semibold mt-2">Empowering the Next Generation</p>
                </div>
            </footer>
        </div>
    );
};

export default YouthDepartmentPage;