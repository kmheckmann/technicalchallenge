const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wq9gns',
  e2e: {
    specPattern: "cypress/**/*.*",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.amazon.com'
  },
});
