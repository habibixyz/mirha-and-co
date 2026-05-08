"use client";

import { useEffect } from "react";
import { Menu } from "lucide-react";

export function MobileMenuButton() {
    useEffect(() => {
        const button = document.querySelector(".mobile-menu-btn");
        const sidebar = document.querySelector(".dash-sidebar");
        const body = document.body;

        if (!button) return;

        const toggleSidebar = () => {
            body.classList.toggle("sidebar-open");
        };

        const closeSidebar = () => {
            body.classList.remove("sidebar-open");
        };

        button.addEventListener("click", toggleSidebar);

        // Close sidebar when clicking a nav link
        document.querySelectorAll(".dash-nav-link").forEach((link) => {
            link.addEventListener("click", closeSidebar);
        });

        // Close sidebar when clicking outside
        document.addEventListener("click", (e) => {
            const isButton = button.contains(e.target as Node);
            const isSidebar = sidebar?.contains(e.target as Node);

            if (!isButton && !isSidebar && body.classList.contains("sidebar-open")) {
                closeSidebar();
            }
        });

        return () => {
            button.removeEventListener("click", toggleSidebar);
        };
    }, []);

    return (
        <button className="mobile-menu-btn">
            <Menu size={20} />
        </button>
    );
}