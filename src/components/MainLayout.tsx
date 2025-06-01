"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function MainLayout({ children }: { children: ReactNode }) {
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const smoother = useRef<ScrollSmoother | null>(null);

    useEffect(() => {
        if (wrapperRef.current && contentRef.current) {
            smoother.current = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 1.5,
                effects: true,
            });

            // Handle internal anchor clicks
            const handleAnchorClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
                    e.preventDefault();
                    const id = target.getAttribute("href")!.slice(1);
                    const section = document.getElementById(id);
                    if (section && smoother.current) {
                        smoother.current.scrollTo(section, true, "top top");
                    }
                }
            };

            document.addEventListener("click", handleAnchorClick);

            return () => {
                document.removeEventListener("click", handleAnchorClick);
                smoother.current?.kill();
            };
        }
    }, []);

    return (
        <div ref={wrapperRef} id="smooth-wrapper">
            <Navbar />
            <div ref={contentRef} id="smooth-content">
                <div className="min-h-screen flex flex-col">
                    <main className="flex-grow">{children}</main>
                    <footer
                        id={"contact"}
                        className="bg-black border-t w-full mx-auto border-neutral-900 py-16"
                    >
                        <div className="container max-w-4xl relative mx-auto text-center flex gap-4 flex-col items-center">
                            Made with coffee and code by{" "}
                            <a
                                href={"https://URL_ADDRESS.com/wernerdisum"}
                                className="text-yellow-500"
                            >
                                Ahmeda
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
