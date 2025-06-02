import { Icon } from "@iconify/react";

const techStack = [
  {
    category: "Databases",
    items: [
      { icon: "logos:mysql", label: "MySQL" },
      { icon: "logos:postgresql", label: "PostgreSQL" },
      { icon: "logos:google-bigquery", label: "BigQuery" },
    ],
  },
  {
    category: "ML & Python",
    items: [
      { icon: "logos:python", label: "Python" },
      { icon: "logos:tensorflow", label: "TensorFlow" },
      { icon: "logos:pytorch-icon", label: "PyTorch" },
    ],
  },
  {
    category: "LLM & RAG",
    items: [
      { icon: "logos:langchain-icon", label: "LangChain" },
      { icon: "logos:langgraph", label: "LangGraph" },
      { icon: "logos:langsmith", label: "LangSmith" },
    ],
  },
  {
    category: "Vector DBs",
    items: [
      { icon: "logos:faiss", label: "FAISS" },
      { icon: "logos:chromadb", label: "ChromaDB" },
    ],
  },
  {
    category: "Cloud & Deployment",
    items: [
      { icon: "logos:google-cloud", label: "GCP" },
      { icon: "logos:aws", label: "AWS" },
      { icon: "logos:docker-icon", label: "Docker" },
    ],
  },
  {
    category: "Web Frameworks",
    items: [
      { icon: "logos:flask", label: "Flask" },
      { icon: "logos:fastapi", label: "FastAPI" },
      { icon: "logos:nextjs-icon", label: "Next.js" },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="w-full py-16 bg-gradient-to-br from-gray-900 to-black">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Tech Stack</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {techStack.map((section, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-800"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              {section.category}
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {section.items.map((tech, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-black rounded-2xl rotate-45 flex items-center justify-center">
                    <Icon
                      icon={tech.icon}
                      width={28}
                      height={28}
                      className="-rotate-45 text-yellow-400"
                    />
                  </div>
                  <span className="mt-3 text-sm text-white text-center font-medium">
                    {tech.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
