"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFolderClosed, FaStar, FaClock } from "react-icons/fa6";


export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false); // Default to collapsed

  return (
    <div className="h-full">
    <div
      className={`h-screen bg-teal-500 pt-2 px-2 ${
        isExpanded ? "w-50" : "w-20"
      } inset-y-0`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ minHeight: "100vh" }}
    >
    {/* Navigation Links */}
    <nav className="mt-4">
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
        <div className="mt-6 px-4">
          <div className="bg-teal-300 p-4 rounded-lg">
            <h2 className="text-sm text-black text-center font-bold mb-2">Latest Activities</h2>
            <ul className="text-xs">
              <li className="text-black">Placeholder 1</li>
              <li className="text-black">Placeholder 2</li>
              <li className="text-black">Placeholder 3</li>
            </ul>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
