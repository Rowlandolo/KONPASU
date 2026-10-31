# KONPASU 1.0 – Anforderungsaudit (31.10.2026)

Legende: **Kern** = nutzbarer Grundablauf vorhanden, **Teil** = einige vereinbarte Ausbauten fehlen, **Ausstehend** = noch nicht umgesetzt; **nicht gerätegeprüft** heißt nicht fehlerfrei.

| Vereinbart | Stand im 1.0-Preview | Offen / Grenzen |
|---|---|---|
| 19 Standardziel-Vorlagen, eigene Ziele, Quick Check-ins | Kern | Spezialisierte Zielmodi teilweise nur manuell |
| Detailliertes Krafttraining mit eigener Übung/Plan, kg, Wiederholungen, letzter Einheit, Gerätenotiz | Kern | Zusätzliche Fitness Point Pro-Funktionen wie automatische Übungsbibliothek nicht übernommen |
| Aufwärmen, Arbeitssätze, Dropsätze, RPE, Satznotizen, Supersatzgruppen, Pausentimer | Kern | Komplexe Supersatz-Intervalle/Automatik teils noch offen |
| Cardio – Aktivität, Minuten, km, Herzfrequenz, Route | Teil | Keine GPS-Route oder Sensoraufzeichnung |
| Schritte | Teil | Manuell, keine Health-Integration |
| Mobility | Teil | Manuelle Übung/Dauer/Notiz, kein Beweglichkeitstest-Katalog |
| Wasser – unterschiedliche Getränke und Mengen | Teil | Manuell; keine flexiblen Favoriten-Buttons |
| Schlaf – Bett-/Aufwachzeiten und Qualität | Kern | Keine Wearable-Integration |
| Ernährung – Mahlzeiten, Wochenbalance und optionale Nährwerte | Teil | Keine Barcode-/Fotobibliothek; Balance per Quick Check-in |
| Zucker – zusätzliche Aufnahme und zuckerfreie Tage | Kern | Manuell, ohne automatische Lebensmitteldatenbank |
| Alkohol – Ereignisse und keine Falschbestätigung | Kern | Kein Getränkekatalog; kein unbestätigtes „alkoholfrei“ |
| Lesen – Buch, Seiten, Zeit | Kern | Noch keine vollständige Buchbibliothek |
| Sprachen – Sprache, Lernminuten, Lektionen, Vokabeln | Kern | Noch kein integriertes Lernsystem |
| Weiterbildung – Kurs, Dauer, Meilenstein | Kern | Keine Zertifikats-Dateiablage |
| Deep Focus – Aufgabe, Dauer, Unterbrechungen | Teil | Kein vollwertiger Pomodoro-Fokustimer |
| Meditation – Übung und Dauer | Kern | Kein geführtes Audio |
| Journaling – freiwillige private Reflexionen | Kern | Kein Sprachmemo/Audio, keine KI-Textanalyse |
| Soziale Aktivitäten / Natur | Kern | Manuell; kein GPS-Sync |
| Bildschirmzeit / Gaming | Teil | Manuell; keine native iOS-Nutzungsintegration |
| Fortschrittsstatistiken / Datengüte | Teil | Basisauswertung; Zielerfüllung und Details getrennt, große Laborauswertung offen |
| Umfangreiche explorative Analyse | Teil | Deskriptive Paarvergleiche; keine vollständige multiple-testing Korrektur |
| Strategie-Experimente / Offline-Coach / WOOP | Teil | A/B-Vergleich und Wenn-dann-Pläne; adaptive JITAI-Engine noch begrenzt |
| Erinnerungen sparsam | Teil | Nur in geöffneter App, keine Pushes im Hintergrund |
| 8 historische Ränge, Ausrüstung und verlorene Items | Teil | 2D-Platzhalter und vorläufige Balanceberechnung |
| Echte belegte Tages-/Wochenserien und einmalige Auszeichnungen | Kern | Korrekturen und unbekannte Tage berücksichtigt; weitere historische Grenzfälle zu testen |
| Geschlechtsdarstellung und freiwillige Körpermaße | Teil | Werte gespeichert; Körperformmorphing erst mit 3D |
| 30 Slots, evolvierende Begleiter, Samurai-Sets, 3D-Mentor | Ausstehend | Gemäß Nutzerwunsch 3D erst nach Kernfunktionen |
| Vollständige 3D-Avatar-Zeitreise | Ausstehend | Einfache historische 2D-Ansicht, keine 3D-Rekonstruktion |
| DE/EN | Kern | Teilweise älterer DOM-Übersetzungsmechanismus |
| Offline, kostenlos, ohne laufende Server | Implementiert; nicht gerätegeprüft | Lokaler HTTPS-Test blockiert; GitHub Pages zur Bereitstellung von Updates erforderlich |
| Cloud-Konto / echte KI | Ausstehend (bewusst) | Konflikt mit jüngster ausdrücklicher Kosten-/Serverfreiheit; später optional |
| Native App Store / Google Play App | Ausstehend | Aktuell kostenlose installierbare PWA |

**Fazit:** 1.0 ist ein deutlich größerer kostenloser Offline-Funktionsprototyp und ein prüfbarer Meilenstein, keine vollständige Endprodukt-Abnahme. 3D, native Plattformfunktionen, diverse Sensor-Integrationen und Teile der erweiterten Analyse bleiben ausstehend.
