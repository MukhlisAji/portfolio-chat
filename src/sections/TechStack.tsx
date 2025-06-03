import { Icon } from "@iconify/react";

const techStack = [
  {
    category: "Backend",
    items: [
      { icon: "logos:java", label: "Java" },
      { icon: "logos:python", label: "Python" },
      { icon: "logos:spring", label: "Spring Boot" },
      { icon: "logos:apache", label: "Apache Camel" },
      // { icon: "logos:talend", label: "Talend Studio" },
      { icon: "logos:graphql", label: "GraphQL" },
      { icon: "logos:rest", label: "REST APIs" }
    ],
  },
  {
    category: "Frontend",
    items: [
      { icon: "logos:react", label: "React.js" },
      { icon: "logos:nextjs-icon", label: "Next.js" },
      { icon: "logos:tailwindcss-icon", label: "Tailwind CSS" },
      { icon: "logos:material-ui", label: "Material UI" },
      { icon: "logos:javascript", label: "JavaScript" },
      { icon: "logos:typescript", label: "TypeScript" }
    ],
  },
  {
    category: "Databases",
    items: [
      { icon: "logos:mysql", label: "MySQL" },
      { icon: "logos:postgresql", label: "PostgreSQL" },
      { icon: "logos:oracle", label: "Oracle" },
      { icon: "logos:snowflake", label: "Snowflake" },
      { icon: "logos:mongodb-icon", label: "MongoDB" }
    ],
  },
  {
    category: "LLM & RAG",
    items: [
      { icon: "logos:langchain-icon", label: "LangChain" },
      { icon: "logos:langgraph", label: "LangGraph" },
      { icon: "logos:langsmith", label: "LangSmith" }
    ],
  },
  {
    category: "Vector DBs",
    items: [
      { icon: "logos:faiss", label: "FAISS" },
      { icon: "logos:chromadb", label: "ChromaDB" },
      { icon: "logos:pinecone", label: "Pinecone" }
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { icon: "logos:aws", label: "AWS" },
      { icon: "logos:google-cloud", label: "GCP" },
      { icon: "logos:azure-icon", label: "Azure DevOps" },
      // { icon: "logos:docker-icon", label: "Docker" },
      // { icon: "logos:github", label: "GitHub Actions" }
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
