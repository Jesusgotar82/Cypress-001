//import basePage from '../pages/basePage'
class homeSauceLoginPage {

  //selectores por elemento
  elements = {
    apiNavBar: () => cy.get("div[class='navbar__items'] > a[href='/docs/api']"),
    apiMenuLink: () => cy.get("a.menu__link[href='/docs/api']"),
    hamburguerIcon: () => cy.get("button.navbar__toggle[aria-label='Toggle navigation bar']"),
  };

  apiNavBar_click() {
    this.elements.apiNavBar().click();
  }

  apiMenuLink_click() {
    this.elements.apiMenuLink().click();
  }
        
  hambMenu_click() {
    this.elements.hamburguerIcon().click()
  }

  isDisplayed_HambMenu() {
    cy.log('isDisplayed_HambMenu')
    // this.elements.hamburguerIcon().then(cy.log('PRESENTE'))


    // try{
    //   this.elements.hamburguerIcon().should('be.visible')
    //   return true
    // }catch(ex){
    //   return false
    // } 

    return this.elements.hamburguerIcon().should('be.visible');
    //expect(this.elements.hamburguerIcon).to.be.visible
  }
}

export default homeSauceLoginPage