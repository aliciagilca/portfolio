import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Recommendation } from "../pages/index/types";

import "swiper/css";

interface RecommendationSliderProps {
  recommendations: Recommendation[];
}

export default function RecommendationSlider({ recommendations }: RecommendationSliderProps) {
  const rotations = useMemo(() => {
    return recommendations.map(() => Math.random() * 2 - 1);
  }, [recommendations]);

  return (
    <div className="w-full cursor-grab active:cursor-grabbing py-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1.15}
        grabCursor={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.2 },
        }}
        className="recommendations-slider"
      >
        {recommendations.map((rec, index) => (
          <SwiperSlide key={rec.id} style={{ transform: `rotate(${rotations[index]}deg)` }}>
            <a
              href={`/recommendations/${rec.slug}`}
              className="block p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-white/5 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={rec.avatar}
                  alt={rec.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{rec.name}</span>
                  <span className="text-xs text-neutral-500">
                    {rec.role}, {rec.company}
                  </span>
                </div>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                &ldquo;{rec.highlight}&rdquo;
              </p>
              <span className="inline-block mt-4 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                Read full review &rarr;
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
