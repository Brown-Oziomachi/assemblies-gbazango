"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Heart, Menu, Bell, LogOut, Trash2, Search, Video, Church, Users, Eye, X, MapPin, UserPlus, Mail, Phone, MessageSquare, CheckCircle, Clock, Send, Megaphone } from 'lucide-react';

// Firebase imports
import { db,auth } from '@/lib/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, Timestamp, query, orderBy, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function ChurchAdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // State for all data
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [membershipRequests, setMembershipRequests] = useState([]);    
    const [announcements, setAnnouncements] = useState([]);

    const [stats, setStats] = useState({
        pendingPrayers: 0,
        unreadMessages: 0,
        upcomingEvents: 0,
        totalSermons: 0,
        newRegistrations: 0,
        activeAnnouncements: 0
    });

    const departments = [
        { id: 'all', name: 'All Departments', icon: '🏛️' },
        { id: 'mens', name: "Men's Fellowship", icon: '👨' },
        { id: 'womens', name: "Women's Fellowship", icon: '👩' },
        { id: 'youth', name: 'Youth Ministry', icon: '🎯' },
        { id: 'teens', name: 'Teens Ministry', icon: '🎮' }
    ];

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'prayers', label: 'Prayer Requests', icon: Heart },
        { id: 'contact', label: 'Contact Messages', icon: MessageSquare },
        { id: 'events', label: 'Events & Programs', icon: Calendar },
        { id: 'sermons', label: 'Sermons', icon: Video },
        { id: 'departments', label: 'Department Registrations', icon: Users },
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
    ];

       const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await signOut(auth);
                window.location.href = '/admin/login';
            } catch (error) {
                alert('Error logging out: ' + error.message);
            }
        }
    };

    // Setup real-time listeners
    useEffect(() => {
        const unsubscribers = [];

        // Prayer Requests listener
        const prayerQuery = query(collection(db, 'prayerRequests'), orderBy('createdAt', 'desc'));
        unsubscribers.push(
            onSnapshot(prayerQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate?.() || new Date()
                }));
                setPrayerRequests(data);
            }, (error) => {
                console.error('Error fetching prayer requests:', error);
            })
        );

        // Contact Messages listener
        const contactQuery = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
        unsubscribers.push(
            onSnapshot(contactQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate?.() || new Date()
                }));
                setContactMessages(data);
            }, (error) => {
                console.error('Error fetching contact messages:', error);
            })
        );

        // Events listener
        const eventsQuery = query(collection(db, 'events'), orderBy('date', 'asc'));
        unsubscribers.push(
            onSnapshot(eventsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEvents(data);
            }, (error) => {
                console.error('Error fetching events:', error);
            })
        );

        // Sermons listener
        const sermonsQuery = query(collection(db, 'sermons'), orderBy('date', 'desc'));
        unsubscribers.push(
            onSnapshot(sermonsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSermons(data);
            }, (error) => {
                console.error('Error fetching sermons:', error);
            })
        );

     // Department Registrations listener
        const regQuery = query(collection(db, 'membershipRequests'),
        orderBy('submittedAt', 'desc')); // Changed from 'createdAt' to 'submittedAt'

        unsubscribers.push(
            onSnapshot(regQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();
                    return { 
                        id: doc.id, 
                        ...docData,
                        name: docData.fullName || docData.name, // Map fullName to name
                        department: docData.departmentId || docData.department, // Map departmentId to department
                        createdAt: docData.submittedAt ? new Date(docData.submittedAt) : (docData.createdAt?.toDate?.() || new Date())
                    };
                });
                setMembershipRequests(data);
            }, (error) => {
                console.error('Error fetching registrations:', error);
            })
        );

        // Announcements listener
        const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        unsubscribers.push(
            onSnapshot(announcementsQuery, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate?.() || new Date()
                }));
                setAnnouncements(data);
            }, (error) => {
                console.error('Error fetching announcements:', error);
            })
        );

        return () => {
            unsubscribers.forEach(unsub => unsub());
        };
    }, []);

    // Update stats whenever data changes
    useEffect(() => {
        setStats({
            pendingPrayers: prayerRequests.filter(p => p.status === 'pending').length,
            unreadMessages: contactMessages.filter(m => m.status === 'unread').length,
            upcomingEvents: events.filter(e => new Date(e.date) >= new Date()).length,
            totalSermons: sermons.length,
            newRegistrations: membershipRequests.filter(r => r.status === 'pending').length,
            activeAnnouncements: announcements.filter(a => a.status === 'active').length
        });
    }, [prayerRequests, contactMessages, events, sermons, membershipRequests, announcements]);

   const getDepartmentName = (deptId) => {
    // Handle both formats: "youth" and "Youth Ministry"
    const dept = departments.find(d => 
        d.id === deptId || 
        d.name.toLowerCase() === deptId.toLowerCase()
    );
    return dept ? dept.name : deptId;
};

    // Prayer Request Operations
    const updatePrayerStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'prayerRequests', id), { 
                status,
                updatedAt: Timestamp.now()
            });
            alert(`Prayer marked as ${status}!`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const deletePrayerRequest = async (id) => {
        if (!confirm('Delete this prayer request?')) return;
        try {
            await deleteDoc(doc(db, 'prayerRequests', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Contact Message Operations
    const updateMessageStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'contactMessages', id), { 
                status,
                readAt: status === 'read' ? Timestamp.now() : null
            });
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const deleteContactMessage = async (id) => {
        if (!confirm('Delete this message?')) return;
        try {
            await deleteDoc(doc(db, 'contactMessages', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Event Operations
    const addEvent = async (data) => {
        try {
            setLoading(true);
            await addDoc(collection(db, 'events'), {
                ...data,
                createdAt: Timestamp.now()
            });
            setModalOpen(null);
            alert('Event created successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        if (!confirm('Delete this event?')) return;
        try {
            await deleteDoc(doc(db, 'events', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Sermon Operations
    const addSermon = async (data) => {
        try {
            setLoading(true);
            await addDoc(collection(db, 'sermons'), {
                ...data,
                date: new Date().toISOString().split('T')[0],
                createdAt: Timestamp.now()
            });
            setModalOpen(null);
            alert('Sermon uploaded successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteSermon = async (id) => {
        if (!confirm('Delete this sermon?')) return;
        try {
            await deleteDoc(doc(db, 'sermons', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Department Registration Operations
    const updateRegistrationStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'membershipRequests', id), { 
                status,
                processedAt: Timestamp.now()
            });
            alert(`Registration ${status}!`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const deleteRegistration = async (id) => {
        if (!confirm('Delete this registration?')) return;
        try {
            await deleteDoc(doc(db, 'membershipRequests', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Announcement Operations
    const addAnnouncement = async (data) => {
        try {
            setLoading(true);
            await addDoc(collection(db, 'announcements'), {
                ...data,
                status: 'active',
                createdAt: Timestamp.now()
            });
            setModalOpen(null);
            alert('Announcement created and notification sent!');
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateAnnouncementStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'announcements', id), { 
                status,
                updatedAt: Timestamp.now()
            });
            alert(`Announcement ${status}!`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const deleteAnnouncement = async (id) => {
        if (!confirm('Delete this announcement?')) return;
        try {
            await deleteDoc(doc(db, 'announcements', id));
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Dashboard View
 const DashboardView = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold text-yellow-800">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Pending Prayers</p>
                        <h3 className="text-4xl font-bold mt-2 text-purple-600">{stats.pendingPrayers}</h3>
                    </div>
                    <Heart className="w-12 h-12 text-purple-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Unread Messages</p>
                        <h3 className="text-4xl font-bold mt-2 text-blue-600">{stats.unreadMessages}</h3>
                    </div>
                    <MessageSquare className="w-12 h-12 text-blue-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Upcoming Events</p>
                        <h3 className="text-4xl font-bold mt-2 text-green-600">{stats.upcomingEvents}</h3>
                    </div>
                    <Calendar className="w-12 h-12 text-green-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Sermons</p>
                        <h3 className="text-4xl font-bold mt-2 text-red-600">{stats.totalSermons}</h3>
                    </div>
                    <Video className="w-12 h-12 text-red-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">New Registrations</p>
                        <h3 className="text-4xl font-bold mt-2 text-orange-600">{stats.newRegistrations}</h3>
                    </div>
                    <UserPlus className="w-12 h-12 text-orange-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-600">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Members</p>
                        <h3 className="text-4xl font-bold mt-2 text-yellow-800">{membershipRequests.filter(r => r.status === 'approved').length}</h3>
                    </div>
                    <Users className="w-12 h-12 text-yellow-600" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-yellow-800">Recent Prayer Requests</h2>
                <div className="space-y-3">
                    {prayerRequests.slice(0, 5).map(prayer => (
                        <div key={prayer.id} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer"
                            onClick={() => setActiveSection('prayers')}>
                            <Heart className="w-5 h-5 text-purple-600 mt-1" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{prayer.name}</p>
                                <p className="text-sm text-gray-600 line-clamp-1">{prayer.request}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        prayer.status === 'answered' ? 'bg-green-100 text-green-800' : 
                                        prayer.status === 'praying' ? 'bg-blue-100 text-blue-800' :
                                        'bg-amber-100 text-amber-800'
                                    }`}>{prayer.status}</span>
                                    {prayer.urgent && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Urgent</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-yellow-800">Recent Contact Messages</h2>
                <div className="space-y-3">
                    {contactMessages.slice(0, 5).map(msg => (
                        <div key={msg.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
                            onClick={() => setActiveSection('contact')}>
                            <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-gray-900">{msg.name}</p>
                                    {msg.status === 'unread' && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1">{msg.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{msg.createdAt?.toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           <div className="bg-white rounded-xl p-6 shadow-md">
    <h2 className="text-xl font-bold mb-4 text-yellow-800">Recent Department Registrations</h2>
    <div className="space-y-3">
        {membershipRequests.length === 0 ? (
            <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No registrations yet</p>
            </div>
        ) : (
            membershipRequests.slice(0, 5).map(reg => (
                <div key={reg.id} className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all border border-orange-100">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-orange-600" />
                            <h3 className="font-bold text-gray-900">{reg.fullName || reg.name}</h3>
                        </div>
                        {reg.status === 'pending' && (
                            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                        )}
                    </div>
                    
                    <div className="ml-7 space-y-1">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                reg.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-orange-100 text-orange-800'
                            }`}>
                                {reg.status?.toUpperCase()}
                            </span>
                            <span className="text-sm font-semibold text-orange-700">
                                {reg.department || getDepartmentName(reg.departmentId)}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-1 text-xs text-gray-600 mt-2">
                            <div className="flex items-center gap-1">
                                <Mail size={12} className="text-gray-400" />
                                <span>{reg.email}</span>
                            </div>
                            
                            {reg.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone size={12} className="text-gray-400" />
                                    <span>{reg.phone}</span>
                                </div>
                            )}
                            
                            {reg.dateOfBirth && (
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} className="text-gray-400" />
                                    <span>DOB: {new Date(reg.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                            )}
                            
                            {reg.submittedAt && (
                                <div className="flex items-center gap-1">
                                    <Clock size={12} className="text-gray-400" />
                                    <span>Submitted: {new Date(reg.submittedAt).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                        
                        <button
                            onClick={() => setActiveSection('departments')}
                            className="mt-2 text-xs text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-1"
                        >
                            View Details →
                        </button>
                    </div>
                </div>
            ))
        )}
    </div>
    
    {membershipRequests.length > 5 && (
        <button
            onClick={() => setActiveSection('departments')}
            className="mt-4 w-full text-center text-sm text-orange-600 hover:text-orange-800 font-semibold py-2 border border-orange-200 rounded-lg hover:bg-orange-50"
        >
            View All {membershipRequests.length} Registrations →
        </button>
    )}
</div>
        </div>
    </div>
);

    // Prayer Requests View
    const PrayersView = () => {
        const filteredPrayers = prayerRequests.filter(p => 
            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.request?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-800">Prayer Requests ({prayerRequests.length})</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search prayers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-64"
                        />
                    </div>
                </div>

                {prayerRequests.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No prayer requests yet</p>
                        <p className="text-gray-400 text-sm mt-2">Prayer requests from your church website will appear here</p>
                    </div>
                ) : filteredPrayers.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No prayers match your search</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredPrayers.map(prayer => (
                        <div key={prayer.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{prayer.name}</h3>
                                        {prayer.urgent && (
                                            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold">
                                                URGENT
                                            </span>
                                        )}
                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                            prayer.status === 'answered' ? 'bg-green-100 text-green-800' : 
                                            prayer.status === 'praying' ? 'bg-blue-100 text-blue-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                            {prayer.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-3">{prayer.prayerRequest}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Mail size={16} /> {prayer.email}
                                        </span>
                                        {prayer.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone size={16} /> {prayer.phone}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} /> {prayer.createdAt?.toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    {prayer.status === 'pending' && (
                                        <button onClick={() => updatePrayerStatus(prayer.id, 'praying')}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold whitespace-nowrap">
                                            Mark as Praying
                                        </button>
                                    )}
                                    {prayer.status === 'praying' && (
                                        <button onClick={() => updatePrayerStatus(prayer.id, 'answered')}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm font-semibold whitespace-nowrap">
                                            Mark as Answered
                                        </button>
                                    )}
                                    <button onClick={() => deletePrayerRequest(prayer.id)}
                                        className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                        <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                                            ))}
                    </div>
                )}
            </div>
        );
    };

    // Contact Messages View
    const ContactView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-yellow-800">Contact Messages</h1>
                <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg w-64"
                />
            </div>

            {contactMessages.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-md">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No contact messages yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {contactMessages
                        .filter(m => m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    m.message?.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(msg => (
                        <div key={msg.id} className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${
                            msg.status === 'unread' ? 'border-l-4 border-blue-500' : ''
                        }`}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{msg.name}</h3>
                                        {msg.status === 'unread' && (
                                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 mb-3">{msg.message}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Mail size={16} /> {msg.email}
                                        </span>
                                        {msg.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone size={16} /> {msg.phone}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} /> {msg.createdAt?.toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    {msg.status === 'unread' && (
                                        <button onClick={() => updateMessageStatus(msg.id, 'read')}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold whitespace-nowrap">
                                            <CheckCircle className="w-4 h-4 inline mr-1" /> Mark as Read
                                        </button>
                                    )}
                                    <button onClick={() => deleteContactMessage(msg.id)}
                                        className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                        <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Events View
    const EventsView = () => {
        const [formData, setFormData] = useState({
            title: '', description: '', date: '', time: '', location: '', 
            department: 'all', image: ''
        });

        const handleSubmit = () => {
            if (!formData.title || !formData.date || !formData.time || !formData.location) {
                alert('Please fill all required fields');
                return;
            }
            addEvent(formData);
            setFormData({ title: '', description: '', date: '', time: '', location: '', department: 'all', image: '' });
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-800">Events & Programs</h1>
                    <button onClick={() => setModalOpen('addEvent')}
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900">
                        <Calendar className="w-4 h-4" /> Create Event
                    </button>
                </div>

                {events.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No events yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
                                    {event.image && (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-green-700">
                                        {event.date}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} /> {event.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} /> {event.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} /> {getDepartmentName(event.department)}
                                        </div>
                                    </div>
                                    <button onClick={() => deleteEvent(event.id)}
                                        className="w-full bg-red-100 text-red-800 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                        <Trash2 className="w-4 h-4 inline mr-1" /> Delete Event
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {modalOpen === 'addEvent' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-yellow-800">Create New Event</h2>
                                <button onClick={() => setModalOpen(null)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Event Title*"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg h-32"
                                />
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    placeholder="Location*"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg">
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.icon} {dept.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="url"
                                    placeholder="Image URL (optional)"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-900 disabled:opacity-50">
                                    {loading ? 'Creating...' : 'Create Event'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Sermons View
    const SermonsView = () => {
        const [formData, setFormData] = useState({ 
            title: '', 
            preacher: '', 
            videoUrl: '',
            category: 'Sunday Service',
            description: ''
        });

        const handleSubmit = () => {
            if (!formData.title || !formData.preacher || !formData.videoUrl) {
                alert('Please fill all required fields');
                return;
            }
            addSermon(formData);
            setFormData({ 
                title: '', 
                preacher: '', 
                videoUrl: '',
                category: 'Sunday Service',
                description: ''
            });
        };

        const categories = ['Sunday Service', 'Wednesday Service', 'Special Event', 'Bible Study', 'Youth Service'];

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-800">Sermons ({sermons.length})</h1>
                    <button onClick={() => setModalOpen('addSermon')}
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900">
                        <Video className="w-4 h-4" /> Upload Sermon
                    </button>
                </div>

                {sermons.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md">
                        <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No sermons yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sermons.map(sermon => (
                            <div key={sermon.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                                    <Video className="w-16 h-16 text-white" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h3>
                                    <p className="text-gray-600 mb-2">by {sermon.preacher}</p>
                                    <p className="text-sm text-gray-500 mb-2">{sermon.date}</p>
                                    {sermon.category && (
                                        <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-4">
                                            {sermon.category}
                                        </span>
                                    )}
                                    {sermon.description && (
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{sermon.description}</p>
                                    )}
                                    <div className="space-y-2">
                                        <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer"
                                            className="block w-full bg-blue-500 text-white text-center px-3 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold">
                                            <Video className="w-4 h-4 inline mr-1" /> Watch Sermon
                                        </a>
                                        <button onClick={() => deleteSermon(sermon.id)}
                                            className="w-full bg-red-100 text-red-800 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                            <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {modalOpen === 'addSermon' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-yellow-800">Upload New Sermon</h2>
                                <button onClick={() => setModalOpen(null)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sermon Title*
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Walking in Faith"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Preacher Name*
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Pastor James"
                                        value={formData.preacher}
                                        onChange={(e) => setFormData({...formData, preacher: e.target.value})}
                                        className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Video URL* (YouTube, Facebook, Vimeo, or Direct Link)
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://www.youtube.com/watch?v=... or https://fb.watch/..."
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                                        className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        ✓ YouTube • ✓ Facebook • ✓ Vimeo • ✓ Direct video links
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category*
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none">
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Brief description of the sermon..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg h-24 focus:border-yellow-600 focus:outline-none"
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">📹 Supported Video Platforms:</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• <strong>YouTube:</strong> https://www.youtube.com/watch?v=VIDEO_ID</li>
                                        <li>• <strong>Facebook:</strong> https://www.facebook.com/video/VIDEO_ID or fb.watch/...</li>
                                        <li>• <strong>Vimeo:</strong> https://vimeo.com/VIDEO_ID</li>
                                        <li>• <strong>Direct:</strong> https://example.com/video.mp4</li>
                                    </ul>
                                </div>

                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? 'Uploading...' : 'Upload Sermon'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

// Departments View
const DepartmentsView = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-yellow-800">Department Registrations ({membershipRequests.length})</h1>
            <input
                type="text"
                placeholder="Search registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg w-64"
            />
        </div>

        {membershipRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No registrations yet</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                {membershipRequests
                    .filter(r => {
                        const searchLower = searchTerm.toLowerCase();
                        const fullName = r.fullName || r.name || '';
                        const department = r.department || getDepartmentName(r.departmentId) || '';
                        return fullName.toLowerCase().includes(searchLower) || 
                               department.toLowerCase().includes(searchLower) ||
                               r.email?.toLowerCase().includes(searchLower);
                    })
                    .map(reg => (
                    <div key={reg.id} className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${
                        reg.status === 'pending' ? 'border-l-4 border-orange-500' : ''
                    }`}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{reg.fullName || reg.name}</h3>
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                        reg.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                        reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-orange-100 text-orange-800'
                                    }`}>
                                        {reg.status?.toUpperCase()}
                                    </span>
                                </div>
                                
                                <p className="text-lg text-orange-700 mb-3 font-semibold">
                                    {reg.department || getDepartmentName(reg.departmentId)}
                                </p>
                                
                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-700 text-sm">Contact Information</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>{reg.email}</span>
                                        </div>
                                        {reg.phone && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={16} className="text-gray-400" />
                                                <span>{reg.phone}</span>
                                            </div>
                                        )}
                                        {reg.address && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin size={16} className="text-gray-400" />
                                                <span>{reg.address}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-700 text-sm">Personal Information</h4>
                                        {reg.dateOfBirth && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar size={16} className="text-gray-400" />
                                                <span>DOB: {new Date(reg.dateOfBirth).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {reg.educationLevel && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users size={16} className="text-gray-400" />
                                                <span>Education: {reg.educationLevel}</span>
                                            </div>
                                        )}
                                        {reg.submittedAt && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock size={16} className="text-gray-400" />
                                                <span>Submitted: {new Date(reg.submittedAt).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Emergency Contact */}
                                {(reg.emergencyContact || reg.emergencyPhone) && (
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 text-sm mb-2">Emergency Contact</h4>
                                        <div className="space-y-1">
                                            {reg.emergencyContact && (
                                                <p className="text-sm text-gray-600">Name: {reg.emergencyContact}</p>
                                            )}
                                            {reg.emergencyPhone && (
                                                <p className="text-sm text-gray-600">Phone: {reg.emergencyPhone}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Interests */}
                                {reg.interests && reg.interests.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 text-sm mb-2">Interests</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {reg.interests.map((interest, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Additional Info */}
                                {reg.hearAboutUs && (
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold">Heard about us:</span> {reg.hearAboutUs}
                                    </div>
                                )}
                                
                                {reg.message && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 text-sm mb-1">Message</h4>
                                        <p className="text-sm text-gray-600">{reg.message}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-2 ml-4">
                                {reg.status === 'pending' && (
                                    <>
                                        <button onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm font-semibold whitespace-nowrap">
                                            <CheckCircle className="w-4 h-4 inline mr-1" /> Approve
                                        </button>
                                        <button onClick={() => updateRegistrationStatus(reg.id, 'rejected')}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm font-semibold whitespace-nowrap">
                                            <X className="w-4 h-4 inline mr-1" /> Reject
                                        </button>
                                    </>
                                )}
                                <button onClick={() => deleteRegistration(reg.id)}
                                    className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                    <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

    // Announcements View
    const AnnouncementsView = () => {
        const [formData, setFormData] = useState({ 
            title: '', 
            message: '', 
            priority: 'normal',
            targetAudience: 'all'
        });

        const handleSubmit = () => {
            if (!formData.title || !formData.message) {
                alert('Please fill all required fields');
                return;
            }
            addAnnouncement(formData);
            setFormData({ title: '', message: '', priority: 'normal', targetAudience: 'all' });
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-yellow-800">Announcements</h1>
                    <button onClick={() => setModalOpen('addAnnouncement')}
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900">
                        <Megaphone className="w-4 h-4" /> Create Announcement
                    </button>
                </div>

                {announcements.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-md">
                        <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No announcements yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {announcements.map(announcement => (
                            <div key={announcement.id} className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${
                                announcement.priority === 'urgent' ? 'border-l-4 border-red-500' :
                                announcement.priority === 'high' ? 'border-l-4 border-orange-500' :
                                'border-l-4 border-blue-500'
                            }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Megaphone className={`w-6 h-6 ${
                                                announcement.priority === 'urgent' ? 'text-red-500' :
                                                announcement.priority === 'high' ? 'text-orange-500' :
                                                'text-blue-500'
                                            }`} />
                                            <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                                announcement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {announcement.priority}
                                            </span>
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                announcement.status === 'active' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {announcement.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-3">{announcement.message}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Users size={16} /> {getDepartmentName(announcement.targetAudience)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={16} /> {announcement.createdAt?.toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 ml-4">
                                        {announcement.status === 'active' && (
                                            <button onClick={() => updateAnnouncementStatus(announcement.id, 'archived')}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm font-semibold whitespace-nowrap">
                                                Archive
                                            </button>
                                        )}
                                        {announcement.status === 'archived' && (
                                            <button onClick={() => updateAnnouncementStatus(announcement.id, 'active')}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm font-semibold whitespace-nowrap">
                                                Activate
                                            </button>
                                        )}
                                        <button onClick={() => deleteAnnouncement(announcement.id)}
                                            className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 text-sm font-semibold">
                                            <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {modalOpen === 'addAnnouncement' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-yellow-800">Create Announcement</h2>
                                <button onClick={() => setModalOpen(null)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Announcement Title*"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg"
                                />
                                <textarea
                                    placeholder="Announcement Message*"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg h-32"
                                />
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg">
                                    <option value="normal">Normal Priority</option>
                                    <option value="high">High Priority</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <select
                                    value={formData.targetAudience}
                                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                                    className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-lg">
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.icon} {dept.name}</option>
                                    ))}
                                </select>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-900 disabled:opacity-50">
                                    {loading ? 'Creating...' : 'Create & Send Announcement'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'dashboard': return <DashboardView />;
            case 'prayers': return <PrayersView />;
            case 'contact': return <ContactView />;
            case 'events': return <EventsView />;
            case 'sermons': return <SermonsView />;
            case 'departments': return <DepartmentsView />;
            case 'announcements': return <AnnouncementsView />;
            default: return <DashboardView />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-yellow-800 to-yellow-900 text-white transition-all duration-300 z-40 ${
                sidebarOpen ? 'w-64' : 'w-20'
            }`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                                <img
                                    src="/logo.png"
                                    alt="AG Church"
                                    className="w-20 h-20"
                                />                        
                                {sidebarOpen && <h1 className="text-xl font-bold">Church Admin</h1>}
                    </div>
                    
                    <nav className="space-y-2">
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive 
                                            ? 'bg-white text-yellow-800 font-semibold' 
                                            : 'hover:bg-yellow-700 text-white'
                                    }`}>
                                    <Icon className="w-5 h-5" />
                                    {sidebarOpen && <span>{item.label}</span>}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-8 bg-white text-yellow-800 rounded-full p-2 shadow-lg hover:bg-gray-100">
                    <Menu size={20} />
                </button>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30">
                    <h2 className="text-xl font-bold text-gray-800">
                        {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                            <Bell className="w-6 h-6 text-gray-600" />
                            {(stats.pendingPrayers + stats.unreadMessages + stats.newRegistrations) > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {stats.pendingPrayers + stats.unreadMessages + stats.newRegistrations}
                                </span>
                            )}
                        </button>
                       <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8">
                    {renderActiveSection()}
                </div>
            </main>
        </div>
    );
}