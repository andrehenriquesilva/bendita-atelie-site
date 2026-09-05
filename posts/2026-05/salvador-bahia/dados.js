/* Ficha — Salvador (Bahia). Extraído de pacotes/bahia_02.jpeg + texto do cliente (PLAYBOOK).
   Taxas SEPARADAS → "+ taxa R$X" junto do valor de cada hotel. "Protect Travel" descartado (preferência cliente).
   Múltiplos hotéis → bloco "Escolha sua hospedagem". Sem total. */
window.PACOTE = {
  foto: "assets/hero-salvador.jpg",
  fotoPos: "center 45%",

  selo: "Pacote Completo · Aéreo + Hotel + Passeios",
  destinoTopo: "6 DIAS EM",
  destino: "Salvador",
  datas: "6 dias / 5 noites · 12 a 17/11 · saídas 07/11 e 04/12 · de Maringá",

  tituloPainel: "O que está incluso",

  galeria: ["assets/g1.jpg", "assets/g2.jpg", "assets/g3.jpg"],

  destaque: {
    titulo: "Passeios inclusos",
    itens: ["City Tour Histórico", "Ilha dos Frades + Itaparica"]
  },

  inclusoes: [
    { t: "Aéreo", d: "saindo de Maringá" },
    { t: "Café da manhã + Transfer" }
  ],

  hoteisTitulo: "Escolha sua hospedagem (12x, por pessoa)",
  hoteis: [
    { nome: "B Hotel",                parc: "12x", valor: "R$ 144", taxa: "R$ 199" },
    { nome: "Catussaba Resort Hotel", parc: "12x", valor: "R$ 215", taxa: "R$ 199" },
    { nome: "Deville Prime Salvador", parc: "12x", valor: "R$ 287", taxa: "R$ 454" }
  ],
  precoObs: "por pessoa",

  cta: "Chame no WhatsApp"
};
