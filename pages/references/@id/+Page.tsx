import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { references } from "../../index/data";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.id;
  const reference = references.find((r) => r.slug === slug);

  if (!reference) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Reference not found</h1>
        <a href="/" className="text-neutral-400 hover:text-white transition-colors underline">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back
        </a>

        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{reference.company}</h1>
          {reference.link && (
            <a
              href={reference.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm underline"
            >
              Visit website
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reference.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 overflow-hidden"
            >
              {item.type === "image" ? (
                <img
                  src={item.file}
                  alt={item.caption || reference.company}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <video
                  src={item.file}
                  className="w-full aspect-video object-cover"
                  controls
                  muted
                />
              )}
              {item.caption && (
                <div className="px-4 py-3 text-sm text-neutral-400">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
