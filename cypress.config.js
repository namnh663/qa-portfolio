const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "yuoifs",
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});