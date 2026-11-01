# KONPASU 2.0 – Qualitäts- und Darstellungsprüfung

## Tatsächlich ausgeführte Tests

- `node --check` für sämtliche JavaScript-Laufzeitdateien und den Service Worker: **bestanden**.
- Chromium-Simulation mit Breiten **320, 375, 390, 430, 768 und 1024 px**: **keine JavaScript-Laufzeitfehler und keine horizontale Dokumentüberbreite**.
- Trainingsplan: **97 Standardübungen** direkt vorhanden, **0 dauerhaft eingeblendete Übungsbilder**; Übungen lassen sich auswählen und ein Plan speichern.
- Suchfilter im Plan nach **Bankdrücken** reduziert die Treffer; Prescriptions (Sätze, Wiederholungen, Pausen, Supersatz) werden bei ausgewählter Übung sichtbar.
- Eigene Übung `Mein Kletterzug` in der frei benannten Kategorie `Klettern`: erstellt und im Übungstab angezeigt. Vorschau nur auf Klick: **bestanden**.
- Avatar: Inventar mit 15 Beispielen für die drei standardmäßig aktiven Ziele; einzelne illustrierte Inventarbilder laden erfolgreich.
- Artbook-Tab: 8 Bildtafeln vorhanden und geladen.
- Premium-Grafik-Bundle: **104 Bilder** vollständig eingebettet (1 Cover, 8 Artboards, 95 Item-Crops); keine externen Bilddienste benötigt.
- Prüffarben WCAG-Kontrastrechner: **12 wichtige Text-/Hintergrundpaare**, alle über 4,5:1. Dies ist ein repräsentativer Check, keine vollständige Zertifizierung aller Zustände.

## Grenzen

- Die Testumgebung blockiert direkte `file://`- und lokale HTTP-URLs. Der Browser-Test lud die **tatsächlich gelieferten JS/CSS-Dateien inline**, die Bilder für UI-Screenshots aus den Originaldateien bzw. dem Bündel. Deshalb ist **der HTTPS-Service-Worker-Offline-Neustart auf einem iPhone nicht nachgewiesen**.
- Nur die getesteten Abläufe sind abgedeckt, nicht jede mögliche Kombination; insbesondere sind keine Screenreader-, iOS-Safari- und Android-Realgerätetests durchgeführt.
- Inventarbilder sind aus bestehenden Anime-Übersichtsillustrationen sorgfältig ausgeschnitten und als 95 einzelne Preview-Karten aufbereitet. Die angelegte Ausrüstung am dynamischen Avatar verwendet weiterhin die 2D-SVG-Ebenen.
- Keine Cloud-Synchronisation, keine native Geräte-Health-Integration.

## Freigabeempfehlung

Als installierbaren **Beta-Designstand** verwenden. Vor jedem Update JSON-Backup; Offline-Test auf dem Zielgerät separat durchführen.
