import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Reference } from "../pages/index/types";

import "swiper/css";

interface ReferenceSliderProps {
  references: Reference[];
}

function ShimmerBorderCard({ item }: { item: Reference }) {
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();

    function draw() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const perimeter = 2 * (w + h);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const speed = 0.15;
      const progress = (elapsed * speed) % 1;
      const radius = 12;
      const lineWidth = hovered ? 2 : 1;
      const shimmerLength = perimeter * 0.25;

      ctx.clearRect(0, 0, w, h);

      const shimmerPos = progress * perimeter;

      const gradient = ctx.createConicGradient(0, w / 2, h / 2);

      const getPointOnPerimeter = (dist: number) => {
        const d = ((dist % perimeter) + perimeter) % perimeter;
        if (d < w) return { x: d, y: 0 };
        if (d < w + h) return { x: w, y: d - w };
        if (d < 2 * w + h) return { x: w - (d - w - h), y: h };
        return { x: 0, y: h - (d - 2 * w - h) };
      };

      ctx.beginPath();
      ctx.roundRect(lineWidth / 2, lineWidth / 2, w - lineWidth, h - lineWidth, radius);

      const trailSteps = 60;
      for (let i = 0; i < trailSteps; i++) {
        const t = i / trailSteps;
        const dist = shimmerPos - t * shimmerLength;
        const point = getPointOnPerimeter(dist);
        const alpha = (1 - t) * (hovered ? 0.9 : 0.5);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;

        const segStart = ((dist % perimeter) + perimeter) % perimeter;
        const segEnd = (((dist + perimeter * 0.008) % perimeter) + perimeter) % perimeter;

        ctx.beginPath();

        const p1 = getPointOnPerimeter(segStart);
        const p2 = getPointOnPerimeter(segStart + perimeter * 0.004);
        ctx.moveTo(
          Math.max(radius, Math.min(w - radius, p1.x)),
          Math.max(radius, Math.min(h - radius, p1.y))
        );
        ctx.lineTo(
          Math.max(radius, Math.min(w - radius, p2.x)),
          Math.max(radius, Math.min(h - radius, p2.y))
        );
        ctx.stroke();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [hovered]);

  return (
    <a
      href={`/references/${item.slug}`}
      className="block md:aspect-video md:h-auto h-96 relative p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none rounded-xl"
          style={{ mixBlendMode: "screen" }}
        />

        <div
          className="absolute -inset-px rounded-xl z-20 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow:
              "0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        />

        <div className="absolute inset-0 rounded-xl border border-white/10 z-10 pointer-events-none" />

        {item.type === "image" ? (
          <img
            src={item.file}
            alt={item.company}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        ) : (
          <video
            src={item.file}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
            controls={false}
            autoPlay
            muted
            loop
          />
        )}

        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
            opacity: hovered ? 1 : 0.6,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <div
            className="h-px mb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: hovered ? "60px" : "0px",
              background: "rgba(255,255,255,0.5)",
            }}
          />
          <span
            className="text-sm font-light tracking-widest uppercase transition-all duration-500 ease-out"
            style={{
              opacity: hovered ? 1 : 0.7,
              letterSpacing: hovered ? "0.2em" : "0.1em",
              textShadow: hovered ? "0 0 15px rgba(255,255,255,0.3)" : "none",
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
            <ShimmerBorderCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
