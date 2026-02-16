import React, { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function SpotlightCard({ item }: { item: Reference }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    });
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-4"
    >
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: `1px solid rgba(255,255,255,${hovered ? 0.15 : 0.08})`,
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          boxShadow: hovered
            ? "0 0 30px rgba(255,255,255,0.06)"
            : "none",
        }}
      >
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            controls={false}
            autoPlay
            muted
            loop
          />
        )}

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.15), transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            mixBlendMode: "soft-light",
          }}
        />

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <span
            className="text-sm font-light tracking-widest uppercase"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              transition: "letter-spacing 0.4s ease, text-shadow 0.4s ease",
              letterSpacing: hovered ? "0.15em" : "0.1em",
            }}
          >
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
