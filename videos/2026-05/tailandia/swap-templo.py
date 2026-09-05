"""Substitui a cena fraca do reel da Tailandia (balao sozinho no escuro, 10.6s-13.2s,
rotulo "Festival das Lanternas") por uma cena nova do TEMPLO BRANCO (Wat Rong Khun, Chiang Rai)
— reforca o roteiro que faltava (Chiang Rai) e troca a cena mais fraca do reel.

Estrategia cirurgica: corta o reel em A(0->10.6) + C(13.2->fim) e costura A + cena_templo + C.
Cena nova = foto real do Wat Rong Khun (Ken Burns, mesmo padrao do hook) + overlay no estilo das cenas.

Uso: python produto/videos/tailandia/swap-templo.py
"""
import pathlib, subprocess, json, urllib.parse
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent.resolve()
REPO = HERE.parent.parent.parent.resolve()
OVERLAY_HTML = REPO / 'produto/videos/_motor/overlay-cena.html'
FOTO = HERE / 'assets/templo-branco-chiangrai.jpg'
WORK = HERE / '_work'; WORK.mkdir(exist_ok=True)
REEL = HERE / 'exports/reel-tailandia.mp4'
OUT = HERE / 'exports/reel-tailandia.mp4'   # sobrescreve no final (via tmp)

# limites da cena a substituir (detectados por scene-detection)
T_INI, T_FIM = 10.6, 13.2
DUR = round(T_FIM - T_INI, 2)   # 2.6s
FPS = 30
N = int(round(DUR * FPS))       # frames da cena

# 1) overlay PNG transparente (logo + veu + pill "Templo Branco · Chiang Rai")
overlay_png = WORK / 'ov-templo.png'
data = {"ic": "🛕", "txt": "Templo Branco · Chiang Rai"}
hashv = urllib.parse.quote(json.dumps(data, ensure_ascii=False))
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1920}, device_scale_factor=1)
    pg.goto(OVERLAY_HTML.as_uri() + '#' + hashv)
    pg.wait_for_timeout(2500)  # fontes + logo
    pg.locator('.ov').screenshot(path=str(overlay_png), omit_background=True)
    b.close()
print('overlay ok:', overlay_png)

# 2) cena Ken Burns do templo + overlay -> cena-templo.mp4
cena = WORK / 'cena-templo.mp4'
vf = (
    f"[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,"
    f"zoompan=z='min(zoom+0.0008,1.10)':d={N}:"
    f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps={FPS},setsar=1[bg];"
    f"[bg][1:v]overlay=0:0[v]"
)
subprocess.run([
    'ffmpeg', '-y', '-loglevel', 'error',
    '-loop', '1', '-i', str(FOTO),
    '-i', str(overlay_png),
    '-filter_complex', vf, '-map', '[v]',
    '-t', str(DUR), '-r', str(FPS), '-pix_fmt', 'yuv420p',
    '-c:v', 'libx264', '-crf', '17', str(cena)
], check=True)
print('cena ok:', cena)

# 3) costura A + cena + C (concat FILTER, re-encode unico) -> tmp -> sobrescreve
tmp = WORK / 'reel-novo.mp4'
fc = (
    f"[0:v]trim=0:{T_INI},setpts=PTS-STARTPTS[a];"
    f"[1:v]trim=0:{DUR},setpts=PTS-STARTPTS[b];"
    f"[0:v]trim={T_FIM},setpts=PTS-STARTPTS[c];"
    f"[a][b][c]concat=n=3:v=1:a=0[v]"
)
subprocess.run([
    'ffmpeg', '-y', '-loglevel', 'error',
    '-i', str(REEL), '-i', str(cena),
    '-filter_complex', fc, '-map', '[v]',
    '-pix_fmt', 'yuv420p', '-c:v', 'libx264', '-crf', '18', str(tmp)
], check=True)

tmp.replace(OUT)
print('FIM ->', OUT)
