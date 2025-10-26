import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white text-center px-4 md:px-0">
      {/* ✨ Header */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Lamborghini</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
        Discover the future of performance and design.
      </p>

      {/* 🚗 CTA Button */}
      <Link
        to="/models"
        className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
      >
        View Models →
      </Link>

      {/* 📌 Placeholder สำหรับเพิ่ม sections ในอนาคต */}
      <div className="mt-12 w-full max-w-5xl flex flex-col gap-8">
        {/* ตัวอย่าง: highlight features, promo, news */}
        {/* <FeatureSection /> */}
        {/* <PromoSection /> */}
      </div>
    </section>
  );
};

export default Home;
