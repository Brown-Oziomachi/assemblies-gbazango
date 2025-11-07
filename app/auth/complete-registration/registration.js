"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    query,
    collection,
    where,
    getDocs,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function CompleteRegistration() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [checkingUsername, setCheckingUsername] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.replace("/auth/create-account");
                return;
            }

            setUser(currentUser);

            try {
                //This is where i Check if user already completed registration
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().updatedAt) {
                    router.replace("/account");
                    return;
                }

                if (currentUser.displayName) {
                    setFullName(currentUser.displayName);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error checking user data:", err);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const checkUsernameAvailability = async (usernameToCheck) => {
        if (!usernameToCheck || usernameToCheck.length < 3) return;

        setCheckingUsername(true);
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", usernameToCheck));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("Username is already taken. Please choose another.");
            } else {
                setError("");
            }
        } catch (err) {
            console.error("Error checking username:", err);
        } finally {
            setCheckingUsername(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (username && username.length >= 3) {
                checkUsernameAvailability(username);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!fullName || !username) {
            setError("Please fill in all fields.");
            return;
        }

        if (fullName.trim().length < 2) {
            setError("Full name must be at least 2 characters.");
            return;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username can only contain letters, numbers, and underscores.");
            return;
        }

        setSubmitting(true);

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username.trim()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("Username is already taken. Please choose another.");
                setSubmitting(false);
                return;
            }

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                fullName: fullName.trim(),
                username: username.trim().toLowerCase(),
                email: user.email,
                photoURL: user.photoURL || null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            router.push("/account");
        } catch (err) {
            console.error("Registration Error:", err);
            setError("Failed to complete registration. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSkipForNow = async () => {
        try {
            //  When user skip the complete registration they will Signed out and redirect to home
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Failed to sign out. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow p-8">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <span className="text-2xl">👋</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Complete Your Profile
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Just a few more details to get started
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-600 text-center text-sm">{error}</p>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            placeholder="Choose a unique username"
                            className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {checkingUsername && (
                            <p className="text-xs text-gray-500 mt-1">Checking availability...</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            Only letters, numbers, and underscores. Min. 3 characters.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {user?.email}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || checkingUsername || !fullName || !username}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition"
                    >
                        {submitting ? "Completing registration..." : "Complete Registration"}
                    </button>

                    <button
                        type="button"
                        onClick={handleSkipForNow}
                        className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded transition"
                    >
                        Skip for now
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        You'll need to complete your profile to access your account
                    </p>
                </form>
            </div>
        </div>
    );
}