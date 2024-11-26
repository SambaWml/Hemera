import 'cypress-file-upload';

/**
 * Função para formatar uma data no formato "YYYY-MM-DD".
 */
const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
};

/**
 * Gera as datas de emissão e vencimento.
 * A data de vencimento é 30 dias após a data de emissão.
 */
const gerarDatas = () => {
    const hoje = new Date();
    const dataEmissao = formatarData(hoje);

    hoje.setDate(hoje.getDate() + 30);
    const dataVencimento = formatarData(hoje);

    return { dataEmissao, dataVencimento };
};

/**
 * Gera um número aleatório dentro de um intervalo especificado.
 */
const gerarNumeroAleatorio = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Converte um número para o texto correspondente por extenso (até 1000).
 */
const numeroPorExtenso = (numero) => {
    const unidades = [
        '', 'umm', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'
    ];
    const dezenas = [
        '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ];
    const especiais = [
        'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];
    const centenas = [
        '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 
        'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
    ];

    if (numero === 1000) return 'mil';
    if (numero < 10) return unidades[numero];
    if (numero < 20) return especiais[numero - 10];
    if (numero < 100) {
        const dezena = Math.floor(numero / 10);
        const unidade = numero % 10;
        return unidade === 0
            ? dezenas[dezena]
            : `${dezenas[dezena]} e ${unidades[unidade]}`;
    }
    if (numero < 1000) {
        const centena = Math.floor(numero / 100);
        const resto = numero % 100;
        return resto === 0
            ? `${centenas[centena]}`
            : `${centenas[centena]} e ${numeroPorExtenso(resto)}`;
    }
    return '';
};

/**
 * Configurações iniciais de dados usados nos testes.
 */
const { dataEmissao, dataVencimento } = gerarDatas();
const dados = {
    investidor: "12.254.372/0001-23",
    emissor: "02.033.625/0001-85",
    numeroNC: numeroPorExtenso(gerarNumeroAleatorio(1, 1000)),
    descricaoNC: 'Primeira nota NC',
    serieNc: gerarNumeroAleatorio(1000, 9999),
    valorTotal: '500.000',
    valorUnitario: '50.000',
    quantidade: '10',
    jurosPre: '1000',
    jurosPos: '1500',
    nomeDaNota: 'Não Apagar QA',
    taxa01: gerarNumeroAleatorio(0, 80000).toString(),
    taxa02: gerarNumeroAleatorio(0, 80000).toString(),
    taxa03: gerarNumeroAleatorio(0, 80000).toString(),

};

/**
 * Comando para realizar login.
 */
Cypress.Commands.add('login', (userName = 'lubyqa', password = '12345') => {
    cy.visit('https://hemera.oke.luby.me/');
    cy.contains('Fazer login com Keycloak').click();
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.contains('Modelo de Nota Comercial').should('be.visible');
    cy.screenshot('LoginValido');
});

/**
 * Comando para acessar a tela de Cadastro de NC.
 */
Cypress.Commands.add('visualizarTelaDeCadastroNC', () => {
    cy.get('[href="/commercial-note/register"] > .truncate').click();
    cy.contains('Cadastro NC').should('be.visible');
});

/**
 * Preenche os campos do cabeçalho de uma NC.
 */
Cypress.Commands.add('preencherCabecalho', () => {
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(dados.investidor);
    cy.wait(5000);
    cy.get('input[data-test="header.cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
    cy.get('input[data-test="header.issueDate-input"]').type(dataEmissao);
    cy.get('input[data-test="header.expireDate-input"]').type(dataVencimento);
    
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2').type(dados.numeroNC);
    cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2').type(dados.serieNc);

    cy.contains('Modelo de NC').click();
    cy.get('div[data-radix-select-viewport]')
        .find('span[id^="radix-"]')
        .contains(dados.nomeDaNota)
        .click();

    cy.get(':nth-child(6) > .gap-2').type(dados.descricaoNC);
    cy.get(':nth-child(7) > :nth-child(1) > .gap-2').type(dados.valorTotal);
    cy.get(':nth-child(7) > :nth-child(2) > .gap-2').type(dados.valorUnitario);
    cy.get(':nth-child(7) > :nth-child(3) > .gap-2').type(dados.quantidade);

    cy.contains('Adicionar Conta').click();
    cy.contains('Banco').should('exist');
    cy.get('button[id="BANCO SANTANDER (BRASIL) "]').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 

    cy.get(':nth-child(9) > .flex-row > :nth-child(1) > .gap-2').type(dados.jurosPre);
    cy.get(':nth-child(9) > .flex-row > :nth-child(2) > .gap-2').type(dados.jurosPos);

    cy.contains('Próximo').click();
    //cy.wait(5000);
    //cy.contains('Sucesso').should('be.visible');
    //cy.screenshot('CabecalhoPreenchido');
});

/**
 * Preenche as obrigações de uma NC.
 */
Cypress.Commands.add('preencherObrigacoes', () => {
    cy.contains('Resgate Antecipado:').should('be.visible');
    cy.contains('Do atraso no pagamento e encargos moratórios:').should('be.visible');

    cy.get('#item').click();
    cy.get('#item2').click();

    cy.get(':nth-child(2) > .inline-block > .gap-2 > .relative > .absolute').type(dados.taxa01);
    cy.get(':nth-child(3) > .inline-block > .gap-2 > .relative > .absolute').type(dados.taxa02);
    cy.get(':nth-child(4) > .inline-block > .gap-2 > .relative > .absolute').type(dados.taxa03);
    cy.screenshot('ObrigacoesPreenchidas');

    cy.contains('Próximo').click();
    //cy.wait(5000);

    //cy.contains('Sucesso').should('be.visible');
    //cy.contains('Upload do Fluxo').should('be.visible');
});



/**
 * Comando para simular o envio de um fluxo de pagamento válido.
 */
Cypress.Commands.add('enviarPagamentoValido', () => {
    cy.get('input[type="file"]').attachFile('parcelas_amortizacao.csv');
    //cy.wait(3000);
    cy.contains('Sucesso').should('be.visible');
    cy.screenshot('SucessoPagamentoValido');

    cy.contains('Próximo').click();
    //cy.wait(5000);
    //cy.contains('Upload do Contrato').should('be.visible');

});


/**
 * Comando para simular o envio de um Contrato válido.
 */
Cypress.Commands.add('enviarContratoValido', () => {
    cy.get('input[type="file"]').attachFile('garantias.csv');
    cy.wait(3000);
    cy.contains('garantias.csv').should('be.visible');
    cy.get('.slate-selectable > .relative').type('Garantia ID,Descrição,Valor,Tipo,Data de Vencimento')
    cy.screenshot('SucessoContratoValido');
    cy.contains('Fidejussórias').click();

    /*cy.contains('Próximo').click();
    cy.wait(5000);
    cy.contains('Upload do Contrato').should('be.visible');*/

});


/**
 * Comando para adicionar um avalista.
 */
Cypress.Commands.add('adicionarAvalista', () => {
    cy.contains('Adicionar Avalista').should('be.visible');
    cy.contains('Adicionar Avalista').click();
    cy.get('button.peer').eq(1).click();
    cy.get('.flex-col-reverse> :nth-child(2)').click();
    cy.contains('92345678900').should('be.visible');

});

/**
 * Comando para adicionar um cônjuge anuente.
 */
Cypress.Commands.add('adicionarConjuge', () => {
    cy.contains('Adicionar Cônjuge').click();
    cy.get('button.peer').eq(1).click();
    cy.get('.flex-col-reverse> :nth-child(2)').click();
    cy.contains('12345678900').should('be.visible');
    
});

/**
 * Comando para enviar a NC para aprovação.
 */
Cypress.Commands.add('enviarAprovacao', () => {
    cy.screenshot('GarantiasConcluidas');
    cy.contains('Enviar para aprovação').click();
    cy.contains('Sucesso').should('be.visible');
    cy.screenshot('EnvioAprovacaoConcluido');
});
