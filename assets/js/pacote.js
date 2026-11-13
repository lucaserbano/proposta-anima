/* Regras de preço da proposta. Fonte única dos valores.
   No navegador fica em window.Pacote; no Node, em module.exports (testes). */
(function (root) {
  'use strict';

  var ENTREGAVEIS = 3660;
  var WA_NUMERO = '5541999837301';
  var MSG_GERAL = 'Olá, Lucas! Vi a proposta de branding e identidade visual para o consultório de Psiquiatria e gostaria de conversar.';

  var OPCIONAIS = [
    { id: 'posts9', curto: '9 publicações (feed)', nome: 'Criação de 9 publicações para feed do Instagram (5 estáticas e 4 carrosseis, copywriting e design)', valor: 975 }
  ];

  function formatar(valor) {
    return 'R$ ' + String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function calcular(ids) {
    var marcados = OPCIONAIS.filter(function (o) { return ids.indexOf(o.id) !== -1; });
    var total = marcados.reduce(function (soma, o) { return soma + o.valor; }, ENTREGAVEIS);
    return { marcados: marcados, total: total };
  }

  function mensagem(ids) {
    var r = calcular(ids);
    var linhas = [
      'Olá, Lucas! Vi a proposta de branding e identidade visual para o consultório de Psiquiatria.',
      'Quero contratar:',
      '• Entregáveis (' + formatar(ENTREGAVEIS) + ')'
    ];
    r.marcados.forEach(function (o) { linhas.push('• ' + o.nome + ' (' + formatar(o.valor) + ')'); });
    linhas.push('Total: ' + formatar(r.total));
    return linhas.join('\n');
  }

  function linkWhatsApp(texto) {
    return 'https://wa.me/' + WA_NUMERO + '?text=' + encodeURIComponent(texto);
  }

  var api = {
    ENTREGAVEIS: ENTREGAVEIS,
    WA_NUMERO: WA_NUMERO,
    MSG_GERAL: MSG_GERAL,
    OPCIONAIS: OPCIONAIS,
    formatar: formatar,
    calcular: calcular,
    mensagem: mensagem,
    linkWhatsApp: linkWhatsApp
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Pacote = api;
})(this);
