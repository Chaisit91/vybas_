import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    // ถ้ายังไม่ล็อกอิน → ส่งกลับหน้า Login
    return <Navigate to="/login" replace />;
  }

  // ถ้าล็อกอินแล้ว → แสดงหน้า Admin
  return children;
}
