import React from "react";
import List from "./List";
import Link from "next/link";

interface CardWorkProps {
    title: string;
    date_start: string;
    date_end: string;
    color: string;
    background: string;
    description: string;
    responsibility: string[];
    skills: string[];
    ctUrl: string;
}

const CardWork: React.FC<CardWorkProps> = ({
                                               title,
                                               date_start,
                                               date_end,
                                               color,
                                               background,
                                               description,
                                               responsibility,
                                               ctUrl,
                                           }) => {
    return (
        <section className={`relative flex flex-col w-full rounded-lg shadow-lg overflow-hidden border ${background} text-white`}>
            <div className="relative w-full p-4 grid grid-cols-6 border-b border-neutral-300">
                <div className="flex flex-col col-span-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <div className="flex flex-col items-end col-span-2">
                    <span className="text-sm">{date_start}</span>
                    <span className="text-sm">{date_end}</span>
                </div>
            </div>

            <div className="relative w-full p-4">
                <h4 className="text-neutral-300 text-sm font-bold">Job Description</h4>
                <p className="text-sm text-neutral-200">{description}</p>
            </div>

            <div className="relative w-full p-4">
                <h4 className="text-neutral-300 text-sm font-bold">Responsibilities</h4>
                <div className="flex flex-col space-y-1">
                    {responsibility.map((task, index) => (
                        <List key={index} title={task} icon={"radix-icons:dot-filled"} iconColor={color} />
                    ))}
                </div>
            </div>

            <div className="relative w-full p-4 flex justify-end">
                <Link
                    href={ctUrl}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-neutral-900 hover:bg-gray-200 transition"
                >
                    Learn More
                </Link>
            </div>
        </section>
    );
};

export default CardWork;
