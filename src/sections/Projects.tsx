import React from "react";
import { Icon } from "@iconify/react";

interface PortfolioItem {
  title: string;
  description: string;
  fullDescription?: string;
  techStack?: string[];
  links?: { type: "Website" | "Code"; url: string }[];
  category: "All" | "Research" | "Personal" | "Competition";
}

const sampleData: PortfolioItem[] = [
  {
    title: "Dashboard monitoring agriculture Indonesia",
    description: "AI-based dashboard for crop forecasting and agriculture monitoring.",
    fullDescription:
      "Invited in faculty research to build deep learning projects in agriculture. The project aims to monitor Indonesia's agricultural conditions and predict crop yields through AI-based data analysis.",
    techStack: ["Tableau", "Deep Learning", "Forecasting", "Data Mining"],
    category: "Research",
  },
  {
    title: "Monitoring Stunting Webapp",
    description: "Generative AI with Streamlit for stunting monitoring.",
    techStack: [],
    links: [
      { type: "Website", url: "#" },
      { type: "Code", url: "#" },
    ],
    category: "Competition",
  },
  {
    title: "Document summarization",
    description: "LLM-powered summarizer using Next.js + LLaMA 3.3.",
    links: [{ type: "Code", url: "#" }],
    category: "Research",
  },
];

const Projects = () => {
  return (
    <div className="px-4 py-10 space-y-4">
      {sampleData.map((item, index) => (
        <div key={index} className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{item.description}</p>

          {item.fullDescription && (
            <p className="text-sm text-gray-300 mb-3">{item.fullDescription}</p>
          )}

          {item.techStack && item.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {item.links && item.links.length > 0 && (
            <div className="flex gap-3">
              {item.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs border border-gray-600 px-3 py-1 rounded-full hover:bg-gray-700 transition"
                >
                  <Icon
                    icon={link.type === "Website" ? "mdi:web" : "mdi:github"}
                    className="inline mr-1"
                  />
                  {link.type}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
