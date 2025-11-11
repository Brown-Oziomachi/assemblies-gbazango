"use client";
import { Users, Calendar, Heart, UserPlus } from "lucide-react";

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-amber-100 text-sm font-medium">Total Members</p>
            <h3 className="text-4xl font-bold mt-2">{stats.totalMembers}</h3>
            <p className="text-amber-200 text-xs mt-2">
              +{stats.newMembers} this month
            </p>
          </div>
          <Users className="w-12 h-12 text-amber-200" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm font-medium">Upcoming Events</p>
            <h3 className="text-4xl font-bold mt-2">{stats.events}</h3>
            <p className="text-blue-200 text-xs mt-2">Scheduled programs</p>
          </div>
          <Calendar className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-purple-100 text-sm font-medium">
              Prayer Requests
            </p>
            <h3 className="text-4xl font-bold mt-2">{stats.prayerRequests}</h3>
            <p className="text-purple-200 text-xs mt-2">Pending prayers</p>
          </div>
          <Heart className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-green-100 text-sm font-medium">New Visitors</p>
            <h3 className="text-4xl font-bold mt-2">{stats.visitors}</h3>
            <p className="text-green-200 text-xs mt-2">This month</p>
          </div>
          <UserPlus className="w-12 h-12 text-green-200" />
        </div>
      </div>
    </div>
  );
}
