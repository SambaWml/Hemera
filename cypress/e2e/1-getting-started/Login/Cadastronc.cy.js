

describe('Cadastro de NC', () => {
    beforeEach(() => {
    });
    it('Cadastro de NC', () => {
        cy.login(); // Fazer Login Válido
        cy.visualizarTelaDeCadastroNC(); //Ser redirecionado para tela de cadastro NC
        cy.preencherCabeçalho();



    });
});