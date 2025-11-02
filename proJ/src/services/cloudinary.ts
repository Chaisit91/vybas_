const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
const UPLOAD_PRESET = "products";

export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  // ✅ ป้องกัน Cloudinary แปลงภาพ (crop, scale)
  formData.append("transformation", JSON.stringify([{ crop: "fit" }]));

  try {
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    const data = await res.json();

    if (!data.secure_url) {
      console.error("Cloudinary response invalid:", data);
      return null;
    }

    // ✅ ลบ query ที่ Cloudinary เพิ่มเอง (เช่น c_fill หรือ w/h)
    const cleanUrl = data.secure_url.replace(/\/upload\/[^/]+\//, "/upload/");

    return cleanUrl;
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    return null;
  }
}
