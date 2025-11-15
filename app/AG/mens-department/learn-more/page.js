import React from 'react';
import { Users, BookOpen, Heart, Award, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

export default function MensDepartment() {
    return (
        <>
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
                                <img
                                    src="/AG.jpeg"
                                    alt="AG Church"
                                    className="w-10 h-10"
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                                    <p className="text-xs text-amber-600">Gbazango District</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="text-white py-16 px-4 shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-blue-300 transform rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-blue-300 transform -rotate-12"></div>
                </div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-lg flex flex-col items-center justify-center shadow-2xl border-4 border-blue-900 p-2 bg-gradient-to-br from-blue-600 to-blue-800">
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="w-50 h-50 object-contain mb-1"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Men's Department</h1>
                    <p className="text-2xl mb-2">Assemblies of God Church Gbazango</p>
                    <p className="text-xl opacity-90">Building Godly Men, Strengthening Families</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Vision & Mission */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-700">
                        <Award className="mr-3" size={32} />
                        Our Vision & Mission
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-600">
                            <h3 className="text-xl font-bold mb-3 text-blue-700">Vision</h3>
                            <p className="text-gray-700">
                                To raise godly men who are spiritual leaders in their homes, churches, and communities,
                                demonstrating Christ-like character and advancing the Kingdom of God.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-600">
                            <h3 className="text-xl font-bold mb-3 text-blue-700">Mission</h3>
                            <p className="text-gray-700">
                                To equip, empower, and encourage men through fellowship, discipleship, and service,
                                enabling them to fulfill their God-given purpose and calling.
                            </p>
                        </div>
                    </div>
                </section>

                {/* General AG Men's Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-700">
                        <Users className="mr-3" size={32} />
                        General Assemblies of God Men's Department
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Assemblies of God Men's Department (AGMD) is a worldwide ministry dedicated to helping men
                        become effective disciples of Jesus Christ. We focus on spiritual growth, leadership development,
                        and community outreach.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-blue-500 to-blue-300 border-blue-600">
                            <BookOpen className="mb-3 text-blue-900" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-blue-900">Discipleship</h3>
                            <p className="text-gray-800">
                                Bible studies, prayer groups, and mentorship programs to deepen spiritual walk.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-blue-500 to-blue-300 border-blue-600">
                            <Heart className="mb-3 text-blue-900" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-blue-900">Fellowship</h3>
                            <p className="text-gray-800">
                                Building brotherhood through gatherings, retreats, and community activities.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-blue-500 to-blue-300 border-blue-600">
                            <Award className="mb-3 text-blue-900" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-blue-900">Service</h3>
                            <p className="text-gray-800">
                                Practical ministry through outreach, missions, and community service projects.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500">
                        <h3 className="text-xl font-bold mb-3 text-blue-700">Core Values</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="mr-2 text-blue-600">▶</span>
                                <span><strong>Spiritual Growth:</strong> Developing a deeper relationship with God through prayer and study</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-blue-600">▶</span>
                                <span><strong>Leadership:</strong> Equipping men to lead in their homes, churches, and workplaces</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-blue-600">▶</span>
                                <span><strong>Integrity:</strong> Living lives of honesty, purity, and moral excellence</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-blue-600">▶</span>
                                <span><strong>Brotherhood:</strong> Creating authentic relationships and accountability among men</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Gbazango Men's Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-700">
                        <MapPin className="mr-3" size={32} />
                        Gbazango District Men's Department
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Gbazango District Men's Department serves the local assembly with passion and dedication,
                        focusing on the unique needs and opportunities within our community.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-500">
                            <h3 className="text-xl font-bold mb-4 text-blue-700">Our Activities</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-blue-600" size={20} />
                                    <span>Monthly men's fellowship meetings</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-blue-600" size={20} />
                                    <span>Quarterly leadership training sessions</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-blue-600" size={20} />
                                    <span>Annual men's conference and retreat</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-blue-600" size={20} />
                                    <span>Community outreach and evangelism</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-blue-600" size={20} />
                                    <span>Youth mentorship programs</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-500">
                            <h3 className="text-xl font-bold mb-4 text-blue-700">Ministry Focus</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-blue-600">•</span>
                                    <span>Marriage and family strengthening workshops</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-blue-600">•</span>
                                    <span>Financial stewardship and biblical economics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-blue-600">•</span>
                                    <span>Prayer and intercession for the church and nation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-blue-600">•</span>
                                    <span>Supporting church building and maintenance projects</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-blue-600">•</span>
                                    <span>Discipleship of new converts and young believers</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-white p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-600 to-blue-800">
                        <h3 className="text-2xl font-bold mb-3">Join Us!</h3>
                        <p className="text-lg mb-4">
                            Every man is welcome to join our fellowship. Whether you're a new believer or have walked
                            with Christ for years, there's a place for you in the Gbazango Men's Department.
                        </p>
                        <p className="text-lg">
                            <strong>Meeting Time:</strong> First Saturday of every month | 8:00 AM
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-white rounded-2xl shadow-2xl p-12 text-center bg-gradient-to-br from-blue-500 to-blue-700">
                    <h2 className="text-4xl font-bold mb-4">Be Part of Something Greater</h2>
                    <p className="text-xl mb-6">
                        Join a community of men committed to growing in faith, leading with integrity,
                        and making a difference in the Kingdom of God.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg hover:bg-blue-950">
                            <Link href="/contact">Connect With Us</Link>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-blue-900 text-blue-100 py-8 px-4 mt-12">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-lg mb-2">Assemblies of God Church - Gbazango District</p>
                    <p className="text-blue-200">Men's Department | Building Champions for Christ</p>
                </div>
            </footer>
            <Footer />
        </div>
        </>
    );
}