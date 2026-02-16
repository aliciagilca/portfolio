import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function CurtainCard({ item }: { item: Reference }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          border: `1px solid rgba(255,255,255,${hovered ? 0.15 : 0.08})`,
          transition: "border-color 0.4s ease",
        }}
      >
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
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
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)"
              : "rgba(0,0,0,0.55)",
            transition: "background 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />

        <div
          className="absolute top-0 left-0 w-1/2 h-full z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.3) 100%)",
            transform: hovered ? "translateX(-105%)" : "translateX(0)",
            transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />

        <div
          className="absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.3) 100%)",
            transform: hovered ? "translateX(105%)" : "translateX(0)",
            transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />

        <div
          className="absolute left-1/2 top-0 bottom-0 z-20 pointer-events-none"
          style={{
            width: "1px",
            background: "rgba(255,255,255,0.15)",
            transform: `translateX(-50%) scaleY(${hovered ? 0 : 1})`,
            transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
            transformOrigin: "center center",
          }}
        />

        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <span
            className="text-xs font-light uppercase"
            style={{
              letterSpacing: hovered ? "0.5em" : "0.15em",
              opacity: hovered ? 0 : 0.5,
              transition:
                "letter-spacing 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease",
            }}
          >
            {item.company}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
          <div
            className="overflow-hidden"
            style={{
              height: hovered ? "auto" : "0",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.6s ease 0.3s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s",
            }}
          >
            <div
              className="h-px mb-4"
              style={{
                width: hovered ? "60px" : "0px",
                background: "rgba(255,255,255,0.5)",
                transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            />
            <span
              className="text-sm font-light tracking-widest uppercase block"
              style={{
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              {item.company}
            </span>
            <span
              className="text-xs font-light block mt-1"
              style={{
                opacity: hovered ? 0.5 : 0,
                transition: "opacity 0.5s ease 0.5s",
                letterSpacing: "0.1em",
              }}
            >
              View project
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
            <CurtainCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
