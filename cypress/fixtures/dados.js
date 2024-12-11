const { format } = require('date-fns');

// Função para formatar uma data no formato "YYYY-MM-DD".
const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const ano = data.getFullYear();
  return `${ano}-${mes}-${dia}`;
};

// Gera as datas de emissão e vencimento.
const gerarDatas = () => {
  const hoje = new Date();
  const dataEmissao = formatarData(hoje);

  hoje.setDate(hoje.getDate() + 30);
  const dataVencimento = formatarData(hoje);

  return { dataEmissao, dataVencimento };
};

// Gera um número aleatório dentro de um intervalo especificado.
const gerarNumeroAleatorio = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Gera os dados dinâmicos para os testes
const { dataEmissao, dataVencimento } = gerarDatas();
const dados = {
  investidor: '19.187.295/0001-85',
  emissor: '54.732.722/0001-60',
  numeroNC: `3284 ${format(new Date(), 'd Haaa m s')}`,
  descricaoNC: 'Primeira nota NC',
  serieNc: `Dia ${format(new Date(), 'd')}`,
  valorTotal: '500.000',
  valorUnitario: '50.000',
  quantidade: '10',
  jurosPre: '1000',
  jurosPos: '1500',
  nomeDaNota: 'Não Apagar QA',
  taxa01: gerarNumeroAleatorio(0, 80000).toString(),
  taxa02: gerarNumeroAleatorio(0, 80000).toString(),
  taxa03: gerarNumeroAleatorio(0, 80000).toString(),
  dataEmissao, // Incluímos dataEmissao aqui dentro
  dataVencimento, // Incluímos dataVencimento aqui dentro
};

// Exporta os dados para uso nos testes
module.exports = dados;
