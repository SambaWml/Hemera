import 'cypress-file-upload';

/**
 * Função para formatar uma data no formato "YYYY-MM-DD".
 */
const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
};

/**
 * Gera as datas de emissão e vencimento.
 * A data de vencimento é 30 dias após a data de emissão.
 */
const gerarDatas = () => {
    const hoje = new Date();
    const dataEmissao = formatarData(hoje);

    hoje.setDate(hoje.getDate() + 30);
    const dataVencimento = formatarData(hoje);

    return { dataEmissao, dataVencimento };
};

/**
 * Gera um número aleatório dentro de um intervalo especificado.
 */
const gerarNumeroAleatorio = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min;


/**
 * Configurações iniciais de dados usados nos testes.
 */
const { dataEmissao, dataVencimento } = gerarDatas();
const dados = {
    investidor: "12.254.372/0001-23",
    emissor: "02.033.625/0001-85",
    numeroNC: 'Vintee e Dois',
    descricaoNC: 'Primeira nota NC',
    serieNc: gerarNumeroAleatorio(1000, 9999),
    valorTotal: '500.000',
    valorUnitario: '50.000',
    quantidade: '10',
    jurosPre: '1000',
    jurosPos: '1500',
    nomeDaNota: 'Não Apagar QA',

};


/**
 * Preenche os campos do cabeçalho de uma NC.
 */
Cypress.Commands.add('validacaoEmDigitacao', () => {
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(dados.investidor);
    cy.wait(5000);
    cy.get('input[data-test="cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
    cy.get('[data-test="issueDate-input"]').type(dataEmissao);
    cy.get('[data-test="expireDate-input"]').type(dataVencimento);
    
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2').type(dados.numeroNC);
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
    cy.get('button[id="BANCO SANTANDER (BRASIL) "]').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 

    cy.get(':nth-child(9) > .flex-row > :nth-child(1) > .gap-2').type(dados.jurosPre);
    cy.get(':nth-child(9) > .flex-row > :nth-child(2) > .gap-2').type(dados.jurosPos);

    cy.contains('Salvar Rascunho').click();
    cy.wait(5000);
    cy.contains('Sucesso').should('be.visible');


    cy.get('[href="/commercial-note/consult"] > .truncate').click();

    cy.get('tr.border-b') // Seleciona a linha da tabela
      .find('td a.text-primary') // Busca o link com o texto primário
      .should('contain.text', 'Vinte e Dois'); // Valida que o texto contém "Vinte e Dois"

      cy.contains('button', 'Cancelar NC').click();

});





