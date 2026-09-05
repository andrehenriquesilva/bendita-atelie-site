/* Motor do post social — lê a ficha (dados.js) e monta a arte.
   Um motor só para os 3 formatos: o que muda entre eles é o CSS.
   Carrossel: a mesma ficha, uma tela por vez, escolhida em ?t=<n> (1-based). */
(function () {
  const P = window.POST || {};
  const post = document.querySelector('.post');
  const alvo = post.querySelector('.conteudo');

  // tela do carrossel herda o que a ficha define no topo (marca, cta, tratamento…)
  const n = parseInt(new URLSearchParams(location.search).get('t') || '0', 10);
  const telas = Array.isArray(P.telas) ? P.telas : [];
  const T = n && telas[n - 1] ? Object.assign({}, P, telas[n - 1]) : P;

  post.classList.add('trat-' + (T.tratamento || 'veu-baixo'), 'anc-' + (T.ancora || 'baixo'));

  const foto = post.querySelector('.foto');
  if (T.foto) { foto.src = T.foto; if (T.fotoPos) foto.style.objectPosition = T.fotoPos; }
  else foto.remove();

  const bloco = [];
  if (T.eyebrow) bloco.push(`<span class="eyebrow">${T.eyebrow}</span>`);

  if (T.depoimento) {
    const d = T.depoimento;
    bloco.push(`<div class="depo">
      <span class="aspas">&ldquo;</span>
      <div class="texto">${d.texto || ''}</div>
      ${d.estrelas ? `<div class="estrelas">${'★'.repeat(d.estrelas)}</div>` : ''}
      <div class="autor"><span>${d.autor || ''}</span>${d.viagem ? `<span class="viagem">· ${d.viagem}</span>` : ''}</div>
    </div>`);
  }

  // título aceita <em>trecho</em> para pintar de dourado
  if (T.titulo) bloco.push(`<h1 class="titulo${T.tituloCurto ? ' curto' : ''}">${T.titulo}</h1>`);
  if (T.sub) bloco.push(`<div class="sub">${T.sub}</div>`);

  // frases soltas (layout editorial): sem check, cada uma com o fio dourado à esquerda
  if (Array.isArray(T.frases) && T.frases.length) {
    bloco.push('<div class="frases">' +
      T.frases.map(f => `<p>${f}</p>`).join('') +
      '</div>');
  }

  if (Array.isArray(T.itens) && T.itens.length) {
    bloco.push('<ul class="itens">' +
      T.itens.map(i => `<li><span class="ck">${T.marcador || '✓'}</span><span>${i}</span></li>`).join('') +
      '</ul>');
  }

  if (T.assinatura) {
    bloco.push(`<div class="assinatura">
      <div class="nome">${T.assinatura.nome || ''}</div>
      <div class="papel">${T.assinatura.papel || ''}</div>
    </div>`);
  }

  if (T.preco) {
    bloco.push(`<div class="preco">
      ${T.preco.pre ? `<span class="pre">${T.preco.pre}</span>` : ''}
      <span class="price-chip">${T.preco.parcelas ? `<small>${T.preco.parcelas}</small>` : ''} ${T.preco.valor || ''}</span>
      ${T.preco.obs ? `<span class="obs">${T.preco.obs}</span>` : ''}
    </div>`);
  }

  if (T.cta) {
    bloco.push(T.ctaTipo === 'seta'
      ? `<div class="seta">${T.cta}</div>`
      : `<span class="cta-wpp">${T.cta}</span>`);
  }

  alvo.innerHTML = bloco.join('\n');

  // rodapé assinado (fica fora do .conteudo, colado na base do canvas)
  if (T.rodape) {
    post.insertAdjacentHTML('beforeend', `<div class="rodape">
      <span class="nome">${T.rodape.marca || ''}</span>
      <span class="barra"></span>
      <span class="linha">${T.rodape.linha || ''}</span>
    </div>`);
  }

  if (T.marca === false) post.querySelector('.marca').remove();
  if (n && telas.length > 1) {
    post.insertAdjacentHTML('beforeend', `<div class="contador">${n}/${telas.length}</div>`);
  }
})();
