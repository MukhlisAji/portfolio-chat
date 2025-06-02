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