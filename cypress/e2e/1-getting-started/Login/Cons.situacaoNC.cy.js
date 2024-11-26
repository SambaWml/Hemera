describe('Cons. Situação NC', () => {

    beforeEach(() => {
        cy.verificaçãoERedirecionamento(); // Verifica a página inicial antes de cada teste
        cy.login(); // Realiza o login válido
    });

    it('Em Digitação', () => {
        // Acessar a tela de cadastro de NC
        cy.visualizarTelaDeCadastroNC(); 

        // Preencher o cabeçalho da NC
        cy.validacaoEmDigitacao();
    });
});
