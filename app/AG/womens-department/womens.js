"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaClock, FaHeart, FaBook, FaAward, FaChartLine, FaUserPlus, 
  FaSearch, FaChevronRight, FaStar, FaBullseye, FaComments, 
  FaArrowRight, FaCheckCircle, FaTimes, FaUser, FaMobileAlt, 
  FaBirthdayCake, FaHome, FaRing, FaChild
} from 'react-icons/fa';

const WomensDepartmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        maritalStatus: '',
        children: '',
        emergencyContact: '',
        emergencyPhone: '',
        interests: [],
        hearAboutUs: '',
        message: ''
    });

    const deptInfo = {
        name: "Women's Fellowship",
        tagline: "Empowering Women in Faith and Purpose",
        description: "A community of women growing together in faith, supporting one another, and making a difference in our families and communities.",
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200',
        gradient: 'from-pink-600 to-rose-700',
        vision: "To nurture a generation of godly women who are spiritually strong, emotionally healthy, and purposefully living out their faith.",
        mission: "Creating a safe space where women discover their identity in Christ, build meaningful relationships, and develop their gifts to impact the kingdom."
    };

    const leader = {
        name: 'Sister Mary Adeyemi',
        position: 'Women\'s Fellowship Leader',
        email: 'mary.adeyemi@agchurch.ng',
        phone: '+234 805 333 4444',
        bio: 'Sister Mary has been serving in women\'s ministry for over 12 years. She is passionate about mentoring women, strengthening marriages, and empowering mothers. Her heart is to see every woman walk in her God-given purpose.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    };

    const stats = {
        totalMembers: 458,
        activeMembers: 412,
        avgAttendance: 94,
        monthlyGrowth: 12
    };

    const [members] = useState([
        { id: 1, name: 'Grace Adeleke', email: 'grace.a@gmail.com', phone: '0701-234-5678', joinDate: '2023-02-10', role: 'Prayer Coordinator', attendance: 96, status: 'Active', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { id: 2, name: 'Sarah Ibrahim', email: 'sarah.i@gmail.com', phone: '0805-123-4567', joinDate: '2023-05-20', role: 'Member', attendance: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
        { id: 3, name: 'Blessing Okonkwo', email: 'blessing.o@gmail.com', phone: '0803-987-6543', joinDate: '2022-08-15', role: 'Choir Member', attendance: 94, status: 'Active', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150' },
        { id: 4, name: 'Faith Okoro', email: 'faith.o@gmail.com', phone: '0809-555-6666', joinDate: '2024-01-12', role: 'Youth Leader', attendance: 91, status: 'Active', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { id: 5, name: 'Mercy Johnson', email: 'mercy.j@gmail.com', phone: '0807-222-3333', joinDate: '2023-09-08', role: 'Member', attendance: 87, status: 'Active', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
        { id: 6, name: 'Esther Eze', email: 'esther.e@gmail.com', phone: '0806-111-2222', joinDate: '2022-12-01', role: 'Hospitality Team', attendance: 93, status: 'Active', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150' },
        { id: 7, name: 'Ruth Nnamdi', email: 'ruth.n@gmail.com', phone: '0808-333-4444', joinDate: '2023-07-15', role: 'Worship Team', attendance: 95, status: 'Active', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { id: 8, name: 'Hannah Chukwu', email: 'hannah.c@gmail.com', phone: '0805-444-5555', joinDate: '2024-03-22', role: 'Member', attendance: 88, status: 'Active', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    ]);

    const upcomingEvents = [
        {
            id: 1,
            title: 'Women\'s Prayer Conference',
            date: '2025-11-18',
            time: '10:00 AM',
            location: 'Main Sanctuary',
            description: 'A powerful time of prayer, worship, and prophetic declarations',
            attendees: 250
        },
        {
            id: 2,
            title: 'Craft & Fellowship Day',
            date: '2025-11-25',
            time: '2:00 PM',
            location: 'Fellowship Hall',
            description: 'Learn new skills while building lasting friendships',
            attendees: 150
        },
        {
            id: 3,
            title: 'Marriage Enrichment Seminar',
            date: '2025-12-02',
            time: '9:00 AM',
            location: 'Conference Room',
            description: 'Strengthening marriages and building godly homes',
            attendees: 180
        },
    ];

    const activities = [
        {
            icon: FaHeart,
            title: 'Weekly Prayer Meeting',
            schedule: 'Every Wednesday, 10:00 AM',
            description: 'Interceding for our families, church, and nation'
        },
        {
            icon: FaBook,
            title: 'Bible Study Circle',
            schedule: 'Every Thursday, 6:00 PM',
            description: 'Growing deeper in God\'s Word together'
        },
        {
            icon: FaStar,
            title: 'Craft & Skills Workshop',
            schedule: 'Second Saturday, 2:00 PM',
            description: 'Developing practical skills and entrepreneurship'
        },
        {
            icon: FaUsers,
            title: 'Outreach Ministry',
            schedule: 'Third Sunday, After Service',
            description: 'Serving widows, orphans, and the needy'
        },
    ];

    const interestOptions = [
        'Prayer & Intercession', 'Bible Study', 'Worship & Music', 
        'Marriage & Family', 'Craft & Skills', 'Mentorship', 
        'Community Outreach', 'Children\'s Ministry'
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
            department: 'Women\'s Fellowship',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            departmentId: 'womens'
        };

        console.log('Membership Request:', membershipRequest);
        
        alert('Your application has been submitted successfully! Our team will review and contact you soon.');
        setShowJoinModal(false);
        setFormData({
            fullName: '', email: '', phone: '', dateOfBirth: '', address: '',
            maritalStatus: '', children: '', emergencyContact: '', emergencyPhone: '',
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
                            <div className="h-10 w-10 bg-gradient-to-br from-pink-600 to-rose-700 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold text-white">AG</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Assemblies of God</p>
                                <p className="text-xs text-pink-600">Women's Fellowship</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="/" className="text-gray-600 hover:text-pink-600 text-sm font-medium transition">Home</a>
                            <a href="/departments" className="text-gray-600 hover:text-pink-600 text-sm font-medium transition">Departments</a>
                            <button 
                                onClick={() => setShowJoinModal(true)}
                                className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition"
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
                    <img src={deptInfo.image} alt="Women's Fellowship" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-rose-800/70" />
                </div>
                
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">{deptInfo.name}</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-pink-100">{deptInfo.tagline}</p>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">{deptInfo.description}</p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setShowJoinModal(true)}
                                className="bg-white text-pink-600 px-8 py-3 rounded-lg font-bold hover:bg-pink-50 transition flex items-center gap-2"
                            >
                                <FaUserPlus /> Join Fellowship
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-pink-600 transition">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-12 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Members', value: stats.totalMembers, icon: FaUsers, color: 'pink' },
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

            {/* Tabs */}
            <section className="bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: FaHome },
                            { id: 'members', label: 'Members', icon: FaUsers },
                            { id: 'events', label: 'Events', icon: FaCalendarAlt },
                            { id: 'activities', label: 'Activities', icon: FaHeart }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition ${
                                    activeTab === tab.id
                                        ? 'text-pink-600 border-b-2 border-pink-600'
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
                                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                                            <FaBullseye className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{deptInfo.vision}</p>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                                            <FaStar className="w-6 h-6 text-rose-600" />
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
                                            <p className="text-lg text-pink-600 font-semibold mb-4">{leader.position}</p>
                                            <p className="text-gray-700 leading-relaxed mb-6">{leader.bio}</p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaEnvelope className="w-5 h-5 text-pink-600" />
                                                    <a href={`mailto:${leader.email}`} className="hover:text-pink-600">{leader.email}</a>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <FaPhone className="w-5 h-5 text-pink-600" />
                                                    <a href={`tel:${leader.phone}`} className="hover:text-pink-600">{leader.phone}</a>
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
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredMembers.map((member) => (
                                    <motion.div key={member.id} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all overflow-hidden">
                                        <div className="relative h-48">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    member.attendance >= 90 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                                                }`}>
                                                    {member.attendance}%
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-sm text-pink-600 font-semibold mb-3">{member.role}</p>
                                            
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
                                            <div className="bg-gradient-to-br from-pink-600 to-rose-700 text-white w-20 h-20 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                                <p className="text-gray-600 mb-4">{event.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <FaClock className="w-4 h-4 text-pink-600" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="w-4 h-4 text-pink-600" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaUsers className="w-4 h-4 text-pink-600" />
                                                        <span>{event.attendees} Expected</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-2">
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
                                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                            <activity.icon className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                                        <p className="text-pink-600 font-semibold text-sm mb-3">{activity.schedule}</p>
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
                            <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-rose-700 text-white p-6 rounded-t-2xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">Join Women's Fellowship</h2>
                                        <p className="text-pink-100">Fill out the form below to become a member</p>
                                    </div>
                                    <button onClick={() => setShowJoinModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaUser className="text-pink-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="Enter your full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="your.email@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="+234 800 000 0000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status *</label>
                                            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200">
                                                <option value="">Select status</option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                                <option value="widowed">Widowed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Children</label>
                                            <input type="number" name="children" value={formData.children} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="0" min="0" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address *</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="Enter your full address" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaPhone className="text-pink-600" />
                                        Emergency Contact
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                                            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="Name of emergency contact" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone *</label>
                                            <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="+234 800 000 0000" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaHeart className="text-pink-600" />
                                        Ministry Interests
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {interestOptions.map((interest) => (
                                                    <label key={interest} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.interests.includes(interest) ? 'border-pink-600 bg-pink-50' : 'border-gray-300 hover:border-pink-300'}`}>
                                                        <input type="checkbox" checked={formData.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} className="text-pink-600 rounded" />
                                                        <span className="text-sm font-medium text-gray-700">{interest}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about us? *</label>
                                            <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200">
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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message (Optional)</label>
                                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200" placeholder="Tell us more about yourself or any questions you have..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <button type="button" onClick={() => setShowJoinModal(false)} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
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

            <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm">&copy; 2025 Assemblies of God Church - Women's Fellowship. All rights reserved.</p>
                    <p className="text-pink-400 font-semibold mt-2">Empowering Women in Faith and Purpose</p>
                </div>
            </footer>
        </div>
    );
};

export default WomensDepartmentPage;