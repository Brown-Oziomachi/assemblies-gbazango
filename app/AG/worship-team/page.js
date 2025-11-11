"use client"
import React, { useState } from 'react';
import Image from 'next/image';

export default function WorshipTeam() {
    const [activeTab, setActiveTab] = useState('about');

    const teamMembers = [
        { id: 1, name: 'Worship Leader Name', role: 'Worship Leader', instrument: 'Vocals', image: '/AG.jpeg' },
        { id: 2, name: 'Team Member Name', role: 'Assistant Worship Leader', instrument: 'Vocals' },
        { id: 3, name: 'Team Member Name', role: 'Music Director', instrument: 'Keyboard' },
        { id: 4, name: 'Team Member Name', role: 'Instrumentalist', instrument: 'Guitar' },
        { id: 5, name: 'Team Member Name', role: 'Instrumentalist', instrument: 'Bass Guitar' },
        { id: 6, name: 'Team Member Name', role: 'Instrumentalist', instrument: 'Drums' },
        { id: 7, name: 'Team Member Name', role: 'Backing Vocalist', instrument: 'Vocals' },
        { id: 8, name: 'Team Member Name', role: 'Backing Vocalist', instrument: 'Vocals' },
    ];

    const schedules = [
        { day: 'Sunday', time: '7:00 AM - 8:30 AM', service: 'First Service Rehearsal' },
        { day: 'Sunday', time: '8:00 AM - 12:15 AM', service: 'Main Service' },
        { day: 'Tuesday', time: '6:00 PM - 8:00 PM', service: 'Mid-Week Service' },
        { day: 'Thursday', time: '6:00 PM - 8:00 PM', service: 'Team Rehearsal' },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 to-blue-600/30 z-10"></div>

                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-blue-900">
                    {/* Replace with actual hero image */}
                    <Image src="/AG.jpeg" alt="Worship Team" fill className="object-cover" />
                </div>

                <div className="relative z-20 text-center text-white px-4 max-w-5xl">
                    <div className="mb-6 inline-block">
                        <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                    </div>
                    <h1 className="text-7xl font-bold mb-6 leading-tight">
                        Worship <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Team</span>
                    </h1>
                    <p className="text-2xl mb-4 font-light">Assemblies of God Church, Gbazango</p>
                    <p className="text-xl italic opacity-90 mb-8">"Worship the Lord in the splendor of His holiness" - Psalm 29:2</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setActiveTab('about')} className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                            Learn More
                        </button>
                        <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all">
                            Join The Team
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center gap-2 py-4 flex-wrap">
                        {['about', 'team', 'schedule', 'join'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === tab
                                        ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* About Section */}
                {activeTab === 'about' && (
                    <div className="space-y-12 animate-fadeIn">
                        <div className="text-center mb-16">
                            <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                            <h2 className="text-5xl font-bold text-white mb-6">Our Ministry</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                We are a passionate team dedicated to creating an atmosphere where God's presence is tangible
                                and hearts are drawn into authentic worship.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
                                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                                    🎵
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    To cultivate a culture of worship that goes beyond Sunday services, empowering believers to live
                                    lives of continuous praise and intimate connection with God. We believe worship is not just what we do,
                                    but who we are.
                                </p>
                            </div>

                            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
                                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                                    🎯
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    To lead God's people into His presence through Spirit-filled worship, excellence in musical ministry,
                                    and hearts fully surrendered to Him. We strive to create an environment where every believer encounters
                                    the transforming power of worship.
                                </p>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-purple-900/40 to-pink-900/40 rounded-3xl p-12 border border-purple-500/30 mt-12">
                            <h3 className="text-4xl font-bold text-white mb-8 text-center">Our Core Values</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                        ✨
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3">Excellence</h4>
                                    <p className="text-gray-300">Offering our best to honor God in everything we do</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                        ❤️
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3">Authenticity</h4>
                                    <p className="text-gray-300">Worshiping in spirit and truth with genuine hearts</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                        🤝
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3">Unity</h4>
                                    <p className="text-gray-300">Serving together as one body with one purpose</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Team Section */}
                {activeTab === 'team' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-16">
                            <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                            <h2 className="text-5xl font-bold text-white mb-6">Meet Our Team</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Dedicated servants using their gifts to lead God's people in worship
                            </p>
                        </div>

                        {/* Team Photo */}
                        <div className="mb-16">
                            <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-purple-500/30 hover:border-purple-500/60 transition-all">
                                <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-8xl mb-4">🎤</p>
                                        <p className="text-3xl font-bold text-white mb-2">Team Photo</p>
                                        <p className="text-gray-300 italic">Add your worship team group photo here</p>
                                    </div>
                                    <Image src="/AG.jpeg" alt="Worship Team" fill className="object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* Team Members Grid */}
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                                    {teamMembers.map((member) => (
                                                        <div key={member.id} className="group">
                                                            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                                                                <div className="relative h-64 bg-linear-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                                                                    {member.image ? (
                                                                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                                                                    ) : (
                                                                        <div className="text-center">
                                                                            <p className="text-6xl mb-2">👤</p>
                                                                            <p className="text-sm text-gray-300">Member Photo</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="p-6">
                                                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                                                    <p className="text-purple-400 font-semibold mb-1">{member.role}</p>
                                                                    <p className="text-gray-400 text-sm">{member.instrument}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Schedule Section */}
                {activeTab === 'schedule' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-16">
                            <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                            <h2 className="text-5xl font-bold text-white mb-6">Ministry Schedule</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Join us as we minister in worship throughout the week
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-4">
                            {schedules.map((schedule, index) => (
                                <div key={index} className="bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/60 transition-all hover:shadow-xl hover:shadow-purple-500/20">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                {schedule.day.substring(0, 3).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{schedule.service}</h3>
                                                <p className="text-purple-400 font-semibold">{schedule.time}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <span className="inline-block px-4 py-2 bg-purple-600/30 text-purple-300 rounded-full text-sm font-semibold">
                                                {schedule.day}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-linear-to-br from-purple-900/40 to-pink-900/40 rounded-3xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4 text-center">Rehearsal Guidelines</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Attendance</h4>
                                    <p>Regular attendance at rehearsals is mandatory for all team members</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Punctuality</h4>
                                    <p>Please arrive 15 minutes early for setup and sound check</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Preparation</h4>
                                    <p>Practice songs at home before rehearsal sessions</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Communication</h4>
                                    <p>Notify the team leader if you cannot attend a session</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Join Section */}
                {activeTab === 'join' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-16">
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                            <h2 className="text-5xl font-bold text-white mb-6">Join Our Team</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Do you have a passion for worship? We'd love to have you serve with us!
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-purple-500/20">
                                    <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                                        🎤
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Vocalists</h3>
                                    <p className="text-gray-300 mb-4">We're looking for singers who can lead worship and provide harmonies</p>
                                    <ul className="space-y-2 text-gray-400">
                                        <li>• Strong vocal ability</li>
                                        <li>• Ability to harmonize</li>
                                        <li>• Heart for worship</li>
                                        <li>• Regular availability</li>
                                    </ul>
                                </div>

                                <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-purple-500/20">
                                    <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                                        🎸
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Musicians</h3>
                                    <p className="text-gray-300 mb-4">We need skilled instrumentalists to complete our band</p>
                                    <ul className="space-y-2 text-gray-400">
                                        <li>• Guitar (Lead & Rhythm)</li>
                                        <li>• Bass Guitar</li>
                                        <li>• Keyboard/Piano</li>
                                        <li>• Drums/Percussion</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-purple-900/40 to-pink-900/40 rounded-3xl p-10 border border-purple-500/30">
                                <h3 className="text-3xl font-bold text-white mb-6 text-center">Requirements</h3>
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="text-xl font-bold text-purple-400 mb-4">Spiritual</h4>
                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Born-again believer with a personal relationship with Jesus</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Active member of AG Church Gbazango</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Living a lifestyle that honors God</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Heart for worship ministry</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-purple-400 mb-4">Practical</h4>
                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Proficiency in your instrument or vocal ability</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Commitment to regular rehearsals and services</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Teachable spirit and willingness to grow</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>Team player with excellent attitude</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="border-t border-purple-500/30 pt-8 text-center">
                                    <h4 className="text-2xl font-bold text-white mb-4">Ready to Join?</h4>
                                    <p className="text-gray-300 mb-6">Contact our worship team coordinator to schedule an audition</p>
                                    <div className="space-y-2 text-gray-300">
                                        <p><strong className="text-purple-400">Coordinator:</strong> [Name]</p>
                                        <p><strong className="text-purple-400">Phone:</strong> [Contact Number]</p>
                                        <p><strong className="text-purple-400">Email:</strong> [Email Address]</p>
                                    </div>
                                    <button className="mt-6 px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-purple-500/30 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-2">
                            Worship Team
                        </h3>
                        <p className="text-gray-400">Assemblies of God Church, Gbazango</p>
                    </div>
                    <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                    <p className="text-gray-400">&copy; 2025 AG Church Gbazango | Leading God's People into His Presence</p>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}