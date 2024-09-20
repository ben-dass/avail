import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@src": path.resolve(__dirname, "./src"),
		},
	},
});
