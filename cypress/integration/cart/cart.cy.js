/// <reference types="cypress" />

describe('Cart', () => {

    let products = [];

    beforeEach(() => {
        //Clear session from the browser
        Cypress.session.clearAllSavedSessions()
        //Open Amazon URL and perform the login with email and password configured on cypress.env.json
        cy.visit('/')
        cy.get('#nav-link-accountList-nav-line-1').click()
        cy.get('#ap_email').type(Cypress.env('userEmail'))
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type(Cypress.env('userPassword'))
        cy.get('#signInSubmit').click()
    })

    it('Add items in the cart', () => {
        //Locate and item by it`s description using a method created on the file cypress/support/commands.js
        cy.SelectItem('Duracell Coppertop AAA Batteries 24 Count Pack').then(text => {
            //Receive the price from the method and saves it on the array to use later on assertions
            products.push({ productDescription: 'Duracell Coppertop AAA Batteries', price: parseFloat(text) })
            cy.AddToCart()
            //Add a second item
            cy.SelectItem('Amazon basics block white eraser').then(text => {
                products.push({ productDescription: 'Amazon Basics Block White Eraser', price: parseFloat(text) })
                cy.AddToCart()
                //Add a third item
                cy.SelectItem('zipti monster pencil case').then(text => {
                    products.push({ productDescription: 'ZIPIT Monster Pencil Case', price: parseFloat(text) })
                    cy.AddToCart()
                    //Open the cart
                    cy.get('#nav-cart-count-container').click()
                    //Verify if the total value from the cart is the same as the sum of the 3 product`s price
                    cy.get('#sc-subtotal-amount-buybox > .a-size-medium').invoke('text').should("eq", "$" + parseFloat(products[0].price + products[1].price + products[2].price).toFixed(2))
                    //verify the amount of items in the cart
                    cy.get('#sc-subtotal-label-buybox').should("contain", "Subtotal (3 items)")
                    //for each product verify the description and price to see if it matches with what was selected before
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-product-title-cont > .a-list-item > .a-link-normal > .a-color-base > .a-truncate > .a-truncate-cut').first().should("contain", products[2].productDescription)
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-price-block > .sc-badge-price > .sc-badge-price-to-pay > .a-section > .a-size-medium').first().should("contain", "$" + products[2].price)
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-product-title-cont > .a-list-item > .a-link-normal > .a-color-base > .a-truncate > .a-truncate-cut').eq(1).should("contain", products[1].productDescription)
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-price-block > .sc-badge-price > .sc-badge-price-to-pay > .a-section > .a-size-medium').eq(1).should("contain", products[1].price)
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-product-title-cont > .a-list-item > .a-link-normal > .a-color-base > .a-truncate > .a-truncate-cut').eq(2).should("contain", products[0].productDescription)
                    cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .a-unordered-list > .sc-item-price-block > .sc-badge-price > .sc-badge-price-to-pay > .a-section > .a-size-medium').eq(2).should("contain", products[0].price)
                })
            })
        })
    })

    it('Delete item from the cart', () => {
        //Open the cart
        cy.get('#nav-cart-count-container').click()
        //Delete the last added item
        cy.get('.sc-list-item-content > .a-grid-vertical-align > :nth-child(3) > .sc-action-links > .sc-action-delete > .a-declarative > .a-color-link').first().click()
        //Verify if the total value of the cart was updated
        cy.get('#sc-subtotal-amount-buybox > .a-size-medium').invoke('text').should("eq", "$" + (products[0].price + products[1].price))
        //Verify if it is displayed a message regarding the item removed
        cy.get('.sc-list-item-removed-msg > [data-action="delete"] > .a-size-base').first().should("contain", 'was removed from Shopping Cart')
    })



})