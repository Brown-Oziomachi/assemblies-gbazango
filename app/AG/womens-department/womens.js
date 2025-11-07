"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Phone, Mail, MapPin, Clock, Heart, BookOpen, Award, TrendingUp, UserPlus, Search, ChevronRight, Star, Target, MessageCircle, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const WomensDepartmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('members');

    // Firebase integration
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const membersQuery = query(collection(db, "members"), where("department", "==", "womens"));
    //     const leaderQuery = query(collection(db, "leaders"), where("department", "==", "womens"));
    //     const eventsQuery = query(collection(db, "events"), where("department", "==", "womens"));
    //     // Fetch and set data...
    //   };
    //   fetchData();
    // }, []);

    const deptInfo = {
        name: "Women's Fellowship",
        tagline: "Empowering Women in Faith and Purpose",
        description: "A community of women growing together in faith, supporting one another, and making a difference in our families and communities.",
        icon: '👩',
        gradient: 'from-pink-600 to-pink-700',
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
        { id: 1, name: 'Grace Adeleke', email: 'grace.a@gmail.com', phone: '0701-234-5678', joinDate: '2023-02-10', role: 'Prayer Coordinator', attendance: 96, status: 'Active' },
        { id: 2, name: 'Sarah Ibrahim', email: 'sarah.i@gmail.com', phone: '0805-123-4567', joinDate: '2023-05-20', role: 'Member', attendance: 89, status: 'Active' },
        { id: 3, name: 'Blessing Okonkwo', email: 'blessing.o@gmail.com', phone: '0803-987-6543', joinDate: '2022-08-15', role: 'Choir Member', attendance: 94, status: 'Active' },
        { id: 4, name: 'Faith Okoro', email: 'faith.o@gmail.com', phone: '0809-555-6666', joinDate: '2024-01-12', role: 'Youth Leader', attendance: 91, status: 'Active' },
        { id: 5, name: 'Mercy Johnson', email: 'mercy.j@gmail.com', phone: '0807-222-3333', joinDate: '2023-09-08', role: 'Member', attendance: 87, status: 'Active' },
        { id: 6, name: 'Esther Eze', email: 'esther.e@gmail.com', phone: '0806-111-2222', joinDate: '2022-12-01', role: 'Hospitality Team', attendance: 93, status: 'Active' },
        { id: 7, name: 'Ruth Nnamdi', email: 'ruth.n@gmail.com', phone: '0808-333-4444', joinDate: '2023-07-15', role: 'Worship Team', attendance: 95, status: 'Active' },
        { id: 8, name: 'Hannah Chukwu', email: 'hannah.c@gmail.com', phone: '0805-444-5555', joinDate: '2024-03-22', role: 'Member', attendance: 88, status: 'Active' },
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
            icon: Heart,
            title: 'Weekly Prayer Meeting',
            schedule: 'Every Wednesday, 10:00 AM',
            description: 'Interceding for our families, church, and nation'
        },
        {
            icon: BookOpen,
            title: 'Bible Study Circle',
            schedule: 'Every Thursday, 6:00 PM',
            description: 'Growing deeper in God\'s Word together'
        },
        {
            icon: Sparkles,
            title: 'Craft & Skills Workshop',
            schedule: 'Second Saturday, 2:00 PM',
            description: 'Developing practical skills and entrepreneurship'
        },
        {
            icon: Users,
            title: 'Outreach Ministry',
            schedule: 'Third Sunday, After Service',
            description: 'Serving widows, orphans, and the needy'
        },
    ];

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold text-white">AG</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Assemblies of God</p>
                                <p className="text-xs text-pink-600">{deptInfo.name}</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="/" className="text-gray-600 hover:text-pink-600 font-semibold">Home</a>
                            <a href="/departments" className="text-gray-600 hover:text-pink-600 font-semibold">All Departments</a>
                            <a href="/contact" className="text-gray-600 hover:text-pink-600 font-semibold">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-pink-600 via-pink-700 to-rose-700 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 80 + 40,
                                height: Math.random() * 80 + 40,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="mx-auto w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border-4 border-white/30"
                        >
                            <span className="text-7xl">{deptInfo.icon}</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-6xl font-bold text-white mb-4"
                        >
                            {deptInfo.name}
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-2xl md:text-3xl text-pink-100 font-semibold italic mb-6"
                        >
                            {deptInfo.tagline}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-pink-50 max-w-3xl mx-auto mb-12"
                        >
                            {deptInfo.description}
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            {[
                                { label: 'Total Members', value: stats.totalMembers, icon: Users },
                                { label: 'Active Members', value: stats.activeMembers, icon: CheckCircle },
                                { label: 'Avg Attendance', value: `${stats.avgAttendance}%`, icon: TrendingUp },
                                { label: 'Monthly Growth', value: `+${stats.monthlyGrowth}%`, icon: Award }
                            ].map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <stat.icon className="w-6 h-6 text-pink-200" />
                                        <p className="text-pink-100 text-sm font-semibold">{stat.label}</p>
                                    </div>
                                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </motion.div>
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
                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border-2 border-pink-200">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">{deptInfo.vision}</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-2 border-amber-200">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-700 leading-relaxed">{deptInfo.mission}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Department Leader */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Leader</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-pink-700 mx-auto" />
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                                        <p className="text-xl text-pink-600 font-semibold mb-4">{leader.position}</p>
                                        <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Mail className="w-5 h-5 text-pink-600" />
                                            <a href={`mailto:${leader.email}`} className="hover:text-pink-600">{leader.email}</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Phone className="w-5 h-5 text-pink-600" />
                                            <a href={`tel:${leader.phone}`} className="hover:text-pink-600">{leader.phone}</a>
                                        </div>
                                    </div>

                                    <button className="mt-6 flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                                        <MessageCircle className="w-5 h-5" />
                                        Contact Leader
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        {['members', 'events', 'activities'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${activeTab === tab
                                        ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'members' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                                <h2 className="text-3xl font-bold text-gray-900">Our Members</h2>
                                <div className="relative w-full max-w-md">
                                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-600 focus:ring-2 focus:ring-pink-200"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredMembers.map((member) => (
                                    <motion.div
                                        key={member.id}
                                        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                        className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-pink-400 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.attendance >= 90
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {member.attendance}% Attendance
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-pink-600 font-semibold mb-4">{member.role}</p>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                <span className="truncate">{member.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                <span>{member.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Joined: {member.joinDate}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'events' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
                            <div className="space-y-6">
                                {upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-pink-400 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex gap-6 flex-wrap">
                                            <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white w-24 h-24 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                                <p className="text-gray-600 mb-4">{event.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-pink-600" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-pink-600" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-pink-600" />
                                                        <span>{event.attendees} Expected</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="self-start bg-gradient-to-r from-pink-600 to-pink-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                                                Register
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'activities' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Regular Activities</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {activities.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 hover:border-pink-400 hover:shadow-xl transition-all"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                                            <activity.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                                        <p className="text-pink-600 font-bold text-lg mb-4">{activity.schedule}</p>
                                        <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join Our Sisterhood
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-pink-100 mb-8">
                            Become part of a community of women growing together in faith, purpose, and sisterhood.
                        </motion.p>
                        <motion.button
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all flex items-center gap-2 mx-auto"
                        >
                            <UserPlus className="w-6 h-6" />
                            Join Women's Fellowship
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm">&copy; 2025 Assemblies of God Church - Women's Fellowship. All rights reserved.</p>
                    <p className="text-pink-400 font-semibold mt-2">Empowering Women in Faith and Purpose</p>
                </div>
            </footer>
        </div>
    );
};

export default WomensDepartmentPage;