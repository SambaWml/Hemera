import 'cypress-file-upload';

// Função para formatar a data no formato "YYYY-MM-DD"
const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
};

// Função para gerar data de emissão e vencimento
const gerarDatas = () => {
    const hoje = new Date(); // Data atual

    // Data de emissão é a data atual
    const dataEmissao = formatarData(hoje);

    // Calcular data de vencimento (30 dias após a data de emissão)
    hoje.setDate(hoje.getDate() + 30); // Adiciona 30 dias à data atual
    const dataVencimento = formatarData(hoje);

    return { dataEmissao, dataVencimento };
}

// Função para gerar um número aleatório dentro de um intervalo específico
const gerarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para converter número em texto (por extenso)
const numeroPorExtenso = (numero) => {
  if (typeof numero !== 'number' || numero < 0 || numero > 59) {
      return '';
  }
  const numPorExtenso = [
    'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 
    'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 
    'vinte', 'vinte e uma', 'vinte e duas', 'vinte e três', 'vinte e quatro', 'vinte e cinco', 'vinte e seis', 'vinte e sete', 'vinte e oito', 'vinte e nove', 
    'trinta', 'trinta e uma', 'trinta e duas', 'trinta e três', 'trinta e quatro', 'trinta e cinco', 'trinta e seis', 'trinta e sete', 'trinta e oito', 'trinta e nove',
    'quarenta', 'quarenta e uma', 'quarenta e duas', 'quarenta e três', 'quarenta e quatro', 'quarenta e cinco', 'quarenta e seis', 'quarenta e sete', 'quarenta e oito', 'quarenta e nove',
    'cinquenta', 'cinquenta e uma', 'cinquenta e duas', 'cinquenta e três', 'cinquenta e quatro', 'cinquenta e cinco', 'cinquenta e seis', 'cinquenta e sete', 'cinquenta e oito', 'cinquenta e nove',
    'sessenta', 'sessenta e uma', 'sessenta e duas', 'sessenta e três', 'sessenta e quatro', 'sessenta e cinco', 'sessenta e seis', 'sessenta e sete', 'sessenta e oito', 'sessenta e nove',
    'setenta', 'setenta e uma', 'setenta e duas', 'setenta e três', 'setenta e quatro', 'setenta e cinco', 'setenta e seis', 'setenta e sete', 'setenta e oito', 'setenta e nove',
    'oitenta', 'oitenta e uma', 'oitenta e duas', 'oitenta e três', 'oitenta e quatro', 'oitenta e cinco', 'oitenta e seis', 'oitenta e sete', 'oitenta e oito', 'oitenta e nove',
    'noventa', 'noventa e uma', 'noventa e duas', 'noventa e três', 'noventa e quatro', 'noventa e cinco', 'noventa e seis', 'noventa e sete', 'noventa e oito', 'noventa e nove',
    'cem'

  ];

  return numPorExtenso[numero] || '';
};


// Configurações de dados
const dados = {
    investidor: "12.254.372/0001-23", 
    emissor: "02.033.625/0001-85", 
    numeroNC: numeroPorExtenso(gerarNumeroAleatorio(1, 99)), // Gera número aleatório e converte para extenso
    descricaoNC: 'Primeira nota NC',
    serieNc: gerarNumeroAleatorio(1000, 9999), // Gera número aleatório para serieNc
    valorTotal: '500.000',  
    valorUnitario: '50.000',
    quantidade: '10',
    jurosPre: '1000',
    jurosPos: '1500',
    nomeDaNota: 'Não Apagar QA',
};

// Gerar as datas
const { dataEmissao, dataVencimento } = gerarDatas();

// Comando para login
Cypress.Commands.add('login', (userName = 'lubyqa', password = '12345') => {
    cy.visit('https://hemera.oke.luby.me/');
    cy.contains('Fazer login com Keycloak').click();
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
    cy.screenshot('LoginValido');  
});

// Navegar até a tela de Cadastro de NC
Cypress.Commands.add('visualizarTelaDeCadastroNC', () => {
    cy.get('[href="/commercial-note/register"] > .truncate').click(); 
    cy.contains('Cadastro NC').should('be.visible');
    cy.wait(2000);
});

// Preencher cabeçalho da NC - Interno
Cypress.Commands.add('preencherCabecalhoExterno', () => {    
    cy.get('#item').click();
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(dados.investidor); 
    cy.wait(4000)
    cy.get('input[data-test="cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
    cy.get('[data-test="issueDate-input"]').type(dataEmissao);
    cy.get('[data-test="expireDate-input"]').type(dataVencimento);
    cy.wait(3000)
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2 > .relative > .absolute').type(dados.numeroNC);
    cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2').type(dados.serieNc);
    cy.contains('Modelo de NC').click();
    cy.get('div[data-radix-select-viewport]').find('span[id^="radix-"]').contains('Não Apagar QA').click();    
    cy.get(':nth-child(6) > .gap-2').type(dados.descricaoNC);
    cy.get(':nth-child(7) > :nth-child(1) > .gap-2').type(dados.valorTotal);
    cy.get(':nth-child(7) > :nth-child(2) > .gap-2').type(dados.valorUnitario);
    cy.get(':nth-child(7) > :nth-child(3) > .gap-2').type(dados.quantidade);                             
    cy.contains('Adicionar Conta').should('be.visible').click();
    cy.contains('Banco').should('exist');
    cy.wait(2000);
    cy.get('button[id="BANCO SANTANDER (BRASIL) "]').should('be.visible').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 
    cy.wait(1000)
    cy.get(':nth-child(9) > .flex-row > :nth-child(1) > .gap-2').type(dados.jurosPre);
    cy.get(':nth-child(9) > .flex-row > :nth-child(2) > .gap-2').type(dados.jurosPos);
    cy.screenshot('cabeçalhoPreenchido')
    cy.get('.mr-auto').click();
    cy.wait(3000)
    cy.get('.text-base.font-bold.text-green-500', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Sucesso');
    cy.screenshot('salvoComSucessoCabecalho')
});


// Preencher cabeçalho da NC
Cypress.Commands.add('preencherCabecalho', () => {    
    cy.get('.mb-6 > :nth-child(3) > :nth-child(1) > .gap-2').type(dados.investidor); 
    cy.wait(4000)
    cy.get('input[data-test="cnpjSearchIssuer-input"]').type(dados.emissor, { force: true });
    cy.get('[data-test="issueDate-input"]').type(dataEmissao);
    cy.get('[data-test="expireDate-input"]').type(dataVencimento);
    cy.wait(3000)
    cy.get('.flex-1.flex-row > :nth-child(1) > .gap-2 > .relative > .absolute').type(dados.numeroNC);
    cy.get('.flex-1.flex-row > :nth-child(2) > .gap-2').type(dados.serieNc);
    cy.contains('Modelo de NC').click();
    cy.get('div[data-radix-select-viewport]').find('span[id^="radix-"]').contains('Não Apagar QA').click();    
    cy.get(':nth-child(6) > .gap-2').type(dados.descricaoNC);
    cy.get(':nth-child(7) > :nth-child(1) > .gap-2').type(dados.valorTotal);
    cy.get(':nth-child(7) > :nth-child(2) > .gap-2').type(dados.valorUnitario);
    cy.get(':nth-child(7) > :nth-child(3) > .gap-2').type(dados.quantidade);                             
    cy.contains('Adicionar Conta').should('be.visible').click();
    cy.contains('Banco').should('exist');
    cy.wait(2000);
    cy.get('button[id="BANCO SANTANDER (BRASIL) "]').should('be.visible').click();
    cy.get('.flex.flex-col-reverse > button.bg-primary').click(); 
    cy.wait(1000)
    cy.get(':nth-child(9) > .flex-row > :nth-child(1) > .gap-2').type(dados.jurosPre);
    cy.get(':nth-child(9) > .flex-row > :nth-child(2) > .gap-2').type(dados.jurosPos);
    cy.screenshot('cabeçalhoPreenchido')
    cy.get('.mr-auto').click();
    cy.wait(3000)
    cy.get('.text-base.font-bold.text-green-500', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Sucesso');
    cy.screenshot('salvoComSucessoCabecalho')
});

// Preencher obrigações
Cypress.Commands.add('preencherObrigacoes', () => {
    const taxas = ["15", "20", "30"];
    cy.contains('Resgate Antecipado:').should('be.visible'); 
    cy.contains('Do atraso no pagamento e encargos moratórios:').should('be.visible'); 
    cy.get('#item').click();
    cy.get('#item2').click();
    cy.screenshot('obrigaçõesPreenchida');
    cy.get('id').click();
    cy.contains('Upload do Fluxo').should('be.visible');
});

// Enviar pagamento inválido
Cypress.Commands.add('enviarPagamentoInvalido', () => {
    const fluxoPagamentoinvalido = 'parcelas_amortizacao.xlsx';
    cy.get('id').attachFile(fluxoPagamentoinvalido);
    cy.contains('mensagem de erro').should('be.visible');
    cy.screenshot('Erro ao enviar no formato errado');
});

// Enviar pagamento válido
Cypress.Commands.add('enviarPagamentoValido', () => {
    const fluxoPagamento = 'parcelas_amortizacao.csv';
    cy.get('id').attachFile(fluxoPagamento);
    cy.contains('mensagem de sucesso').should('be.visible');
    cy.screenshot('Sucesso ao enviar arquivo');
    cy.contains('Fidejussórias').click();
    cy.contains('Avalista').should('be.visible');
    cy.contains('Cônjuge Anuente').should('be.visible');
    cy.screenshot('abaFidejussórias');
});

// Adicionar Avalista
Cypress.Commands.add('adicionarAvalista', (avalista = "Nome ou RG") => {
    cy.get('id').click(); 
    cy.contains('Adicionar Avalista').should('be.visible');
    cy.get('id').type(avalista);
    cy.get('id').click(); 
    cy.get('Id').click(); 
    cy.contains(avalista).should('be.visible');
});

// Adicionar Cônjuge Anuente
Cypress.Commands.add('adicionarConjuge', (conjuge = "Nome ou RG") => {
    cy.get('id').click(); 
    cy.contains('Adicionar Cônjuge Anuente').should('be.visible');
    cy.get('id').type(conjuge);
    cy.get('id').click(); 
    cy.get('Id').click(); 
    cy.contains(conjuge).should('be.visible');
});

// Enviar para aprovação
Cypress.Commands.add('enviarAprovacao', () => {
    cy.screenshot('garantiasconcluida');
    cy.get('id/contains').click(); 
    cy.screenshot('conclusaoEnvio');
});
