
import {ArrowLeft} from 'lucide-react'

export default function WorshipTeam() {
    return (
        <>
          <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <a
                                href="/"
                                className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Home
                            </a>
                            <div className="flex items-center gap-3">
                                <img
                                    src="/AG.jpeg"
                                    alt="AG Church"
                                    className="w-10 h-10"
                                />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900">Assemblies of God</p>
                                    <p className="text-xs text-amber-600">Gbazango District</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
        <div className="text-center mt-50 min-screen ">
            <img scr="/logo.png" alt="church logo"  />
            <h1>Worship Team </h1>
        </div>
        </>
   ) 
}