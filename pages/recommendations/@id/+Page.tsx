import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { recommendations } from "../../index/data";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.id;
  const rec = recommendations.find((r) => r.slug === slug);

  if (!rec) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Recommendation not found</h1>
          <a href="/" className="text-neutral-400 hover:text-white transition-colors">
            &larr; Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-neutral-400 hover:text-white transition-colors text-sm inline-block mb-12">
          &larr; Back
        </a>
        <div className="flex items-center gap-5 mb-8">
          <img
            src={rec.avatar}
            alt={rec.name}
            className="w-16 h-16 rounded-full object-cover border border-white/10"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-lg">{rec.name}</span>
            <span className="text-sm text-neutral-500">
              {rec.role}, {rec.company}
            </span>
          </div>
        </div>
        <blockquote className="text-neutral-300 leading-relaxed text-lg border-l-2 border-white/20 pl-6">
          &ldquo;{rec.fullText}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
