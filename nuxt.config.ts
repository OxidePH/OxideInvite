// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@pinia/nuxt", "@vueuse/nuxt"],
	runtimeConfig: {
		public: { apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000" },
	},
});
