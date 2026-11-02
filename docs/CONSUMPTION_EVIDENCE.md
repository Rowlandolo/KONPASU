# Verbrauchsnachweise und Obergrenzen – Bewertungsregeln

Entwicklungsabschnitt vom 02.11.2026, Basis 68bb6e4. Lokal implementiert, nicht veröffentlicht. Verbindliche Grundlage: Masterbriefing §3/§4, insbesondere „Unbekannt ≠ Nein“ und keine Erfolge aus unvollständigen Obergrenzen.

## Jetzt einheitliche Regeln

- Kein Protokoll bedeutet unbekannt. Ein Häkchen allein ist keine vollständige Mengen-/Zeitmessung. Explizite negative/teilweise Tagesbewertungen bleiben erhalten; eine belegte Überschreitung hat Vorrang vor positivem Häkchen und niedrigerem manuellem Messwert.
- Detailwerte und ein manueller Periodenwert werden nicht addiert: beide können dieselben Ereignisse beschreiben. Für die Obergrenze gilt der höhere belegte Wert. Teilwerte dürfen einen manuellen höheren Wert nicht verdecken.
- Nichtnegative bekannte Verbrauchswerte bilden eine Untergrenze. Negative/ungültige Werte können eine Überschreitung nicht aufheben und verhindern einen bestätigten Erfolg. Unbekannte Alkoholereignisse werden nicht mit geschätztem Alkoholgehalt aufgefüllt.
- Alkohol: positive ml mit ABV >0 bis 100 belegen Konsum; positive ml mit explizitem ABV 0 widersprechen einem alkoholfreien Tag nicht. Getrennte Getränkebezeichnung, positive Menge ohne gültigen ABV oder unvollständige Getränkedaten bleiben unklar und blockieren den Freitagsnachweis. Explizite 0 ml sind kein positiver Konsumnachweis. Notizen ohne Getränkedaten sind neutral.
- Bestätigte freie Tage zählen einmal pro Datum. Gleichzeitige positive oder ungültige Verbrauchswerte blockieren den Tageserfolg, auch bei manuellem Ja. Bei Bildschirmzeit bleibt Berufs-/Schulnutzung DE/EN außerhalb der Privatnutzung.
- Vollständigkeit gilt gemäß vorhandener Feldbeschriftung: Bildschirmzeit bestätigt einen Tag, Gaming den eingestellten Zeitraum, Zucker/Alkohol ihre Woche. Eine Bildschirmzeit-Obergrenze mit Wochenkonfiguration braucht sieben Tagesbestätigungen. Fehlende Vollständigkeitsfelder bei anderen/eigenen Max-Zielen werden im Detailformular angeboten.
- Sieben verschiedene bestätigte freie Tage können eine Nullverbrauchswoche belegen; sieben Einträge an einem Tag können das nicht. Periodenbestätigung oder vollständige freie Tagesabdeckung plus geeignete Mengenwerte belegen Einhaltung. Ein einzelner bestätigter freier Tag ist kein Wochenbeleg.
- Wochenobergrenzen werden erst nach Sonntag als eingehalten bestätigt. Eine nachweisliche Überschreitung ist schon in der laufenden Woche sichtbar. Zukünftige Detailzeilen liefern heute weder Erfolg noch Überschreitung. Tagesbestätigungen bleiben für den aktuellen Tag möglich.
- Kalender, Detailauswertung und Zusammenfassung teilen dieselben Regeln. Die Oberfläche benennt Konflikttage und erklärt den fehlenden Vollständigkeitsnachweis.

## Datenerhalt und Review

Keine Änderung an Datenbankschema, Rohprotokollen, Zielversionen oder gespeicherten manuellen Messwerten durch diese Auswertung. Keine automatische Datenbereinigung. Vorhandene Datensätze können konservativer bewertet werden: ein früheres unbelegtes Ja wird unbekannt, ein verdeckter belegter Überschreitungswert wird sichtbar. Dadurch können nachweisabhängige Statistiken und Tragbarkeit neu berechnet werden. Gespeicherte Awardhistorie bleibt erhalten; vorhandene Historienprüfung markiert unbelegte Einträge offen. Das ist eine ausdrücklich dokumentierte Berechnungskorrektur, keine rückwirkende Umschreibung der Nutzerangaben. Vor Freigabe Vorher-/Nachhervergleich mit gesichertem Altprofil; Rückweg ist voriger Code mit unveränderten Rohdaten.

Grenzen: Ein ausdrückliches Vollständigkeits-Ja ist weiterhin eine Selbstauskunft, keine externe Verifikation. Alte Bestätigungen haben keine unveränderliche Bindung an damalige Zielperioden; eine vollständige historische Konfigurationsrekonstruktion bleibt offen (UX-02). Unquantifizierte Freitextangaben außerhalb Alkohol werden nicht fachlich interpretiert. Globale Nachweis-/Besitzbalance (REW-06) bleibt unverändert.

## Nachweise

`tests/consumption-evidence.cjs`: 23 zusätzliche Tests. Die ersten 22 Fälle gegen den vorherigen Stand ausgeführt: 16 rot, 6 bereits grün. Finaler Gesamtstand: 179 erfolgreiche Tests. Der 95-Reward-Mappingtest verwendet für tägliche Max-Ziele jetzt echte Zahlen und Vollständigkeit statt unbelegter Häkchen. Unveränderte Reward-Schwellen und SVG-/Slotzuordnungen bleiben geprüft.

Kein Safari-/iPhone-/IndexedDB-Nachweis. Chromium-Systembrowser ist vorhanden, startet in dieser Umgebung jedoch nicht erfolgreich. Die von Playwright erwartete gebündelte Browserdatei fehlt zusätzlich. Kein administratives Hindernis umgangen. Konkretes Geräteprotokoll: DEVICE_ACCEPTANCE.md.
