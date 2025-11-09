"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Church, ArrowLeft, Calendar, MapPin, Clock, Users, Tag, Share2, Bell } from 'lucide-react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    // Fetch events from Firebase
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsQuery = query(
                    collection(db, 'events'),
                    // orderBy('date', 'desc')
                );
                const querySnapshot = await getDocs(eventsQuery);
                const eventsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEvents(eventsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        try {
            // Assuming time is in format "HH:MM"
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch {
            return timeString;
        }
    };

    const isUpcoming = (dateString) => {
        if (!dateString) return false;
        const eventDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
    };

    const filteredEvents = events.filter(event => {
        if (filter === 'upcoming') return isUpcoming(event.date);
        if (filter === 'past') return !isUpcoming(event.date);
        return true;
    });

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
                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
                        alt="Events"
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Upcoming Events</h1>
                        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-100">
                            Join Us in Fellowship & Worship
                        </p>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                            Stay connected with all the exciting events happening at AG Gbazango. From worship services to community outreach, there's always something happening!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-8 bg-white border-b sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {['upcoming', 'past', 'all'].map((filterOption) => (
                            <button
                                key={filterOption}
                                onClick={() => setFilter(filterOption)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    filter === filterOption
                                        ? 'bg-amber-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} Events
                                <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                                    {filterOption === 'upcoming' && events.filter(e => isUpcoming(e.date)).length}
                                    {filterOption === 'past' && events.filter(e => !isUpcoming(e.date)).length}
                                    {filterOption === 'all' && events.length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600 text-lg">Loading events...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h3>
                            <p className="text-gray-600">
                                {filter === 'upcoming' 
                                    ? 'No upcoming events at the moment. Check back soon!' 
                                    : filter === 'past'
                                    ? 'No past events to display.'
                                    : 'Events will appear here once posted from the admin dashboard.'}
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
                            {filteredEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all cursor-pointer"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    {/* Event Image */}
                                    <div className="relative h-56 bg-gradient-to-br from-amber-400 to-amber-600 overflow-hidden">
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Calendar className="w-20 h-20 text-white opacity-50" />
                                            </div>
                                        )}
                                        {isUpcoming(event.date) && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                                    <Bell className="w-4 h-4" />
                                                    Upcoming
                                                </span>
                                            </div>
                                        )}
                                        {event.category && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {event.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Event Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                                            {event.title || 'Untitled Event'}
                                        </h3>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-start gap-3 text-gray-600">
                                                <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm font-medium">{formatDate(event.date)}</span>
                                            </div>
                                            
                                            {event.time && (
                                                <div className="flex items-start gap-3 text-gray-600">
                                                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm font-medium">{formatTime(event.time)}</span>
                                                </div>
                                            )}

                                            {event.location && (
                                                <div className="flex items-start gap-3 text-gray-600">
                                                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm font-medium line-clamp-2">{event.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-700 mb-6 line-clamp-3">
                                            {event.description || 'No description available.'}
                                        </p>

                                        <button className="w-full bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition font-semibold">
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Event Image */}
                        <div className="relative h-80">
                            {selectedEvent.imageUrl ? (
                                <img
                                    src={selectedEvent.imageUrl}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center rounded-t-2xl">
                                    <Calendar className="w-32 h-32 text-white opacity-50" />
                                </div>
                            )}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 bg-white text-gray-600 hover:text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                            >
                                ×
                            </button>
                            {isUpcoming(selectedEvent.date) && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                                        <Bell className="w-4 h-4" />
                                        Upcoming Event
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Event Details */}
                        <div className="p-8">
                            {selectedEvent.category && (
                                <div className="mb-4">
                                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 inline-flex">
                                        <Tag className="w-4 h-4" />
                                        {selectedEvent.category}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-4xl font-bold text-gray-900 mb-6">{selectedEvent.title}</h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="w-6 h-6 text-amber-600" />
                                        <span className="font-bold text-gray-900">Date</span>
                                    </div>
                                    <p className="text-gray-700 ml-9">{formatDate(selectedEvent.date)}</p>
                                </div>

                                {selectedEvent.time && (
                                    <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="w-6 h-6 text-amber-600" />
                                            <span className="font-bold text-gray-900">Time</span>
                                        </div>
                                        <p className="text-gray-700 ml-9">{formatTime(selectedEvent.time)}</p>
                                    </div>
                                )}

                                {selectedEvent.location && (
                                    <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200 md:col-span-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MapPin className="w-6 h-6 text-amber-600" />
                                            <span className="font-bold text-gray-900">Location</span>
                                        </div>
                                        <p className="text-gray-700 ml-9">{selectedEvent.location}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
                                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedEvent.description || 'No description available.'}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button className="flex-1 bg-amber-600 text-white px-6 py-4 rounded-lg hover:bg-amber-700 transition font-bold text-lg flex items-center justify-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Register for Event
                                </button>
                                <button className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-200 transition font-bold flex items-center justify-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>
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