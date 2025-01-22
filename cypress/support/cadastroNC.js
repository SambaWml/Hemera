import 'cypress-file-upload';

const dados = require('../fixtures/dados');

/**
 * Comando para realizar login.
 */
Cypress.Commands.add(
  'login',
  (userName = 'lubyqa', password = '12345') => {
    cy.get('#username').type(userName, { force: true });
    cy.get('#password').type(password, { force: true });
    cy.get('#kc-login').click();
    cy.contains('Modelo de Nota Comercial').should('be.visible');
  }
);

/**
 * Comando para acessar a tela de Cadastro de NC.
 */
Cypress.Commands.add('visualizarTelaDeCadastroNC', () => {
  cy.get('[href="/commercial-note/register"] > .truncate').click();
  cy.contains('Cadastro NC').should('be.visible');
});

/**
 * Preenche os campos do cabeçalho de uma NC.
 */
Cypress.Commands.add('preencherCabecalho', () => {
  cy.intercept(
    'GET',
    'https://hemera.backend.oke.luby.me/api/v1/zheus/investidores*'
  ).as('LoadInvestor');
  cy.get('[data-test="header.cnpjSearchInvestor-input"]').type(
    dados.investidor,
    { force: true }
  );
  cy.wait('@LoadInvestor').its('response.statusCode').should('eq', 200);

  cy.intercept(
    'GET',
    'https://hemera.backend.oke.luby.me/api/v1/zheus/emissores*'
  ).as('LoadEmitter');
  cy.get('[data-test="header.cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
  cy.wait('@LoadEmitter').its('response.statusCode').should('eq', 200);

  cy.get('[data-test="header.issueDate-input"]').type(dados.dataEmissao, { force: true });
  cy.get('[data-test="header.expireDate-input"]').type(dados.dataVencimento, { force: true });

  cy.get('[data-test="header.commercialNoteNumber-input"]').type(
    dados.numeroNC,
    { force: true }
  );
  cy.get('[data-test="header.commercialNoteSeries-input"]').type(
    dados.serieNc,
    { force: true }
  );

  cy.contains('button', 'Modelo de NC').click({ force: true });

  cy.get('div[data-radix-select-viewport]')
    .find('span[id^="radix-"]')
    .contains(dados.nomeDaNota)
    .click();

  cy.get('[data-test="header.description-input"]').type(dados.descricaoNC, { force: true });

  cy.get('[data-test="header.totalValue-input"]').type(dados.valorTotal, { force: true });
  cy.get('[data-test="header.unitValue-input"]').type(dados.valorUnitario, { force: true });

  cy.get('[data-test="header.feesPreFixed-input"]').type(dados.jurosPre, { force: true });
  cy.get('[data-test="header.feesPostFixed-input"]').type(dados.jurosPos, { force: true });
  cy.get('button[role="combobox"]').contains('Indexador').click({ force: true });
  cy.get('div[data-radix-select-viewport]').should('be.visible');
  cy.get('div[data-radix-select-viewport]')
    .contains('CDI')
    .click();


  cy.intercept(
    'GET',
    'https://hemera.backend.oke.luby.me/api/v1/zheus/dados-bancarios*'
  ).as('LoadBankData');
  cy.contains('Adicionar Conta').click();
  cy.wait('@LoadBankData').its('response.statusCode').should('eq', 200);

  cy.contains('Banco').should('exist');
  cy.get('button[id="BANCO DO BRASIL "]').click();
  cy.get('.flex.flex-col-reverse > button.bg-primary').click();
  cy.contains('BANCO DO BRASIL ').should('be.visible'); //Banco
  cy.contains('1234').should('be.visible'); //Agência
  cy.contains('123456').should('be.visible'); //Conta  

  cy.intercept(
    'POST',
    'https://hemera.backend.oke.luby.me/api/v1/NotasComerciais*'
  ).as('CreateCommercialNote');

  cy.contains('Próximo').click();

  cy.wait('@CreateCommercialNote').its('response.statusCode').should('eq', 200);

});

/**
 * Preenche as obrigações de uma NC.
 */
Cypress.Commands.add('preencherObrigacoes', () => {
  cy.contains('Resgate Antecipado:').should('be.visible');
  cy.contains('Do atraso no pagamento e encargos moratórios:').should(
    'be.visible'
  );

  cy.get('[data-test="obligations.redeemWithPreemptiveRights"]').click(); //checkbox 1
  cy.get('[data-test="obligations.redeemWithPayment"]').click();//checkbox 2

  cy.get('[data-test="obligations.lateInterestRate-input"]').type(
    dados.taxa01,
    { force: true }
  );
  cy.get('[data-test="obligations.contractualFine-input"]').type(
    dados.taxa02,
    { force: true }
  );
  cy.get('[data-test="obligations.proceduralCostRate-input"]').type(
    dados.taxa03,
    { force: true }
  );

  cy.intercept(
    'PUT',
    'https://hemera.backend.oke.luby.me/api/v1/NotasComerciais/**/Obrigacoes'
  ).as('UpdateObligations');
  cy.contains('Próximo').click();
  cy.wait('@UpdateObligations').its('response.statusCode').should('eq', 200);
});

/**
 * Comando para simular o envio de um fluxo de pagamento válido.
 */
Cypress.Commands.add('enviarPagamentoValido', () => {
  cy.intercept(
    'POST',
    'https://hemera.backend.oke.luby.me/api/v1/fileupload*'
  ).as('UploadFile');
  cy.get('input[type="file"]').attachFile('Modelopagamentopreenchido.CSV');
  cy.contains('Sucesso').should('be.visible');

  cy.intercept(
    'PUT',
    'https://hemera.backend.oke.luby.me/api/v1/NotasComerciais/**/FluxosPagamentos'
  ).as('UpdatePaymentFlow');
  cy.contains('Próximo').click();
  cy.wait('@UploadFile').its('response.statusCode').should('eq', 200);
  cy.wait('@UpdatePaymentFlow').its('response.statusCode').should('eq', 200);
});

/**
 * Comando para simular o envio de um Contrato válido.
 */
Cypress.Commands.add('enviarContratoValido', () => {
  cy.get('input[data-test="real-guarantee-files-input"]').attachFile(
    'garantias.csv',
    { force: true }
  );
  cy.contains('garantias.csv').should('be.visible');
  cy.wait(1000);

  //cy.get('#scroll_container [data-slate-editor="true"]').contains(
  //'Em garantia do fiel, pontual, cabal e pronto cumprimento das obrigações de pagamento, principais ou acessórias, presentes ou futuras, decorrentes das Notas Comerciais, as Notas Comerciais serão garantidas, ainda, por:\n\n' +
    //'Cessão fiduciária de recebíveis de 20,00% a do saldo devedor em direitos creditórios, presentes e futuros advindos da atividade empresarial da Emissora e das coligadas, devidamente discriminadas no INSTRUMENTO PARTICULAR DE CESSÃO FIDUCIÁRIA DE RECEBIVEIS EM GARANTIA DE NOTA COMERCIAL, em caráter irrevogável e irretratável, em favor do titular (Contrato de Cessão Fiduciária" e "Garantia Real", respectivamente).\n\n' +
    //'O Contrato de xxxxxx-xx deverá ser levado a registro, nos termos e prazos previstos no respectivo contrato, às expensas da Emissora.\n\n' +
    //'A Emissora, neste ato, compromete-se a enviar ao Titular o comprovante de registro do Contrato de Cessão Fiduciária no(s) Cartório(s) de Registro de Títulos e Documentos competente(s), cujo Contrato de xxxxxx-xx será registrado, em até x (extenso) dias contados da data de celebrado do respectivo instrumento.\n\n' +
    //'Fica certo e ajustado o caráter não excludente, mas, se e quando aplicável, cumulativo entre si, da Garantia Real, nos termos deste Termo Constitutivo e do Contrato de xxxxxx-xx, podendo o Titular executar ou excutir todas ou cada uma delas indiscriminadamente, em qualquer ordem, para os fins de amortizar ou quitar com as obrigações decorrentes do presente Termo Constitutivo e/ou do Contrato de xxxxxx-xx.'
  //);
  cy.contains('Fidejussórias').click();
});

/**
 * Comando para adicionar um avalista.
 */
Cypress.Commands.add('adicionarAvalista', () => {
  cy.contains('Adicionar Avalista').should('be.visible');
  cy.contains('Adicionar Avalista').click();
  cy.get('button.peer').eq(1).click();
  cy.get('.flex-col-reverse> :nth-child(2)').click();
  cy.contains('SIDNEI MARCIANO').should('be.visible');
});

/**
 * Comando para adicionar um cônjuge anuente.
 */
Cypress.Commands.add('adicionarConjuge', () => {

  cy.contains('Adicionar Cônjuge').click();
  cy.get('button.peer').eq(1).click();
  cy.get('.flex-col-reverse> :nth-child(2)').click();
  cy.contains('RUBIA DA SILVA KRUGE').should('be.visible');
  cy.wait(5000);

  
});

/**
 * Comando para enviar a NC para aprovação.
 */
Cypress.Commands.add('enviarAprovacao', () => {


  cy.contains('Enviar para aprovação').click();


  cy.contains('Sucesso').should('be.visible');
});
