Cypress.Commands.add('verificaçãoERedirecionamento', () => {
  // Acessa a URL 
  cy.visit('https://hemera.oke.luby.me/'); 
  
  // Verifica a visibilidade do botão "Fazer login com Keycloak"
  cy.get('button') 
    .contains('Fazer login com Keycloak')
    .should('be.visible');
  
  // Clica no botão e verifica o redirecionamento
  cy.contains('Fazer login com Keycloak').click();
  cy.url().should('include', 'keycloak'); // Verifica se a URL contém "keycloak"
});
