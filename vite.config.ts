import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      inspectorPort: false,
      config: {
        name: "voltnet",
        main: "./hosting/worker.ts",
        compatibility_date: "2026-05-15",
        compatibility_flags: ["nodejs_compat"],
        vars: {
          SITE_URL: "https://voltnet.ge",
          SITE_INDEXABLE: "false",
        },
      },
    }),
  ],
});
