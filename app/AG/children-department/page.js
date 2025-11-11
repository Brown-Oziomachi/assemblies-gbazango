import React from 'react';
import Image from 'next/image';

export default function ChildrensDepartment() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-gradient-to-r from-pink-400 to-red-400 text-white py-12 px-6 text-center shadow-lg">
                <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">🌟 Children's Department 🌟</h1>
                <p className="text-xl mb-2">Assemblies of God Church, Gbazango</p>
                <p className="text-lg italic">"Let the little children come to me" - Mark 10:14</p>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl text-center">
                    <h2 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Our Children's Ministry!</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        We are delighted to have your children join us! Our Children's Department is a safe, fun, and loving
                        environment where kids can learn about Jesus, make new friends, and grow in their faith. Through engaging
                        Bible lessons, worship, games, and activities, we help children discover God's love for them.
                    </p>
                </div>

                {/* Group Photo Section */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl">
                    <h2 className="text-4xl font-bold text-purple-600 text-center mb-6">Our Children's Family</h2>
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl h-96 bg-gradient-to-br from-purple-200 to-blue-200 border-4 border-dashed border-purple-600 rounded-2xl flex flex-col items-center justify-center hover:scale-105 transition-transform">
                            <p className="text-8xl mb-2">📸</p>
                            <p className="text-2xl font-bold text-gray-800 mb-2">Group Photo</p>
                            <p className="text-gray-600 italic">Add your children's group picture here</p>
                            {/* To add actual image, replace the div above with: */}
                            {/* <Image src="/path-to-group-photo.jpg" alt="Children's Group" fill className="object-cover rounded-2xl" /> */}
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:-translate-y-2 transition-transform">
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">📅 When We Meet</h3>
                        <p className="text-gray-700 mb-2"><strong>Sunday School:</strong> Every Sunday at 9:00 AM</p>
                        <p className="text-gray-700 mb-2"><strong>Children's Church:</strong> During Main Service (10:30 AM)</p>
                        <p className="text-gray-700"><strong>Midweek Activities:</strong> Wednesdays at 5:00 PM</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:-translate-y-2 transition-transform">
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">📍 Where to Find Us</h3>
                        <p className="text-gray-700">Children's Department Wing</p>
                        <p className="text-gray-700">Assemblies of God Church</p>
                        <p className="text-gray-700">Gbazango, Minna</p>
                        <p className="text-gray-700">Niger State, Nigeria</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:-translate-y-2 transition-transform">
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">🎯 Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To nurture children in the knowledge of God's Word, helping them develop a personal relationship
                            with Jesus Christ and equipping them to be young disciples who shine His light in the world.
                        </p>
                    </div>
                </div>

                {/* Age Groups */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl">
                    <h2 className="text-4xl font-bold text-purple-600 text-center mb-6">Age Groups</h2>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">🐣 Nursery (0-3 years)</h4>
                            <p className="text-gray-700">A safe and caring environment for our youngest ones with age-appropriate Bible stories, songs, and activities.</p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">🌈 Beginners (4-6 years)</h4>
                            <p className="text-gray-700">Interactive Bible lessons, creative crafts, and fun games that introduce children to God's love.</p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">⭐ Primary (7-9 years)</h4>
                            <p className="text-gray-700">Engaging Bible studies, memory verses, worship, and activities that build strong Christian foundations.</p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">🚀 Juniors (10-12 years)</h4>
                            <p className="text-gray-700">In-depth Bible teaching, leadership opportunities, and activities that challenge kids to grow in their faith.</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl">
                    <h2 className="text-4xl font-bold text-purple-600 text-center mb-8">Meet Our Team</h2>

                    {/* Pastor Section */}
                    <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
                        <h3 className="text-3xl font-bold text-pink-500 mb-6">Children's Pastor</h3>
                        <div className="flex justify-center mb-4">
                            <div className="w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 border-4 border-dashed border-purple-600 rounded-full flex flex-col items-center justify-center hover:scale-105 transition-transform">
                                <p className="text-6xl mb-2">👤</p>
                                <p className="text-xl font-bold text-gray-800">Pastor Photo</p>
                                <p className="text-sm text-gray-600 italic mt-2">Add pastor picture</p>
                                {/* To add actual image: */}
                                {/* <div className="relative w-64 h-64">
                  <Image src="/pastor-photo.jpg" alt="Children's Pastor" fill className="object-cover rounded-full" />
                </div> */}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">Pastor Name</p>
                        <p className="text-gray-600 italic">Children's Department Pastor</p>
                    </div>

                    {/* Teachers Section */}
                    <div>
                        <h3 className="text-3xl font-bold text-pink-500 text-center mb-6">Our Dedicated Teachers</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { id: 1, role: 'Nursery Teacher' },
                                { id: 2, role: 'Beginners Teacher' },
                                { id: 3, role: 'Primary Teacher' },
                                { id: 4, role: 'Juniors Teacher' }
                            ].map((teacher) => (
                                <div key={teacher.id} className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-4 text-center hover:-translate-y-2 transition-transform">
                                    <div className="flex justify-center mb-3">
                                        <div className="w-44 h-44 bg-gradient-to-br from-purple-200 to-blue-200 border-4 border-dashed border-purple-600 rounded-full flex flex-col items-center justify-center">
                                            <p className="text-5xl mb-1">👤</p>
                                            <p className="text-sm font-bold text-gray-800">Teacher {teacher.id}</p>
                                            {/* To add actual image: */}
                                            {/* <div className="relative w-44 h-44">
                        <Image src={`/teacher-${teacher.id}.jpg`} alt={`Teacher ${teacher.id}`} fill className="object-cover rounded-full" />
                      </div> */}
                                        </div>
                                    </div>
                                    <p className="text-xl font-bold text-gray-800 mb-1">Teacher Name</p>
                                    <p className="text-gray-600 italic">{teacher.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Activities */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl">
                    <h2 className="text-4xl font-bold text-purple-600 text-center mb-6">What We Do</h2>
                    <ul className="space-y-3">
                        {[
                            'Interactive Bible Lessons & Stories',
                            'Worship & Praise Songs',
                            'Scripture Memory & Competitions',
                            'Arts & Crafts',
                            'Games & Recreation',
                            'Drama & Skits',
                            'Special Events & Celebrations',
                            'Vacation Bible School',
                            "Children's Choir"
                        ].map((activity, index) => (
                            <li key={index} className="bg-gradient-to-r from-teal-100 to-pink-100 rounded-xl p-4 text-lg text-gray-800">
                                <span className="mr-3">⭐</span>{activity}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-3xl p-8 my-8 shadow-2xl text-center">
                    <h2 className="text-4xl font-bold text-pink-500 mb-6">Get In Touch</h2>
                    <p className="text-lg text-gray-700 mb-2">For more information about our Children's Department, please contact:</p>
                    <p className="text-xl font-bold text-gray-800 mt-4">Children's Department Coordinator</p>
                    <p className="text-lg text-gray-700">📞 Phone: [Contact Number]</p>
                    <p className="text-lg text-gray-700">📧 Email: [Email Address]</p>
                    <p className="text-xl font-bold text-purple-600 mt-4">We'd love to meet you and your family!</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black bg-opacity-20 text-white text-center py-6 mt-12">
                <p>&copy; 2024 Assemblies of God Church, Gbazango | Raising Godly Children for His Glory</p>
            </footer>
        </div>
    );
}