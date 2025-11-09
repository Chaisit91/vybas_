export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-20">
      <h1 className="text-2xl font-bold mb-1">ยินดีต้อนรับ</h1>
      <p className="text-gray-500 mb-6 text-center">
        เว็บไซต์แนะนำตัวและประวัติส่วนตัว
      </p>

      {/* กล่องเกี่ยวกับเว็บไซต์ */}
      <div className="border rounded-lg p-4 w-full max-w-2xl mb-4 shadow-sm bg-white">
        <h2 className="font-semibold text-left mb-2">เกี่ยวกับเว็บไซต์นี้</h2>
        <p className="text-sm text-gray-700 text-left">
          เว็บไซต์นี้สร้างขึ้นเพื่อแนะนำข้อมูลส่วนตัว ประวัติการศึกษา และความสามารถต่าง ๆ 
          โดยใช้เทคโนโลยี React, React Router และ Radix UI
        </p>
      </div>

      {/* กล่องเทคโนโลยีที่ใช้ */}
      <div className="border rounded-lg p-4 w-full max-w-2xl shadow-sm bg-white">
        <h2 className="font-semibold text-left mb-2">เทคโนโลยีที่ใช้</h2>
        <ul className="text-sm text-left text-gray-700 list-disc ml-5">
          <li>React 19 + TypeScript</li>
          <li>React Router สำหรับการนำทาง</li>
          <li>Radix UI สำหรับ UI Components</li>
          <li>Vite สำหรับ Build Tool</li>
        </ul>
      </div>
    </div>
  );
}
