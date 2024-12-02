import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Favicon, Manifest } from "@scope/utils/pwa";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid App</Title>
          <Manifest />
          <Favicon />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
