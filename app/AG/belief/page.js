"use client";
import Footer from '@/components/Footer/page';
import { motion } from 'framer-motion';
import { Book, Cross, Heart, Flame, Users, Globe, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BeliefsPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // Core Beliefs of Assemblies of God
    const coreBeliefs = [
        {
            icon: Book,
            title: "The Scriptures Inspired",
            description: "We believe the Bible is the inspired and only infallible and authoritative written Word of God.",
            verse: "2 Timothy 3:16-17"
        },
        {
            icon: Cross,
            title: "The One True God",
            description: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
            verse: "Matthew 28:19"
        },
        {
            icon: Heart,
            title: "Salvation Through Christ",
            description: "We believe that salvation is received through repentance toward God and faith in the Lord Jesus Christ.",
            verse: "Acts 20:21"
        },
        {
            icon: Flame,
            title: "Baptism in the Holy Spirit",
            description: "We believe in the baptism in the Holy Spirit with the initial physical evidence of speaking in tongues.",
            verse: "Acts 2:4"
        },
        {
            icon: Users,
            title: "The Church",
            description: "We believe the Church is the Body of Christ, the habitation of God through the Spirit.",
            verse: "Ephesians 2:22"
        },
        {
            icon: Globe,
            title: "The Ministry and Evangelism",
            description: "We believe it is the will of God that the Church continue Jesus' ministry of preaching the gospel to all nations.",
            verse: "Mark 16:15-20"
        },
        {
            icon: Shield,
            title: "Divine Healing",
            description: "We believe divine healing is an integral part of the gospel and is provided for all believers today.",
            verse: "James 5:14-15"
        },
        {
            icon: Cross,
            title: "The Blessed Hope",
            description: "We believe in the imminent, personal, pre-millennial return of our Lord Jesus Christ.",
            verse: "1 Thessalonians 4:16-17"
        }
    ];

    const fundamentalTruths = [
        {
            number: "1",
            title: "The Scriptures Inspired",
            content: "The Scriptures, both the Old and New Testaments, are verbally inspired of God and are the revelation of God to man, the infallible, authoritative rule of faith and conduct."
        },
        {
            number: "2",
            title: "The One True God",
            content: "The one true God has revealed Himself as the eternally self-existent 'I AM,' the Creator of heaven and earth and the Redeemer of mankind. He has further revealed Himself as embodying the principles of relationship and association as Father, Son, and Holy Ghost."
        },
        {
            number: "3",
            title: "The Deity of the Lord Jesus Christ",
            content: "The Lord Jesus Christ is the eternal Son of God. The Scriptures declare His virgin birth, His sinless life, His miracles, His substitutionary work on the cross, His bodily resurrection from the dead, and His exaltation to the right hand of God."
        },
        {
            number: "4",
            title: "The Fall of Man",
            content: "Man was created good and upright; for God said, 'Let us make man in our image, after our likeness.' However, man by voluntary transgression fell and thereby incurred not only physical death but also spiritual death, which is separation from God."
        },
        {
            number: "5",
            title: "The Salvation of Man",
            content: "Man's only hope of redemption is through the shed blood of Jesus Christ the Son of God. Salvation is received through repentance toward God and faith toward the Lord Jesus Christ."
        },
        {
            number: "6",
            title: "The Ordinances of the Church",
            content: "Baptism in water by immersion and Holy Communion are ordinances commanded by our Lord Jesus Christ. They are to be observed by the Church until His return."
        },
        {
            number: "7",
            title: "The Baptism in the Holy Spirit",
            content: "All believers are entitled to and should ardently expect and earnestly seek the promise of the Father, the baptism in the Holy Ghost and fire, according to the command of our Lord Jesus Christ. This was the normal experience of all in the early Christian Church."
        },
        {
            number: "8",
            title: "The Evidence of the Baptism in the Holy Spirit",
            content: "The baptism of believers in the Holy Ghost is witnessed by the initial physical sign of speaking with other tongues as the Spirit of God gives them utterance."
        },
        {
            number: "9",
            title: "Sanctification",
            content: "Sanctification is an act of separation from that which is evil, and of dedication unto God. The Scriptures teach a life of 'holiness without which no man shall see the Lord.'"
        },
        {
            number: "10",
            title: "The Church and Its Mission",
            content: "The Church is the Body of Christ, the habitation of God through the Spirit, with divine appointments for the fulfillment of her great commission. Each believer, born of the Spirit, is an integral part of the General Assembly and Church of the Firstborn."
        },
        {
            number: "11",
            title: "The Ministry",
            content: "A divinely called and scripturally ordained ministry has been provided by our Lord for the threefold purpose of leading the Church in evangelization, worship, and building a body of saints being perfected in the image of His Son."
        },
        {
            number: "12",
            title: "Divine Healing",
            content: "Divine healing is an integral part of the gospel. Deliverance from sickness is provided for in the atonement, and is the privilege of all believers."
        },
        {
            number: "13",
            title: "The Blessed Hope",
            content: "The resurrection of those who have fallen asleep in Christ and their translation together with those who are alive and remain unto the coming of the Lord is the imminent and blessed hope of the church."
        },
        {
            number: "14",
            title: "The Millennial Reign of Christ",
            content: "The second coming of Christ includes the rapture of the saints, which is our blessed hope, followed by the visible return of Christ with His saints to reign on earth for one thousand years."
        },
        {
            number: "15",
            title: "The Final Judgment",
            content: "There will be a final judgment in which the wicked dead will be raised and judged according to their works. Whosoever is not found written in the Book of Life shall be cast into the lake of fire."
        },
        {
            number: "16",
            title: "The New Heavens and the New Earth",
            content: "We, according to His promise, look for new heavens and a new earth wherein dwelleth righteousness."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Back to Home Button */}
            <Link href="/">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/20 transition-all group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to Home</span>
                </motion.button>
                
            </Link>

            {/* Hero Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative h-[60vh] flex items-center justify-center overflow-hidden"
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-900"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <motion.div
                        variants={fadeInUp}
                        className="inline-block mb-6 px-6 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30"
                    >
                        <span className="text-amber-400 font-semibold">What We Believe</span>
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Our <span className="text-amber-400">Beliefs</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Rooted in Scripture, empowered by the Spirit, and committed to sharing the Gospel of Jesus Christ with all nations
                    </motion.p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </motion.div>

            {/* Core Beliefs Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-20"
            >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Core <span className="text-amber-400">Biblical Truths</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        These foundational beliefs guide our faith, worship, and service to God
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreBeliefs.map((belief, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 group"
                        >
                            <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <belief.icon className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                {belief.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                {belief.description}
                            </p>
                            <div className="pt-3 border-t border-gray-700">
                                <p className="text-amber-400 text-xs font-semibold">{belief.verse}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Statement of Faith Banner */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-linear-to-r from-amber-900/90 to-amber-800/70 border-y border-amber-500/20 py-16"
            >
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        16 Fundamental Truths
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        The Assemblies of God has 16 fundamental truths, a core set of doctrines that express our biblical convictions and describe our purpose as a Christian fellowship.
                    </p>
                </div>
            </motion.div>

            {/* Fundamental Truths Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-5xl mx-auto px-4 py-20"
            >
                <div className="space-y-6">
                    {fundamentalTruths.map((truth, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-8">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl font-bold text-white">{truth.number}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                                            {truth.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {truth.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-4xl mx-auto px-4 pb-20 text-center"
            >
                <div className="bg-linear-to-r from-amber-900/90 to-amber-800/70 backdrop-blur-sm p-12 rounded-3xl border border-amber-500/20">
                    <Book className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Want to Learn More?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        If you have questions about our beliefs or want to explore the Bible further, we'd love to connect with you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all">
                         <Link href="/contact">Contact Us</Link>
                        </button>
                        <button className="bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/20 transition-all">
                            <Link href="/direction">Visit Our Church</Link>
                        </button>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}