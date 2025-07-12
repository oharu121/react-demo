import * as React from "react";

export default function FollowTheLeader() {
  // Get viewport size for initial centering
  const getCenter = (): [number, number] => [window.innerWidth / 2 - 32, window.innerHeight / 2 - 32];
  const [position, setPosition] = React.useState<[number, number]>([0, 0]);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    // Center the box on mount
    setPosition(getCenter());
    setInitialized(true);
    // Recenter on resize
    const handleResize = () => setPosition(getCenter());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const { width, height } = boxRef.current.getBoundingClientRect();
    setPosition([
      event.clientX - width / 2,
      event.clientY - height / 2,
    ]);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-gradient-to-tr from-blue-900 via-indigo-800 to-purple-900 overflow-hidden cursor-crosshair select-none"
      onClick={handleClick}
      style={{ zIndex: 10 }}
    >
      {/* The box */}
      <div
        ref={boxRef}
        className="box absolute w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-[0_0_32px_8px_rgba(255,255,255,0.5)] border-4 border-white/60 transition-all duration-700 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate(${position[0]}px, ${position[1]}px)`,
          opacity: initialized ? 1 : 0,
        }}
      />
    </div>
  );
}