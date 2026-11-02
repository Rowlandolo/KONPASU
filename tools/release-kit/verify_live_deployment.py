#!/usr/bin/env python3
"""Read-only HTTP verification of GitHub Pages KONPASU 2.4 public deployment."""
import json
import sys
import urllib.request
import urllib.parse
import time

BASE='https://rowlandolo.github.io/KONPASU/'
CHECK={
    'version.json': ('"version"', '"2.4.0"'),
    'index.html': ('2.4.0-layered-avatar', 'avatar-composer-v24.js', 'avatar2d.js'),
    'sw.js': ('konpasu-offline-v240', "'./avatar-composer-v24.js'"),
    'avatar-composer-v24.js': ('KONPASU_COMPOSER_V24', 'kp24-stage'),
    'avatar2d.js': ('function graphicBlueprint(', 'KONPASU_COMPOSER_V24', 'function mkButton(', 'function displayTier(', 'function KPBackgroundControls('),
}

def verify():
    errors=[]
    stamp=int(time.time())
    for path, needles in CHECK.items():
        url=BASE+path+'?release_check='+str(stamp)
        try:
            req=urllib.request.Request(url,headers={'Cache-Control':'no-cache','Pragma':'no-cache','User-Agent':'KONPASU-deployment-check/2.4'})
            with urllib.request.urlopen(req,timeout=15) as response:
                text=response.read(1_000_000).decode('utf-8')
                if response.status!=200:raise RuntimeError(f'HTTP {response.status}')
            missing=[s for s in needles if s not in text]
            if missing:errors.append(f'{path}: fehlend: {missing}')
            print(f'{path}: '+('OK' if not missing else 'NICHT OK'))
            if path=='version.json' and not missing:
                v=json.loads(text)
                if v.get('version')!='2.4.0' or v.get('cache')!='konpasu-offline-v240':
                    errors.append(f'version.json: inkonsistent: {v}')
        except Exception as exc:
            errors.append(f'{path}: {exc}')
            print(f'{path}: FEHLER')
    if errors:
        print('\nDEPLOYMENT NICHT FREIGEBEN:')
        for x in errors:print('-',x)
        return False
    print('\nOK: GitHub Pages liefert 2.4.0 und alle kritischen Avatar-/Cache-Dateien.\nOfflinetest und Prüfung persönlicher Daten auf dem iPhone bleiben notwendig.')
    return True

if __name__=='__main__':sys.exit(0 if verify() else 1)
