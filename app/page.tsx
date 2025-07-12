import Link from "next/link";

const components = [
  { name: "ScrollExample", path: "/scroll-example" },
  { name: "BrokenAnimationBox", path: "/broken-animation-box" },
  { name: "SafeAnimationBox", path: "/safe-animation-box" },
  { name: "SafeAnimationBoxWithHooks", path: "/safe-animation-box-with-hooks" },
  { name: "AutofocusInput", path: "/autofocus-input" },
  { name: "ClickOutsideModal", path: "/click-outside-modal" },
  { name: "VideoPlayer", path: "/video-player" },
];

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Component Demo Index</h1>
      <ul style={{ marginTop: "1rem", lineHeight: "2" }}>
        {components.map((comp) => (
          <li key={comp.name}>
            <Link href={comp.path}>🔗 {comp.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
