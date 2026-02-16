import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function LabelRevealCard({ item }: { item: Reference }) {
  const [hovered, setHovered] = useState(false);
  const letters = item.company.split("");

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-8 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="block w-full h-full rounded-xl border border-white/10 overflow-hidden relative transition-all duration-500 ease-out hover:border-white/20">
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
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)",
            opacity: hovered ? 1 : 0.5,
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-10 overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            height: hovered ? "140px" : "64px",
          }}
        >
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: hovered ? 1 : 0,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            }}
          />

          <div className="relative z-10 pt-4">
            <div
              className="h-px mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: hovered ? "100%" : "0%",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />

            <div className="flex overflow-hidden" aria-label={item.company}>
              {letters.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block text-2xl font-light tracking-widest uppercase transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: hovered ? "translateY(0)" : "translateY(100%)",
                    opacity: hovered ? 1 : 0,
                    transitionDuration: "600ms",
                    transitionDelay: hovered ? `${80 + i * 40}ms` : "0ms",
                    textShadow: hovered
                      ? "0 0 20px rgba(255,255,255,0.3)"
                      : "none",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            <span
              className="block text-xs tracking-[0.3em] uppercase text-white/50 mt-2 transition-all duration-500 ease-out"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
                transitionDelay: hovered ? "400ms" : "0ms",
              }}
            >
              View project
            </span>

            <span
              className="block text-sm text-white/80 transition-all duration-500 ease-out absolute top-4"
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
              }}
            >
              {item.company}
            </span>
          </div>
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
            <LabelRevealCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
