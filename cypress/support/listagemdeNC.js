// Elementos
const campoPesquisa = '.w-\\[360px\\] > .gap-2';
const dropdownStatus = '.ml-auto > .justify-between';
const botaoFiltrar = '.ml-auto > .inline-flex';
const botaoAdicionar = '.justify-end.rounded-lg > .inline-flex';
const tabelaModelos = '.flex-col.gap-4';

// Colunas
const colunaId = '.flex-col.gap-4';
const colunaDescricao = '.border-b > :nth-child(2) > .flex';
const colunaDataCriacao = '.border-b > :nth-child(3) > .flex';
const colunaUltimaEdicao = '.border-b > :nth-child(4) > .flex';
const colunaInativoAtivo = '.border-b > :nth-child(5) > .flex';
const colunaAcoes = ':nth-child(6) > .flex';

// Status Dropdown 
/* 
const todosStatus = '#radix-\\:ri\\:';
const ativoStatus = '#radix-\\:rj\\:';
const inativoStatus = '#radix-\\:rk\\:'; 
*/

// Pesquisa
const nomeModelo = 'Modelo - Fuso 1';

// Verificar Exibição da Tela
Cypress.Commands.add('verificarExibicaoTela', () => {
    cy.get(campoPesquisa).should('be.visible'); // pesquisa
    cy.get(dropdownStatus).should('be.visible'); // status
    cy.get(botaoFiltrar).should('be.visible'); // filtrar
    cy.get(botaoAdicionar).should('be.visible'); // adicionar
    cy.get(tabelaModelos).should('be.visible'); // tabela de modelos
    
    // Verificar colunas
    cy.get(colunaId).should('exist'); // id
    cy.get(colunaDescricao).should('exist'); // descrição
    cy.get(colunaDataCriacao).should('exist'); // data de criação
    cy.get(colunaUltimaEdicao).should('exist'); // última edição
    cy.get(colunaInativoAtivo).should('exist'); // inativo/ativo
    cy.get(colunaAcoes).should('exist'); // ações
    
    cy.wait(4000);
    cy.screenshot('verificarExibicaoTela');
});

// Verificar Dropdown de Status
Cypress.Commands.add('verificarDropdownStatus', () => {
    cy.get(dropdownStatus).click(); 
    cy.contains('span', 'Todos').should('be.visible');
    cy.contains('span', 'Ativo').should('be.visible');
    cy.contains('span', 'Inativo').should('be.visible');
    
    cy.wait(4000);
    cy.screenshot('verificarDropdownStatus');
});

// Filtrar Por Nome
Cypress.Commands.add('filtrarPorNome', () => {
    cy.contains('Pesquisar')
      .click({ force: true })
      .type(nomeModelo);
    
    cy.get(botaoFiltrar).click();
    cy.wait(4000);
    cy.screenshot('filtrarPorNome');
    
    cy.get('[data-test="description-input"]').clear();
    cy.get(botaoFiltrar).click();
    cy.screenshot('filtroLimpo')
});

// Filtrar Por Status
/* 
Cypress.Commands.add('filtrarPorStatus', () => {
    // cy.contains('span', 'Todos').click({ force: true });
    // cy.contains('span', 'Ativo').click({ force: true });
    // cy.contains('span', 'Inativo').click({ force: true });

    // Filtrar pelo Ativo
    cy.get(dropdownStatus).click(); 
    cy.wait(1000); 
    cy.get('.cursor-default.select-none').eq(2).should('exist').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);  
    cy.screenshot('FiltroAtivo');

    // Filtrar pelo Inativo
    cy.get(dropdownStatus).click();  
    cy.contains('div[role="listbox"] span', 'Inativo').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);
    cy.screenshot('FiltroInativo');

    // Filtrar Todos
    cy.get(dropdownStatus).click();  
    cy.contains('span', 'Todos').click();
    cy.get(botaoFiltrar).click();
    cy.wait(4000);
    cy.screenshot('FiltroTodos');
}); 
*/

// Excluir Modelo 
Cypress.Commands.add('excluirModelo', () => {
    cy.get('tr').eq(5) // Seleciona a linha do modelo
      .find('button').eq(2) // Botão de excluir
      .click();
    
    cy.contains('Tem certeza que deseja excluir o Modelo de Nota Comercial Padrão?').should('be.visible');
    cy.contains('button', 'Excluir').click();
    cy.screenshot('excluindoModelo')
});

// Editar Modelo (parcialmente implementado)
Cypress.Commands.add('editarModelo', () => {
    cy.get('tr').eq(1) // Seleciona a linha do modelo
      .find('button').eq(1) // Botão de editar
      .click();
    
    cy.contains('Modelo de Nota Comercial').should('be.visible');
    // Implementar os próximos passos para edição do modelo
});
