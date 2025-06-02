"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import List from "./List";
import TechStack from "./TechStack";
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

const Portfolio: React.FC<{ heading?: string }> = ({ heading }) => {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/data/projects.json")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error("Error loading projects:", error));
    }, []);

    useEffect(() => {
        sectionRefs.current.forEach((el, index) => {
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = sectionRefs.current.findIndex((el) => el === entry.target);
                    if (index !== -1) {
                        if (entry.isIntersecting) {
                            setActiveIndex(index);
                        } else if (entry.boundingClientRect.top > 0) {
                            setActiveIndex(Math.max(0, index - 1));
                        }
                    }
                });
            },
            { rootMargin: "-20% 0px -50% 0px", threshold: 0.2 }
        );

        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            sectionRefs.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
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