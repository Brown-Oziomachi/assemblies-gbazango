

// // app/dashboard/page.js
// "use client";
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import ChurchDashboard from "./dashboard";

// export default function Page() {
//     const router = useRouter();
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Check if user is authenticated
//         const checkAuth = () => {
//             const authCookie = document.cookie
//                 .split('; ')
//                 .find(row => row.startsWith('adminAuth='));

//             if (!authCookie) {
//                 router.push('/AG/join-us');
//                 return;
//             }

//             setIsAuthorized(true);
//             setLoading(false);
//         };

//         checkAuth();
//     }, [router]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
//                 <div className="text-center">
//                     <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading dashboard...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!isAuthorized) {
//         return null;
//     }

//     return <ChurchDashboard />;
// }



import ChurchDashboard from "./dashboard";

export default function Page() {
    return <ChurchDashboard />;
}