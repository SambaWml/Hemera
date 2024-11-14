import 'cypress-file-upload';

// cancelar a emissão de uma nota comercial
Cypress.Commands.add('cancelarEmissao', () => {
    cy.contains('Cancelar Emissão')
      .should('be.visible');
    cy.get('id/contains') // Ajustar o seletor
      .click();
    cy.contains('Você tem certeza de que deseja cancelar a emissão da Nota Comercial?')
      .should('be.visible');
    cy.get('id/contains') // Ajustar o seletor
      .click();
});

// Comando de login no sistema usando Keycloak
Cypress.Commands.add('login', () => { 
    let userName = 'lubyqa';
    let password = '12345';

    cy.visit('https://hemera.oke.luby.me/'); 
    cy.get('button')
      .contains('Fazer login com Keycloak')
      .should('be.visible');
    cy.wait(4000);
    cy.contains('Fazer login com Keycloak').click();
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.wait(2000);
    cy.screenshot('LoginValido');  
});

// acessar a tela de Cadastro de NC
Cypress.Commands.add('visualizarTelaDeCadastroNC', () => {
    cy.get('[href="/commercial-note/register"] > .truncate').click(); 
    cy.contains('Cadastro NC').should('be.visible');
    cy.wait(2000);
});

// preencher o cabeçalho da NC
Cypress.Commands.add('preencherCabecalho', () => {    
    let investidor = "12.254.372/0001-23"; 
    let emissor = "02.033.625/0001-85"; 
    let dataEmissão = '14112024';
    let dataEmissaoFormatada = dataEmissão.slice(4, 8) + '-' + dataEmissão.slice(2, 4) + '-' + dataEmissão.slice(0, 2);
    let dataVencimento = '03012025';
    let dataVencimentoFormatada = dataVencimento.slice(4, 8) + '-' + dataVencimento.slice(2, 4) + '-' + dataVencimento.slice(0, 2);
    let serieNc = '3546'; 
    let numeroNC = 'Primeira';
    let descricaoNC = 'Primeira nota NC';
    let valorTotal = '500.000';  
    let valorUnitario = '50.000';
    let quantidade = '';
    let jurosPre = '10%';
    let jurosPos = '15%';

    // Preencher os campos do formulário
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(investidor);
    cy.wait(4000);
    cy.get('input[data-test="cnpjSearchIssuer-input"]').type(emissor, { force: true });
    cy.get('[data-test="issueDate-input"]').type(dataEmissaoFormatada);
    cy.get('[data-test="expireDate-input"]').type(dataVencimentoFormatada);
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2 > .relative > .absolute').type(numeroNC);
    cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2').type(serieNc);

    // Substituir por seletores corretos para modelo, descrição, etc.
    // cy.get('ID ou Contains').click();
    // cy.get('id ou contains').contains('nome do modelo').click();

    // Captura de tela do cabeçalho preenchido
    // cy.screenshot('cabeçalhoPreenchido');
});

// preencher as obrigações
Cypress.Commands.add('preencherObrigacoes', () => {
    let taxa01 = "15%";
    let taxa02 = "20%";
    let taxa03 = "30%";

    cy.contains('Resgate Antecipado:').should('be.visible'); 
    cy.contains('Do atraso no pagamento e encargos moratórios:').should('be.visible'); 
    cy.screenshot('telaObrigações'); 
    cy.get('id')  
      .click();
    cy.get('id') // Outro checkbox
      .click();
    cy.get('ID').type(taxa01); 
    cy.get('ID').type(taxa02); 
    cy.get('ID').type(taxa03); 
    cy.screenshot('obrigaçõesPreenchida'); 
    cy.get('id')  
      .click();
    cy.contains('Upload do Fluxo').should('be.visible');
});

// testar o envio de um arquivo de pagamento inválido
Cypress.Commands.add('enviarPagamentoInvalido', () => {
    const fluxoPagamentoinvalido = 'parcelas_amortizacao.xlsx';
    cy.get('id') 
      .attachFile(fluxoPagamentoinvalido);
    cy.contains('mensagem de erro').should('be.visible');
    cy.screenshot('Erro ao enviar no formato errado');
});

// testar o envio de um arquivo de pagamento válido
Cypress.Commands.add('enviarPagamentovalido', () => {
    const fluxoPagamento = 'parcelas_amortizacao.csv';
    cy.get('id') 
      .attachFile(fluxoPagamento);
    cy.contains('mensagem de sucesso').should('be.visible');
    cy.screenshot('Sucesso ao enviar arquivo');
    cy.contains('Fidejussórias').click();
    cy.contains('Avalista').should('be.visible');
    cy.contains('Cônjuge Anuente').should('be.visible');
    cy.screenshot('abaFidejussórias');
});

// adicionar um Avalista
Cypress.Commands.add('adicionarAvalista', () => {
    let avalista = "Nome ou RG";
    cy.get('id').click(); 
    cy.contains('Adicionar Avalista').should('be.visible');
    cy.get('id').type(avalista);
    cy.get('id').click(); 
    cy.get('Id').click(); 
    cy.contains(avalista).should('be.visible');
});

// adicionar um Cônjuge Anuente
Cypress.Commands.add('adicionarConjuge', () => {
    let conjuge = "Nome ou RG";
    cy.get('id').click(); 
    cy.contains('Adicionar Cônjuge Anuente').should('be.visible');
    cy.get('id').type(conjuge);
    cy.get('id').click(); 
    cy.get('Id').click(); 
    cy.contains(conjuge).should('be.visible');
});

// enviar o formulário para aprovação
Cypress.Commands.add('enviarAprovação', () => {
    cy.screenshot('garantiasconcluida');
    cy.get('id/contains').click(); 
    cy.screenshot('conclusãodoenvio');
});
