"use client";

import { useEffect } from "react";

export default function VisibilityHandler() {
    useEffect(() => {
        const originalTitle = document.title;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = "Térj ide vissza";
            } else {
                document.title = originalTitle;
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.title = originalTitle;
        };
    }, []);

    return null; // This component doesn't render anything
}
