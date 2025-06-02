"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "./Projects";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    backgroundImage: string;
    color: string;
    background: string;
    projectTitle: string;
    projectDescription: string;
    projectResponsibility: string[];
    projectStacks: { title: string; icon: string }[];
    ctUrl: string;
    description: string;
}

const Portfolio: React.FC<{ heading?: string }> = () => {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/data/projects.json")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error("Error loading projects:", error));
    }, []);

    useEffect(() => {
        sectionRefs.current.forEach((el) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });
    }, [projects]);

    return (
        <div id={'projects'} className="relative py-32 gap-10 container mx-auto w-full max-w-6xl mx-auto font-quicksand">
            <div className={'flex flex-col mb-20 gap-5 items-center justify-center text-center col-span-2'}>
                <h3 className={'flex flex-col gap-2 text-5xl font-raleway text-yellow-100 font-bold'}>
                    <span>Featured</span>
                    <span
                        className="text-neutral-100 bg-clip-text">
                        Projects
                    </span>
                </h3>
            </div>
            <Projects />
            {/* <TechStack /> */}
        </div>
    );
};

export default Portfolio;