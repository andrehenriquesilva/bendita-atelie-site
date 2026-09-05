# Playbook — criar criativo de pacote da Bendita

Mecanismo data-driven: o `stories-9x16.html` se monta sozinho a partir da ficha `dados.js`.
Para cada novo pacote, só preencho a ficha (seguindo as regras abaixo), gero a foto e renderizo.

## Fluxo (quando o cliente manda um pacote)
1. **Ler** a arte do fornecedor (jpeg/pdf).
2. **Extrair** seguindo as REGRAS abaixo → preencher `dados.js`.
3. **Imagem/vídeo do destino — SEMPRE buscar no ACERVO PRIMEIRO** (regra de ouro):
   a) `input/drive/**` — vídeos reais por destino (BASE REELS ...). Frame icônico via
      `ffmpeg -ss <t> -i video.mp4 -frames:v 1 -q:v 2 assets/<destino>.jpg`. Cuidado: alguns
      trechos têm texto do template original embutido — escolher frame LIMPO.
   b) `input/canva/**` — PNGs dos designs. ATENÇÃO: muitas fotos vêm com MARCA D'ÁGUA "Canva"
      (stock premium não licenciado) → NÃO usar essas como base.
   c) Só gerar IA se NÃO houver material real adequado:
      `OPENAI_API_KEY=... python scripts/gerar-foto-ia.py "<prompt, sem texto/logo>" produto/posts/<slug>/assets/destino.png 1024x1536`
4. **Renderizar**: `python scripts/export-imagem.py produto/posts/<slug>`
5. (Opcional) **Reel**: base em vídeo do acervo + overlay (ver `produto/videos/disney-paris/`).

Atalho para começar um novo: `python scripts/novo-criativo.py <slug>` (copia este modelo).

## REGRAS DE EXTRAÇÃO (inegociáveis)
- **Fidelidade total**: só escrever o que está LITERALMENTE na arte. Nunca inventar
  descrições, qualificadores ("a atração mais nova") nem promover sub-itens a itens.
- **NUNCA anunciar o aéreo isolado** (ex: "De R$ 9.854 / Por R$ 7.168"). É composição
  interna. O preço que vende é o **parcelado do pacote por pessoa** (ex: 12x R$ 1.035).
- **NUNCA incluir "Protect Travel"** — preferência do cliente, não anunciar.
- **Descartar firula do fornecedor**: selos ("Maio Imperdível"), sorteios/brindes
  ("Copa 2026"), e toda a identidade visual do fornecedor.
- **Termos certos**: "Pacote Completo" (aéreo+hotel+passeios) ≠ "Tudo Incluído"/all-inclusive.
- **Destaque (`destaque`)**: usar para o "uau" do pacote (ingressos, all-inclusive, etc.),
  com as sub-linhas exatas da arte.
- **Grade par**: deixar `inclusoes` com nº par (2,4,6) para a grade 2 colunas fechar simétrica.
- **Descrição (`d`)**: só preencher se for informação literal da arte; senão, omitir.
- **Preço**: mostrar o parcelado + **taxas** (ex: "12x R$ 1.035 · + taxas R$ 712"). NÃO mostrar o "Total" (o cliente prefere sem).
- **Múltiplos hotéis**: usar o campo `hoteis: [{nome, parc, valor}]` na ficha → o motor renderiza o bloco "Escolha seu hotel" com cada opção e preço (no lugar do preço único). Ex: Gramado (3 hotéis). Enxugar as `inclusoes` (2 itens) p/ caber.
- **PORTUGUÊS**: revisar grafia/acentos. "Hotel" em pt NÃO tem circunflexo (não usar a grafia francesa "Hôtel"). Adaptar nomes estrangeiros ao pt-br do público.
- **Imagem fixa vs vídeo**: a imagem (capa parada) precisa comunicar o TEMA na hora. Se o acervo real não tem o clima (ex: Natal Luz noturno, mas o vídeo de Gramado é diurno), gerar uma IA TEMÁTICA caprichada e específica SÓ para a imagem; o reel mantém as cenas reais em movimento. Ex: Gramado (imagem = IA árvore de Natal iluminada; reel = vídeo real diurno).

## PADRÃO DE REEL (vídeo) — ESTRUTURADO (boas práticas 2025/26)
Estrutura validada (retém melhor que "vídeo parado + card"):
```
0–2,6s  HOOK    cena forte + texto-gancho GRANDE no topo (Playfair) + logo
2,6–5s  cena 2  + legenda benefício 1 (chip teal, ✈️)
5–7,5s  cena 3  + legenda benefício 2 (🎭)
7,5–10s cena 4  + legenda benefício 3 (📅)
10–15s  CARD    = a arte stories-9x16.png (oferta + preço + CTA)
```
Regras: hook em ≤3s · cortes ~2,5s (momentum) · texto no TOPO (rodapé a UI cobre) ·
5–8 palavras por legenda · 1080x1920 · ~14s · SEM áudio (cliente põe trending audio no app).
A cena de datas (📅) SEMPRE inclui a ORIGEM/aeroporto: ex "5 dias · saindo de SP (CGH)".
Com **múltiplos hotéis**: cena dedicada (overlay `tipo:'hoteis'`) listando os NOMES como chips, título
"3 opções de hotel". Dizer "opções de hotel" (não "3 hotéis"). Nomes de hotel vendem — mencioná-los.
**Taxas no reel = mesma regra da imagem**: na cena de oferta, taxa SEPARADA → "+ taxas"; taxa
INCLUSA → não mencionar. **Sempre `setsar=1`** nas cenas e no concat (senão o vídeo sai distorcido).
- **Cenas**: trechos de 2,6s do vídeo do acervo (`input/drive`), frames LIMPOS (sem texto do template).
- **Overlays de texto**: `produto/videos/_motor/overlay-cena.html` (data-driven via `location.hash`,
  identidade Bendita). Renderizar PNG transparente com Playwright esperando `wait_for_function`
  (o JS preenche o DOM — senão o PNG sai sem texto).
- **Compor**: aplicar cada overlay na sua cena (`overlay=0:0`) e juntar com **concat FILTER**
  (`[0:v]...[4:v]concat=n=5:v=1`) — NUNCA concat demuxer no Windows (paths `/c/...` quebram).
- Quando NÃO houver vídeo do destino: Ken Burns na foto + card (fallback). Limpar `_*` ao final.
- **Ken Burns sem distorção**: SEMPRE `scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840`
  (base já 9:16) ANTES do `zoompan=...:s=1080x1920`. NUNCA mandar imagem de outro aspecto direto pro
  `s=` do zoompan — ele estica pro tamanho de saída e a foto sai achatada/distorcida.

## Identidade (já no template)
Teal `#4A9B9F` + dourado `#F2B705` (preço/checks) + branco + verde só no CTA WhatsApp.
Fontes Playfair (display) + Montserrat. Logo branco, ícone WhatsApp oficial (SVG).
Ver `marca/identidade-oficial/`.
