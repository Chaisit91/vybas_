// กำหนด URL สำหรับอัปโหลดรูปภาพไปยัง Cloudinary (ต้องวางไว้ด้านบนสุดของไฟล์)
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";

// กำหนดชื่อ upload preset ที่ใช้ใน Cloudinary (แบบ unsigned)
const UPLOAD_PRESET = "products";

/**
 * ฟังก์ชันสำหรับอัปโหลดรูปภาพขึ้น Cloudinary
 * รองรับการอัปโหลดแบบ unsigned preset
 * @param file - ไฟล์ภาพที่ต้องการอัปโหลด
 * @returns secure_url (ลิงก์รูปภาพที่อัปโหลดแล้ว) หรือ null หากอัปโหลดล้มเหลว
 */
export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  // สร้าง FormData สำหรับส่งข้อมูลไปยัง Cloudinary
  const formData = new FormData();

  // ใส่ไฟล์ลงใน FormData
  formData.append("file", file);

  // ใส่ preset ที่ Cloudinary ใช้
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    // ส่งคำขอ HTTP POST เพื่ออัปโหลดไฟล์ไป Cloudinary
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });

    // แปลงผลลัพธ์จาก Cloudinary เป็น JSON object
    const data = await res.json();

    // แสดง log เพื่อตรวจสอบ response ที่ได้รับ
    console.log("🌤️ Cloudinary response:", data);

    // ตรวจสอบว่ามี error จาก Cloudinary หรือไม่
    if (data.error) {
      alert(`❌ Upload failed: ${data.error.message}`);
      return null; // ถ้ามี error → คืนค่า null
    }

    // ตรวจสอบว่ามี secure_url หรือไม่ (สำคัญมาก!)
    if (!data.secure_url) {
      alert("❌ Upload failed — Cloudinary response invalid");
      return null;
    }

    // คืน URL ของรูปภาพที่อัปโหลดเสร็จแล้ว
    return data.secure_url;
  } catch (err: unknown) {
    // จับ error หาก fetch ขัดข้อง หรือมีปัญหาอื่น ๆ
    console.error("❌ Cloudinary upload failed:", err);

    // แปลง error ให้เป็นข้อความที่อ่านได้
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    // แจ้งเตือนผู้ใช้
    alert(
      `❌ อัปโหลดรูปไม่สำเร็จ — โปรดตรวจสอบอินเทอร์เน็ตหรือการตั้งค่า Cloudinary\n(${errorMessage})`
    );

    // ส่งกลับ null เพื่อบอกว่าการอัปโหลดไม่สำเร็จ
    return null;
  }
}
