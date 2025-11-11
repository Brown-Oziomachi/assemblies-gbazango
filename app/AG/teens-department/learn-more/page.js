import React from 'react';
import { Users, Zap, Music, Heart, Award, Calendar, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export default function TeensDepartment() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="text-white py-16 px-4 shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple-300 transform rotate-45"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-purple-300 transform -rotate-12"></div>
                </div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-lg flex flex-col items-center justify-center shadow-2xl border-4 border-indigo-900 p-2 bg-gradient-to-br from-purple-600 to-indigo-700">
                            <img
                                src="/logo.png"
                                alt="Church Logo"
                                className="w-50 h-50 object-contain mb-1"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Teens Department</h1>
                    <p className="text-2xl mb-2">Assemblies of God Church Gbazango</p>
                    <p className="text-xl opacity-90">Empowering the Next Generation for Christ</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Vision & Mission */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-purple-700">
                        <Star className="mr-3" size={32} />
                        Our Vision & Mission
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-600">
                            <h3 className="text-xl font-bold mb-3 text-purple-700">Vision</h3>
                            <p className="text-gray-700">
                                To raise a generation of passionate, Spirit-filled teenagers who love God wholeheartedly,
                                stand firm in their faith, and become influential leaders in their schools, communities,
                                and the world.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border-l-4 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-600">
                            <h3 className="text-xl font-bold mb-3 text-purple-700">Mission</h3>
                            <p className="text-gray-700">
                                To create a safe, exciting, and Christ-centered environment where teens can discover
                                their identity in Christ, build authentic friendships, develop their gifts, and grow
                                in their relationship with Jesus.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What We're About */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-purple-700">
                        <Zap className="mr-3" size={32} />
                        What We're All About
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        The Teens Department is more than just a youth group—it's a movement of young people
                        encountering God, discovering purpose, and making a difference. We believe that teenagers
                        are not just the church of tomorrow, but powerful ministers today!
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-purple-500 to-indigo-400 border-purple-600">
                            <Music className="mb-3 text-white" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-white">Worship</h3>
                            <p className="text-purple-50">
                                Experience powerful, contemporary worship that connects you with God's presence.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-purple-500 to-indigo-400 border-purple-600">
                            <Users className="mb-3 text-white" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-white">Community</h3>
                            <p className="text-purple-50">
                                Build real friendships with other teens who share your faith and values.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl shadow-md border-2 bg-gradient-to-br from-purple-500 to-indigo-400 border-purple-600">
                            <Heart className="mb-3 text-white" size={40} />
                            <h3 className="text-xl font-bold mb-2 text-white">Discipleship</h3>
                            <p className="text-purple-50">
                                Grow deeper in your faith through relevant Bible teaching and mentorship.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-purple-50 to-indigo-100 border-indigo-500">
                        <h3 className="text-xl font-bold mb-3 text-purple-700">What Makes Us Different</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="mr-2 text-purple-600">▶</span>
                                <span><strong>Real Talk:</strong> We tackle tough questions and real-life issues from a biblical perspective</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-purple-600">▶</span>
                                <span><strong>Fun & Purpose:</strong> We believe following Jesus should be exciting and life-changing</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-purple-600">▶</span>
                                <span><strong>Leadership Development:</strong> We invest in raising up the next generation of leaders</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-purple-600">▶</span>
                                <span><strong>Safe Space:</strong> A judgment-free zone where you can be yourself and grow</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Our Programs */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-purple-700">
                        <Calendar className="mr-3" size={32} />
                        Our Programs & Activities
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">
                        We've designed our programs to meet you where you are and help you grow in every area of your life.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500">
                            <h3 className="text-xl font-bold mb-4 text-purple-700">Weekly Gatherings</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-purple-600" size={20} />
                                    <span><strong>Sunday Service:</strong> Dynamic teen-focused worship and teaching</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-purple-600" size={20} />
                                    <span><strong>Midweek Connect:</strong> Small groups for deeper relationships and growth</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="mr-3 flex-shrink-0 text-purple-600" size={20} />
                                    <span><strong>Friday Night Live:</strong> Monthly special events, games, and worship nights</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500">
                            <h3 className="text-xl font-bold mb-4 text-purple-700">Special Events</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-purple-600">•</span>
                                    <span><strong>Summer Camp:</strong> Life-changing week away with God and friends</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-purple-600">•</span>
                                    <span><strong>Conferences:</strong> Regional and national youth conferences</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-purple-600">•</span>
                                    <span><strong>Mission Trips:</strong> Local and international outreach opportunities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-purple-600">•</span>
                                    <span><strong>Social Events:</strong> Sports tournaments, movie nights, and hangouts</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-500">
                            <h3 className="text-xl font-bold mb-4 text-purple-700">Ministry Teams</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Worship Team:</strong> Lead worship and develop musical gifts</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Tech Team:</strong> Run sound, lights, and media</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Welcome Team:</strong> Create a welcoming environment for newcomers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Creative Arts:</strong> Drama, dance, and visual arts ministry</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-500">
                            <h3 className="text-xl font-bold mb-4 text-purple-700">Growth Opportunities</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Bible Study Groups:</strong> Dive deeper into God's Word together</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Prayer Ministry:</strong> Learn to pray powerfully and lead others</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Leadership Training:</strong> Develop skills to lead in ministry and life</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 font-bold text-indigo-600">★</span>
                                    <span><strong>Mentorship Program:</strong> One-on-one guidance from mature believers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Join Us Section */}
                <section className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center text-purple-700">
                        <MapPin className="mr-3" size={32} />
                        Join the Movement
                    </h2>

                    <div className="text-white p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-600 to-indigo-700 mb-6">
                        <h3 className="text-2xl font-bold mb-3">You're Invited!</h3>
                        <p className="text-lg mb-4">
                            Whether you're new to faith or have been following Jesus for years, you belong here.
                            Come as you are—we can't wait to meet you!
                        </p>
                        <div className="bg-white text-black bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                            <p className="text-lg mb-2">
                                <strong>📅 When:</strong> Every Sunday | 10:00 AM
                            </p>
                            <p className="text-lg mb-2">
                                <strong>📍 Where:</strong> Assemblies of God Church, Gbazango
                            </p>
                            <p className="text-lg">
                                <strong>👥 Ages:</strong> 13-19 years old
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
                            <Award className="mb-3 text-purple-600" size={40} />
                            <h3 className="text-lg font-bold mb-2 text-purple-800">No Pressure</h3>
                            <p className="text-gray-700">Come check us out with zero obligation. Just come and see what we're about!</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
                            <Users className="mb-3 text-purple-600" size={40} />
                            <h3 className="text-lg font-bold mb-2 text-purple-800">Bring Friends</h3>
                            <p className="text-gray-700">Your friends are always welcome! The more the merrier—let's grow together.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
                            <Heart className="mb-3 text-purple-600" size={40} />
                            <h3 className="text-lg font-bold mb-2 text-purple-800">Safe Space</h3>
                            <p className="text-gray-700">A welcoming environment where you can ask questions and be yourself.</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-white rounded-2xl shadow-2xl p-12 text-center bg-gradient-to-br from-purple-500 to-indigo-600">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Connected?</h2>
                    <p className="text-xl mb-6">
                        Don't miss out on what God is doing in our generation. Join us this Sunday and
                        discover the amazing plans God has for your life!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      
                        <button className="bg-indigo-900 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg hover:bg-indigo-950 border-2 border-white">
                            <Link href="/contact">Connect With Us</Link>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-indigo-900 text-purple-100 py-8 px-4 mt-12">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-lg mb-2">Assemblies of God Church - Gbazango District</p>
                    <p className="text-purple-200">Teens Department | Generation World Changers</p>
                    <p className="mt-4 text-sm text-purple-300">&copy; 2025 All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
}