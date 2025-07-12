import React, { useRef, useState, useEffect } from "react";
import AnimatedFace from "./AnimatedFace";


// 崩れる例: ボタンは常に押せる（非活性制御なし）
export default function BrokenAnimationBox() {
  const [happy, setHappy] = useState(true);

  // 何度でも連打できる
  const handleToggle = () => {
    setHappy((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-full max-w-xs mx-auto">
      <span className="text-sm text-gray-500">❌ 崩れる例（BrokenAnimationBox）</span>
      <button
        className="px-4 py-2 bg-pink-500 text-white rounded"
        onClick={handleToggle}
      >
        Toggle
      </button>
      <div
        className={`flex items-center justify-center select-none shadow-lg
          transition-[width,height] duration-[1000ms]
          w-40 h-40
          transition-colors duration-500
          ${happy ? "bg-yellow-100" : "bg-blue-100"}
          transition-[border-radius] duration-[700ms]
          ${happy ? "rounded-full" : "rounded-lg"}
          transition-transform duration-700
          ${happy ? "rotate-0" : "-rotate-6"}
        `}
        style={{ fontSize: 28, fontWeight: 700 }}
      >
        <AnimatedFace happy={happy} />
        <span className="absolute left-0 right-0 bottom-2 text-center text-lg font-bold tracking-widest select-none pointer-events-none">
          {happy ? "HAPPY" : "CRY"}
        </span>
      </div>
    </div>
  );
}