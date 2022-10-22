import {
  Given,
  When,
  And, //<--- por alguna razón, si colocas un paso de tipo AND el automatismo da error
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
const loginPage = require("../../e2e/pages/LoginPage");

Given("A user opens a saucelabs website in {}", (deviceScreen) => {
  cy.log(deviceScreen)
  if (String(deviceScreen).includes('[')){
    var pixels = deviceScreen.replace('[', '').replace(']', '').split(",").map(Number);
    cy.viewport(pixels[0], pixels[1])
  }else{
    cy.viewport(deviceScreen)
  }
  //cy.visit('https://example.cypress.io/todo');
  cy.visit('https://www.saucedemo.com/');
});

When("A user enters the username {string}", (username) => {
  loginPage.typeUsername(username);
});

When("A user enters the password {string}", (password) => {
  loginPage.typePassword(password);
});

When("A user clicks on the login button", () => {
  loginPage.clickLogin();
});

Then("the url will contains the inventory subdirectory", () => {
  cy.url().should("contains", "/inventory.html");
});

Then("The error message {string} is displayed", (errorMessage) => {
  loginPage.elements.errorMessage().should("have.text", errorMessage);
});