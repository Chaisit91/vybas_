// services/cloudinary.ts

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
const UPLOAD_PRESET = "products";

/**
 * ✅ อัปโหลดภาพขึ้น Cloudinary (รองรับ unsigned preset)
 * @param file - ไฟล์ภาพที่ต้องการอัปโหลด
 * @returns secure_url (string) หรือ null หากล้มเหลว
 */
export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });

    // ❗ ตรวจว่าคำตอบเป็น JSON ที่ถูกต้องหรือไม่
    const data = await res.json();
    console.log("🌤️ Cloudinary response:", data);

    // ⚠️ ตรวจว่าอัปโหลดไม่สำเร็จ
    if (data.error) {
      alert(`❌ Upload failed: ${data.error.message}`);
      return null;
    }

    if (!data.secure_url) {
      alert("❌ Upload failed — Cloudinary response invalid");
      console.error("Cloudinary response invalid:", data);
      return null;
    }

    // ✅ ส่งกลับลิงก์ที่สะอาด (ตัด query ที่ Cloudinary ใส่เอง)
    const cleanUrl = data.secure_url.replace(/\/upload\/[^/]+\//, "/upload/");
    return cleanUrl;
  } catch (err: any) {
    console.error("❌ Cloudinary upload failed:", err);
    alert("❌ อัปโหลดรูปไม่สำเร็จ — โปรดตรวจสอบอินเทอร์เน็ตหรือการตั้งค่า Cloudinary");
    return null;
  }
}
