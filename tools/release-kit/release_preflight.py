#!/usr/bin/env python3
"""Verify a downloaded KONPASU main snapshot matches the reviewed release baseline.

Read-only. The SHA1 below is Git's blob hash, not a conventional raw SHA1.
"""
from pathlib import Path
import hashlib
import json
import sys

# GitHub live repository main verified 2026-11-02; commit 444bdb3981ccc03c550fb402c2cca9e45ad8a46a
EXPECTED = {
    'app.js': '4f77b80e681a85c67039ea7e62b31538e082f13a',
    'avatar2d.js': '5021af9330f4258b572f92989b20f04ad8ec8a11',
    'app.css': '0f036694b1ed5278c28002a3d9962ac453039096',
    'index.html': 'f4ed2d6b39a2517643387bdebb8073f0f550a1da',
    'sw.js': '6320b51878023aa1d2598a89d41292c634afc224',
    'version.json': '9d8f5ca1a419a100a31836df41937f486c8e582e',
}

def git_blob_sha(data):
    return hashlib.sha1(f'blob {len(data)}\0'.encode()+data).hexdigest()

def verify(root):
    root=Path(root)
    issues=[]
    for name, expected in EXPECTED.items():
        f=root/name
        if not f.is_file():
            issues.append(f'{name}: fehlt')
            continue
        actual=git_blob_sha(f.read_bytes())
        print(f'{name}: '+('OK' if actual==expected else f'ABWEICHUNG (SHA {actual})'))
        if actual != expected:issues.append(f'{name}: vom geprüften Commit abweichend')
    if issues:
        print('\nSTOPP: Diese Kopie entspricht nicht dem geprüften GitHub-Stand. Die sechs Code-Dateien nicht unbesehen ersetzen.'); print('\n'.join(issues))
        return False
    print('\nOK: alle sechs Dateien entsprechen dem geprüften Stand von main (Commit 444bdb3981ccc03c550fb402c2cca9e45ad8a46a).')
    print('Der Code ist geprüft, persönliche App-Daten sind damit noch NICHT gesichert!')
    return True

if __name__ == '__main__':
    if len(sys.argv)!=2:
        print('Aufruf: py release_preflight.py "C:\\Pfad\\zu\\KONPASU-main"')
        sys.exit(2)
    sys.exit(0 if verify(sys.argv[1]) else 1)
