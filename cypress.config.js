const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');

const tesseract = require ("tesseract.js")
const fs = require("fs")
const pdfparser = require("pdf-parse");


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

      on('task', {
        downloadFile: downloadFile,
        getImageText:getImageText,
        getPDFText: getPDFText
      })

      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },

    chromeWebSecurity: false, // si esta linea no está, nunca llega a la página de saucedemo se queda en "visitando..."
    specPattern: "cypress/e2e/features/*.feature",
  },
});

const getImageText = async (obj) => {
  let { fileName, lang, logger } = obj
  let recognizeResult = null
  try {
    if (fs.existsSync(fileName)) {
      if (logger) {
        const myLogger = {
          logger: m => console.log(m)
        }
        recognizeResult = await tesseract.recognize(fileName, lang, myLogger)
      } else {
        recognizeResult = await tesseract.recognize(fileName, lang)
      }
      if (recognizeResult) {
        return recognizeResult.data.text
      }
    }
  } catch (error) {
    return error.message
  }
}

const getPDFText = async (obj) => {
  let { pdfFile, maxPages } = obj; 
  let parsedPDF = ""
  let pdfBuffer = null
  try {
      if (fs.existsSync(pdfFile)) {
          pdfBuffer = fs.readFileSync(pdfFile)
          if (maxPages) {
              parsedPDF = await pdfparser(pdfBuffer, { max: maxPages })
          } else {
              parsedPDF = await pdfparser(pdfBuffer)
          }
          if (parsedPDF) {
              return parsedPDF.text
          }
      }
  } catch (err) {
      return err.message
  }
}
