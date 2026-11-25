const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  expose: {
    API_URL: "https://serverest.dev"
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
});
