"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { Church, Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            
            // User-friendly error messages
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password. Access denied.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email format.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Login failed. Please contact the administrator.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
            <div className="w-full max-w-md p-8">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg">
 <img
                                    src="/logo.png"
                                    alt="AG Church"
                                    className="w-40 h-40"
                                />                     </div>
                    <h1 className="text-3xl font-bold text-yellow-800 mb-2">Church Admin</h1>
                    <p className="text-gray-600">Sign in to access the dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@church.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none transition-colors text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none transition-colors text-gray-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p>
                                This is a protected area. Only authorized church administrators 
                                with registered email addresses can access this dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}