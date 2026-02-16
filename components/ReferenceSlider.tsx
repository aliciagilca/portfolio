import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

const kenBurnsVariants = [
  { from: "scale(1) translate(0%, 0%)", to: "scale(1.2) translate(-3%, -2%)" },
  { from: "scale(1.05) translate(-2%, 0%)", to: "scale(1.2) translate(2%, -3%)" },
  { from: "scale(1) translate(0%, -1%)", to: "scale(1.25) translate(-2%, 3%)" },
  { from: "scale(1.1) translate(2%, 2%)", to: "scale(1.2) translate(-3%, -1%)" },
  { from: "scale(1.05) translate(-1%, 2%)", to: "scale(1.25) translate(2%, -2%)" },
];

function KenBurnsCard({ item, index }: { item: Reference; index: number }) {
  const variant = useMemo(
    () => kenBurnsVariants[index % kenBurnsVariants.length],
    [index]
  );
  const animationName = `kenburns-${index % kenBurnsVariants.length}`;
  const duration = 12 + (index % 3) * 4;

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-8 group"
    >
      <div className="block w-full h-full rounded-xl border border-white/10 overflow-hidden relative transition-all duration-500 ease-out hover:border-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)]">
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="w-full h-full object-cover"
            style={{
              animation: `${animationName} ${duration}s ease-in-out infinite alternate`,
              willChange: "transform",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="w-full h-full object-cover"
            style={{
              animation: `${animationName} ${duration}s ease-in-out infinite alternate`,
              willChange: "transform",
            }}
            controls={false}
            autoPlay
            muted
            loop
          />
        )}
        <div className="absolute inset-0 pointer-events-none z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.35) 100%)",
          }}
        />
        <div className="absolute bottom-12 left-12 z-20 transition-all duration-500 ease-out group-hover:-translate-y-1">
          <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-sm transition-all duration-500 group-hover:bg-black/80 group-hover:shadow-lg group-hover:shadow-white/10">
            {item.company}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes ${animationName} {
          0% { transform: ${variant.from}; }
          100% { transform: ${variant.to}; }
        }
        .group:hover img,
        .group:hover video {
          animation-play-state: paused !important;
        }
      `}</style>
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
        {references.map((item, index) => (
          <SwiperSlide key={item.id} className="!overflow-visible">
            <KenBurnsCard item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
