function numeroPorExtenso(numero) {
  const numerosncExtenso = [
    'Primeira NC',
    'Segunda NC',
    'Terceira NC',
    'Quarta NC',
    'Quinta NC',
    'Sexta NC',
    'Sétima NC',
    'Oitava NC',
    'Nona NC',
    'Décima NC'

  ];

  // Retorna o correspondente por extenso ou uma string padrão se o número for maior que a lista
  return numerosncExtenso[numero - 1] || `${numero}ª NC`;
}




Cypress.Commands.add('login', () => { //Criar parametro para user e senha colocar dentro () antes de =>
    let userName = 'wesley.leocadio@gmail.com.br';
    let password = 'LubyLuby66**';

    cy.visit('https://hemera.oke.luby.me/'); // Substitua pelo URL desejado  
    cy.get('button') // Ajuste o seletor se necessário
      .contains('Fazer login com Keycloak')
      .should('be.visible');
    cy.contains('Fazer login com Keycloak').click()
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();

    cy.contains('Nome: Wesley Leocadio').should('be.visible'); // Verifica se o nome aparece
    cy.screenshot('LoginValido'); // Captura a tela após o login    
    
});

Cyprees.Commands.add('visualizarTelaDeCadastroNC', () => {

      cy.get('ID OU CONTAINS').click(); //Isso vai fazer com que seja rediracionado para tela cadastro de NC 
      cy.contains('Dados da NC').should('be.visible'); // Verifica se estamos na tela correta

});

Cyprees.Commands.add('preencherCabeçalho', () => {
      const numeroNC = numerosncExtenso(numero);

      let investidor = "Anderson"; //nome figurativo
      let emissor = "Lucas"; //nome figurativo
      let dataEmissão = '03/11/2024'; //alterar a data
      let dataVencimento = '03/01/2024'; //alterar a data
      let serieNc = '3546';

      //Preencher investidor
      cy.get('ID ou Contains').click();
      cy.get('id ou contains')
        .type(investidor)
        .contains(investidor) //verificar se vai ser o contains ou id
        .click();

      //Preencher Emissor
      cy.get('ID ou Contains').click();
      cy.get('id ou contains')
        .type(emissor)
        .contains(emissor) //verificar se vai ser o contains ou id
        .click();

      //Preencher Data de Emissão
      cy.get('id ou contains')
        .click()
        .type(dataEmissão)

      //Preencher data de Vencimento
      cy.get('id ou contains')
        .click()
        .type(dataVencimento)

      //Preencher número da NC
      cy.get('id ou contains')
        .click()
        .type(numeroNC)

      //Preencher série da NC
      cy.get('id ou contains')
      .click()
      .type(serieNc)

      //Escolher Modelo NC
      cy.get('ID ou Contains').click();
      cy.get('id ou contains')
        .contains('nome do modelo') //verificar se vai ser o contains ou id
        .click();







        


});