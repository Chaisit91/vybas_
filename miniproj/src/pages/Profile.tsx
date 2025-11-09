import * as HoverCard from "@radix-ui/react-hover-card";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">งานอดิเรก</h1>

      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <button className="flex items-center space-x-2 text-lg text-white font-medium hover:text-purple-300 transition">
            <FaUserCircle className="text-4xl text-purple-400" /> <span>ชัยสิทธิ์ หมัดอาเด็น</span>
          </button>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content className="bg-gray-800 border border-purple-700 shadow-lg p-4 rounded-lg text-sm w-64 text-gray-200">
            <p className="font-semibold text-purple-400">นักศึกษาวิศวกรรมคอมพิวเตอร์</p>
            <p>มหาวิทยาลัยธุรกิจบัณฑิตย์</p>
            <p className="mt-2 text-gray-400">สนใจด้าน Frontend และเทคโนโลยีใหม่ ๆ 💻</p>
            <HoverCard.Arrow className="fill-gray-800" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>

      <div className="border border-purple-700 bg-gray-800/70 shadow-xl rounded-xl p-6 w-full max-w-2xl mt-8 backdrop-blur-sm">
        <h2 className="flex items-center text-lg font-semibold text-purple-400 mb-3">
          <FaGraduationCap className="mr-2" /> กิจกรรมที่ชอบ
        </h2>
        <ul className="text-gray-300 list-disc ml-5 space-y-1 text-sm">
          <li>พัฒนาเว็บไซต์และฝึกฝนการเขียนโค้ด</li>
          <li>สตรีมเกม 🎮</li>
          <li>เรียนรู้เทคโนโลยีใหม่ ๆ</li>
        </ul>
      </div>
    </div>
  );
}
