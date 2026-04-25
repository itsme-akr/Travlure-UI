import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

export default function Hero({ onSearch, onOpenFilters }) {
  const navigate = useNavigate();

  const images = [
    "/hero/hero1.jpg",
    "/hero/hero2.jpg",
    "/hero/hero3.jpg",
    "/hero/hero4.jpg",
    "/hero/hero5.jpg",
  ];

  const [index, setIndex] = useState(0);

  // 🔄 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[95vh] overflow-hidden">

      {/* 🔥 Background Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* 🔥 Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          Your Personal Concierge
        </h1>

        <p className="text-gray-200 text-lg mb-6 max-w-xl">
          Discover restaurants, bars, and hidden gems tailored to your vibe.
        </p>

        <button
          onClick={() => navigate("/quiz")}
          className="bg-olive px-6 py-3 rounded-xl text-white font-semibold hover:bg-gold transition mb-10"
        >
          Take Quiz to Start
        </button>

        {/* 🔥 SEARCH BOX */}
        <div className="w-full max-w-4xl">
           <SearchBox onSearch={onSearch}
           onOpenFilters={onOpenFilters} />
        </div>

      </div>

      {/* 🔥 Dots Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
}