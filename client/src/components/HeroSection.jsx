import React, { useEffect, useState } from "react";
import Hero1 from "../assets/Hero1.jpg";
import Hero2 from "../assets/Hero2.jpg";
import Hero3 from "../assets/Hero3.jpg";

const heroImages = [
  {
    title1: "Welcome to",
    url: Hero1,
    title: "Quality Home Construction",
    subtitle:
      "From extensions to renovations, we turn your ideas into reality with your satisfaction as our top priority.",
  },
  {
    title1: "Welcome to",
    url: Hero2,
    title: "Smart Commercial Builds",
    subtitle:
      "We create business spaces that reflect your brand and boost productivity.",
  },
  {
    title1: "Welcome to",
    url: Hero3,
    title: "Expert Renovation Services",
    subtitle:
      "Revamp your property with functional and aesthetic upgrades tailored to your vision.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const { title1, url, title, subtitle } = heroImages[currentIndex];

  return (
    <section className="relative h-[600px] overflow-hidden">
      <img
        src={url}
        alt="Hero Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/1200x600?text=No+Image";
        }}
      />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
          <div className="max-w-3xl text-left">
            <h1 className="text-white font-normal text-[40px] sm:text-[30px] leading-tight">
              {title1.split(" ")[0]}{" "}
              <span className="text-white">{title1.split(" ")[1]}</span>
            </h1>

            <h1 className="text-white font-extrabold text-[60px] sm:text-[80px] leading-tight">
              {title.split(" ")[0]}{" "}
              <span className="text-yellow-400">{title.split(" ")[1]}</span>
            </h1>

            <p className="text-white text-lg max-w-xl mt-4">{subtitle}</p>

            <a
              href="/Portfolio"
              className="mt-6 bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 transition inline-block text-center shadow"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl"
        aria-label="Next Slide"
      >
        ❯
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full border border-white ${
              i === currentIndex ? "bg-white" : ""
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
