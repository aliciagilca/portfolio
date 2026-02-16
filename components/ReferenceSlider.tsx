import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

const blobKeyframes = [
  "60% 40% 30% 70% / 40% 60% 70% 30%",
  "30% 60% 70% 40% / 50% 30% 60% 50%",
  "50% 50% 40% 60% / 60% 40% 50% 50%",
  "40% 60% 50% 50% / 30% 70% 40% 60%",
  "70% 30% 60% 40% / 50% 50% 30% 70%",
  "60% 40% 30% 70% / 40% 60% 70% 30%",
];

function lerp(a: string, b: string, t: number): string {
  const parseRadius = (s: string) => {
    const [topPart, bottomPart] = s.split("/").map((p) => p.trim());
    const top = topPart.split(" ").map((v) => parseFloat(v));
    const bottom = bottomPart.split(" ").map((v) => parseFloat(v));
    return [...top, ...bottom];
  };
  const va = parseRadius(a);
  const vb = parseRadius(b);
  const result = va.map((v, i) => v + (vb[i] - v) * t);
  return `${result[0]}% ${result[1]}% ${result[2]}% ${result[3]}% / ${result[4]}% ${result[5]}% ${result[6]}% ${result[7]}%`;
}

function LiquidCard({ item }: { item: Reference }) {
  const [hovered, setHovered] = useState(false);
  const [borderRadius, setBorderRadius] = useState("12px");
  const [borderColor, setBorderColor] = useState("rgba(255,255,255,0.08)");
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!hovered) {
      cancelAnimationFrame(animRef.current);
      setBorderRadius("12px");
      setBorderColor("rgba(255,255,255,0.08)");
      return;
    }

    startRef.current = Date.now();

    function animate() {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const cycleDuration = 3;
      const progress = (elapsed % (cycleDuration * (blobKeyframes.length - 1))) / cycleDuration;
      const idx = Math.floor(progress);
      const t = progress - idx;
      const smoothT = t * t * (3 - 2 * t);

      const currentRadius = lerp(
        blobKeyframes[idx % (blobKeyframes.length - 1)],
        blobKeyframes[(idx + 1) % blobKeyframes.length],
        smoothT
      );
      setBorderRadius(currentRadius);

      const hue = (elapsed * 30) % 360;
      setBorderColor(`hsla(${hue}, 40%, 65%, 0.4)`);

      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: borderRadius,
          border: `2px solid ${borderColor}`,
          transition: hovered
            ? "border-color 0.3s ease"
            : "border-radius 0.8s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.6s ease",
          boxShadow: hovered
            ? `0 0 30px ${borderColor}, 0 0 60px ${borderColor.replace("0.4", "0.15")}`
            : "none",
        }}
      >
        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
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
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.5s ease",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <span
            className="text-sm font-light tracking-widest uppercase block"
            style={{
              opacity: hovered ? 1 : 0.7,
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              textShadow: hovered
                ? "0 2px 20px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.2)"
                : "0 2px 10px rgba(0,0,0,0.5)",
              transition:
                "opacity 0.4s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), text-shadow 0.4s ease",
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
            <LiquidCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
