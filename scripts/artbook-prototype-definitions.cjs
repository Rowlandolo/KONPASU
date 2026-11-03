'use strict';
// Reviewed against the five actual reward boards. Display names are atelier-only.
const boards={motion:'konpasu_body_motion_rewards',health:'konpasu_health_nourishment_rewards_board',knowledge:'konpasu_knowledge_productivity_rewards',mind:'konpasu_mindfulness_reward_paths',nature:'konpasu_social_nature_rewards'};
const families=[
 ['strength','Krafttraining','motion',4,'forest',[
  ['Handgelenkbänder','Wrist Wraps','existing','Goldblüten und Quasten; zwei getrennte Handgelenkteile.'],
  ['Kote-Armschienen','Iron Kote Armguards','existing','Dunkle Unterarmpanzer mit goldener Verschnürung.'],
  ['Brustgeschirr','Chest Harness','existing','Schwarze Kreuzriemen, Medaillon, Schnallen und Quasten.'],
  ['Samurai-Schulterpanzer','Samurai Shoulder Armor','existing','Zwei grün-goldene Schulterplatten; kein Kopfteil.'],
  ['Disziplin-Brustpanzer','Legendary Disciplined Breastplate Set','existing','Dunkler Brustpanzer mit goldenen botanischen Beschlägen.']]],
 ['cardio','Ausdauer','motion',1,'forest',[
  ['Windschal','Swift Scarf','scarf','Grün-ivoryfarbener Schal mit Goldblüten, zwei quastenbesetzten Enden.'],
  ['Wind-Tabi','Wind Tabi Shoes','boots','Dunkle hohe Tabi, grüne Schäfte und goldene Kreuzbänder.'],
  ['Tempo-Armbänder','Speed Arm Wraps','armwraps','Zwei grüne Unterarmwickel mit goldenen Schnüren.'],
  ['Sturmläufer-Umhang','Gale Runner Cloak','cloak','Grün-ivoryfarbener Umhang, dunkler Innenstoff und Schulterknoten.'],
  ['Sturmreiter-Rüstungsaura','Legendary Stormstride Armor Aura','storm','Dunkle Rüstung, freie Stoffbahnen und gold-grüne Windbögen; als Setmodule.']]],
 ['steps','Schritte','motion',2,'forest',[
  ['Reisesandalen','Travel Sandals','sandals','Grüne Riemen, helle Sohle und goldene Blattakzente.'],
  ['Wegtasche','Route Satchel','satchel','Grün-ivoryfarbene Reisetasche mit braunem Trageriemen und Quasten.'],
  ['Pilgerhut-Anhänger','Pilgrim Hat Charm','hatCharm','Kleiner geflochtener Kegelhut als Anhänger mit Wisteria und Goldknoten.'],
  ['Reise-Haori','Journey Haori','haori','Ivoryfarbene Jacke mit grünem Futter, Blättern und Goldkordel.'],
  ['Wegfinder-Banner','Wayfinder Banner Effect','banner','Grünes Standbanner, Kompassstern und frei laufende helle Bänder.']]],
 ['mobility','Beweglichkeit','motion',3,'forest',[
  ['Dehnbänder','Stretch Ribbons','ribbons','Zwei grün-ivoryfarbene Stoffbänder mit Blattmuster und Quasten.'],
  ['Fließender Obi','Flowing Sash','sash','Grüner Obi mit goldener Schleife und langen hellen Bändern.'],
  ['Beweglichkeitsärmel','Mobility Sleeves','sleeves','Zwei helle Ärmel mit grünen Abschlüssen und Blattmotiv.'],
  ['Tänzer-Haori','Dancer-Style Haori','haori','Luftiger ivory-grüner Haori mit Wisteria, offenem Vorderteil und Knoten.'],
  ['Schlangenwind-Aura','Serpentine Wind Aura','dragonAura','Langer grün-goldener Winddrache mit transparenten Spiralbändern.']]],
 ['water','Wasser','health',1,'teal',[
  ['Bambusflasche','Bamboo Flask','bamboo','Grünes Bambusrohr mit Goldrand, Trageschnur und einer Quaste.'],
  ['Lackflasche','Lacquer Bottle','bottle','Dunkle bauchige Flasche mit Goldblüten und Kordel.'],
  ['Kristallfeldflasche','Crystal Canteen','crystal','Hellblauer facettierter Behälter in goldenem Tragenetz.'],
  ['Zeremonielle Wasserkalebasse','Ceremonial Water Gourd','gourd','Ivoryfarbene doppelte Kalebasse mit Goldblüten und grünem Anhänger.'],
  ['Quellendrachen-Gefäß','Legendary Spring-Dragon Vessel','dragonVessel','Dunkles Goldgefäß mit grünem Drachen und transparentem Wasserbogen.']]],
 ['sleep','Schlaf','health',2,'night',[
  ['Mond-Haarnadel','Moon Hairpin','hairpin','Goldene Mondsichel, Kirschblüten und hängende Wisteria.'],
  ['Traumkissen-Talisman','Dream Charm Pillow Talisman','pillowCharm','Kleines navyfarbenes Kissen mit Mond, Hase und Goldkordel.'],
  ['Nacht-Haori','Night Haori','haori','Navy-ivoryfarbener Haori mit goldenen Nachtblüten und offenem Revers.'],
  ['Mondlaterne','Lunar Lantern Accessory','lantern','Goldene Rahmenlaterne mit Mondmotiv und seitlicher Blütenranke.'],
  ['Mondruhe-Aura','Legendary Moonlit Serenity Aura','moonAura','Goldener Vollmond, navyfarbener Nachthimmel, helle Wolkenbänder.']]],
 ['nutrition','Ernährung','health',3,'harvest',[
  ['Bento-Anhänger','Bento Charm','bento','Kleine dunkle Bentobox mit Reisbällchen und Goldschleife.'],
  ['Kräuterbeutel','Herbal Satchel','pouch','Grüner Stoffbeutel mit Blattmotiv, hellem Hals und Kordel.'],
  ['Vitalitäts-Obi','Balanced Vitality Sash','sash','Grün-ivoryfarbener Schärpengürtel mit Blütenknoten.'],
  ['Kochgelehrten-Haori','Chef Scholar Apron-Haori','apronHaori','Helle offene Jacke und dunkelgrüne Schürze mit goldenen Besteckmotiven.'],
  ['Erntebankett-Emblemset','Legendary Harvest Banquet Emblem & Accessory Set','harvest','Goldenes Ernteemblem, Reisschalen und kleiner Kürbis als getrennte Module.']]],
 ['sugar','Zuckerbalance','health',4,'lotus',[
  ['Zucker-Siegel-Omamori','Sugar-Seal Omamori','sealCharm','Grünes Omamori mit Goldblüten, roter Kordel und durchgestrichenem Würfel.'],
  ['Reinheitsarmband','Purity Bracelet','bracelet','Helle Perlen, einzelne grüne Perle, Goldknoten und kleines Blatt.'],
  ['Helles Lächeln','Bright Smiling Face-Expression Set','smileStudy','Drei freundliche Gesichtsausdrücke; Mimikstudie, keine neue Körperform.'],
  ['Lotusfächer','Lotus Fan','fan','Grüner Faltfächer mit hellen Lotusblüten und goldenen Rippen.'],
  ['Klargeist-Aura','Legendary Clear-Spirit Aura','lotusAura','Heller Lotus in grün-goldener Strömung mit kleinen Lichtpartikeln.']]],
 ['alcohol','Alkoholbalance','health',5,'sky',[
  ['Versiegelter Sake-Anhänger','Sealed Sake Gourd Charm','sealedGourd','Helle Kalebasse mit versiegeltem Hals, Goldschnur und kleiner Glocke.'],
  ['Nüchternheitslaterne','Sober Lantern','lantern','Helle rechteckige Rahmenlaterne mit botanischem Motiv.'],
  ['Heiter und gelassen','Cheerful Calm Face-Expression Set','calmStudy','Gelassene freundliche Mimikvarianten; keine Belohnungsumdeutung.'],
  ['Klarhimmel-Obi','Clear-Sky Sash','sash','Hellblau-ivoryfarbener Obi, goldene Schleife und helle Bandenden.'],
  ['Klares Fest','Legendary Lucid Festival Background Effect','festivalScene','Ruhige japanische Feststraße, Torii, Kirschblüten und Laternen; Hintergrund.']]],
 ['reading','Lesen','knowledge',1,'ink',[
  ['Buch-Anhänger','Book Charm','bookCharm','Dunkelgrüner rechteckiger Buchanhänger mit Goldrand und Blüten.'],
  ['Leseschriftrolle','Reading Scroll','scroll','Helle offene Schriftrolle mit dunklen Achsen, Goldbeschlägen und Landschaft.'],
  ['Gelehrtentasche','Scholar Satchel','satchel','Dunkle Tasche, Bücher, Schulterriemen und Blütenbeschläge.'],
  ['Bibliothekskodex','Library Codex','book','Großes navyfarbenes gebundenes Buch mit Goldblüten und Lesezeichen.'],
  ['Archiv-Schriftrollenset','Grand Archive Scroll Set','archive','Dunkler Rollenkasten, mehrere Schriftrollen und heller Archivbogen.']]],
 ['languages','Sprachen','knowledge',2,'ink',[
  ['Sprachbuch-Anhänger','Phrasebook Charm','bookCharm','Dunkler Buchanhänger mit Wellenmuster, Blüte und grüner Quaste.'],
  ['Kalligrafiepinsel','Calligraphy Brush','brushSet','Langer dunkler Pinsel, helle Borsten, Goldquaste und kleines Tintenfass.'],
  ['Mehrsprachiges Rollenetui','Multilingual Scroll Case','scrollCase','Grünes zylindrisches Etui mit Blütenschließe und Schriftanhängern.'],
  ['Reisekarten-Fächer','Travel Map Fan','mapFan','Heller Faltfächer mit grüner Landschaft, Torii und dunkler Quaste.'],
  ['Phönixfeder der Sprachen','Polyglot Phoenix Feather','featherAura','Navy-ivoryfarbene Feder, Juwelenknoten und goldener Phönixbogen.']]],
 ['learning','Weiterbildung','knowledge',3,'ink',[
  ['Lehrlings-Werkzeugtasche','Apprentice Toolkit','toolkit','Dunkle offene Tasche mit Pinseln, kleinen Werkzeugen und Goldverzierung.'],
  ['Handwerker-Maßband','Artisan Measuring Cord','measuringCord','Helles aufgerolltes Maßband mit Strichmarken, Knoten und Quasten.'],
  ['Handwerksbrosche','Craft Insignia Brooch','craftBrooch','Grün-goldene Blütenbrosche mit gekreuztem Handwerkswerkzeug.'],
  ['Meisterliche Werkzeugrolle','Masterwork Tool Roll','toolRoll','Offene navyfarbene Werkzeugrolle mit einzeln sichtbaren Werkzeugen.'],
  ['Gildenmeister-Werkzeugkiste','Guildmaster Toolbox Relic','toolbox','Dunkle tragbare Kiste mit goldenem Griff, Ecken und Blütenrelief.']]],
 ['focus','Fokus','knowledge',4,'ink',[
  ['Fokus-Stirnband','Focus Headband','existing','Drei native PNGs: hintere Bänder, Band unter Pony und vordere Schleife.'],
  ['Sanduhr','Sand Timer','hourglass','Transparente Sanduhr in dunklem Goldgestell mit hellem Sand.'],
  ['Arbeits-Schriftrolle','Deep-Work Desk Scroll','checkScroll','Offene helle Planrolle mit Häkchen, Landschaft und seitlicher Quaste.'],
  ['Konzentrationslaterne','Concentration Lantern','lantern','Goldenes Laternengehäuse, warmes Licht und hängende Blütenranke.'],
  ['Stiller Geist','Still-Mind Halo','halo','Goldene klare Kreisbahnen über einer hellen Lotusblüte.']]],
 ['meditation','Meditation','mind',1,'zen',[
  ['Gebetsperlen-Armband','Prayer Bead Bracelet','bracelet','Grüne und goldene Perlen, Blütenknoten und zwei kleine Quasten.'],
  ['Weihrauch-Anhänger','Incense Charm','incenseCharm','Grünes langes Omamori mit Blüten, Quaste und feinem Rauch.'],
  ['Meditationsmatte','Meditation Mat (Accessory)','mat','Gerollte Tatamimatte mit grünem Rand und kleinem rundem Kissen.'],
  ['Zen-Mönchsmantel','Zen Monk Mantle','cloak','Heller Schulterkragen über dunkelgrünem Mantel und goldenem Knoten.'],
  ['Lotus-Aura','Legendary Lotus Aura','lotusAura','Große warme Lotusblüte und frei umlaufende gold-grüne Bänder.']]],
 ['journal','Tagebuch','mind',2,'ink',[
  ['Lederjournal','Leather Journal','book','Dunkles gebundenes Journal mit Goldranken und Bindekordel.'],
  ['Tuschepinsel-Set','Ink Brush Set','brushSet','Flacher dunkler Tuschestein, heller Pinsel und Goldquaste.'],
  ['Erinnerungslaterne','Memory Lantern','lantern','Warme goldene Laterne mit Kirschblüten an Dach und Rahmen.'],
  ['Selbstreflexions-Spiegel','Introspection Mirror Charm','mirror','Ovaler goldener Handspiegel mit Landschaft und kleiner Quaste.'],
  ['Geschichtenhüter-Rollenkranz','Legendary Storykeeper Scroll Halo','scrollHalo','Helle offene Rollenschleife mit mehreren Goldachsen und Kirschblüten.']]],
 ['social','Soziale Kontakte','nature',1,'festival',[
  ['Freundschaftsknoten','Friendship Knot Charm','friendshipKnot','Grüne und ivoryfarbene verschlungene Bänder mit Goldblüten und Quasten.'],
  ['Geteilte Teetassen','Paired Tea Cups','teaPair','Zwei helle botanische Teetassen auf kleinem dunklem Tablett.'],
  ['Festfächer','Festival Fan','festivalFan','Dunkler Fächer mit Feuerwerk, Pagode, Kirschblüten und Quaste.'],
  ['Verbundenheits-Umhang','Companionship Cloak','cloak','Dunkelgrüner Festumhang mit ivoryfarbenen Revers und Goldblättern.'],
  ['Band-Emblem','Legendary Bond Crest','bondCrest','Golden umrahmter Endlosknoten mit grünen Blättern und Kirschblüten.']]],
 ['nature','Natur','nature',2,'forest',[
  ['Blattbrosche','Leaf Brooch','leafBrooch','Zwei grüne Blätter in Goldfassung, helle Blüte und einzelne Perle.'],
  ['Waldtasche','Forest Satchel','satchel','Grüne Schultertasche mit Blattmotiv, Goldschnallen und Quasten.'],
  ['Berg-Haori','Mountain Haori','haori','Grün-ivoryfarbener offener Haori mit Berglandschaft und botanischem Saum.'],
  ['Schreinpfad','Shrine Trail Background','shrineScene','Waldpfad mit Laterne, Torii und Schreindach; ruhiger Hintergrund.'],
  ['Kirschblütenbrise','Legendary Sakura Breeze Aura','sakuraAura','Kirschblütenzweig, Rosa-Blütenblätter und helle goldene Windbögen.']]],
 ['screen','Bildschirmbalance','mind',3,'sky',[
  ['Taschenuhr-Anhänger','Pocket Watch Charm','watch','Goldene Taschenuhr mit botanischem Zifferblatt und Quaste.'],
  ['Offline-Schleife','Unplugged Ribbon','unpluggedRibbon','Grün-ivoryfarbene Schleife mit rotem Verzichtssiegel.'],
  ['Weiter Horizont','Horizon-View Background','horizonScene','Blauer Himmel, Bergkette, Wasser und Kirschblüten; Hintergrund.'],
  ['Abend-Papierlaterne','Evening Paper Lantern','paperLantern','Helle runde Papierlaterne mit Ahornblättern und dunkler Kappe.'],
  ['Klarer Horizont','Legendary Clear-Horizon Atmosphere Effect','sunsetAura','Sanfter Sonnenuntergang, mehrere Berge und goldener atmosphärischer Bogen.']]],
 ['gaming','Gamingbalance','mind',4,'zen',[
  ['Disziplin-Münze','Discipline Token','token','Runde grün-goldene Münze mit Torii, Wellen und Blütenrand.'],
  ['Controller-Ruhesiegel','Resting Controller-Seal Charm','controllerCharm','Grünes Omamori mit hellem Controllerzeichen und Goldquasten.'],
  ['Routine-Obi','Balanced Routine Sash','sash','Grüner botanischer Obi, goldener Knoten und breite ivoryfarbene Bänder.'],
  ['Abendliches Teeset','Evening Tea Set (Accessory)','teaSet','Dunkle Kanne, helle Tasse, Mochi und Dampf auf einem Tablett.'],
  ['Geerdeter Fokus','Legendary Grounded Focus Aura','groundedAura','Ruhige sitzende Silhouette zwischen hellen Blüten und grün-goldenen Windbögen.']]]
];
module.exports={boards,families};
