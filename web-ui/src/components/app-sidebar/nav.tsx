"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-6 px-4">
      <div className="space-y-8">
        {/* Main Navigation */}
        <div>
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </h2>
          <div className="mt-2 space-y-1">
            <Link
              href="/dashboard"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 group-hover:text-blue-600 ${
                  pathname === "/dashboard" ? "text-blue-600" : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/tasks"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 group-hover:text-blue-600 ${
                  pathname === "/tasks" ? "text-blue-600" : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Tasks
            </Link>
            <Link
              href="/calendar"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/calendar"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 group-hover:text-blue-600 ${
                  pathname === "/calendar" ? "text-blue-600" : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar
            </Link>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Projects
          </h2>
          <div className="mt-2 space-y-1">
            <Link
              href="/projects/personal"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/projects/personal"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <span className="w-2 h-2 mr-3 rounded-full bg-blue-500"></span>
              Personal
            </Link>
            <Link
              href="/projects/work"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/projects/work"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <span className="w-2 h-2 mr-3 rounded-full bg-green-500"></span>
              Work
            </Link>
          </div>
        </div>

        {/* Analytics */}
        <div>
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Insights
          </h2>
          <div className="mt-2 space-y-1">
            <Link
              href="/analytics"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 ${
                pathname === "/analytics"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 group-hover:text-blue-600 ${
                  pathname === "/analytics" ? "text-blue-600" : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
