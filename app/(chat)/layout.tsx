"use client";

import { Toaster } from "@/components/ui/toaster"

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="min-h-screen bg-background">
                {children}
            </div>
            <Toaster />
        </>
    )
}

