# PLAYBOOK — POST SOCIAL da Bendita

O criativo de pacote (`_modelo-pacote`) nasce da arte de um fornecedor e é **fiel ao que está lá**.
O **post social** é o contrário: nasce de uma ideia — uma dica, a cara da Josi, a fala de um cliente,
uma promoção. Aqui a gente **escreve**. Por isso o processo tem duas conferências dela: uma **antes**
(o que vamos fazer) e uma **depois** (o que ficou pronto).

---

## 1. O fluxo (é isto que não pode ser pulado)

```
Entrada          eu escrevo o card com o que entendi do pedido dela
   ↕             ela pede ajuste, eu corrijo o card — quantas voltas precisar
   ↓ ela move para Priorizado  =  "é isso, pode fazer"
Priorizado       o ateliê pega o card (trava 🔒) e começa
   ↓
Em desenvolvimento
   ↓             entrega no card: rascunho ao vivo + preview
Aprovação        ela olha. Não gostou? fala no card → volta para desenvolvimento
   ↓ ela move para Concluído  =  aprovado
Concluído        o robô gera a MÍDIA FINAL (PNG 1080 / MP4) e põe os links de download no card
```

1. **Material** — a Josi larga foto/print/texto em `rascunho/` (fora do git) e pede na sessão dela.
   Quem organiza é o Claude: nada fica solto, nada ela renomeia.
2. **Card primeiro, em Entrada.** Antes de desenhar qualquer coisa, escrever o card com **o que foi
   entendido**: objetivo, tipo, texto proposto, foto, formatos e a linha `Peça: B-0XX`. Ela lê e pede
   ajuste; o Claude **corrige o card** quantas vezes precisar. **Não se pergunta "é isso?"** — o sim
   dela é **mover o card para Priorizado**. Enquanto estiver em Entrada, não se produz nada.
3. **Rascunho em HTML.** Montar o post no motor (é HTML: mudar texto e cor custa segundos).
   Publicar (`npm run publicar` → https://logiccos.github.io/bendita-atelie-site) e entregar no card **os dois**:
   o **link do rascunho ao vivo** (ela abre no celular e vê a arte de verdade) e o **preview leve**
   (`scripts/preview-card.py`, para ela ver sem sair do card).
4. **Iterar** enquanto ela pedir ajuste. Cada rodada volta pro card — nunca só no WhatsApp.
5. **Ela move para Concluído** = aprovado. Aí o robô (`entrega-aprovada.py`) renderiza a **mídia
   final** — PNG 1080 nos formatos da peça, MP4 no caso de reel — e põe os **links de download** no
   card. É esse arquivo que ela posta.

> Regra de ouro: **nada de trabalho antes de Priorizado**, e **nada de mídia final antes de Concluído**.

---

## 2. Os tipos

| tipo | pra que serve | como monta |
|---|---|---|
| `conteudo` | dica, curiosidade, data comemorativa, erro comum | título forte + `itens` com check dourado |
| `autoridade` | foto da Josi, bastidor, "quem é a Bendita" | foto dela + `assinatura`; bom com `duotone` |
| `depoimento` | fala de cliente que já viajou | bloco `depoimento` sobre foto do destino, `veu-total` |
| `carrossel` | lista/passo a passo de 3 a 8 telas | `telas: [...]` — capa vende, miolo entrega, última chama |
| `promo` | oferta pontual (sem arte de fornecedor) | bloco `preco` + foto do destino |

Escolha do formato: **4:5 é o principal** (feed). `9:16` para stories/status. `1:1` só quando ela pedir.
Carrossel é sempre 4:5.

---

## 3. A ficha (`dados.js`)

Uma ideia por post. Campos em `_modelo-social/dados.js`, com comentário em cada um. Os três formatos
leem a **mesma** ficha — não existe "arrumar só no stories".

- `titulo` aceita `<br>` (quebra onde você quer) e `<em>trecho</em>` (pinta de **dourado**).
  Pinte só **uma** coisa: o destino, o número, a palavra que vende.
- `tituloCurto: true` = fonte maior, para título de 1–2 palavras.
- `itens` = no máximo **3 ou 4**; cada um cabe em uma linha.
- `cta` vazio tira o botão (tela de miolo de carrossel não precisa de CTA).

## 3.1. De onde vem a imagem (o pedido dela NÃO limita o material)

O que a Josi manda é o **ponto de partida**, não a fronteira do post. Se ela mandou uma foto, ela
entra na frente; se não mandou nada — ou o que mandou não sustenta a peça — o ateliê completa. Ordem:

1. **O que ela mandou** (`rascunho/`) — foto dela, print do cliente, texto.
2. **Acervo** `input/drive` e `input/canva` — vídeo/foto real do destino (conferir o CONTEÚDO, não o nome).
3. **Banco profissional** (Pexels/Unsplash) — foto que **gera desejo**, uso comercial livre.
4. **IA**, só em último caso, e nunca para fingir foto de cliente, de viagem feita ou da própria Josi.

Vale também **propor**: pauta da semana, ideia de carrossel, aproveitar data comemorativa ou um
destino do acervo que está parado. Post sugerido segue o mesmo caminho — card com o entendimento,
"é isso?" dela, rascunho, ✅.

**Uma coisa é intocável**: pessoa e fala. Foto da Josi e depoimento de cliente só com o que ela
mandou ou confirmou — aí sim o material dela é o limite.

## 4. Tratamento da foto (`tratamento`)

| valor | quando usar |
|---|---|
| `veu-baixo` | padrão: texto embaixo, foto respira em cima |
| `veu-topo` | quando o assunto da foto está embaixo |
| `veu-total` | texto no centro, ou foto “poluída” que precisa sumir um pouco |
| `duotone` | foto fraca/amadora vira arte (teal da marca por cima) — ótimo p/ foto da Josi |
| `cartao` | foto em cima + painel sólido embaixo: melhor caso para texto longo/lista |
| `limpo` | só quando a foto já tem área vazia perfeita para o texto |

Ajuste o enquadramento em `fotoPos` (`center 30%` puxa pro rosto). Foto de gente: nunca corte a testa.

## 4.1. O canvas É o post (tamanho e nada de firula)

A arte tem o tamanho exato do que vai ao ar: **1080x1350** (4:5), **1080x1920** (9:16),
**1080x1080** (1:1). O que estiver dentro do `.post` **vai no PNG** — então nada de canto
arredondado, sombra, moldura, "mockup de celular" ou enfeite que não vai existir quando a
Josi postar. Enfeite de tela fica fora do `.post` (no fundo da página de rascunho), nunca dentro.

Pelo mesmo motivo: respeitar a **área segura** (o stories tem UI do app em cima e embaixo — por
isso `--pad-topo`/`--pad-baixo` maiores no 9:16) e não encostar texto na borda.

## 4.2. Conferir com o OLHO antes de entregar (obrigatório, imagem e vídeo)

Nunca entregar peça que não foi vista renderizada. Código sem erro não quer dizer arte certa:
logo que não carregou, fonte que caiu para a do sistema, texto batendo na borda, foto cortada
no rosto — nada disso aparece no HTML, só na imagem.

```bash
python scripts/conferir.py produto/posts/<slug>    # arte: abre no navegador, denuncia 404/imagem
python scripts/conferir.py produto/videos/<slug>   # reel: tira 5 frames ao longo do vídeo
python scripts/conferir.py --site                  # o site publicado inteiro
```

O script salva os prints em `conferencia/` — **e aí o Claude OLHA cada um**, um por um, antes de
mandar para a Josi. Vale para **qualquer** peça: imagem, carrossel (todas as telas) e vídeo (os
frames). Se o script acusar algo, não existe entrega: resolve e roda de novo.

Checklist do olho, além do que o script pega: logo no lugar, preço legível, texto sem viúva no
fim da linha, rosto não cortado, área segura respeitada no 9:16, e o post **fazendo sentido sem som**.

## 4.3. O ateliê trabalha por mês

A galeria (https://logiccos.github.io/bendita-atelie-site) agrupa os criativos **por mês**, do mais recente
para o mais antigo — é o calendário de social media da Bendita. Para o post cair no mês certo,
preencher `data: "AAAA-MM-DD"` na ficha (a data em que ele vai ao ar); sem isso ele cai no mês do
arquivo. O material bruto também entra por mês: `rascunho/AAAA-MM/`.

## 5. Texto — o que vale e o que não vale

- **Uma ideia por post.** Se tem duas, são dois posts (ou um carrossel).
- Fala de gente: frase curta, sem jargão de agência ("condições imperdíveis", "consulte-nos").
- **Nada de inventar fato** — data, preço, regra de bagagem, o que está incluso: só o que a Josi
  confirmou. Na dúvida, pergunta no card antes.
- Preço, quando aparecer, segue a regra do pacote: **parcelado por pessoa** (ver `CLAUDE.md`).
- Português revisado: acento certo, "hotel" sem circunflexo, sem ALL CAPS gritado.
- Sem "Protect Travel", sem selo/firula de fornecedor.

## 6. Comandos

```bash
python scripts/novo-social.py <slug> --tipo conteudo   # cria a pasta e a ficha
python scripts/export-imagem.py produto/posts/<slug>   # 4:5, 9:16 e 1:1 (PNG 1080, 2x)
python scripts/export-carrossel.py produto/posts/<slug># uma PNG por tela
python scripts/preview-card.py produto/posts/<slug>    # JPEG leve + markdown pronto pro card
```

Para ver o rascunho antes de exportar: abrir o `.html` no navegador (carrossel: `carrossel-4x5.html?t=2`).

## 7. Exemplos prontos (é daqui que se copia)

`_exemplo-conteudo` · `_exemplo-autoridade` · `_exemplo-depoimento` · `_exemplo-carrossel` —
cada um com a ficha preenchida e o preview em `previews/`.
