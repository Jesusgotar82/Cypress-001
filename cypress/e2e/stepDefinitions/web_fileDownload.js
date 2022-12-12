import {
    Given,
    When,
    And,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
//const fs = require('fs');

Given("I proceed to download the image file from the url {string}", (fileUrl) => {
    var todayDate = new Date().toISOString();
    var fileName = 'downloadImgExample-' + todayDate + '.jpg'
    cy.downloadFile(fileUrl, 'files', fileName).then(() => {
        cy.task("getImageText", { fileName: "files/" + fileName, lang: "eng", logger: false })
            .then((text) => {
                expect(text).to.contains("This is an example image")
            })
    })
});

Given("I proceed to download the pdf file from the url {string}", (fileUrl) => {
    var todayDate = new Date().toISOString();
    var fileName = 'downloadPdfDummyExample-' + todayDate + '.pdf'
    cy.downloadFile(fileUrl, 'files', fileName).then(() => {
        cy.task("getPDFText", { pdfFile: "files/" + fileName, maxPages: 1 })
            .then((text) => {
                expect(text).to.contains("This is a small demonstration .pdf file")
            })
    })
});

Given("I proceed to download a pdf file from url {string} whith teh filename {string}", (fileUrl, fileName) => {
    cy.downloadFile(fileUrl, 'files', fileName)
});

Then("the file {string} exists and contains the text {string}", (fileName, fileText) => {
    //cy.log(fileName.includes('.pdf'))

    if (fileName.includes('.pdf')) {
        cy.task("getPDFText", { pdfFile: "files/" + fileName, maxPages: 1 })
            .then((text) => {
                expect(text).to.contains(fileText)
            })
    }else{
        cy.task("getImageText", { fileName: "files/" + fileName, lang: "eng", logger: false })
            .then((text) => {
                expect(text).to.contains(fileText)
            })
    }
});