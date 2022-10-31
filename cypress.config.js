const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportFilename: 'Nombre del reporte - [datetime]',
    charts: true,//diagrama circular
    reportTitle: 'Titulo del reporte', //Título del reporte
    reportPageTitle: 'Título de la página', //Título en la página
    embeddedScreenshots: true, //Capturas de pantalla
    autoOpen: true,//Se abre el reporte automáticamente al finalizar la ejecución
    code: false,//se quita el código código
    overwrite:false,//genera un nuevo reporte cada vez
    inlineAssets: true, //elimina la capeta asserts
    saveJson:false,//almacena un reporte .json al finalizar el lanzamiento
    saveAllAttempts: true,
  },

  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor",bundler);
      await addCucumberPreprocessorPlugin(on, config);

      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },

    chromeWebSecurity: false, // si esta linea no está, nunca llega a la página de saucedemo se queda en "visitando..."
    specPattern: "cypress/e2e/features/*.feature",
  },
});
