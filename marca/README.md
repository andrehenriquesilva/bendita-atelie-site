# Marca — Bendita Tour

Identidade visual da agência, espelhada de `benditatour.com` e estendida para criação de mídia (imagens e vídeos).

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `--teal` | `#4A9B9F` | Cor principal da marca |
| `--teal-dark` | `#3A7D80` | Hover, fundos profundos |
| `--teal-light` | `#E0F2F2` | Fundos claros, chips, eyebrow |
| `--navy` | `#14323B` | Texto sobre claro, fundos sólidos |
| `--ink` | `#0E1E24` | Véus e sombras (quase-preto azulado) |
| `--sand` / `--paper` | `#F6EEDD` / `#FBFAF6` | Creme / fundo claro |
| `--sun` | `#F2B705` | Dourado — preço, selo, destaque |
| `--sunset` | `#F2724B` | Coral — promoção / urgência |
| `--wpp` | `#20BD5A` | Verde WhatsApp — botão CTA |

## Tipografia

- **Corpo:** Montserrat (400/600/700/800/900) — mesma do site
- **Headline elegante:** Playfair Display (700/900) — toque editorial de viagem

## Como usar

Todo HTML de arte importa os tokens com:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../../marca/marca.css">
```

`marca.css` já traz utilitários prontos: `.veil-top`, `.veil-bottom`, `.eyebrow`, `.price-chip`, `.cta-wpp`.

## Princípio de produção (igual ao projeto batatas)

> **A IA gera só a FOTO PURA** (destino, hotel, navio — sem texto, sem logo).
> **Toda tipografia, preço, selo e CTA entram via HTML/CSS** por cima, usando estes tokens.

Logo / ícone: `assets/` (copiar de `benditatour/ICONE.webp`).
