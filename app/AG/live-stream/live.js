"use client";
import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function LiveStream() {
  const [liveVideos, setLiveVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    async function fetchLiveVideos() {
      const ref = doc(db, "settings", "liveStream");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const videos = snap.data().liveVideos || [];
        setLiveVideos(videos);
        if (videos.length > 0) setCurrentVideo(videos[0]);
      }
      setLoading(false);
    }
    fetchLiveVideos();
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  if (loading) return <div className="text-center lg:py-100 py-50">Loading Livestream vidoes...</div>;
  if (!currentVideo)
    return (
      <div className="text-center mt-20">
        No livestream available. Please check your network connection
      </div>
    );

  // Function to clean embed links (removes branding)
  const getEmbedUrl = (video) => {
    if (video.platform === "youtube") {
      return `${video.url}?autoplay=1&modestbranding=1&showinfo=0&rel=0&controls=0`;
    }
    if (video.platform === "facebook") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        video.url
      )}&show_text=false&autoplay=true`;
    }
    if (video.platform === "vimeo") {
      return `${video.url}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    if (video.platform === "twitch") {
      return `https://player.twitch.tv/?channel=${video.url}&autoplay=true&parent=yourdomain.com`;
    }
    return video.url;
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Main Video */}
      <h1 className="text-center mb-5 lg:mt-40 mt-20 uppercase underline">Streaming Real Stories as They Happen</h1>
      <div
        ref={videoContainerRef}
        className="w-full aspect-video overflow-hidden mb-6 relative mt-10 lg:mt-10 bg-black"
      >
        <iframe
          src={getEmbedUrl(currentVideo)}
          title="Live Broadcast"
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* LIVE NOW Badge with Dot */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          LIVE NOW
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded transition-all"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            // Exit Fullscreen Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          ) : (
            // Enter Fullscreen Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {liveVideos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setCurrentVideo(video)}
            className={`p-3 rounded flex justify-between py-0 items-center text-center  ${currentVideo.id === video.id
                ? ""
                : "bg-purple-900 hover:bg-gray-800"
              }`}
          >
            <span>
              {video.title}
            </span>
            {index === 0 && (
              <div className="flex items-center gap-1 bg-red-500  text-xs px-2 py-1 rounded">
                <span className="w-2 h-2  rounded-full animate-ping"></span>
                AG Gbazango
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}