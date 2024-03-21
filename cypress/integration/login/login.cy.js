/// <reference types="cypress" />

describe('Login', () => {

    beforeEach(() => {
        // before each test case access the Amazon URL and click on the element to perform the login
        cy.visit('/')
        cy.get('#nav-link-accountList-nav-line-1').click()
    })

    it('Successful login', () => {
        //type the email according to the env variable configures on cypress.env.json and click to continue
        cy.get('#ap_email').type(Cypress.env('userEmail'))
        cy.get('.a-button-inner > #continue').click()
        //type the password according to the env variable configures on cypress.env.json and click to continue
        cy.get('#ap_password').type(Cypress.env('userPassword'))
        cy.get('#signInSubmit').click()
        //Verify if the user`s name is displayed
        cy.get('#nav-link-accountList-nav-line-1').should('have.text', 'Hello, Automation')
        //Peform the logout
        cy.get('#nav-link-accountList > .nav-line-2').trigger('mouseover')
        cy.get('#nav-item-signout > .nav-text').click()
        //When the logout is completed the `Sign in` must be displayed
        cy.get('.a-padding-extra-large > .a-spacing-small').should('contain', 'Sign in')

    })

    it('Invalid email address', () => {
        //type and inexisting email and click to continue
        cy.get('#ap_email').type('automationinvalid@gmail.com')
        cy.get('.a-button-inner > #continue').click()
        //Verify if the text displayed informs the email is invalid and do not proceed with login
        cy.get('.a-alert-content > .a-unordered-list > li > .a-list-item').should('contain.text', 'We cannot find an account with that email address')
    })

    it('Invalid password', () => {
        //type an email and click to continue
        cy.get('#ap_email').type(Cypress.env('invalidPasswordEmail'))
        cy.get('.a-button-inner > #continue').click()
        //type the incorrect password and continue
        cy.get('#ap_password').type('wrong')
        cy.get('#signInSubmit').click()
        //a message must be displayed informing the password is incorrect
        cy.get('.a-list-item').should('contain', 'Your password is incorrect')
    })
})