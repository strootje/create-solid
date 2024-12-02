import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(
      // nothing..
    ),

    presetWebFonts({
      provider: "bunny",
      fonts: {
        // nothing..
      },
    }),

    presetIcons({
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      },

      collections: {
        // nothing..
      },
    }),
  ],
});
