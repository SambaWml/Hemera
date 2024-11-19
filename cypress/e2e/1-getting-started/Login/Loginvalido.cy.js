// Scenario: Login com Credenciais Válidas
// Given que eu estou na tela de login do Keycloak
// When eu insiro um "Username or email" válido e uma "Password" válida
// And eu clico no botão "Sign in"
// Then eu sou autenticado com sucesso e redirecionado para a página principal de "https://hemera.oke.luby.me/"

describe('Login', () => {
  beforeEach(() => {
      cy.verificaçãoERedirecionamento(); // Acessa a página inicial
  });

  it('Deve realizar login com credenciais válidas', () => {
      // Preencher o nome de usuário e senha
      cy.get('#username').type('lubyqa');
      cy.get('#password').type('12345');
      
      // Clicar no botão de login
      cy.get('#kc-login').click();

      // Verificar se foi redirecionado corretamente e se o nome do usuário aparece na página principal
      cy.get('#radix-\\:Rqfcq\\: > .text-gray-dark')
        .should('be.visible'); // Ajuste o seletor se necessário, ele depende da estrutura da página.

      // Tirar um screenshot da tela de login bem-sucedido
      cy.screenshot('LoginValido');
  });
});
