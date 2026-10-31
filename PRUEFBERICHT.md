# KONPASU 1.5 – Fachlicher Prüfbericht

**Status: Funktionsupdate getestet im Desktop-Chromium mit mobiler Viewport-Simulation, nicht als fehlerfrei zertifiziert.**

## Automatisch geprüfte Szenarien

- Initialisierung ohne Laufzeitausnahme; 97 Übungen, Katalogsuche DE/EN, Muskelgruppenfilter, Übungsvorschau.
- Import einer Katalogübung, eigene Übung mit lokalem Foto, Gerätenotiz, Bearbeitung und Wiederanzeige.
- Trainingsplan erstellen und bearbeiten; neuer Satz-/Wiederholungs-/Pausen-/Supersatz-Plan je Übung.
- Vorwerte, Trainingsstart, aktive Planvorgabe, Gewichts-/Wiederholungs-Sätze, Dauer in Sekunden, nachträgliches Satzbearbeiten, Abschluss, Trainingskalender.
- Bereits abgeschlossenen Trainings weitere Übungen sowie zeitbasierte Sätze mit Satzart und Notiz hinzufügen.
- Zeitbasierter Satz ohne eingegebene Wiederholungszahl, ohne ungültige Datenbankwerte zu erzeugen.
- Reiner Aufwärmsatz zählt nicht als vollwertige Trainingseinheit; Arbeitssatz schon.
- 19 Ziel-Modusfamilien und 47 Zielmodi, Einheiten, Bearbeitungsformulare für 18 nicht-Kraft-Ziele.
- Schlafdauer: doppelte Einträge am selben Tag werden nicht summiert, Hauptschlaf korrekt ausgewählt.
- Zucker-/Alkohol-Verzichtstage benötigen Bestätigung; Gaming-/Screen-Time-Teilprotokolle führen nicht zu fiktiven Erfolgen.
- 0 Minuten / 0 g sind nur nach expliziter Komplettbestätigung als erfüllter Zeitraum ausweisbar.
- Lokale Nährwert-Schätzliste mit Portionseingabe und manueller Übernahme, kein automatisches Speichern.
- Ältere Datenformate, Backupvalidierung, Schutz vor konkurrierenden Änderungen, Nachträge, Ränge und historische Embleme (vorhandene Regressionstests).
- Sprachwechsel DE/EN, CSV/JSON-Export in vorliegenden Regressionstests.

## Wichtigste bekannte Grenzen

- **Kein echter iPhone-/Android-Gerätetest**; Browserumgebung blockiert lokalen HTTP-Zugriff durch Chromium. Ein Service-Worker-Neustart im Flugmodus ist auf dem Zielgerät noch abzunehmen.
- Standardillustrationen sind schematische, eigene SVGs, keine detaillierten Technikfotos.
- Lebensmittelwerte sind **grobe Referenzschätzungen**, nicht produktspezifisch. Kein Barcode-Scan oder vollständige Ernährungsdatenbank.
- Die Supersatz-Gruppierung wird im Plan **angezeigt und gespeichert**, ein automatischer Supersatz-Navigationsmodus ist noch nicht implementiert.
- Berechnung kompletter Trainingsstatistiken (z. B. belastbare 1RM-Schätzungen), externe Sensordaten, professionelle Trainingsperiodisierung und wissenschaftlich validierte Gesundheitsanalysen erfordern zusätzliche Arbeit.
- Die Sprachumschaltung aus vorigen Versionen ist durch bestehende nachträgliche Textübersetzungen technisch nicht vollständig systematisiert; sämtliche neuen Texte wurden zweisprachig angelegt, aber eine Vollabnahme jeder englischen Zeichenfolge steht aus.
- Keine Garantie für vollständige Fehlerfreiheit, Browserdatenerhalt oder unbegrenzte lokale Foto-Speicherung.

## Vor dem nächsten öffentlichen Release

Ein reales iPhone sowie ein Android-Gerät im Flugmodus testen; große und HEIC-Fotos, Backup-Wiederherstellung, App-Datenverlust und mehrere Monate Trainingshistorie simulieren. Danach Quellcode in testbare Module aufteilen und automatisierte End-to-End-/Fuzz-Tests erweitern.
