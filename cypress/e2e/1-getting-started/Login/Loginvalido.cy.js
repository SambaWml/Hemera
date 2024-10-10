
// Scenario: Login com Credenciais Válidas
// Given que eu estou na tela de login do Keycloak
// When eu insiro um "Username or email" válido e uma "Password" válida
// And eu clico no botão "Sign in"
// Then eu sou autenticado com sucesso e redirecionado para a página principal de "https://hemera.oke.luby.me/"




describe('Login', () => {
    beforeEach(() => {
        cy.visit('hemera.oke.luby.me'); // Acesse a página de login
    });

    it('Deve realizar login com credenciais válidas', () => {
        cy.verificaçãoeredirecionamento();
        cy.get('#username').type('wesley.leocadio@luby.com.br');
        cy.get('#password').type('LubyLuby66**');
        cy.get('#kc-login').click();

        cy.contains('Nome: Wesley Leocadio').should('be.visible'); // Verifica se o nome aparece
        cy.screenshot('LoginValido'); // Captura a tela após o login
    });
});