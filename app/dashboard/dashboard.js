"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Heart, Settings, Menu, Bell, Shield, LogOut, Edit, Trash2, Search, Download, MessageSquare, Send, CheckCircle, Clock, AlertCircle, Upload, Video, Church, FileText, Users, TrendingUp, Eye, X, MapPin, UserPlus, Mail, Phone } from 'lucide-react';

// Firebase imports
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore';

const simulateFirebase = false; // Set to true for demo mode

export default function ChurchAdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // State for all data
    const [announcements, setAnnouncements] = useState([]);
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [leaders, setLeaders] = useState([]);

    const [stats, setStats] = useState({
        totalAnnouncements: 0,
        pendingPrayers: 0,
        unreadMessages: 0,
        upcomingEvents: 0,
        totalSermons: 0,
        visitors: 0
    });

    const departments = [
        { id: 'mens', name: "Men's Fellowship" },
        { id: 'womens', name: "Women's Fellowship" },
        { id: 'youth', name: 'Youth Ministry' },
        { id: 'teens', name: 'Teens Ministry' },
        { id: 'all', name: 'All Departments' }
    ];

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'prayers', label: 'Prayer Requests', icon: Heart },
        { id: 'contact', label: 'Contact Messages', icon: MessageSquare },
        { id: 'events', label: 'Events & Programs', icon: Calendar },
        { id: 'sermons', label: 'Sermons', icon: Video },
        { id: 'leaders', label: 'Leadership', icon: Shield },
        { id: 'departments', label: 'Departments', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ];

    // Fetch all data on mount
    useEffect(() => {
        fetchAllData();
        if (!simulateFirebase) {
            setupRealtimeListeners();
        }
    }, []);

    const setupRealtimeListeners = () => {
        // Real-time listeners for Firebase
        const unsubAnnouncements = onSnapshot(collection(db, 'announcements'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAnnouncements(data);
            updateStats();
        });

        const unsubPrayers = onSnapshot(collection(db, 'prayerRequests'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPrayerRequests(data);
            updateStats();
        });

        const unsubContact = onSnapshot(collection(db, 'contactMessages'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setContactMessages(data);
            updateStats();
        });

        const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(data);
            updateStats();
        });

        return () => {
            unsubAnnouncements();
            unsubPrayers();
            unsubContact();
            unsubEvents();
        };
    };

    const fetchAllData = async () => {
        setLoading(true);
        try {
            if (!simulateFirebase) {
                // Fetch Announcements
                const announcementsSnap = await getDocs(query(collection(db, 'announcements'), orderBy('date', 'desc')));
                setAnnouncements(announcementsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch Prayer Requests
                const prayersSnap = await getDocs(collection(db, 'prayerRequests'));
                setPrayerRequests(prayersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch Contact Messages
                const contactSnap = await getDocs(collection(db, 'contactMessages'));
                setContactMessages(contactSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch Events
                const eventsSnap = await getDocs(collection(db, 'events'));
                setEvents(eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch Sermons
                const sermonsSnap = await getDocs(collection(db, 'sermons'));
                setSermons(sermonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch Leaders
                const leadersSnap = await getDocs(collection(db, 'leaders'));
                setLeaders(leadersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } else {
                // Sample data for demo
                setAnnouncements([
                    { id: 1, title: 'Sunday Service Update', description: 'New service time', category: 'Service', date: '2025-11-15', priority: 'high', views: 234 }
                ]);
                setPrayerRequests([
                    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '08012345678', request: 'Pray for healing', status: 'pending', date: '2025-11-10', urgent: true }
                ]);
                setContactMessages([
                    { id: 1, name: 'Jane Smith', email: 'jane@email.com', phone: '08087654321', message: 'I want to join the church', date: '2025-11-12', status: 'unread' }
                ]);
                setEvents([
                    { id: 1, title: 'Youth Conference', date: '2025-12-15', time: '6:00 PM', location: 'Main Hall', department: 'youth' }
                ]);
                setSermons([
                    { id: 1, title: 'Walking in Faith', preacher: 'Pastor Emmanuel', date: '2025-11-10', scripture: 'Hebrews 11:1' }
                ]);
                setLeaders([
                    { id: 1, name: 'Pastor John Okafor', position: 'Senior Pastor', email: 'pastor@church.com', phone: '08011111111', department: 'all' }
                ]);
            }
            updateStats();
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error loading data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateStats = () => {
        setStats({
            totalAnnouncements: announcements.length,
            pendingPrayers: prayerRequests.filter(p => p.status === 'pending').length,
            unreadMessages: contactMessages.filter(m => m.status === 'unread').length,
            upcomingEvents: events.length,
            totalSermons: sermons.length,
            visitors: contactMessages.length
        });
    };

    // CRUD Operations
    const addAnnouncement = async (data) => {
        try {
            setLoading(true);
            if (!simulateFirebase) {
                await addDoc(collection(db, 'announcements'), {
                    ...data,
                    views: 0,
                    createdAt: Timestamp.now(),
                    author: 'Admin' // Get from auth in production
                });
            } else {
                setAnnouncements([...announcements, { ...data, id: Date.now(), views: 0 }]);
            }
            setModalOpen(null);
            alert('Announcement posted successfully!');
            fetchAllData();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteAnnouncement = async (id) => {
        if (!confirm('Delete this announcement?')) return;
        try {
            if (!simulateFirebase) {
                await deleteDoc(doc(db, 'announcements', id));
            } else {
                setAnnouncements(announcements.filter(a => a.id !== id));
            }
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const updatePrayerStatus = async (id, status) => {
        try {
            if (!simulateFirebase) {
                await updateDoc(doc(db, 'prayerRequests', id), { status });
            } else {
                setPrayerRequests(prayerRequests.map(p => p.id === id ? { ...p, status } : p));
            }
            alert(`Prayer marked as ${status}!`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const updateMessageStatus = async (id, status) => {
        try {
            if (!simulateFirebase) {
                await updateDoc(doc(db, 'contactMessages', id), { status });
            } else {
                setContactMessages(contactMessages.map(m => m.id === id ? { ...m, status } : m));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const addEvent = async (data) => {
        try {
            setLoading(true);
            if (!simulateFirebase) {
                await addDoc(collection(db, 'events'), {
                    ...data,
                    createdAt: Timestamp.now()
                });
            } else {
                setEvents([...events, { ...data, id: Date.now() }]);
            }
            setModalOpen(null);
            alert('Event created successfully!');
            fetchAllData();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addSermon = async (data) => {
        try {
            setLoading(true);
            if (!simulateFirebase) {
                await addDoc(collection(db, 'sermons'), {
                    ...data,
                    date: new Date().toISOString().split('T')[0],
                    createdAt: Timestamp.now()
                });
            } else {
                setSermons([...sermons, { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
            }
            setModalOpen(null);
            alert('Sermon uploaded successfully!');
            fetchAllData();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addLeader = async (data) => {
        try {
            setLoading(true);
            if (!simulateFirebase) {
                await addDoc(collection(db, 'leaders'), {
                    ...data,
                    createdAt: Timestamp.now()
                });
            } else {
                setLeaders([...leaders, { ...data, id: Date.now() }]);
            }
            setModalOpen(null);
            alert('Leader added successfully!');
            fetchAllData();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Dashboard View
    const DashboardView = () => (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: '#8B6914' }}>Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #B8860B' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Announcements</p>
                            <h3 className="text-4xl font-bold mt-2" style={{ color: '#B8860B' }}>{stats.totalAnnouncements}</h3>
                        </div>
                        <Bell className="w-12 h-12" style={{ color: '#DAA520' }} />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #9370DB' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Pending Prayers</p>
                            <h3 className="text-4xl font-bold mt-2 text-purple-600">{stats.pendingPrayers}</h3>
                        </div>
                        <Heart className="w-12 h-12 text-purple-400" />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #4169E1' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Unread Messages</p>
                            <h3 className="text-4xl font-bold mt-2 text-blue-600">{stats.unreadMessages}</h3>
                        </div>
                        <MessageSquare className="w-12 h-12 text-blue-400" />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #32CD32' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Upcoming Events</p>
                            <h3 className="text-4xl font-bold mt-2 text-green-600">{stats.upcomingEvents}</h3>
                        </div>
                        <Calendar className="w-12 h-12 text-green-400" />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #DC143C' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Sermons</p>
                            <h3 className="text-4xl font-bold mt-2 text-red-600">{stats.totalSermons}</h3>
                        </div>
                        <Video className="w-12 h-12 text-red-400" />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md" style={{ borderLeft: '4px solid #FF8C00' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Visitors</p>
                            <h3 className="text-4xl font-bold mt-2 text-orange-600">{stats.visitors}</h3>
                        </div>
                        <UserPlus className="w-12 h-12 text-orange-400" />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#8B6914' }}>Recent Prayer Requests</h2>
                    <div className="space-y-3">
                        {prayerRequests.slice(0, 5).map(prayer => (
                            <div key={prayer.id} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                <Heart className="w-5 h-5 text-purple-600 mt-1" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{prayer.name}</p>
                                    <p className="text-sm text-gray-600 line-clamp-1">{prayer.request}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${prayer.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>{prayer.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#8B6914' }}>Recent Contact Messages</h2>
                    <div className="space-y-3">
                        {contactMessages.slice(0, 5).map(msg => (
                            <div key={msg.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{msg.name}</p>
                                    <p className="text-sm text-gray-600 line-clamp-1">{msg.message}</p>
                                    <p className="text-xs text-gray-500">{msg.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Announcements View
    const AnnouncementsView = () => {
        const [formData, setFormData] = useState({
            title: '', description: '', fullContent: '', category: 'Service',
            date: new Date().toISOString().split('T')[0], time: '09:00 AM',
            location: 'Main Sanctuary', priority: 'medium',
            image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800'
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold" style={{ color: '#8B6914' }}>Announcements</h1>
                    <button onClick={() => setModalOpen('addAnnouncement')}
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold"
                        style={{ background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' }}>
                        <Bell className="w-4 h-4" /> Post Announcement
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map(announcement => (
                        <div key={announcement.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 relative">
                                {announcement.image && (
                                    <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover" />
                                )}
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                    style={{ background: announcement.priority === 'high' ? '#DC2626' : announcement.priority === 'medium' ? '#F59E0B' : '#10B981' }}>
                                    {announcement.priority.toUpperCase()}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{announcement.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{announcement.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>{announcement.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Eye size={16} /> {announcement.views || 0}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => deleteAnnouncement(announcement.id)}
                                        className="flex-1 bg-red-100 text-red-800 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                        <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Announcement Modal */}
                {modalOpen === 'addAnnouncement' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 text-white p-6 rounded-t-xl" style={{ background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' }}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Post New Announcement</h3>
                                    <button onClick={() => setModalOpen(null)} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addAnnouncement(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                                    <input type="text" required value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                                    <textarea required value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="2" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Content *</label>
                                    <textarea required value={formData.fullContent}
                                        onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                                        rows="5" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                        <select required value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                                            <option value="Service">Service</option>
                                            <option value="Event">Event</option>
                                            <option value="Prayer">Prayer</option>
                                            <option value="Ministry">Ministry</option>
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority *</label>
                                        <select required value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                                        <input type="date" required value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                                        <input type="text" required value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                                    <input type="text" required value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                    <input type="url" value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="flex-1 text-white py-3 rounded-lg font-bold"
                                        style={{ background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' }}>
                                        Post Announcement
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };
}