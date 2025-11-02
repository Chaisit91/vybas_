// ✅ uploadImageToCloudinary.ts
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
const UPLOAD_PRESET = "products";

export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    const data = await res.json();

    if (!data.secure_url) {
      console.error("❌ Cloudinary response invalid:", data);
      return null;
    }

    // ✅ ใช้ c_fit เพื่อให้ภาพไม่ถูกบีบ/ครอป และแสดงเต็มตามต้นฉบับ
    const transformedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/c_fit,w_auto,h_auto/"
    );

    return transformedUrl;
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    return null;
  }
}
