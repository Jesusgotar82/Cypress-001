const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor",bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },

    chromeWebSecurity: false, // si esta linea no está, nunca llega a la página de saucedemo se queda en "visitando..."
    specPattern: "cypress/e2e/features/*.feature",
  },
});
