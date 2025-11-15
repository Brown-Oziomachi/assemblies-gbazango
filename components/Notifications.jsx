"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, X, Clock, Calendar, Video, Megaphone } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function NotificationBell({ setShowNav, scrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, events, sermons, announcements
  const dropdownRef = useRef(null);

  // 🧠 Get viewed items from localStorage
  const getViewedItems = () => {
    if (typeof window === "undefined") return [];
    const viewed = localStorage.getItem("viewedItems");
    return viewed ? JSON.parse(viewed) : [];
  };

  // 🧠 Mark item as viewed
  const markAsViewed = (itemId) => {
    const viewed = getViewedItems();
    if (!viewed.includes(itemId)) {
      viewed.push(itemId);
      localStorage.setItem("viewedItems", JSON.stringify(viewed));
      setViewedItems(viewed);
    }
  };

  // 🔥 Fetch all content types (events, sermons, announcements)
  useEffect(() => {
    const unsubscribers = [];
    let allNotifications = [];

    // Fetch Events
    const eventsQuery = query(
      collection(db, "events"),
      orderBy("createdAt", "desc"),
      limit(15)
    );
    unsubscribers.push(
      onSnapshot(eventsQuery, (snapshot) => {
        const events = snapshot.docs.map((doc) => ({
          id: `event-${doc.id}`,
          type: 'event',
          icon: Calendar,
          color: '#10B981',
          link: '/events',
          title: doc.data().title,
          subtitle: doc.data().description || `${doc.data().date} at ${doc.data().time}`,
          imageUrl: doc.data().image,
          createdAt: doc.data().createdAt,
          category: 'Event',
          ...doc.data(),
        }));
        updateNotifications('events', events);
      }, (error) => {
        console.error('Error fetching events:', error);
      })
    );

    // Fetch Sermons
    const sermonsQuery = query(
      collection(db, "sermons"),
      orderBy("date", "desc"),
      limit(15)
    );
    unsubscribers.push(
      onSnapshot(sermonsQuery, (snapshot) => {
        const sermons = snapshot.docs.map((doc) => ({
          id: `sermon-${doc.id}`,
          type: 'sermon',
          icon: Video,
          color: '#EF4444',
          link: '/sermons',
          title: doc.data().title,
          subtitle: `by ${doc.data().preacher || 'Unknown'}`,
          createdAt: doc.data().createdAt || { toDate: () => new Date(doc.data().date) },
          category: doc.data().category || 'Sermon',
          ...doc.data(),
        }));
        updateNotifications('sermons', sermons);
      }, (error) => {
        console.error('Error fetching sermons:', error);
      })
    );

    // Fetch Announcements (Active only)
    const announcementsQuery = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc"),
      limit(15)
    );
    unsubscribers.push(
      onSnapshot(announcementsQuery, (snapshot) => {
        const announcements = snapshot.docs
          .map((doc) => ({
            id: `announcement-${doc.id}`,
            type: 'announcement',
            icon: Megaphone,
            color: '#F59E0B',
            link: '/anouncements',
            title: doc.data().title,
            subtitle: doc.data().message?.substring(0, 100),
            createdAt: doc.data().createdAt,
            category: doc.data().priority || 'Announcement',
            status: doc.data().status,
            ...doc.data(),
          }))
          .filter(item => item.status === 'active'); // Only active announcements
        updateNotifications('announcements', announcements);
      }, (error) => {
        console.error('Error fetching announcements:', error);
      })
    );

    // Function to update notifications state
    const notificationsByType = {};
    const updateNotifications = (type, items) => {
      notificationsByType[type] = items;
      
      // Combine all notifications
      const combined = [
        ...(notificationsByType.events || []),
        ...(notificationsByType.sermons || []),
        ...(notificationsByType.announcements || []),
      ];

      // Sort by creation date
      combined.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });

      const viewed = getViewedItems();
      const unviewedItems = combined.filter((item) => !viewed.includes(item.id));
      const viewedItemsList = combined.filter((item) => viewed.includes(item.id));

      setNotifications(unviewedItems);
      setViewedItems(viewedItemsList);

      // Calculate unread count (items from last 7 days)
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const unread = unviewedItems.filter(
        (item) => (item.createdAt?.toDate?.() || new Date(0)) > sevenDaysAgo
      ).length;
      setUnreadCount(unread);
    };

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  // 🧩 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowHistory(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const createSlug = (title) => {
    return title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || '';
  };

  const createFullSlug = (title, id) => `${createSlug(title)}--${id}`;

  const getTimeAgo = (date) => {
    if (!date) return "Just now";
    const now = new Date();
    const postDate = date.toDate?.() || new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  const isNew = (date) => {
    if (!date) return false;
    const now = new Date();
    const postDate = date.toDate?.() || new Date(date);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return postDate > sevenDaysAgo;
  };

  // 🖱️ When a notification is clicked
  const handleNotificationClick = (itemId) => {
    markAsViewed(itemId);
    setNotifications((prev) => prev.filter((n) => n.id !== itemId));
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    setIsOpen(false);
    if (setShowNav) setShowNav(false);
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    setShowHistory(false);
    if (!isOpen && setShowNav) setShowNav(false);
  };

  // Filter notifications by active tab
  const filteredNotifications = showHistory 
    ? viewedItems.filter(n => activeTab === 'all' || n.type === activeTab)
    : notifications.filter(n => activeTab === 'all' || n.type === activeTab);

  // Get counts for each type
  const getCounts = () => {
    const items = showHistory ? viewedItems : notifications;
    return {
      all: items.length,
      event: items.filter(n => n.type === 'event').length,
      sermon: items.filter(n => n.type === 'sermon').length,
      announcement: items.filter(n => n.type === 'announcement').length,
    };
  };

  const counts = getCounts();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔔 Bell Button */}
      <button
        onClick={handleBellClick}
        className="relative p-1 -ml-2 text-white hover:bg-white/10 rounded-full transition-all duration-200"
        aria-label="Notifications"
      >
        <Bell
          size={24}
          className={`mx-auto mb-3 opacity-50 font-extrabold text-lg mt-5 ${
            scrolled ? "text-black" : "text-gray-100"
          }`}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* 🔽 Dropdown */}
      {isOpen && (
        <div className="absolute -right-17 mt-3 w-96 max-w-[calc(100vw-2rem)] bg-[#0c0b0bfa] rounded-2xl shadow-2xl border border-gray-700 z-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0c0b0bfa] px-6 py-4 flex items-center justify-between border-b border-gray-700">
            <div>
              <h3 className="text-white font-bold text-lg p-2">
                {showHistory ? "Viewed Items" : "Church Updates"}
              </h3>
              <p className="text-white/80 text-xs p-1">
                {showHistory
                  ? `${counts.all} Viewed`
                  : `${counts.all} New Updates`}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-4 py-3 bg-gray-900/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'event'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Events ({counts.event})
            </button>
            <button
              onClick={() => setActiveTab('sermon')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'sermon'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sermons ({counts.sermon})
            </button>
            <button
              onClick={() => setActiveTab('announcement')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'announcement'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Announcements ({counts.announcement})
            </button>
          </div>

          {/* List */}
          <div className="max-h-[500px] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Bell size={48} className="mx-auto mb-3 opacity-50" />
                <p>
                  {showHistory
                    ? `No viewed ${activeTab === 'all' ? 'items' : activeTab + 's'} yet`
                    : `No new ${activeTab === 'all' ? 'updates' : activeTab + 's'} yet`}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredNotifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.id}
                      href={n.link}
                      onClick={() => !showHistory && handleNotificationClick(n.id)}
                      className="block hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="p-4 flex gap-3">
                        {/* Icon or Image */}
                        <div className="shrink-0">
                          {n.imageUrl || n.thumbnailUrl ? (
                            <img
                              src={n.imageUrl || n.thumbnailUrl}
                              alt={n.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div 
                              className="w-16 h-16 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: n.color + '20' }}
                            >
                              <Icon size={28} style={{ color: n.color }} />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-white font-semibold text-sm line-clamp-2">
                              {n.title}
                            </h4>
                            {!showHistory && isNew(n.createdAt) && (
                              <span className="shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                            )}
                          </div>
                          {n.subtitle && (
                            <p className="text-gray-400 text-xs line-clamp-1 mb-2">
                              {n.subtitle}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs">
                            <span
                              className="px-2 py-1 rounded-md font-semibold"
                              style={{ 
                                backgroundColor: n.color + '30',
                                color: n.color 
                              }}
                            >
                              {n.category || n.type}
                            </span>
                            <span className="text-gray-500">
                              {getTimeAgo(n.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-800/50 px-6 py-3 text-center border-t border-gray-700 flex items-center justify-between">
            {!showHistory ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (setShowNav) setShowNav(false);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-1 text-gray-300 text-sm hover:text-white transition"
                >
                  <Clock size={14} /> View History
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowHistory(false)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors w-full"
              >
                ← Back to New
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}