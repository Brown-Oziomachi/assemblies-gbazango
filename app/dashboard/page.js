"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, DollarSign, BookOpen, TrendingUp, UserPlus, Heart, Settings, Menu, X, Church, FileText, Bell, Shield, LogOut, Edit, Trash2, Search, Filter, Download } from 'lucide-react';

export default function ChurchDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');

    // Firebase would be initialized here
    // const [members, setMembers] = useState([]);
    // const [leaders, setLeaders] = useState([]);
    // const [events, setEvents] = useState([]);

    // Sample data (would come from Firebase)
    const [stats, setStats] = useState({
        totalMembers: 1247,
        activeMembers: 1089,
        newMembers: 23,
        weeklyAttendance: 856,
        monthlyOffering: 2450000,
        pledges: 18500000,
        departments: 4,
        events: 8
    });

    const [members, setMembers] = useState([
        { id: 1, firstName: 'John', lastName: 'Okafor', email: 'john.okafor@gmail.com', phone: '0803-456-7890', department: 'mens', joinDate: '2025-11-01', status: 'active', dob: '1985-05-15', maritalStatus: 'Married', address: '123 Lagos Street, Abuja' },
        { id: 2, firstName: 'Grace', lastName: 'Adeleke', email: 'grace.a@gmail.com', phone: '0701-234-5678', department: 'womens', joinDate: '2025-11-02', status: 'active', dob: '1990-08-22', maritalStatus: 'Single', address: '45 Maitama Avenue, Abuja' },
        { id: 3, firstName: 'David', lastName: 'Mensah', email: 'david.m@gmail.com', phone: '0809-876-5432', department: 'youth', joinDate: '2025-11-03', status: 'active', dob: '2000-03-10', maritalStatus: 'Single', address: '67 Wuse Street, Abuja' },
        { id: 4, firstName: 'Sarah', lastName: 'Ibrahim', email: 'sarah.i@gmail.com', phone: '0805-123-4567', department: 'teens', joinDate: '2025-10-15', status: 'active', dob: '2008-12-05', maritalStatus: 'Single', address: '89 Garki Road, Abuja' },
    ]);

    const [leaders, setLeaders] = useState([
        { id: 1, name: 'Pastor Emmanuel Eze', position: 'Senior Pastor', email: 'pastor.eze@agchurch.ng', phone: '0803-111-2222', department: 'all' },
        { id: 2, name: 'Elder James Okon', position: 'Men\'s Fellowship Leader', email: 'james.okon@agchurch.ng', phone: '0703-222-3333', department: 'mens' },
        { id: 3, name: 'Sister Mary Adeyemi', position: 'Women\'s Fellowship Leader', email: 'mary.adeyemi@agchurch.ng', phone: '0805-333-4444', department: 'womens' },
        { id: 4, name: 'Brother Michael Okoro', position: 'Youth Ministry Leader', email: 'michael.okoro@agchurch.ng', phone: '0807-444-5555', department: 'youth' },
        { id: 5, name: 'Sister Faith Okafor', position: 'Teens Ministry Leader', email: 'faith.okafor@agchurch.ng', phone: '0809-555-6666', department: 'teens' },
    ]);

    const [events, setEvents] = useState([
        { id: 1, title: 'Sunday Service', date: '2025-11-10', time: '9:00 AM', department: 'all', attendees: 450, location: 'Main Sanctuary' },
        { id: 2, title: 'Men\'s Fellowship Meeting', date: '2025-11-12', time: '6:00 PM', department: 'mens', attendees: 120, location: 'Conference Hall' },
        { id: 3, title: 'Women\'s Prayer Meeting', date: '2025-11-13', time: '10:00 AM', department: 'womens', attendees: 180, location: 'Prayer Room' },
        { id: 4, title: 'Youth Hangout', date: '2025-11-14', time: '4:00 PM', department: 'youth', attendees: 85, location: 'Youth Center' },
        { id: 5, title: 'Teens Bible Study', date: '2025-11-15', time: '5:00 PM', department: 'teens', attendees: 45, location: 'Teen Lounge' },
    ]);

    const departments = [
        { id: 'mens', name: 'Men\'s Fellowship', color: 'blue', icon: '👨' },
        { id: 'womens', name: 'Women\'s Fellowship', color: 'pink', icon: '👩' },
        { id: 'youth', name: 'Youth Ministry', color: 'green', icon: '🙋' },
        { id: 'teens', name: 'Teens Ministry', color: 'purple', icon: '🧒' },
    ];

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'members', label: 'Members Management', icon: Users },
        { id: 'leaders', label: 'Leadership', icon: Shield },
        { id: 'departments', label: 'Departments', icon: BookOpen },
        { id: 'events', label: 'Events & Programs', icon: Calendar },
        { id: 'attendance', label: 'Attendance Tracking', icon: UserPlus },
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'welfare', label: 'Welfare & Care', icon: Heart },
        { id: 'reports', label: 'Reports & Analytics', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    // Firebase functions would be here
    const addMember = async (memberData) => {
        // await addDoc(collection(db, "members"), memberData);
        const newMember = { ...memberData, id: Date.now(), status: 'active' };
        setMembers([...members, newMember]);
        setModalOpen(null);
    };

    const addLeader = async (leaderData) => {
        // await addDoc(collection(db, "leaders"), leaderData);
        const newLeader = { ...leaderData, id: Date.now() };
        setLeaders([...leaders, newLeader]);
        setModalOpen(null);
    };

    const addEvent = async (eventData) => {
        // await addDoc(collection(db, "events"), eventData);
        const newEvent = { ...eventData, id: Date.now(), attendees: 0 };
        setEvents([...events, newEvent]);
        setModalOpen(null);
    };

    const deleteMember = (id) => {
        // await deleteDoc(doc(db, "members", id));
        setMembers(members.filter(m => m.id !== id));
    };

    const deleteLeader = (id) => {
        // await deleteDoc(doc(db, "leaders", id));
        setLeaders(leaders.filter(l => l.id !== id));
    };

    // Get members by department
    const getMembersByDepartment = (dept) => {
        return members.filter(m => m.department === dept);
    };

    // Dashboard Section
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

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-green-100 text-sm font-medium">Weekly Attendance</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.weeklyAttendance}</h3>
                            <p className="text-green-200 text-xs mt-2">87% attendance rate</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-green-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Monthly Offering</p>
                            <h3 className="text-4xl font-bold mt-2">₦{(stats.monthlyOffering / 1000000).toFixed(1)}M</h3>
                            <p className="text-blue-200 text-xs mt-2">+12% from last month</p>
                        </div>
                        <DollarSign className="w-12 h-12 text-blue-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Departments</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.departments}</h3>
                            <p className="text-purple-200 text-xs mt-2">{stats.events} active programs</p>
                        </div>
                        <BookOpen className="w-12 h-12 text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Department Cards */}
            <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Departments Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {departments.map(dept => (
                        <div key={dept.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100 hover:border-amber-300 transition-all">
                            <div className="text-4xl mb-3">{dept.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                            <p className="text-3xl font-bold text-amber-600 mt-2">{getMembersByDepartment(dept.id).length}</p>
                            <p className="text-sm text-gray-600">Active Members</p>
                            <button className="mt-4 w-full bg-amber-50 text-amber-700 py-2 rounded-lg hover:bg-amber-100 font-semibold text-sm">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                    {events.slice(0, 5).map(event => (
                        <div key={event.id} className="flex justify-between items-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="bg-amber-600 text-white w-16 h-16 rounded-lg flex flex-col items-center justify-center">
                                    <span className="text-xs">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{event.title}</h4>
                                    <p className="text-sm text-gray-600">{event.time} • {event.location}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Expected</p>
                                <p className="font-bold text-amber-600">{event.attendees}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Members Management Section
    const MembersView = () => {
        const [formData, setFormData] = useState({
            firstName: '', lastName: '', email: '', phone: '', department: 'mens',
            dob: '', maritalStatus: 'Single', address: '', joinDate: new Date().toISOString().split('T')[0]
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
                    <button
                        onClick={() => setModalOpen('addMember')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <UserPlus className="w-4 h-4" />
                        Add New Member
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-4 shadow-md flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                        />
                    </div>
                    <select
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                        <option value="all">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-amber-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Name</th>
                                    <th className="px-6 py-4 text-left">Email</th>
                                    <th className="px-6 py-4 text-left">Phone</th>
                                    <th className="px-6 py-4 text-left">Department</th>
                                    <th className="px-6 py-4 text-left">Join Date</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredMembers.map(member => (
                                    <tr key={member.id} className="hover:bg-amber-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{member.firstName} {member.lastName}</td>
                                        <td className="px-6 py-4 text-gray-600">{member.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                                                {departments.find(d => d.id === member.department)?.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{member.joinDate}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteMember(member.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
                                <div>
                                    <h4 className="text-lg font-semibold text-amber-900 mb-4 pb-2 border-b-2 border-amber-200">Personal Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.dob}
                                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                                            <select
                                                value={formData.maritalStatus}
                                                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                                <option>Single</option>
                                                <option>Married</option>
                                                <option>Widowed</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-amber-900 mb-4 pb-2 border-b-2 border-amber-200">Church Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                            <select
                                                required
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                                {departments.map(dept => (
                                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Join Date *</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.joinDate}
                                                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Register Member
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(null)}
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

    // Leadership Section
    const LeadersView = () => {
        const [formData, setFormData] = useState({
            name: '', position: '', email: '', phone: '', department: 'all'
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Church Leadership</h1>
                    <button
                        onClick={() => setModalOpen('addLeader')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <Shield className="w-4 h-4" />
                        Add Leader
                    </button>
                </div>

                {/* Leaders Grid */}
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
                                    <button
                                        onClick={() => deleteLeader(leader.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
                            {leader.department !== 'all' && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-2">Department Members:</p>
                                    <p className="text-2xl font-bold text-amber-600">{getMembersByDepartment(leader.department).length}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add Leader Modal */}
                {modalOpen === 'addLeader' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-t-xl flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Add Church Leader</h3>
                                <button onClick={() => setModalOpen(null)} className="text-white hover:bg-amber-800 p-2 rounded-lg">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); addLeader(formData); }} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Position/Title *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Senior Pastor, Elder, Deacon"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department Oversight *</label>
                                    <select
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                        <option value="all">All Departments</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {formData.department !== 'all' && `This leader will oversee ${getMembersByDepartment(formData.department).length} members`}
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Add Leader
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(null)}
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

    // Departments View
    const DepartmentsView = () => (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-amber-900">Departments</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {departments.map(dept => {
                    const deptMembers = getMembersByDepartment(dept.id);
                    const deptLeader = leaders.find(l => l.department === dept.id);
                    const deptEvents = events.filter(e => e.department === dept.id);

                    return (
                        <div key={dept.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl">{dept.icon}</div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900">{dept.name}</h2>
                                    <p className="text-amber-600 font-semibold">{deptMembers.length} Active Members</p>
                                </div>
                            </div>

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
                                <div className="bg-blue-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-blue-600">{deptMembers.length}</p>
                                    <p className="text-xs text-blue-800">Members</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-green-600">{deptEvents.length}</p>
                                    <p className="text-xs text-green-800">Events</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-purple-600">
                                        {deptEvents.reduce((sum, e) => sum + e.attendees, 0)}
                                    </p>
                                    <p className="text-xs text-purple-800">Total Attendance</p>
                                </div>
                            </div>

                            {/* Recent Members */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Recent Members</p>
                                <div className="space-y-2">
                                    {deptMembers.slice(0, 3).map(member => (
                                        <div key={member.id} className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xs">
                                                {member.firstName[0]}{member.lastName[0]}
                                            </div>
                                            <span className="text-gray-900">{member.firstName} {member.lastName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            {deptEvents.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Upcoming Events</p>
                                    <div className="space-y-2">
                                        {deptEvents.slice(0, 2).map(event => (
                                            <div key={event.id} className="bg-gray-50 rounded-lg p-3">
                                                <p className="font-semibold text-gray-900 text-sm">{event.title}</p>
                                                <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => { setActiveSection('members'); setFilterDepartment(dept.id); }}
                                className="w-full mt-4 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-semibold">
                                View All Members
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Events Management View
    const EventsView = () => {
        const [formData, setFormData] = useState({
            title: '', date: '', time: '', department: 'all', location: ''
        });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-amber-900">Events & Programs</h1>
                    <button
                        onClick={() => setModalOpen('addEvent')}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                        <Calendar className="w-4 h-4" />
                        Create Event
                    </button>
                </div>

                {/* Events Calendar View */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Events */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                        {events.map(event => (
                            <div key={event.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-100 hover:border-amber-300 transition-all">
                                <div className="flex gap-4">
                                    <div className="bg-amber-600 text-white w-20 h-20 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                        <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {event.date} at {event.time}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Church className="w-4 h-4" />
                                                {event.location}
                                            </p>
                                            <p>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                                                    {event.department === 'all' ? 'All Departments' : departments.find(d => d.id === event.department)?.name}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-3 flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm font-semibold text-gray-700">{event.attendees} Expected</span>
                                            </div>
                                            <button className="text-amber-600 hover:text-amber-700 text-sm font-semibold">
                                                Mark Attendance →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Events Summary */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Events Summary</h2>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-4 text-white">
                                    <p className="text-amber-100 text-sm">Total Events</p>
                                    <p className="text-4xl font-bold">{events.length}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-gray-700">By Department</p>
                                    {departments.map(dept => {
                                        const deptEvents = events.filter(e => e.department === dept.id);
                                        return (
                                            <div key={dept.id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">{dept.name}</span>
                                                <span className="font-bold text-amber-600">{deptEvents.length}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-between items-center text-sm pt-2 border-t">
                                        <span className="text-gray-600">Church-wide</span>
                                        <span className="font-bold text-amber-600">{events.filter(e => e.department === 'all').length}</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-sm text-blue-800 mb-1">Total Expected Attendance</p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {events.reduce((sum, e) => sum + e.attendees, 0)}
                                    </p>
                                </div>
                            </div>
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
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                                        <input
                                            type="time"
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Department *</label>
                                    <select
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600">
                                        <option value="all">All Departments (Church-wide)</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold">
                                        Create Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(null)}
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

    // Main Render
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
            {/* Top Navigation Bar */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg sticky top-0 z-40">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-amber-800 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <Church className="w-8 h-8" />
                            <div>
                                <h1 className="text-xl font-bold">AG Church Nigeria</h1>
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
                <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 max-md:mt-0 fixed lg:sticky top-0 left-0 h-screen w-72 bg-white shadow-xl z-30 transition-transform duration-300 overflow-y-auto`}>
                    <div className="p-6 space-y-2">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
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
                    {activeSection === 'dashboard' && <DashboardView />}
                    {activeSection === 'members' && <MembersView />}
                    {activeSection === 'leaders' && <LeadersView />}
                    {activeSection === 'departments' && <DepartmentsView />}
                    {activeSection === 'events' && <EventsView />}
                    {activeSection === 'attendance' && (
                        <div className="text-center py-20">
                            <UserPlus className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendance Tracking</h2>
                            <p className="text-gray-600">This section will track event and service attendance</p>
                        </div>
                    )}
                    {activeSection === 'finance' && (
                        <div className="text-center py-20">
                            <DollarSign className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Finance Management</h2>
                            <p className="text-gray-600">Manage offerings, tithes, and church finances</p>
                        </div>
                    )}
                    {activeSection === 'welfare' && (
                        <div className="text-center py-20">
                            <Heart className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welfare & Care</h2>
                            <p className="text-gray-600">Member welfare and pastoral care management</p>
                        </div>
                    )}
                    {activeSection === 'reports' && (
                        <div className="text-center py-20">
                            <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
                            <p className="text-gray-600">Generate comprehensive church reports</p>
                        </div>
                    )}
                    {activeSection === 'settings' && (
                        <div className="text-center py-20">
                            <Settings className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
                            <p className="text-gray-600">Configure church management settings</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}