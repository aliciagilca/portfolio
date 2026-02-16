import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
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
            <a
              href={`/references/${item.slug}`}
              className="block md:aspect-video md:h-auto h-96 relative p-8 group"
            >
              <div
                className="block w-full h-full rounded-xl border border-white/10 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:border-white/25"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  transition:
                    "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(255, 255, 255, 0.06), 0 30px 60px rgba(255, 255, 255, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.3)";
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
                <div className="absolute bottom-12 left-12 transition-all duration-500 ease-out group-hover:-translate-y-1">
                  <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-sm transition-all duration-500 group-hover:bg-black/80 group-hover:shadow-lg group-hover:shadow-white/10">
                    {item.company}
                  </span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
