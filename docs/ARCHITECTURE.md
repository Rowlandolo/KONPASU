# KONPASU – Architekturentscheidung 001

Status 02.11.2026: Bestehende Offline-PWA erhalten; gezielte Reparaturen, keine Neuschreibung und keine neue Storage-Migration.

Grund: Nutzer verwenden lokale Daten auf bestehender Origin. Ein Hosting-/DB-/Frameworkwechsel würde Migrationsrisiken erzeugen, ohne die aktuellen Avatarfehler zu lösen. Kein neuer Server oder laufender Dienst nötig. App und optionale SVGs bleiben lokal gebündelt.

2.4 führt einen reinen Renderer ein: profile + durch resolveSlot geprüfte Ausrüstung + rein visuelle Vorschau → HTML mit bekannten gebündelten SVGs. Die Spiel-/Besitzlogik bleibt in avatar2d/app/features. SVGs werden als Bild-Data-URLs verwendet, Texte escaped, keine neuen externen Renderanfragen. Körperlayer müssen vollständig verfügbar sein; sonst bisheriger Blueprintfallback. Serienhistorie wird nicht mit heutigen Werten gefälscht.

Nicht entschieden: native Frameworkwahl, Cloudanbieter, Syncprotokoll. Vor Phase 8 einen Vergleich PWA/Capacitor/React Native/Expo inklusive SQLite, Konfliktstrategie, Kosten und Altimport dokumentieren. Langfristig globale Funktionsüberschreibungen/Capture-Listener in testbare Module auflösen; dafür zuerst bestehende Semantik durch Regressionen sichern.


## Ergänzung 002: Fehlgeschlagene Reads sind kein neues Profil

Startzustände unterscheiden: IndexedDB nicht verfügbar (gültiger Fallback erlaubt), geöffnete DB ohne Eintrag (Fallbackimport erlaubt), gültiger DB-Eintrag (Vorrang), fehlgeschlagener Read/ungültiger Inhalt (globaler Schreibschutz). localStorage unterscheidet fehlenden Schlüssel strikt von ungültigem gespeichertem JSON. Keine Reparatur durch Überschreiben oder Rücksetzen. Die gesperrte Ansicht erhält eine dauerhafte Warnung; der persönliche Backupknopf exportiert keine Ersatzdaten. Vorhandene Migrationssemantik wird nicht verändert. Der Schutz gegen konkurrierende Fallback-Tabs wird in Entscheidung 003 ergänzt.


## Ergänzung 003: lokale Web Locks für den Fallback

Web Locks serialisieren kooperierende localStorage-Schreiber auf derselben Origin. Innerhalb des Locks wird der exakte zuletzt gelesene Rohstand verglichen. Keine neuen persistenten Versionsfelder, keine Datenschemamigration. Ein Konflikt oder ein Lockfehler sperrt weitere Saves und lässt vorhandene Daten unverändert. Fehlt die Lock-API im Fallback-Betrieb, wird bewusst nicht ungeschützt gespeichert; JSON-Export der geladenen/ungesicherten Daten bleibt möglich. Das schützt nicht gegen ältere nicht kooperierende App-Versionen oder alle gleichzeitigen Backendwechsel. Echte Browserparallelität und Upgradefluss sind vor Live-Abnahme separat zu prüfen.
