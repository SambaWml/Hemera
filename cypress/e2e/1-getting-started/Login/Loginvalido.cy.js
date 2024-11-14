
// Scenario: Login com Credenciais Válidas
// Given que eu estou na tela de login do Keycloak
// When eu insiro um "Username or email" válido e uma "Password" válida
// And eu clico no botão "Sign in"
// Then eu sou autenticado com sucesso e redirecionado para a página principal de "https://hemera.oke.luby.me/"




describe('Login', () => {
    beforeEach(() => {
    });

    it('Deve realizar login com credenciais válidas', () => {
        cy.verificaçãoeredirecionamento();
        cy.get('#username').type('lubyqa');
        cy.get('#password').type('12345');
        cy.get('#kc-login').click();

        cy.get('#radix-\\:Rqfcq\\: > .text-gray-dark')
          .should('be.visible'); // Verifica se o nome aparece
        cy.screenshot('LoginValido'); // Captura a tela após o login
    });
});