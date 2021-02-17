describe('Login', () => {

    it('Log in and out', () => {
        cy.login(email, password)
        cy.location('pathname').should('eq', '/collection');
        cy.get('.logout').should('exist');
        cy.get('.logout').click();
        cy.location('pathname').should('eq', '/login');
    });

    it('Throw error when wrong email or password', () => {
        cy.login(email, wrongPassword)
        cy.get('#credentials-error').contains('Wrong username or password');
    });
});

const email = 'test@user.com';
const password = 'worstpass';
const wrongPassword = '12345'