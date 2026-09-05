# Playbook — criar criativo de pacote da Bendita

Mecanismo data-driven: o `stories-9x16.html` se monta sozinho a partir da ficha `dados.js`.
Para cada novo pacote, só preencho a ficha (seguindo as regras abaixo), gero a foto e renderizo.

## Fluxo (quando o cliente manda um pacote)
1. **Ler** a arte do fornecedor (jpeg/pdf).
2. **Extrair** seguindo as REGRAS abaixo → preencher `dados.js`.
3. **Foto pura** do destino: gerar via IA
   `OPENAI_API_KEY=... python scripts/gerar-foto-ia.py "<prompt cena, sem texto/logo>" produto/posts/<slug>/assets/destino.png 1024x1536`
   ou usar material de `input/drive` / `input/canva`.
4. **Renderizar**: `python scripts/export-imagem.py produto/posts/<slug>`
5. (Opcional) **Reel**: base em vídeo do acervo + overlay (ver `produto/videos/disney-paris/`).

Atalho para começar um novo: `python scripts/novo-criativo.py <slug>` (copia este modelo).

## REGRAS DE EXTRAÇÃO (inegociáveis)
- **Fidelidade total**: só escrever o que está LITERALMENTE na arte. Nunca inventar
  descrições, qualificadores ("a atração mais nova") nem promover sub-itens a itens.
- **NUNCA anunciar o aéreo isolado** (ex: "De R$ 9.854 / Por R$ 7.168"). É composição
  interna. O preço que vende é o **parcelado do pacote por pessoa** (ex: 12x R$ 1.035).
- **Descartar firula do fornecedor**: selos ("Maio Imperdível"), sorteios/brindes
  ("Copa 2026"), e toda a identidade visual do fornecedor.
- **Termos certos**: "Pacote Completo" (aéreo+hotel+passeios) ≠ "Tudo Incluído"/all-inclusive.
- **Destaque (`destaque`)**: usar para o "uau" do pacote (ingressos, all-inclusive, etc.),
  com as sub-linhas exatas da arte.
- **Grade par**: deixar `inclusoes` com nº par (2,4,6) para a grade 2 colunas fechar simétrica.
- **Descrição (`d`)**: só preencher se for informação literal da arte; senão, omitir.

## Identidade (já no template)
Teal `#4A9B9F` + dourado `#F2B705` (preço/checks) + branco + verde só no CTA WhatsApp.
Fontes Playfair (display) + Montserrat. Logo branco, ícone WhatsApp oficial (SVG).
Ver `marca/identidade-oficial/`.
