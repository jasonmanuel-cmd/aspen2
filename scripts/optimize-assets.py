"""Generate responsive WebP copies; retain the original source photographs and PDFs."""
from pathlib import Path
from urllib.parse import quote, unquote
from PIL import Image, ImageOps
import re, json, hashlib

ROOT = Path(__file__).resolve().parents[1]
assets = ROOT / 'assets/images'
assets.mkdir(parents=True, exist_ok=True)
mapping = {}
manifest_path = ROOT/'assets/image-manifest.json'
previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
for source in sorted((ROOT / 'house').rglob('*')):
    if source.suffix.lower() not in ('.png', '.jpg', '.jpeg'): continue
    relative = source.relative_to(ROOT).as_posix()
    im = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    stem = re.sub(r'[^a-z0-9]+', '-', source.stem.lower()).strip('-')
    quality = 76 if source.name == 'sunsetoutside.jpg' else 84
    stem += '-' + hashlib.sha256(source.read_bytes()+relative.encode()+f'webp-{quality}-thumb76-v2'.encode()).hexdigest()[:8]
    widths = sorted({min(w, im.width) for w in (480, 960, 1600)})
    variants = []
    for width in widths:
        filename = f'{stem}-{width}.webp'
        resized = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
        variant_quality = min(quality, 76) if source.stem.lower().replace('_', ' ') == 'tranquil oasis' and width <= 960 else quality
        resized.save(assets / filename, 'WEBP', quality=variant_quality, method=6, lossless=source.parent.name == 'blueprints')
        variants.append((width, 'assets/images/' + filename))
    mapping[quote(relative, safe='/')] = {'src': variants[-1][1], 'srcset': ', '.join(f'{path} {w}w' for w,path in variants), 'width': im.width, 'height': im.height}

logo = Image.open(ROOT / 'aspen2-mark.png').convert('RGB')
logo.resize((84,84), Image.Resampling.LANCZOS).save(assets / 'aspen2-mark.webp', 'WEBP', quality=90)
for name in ('index.html','floor-plans.html','financing.html','contact.html'):
    path = ROOT / name
    content = path.read_text(encoding='utf-8')
    aliases = {original:item for original,item in mapping.items()}
    for original, old in previous.items():
        if original in mapping: aliases[old['src']] = mapping[original]
    def replace_image(match):
        tag = match[0]
        src = re.search(r'src="([^"]+)"', tag)
        if not src: return tag
        if src[1] == 'aspen2-mark.png': return tag.replace(src[1], 'assets/images/aspen2-mark.webp')
        item = aliases.get(src[1])
        if not item: return tag
        tag = re.sub(r'\s(?:width|height|(?:data-opening-|data-)?srcset|sizes|decoding)="[^"]*"', '', tag)
        tag = tag.replace(src[1], item['src'])
        existing_sizes = re.search(r'sizes="([^"]+)"', match[0])
        sizes = existing_sizes[1] if existing_sizes else ('100vw' if 'fetchpriority="high"' in tag or name == 'index.html' else '(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw')
        if 'blueprint' in tag.lower(): sizes = '(max-width: 960px) 100vw, 900px'
        srcset_attribute = 'data-opening-srcset' if 'data-opening-src=' in tag else ('data-srcset' if 'data-src=' in tag else 'srcset')
        return tag[:-1] + f' width="{item["width"]}" height="{item["height"]}" {srcset_attribute}="{item["srcset"]}" sizes="{sizes}" decoding="async">'
    content = re.sub(r'<img\b[^>]*>', replace_image, content)
    for original,item in aliases.items():
        # Lightbox requests a full-size optimized image; preload uses the same responsive candidates as the hero.
        content = content.replace('"src": "'+original+'"', '"src": "'+item['src']+'"')
        content = re.sub(r'<link\b[^>]*href="'+re.escape(original)+r'"[^>]*>', lambda m: re.sub(r'imagesrcset="[^"]*"','imagesrcset="'+item['srcset']+'"',m[0].replace(original,item['src'])), content)
        content = content.replace('href="'+original+'" type="image/jpeg"', 'href="'+item['src']+'" type="image/webp" imagesrcset="'+item['srcset']+'" imagesizes="100vw"')
    path.write_text(content, encoding='utf-8')
(ROOT/'assets/image-manifest.json').write_text(json.dumps(mapping,indent=2),encoding='utf-8')
print(f'Optimized {len(mapping)} source images into {len(list(assets.glob("*.webp")))} responsive files.')
