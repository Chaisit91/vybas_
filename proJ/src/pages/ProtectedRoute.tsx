// import Navigate เพื่อเอาไว้ redirect ไปหน้า login
import { Navigate } from "react-router-dom";
// import ReactNode เพื่อระบุชนิดของ children
import type { ReactNode } from "react";

// กำหนดรูปแบบ props ที่ component นี้รับเข้า
interface ProtectedRouteProps {
  children: ReactNode; // children คือ element หรือ component ใด ๆ
}

// component สำหรับป้องกันไม่ให้เข้าหน้า admin ถ้าไม่ได้ login
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // ตรวจสอบจาก localStorage ว่ามีการ login แล้วหรือยัง
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // ถ้ายังไม่ได้ login  เด้งไปหน้า /login
  if (!isAdmin) return <Navigate to="/login" replace />;

  // ถ้า login แล้ว  แสดง children ได้ตามปกติ
  return <>{children}</>;
}
