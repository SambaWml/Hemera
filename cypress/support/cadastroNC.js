import 'cypress-file-upload';

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

    cy.visit('https://hemera.oke.luby.me/'); // URL 
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
      let investidor = "Lucas"; //nome figurativo
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
      cy.get('id ou contains')  //verificar se vai ser o contains ou id * talvez não tenha esse campo
        .contains('nome do modelo') 
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
      cy.screenshot('Avanço para aba obrigações');

});

Cyprees.Commands.add('preencherObrigacoes', () => {

      let taxa01 = "15%";
      let taxa02 = "20%";
      let taxa03 = "30%";


      cy.contains('Resgate Antecipado:').should(be.visible); // Validar se está na tela correta
      cy.contains('Do atraso no pagamento e encargos moratórios:').should(be.visible); // Validar se está na tela correta
      cy.screenshot('telaObrigações'); // Print da tela
      cy.get('id') // Clicar no CheckBox "A mercado, com Direito de Preferência e Direito de Equiparação de Oferta por parte da Emissora.""
        .click();

      cy.get('') // Clicar no CheckBox "Mediante o pagamento dos juros incorridos no respectivo período."
        .click();

      cy.type(taxa01); //Preencher os campos da taxas

      cy.type(taxa02); //Preencher os campos da taxas

      cy.type(taxa03); //Preencher os campos da taxas 

      cy.screenshot('obrigaçõesPreenchida'), // print da tela com tudo certo

      cy.get("id") // Navegar pra proxima tela
        .click();
      
      cy.contains('Upload do Fluxo') // Confirmar que está na tela Fluxo de Pagamento
        .should('be.visible');


});

Cyprees.Commands.add('enviarPagamentoInvalido', () => {
  const fluxoPagamentoinvalido = 'parcelas_amortizacao.xlsx';


    // erro ao enviar o arquivo
  cy.get('id')
    .attachFile(fluxoPagamentoinvalido);

  cy.contains('mensagem de erro').should('be.visible');

  cy.screenshot('Erro ao enviar no formato errado');

});


Cyprees.Commands.add('enviarPagamentovalido', () => {
    const fluxoPagamento = 'parcelas_amortizacao.csv';


    // sucesso ao enviar o arquivo
    cy.get('id')
      .attachFile(fluxoPagamento);

    cy.contains('mensagem de sucesso').should('be.visible');

    cy.screenshot('Sucesso ao enviar arquivo');

    cy.get('ID').click();
});

// Validar Manual o Download e Exclusão do arquivo 