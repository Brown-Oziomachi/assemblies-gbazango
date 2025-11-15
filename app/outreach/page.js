"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  HandHeart, 
  Utensils, 
  Stethoscope, 
  GraduationCap, 
  Home, 
  Heart, 
  Globe, 
  Baby, 
  Book,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Quote
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer/page';

const CommunityOutreachPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const outreachPrograms = [
        {
            title: 'Food Bank Ministry',
            icon: Utensils,
            description: 'Monthly food distribution to families in need',
            impact: '500+ families served monthly',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Free Medical Outreach',
            icon: Stethoscope,
            description: 'Quarterly medical camps with free checkups and medications',
            impact: '2,000+ patients treated annually',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Skills Acquisition Program',
            icon: GraduationCap,
            description: 'Training unemployed youth in vocational skills',
            impact: '300+ youth empowered',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Prison Ministry',
            icon: Home,
            description: 'Regular visits and spiritual support to inmates',
            impact: '150+ inmates reached monthly',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            title: 'Hospital Visitation',
            icon: Heart,
            description: 'Bringing hope and prayer to the sick',
            impact: '80+ hospitals visited',
            color: 'from-pink-500 to-pink-600',
            bgColor: 'bg-pink-50'
        },
        {
            title: 'Street Evangelism',
            icon: Globe,
            description: 'Taking the Gospel to the streets and markets',
            impact: '10,000+ souls reached',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50'
        },
        {
            title: 'Orphanage Support',
            icon: Baby,
            description: 'Supporting orphanages with food, clothing, and education',
            impact: '5 orphanages supported',
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            title: 'Back to School Initiative',
            icon: Book,
            description: 'Providing school supplies and scholarships',
            impact: '200+ students supported',
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50'
        }
    ];

    const testimonials = [
        {
            name: 'Mrs. Blessing Okafor',
            story: 'The food bank ministry saved my family during our most difficult time. May God bless this church!',
            role: 'Beneficiary'
        },
        {
            name: 'Mr. Samuel Eze',
            story: 'I learned tailoring through the skills program. Now I have my own shop and can feed my family.',
            role: 'Skills Program Graduate'
        },
        {
            name: 'Sister Grace',
            story: 'Visiting the sick in hospitals has transformed my life. Seeing their joy when we pray gives me purpose.',
            role: 'Volunteer'
        }
    ];

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
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-700 py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 4 + 2,
                                height: Math.random() * 4 + 2,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center space-y-6"
                    >
                        <motion.div variants={scaleIn} className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                            <HandHeart className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Community Outreach
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            "Faith without works is dead" - James 2:26. Demonstrating Christ's love through action.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="pt-4">
                            <button className="text-white/80 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                <ChevronRight className="w-5 h-5 rotate-180" />
                              <Link href="/departments">Back to All Ministries</Link>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={scaleIn} className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800"
                                    alt="Community Outreach"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <p className="text-2xl font-bold mb-2">Deacon Paul Okonkwo</p>
                                    <p className="text-red-200">Outreach Ministry Leader</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-6">
                            <div className="inline-block">
                                <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Serving Our Community</span>
                                <div className="h-1 bg-gradient-to-r from-red-500 to-red-600 mt-2" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Love in Action
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                The Community Outreach Ministry of Assemblies of God Church Gbazango is the hands and feet of Jesus in our neighborhood. We believe the Gospel is not just preached with words, but demonstrated through compassionate service to those in need.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Led by Deacon Paul Okonkwo, our team of dedicated volunteers reaches out to the poor, sick, imprisoned, and marginalized with practical help and the life-changing message of God's love.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-red-50 px-6 py-4 rounded-xl">
                                    <Users className="w-8 h-8 text-red-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">200+</p>
                                        <p className="text-sm text-gray-600">Active Volunteers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-red-50 px-6 py-4 rounded-xl">
                                    <Heart className="w-8 h-8 text-red-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-xl">15,000+</p>
                                        <p className="text-sm text-gray-600">Lives Impacted</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Outreach Programs */}
            <section className="py-24 bg-gradient-to-b from-red-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Our Impact</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                How We Serve
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Multiple programs touching lives across our community
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {outreachPrograms.map((program, index) => {
                                const IconComponent = program.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.2)" }}
                                        className={`${program.bgColor} p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-300 transition-all`}
                                    >
                                        <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${program.color} text-white rounded-lg text-sm font-semibold`}>
                                            <Heart className="w-4 h-4" />
                                            {program.impact}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Transformed Lives</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Stories of Hope
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Hear from those whose lives have been touched by our outreach
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-red-100"
                                >
                                    <Quote className="w-10 h-10 text-red-400 mb-4" />
                                    <p className="text-gray-700 italic mb-6 leading-relaxed">
                                        "{testimonial.story}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-red-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Get Involved Section */}
            <section className="py-24 bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 6 + 3,
                                height: Math.random() * 6 + 3,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <span className="text-red-200 font-bold text-sm tracking-wider uppercase">Join Us</span>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-300 to-red-400 mx-auto mt-2 mb-4" />
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Get Involved
                            </h2>
                            <p className="text-xl text-red-100 max-w-2xl mx-auto">
                                Be part of God's work in our community. Every hand makes a difference.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all">
                                <Users className="w-12 h-12 mx-auto mb-4 text-red-200" />
                                <h3 className="text-2xl font-bold mb-3">Volunteer</h3>
                                <p className="text-red-100 mb-4">
                                    Join our team of volunteers serving in various outreach programs
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all">
                                <Heart className="w-12 h-12 mx-auto mb-4 text-red-200" />
                                <h3 className="text-2xl font-bold mb-3">Donate</h3>
                                <p className="text-red-100 mb-4">
                                    Support our programs with financial contributions or items in kind
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all">
                                <Globe className="w-12 h-12 mx-auto mb-4 text-red-200" />
                                <h3 className="text-2xl font-bold mb-3">Partner</h3>
                                <p className="text-red-100 mb-4">
                                    Collaborate with us as an organization or business to expand our reach
                                </p>
                            </motion.div>
                        </div>

                        <motion.button
                            variants={scaleIn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-red-900 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
                        >
                           <Link href="/contact">Contact Us Today</Link>
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <motion.div variants={fadeInUp}>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Contact Outreach Ministry</h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Have questions or want to get involved? Reach out to our outreach team.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                                    <Mail className="w-6 h-6 text-red-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="text-gray-600">outreach@aggbazango.org</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                                    <Phone className="w-6 h-6 text-red-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Phone</p>
                                        <p className="text-gray-600">+234 803 456 7890</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                                    <MapPin className="w-6 h-6 text-red-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Location</p>
                                        <p className="text-gray-600">Assemblies of God Church, Gbazango, Kubwa, Abuja</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-red-900 to-red-800 p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-6">Meeting Schedule</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 pb-6 border-b border-white/20">
                                    <Calendar className="w-6 h-6 text-red-200 mt-1" />
                                    <div>
                                        <p className="font-semibold text-xl mb-1">Planning Meetings</p>
                                        <p className="text-red-100">First Saturday of every month</p>
                                        <p className="text-red-200 text-sm mt-1">9:00 AM - 11:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pb-6 border-b border-white/20">
                                    <Clock className="w-6 h-6 text-red-200 mt-1" />
                                    <div>
                                        <p className="font-semibold text-xl mb-1">Food Distribution</p>
                                        <p className="text-red-100">Last Saturday of every month</p>
                                        <p className="text-red-200 text-sm mt-1">8:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Heart className="w-6 h-6 text-red-200 mt-1" />
                                    <div>
                                        <p className="font-semibold text-xl mb-1">Hospital Visitation</p>
                                        <p className="text-red-100">Every Wednesday</p>
                                        <p className="text-red-200 text-sm mt-1">2:00 PM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
        </>
    );
};

export default CommunityOutreachPage;