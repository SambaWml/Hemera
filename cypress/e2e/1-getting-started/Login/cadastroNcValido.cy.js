describe('Cadastro de NC', () => {

    beforeEach(() => {
        cy.verificaçãoERedirecionamento(); // Verifica a página inicial antes de cada teste
        cy.login(); // Realiza o login válido
    });

    it('Cadastro de NC', () => {
        cy.intercept(
            'GET',
            'https://hemera.backend.oke.luby.me/api/v1/ModeloNC/List*'
          ).as('LoadModels');
      
        cy.visualizarTelaDeCadastroNC();
      
        cy.wait('@LoadModels').its('response.statusCode').should('eq', 200);

        // Preencher o cabeçalho da NC
        cy.preencherCabecalho();

        // Preencher a aba de Obrigações
         cy.preencherObrigacoes();

        // Testar envio de pagamento com arquivo válido
         cy.enviarPagamentoValido();

        // Testar envio de contrato com arquivo válido
         cy.enviarContratoValido();

        // Adicionar avalista e cônjuge anuente
         cy.adicionarAvalista();
         cy.adicionarConjuge();

        // Enviar Aprovação
         cy.enviarAprovacao();
    });
});
