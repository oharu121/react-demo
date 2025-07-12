import React, { useRef, useState, useEffect } from "react";
import AnimatedFace from "./AnimatedFace";

// 崩れない例: getAnimations+useRefでアニメーション完了までトグル不可
export default function SafeAnimationBox() {
  const [happy, setHappy] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [, forceUpdate] = useState(0); // 再描画用

  // アニメーション完了までロック
  useEffect(() => {
    const node = boxRef.current;
    if (!node) return;
    const check = async () => {
      isAnimatingRef.current = true;
      forceUpdate((n) => n + 1); // disabled更新用
      const animations = node.getAnimations();
      await Promise.all(animations.map((a) => a.finished));
      isAnimatingRef.current = false;
      forceUpdate((n) => n + 1);
    };
    check();
  }, [happy]);

  const handleToggle = () => {
    if (isAnimatingRef.current) return;
    setHappy((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-full max-w-xs mx-auto">
      <span className="text-sm text-gray-500">⭕️ 崩れない例（SafeAnimationBox）</span>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={handleToggle}
        disabled={isAnimatingRef.current}
      >
        Toggle
      </button>
      <div
        ref={boxRef}
        className={`flex items-center justify-center select-none shadow-lg
          w-40 h-40
          transition-colors duration-500
          ${happy ? "bg-yellow-100" : "bg-blue-100"}
          transition-[border-radius] duration-[700ms]
          ${happy ? "rounded-full" : "rounded-lg"}
          transition-transform duration-700
          ${happy ? "rotate-0" : "-rotate-6"}
        `}
        style={{ fontSize: 28, fontWeight: 700, position: 'relative' }}
      >
        <AnimatedFace happy={happy} />
        <span className="absolute left-0 right-0 bottom-2 text-center text-lg font-bold tracking-widest select-none pointer-events-none">
          {happy ? "HAPPY" : "CRY"}
        </span>
      </div>
    </div>
  );
}