import React from "react";
//  นำเข้า React เพื่อใช้สร้าง Component

interface ButtonProps {
  label: string; 
  //  ข้อความบนปุ่ม

  variant?: "primary" | "outline";
  //  รูปแบบปุ่ม มี 2 แบบ
  // - primary = ปุ่มสีฟ้า
  // - outline = ปุ่มขอบดำ (ค่า default)

  onClick?: () => void;
  // ฟังก์ชันเมื่อถูกคลิก (อาจไม่มี)
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "outline", // กำหนด default เป็น outline
  onClick,
}) => {
  // base = class หลักที่ใช้ร่วมกันในทุกปุ่ม
  const base =
    "px-4 py-2 rounded font-semibold transition-colors duration-200";

  //  styles = class ที่เปลี่ยนตาม variant
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700" // ปุ่มสีฟ้า
      : "border border-gray-700 text-gray-700 hover:bg-gray-200"; // ปุ่มขอบดำ

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {/*  แสดงข้อความปุ่ม */}
      {label}
    </button>
  );
};

export default Button;
//  ส่งออก Component ให้ไฟล์อื่นนำไปใช้ได้
