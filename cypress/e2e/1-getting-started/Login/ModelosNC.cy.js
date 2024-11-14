describe('Cadastro de NC', () => {
    beforeEach(() => {
    });
    it('trocar nome', () => {
        cy.verificaçãoeredirecionamento(); // 
        cy.login(); // Fazer Login Válido
        cy.verificarExibicaoTela(); // Validar elementos das telas
        cy.verificarDropdownStatus();
        cy.filtrarPorNome();
        cy.filtrarPorStatus();









        

    });
});