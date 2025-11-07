"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "@/lib/firebaseConfig";

export default function CreateAccount() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/account");
            } else {
                setCheckingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

    // Send OTP via Resend API
    const sendOtpEmail = async (email, otp) => {
        try {
            console.log('Attempting to send email to:', email);

            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            console.log('Response status:', response.status);

            const data = await response.json();
            if (!response.ok) {
                console.error('Email API Error:', data.error);
                return { success: false, error: data.error };
            }

            console.log('Email sent successfully:', data.messageId);
            return { success: true, messageId: data.messageId };
        } catch (error) {
            console.error('Exception while sending email:', error);
            return { success: false, error: error.message };
        }
    };

    const handleContinue = async () => {
        if (!email) {
            alert("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const otp = generateOtp();
            console.log('Generated OTP:', otp);

            const verificationsRef = collection(db, "verifications");

            console.log('Saving to Firestore...');
            await setDoc(doc(verificationsRef, email), {
                email,
                otp,
                createdAt: serverTimestamp(),
                status: "unverified",
            });
            console.log('Saved to Firestore');

            console.log('Sending email...');
            const result = await sendOtpEmail(email, otp);

            if (result.success) {
                router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`);
            } else {
                console.error(`Failed to send OTP. Error: ${result.error}`);
                console.log(`OTP for testing: ${otp}`);

                if (result.error && result.error.includes('testing emails')) {
                    router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`);
                } else {
                    alert(`Failed to send email: ${result.error || 'Unknown error'}. OTP for testing: ${otp}`);

                    const proceed = confirm("Email failed to send. Do you want to proceed anyway? (OTP is in console)");
                    if (proceed) {
                        router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error in handleContinue:", error);
            alert(`Something went wrong: ${error.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists() && userSnap.data().updatedAt) {
                router.push("/account");
            } else {
                router.push("/auth/complete-registration");
            }
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                alert("Sign-in cancelled. Please try again.");
            } else {
                alert("Google Sign-In failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-amber-900 font-semibold">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Church Branding */}
            <div className="flex-1 relative overflow-hidden hidden lg:block bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900">
                <img
                    src="/AG.jpeg"
                    alt="Assemblies of God Church"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
                />

                {/* Decorative overlay pattern */}
                <div className="absolute inset-0 z-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Logo and Church Name */}
                <div className="absolute top-8 left-8 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-amber-300 shadow-2xl bg-white p-1">
                            <img
                                src="/AG.jpeg"
                                alt="AG Logo"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <div className="text-white text-3xl font-bold tracking-tight drop-shadow-lg">
                                Assemblies of God
                            </div>
                            <div className="text-amber-200 text-lg font-semibold">
                                Church Nigeria
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20 z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-amber-300 rounded-full"></div>
                    <div className="absolute top-1/3 left-1/3 w-80 h-80 border-2 border-amber-300 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border-2 border-amber-300 rounded-full"></div>
                </div>

                {/* Bottom decorative curve */}
                <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-white to-amber-50 rounded-tr-full z-10 opacity-90"></div>

                {/* Tagline */}
                <div className="absolute bottom-32 left-16 z-20 max-w-xl">
                    <div className="bg-gradient-to-r from-amber-800/80 to-transparent p-6 rounded-r-2xl backdrop-blur-sm">
                        <h1 className="text-amber-100 text-6xl font-bold leading-tight mb-4">
                            All The Gospel<br />
                            To All The World
                        </h1>
                        <p className="text-amber-200 text-xl font-medium">
                            Join our faith community
                        </p>
                    </div>
                </div>

                {/* Cross icon decoration */}
                <div className="absolute top-1/2 right-16 z-20 transform -translate-y-1/2">
                    <div className="text-amber-300/30 text-9xl font-light">✝</div>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full lg:max-w-md bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-600 shadow-lg mx-auto mb-3 bg-white p-1">
                            <img
                                src="/AG.jpeg"
                                alt="AG Logo"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-900">
                            Assemblies of God Church
                        </h2>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome to Our Family!</h2>
                        <p className="text-amber-800">Create your account to join our church community</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-lg text-gray-900 placeholder-amber-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all"
                        />

                        <button
                            onClick={handleContinue}
                            disabled={!email || loading}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {loading ? "Sending Verification Code..." : "Continue with Email"}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-amber-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-b from-amber-50 to-white text-amber-700 font-semibold">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full bg-white border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-amber-900 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                        >
                            <FcGoogle className="w-5 h-5" />
                            Sign in with Google
                        </button>

                    <div className="text-center space-y-3 mt-6 pt-6 border-t-2 border-amber-100">
                        <p className="text-sm text-amber-800">
                            Already part of our community?{" "}
                            <a
                                href="/auth/sign-in"
                                className="text-amber-700 hover:text-amber-900 font-bold underline decoration-2 decoration-amber-400 hover:decoration-amber-600 transition-colors"
                            >
                                Sign in here
                            </a>
                        </p>
                        <p className="text-xs text-amber-600 italic">
                            "For where two or three gather in my name, there am I with them." - Matthew 18:20
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}