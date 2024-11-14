import 'cypress-file-upload';


Cypress.Commands.add('cancelarEmissao', () => {


cy.contains('Cancelar Emissão')
  .should('be.visible');
cy.get('id/contains')
  .click();

cy.contains('Você tem certeza de que deseja cancelar a emissão da Nota Comercial?')
  .should('be.visible')

cy.get('id/contains')
  .click();

})


Cypress.Commands.add('login', () => { //Criar parametro para user e senha colocar dentro () antes de =>
    let userName = 'lubyqa';
    let password = '12345';

    cy.visit('https://hemera.oke.luby.me/'); // URL 
    cy.get('button') // Ajuste o seletor se necessário
      .contains('Fazer login com Keycloak')
      .should('be.visible');
    cy.wait(4000);
    cy.contains('Fazer login com Keycloak').click()
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.wait(2000);
    cy.screenshot('LoginValido'); // Captura a tela após o login    
    
});

Cypress.Commands.add('visualizarTelaDeCadastroNC', () => {

      cy.get('[href="/commercial-note/register"] > .truncate').click(); //Isso vai fazer com que seja rediracionado para tela cadastro de NC 
      cy.contains('Cadastro NC').should('be.visible'); // Verifica se estamos na tela correta
      cy.wait(2000);


});

Cypress.Commands.add('preencherCabecalho', () => {    
      let investidor = "12.254.372/0001-23"; //cnpj figurativo
      let emissor = "02.033.625/0001-85"; //cnpj figurativo
      let dataEmissão = '14112024';
      let dataEmissaoFormatada = dataEmissão.slice(4, 8) + '-' + dataEmissão.slice(2, 4) + '-' + dataEmissão.slice(0, 2);
      let dataVencimento = '03012025'; //alterar a data
      let dataVencimentoFormatada = dataVencimento.slice(4, 8) + '-' + dataVencimento.slice(2, 4) + '-' + dataVencimento.slice(0, 2);
      let serieNc = '3546'; // Alterar conforme os testes
      let numeroNC = 'Primeira' // numero da nota
      let descricaoNC = 'Primeira nota NC';
      let valorTotal = '500.000';  //olhar o faker
      let valorUnitario = '50.000';
      let quantidade = '';
      let jurosPre = '10%';
      let jurosPos = '15%';

      //Preencher investidor
      cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2')
        .type(investidor)

      //Preencher Emissor
      cy.wait(4000)
      cy.get('input[data-test="cnpjSearchIssuer-input"]').type(emissor, { force: true });
        

      //Preencher Data de Emissão * talvez seja um calendario
      cy.get('[data-test="issueDate-input"]').type(dataEmissaoFormatada);

      //Preencher data de Vencimento * talvez seja um calendario
      cy.get('[data-test="expireDate-input"]').type(dataVencimentoFormatada);

      //Preencher número da NC
      cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2 > .relative > .absolute')
        .type(numeroNC)

      //Preencher série da NC
      cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2')
        .type(serieNc)

      //Escolher Modelo NC
      cy.get('ID ou Contains').click();
      cy.get('id ou contains')  //verificar se vai ser o contains ou id * talvez não tenha esse campo
        .contains('nome do modelo') 
        .click();

//Preencher a Descrição
//cy.get('ID ou Contains')
 // .type(descricaoNC);

//Preencher valor total da nota
//cy.get ('ID ou Contains')
  //.type(valorTotal);

//Preencher valor untário
//cy.get('id ou contains')
  //.type(valorUnitario);

//Preencher quantidade
//cy.get('id ou contains')
  //.type(quantidade);
  
//Preencher pré-fixado
//cy.get('id ou contains')
  //.type(jurosPre);

//Preencher pós-fixado
//cy.get('id ou contains')
 // .type(jurosPos);

//print dos dados preenchidos
//cy.screenshot('cabeçalhoPreenchido')

//Avançar para próxima tela
//cy.get('id ou contains')
 // .click()

//Validar se está na aba de Obrigações
//cy.contains('Investidor externo').should(be.visible);
//cy.screenshot('Avanço para aba obrigações');
      

});

Cypress.Commands.add('preencherObrigacoes', () => {

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

      cy.get('ID').type(taxa01); //Preencher os campos da taxas

      cy.get('ID').type(taxa02); //Preencher os campos da taxas

      cy.get('ID').type(taxa03); //Preencher os campos da taxas 

      cy.screenshot('obrigaçõesPreenchida'), // print da tela com tudo certo

      cy.get("id") // Navegar pra proxima tela
        .click();
      
      cy.contains('Upload do Fluxo') // Confirmar que está na tela Fluxo de Pagamento
        .should('be.visible');


});

Cypress.Commands.add('enviarPagamentoInvalido', () => {
  const fluxoPagamentoinvalido = 'parcelas_amortizacao.xlsx';


    // erro ao enviar o arquivo
  cy.get('id')
    .attachFile(fluxoPagamentoinvalido);

  cy.contains('mensagem de erro').should('be.visible');

  cy.screenshot('Erro ao enviar no formato errado');

});


Cypress.Commands.add('enviarPagamentovalido', () => {
    const fluxoPagamento = 'parcelas_amortizacao.csv';


    // sucesso ao enviar o arquivo
    cy.get('id')
      .attachFile(fluxoPagamento);

    cy.contains('mensagem de sucesso').should('be.visible');

    cy.screenshot('Sucesso ao enviar arquivo');

    cy.contains('Fidejussórias').click(); //Clicar em Fidejussórias

    cy.contains('Avalista').should('be.visible');
    cy.contains('Cônjuge Anuente').should('be.visible');

    cy.screenshot('abaFidejussórias')
});

// Validar Manual o Download e Exclusão do arquivo 

Cypress.Commands.add('adicionarAvalista', () => {
    let avalista = "Nome ou RG";


    //Adicionar Avalista
    cy.get('id')
      .click(); //Clicar no botão adicionar "AVALISTA"

    cy.contains('Adicionar Avalista')
      .should('be.visible');

    cy.get('id') //Buscar avalista
      .type(avalista);
    
    cy.get('id')
      .click(); //clicar no checkbox do avalista

    cy.get('Id')
      .click();  //Adicionar o avalista
    
    cy.contains(avalista) // Validar se o avalista foi adicionado com sucesso
      .should('be.visible');

  
})
    // Validar se vai precisar para o cônjuge

    Cypress.Commands.add('adicionarConjuge', () => {
      let conjuge = "Nome ou RG";
  
  
      //Adicionar Avalista
      cy.get('id')
        .click(); //Clicar no botão adicionar "AVALISTA"
  
      cy.contains('Adicionar Cônjuge Anuente')
        .should('be.visible');
  
      cy.get('id') //Buscar conjuge
        .type(conjuge);
      
      cy.get('id')
        .click(); //clicar no checkbox do conjuge
  
      cy.get('Id')
        .click();  //Adicionar o conjuge
      
      cy.contains(conjuge) // Validar se o conjuge foi adicionado com sucesso
        .should('be.visible');

    })


      Cypress.Commands.add('enviarAprovação', () => {


        //CONCLUIR ENVIO 

        cy.screenshot('garantiasconcluida')
        cy.get('id/contains').click();
        cy.screenshot('conclusãodoenvio')



      })