import React, { useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Recommendation } from "../pages/index/types";

import "swiper/css";

interface RecommendationSliderProps {
  recommendations: Recommendation[];
}

function TiltCard({ rec, isActive }: { rec: Recommendation; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isActive) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = ((centerY - y) / centerY) * 12;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTiltStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
        transition: "transform 0.1s ease-out",
      });

      setGlareStyle({
        opacity: 0.4,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 60%)`,
      });
    },
    [isActive]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setGlareStyle({
      opacity: 0,
      background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <a
        href={`/recommendations/${rec.slug}`}
        className={`block p-6 md:p-8 rounded-xl border transition-all duration-500 group ${
          isActive
            ? "border-white/20 bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            : "border-white/8 bg-white/[0.02] opacity-60"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={glareStyle}
        />
        <div className="flex items-center gap-4 mb-5" style={{ transform: isActive ? "translateZ(20px)" : "none" }}>
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
        <p
          className="text-neutral-300 text-sm leading-relaxed line-clamp-3"
          style={{ transform: isActive ? "translateZ(10px)" : "none" }}
        >
          &ldquo;{rec.highlight}&rdquo;
        </p>
        <span
          className={`inline-block mt-4 text-xs transition-colors ${
            isActive ? "text-neutral-400 group-hover:text-neutral-200" : "text-neutral-600"
          }`}
          style={{ transform: isActive ? "translateZ(15px)" : "none" }}
        >
          Read full review &rarr;
        </span>
      </a>
    </div>
  );
}

export default function RecommendationSlider({ recommendations }: RecommendationSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <div className="w-full cursor-grab active:cursor-grabbing" style={{ perspective: "1200px" }}>
      <style>{`
        .recommendations-slider.swiper {
          overflow: visible;
        }
        .recommendations-slider .swiper-wrapper {
          overflow: visible;
        }
      `}</style>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1.15}
        grabCursor={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.2 },
        }}
        className="recommendations-slider"
      >
        {recommendations.map((rec, index) => (
          <SwiperSlide key={rec.id} className="!overflow-visible">
            <div className="py-6">
              <TiltCard rec={rec} isActive={index === activeIndex} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
