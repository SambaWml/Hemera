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

Cyprees.Commands.add('preencherCabecalho', () => {
      const numeroNC = numerosncExtenso(numero);     
      let investidor = "Anderson"; //nome figurativo
      let emissor = "Lucas"; //nome figurativo
      let dataEmissão = '03/11/2024'; //alterar a data
      let dataVencimento = '03/01/2024'; //alterar a data
      let serieNc = '3546'; // Alterar conforme os testes
      let descricaoNC = 'Primeira nota NC';
      let valorTotal = '500.000';  //olhar o faker
      let valorUnitario = '50.000';
      let quantidade = '';
      let jurosPre = '10%';
      let jurosPos = '15%';

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

      //Preencher Data de Emissão * talvez seja um calendario
      cy.get('id ou contains')
        .type(dataEmissão)

      //Preencher data de Vencimento * talvez seja um calendario
      cy.get('id ou contains')
        .type(dataVencimento)

      //Preencher número da NC
      cy.get('id ou contains')
        .type(numeroNC)

      //Preencher série da NC
      cy.get('id ou contains')
        .type(serieNc)

      //Escolher Modelo NC
      cy.get('ID ou Contains').click();
      cy.get('id ou contains')
        .contains('nome do modelo') //verificar se vai ser o contains ou id
        .click();

      //Preencher a Descrição
      cy.get('ID ou Contains')
        .type(descricaoNC);

      //Preencher valor total da nota
      cy.get ('ID ou Contains')
        .type(valorTotal);

      //Preencher valor untário
      cy.get('id ou contains')
        .type(valorUnitario);

      //Preencher quantidade
      cy.get('id ou contains')
        .type(quantidade);
        
      //Preencher pré-fixado
      cy.get('id ou contains')
        .type(jurosPre);

      //Preencher pós-fixado
      cy.get('id ou contains')
        .type(jurosPos);

      //print dos dados preenchidos
      cy.screenshot('cabeçalhoPreenchido')

      //Avançar para próxima tela
      cy.get('id ou contains')
        .click()

      //Validar se está na aba de Obrigações
      cy.contains('Investidor externo').should(be.visible);
      cy.screenshot('Avanço para aba obrigações')










});