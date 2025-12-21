import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

// Import Swiper styles
import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

export default function ReferenceSlider({ references }: ReferenceSliderProps) {
  // Create random rotation values for each slide between -3 and +3 degrees
  const rotations = useMemo(() => {
    return references.map(() => Math.random() * 2 - 1);
  }, [references]);

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
          <SwiperSlide key={item.id} style={{ transform: `rotate(${rotations[index]}deg)` }}>
            <div className="md:aspect-video md:h-auto h-96 relative p-8">
              <div className="block w-full h-full rounded-xl border border-white/10 overflow-hidden">
                {item.type === "image" ? (
                  <img src={item.file} alt={item.company} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.file} className="w-full h-full object-cover" controls={false} autoPlay muted loop />
                )}
                <div className="absolute bottom-12 left-12 bg-black/70 px-3 py-1 rounded text-sm">{item.company}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
