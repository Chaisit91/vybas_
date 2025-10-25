import React from "react";

const About = () => {
  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4 text-gray-700">
        Welcome to Custom CAR! We are passionate about bringing you the best and most customizable car experiences.
        Our mission is to combine cutting-edge technology with unique design to make your dream car a reality.
      </p>
      <p className="mb-8 text-gray-700">
        Whether you’re a supercar enthusiast or just someone looking for something special, we have the perfect options for you.
        Explore our models, customize your car, and feel the thrill of driving a Lamborghini tailored just for you.
      </p>

      <img
        src="/d99860bd-c8b8-46ba-896f-b65c6ad3cd95.png"
        alt="Lamborghini"
        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
      />

      <h2 className="mt-10 text-2xl font-semibold">Our Story</h2>
      <p className="mt-3 text-gray-700">
        Since 2025, Custom CAR has been dedicated to delivering the ultimate supercar experience.
        We work closely with Lamborghini to bring exclusive models and customization options to our clients worldwide.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Contact Us</h2>
      <p className="mt-3 text-gray-700">
        Have questions or want to schedule a test drive? Reach out to us at{" "}
        <a href="mailto:contact@customcar.com" className="text-yellow-600 underline">
          contact@customcar.com
        </a>
        .
      </p>
    </div>
  );
};

export default About;
