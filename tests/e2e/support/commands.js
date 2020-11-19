
Cypress.Commands.add("login", () => {
    const email = 'test@user.com';
    const password = 'worstpass';

    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#submit').click();
})

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
