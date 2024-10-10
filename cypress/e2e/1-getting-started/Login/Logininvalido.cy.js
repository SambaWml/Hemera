// Scenario: Login com Credenciais Inválidas
// Given que eu estou na tela de login do Keycloak
// When eu insiro um "Username or email" válido e uma "Password" inválida
// And eu clico no botão "Sign in"
// Then eu vejo uma mensagem de erro informando que as credenciais estão incorretas


describe('Login', () => {
  beforeEach(() => {
      cy.visit('hemera.oke.luby.me'); // Acesse a página de login
  });

  it('Deve realizar login com credenciais válidas', () => {
      cy.verificaçãoeredirecionamento();
      cy.get('#username').type('.leocadio@luby.com.br');
      cy.get('#password').type('LbLuby66**');
      cy.get('#kc-login').click();

      cy.contains('Invalid username or password.').should('be.visible'); // Verifica se o erro aparece
      cy.screenshot('LoginInvalido'); // Captura a tela após o login
  });
});