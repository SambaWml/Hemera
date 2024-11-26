describe('Cadastro de NC', () => {

    beforeEach(() => {
        cy.verificaçãoERedirecionamento(); // Verifica a página inicial antes de cada teste
        cy.login(); // Realiza o login válido
    });

    it('Cadastro de NC', () => {
        // Acessar a tela de cadastro de NC
        cy.visualizarTelaDeCadastroNC(); 

        // Preencher o cabeçalho da NC Externo
        // cy.preencherCabecalhoExterno();
        // cy.cancelarEmissao(); // Caso queira testar a funcionalidade de cancelar emissão
        // cy.visualizarTelaDeCadastroNC(); // Retorna à tela de cadastro, se necessário após cancelar

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
