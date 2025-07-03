"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const COMPONENTS = {
  Button: dynamic(() => import("../components/Button")),
  ScrollExample: dynamic(() => import("../components/ScrollExample")),
};

export default function Page() {
  const [componentName, setComponentName] = useState("Button");
  const [param, setParam] = useState<string | null>("not set");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const name = query.get("name");
    setParam(name);

    if (name && name in COMPONENTS) {
      setComponentName(name);
    }
  }, []);

  const Component = COMPONENTS[componentName as keyof typeof COMPONENTS];

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Component: {componentName}</h1>
      <h1>Param: {param}</h1>
      <div style={{ marginTop: "2rem" }}>
        {Component ? <Component /> : "Not Found"}
      </div>
    </main>
  );
}
