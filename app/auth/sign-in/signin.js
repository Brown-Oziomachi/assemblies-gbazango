"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "@/lib/firebaseConfig";

export default function SignIn() {
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

    const sendOtpEmail = async (email, otp) => {
        try {
            console.log('Sending OTP email to:', email);

            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                console.error('Email API Error:', data.error);
                return { success: false, error: data.error };
            }

            console.log('Email sent successfully');
            return { success: true, messageId: data.messageId };
        } catch (error) {
            console.error('Exception sending email:', error);
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
            console.log('Generated OTP for', email);

            //This line check if user exists and has a password
            const userRef = doc(db, "users", email);
            const userSnap = await getDoc(userRef);

            let redirectMode = "signin";

            if (!userSnap.exists()) {
                // New user - needs to create account
                console.log('User does not exist, redirecting to create account');
                alert('No account found with this email. Please create an account first.');
                router.push('/auth/create-account');
                return;
            } else {
                const userData = userSnap.data();
                //This is where we check if user has completed password setup
                if (!userData.password || userData.password === '') {
                    console.log('User exists but no password set');
                    redirectMode = "setup-password";
                } else {
                    console.log('User exists with password, proceed to sign in');
                    redirectMode = "signin";
                }
            }

            const verificationsRef = collection(db, "verifications");

            console.log('Saving to Firestore...');
            await setDoc(doc(verificationsRef, email), {
                email,
                otp,
                createdAt: serverTimestamp(),
                status: "unverified",
                purpose: redirectMode
            });
            console.log('Saved to Firestore successfully');

            console.log('Calling sendOtpEmail...');
            const result = await sendOtpEmail(email, otp);

            if (result.success) {
                console.log('Redirecting to verification page');
                router.push(`/auth/email-verify?email=${encodeURIComponent(email)}&mode=${redirectMode}`);
            } else {
                console.error('Failed to send email:', result.error);

                if (process.env.NODE_ENV === 'development') {
                    const proceed = confirm(
                        `DEV MODE: Email failed to send.\n\n` +
                        `Error: ${result.error}\n\n` +
                        `Your OTP is: ${otp}\n\n` +
                        `Continue to verification page?`
                    );
                    if (proceed) {
                        router.push(`/auth/email-verify?email=${encodeURIComponent(email)}&mode=${redirectMode}`);
                    }
                } else {
                    alert(`Failed to send verification email: ${result.error || 'Unknown error'}. Please try again.`);
                }
            }
        } catch (error) {
            console.error("Error in handleContinue:", error);
            alert(`Something went wrong. Please try again.`);
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

            router.push("/account");
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 relative overflow-hidden hidden lg:block">
                <img
                    src="/tub.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute top-8 left-8 z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img
                                src="/tub.jpg"
                                alt="Tubskills Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-white text-3xl font-bold tracking-tight">
                                Tubskills
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-20 z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-blue-300 rounded-full"></div>
                    <div className="absolute top-1/3 left-1/3 w-80 h-80 border border-blue-300 rounded-full"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 border border-blue-300 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-white rounded-tr-full z-10"></div>
                <div className="absolute bottom-32 left-16 z-20">
                    <h1 className="text-orange-400 text-6xl font-bold leading-tight">
                        Welcome<br />
                        back!<br />
                    </h1>
                </div>
            </div>

            <div className="w-full lg:max-w-md bg-gray-50 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-600">Enter your email to continue</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleContinue}
                            disabled={!email || loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors"
                        >
                            {loading ? "Sending OTP..." : "Continue"}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gray-50 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded transition-colors flex items-center justify-center gap-3"
                        >
                            <FcGoogle className="w-5 h-5" />
                            Sign in with Google
                        </button>

                        <div className="text-center space-y-2 mt-6">
                            <p className="text-sm text-gray-600">
                                Don't have an account?
                                <a
                                    href="/auth/create-account"
                                    className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
                                >
                                    Create account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}