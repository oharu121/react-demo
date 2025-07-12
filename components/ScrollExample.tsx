import React, { useRef, useEffect, useState } from "react";

const sections = [
  {
    refName: "part1Ref",
    title: "第一部",
    desc: "最初のセクションへようこそ。このエリアでは、モダンな見た目のスクロール例を紹介します。",
    bg: "bg-gradient-to-br from-slate-50 to-indigo-100",
    color: "text-gray-900"
  },
  {
    refName: "part2Ref",
    title: "第二部",
    desc: "ここでは、スムーズなアニメーションスクロールやレスポンシブデザインの特徴を紹介します。",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-200",
    color: "text-gray-900"
  },
  {
    refName: "part3Ref",
    title: "第三部",
    desc: "このパターンを自分のプロジェクトで使ってみませんか？スクロールして、その簡単さを体験してください！",
    bg: "bg-gradient-to-br from-pink-50 to-pink-200",
    color: "text-gray-900"
  }
];

export default function ScrollExample() {
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);
  const sectionRefs = [part1Ref, part2Ref, part3Ref];
  const [visible, setVisible] = useState([false, false, false]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Intersection Observer for fade-in animation and active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.forEach((ref, idx) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              setActiveIdx(idx);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  return (
    <>
      {/* Floating bar: responsive position */}
      <div
        className="fixed left-1/2 z-50 flex -translate-x-1/2 gap-2 md:gap-4 rounded-full bg-white/90 shadow-lg px-3 md:px-6 py-1.5 md:py-2 transition-all duration-300 floating-bar w-11/12 max-w-md md:w-auto"
        style={{
          top: typeof window !== "undefined" && window.innerWidth > 768 ? 32 : undefined,
          bottom: typeof window !== "undefined" && window.innerWidth <= 768 ? 32 : undefined
        }}
      >
        {sections.map((section, idx) => (
          <button
            key={section.title}
            className={
              `font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ` +
              `shadow-md ` +
              (activeIdx === idx
                ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-white scale-105 ring-2 ring-cyan-300"
                : "bg-gradient-to-r from-indigo-200 to-cyan-100 text-indigo-900 hover:from-cyan-300 hover:to-indigo-200")
            }
            onClick={() => handleScroll(sectionRefs[idx])}
          >
            {section.title}
          </button>
        ))}
      </div>
      {/* Horizontal scrollable sections */}
      <div className="flex flex-row w-screen h-screen overflow-x-auto overflow-y-hidden scroll-snap-x-mandatory snap-x snap-mandatory scrollbar-hide">
        {sections.map((section, idx) => (
          <div
            key={section.title}
            ref={sectionRefs[idx]}
            className={
              `${section.bg} ${section.color} min-w-screen min-h-screen w-screen h-screen flex flex-col items-center justify-center snap-start box-border px-6 ` +
              `transition-all duration-700 ease-out ` +
              (visible[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10")
            }
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
            <p className="text-lg md:text-xl max-w-xl text-center">{section.desc}</p>
          </div>
        ))}
      </div>
      {/* Hide scrollbar cross-browser if Tailwind's plugin is not available */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
