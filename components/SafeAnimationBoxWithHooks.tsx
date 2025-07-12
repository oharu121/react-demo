import React, { useRef, useState, useTransition } from "react";
import AnimatedFace from "./AnimatedFace";

// --- 新しいユーティリティとフックをインポート ---
import { useNextTick } from "@/hooks/use-next-tick";
import { waitUntilAnimationFinished } from "@/lib/wait-until-animation-finished";

export default function SafeAnimationBoxWithHooks() {
  const [happy, setHappy] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);

  // 1. isAnimatingRef と forceUpdate を useTransition に置き換える
  const [isAnimationPending, startAnimationTransition] = useTransition();
  const { nextTick } = useNextTick();

  // 2. useEffect は不要になり、ロジックはイベントハンドラに集約される
  const handleToggle = () => {
    // UIに即時反映したい状態更新
    setHappy((prev) => !prev);

    // アニメーション完了を待つ非同期処理をTransitionとして実行
    startAnimationTransition(async () => {
      // DOMの更新（クラス名の変更）を待つ
      await nextTick();

      const node = boxRef.current;
      if (!node) return;

      // DOM更新後、アニメーションの完了を待つ
      await waitUntilAnimationFinished(node);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-full max-w-xs mx-auto">
      <span className="text-sm text-gray-500">✅ 改善後の例（Refactored）</span>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={handleToggle}
        // 3. isAnimationPending を使って宣言的にdisabledを制御
        disabled={isAnimationPending}
      >
        {isAnimationPending ? "Animating..." : "Toggle"}
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
        style={{ fontSize: 28, fontWeight: 700, position: "relative" }}
      >
        <AnimatedFace happy={happy} />
        <span className="absolute left-0 right-0 bottom-2 text-center text-lg font-bold tracking-widest select-none pointer-events-none">
          {happy ? "HAPPY" : "CRY"}
        </span>
      </div>
    </div>
  );
}