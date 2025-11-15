"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import ChurchDashboard from "./dashboard";

export default function Page() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setIsAuthorized(true);
                setUserEmail(user.email);
                setLoading(false);
            } else {
                // User is not signed in, redirect to login
                router.push('/admin/login');
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-semibold">Verifying access...</p>
                    <p className="text-gray-500 text-sm mt-2">Please wait</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <ChurchDashboard userEmail={userEmail} />;
}