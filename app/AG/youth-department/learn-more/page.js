import React from 'react';
import { Users, BookOpen, Heart, Award, Calendar, MapPin, Zap, Music, Target } from 'lucide-react';
import Link from 'next/link';

export default function YouthDepartment() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="text-white py-16 px-4 shadow-2xl relative overflow-hidden bg-linear-to-br from-purple-600 to-indigo-800 bg-transparent">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-400 transform rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-yellow-400 transform -rotate-12"></div>
                </div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div
                            className="w-32 h-32 rounded-lg flex flex-col items-center justify-center shadow-2xl border-4 p-2"
                            style={{
                                background: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)',
                                borderColor: '#4C1D95',
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="w-50 h-50 object-contain mb-1"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Youth Department</h1>
                    <p className="text-2xl mb-2">Assemblies of God Church Gbazango</p>
                    <p className="text-xl opacity-90">Empowering the Next Generation for Christ</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Vision & Mission */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center" style={{ color: '#7C3AED' }}>
                        <Target className="mr-3" size={32} />
                        Our Vision & Mission
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border-l-4" style={{
                            background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                            borderColor: '#9333EA'
                        }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#6B21A8' }}>Vision</h3>
                            <p className="text-gray-700">
                                To raise a generation of young people who are passionate about God, grounded in His Word,
                                and committed to impacting their world for Christ through authentic faith and bold witness.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4" style={{
                            background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                            borderColor: '#9333EA'
                        }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#6B21A8' }}>Mission</h3>
                            <p className="text-gray-700">
                                To create a vibrant community where young people encounter God's presence, develop their gifts,
                                build lasting friendships, and are equipped to fulfill their divine purpose and calling.
                            </p>
                        </div>
                    </div>
                </section>

                {/* General AG Youth Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center" style={{ color: '#7C3AED' }}>
                        <Zap className="mr-3" size={32} />
                        General Assemblies of God Youth Department
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Assemblies of God Youth Department (AG Youth) is a global movement dedicated to reaching,
                        teaching, and releasing young people to live Spirit-empowered lives. We believe in the potential
                        of every young person to make a significant impact for God's Kingdom.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 rounded-xl shadow-md border-2" style={{
                            background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
                            borderColor: '#7C3AED'
                        }}>
                            <BookOpen className="mb-3" style={{ color: '#4C1D95' }} size={40} />
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#581C87' }}>Spiritual Growth</h3>
                            <p className="text-gray-700">
                                Dynamic Bible studies, prayer meetings, and discipleship programs designed for youth.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2" style={{
                            background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
                            borderColor: '#7C3AED'
                        }}>
                            <Music className="mb-3" style={{ color: '#4C1D95' }} size={40} />
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#581C87' }}>Worship & Arts</h3>
                            <p className="text-gray-700">
                                Creative expression through music, drama, dance, and media ministry.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2" style={{
                            background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
                            borderColor: '#7C3AED'
                        }}>
                            <Heart className="mb-3" style={{ color: '#4C1D95' }} size={40} />
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#581C87' }}>Outreach</h3>
                            <p className="text-gray-700">
                                Evangelism, missions trips, and community service projects to share God's love.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border-2" style={{
                        background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                        borderColor: '#7C3AED'
                    }}>
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#6B21A8' }}>Core Values</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="mr-2" style={{ color: '#9333EA' }}>▶</span>
                                <span><strong>Spirit-Empowered Living:</strong> Experiencing the power and presence of the Holy Spirit daily</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2" style={{ color: '#9333EA' }}>▶</span>
                                <span><strong>Authentic Community:</strong> Building real relationships founded on love, trust, and accountability</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2" style={{ color: '#9333EA' }}>▶</span>
                                <span><strong>Biblical Foundation:</strong> Grounding every aspect of life in God's Word and truth</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2" style={{ color: '#9333EA' }}>▶</span>
                                <span><strong>World Impact:</strong> Living missionally and influencing culture for Christ</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Gbazango Youth Department */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center" style={{ color: '#7C3AED' }}>
                        <MapPin className="mr-3" size={32} />
                        Gbazango District Youth Department
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Gbazango District Youth Department is a vibrant community of young believers passionate about
                        knowing God, serving others, and making a difference in our generation.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 rounded-xl border-2" style={{
                            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                            borderColor: '#7C3AED'
                        }}>
                            <h3 className="text-xl font-bold mb-4" style={{ color: '#6B21A8' }}>Our Activities</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0" style={{ color: '#9333EA' }} size={20} />
                                    <span>Weekly youth service - Every Friday, 5:00 PM</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0" style={{ color: '#9333EA' }} size={20} />
                                    <span>Monthly leadership training and mentorship</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0" style={{ color: '#9333EA' }} size={20} />
                                    <span>Quarterly youth conferences and rallies</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0" style={{ color: '#9333EA' }} size={20} />
                                    <span>Annual youth camp and retreat</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0" style={{ color: '#9333EA' }} size={20} />
                                    <span>Campus ministry and school outreach</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border-2" style={{
                            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                            borderColor: '#7C3AED'
                        }}>
                            <h3 className="text-xl font-bold mb-4" style={{ color: '#6B21A8' }}>Ministry Focus</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold" style={{ color: '#9333EA' }}>•</span>
                                    <span>Praise and worship team development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold" style={{ color: '#9333EA' }}>•</span>
                                    <span>Drama and creative arts ministry</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold" style={{ color: '#9333EA' }}>•</span>
                                    <span>Social media and digital evangelism</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold" style={{ color: '#9333EA' }}>•</span>
                                    <span>Career and purpose discovery workshops</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold" style={{ color: '#9333EA' }}>•</span>
                                    <span>Peer counseling and support groups</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-white p-6 rounded-xl shadow-lg" style={{
                        background: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)'
                    }}>
                        <h3 className="text-2xl font-bold mb-3">Join the Movement!</h3>
                        <p className="text-lg mb-4">
                            Whether you're 13 or 25, single or married, in school or working - there's a place for you
                            in the Gbazango Youth Department. Come experience authentic worship, life-changing teaching,
                            and genuine friendship.
                        </p>
                        <p className="text-lg">
                            <strong>Youth Service:</strong> Every Friday | 5:00 PM<br />
                            <strong>Age Range:</strong> 13-25 years
                        </p>
                    </div>
                </section>

                {/* Special Programs */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center" style={{ color: '#7C3AED' }}>
                        <Award className="mr-3" size={32} />
                        Special Programs
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border-2" style={{
                            background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                            borderColor: '#9333EA'
                        }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#6B21A8' }}>Youth Leaders Institute</h3>
                            <p className="text-gray-700">
                                A comprehensive leadership training program designed to equip young leaders with
                                biblical principles, practical skills, and spiritual maturity to lead effectively.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border-2" style={{
                            background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                            borderColor: '#9333EA'
                        }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#6B21A8' }}>Talent Discovery Hub</h3>
                            <p className="text-gray-700">
                                A platform for young people to discover, develop, and deploy their God-given talents
                                in music, arts, technology, sports, and various creative expressions for Kingdom impact.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-white rounded-2xl shadow-2xl p-12 text-center" style={{
                    background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)'
                }}>
                    <h2 className="text-4xl font-bold mb-4">Your Generation. Your Time. Your Calling.</h2>
                    <p className="text-xl mb-6">
                        Join a community of young people who are on fire for God and making a difference in their world.
                        Don't just exist - live with purpose and passion for Christ!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg" style={{
                            background: '#4C1D95',
                            color: '#E9D5FF'
                        }}>
                            <Link href="/contact">Connect With Us</Link>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 mt-12" style={{
                background: '#4C1D95',
                color: '#E9D5FF'
            }}>
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-lg mb-2">Assemblies of God Church - Gbazango District</p>
                    <p style={{ color: '#C4B5FD' }}>Youth Department | Empowering the Next Generation</p>
                    <p className="mt-4 text-sm" style={{ color: '#A78BFA' }}>&copy; 2025 All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
}