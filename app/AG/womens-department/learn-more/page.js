import React from 'react';
import { Users, BookOpen, Heart, Award, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

export default function WomensDepartment() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="text-white py-16 px-4 shadow-2xl relative overflow-hidden bg-gradient-to-r from-pink-900/90 to-rose-800/70">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-rose-300 transform rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-rose-300 transform -rotate-12"></div>
                </div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div
                            className="w-32 h-32 rounded-lg flex flex-col items-center justify-center shadow-2xl border-4 p-2 bg-gradient-to-br from-rose-600 to-pink-700"
                            style={{
                                borderColor: '#BE185D',
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="w-50 h-50 object-contain mb-1"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Women's Fellowship</h1>
                    <p className="text-2xl mb-2">Assemblies of God Church Gbazango</p>
                    <p className="text-xl opacity-90">Empowering Women in Faith and Purpose</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Vision & Mission */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-rose-800">
                        <Award className="mr-3" size={32} />
                        Our Vision & Mission
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-pink-50 to-rose-50 border-rose-600">
                            <h3 className="text-xl font-bold mb-3 text-rose-800">Vision</h3>
                            <p className="text-gray-700">
                                To nurture a generation of godly women who are spiritually strong, emotionally healthy,
                                and purposefully living out their faith in every sphere of life.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-pink-50 to-rose-50 border-rose-600">
                            <h3 className="text-xl font-bold mb-3 text-rose-800">Mission</h3>
                            <p className="text-gray-700">
                                Creating a safe space where women discover their identity in Christ, build meaningful relationships,
                                and develop their gifts to impact the kingdom.
                            </p>
                        </div>
                    </div>
                </section>

                {/* General AG Women's Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-rose-800">
                        <Users className="mr-3" size={32} />
                        General Assemblies of God Women's Fellowship
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Assemblies of God Women's Fellowship (AGWF) is a global ministry dedicated to helping women
                        become effective disciples of Jesus Christ. We focus on spiritual growth, leadership development,
                        and community impact.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-rose-100 to-pink-100 border-rose-400">
                            <BookOpen className="mb-3 text-rose-800" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-rose-900">Discipleship</h3>
                            <p className="text-gray-700">
                                Bible studies, prayer circles, and mentorship programs to deepen spiritual walk.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-rose-100 to-pink-100 border-rose-400">
                            <Heart className="mb-3 text-rose-800" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-rose-900">Fellowship</h3>
                            <p className="text-gray-700">
                                Building sisterhood through gatherings, retreats, and community activities.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-rose-100 to-pink-100 border-rose-400">
                            <Award className="mb-3 text-rose-800" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-rose-900">Service</h3>
                            <p className="text-gray-700">
                                Practical ministry through outreach, missions, and compassionate service projects.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-pink-50 to-rose-50 border-rose-400">
                        <h3 className="text-xl font-bold mb-3 text-rose-800">Core Values</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="mr-2 text-rose-600">▶</span>
                                <span><strong>Spiritual Growth:</strong> Developing a deeper relationship with God through prayer and worship</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-rose-600">▶</span>
                                <span><strong>Leadership:</strong> Equipping women to lead in their homes, churches, and communities</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-rose-600">▶</span>
                                <span><strong>Integrity:</strong> Living lives of honesty, purity, and moral excellence</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-rose-600">▶</span>
                                <span><strong>Sisterhood:</strong> Creating authentic relationships and support among women</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Gbazango Women's Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-rose-800">
                        <MapPin className="mr-3" size={32} />
                        Gbazango District Women's Fellowship
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Gbazango District Women's Fellowship serves the local assembly with passion and dedication,
                        focusing on the unique needs and opportunities within our community.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-400">
                            <h3 className="text-xl font-bold mb-4 text-rose-800">Our Activities</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-rose-600" size={20} />
                                    <span>Weekly women's prayer meetings</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-rose-600" size={20} />
                                    <span>Monthly fellowship and Bible study</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-rose-600" size={20} />
                                    <span>Annual women's conference and retreat</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-rose-600" size={20} />
                                    <span>Community outreach and compassion ministry</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-rose-600" size={20} />
                                    <span>Craft and skills development workshops</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-400">
                            <h3 className="text-xl font-bold mb-4 text-rose-800">Ministry Focus</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-rose-600">•</span>
                                    <span>Marriage and family enrichment programs</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-rose-600">•</span>
                                    <span>Mentorship for young women and girls</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-rose-600">•</span>
                                    <span>Prayer and intercession for families and nation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-rose-600">•</span>
                                    <span>Support for widows, orphans, and vulnerable women</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-rose-600">•</span>
                                    <span>Empowerment through skills and entrepreneurship</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-white p-6 rounded-xl shadow-lg bg-gradient-to-r from-rose-700 to-pink-600">
                        <h3 className="text-2xl font-bold mb-3">Join Us!</h3>
                        <p className="text-lg mb-4">
                            Every woman is welcome to join our fellowship. Whether you're a new believer or have walked
                            with Christ for years, there's a place for you in the Gbazango Women's Fellowship.
                        </p>
                        <p className="text-lg">
                            <strong>Meeting Time:</strong> Every Wednesday | 10:00 AM
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-white rounded-2xl shadow-2xl p-12 text-center bg-gradient-to-r from-pink-600 to-rose-600">
                    <h2 className="text-4xl font-bold mb-4">Be Part of Something Beautiful</h2>
                    <p className="text-xl mb-6">
                        Join a community of women committed to growing in faith, leading with grace,
                        and making a difference in the Kingdom of God.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-rose-900 hover:bg-rose-800 rounded-lg font-bold text-lg transition-colors shadow-lg text-white">
                            <Link href="/contact">Connect With Us</Link>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-rose-900 text-rose-100 py-8 px-4 mt-12">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-lg mb-2">Assemblies of God Church - Gbazango District</p>
                    <p className="text-rose-200">Women's Fellowship | Empowering Women in Faith and Purpose</p>
                    <p className="mt-4 text-sm text-rose-300">&copy; 2025 All Rights Reserved</p>
                </div>
            </footer>
            <Footer />
        </div>
    );
}