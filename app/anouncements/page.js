"use client"
import React, { useState, useEffect } from 'react';
import { 
    Bell, Calendar, Clock, MapPin, Users, Tag, 
    ChevronRight, Search, Filter, X, Eye,
    ChevronLeft, Share2, Heart, Bookmark
} from 'lucide-react';
import Footer from '@/components/Footer/page';
import { collection, query, orderBy, getDocs, where, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch announcements from Firebase
    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                // Fetch all announcements first, then filter in JavaScript
                const announcementsQuery = query(
                    collection(db, 'announcements'),
                    orderBy('createdAt', 'desc')
                );
                
                const querySnapshot = await getDocs(announcementsQuery);
                const fetchedAnnouncements = querySnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            // Convert Firestore Timestamp to Date if needed
                            createdAt: data.createdAt?.toDate?.() || new Date(),
                            views: data.views || 0
                        };
                    })
                    // Filter for active announcements in JavaScript
                    .filter(announcement => announcement.status === 'active');
                
                console.log('Fetched announcements:', fetchedAnnouncements); // Debug log
                setAnnouncements(fetchedAnnouncements);
                setFilteredAnnouncements(fetchedAnnouncements);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                alert('Error loading announcements: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = announcements;

        // Filter by category (targetAudience in Firebase)
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a => a.targetAudience === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(a => 
                a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.message?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAnnouncements(filtered);
    }, [selectedCategory, searchTerm, announcements]);

    // Get unique categories from announcements
    const categories = ['all', ...new Set(announcements.map(a => a.targetAudience).filter(Boolean))];

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'urgent': return '#DC2626';
            case 'high': return '#F59E0B';
            case 'normal': return '#10B981';
            default: return '#6B7280';
        }
    };

    const formatDate = (date) => {
        if (!date) return 'No date';
        try {
            const dateObj = date instanceof Date ? date : new Date(date);
            return dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch {
            return 'Invalid date';
        }
    };

    // Increment view count when announcement is opened
    const handleAnnouncementClick = async (announcement) => {
        setSelectedAnnouncement(announcement);
        
        // Increment view count in Firebase
        try {
            const announcementRef = doc(db, 'announcements', announcement.id);
            await updateDoc(announcementRef, {
                views: increment(1)
            });
            
            // Update local state
            setAnnouncements(prev => prev.map(a => 
                a.id === announcement.id ? { ...a, views: (a.views || 0) + 1 } : a
            ));
        } catch (error) {
            console.error('Error updating views:', error);
        }
    };

    const getDepartmentName = (targetAudience) => {
        const departments = {
            'all': 'All Members',
            'mens': "Men's Fellowship",
            'womens': "Women's Fellowship",
            'youth': 'Youth Ministry',
            'teens': 'Teens Ministry'
        };
        return departments[targetAudience] || targetAudience;
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
            {/* Header */}
            <header className="text-black py-16 px-4 shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)' }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-900 transform rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-yellow-900 transform -rotate-12"></div>
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-2xl border-4" style={{ 
                            background: 'linear-gradient(135deg, #8B6914 0%, #654321 100%)',
                            borderColor: '#654321'
                        }}>
                            <Bell className="w-12 h-12" style={{ color: '#FFD700' }} />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Church Announcements</h1>
                    <p className="text-2xl mb-2">Assemblies of God Church Gbazango</p>
                    <p className="text-xl opacity-90">Stay Connected, Stay Informed</p>
                </div>
            </header>

            {/* Search and Filter Bar */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            />
                        </div>
                        
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
                            style={{ background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' }}
                        >
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>

                    {/* Category Filters */}
                    {showFilters && (
                        <div className="flex flex-wrap gap-2 mt-4 pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full font-medium transition ${
                                        selectedCategory === cat
                                            ? 'text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    style={selectedCategory === cat ? { background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' } : {}}
                                >
                                    {cat === 'all' ? 'All' : getDepartmentName(cat)}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    <div className="mt-3 text-sm text-gray-600">
                        Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 rounded-full animate-spin mb-4" style={{ borderColor: '#B8860B', borderTopColor: 'transparent' }}></div>
                        <p className="text-white text-lg">Loading announcements...</p>
                    </div>
                ) : filteredAnnouncements.length === 0 ? (
                    <div className="text-center py-20">
                        <Bell className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-2xl font-bold text-white mb-2">No announcements found</h3>
                        <p className="text-gray-400">
                            {searchTerm || selectedCategory !== 'all' 
                                ? 'Try adjusting your search or filters' 
                                : 'Check back later for new announcements'}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnnouncements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                                onClick={() => handleAnnouncementClick(announcement)}
                            >
                                {/* Header with Priority */}
                                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 h-32 flex items-center justify-center">
                                    <Bell className="w-16 h-16 text-white opacity-50" />
                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                        style={{ 
                                            background: getPriorityColor(announcement.priority),
                                        }}>
                                        {(announcement.priority || 'normal').toUpperCase()}
                                    </div>
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ 
                                            background: '#FFD700',
                                            color: '#654321'
                                        }}>
                                        {getDepartmentName(announcement.targetAudience)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {announcement.message}
                                    </p>

                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                                            <span>{formatDate(announcement.createdAt)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Eye size={16} />
                                            <span>{announcement.views || 0} views</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#B8860B' }}>
                                            Read More <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal for full announcement */}
            {selectedAnnouncement && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedAnnouncement(null)}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 h-64 flex items-center justify-center">
                            <Bell className="w-32 h-32 text-white opacity-30" />
                            <button
                                onClick={() => setSelectedAnnouncement(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className="px-4 py-2 rounded-full text-sm font-bold"
                                    style={{ 
                                        background: '#FFD700',
                                        color: '#654321'
                                    }}>
                                    {getDepartmentName(selectedAnnouncement.targetAudience)}
                                </span>
                                <span className="px-4 py-2 rounded-full text-sm font-bold text-white"
                                    style={{ background: getPriorityColor(selectedAnnouncement.priority) }}>
                                    {(selectedAnnouncement.priority || 'normal').toUpperCase()} PRIORITY
                                </span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {selectedAnnouncement.title}
                            </h2>

                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} style={{ color: '#B8860B' }} />
                                    <span>{formatDate(selectedAnnouncement.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} style={{ color: '#B8860B' }} />
                                    <span>{getDepartmentName(selectedAnnouncement.targetAudience)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={16} style={{ color: '#B8860B' }} />
                                    <span>{selectedAnnouncement.views || 0} views</span>
                                </div>
                            </div>

                            <div className="prose max-w-none mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                    {selectedAnnouncement.message}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-6 border-t">
                                <button 
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: selectedAnnouncement.title,
                                                text: selectedAnnouncement.message,
                                                url: window.location.href
                                            });
                                        }
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
                                    style={{ background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)' }}>
                                    <Share2 size={20} />
                                    Share
                                </button>
                                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-lg font-semibold transition hover:bg-gray-50"
                                    style={{ borderColor: '#B8860B', color: '#8B6914' }}>
                                    <Bookmark size={20} />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-8 px-4 mt-12" style={{ background: '#654321', color: '#FFD700' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg mb-2">Assemblies of God Church - Gbazango District</p>
                    <p style={{ color: '#F0E68C' }}>Stay Connected | Stay Informed | Stay Blessed</p>
                    <p className="mt-4 text-sm" style={{ color: '#DAA520' }}>&copy; 2025 All Rights Reserved</p>
                </div>
            </footer>
            <Footer />
        </div>
    );
}