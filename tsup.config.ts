import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["electron/main.ts"],
  format: ["cjs"],
  outDir: "dist/electron",
  clean: true,
  dts: false,
});