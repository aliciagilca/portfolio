import React, { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function ParallaxCard({ item }: { item: Reference }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [labelOffset, setLabelOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        setImageOffset({ x: x * -12, y: y * -8 });
        setLabelOffset({ x: x * 18, y: y * 12 });
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setImageOffset({ x: 0, y: 0 });
    setLabelOffset({ x: 0, y: 0 });
  }, []);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-4"
    >
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          border: `1px solid rgba(255,255,255,${hovered ? 0.2 : 0.08})`,
          transition: "border-color 0.4s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${hovered ? 1.1 : 1.05})`,
              transition: hovered
                ? "transform 0.15s ease-out"
                : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${hovered ? 1.1 : 1.05})`,
              transition: hovered
                ? "transform 0.15s ease-out"
                : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            controls={false}
            autoPlay
            muted
            loop
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered
              ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)"
              : "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.5s ease",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-20 p-6"
          style={{
            transform: `translate(${labelOffset.x}px, ${labelOffset.y}px)`,
            transition: hovered
              ? "transform 0.15s ease-out"
              : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            className="h-px mb-3"
            style={{
              width: hovered ? "40px" : "0px",
              background: "rgba(255,255,255,0.6)",
              transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-sm font-light tracking-widest uppercase block"
            style={{
              opacity: hovered ? 1 : 0.7,
              textShadow: hovered
                ? "0 2px 20px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.2)"
                : "0 2px 10px rgba(0,0,0,0.5)",
              transition: "opacity 0.4s ease, text-shadow 0.4s ease",
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
            <ParallaxCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
