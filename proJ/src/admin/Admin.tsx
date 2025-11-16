import { Link } from "react-router-dom"; // นำเข้า Link สำหรับลิงก์ไปหน้าอื่น

export default function Admin() {
  return (
    <div
      className="
        min-h-screen       // ความสูงขั้นต่ำ = เต็มหน้าจอ
        bg-gradient-to-b   // ไล่สีจากบนลงล่าง
        from-[#0A0F1C]     // สีบน
        via-[#0F1628]      // สีตรงกลาง
        to-[#0A0F1C]       // สีล่าง
        text-white         // ตัวอักษรสีขาวทั้งหมด
        flex-col      // ใช้ flex + จัดแนวตั้ง
        items-center       // จัดกลางแนวนอน
        justify-center     // จัดกลางแนวตั้ง
        px-6 py-16         // padding รอบด้าน
      "
    >
      <h1
        className="
          text-5xl                     // ฟอนต์ใหญ่มาก
          font-extrabold              // หนาพิเศษ
          mb-12                       // ระยะห่างล่าง
          tracking-wide               // เพิ่มช่องไฟตัวอักษร
          text-center                 // จัดข้อความตรงกลาง
          drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] // เงาเข้มด้านล่าง
        "
      >
        Admin Dashboard
      </h1>

      <div
        className="
          grid        // ใช้ CSS Grid
          gap-6       // ระยะห่างระหว่างปุ่ม
          w-full      // กว้างเต็มพื้นที่
          max-w-2xl   // แต่จำกัดไม่ให้เกิน 2xl
        "
      >
        {/* แก้ไขหน้า Home */}
        <Link
          to="/admin/home"
          className="
            bg-gradient-to-r     // ไล่สีซ้ายไปขวา
            from-[#1E3A8A]       // สีน้ำเงินเข้ม (ซ้าย)
            to-[#0F172A]         // สีน้ำเงินดำ (ขวา)
            hover:from-[#2563EB] // ไล่สีสว่างขึ้นเมื่อ hover
            hover:to-[#1E40AF]   // ไล่สีเข้มขึ้นเมื่อ hover
            border border-blue-600/50 // เส้นขอบน้ำเงินโปร่ง 50%
            text-white                // ตัวอักษรสีขาว
            px-6 py-5                // padding ปุ่ม
            rounded-2xl              // มุมโค้งใหญ่
            text-lg                  // ขนาดตัวอักษร
            font-semibold            // น้ำหนักตัวอักษรปานกลาง
            shadow-lg                // ใช้เงาหลัก
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] // เงาเรืองแสงน้ำเงินเมื่อ hover
            transition-all           // ทำให้การเปลี่ยนเกิดแบบ smooth
            duration-300             // ใช้เวลา 0.3s
            flex justify-center items-center // จัดให้อยู่กึ่งกลาง
            gap-3                     // เว้นระยะระหว่างไอคอน/ข้อความ
          "
        >
          แก้ไขหน้า Home
        </Link>

        {/* จัดการรถ */}
        <Link
          to="/admin/cars"
          className="
            bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]
            hover:from-[#2563EB] hover:to-[#1E40AF]
            border border-blue-600/50 text-white px-6 py-5 rounded-2xl
            text-lg font-semibold shadow-lg
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
            transition-all duration-300 flex justify-center items-center gap-3
          "
        >
          จัดการรถ (CarAdmin)
        </Link>

        {/* จัดการของแต่ง */}
        <Link
          to="/admin/customizations"
          className="
            bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]
            hover:from-[#2563EB] hover:to-[#1E40AF]
            border border-blue-600/50 text-white px-6 py-5 rounded-2xl
            text-lg font-semibold shadow-lg
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
            transition-all duration-300 flex justify-center items-center gap-3
          "
        >
          จัดการของแต่ง (CustomizationAdmin)
        </Link>

        {/* จัดการข่าว */}
        <Link
          to="/admin/news"
          className="
            bg-gradient-to-r from-[#1E3A8A] to-[#0F172A]
            hover:from-[#2563EB] hover:to-[#1E40AF]
            border border-blue-600/50 text-white px-6 py-5 rounded-2xl
            text-lg font-semibold shadow-lg
            hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
            transition-all duration-300 flex justify-center items-center gap-3
          "
        >
          จัดการข่าว (NewsAdmin)
        </Link>
      </div>
    </div>
  );
}
