const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
const UPLOAD_PRESET = "products";

export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  const formData: FormData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data: { secure_url?: string } = await res.json();

    if (!data.secure_url) return null;

    // ✅ แปลง URL ให้ใช้ crop=fit และขนาด 1077x311 โดยไม่ตัดภาพ
    const transformedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/c_fit,w_1077,h_311/"
    );

    return transformedUrl;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return null;
  }
}

