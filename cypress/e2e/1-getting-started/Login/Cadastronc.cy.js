describe('Cadastro de NC', () => {

    beforeEach(() => {
        cy.verificaçãoERedirecionamento(); // Verifica a página inicial antes de cada teste
        cy.login(); // Realiza o login válido
    });

    it('Cadastro de NC', () => {
        // Acessar a tela de cadastro de NC
        cy.visualizarTelaDeCadastroNC(); 

        // Preencher o cabeçalho da NC
        cy.preencherCabecalho();

        // Preencher o cabeçalho da NC Externo
        //cy.preencherCabecalhoExterno();

        // cy.cancelarEmissao(); // Caso queira testar a funcionalidade de cancelar emissão
        // cy.visualizarTelaDeCadastroNC(); // Retorna à tela de cadastro, se necessário após cancelar

        // Preencher a aba de Obrigações
         cy.preencherObrigacoes();

        // Testar envio de pagamento com arquivo inválido
        // cy.enviarPagamentoInvalido(); 

        // Testar envio de pagamento com arquivo válido
        // cy.enviarPagamentovalido();

        // Adicionar avalista e cônjuge anuente
        // cy.adicionarAvalista();
        // cy.adicionarConjuge();
    });
});
