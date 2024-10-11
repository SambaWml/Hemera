
describe('Recuperar senha', () => {
    beforeEach(() => {
    });

    it('Recuperar senha', () => {

        cy.verificaçãoeredirecionamento();
        cy.contains('Sign in to your account').should('be.visible');
        cy.contains('Forgot Password?').click();

        cy.contains('Forgot Your Password?').should('be.visible');
        cy.get('#username').type('wesley.leocadio@gmail.com');
        cy.get('input[type="submit"][value="Submit"]').click();
        cy.screenshot('Recuperar senha');
    });
});