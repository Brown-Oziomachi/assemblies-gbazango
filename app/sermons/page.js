"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Church, ArrowLeft, Play, Download, Calendar, User, Search, Filter, Video, Music } from 'lucide-react';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default function SermonsPage() {
    const [sermons, setSermons] = useState([]);
    const [filteredSermons, setFilteredSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSermon, setSelectedSermon] = useState(null);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // Fetch sermons from Firebase
    useEffect(() => {
        const fetchSermons = async () => {
            try {
                const sermonsQuery = query(
                    collection(db, 'sermons'),
                    orderBy('date', 'desc'),
                    limit(50)
                );
                const querySnapshot = await getDocs(sermonsQuery);
                const sermonsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSermons(sermonsData);
                setFilteredSermons(sermonsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sermons:', error);
                setLoading(false);
            }
        };

        fetchSermons();
    }, []);

    // Filter sermons based on search and category
    useEffect(() => {
        let filtered = sermons;

        if (searchTerm) {
            filtered = filtered.filter(sermon =>
                sermon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sermon.speaker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sermon.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(sermon => sermon.category === selectedCategory);
        }

        setFilteredSermons(filtered);
    }, [searchTerm, selectedCategory, sermons]);

    const categories = ['all', 'Sunday Service', 'Wednesday Service', 'Special Event', 'Bible Study', 'Youth Service'];

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </a>
                        <div className="flex items-center gap-3">
                            <Church className="w-8 h-8 text-amber-600" />
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                                <p className="text-xs text-amber-600">Gbazango District</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200"
                        alt="Sermons"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-amber-800/70" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Sermons</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
                            Messages That Transform Lives
                        </p>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                            Listen to powerful teachings from God's Word. Watch, download, and be blessed by sermons that will strengthen your faith and inspire your walk with Christ.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search sermons by title, speaker, or topic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none text-gray-900"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-12 pr-8 py-4 border-2 border-gray-200 rounded-lg focus:border-amber-600 focus:outline-none text-gray-900 bg-white appearance-none cursor-pointer min-w-[200px]"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 text-gray-600">
                        Showing {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </section>

            {/* Sermons Grid */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600 text-lg">Loading sermons...</p>
                        </div>
                    ) : filteredSermons.length === 0 ? (
                        <div className="text-center py-20">
                            <Music className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Sermons Found</h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Sermons will appear here once posted from the admin dashboard.'}
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredSermons.map((sermon) => (
                                <motion.div
                                    key={sermon.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-56 bg-gradient-to-br from-amber-400 to-amber-600 overflow-hidden">
                                        {sermon.thumbnailUrl ? (
                                            <img
                                                src={sermon.thumbnailUrl}
                                                alt={sermon.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Video className="w-20 h-20 text-white opacity-50" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setSelectedSermon(sermon)}
                                                className="bg-white text-amber-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-amber-50 transition"
                                            >
                                                <Play className="w-8 h-8 ml-1" />
                                            </button>
                                        </div>
                                        {sermon.category && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {sermon.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {sermon.title || 'Untitled Sermon'}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                <span>{sermon.speaker || 'Unknown'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(sermon.date)}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-6 line-clamp-3">
                                            {sermon.description || 'No description available.'}
                                        </p>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setSelectedSermon(sermon)}
                                                className="flex-1 bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition font-semibold flex items-center justify-center gap-2"
                                            >
                                                <Play className="w-4 h-4" />
                                                Watch
                                            </button>
                                            {sermon.audioUrl && (
                                                <a
                                                    href={sermon.audioUrl}
                                                    download
                                                    className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Sermon Player Modal */}
            {selectedSermon && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSermon(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            {selectedSermon.videoUrl ? (
                                <video
                                    controls
                                    autoPlay
                                    className="w-full h-[400px] bg-black rounded-t-2xl"
                                    src={selectedSermon.videoUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full h-[400px] bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center rounded-t-2xl">
                                    <Video className="w-32 h-32 text-white opacity-50" />
                                </div>
                            )}
                            <button
                                onClick={() => setSelectedSermon(null)}
                                className="absolute top-4 right-4 bg-white text-gray-600 hover:text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="mb-6">
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {selectedSermon.category}
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedSermon.title}</h2>

                            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-semibold">{selectedSermon.speaker}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{formatDate(selectedSermon.date)}</span>
                                </div>
                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {selectedSermon.description}
                            </p>

                            {selectedSermon.audioUrl && (
                                <div className="mt-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Audio Version</h3>
                                    <audio controls className="w-full">
                                        <source src={selectedSermon.audioUrl} />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Church className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-sm mb-2">&copy; 2025 Assemblies of God Church - Gbazango District. All rights reserved.</p>
                    <p className="text-amber-400 font-semibold">A Community of Faith, Hope, and Love</p>
                </div>
            </footer>
        </div>
    );
}