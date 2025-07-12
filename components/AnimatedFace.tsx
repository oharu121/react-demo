export default function AnimatedFace({ happy }: { happy: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-20"
      style={{ display: "block" }}
    >
      {/* Face background */}
      <circle
        cx="50"
        cy="50"
        r="45"
        className={
          happy
            ? "fill-yellow-300 transition-colors duration-500"
            : "fill-blue-200 transition-colors duration-500"
        }
      />
      {/* Eyes */}
      <ellipse
        cx="35"
        cy="43"
        rx="5"
        ry="7"
        className="fill-black transition-all duration-500"
      />
      <ellipse
        cx="65"
        cy="43"
        rx="5"
        ry="7"
        className="fill-black transition-all duration-500"
      />
      {/* Tears (only when crying) */}
      <ellipse
        cx="35"
        cy="54"
        rx={happy ? 0 : 2.5}
        ry={happy ? 0 : 5}
        className={`fill-blue-400 transition-all duration-500 ${happy ? "opacity-0" : "opacity-100"}`}
      />
      <ellipse
        cx="65"
        cy="54"
        rx={happy ? 0 : 2.5}
        ry={happy ? 0 : 5}
        className={`fill-blue-400 transition-all duration-500 ${happy ? "opacity-0" : "opacity-100"}`}
      />
      {/* Mouth: animate from smile to frown */}
      <path
        d={
          happy
            ? "M35,65 Q50,80 65,65" // smile
            : "M35,75 Q50,60 65,75" // frown
        }
        className="stroke-black stroke-2 fill-none transition-all duration-500"
      />
    </svg>
  );
}