import { FaHtml5, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiRadixui } from "react-icons/si";
import * as Tooltip from "@radix-ui/react-tooltip";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-4xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400 text-4xl" /> },
  { name: "React", icon: <FaReact className="text-sky-400 text-4xl" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500 text-4xl" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400 text-4xl" /> },
  { name: "Radix UI", icon: <SiRadixui className="text-purple-400 text-4xl" /> },
];

export default function Skill() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center py-16 px-4 text-gray-100">
      <h1 className="text-3xl font-bold mb-12 text-purple-400">💡 ทักษะและความเชี่ยวชาญ</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl">
        {skills.map((skill) => (
          <Tooltip.Provider key={skill.name}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="bg-gray-800 border border-purple-700/40 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:bg-purple-800/30 hover:scale-105 transition">
                  {skill.icon}
                  <p className="mt-3 font-medium">{skill.name}</p>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  className="bg-purple-700 text-white text-xs px-2 py-1 rounded-md shadow-md"
                >
                  ความชำนาญใน {skill.name}
                  <Tooltip.Arrow className="fill-purple-700" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>
    </div>
  );
}
