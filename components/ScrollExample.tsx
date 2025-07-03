import React, { useRef } from "react";

export default function ScrollExample() {
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div style={{ position: "fixed", background: "#fff", zIndex: 10 }}>
        <button onClick={() => handleScroll(part1Ref)}>第一部</button>
        <button onClick={() => handleScroll(part2Ref)}>第二部</button>
        <button onClick={() => handleScroll(part3Ref)}>第三部</button>
      </div>
      <div ref={part1Ref} style={{ height: "100vh", background: "white" }} />
      <div ref={part2Ref} style={{ height: "100vh", background: "yellow" }} />
      <div ref={part3Ref} style={{ height: "100vh", background: "black" }} />
    </>
  );
}
