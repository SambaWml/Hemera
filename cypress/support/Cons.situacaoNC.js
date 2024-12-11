
const dados = require('../fixtures/dados');
let numeroNC = 'Um milhão e do12iis';


/**
 * Preenche os campos do cabeçalho de uma NC.
 */
Cypress.Commands.add('validacaoEmDigitacao', () => {
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(dados.investidor);
    cy.wait(5000);
    cy.get('input[data-test="header.cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
    cy.get('input[data-test="header.issueDate-input"]').type(dados.dataEmissao);
    cy.get('input[data-test="header.expireDate-input"]').type(dados.dataVencimento);
    
    
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2').type(numeroNC);
    cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2').type(dados.serieNc);

    cy.contains('Modelo de NC').click();
    cy.get('div[data-radix-select-viewport]')
        .find('span[id^="radix-"]')
        .contains(dados.nomeDaNota)
        .click();

    cy.get(':nth-child(6) > .gap-2').type(dados.descricaoNC);
    cy.get(':nth-child(7) > :nth-child(1) > .gap-2').type(dados.valorTotal);
    cy.get(':nth-child(7) > :nth-child(2) > .gap-2').type(dados.valorUnitario);
    cy.get(':nth-child(7) > :nth-child(3) > .gap-2').type(dados.quantidade);

    cy.contains('Adicionar Conta').click();
    cy.contains('Banco').should('exist');
    cy.get('button[id="BANCO DO BRASIL "]').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 

    cy.get(':nth-child(9) > .flex-row > :nth-child(1) > .gap-2').type(dados.jurosPre);
    cy.get(':nth-child(9) > .flex-row > :nth-child(2) > .gap-2').type(dados.jurosPos);

    cy.contains('Salvar Rascunho').click();
    cy.wait(5000);
    cy.contains('Sucesso').should('be.visible');


    cy.get('[href="/commercial-note/consult"] > .truncate').click();

    cy.get('tr.border-b') // Seleciona a linha da tabela
      .find('td a.text-primary') // Busca o link com o texto primário
      .should('contain.text', numeroNC); // Valida que o texto contém "Vinte e Dois"

});

Cypress.Commands.add('emRevisão' , () => {
    cy.get('[href="/commercial-note/approve"] > .truncate').click(); //Ir para tela de Aprovação
    cy.get('tr')
    .eq(0) // linha 1
    .within(() => {
      // Dentro dessa linha, clica no botão "Reprovar"
    cy.contains('button', 'Reprovar').click();
    });
    cy.get('[href="/commercial-note/consult"] > .truncate').click(); // ir para tela de cons.Situação NC
    cy.get('#radix-\:R1pukvffafcq\:-trigger-review').click(); //Ir para revisão
    cy.screenshot('páginaOneRevisao');/// Print pagina 1





});




