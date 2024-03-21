/// <reference types="cypress" />

Cypress.Commands.add('SelectItem', (itemDescription) => {
    //Click on the locator and type the description received by parameter
    cy.get('#twotabsearchtextbox').click().type(itemDescription)
    //click to search for the item
    cy.get('#nav-search-submit-button').click()
    //Get the items` price and return to be used later on assertions
    cy.get('.sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > [data-action="puis-card-container-declarative"] > .puis-card-container > .a-spacing-base > .a-spacing-small > [data-cy="title-recipe"] > .a-spacing-none > .a-link-normal > .a-size-base-plus').first().click()
    return cy.get('#corePrice_feature_div > [data-csa-c-type="widget"] > .a-section > .a-price.aok-align-center > [aria-hidden="true"]').invoke('text').then(text => {
        return text.replace("$", "")
    })
})

Cypress.Commands.add('AddToCart', () => {
    //command created to avoid repeating the same piece of code for every item
    //this command click on the `Add to cart` button
    cy.get('.a-button-inner > #add-to-cart-button').click()
    cy.get('.a-size-medium-plus').should('contain', 'Added to Cart')
})