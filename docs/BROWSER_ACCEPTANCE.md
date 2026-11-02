# Ausführbarer Browser-Prüflauf

Status 02.11.2026: vorbereitet, noch nicht im Browser bestanden. Die Quellcodeprüfungen bestehen; sie sind kein Gerätefreigabebeleg.

## Aktueller Befund

- System-Chromium startet nicht: Crashpad `setsockopt: Operation not permitted`, Prozess endet mit SIGTRAP. Keine Umgehung dieser Beschränkung.
- Die fehlenden Originaldateien wurden aus der Nutzer-ZIP ergänzt. Der Preflight ist jetzt vollständig grün; der tatsächliche Browserlauf bleibt wegen des gesperrten Chromiumstarts mit leerer Prüfliste blockiert.
- WebKit-Engine wurde nicht gestartet; ein emulierter Mobile-Viewport wäre kein echtes iPhone. Safari/PWA/VoiceOver und Upgrade verbleiben in DEVICE_ACCEPTANCE.md.

## Ausführung nach Ergänzung des vollständigen Checkouts

Node 22 und optional Playwright ausschließlich als Entwicklungswerkzeug installieren:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium webkit
node scripts/check.cjs
node scripts/browser-check.cjs --run --engine chromium --output browser-results/chromium
node scripts/browser-check.cjs --run --engine webkit --output browser-results/webkit
```

Diese Befehle sind auf einem freigegebenen Entwicklerrechner auszuführen. Sie sind in dieser Sitzung nicht erfolgreich im Browser ausgeführt worden. Für einen vorhandenen kompatiblen Systembrowser kann KONPASU_BROWSER_EXECUTABLE als Pfad gesetzt werden; Browser-/Systemrichtlinien nicht umgehen.

Ohne `--run` prüft das Skript nur die Dateivollständigkeit. Auch ein erfolgreicher Preflight ist keine Browserabnahme. Exitcode 1 und report.json dokumentieren fehlende Voraussetzungen oder Fehler. Das Skript akzeptiert keine fremde/deployte Ziel-URL: Es startet einen lokalen Server an zufälligem Loopbackport und verwendet ausschließlich einen neuen nicht persistenten Browserkontext.

## Automatisierbarer Umfang

- Echte App-Skripte und Worker, keine DOM-/Storage-Doubles. Feste Testzeit 02.11.2026 12:00 UTC, Europe/Berlin; keine Sommerzeitabnahme.
- Backupabbruch, kaputte Unterstruktur und bestätigte Wiederherstellung über tatsächlichen Datei-Input. Nur tests/fixtures/browser-synthetic.json, keine persönlichen Daten.
- Wiederöffnung über echte IndexedDB, konservativer Alkoholkonflikt, reale Navigation DE/EN bei 320/390/430/768/1280 px, horizontaler Überlauf und Screenshots. Screenshots brauchen zusätzlich menschliche Sichtprüfung.
- Zwei Tabs mit echten IndexedDB-Saves und Revisionskonflikt. Diese Saves werden gezielt programmatisch angestoßen; kein vollständiger Trainingseingabe-E2E-Test.
- Neuer Tab und Save/Reload bei simuliertem Browser-Offline, tatsächlicher Service Worker und Cache. Kein Betriebssystem-/iOS-Flugmodus und kein Prozess-Kaltstart.
- JSON-Download mit Datenerhalt und Prüfung ungefangener Browserfehler.

Der Server liefert nur deklarierte App-Dateien und Bildassets; Repositoryinterna, beliebige Backups, Traversal und ausbrechende Symlinks werden abgewiesen. Keine bestehenden Profile oder Datenbanken werden gelöscht. Die neue Testcontext-Sitzung wird am Ende geschlossen.

## Aktueller Quellcodetest

Acht weitere automatisierte Prüfungen sichern Dateivollständigkeit, leere Abhängigkeiten, Hashbelege, Pfadgrenzen, externe Zielverweigerung und Importierbarkeit der Testdatei ab. Mit sechs ergänzten Vollpaketprüfungen insgesamt 193 Quellcode-/VM-/Preflight-/Integritätsprüfungen erfolgreich. Der ausführbare Browserteil bleibt ausdrücklich unbestätigt.
