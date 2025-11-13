"use client"
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function AppInstallPage() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Automatically show modal when install is available
            setShowModal(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            alert('To install:\n\n• Chrome/Edge: Click menu (⋮) → "Install app"\n• Safari iOS: Tap Share → "Add to Home Screen"\n• Firefox: Not supported');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
            setShowModal(false);
        }

        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowModal(false);
    };

    if (isInstalled) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="text-6xl mb-4">✓</div>
                    <h2 className="text-3xl font-bold text-amber-900 mb-2">App Installed!</h2>
                    <p className="text-amber-700">Thank you for installing our app.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-3xl shadow-2xl flex items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="AG Church"
                        className="w-40 h-70"
                    />                </div>

                <h1 className="text-4xl font-bold text-amber-900 mb-4">
                    Assemblies of God Gbazango
                </h1>

                <p className="text-amber-800 mb-8 text-lg">
                    Install our app for quick access
                </p>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-amber-900 text-yellow-300 font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-amber-900/50 transform hover:scale-105 transition-all flex items-center gap-4 mx-auto border-4 border-yellow-400"
                >
                    <Download className="w-8 h-8" />
                    Install Our App
                </button>
            </div>

            {/* Install Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-amber-900 hover:text-amber-700"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <div className="text-4xl">✝️</div>
                        </div>

                        <h2 className="text-2xl font-bold text-amber-900 mb-3 text-center">
                            Install AG Gbazango
                        </h2>

                        <p className="text-amber-700 mb-6 text-center">
                            Add our app to your home screen for quick and easy access anytime.
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3 text-sm text-amber-800">
                                <span className="text-xl">⚡</span>
                                <span>Fast access from your home screen</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-amber-800">
                                <span className="text-xl">📱</span>
                                <span>Works like a native app</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-amber-800">
                                <span className="text-xl">🔔</span>
                                <span>Receive updates and notifications</span>
                            </div>
                        </div>

                        <button
                            onClick={handleInstallClick}
                            className="w-full bg-amber-900 text-yellow-300 font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 border-2 border-yellow-400"
                        >
                            <Download className="w-6 h-6" />
                            Install Now
                        </button>

                        <button
                            onClick={handleDismiss}
                            className="w-full mt-3 text-amber-700 font-medium py-2 hover:text-amber-900 transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}