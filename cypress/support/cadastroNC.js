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

  cy.contains('Modelo de NC').click();
  cy.get('div[data-radix-select-viewport]')
    .find('span[id^="radix-"]')
    .contains(dados.nomeDaNota)
    .click();

  cy.get('[data-test="header.description-input"]').type(dados.descricaoNC, { force: true });

  cy.get('[data-test="header.totalValue-input"]').type(dados.valorTotal, { force: true });
  cy.get('[data-test="header.unitValue-input"]').type(dados.valorUnitario, { force: true });
  cy.get('[data-test="header.quantity-input"]').type(dados.quantidade, { force: true });

  cy.get('[data-test="header.feesPreFixed-input"]').type(dados.jurosPre, { force: true });
  cy.get('[data-test="header.feesPostFixed-input"]').type(dados.jurosPos, { force: true });
  cy.get('button[role="combobox"]').contains('Indexador').click({ force: true });
  cy.get('div[data-radix-select-viewport]').should('be.visible');
  cy.get('div[data-radix-select-viewport]')
    .contains('Pré e pós')
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
  cy.get('input[type="file"]').attachFile('parcelas_amortizacao.csv');
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
    cy.get('input[type="file"]').attachFile(
    'garantias.csv',
    { force: true }
  );
  cy.contains('garantias.csv').should('be.visible');
  cy.get('.slate-selectable > .relative').type(
    'Garantia ID,Descrição,Valor,Tipo,Data de Vencimento',
    { force: true }
  );
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
  cy.contains('RUBIA DA SILVA KRUGER').should('be.visible');
});

/**
 * Comando para adicionar um cônjuge anuente.
 */
Cypress.Commands.add('adicionarConjuge', () => {
  cy.contains('Adicionar Cônjuge').click();
  cy.get('button.peer').eq(1).click();
  cy.get('.flex-col-reverse> :nth-child(2)').click();
  cy.contains('SIDNEI MARCIANO').should('be.visible');
});

/**
 * Comando para enviar a NC para aprovação.
 */
Cypress.Commands.add('enviarAprovacao', () => {
  cy.intercept(
    'PUT',
    'https://hemera.backend.oke.luby.me/api/v1/NotasComerciais/**/GarantiasFidejussorias'
  ).as('UpdateGuarantees');

  cy.contains('Enviar para aprovação').click();

  cy.wait('@UpdateGuarantees').its('response.statusCode').should('eq', 200);
  cy.contains('Sucesso').should('be.visible');
});
