import { Link } from "react-router-dom"; // นำเข้า Link สำหรับสร้างลิงก์ภายในเว็บโดยไม่รีเฟรชหน้า

// สร้าง component หลักชื่อ Admin และ export ออกไปให้ไฟล์อื่นนำไปใช้
export default function Admin() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white flex flex-col items-center justify-center px-6 py-16"
      // min-h-screen = ความสูงเต็มหน้าจอ
      // bg-gradient-to-b = ไล่สีพื้นหลังจากบนลงล่าง
      // from-[#0A0F1C] ... to-[#0A0F1C] = โทนสีเข้มระยะไล่ระดับ
      // text-white = สีตัวอักษรขาว
      // flex flex-col = ใช้ Flexbox เรียงลูกแนวตั้ง
      // items-center = จัดกึ่งกลางแนวนอน
      // justify-center = จัดกึ่งกลางแนวตั้ง
      // px-6 py-16 = padding รอบๆ
    >
      <h1
        className="text-5xl font-extrabold mb-12 tracking-wide text-center drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
        // text-5xl = ขนาดตัวอักษรใหญ่
        // font-extrabold = หนามาก
        // mb-12 = ระยะห่างด้านล่าง 3rem
        // tracking-wide = เพิ่มการเว้นระยะแบบกว้าง
        // text-center = จัดข้อความกึ่งกลาง
        // drop-shadow = ใส่เงาใต้ตัวหนังสือ
      >
        Admin Dashboard
      </h1>

      <div
        className="grid gap-6 w-full max-w-2xl"
        // grid = แสดง children แบบ grid
        // gap-6 = ระยะห่างระหว่าง item 1.5rem
        // w-full = กว้างเต็มพื้นที่
        // max-w-2xl = จำกัดความกว้างสูงสุด
      >
        {/* ลิงก์ไปหน้าแก้ไข Home */}
        <Link
          to="/admin/home" // เมื่อกดจะไปหน้า /admin/home
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF] border border-blue-600/50 text-white 
            px-6 py-5 rounded-2xl text-lg font-semibold
            shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] 
            transition-all duration-300 flex justify-center items-center gap-3"
          // gradient แนวนอน
          // hover: เปลี่ยน gradient เมื่อชี้
          // border = เส้นขอบบางๆ สีฟ้าโปร่ง
          // px/py = ระยะห่างในปุ่ม
          // rounded-2xl = มุมโค้งมาก
          // shadow-lg = ใส่เงา
          // transition-all duration-300 = ทำให้ hover นุ่มลื่น
          // flex center = จัดตำแหน่งข้อความกลางปุ่ม
          // gap-3 = ระยะห่างภายในถ้ามีไอคอน
        >
          แก้ไขหน้า Home
        </Link>

        {/* ลิงก์ไปหน้าแก้ไขรถ */}
        <Link
          to="/admin/cars" // ไปหน้า /admin/cars
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF] border border-blue-600/50 text-white 
            px-6 py-5 rounded-2xl text-lg font-semibold shadow-lg
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
            transition-all duration-300 flex justify-center items-center gap-3"
        >
          จัดการรถ (CarAdmin)
        </Link>

        {/* ลิงก์ไปหน้าแก้ไขของแต่งรถ */}
        <Link
          to="/admin/customizations" // ไปหน้า /admin/customizations
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF] border border-blue-600/50 text-white 
            px-6 py-5 rounded-2xl text-lg font-semibold shadow-lg
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
            transition-all duration-300 flex justify-center items-center gap-3"
        >
          จัดการของแต่ง (CustomizationAdmin)
        </Link>

        {/* ลิงก์ไปหน้าแก้ไขข่าว */}
        <Link
          to="/admin/news" // ไปหน้า /admin/news
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF] border border-blue-600/50 text-white 
          px-6 py-5 rounded-2xl text-lg font-semibold 
          shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] 
          transition-all duration-300 flex justify-center items-center gap-3"
        >
          จัดการข่าว (NewsAdmin)
        </Link>
      </div>
    </div>
  );
}
