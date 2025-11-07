"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

export default function EmailVerify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [expiresIn, setExpiresIn] = useState(null);
    const [checkingVerification, setCheckingVerification] = useState(true);
    const [isExistingAccount, setIsExistingAccount] = useState(false);

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

    //This is where i Send OTP via Resend API
    const sendOtpEmail = async (email, otp) => {
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Email Error: Try a different email', data.error);
                return false;
            }

            console.log('Email sent:', data.messageId);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    };

    // In this place we Check if user account already exists
    const checkAccountExists = async (email) => {
        try {
            const userDoc = await getDoc(doc(db, "users", email));
            return userDoc.exists();
        } catch (error) {
            console.error("Error checking account:", error);
            return false;
        }
    };

    useEffect(() => {
        const checkVerification = async () => {
            if (!email) {
                router.replace("/auth/create-account");
                return;
            }

            try {
                // we Check if account is already verified
                const accountExists = await checkAccountExists(email);
                setIsExistingAccount(accountExists);

                const docRef = doc(db, "verifications", email);
                const snap = await getDoc(docRef);

                if (!snap.exists()) {
                    router.replace("/auth/create-account");
                    return;
                }

                const data = snap.data();

                if (data.status === "verified") {
                    if (accountExists) {
                        router.replace("/dashboard");
                    } else {
                        router.replace(`/auth/create-password?email=${encodeURIComponent(email)}`);
                    }
                    return;
                }

                const createdAt = data.createdAt?.toDate();
                if (!createdAt) {
                    setError("Invalid verification data");
                    setCheckingVerification(false);
                    return;
                }

                const ageInMs = new Date() - createdAt;
                const expired = ageInMs > 15 * 60 * 1000;

                if (expired) {
                    setMessage("OTP expired. Sending a new one...");
                    await resendOtp();
                } else {
                    const remaining = 15 * 60 * 1000 - ageInMs;
                    setExpiresIn(Math.floor(remaining / 1000));
                }

                setCheckingVerification(false);
            } catch (err) {
                console.error("Error checking verification:", err);
                setError("Failed to load verification. Please try again.");
                setCheckingVerification(false);
            }
        };

        checkVerification();
    }, [email, router]);

    useEffect(() => {
        if (!expiresIn || expiresIn <= 0) return;

        const interval = setInterval(() => {
            setExpiresIn((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresIn]);

    const resendOtp = async () => {
        if (!email) return;
        setResending(true);
        setError("");
        setMessage("");

        try {
            const newOtp = generateOtp();

            await setDoc(doc(db, "verifications", email), {
                email,
                otp: newOtp,
                createdAt: serverTimestamp(),
                status: "unverified",
            });

            const emailSent = await sendOtpEmail(email, newOtp);

            if (emailSent) {
                setExpiresIn(15 * 60);
            } else {
                console.log(`New OTP for ${email}: ${newOtp}`);
                setError("Failed to send email. Check console for OTP.");
            }
        } catch (err) {
            console.error("Resend OTP Error:", err);
            setError("Failed to resend OTP. Please try again.");
        } finally {
            setResending(false);
        }
    };

    const handleVerify = async () => {
        if (!otp || !email) return;

        if (otp.length !== 4) {
            setError("Please enter a 4-digit code.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const ref = doc(db, "verifications", email);
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                setError("Verification record not found.");
                setLoading(false);
                return;
            }

            const data = snap.data();
            const createdAt = data.createdAt?.toDate();

            if (!createdAt) {
                setError("Invalid verification data.");
                setLoading(false);
                return;
            }

            const ageInMs = new Date() - createdAt;
            const expired = ageInMs > 15 * 60 * 1000;

            if (expired) {
                setError("OTP expired. Please request a new one.");
                setExpiresIn(0);
                setLoading(false);
                return;
            }

            if (data.otp !== otp) {
                setError("Invalid code. Please try again.");
                setLoading(false);
                return;
            }

            await updateDoc(ref, { status: "verified" });

            setMessage("Email verified successfully!");

            setTimeout(() => {
                // Check if account exists to determine where to route
                if (isExistingAccount) {
                    router.push("/dashboard");
                } else {
                    router.push(`/auth/create-password?email=${encodeURIComponent(email)}`);
                }
            }, 1000);
        } catch (err) {
            console.error("Verification Error:", err);
            setError("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (checkingVerification) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading verification...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    {isExistingAccount ? "Sign in to your account" : "Verify your email"}
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    We've sent a 4-digit verification code to <br />
                    <span className="font-semibold text-gray-800">{email}</span>
                </p>

                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        onKeyPress={(e) => e.key === 'Enter' && otp.length === 4 && handleVerify()}
                        maxLength={4}
                        placeholder="0000"
                        className="w-40 text-center text-3xl font-semibold border-2 border-gray-300 rounded-lg py-3 tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-600 text-center text-sm">{error}</p>
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-green-600 text-center text-sm">{message}</p>
                    </div>
                )}

                <button
                    onClick={handleVerify}
                    disabled={loading || otp.length !== 4}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
                >
                    {loading ? "Verifying..." : isExistingAccount ? "Sign In" : "Verify"}
                </button>

                <div className="text-center mt-6 text-sm text-gray-600">
                    {expiresIn > 0 ? (
                        <p>
                            Code expires in{" "}
                            <span className="font-semibold text-gray-800">
                                {Math.floor(expiresIn / 60)}:
                                {(expiresIn % 60).toString().padStart(2, "0")}
                            </span>
                        </p>
                    ) : (
                        <button
                            onClick={resendOtp}
                            disabled={resending}
                            className="text-blue-600 hover:underline disabled:text-gray-400"
                        >
                            {resending ? "Resending..." : "Resend code"}
                        </button>
                    )}
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={() => router.push("/auth/create-account")}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Back to sign up
                    </button>
                </div>
            </div>
        </div>
    );
}