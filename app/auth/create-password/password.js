"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CreatePassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingVerification, setCheckingVerification] = useState(true);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const checkVerification = async () => {
            // Here we Redirect users if no email in search params is found
            if (!email) {
                router.replace("/auth/create-account");
                return;
            }

            try {
                const verRef = doc(db, "verifications", email);
                const verSnap = await getDoc(verRef);

                if (!verSnap.exists()) {
                    router.replace("/auth/create-account");
                    return;
                }

                const verData = verSnap.data();

                if (verData.status !== "verified") {
                    router.replace(`/auth/email-verify?email=${encodeURIComponent(email)}`);
                    return;
                }

                setCheckingVerification(false);
            } catch (err) {
                console.error("Error checking verification:", err);
                router.replace("/auth/create-account");
            }
        };

        checkVerification();
    }, [email, router]);

    const validatePassword = (pass) => {
        if (pass.length < 8) {
            return "Password must be at least 8 characters long";
        }
        return null;
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError("");

        if (!password || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const verRef = doc(db, "verifications", email);
            const verSnap = await getDoc(verRef);

            if (!verSnap.exists()) {
                setError("Verification not found. Please start again.");
                setLoading(false);
                setTimeout(() => router.replace("/auth/create-account"), 2000);
                return;
            }

            const verData = verSnap.data();
            if (verData.status !== "verified") {
                setError("Email not verified. Redirecting...");
                setLoading(false);
                setTimeout(() => {
                    router.replace(`/auth/email-verify?email=${encodeURIComponent(email)}`);
                }, 2000);
                return;
            }

            await createUserWithEmailAndPassword(auth, email, password);

            // Here we delete verification doc after successful account creation
            await deleteDoc(verRef);

            router.push("/auth/complete-registration");
        } catch (err) {
            console.error("Account Creation Error:", err);

            if (err.code === "auth/email-already-in-use") {
                setError("An account with this email already exists. Please sign in instead.");
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak. Please choose a stronger password.");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email address.");
            } else {
                setError(err.message || "Account creation failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (checkingVerification) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Verifying...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Set your password
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Create a secure password for <br />
                    <span className="font-semibold text-gray-800">{email}</span>
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-600 text-center text-sm">{error}</p>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleCreateAccount}>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password (min. 8 characters)"
                            className="w-full px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-700"
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                        <p>Password must:</p>
                        <ul className="list-disc list-inside pl-2">
                            <li>Be at least 8 characters long</li>
                            <li>Match the confirmation password</li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !password || !confirmPassword}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="text-center mt-4 space-y-2">
                    <button
                        onClick={() => router.push("/auth/create-account")}
                        className="block w-full text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Start over
                    </button>
                </div>
            </div>
        </div>
    );
}