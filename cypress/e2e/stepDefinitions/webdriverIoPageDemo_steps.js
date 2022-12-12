import {
  Given,
  When,
  And, //<--- por alguna razón, si colocas un paso de tipo AND el automatismo da error
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import webdriverHomePage from '../pages/webdriverMainPage'

Given("A user opens a webdriverio website in {}", (deviceScreen) => {
  cy.log(deviceScreen)
  if (String(deviceScreen).includes('[')){
    var pixels = deviceScreen.replace('[', '').replace(']', '').split(",").map(Number);
    cy.viewport(pixels[0], pixels[1])
  }else{
    cy.viewport(deviceScreen)
  }
  cy.visit('https://webdriver.io/');
});

When("A user clicks on the api button", () => {
  const wdp = new webdriverHomePage();

  wdp.elements.hamburguerIcon().then(element => {
    if(element.is(':visible')){
      wdp.hambMenu_click(),
      cy.log('asasasasasasasa')
      wdp.apiMenuLink_click()
    }else{
      cy.log('mamamamamama')
      wdp.apiNavBar_click()
    }
  })
});

  Then("the url will contains the api subdirectory", () => {
    cy.url().should("contains", "/docs/api");
  });
