//Elementos//
let campoPesquisa = '.w-\\[360px\\] > .gap-2';
let dropdownStatus = '.ml-auto > .justify-between';
let botaoFiltrar = '.ml-auto > .inline-flex';
let botaoAdicionar = '.justify-end.rounded-lg > .inline-flex';
let tabelaModelos = '.flex-col.gap-4';
//Colunas//
let colunaId = '.flex-col.gap-4';
let colunaDescricao = '.border-b > :nth-child(2) > .flex';
let colunaDataCriacao = '.border-b > :nth-child(3) > .flex';
let colunaUltimaEdicao = '.border-b > :nth-child(4) > .flex';
let colunaInativoAtivo = '.border-b > :nth-child(5) > .flex';
let colunaAcoes = ':nth-child(6) > .flex';
//statusDropdown//
let Todos = '#radix-\\:ri\\:';
let Ativo = '#radix-\\:rj\\:';
let Inativo = '#radix-\\:rk\\:';
//pesquisa
let nomeModelo = 'Modelo - Fuso 1'


Cypress.Commands.add('verificarExibicaoTela', () => {
    // Verificar a visibilidade dos elementos
    cy.get(campoPesquisa).should('be.visible'); //pesquisa
    cy.get(dropdownStatus).should('be.visible'); // status
    cy.get(botaoFiltrar).should('be.visible'); //filtrar
    cy.get(botaoAdicionar).should('be.visible'); //adicionar
    cy.get(tabelaModelos).should('be.visible'); //tabelas dos modelos
    
    // Verificar as colunas da tabela
    cy.get(colunaId).should('exist'); //id
    cy.get(colunaDescricao).should('exist'); //descrição
    cy.get(colunaDataCriacao).should('exist'); // data de criação
    cy.get(colunaUltimaEdicao).should('exist'); // ultima edição
    cy.get(colunaInativoAtivo); // inativo/ativo
    cy.get(colunaAcoes).should('exist'); // ações
    cy.wait(4000);
    cy.screenshot('verificarExibicaoTela')
  });

  Cypress.Commands.add('verificarDropdownStatus', () => {
    cy.get(dropdownStatus).click(); 
    cy.get(Todos).should('contain', 'Todos');
    cy.get(Ativo).should('contain', 'Ativo');
    cy.get(Inativo).should('contain', 'Inativo');
    cy.wait(4000);
    cy.screenshot('verificarDropdownStatus');
  });

  Cypress.Commands.add('filtrarPorNome', () => {
    cy.contains('Pesquisar') 
      .click({ force: true })
      .type(nomeModelo); // 
    cy.get(botaoFiltrar).click(); // 
    cy.wait(4000);
    cy.screenshot('filtrarPorNome')
    cy.contains('Pesquisar').clear()
  });

  Cypress.Commands.add('filtrarPorStatus', () => {
    //cy.contains('span', 'Todos').click({ force: true });
    //cy.contains('span', 'Ativo').click({ force: true });
    //cy.contains('span', 'Inativo').click({ force: true });

    //Filtrar pelo ativo
    cy.get(dropdownStatus).click();  
    cy.contains('span', 'Ativo').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);  
    cy.screenshot('FiltroAtivo')

    //Filtrar pelo Inativo
    cy.get(dropdownStatus).click();  
    cy.contains('span', 'Inativo').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);
    cy.screenshot('FiltroInativo')
    
    //Filtrar todos
    cy.get(dropdownStatus).click();  
    cy.contains('span', 'Todos').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);
    cy.screenshot('Todos') 
    
  });


  //Cypress.Commands.add('excluirModelo', () => {
  //  cy.get(``).click(); // 
  //  cy.get('').should('be.visible'); 
  //  cy.get('').click(); // 
 // });

  //Cypress.Commands.add('editarModelo', () => {
   // cy.get(``).click(); 
   // cy.url().should('include', `/editar/`); 
  //});

  
