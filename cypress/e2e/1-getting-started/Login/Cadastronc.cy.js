describe('Cadastro de NC', () => {
    beforeEach(() => {
    });
    it('HEM-1: Cadastro de NC', () => {
        cy.verificaçãoeredirecionamento(); // 
        cy.login(); // Fazer Login Válido
        cy.visualizarTelaDeCadastroNC(); //Ser redirecionado para tela de cadastro NC
        cy.cancelarEmissao();
        //cy.visualizarTelaDeCadastroNC(); // Validar se é necessario
        cy.preencherCabecalho(); //Vai ser preenchido a aba do cabeçalho
        cy.preencherObrigacoes(); // Vai preencher a aba obrigações
        cy.enviarPagamentoInvalido(); // Puxar esse e dps fazer o Valido
        cy.enviarPagamento(); //  
        cy.adicionarAvalista();
        cy.adicionarConjuge();









        

    });
});