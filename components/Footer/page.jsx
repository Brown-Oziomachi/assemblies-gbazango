"use client"
import { ChevronRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Volume2, VolumeX, Youtube } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer () {
    const [isMuted, setIsMuted] = useState()
    return (
      <div>
        <footer className="relative bg-gray-900 text-gray-300 py-16 overflow-hidden">
          {/* Background video (plays in the footer) */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            autoPlay
            loop
            muted
            playsInline
            poster="/footer-poster.jpg"
          >
            <source src="/get.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay so content is readable */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer video controls */}
            <div className="flex justify-end mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMuted(!isMuted)}
                className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* About */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12  rounded-lg flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Church Logo"
                      className="rounded-full max-md:w-10 max-md:h-30 w-40 h-30 mt-2"
                    />{" "}
                  </div>
                  <span className="text-white font-bold text-lg">
                    Assemblies of God
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  A Spirit-filled church committed to spreading the Gospel and
                  transforming lives through the power of Jesus Christ.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, link: "#" },
                    { icon: Instagram, link: "#" },
                    { icon: Twitter, link: "#" },
                    { icon: Youtube, link: "#" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.link}
                      whileHover={{ scale: 1.2, y: -3 }}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: "About Us", path: "/about" },
                    { name: "Our Beliefs", path: "/AG/belief" },
                    { name: "Leadership", path: "/AG/deacons" },
                    { name: "Ministers", path: "/ministers" },
                    { name: "Events Calendar", path: "/events" },
                    { name: "Sermons", path: "/sermons" },
                    { name: "Departments", path: "/departments" },
                    { name: 'Install App', path: '/our-app' }

                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.path}
                        className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Church Address</p>
                      <p className="text-gray-400 text-sm">
                        123 Faith Avenue
                        <br />
                        Wuse 2, Abuja, Nigeria
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Phone</p>
                      <p className="text-gray-400 text-sm">+234 803 456 7890</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-400 text-sm">
                        info@agchurchng.org
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Service Times */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">
                  Service Times
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <p className="text-white font-semibold">Sunday School lesson</p>
                    </div>
                    <p className="text-amber-400 font-bold">
                      8:00 AM - 9:00 AM
                    </p>
                  </li>
                  <li className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <p className="text-white font-semibold">Main Service</p>
                    </div>
                    <p className="text-amber-400 font-bold">
                      9:30 AM - 12:00 AM
                    </p>
                  </li>
                  <li className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <p className="text-white font-semibold">Bible Study</p>
                    </div>
                    <p className="text-amber-400 font-bold">
                      Tuesday 6:00 PM
                    </p>
                  </li>
                  <li className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <p className="text-white font-semibold">Youth Service</p>
                    </div>
                    <p className="text-amber-400 font-bold">Thursday 6:00 PM</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  &copy; 2025 Assemblies of God Church Nigeria. All rights
                  reserved.
                </p>
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <span className="text-2xl">✝</span>
                  <span className="text-sm">
                    All The Gospel To All The World
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    Terms of Use
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
            };
            