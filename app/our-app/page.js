'use client';

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function AppInstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-40 h-40 mx-auto mb-6">
          <img 
            src="/logo.png" 
            alt="Assemblies of God Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-amber-900 mb-12">Assemblies of God Gbazango</h1>

        <button
          onClick={handleInstallClick}
          className="bg-amber-900 text-yellow-300 font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all flex items-center gap-4 mx-auto border-4 border-yellow-400"
        >
          <Download className="w-8 h-8" />
          Install Our App
        </button>
      </div>
    </div>
  );
}