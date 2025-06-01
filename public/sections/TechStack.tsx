import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";

const techs = [
  { icon: "logos:wordpress-icon", label: "WordPress" },
  { icon: "logos:angular-icon", label: "Angular JS" },
  { icon: "logos:react", label: "React JS" },
  { icon: "logos:nodejs-icon", label: "Node JS" },
  { icon: "logos:jquery", label: "jQuery" },
  { icon: "logos:drupal", label: "Drupal" },
  { icon: "logos:docker-icon", label: "Docker" },
  { icon: "logos:sass", label: "Sass" },
];

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: `-=${totalWidth}`, // Scroll full width
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Loop seamlessly
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden py-8 bg-black">
      <div className="flex w-max space-x-6" ref={containerRef}>
        {[...techs, ...techs].map((tech, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-white min-w-[80px]"
          >
            <div className="bg-neutral-900 w-14 h-14 flex items-center justify-center rounded-[2rem] rotate-45">
              <Icon
                icon={tech.icon}
                className="-rotate-45 text-yellow-500"
                width={24}
                height={24}
              />
            </div>
            <span className="mt-2 text-xs font-medium text-white">{tech.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
