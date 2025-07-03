"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const COMPONENTS = {
  Button: dynamic(() => import("../components/Button")),
  ScrollExample: dynamic(() => import("../components/ScrollExample")),
};

export default function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Button";

  const Component = useMemo(
    () => COMPONENTS[name as keyof typeof COMPONENTS],
    [name]
  );

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Component: {name}</h1>
      <div style={{ marginTop: "2rem" }}>
        {Component ? <Component /> : <p>Component not found</p>}
      </div>
    </main>
  );
}
