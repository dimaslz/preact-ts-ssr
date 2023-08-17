import "dotenv/config";

import preact from "@preact/preset-vite";
import path from "path";
import ssr from "vite-plugin-ssr/plugin";
import svgr from "vite-plugin-svgr";

const config = {
	plugins: [preact(), ssr(), svgr()],
	optimizeDeps: {
		include: [
			"preact/devtools",
			"preact/debug",
			"preact/jsx-dev-runtime",
			"preact",
			"preact/hooks",
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	server: {
		port: process.env.PORT || 3000,
	},
};

export default config;
