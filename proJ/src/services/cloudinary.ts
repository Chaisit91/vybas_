const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
const UPLOAD_PRESET = "products";

export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  // :white_check_mark: ป้องกัน Cloudinary แปลงภาพ
  formData.append("transformation", JSON.stringify([{ crop: "fit" }]));

  try {
    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    const data = await res.json();

    // :white_check_mark: ลบ query ครอปที่ Cloudinary อาจเพิ่มเอง
    return data.secure_url
      ? data.secure_url.replace(/\/upload\/[^/]+\//, "/upload/")
      : null;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return null;
  }
}

