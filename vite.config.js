import { defineConfig } from "vitest/config"

export default defineConfig({
	base: "./",
	test: {
		includeSource: ["src/**/*.{js,ts}"],
	},
})
