import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Lamborghini</h1>
      <p className="text-lg text-gray-300 mb-8">
        Discover the future of performance and design.
      </p>
      <Link
        to="/models"
        className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
      >
        View Models →
      </Link>
    </section>
  );
};

export default Home;
