export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-20">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 text-blue-700 w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
            SP
          </div>
          <div>
            <h2 className="text-lg font-semibold">สนานุ จินดาภาวรกุล</h2>
            <p className="text-sm text-gray-600">นักศึกษาวิศวกรรมคอมพิวเตอร์</p>
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <h3 className="font-semibold mb-2">เกี่ยวกับฉัน</h3>
          <p className="text-sm text-gray-700">
            สวัสดีครับ ผมชื่อสนานุ จินดาภาวรกุล เป็นนักศึกษาที่มีความสนใจในด้าน Frontend
            หวังว่าจะได้นำความรู้และเทคโนโลยีใหม่ ๆ มาประยุกต์ใช้กับโปรเจกต์ในอนาคต
          </p>
        </div>

        <div className="border-t pt-3 mt-3">
          <h3 className="font-semibold mb-2">การศึกษา</h3>
          <p className="text-sm text-gray-700">
            ปริญญาตรี วิศวกรรมศาสตร์คอมพิวเตอร์ <br />
            มหาวิทยาลัยเชียงใหม่ <br />
            ปี 2566 - ปัจจุบัน
          </p>
        </div>

        <div className="border-t pt-3 mt-3">
          <h3 className="font-semibold mb-2">ทักษะและความสามารถ</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {["HTML/CSS", "JavaScript", "TypeScript", "React", "Node.js", "Tailwind CSS", "Radix UI"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
