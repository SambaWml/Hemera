const dados = require('../fixtures/dados');
const numeroNC = 'Um milhão e do12iiss';

/**
 * Preenche os campos do cabeçalho de uma NC.
 */
Cypress.Commands.add('validacaoEmDigitacao', () => {
    const selectors = {
        investidor: 'input[data-test="header.cnpjSearchInvestor-input"]',
        cnpj: 'input[data-test="header.cnpjSearchIssuer-input"]',
        dataEmissao: 'input[data-test="header.issueDate-input"]',
        dataVencimento: 'input[data-test="header.expireDate-input"]',
    };
    cy.intercept(
        'GET',
        'https://hemera.backend.oke.luby.me/api/v1/zheus/investidores*'
    ).as('LoadInvestor');
    cy.get(selectors.investidor).type(dados.investidor);
    cy.wait('@LoadInvestor').its('response.statusCode').should('eq', 200);
    cy.intercept(
        'GET',
        'https://hemera.backend.oke.luby.me/api/v1/zheus/emissores*'
    ).as('LoadEmitter');
    cy.get(selectors.cnpj).type(dados.emissor, { force: true });
    cy.wait('@LoadEmitter').its('response.statusCode').should('eq', 200);
    cy.get(selectors.dataEmissao).type(dados.dataEmissao);
    cy.get(selectors.dataVencimento).type(dados.dataVencimento);
    
    
    cy.get('input[data-test="header.commercialNoteNumber-input"]').type(numeroNC);
    cy.get('input[data-test="header.commercialNoteSeries-input"]').type(dados.serieNc);

    cy.contains('Modelo de NC').click();
    cy.get('div[data-radix-select-viewport]')
        .find('span[id^="radix-"]')
        .contains(dados.nomeDaNota)
        .click();

    cy.get('[data-test="header.description-input"]').type(dados.descricaoNC);
    cy.get('[data-test="header.totalValue-input"]').type(dados.valorTotal);
    cy.get('[data-test="header.unitValue-input"]').type(dados.valorUnitario);
    //cy.get(':nth-child(7) > :nth-child(3) > .gap-2').type(dados.quantidade);

    cy.contains('Adicionar Conta').click();
    cy.contains('Banco').should('exist');
    cy.get('button[id="BANCO DO BRASIL "]').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 

    cy.get('[data-test="header.feesPreFixed-input"]').type(dados.jurosPre);
    cy.get('[data-test="header.feesPostFixed-input"]').type(dados.jurosPos);
    cy.get('button[role="combobox"]').contains('Indexador').click({ force: true });
    cy.get('div[data-radix-select-viewport]').should('be.visible');
    cy.get('div[data-radix-select-viewport]')
      .contains('Pré e pós')
      .click();

    cy.contains('Salvar Rascunho').click();
    cy.wait(5000);
    cy.contains('Sucesso')
        .should('be.visible')
        .and('have.text', 'Sucesso', 'Mensagem de sucesso deve estar visível');

    cy.get('[href="/commercial-note/consult"] > .truncate').click();

    cy.get('tr.border-b').as('ncRow');
    cy.get('@ncRow')
        .find('td a.text-primary')
        .should('contain.text', numeroNC);
});

Cypress.Commands.add('marcarNCParaRevisao', () => {
    cy.get('[data-testid="approve-link"]').click();
    
    cy.get('tr').first()
        .find('button')
        .contains('Reprovar')
        .click();

    cy.url().should('include', '/commercial-note/consult');
});




