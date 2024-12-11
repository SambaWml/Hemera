describe('Tela Modelos De NC', () => {

    beforeEach(() => {
        cy.verificaçãoERedirecionamento();  
        cy.login(); // Realiza login válido antes de cada teste
    });

    it('Tela Modelos de NC', () => {
        // Verificar a exibição correta da tela de Listagem de Modelos de Nota Comercial
        cy.verificarExibicaoTela();  
        /* 
        Given que o usuário acessou a tela de Listagem de Modelos de Nota Comercial
        Then os seguintes elementos devem ser exibidos: Campo de pesquisa, Dropdown de Status, Botão Filtrar, Botão Adicionar, 
        Tabela de Modelos, Coluna ID, Coluna Descrição, Coluna Data Criação, Coluna Última Edição, Coluna Inativo/Ativo, Coluna Ações.
        And a tabela deve exibir 5 modelos por página
        */

        // Verificar o funcionamento do Dropdown de Status
        cy.verificarDropdownStatus();
        /* 
        Given que o usuário está na tela de Listagem de Modelos de Nota Comercial
        When o usuário clica no dropdown de Status
        Then as opções "Todos", "Ativo" e "Inativo" devem ser exibidas
        */

        // Filtrar modelos por nome
        cy.filtrarPorNome();
        /* 
        Given que o usuário está na tela de Listagem de Modelos de Nota Comercial
        When o usuário digita "Nome do modelo" no campo de pesquisa
        And o usuário clica no botão "Filtrar"
        Then a tabela deve exibir apenas os modelos cujo nome contém "Nome do Modelo"
        */

        // Problema ao clicar no filtro de status.  
        // cy.filtrarPorStatus(); 

        // Excluir um modelo da lista
        cy.excluirModelo();
        /* 
        Given que o modelo com ID "001" está listado
        When o usuário clica no ícone de lápis para editar o modelo com ID "001"
        Then o usuário deve ser redirecionado para a página de edição do modelo
        */
    });

});
