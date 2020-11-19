describe('Login', () => {

    it('Log in and out', () => {
        cy.login()
        cy.location('pathname').should('eq', '/collection');
        cy.get('.logout').should('exist');
        cy.get('.logout').click();
        cy.location('pathname').should('eq', '/login');
    });
});
