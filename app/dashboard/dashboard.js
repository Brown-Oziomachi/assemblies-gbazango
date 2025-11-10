"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, DollarSign, BookOpen, TrendingUp, UserPlus, Heart, Settings, Menu, X, Church, FileText, Bell, Shield, LogOut, Edit, Trash2, Search, Filter, Download, MessageSquare, Send, CheckCircle, Clock, AlertCircle, Upload, Image as ImageIcon, Video } from 'lucide-react';

// Firebase imports - UNCOMMENT THESE IN YOUR ACTUAL PROJECT
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where, updateDoc, onSnapshot, Timestamp } from 'firebase/firestore';

// For this demo, we'll simulate Firebase
const simulateFirebase = true; // Set to false when you integrate real Firebase

export default function ChurchDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [loading, setLoading] = useState(false);

    // Real-time stats from Firebase
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        newMembers: 0,
        weeklyAttendance: 0,
        monthlyOffering: 0,
        pledges: 0,
        departments: 4,
        events: 0,
        prayerRequests: 0,
        visitors: 0,
        sermons: 0
    });

    // Firebase collections state
    const [members, setMembers] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [events, setEvents] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [reports, setReports] = useState([]);
    const [departmentForms, setDepartmentForms] = useState([]);

    const departments = [
        { id: 'mens', name: "Men's Fellowship", color: 'blue', icon: '👨', gender: 'male' },
        { id: 'womens', name: "Women's Fellowship", color: 'pink', icon: '👩', gender: 'female' },
        { id: 'youth', name: 'Youth Ministry', color: 'green', icon: '🙋', gender: 'all', ageRange: '18-35' },
        { id: 'teens', name: 'Teens Ministry', color: 'purple', icon: '🧒', gender: 'all', ageRange: '13-17' },
    ];

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'members', label: 'Members Management', icon: Users },
        { id: 'leaders', label: 'Leadership', icon: Shield },
        { id: 'departments', label: 'Departments', icon: BookOpen },
        { id: 'events', label: 'Events & Programs', icon: Calendar },
        { id: 'sermons', label: 'Sermons', icon: Video },
        { id: 'prayers', label: 'Prayer Requests', icon: Heart },
        { id: 'visitors', label: 'Visitors', icon: UserPlus },
        { id: 'forms', label: 'Department Forms', icon: FileText },
        { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    // Firebase fetch functions with real-time listeners
    useEffect(() => {
        fetchAllData();
        // Set up real-time listeners for prayer requests and other collections
        setupRealtimeListeners();
    }, []);

    const setupRealtimeListeners = () => {
        if (simulateFirebase) return;

        // Real-time listener for prayer requests
        const unsubscribePrayers = onSnapshot(collection(db, 'prayerRequests'), (snapshot) => {
            const prayersData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    request: data.prayerRequest,
                    status: data.status,
                    date: data.createdAt || new Date(data.timestamp?.seconds * 1000).toISOString().split('T')[0],
                    urgent: data.urgent || false
                };
            });
            setPrayerRequests(prayersData);
            updateStats();
        });

        // Real-time listener for members
        const unsubscribeMembers = onSnapshot(collection(db, 'members'), (snapshot) => {
            const membersData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setMembers(membersData);
            updateStats();
        });

        // Real-time listener for events
        const unsubscribeEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setEvents(eventsData);
            updateStats();
        });

        // Return cleanup function
        return () => {
            unsubscribePrayers();
            unsubscribeMembers();
            unsubscribeEvents();
        };
    };

    const fetchAllData = async () => {
        setLoading(true);
        try {
            if (!simulateFirebase) {
                // REAL FIREBASE FETCHING - Uncomment when ready

                // Fetch Members
                const membersSnap = await getDocs(collection(db, 'members'));
                const membersData = membersSnap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setMembers(membersData);

                // Fetch Events
                const eventsSnap = await getDocs(collection(db, 'events'));
                const eventsData = eventsSnap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setEvents(eventsData);

                // Fetch Sermons
                const sermonsSnap = await getDocs(collection(db, 'sermons'));
                const sermonsData = sermonsSnap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setSermons(sermonsData);

                // Fetch Prayer Requests - MATCHES YOUR FIREBASE STRUCTURE
                const prayersSnap = await getDocs(collection(db, 'prayerRequests'));
                const prayersData = prayersSnap.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        request: data.prayerRequest, // Your Firebase field is 'prayerRequest'
                        status: data.status,
                        date: data.createdAt || new Date(data.timestamp?.seconds * 1000).toISOString().split('T')[0],
                        urgent: data.urgent || false
                    };
                });
                setPrayerRequests(prayersData);

                // Fetch Contact Messages (Visitors)
                const contactSnap = await getDocs(collection(db, 'contactMessages'));
                const visitorsData = contactSnap.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        visitDate: data.createdAt || new Date(data.timestamp?.seconds * 1000).toISOString().split('T')[0],
                        interests: data.message,
                        firstTime: true,
                        followUpStatus: 'pending'
                    };
                });
                setVisitors(visitorsData);

                // Fetch Membership Requests
                const membershipSnap = await getDocs(collection(db, 'membershipRequests'));
                const membershipData = membershipSnap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                // // You can add these to members or keep separate

                // Fetch Reports
                const reportsSnap = await getDocs(collection(db, 'reports'));
                const reportsData = reportsSnap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setReports(reportsData);
            } else {
                // SAMPLE DATA FOR DEMONSTRATION
                setMembers([
                    { id: 1, firstName: 'John', lastName: 'Okafor', email: 'john@email.com', phone: '0803-456-7890', department: 'mens', gender: 'male', joinDate: '2025-01-15', status: 'active', dob: '1985-05-15' },
                    { id: 2, firstName: 'Grace', lastName: 'Adeleke', email: 'grace@email.com', phone: '0701-234-5678', department: 'womens', gender: 'female', joinDate: '2025-02-20', status: 'active', dob: '1990-08-22' },
                ]);

                setEvents([
                    { id: 1, title: 'Sunday Service', date: '2025-11-17', time: '9:00 AM', department: 'all', location: 'Main Sanctuary', description: 'Weekly worship service' },
                ]);

                setSermons([
                    { id: 1, title: 'Walking in Faith', preacher: 'Pastor Emmanuel', date: '2025-11-10', scripture: 'Hebrews 11:1', videoUrl: '', audioUrl: '', thumbnail: '', description: 'Understanding faith in action' },
                ]);

                // Sample prayer request matching your Firebase structure
                setPrayerRequests([
                   
                ]);

                setVisitors([
                    { id: 1, name: 'David Mensah', email: 'david@email.com', phone: '0809-876-5432', visitDate: '2025-11-10', firstTime: true, interests: 'Join youth ministry', followUpStatus: 'pending' },
                ]);

                setReports([
                    { id: 1, department: 'mens', submittedBy: 'Elder James', title: 'November Monthly Report', content: 'Attendance: 120, New members: 5', date: '2025-11-01', status: 'approved' },
                ]);
            }

            // Update stats
            updateStats();
        } catch (error) {
            console.error('Error fetching data:', error);
            alert(`Error loading data: ${error.message}\n\nMake sure Firebase is properly configured.`);
        } finally {
            setLoading(false);
        }
    };

    const updateStats = () => {
        setStats({
            totalMembers: members.length,
            activeMembers: members.filter(m => m.status === 'active').length,
            newMembers: members.filter(m => {
                const joinDate = new Date(m.joinDate);
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return joinDate > monthAgo;
            }).length,
            weeklyAttendance: 856,
            monthlyOffering: 2450000,
            pledges: 18500000,
            departments: 4,
            events: events.length,
            prayerRequests: prayerRequests.filter(p => p.status === 'pending').length,
            visitors: visitors.length,
            sermons: sermons.length
        });
    };

    // Firebase CRUD operations
    const addMember = async (memberData) => {
        try {
            setLoading(true);

            if (!simulateFirebase) {
                // Real Firebase add
                await addDoc(collection(db, 'members'), {
                    ...memberData,
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    timestamp: Timestamp.now()
                });
                // fetchAllData(); // Refresh data
            } else {
                // Simulated add
                const newMember = { ...memberData, id: Date.now(), status: 'active' };
                setMembers([...members, newMember]);
                updateStats();
            }

            setModalOpen(null);
            alert('Member added successfully!');
        } catch (error) {
            console.error('Error adding member:', error);
            alert(`Error adding member: ${error.message}\n\nCheck Firebase console for details.`);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (eventData) => {
        try {
            setLoading(true);

            if (!simulateFirebase) {
                // Real Firebase add
                await addDoc(collection(db, 'events'), {
                    ...eventData,
                    createdAt: new Date().toISOString(),
                    timestamp: Timestamp.now()
                });
                // fetchAllData();
            } else {
                const newEvent = { ...eventData, id: Date.now() };
                setEvents([...events, newEvent]);
                updateStats();
            }

            setModalOpen(null);
            alert('Event created successfully!');
        } catch (error) {
            console.error('Error adding event:', error);
            alert(`Error creating event: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addSermon = async (sermonData) => {
        try {
            setLoading(true);

            if (!simulateFirebase) {
                // Real Firebase add
                await addDoc(collection(db, 'sermons'), {
                    ...sermonData,
                    date: new Date().toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                    timestamp: Timestamp.now()
                });
                // fetchAllData();
            } else {
                const newSermon = { ...sermonData, id: Date.now(), date: new Date().toISOString().split('T')[0] };
                setSermons([...sermons, newSermon]);
                updateStats();
            }

            setModalOpen(null);
            alert('Sermon uploaded successfully!');
        } catch (error) {
            console.error('Error adding sermon:', error);
            alert(`Error uploading sermon: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updatePrayerStatus = async (id, status) => {
        try {
            if (!simulateFirebase) {
                // Real Firebase update
                await updateDoc(doc(db, 'prayerRequests', id), { status });
                fetchAllData();
            } else {
                setPrayerRequests(prayerRequests.map(p => p.id === id ? { ...p, status } : p));
                updateStats();
            }
            alert(`Prayer request marked as ${status}!`);
        } catch (error) {
            console.error('Error updating prayer request:', error);
            alert(`Error updating prayer: ${error.message}`);
        }
    };

    const addReport = async (reportData) => {
        try {
            setLoading(true);

            if (!simulateFirebase) {
                // Real Firebase add
                await addDoc(collection(db, 'reports'), {
                    ...reportData,
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    timestamp: Timestamp.now()
                });
                fetchAllData();
            } else {
                const newReport = {
                    ...reportData,
                    id: Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending',
                    submittedBy: 'Current User' // Would come from auth
                };
                setReports([...reports, newReport]);
            }

            setModalOpen(null);
            alert('Report submitted successfully!');
        } catch (error) {
            console.error('Error adding report:', error);
            alert(`Error submitting report: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getMembersByDepartment = (dept) => {
        return members.filter(m => m.department === dept);
    };

    const getMembersByGender = (gender) => {
        return members.filter(m => m.gender === gender);
    };

    // Dashboard View
    const DashboardView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-amber-900">Church Overview</h1>
                <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-amber-100 text-sm font-medium">Total Members</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.totalMembers}</h3>
                            <p className="text-amber-200 text-xs mt-2">+{stats.newMembers} this month</p>
                        </div>
                        <Users className="w-12 h-12 text-amber-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Upcoming Events</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.events}</h3>
                            <p className="text-blue-200 text-xs mt-2">Scheduled programs</p>
                        </div>
                        <Calendar className="w-12 h-12 text-blue-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Prayer Requests</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.prayerRequests}</h3>
                            <p className="text-purple-200 text-xs mt-2">Pending prayers</p>
                        </div>
                        <Heart className="w-12 h-12 text-purple-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-green-100 text-sm font-medium">New Visitors</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.visitors}</h3>
                            <p className="text-green-200 text-xs mt-2">This month</p>
                        </div>
                        <UserPlus className="w-12 h-12 text-green-200" />
                    </div>
                </div>
            </div>

            {/* Department Overview */}
            <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Departments by Gender</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {departments.map(dept => (
                        <div key={dept.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100 hover:border-amber-300 transition-all cursor-pointer"
                            onClick={() => { setActiveSection('departments'); setFilterDepartment(dept.id); }}>
                            <div className="text-4xl mb-3">{dept.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                            <p className="text-3xl font-bold text-amber-600 mt-2">{getMembersByDepartment(dept.id).length}</p>
                            <p className="text-sm text-gray-600">Active Members</p>
                            {dept.gender !== 'all' && (
                                <p className="text-xs text-gray-500 mt-2">Gender: {dept.gender}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-amber-900 mb-4">Recent Prayer Requests</h2>
                    <div className="space-y-3">
                        {prayerRequests.slice(0, 5).map(prayer => (
                            <div key={prayer.id} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                <Heart className="w-5 h-5 text-purple-600 mt-1" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{prayer.name}</p>
                                    <p className="text-sm text-gray-600">{prayer.request}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${prayer.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>{prayer.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-amber-900 mb-4">New Visitors</h2>
                    <div className="space-y-3">
                        {visitors.slice(0, 5).map(visitor => (
                            <div key={visitor.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <UserPlus className="w-5 h-5 text-green-600 mt-1" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{visitor.name}</p>
                                    <p className="text-sm text-gray-600">{visitor.email}</p>
                                    <p className="text-xs text-gray-500">{visitor.visitDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Members Management
    const MembersView = () => {
        const [formData, setFormData] = useState({
            firstName: '', lastName: '', email: '', phone: '', department: 'mens',
            gender: 'male', dob: '', maritalStatus: 'Single', address: '',
            joinDate: new Date().toISOString().split('T')[0]
        });

        const filteredMembers = members.filter(member => {
            const matchesSearch = `${member.firstName} ${member.lastName} ${member.email}`.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = filterDepartment === 'all' || member.department === filterDepartment;
            return matchesSearch && matchesDept;
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Members Management</h1>
                    <button onClick={() => setModalOpen('addMember')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <UserPlus className="w-4 h-4" /> Add New Member
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-4 shadow-md flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                        <input type="text" placeholder="Search members..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                    </div>
                    <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                        <option value="all">All Departments</option>
                        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                    </select>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-amber-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Name</th>
                                    <th className="px-6 py-4 text-left">Gender</th>
                                    <th className="px-6 py-4 text-left">Department</th>
                                    <th className="px-6 py-4 text-left">Contact</th>
                                    <th className="px-6 py-4 text-left">Join Date</th>
                                    <th className="px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredMembers.map(member => (
                                    <tr key={member.id} className="hover:bg-amber-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{member.firstName} {member.lastName}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${member.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                                                }`}>{member.gender}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                                                {departments.find(d => d.id === member.department)?.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="text-sm">{member.email}</div>
                                            <div className="text-xs text-gray-500">{member.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{member.joinDate}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Member Modal */}
                {modalOpen === 'addMember' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">New Member Registration</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addMember(formData); }} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input type="text" required value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input type="text" required value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                                        <select required value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                        <select required value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                            {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input type="email" required value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                        <input type="tel" required value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Register Member
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
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

    // Sermons View
    const SermonsView = () => {
        const [formData, setFormData] = useState({
            title: '', preacher: '', scripture: '', description: '',
            videoUrl: '', audioUrl: '', thumbnail: ''
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Sermons</h1>
                    <button onClick={() => setModalOpen('addSermon')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <Upload className="w-4 h-4" /> Upload Sermon
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sermons.map(sermon => (
                        <div key={sermon.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                            <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                {sermon.thumbnail ? (
                                    <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
                                ) : (
                                    <Video className="w-20 h-20 text-white opacity-50" />
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h3>
                                <p className="text-amber-600 font-semibold mb-2">{sermon.preacher}</p>
                                <p className="text-sm text-gray-600 mb-3">{sermon.scripture}</p>
                                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{sermon.description}</p>
                                <div className="flex gap-2">
                                    {sermon.videoUrl && (
                                        <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold">
                                            <Video className="w-4 h-4 inline mr-1" /> Watch
                                        </button>
                                    )}
                                    {sermon.audioUrl && (
                                        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold">
                                            Listen
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Sermon Modal */}
                {modalOpen === 'addSermon' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Upload Sermon</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addSermon(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sermon Title *</label>
                                    <input type="text" required value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Preacher *</label>
                                    <input type="text" required value={formData.preacher}
                                        onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Scripture Reference *</label>
                                    <input type="text" required value={formData.scripture}
                                        onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
                                        placeholder="e.g., John 3:16"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (YouTube/Vimeo)</label>
                                    <input type="url" value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                        placeholder="https://youtube.com/..."
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Audio URL</label>
                                    <input type="url" value={formData.audioUrl}
                                        onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                    <input type="url" value={formData.thumbnail}
                                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Upload Sermon
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
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

    // Prayer Requests View
    const PrayersView = () => (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-amber-900">Prayer Requests</h1>

            {prayerRequests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <Heart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Prayer Requests</h3>
                    <p className="text-gray-600">Prayer requests will appear here when submitted from the website</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {prayerRequests.map(prayer => (
                        <div key={prayer.id} className={`bg-white rounded-xl p-6 shadow-md border-l-4 ${prayer.urgent ? 'border-red-600' : 'border-purple-600'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{prayer.name}</h3>
                                        {prayer.urgent && (
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                URGENT
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{prayer.email} • {prayer.phone}</p>
                                    <p className="text-xs text-gray-500 mt-1">{prayer.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${prayer.status === 'answered' ? 'bg-green-100 text-green-800' :
                                        prayer.status === 'praying' ? 'bg-blue-100 text-blue-800' :
                                            'bg-amber-100 text-amber-800'
                                    }`}>
                                    {prayer.status === 'answered' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                                    {prayer.status === 'praying' && <Clock className="w-4 h-4 inline mr-1" />}
                                    {prayer.status === 'pending' && <AlertCircle className="w-4 h-4 inline mr-1" />}
                                    {prayer.status}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4 bg-purple-50 p-4 rounded-lg">{prayer.request}</p>
                            <div className="flex gap-2">
                                <button onClick={() => updatePrayerStatus(prayer.id, 'praying')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
                                    Mark as Praying
                                </button>
                                <button onClick={() => updatePrayerStatus(prayer.id, 'answered')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold">
                                    Mark as Answered
                                </button>
                                <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 text-sm font-semibold">
                                    <Send className="w-4 h-4 inline mr-1" /> Send Response
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Visitors View
    const VisitorsView = () => (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-amber-900">Visitors</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visitors.map(visitor => (
                    <div key={visitor.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-100 hover:border-green-300 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {visitor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {visitor.firstTime && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                    First Time
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{visitor.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p>{visitor.email}</p>
                            <p>{visitor.phone}</p>
                            <p className="text-xs text-gray-500">Visited: {visitor.visitDate}</p>
                        </div>
                        <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg mb-4">{visitor.interests}</p>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold">
                                Follow Up
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Events View with Firebase sync
    const EventsView = () => {
        const [formData, setFormData] = useState({
            title: '', date: '', time: '', department: 'all', location: '', description: ''
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Events & Programs</h1>
                    <button onClick={() => setModalOpen('addEvent')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <Calendar className="w-4 h-4" /> Create Event
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {events.map(event => (
                            <div key={event.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100">
                                <div className="flex gap-4">
                                    <div className="bg-amber-600 text-white w-20 h-20 rounded-xl flex flex-col items-center justify-center">
                                        <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                        <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> {event.time}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Church className="w-4 h-4" /> {event.location}
                                            </p>
                                            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mt-2">
                                                {event.department === 'all' ? 'All Departments' : departments.find(d => d.id === event.department)?.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {event.description && (
                                    <p className="mt-4 text-gray-700 bg-amber-50 p-3 rounded-lg">{event.description}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Events Summary</h2>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-4 text-white">
                                <p className="text-amber-100 text-sm">Total Events</p>
                                <p className="text-4xl font-bold">{events.length}</p>
                            </div>
                            {departments.map(dept => {
                                const deptEvents = events.filter(e => e.department === dept.id);
                                return deptEvents.length > 0 && (
                                    <div key={dept.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">{dept.name}</span>
                                        <span className="font-bold text-amber-600">{deptEvents.length}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Add Event Modal */}
                {modalOpen === 'addEvent' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Create New Event</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addEvent(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                                    <input type="text" required value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                        <input type="date" required value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                                        <input type="time" required value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input type="text" required value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                    <select required value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                        <option value="all">All Departments</option>
                                        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Create Event
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
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

    // Department Forms View
    const FormsView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-amber-900">Department Forms & Submissions</h1>
                <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                    <FileText className="w-4 h-4" /> Create Form
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map(dept => (
                    <div key={dept.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl">{dept.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                                <p className="text-sm text-gray-600">Registration & Feedback Forms</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button className="w-full text-left px-4 py-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-all">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Membership Form</span>
                                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">5 new</span>
                                </div>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-all">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Event Registration</span>
                                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">12 responses</span>
                                </div>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Feedback Form</span>
                                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">3 pending</span>
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Reports & Analytics View
    const ReportsView = () => {
        const [formData, setFormData] = useState({
            department: 'mens', title: '', content: ''
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Reports & Analytics</h1>
                    <button onClick={() => setModalOpen('submitReport')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <FileText className="w-4 h-4" /> Submit Report
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {reports.map(report => (
                        <div key={report.id} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {departments.find(d => d.id === report.department)?.name} •
                                        Submitted by {report.submittedBy} on {report.date}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${report.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        report.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {report.status}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 whitespace-pre-wrap">{report.content}</p>
                            </div>
                            {report.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold">
                                        Approve
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold">
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Report Modal */}
                {modalOpen === 'submitReport' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Submit Department Report</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addReport(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                    <select required value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Title *</label>
                                    <input type="text" required value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., November Monthly Report"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Content *</label>
                                    <textarea required value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows="8"
                                        placeholder="Include attendance, activities, achievements, challenges, and recommendations..."
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Submit Report
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
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

    // Departments View with Gender Filtering
    const DepartmentsView = () => (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-amber-900">Departments by Gender</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {departments.map(dept => {
                    const deptMembers = getMembersByDepartment(dept.id);
                    const deptLeader = leaders.find(l => l.department === dept.id);
                    const deptEvents = events.filter(e => e.department === dept.id);
                    const maleCount = deptMembers.filter(m => m.gender === 'male').length;
                    const femaleCount = deptMembers.filter(m => m.gender === 'female').length;

                    return (
                        <div key={dept.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl">{dept.icon}</div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900">{dept.name}</h2>
                                    <p className="text-amber-600 font-semibold">{deptMembers.length} Active Members</p>
                                    {dept.gender !== 'all' && (
                                        <p className="text-sm text-gray-600">Primary: {dept.gender}</p>
                                    )}
                                    {dept.ageRange && (
                                        <p className="text-xs text-gray-500">Age Range: {dept.ageRange}</p>
                                    )}
                                </div>
                            </div>

                            {/* Gender Distribution */}
                            {dept.gender === 'all' && (
                                <div className="mb-4 grid grid-cols-2 gap-3">
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold text-blue-600">{maleCount}</p>
                                        <p className="text-xs text-blue-800">Male Members</p>
                                    </div>
                                    <div className="bg-pink-50 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold text-pink-600">{femaleCount}</p>
                                        <p className="text-xs text-pink-800">Female Members</p>
                                    </div>
                                </div>
                            )}

                            {/* Department Leader */}
                            {deptLeader && (
                                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                                    <p className="text-xs text-amber-700 font-semibold mb-2">DEPARTMENT LEADER</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {deptLeader.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{deptLeader.name}</p>
                                            <p className="text-sm text-gray-600">{deptLeader.position}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-green-600">{deptEvents.length}</p>
                                    <p className="text-xs text-green-800">Events</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-purple-600">{deptMembers.filter(m => {
                                        const joinDate = new Date(m.joinDate);
                                        const monthAgo = new Date();
                                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                                        return joinDate > monthAgo;
                                    }).length}</p>
                                    <p className="text-xs text-purple-800">New This Month</p>
                                </div>
                                <div className="bg-amber-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-amber-600">{deptMembers.filter(m => m.status === 'active').length}</p>
                                    <p className="text-xs text-amber-800">Active</p>
                                </div>
                            </div>

                            {/* Recent Members */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Recent Members</p>
                                <div className="space-y-2">
                                    {deptMembers.slice(0, 3).map(member => (
                                        <div key={member.id} className="flex items-center gap-3 text-sm">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${member.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                                                }`}>
                                                {member.firstName[0]}{member.lastName[0]}
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-medium">{member.firstName} {member.lastName}</span>
                                                <span className="text-xs text-gray-500 ml-2">({member.gender})</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => { setActiveSection('members'); setFilterDepartment(dept.id); }}
                                className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-semibold">
                                View All Members
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Main Render
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
            {/* Top Navigation Bar */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg sticky top-0 z-40">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-amber-800 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <Church className="w-8 h-8" />
                            <div>
                                <h1 className="text-xl font-bold">AG Church Gbazango</h1>
                                <p className="text-xs text-amber-200">Management Dashboard</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-amber-800 rounded-lg">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="hidden md:flex items-center gap-3 bg-amber-800 rounded-lg px-4 py-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-amber-600 font-bold">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Admin User</p>
                                <p className="text-xs text-amber-200">Church Manager</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-amber-800 rounded-lg">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-72 bg-white shadow-xl z-30 transition-transform duration-300 overflow-y-auto`}>
                    <div className="p-6 space-y-2">
                        {menuItems.map(item => (
                            <button key={item.id}
                                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === item.id
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-amber-50'
                                    }`}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 lg:p-8">
                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent"></div>
                        </div>
                    ) : (
                        <>
                            {activeSection === 'dashboard' && <DashboardView />}
                            {activeSection === 'members' && <MembersView />}
                            {activeSection === 'leaders' && <LeadersView />}
                            {activeSection === 'departments' && <DepartmentsView />}
                            {activeSection === 'events' && <EventsView />}
                            {activeSection === 'sermons' && <SermonsView />}
                            {activeSection === 'prayers' && <PrayersView />}
                            {activeSection === 'visitors' && <VisitorsView />}
                            {activeSection === 'forms' && <FormsView />}
                            {activeSection === 'reports' && <ReportsView />}
                            {activeSection === 'settings' && (
                                <div className="text-center py-20">
                                    <Settings className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
                                    <p className="text-gray-600">Configure church management settings</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    );

    // Leaders View (adding this since it was referenced but not defined)
    function LeadersView() {
        const [formData, setFormData] = useState({
            name: '', position: '', email: '', phone: '', department: 'all'
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Church Leadership</h1>
                    <button onClick={() => setModalOpen('addLeader')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <Shield className="w-4 h-4" /> Add Leader
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaders.map(leader => (
                        <div key={leader.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100 hover:border-amber-300 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {leader.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                            <p className="text-amber-600 font-semibold mb-3">{leader.position}</p>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Email:</span> {leader.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Phone:</span> {leader.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Department:</span>
                                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                                        {leader.department === 'all' ? 'All Departments' : departments.find(d => d.id === leader.department)?.name}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Leader Modal */}
                {modalOpen === 'addLeader' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Add Church Leader</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); addLeader(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input type="text" required value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                                    <input type="text" required value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input type="email" required value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <input type="tel" required value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                    <select required value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                        <option value="all">All Departments</option>
                                        {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Add Leader
                                    </button>
                                    <button type="button" onClick={() => setModalOpen(null)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    function addLeader(leaderData) {
        const newLeader = { ...leaderData, id: Date.now() };
        setLeaders([...leaders, newLeader]);
        setModalOpen(null);
    }
}