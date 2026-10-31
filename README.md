# KONPASU 1.0 – Offline-Funktionsprototyp (Preview)

**Stand:** 31. Oktober 2026 · **Sprache:** Deutsch/Englisch · **Betrieb:** kostenlos, ohne API-Abos, nach Erstinstallation weitgehend offline.

Diese Ausgabe ist ein großer Funktionsprototyp – **keine fertig abgenommene native iOS-/Android-App und keine vollständig fehlerfrei garantierte Produktivversion**. Die aufwendige 3D-Samurai-Welt wurde auf Wunsch bewusst zurückgestellt.

## UPDATE VON 0.4 – UNBEDINGT ZUERST BACKUP

1. Öffne die derzeit **auf deinem iPhone installierte** KONPASU-App. Einstellungen → **JSON-Backup**. Speichere die Datei in der iPhone-Dateien-App/iCloud Drive oder anderweitig außerhalb von KONPASU.
2. Entpacke `KONPASU-1.0-Offline-Update.zip` am Windows-PC.
3. Lade diese **acht App-Dateien** in das Hauptverzeichnis deines bestehenden öffentlichen GitHub-Repositories `Rowlandolo/KONPASU` hoch und ersetze gleichnamige Dateien:
   - `index.html`
   - `app.css`
   - `app.js`
   - **`features-v1.js` (NEU; unbedingt zusätzlich hochladen)**
   - `sw.js`
   - `manifest.webmanifest`
   - `icon-192.png`
   - `icon-512.png`
4. GitHub Pages stellt die aktualisierten Dateien unter `https://rowlandolo.github.io/KONPASU/` bereit. Öffne diese Adresse mit Internetverbindung in **Safari**. Lade sie bei Bedarf neu. Danach die bereits bestehende Homescreen-App öffnen, gegebenenfalls schließen und erneut starten.
5. **Lösche die Homescreen-App oder Website-Daten nicht.** Das kann deine gespeicherten Daten löschen. Deine alte lokale IndexedDB `KONPASU-LOCAL-2` wird weiterverwendet.
6. Prüfe zunächst einen älteren Trainingseintrag und eine alte Übung inklusive Gerätenotiz. Wenn etwas fehlt, im Bereich Einstellungen das **vorher gespeicherte JSON-Backup** wiederherstellen.
7. Teste danach den Flugmodus. Offline-Nutzung ist per Service Worker vorgesehen, wurde hier aber nicht auf einem echten iPhone oder auf lokaler HTTPS-Seite end-to-end geprüft.

## Was funktioniert (im automatisierten Chromium-Test verifiziert)

- 19 Standardziele, Tages-/Wochenziele, persönliche Ziele, Schnellbestätigung *erreicht / teilweise / nicht erreicht*, Nachträge und Messwerte.
- Neue **freiwillige Detailprotokolle für alle 19 Themen**: Cardio, Schritte, Mobility, Wasser und Getränke, Schlafenszeiten und Qualität, Ernährung/Mahlzeiten mit optionalen kcal/Protein, Zucker, Alkoholkonsum, Bücher, Sprachen/Lektionen, Weiterbildung, Fokus, Meditation, Tagebuch, soziale Aktivitäten, Natur, Bildschirmzeit, Gaming. Stärke/Krafttraining bleibt im separaten Trainingsmodul mit einzelnen Sätzen.
- Krafttraining: selbst erstellte Übungen, Gerätevarianten und permanente Einstellungen, eigene Trainingspläne und Reihenfolge, einzelne Sätze mit kg/Wiederholungen, **Aufwärm-/Arbeits-/Dropsatz**, freiwilligem RPE und Notizen, einfache **Supersatzgruppe A/B/C**, Pausentimer, Vorwerte beim nächsten Training, Historie, Korrektur abgeschlossener Einheiten und CSV-Export. Supersatzgruppen werden planbezogen gespeichert, wenn das Training aus einem Plan gestartet wurde.
- Erweiterte Datenerfassung und Basisauswertungen, Ziel-/Trainings-/Detail-CSV mit korrekt formatierten Zeilen, komplette JSON-Sicherung und Import.
- Regelbasierter Offline-Coach mit kurzen Nachrichten, freiwilligen Wenn-dann-Plänen (WOOP-inspiriert), Reflexionen und einfachen Strategie-Experimenten. Termine lassen sich als **Hinweise innerhalb der geöffneten App** speichern – **keine** Hintergrund-/Push-Erinnerungen.
- Echte bestätigte Tages- und Wochenserien mit dauerhaften Meilenstein-Auszeichnungen, abgestuftes temporäres Ausrüstungslimit in der **2D**-Samurai-Platzhalterdarstellung, Rang-/Meilensteinübersicht.
- Deutsch/Englisch, Spracheinstellung lokal gespeichert. Die Übersetzung verwendet teilweise eine ältere Text-Ersetzung; nicht jede dynamische Textvariante ist schon professionell sprachgeprüft.
- Kern-Logik und persönliche Daten vollständig lokal im Browser. Keine fremden Fonts, CDN-Abhängigkeiten, bezahlte KI-API oder Cloud-Konten erforderlich.

## Was noch NICHT vollständig umgesetzt ist

- Hochwertige modulare **3D**-Samurai-Figur, 30 grafisch realisierte Slots, echte 3D-Begleiter, Animations- und Szenen-Engine sowie interaktive 3D-Zeitreise.
- Native iOS- oder Android-App (diese Version ist eine Homescreen-PWA); Apple-Health-/Screen-Time-/Gerätesensor-Integrationen.
- Benutzerkonto und Cloud-Sync (die jüngste Anforderung, kostenlos und ohne Server zu funktionieren, hat Vorrang).
- Echte generative KI (der Coach ist bewusst lokal regelbasiert).
- Professionelle Offline-Push-Erinnerungen (derzeit nur **in der geöffneten App**).
- Externe Lebensmitteldatenbank, Foto-/Barcode-Lebensmittelerkennung, automatisch aufgezeichnete Cardio-Routen, Geräteschrittimporte.
- Vollständige statistische Mehrfachtestkorrektur und wissenschaftlich abgesicherte multivariate Langzeitanalytik. Vorhandene Korrelationen sind **deskriptiv und explorativ** und liefern keine Kausalnachweise.
- Garantierte Langzeit-Datensicherung im iOS-Browser. Sicherung durch JSON-Export bleibt zwingend empfohlen.

## Testabdeckung

- `test_konpasu_v1.py`: alle 18 neuen Detailprotokolltypen plus Krafttrainingsmodul, Bearbeitung, Satztypen, Wenn-dann-Plan, In-App-Erinnerung, CSV, Sprachwechsel.
- `test_konpasu_v1_regression.py`: Migration einer v0.4-Datenstruktur (synthetischer Bestand), Beibehaltung vorhandener Trainingssätze/Gerätenotizen, echte 7/30/100-Tages-Serien, dokumentierter Bruch ohne Verlust der historischen Auszeichnung, Ausrüstungsanzeige, mobile Browser-Renders.
- Kein JavaScript-Laufzeitfehler in diesen Tests.
- Lokaler HTTP-/Service-Worker-E2E-Test war durch die Testumgebung gesperrt (`ERR_BLOCKED_BY_ADMINISTRATOR`), **nicht** als bestanden zu werten.
- Kein Test auf deinem tatsächlichen iPhone, daher weiterhin Backup vor dem Update und manueller Geräte-Abnahmetest.

## Entwicklerhinweise

Technisch eine selbstenthaltene PWA mit Web-Standardtechnologien und IndexedDB. `app.js` ist der bestehende Offline-Kern; `features-v1.js` erweitert den Datenbestand ohne die bisherige Datenbankkennung zu ändern. `sw.js` speichert alle acht Kern-Assets im Cache `konpasu-offline-v100`.

**Datenschutz:** alle Daten bleiben bei dieser Version standardmäßig auf dem Gerät. GitHub Pages liefert die öffentlich sichtbaren **App-Dateien**, nicht deine persönlichen Datensätze. Ein Browser kann Website-Daten löschen; erstelle regelmäßig Backups. Exportiere private Tagebucheinträge nicht auf öffentlich erreichbare Websites.
