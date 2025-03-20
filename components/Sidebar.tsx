"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFolderClosed, FaStar, FaClock } from "react-icons/fa6";

interface Activity {
  id: string;
  activity: string; // Favorited or watch later
  title: string;
  timestamp: string;
}


export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false); // Default to collapsed
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities on sidebar expand
  useEffect(() => {
    async function getActivities() {
      if (!isExpanded) return;

      try {
        const response = await fetch("/api/activities");
        if (!response.ok) throw new Error ("Failed to fetch activities");

        const data = await response.json();
        console.log("Fetched activities:", data.activities);
        setActivities(data.activities || []);
      } catch (error) {
        console.error("Could not load activity feed:", error);
      }
    }
    getActivities();
  }, [isExpanded]);

  return (
    <div className="h-full flex flex-col bg-teal-500"
         style={{
            width: isExpanded ? "200px" : "80px",
            position: "relative",
            zIndex: 10,
          }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
    >
    {/* Navigation Links */}
    <nav className="flex flex-col mt-4 justify-between">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center px-4 py-2">
              <FaFolderClosed className="text-white text-xl" />
              {isExpanded && <span className="ml-2">Home</span>}
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="flex items-center px-4 py-2">
              <FaStar className="text-white text-xl" />
              {isExpanded && <span className="ml-2">Favorites</span>}
            </Link>
          </li>
          <li>
            <Link href="/watch-later" className="flex items-center px-4 py-2">
              <FaClock className="text-white text-xl" />
              {isExpanded && <span className="ml-2">Watch Later</span>}
            </Link>
          </li>
        </ul>
      </nav>
      {/* Activity Feed (Only Show When Expanded) */}
      {isExpanded && (
        <div className="px-4 mt-6">
          <div className="bg-teal-300 p-4 rounded-lg">
            <h2 className="text-sm text-black text-center font-bold mb-2">Latest Activities</h2>
            {error ? (
              <p className="text-red-500 text-s">{error}</p>
            ) : activities.length > 0 ? (
              <ul className="text-xs">
                {activities.map((activity) => (
                  <li key={activity.id} className="text-black mb-1">
                    <span className="font-semibold">{new Date(activity.timestamp).toLocaleString()}</span>
                    <br />
                    {activity.activity === "FAVORITED" ? (
                      <span>Favorited <b>{activity.title}</b></span>
                    ) : (
                      <span>Added <b>{activity.title}</b> to watch later list</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-black">No recent activities.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
