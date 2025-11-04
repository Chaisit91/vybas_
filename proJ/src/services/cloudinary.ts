// // services/cloudinary.ts

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlp0q39ua/image/upload";
// const UPLOAD_PRESET = "products";

// /**
//  * ✅ อัปโหลดภาพขึ้น Cloudinary (รองรับ unsigned preset)
//  * @param file - ไฟล์ภาพที่ต้องการอัปโหลด
//  * @returns secure_url (string) หรือ null หากล้มเหลว
//  */
// export async function uploadImageToCloudinary(file: File): Promise<string | null> {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", UPLOAD_PRESET);

//   try {
//     const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
//     const data = await res.json();
//     console.log("🌤️ Cloudinary response:", data);

//     if (data.error) {
//       alert(`❌ Upload failed: ${data.error.message}`);
//       return null;
//     }

//     if (!data.secure_url) {
//       alert("❌ Upload failed — Cloudinary response invalid");
//       return null;
//     }

//     // ✅ ใช้ secure_url ตรง ๆ
//     const optimizedUrl = data.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
//     return optimizedUrl;
//   } catch (err: unknown) {
//     console.error("❌ Cloudinary upload failed:", err);

//     const errorMessage =
//       err instanceof Error ? err.message : "Unknown error occurred";

//     alert(
//       `❌ อัปโหลดรูปไม่สำเร็จ — โปรดตรวจสอบอินเทอร์เน็ตหรือการตั้งค่า Cloudinary\n(${errorMessage})`
//     );
//     return null;
//   }
// }


// ✅ ต้องอยู่ด้านบนสุดของไฟล์
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
    const data = await res.json();
    console.log("🌤️ Cloudinary response:", data);

    if (data.error) {
      alert(`❌ Upload failed: ${data.error.message}`);
      return null;
    }

    if (!data.secure_url) {
      alert("❌ Upload failed — Cloudinary response invalid");
      return null;
    }

    // ✅ ใช้ URL ตรง ๆ จาก Cloudinary โดยไม่เปลี่ยน path
    return data.secure_url;
  } catch (err: unknown) {
    console.error("❌ Cloudinary upload failed:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    alert(
      `❌ อัปโหลดรูปไม่สำเร็จ — โปรดตรวจสอบอินเทอร์เน็ตหรือการตั้งค่า Cloudinary\n(${errorMessage})`
    );
    return null;
  }
}

