import Link from "next/link";

const components = [
  { name: "ScrollExample", path: "/scroll-example" },
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
