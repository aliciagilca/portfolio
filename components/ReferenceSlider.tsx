import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function SpotlightCard({ item }: { item: Reference }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !spotlightRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)`;
      spotlightRef.current.style.opacity = "1";
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-8 group"
    >
      <div
        ref={cardRef}
        className="block w-full h-full rounded-xl border border-white/10 overflow-hidden relative transition-all duration-500 ease-out hover:border-white/25"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <video
            src={item.file}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            controls={false}
            autoPlay
            muted
            loop
          />
        )}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-10 rounded-xl"
          style={{
            opacity: 0,
            transition: "opacity 0.4s ease",
            mixBlendMode: "soft-light",
          }}
        />
        <div className="absolute bottom-12 left-12 z-20 transition-all duration-500 ease-out group-hover:-translate-y-1">
          <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-sm transition-all duration-500 group-hover:bg-black/80 group-hover:shadow-lg group-hover:shadow-white/10">
            {item.company}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ReferenceSlider({ references }: ReferenceSliderProps) {
  return (
    <div className="w-full cursor-grab active:cursor-grabbing py-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1.5}
        grabCursor={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="references-slider"
      >
        {references.map((item) => (
          <SwiperSlide key={item.id} className="!overflow-visible">
            <SpotlightCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
