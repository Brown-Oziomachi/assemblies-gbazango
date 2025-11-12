"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaClock, FaHeart, FaBook, FaAward, FaChartLine, FaUserPlus, 
  FaSearch, FaChevronRight, FaStar, FaBullseye, FaComments, 
  FaArrowRight, FaCheckCircle, FaTimes, FaUser, FaMobileAlt, 
  FaBirthdayCake, FaHome, FaBriefcase, FaChurch
} from 'react-icons/fa';
import Link from 'next/link';

const MensDepartmentPage = () => {
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
        occupation: '',
        emergencyContact: '',
        emergencyPhone: '',
        interests: [],
        hearAboutUs: '',
        message: ''
    });

    const deptInfo = {
        name: "Men's Fellowship",
        tagline: "Building Strong Men of Faith",
        description: "Empowering men to be godly leaders in their homes, workplaces, and communities through fellowship, discipleship, and service.",
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200',
        gradient: 'from-blue-600 to-blue-800',
        vision: "To raise a generation of godly men who lead with integrity, love unconditionally, and serve faithfully.",
        mission: "Equipping men with biblical principles, practical life skills, and strong brotherhood to impact their families and communities for Christ."
    };

    const leader = {
        name: 'Elder James Okon',
        position: 'Men\'s Fellowship Leader',
        email: 'james.okon@agchurch.ng',
        phone: '+234 703 222 3333',
        bio: 'With over 15 years of ministry experience, Elder James has dedicated his life to mentoring men and building strong families. He is passionate about discipleship and community transformation.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    };

    const stats = {
        totalMembers: 342,
        activeMembers: 298,
        avgAttendance: 92,
        monthlyGrowth: 8
    };

    const [members] = useState([
        { id: 1, name: 'John Okafor', email: 'john.okafor@gmail.com', phone: '0803-456-7890', joinDate: '2023-01-15', role: 'Member', attendance: 95, status: 'Active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { id: 2, name: 'David Mensah', email: 'david.m@gmail.com', phone: '0809-876-5432', joinDate: '2023-03-22', role: 'Usher Team', attendance: 88, status: 'Active', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
        { id: 3, name: 'Peter Adeyemi', email: 'peter.a@gmail.com', phone: '0805-123-4567', joinDate: '2022-11-10', role: 'Prayer Coordinator', attendance: 92, status: 'Active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { id: 4, name: 'Samuel Ibrahim', email: 'samuel.i@gmail.com', phone: '0807-234-5678', joinDate: '2024-02-05', role: 'Member', attendance: 85, status: 'Active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' },
        { id: 5, name: 'Emmanuel Nwosu', email: 'emmanuel.n@gmail.com', phone: '0806-345-6789', joinDate: '2023-07-18', role: 'Coordinator', attendance: 98, status: 'Active', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
        { id: 6, name: 'Michael Okoro', email: 'michael.o@gmail.com', phone: '0808-456-7890', joinDate: '2022-09-30', role: 'Worship Team', attendance: 90, status: 'Active', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        { id: 7, name: 'Benjamin Eze', email: 'benjamin.e@gmail.com', phone: '0805-567-8901', joinDate: '2023-05-12', role: 'Member', attendance: 87, status: 'Active', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
        { id: 8, name: 'Joseph Adamu', email: 'joseph.a@gmail.com', phone: '0807-678-9012', joinDate: '2024-01-20', role: 'Media Team', attendance: 91, status: 'Active', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150' },
    ]);

    const upcomingEvents = [
        {
            id: 1,
            title: 'Men\'s Prayer Breakfast',
            date: '2025-11-15',
            time: '7:00 AM',
            location: 'Church Hall',
            description: 'Start your day with powerful prayers and fellowship over breakfast',
            attendees: 85
        },
        {
            id: 2,
            title: 'Leadership Summit',
            date: '2025-11-22',
            time: '9:00 AM',
            location: 'Main Sanctuary',
            description: 'Developing godly leadership skills for the modern man',
            attendees: 120
        },
        {
            id: 3,
            title: 'Community Service Day',
            date: '2025-11-28',
            time: '8:00 AM',
            location: 'Community Center',
            description: 'Serving our community with love and compassion',
            attendees: 95
        },
    ];

    const activities = [
        {
            icon: FaBook,
            title: 'Weekly Bible Study',
            schedule: 'Every Tuesday, 7:00 PM',
            description: 'Deep dive into God\'s Word with fellow brothers'
        },
        {
            icon: FaCalendarAlt,
            title: 'Monthly Fellowship Meeting',
            schedule: 'First Saturday, 10:00 AM',
            description: 'Building brotherhood through fellowship and discussion'
        },
        {
            icon: FaHeart,
            title: 'Prayer Warriors Group',
            schedule: 'Every Friday, 6:00 AM',
            description: 'Interceding for our families and community'
        },
        {
            icon: FaBullseye,
            title: 'Sports & Recreation',
            schedule: 'Last Saturday, 3:00 PM',
            description: 'Fellowship through fitness and fun activities'
        },
    ];

    const interestOptions = [
        'Bible Study & Prayer', 'Leadership Development', 'Sports & Recreation', 
        'Marriage & Family', 'Business & Finance', 'Mentorship', 
        'Community Service', 'Worship Ministry'
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
            department: 'Men\'s Fellowship',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            departmentId: 'mens'
        };

        console.log('Membership Request:', membershipRequest);
        
        // TODO: Send to Firebase/Backend
        // await addDoc(collection(db, 'membershipRequests'), membershipRequest);
        
        alert('Your application has been submitted successfully! Our team will review and contact you soon.');
        setShowJoinModal(false);
        setFormData({
            fullName: '', email: '', phone: '', dateOfBirth: '', address: '',
            maritalStatus: '', occupation: '', emergencyContact: '', emergencyPhone: '',
            interests: [], hearAboutUs: '', message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                <img
                                    src="/AG.jpeg"
                                    alt="AG Church"
                                    className="w-10 h-10"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Assemblies of God</p>
                                <p className="text-xs text-blue-600">Men's Fellowship</p>
                            </div>
                        </div>
                        <div className=" md:flex items-center gap-6 max-md:space-x-5 max-md:ml-auto">
                            <a href="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition max-md:hidden ">Home</a>
                            <a href="/departments" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition max-md:text-blue-500">Departments</a>
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

            {/* Hero with Image */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={deptInfo.image} alt="Men's Fellowship" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-blue-800/70" />
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
                                <FaUserPlus /> Join Fellowship
                            </button>
                            <Link href="/AG/mens-department/learn-more">
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

            {/* Tabs */}
            <section className="bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: FaHome },
                            { id: 'members', label: 'Members', icon: FaUsers },
                            { id: 'events', label: 'Events', icon: FaCalendarAlt },
                            { id: 'activities', label: 'Activities', icon: FaBullseye }
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

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
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

                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Leader</h2>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <img src={leader.image} alt={leader.name} className="w-full md:w-64 h-64 object-cover rounded-xl" />
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
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                        <motion.div key="events" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                        <div className="flex gap-6 flex-wrap">
                                            <div className="bg-linear-to-br from-blue-600 to-blue-800 text-white w-20 h-20 rounded-lg flex flex-col items-center justify-center shrink-0">
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
                        <motion.div key="activities" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowJoinModal(false)}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8">
                            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">Join Men's Fellowship</h2>
                                        <p className="text-blue-100">Fill out the form below to become a member</p>
                                    </div>
                                    <button onClick={() => setShowJoinModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaUser className="text-blue-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="your.email@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="+234 800 000 0000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status *</label>
                                            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                                <option value="">Select status</option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                                <option value="widowed">Widowed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation *</label>
                                            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Your occupation" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address *</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your full address" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaPhone className="text-blue-600" />
                                        Emergency Contact
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                                            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Name of emergency contact" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone *</label>
                                            <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="+234 800 000 0000" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaBriefcase className="text-blue-600" />
                                        Ministry Interests
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {interestOptions.map((interest) => (
                                                    <label key={interest} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.interests.includes(interest) ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}>
                                                        <input type="checkbox" checked={formData.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} className="text-blue-600 rounded" />
                                                        <span className="text-sm font-medium text-gray-700">{interest}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about us? *</label>
                                            <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
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
                                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Tell us more about yourself or any questions you have..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <button type="button" onClick={() => setShowJoinModal(false)} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
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
                    <p className="text-sm">&copy; 2025 Assemblies of God Church - Men's Fellowship. All rights reserved.</p>
                    <p className="text-blue-400 font-semibold mt-2">Building Strong Men of Faith</p>
                </div>
            </footer>
        </div>
    );
};

export default MensDepartmentPage;