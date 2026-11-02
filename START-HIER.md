# KONPASU 2.4.0 – vollständiges Upload-Paket

Stand: 02.11.2026. Alle Programmdateien und Originalbilder sind enthalten. Kein Patch und kein Build erforderlich. Diese ZIP enthält die Dateien direkt im Hauptverzeichnis: index.html liegt neben app.js und sw.js.

**Prüfstand:** 193 automatisierte Prüfungen erfolgreich, alle 45 gelieferten Originaldateien zuvor anhand ihrer Git-Blob-Hashes abgeglichen, 104 eingebettete Premiumbilder und alle Ressourcenreferenzen geprüft. Die ZIP wurde nach erneutem Entpacken vollständig getestet. Browser-/iPhone-/Upgradeabnahme ist noch offen, weil Chromium in der Arbeitsumgebung nicht startet. Das ist ein vollständiger Testkandidat, keine Zusicherung, dass jede Gerätefunktion fehlerfrei ist.

## Jetzt ansehen – sicherster einfacher Weg

1. ZIP auf einem Computer entpacken. Eine ZIP allein auf GitHub hochzuladen erzeugt keine App.
2. Für den ersten Test ein separates öffentliches Repository **KONPASU-Test** anlegen. Dein bestehendes KONPASU-Repository und seine App bleiben dabei bestehen.
3. Im Testrepository **Add file → Upload files** wählen. Die entpackten Dateien und Ordner ins Hauptverzeichnis hochladen: **index.html direkt oben**, nicht in einem zusätzlichen KONPASU-Ordner. Bei mehr als 100 Dateien in mehreren Uploads aufteilen: erst Dateien des Hauptverzeichnisses, dann docs, tests, scripts, tools und .github. Die versteckten Dateien .gitignore/.gitattributes sind Entwicklungshilfen, für den Appstart nicht erforderlich.
4. **Settings → Pages → Deploy from a branch → main → /(root) → Save.** Unter Actions den erfolgreichen Pages-Lauf abwarten. Deine Testadresse ist dann normalerweise https://rowlandolo.github.io/KONPASU-Test/.
5. Mit Testdaten Avatar, Belohnungen, Ziele und Training ansehen. Die Testadresse besitzt eigene lokale Daten; dein persönliches KONPASU-Profil erscheint dort nicht automatisch. Die Datei in tests/fixtures enthält ausschließlich synthetische Testdaten; sie niemals über dein persönliches Profil importieren.

## Bestehende App aktualisieren

1. Aktuelles vollständiges JSON-Backup aus der bisherigen App außerhalb der App sichern. Bestehende Homescreen-App und Website-Daten behalten.
2. Im ursprünglichen Repository einen Branch **preview/konpasu-24** anlegen. Dort dieselben vollständigen Dateien hochladen und einen Pull Request gegen main öffnen. Alte Originaldateien nicht vorab löschen.
3. Änderungen prüfen und freigeben; erst dann mergen. Pages muss für genau diesen Commit erfolgreich sein. Derselbe Repositoryname, dieselbe URL und derselbe Datenbankname bleiben wichtig für vorhandene lokale Daten.
4. https://rowlandolo.github.io/KONPASU/version.json und /KONPASU/update-check.html prüfen; erwartet sind 2.4.0 und konpasu-offline-v240. App bei Internetverbindung normal neu öffnen. Bei alter Anzeige zuerst Versionsdiagnose verwenden, keine PWA oder Website-Daten löschen.
5. Daten mit dem Backup vergleichen, neuen Eintrag speichern, erneut öffnen, danach offline testen. Konkrete Gerätefälle: docs/DEVICE_ACCEPTANCE.md.

Die alte Anzeige „1.8“ war im Originalcode fest eingetragen, obwohl das Originalarchiv 2.3.1 meldet. Diese Versionsanzeige ist jetzt zentralisiert und auch auf Englisch korrigiert. Eine alte Anzeige beweist allein nicht, welcher Code geladen ist.

## Was dieses Paket verändert

Modularer 2D-Avatar; überarbeitete Sammlung, Ausrüstungsübersicht, Begleiter, Favoriten und Ruhmeshalle; bessere Nachweis- und Obergrenzenregeln; gehärteter Start, Restore und Speicherkonflikte; ergänzte Exportdaten und Bedienhilfen. Details: docs/STATUS.md und docs/KNOWN_ISSUES.md.

Keine neue Datenbank-/Schemastruktur. Neue Bewertungsregeln können abgeleitete Erfolge und Tragbarkeit korrigieren; die Rohaufzeichnungen werden nicht umgeschrieben. Ein tatsächliches Upgrade jedes historischen 1.8-Datenformats ist nicht geräteabgenommen.

## Danach

1. Browser-/iPhone-/Offline-/Updatefälle abnehmen und konkrete Befunde korrigieren.
2. Historische Zieländerungen und Periodenwechsel prüfen.
3. Tragbarkeit nach Datenlücken verbindlich entscheiden, anschließend Sets/Inventar weiterentwickeln.
4. Mobile Bedienung, VoiceOver, Kontrast und DE/EN nach Sichtprüfung verbessern.
5. Erst auf stabiler Offlinebasis größere Trainings-, Coach- und Konto-/Sync-Funktionen planen.

**Weiterlesen:** docs/UPLOAD_GUIDE.md, docs/PAKET_PRUEFBERICHT.md, docs/ROADMAP.md. Alte VORSCHAU-PNGs und frühere Prüfberichte sind Originalmaterial, keine Screenshots oder Abnahme des aktuellen Standes. SHA256-Dateiliste: PAKETINHALT-SHA256.json (enthält alle Paketdateien außer sich selbst).
