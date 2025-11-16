import React from "react";
import ReactDOM from "react-dom/client";

// นำเข้า component หลักของแอป (App.tsx)
import App from "./App";

// นำเข้าไฟล์ CSS หลักของโปรเจกต์
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // React.StrictMode ช่วยตรวจจับปัญหา เช่น code ที่ไม่ปลอดภัยและ warn ต่าง ๆ
  <React.StrictMode>
    {/* เรนเดอร์ component App เป็นตัวหลักของระบบ */}
    <App />
  </React.StrictMode>
);
