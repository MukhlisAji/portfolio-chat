"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    date_start: string;
    date_end: string;
    color: string;
    company: string;
    background: string;
    description: string;
    responsibility: string[];
    skills: string[];
    ctUrl: string;
    type: 'work' | 'education'; // NEW
}

const TimelineItem: React.FC<{
    item: Project;
    index: number;
    sectionRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}> = ({ item, index, sectionRef }) => (
    <div
        ref={(el) => {
            sectionRef.current[index] = el;
        }}
        className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
    >
        {/* Vertical timeline line */}
        <div className="relative flex flex-col items-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full z-10 border-2 border-neutral-900" />
            <div className="h-full w-1 bg-neutral-700 absolute top-4 sm:top-5 left-1/2 transform -translate-x-1/2 z-0"></div>
        </div>

        {/* Card */}
        <div className="w-full sm:w-[calc(100%-3rem)] bg-neutral-900 rounded-xl shadow-lg p-6">
            <div className="text-lg sm:text-xl font-semibold text-yellow-200">
                {item.title}, {item.company}
            </div>
            <div className="text-sm text-gray-400 my-1">
                ({item.date_start} - {item.date_end})
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">{item.description}</div>
        </div>
    </div>
);



const Experience: React.FC<{ heading?: string }> = () => {
    const sectionRef = useRef<(HTMLDivElement | null)[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const workProjects = projects.filter(p => p.type === 'work');
    const educationProjects = projects.filter(p => p.type === 'education');


    useEffect(() => {
        fetch('/data/experiences.json')
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    useEffect(() => {
        sectionRef.current.forEach((section) => {
            if (section) {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 80%',
                        toggleActions: 'play none none reverse',
                    }
                })
            }
        })
    })

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                }
            });
        },
            { rootMargin: '-100px 0px -100px 0px', threshold: 0.5 }
        );

        sectionRef.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        })


        return () => {
            sectionRef.current.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            })
        }
    })




    return (
        <div id={'career-journey'} className="relative py-32 flex flex-col w-full max-w-6xl mx-auto font-quicksand">
            <div className={'absolute bottom-0 h-full w-auto -z-10 blur-2xl'}>
                {/* <img className={'w-auto h-full object-cover'} src={'/assets/images/bg/bg-3.jpg'} /> */}
            </div>
            <div className={'flex flex-col mb-20 gap-5 items-center justify-center text-center col-span-2'}>
                <h3 className={'flex flex-col gap-2 text-5xl font-raleway text-yellow-100 font-bold'}>
                    <span>Work Experience and</span>
                    <span
                        className="text-neutral-100 bg-clip-text">
                        Education
                    </span>
                </h3>
            </div>


            <div
                className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent max-w-7xl mx-auto">


                <div className="grid md:grid-cols-2 gap-10 relative max-w-7xl mx-auto">
                    {/* LEFT - WORK EXPERIENCE */}
                    <div className="space-y-8 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {workProjects.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} sectionRef={sectionRef} />
                        ))}
                    </div>

                    {/* RIGHT - EDUCATION */}
                    <div className="space-y-8 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {educationProjects.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index + workProjects.length} sectionRef={sectionRef} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Experience
