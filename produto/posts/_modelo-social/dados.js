/* Ficha do POST SOCIAL — preenchida seguindo o PLAYBOOK.md desta pasta.
   Uma ideia por post. Texto curto, foto real, identidade Bendita.
   Os 3 formatos (4:5, 9:16, 1:1) leem esta MESMA ficha. */
window.POST = {
  tipo: "conteudo",              // conteudo | autoridade | depoimento | carrossel | promo (só documenta a intenção)
  data: "",                      // AAAA-MM-DD em que o post vai ao ar — agrupa a galeria por mês

  // --- FOTO ---
  foto: "assets/foto.jpg",       // foto real (acervo, Unsplash/Pexels ou a foto que a Josi mandou)
  fotoPos: "center center",      // enquadramento (object-position). Rosto? "center 30%"
  tratamento: "veu-baixo",       // veu-baixo | veu-topo | veu-total | duotone | cartao | limpo

  ancora: "baixo",               // onde o texto encosta: baixo | centro | topo

  // --- TEXTO ---
  eyebrow: "Dica da Bendita",    // sobre-título curto (2 a 4 palavras)
  titulo: "O melhor mês para<br>ir a <em>Gramado</em>",  // <em> pinta o trecho de dourado
  tituloCurto: false,            // true = fonte maior (título de 1 ou 2 palavras)
  sub: "E não, não é dezembro.",

  itens: [],                     // lista com check dourado. Ex: ["Passagem mais barata", "Hotel com vaga"]
  marcador: "✓",                 // símbolo do check (ex: "1" não — a lista não numera sozinha)

  // --- BLOCOS OPCIONAIS (use só o que o post pede) ---
  // depoimento: { texto:"Foi a melhor viagem da nossa vida.", autor:"Ana e Rafael", viagem:"Cancún 2026", estrelas:5 },
  // assinatura: { nome:"Joselaine", papel:"Consultora de viagens · Bendita Tour" },
  // preco: { pre:"por pessoa, a partir de", parcelas:"12x", valor:"R$ 389", obs:"" },

  cta: "Chame no WhatsApp",      // "" tira o botão
  ctaTipo: "wpp",                // wpp (botão verde) | seta (texto dourado, ex: "Arrasta pro lado →")
  marca: true,                   // false esconde o selo redondo do logo

  // --- CARROSSEL ---
  // Cada item vira uma tela e HERDA o que está aqui em cima (marca, tratamento, cta…).
  // Renderiza com scripts/export-carrossel.py. A capa vende, o miolo entrega, a última chama.
  telas: []
  // telas: [
  //   { titulo:"5 erros ao<br>comprar <em>passagem</em>", tituloCurto:false, foto:"assets/capa.jpg", cta:"Arrasta pro lado →", ctaTipo:"seta" },
  //   { titulo:"1. Comprar<br>na sexta", sub:"Terça e quarta costumam sair mais barato.", tratamento:"cartao", cta:"" },
  //   { titulo:"Fala com a<br><em>Bendita</em>", ancora:"centro", tratamento:"veu-total", cta:"Chame no WhatsApp" }
  // ]
};
