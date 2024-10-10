//Scenario: Exibição do Botão "Fazer login com Keycloak"
//Given que eu acesso a URL "https://hemera.oke.luby.me/"
//When a página inicial é carregada
//Then eu vejo o botão "Fazer login com Keycloak" na tela

// Scenario: Redirecionamento para a Tela de Login do Keycloak
// Given que eu estou na página "https://hemera.oke.luby.me/"
// When eu clico no botão "Fazer login com Keycloak"
// Then eu sou redirecionado para a tela de login do Keycloak

Cypress.Commands.add('verificaçãoeredirecionamento', () => {
    cy.visit('https://hemera.oke.luby.me/'); // Substitua pelo URL desejado
    cy.get('button') // Ajuste o seletor se necessário
      .contains('Fazer login com Keycloak')
      .should('be.visible');
    cy.contains('Fazer login com Keycloak').click()
    
});


