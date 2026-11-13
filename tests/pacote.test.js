const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../assets/js/pacote.js');

test('formatar usa R$ e ponto de milhar', () => {
  assert.equal(P.formatar(4635), 'R$ 4.635');
  assert.equal(P.formatar(975), 'R$ 975');
  assert.equal(P.formatar(3660), 'R$ 3.660');
});

test('sem opcional: só entregáveis', () => {
  assert.equal(P.calcular([]).total, 3660);
});

test('com o opcional de 9 publicações', () => {
  const r = P.calcular(['posts9']);
  assert.equal(r.total, 4635);
  assert.equal(r.marcados.length, 1);
});

test('ids repetidos e desconhecidos são ignorados', () => {
  const r = P.calcular(['posts9', 'posts9', 'xyz']);
  assert.equal(r.total, 4635);
  assert.equal(r.marcados.length, 1);
});

test('mensagem sem opcional', () => {
  const m = P.mensagem([]);
  assert.match(m, /^Olá, Lucas! Vi a proposta de branding e identidade visual para o consultório de Psiquiatria\./);
  assert.match(m, /• Entregáveis \(R\$ 3\.660\)/);
  assert.match(m, /Total: R\$ 3\.660$/);
});

test('mensagem com opcional', () => {
  const m = P.mensagem(['posts9']).split('\n');
  assert.equal(m[3].startsWith('• Criação de 9 publicações para feed do Instagram'), true);
  assert.equal(m[4], 'Total: R$ 4.635');
});

test('link do WhatsApp preserva acentos, bullets e quebras de linha', () => {
  const texto = P.mensagem(['posts9']);
  const link = P.linkWhatsApp(texto);
  assert.ok(link.startsWith('https://wa.me/5541999837301?text='));
  assert.equal(decodeURIComponent(link.split('?text=')[1]), texto);
});
