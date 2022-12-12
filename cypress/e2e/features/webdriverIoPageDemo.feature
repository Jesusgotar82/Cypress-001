@full
Feature: Saucedemo login Feature

    Scenario Outline: Successful login on device: <Description>
        Given A user opens a webdriverio website in <Device>
        And A user clicks on the api button
        Then the url will contains the api subdirectory
        Examples:
            | Description               | Device        |
            | "macbook-13"              | macbook-13    |
            | "iphone-6"                | iphone-x      |
            | "samsung-s10"             | samsung-s10   |
            | "samsung-note9"           | samsung-note9 |