import React from "react";
import { Icon } from "@iconify/react";

const AboutMe = () => {
    return (
        <section className="w-full bg-black text-white py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-1 bg-[#111111] rounded-3xl p-8 space-y-6 shadow-lg">
                    <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded-full text-sm">
                        Available for work
                    </button>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-medium text-white">
                            Hi, I’m <span className="text-yellow-100">Werner Disum</span>,
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-100 mt-2 leading-tight">
                            Senior Product Designer <br /> Based in London
                        </h1>
                    </div>
                    <hr className="border-[#333] my-4" />
                    <p className="text-gray-300 max-w-xl">
                        Experienced Fullstack Java Developer with 6 years of hands-on experience building enterprise applications
                        using Java, Spring Boot, Microservices, and React.js. Proven success in designing scalable systems,
                        integrating APIs, and deploying cloud-native apps on AWS, GCP, and Azure DevOps. Strong collaborator in
                        Agile teams, delivering impactful software for industries including banking, real estate, and energy
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-yellow-100">12</h3>
                            <p className="text-sm text-gray-400">Years of Experience</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-yellow-100">4k</h3>
                            <p className="text-sm text-gray-400">Projects Completed</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-yellow-100">6k</h3>
                            <p className="text-sm text-gray-400">Client Worldwide</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:max-w-sm bg-[#111111] rounded-3xl p-6 text-center space-y-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white">Profile:</h3>
                    <div className="flex justify-center">
                        <img src={'/assets/images/profile/me.png'}
                            alt="Profile"
                            className="rounded-2xl w-48 h-48 object-cover"
                        />
                    </div>
                    <div className="text-yellow-100 space-y-1 text-sm font-medium">
                        <p>disum99@gmail.com</p>
                        <p>Base in London,</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 pt-2">
                        <Icon icon="ri:facebook-fill" className="text-white bg-[#222] rounded-full p-2 w-9 h-9" />
                        <Icon icon="ri:behance-fill" className="text-white bg-[#222] rounded-full p-2 w-9 h-9" />
                        <Icon icon="ri:global-fill" className="text-white bg-[#222] rounded-full p-2 w-9 h-9" />
                    </div>

                    {/* CV Button */}
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-xl transition duration-300">
                        Download CV
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
