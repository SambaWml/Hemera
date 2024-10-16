describe('Cadastro de NC', () => {
    beforeEach(() => {
    });
    it('Cadastro de NC', () => {
        cy.verificaçãoeredirecionamento(); // 
        cy.login(); // Fazer Login Válido
        cy.visualizarTelaDeCadastroNC(); //Ser redirecionado para tela de cadastro NC
        cy.preencherCabecalho(); //Vai ser preenchido a aba do cabeçalho
        cy.preencherObrigacoes(); // Vai preencher a aba obrigações
        cy.enviarPagamentoInvalido(); // Puxar esse e dps fazer o Valido
        cy.enviarPagamento(); //










        

    });
});