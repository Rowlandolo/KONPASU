# Rewardaudit – Schwellen, Zuordnungen und permanente Historie

Stand: lokaler Reviewkandidat, 02.11.2026. Ausführbarer Beleg: tests/reward-audit.cjs; versionierte 95er-Matrix: REWARD_MAPPING.json. Das ist eine Code-/Logikprüfung, keine visuelle Abnahme aller Illustrationen oder echte Geräteabnahme.

## Bestätigte Regeln

Alle 19×5 Zuordnungen wurden mit den echten Assessment-/Wochen-/gearTier-/itemState-Funktionen gegen synthetische Tages- und Wochennachweise geprüft. Die Uhr ist im Test auf 02.11.2026 fixiert. Für jede der 95 Belohnungen wird direkt unterhalb und exakt an ihrer Schwelle geprüft: kein Besitz vorher, Besitz und Tragbarkeit bei ausreichendem belegtem Fortschritt; erwarteter Slot/Familie aus der archivierten Matrix und vorhandenes SVG. Die Schwellen bleiben unverändert 1/4/12/26/52 erfolgreiche abgeschlossene Wochen.

Die Testdaten bilden entsprechend konfigurierte Zielmetriken ab. Ernährung und Alkohol erhalten ausschließlich im Test einen expliziten Wochenzielwert; die App-Defaults und Nutzerziele werden NICHT geändert. Dieser Test bestätigt nicht, dass die unkonfigurierten Defaults bereits einen durchgängigen Rewardpfad anbieten.

Weitere Szenarien: jüngere unbekannte Wochen entwerten verdiente Ausstattung nicht; vier vollständig dokumentierte verfehlte Wochen lassen sie ruhen; Auswahl und Favoriten bleiben erhalten. Pausierte Ziele sind nicht tragbar, historische Erfolge bleiben. Fehlende/future Daten erzeugen keinen neuen Reward. Eigene Ziele müssen selbst Nachweise erbringen, unabhängig vom Fortschritt der zugewiesenen Grafikfamilie.

## Fehler und Änderung der permanenten Historie

v1RebuildStreakAwards() baute die gespeicherte Liste vorher komplett aus aktuellen Daten neu auf. Eine Datenkorrektur oder ein Wechsel Tagesziel→Wochenziel konnte früher gespeicherte Serien-Meilensteine ohne Hinweis entfernen. Das wurde reproduziert und korrigiert.

Jetzt bleiben vorhandene Einträge erhalten. Neue aktuell belegte Serien werden ergänzt; wieder belegte Einträge behalten ihre Identität, der berechnete erste Nachweis kann wie bisher aktualisiert werden. Keine neuen Schemafelder oder geänderten Schwellen. Die Ruhmeshalle prüft den Nachweis beim Anzeigen neu und unterscheidet gespeicherte von aktuell belegbaren Auszeichnungen. Nachweis-offene Einträge sind weder neue Freischaltungen noch eine Behauptung eines weiterhin belegten Erfolgs. Keine automatische Löschung/Abwertung oder manuelle Bestätigungs-Scheinfunktion.

Kumulative Wochenmeilensteine nutzen die tatsächlichen erfolgreichen Wochen; Serien verlangen aufeinanderfolgende Tage/Wochen. Die Ruhmeshalle bezeichnet firstAt ausdrücklich als „Erfasst am“ und earnedAt als „Erreicht am“. Fehlende, ungültige und zukünftige Datumsangaben werden nicht als gültige Vergabedaten ausgegeben. Verwaiste Einträge bleiben als „Früheres Ziel“ erkennbar. Eine echte, vollständig auditierbare Änderungs-/Vergabehistorie mit Undo bleibt ein späterer Ausbau.

## Offene Produkt-/Abnahmepunkte

- Ernährung und Alkohol haben in PRESETS null als Zielwert. Das schützt vor erfundenen pauschalen Zielen, aber ihre Belohnungsvoraussetzung muss zur konkreten Zielkonfiguration führen. Kein automatisches medizinisches oder Ernährungsziel einsetzen. Inzwischen ergänzt: verständliche Zielkonfigurationshilfe direkt an der Belohnung. Sie erklärt die aktuelle Grenze, ändert aber keine qualitative Auswertungslogik.
- Die bestehende Tragbarkeit bewertet bei weniger als vier bekannten jüngsten Wochen wieder anhand des verdienten Tiers. Dadurch kann nach bekannten Rückschlägen und späteren Datenlücken Ausrüstung wieder tragbar werden. Das ist eine offene Balance-/Statusentscheidung, keine in diesem Abschnitt stillschweigend geänderte Regel.
- Die 16 bestehenden Slotgruppen, Items und Assets wurden nicht zu 30 Slots erweitert. Neue Sets/Slots brauchen zuerst ein rückwärtskompatibles Konzept.
- Namen/Slotzuordnung/Grafikexistenz sind überprüfbar; Pixelqualität, Silhouetten, Z-Reihenfolge und inhaltliche Passung aller 95 Grafiken bleiben visuell abzunehmen. Das große Premiumbundle ist lokal weiterhin nicht vollständig verfügbar.
- Aktuelle Zieländerungen können historische Auswertungen beeinflussen. Vollständige Versionierungs-/Zeitzonen-/Geräteprüfungen bleiben offen.
