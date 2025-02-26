import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

export default defineVitestConfig({
	plugins: [vue(), tailwindcss()],
	server: {
		proxy: {
			"/api/soundon": {
				target: "https://api.soundon.fm",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/soundon/, ""),
			},
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
		},
	},
});
