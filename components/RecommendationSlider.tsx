import React, { useMemo, useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Recommendation } from "../pages/index/types";

import "swiper/css";

interface RecommendationSliderProps {
  recommendations: Recommendation[];
}

function TiltCard({ rec, rotation }: { rec: Recommendation; rotation: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)",
  });
  const isInteracting = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${rotation}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      });

      setGlareStyle({
        opacity: 0.4,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 60%)`,
      });

      isInteracting.current = true;
    },
    [rotation]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: `rotate(${rotation}deg)`,
      transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setGlareStyle({
      opacity: 0,
      background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)",
    });
    isInteracting.current = false;
  }, [rotation]);

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
        className="block p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={glareStyle}
        />
        <div className="flex items-center gap-4 mb-5" style={{ transform: "translateZ(20px)" }}>
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
          style={{ transform: "translateZ(10px)" }}
        >
          &ldquo;{rec.highlight}&rdquo;
        </p>
        <span
          className="inline-block mt-4 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors"
          style={{ transform: "translateZ(15px)" }}
        >
          Read full review &rarr;
        </span>
      </a>
    </div>
  );
}

export default function RecommendationSlider({ recommendations }: RecommendationSliderProps) {
  const rotations = useMemo(() => {
    return recommendations.map(() => Math.random() * 2 - 1);
  }, [recommendations]);

  return (
    <div className="w-full cursor-grab active:cursor-grabbing py-4" style={{ perspective: "1200px" }}>
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
          <SwiperSlide key={rec.id}>
            <TiltCard rec={rec} rotation={rotations[index]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
