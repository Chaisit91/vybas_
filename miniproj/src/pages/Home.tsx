import * as Popover from "@radix-ui/react-popover";
import { FaLaptopCode, FaUser } from "react-icons/fa";
import profileImage from "../images/IMG_5927.png"; // ✅ import รูป

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-4">
      {/* 🔹 รูปโปรไฟล์ */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl animate-pulse"></div>
        <img
          src={profileImage}
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-purple-600 shadow-[0_0_30px_rgba(168,85,247,0.6)] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 🔹 ชื่อและคำอธิบาย */}
      <h1 className="text-4xl font-bold mb-2 text-purple-400 drop-shadow-lg">
        ยินดีต้อนรับ
      </h1>
      <p className="text-gray-400 mb-8 text-sm">
        เว็บไซต์แนะนำตัวและประวัติส่วนตัวของฉัน 
      </p>

      {/* 🔹 เกี่ยวกับฉัน */}
      <div className="bg-gray-800/70 backdrop-blur-md border border-purple-700 rounded-xl shadow-lg p-6 max-w-2xl w-full mb-6 hover:shadow-purple-700/40 transition-all">
        <h2 className="flex items-center text-lg font-semibold text-purple-300 mb-3">
          <FaUser className="mr-2 text-purple-400" /> เกี่ยวกับฉัน
        </h2>
        <p className="text-gray-300 leading-relaxed">
          สวัสดีครับ <b className="text-purple-400">ชัยสิทธิ์ หมัดอาเด็น</b>  
          เป็นนักศึกษาที่มีความสนใจในการพัฒนาเว็บไซต์และเทคโนโลยีสมัยใหม่ 
          ชอบเรียนรู้สิ่งใหม่ ๆ และฝึกฝนการเขียนโปรแกรมอยู่เสมอ 
        </p>
      </div>

      {/* 🔹 การศึกษา */}
      <div className="bg-gray-800/70 backdrop-blur-md border border-purple-700 rounded-xl shadow-lg p-6 max-w-2xl w-full hover:shadow-purple-700/40 transition-all">
        <h2 className="flex items-center text-lg font-semibold text-purple-300 mb-3">
          <FaLaptopCode className="mr-2 text-purple-400" /> การศึกษา
        </h2>
        <ul className="list-disc ml-5 text-gray-300 text-sm space-y-1">
        
        </ul>
      </div>

      {/* 🔹 ปุ่ม Popover */}
      <Popover.Root>
        <Popover.Trigger className="mt-10 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition-all">
          ดูข้อมูลเพิ่มเติม
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="bg-gray-900 border border-purple-600 text-gray-100 rounded-lg p-4 shadow-xl text-sm backdrop-blur-md"
            sideOffset={8}
          >
            เว็บไซต์นี้ถูกพัฒนาโดยใช้ <b>React</b>, <b>Radix UI</b>, และ{" "}
            <b>TailwindCSS</b> 
            <Popover.Arrow className="fill-gray-900" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
