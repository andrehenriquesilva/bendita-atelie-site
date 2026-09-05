/* Ficha do pacote — preenchida seguindo o PLAYBOOK.md.
   Só o que VENDE e é FIEL à arte do fornecedor. Sem aéreo isolado, sem firula. */
window.PACOTE = {
  // foto pura do destino (gerada por IA ou do acervo Drive/Canva). Sem texto/logo.
  foto: "assets/destino.png",
  fotoPos: "center 28%",            // ajuste do enquadramento (object-position)

  selo: "Pacote Completo · Aéreo + Hotel + Ingressos",
  destinoTopo: "PARIS COM",         // linha menor acima do destino
  destino: "Disneyland Paris",      // nome FIEL do destino/produto
  datas: "6 dias · 04 a 09/08 · saindo de São Paulo",

  tituloPainel: "O que está incluso",

  // bloco em destaque (o "uau" do pacote). Opcional. itens = sub-linhas.
  destaque: {
    titulo: "Ingressos · 1 dia para os 2 parques",
    itens: ["Disneyland Park", "Disney Adventure World", "Encantado e novo World of Frozen"]
  },

  // demais inclusões (par fica simétrico na grade 2 colunas). d = descrição opcional, só se for literal.
  inclusoes: [
    { t: "Aéreo LATAM", d: "saindo de São Paulo via GRU" },
    { t: "Hôtel Aramis Saint-Germain", d: "Best Western" },
    { t: "Café da manhã" },
    { t: "Transfers" },
    { t: "Ônibus turístico", d: "em Paris" },
    { t: "Seguro viagem" }
  ],

  // preço do PACOTE (nunca o aéreo isolado)
  precoPre: "por pessoa, a partir de",
  parcelas: "12x",
  valor: "R$ 1.035",
  precoObs: "<b>7% OFF</b> à vista · Total R$ 12.420 + taxas R$ 712",

  cta: "Chame no WhatsApp"
};
