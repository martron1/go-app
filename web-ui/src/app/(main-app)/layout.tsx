import React from "react";
import "../globals.css";
import Nav from "@/components/app-sidebar/nav";
import { AppSidebar } from "@/components/app-sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh flex w-full">
      <div className="container px-8 mx-40 h-full">
        <main className="h-full">
          <header className="flex justify-between items-center pt-4 pb-6">
            <Link href="/dashboard" className="flex items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="#000" />
                <path d="M10 22V10h12v12H10zm2-2h8V12h-8v8z" fill="#fff" />
              </svg>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">Feedback</Link>
              <Link href="/">Help</Link>
              <Avatar>
                <AvatarFallback className="hover:cursor-pointer">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content area */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
