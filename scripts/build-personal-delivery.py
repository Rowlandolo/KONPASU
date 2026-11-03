"""Rebuild only the delivery encoding; original generated PNG is never edited."""
import hashlib
import io
import json
from pathlib import Path
from PIL import Image, __version__ as pillow_version, features

root = Path(__file__).resolve().parents[1] / 'design/avatar'
manifest = json.loads((root / 'personal-variants-v11.json').read_text())
source, target = manifest['source'], manifest['delivery']
raw = (root / source['file']).read_bytes()
assert hashlib.sha256(raw).hexdigest() == source['sha256'], 'Original source changed'
image = Image.open(io.BytesIO(raw))
assert image.size == (source['width'], source['height'])
encoded = io.BytesIO()
image.save(encoded, format='WEBP', lossless=False, quality=target['quality'], method=target['method'], exact=True)
result = encoded.getvalue()
assert len(result) == target['bytes'] and hashlib.sha256(result).hexdigest() == target['sha256'], (
    f'Delivery differs; expected Pillow 12.3.0/libwebp 1.6.0, observed {pillow_version}/{features.version("webp")}. '
    'Review codec and pixel/alpha comparison before updating the manifest.'
)
(root / target['file']).write_bytes(result)
assert (root / source['file']).read_bytes() == raw
print(f'Personal delivery reproduced: {len(result)} bytes; original untouched; Pillow {pillow_version}/libwebp {features.version("webp")}')
