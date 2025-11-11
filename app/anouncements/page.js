"use client"
import React, { useState, useEffect } from 'react';
import { 
    Bell, Calendar, Clock, MapPin, Users, Tag, 
    ChevronRight, Search, Filter, X, Eye,
    ChevronLeft, Share2, Heart, Bookmark
} from 'lucide-react';

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // Simulated Firebase data - Replace with actual Firebase fetch
    useEffect(() => {
        // Simulate Firebase fetch
        const fetchAnnouncements = async () => {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Sample data - Replace with actual Firebase call
            const sampleData = [
                {
                    id: '1',
                    title: 'Sunday Service Time Change',
                    description: 'Starting next week, our Sunday service will begin at 9:00 AM instead of 10:00 AM. Please adjust your schedules accordingly.',
                    fullContent: 'Dear beloved congregation, we are making a temporary adjustment to our Sunday service schedule. Starting from November 17th, 2025, our main service will begin at 9:00 AM and end at 11:30 AM. This change is to accommodate our upcoming building renovation project. We appreciate your understanding and flexibility during this transition period. God bless you!',
                    category: 'Service',
                    date: '2025-11-15',
                    time: '09:00 AM',
                    location: 'Main Sanctuary',
                    priority: 'high',
                    author: 'Pastor John Okafor',
                    views: 234,
                    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800'
                },
                {
                    id: '2',
                    title: 'Youth Conference 2025',
                    description: 'Join us for our annual Youth Conference! Theme: "Arise and Shine" - Three days of powerful worship, teaching, and fellowship.',
                    fullContent: 'We are excited to announce our Annual Youth Conference 2025 with the theme "Arise and Shine" based on Isaiah 60:1. This three-day event will feature renowned speakers, powerful worship sessions, workshops, and networking opportunities. Registration is now open. Early bird discount available until November 30th. Don\'t miss this life-changing experience!',
                    category: 'Event',
                    date: '2025-12-15',
                    time: '06:00 PM',
                    location: 'Church Grounds',
                    priority: 'medium',
                    author: 'Youth Department',
                    views: 567,
                    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'
                },
                {
                    id: '3',
                    title: 'Prayer & Fasting Week',
                    description: 'Corporate prayer and fasting from Monday to Friday. Join us daily at 6:00 AM and 6:00 PM for powerful prayer sessions.',
                    fullContent: 'The Lord has laid it on our hearts to embark on a week of corporate prayer and fasting. We will gather twice daily - morning session at 6:00 AM and evening session at 6:00 PM. This is a time to seek God\'s face for our church, families, and nation. Prayer points will be provided daily. Let us come together in unity and faith!',
                    category: 'Prayer',
                    date: '2025-11-20',
                    time: '06:00 AM & 06:00 PM',
                    location: 'Prayer Hall',
                    priority: 'high',
                    author: 'Prayer Ministry',
                    views: 432,
                    image: 'https://images.unsplash.com/photo-1518282566050-2f0c3d73eafd?w=800'
                },
                {
                    id: '4',
                    title: 'New Members Class',
                    description: 'Are you new to our church? Join our orientation class to learn about our vision, mission, and how you can get involved.',
                    fullContent: 'Welcome to the family! Our New Members Class is designed to help you integrate into our church community. You will learn about our church history, doctrine, ministries, and opportunities for service. The class runs for 4 weeks every Saturday. Light refreshments will be served. Please register at the information desk.',
                    category: 'General',
                    date: '2025-11-23',
                    time: '10:00 AM',
                    location: 'Conference Room A',
                    priority: 'medium',
                    author: 'Admin Office',
                    views: 189,
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
                },
                {
                    id: '5',
                    title: 'Christmas Carol Service',
                    description: 'Join us for a beautiful evening of Christmas carols, drama, and celebration. Invite your friends and family!',
                    fullContent: 'Celebrate the birth of our Savior with us at our annual Christmas Carol Service. The evening will feature traditional and contemporary carols, a nativity drama by our children\'s department, special performances, and a powerful message. This is a perfect opportunity to invite your unsaved friends and family. Admission is free. Light refreshments will be served after the service.',
                    category: 'Event',
                    date: '2025-12-24',
                    time: '06:00 PM',
                    location: 'Main Sanctuary',
                    priority: 'high',
                    author: 'Music Ministry',
                    views: 892,
                    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800'
                },
                {
                    id: '6',
                    title: 'Offering Envelopes Available',
                    description: 'New offering envelopes for 2025 are now available at the church office. Please collect yours this Sunday.',
                    fullContent: 'Dear members, the 2025 offering envelopes are now ready for collection. These envelopes help us maintain accurate records of your giving for tax purposes. Please visit the church office after any service to collect your personalized envelope. If you are new and would like to get envelopes, please fill out the form at the information desk.',
                    category: 'General',
                    date: '2025-11-13',
                    time: 'All Day',
                    location: 'Church Office',
                    priority: 'low',
                    author: 'Finance Department',
                    views: 156,
                    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800'
                },
                {
                    id: '7',
                    title: 'Women\'s Fellowship Meeting',
                    description: 'All women are invited to our monthly fellowship. Theme: "The Proverbs 31 Woman in Modern Times"',
                    fullContent: 'Ladies, join us for our monthly Women\'s Fellowship meeting. This month, we will be discussing "The Proverbs 31 Woman in Modern Times" - how to balance faith, family, and career. There will be testimonies, worship, and a time of fellowship. Bring a friend! Light refreshments will be provided. For more information, contact Sister Mary at the women\'s ministry desk.',
                    category: 'Ministry',
                    date: '2025-11-16',
                    time: '10:00 AM',
                    location: 'Fellowship Hall',
                    priority: 'medium',
                    author: 'Women\'s Ministry',
                    views: 312,
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'
                },
                {
                    id: '8',
                    title: 'Building Fund Appeal',
                    description: 'Support our church expansion project. Every seed counts! Let\'s build together for God\'s glory.',
                    fullContent: 'Beloved, as we continue to grow, we need to expand our facilities to accommodate more people. We are launching a building fund campaign to raise funds for our expansion project. We are trusting God for ₦50 million. You can give one-time or pledge monthly. All donations are tax-deductible. Let us build a house for the Lord together. May God richly bless you as you give!',
                    category: 'General',
                    date: '2025-11-10',
                    time: 'Ongoing',
                    location: 'All Services',
                    priority: 'medium',
                    author: 'Building Committee',
                    views: 678,
                    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800'
                }
            ];
            
            setAnnouncements(sampleData);
            setFilteredAnnouncements(sampleData);
            setLoading(false);
        };

        fetchAnnouncements();
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = announcements;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a => a.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAnnouncements(filtered);
    }, [selectedCategory, searchTerm, announcements]);

    const categories = ['all', 'Service', 'Event', 'Prayer', 'Ministry', 'General'];

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return '#DC2626';
            case 'medium': return '#F59E0B';
            case 'low': return '#10B981';
            default: return '#6B7280';
        }
    };

    const getPriorityBg = (priority) => {
        switch(priority) {
            case 'high': return '#FEE2E2';
            case 'medium': return '#FEF3C7';
            case 'low': return '#D1FAE5';
            default: return '#F3F4F6';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
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
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                style={{ focusRingColor: '#B8860B' }}
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
                                    {cat === 'all' ? 'All' : cat}
                                </button>
                            ))}
                        </div>
                    )}
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
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnnouncements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                                onClick={() => setSelectedAnnouncement(announcement)}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={announcement.image} 
                                        alt={announcement.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                        style={{ 
                                            background: getPriorityColor(announcement.priority),
                                        }}>
                                        {announcement.priority.toUpperCase()}
                                    </div>
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ 
                                            background: '#FFD700',
                                            color: '#654321'
                                        }}>
                                        {announcement.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {announcement.description}
                                    </p>

                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                                            <span>{formatDate(announcement.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-4 h-4" style={{ color: '#B8860B' }} />
                                            <span>{announcement.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin className="w-4 h-4" style={{ color: '#B8860B' }} />
                                            <span>{announcement.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Eye size={16} />
                                            <span>{announcement.views} views</span>
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
                        <div className="relative">
                            <img 
                                src={selectedAnnouncement.image} 
                                alt={selectedAnnouncement.title}
                                className="w-full h-64 object-cover"
                            />
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
                                    {selectedAnnouncement.category}
                                </span>
                                <span className="px-4 py-2 rounded-full text-sm font-bold text-white"
                                    style={{ background: getPriorityColor(selectedAnnouncement.priority) }}>
                                    {selectedAnnouncement.priority.toUpperCase()} PRIORITY
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
                                    <Users size={16} style={{ color: '#B8860B' }} />
                                    <span>{selectedAnnouncement.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} style={{ color: '#B8860B' }} />
                                    <span>{formatDate(selectedAnnouncement.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} style={{ color: '#B8860B' }} />
                                    <span>{selectedAnnouncement.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} style={{ color: '#B8860B' }} />
                                    <span>{selectedAnnouncement.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={16} style={{ color: '#B8860B' }} />
                                    <span>{selectedAnnouncement.views} views</span>
                                </div>
                            </div>

                            <div className="prose max-w-none mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                    {selectedAnnouncement.fullContent}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-6 border-t">
                                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
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
        </div>
    );
}