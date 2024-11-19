// Scenario: Login com Credenciais Inválidas
// Given que eu estou na tela de login do Keycloak
// When eu insiro um "Username or email" válido e uma "Password" inválida
// And eu clico no botão "Sign in"
// Then eu vejo uma mensagem de erro informando que as credenciais estão incorretas

describe('Login', () => {

  beforeEach(() => {
      cy.verificaçãoERedirecionamento(); // Acessa a página inicial antes de cada teste
  });

  it('Deve exibir mensagem de erro com credenciais inválidas', () => {
      // Preencher o nome de usuário válido e uma senha inválida
      cy.get('#username').type('.leocadio@luby.com.br');
      cy.get('#password').type('LbLuby66**'); // Senha inválida
      cy.get('#kc-login').click();

      // Verificar se a mensagem de erro "Invalid username or password." aparece
      cy.contains('Invalid username or password.').should('be.visible');

      // Capturar screenshot da tela de erro
      cy.screenshot('LoginInvalido');
  });
});
