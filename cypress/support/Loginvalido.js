Cypress.Commands.add('login', () => {
    cy.visit('https://hemera.oke.luby.me/'); // Substitua pelo URL desejado
    cy.get('button') // Ajuste o seletor se necessário
      .contains('Fazer login com Keycloak')
      .should('be.visible');
    cy.contains('Fazer login com Keycloak').click()
    cy.get('#username').type('wesley.leocadio@luby.com.br');
    cy.get('#password').type('LubyLuby66**');
    cy.get('#kc-login').click();

    cy.contains('Nome: Wesley Leocadio').should('be.visible'); // Verifica se o nome aparece
    cy.screenshot('LoginValido'); // Captura a tela após o login    
    
});