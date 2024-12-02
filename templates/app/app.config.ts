import { default as deno } from "@deno/vite-plugin";
import { defineConfig } from "@solidjs/start/config";
import { default as unocss } from "unocss/vite";
import { VitePWA as pwa } from "vite-plugin-pwa";

export default defineConfig({
  ssr: true,

  server: {
    preset: "deno-server",
  },

  vite: {
    plugins: [
      deno(
        // nothing..
      ),

      pwa({
        base: "/",
        mode: "development",

        devOptions: {
          enabled: true,
        },

        includeAssets: ["favicon.ico"],

        manifest: {
          name: "SolidApp",
          short_name: "solid-app",
          description: "Awesome app!",

          theme_color: "#000000",

          icons: [
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      }),

      unocss(
        // nothing..
      ),
    ],
  },
});
