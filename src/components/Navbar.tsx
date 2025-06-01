"use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

interface MenuItem {
  title: string;
  link: string;
  cvUrl?: string;
}

export default function Navbar() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [textColor, setTextColor] = useState("white");
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    import("../assets/menu.json")
      .then((module) => {
        setMenu(module.default);
      })
      .catch((err) => console.error("Error loading the menu", err));
  }, []);

  // Detect active link using hash or pathname
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      setActiveLink(hash || path);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-black bg-opacity-10 backdrop-blur-md text-white py-2 font-firaCode">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a
          href="/"
          className="flex flex-col items-start text-2xl font-bold font-quicksand"
        >
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-800 text-transparent bg-clip-text">
            MPA
          </span>
          <span className="text-sm">
            Chat with my AI version!
          </span>
        </a>

        <nav>
          <ul className="flex space-x-8 items-center font-semibold text-lg">
            {menu.map((item, index) => {
              const isActive = activeLink === item.link;
              return (
                <li key={`nav-${index}`}>
                  <a
                    href={item.link}
                    onClick={() => setActiveLink(item.link)}
                    className={`transition-colors ${
                      isActive
                        ? "text-yellow-500"
                        : "text-white hover:text-yellow-400"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
