# Identidade Oficial — Bendita Tour

Material de marca consolidado, coletado do **Manual da ID** (`TIPOGRAFIA.ai/.pdf`), do kit
`Downloads/ALTERAÇÃO` e do repositório do site (`benditatour/`).

## Logo
Símbolo: **globo + avião decolando com rastro**, sobre teal. Wordmark "**BENDITA TOUR**" +
tagline "**ASSESSORIA E VIAGENS**".

Versões em `logotipos/` (cada uma em `.ai` editável, `.pdf` e `.jpg` preview):
| Arquivo | Uso |
|---|---|
| `PRINCIPAL` | logo completo (símbolo + nome + tagline) |
| `SECUNDARIO` | versão alternativa / horizontal |
| `SUBMARCA` | variação reduzida |
| `ICONE` | só o símbolo (globo + avião) — avatar, favicon, selo |
| `LOGOTIPOS VETORIZADAS` | todas vetorizadas (12 págs) |

## Paleta de cor
Fonte: Manual da ID + `tailwind.config.js` do site. Ver `paleta/swatch-paleta.png` e `paleta/bendita-paleta.css`.

| Cor | Hex | Uso |
|---|---|---|
| **Teal (web)** | `#4A9B9F` | principal — fundos, marca |
| Teal (print/manual) | `#37AAAA` | equivalente em impressos |
| Teal dark | `#3A7D80` | hover, fundos profundos |
| Teal light | `#E0F2F2` | fundos claros, chips |
| Ink (preto) | `#1D1D1B` | texto, veladuras |
| Cinza | `#E6E6E6` | linhas, divisores |
| Branco | `#FFFFFF` | logo sobre teal, respiro |
| Dourado* | `#F2B705` | preço / selo (apoio p/ artes) |
| Coral* | `#F2724B` | promoção / urgência (apoio) |
| WhatsApp* | `#20BD5A` | CTA (apoio) |

\* Cores de apoio (não estão no manual; usar só em artes promocionais).

## Tipografia
| Papel | Fonte oficial | Aproximação web (fallback) |
|---|---|---|
| Display / logo / headline | **Safira March** (Personal Use) | Playfair Display |
| Corpo / tagline / texto | **Mont** (ExtraLight) | Montserrat |

> O manual usa Safira March + Mont. Como são fontes de uso restrito/demo, na web caímos
> para **Playfair Display + Montserrat** (par visualmente fiel).

## Estrutura da pasta
```
identidade-oficial/
├── logotipos/        PRINCIPAL · SECUNDARIO · SUBMARCA · ICONE · vetorizadas (.ai/.pdf/.jpg)
├── tipografia/       TIPOGRAFIA.ai/.pdf (Manual da ID)
├── marca-dagua/      M1–M12.png (marcas d'água prontas p/ sobrepor)
├── digitais/         anúncios feed/stories, assinatura, capa LinkedIn, destaques, wallpapers
├── impressos/        cartão, envelopes, pasta, pattern, timbrado
├── paleta/           bendita-paleta.css + swatch-paleta.png
└── referencias-web/  tailwind.config.js, styles.css, ICONE.webp (do site)
```

## ⚠️ Divergência a resolver
O `marca/marca.css` (usado pelos templates de criação) define tipografia como
**Montserrat + Playfair Display** e a paleta teal — o que é coerente como aproximação web,
mas o manual oficial é **Mont + Safira March**. Recomendo alinhar o `marca.css` (ou
documentar que é a versão web). Cores conferem (`#4A9B9F`).
