import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  if (!isAdmin) {
    // ถ้ายังไม่ได้ล็อกอิน → กลับไปหน้า Login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ถ้าล็อกอินแล้ว → แสดงหน้า admin ได้
  return children;
}
