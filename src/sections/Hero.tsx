import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Icon } from "@iconify/react";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: any;
    name?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage, name }) => {
    return (
        <>
            <section id={'home'} className="relative h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center px-16">
                {/* Left Text Section */}
                <div className="flex flex-col gap-4 z-10">
                    <h1 className="text-[6rem] leading-none font-bold font-sans drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        Hello<span className="text-yellow-500 align-top text-[3rem] ml-2">●</span>
                    </h1>
                    <div className="flex flex items-center gap-8 z-10">
                        <h2 className="text-[6rem] leading-none font-bold font-sans drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                            I am
                        </h2>
                        <div className="text-right text-sm leading-relaxed max-w-xs">
                            <span className={'font-semibold justify-end flex font-firaCode text-xl text-[#bbb]'}>
                                <TypeAnimation
                                    sequence={[
                                        `Backend Developer`, 500,
                                        `Frontend Developer`, 500,
                                        `Fullstack Developer`, 500,
                                        `AI Engineer`, 500,
                                    ]}
                                    deletionSpeed={90}
                                    repeat={Infinity}
                                /></span>
                            {/* <p>with 6 years experience</p> */}
                            {/* <p>based in London</p> */}
                        </div>
                    </div>

                    <h3 className="text-[6rem] leading-none font-bold font-sans drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        {name}
                    </h3>

                    {/* <div className="mt-40 flex justify-center">
                        <button className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition">
                            <Icon icon="heroicons-solid:arrow-sm-down" className="text-white text-xl" />
                        </button>
                    </div> */}
                </div>

                {/* Side Image */}
                <div className="absolute right-0 top-0 h-full w-[30%]">
                    <img
                        src={backgroundImage}
                        alt="profile"
                        className="object-cover h-full rounded-l-3xl"
                        draggable={false}
                    />
                </div>

            </section>


        </>
    );
};

export default Hero;
