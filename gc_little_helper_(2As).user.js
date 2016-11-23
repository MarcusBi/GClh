// ==UserScript==
//--> $$000 Begin of change "GC little helper"
// @name           GC little helper (2As)
//<-- $$000 End of change
// @namespace      http://www.amshove.net
//--> $$000 Begin of change "11.6"
// @version        11.6.1
//<-- $$000 End of change
// @include        http://www.geocaching.com/*
// @include        https://www.geocaching.com/*
// @include        http://labs.geocaching.com/*
// @include        https://labs.geocaching.com/*
// @include        http://maps.google.tld/*
// @include        http://www.google.tld/maps*
// @include        https://maps.google.tld/*
// @include        https://www.google.tld/maps*
// @exclude        *www.geocaching.com/seek/sendtogps.aspx*
//--> $$002 Begin of insert
// @exclude        *www.geocaching.com/blog/*
// @exclude        *www.geocaching.com/brandedpromotions/*
//<-- $$002 End of insert
// @resource jscolor http://www.amshove.net/greasemonkey/js/jscolor/jscolor.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.10.2/dropbox.min.js
// @description    Some little things to make life easy (on www.geocaching.com).
// @copyright      Torsten Amshove <torsten@amshove.net>
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_listValues
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @grant          GM_registerMenuCommand
//--> $$001 Begin of insert
// @grant          GM_info
//<-- $$001 End of insert
// ==/UserScript==

//*************************************************************************************************************************************************
// Kennz | Beschreibung                                                                                     | Datum      | Entwickler    | zuVers.|
//*************************************************************************************************************************************************
// $$000 | Temporäre Namesgebung.                                                                           | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$001 | Änderungen im Rahmen der Namensgebung, können so belassen werden.                                | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$002 | Fix: Header Layout an die neuen Seitengegebenheiten anpassen:                                    | Aug.2016   | FE            | 11.7   |
//       |      - Message Center im Header (oben rechts): Beschriftung des Message Center Icons "Messages"  |            |               |        |
//       |        entfernen. Anstatt Beschriftung des Message Center Icons den Title "Message Center"       |            |               |        |
//       |        setzen. Im GClh Config vorsehen.                                                          |            |               |        |
//       |      - Auswahl der Links im rechten Headerbereich korrigieren: Die Links im rechten              |            |               |        |
//       |        Headerbereich sind nicht mehr über die volle Feldhöhe auswählbar. Das hängt damit         |            |               |        |
//       |        zusammen, dass das neue Menü im Header im rechten Headerbereich den gleichen Bereich      |            |               |        |
//       |        beansprucht wie der rechte Teil des Headers mit den Links zu User, Setting und Message    |            |               |        |
//       |        Center. Durch diese Überlappung sind die Links nur dort auswählbar, wo keine Überlappung  |            |               |        |
//       |        vorhanden ist, also ganz oben und teils ganz unten in den Feldern.                        |            |               |        |
//       |      - Layout auch für die neuen Seiten Designs aufbauen (Message Center, Find Cache, Hide Cache,|            |               |        |
//       |        Geotours und Account Settings).                                                           |            |               |        |
//       |      - Layout auch für andere Seiten aufbauen (Labs Caches). Dazu werden die href Links dann     |            |               |        |
//       |        vollqualifiziert benötigt. Ich hoffe das macht keine anderen Baustellen auf.              |            |               |        |
//       |      - Search Field im Header repariert. Seite, Inputfeld und Buttonfeld haben sich geändert.    |            |               |        |
//       | New: Header Layout an die neuen Seitengegebenheiten anpassen:                                    |            |               |        |
//       |      - Logo verkleinern, im GClh Config vorsehen.                                                |            |               |        |
//       |      - Platz für GC Tour lassen, im GClh Config vorsehen.                                        |            |               |        |
//       |      - Schriftgröße im Menü und Untermenü auf 16 px erweitern und im GClh Config vorsehen.       |            |               |        |
//       |      - Abstand zwischen Menüs horizontal und zwischen Untermenüs vertikal auf allen Seiten       |            |               |        |
//       |        identisch einstellen und im GClh Config vorsehen.                                         |            |               |        |
//       |      - Schriftfarbe im Menü in hellgrün, bei Auswahl in weiss. Schriftfarbe im Untermenü in      |            |               |        |
//       |        hellgrün. Schriftfarbe im GClh Config vorsehen.                                           |            |               |        |
//       |      - Anzahl Zeilen bei Menüs in horizontaler Richtung und Separator einbauen. Im GClh Config   |            |               |        |
//       |        vorsehen.                                                                                 |            |               |        |
//       |      - Neue Parameter im GClh Config mit Version versehen und farblich etwas hervorheben.        |            |               |        |
//       |        newParameterOn, newParameterVersionSetzen(), newParameterOff                              |            |               |        |
//       |      - Versuch, immer wieder auftretende Fehler in Zusammenhang mit dem Message Center zu        |            |               |        |
//       |        beseitigen. Sie treten auch ohne Scripte auf. Gekennzeichnet mit "Message Center Fehler". |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$003 | Fix: Keinen Aufbau der VIP-List bei folgenden Seiten, werden hier nur fälschlicherweise          | Aug.2016   | FE            | 11.7   |
//       |      aufgebaut:                                                                                  |            |               |        |
//       |      - Geocaching Logs: /my/geocaches.aspx                                                       |            |               |        |
//       |      - Trackable Items: /my/travelbugs.aspx                                                      |            |               |        |
//       |      - Benchmark: /my/benchmarks.aspx                                                            |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$004 | Change: Mail Icon überarbeiten.                                                                  | Aug.2016   | FE            | 11.7   |
//       | New: Message Icon hinter Mail Icon aufbauen:                                                     |            |               |        |
//       |      - Message Center Icon hinter Mail Icon setzen. Im GClh Config vorsehen.                     |            |               |        |
//       |      - Icons Mail und Message überall aufbauen, wo es eine User guid gibt, außer bei Mail bzw.   |            |               |        |
//       |        Message schreiben selbst.                                                                 |            |               |        |
//       |      - Keine Icons für Aktiven User aufbauen.                                                    |            |               |        |
//       |      - "In the hands of ..." im TB Listing beachten, hier ist der Username nicht bekannt.        |            |               |        |
//       |      - Icons auch im Öffentlichen Profil aufbauen, hier ist die Verarbeitung besonders, weil die |            |               |        |
//       |        Icons ja hinter den Usernamen sollen, die guid aber in der Mail Adresse zu finden ist.    |            |               |        |
//       |      - Mail, Message und VIP Icons bei den Favoriten nicht als Icon zählen.                      |            |               |        |
//       |      - Improve Message wie bei Mail.                                                             |            |               |        |
//       | Change: Title für die Icons Mail, Message und VIP überarbeiten.                                  |            |               |        |
//       |         - Immer Usernamen im Title anzeigen und nicht "this user".                               |            |               |        |
//       |         - Formulierung "user" im Title weglassen.                                                |            |               |        |
//       | Fix: HTML dekodieren: Also beispielsweise: "&amp;" in "&". Wurde noch nicht überall umgesetzt.   |            |               |        |
//       |      Beispiel: User "Rajko & Dominik".                                                           |            |               |        |
//       | Fix: Echten Owner, und nicht den gegebenenfalls abweichenden Owner aus 'A cache by', bei Mail    |            |               |        |
//       |      und Message Icons und Links setzen.                                                         |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$005 | Fix: Log-Template und Load Logs überarbeitet:                                                    | Aug.2016   | FE            | 11.7   |
//       |      - VIP Icons wieder in den Logs setzen.                                                      |            |               |        |
//       |      - VIP Icon im Log beim eingeloggten User wieder setzen.                                     |            |               |        |
//       |      - "Edit Log / Images" und "Upload Image" wieder setzen.                                     |            |               |        |
//       |      - Load Logs mit settings_show_all_logs_count=0 (bedeutet: für alle) funktioniert nicht,     |            |               |        |
//       |        weil der Zähler zuvor vermutlich immer überschrieben wird. Problem umgangen, indem bei 0  |            |               |        |
//       |        nicht alle, sondern maximal 5000 Logs geladen werden. Außerdem doppelte Browser Abfrage   |            |               |        |
//       |        entfernt. Macht die Sache auch wesentlich übersichtlicher.                                |            |               |        |
//       |        Es werden aber noch regelmäßig zu viele Logs angezeigt. Hier will ich aber nicht dran     |            |               |        |
//       |        gehen, das erscheint sehr heikel.                                                         |            |               |        |
//       | Change: Log-Template überarbeitet:                                                               |            |               |        |
//       |         - Eigene Zeile für alle Icons Creator (Männchen in grau, gelb, ...), Vip, Mail, Message  |            |               |        |
//       |           und Top aufbauen.                                                                      |            |               |        |
//       |         - Creator Group Title (Member, Premium Member, ...) nur noch als Title über Creator      |            |               |        |
//       |           ausgeben (spart Platz).                                                                |            |               |        |
//       |         - Reihenfolge der Icons überall identisch aufbauen: VIP, Mail, Message.                  |            |               |        |
//       |         - Log-Template etwas straffen. Oben und unten nicht so viel Leerraum lassen und          |            |               |        |
//       |           neues Standard Log Layout markdown-output aktiviert.                                   |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$006 | Change: BBCode rauswerfen, wird nicht mehr unterstützt.                                          | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$007 | Fix: Markierte Caches in Bookmarklisten sind falsch bei zwischenzeitlichen Änderungen.           | Aug.2016   | FE            | 11.7   |
//       |      Geht man vom Bulk Delete eine Seite zurück auf die Bookmarkliste, und hat man               |            |               |        |
//       |      zwischenzeitlich an anderer Stelle einen der markierten Caches von der Bookmarkliste        |            |               |        |
//       |      gelöscht, dann werden die markierten Caches, ab der Stelle des gelöschten, zusätzlich um    |            |               |        |
//       |      den gelöschten, also um den Zähler 1, falsch markiert. Waren vorher 4 markiert, sind nun 7  |            |               |        |
//       |      markiert. Der eine weg und alle 4 zusätzlich um eins verschoben. Vorsorglich immer          |            |               |        |
//       |      markierte Caches zurücksetzen, wenn man auf die Seite kommt.                                |            |               |        |
//       |      (Unzulänglichkeit im Standard.)                                                             |            |               |        |
//       | Fix: Speichern mit F2 Taste bei "Create a Bookmark", "Edit a Bookmark" und "Bookmark Pocket      |            |               |        |
//       |      Query" repariert.                                                                           |            |               |        |
//       | New: Bezeichnung aller Buttons um ... (F2) ergänzt.                                              |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$008 | Fix: Bei Mega, Giga Events wird 'Related Web Page' als Disclaimer ausgeblendet und Disclaimer    | Aug.2016   | FE            | 11.7   |
//       |      bleibt stehen. Bei diesen Events ist 'DisclaimerWidget' die 'Related Web Page'. Der echte   |            |               |        |
//       |      Disclaimer steht hier unter 'Note Disclaimer', eben New Listing Design. Die derzeitige      |            |               |        |
//       |      Verarbeitung umdrehen. Zuerst neues dann altes Design suchen, dann passt es.                |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$009 | Fix: Hide Social (Facebook/Twitter) Sharing überall.                                             | Aug.2016   | FE            | 11.7   |
//       | Change: Bezeichnung im GClh Config angepaßt.                                                     |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$010 | Fix: Remove advertisement instructions auch im Messagecenter durchführen.                        | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$011 | Fix: Kartenfilter bei externen Filtern (beispielsweise aus play/search) nicht verändern:         | Aug.2016   | FE            | 11.7   |
//       |      Wenn eine Karte mit externen Filtern (beispielsweise aus play/search) aufgebaut wurde, dann |            |               |        |
//       |      dürfen die Filter Einstellungen auf der Karte nicht verändert werden, weil die Karte sonst  |            |               |        |
//       |      erneut aufgebaut wird, jedoch dann ohne externe Filter.                                     |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$012 | Fix: Variable Ausgabebreite im Header korrigieren und auf allen Seiten setzen. Den eigentlichen  | Aug.2016   | FE            | 11.7   |
//       |      Contentbereich auf der Seite vergrößern. So beispielsweise den Platz für den Logtext im     |            |               |        |
//       |      Listing verbreitern.                                                                        |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$013 | Change: Kartenausgabe in Pocket Queries etwas besser positionieren, zentrieren.                  | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$014 | Fix: Ausblenden der GC Standard Menus. Auch im neuen Seiten Design.                              | Aug.2016   | FE            | 11.7   |
//       | Change: Titles in Linklist on Top entfernen, auch im Profil in Ablistung.                        |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$015 | Fix: Link GClh Config im neuen Seiten Design weglassen. GClh Config wird dort nicht richtig      | Aug.2016   | FE            | 11.7   |
//       |      dargestellt und die Layout Anpassungen scheinen ziemlich hoch und nicht besonders wichtig.  |            |               |        |
//       | Change: 'GC' der Link Bezeichnung vom lh Config und lh Config Sync voranstellen.                 |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$016 | New: Ignore Link Bezeichnung für bereits ignorierte Caches ändern in 'Stop Ignoring'. Im GClh    | Aug.2016   | FE            | 11.7   |
//       |      config vorsehen.                                                                            |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$017 | Change: Kleine Layout Anpassungen ausschließlich im GClh Config, nur fürs Aussehen. Die kleinen  | Aug.2016   | FE            | 11.7   |
//       |         Verschönerungen nahmen Überhand, sie werden deshalb nicht mit $$017 dokumentiert.        |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$018 | Fix: GClh Config um Cache Typ Giga Event erweitern.                                              | Aug.2016   | FE            | 11.7   |
//       | Fix: Giga Event bei 'Show Eventday beside Date' vorsehen.                                        |            |               |        |
//       | Fix: Auf der Karte werden die gewünschten Cache Types ausgeblendet, die Icons zum Cache Type     |            |               |        |
//       |      wurden aber nicht gesetzt.                                                                  |            |               |        |
//       | Fix: Die Reihenmarkierungen zu den Cache Types setzen.                                           |            |               |        |
//       | Fix: Title setzen.                                                                               |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$019 | Fix: "Hide/Show Header" in der Sidebar der Karten komplett anzeigen und auch nicht mehr          | Aug.2016   | FE            | 11.7   |
//       |      überblenden. Und rechts orientieren wegen möglichem GC Tour script.                         |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$020 | New: Nach dem Save im GClh Config zum Anfang der Seite springen und ausblenden.                  | Aug.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$021 | Fix: "Find Player" verursacht fehlerhaftes Layout. So funktionierten beispielsweise die Menüs    | Aug.2016   | FE            | 11.7   |
//       |      nicht mehr und das Layout im Header war verschoben.                                         |            |               |        |
//       | Fix: Auf der Fieldnotes Seite läßt sich der GClh Config nicht aufbauen. Das hängt mit Namen der  |            |               |        |
//       |      function checkbox zusammen. Nach Änderung in checkboxy gab es keine Probleme mehr. Ohje.    |            |               |        |
//       |      Die Änderung wurde nicht dokumentiert.                                                      |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$022 | New: VIP Icon zusätzlich aufbauen:                                                               | Aug.2016   | FE            | 11.7   |
//       |      - Im TB Listing für Owner und in den TB Logs.                                               |            |               |        |
//       |      - Bei Post, Edit, View Cache-Logs und TB-Logs.                                              |            |               |        |
//       |      - Bei Mail schreiben.                                                                       |            |               |        |
//       |      - Bei TB Inventar.                                                                          |            |               |        |
//       |      - Bei eigenen Favoriten.                                                                    |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$023 | Fix: Image Gallery zum Cache und zum Profil: Mausaktivierte Bilder repariert.                    | Sep.2016   | FE            | 11.7   |
//       | Fix: Image im Cache Listing: Mausaktivierte Bilder deaktiviert, wenn die Logs nicht vom GClh     |            |               |        |
//       |      geladen werden, weil das dann nicht korrekt funktioniert. Unterstrichene Bildnamen behoben. |            |               |        |
//       | Fix: Image Spoiler-Filter: Der Filter funktioniert nicht, Funktionalität deaktiviert.            |            |               |        |
//       |      (Gekennzeichnet mit: Disable Spoiler String)                                                |            |               |        |
//       | Fix: Image Gallerien und Cache Listing: Zu großer unterer Bildrand in mausaktivierten Bildern    |            |               |        |
//       |      behoben.                                                                                    |            |               |        |
//       | Fix: Image Gallerien: Gallerybreite auf Fenstergröße einstellen (vereinfacht den mausaktivierten |            |               |        |
//       |      Bildwechsel).                                                                               |            |               |        |
//       | New: Image Gallery zum TB: Mausaktivierte Bilder eingebaut.                                      |            |               |        |
//       | New: Image im TB Listing: Mausaktivierte Bilder eingebaut.                                       |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$024 | New: Mail Icons bei Usern in "All my VIPs" Liste aufbauen. In GClh Config vorsehen.              | Sep.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$025 | New: Mail Icons bei Usern in "VIP-List" im Listing aufbauen. In GClh Config vorsehen.            | Sep.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$026 | New: Zu lange Zeilen "kürzen", damit nicht umgebrochen wird:                                     | Sep.2016   | FE            | 11.7   |
//       |      - In langer VIP Liste im Listing wird Länge des Usernamens beschränkt.                      |            |               |        |
//       |      - In den Logs im Listing wird Länge des Usernamens beschränkt.                              |            |               |        |
//       |      - Im Inventory im Listing wird Länge des Trackable Namens beschränkt.                       |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$027 | Fix: Wurden Checkboxen aus der Verarbeitung im GClh Config entfernt, also mit // versehen, lief  | Sep.2016   | FE            | 11.7   |
//       |      der Save im GClh Config gegen die Wand. Entsprechende Prüfung eingebaut. (Leck die Katz).   |            |               |        |
//       |      Die gespeicherten Werte gehen dadurch nicht verloren, sie werden nur nicht mehr verwendet.  |            |               |        |
//       |      Nun können beispielsweise die alten Menüs auskommentiert werden. Das wird nun nachträglich  |            |               |        |
//       |      noch über $$014 gemacht, was damals nicht ging wegen des Fehlers.                           |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$028 | New: F2 Save GClh Config wie per "save" Button. In GClh Config vorsehen.                         | Sep.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$029 | New: F4 Call GClh Config aus allen erlaubten Seiten heraus. In GClh Config vorsehen.             | Sep.2016   | FE            | 11.7   |
//       | New: Neue Kategorie im GClh Config vorsehen zu GClh Config / Sync.                               |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$030 | New: F2 Save GClh Config Checkbox Änderung dynamisch in der Bezeichnung des Save Buttons         | Sep.2016   | FE            | 11.7   |
//       |      aktualisieren. (Spielerei)                                                                  |            |               |        |
//       |      - Beim Aufbau der GClh Config Seite die Bezeichnung des Save Buttons (save bzw. save (F2))  |            |               |        |
//       |        über Function setValueInSaveButton versorgen.                                             |            |               |        |
//       |      - Die Checkbox settings_f2_save_gclh, die regelt, ob ein Save aus der GClh Config Seite per |            |               |        |
//       |        F2 Taste durchgeführt werden darf, mit Event versehen, um beim Anwählen der Checkbox die  |            |               |        |
//       |        Bezeichnung im Save Button dynamisch anzupassen.                                          |            |               |        |
//       |      - Function setValueInSaveButton, um die Bezeichnung des Save Buttons (save bzw. save (F2))  |            |               |        |
//       |        beim Aufbau der GClh Config Seite und später dynamisch durch Checkbox Aktivitäten zu      |            |               |        |
//       |        versorgen.                                                                                |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$031 | Fix: Auf den Seiten suchen, verstecken und geotours wird die Linklist ohne Event aufgebaut.      | Sep.2016   | FE            | 11.7   |
//       |      Ich kann die Fehlerquelle nicht wirklich ausmachen und gehe deshalb den Weg eines geringen  |            |               |        |
//       |      Widerstandes und baue hier ein hover nach, so wie es auch unten für Chrome gemacht wurde.   |            |               |        |
//       |      Nun klappen zwar alle Menüs auf, verschwinden aber wieder bei Mausverlust.                  |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$032 | New: Anzahl der Caches und Anzahl der selektierten Caches in Bookmark Listen in den Kategorien   | Sep.2016   | FE            | 11.7   |
//       |      All, Found, Archived und Deactivated, entsprechend der Selektions Buttons, anzeigen. Im     |            |               |        |
//       |      GClh Config vorsehen. Das gleiche in Watchlist nur ohne Found.                              |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$033 | New: Wenn Warnmeldung über Down Time ... vorhanden ist, prüfen, ob sie identisch ist mit der     | Sep.2016   | FE            | 11.7   |
//       |      bereits gesicherten, gegebenenfalls verbergen bzw. Button erzeugen zum Verbergen. Im GClh   |            |               |        |
//       |      config vorsehen.                                                                            |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$034 | Fix: Die Anzeige von KML Dateien in Google Maps funktioniert so nicht mehr. Links entfernt.      | Sep.2016   | FE            | 11.7   |
//       |      ( https://developers.google.com/maps/support/kmlmaps?hl=de Ab Februar 2015 können von       |            |               |        |
//       |        Karten, die mit der klassischen Version von Google Maps - https://maps.google.com/ -      |            |               |        |
//       |        erstellt wurden, keine KML/KMZ-Dateien von externen Websites mehr geladen werden. )       |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$035 | New: Infomeldung ausgeben wenn gespeichert wurde. (Spielerei)                                    | Sep.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$036 | Fix: Favoritenbox, Cache Listing: Box wurde mit Update vom 29.06.2016 geändert. Repariert.       | Sep.2016   | FE            | 11.7   |
//       | Change: Favoritenbox, Cache Listing: Kompletter Umbau, schneller gemacht und Dropdown verbessert.|            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$037 | New: My Profile pimpen:                                                                          | Sep.2016   | FE            | 11.7   |
//       |      - Block "Linklist" im Profil auch klappbar machen.                                          |            |               |        |
//       |      - Block "All my VIPs" im Profil auch klappbar machen.                                       |            |               |        |
//       | Change: My Profile pimpen: Link "GClh Config" im Profil ausrichten.                              |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$038 | Fix: Überarbeitung der Aurufe und der Fokusierung der speziellen Verarbeitungen GClh Config,     | Sep.2016   | FE            | 11.7   |
//       |      GClh Config Sync und Find Player.                                                           |            |               |        |
//       |      - Behandlung Checkbox zum Avatar in Settings, Preferences, wenn GClh die Logs laden soll.   |            |               |        |
//       |        Komplett neu wegen neuem Design der Settings Seite. Superlink mit zusätzlichem Scroll im  |            |               |        |
//       |        GClh Config.                                                                              |            |               |        |
//       |      - Find Player nach GClh Config Aufruf aus Linklist nicht möglich, wenn dort nicht           |            |               |        |
//       |        gespeichert wurde, "side" fehlte.                                                         |            |               |        |
//       |      - Nach Find Player Aufruf bleibt Linklist stehen, Focusierung per Click gesetzt.            |            |               |        |
//       |      - GClh Config sync verschwindet hinter GClh Config, falls auch schon vorhanden. Focusierung |            |               |        |
//       |        per Click gesetzt.                                                                        |            |               |        |
//       |      - GClh Config Aufruf aus Linklist mit #GClhShowConfig ruft sich nach speichern erneut auf.  |            |               |        |
//       |        Doppelte Link Verarbeitung aufgebaut für GClh Config, über #GClhShowConfig und über       |            |               |        |
//       |        auf name.                                                                                 |            |               |        |
//       |      - Vor Start des GClh Config den ersten Url Zusatz zurücksetzen bis auf #.                   |            |               |        |
//       |      - Nach Verlassen der speziellen Verarbeitungen Url Zusätze zurücksetzen bis auf #.          |            |               |        |
//       |      - Mehrfachaufruf der speziellen Verarbeitungen unterbunden, vor dem Start zuerst eventuelle |            |               |        |
//       |        aktive spezielle Verarbeitungen geschlossen. Beispielsweise konnte GClh Config mehrfach   |            |               |        |
//       |        aufgerufen werden und konnte dann nicht mehr komplett geschlossen werden.                 |            |               |        |
//       |      - Prüfen, ob die spezielle Verarbeitung auf der aktuellen Seite ausgeführt werden kann.     |            |               |        |
//       |        Falls nicht, einen Hinweis ausgeben. Beispielsweise kann Find Player per Link aus der     |            |               |        |
//       |        Linklist auf allen Seiten aufgerufen werden. Auf den Seiten im neuen Design wird er aber  |            |               |        |
//       |        nicht korrekt dargestellt.                                                                |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$039 | Fix: VIP Listen im Listing ohne Einträge aufbauen, wenn die Logs nicht vom GClh geladen werden.  | Sep.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$040 | Fix: TB Listing: Farbliche Hervorhebung von Owner und User und Zebra in den Logs korrigiert.     | Sep.2016   | FE            | 11.7   |
//       |      Hier gibt es mittlerweile wohl AlternatingRow. Hier zieht das Erste.                        |            |               |        |
//       | New: Bookmark Listen: Zeilen im Zebra Look und Founds einfärben.                                 |            |               |        |
//       | New: Gewöhnliche Listen: Zebra Look und Found Einfärbung über GClh Config.                       |            |               |        |
//       | New: TB Listing: Zusätzliche Farbliche Darstellung der Logs für VIP und Steuerung über GClh      |            |               |        |
//       |      Config.                                                                                     |            |               |        |
//       | New: Cache Listing: Farbliche Hervorhebung von User, Owner, VIP, Zebra Effekt und Steuerung über |            |               |        |
//       |      GClh Config.                                                                                |            |               |        |
//       | New: GClh Config: Abhängigkeiten im GClh Config berücksichtigen.                                 |            |               |        |
//       | Fix: GClh Config: Die Links zur Linklist hin sollen sie auch anzeigen, also nicht einklappen.    |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$041 | Change: Link zum Userprofil in Cacheliste zum User in Usernamen integriert.                      | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$042 | New: Pimp GClh Config Sync:                                                                      | Okt.2016   | FE            | 11.7   |
//       |      - Cursor bei Auswählbarem setzen.                                                           |            |               |        |
//       |      - Unberechtigte "Invalid format" Meldung eliminiert.                                        |            |               |        |
//       |      - "No data" Meldung erweitert um ein space.                                                 |            |               |        |
//       |      - Save Form eingebaut wie bei GClh Config.                                                  |            |               |        |
//       |      - Name einheitlich in GC little helper Sync geändert.                                       |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$043 | Change: Linklist Map komplett deaktiviert, ist nicht fertiggestellt.                             | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$044 | New: Linklist Top auch im Karten Header aufbauen.                                                | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$045 | New: Überblicks Karte der Cache Lokation oben rechts im Cache Listing eingebaut.                 | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$046 | Fix: Layerliste in den Karten verbreitert, damit sie nicht zu schmal wird, wenn noch ein GC Vote | Okt.2016   | FE            | 11.7   |
//       |      Icon dort sitzt.                                                                            |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$047 | Change: "Post log from Listing (inline)", Cache Listing: Gepimpt.                                | Okt.2016   | FE            | 11.7   |
//       | Change: "Hide/Show Cache Note", Cache Listing: Gepimpt.                                          |            |               |        |
//       | Change: "Hide hints behind a link", Cache Listing: Gepimpt.                                      |            |               |        |
//       | Change: "Decrypt hints", Cache Listing: Gepimpt.                                                 |            |               |        |
//       | Change: "Show statistic on geochecker.com sites", Cache Listing: Gepimpt.                        |            |               |        |
//       | Change: "Highlight coordinates which are changed by the user with red textcolor", Cache Listing: |            |               |        |
//       |         Gepimpt.                                                                                 |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$048 | Fix: Post log from PMO-Listing as Basic Member (inline): Notdürftig repariert.                   | Okt.2016   | FE            | 11.7   |
//       |      Einige Anpassungen beim Loggen von Premium Only Caches durch Basis Member können nicht      |            |               |        |
//       |      durchgeführt werden, weil Einiges auf der Seite nicht mehr zur Verfügung steht. So zum      |            |               |        |
//       |      Beispiel "Change Header Layout". Das sollte aber nicht problematisch sein, weil es hier ja  |            |               |        |
//       |      nur ums Loggen gehen sollte.                                                                |            |               |        |
//       | Fix: GClh Config hier nicht aus Cache Listing aufrufbar machen, weil nicht korrekt darstellbar.  |            |               |        |
//       | New: Loggen über Standard "Log It" Icons zu Premium Only Caches für Basic Members ermöglichen.   |            |               |        |
//       |      Bei den Standard "Log It" Icons zu Premium Only Caches für Basic Members trotz Tool Tipp    |            |               |        |
//       |      einen Tab zum Loggen öffnen. Das Gleiche geht auch per rechter Maustaste und neuem Tab,     |            |               |        |
//       |      hier eben nur in gleichem Tab. Beispielsweise in der "Recently Viewed Caches" Liste.        |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$049 | New: Auswertung zur Matrix auf der Statistik Seite und im Profile erweitert:                     | Okt.2016   | FE            | 11.7   |
//       |      - Anzahl komplette Matrixes.                                                                |            |               |        |
//       |      - Farbliche Hervorhebung für die nächsten x möglichen Matrixes.                             |            |               |        |
//       |      - Links zur Suche nach entsprechenden Caches mit einem Radius von x km in Karte oder Liste. |            |               |        |
//       |      - Über GClh Config einstellbar.                                                             |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$050 | New: Neue Section im GClh Config aufgebaut Profile / Statistik. Relevantes wurde dort gesammelt. | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$051 | New: Neue Seite "My Lists" provisorisch integriert bei "settings", paßt am Besten.               | Okt.2016   | FE            | 11.7   |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$052 | New: In Logs Platzhalter für aktuelles Datum und aktuelle Zeit vorsehen.                         | Okt.2016   | FE            | 11.7   |
//       |      Danke an SiMaKiDD, er hats erfunden. :)                                                     |            |               |        |
//       | Fix: Verarbeitung von Platzhaltern in TB Logs.                                                   |            |               |        |
//       | Fix: "Show Datepicker beside Date on Log-Page" funktioniert nicht mehr und ist auch nicht mehr   |            |               |        |
//       |      notwendig, weil es mittlerweile einen Datepicker im Feld selbst gibt. Auf Kommentar gesetzt.|            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$053 | Fix: Button zu GC Map in Google Maps platziert.                                                  | Okt.2016   | FE            | 11.7   |
//       | Fix: Layer konnten im Zusammenhang mit dem Einsatz von GC Vote nicht immer ausgetauscht werden,  |            |               |        |
//       |      weil nicht berücksichtigt wurde, dass GC Vote ebenfalls mit den Layer Classen arbeitet.     |            |               |        |
//       | Change: Aufruf aus Cache Listing zu Google Maps leicht angepaßt.                                 |            |               |        |
//       | New: Button zu Google Maps in GC Map platziert und Wechsel über neue Tabs oder gleichen Tab      |            |               |        |
//       |      ermöglicht. Über GClh Config steuern.                                                       |            |               |        |
//       | New: Linke Sidebar in Google Maps ausblenden. Über GClh Config steuern.                          |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$054 | Fix: GC Map: Button "Find My Location" und Entfernungsangaben auf der Karte wurden beim ersten   | Okt.2016   | FE            | 11.7   |
//       |      Verstecken der Sidebar nicht berücksichtigt, auch im Standard nicht.                        |            |               |        |
//       | Fix: GC Map: Warnmeldung wenn Leaflet-Map nicht aktiv ist, funktionierte nicht mehr.             |            |               |        |
//       | Fix: GC Map: Fehler bei "Hide Map Header", wenn Auswahl zu "Set Map Preferences" angezeigt wurde.|            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$055 | Fix: Nicht mehr sinnvolle Funktionalität auf Kommentar gesetzt:                                  | Okt.2016   | FE            | 11.7   |
//       |      - Hide superfluous line breaks: settings_hide_line_breaks. Hinter dem Print Label gibt es   |            |               |        |
//       |        keine Linebreaks mehr.                                                                    |            |               |        |
//       |      - Make your souvenirs hideable: settings_hideable_souvenirs. Gibt es nun im Standard.       |            |               |        |
//       |      - function addChosenPlugin: Wurde nur im Zusammenhang mit "Make your souvenirs hideable"    |            |               |        |
//       |        verwendet, was nun nicht mehr genutzt wird.                                               |            |               |        |
//       |      - Show linebreaks in cache notes: settings_breaks_in_cache_notes. Gibt es nun im Standard.  |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$056 | New: "Show bigger images in gallery" auch für TB Image Gallery.                                  | Okt.2016   | FE            | 11.7   |
//       | Change: Parameter im GClh Config umplaziert in Listing und Profil und Helptext aufgebaut.        |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$057 | Fix: Koordinaten in den GClh Feldern Home-Coords und Multi Homezone vollqualifiziert ausgeben,   | Okt.2016   | FE            | 11.7   |
//       |      auch wenn sie auf .000 enden, sonst werden sie beim nächsten Speichern demoliert.           |            |               |        |
//       | Fix: Auch die Multi Homezonen dürfen nicht angezeigt werden, wenn der Parameter "Show Homezone"  |            |               |        |
//       |      deaktiviert ist.                                                                            |            |               |        |
//       | Fix: Die Homezone Circles werden manchmal zu früh aufgebaut, dann blinken sie kurz auf und sind  |            |               |        |
//       |      dann auch schon wieder verschwunden. Das passiert insbesondere beim Kartenaufruf ohne       |            |               |        |
//       |      Koordinaten, also beispielsweise aus dem Menü Play.                                         |            |               |        |
// ------|--------------------------------------------------------------------------------------------------|------------|---------------|--------|
// $$058 | Fix: Linklist: Rechte Maustaste funktionierte nicht bei den speziellen Links aus Linkliste,      | Okt.2016   | FE            | 11.7   |
//       |      gilt für Linklist on Top und im Profile. Repariert über direkten Link mit new Tab.          |            |               |        |
//       |      Contextmenu wird nicht mehr angezeigt.                                                      |            |               |        |
//       | Fix: Profile: Wenn User keine eigenen Trackables, dann Fehler im Profile Trackables.             |            |               |        |
//       | Fix: GClh Config: In Linklist echte Linkbezeichnungen anzeigen und nicht den Default. Default    |            |               |        |
//       |      als Title anzeigen.                                                                         |            |               |        |
//       | Change: GClh Config: Linklist Umgebung gepimpt.                                                  |            |               |        |
//       | New: GClh Config: Linklist: Einige Bookmarks für Linklist ergänzt.                               |            |               |        |
//       | New: GClh Config: Linklist: Bookmarks kennzeichnen, wenn sie, bzw. wenn sie nicht, in der        |            |               |        |
//       |      Linklist vorhanden sind.                                                                    |            |               |        |
//       | New: GClh Config: Linklist: Sortierung ermöglicht für default Bookmark Links für Linklist.       |            |               |        |
//       |      Gekennzeichnet mit "Sort Linklist".                                                         |            |               |        |
//*************************************************************************************************************************************************

var jqueryInit = function (c) {
    if (typeof c.$ === "undefined") {
        c.$ = c.$ || unsafeWindow.$ || window.$ || null;
    }
    if (typeof c.jQuery === "undefined") {
        c.jQuery = c.jQuery || unsafeWindow.jQuery || window.jQuery || null;
    }

    var jqueryInitDeref = new jQuery.Deferred();

    jqueryInitDeref.resolve();

    return jqueryInitDeref.promise();
};

var quitOnAdFrames = function (c) {
    var quitOnAdFramesDeref = new jQuery.Deferred();
    if (window.name.substring(0, 18) !== 'google_ads_iframe_') {
        quitOnAdFramesDeref.resolve();
    }
    else {
        quitOnAdFramesDeref.reject();
    }

    return quitOnAdFramesDeref.promise();
};

var browserInit = function (c) {
    var browserInitDeref = new jQuery.Deferred();
    c.CONFIG = {};
    c.browser = "firefox";

    if (typeof(chrome) != "undefined") {
        c.browser = "chrome";

        c.unsafeWindow = window;

        //Only for migration
        if ((typeof(c.GM_getValue) === "undefined" || (c.GM_getValue.toString && c.GM_getValue.toString().indexOf("not supported") !== -1)) && typeof(localStorage) !== "undefined") {
            c.GM_getValue = function (key, defaultValue) {
                var result = localStorage.getItem(key);
                if (!result || result == "undefined") {
                    return defaultValue;
                }
                else {
                    var type = result[0];
                    switch (type) {
                        case 'b':
                            result = result.substring(1);
                            return result == 'true';
                        case 'n':
                            result = result.substring(1);
                            return Number(result);
                        case 's':
                            result = result.substring(1);
                            return String(result);
                        default:
                            return result;
                    }
                }
            };
        }

        if (typeof(c.GM_setValue) == "undefined" || (c.GM_setValue.toString && c.GM_setValue.toString().indexOf("not supported") != -1)) {
            c.GM_setValue = function (key, defaultValue) {
                console.log("Dummy GM_setValue");
            }
        }

        if ((typeof(c.GM_listValues) === "undefined" || (c.GM_listValues.toString && c.GM_listValues.toString().indexOf("not supported") !== -1)) && typeof(localStorage) !== "undefined") {
            c.GM_listValues = function () {
                return Object.keys(localStorageCache);
            };
        }

        if (typeof(c.GM_xmlhttpRequest) == "undefined" || (c.GM_xmlhttpRequest.toString && c.GM_xmlhttpRequest.toString().indexOf("not supported") != -1)) {
            c.GM_xmlhttpRequest = function (requestData) {
                var httpReq = new window.XMLHttpRequest();
                if (requestData["onreadystatechange"]) {
                    httpReq.onreadystatechange = function (data) {
                        requestData["onreadystatechange"](this);
                    }
                }

                if (requestData["onload"]) {
                    httpReq.onload = function (data) {
                        if (this.status == 200) {
                            requestData["onload"](this);
                        }
                    }
                }

                if (requestData["onerror"]) {
                    httpReq.onload = function (data) {
                        requestData["onerror"](this);
                    }
                }

                httpReq.open(requestData.method, requestData.url);

                if (requestData.headers) {
                    for (var header in requestData.headers) {
                        if (header == "User-Agent" || header == "Origin" || header == "Cookie" || header == "Cookie2" || header == "Referer") {
                            continue;
                        }
                        httpReq.setRequestHeader(header, requestData.headers[header]);
                    }
                }

                httpReq.send(typeof requestData.data == 'undefined' ? null : requestData.data);
            }
        }

		var initialConfigRecv = false;
        chrome.runtime.sendMessage({"getGclhConfig": ""}, function (data) {
			if(initialConfigRecv){
				return;
			}
			initialConfigRecv = true;
            if (typeof(data) !== "undefined") {
                c.CONFIG = data;
            }
            else {
                c.CONFIG = {};
            }

            browserInitDeref.resolve();
        });
    }
    else if (browser === "firefox") {
        // Check for Scriptish bug in Fennec browser (http://www.geoclub.de/viewtopic.php?f=117&t=62130&p=983614#p983614)
        c.GM_setValue("browser", browser);
        var test_browser = c.GM_getValue("browser");
        if (!test_browser) {
            //console.log("Scriptish GM_getValue bug detected");
            var GM_getValue_Orig = c.GM_getValue;
            c.GM_getValue = function (key, def) {
                return GM_getValue_Orig("scriptvals.GClittlehelper@httpwww.amshove.net." + key, def);
            }
        }

        c.CONFIG = JSON.parse(GM_getValue("CONFIG", '{}'));

        browserInitDeref.resolve();
    }
    else {
        c.CONFIG = JSON.parse(GM_getValue("CONFIG", '{}'));

        browserInitDeref.resolve();
    }

    return browserInitDeref.promise();
};

var constInit = function (c) {
    var constInitDeref = new jQuery.Deferred();

    // Set defaults
    c.scriptName = "gc_little_helper";
    c.scriptVersion = "11.6";
//--> $$001 Begin of insert
    c.AS = false; 
    c.scriptNameConfig = "GC little helper Config"
    c.scriptNameSync = "GC little helper Sync"
    if ( GM_info.script.name == "GC little helper (2As)" ) {
        c.scriptName = GM_info.script.name;
        c.scriptVersion = GM_info.script.version;
        c.AS = true;
        c.scriptNameConfig = c.scriptNameConfig + " (2AS)";
        c.scriptNameSync = c.scriptNameSync + " (2AS)";
    }
//<-- $$001 End of insert
    c.anzCustom = 10;
    c.anzTemplates = 10;
    c.bookmarks_def = new Array(16, 18, 13, 14, 17, 12);

    // define bookmarks
    // New Bookmarks under custom_Bookmarks ..
    c.bookmarks = new Array();
//--> $$058 Begin of insert
    // WICHTIG: Die Reihenfolge darf hier auf keinen Fall geändert werden, weil dadurch eine falsche Zuordnung zu den 
    //          gespeicherten Userdaten erfolgen würde! Weiter unten gibt es noch einen Bereich mit Bookmarks, die quasi
    //          noch hinten dran gehängt werden.
//<-- $$058 End of insert
//--> $$002 Begin of delete
//    bookmark("Watchlist", "/my/watchlist.aspx", c.bookmarks);
//    bookmark("Geocaches", "/my/geocaches.aspx", c.bookmarks);
//    bookmark("My Geocaches", "/my/owned.aspx", c.bookmarks);
//    bookmark("Trackable Items", "/my/travelbugs.aspx", c.bookmarks);
//    bookmark("Trackables Inventory", "/my/inventory.aspx", c.bookmarks);
//    bookmark("Trackables Collection", "/my/collection.aspx", c.bookmarks);
//    bookmark("Benchmarks", "/my/benchmarks.aspx", c.bookmarks);
//    bookmark("Member Features", "/my/subscription.aspx", c.bookmarks);
//    bookmark("Friends", "/my/myfriends.aspx", c.bookmarks);
//    bookmark("Account Details", "/account/default.aspx", c.bookmarks);
//    bookmark("Public Profile", "/profile/", c.bookmarks);
//    bookmark("Search", "/seek/nearest.aspx", c.bookmarks);
//    bookmark("Routes", "/my/userroutes.aspx#find", c.bookmarks);
//    bookmark("Upload Field Notes", "/my/uploadfieldnotes.aspx", c.bookmarks);
//    bookmark("Pocket Queries", "/pocket/default.aspx", c.bookmarks);
//    bookmark("Saved GPX", "/pocket/saved.aspx", c.bookmarks);
//    bookmark("Bookmarks", "/bookmarks/default.aspx", c.bookmarks);
//    bookmark("Notifications", "/notify/default.aspx", c.bookmarks);
//    profileBookmark("Find Player", "lnk_findplayer", c.bookmarks);
//    bookmark("E-Mail", "/email/default.aspx", c.bookmarks);
//    bookmark("Statbar", "/my/statbar.aspx", c.bookmarks);
//    bookmark("Guidelines", "/about/guidelines.aspx", c.bookmarks);
//    bookmark("GClhConfig", "/my/default.aspx#GClhShowConfig", c.bookmarks);
//<-- $$002 End of delete 
//--> $$002 Begin of insert
    bookmark("Watchlist", "https://www.geocaching.com/my/watchlist.aspx", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Geocaches", "https://www.geocaching.com/my/geocaches.aspx", c.bookmarks);
    bookmark("Logs Geocaches", "https://www.geocaching.com/my/geocaches.aspx", c.bookmarks);
//    bookmark("My Geocaches", "https://www.geocaching.com/my/owned.aspx", c.bookmarks);
    bookmark("Own Geocaches", "https://www.geocaching.com/my/owned.aspx", c.bookmarks);
//    bookmark("Trackables Items", "https://www.geocaching.com/my/travelbugs.aspx", c.bookmarks);
    bookmark("Logs Trackables", "https://www.geocaching.com/my/travelbugs.aspx", c.bookmarks);
//<-- $$058 End of change
    bookmark("Trackables Inventory", "https://www.geocaching.com/my/inventory.aspx", c.bookmarks);
    bookmark("Trackables Collection", "https://www.geocaching.com/my/collection.aspx", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Benchmarks", "https://www.geocaching.com/my/benchmarks.aspx", c.bookmarks);
    bookmark("Logs Benchmarks", "https://www.geocaching.com/my/benchmarks.aspx", c.bookmarks);
//<-- $$058 End of change
    bookmark("Member Features", "https://www.geocaching.com/my/subscription.aspx", c.bookmarks);
    bookmark("Friends", "https://www.geocaching.com/my/myfriends.aspx", c.bookmarks);
    bookmark("Account Details", "https://www.geocaching.com/account/default.aspx", c.bookmarks);
    bookmark("Public Profile", "https://www.geocaching.com/profile/", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Search", "https://www.geocaching.com/seek/nearest.aspx", c.bookmarks);
    bookmark("Search GC (old adv.)", "https://www.geocaching.com/seek/nearest.aspx", c.bookmarks);
//<-- $$058 End of change
    bookmark("Routes", "https://www.geocaching.com/my/userroutes.aspx#find", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Upload Field Notes", "https://www.geocaching.com/my/uploadfieldnotes.aspx", c.bookmarks);
    bookmark("Field Notes Upload", "https://www.geocaching.com/my/uploadfieldnotes.aspx", c.bookmarks);
//<-- $$058 End of change
    bookmark("Pocket Queries", "https://www.geocaching.com/pocket/default.aspx", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Saved GPX", "https://www.geocaching.com/pocket/saved.aspx", c.bookmarks);
    bookmark("Pocket Queries Saved", "https://www.geocaching.com/pocket/default.aspx#DownloadablePQs", c.bookmarks);
//<-- $$058 End of change
    bookmark("Bookmarks", "https://www.geocaching.com/bookmarks/default.aspx", c.bookmarks);
    bookmark("Notifications", "https://www.geocaching.com/notify/default.aspx", c.bookmarks);
    profileBookmark("Find Player", "lnk_findplayer", c.bookmarks);
    bookmark("E-Mail", "https://www.geocaching.com/email/default.aspx", c.bookmarks);
    bookmark("Statbar", "https://www.geocaching.com/my/statbar.aspx", c.bookmarks);
    bookmark("Guidelines", "https://www.geocaching.com/about/guidelines.aspx", c.bookmarks);
//--> $$038 Begin of change
//    bookmark("GClhConfig", "https://www.geocaching.com/my/default.aspx#GClhShowConfig", c.bookmarks);
    profileSpecialBookmark("GClh Config", "https://www.geocaching.com/my/default.aspx#GClhShowConfig", "lnk_gclhconfig", c.bookmarks);
//<-- $$038 End of change
//<-- $$002 End of insert
    externalBookmark("Forum", "http://forums.groundspeak.com/", c.bookmarks);
//--> $$058 Begin of change
//    externalBookmark("Blog", "http://blog.geocaching.com/", c.bookmarks);
    externalBookmark("Blog", "https://www.geocaching.com/blog/", c.bookmarks);
//    externalBookmark("Feedback", "http://feedback.geocaching.com/", c.bookmarks);
    bookmark("Feedback", "https://www.geocaching.com/feedback/", c.bookmarks);
//<-- $$058 End of change
    externalBookmark("Geoclub", "http://www.geoclub.de/", c.bookmarks);
    profileBookmark("Public Profile Geocaches", "lnk_profilegeocaches", c.bookmarks);
    profileBookmark("Public Profile Trackables", "lnk_profiletrackables", c.bookmarks);
    profileBookmark("Public Profile Gallery", "lnk_profilegallery", c.bookmarks);
//--> $$058 Begin of change
//    profileBookmark("Public Profile Bookmarks", "lnk_profilebookmarks", c.bookmarks);
    profileBookmark("Public Profile Lists", "lnk_profilebookmarks", c.bookmarks);
//<-- $$058 End of change
//--> $$002 Begin of change
//    bookmark("My Profile", "/my/", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("My Profile", "https://www.geocaching.com/my/", c.bookmarks);
    bookmark("Profile", "https://www.geocaching.com/my/", c.bookmarks);
//<-- $$058 End of change
//<-- $$002 End of change
    profileBookmark("Nearest List", "lnk_nearestlist", c.bookmarks);
    profileBookmark("Nearest Map", "lnk_nearestmap", c.bookmarks);
    profileBookmark("Nearest List (w/o Founds)", "lnk_nearestlist_wo", c.bookmarks);
//--> $$058 Begin of change
//    profileBookmark("My Trackables", "lnk_my_trackables", c.bookmarks);
    profileBookmark("Own Trackables", "lnk_my_trackables", c.bookmarks);
//<-- $$058 End of change

    c.gclhConfigKeysIgnoreForBackup = {
        "token": true,
        "settings_configsync_configid": true,
        "doPostBack_after_redirect": true,
        "dbToken": true,
        "hide_contribute": true
    };
    c.global_log_it_icon = "data:image/png;base64,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";
    c.global_mail_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHg0gKjtwF3IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABdElEQVQoz4WRMaviUBSEv5s8H8RO0Eq00SiCRMQigoiCYC2I/hhbwd8g1lpZWFioECwl2IqIwT5iGdDCK94tlhf27cK+gWmGYZg5R9i2rUzTpFAooOs6AEIINE1DCPEPv/T3+81yuURMJhNlmiYAtVqNSCTCT7her6zXa6SUaFJKms0m8XicxWLB5XIJjUqpkAD3+53tdovruvT7faSUfHyZi8UiyWQSx3HwfZ96vY4QIgy73W5sNhssy6LRaIRztT+rxWIxer0eUkpms1moe57HfD6n0+lQKpXQdT1s9fH3PqUUmUwG13UZjUaUy2V2ux2WZRGNRlFKfWv2LSAIAlzXJQgCBoMBz+eTw+HAcDjE8zym0ynVapVsNhtOCAOOxyOn04l8Pk+73Qbg8/OTSqWCUopcLkcikWC/33M+n2m1Wr9fPh6PVTqdxjAMbNvGMIwf3+j7Po7j8Hg8EJZlqW63SyqVQtO08Dj/gxCC1+vFarXiF7aOl1qte6kYAAAAAElFTkSuQmCC";
//--> $$002 Begin of insert
    c.global_gc_icon = "data:image/png;base64,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";
//<-- $$002 End of insert
//--> $$004 Begin of insert
    c.global_message_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAKCAMAAABsSeXqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAq1BMVEX/AAAuLi43NzdERERTU1NcXFyBgYGFhYWIiIiJiYmLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWYmJiampqcnJyenp6fn5+goKCioqKkpKSpqamqqqqrq6uvr6+xsbG2tra4uLi9vb2/v7/CwsLMzMzQ0NDT09PU1NTZ2dnb29vn5+fp6enu7u7x8fHy8vL09PT19fX29vb6+vr8/Pz+/v7///+lQzgqAAAAAXRSTlMAQObYZgAAAIxJREFUCB01wQcSgjAQBdC1Y28LCrGGIoIKomb//U9mJjO8R053MPK88WQ6my+W682qR06Qpj+0nmFADuN+fAAigia5fJiskhmoThmsl8oNmByGlRyAcvsGhIlIMzMAkUxplRuBMDkM1CJobhCpDZgKzRaKcw1LUMXXhsnxdfpFK1Y+OZ3hPgpb0a7/B4B/GcUl57niAAAAAElFTkSuQmCC";
//<-- $$004 End of insert
//--> $$016 Begin of insert
    c.global_stop_ignore_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX////Nzc3Pzs/S0tLW1tbX19fZ2dnc3Nzf39/h4eHiDRXjGCDkGyPkHiblJCvlKTHmLDPmLzbmMjnnNTznO0HoQEfoQ0npRkzrVFrt7O3uc3jveX7v7+/wgobwhYnx8fHyk5by8vLzmZzznqH0oaT0pKf0p6r2srX4xsj5z9D5+fn61Nb6+vr7+/v8/Pz98fH9/f3+9vf//Py/jJ9UAAAAAXRSTlMAQObYZgAAAK9JREFUGBkFwQlCwjAURdH7yG8NsUyiIloMLWE0kcj+F+c5APReko8AALdGkiS1GYCbkw2ZHE0uAzRSUwCqVwv0MpMVgGoa4ElDMVkBiJqCU6XYZPsLZBlIQLHJ9msVXnYCpwoUW89P17R++8MrAnzOwxHui2+iXAVm5xSOkFbQylcIP6SQuHSQnazPsxOkcBhfgdxK2i3vcAjdCMAwNW2W42X//PEAAOCxf+82I/wDKl0NPPJFCYkAAAAASUVORK5CYII=";
//<-- $$016 End of insert
//--> $$040 Begin of insert
    c.global_restore_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA5FBMVEX////q6uqEhITR0dEfHx9HR0f7+/v8/Pz+/v6vr68LCwtHR0b4+Pj+/v6Dg4MBAQEJCQg0NDR3d3fOzs729vZZWVk/Pz/Pz8/+/v68vLwHBwcGBgajo6P4+Pi/v78WFhYLCwvX19fT09IlJSQmJiZqamokJCSHh4fr6+s5OTlHR0f9/fybm5oHBweCgoL39/dUVFT19fX09PRWVlbExMT+/v6xsbFpaWlDQ0P6+vogICAXFxfj4+OWlpYTExPZ2dktLS3V1dXu7u5wcHDs7Oz8/PzJyckCAgIEBAMEBAQAAAAAAADG7gw5AAAAAXRSTlMAQObYZgAAAIVJREFUGBlVwecOQUEQBtBP+4FEDTdKdC43WkIQvYXZmfd/HxlLsnsOrFgcnkQyBVc6887CkcuTKRRLZfxUmAyxiFQDqFqdDLGoRhOq1SYWxdTpQvX6IoPhiMlQiK/xRCJgOiOew1osIwArljX+NgC2soNnfzjCdToHcF2uN7jujyc8L1gfFdIUEEvB1dMAAAAASUVORK5CYII=";
//<-- $$040 End of insert

    constInitDeref.resolve();
    return constInitDeref.promise();
};

var variablesInit = function (c) {
    var variablesInitDeref = new jQuery.Deferred();

    c.userInfo = c.userInfo || window.userInfo || null;
    c.isLoggedIn = c.isLoggedIn || window.isLoggedIn || null;
    c.userDefinedCoords = c.userDefinedCoords || window.userDefinedCoords || null;
    c.userToken = c.userToken || window.userToken || null;

    c.http = "http";
    if (document.location.href.toLowerCase().indexOf("https") === 0) {
        c.http = "https";
    }
//--> $$023 Begin of insert
    c.global_imageGallery = false;    
//<-- $$023 End of insert
//--> $$040 Begin of insert
    c.global_dependents = new Array();    
//<-- $$040 End of insert

    // Settings: Submit Log on F2
    c.settings_submit_log_button = getValue("settings_submit_log_button", true);
    // Settings: Log Inline
    c.settings_log_inline = getValue("settings_log_inline", true);
    c.settings_log_inline_tb = getValue("settings_log_inline_tb", false);
    c.settings_log_inline_pmo4basic = getValue("settings_log_inline_pmo4basic", false);
    // Settings: Show Bookmarks
    c.settings_bookmarks_show = getValue("settings_bookmarks_show", true);
	c.settings_change_header_layout = getValue("settings_change_header_layout", true);
    // Settings: Bookmarks on Top
    c.settings_bookmarks_on_top = getValue("settings_bookmarks_on_top", true);
    c.settings_bookmarks_top_menu = getValue("settings_bookmarks_top_menu", "true");
    c.settings_bookmarks_search = getValue("settings_bookmarks_search", "true");
    c.settings_bookmarks_search_default = getValue("settings_bookmarks_search_default", "");
    // Settings: Redirect to Map
    c.settings_redirect_to_map = getValue("settings_redirect_to_map", false);
    // Settings: Hide Facebook
    c.settings_hide_facebook = getValue("settings_hide_facebook", false);
    // Settings: Hide SocialShare
    c.settings_hide_socialshare = getValue("settings_hide_socialshare", false);
//--> $$055 Begin of delete
//    // Settings: Hideable Souvenirs
//    c.settings_hideable_souvenirs = getValue("settings_hideable_souvenirs", true);
//<-- $$055 End of delete 
    // Settings: Hide Disclaimer
    c.settings_hide_disclaimer = getValue("settings_hide_disclaimer", true);
    // Settings: Hide Cache Notes
    c.settings_hide_cache_notes = getValue("settings_hide_cache_notes", false);
    // Settings: Hide Cache Notes if empty
    c.settings_hide_empty_cache_notes = getValue("settings_hide_empty_cache_notes", true);
//--> $$055 Begin of delete
//    c.settings_breaks_in_cache_notes = getValue("settings_breaks_in_cache_notes", true);
//<-- $$055 End of delete 
    // Settings: Show all Logs
    c.settings_show_all_logs = getValue("settings_show_all_logs", true);
    c.settings_show_all_logs_count = getValue("settings_show_all_logs_count", "5");
    // Settings: Decrypt Hint
    c.settings_decrypt_hint = getValue("settings_decrypt_hint", false);
    // Settings: Add visitCount to geochecker.com  links
    c.settings_visitCount_geocheckerCom = getValue("settings_visitCount_geocheckerCom", false);
    // Settings: Show Smilies & BBCode
    c.settings_show_bbcode = getValue("settings_show_bbcode", true);
//--> $$052 Begin of delete
//    // Settings: Show datepicker
//    c.settings_show_datepicker = getValue("settings_show_datepicker", true);
//<-- $$052 End of delete 
    // Settings: Show mail-Link
    c.settings_show_mail = getValue("settings_show_mail", true);
    // Settings: Show Coord-Link in Mail
    c.settings_show_mail_coordslink = getValue("settings_show_mail_coordslink", false);
//--> $$002 Begin of insert
    //Settings: Schriftgröße im Menü in Pixel
    c.settings_font_size_menu = getValue("settings_font_size_menu", 15);
    //Settings: Schriftgröße im Untermenü in Pixel
    c.settings_font_size_submenu = getValue("settings_font_size_submenu", 13);
    //Settings: Horizontale Abstände zwischen den Menüs in Pixel 
    c.settings_distance_menu = getValue("settings_distance_menu", 8);
    //Settings: Vertikale Abstände zwischen den Untermenüs in Pixel
    c.settings_distance_submenu = getValue("settings_distance_submenu", 8);
    //Settings: Schriftfarbe im Menü und im Submenü
    c.settings_font_color_menu_submenu = getValue("settings_font_color_menu_submenu", "93B516");
    //Settings: Anzahl Zeilen bei Menüs in horizontaler Ausrichtung
    c.settings_menu_number_of_lines = getValue("settings_menu_number_of_lines", 1);
    // Settings: Show Separator bei Menüs in horizontaler Ausrichtung
    c.settings_menu_show_separator = getValue("settings_menu_show_separator", false);
    // Settings: Menüs rechts ausrichten
    c.settings_menu_float_right = getValue("settings_menu_float_right", false);
    // Settings: GC Tour is working
    c.settings_gc_tour_is_working = getValue("settings_gc_tour_is_working", false);
    // Settings: Show smaller User-Settings-Message-Area top right
    c.settings_show_smaller_area_top_right = getValue("settings_show_smaller_area_top_right", true);
    // Settings: Show smaller Geocaching Link top left
    c.settings_show_smaller_gc_link = getValue("settings_show_smaller_gc_link", false);
//<-- $$002 End of insert
//--> $$004 Begin of insert
    // Settings: Show Message-Link
    c.settings_show_message = getValue("settings_show_message", false);
    // Settings: Show Coord-Link in Message
    c.settings_show_message_coordslink = getValue("settings_show_message_coordslink", false);
//<-- $$004 End of insert
//--> $$016 Begin of insert
    // Settings: Show Stop Ignoring Link
    c.settings_show_remove_ignoring_link = getValue("settings_show_remove_ignoring_link", false);
//<-- $$016 End of insert
//--> $$040 Begin of insert
    // Settings: Zeilen in gewöhnlichen Listen in Zebra einfärben
    c.settings_show_common_lists_in_zebra = getValue("settings_show_common_lists_in_zebra", true);
    // Settings: Founds in Zeilen in gewöhnlichen Listen einfärben
    c.settings_show_common_lists_color_user = getValue("settings_show_common_lists_color_user", true);
    // Settings: Zeilen in Cache Listings in Zebra einfärben
    c.settings_show_cache_listings_in_zebra = getValue("settings_show_cache_listings_in_zebra", false);
    // Settings: Zeilen in Cache Listings für User einfärben
    c.settings_show_cache_listings_color_user = getValue("settings_show_cache_listings_color_user", false);
    // Settings: Zeilen in Cache Listings für Owner einfärben
    c.settings_show_cache_listings_color_owner = getValue("settings_show_cache_listings_color_owner", false);
    // Settings: Zeilen in Cache Listings für Reviewer einfärben
    c.settings_show_cache_listings_color_reviewer = getValue("settings_show_cache_listings_color_reviewer", false);
    // Settings: Zeilen in Cache Listings für VIPs einfärben
    c.settings_show_cache_listings_color_vip = getValue("settings_show_cache_listings_color_vip", false);
    // Settings: Zeilen in TB Listings in Zebra einfärben
    c.settings_show_tb_listings_in_zebra = getValue("settings_show_tb_listings_in_zebra", false);
    // Settings: Zeilen in TB Listings für User einfärben
    c.settings_show_tb_listings_color_user = getValue("settings_show_tb_listings_color_user", true);
    // Settings: Zeilen in TB Listings für Owner einfärben
    c.settings_show_tb_listings_color_owner = getValue("settings_show_tb_listings_color_owner", true);
    // Settings: Zeilen in TB Listings für Reviewer einfärben
    c.settings_show_tb_listings_color_reviewer = getValue("settings_show_tb_listings_color_reviewer", false);
    // Settings: Zeilen in TB Listings für VIPs einfärben
    c.settings_show_tb_listings_color_vip = getValue("settings_show_tb_listings_color_vip", false);
    //Settings: Farbe um Zeilen in Zebra einzufärben
    c.settings_lines_color_zebra = getValue("settings_lines_color_zebra", "EBECED");
    //Settings: Farbe um Zeilen für User bzw. founds einzufärben
    c.settings_lines_color_user = getValue("settings_lines_color_user", "C2E0C3");
    //Settings: Farbe um Zeilen für Owner einzufärben
    c.settings_lines_color_owner = getValue("settings_lines_color_owner", "E0E0C3");
    //Settings: Farbe um Zeilen für Reviewer einzufärben
    c.settings_lines_color_reviewer = getValue("settings_lines_color_reviewer", "EAD0C3");
    //Settings: Farbe um Zeilen für VIP einzufärben
    c.settings_lines_color_vip = getValue("settings_lines_color_vip", "F0F0A0");
//<-- $$040 End of insert
//--> $$024 Begin of insert
    // Settings: Show Mail Link beside User in "All my VIPs" List in Profile
    c.settings_show_mail_in_allmyvips = getValue("settings_show_mail_in_allmyvips", false);
//<-- $$024 End of insert
//--> $$025 Begin of insert
    // Settings: Show Mail Link beside User in "VIP-List" in Listing
    c.settings_show_mail_in_viplist = getValue("settings_show_mail_in_viplist", false);
//<-- $$025 End of insert
//--> $$028 Begin of insert
    // Settings: Save GClh Config on F2
    c.settings_f2_save_gclh_config = getValue("settings_f2_save_gclh_config", false);
//<-- $$028 End of insert
//--> $$029 Begin of insert
    // Settings: Call GClh Config on F4
    c.settings_f4_call_gclh_config = getValue("settings_f4_call_gclh_config", false);
//<-- $$029 End of insert
//--> $$032 Begin of insert
    // Settings: Anzahl Caches und Anzahl selektierte Caches in Bookmark Listen anzeigen
    c.settings_show_sums_in_bookmark_lists = getValue("settings_show_sums_in_bookmark_lists", false);
    // Settings: Anzahl Caches und Anzahl selektierte Caches in Watchlist anzeigen
    c.settings_show_sums_in_watchlist = getValue("settings_show_sums_in_watchlist", false);
//<-- $$032 End of insert
//--> $$033 Begin of insert
    // Settings: Hide Warning Message
    c.settings_hide_warning_message = getValue("settings_hide_warning_message", false);
//<-- $$033 End of insert
//--> $$035 Begin of insert
    // Settings: Show info message if GClh data are saved
    c.settings_show_save_message = getValue("settings_show_save_message", false);
//<-- $$035 End of insert
//--> $$045 Begin of insert
    // Settings: Show Map Overview
    c.settings_map_overview_build = getValue("settings_map_overview_build", false);
    //Settings: Map zoom value
    c.settings_map_overview_zoom = getValue("settings_map_overview_zoom", 11);
//<-- $$045 End of insert
//--> $$048 Begin of insert
    //Settings: Loggen über Standard "Log It" Icons zu Premium Only Caches für Basic Members
    c.settings_logit_for_basic_in_pmo = getValue("settings_logit_for_basic_in_pmo", false);
//<-- $$048 End of insert
//--> $$049 Begin of insert
    //Settings: Count cache matrix in own statistic
    c.settings_count_own_matrix = getValue("settings_count_own_matrix", true);
    //Settings: Count cache matrix in foreign statistic
    c.settings_count_foreign_matrix = getValue("settings_count_foreign_matrix", true);
    //Settings: Show next cache matrix in own statistic
    c.settings_count_own_matrix_show_next = getValue("settings_count_own_matrix_show_next", false);
    //Settings: Show for next ... matrixes 
    c.settings_count_own_matrix_show_count_next = getValue("settings_count_own_matrix_show_count_next", 2);
    //Settings: Show next cache matrix in color
    c.settings_count_own_matrix_show_color_next = getValue("settings_count_own_matrix_show_color_next", "5151FB");
    //Settings: Generate cache search links with radius ... km 
    c.settings_count_own_matrix_links_radius = getValue("settings_count_own_matrix_links_radius", 25);
    //Settings: Show caches in a map/list
    c.settings_count_own_matrix_links = getValue("settings_count_own_matrix_links", "map");
//<-- $$049 End of insert
//--> $$053 Begin of insert
    //Settings: Hide left sidebar on Google Maps 
    c.settings_hide_left_sidebar_on_google_maps = getValue("settings_hide_left_sidebar_on_google_maps", true);
    //Settings: Add link to GC Map on Google Maps 
    c.settings_add_link_gc_map_on_google_maps = getValue("settings_add_link_gc_map_on_google_maps", true);
    //Settings: Switch to GC Map in same browser tab 
    c.settings_switch_to_gc_map_in_same_tab = getValue("settings_switch_to_gc_map_in_same_tab", true);
    //Settings: Add link to Google Maps on GC Map 
    c.settings_add_link_google_maps_on_gc_map = getValue("settings_add_link_google_maps_on_gc_map", true);
    //Settings: Switch to Google Maps in same browser tab
    c.settings_switch_to_google_maps_in_same_tab = getValue("settings_switch_to_google_maps_in_same_tab", true);
//<-- $$053 End of insert
//--> $$058 Begin of insert // Sort Linklist
    //Settings: Sort default links for the Linklist
    c.settings_sort_default_bookmarks = getValue("settings_sort_default_bookmarks", false);
//<-- $$058 End of insert
    // Settings: Show EventDay
    c.settings_show_eventday = getValue("settings_show_eventday", true);
    c.settings_date_format = getValue("settings_date_format", "MM/dd/yyyy");
    // Settings: Show google-maps Link
    c.settings_show_google_maps = getValue("settings_show_google_maps", true);
    // Settings: Show Log It Icon
    c.settings_show_log_it = getValue("settings_show_log_it", true);
    // Settings: Show Profile-Link on display of Caches found or created by user
    c.settings_show_nearestuser_profil_link = getValue("settings_show_nearestuser_profil_link", true);
    // Settings: Show Homezone
    c.settings_show_homezone = getValue("settings_show_homezone", true);
    c.settings_homezone_radius = getValue("settings_homezone_radius", "10");
    c.settings_homezone_color = getValue("settings_homezone_color", "#0000FF");
    c.settings_homezone_opacity = getValue("settings_homezone_opacity", 10);
    // Settings: Multi Homezone
    c.settings_multi_homezone = JSON.parse(getValue("settings_multi_homezone", "{}"));
    // Settings: Hill Shadow
    c.settings_show_hillshadow = getValue("settings_show_hillshadow", false);
    c.settings_map_layers = getValue("settings_map_layers", "").split("###");
    // Settings: default Map
    c.map_url = "https://www.geocaching.com/map/default.aspx";
    // Settings: default Log Type
    c.settings_default_logtype = getValue("settings_default_logtype", "-1");
    c.settings_default_logtype_event = getValue("settings_default_logtype_event", c.settings_default_logtype);
    c.settings_default_logtype_owner = getValue("settings_default_logtype_owner", c.settings_default_logtype);
    // Settings: default TB-Log Type
    c.settings_default_tb_logtype = getValue("settings_default_tb_logtype", "-1");
    // Settings: Bookmarklist
    c.settings_bookmarks_list = JSON.parse(getValue("settings_bookmarks_list", JSON.stringify(c.bookmarks_def)).replace(/, (?=,)/g, ",null"));
    if (c.settings_bookmarks_list.length == 0) {
        c.settings_bookmarks_list = c.bookmarks_def;
    }
//--> $$043 Begin of delete
//    c.settings_bookmarks_list_beta = JSON.parse(getValue("settings_bookmarks_list_beta", JSON.stringify(c.bookmarks_def)).replace(/, (?=,)/g, ",null"));
//    if (c.settings_bookmarks_list_beta.length == 0) {
//        c.settings_bookmarks_list_beta = c.bookmarks_def;
//    }
//<-- $$043 End of delete 
    // Settings: Sync
    c.settings_sync_last = new Date(getValue("settings_sync_last", "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Zeit)"));
    c.settings_sync_hash = getValue("settings_sync_hash", "");
    c.settings_sync_time = getValue("settings_sync_time", 36000000);  // 10 Stunden
    c.settings_sync_autoImport = getValue("settings_sync_autoImport", false);

    // Settinks: Dynamic Map
    c.settings_hide_advert_link = getValue('settings_hide_advert_link', true);
//--> $$055 Begin of delete
//    c.settings_hide_line_breaks = getValue('settings_hide_line_breaks', true);
//<-- $$055 End of delete 
    c.settings_hide_spoilerwarning = getValue('settings_hide_spoilerwarning', true);
    c.settings_hide_hint = getValue('settings_hide_hint', true);
    c.settings_strike_archived = getValue('settings_strike_archived', true);
    c.settings_highlight_usercoords = getValue('settings_highlight_usercoords', true);
    c.settings_map_hide_found = getValue('settings_map_hide_found', false);
    c.settings_map_hide_hidden = getValue('settings_map_hide_hidden', false);
    c.settings_map_hide_2 = getValue('settings_map_hide_2', false);
    c.settings_map_hide_9 = getValue('settings_map_hide_9', false);
    c.settings_map_hide_5 = getValue('settings_map_hide_5', false);
    c.settings_map_hide_3 = getValue('settings_map_hide_3', false);
    c.settings_map_hide_6 = getValue('settings_map_hide_6', false);
    c.settings_map_hide_453 = getValue('settings_map_hide_453', false);
//--> $$018 Begin of insert
    c.settings_map_hide_7005 = getValue('settings_map_hide_7005', false);
//<-- $$018 End of insert
    c.settings_map_hide_13 = getValue('settings_map_hide_13', false);
    c.settings_map_hide_1304 = getValue('settings_map_hide_1304', false);
    c.settings_map_hide_4 = getValue('settings_map_hide_4', false);
    c.settings_map_hide_11 = getValue('settings_map_hide_11', false);
    c.settings_map_hide_137 = getValue('settings_map_hide_137', false);
    c.settings_map_hide_8 = getValue('settings_map_hide_8', false);
    c.settings_map_hide_1858 = getValue('settings_map_hide_1858', false);
    c.settings_show_fav_percentage = getValue('settings_show_fav_percentage', false);
    c.settings_show_vip_list = getValue('settings_show_vip_list', true);
    c.settings_show_owner_vip_list = getValue('settings_show_owner_vip_list', true);
    c.settings_autovisit = getValue("settings_autovisit", "true");
    c.settings_show_thumbnails = getValue("settings_show_thumbnails", true);
    c.settings_imgcaption_on_top = getValue("settings_imgcaption_on_top", false);
    c.settings_hide_avatar = getValue("settings_hide_avatar", false);
    c.settings_show_big_gallery = getValue("settings_show_big_gallery", false);
    c.settings_automatic_friend_reset = getValue("settings_automatic_friend_reset", true);
    c.settings_show_long_vip = getValue("settings_show_long_vip", false);
    c.settings_load_logs_with_gclh = getValue("settings_load_logs_with_gclh", true);
    c.settings_map_add_layer = getValue("settings_map_add_layer", true);
    c.settings_map_default_layer = getValue("settings_map_default_layer", "MapQuest OSM");
    c.settings_hide_map_header = getValue("settings_hide_map_header", false);
//--> $$023 Begin of change - Disable Spoiler String
//    c.settings_spoiler_strings = getValue("settings_spoiler_strings", "spoiler|hinweis|hint");
//<-- $$023 End of change
    c.settings_replace_log_by_last_log = getValue("settings_replace_log_by_last_log", false);
    c.settings_hide_top_button = getValue("settings_hide_top_button", false);
    c.settings_show_real_owner = getValue("settings_show_real_owner", false);
    c.settings_hide_visits_in_profile = getValue("settings_hide_visits_in_profile", false);
    c.settings_log_signature_on_fieldnotes = getValue("settings_log_signature_on_fieldnotes", true);
    c.settings_map_hide_sidebar = getValue("settings_map_hide_sidebar", false);
    c.settings_hover_image_max_size = getValue("settings_hover_image_max_size", 600);
    c.settings_vip_show_nofound = getValue("settings_vip_show_nofound", false);
    c.settings_use_gclh_layercontrol = getValue("settings_use_gclh_layercontrol", true);
    c.settings_fixed_pq_header = getValue("settings_fixed_pq_header", false);

    // Settings: Custom Bookmarks
    var num = c.bookmarks.length;
    for (var i = 0; i < c.anzCustom; i++) {
        c.bookmarks[num] = Object();

        if (getValue("settings_custom_bookmark[" + i + "]", "") != "") {
            c.bookmarks[num]['href'] = getValue("settings_custom_bookmark[" + i + "]");
        } else {
            c.bookmarks[num]['href'] = "#";
        }

        if (getValue("settings_bookmarks_title[" + num + "]", "") != "") {
            c.bookmarks[num]['title'] = getValue("settings_bookmarks_title[" + num + "]");
        } else {
            c.bookmarks[num]['title'] = "Custom" + i;
            setValue("settings_bookmarks_title[" + num + "]", bookmarks[num]['title']);
        }

        if (getValue("settings_custom_bookmark_target[" + i + "]", "") != "") {
            c.bookmarks[num]['target'] = getValue("settings_custom_bookmark_target[" + i + "]");
            c.bookmarks[num]['rel'] = "external";
        } else {
            c.bookmarks[num]['target'] = "";
        }

        c.bookmarks[num]['custom'] = true;
        num++;
    }

    // Some more Bookmarks ..
    profileBookmark("Public Profile Souvenirs", "lnk_profilesouvenirs", c.bookmarks);
//--> $$002 Begin of change
//    bookmark("Profile Statistics", "/my/statistics.aspx", c.bookmarks);
//--> $$058 Begin of change
//    bookmark("Profile Statistics", "https://www.geocaching.com/my/statistics.aspx", c.bookmarks);
    bookmark("Statistics", "https://www.geocaching.com/my/statistics.aspx", c.bookmarks);
//<-- $$058 End of change
//    bookmark("Field Notes", "/my/fieldnotes.aspx", c.bookmarks);
    bookmark("Field Notes", "https://www.geocaching.com/my/fieldnotes.aspx", c.bookmarks);
//<-- $$002 End of change
//--> $$058 Begin of insert
    profileBookmark("Public Profile Statistics", "lnk_profilestatistics", c.bookmarks);
    bookmark("Geocaches RecViewed", "https://www.geocaching.com/my/recentlyviewedcaches.aspx", c.bookmarks);
    bookmark("Search TB", "https://www.geocaching.com/track/travelbug.aspx", c.bookmarks);
    bookmark("Search Geocoin", "https://www.geocaching.com/track/geocoin.aspx", c.bookmarks);
    externalBookmark("Geocaches Labs", "https://labs.geocaching.com/", c.bookmarks);
    bookmark("Search GC", "https://www.geocaching.com/play/search/", c.bookmarks);
    bookmark("Geocache Hide", "https://www.geocaching.com/play/hide/", c.bookmarks);
    bookmark("Message Center", "https://www.geocaching.com/account/messagecenter", c.bookmarks);
    bookmark("Search GC (old)", "https://www.geocaching.com/seek/", c.bookmarks);
    bookmark("Glossary of Terms", "https://www.geocaching.com/about/glossary.aspx", c.bookmarks);
    bookmark("Event Calendar", "https://www.geocaching.com/calendar/", c.bookmarks);
    bookmark("Geocache Adoption", "https://www.geocaching.com/adopt/", c.bookmarks);
    externalBookmark("Flopps Karte", "http://flopp-caching.de/", c.bookmarks);
    externalBookmark("Geokrety", "http://geokrety.org/", c.bookmarks);
    externalBookmark("Project Geocaching", "http://project-gc.com/", c.bookmarks);
    bookmark("Search TB adv.", "https://www.geocaching.com/track/search.aspx", c.bookmarks);
    bookmark("View Geocache Map", "https://www.geocaching.com/map/", c.bookmarks);
//<-- $$058 End of insert

    // Settings: Custom Bookmark-title
    c.bookmarks_orig_title = new Array();
    for (var i = 0; i < c.bookmarks.length; i++) {
        if (getValue("settings_bookmarks_title[" + i + "]", "") != "") {
            c.bookmarks_orig_title[i] = c.bookmarks[i]['title']; // Needed for configuration
            c.bookmarks[i]['title'] = getValue("settings_bookmarks_title[" + i + "]");
        }
    }

    try {
        if (c.userToken === null) {
            //Get Userdata from site context and add them to the extension context
            c.userData = $('#aspnetForm script:not([src])').filter(function () {
                return this.innerHTML.indexOf("ccConversions") != -1;
            }).html();

            if (c.userData !== null) {
                if (typeof c.userData !== "undefined") {
                    c.userData = c.userData.replace('{ID: ', '{"ID": ');

                    //var regex = /([a-zA-Z0-9]+)( = )(((["'][^"']*["'])|([^;]))+)(;)/g;
                    var regex = /([a-zA-Z0-9öÖäÄüÜß]+)([ ]?=[ ]?)(((({.+})(;)))|(((\[.+\])(;)))|(((".+")(;)))|((('.+')(;)))|(([^'"{\[].+)(;)))/g;

                    var match;
                    while (match = regex.exec(userData)) {
                        if (match[1] == "eventCacheData") continue;   // Workaround fuer event-Listings (da ist ne Funktion in dem Script-Element)
                        var data = (match[6] || match[10] || match[14] || match[18] || match[21]).trim();

                        /*if(match[1].trim()=="initalLogs"){
                         continue;
                         }*/

                        if (data.charAt(0) == '"' || data.charAt(0) == "'") {
                            data = data.slice(1, data.length - 1);
                        }

                        data = data.trim();

                        if (data.charAt(0) == '{' || data.charAt(0) == '[') {
                            data = JSON.parse(data);
                        }

                        if (typeof c.chromeUserData === "undefined") {
                            c.chromeUserData = {};
                        }

                        c.chromeUserData[match[1].replace('"', '').replace("'", "").trim()] = data;
                    }

                    if (c.chromeUserData["userInfo"]) {
                        c.userInfo = chromeUserData["userInfo"];
                    }
                    if (c.chromeUserData["isLoggedIn"]) {
                        c.isLoggedIn = chromeUserData["isLoggedIn"];
                    }
                    if (c.chromeUserData["userDefinedCoords"]) {
                        c.userDefinedCoords = c.chromeUserData["userDefinedCoords"];
                    }
                    if (c.chromeUserData["userToken"]) {
                        c.userToken = c.chromeUserData["userToken"];
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("Error parsing userdata from page.", e);
    }

    variablesInitDeref.resolve();
    return variablesInitDeref.promise();
};

var start = function (c) {
    quitOnAdFrames()
        .then(function () {
            return jqueryInit(c);
        })
        .then(function () {
            return browserInit(c);
        })
        .then(function () {
            return constInit(c);
        })
        .then(function () {
            return variablesInit(c);
        })
        .done(function () {
            if (document.location.href.match(/^(http|https):\/\/maps\.google\./) || document.location.href.match(/^(http|https):\/\/www\.google\.[a-zA-Z.]*\/maps/)) {
                mainGMaps();
            }
            else {
                mainGC();
            }
        });
};

//--> $$053 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//var mainGMaps = function () {
//    if (settings_show_google_maps) {
//        var gear = document.getElementById("gear");
//        // Neues google maps
//        if (gear) {
//            function add_gclh_to_gear() {
//                if (gear.childNodes[0]) {
//                    var script = "function open_gc(){";
//                    script += "  var matches = document.location.href.match(/\\@(-?[0-9.]*),(-?[0-9.]*),([0-9]*)z/);";
//                    script += "  if(matches != null){";
//                    script += "    window.open('" + map_url + "?lat='+matches[1]+'&lng='+matches[2]+'&z='+matches[3]);";
//                    script += "  }else{";
//                    script += "    alert('This map has no geographical coordinates in its link. Just zoom or drag the map, afterwards this will work fine.');";
//                    script += "  }";
//                    script += "}";
//                    var script_ = document.createElement("script");
//                    script_.innerHTML = script;
//
//                    var button = document.createElement("button");
//                    button.setAttribute("class", "widget-gear-settings-icon");
//                    button.style.backgroundImage = "url('" + http + "://www.geocaching.com/images/about/logos/geocaching/Logo_Geocaching_color_notext_32.png')";
//                    button.setAttribute("onClick", "open_gc();");
//
//                    gear.childNodes[0].appendChild(script_);
//                    gear.childNodes[0].appendChild(button);
//                } else setTimeout(add_gclh_to_gear, 1000); // The Gear-Box is filled after loading the page. Keep looking at it every 1 second
//            }
//
//            add_gclh_to_gear();
//
//        } else {
//            // Altes google maps
//            var ref_link = document.getElementById("link");
//            if (ref_link) {
//                function open_gc() {
//                    var matches = ref_link.href.match(/&ll=([-0-9]*\.[0-9]*),([-0-9]*\.[0-9]*)/);
//                    var zoom = ref_link.href.match(/z=([0-9]*)/);
//                    if (matches != null && zoom != null) {
//                        var gc_map_url = map_url + "?lat=" + matches[1] + "&lng=" + matches[2] + "&z=" + zoom[1];
//                        window.open(gc_map_url);
//                    }
//                    else {
//                        alert("This map has no geographical coordinates in its link. Just zoom or drag the map, afterwards this will work fine.");
//                    }
//                }
//
//                var box = ref_link.parentNode;
//
//                var gcImage = document.createElement("img");
//                gcImage.setAttribute("src", http + "://www.geocaching.com/images/about/logos/geocaching/Logo_Geocaching_color_notext_32.png");
//                gcImage.setAttribute("title", "Show area at geocaching.com");
//                gcImage.setAttribute("alt", "Show area at geocaching.com");
//
//                var link = document.createElement("a");
//                link.setAttribute("title", "Show area at geocaching.com");
//                link.setAttribute("href", "#");
//                link.setAttribute("id", "gc_com_lnk");
//
//                link.appendChild(gcImage);
//                box.appendChild(link);
//
//                document.getElementById('gc_com_lnk').addEventListener("click", open_gc, false);
//            }
//        }
//    }
//};
//<-- $$053 End of delete 

//--> $$053 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Improve Google Maps page. 
var mainGMaps = function () {
    try {
        // Add link to GC Map on Google Maps page.
        if ( settings_add_link_gc_map_on_google_maps ) {
            function addGcButton( waitCount ) {
                if ( document.getElementById("gbsfw") ) {
                    var code = "";
                    code += "    function openGcMap(){";
                    code += "        var matches = document.location.href.match(/@(-?[0-9.]*),(-?[0-9.]*),([0-9.]*)z/);";
                    code += "        if (matches != null) {";
                    code += "            var zoom = matches[3];";
                    code += "        } else {";
                    // Bei Earth gibt es kein z für Zoom sondern ein m für Meter. Meter in Zoom umrechnen. 
                    code += "            var matches = document.location.href.match(/@(-?[0-9.]*),(-?[0-9.]*),([0-9.]*)m/);";
                    code += "            if (matches != null) {";
                    code += "                var zoom = 26 - Math.round( Math.log2( matches[3] ) );";
                    code += "            }";
                    code += "        }";
                    code += "        if (matches != null) {";
                    code += "            var matchesMarker = document.location.href.match(/!3d(-?[0-9.]*)!4d(-?[0-9.]*)/);";
                    code += "            if (matchesMarker != null) {";
                    code += "                var url = '" + map_url + "?lat=' + matchesMarker[1] + '&lng=' + matchesMarker[2] + '#?ll=' + matches[1] + ',' + matches[2] + '&z=' + zoom;";
                    code += "            } else {";
                    code += "                var url = '" + map_url + "?lat=' + matches[1] + '&lng=' + matches[2] + '&z=' + zoom;";
                    code += "            }";
                    if ( settings_switch_to_gc_map_in_same_tab ) {
                        code += "        location = url;"; 
                    } else {
                        code += "        window.open( url );"; 
                    }
                    code += "        } else {";
                    code += "            alert('This map has no geographical coordinates in its link. Just zoom or drag the map, afterwards this will work fine.');";
                    code += "        }";
                    code += "    }";
                    var script = document.createElement("script");
                    script.innerHTML = code;
    
                    var div = document.createElement("div");
                    div.setAttribute("style", "display: inline-block; vertical-align: middle;");
                    var aTag = document.createElement("a");
                    aTag.setAttribute("onClick", "openGcMap();");
                    aTag.setAttribute("title", "Geocaching Map");
                    var url = "url('" + http + "://www.geocaching.com/images/about/logos/geocaching/Logo_Geocaching_color_notext_32.png')";
                    aTag.setAttribute("style", "display: inline-block; vertical-align: middle; height: 32px; width: 32px; background-image: " + url + ";");
                    var side = document.getElementById("gbsfw").parentNode;

                    div.appendChild(script);
                    div.appendChild(aTag);
                    side.parentNode.insertBefore(div, side);
                } else {
                    waitCount++;
                    if ( waitCount <= 50 ) {  // 10 Sekunden lang
                        setTimeout( function () { addGcButton( waitCount ) }, 200); 
                    } else return;
                }
            }
            addGcButton( 0 );
        }
        
        // Hide left sidebar on Google Maps.
        if ( settings_hide_left_sidebar_on_google_maps ) {
            function hideLeftSidebar( waitCount ) {
                if ( document.getElementById("gbsfw") &&  // Nur weil das hier eines der letzten Teile ist, die aufgebaut werden.
                     document.getElementsByClassName("widget-pane-toggle-button")[0] && 
                     document.getElementsByClassName("widget-pane")[0]                  ) {
                    if ( !document.getElementsByClassName("widget-pane")[0].className.match("widget-pane-collapsed") ) { 
                        document.getElementsByClassName("widget-pane-toggle-button")[0].click();
                    }
                } else {
                    waitCount++;
                    if ( waitCount <= 15 ) {  // 15 Sekunden lang (10 Sekunden hatten bei den Earth Tests nicht immer ausgereicht).
                        setTimeout( function () { hideLeftSidebar( waitCount ) }, 1000); 
                    } else return;
                }
            }
            hideLeftSidebar( 0 );
        }
    } catch (e) {
        gclh_error("mainGMaps", e);
    }
};
//<-- $$053 End of insert

var mainGC = function () {
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Helper
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Run after Redirect
    if (getValue("doPostBack_after_redirect") != "") {
        try {
            var postbackValue = getValue("doPostBack_after_redirect", "");
            if (typeof(unsafeWindow.__doPostBack) == "function") {
//--> $$058 Begin of insert
                if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile/) ) {
                    $('html').css("background-color", "white");
                    $('#ProfileTabs').remove();
                    $('footer').remove();
                }
//<-- $$058 End of insert
                unsafeWindow.__doPostBack(postbackValue, "");
            }
        } catch (e) {
            gclh_error("Run after Redirect", e);
        }
        setValue("doPostBack_after_redirect", "");
    }

    function getElementsByClass(classname) {
        var result = new Array();
        var all_elements = document.getElementsByTagName("*");

        for (var i = 0; i < all_elements.length; i++) {
            if (all_elements[i].className == classname) {
                result.push(all_elements[i]);
            }
        }

        return result;
    }

    function in_array(search, arr) {
        for (var i = 0; i < arr.length; i++) if (arr[i] == search) return true;
        return false;
    }

    function caseInsensitiveSort(a, b) {  // http://www.codingforums.com/showthread.php?t=10477
        var ret = 0;
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a > b)
            ret = 1;
        if (a < b)
            ret = -1;
        return ret;
    }

    function urlencode(s) {
        s = s.replace(/&amp;/g, "&");
        s = encodeURIComponent(s);  //Kodiert alle außer den folgenden Zeichen: A bis Z und a bis z und - _ . ! ~ * ' ( )
        s = s.replace(/~/g, "%7e");
        s = s.replace(/'/g, "%27");
        s = s.replace(/%26amp%3b/g, "%26");
        s = s.replace(/ /g, "+");
        //GC.com codiert - _ . ! * ( ) selbst nicht, daher wird dies hier auch nicht extra behandel
        return s;
    }

    function urldecode(s) {
        s = s.replace(/\+/g, " ");
        s = s.replace(/%7e/g, "~");
        s = s.replace(/%27/g, "'");
        s = decodeURIComponent(s);
        return s;
    }

    function html_to_str(s) {
        s = s.replace(/\&amp;/g, "&");
        s = s.replace(/\&nbsp;/g, " ");
        return s;
    }

    function trim(s) {
        var whitespace = ' \n ';
        for (var i = 0; i < whitespace.length; i++) {
            while (s.substring(0, 1) == whitespace.charAt(i)) {
                s = s.substring(1, s.length);
            }
            while (s.substring(s.length - 1, s.length) == whitespace.charAt(i)) {
                s = s.substring(0, s.length - 1);
            }
        }

        if (s.substring(s.length - 6, s.length) == "&nbsp;") s = s.substring(0, s.length - 6);

        return s;
    }

// Show Update-Banner
//--> $$001 Begin of change
//    if (parseFloat(getValue("new_version", scriptVersion)) > scriptVersion) {
    if (parseFloat(getValue("new_version", scriptVersion)) > scriptVersion && AS == false ) {
//<-- $$001 End of change
        $("body").prepend("<div align='center' style='background-color: #FF8888;'>There is an update available for <b>GC little helper</b> - you can update <a href='https://www.amshove.net/greasemonkey/updates.php' target='_blank'>here</a></div>");
    }

// Show Contribute-Banner
//--> $$001 Begin of change
//    if (!getValue("hide_contribute", false)) {
    if (!getValue("hide_contribute", false) && AS == false ) {
//<-- $$001 End of change
        $("body").prepend("<div align='center' style='background-color: #88FFFF;'><b>Be a part of GC little helper:</b> GClh is available on <a href='https://github.com/amshove/GC_little_helper' target='_blank'>github.com</a>. If you are familiar with javascript, just clone the repository and try to improve GClh yourself. After testing, do a pull request on github and I will merge your code to the main GClh stream. <a href='#' id='hide_contribute'>(hide)</a></div>");

        if (document.getElementById("hide_contribute")) document.getElementById("hide_contribute").addEventListener("click", function () {
            setValue("hide_contribute", true);
            document.location.reload(true);
        }, false);
    }

// Helper: from N/S/E/W Deg Min.Sec to Dec
    function toDec(coords) {
        var match = coords.match(/([0-9]+)°([0-9]+)\.([0-9]+)′(N|S), ([0-9]+)°([0-9]+)\.([0-9]+)′(W|E)/);

        if (match) {
            var dec1 = parseInt(match[1], 10) + (parseFloat(match[2] + "." + match[3]) / 60);
            if (match[4] == "S") dec1 = dec1 * -1;
            dec1 = Math.round(dec1 * 10000000) / 10000000;

            var dec2 = parseInt(match[5], 10) + (parseFloat(match[6] + "." + match[7]) / 60);
            if (match[8] == "W") dec2 = dec2 * -1;
            dec2 = Math.round(dec2 * 10000000) / 10000000;

            return new Array(dec1, dec2);
        }
        else {
            match = coords.match(/(N|S) ([0-9]+)°? ([0-9]+)\.([0-9]+) (E|W) ([0-9]+)°? ([0-9]+)\.([0-9]+)/);

            if (match) {
                var dec1 = parseInt(match[2], 10) + (parseFloat(match[3] + "." + match[4]) / 60);
                if (match[1] == "S") dec1 = dec1 * -1;
                dec1 = Math.round(dec1 * 10000000) / 10000000;

                var dec2 = parseInt(match[6], 10) + (parseFloat(match[7] + "." + match[8]) / 60);
                if (match[5] == "W") dec2 = dec2 * -1;
                dec2 = Math.round(dec2 * 10000000) / 10000000;

                return new Array(dec1, dec2);
            }
            else {
                match = coords.match(/(N|S) ([0-9]+) ([0-9]+) ([0-9]+)\.([0-9]+) (E|W) ([0-9]+) ([0-9]+) ([0-9]+)\.([0-9]+)/);

                if (match) {
                    var dec1 = parseInt(match[2], 10) + (parseFloat(match[3]) / 60) + (parseFloat(match[4] + "." + match[5]) / 3600);
                    if (match[1] == "S") dec1 = dec1 * -1;
                    dec1 = Math.round(dec1 * 10000000) / 10000000;

                    var dec2 = parseInt(match[7], 10) + (parseFloat(match[8]) / 60) + (parseFloat(match[9] + "." + match[10]) / 3600);
                    if (match[6] == "W") dec2 = dec2 * -1;
                    dec2 = Math.round(dec2 * 10000000) / 10000000;

                    return new Array(dec1, dec2);
                }
                else {
                    match = coords.match(/(N|S) ([0-9]+) ([0-9]+) ([0-9]+\..[0-9].) (E|W) ([0-9]+) ([0-9]+) ([0-9]+\..[0-9].)/);

                    if (match) {
                        var dec1 = parseInt(match[2], 10) + (parseFloat(match[3]) / 60) + (parseFloat(match[4]) / 3600);
                        if (match[1] == "S") dec1 = dec1 * -1;
                        dec1 = Math.round(dec1 * 10000000) / 10000000;

                        var dec2 = parseInt(match[6], 10) + (parseFloat(match[7]) / 60) + (parseFloat(match[8]) / 3600);
                        if (match[5] == "W") dec2 = dec2 * -1;
                        dec2 = Math.round(dec2 * 10000000) / 10000000;

                        return new Array(dec1, dec2);
                    } else {
                        return false;
                    }
                }
            }
        }
    }

// Helper: from Deg to DMS
    function DegtoDMS(coords) {
        var match = coords.match(/^(N|S) ([0-9][0-9]). ([0-9][0-9])\.([0-9][0-9][0-9]) (E|W) ([0-9][0-9][0-9]). ([0-9][0-9])\.([0-9][0-9][0-9])$/);
        if (!match) return "";

        var lat1 = parseInt(match[2], 10);
        var lat2 = parseInt(match[3], 10);
        var lat3 = parseFloat("0." + match[4]) * 60;
        lat3 = Math.round(lat3 * 10000) / 10000;

        var lng1 = parseInt(match[6], 10);
        var lng2 = parseInt(match[7], 10);
        var lng3 = parseFloat("0." + match[8]) * 60;
        lng3 = Math.round(lng3 * 10000) / 10000;

        return match[1] + " " + lat1 + "° " + lat2 + "' " + lat3 + "\" " + match[5] + " " + lng1 + "° " + lng2 + "' " + lng3 + "\"";
    }

// Helper: from Dec to Deg
    function DectoDeg(lat, lng) {
        lat = lat / 10000000;
        var pre = "";
        if (lat > 0) pre = "N";
        else {
            pre = "S";
            lat = lat * -1;
        }
        var tmp1 = parseInt(lat);
        var tmp2 = (lat - tmp1) * 60;
        tmp1 = String(tmp1);
        if (tmp1.length == 1) tmp1 = "0" + tmp1;
        tmp2 = Math.round(tmp2 * 10000) / 10000;
        tmp2 = String(tmp2);
//--> $$057 Begin of change
//      if (tmp2.length == 3) tmp2 = tmp2 + "000";
        if (tmp2.length == 0) tmp2 = tmp2 + "0.000";
        else if (tmp2.length == 1) tmp2 = tmp2 + ".000";
        else if (tmp2.length == 2) tmp2 = tmp2 + ".000";
        else if (tmp2.length == 3) tmp2 = tmp2 + "000";
//<-- $$057 End of change
        else if (tmp2.length == 4) tmp2 = tmp2 + "00";
        else if (tmp2.length == 5) tmp2 = tmp2 + "0";
        var new_lat = pre + " " + tmp1 + "° " + tmp2;

        lng = lng / 10000000;
        var pre = "";
        if (lng > 0) pre = "E";
        else {
            pre = "W";
            lng = lng * -1;
        }
        var tmp1 = parseInt(lng);
        var tmp2 = (lng - tmp1) * 60;
        tmp1 = String(tmp1);
        if (tmp1.length == 2) tmp1 = "0" + tmp1;
        else if (tmp1.length == 1) tmp1 = "00" + tmp1;
        tmp2 = Math.round(tmp2 * 10000) / 10000;
        tmp2 = String(tmp2);
//--> $$057 Begin of change
//        if (tmp2.length == 3) tmp2 = tmp2 + "000";
        if (tmp2.length == 0) tmp2 = tmp2 + "0.000";
        else if (tmp2.length == 1) tmp2 = tmp2 + ".000";
        else if (tmp2.length == 2) tmp2 = tmp2 + ".000";
        else if (tmp2.length == 3) tmp2 = tmp2 + "000";
//<-- $$057 End of change
        else if (tmp2.length == 4) tmp2 = tmp2 + "00";
        else if (tmp2.length == 5) tmp2 = tmp2 + "0";
        var new_lng = pre + " " + tmp1 + "° " + tmp2;

        return new_lat + " " + new_lng;
    }

    /**
     * check whether the user has set his home coordinates
     * @returns {Boolean}
     */
    function homeCoordinatesSet() {
        if (getValue("home_lat", 0) == 0 || getValue("home_lng") == 0) {
            if (window.confirm("To use this link, you have to set your home coordinates.")) {
                document.location.href = https + "://www.geocaching.com/account/ManageLocations.aspx";
            }
            return false;
        }
        return true;
    }

// Helper
//--> $$058 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//    function addLinkEvent(name, fkt) {
//        if (document.getElementsByName(name).length > 0) {
//            var links = document.getElementsByName(name);
//            for (var i = 0; i < links.length; i++) {
//                links[i].addEventListener("click", fkt, false);
//            }
//        } else if (document.getElementById(name)) {
//            document.getElementById(name).addEventListener("click", fkt, false);
//        }
//    }
//<-- $$058 End of delete
    
//--> $$058 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Events für spezielle Links der Linklist aufbauen. Beispiel: Links zu den Tabs des Öffentlichen Profiles. 
    function addLinkEvent(name, fkt, stopOldContextmenu, buildNewContextmenu) {
        if (document.getElementsByName(name).length > 0) {
            var links = document.getElementsByName(name);
            for (var i = 0; i < links.length; i++) {
                // Click Event aufbauen.
                links[i].addEventListener('click', function(event){fkt(event)}, false);
                // Contextmenu (rechte Maustaste) für den Link übergehen, weil eine Auswahl nicht funktioniert. Contextmenu sperren. 
                if ( stopOldContextmenu == true ) links[i].oncontextmenu = function(){return false;};
                // Neues "Contextmenu" als direkten Link in neuem Tab aufbauen. 
                if ( buildNewContextmenu == true && links[i].id ) $('#'+links[i].id).bind('contextmenu.new', function(event){fkt(event)});
            }
        }
    }
//--> $$058 Begin of insert

// Close the Overlays, Find Player and GClh-Configuration
//--> $$038 Begin of change
//    function btnClose() {
    function btnClose( clearUrl ) {
//<-- $$038 End of change
        if (document.getElementById('bg_shadow')) document.getElementById('bg_shadow').style.display = "none";
        if (document.getElementById('settings_overlay')) document.getElementById('settings_overlay').style.display = "none";
        if (document.getElementById('sync_settings_overlay')) document.getElementById('sync_settings_overlay').style.display = "none";
        if (document.getElementById('findplayer_overlay')) document.getElementById('findplayer_overlay').style.display = "none";
//--> $$038 Begin of insert
        if ( clearUrl != false ) {
            document.location.href = clearUrlAppendix( document.location.href, false );
        }
//<-- $$038 End of insert
    }

// Function to get the Finds out of the login-Text-Box
    function get_my_finds() {
        var finds = "";
        if ($('.li-user-info').children().length >= 2) {
//--> $$048 Begin of insert
            if ( $('.li-user-info').children().next().text() ) {
//<-- $$048 End of insert
                finds = parseInt($('.li-user-info').children().next().text().match(/[0-9,\.]+/)[0].replace(/[,\.]/,""));
//--> $$048 Begin of insert
            }
//<-- $$048 End of insert
        }
        return finds;
    }

// Sucht den Original Usernamen des Owners aus dem Listing
    function get_real_owner() {
        if (document.getElementById("ctl00_ContentBody_bottomSection")) {
            var links = document.getElementById("ctl00_ContentBody_bottomSection").getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                var match = links[i].href.match(/\/seek\/nearest\.aspx\?u\=(.*)$/);
                if (match) {
                    return urldecode(match[1]);
                }
            }
            return false;
        } else return false;
    }

// Versteckt den Header in der Map-Ansicht
    function hide_map_header() {
        var header = document.getElementsByTagName("header");
        if (header[0].style.display != "none") {  // Header verstecken
            header[0].style.display = "none";
            document.getElementById("Content").style.top = 0;
        } else { // Header zeigen
            header[0].style.display = "block";
            document.getElementById("Content").style.top = "63px";
        }
    }

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Last Log-Text speichern fuer TB-Log-Template
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx/) && document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog")) {
            function send_log(e) {
                setValue("last_logtext", document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').value);
            }

            document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog").addEventListener('click', send_log, true);
        }
    } catch (e) {
        gclh_error("Last-Log-Text speichern", e);
    }

// F2 zum Log abschicken
    /**
     * @name f2_logging
     * @description You can use the Key "F2" to commit your log entry
     * @class
     */
    try {
        if (settings_submit_log_button && (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(id|guid|ID|wp|LUID|PLogGuid)\=/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/log\.aspx\?(id|wid|guid|ID|PLogGuid)\=/)) && document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog")) {
//--> $$007 Begin of insert
            var but = document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog");
            but.value = document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog").value + " (F2)";
//<-- $$007 End of insert
            function keydown(e) {
                if (e.keyCode == 113) {
//--> $$028 Begin of change
//                    document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog").click();
                    if ( !check_config_page() ) {
                        document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog").click();
                    }
//<-- $$028 End of change
                }
            }

            window.addEventListener('keydown', keydown, true);
        }
    } catch (e) {
        gclh_error("F2 logging", e);
    }

// F2 zum PQ speichern
    try {
        if (settings_submit_log_button && (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket\/gcquery\.aspx/)) && document.getElementById("ctl00_ContentBody_btnSubmit")) {
//--> $$007 Begin of insert
            var but = document.getElementById("ctl00_ContentBody_btnSubmit");
            but.value = document.getElementById("ctl00_ContentBody_btnSubmit").value + " (F2)";
//<-- $$007 End of insert
            function keydown(e) {
                if (e.keyCode == 113) {
//--> $$028 Begin of change
//                    document.getElementById("ctl00_ContentBody_btnSubmit").click();
                    if ( !check_config_page() ) {
                        document.getElementById("ctl00_ContentBody_btnSubmit").click();
                    }
//<-- $$028 End of change
                }
            }

            window.addEventListener('keydown', keydown, true);
        }
    } catch (e) {
        gclh_error("F2 save PQ", e);
    }

// F2 Bookmark speichern
    try {
//--> $$007 Begin of delete
//        if (settings_submit_log_button && ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks\/mark\.aspx/)) || (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket\/bmquery\.aspx/))) && document.getElementById("ctl00_ContentBody_Bookmark_btnSubmit")) {
//            function keydown(e) {
//                if (e.keyCode == 113) {
//                    document.getElementById("ctl00_ContentBody_Bookmark_btnSubmit").click();
//                }
//            }
//
//            window.addEventListener('keydown', keydown, true);
//        }
//<-- $$007 End of delete 
//--> $$007 Begin of insert
        // "Create a Bookmark" und "Edit a Bookmark".
        if ( settings_submit_log_button ) {
            // "Create a Bookmark" entry und "Edit a Bookmark" entry.
            if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks\/mark\.aspx/) && 
                 document.getElementById("ctl00_ContentBody_Bookmark_btnCreate")                            ) {
                var but = document.getElementById("ctl00_ContentBody_Bookmark_btnCreate");
                but.value = document.getElementById("ctl00_ContentBody_Bookmark_btnCreate").value + " (F2)";
                function keydown_bm(e) {
                    if (e.keyCode == 113) {
//--> $$028 Begin of change
//                        document.getElementById("ctl00_ContentBody_Bookmark_btnCreate").click();
                        if ( !check_config_page() ) {
                            document.getElementById("ctl00_ContentBody_Bookmark_btnCreate").click();
                        }
//<-- $$028 End of change
                    }
                }
                window.addEventListener('keydown', keydown_bm, true);
            }
            // "Bookmark Pocket Query", also aus einer Bookmark eine PQ erzeugen.
            if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket\/bmquery\.aspx/) && 
                 document.getElementById("ctl00_ContentBody_btnSubmit")                            ) {
                var but = document.getElementById("ctl00_ContentBody_btnSubmit");
                but.value = document.getElementById("ctl00_ContentBody_btnSubmit").value + " (F2)";
                function keydown_pq(e) {
                    if (e.keyCode == 113) {
//--> $$028 Begin of change
//                        document.getElementById("ctl00_ContentBody_btnSubmit").click();
                        if ( !check_config_page() ) {
                            document.getElementById("ctl00_ContentBody_btnSubmit").click();
                        }
//<-- $$028 End of change
                    }
                }
                window.addEventListener('keydown', keydown_pq, true);
            }
        }
//<-- $$007 End of insert
    } catch (e) {
        gclh_error("F2 save Bookmark", e);
    }

//--> $$029 $$038 Begin of insert
// Aufruf GClh Config per F4 Taste. Nur auf den erlaubten Seiten und auch nur, wenn man nicht schon im GClh Config ist.
    try {
        function keydown(e) {
            if (e.keyCode == 115) {
                if ( !check_config_page() ) {
                    if ( checkTaskAllowed( "GClh Config", true ) == true ) {
                        gclh_showConfig();
                    }
                }
            }
        }
        if ( settings_f4_call_gclh_config ) {
            if ( !check_config_page() ) {
                if ( checkTaskAllowed( "GClh Config", false ) == true ) {
                    window.addEventListener('keydown', keydown, true);
                }
            }
        }
    } catch (e) {
        gclh_error("F4 call GClh Config", e);
    }
//<-- $$029 $$038 End of insert

//--> $$002 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
////Change Header layout
//    try {
//         //---------< Changes by SiMaKiDD >---------//
//
//         $('#ctl00_ctl23_A1').remove();
//         $('.messagecenterheaderwidget').remove();
//
//         //--> Font-Size
//         fs = 85;
//         //--> Einruecken
//         indent = 0;
//         marginL = 0;
//         //-->  Margin ermitteln
//         //w1  = $( window ).width();
//         w2 =  $( "#Content .container" ).width();
//         w2 = w2+50;
//         //alert("w1 " + w1 + " UND w2 " + w2);
//
//         {
//          if(document.URL.indexOf("messagecenter") !== -1){
//                $('.li-membership').remove();
//                $('.profile-panel').css("margin-top", "-43px");
//                $('.logo').parent().prepend($('nav').find(".wrapper").children().remove().get());
//
//                var head = document.getElementsByTagName('head')[0];
//                var style = document.createElement('style');
//                style.type = 'text/css';
//        style.innerHTML = ".menu li a, .menu li a:link, .Menu li a:visited { color: #93b516 !important; } ul.menu>li>a:hover,ul.menu>li>a:focus { color: #FFFFFF !important;} ul.menu>li{display: inline; position: relative;} .menu{height:18px; margin-top: -5px; margin-left: 250px;} .logo2 {  top: 18px; position: relative; } ul.menu > li > ul {position: absolute; left: 0;}";
//                head.appendChild(style);
//
//                $('nav').remove();
//            }
//            else{
//                $('.li-upgrade').remove();
//                $('.ProfileWidget').css("margin-top", "-55px");
//                $('#ctl00_siteHeader').find(".container").prepend($('#Navigation').find(".container").remove().get().reverse());
//                var head = document.getElementsByTagName('head')[0];
//                var style = document.createElement('style');
//                style.type = 'text/css';
//        //---------< Changes by SiMaKiDD [next row]  >---------//
//        style.innerHTML = ".Menu {margin-left:"+marginL+"px !important; } .Menu a { font-size:"+fs+"% !important; } .Menu li a, .Menu li a:link, .Menu li a:visited { color: #93b516 !important; } ul.Menu>li>a:hover,ul.Menu>li>a:focus { color: #FF0000 !important;} .logged-in-user>li { margin:10px 0 0 0 !important;} .logged-in-user>li a {display: inline-block;}";
//                $('#ctl00_siteHeader').find("ul.Menu").css("margin-right", "360px");
//                head.appendChild(style);
//           }
//
//        }
//
//    //---------< Changes by SiMaKiDD [added next row]  >---------//
//    $( "#ctl00_siteHeader .container .container:eq(0)").css({ 'padding-top' : '22px' });
//    $( "#ctl00_siteHeader .container").css({ 'max-width' : ''});
//    $( "#ctl00_siteHeader .container").css({ 'width' : w2});
//
//    } catch (e) {
//        gclh_error("Change Header layout", e);
//    }
//<-- $$002 End of delete

//--> $$002 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Change Header layout (Umbau)
//--> $$048 Begin of insert
    change_header_layout:
//<-- $$048 End of insert
    try {
        if (settings_change_header_layout) {
//--> $$048 Begin of insert
            if ( isMemberInPmoCache() ) {
                if ( document.getElementById("ctl00_siteHeader") ) { document.getElementById("ctl00_siteHeader").remove(); }
                break change_header_layout;
            }
//<-- $$048 End of insert

            // Alle Seiten: Grundeinstellungen:
            // ----------
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            var style_tmp = document.createElement('style');
            style.type = 'text/css';

            // Font-Size für Menüs bzw. Font-Size für Untermenüs in Pixel.
            var font_size_menu = parseInt(settings_font_size_menu);
            if ( (font_size_menu == 0) || (font_size_menu < 0) || (font_size_menu > 16) ) font_size_menu = 15;
            var font_size_submenu = parseInt(settings_font_size_submenu);
            if ( (font_size_submenu == 0) || (font_size_submenu < 0) || (font_size_submenu > 16) ) font_size_submenu = 13;

            // Abstand zwischen Menüs bzw. Abstand zwischen Untermenüs in Pixel.
            var distance_menu = parseInt(settings_distance_menu);
            if ( (distance_menu < 0) || (distance_menu > 99) ) distance_menu = ( 50 / 2 );
            else distance_menu = ( distance_menu / 2 );
            if ( settings_bookmarks_top_menu == false && settings_menu_show_separator == true ) distance_menu = ( distance_menu / 2 );
            var distance_submenu = parseInt(settings_distance_submenu);
            if ( (distance_submenu < 0) || (distance_submenu > 32) ) distance_submenu = ( 8 );      // ( 8 / 2 )
            else distance_submenu = ( distance_submenu );                                           // ( ... / 2 )

            // Font-Color in Menüs und Untermenüs.
            var font_color = settings_font_color_menu_submenu;
            if ( font_color == "" ) { font_color = "93B516" }; 

            // Menüweite berechnen.
            var new_width = 950;
            var new_width_menu = 950;
            var new_width_menu_cut_old = 0;
            var new_padding_right = 0;
            if ( getValue("settings_new_width") > 0) {
                new_width = parseInt( getValue("settings_new_width") );
            }
            if (settings_show_smaller_area_top_right) { 
                new_padding_right = 261 - 14;
                if (settings_show_smaller_gc_link) {
                    new_width_menu = new_width - 261 + 20 - 28; 
                    new_width_menu_cut_old = 28;
                } else {
                    new_width_menu = new_width - 261 + 20 - 190; 
                    new_width_menu_cut_old = 190;
                }
            } else { 
                new_padding_right = 418 - 14;
                if (settings_show_smaller_gc_link) {
                    new_width_menu = new_width - 418 + 20 - 28; 
                    new_width_menu_cut_old = 28;
                } else {
                    new_width_menu = new_width - 418 + 20 - 190;
                    new_width_menu_cut_old = 190;
                }
            }    
            
            // Member Upgrade Button entfernen. (Er wurde bei den Abstandsberechnungen vergessen, nun muß er auf jedenfall dran glauben.)
            $('.li-upgrade').remove();
            $('.li-membership').remove();
            
            // Beschriftung "Messages" des Message Center Icons entfernen, Title "Message Center" setzen, Strich entfernen.
            if (settings_show_smaller_area_top_right) { 
                $('.messagecenterheaderwidget').find(".link-text").remove();                 // Altes Seiten Design
                $('.messagecenterheaderwidget').find(".link-text-msg-center").remove();      // Account Settings, Message Center (neues Seiten Design)
                $('.messagecenterheaderwidget').find(".msg-center-link-text").remove();      // Cache suchen, Cache verstecken (neues Seiten Design)
                var mess_head = getElementsByClass("messagecenterheaderwidget li-messages");
                for (var mh = 0; mh < mess_head.length; mh++) {
                    mess_head[mh].setAttribute("title", "Message Center"); 
                    if ( mess_head[mh].children[0].className !== "message-center-icon" ) {
                        mess_head[mh].children[0].remove();
                    }
                }
            }
            
            // Versuch, immer wieder auftretende Fehler in Zusammenhang mit dem Message Center zu beseitigen.               // Message Center Fehler
            if ( !is_page("settings") && !is_page("messagecenter") && !is_page("geotours") && settings_show_smaller_area_top_right ) {
                var mess_head = getElementsByClass("messagecenterheaderwidget li-messages");
                for (var mh = 0; mh < mess_head.length; mh++) {
                    if ( mh == 0 ) mess_head[mh].style.display = "none";
                    mess_head[mh].setAttribute("class", "messagecenterheaderwidget_gclh li-messages_gclh");
                }
            }

            
            // Global verwendete Attribute zur Darstellung der Objekte im Header setzen.
            style.innerHTML += 
                // Schriftfarbe im Menü setzen. Bei Auswahl in weiss.
                ".#m li a, .#m li a:link, .#m li a:visited, .#m li {color: #" + font_color + " !important;}" +
                ".#m li a:hover, .#m li a:focus {color: #FFFFFF !important; outline: unset !important;}" +
                // Schriftfarbe im Untermenü setzen.
                ".#sm li a:visited {color: #" + font_color + " !important;}" +
                // Schriftgröße im Menü auf 16 stellen.
                ".#m {font-size: 16px !important;}" +
                // Schriftgröße im Menü einstellen.
                ".#m li, .#m li a, .#m li input {font-size: " + font_size_menu + "px !important;}" +
                // Abstände im Menü einstellen.
                "ul.#m > li {margin-left: " + distance_menu + "px !important; margin-right: " + distance_menu + "px !important;} ul.#m li a {padding: .25em .25em .25em 0 !important;}" +
                // Schriftgröße im Untermenü auf 16 stellen.
                "ul.#sm, ul.#sm li {font-size: 16px !important;}" +
                // Schriftgröße im Untermenü einstellen.
                "ul.#sm li a {font-size: " + font_size_submenu + "px !important;}" +
                // Abstände im Untermenü einstellen.
                "ul.#sm li a {margin: " + distance_submenu + "px 1em !important; padding: 0 0.5em !important;}" +
                // Menühöhe einstellen, ansonsten verschiebt sich alles bei anderen Schriftgrößen.
                ".#m {height: 35px !important;}" +
                // Ein Verschieben des Submenüs unterbinden.
                ".#sm {margin-left: 0 !important}"; 
            
            // Vertikales Menu grundsätzlich ausrichten.
            if ( settings_bookmarks_top_menu ) {
                // Menüzeilenhöhe auf 16 stellen.
                style.innerHTML += "ul.#m {line-height: 16px;}";       
                // Zwischen Menüname und Submenü keine Lücke lassen, sonst klappt das nicht mit dem einfachen Aufklappen. 
                style.innerHTML += ".#m li a, .#m li a:link, .#m li a:visited {margin-bottom: 10px;} ul.#sm {margin-top: -6px;}";
            // Horizontales Menu grundsätzlich ausrichten.
            } else {                     
                // Menüzeilenhöhe auf 16 stellen.
                style.innerHTML += "ul.#m {line-height: 16px !important;}";       
                // Zeilenabstand setzen in Abhängigkeit von der Anzahl Zeilen.
                if      ( settings_menu_number_of_lines == 2 ) style.innerHTML += "ul.#m li a {padding-top: 4px !important; padding-bottom: 4px !important;}"; 
                else if ( settings_menu_number_of_lines == 3 ) style.innerHTML += "ul.#m li a {padding-top: 1px !important; padding-bottom: 1px !important;}"; 
            }
            
            // Account Settings, Message Center, Cache suchen oder Cache verstecken (neues Seiten Design):
            // ----------
            if ( is_page("settings") || is_page("messagecenter") || is_page("find_cache") || is_page("hide_cache") ) {
                // Geocaching Logos ersetzen und verschieben, sofern das gewünscht ist.
                for (var i = 0; i < 2; i++) {
                    if ( $('.wrapper').find(".logo").get(i) ) {
                        var side = $('.wrapper').find(".logo").get(i);
                        changeGcLogo(side);
                    }
                }

                // Weitere Attribute für neues Seiten Design zur Darstellung der Objekte im Header setzen.
                style.innerHTML += 
                    // Menüweite setzen.
                    ".#m {width: " + new_width_menu + "px !important;}" +
                    "nav .wrapper {padding-right: " + new_padding_right + "px !important;}" +
                    "header, nav, footer {min-width: " + (new_width + 40) + "px !important;}" +
                    "nav .wrapper {max-width: unset; width: unset;}" +
                    // Rest.
                    "nav .wrapper {border-bottom: unset; margin: unset;}";
                
                // Hauptbereich nach oben schieben.
                if ( is_page("find_cache") || is_page("hide_cache") ) {
                    // Wenn Menu rechts ausgerichtet ist.
                    if ( settings_menu_float_right ) style.innerHTML += ".main {margin-top: -76px;} .reveal-modal.search-filters {margin-top: -10px;}";
                    else style.innerHTML += ".main {margin-top: -73px;} .reveal-modal.search-filters {margin-top: -10px;}";
                }
                else style.innerHTML += ".main {margin-top: -64px;}";
                // Platzieren des neuen Logos verursacht Fehler in der Plazierung des Videos. Folgendes korrigiert das quasi.
                if ( is_page("hide_cache") ) style.innerHTML += ".video iframe {width: 90%;}";

                // Vertikales Menu weiter ausrichten.
                if ( settings_bookmarks_top_menu ) {
                    // Header nach oben schieben.
                    style.innerHTML += "nav .wrapper {top: -69px;} .profile-panel {top: -16px !important}";
                    // Menu und Searchfield ausrichten in Abhängigkeit von der Schriftgröße.
                    style.innerHTML += "ul.#m > li {margin-top: " + ( 3 + ( 16 - font_size_menu ) / 2 ) + "px;}";
                    // Logoverschiebung weiter unten.
                    var logoMarginTop = 0;
                // Horizontales Menu weiter ausrichten.
                } else {
                    // Ausrichtung Submenu.
                    if ( is_page("find_cache") || is_page("hide_cache") ) style.innerHTML += "ul.#sm {top: 26px;}";
                    if ( is_page("settings") || is_page("messagecenter") ) style.innerHTML += "ul.#sm {top: 22px;}";
                    // Ausrichtung Header und Logoverschiebung weiter unten in Abhängigkeit von den Anzahl Zeilen.
                    if        ( settings_menu_number_of_lines == 1 ) {
                        style.innerHTML += "nav .wrapper {top: -66px;} .profile-panel {top: -19px !important}"; 
                        var logoMarginTop = -3;
                    } else if ( settings_menu_number_of_lines == 2 ) {
                        style.innerHTML += "nav .wrapper {top: -78px;} .profile-panel {top:  -7px !important}"; 
                        var logoMarginTop = 9;
                    } else if ( settings_menu_number_of_lines == 3 ) {
                        style.innerHTML += "nav .wrapper {top: -84px;} .profile-panel {top:  -1px !important}";
                        var logoMarginTop = 15;
                    }
                }

                // Bereich links ausrichten in Abhängigkeit davon, ob Logo geändert wird und ob GC Tour im Einsatz ist. 
                if      ( !settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: " + (  2 + logoMarginTop) + "px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( !settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: " + (-15 + logoMarginTop) + "px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: " + (  2 + logoMarginTop) + "px; width: 35px;}   .#m {margin-left:  28px !important;}"; }
                else if ( settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: " + (-15 + logoMarginTop) + "px; width: 35px;}   .#m {margin-left:  28px !important;}"; }

                // Bereich rechts ausrichten und zusammenschieben.
                if (settings_show_smaller_area_top_right) { 
                    style.innerHTML += 
                        // Rechten Bereich anpassen, damit er so aussieht wie auf den anderen Seiten.
                        ".profile-panel {margin-right: -2em}" +
                        // User und Setting Icon etwas zusammenschieben
                        ".profile-panel .li-user-toggle {margin-left: 0.5em;}" +
                        // Setting Icon und Message Icon etwas zusammenschieben und Username auf 115px begrenzen.
                        ".profile-panel .li-messages, .profile-panel .li-messages_gclh {padding: 22px 0em 22px 1em;}" +     // Message Center Fehler
                        ".profile-panel > li {padding-right: 0; padding-left: 6px; padding-top: 12px;}" +
                        ".profile-panel .user-avatar ~ span {max-width: 115px;}" +
                        // Senkrechter Strich vor Message Icon entfernen.
                        ".profile-panel > li + li::before {border-left: unset}";
                }
            }

            // Geotours:
            // ----------
            else if ( is_page("geotours") ) {
                // Geocaching Logo ersetzen und verschieben, sofern das gewünscht ist.
                if ( $('#HDHomeLink').get(0) ) {
                    var side = $('#HDHomeLink').get(0);
                    changeGcLogo(side);
                }

                // Weitere Attribute für neues Seiten Design zur Darstellung der Objekte im Header setzen.
                style.innerHTML += 
                    // Menüweite setzen.
                    "nav .container {width: " + ( new_width_menu + new_width_menu_cut_old ) + "px !important;}" +
                    "header, nav, footer {min-width: " + (new_width + 40) + "px !important;}" +
                    "header .container, nav .container {max-width: unset;}" +
                    // Keine Linie.
                    "nav .container {border-bottom: unset; margin: unset;}" +
                    // Content etwas zurechtrücken.
                    "#Content .container, .span-24 {margin-top: -1em !important; margin-bottom: 1em !important; padding: 0;}";

                // Vertikales Menu weiter ausrichten.
                if ( settings_bookmarks_top_menu ) {
                    // Header nach oben schieben.
                    style.innerHTML += "nav .container {margin-top: -69px !important;}";
                    // Menu und Searchfield ausrichten in Abhängigkeit von der Schriftgröße.
                    style.innerHTML += "ul.#m > li {margin-top: " + ( 3 + ( 16 - font_size_menu ) / 2 ) + "px;}";
                    // Logoverschiebung weiter unten.
                    var logoMarginTop = 0;
                    // Wenn links ausgerichtet, dann float zurücksetzen, weil das leichte Verschiebungen verursacht.
                    if ( settings_menu_float_right == false ) style.innerHTML += ".#m > li {float: unset}";
                // Horizontales Menu weiter ausrichten.
                } else {
                    // Ausrichtung Submenu.
                    style.innerHTML += "ul.#sm {top: 25px;}";
                    // Ausrichtung Header und Logoverschiebung weiter unten in Abhängigkeit von den Anzahl Zeilen.
                    style.innerHTML += ".#m > li {float: unset}";
                    if        ( settings_menu_number_of_lines == 1 ) {
                        style.innerHTML += "nav .container {margin-top: -66px;}";
                        var logoMarginTop = -3;
                    } else if ( settings_menu_number_of_lines == 2 ) {
                        style.innerHTML += "nav .container {margin-top: -78px;}";
                        var logoMarginTop = 9;
                    } else if ( settings_menu_number_of_lines == 3 ) {
                        style.innerHTML += "nav .container {margin-top: -83px;}";
                        var logoMarginTop = 14; 
                    }
                }

                // Bereich links ausrichten in Abhängigkeit davon, ob Logo geändert wird und ob GC Tour im Einsatz ist. 
                if      ( !settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: " + (  2 + logoMarginTop) + "px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( !settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: " + (-15 + logoMarginTop) + "px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: " + (  2 + logoMarginTop) + "px; width: 35px;}   .#m {margin-left:  28px !important;}"; }
                else if ( settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: " + (-15 + logoMarginTop) + "px; width: 35px;}   .#m {margin-left:  28px !important;}"; }

                // Bereich rechts ausrichten und zusammenschieben.
                if (settings_show_smaller_area_top_right) { 
                    style.innerHTML += 
                        // User und Setting Icon etwas zusammenschieben
                        ".profile-panel .li-user-toggle {margin-left: 0.5em; padding: 0.43em 0.6em;}" +
                        // Setting Icon und Message Icon etwas zusammenschieben und Username auf 115px begrenzen.
                        ".profile-panel .li-messages, .profile-panel .li-messages_gclh {padding: 22px 0em 22px 1em;}" +     // Message Center Fehler
                        ".profile-panel > li {padding-right: 0; padding-left: 6px; padding-top: 12px;}" +
                        ".profile-panel .user-avatar ~ span {max-width: 115px;}" +
                        // Senkrechter Strich vor Message Icon entfernen.
                        ".profile-panel > li + li::before {border-left: unset}";
                }
            }
            // Labs:
            // ----------
            else if ( is_page("labs") ) {
                // Geocaching Logo ersetzen und verschieben, sofern das gewünscht ist.
                if ( $('.title').children(0).get(0) ) {
                    var side = $('.title').children(0).get(0);
                    changeGcLogo(side);
                }

                // Weitere Attribute für neues Seiten Design zur Darstellung der Objekte im Header setzen.
                style.innerHTML += 
                    // Menüweite setzen und Submenu korrigieren.
                    ".#m {width: " + new_width_menu + "px !important;}" +
                    ".#sm {margin-top: -6px !important;}" +
                    // Rest.
                    ".header-container, footer-container {min-width: " + (new_width + 40) + "px !important;}" +
                    "header.wrapper {width: unset; margin: unset !important;}" +  
                    ".header-container .title {padding: unset;}" +
                    ".title {margin: 18px 0 0 3px !important;}" +
                    ".title img {max-height: unset !important}" +
                    "#newgclogo {margin-left: -6px !important;}" +
                    // Das ist das "menu" bei den Settings.
                    ".menu {right: 54px !important;}" +
                    // Spalt zwischen Header und Content lassen wie bei find und hide.
                    ".events-map, .breadcrumb {top: 2px;}";
                // Profile Panel platzieren in Abhängigkeit von Linklist. 
                if ( settings_bookmarks_on_top ) style.innerHTML += ".profile-panel {margin: -66px 50px 0 0;}";
                else style.innerHTML += ".profile-panel {margin: 0px 50px 0 0;}";
                // Wenn Menu rechts ausgerichtet ist.
                if ( settings_menu_float_right ) style.innerHTML += "ul.Menu {left: 14px;}";

                // Vertikales Menu weiter ausrichten.
                if ( settings_bookmarks_top_menu ) {
                    // Menu und Searchfield ausrichten in Abhängigkeit von der Schriftgröße.
                    style.innerHTML += "ul.#m > li {margin-top: " + ( 3 + ( 16 - font_size_menu ) / 2 ) + "px;}";
                // Horizontales Menu weiter ausrichten in Abhängigkeit von den Anzahl Zeilen.
                } else {
                    if      ( settings_menu_number_of_lines == 1 ) style.innerHTML += "ul.#m {top: 3px;}"; 
                    else if ( settings_menu_number_of_lines == 2 ) style.innerHTML += "ul.#m {top: -8px;}"; 
                    else if ( settings_menu_number_of_lines == 3 ) style.innerHTML += "ul.#m {top: -13px; padding-left: 10px !important;}";
                }

                // Bereich links ausrichten in Abhängigkeit davon, ob Logo geändert wird und ob GC Tour im Einsatz ist. 
                if      ( !settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top:   2px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( !settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: -15px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top:   2px; width: 35px;}   .#m {margin-left:  28px !important;}"; }
                else if ( settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: -15px; width: 35px;}   .#m {margin-left:  28px !important;}"; }

                // Bereich rechts ausrichten und zusammenschieben.
                if (settings_show_smaller_area_top_right) { 
                    style.innerHTML += 
                        // User und Setting Icon etwas zusammenschieben
                        ".profile-panel .li-user-toggle {margin-left: 0.5em; padding: 0.43em 0.6em;}" +
                        // Username auf 115px begrenzen.
                        ".user-avatar {max-width: 115px;}";  
                }
            }
            // Karte:
            // ----------
            else if ( is_page("map") ) {
                // Geocaching Logo ersetzen und verschieben, sofern das gewünscht ist.
                if ( $('.MapsLogo').get(0) ) {
                    var side = $('.MapsLogo').get(0);
                    changeGcLogo(side);
                }
                
                // Weitere Attribute für Karte zur Darstellung der Objekte im Header setzen.
                style.innerHTML += 
//--> $$044 Begin of insert
                    // Menüweite setzen und Submenu korrigieren.
                    ".#m {width: " + new_width_menu + "px !important;}" +
                    "header.row {min-width: " + (new_width + 57) + "px !important;}" +
                    ".#m {margin-left: 28px; left: 14px; top: -24px;}" +
                    ".#sm {margin-top: -6px !important;}" +
//<-- $$044 End of insert
                    // Rechten Bereich anpassen, damit er so aussieht wie auf den anderen Seiten.
                    ".ProfileWidget {margin-right: -1em}" +
                    // Searchfield ausrichten.
                    "input {margin-top: 0px}";

                // Vertikales Menu weiter ausrichten.
                if ( settings_bookmarks_top_menu ) {
                    // Menu und Searchfield ausrichten in Abhängigkeit von der Schriftgröße.
                    style.innerHTML += "ul.#m > li {margin-top: " + ( 3 + ( 16 - font_size_menu ) / 2 ) + "px;}";
                // Horizontales Menu weiter ausrichten in Abhängigkeit von den Anzahl Zeilen.
                } else {
                    if      ( settings_menu_number_of_lines == 1 ) style.innerHTML += "ul.#m {top: -20px;}"; 
                    else if ( settings_menu_number_of_lines == 2 ) style.innerHTML += "ul.#m {top: -31px;}"; 
                    else if ( settings_menu_number_of_lines == 3 ) style.innerHTML += "ul.#m {top: -36px;}"; // padding-left: 10px !important;}";
                }

                // Bereich links ausrichten in Abhängigkeit davon, ob Logo geändert wird und ob GC Tour im Einsatz ist. 
                if      ( !settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left:  -7px; margin-top:   2px; fill: #ffffff;} .#m {margin-left: 190px !important; margin-top: -13px !important}"; }
                else if ( !settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left:  -7px; margin-top: -15px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -13px; margin-top:   2px; width: 35px;}   .#m {margin-left:  28px !important; margin-top: -15px !important}"; }
                else if ( settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -13px; margin-top: -15px; width: 35px;}   .#m {margin-left:  28px !important;}"; }

                // Bereich rechts ausrichten und zusammenschieben.
                if (settings_show_smaller_area_top_right) { 
                    style.innerHTML += 
                        // User und Setting Icon etwas zusammenschieben und Username auf 115px begrenzen.
                        ".logged-in-user .li-user-toggle {margin-left: 0.5em; padding: 0.43em 0.6em;}" +
                        "header .logged-in-user > li {padding-left: 6px; padding-right: 13px;}" +
                        ".SignedInProfileLink .li-user-info span:first-child {max-width: 115px;}" +
                        // Setting Icon und Message Icon etwas zusammenschieben
                        ".logged-in-user .li-messages, .logged-in-user .li-messages_gclh {padding: 22px 1em 22px 0em;}";    // Message Center Fehler
                }
            }

            // Altes Seiten Design und restliche Seiten:
            // ----------
            else {
                // Geocaching Logo ersetzen und verschieben, sofern das gewünscht ist.
                if (document.getElementById('ctl00_ctl23_A1')) {
                    var side = document.getElementById('ctl00_ctl23_A1');
                    changeGcLogo(side);
                }

                // Aufbau Menü im Header mit move Navigation (nicht mehr move Navigation Container).
                // Menü in den Header verschieben. 
                $('#ctl00_siteHeader').find(".container").prepend($('#Navigation').remove().get().reverse());

                // Weitere Attribute für altes Seiten Design zur Darstellung der Objekte im Header setzen.
                style.innerHTML += 
                    // Menüweite setzen.
                    "nav .container {width: " + ( new_width_menu + new_width_menu_cut_old ) + "px !important;}" +
                    // Rechts und links keinen Platz im Header verlieren.
                    "header {padding: 0;}" +
                    // Menü Container nicht begrenzen, keine Linie, Schrift zentrieren und nach links ausrichten.
                    "nav .container {border-bottom: 0;}" +
                    "nav .container {float: left; margin-left: -2px; margin-top: -4px;}" +
                    ".container {min-width: unset;}";

                // Vertikales Menu weiter ausrichten.
                if ( settings_bookmarks_top_menu ) {
                    // Menu und Searchfield ausrichten in Abhängigkeit von der Schriftgröße.
                    style.innerHTML += "ul.#m {top: " + ( 3 + ( 16 - font_size_menu ) / 2 ) + "px;}";  
                // Horizontales Menu weiter ausrichten in Abhängigkeit von der Anzahl Zeilen.
                } else {
                    if      ( settings_menu_number_of_lines == 1 ) style.innerHTML += "ul.#m {top:   4px !important;}"; 
                    else if ( settings_menu_number_of_lines == 2 ) style.innerHTML += "ul.#m {top:  -8px !important;}"; 
                    else if ( settings_menu_number_of_lines == 3 ) style.innerHTML += "ul.#m {top: -13px !important;}"; 
                }

                // Bereich links ausrichten in Abhängigkeit davon, ob Logo geändert wird und ob GC Tour im Einsatz ist. 
                if      ( !settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top:   2px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( !settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -11px; margin-top: -15px; fill: #ffffff;} .#m {margin-left: 190px !important;}"; }
                else if ( settings_show_smaller_gc_link && !settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top:   2px; width: 35px;}   .#m {margin-left:  28px !important;}"; }
                else if ( settings_show_smaller_gc_link && settings_gc_tour_is_working ) {
                    style.innerHTML += "#l {margin-left: -17px; margin-top: -15px; width: 35px;}   .#m {margin-left:  28px !important;}"; }
                
                // Bereich rechts ausrichten und zusammenschieben.
                if (settings_show_smaller_area_top_right) { 
                    style.innerHTML += 
                        // User und Setting Icon etwas zusammenschieben und Username auf 115px begrenzen.
                        ".logged-in-user .li-user-toggle {margin-left: 0.5em; padding: 0.43em 0.6em;}" +
                        "header .logged-in-user > li {padding-left: 6px; padding-right: 13px;}" +
                        ".SignedInProfileLink .li-user-info span:first-child {max-width: 115px;}" +
                        // Setting Icon und Message Icon etwas zusammenschieben
                        ".logged-in-user .li-messages, .logged-in-user .li-messages_gclh {padding: 22px 1em 22px 0em;}";    // Message Center Fehler
                }
            }

            // Alle Seiten: Platzhalter umsetzen:
            // ----------
            // Bei Account Settings und Message Center werden menu, submenu und logo so geschrieben.
            if ( is_page("settings") || is_page("messagecenter") ) {
                style_tmp.innerHTML = style.innerHTML.replace(/#m/gi, "menu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#sm/gi, "submenu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#l/gi, "nav .logo"); style.innerHTML = style_tmp.innerHTML;
            } 
            // Bei Cache suchen, Cache verstecken und Geotours werden Menu, SubMenu und logo so geschrieben.
            else if ( is_page("find_cache") || is_page("hide_cache") || is_page("geotours") ) {
                style_tmp.innerHTML = style.innerHTML.replace(/#m/gi, "Menu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#sm/gi, "SubMenu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#l/gi, "nav .logo"); style.innerHTML = style_tmp.innerHTML;
            }
            // Bei Labs werden Menu, SubMenu und title (logo) so geschrieben.
            else if ( is_page("labs") ) {
                style_tmp.innerHTML = style.innerHTML.replace(/#m/gi, "Menu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#sm/gi, "SubMenu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#l/gi, ".title"); style.innerHTML = style_tmp.innerHTML;
            }
            // In Karte werden Menu, SubMenu und MapsLogo so geschrieben.
            else if ( is_page("map") ) {
//--> $$044 Begin of insert
                style_tmp.innerHTML = style.innerHTML.replace(/#m/gi, "Menu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#sm/gi, "SubMenu"); style.innerHTML = style_tmp.innerHTML;
//<-- $$044 End of insert
                style_tmp.innerHTML = style.innerHTML.replace(/#l/gi, ".MapsLogo"); style.innerHTML = style_tmp.innerHTML;
            }
            // Im alten Seiten Design werden Menu, SubMenu und Logo so geschrieben.
            else {
                style_tmp.innerHTML = style.innerHTML.replace(/#m/gi, "Menu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#sm/gi, "SubMenu"); style.innerHTML = style_tmp.innerHTML;
                style_tmp.innerHTML = style.innerHTML.replace(/#l/gi, "nav .Logo"); style.innerHTML = style_tmp.innerHTML;
            }
            
            head.appendChild(style);
        }
    } catch (e) {
        gclh_error("Change Header layout", e);
    }
//<-- $$002 End of insert

//--> $$002 Begin of insert
// GC Logo ändern.
    function changeGcLogo(side) {
        if (settings_show_smaller_gc_link) {
            // Logo entfernen.
            if (side.children[0]) {
                side.children[0].remove();
            }
            // Neues Logo aufbauen 
            var gc_link = document.createElement("a");
            var gc_img = document.createElement("img");
            gc_img.setAttribute("style", "clip: unset; width: 35px; margin-top: -3px;"); 
            gc_img.setAttribute("title", "Geocaching");
            gc_img.setAttribute("id", "newgclogo");
            gc_img.setAttribute("src", global_gc_icon);
            gc_link.appendChild(gc_img);
            gc_link.setAttribute("href", http + "://www.geocaching.com");
            side.appendChild(gc_link);
        }
    }
//<-- $$002 Begin of insert
    
//--> $$012 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// New Width
//    try {
//        if (getValue("settings_new_width") > 0 && getValue("settings_new_width") != 950) {
//            var width = getValue("settings_new_width");
//            var css = ".container { width: " + width + "px !important; }";
//            css += ".wrapper, nav .wrapper { width: "+width+"px !important; }";
//            css += "#Content .container { width: " + width + "px !important; }";
//            css += ".span-24 { width: " + width + "px !important; }";
//            css += ".span-20 { width: " + (width - 160) + "px !important; }";
//            css += ".span-16 { width: " + (width - 330) + "px !important; }";
////    css += ".span-17 { width: "+(width-280)+"px; }";
//            css += ".span-17 { width: " + (width - 330) + "px !important; }";
//            css += ".span-19 { width: " + (width - 200) + "px !important; }";
//            css += ".home-hero { background: url(\"/images/home/home-hero.jpg\") no-repeat scroll left 0 transparent; color: #FFFFFF; margin: 38px 0 30px; }";
//
//            var head = document.getElementsByTagName('head')[0];
//            var style = document.createElement('style');
//            style.type = 'text/css';
//            style.innerHTML = css;
//            head.appendChild(style);
//        }
//    } catch (e) {
//        gclh_error("New Width", e);
//    }
//<-- $$012 End of delete
    
//--> $$012  Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// New Width (Umbau)
// (Die Menüweite wird bei Change Header Layout gesetzt.)
    new_width:
    try {
        // Im neuen Seiten Design, bei Geotours, bei Labs Caches und bei Karten hier keine Anpassungen vornehmen.
        if ( is_page("messagecenter") || is_page("settings") || is_page("hide_cache") || is_page("find_cache") || is_page("geotours") || is_page("labs") || is_page("map") ) break new_width;

        if (getValue("settings_new_width") > 0) {
            var new_width = parseInt( getValue("settings_new_width") );
            var css = "";
            
            // Header- und Fußbereich:
            css += "header, nav, footer {min-width: " + (new_width + 40) + "px !important;}";
            css += "header .container, nav .container {max-width: unset;}";
            
            // Bei folgenden Seiten keine weiteren Anpassungen vornehmen. 
            if ( document.location.href.match(/\/\/www\.geocaching\.com\/pocket\/gcquery\.aspx/) ||      // Pocket Query: Einstellungen zur Selektion
                 document.location.href.match(/\/\/www\.geocaching\.com\/pocket\/bmquery\.aspx/)    );   // Pocket Query aus Bockmarkliste: Einstellungen zur Selektion     
            else {
            
                // Weitere Anpassungen auf allen Seiten:
                css += "#Content .container, #Content .span-24, .span-24 {width: " + new_width + "px;}";
                css += ".CacheStarLabels.span-6 {width: " + ((new_width - 300 - 190 - 10 - 10) / 2) + "px !important;}";
                css += ".span-6.right {width: " + ((new_width - 300 - 190 - 10 - 10) / 2) + "px !important;}";
                css += ".span-8 {width: " + ((new_width - 330 - 10) / 2) + "px !important;}";
                css += ".span-10 {width: " + ((new_width - 170) / 2) + "px !important;}";
                css += ".span-15 {width: " + (new_width - 360) + "px !important;}";
                css += ".span-16 {width: " + (new_width - 320 - 10) + "px !important;}";
                css += ".span-17 {width: " + (new_width - 300) + "px !important;}";
                css += ".span-19 {width: " + (new_width - 200) + "px !important;}";
                css += ".span-20 {width: " + (new_width - 160) + "px;}";
                css += ".LogDisplayRight {width: " + (new_width - 180) + "px !important;}";
                css += "#log_tabs .LogDisplayRight {width: " + (new_width - 355) + "px !important;}";
                css += "#uxBookmarkListName {width: " + ( new_width - 470 - 5 ) + "px !important;}";
                css += "table.TrackableItemLogTable div {width: " + (new_width - 160) + "px !important; max-width: unset;}";
                css += ".UserSuppliedContent {max-width: unset; width: unset;}";

                // Besonderheiten:
                if (is_page("cache_listing")                                                 ) {
                    css += ".span-9 {width: " + (new_width - 300 - 270 - 13 - 13 - 10) + "px !important;}";
                }
                else if (document.location.href.match(/\/my\/statistics\.aspx/)              ) {
                    css += ".StatsTable {width: " + (new_width - 250) + "px !important;}";
                }
                else if (document.location.href.match(/\/profile\/\?guid/)                ||
                         document.location.href.match(/\/profile\/\B/)                       ) {
                    css += ".span-9 {width: " + ((new_width - 250) / 2) + "px !important;}";
                    css += ".StatsTable {width: " + (new_width - 250 - 30) + "px !important;}";
                }

            }
            appendCssStyle( css );
        }
    } catch (e) {
        gclh_error("new width", e);
    }
//<-- $$012 End of insert
    
//--> $$014 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Remove gc.com Links in Navigation (Umbau)
    try {
        if ( document.getElementsByClassName("Menu").length > 0 ) {
            var liste = document.getElementsByClassName("Menu")[0];
            var links = $('ul.Menu a');
        }
        else if ( document.getElementsByClassName("menu").length > 0 ) {
            var liste = document.getElementsByClassName("menu")[0];
            var links = $('ul.menu a');
        }
        if ( links ) {
            for (var i = 0; i < (links.length -1); i++) {
                if      ( links[i].className.match(/dropdown/i) && links[i].href.match(/\/guide\/$/)            && getValue('remove_navi_learn'))     liste.removeChild(links[i].parentNode);
                else if ( links[i].className.match(/dropdown/i) && links[i].href.match(/\/play\/search/)        && getValue('remove_navi_play'))      liste.removeChild(links[i].parentNode);
                else if ( links[i].className.match(/dropdown/i) && links[i].href.match(/\/forums\/$/)           && getValue('remove_navi_community')) liste.removeChild(links[i].parentNode);
                else if ( links[i].className.match(/dropdown/i) && links[i].href.match(/shop\.geocaching\.com/) && getValue('remove_navi_shop'))      liste.removeChild(links[i].parentNode);
            }
        }
    } catch (e) {
        gclh_error("remove gc.com links", e);
    }
//<-- $$014 End of insert

// Bookmarks on top
    try {
//--> $$002 Begin of insert
        if ( settings_bookmarks_on_top ) {
            // Bei Labs Caches gibt es kein Menu, Menu aufbauen.
            if ( is_page("labs") ) {
                if ( $('.profile-panel')[0] ) {
                    var mainMenu = document.createElement("ul");
                    mainMenu.setAttribute("class", "Menu");
                    $('.profile-panel')[0].parentNode.insertBefore(mainMenu, $('.profile-panel')[0]);
                    css = buildCoreCss();
                    appendCssStyle( css );
                }
            }
//--> $$044 Begin of insert
            // Bei Karten gibt es kein Menu, Menu aufbauen.
            else if ( is_page("map") ) {
                if ( $('.ProfileWidget')[0] ) {
                    var mainMenu = document.createElement("ul");
                    mainMenu.setAttribute("class", "Menu");
                    $('.ProfileWidget')[0].parentNode.insertBefore(mainMenu, $('.ProfileWidget')[0]);
                    css = buildCoreCss();
                    appendCssStyle( css );
                }
            }
//<-- $$044 End of insert
        }
//<-- $$002 End of insert
        
        if (settings_bookmarks_on_top && (document.getElementsByClassName("Menu").length > 0 || document.getElementsByClassName("menu").length > 0)){
            if(document.getElementsByClassName("Menu").length > 0) var nav_list = document.getElementsByClassName("Menu")[0];
            else var nav_list = document.getElementsByClassName("menu")[0];
            
//--> $$002 Begin of delete
//            GM_addStyle('ul.Menu > li{ padding:0 0 0 0.75em !important; }  ');
//            GM_addStyle('ul.menu > li{ padding:0 0 0 0.75em !important; }  ');
//<-- $$002 End of delete
            var menu = document.createElement("li");

            var headline = document.createElement("a");

//--> $$002 Begin of change
//            if (settings_bookmarks_top_menu) {   // Navi vertikal
            if ( settings_bookmarks_top_menu || settings_change_header_layout == false ) {   // Navi vertikal
//<-- $$002 End of change
                headline.setAttribute("href", "#");
//--> $$014 Begin of delete
//                headline.setAttribute("title", "Linklist");
//<-- $$014 End of delete 
                headline.setAttribute("class", "Dropdown");
                headline.setAttribute("accesskey", "7");
                headline.innerHTML = "Linklist";
                menu.appendChild(headline);

                var submenu = document.createElement("ul");
                $(submenu).addClass("SubMenu").addClass("submenu");
//      submenu.setAttribute("style","visibility: hidden;");
                menu.appendChild(submenu);

                for (var i = 0; i < settings_bookmarks_list.length; i++) {
                    var x = settings_bookmarks_list[i];
                    if (typeof(x) == "undefined" || x == "" || typeof(x) == "object") continue;

                    var sublink = document.createElement("li");
                    var hyperlink = document.createElement("a");

                    for (attr in bookmarks[x]) {
//--> $$014 Begin of change
//                        if (attr != "custom") hyperlink.setAttribute(attr, bookmarks[x][attr]);
                        if (attr != "custom" && attr != "title") hyperlink.setAttribute(attr, bookmarks[x][attr]);
//<-- $$014 End of change
                    }
                    hyperlink.appendChild(document.createTextNode(bookmarks[x]['title']));

                    sublink.appendChild(hyperlink);
                    submenu.appendChild(sublink);
                }
                nav_list.appendChild(menu);

//--> $$002 Begin of insert
                // Bei Labs Caches hover aufbauen.
//--> $$031 Begin of change
//                if ( is_page("labs") ) {
//--> $$044 Begin of change
//                // Und auf den Seiten Suchen, Verstecken, Geotours, Account Setting und Message Center wird die Linklist ohne Event aufgebaut, hover aufbauen. 
//                if ( is_page("labs") || is_page("find_cache") || is_page("hide_cache") || is_page("geotours") || is_page("settings") || is_page("messagecenter") ) {
                // Und auf den Seiten Suchen, Verstecken, Geotours, Account Setting, Message Center und in Karten wird die Linklist ohne Event aufgebaut, hover aufbauen. 
                if ( is_page("labs") || is_page("find_cache") || is_page("hide_cache") || is_page("geotours") || is_page("settings") || is_page("messagecenter") || is_page("map")) {
//<-- $$044 End of change
//<-- $$031 End of change
                    buildHover();
                }
//<-- $$002 End of insert

            } else {                             // Navi horizontal
                for (var i = 0; i < settings_bookmarks_list.length; i++) {
                    var x = settings_bookmarks_list[i];
                    if (typeof(x) == "undefined" || x == "" || typeof(x) == "object") continue;

                    var sublink = document.createElement("li");
                    var hyperlink = document.createElement("a");

                    for (attr in bookmarks[x]) {
//--> $$014 Begin of change
//                        if (attr != "custom") hyperlink.setAttribute(attr, bookmarks[x][attr]);
                        if (attr != "custom" && attr != "title") hyperlink.setAttribute(attr, bookmarks[x][attr]);
//<-- $$014 End of change
                    }
                    hyperlink.appendChild(document.createTextNode(bookmarks[x]['title']));

                    sublink.appendChild(hyperlink);
                    nav_list.appendChild(sublink);
                    
                }
            }

            // Search field
            if (settings_bookmarks_search) {
                var code = "function gclh_search(){";
                code += "  var search = document.getElementById('navi_search').value;";
                code += "  if(search.match(/^GC[A-Z0-9]{1,10}\\b/i) || search.match(/^TB[A-Z0-9]{1,10}\\b/i)) document.location.href = 'http://coord.info/'+search;";
//--> $$002 Begin of change
//                code += "  else if(search.match(/^[A-Z0-9]{6}\\b$/i)) document.location.href = '/track/details.aspx?tracker='+search;";
                code += "  else if(search.match(/^[A-Z0-9]{6}\\b$/i)) document.location.href = 'https://www.geocaching.com/track/details.aspx?tracker='+search;";
//                code += "  else document.location.href = '/default.aspx?navi_search='+search;";
                code += "  else document.location.href = 'https://www.geocaching.com/seek/nearest.aspx?navi_search='+search;";
//<-- $$002 End of change
                code += "}";

                var script = document.createElement("script");
                script.innerHTML = code;
                document.getElementsByTagName("body")[0].appendChild(script);

//--> $$002 Begin of change
//                var searchfield = "<li><input onKeyDown='if(event.keyCode==13) { gclh_search(); return false; }' type='text' size='6' name='navi_search' id='navi_search' style='margin-top: 8px; padding: 1px; font-weight: bold; font-family: sans-serif; border: 2px solid #778555; border-radius: 7px 7px 7px 7px; -moz-border-radius: 7px; -khtml-border-radius: 7px; background-color:#d8cd9d' value='" + settings_bookmarks_search_default + "'></li>";
//                $(".Menu").append(searchfield);
                var searchfield = "<li><input onKeyDown='if(event.keyCode==13) { gclh_search(); return false; }' type='text' size='6' name='navi_search' id='navi_search' style='padding: 1px; font-weight: bold; font-family: sans-serif; border: 2px solid #778555; border-radius: 7px 7px 7px 7px; -moz-border-radius: 7px; -khtml-border-radius: 7px; background-color:#d8cd9d' value='" + settings_bookmarks_search_default + "'></li>";
                if ( is_page("labs") ) $(".Menu").append(searchfield);
                else $(".Menu, .menu").append(searchfield);
//<-- $$002 End of change
            }

            //Chrome menu hover fix / Language selector fix
            if (browser == "chrome") {
                injectPageScriptFunction(function () {
                    $('ul.Menu, ul.menu').children().hover(function () {
                            $(this).addClass('hover');
                            $('ul:first', this).css('visibility', 'visible');
                        },
                        function () {
                            $(this).removeClass('hover');
                            $('ul:first', this).css('visibility', 'hidden');
                        }
                    );
					var head = document.getElementsByTagName('head')[0];
					var style = document.createElement('style');
					style.type = 'text/css';
					style.innerHTML = ".SubMenu{ margin-top: -10px !important;} .submenu{ margin-top: -3px !important;}";
					head.appendChild(style);

                    //Language selector fix
                    $('.LanguageSelector script').remove().appendTo('.LanguageSelector');
                 }, "()");
            }

//--> $$002 Begin of insert
            if ( settings_menu_show_separator ) {
                if ( settings_bookmarks_top_menu || settings_change_header_layout == false );   // Navi vertikal
                else {                                                                          // Navi horizontal
                    var menuChilds = $('ul.Menu, ul.menu')[0].children;
                    for (var i = 1; i < menuChilds.length; i += 2) {
                        var separator = document.createElement("li");
                        separator.appendChild(document.createTextNode("|"));
                        menuChilds[i].parentNode.insertBefore(separator, menuChilds[i]);
                    }
                }
            }
//<-- $$002 End of insert

//--> $$002 Begin of insert
            // Vertikale Menüs rechts ausrichten, falls gewünscht und möglich.
            if ( settings_bookmarks_top_menu && settings_menu_float_right && settings_change_header_layout ) {
                if ( $('ul.Menu, ul.menu')[0] ) {
                    var menu = $('ul.Menu, ul.menu')[0];
                    var menuChilds = $('ul.Menu, ul.menu')[0].children;
                    for (var i = 0; i < menuChilds.length; i++) {
                        var child = menu.removeChild(menu.children[menuChilds.length-1-i]);
                        child.setAttribute("style", "float: right;");
                        menu.appendChild(child);
                    }
                }
            }
//<-- $$002 End of insert
            
            // menu      - <li class="">
            // headline  -   <a href="#" title="Shop" accesskey="6" id="ctl00_ctl21_hlNavShop">Shop ?</a>
            // submenu   -   <ul class="SubMenu" style="visibility: hidden;">
            // sublink   -     <li class="">
            // hyperlink -       <a href="http://shop.groundspeak.com/" rel="external" title="Shop Geocaching" accesskey="j" id="ctl00_hlSubNavShop">Shop Geocaching</a></li>
            // sublink   -     <li class="">
            // hyperlink -       <a href="../about/buying.aspx" title="Guide to Buying a GPS Device" accesskey="k" id="ctl00_hlSubNavGPSGuide">Guide to Buying a GPS Device</a></li>
            // submenu   -   </ul>
            // menu      - </li>
        }
    } catch (e) {
        gclh_error("Linklist on top", e);
    }

//--> $$002 Begin of insert
// Hover aufbauen im Menü.
// (Das muss ganz hinten in der Verarbeitung aufgebaut werden.)   
    function buildHover() {
        $('ul.Menu, ul.menu').children().hover(function () {
                $(this).addClass('hover');
                $(this).addClass('open');
                $('ul:first', this).css('visibility', 'visible');
            },
            function () {
                $(this).removeClass('hover');
                $(this).removeClass('open');
                $('ul:first', this).css('visibility', 'hidden');
            }
        );
    }
//<-- $$002 End of insert

//--> $$002 Begin of insert
// CSS für Menu aus coreCSS aufbauen.                
    function buildCoreCss(){
        var css = "";
        css += "ul.Menu,ul.SubMenu {padding:0; list-style:none;}";
        css += "ul.Menu li,ul.SubMenu li {padding:0;}";
        css += "ul.Menu {margin-left:210px; position:relative; z-index:100}";
        css += "ul.Menu li {zoom:1;}";
        css += "ul.Menu>li {display:inline-block; margin-left:1.5em; margin-right:.25em; padding:0;}";
        css += "ul.Menu>li>a:hover,ul.Menu>li>a:focus {color:#93b516;}";
        css += "ul.Menu li a {cursor:pointer; display:block; margin:0; padding:.25em .75em;}";
        css += "ul.SubMenu {background:#fefcf1; border:2px solid #82aa13; border-radius:3px; margin-top:.25em; padding-top:1em; padding-bottom:1em;}";
        css += "ul .SubMenu::after {background:url(https://www.geocaching.com/images/tlnMasters/dropdown-triangle@2x.png) no-repeat 50% 50%; background-size:contain; content:''; height:10px; position:absolute; top:-11px; left:-2px; width:28px;}";
        css += "ul.SubMenu li {font-size:.85em; margin:0; white-space:nowrap;}";
        css += "ul.SubMenu li a:hover,ul.SubMenu li a:focus {background-color:#e3dfc9; border-radius:3px;}";
        css += "ul.Menu li.hover {position:relative;}";
        css += "ul.Menu li.hover .SubMenu {display:block;}";
        css += "ul.Menu ul {display:none; position:absolute; top:100%; left:0;}";
        css += ".SubMenu.menu-mobile {display:none;}";
        css += "ul.Menu ul li {float:none;}";
        css += ".Menu li a,.Menu li a:link,.Menu li a:visited {color:#2d4f15; text-decoration:none;}";
        css += ".SubMenu li a,.SubMenu li a:link,.SubMenu li a:visited {color:#5f452a;}";
        return css;
    }
//<-- $$002 End of insert
    
// Bookmark-Liste im Profil, Linklist on Profile                                                   // $$058 change
    try {
        if (settings_bookmarks_show && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\//) && document.getElementById("ctl00_ContentBody_WidgetMiniProfile1_LoggedInPanel")) {
            var side = document.getElementById("ctl00_ContentBody_WidgetMiniProfile1_LoggedInPanel");

//--> $$037 Begin of insert
            var div0 = document.createElement("div");
            div0.setAttribute("class", "YourProfileWidget");
            div0.setAttribute("style", "margin-left: -1px; margin-right: -1px;");     // Wegen doppeltem Border 1px
//<-- $$037 End of insert
            var header = document.createElement("h3");
            header.setAttribute("class", "WidgetHeader");
            header.appendChild(document.createTextNode(" Linklist"));

            var div = document.createElement("div");
            div.setAttribute("class", "WidgetBody");

            var ul = document.createElement("ul");

            for (var i = 0; i < settings_bookmarks_list.length; i++) {
                var x = settings_bookmarks_list[i];
                if (typeof(x) == "undefined" || x == "" || typeof(x) == "object") continue;
                var a = document.createElement("a");

                for (attr in bookmarks[x]) {
//--> $$014 Begin of change
//                  if (attr != "custom") a.setAttribute(attr, bookmarks[x][attr]);
                  if (attr != "custom" && attr != "title") {
//--> $$058 Begin of change
//                      a.setAttribute(attr, bookmarks[x][attr]);
                      if (attr == "name" || attr == "id")  a.setAttribute(attr, bookmarks[x][attr]+"_profile");
                      else a.setAttribute(attr, bookmarks[x][attr]);
//<-- $$058 End of change
                  }
//<-- $$014 End of change
                }

                a.appendChild(document.createTextNode(bookmarks[x]['title']));

                var li = document.createElement("li");
                li.appendChild(a);

                ul.appendChild(li);
            }

            div.appendChild(ul);
//--> $$037 Begin of change
//            side.appendChild(header);
//            side.appendChild(div);
            div0.appendChild(header);
            div0.appendChild(div);
            side.appendChild(div0);
//<-- $$037 End of change
        }
    } catch (e) {
        gclh_error("Linklist in Profile", e);
    }

//--> $$043 Begin of delete
// Bookmarks on top - Beta Map
//    try {
//        if (settings_bookmarks_on_top && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
//            if ($('.LogIn').length > 0) {
//				$('.MapsLogo').parent().css("width","250px");
//                var div = document.createElement("div");
//                div.style = 'float: left; padding-left: 20px;';
//
//                div.appendChild(document.createElement("br"));
//
//                for (var i = 0; i < settings_bookmarks_list_beta.length; i++) {
//                    var x = settings_bookmarks_list_beta[i];
//                    if (typeof(x) == "undefined" || typeof(x) == "object") continue;
//
//                    var hyperlink = document.createElement("a");
//                    hyperlink.style.color = '#93b516';
//                    hyperlink.style.fontWeight = 'normal';
//
//                    for (attr in bookmarks[x]) {
//                        if (attr != "custom") hyperlink.setAttribute(attr, bookmarks[x][attr]);
//                    }
//                    hyperlink.target = '_blank';
//                    hyperlink.appendChild(document.createTextNode(bookmarks[x]['title']));
//
//                    div.appendChild(hyperlink);
//                    if (i != (settings_bookmarks_list_beta.length - 1)) {
//                        div.appendChild(document.createTextNode(' | '));
//                    }
//                }
//
//                $('.LogIn').parent().before(div).after($('.LogIn').remove()).remove();
//            }
//        }
//    } catch (e) {
//        gclh_error("Linklist on top (MAP)", e);
//    }
//<-- $$043 End of delete 

//--> $$014 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Remove gc.com Links in Navigation
//    try {
//        if (document.getElementsByClassName("Menu").length > 0) {
//            var liste = document.getElementsByClassName("Menu")[0];
//            if (getValue('remove_navi_learn') && document.getElementById('ctl00_hlNavLearn')) liste.removeChild(document.getElementById('ctl00_hlNavLearn').parentNode);
//            if (getValue('remove_navi_partnering') && document.getElementById('ctl00_hlNavPartnering')) liste.removeChild(document.getElementById('ctl00_hlNavPartnering').parentNode);
//            if (getValue('remove_navi_play') && document.getElementById('ctl00_hlNavPlay')) liste.removeChild(document.getElementById('ctl00_hlNavPlay').parentNode);
//            if (getValue('remove_navi_profile') && document.getElementById('ctl00_hlNavProfile')) liste.removeChild(document.getElementById('ctl00_hlNavProfile').parentNode);
//            if (getValue('remove_navi_community') && document.getElementById('ctl00_hlNavCommunity')) liste.removeChild(document.getElementById('ctl00_hlNavCommunity').parentNode);
//            if (getValue('remove_navi_videos') && document.getElementById('ctl00_hlNavVideos')) liste.removeChild(document.getElementById('ctl00_hlNavVideos').parentNode);
//            if (getValue('remove_navi_shop') && document.getElementById('ctl00_hlNavShop')) liste.removeChild(document.getElementById('ctl00_hlNavShop').parentNode);
//            if (getValue('remove_navi_social') && document.getElementById('ctl00_hlNavFollowUs')) liste.removeChild(document.getElementById('ctl00_hlNavFollowUs').parentNode);
//    }else if(document.getElementsByClassName("menu").length > 0){
//        var liste = document.getElementsByClassName("menu")[0];
//        // var links = liste.getElementsByTagName("a");
//        var links = $('ul.menu a');
//
//        for(var i=0; i<links.length; i++){
//            if( links[i].className == "dropdown" && links[i].href.match(/\/guide\/$/) && getValue('remove_navi_learn')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/\/travel\/$/) && getValue('remove_navi_partnering')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/\/seek\/$/) && getValue('remove_navi_play')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/\/my\/$/) && getValue('remove_navi_profile')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/\/forums\/$/) && getValue('remove_navi_community')) liste.removeChild(links[i].parentNode);
//            else if(links[i].accessKey != "" && links[i].href.match(/\/videos\/$/) && getValue('remove_navi_videos')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/shop.geocaching.com/) && getValue('remove_navi_shop')) liste.removeChild(links[i].parentNode);
//            else if(links[i].className == "dropdown" && links[i].href.match(/facebook.com/) && getValue('remove_navi_social')) liste.removeChild(links[i].parentNode);
//            }
//    }
//    } catch (e) {
//        gclh_error("Remove gc.com links", e);
//    }
//<-- $$014 End of delete

//--> $$016 Begin of insert
// Bezeichnung des Ignore Links durch Stop Ignoring ersetzen, wenn der Cache bereits auf der Ignore Liste steht.
    stop_ignoring:
    try {
        if ( is_page("cache_listing") == false ) break stop_ignoring;
        if ( settings_show_remove_ignoring_link == false ) break stop_ignoring;

        // Bookmark Listen Bereiche besorgen und verarbeiten.
        if ( document.getElementsByClassName("BookmarkList").length > 0 ) {
            var listenBereiche = document.getElementsByClassName("BookmarkList");
            for (var i = 0; i < listenBereiche.length; i++) {

                // Bookmark Listen besorgen, in denen der Cache gelistet ist, und verarbeiten.
                var listen = listenBereiche[i].getElementsByTagName("a");
                for (var j = 0; (j+1) < listen.length; j++) {

                    // Wenn es sich um Ignore Bookmark Liste des Users handelt. (Zugehöriger User steht direkt im Anschluss an die Bookmark Liste.)
                    if ( ( listen[j].href.match(/geocaching\.com\/bookmarks\/view\.aspx\?guid=/) ) &&
                         ( listen[j].text == "Ignore List" ) &&                                          // Die heißt auch in anderen Sprachen so.
                         ( listen[j+1].href.match(/geocaching\.com\/profile\/\?guid=/) ) &&
                         ( listen[j+1].text == $('.li-user-info').children().first().text() ) ) {

                        // Bereich mit den Links "Watch", Ignore" ... besorgen und verarbeiten.
                        var cdnLinksBereich = document.getElementsByClassName("CacheDetailNavigation NoPrint");
                        for (var k = 0; k < cdnLinksBereich.length; k++) {

                            // Liste der Links "Watch", Ignore" ... besorgen und verarbeiten.
                            var cdnLinks = cdnLinksBereich[k].getElementsByTagName("a");
                            for (var m = 0; m < cdnLinks.length; m++) {

                                // Wenn es sich um "Ignore" Link handelt, dann die Linkbezeichnung in Stop Ignoring ändern und das Icon ersetzen. 
                                // (Icon ändern geht wohl nicht mit setAttribute.)
                                if (cdnLinks[m].href.match(/\/bookmarks\/ignore\.aspx\?guid/)) {
                                    cdnLinks[m].innerHTML = "Stop Ignoring";
                                    var head = document.getElementsByTagName('head')[0];
                                    var style = document.createElement('style');
                                    style.type = 'text/css';
                                    style.innerHTML = '.CacheDetailNavigation a[href*="ignore.aspx"]{ background-image: url(' + global_stop_ignore_icon + '); }';
                                    head.appendChild(style);
                                }
                            }
                        }
                    }
                }
            }
        }
     } catch (e) {
        gclh_error("stop ignoring", e);
     }
//<-- $$016 End of insert

//--> $$033 Begin of insert
// Wenn Warnmeldung über Down Time ... vorhanden ist, prüfen, ob sie identisch ist mit der bereits gesicherten, gegebenenfalls verbergen 
// bzw. Button erzeugen zum Verbergen.
    try {
        if ( settings_hide_warning_message ) {
            if ( $('.WarningMessage')[0] ) {
                var content = '"' + $('.WarningMessage')[0].innerHTML + '"';
                if ( content == getValue( "warningMessageContent" ) ) {
                    // Mouse Events vorbereiten für Warnmeldung temporär anzuzeigen und wieder zu verbergen.
                    warnMessagePrepareMouseEvents();
                }
                else { 
                    // Button in der Warnmeldung aufbauen (hoffe ich), um Meldung das erste Mal zu verbergen. 
                    var div = document.createElement("div");
                    div.setAttribute("class", "GoAwayWarningMessage");
                    div.setAttribute("title", "Go away message");
                    div.setAttribute("style", "float: right; width: 70px; color: rgb(255, 255, 255); box-sizing: border-box; border: 2px solid rgb(255, 255, 255); opacity: 0.7; cursor: pointer; border-radius: 3px; margin-right: 2px; margin-top: 2px; text-align: center;");        
                    div.appendChild(document.createTextNode("Go away"));
                    div.addEventListener("click", warnMessageHideAndSave, false);
                    $('.WarningMessage')[0].parentNode.insertBefore(div, $('.WarningMessage')[0]);
                }
            }
        }
    } catch (e) {
        gclh_error("Hide Warning Message", e);
    }
//<-- $$033 End of insert
    
//--> $$033 Begin of insert
// Warnmeldung verbergen und sichern.
    function warnMessageHideAndSave() {
        // Warnmeldung verbergen und Inhalt sichern (mit allem Gedöhns), damit wir beim nächsten mal sofort verbergen können.
        $('.WarningMessage').fadeOut(1000, "linear");
        var content =  '"' + $('.WarningMessage')[0].innerHTML + '"';
        setValue("warningMessageContent", content);
        $('.GoAwayWarningMessage')[0].style.display = "none";

        // Mouse Events vorbereiten für Warnmeldung temporär anzuzeigen und wieder zu verbergen.
        warnMessagePrepareMouseEvents();
    }
// Mouse Events vorbereiten für Warnmeldung temporär anzuzeigen und wieder zu verbergen. 
    function warnMessagePrepareMouseEvents() {    
        // Balken im rechten Headerbereich zur erneuten Aktivierung der Warnmeldung.
        var divShow = document.createElement("div");
        divShow.setAttribute("class", "ShowWarningMessage");   
        divShow.setAttribute("style", "z-index: 1004; float: right; right: 0px; width: 6px; background-color: rgb(224, 183, 10); height: 65px; position: absolute;");        
        $('.WarningMessage')[0].parentNode.insertBefore(divShow, $('.WarningMessage')[0]);

        // Bereich für die Aufnahme des Mouseout Events, um die Warnmeldung wieder zu verbergen. Das ist notwendig, weil die eigentliche Warnmeldung 
        // nicht durchgängig vorhanden ist (padding) und nicht klar ist, wie eine Warnmelung morgen aussieht. 
        var divHide = document.createElement("div");
        divHide.setAttribute("class", "HideWarningMessage");   
        divHide.setAttribute("style", "z-index: 1004; height: 110px; position: absolute; right: 0px; left: 0px;");        
        $('.WarningMessage')[0].parentNode.insertBefore(divHide, $('.WarningMessage')[0]);
        
        // Anfangszustand herstellen wie bei Mouseout Event, also verbergen. 
        warnMessageMouseOut();
    }  
// Warnmeldung temporär wieder anzeigen.
    function warnMessageMouseOver() {
        $('.ShowWarningMessage')[0].style.display = "none";
        $('.WarningMessage')[0].style.display = "";
        $('.HideWarningMessage')[0].style.display = "";
        $('.HideWarningMessage')[0].addEventListener("mouseout", warnMessageMouseOut, false);
    }    
// Warnmeldung wieder verbergen.
    function warnMessageMouseOut() {
        $('.WarningMessage')[0].style.display = "none";
        $('.HideWarningMessage')[0].style.display = "none";
        $('.ShowWarningMessage')[0].style.display = "";
        $('.ShowWarningMessage')[0].addEventListener("mouseover", warnMessageMouseOver, false);
    }    
//<-- $$033 End of insert

//--> $$045 Begin of insert
// Überblicks Karte der Cache Lokation oben rechts im Cache Listing eingebaut.
    try {
        if ( settings_map_overview_build && is_page("cache_listing") && document.getElementById("ctl00_ContentBody_detailWidget") ) {
            var side = document.getElementById("ctl00_ContentBody_detailWidget");
            var box = document.createElement("div");
            var body = document.createElement("div");
            var map = document.createElement("div");
            var zoomControl = document.createElement("div");
            var zoomPlus = document.createElement("img");
            var zoomMinus = document.createElement("img");

            box.setAttribute("class", "CacheDetailNavigationWidget");
            box.setAttribute("style", "margin-top: 1.5em;");
            body.setAttribute("id", "gclh_map_overview");
            body.setAttribute("class", "WidgetBody");
            body.setAttribute("style", "padding: 0;");
            map.setAttribute("id", "gclh_map_static_values"); 
            map.setAttribute("style", "height: 248px; width: 248px;");  
            [ map.style.backgroundImage, map.value ] = buildMapValues( settings_map_overview_zoom );
            zoomControl.setAttribute("style", "padding: 3px 0px 0px 3px; width: 16px; float: left;");
            zoomPlus.setAttribute("style", "opacity: 0.75; cursor: pointer;");
            zoomPlus.setAttribute("title", "Zoom in");
            zoomPlus.src = "https://www.geocaching.com/images/zoom_in.png";
            zoomPlus.addEventListener('click', mapZoomIn, false);
            zoomMinus.setAttribute("style", "opacity: 0.75; cursor: pointer;");
            zoomMinus.setAttribute("title", "Zoom out");
            zoomMinus.src = "https://www.geocaching.com/images/zoom_out.png";
            zoomMinus.addEventListener('click', mapZoomOut, false);

            zoomControl.appendChild(zoomPlus);
            zoomControl.appendChild(zoomMinus);
            map.appendChild(zoomControl);
            body.appendChild(map);
            box.appendChild(body);
            side.parentNode.insertBefore(box, side);
        }
    } catch (e) {
        gclh_error("build map overview", e);
    }
//<-- $$045 End of insert
    
//--> $$045 Begin of insert
// Url und Zoomwert für die Überblicks Karte aufbauen.     
    function buildMapValues( zoom_value ) {
        var coords = new Array("", "");
        var gc_type = "";

        if ( zoom_value < 1 ) zoom_value = 1;
        if ( zoom_value > 19 ) zoom_value = 19;

        if ( document.getElementById('uxLatLon') ) var coords = toDec(document.getElementById("uxLatLon").innerHTML);
        if ( $("img:first", "a[href='/about/cache_types.aspx']")[0] ) {
            var src_arr = $("img:first", "a[href='/about/cache_types.aspx']").attr("src").split("/");
            var gc_type = src_arr[src_arr.length - 1].split(".")[0];
        }
        var url = 'url(' + http + '://maps.google.com/maps/api/staticmap?zoom=' + zoom_value + '&size=248x248' + '&maptype=roadmap&' 
                + 'markers=icon:http://www.geocaching.com/images/wpttypes/pins/' + gc_type + '.png' + '|' + coords[0] + ',' + coords[1] + ')';
        return [ url, zoom_value ];                    
    }
// In Karte hinein zoomen.
    function mapZoomIn() {
        if ( document.getElementById("gclh_map_static_values") ) {
            var map = document.getElementById("gclh_map_static_values");
            [ map.style.backgroundImage, map.value ] = buildMapValues( parseInt(map.value) + 1 );
        }
    }
// Aus Karte heraus zoomen.
    function mapZoomOut() {
        if ( document.getElementById("gclh_map_static_values") ) {
            var map = document.getElementById("gclh_map_static_values");
            [ map.style.backgroundImage, map.value ] = buildMapValues( parseInt(map.value) - 1 );
        }
    }
//<-- $$045 End of insert
    
//--> $$002 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Aplly Search-field in Navigation
//    try {
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/default\.aspx\?navi_search=/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/\?navi_search=/)) {
//            var matches = document.location.href.match(/\?navi_search=(.*)/);
//            if (matches) document.getElementById("tbSearch").value = urldecode(matches[1]).replace(/%20/g, " ");
//
//            function click_search() {
//                document.getElementById("ibSearch").click();
//            }
//
//            window.addEventListener("load", click_search, false);
//        }
//    } catch (e) {
//        gclh_error("Apply the Search", e);
//    }
//<-- $$002 End of delete 

//--> $$002 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Aplly Search Field in Navigation
    try {
        if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx\?navi_search=/) ) {
            var matches = document.location.href.match(/\?navi_search=(.*)/);
            if (matches) {
                document.getElementById("ctl00_ContentBody_LocationPanel1_OriginText").value = urldecode(matches[1]).replace(/%20/g, " ");
                
                function click_search() {
                    document.getElementById("ctl00_ContentBody_LocationPanel1_btnLocale").click();
                }
                window.addEventListener("load", click_search, false);
            }
        }
    } catch (e) {
        gclh_error("Apply the Search", e);
    }
//<-- $$002 End of insert

//--> $$036 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Show Favourite percentage
//    try {
//        if (settings_show_fav_percentage && is_page("cache_listing")) {
//            function gclh_load_score() {
//                unsafeWindow.showFavoriteScore();
//
//                setTimeout(function () {
//                    var fav = getElementsByClass('favorite-container')[0];
//                    if (fav) {
//                        var score = document.getElementById('uxFavoriteScore').innerHTML.match(/<strong>(.*)<\/strong>/);
//                        if (score && score[1]) {
//                            var val = getElementsByClass("favorite-value");
//
//                            // new stuff for displaying if I have given favorite point
//                            var myfav = document.getElementById("pnlFavoriteCache");
//                            var myfavHTML = ""
//                            if (myfav) {
//                                if (myfav.className.match("hideMe")) {
//                                    // remove from favorites is hidden -> I have not given a favorite
//                                    myfavHTML = '&nbsp;<img src="' + http + '://www.geocaching.com/images/icons/reg_user.gif" />';
//                                } else {
//                                    myfavHTML = '&nbsp;<img src="' + http + '://www.geocaching.com/images/icons/prem_user.gif" />';
//                                }
//                            }
//
//                            if (val[0] && document.location.href.match("cache_details")) {
//                                fav.innerHTML = "<span class='favorite-value'> " + val[0].innerHTML + "</span><br>&nbsp;&nbsp;&nbsp;&nbsp;" + score[1] + " &nbsp;&nbsp;&nbsp;&nbsp;<img id='imgFavoriteArrow' src='/images/arrow-down.png' alt='Expand' title='Expand'>";
//                            } else if (val[0] && document.location.href.match(/\/geocache\//)) { // New Listing-Design
//                                fav.innerHTML = fav.innerHTML.replace(/Favorites/, "");
//                                fav.innerHTML += score[1];
//                                fav.innerHTML += myfavHTML;
//                            }
//                        }
//                    }
//                }, 2000);
//            }
//
//            if (getElementsByClass('favorite-container')[0]) window.addEventListener("load", gclh_load_score, false);
//        }
//    } catch (e) {
//        gclh_error("Show Favourite percentage", e);
//    }
//<-- $$036 End of delete 
    
//--> $$036 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Show Favourite percentage.
    try {
        if (settings_show_fav_percentage && is_page("cache_listing")) {
            function gclh_load_score( waitCount ) {
                unsafeWindow.showFavoriteScore();

                if ( document.getElementsByClassName("favorite-container")[0] &&
                     document.getElementsByClassName("favorite-score")[0].innerHTML.match("%") &&
                     document.getElementsByClassName("favorite-dropdown")[0]                      ) {

                    // Box mit Schleifchen/Herz, Anzahl Favoriten, Text "Favorites" und Drop-Down-Pfeil.                       
                    var fav = document.getElementsByClassName("favorite-container")[0];
                    if (fav) {
                        // Prozentzahl und Text.
                        var score = document.getElementsByClassName("favorite-score")[0].innerHTML.match(/(.*%)\.*/);
                        if (score && score[1]) {
                            // Eigener Favoritenpunkt. Wenn class hideMe vorhanden ist, dann habe ich keinen                   
                            // Favoritenpunkt vergeben. Ist sie nicht vorhanden, dann habe ich einen Favoritenpunkt vergeben.  
                            var myfav = document.getElementById("pnlFavoriteCache");
                            var myfavHTML = "";
                            if (myfav) {
                                if (myfav.className.match("hideMe")) {
                                    myfavHTML = '&nbsp;<img src="' + http + '://www.geocaching.com/images/icons/reg_user.gif" />';
                                } else {
                                    myfavHTML = '&nbsp;<img src="' + http + '://www.geocaching.com/images/icons/prem_user.gif" />';
                                }
                            }
                            
                            // Favoritenbox ändern.
                            fav.getElementsByTagName("span")[0].nextSibling.remove();  // Text Favoriten
                            fav.innerHTML += score[1];
                            fav.innerHTML += myfavHTML;
                            // Dropdown anpassen.
                            if ( document.getElementsByClassName("favorite-dropdown")[0] ) {
                                var dd = document.getElementsByClassName("favorite-dropdown")[0];
                                dd.style.borderTop = "1px solid #f0edeb";
                                dd.style.borderTopLeftRadius = "5px";
                                dd.style.minWidth = "190px";
                            }
                        }
                    }
                } else {
                    waitCount++;
                    if ( waitCount <= 100 ) {  // 10 Sekunden lang
                        setTimeout( function () { gclh_load_score( waitCount ) }, 100); 
                    } else return;
                }
            }
            gclh_load_score( 0 );
        }
    } catch (e) {
        gclh_error("Show Favourite percentage", e);
    }
//<-- $$036 End of insert

// Show Real Owner
    try {
        if (is_page("cache_listing") && document.getElementById("ctl00_ContentBody_mcd1")) {
            var real_owner = get_real_owner();
            var owner_link = false;
            var links = document.getElementById("ctl00_ContentBody_mcd1").getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/\/profile\/\?guid\=/)) {
                    owner_link = links[i];
                    break;
                }
            }

            if (owner_link && real_owner) {
                var pseudo = owner_link.innerHTML;
                if (settings_show_real_owner) {
                    owner_link.innerHTML = real_owner;
                    owner_link.title = pseudo;
                } else {
                    owner_link.innerHTML = pseudo;
                    owner_link.title = real_owner;
                }
            }
        }
    } catch (e) {
        gclh_error("Show Real Owner", e);
    }

// Highlight related web page link
    try {
        if (is_page("cache_listing") && document.getElementById("ctl00_ContentBody_uxCacheUrl")) {
            var lnk = document.getElementById("ctl00_ContentBody_uxCacheUrl");

            var html = "<fieldset class=\"DisclaimerWidget\">";
            html += "  <legend class=\"warning\">Please note</legend>";
            html += "  <p class=\"NoBottomSpacing\">";
            html += lnk.parentNode.innerHTML;
            html += "  </p>";
            html += "</fieldset>";

            lnk.parentNode.innerHTML = html;
        }
    } catch (e) {
        gclh_error("Highlight Related Web page", e);
    }

// Show other Coord-Formats in Listing
    try {
        if (is_page("cache_listing") && document.getElementById('uxLatLon')) {
            var box = document.getElementById('ctl00_ContentBody_LocationSubPanel'); //.childNodes[0];
            box.innerHTML = box.innerHTML.replace("<br>", "");
            var coords = document.getElementById('uxLatLon').innerHTML;
            var dec = toDec(coords);
            var lat = dec[0];
            var lng = dec[1];
            if (lat < 0) lat = "S " + (lat * -1);
            else lat = "N " + lat;
            if (lng < 0) lng = "W " + (lng * -1);
            else lng = "E " + lng;
            box.innerHTML += " - Dec: " + lat + " " + lng;

            var dms = DegtoDMS(coords);
            box.innerHTML += " - DMS: " + dms;

            box.innerHTML = "<font style='font-size: 10px;'>" + box.innerHTML + "</font><br>";
        }
        // ... and on print-page
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cdpf\.aspx/)) {
            var box = getElementsByClass("UTM Meta")[0];
            var coords = getElementsByClass("LatLong Meta")[0];
            if (box && coords) {
                var match = coords.innerHTML.match(/((N|S) [0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9] (E|W) [0-9][0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9])/);
                if (match && match[1]) {
                    coords = match[1];
                    var dec = toDec(coords);
                    var lat = dec[0];
                    var lng = dec[1];
                    if (lat < 0) lat = "S " + (lat * -1);
                    else lat = "N " + lat;
                    if (lng < 0) lng = "W " + (lng * -1);
                    else lng = "E " + lng;
                    box.innerHTML += "<br>Dec: " + lat + " " + lng;

                    var dms = DegtoDMS(coords);
                    box.innerHTML += "<br>DMS: " + dms;
                }
            }
        }
    } catch (e) {
        gclh_error("Show other coord-formats", e);
    }

// Show Map-It button at Listing
    try {
        if (is_page("cache_listing") && document.getElementById('uxLatLon')) {
            var coords = toDec(document.getElementById("uxLatLon").innerHTML);
            var link;
            if (document.getElementById("uxLatLonLink") != null) { //If server deliver userDefinedCoords.status="fail", then link will be null
                link = document.getElementById("uxLatLonLink").parentNode;
            }
            else {
                link = document.getElementById("uxLatLon").parentNode;
            }
            var a = document.createElement("a");
            var small = document.createElement("small");
            a.setAttribute("href", map_url + "?ll=" + coords[0] + "," + coords[1]);
            a.appendChild(document.createTextNode("Map this Location"));
            small.appendChild(document.createTextNode(" - "));
            small.appendChild(a);
            link.appendChild(small);
        }
    } catch (e) {
        gclh_error("Map It Button", e);
    }

// Map on create pocketQuery-page
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket\/gcquery\.aspx/)) {
//--> $$013 Begin of change
//            $('.LatLongTable').after('<img style="position:absolute;top: 30px; left: 300px;height:350px;width:450px;" id="gclh_map">').parent().css("style", "relative");
            $('.LatLongTable').after('<img style="position:absolute;top: 8px; left: 300px;height:350px;width:450px;" id="gclh_map">').parent().css("style", "relative");
//<-- $$013 End of change
            $('.LatLongTable input').change(function () {
                var coordType = document.getElementsByName("ctl00$ContentBody$LatLong")[0].value;
                var northField = $('#ctl00_ContentBody_LatLong\\:_selectNorthSouth')[0];
                var northSouth = $(northField.options[northField.selectedIndex]).text().replace('.', '');
                var westField = $('#ctl00_ContentBody_LatLong\\:_selectEastWest')[0];
                var westEast = $(westField.options[westField.selectedIndex]).text().replace('.', '');

                var lat = "";
                var lng = "";
                switch (coordType) {
                    case "2": //DMS
                        lat = northSouth + " " + $('#ctl00_ContentBody_LatLong__inputLatDegs')[0].value + " " + $('#ctl00_ContentBody_LatLong__inputLatMins')[0].value + ' ' + $('#ctl00_ContentBody_LatLong__inputLatSecs')[0].value;
                        lng = westEast + " " + $('#ctl00_ContentBody_LatLong__inputLongDegs')[0].value + " " + $('#ctl00_ContentBody_LatLong__inputLongMins')[0].value + ' ' + $('#ctl00_ContentBody_LatLong__inputLongSecs')[0].value;
                        var converted = toDec(lat + " " + lng);
                        lat = converted[0];
                        lng = converted[1];
                        break;
                    case "1": //MinDec
                        lat = northSouth + " " + $('#ctl00_ContentBody_LatLong__inputLatDegs')[0].value + " " + $('#ctl00_ContentBody_LatLong__inputLatMins')[0].value;
                        lng = westEast + " " + $('#ctl00_ContentBody_LatLong__inputLongDegs')[0].value + " " + $('#ctl00_ContentBody_LatLong__inputLongMins')[0].value;
                        var converted = toDec(lat + " " + lng);
                        lat = converted[0];
                        lng = converted[1];
                        break;
                    case "0": //DegDec
                        lat = (northSouth == "S" ? "-" : "") + $('#ctl00_ContentBody_LatLong__inputLatDegs')[0].value;
                        lng = (westEast == "W" ? "-" : "") + $('#ctl00_ContentBody_LatLong__inputLongDegs')[0].value;
                        break;
                }
                $('#gclh_map').attr("src", 'http://staticmap.openstreetmap.de/staticmap.php?center=' + lat + ',' + lng + '&zoom=15&size=450x350&markers=' + lat + ',' + lng + ',ol-marker');
            });
            $('.LatLongTable input').change();
        }
    } catch (e) {
        gclh_error("map on create pocketQuery page", e);
    }

// Name for PocketQuery from Bookmark
    try {
        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket\/bmquery\.aspx/)) && document.getElementById("ctl00_ContentBody_lnkListName")) {
            document.getElementById('ctl00_ContentBody_tbName').value = document.getElementById("ctl00_ContentBody_lnkListName").innerHTML;
//    document.getElementById('ctl00_ContentBody_rbRunOption_2').checked = true;
            document.getElementById('ctl00_ContentBody_cbIncludePQNameInFileName').checked = true;
        }
    } catch (e) {
        gclh_error("PQ-Name from Bookmark", e);
    }

// Show refresh button for PocketQuery Page
    try {
        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket/)) && document.getElementById("uxCreateNewPQ")) {
            document.getElementById('uxCreateNewPQ').parentNode.parentNode.parentNode.innerHTML += "<p><a href='" + http + "://www.geocaching.com/pocket/default.aspx' title='Refresh Page'>Refresh Page</a></p>";
        }
    } catch (e) {
        gclh_error("Refresh button on PQ-Page", e);
    }

// Highlight column of current day on PocketQuery Page
    try {
        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket/)) && document.getElementById("ActivePQs")) {
            var matches = document.getElementById('ActivePQs').childNodes[1].innerHTML.match(/([A-Za-z]*),/);
            if (matches) {
                var highlight = 0;
                switch (matches[1]) {
                    case "Sunday":
                        highlight = 11;
                        break;
                    case "Monday":
                        highlight = 13;
                        break;
                    case "Tuesday":
                        highlight = 15;
                        break;
                    case "Wednesday":
                        highlight = 17;
                        break;
                    case "Thursday":
                        highlight = 19;
                        break;
                    case "Friday":
                        highlight = 21;
                        break;
                    case "Saturday":
                        highlight = 23;
                        break;
                }

                if (highlight > 0) {
                    var trs = document.getElementById("pqRepeater").getElementsByTagName("tr");

                    for (var i = 0; i < trs.length; i++) {
                        if (i == (trs.length - 1)) highlight -= 4;
                        trs[i].childNodes[highlight].style.backgroundColor = "#E3DDC2";
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("Highlight column on PQ-Page", e);
    }

// Fixed header for PocketQuery
    try {
        if (settings_fixed_pq_header && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/pocket/) && document.getElementById("pqRepeater")) {
            //scrolify based on http://stackoverflow.com/questions/673153/html-table-with-fixed-headers
            function scrolify(tblAsJQueryObject, height) {
                var oTbl = window.$(tblAsJQueryObject);

                // for very large tables you can remove the four lines below
                // and wrap the table with <div> in the mark-up and assign
                // height and overflow property

                var oTblDiv = window.$("<div/>");
                oTblDiv.css('height', height);
                oTblDiv.css('overflow-y', 'auto');
                oTblDiv.css("margin-bottom", oTbl.css("margin-bottom"));
                oTbl.css("margin-bottom", "0px")
                oTbl.wrap(oTblDiv);

                // save original width
                oTbl.attr("data-item-original-width", oTbl.width());
                oTbl.find('thead tr td').each(function () {
                    window.$(this).attr("data-item-original-width", (unsafeWindow || window).$(this).width());
                });
                oTbl.find('tbody tr:eq(0) td').each(function () {
                    window.$(this).attr("data-item-original-width", (unsafeWindow || window).$(this).width());
                });


                // clone the original table
                var newTbl = oTbl.clone();

                // remove table header from original table
                oTbl.find('thead tr').remove();
                // remove table body from new table
                newTbl.find('tbody tr').remove();

                oTbl.parent().before(newTbl);
                newTbl.wrap("<div/>");

                // replace ORIGINAL COLUMN width
                newTbl.width(newTbl.attr('data-item-original-width'));
                newTbl.find('thead tr td').each(function () {
                    window.$(this).width(window.$(this).attr("data-item-original-width"));
                });
                oTbl.width(oTbl.attr('data-item-original-width'));
                oTbl.find('tbody tr:eq(0) td').each(function () {
                    window.$(this).width(window.$(this).attr("data-item-original-width"));
                });
            }

            if (browser === "firefox") {
                exportFunction(scrolify, unsafeWindow, {defineAs: "scrolify"});
                unsafeWindow.scrolify(unsafeWindow.$('#pqRepeater'), 300);
            }
            else {

                scrolify(unsafeWindow.$('#pqRepeater'), 300);
            }

            unsafeWindow.$('#ActivePQs').css("padding-right", "0px");
        }
    } catch (e) {
        gclh_error("Fixed header for PocketQuery", e);
    }

// Sum up all FP and BM entries on public profile pages
    try {
        if (is_page("publicProfile")) {
            $('#ctl00_ContentBody_ProfilePanel1_pnlBookmarks h3').each(function (i, e) {
                $(e).text($(e).text() + ' (' + $(e).next().find('tbody tr').length + ')');
            });
        }
    } catch (e) {
        gclh_error("Sum up all FP and BM entries on public profile pages", e);
    }

// Redirect to Map (von Search Liste direkt in Karte springen)
    if (settings_redirect_to_map && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx\?/)) {
        if (!document.location.href.match(/&disable_redirect/) && !document.location.href.match(/key=/) && !document.location.href.match(/ul=/) && document.getElementById('ctl00_ContentBody_LocationPanel1_lnkMapIt')) {
            document.getElementById('ctl00_ContentBody_LocationPanel1_lnkMapIt').click();
        }
    }

// Hide Facebook
    try {
        if (settings_hide_facebook) {
            if (document.getElementById('ctl00_uxSignIn')) {
                document.getElementById('ctl00_uxSignIn').parentNode.style.display = "none";
            }
            if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/login(.*)/) && document.getElementById("ctl00_ContentBody_LoginPanel")) {
                var loginpanelfb = getElementsByClass("LoginWithFacebook")[0];
                loginpanelfb.parentNode.removeChild(loginpanelfb);
            }
        }
    } catch (e) {
        gclh_error("Hide Facebook", e);
    }

// Hide Socialshare
    try {
        if (settings_hide_socialshare && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx?(.*)/) && document.getElementById('sharing_container')) {
            var socialshare = document.getElementById('sharing_container');
            socialshare.style.display = "none";
        }
//--> $$009 Begin of insert
        if (settings_hide_socialshare && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx?(.*)/) && document.getElementById('uxSocialSharing')) {
            var uxSocialSharing = document.getElementById('uxSocialSharing');
            uxSocialSharing.style.display = "none";
        }
//<-- $$009 End of insert
    } catch (e) {
        gclh_error("Hide SocialShare", e);
    }

//--> $$055 Begin of delete
//// Add chosen plugin
//    function addChosenPlugin() {
//        var chosenSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAlCAYAAAAN8srVAAACTUlEQVR42u3Wv2sTcRiA8VPBxUKwEAxU3NxPIoFAl1bIkkmwYKAKRbqbRSWQCGJ+rMUibjo4FARBl0AgUIh/QXFxFIpKJHAQKA56r0/hDbyEK5VrDH2hBx+ud+Ga9+G+uSQQkVOv0+lMZNBFHoFRwABZb0F9CCITVdRjQd9b0CoOTNSGiRkidBWkljGGINb9CCECd0FqE7GJqkxeMxccK8UbJzppUPGIO5SfR9DCjINsTIR1RDbKXvAakuB9yqAsvuLaDIN6Jqag5/IaIxjYCxaxDzFGyKUMegdBb4ZBGfQmMUaIXeSmLyhDjHspl9wdiPHgJEGlUumf2UGml96HlJ+hRQwhRoSleQfZgfawlDJoB5KgO4OgDLrIT4UUMEA2xdNpro/t6aA+BJGJKuqxoJ9ikLmzQas4MFEbJmYIHz99GNRaxhiCWPcjhAjcBalNxCaqgsBrUPGIO5T3GGRjIqwjslHegnompqDn8hojGHgLyqA3iTFC7CLnLOh4Z0Gn3FnQf2O3ZrN5iZ9aVw81Go3zQfLmI4iIx/gBUXvtdnvNXZDGbEMI2Gf/BFsQPXffVRADr+jgn1hylwPdOL6Bn7w2brVaV9wEMfALBheGDu3QGvVQ79RtT0FvGDyu1WoXE4JWNKjiack916HXEoJecT7GLTdBLLXrDPwbEX+Xq9XqucPHNzFVzv3B93q9fsHbU+4uhAhh/wXfIMaWqyBdXjfxluE/63fQM/Yt8/je9hQ0vdnQpybqJRZcB2nUI4J+QVB2H6RRHzUoTPo/fwGr9gNcek8bXAAAAABJRU5ErkJggg==';
//        var chosenSprite2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABKCAMAAABgpuGuAAAAzFBMVEX///8AAACIiIiIiIiIiIhGRkZGRkZGRkaIiIiHh4eHh4eGhoaAgICGhoaHh4dGRkaHh4eHh4eIiIiHh4eIiIiHh4eIiIiHh4eHh4eHh4eHh4eHh4eAgICHh4eHh4eAgICFhYWIiIiHh4eHh4eHh4eIiIiEhISIiIiIiIiIiIiIiIiHh4d0dHSGhoaHh4eDg4NVVVWDg4OHh4eIiIiAgICHh4eHh4eAgICIiIiHh4eIiIiHh4eIiIiHh4eGhoaHh4eHh4eIiIiIiIhGRkYymc+gAAAAQnRSTlMAAP7wMDDwYGCg/VAQcIDz4CDz0PxAz7D1wPv5CGChFEX64t2QHh2N3Jaa2wsTgiEDKYjYDGaZBO8Rqd+LREqM5n7NGqdwAAACCUlEQVR4Xu3V127jMBCFYZ2h5KJiW5a7UzbJ9t57Hb3/O60Ik+JFsMLCwrkI4P+KV/oAYjSMOAEjE8MVm1HECiNVL8VGlSY1jpW8w5OMeil2RxIUe6k9kCA4YD7nOhG8RHYiWCk4YEKI5wdnHuPuQPyr4w8Df7xhm0xgI/2wASpVSwsdvYJm2jbrgraqWwsdvVSXAVp2QJk2ZQCOfiaw9s4a/4bymYVmOXD0w4fSzaIpO6CJ2nTyH1Cfj6BUV9kHwuFa0AFtPbTtBS0ttOyAMm3L+kB2HtbogG79Ap0Bw0ECVzIYBgilMaWH+odhXTeSc+p62LFeetU4VvKOlTgNai8l7kiCEi+1BxIEB0ynXCeCl8hOBCsFB0wIyfTgTBPcEYh/dfxh4I83/4flryD+UmU9E4Q6Hj5Cp06dOoWmvKhURFZFjjYGlBlVC4l+zpjQuahIulikljrnQZmqXN18ePDwz+O9qGQsKDcqm/tnaHrxdCNichJUiOwf4dDrJzvRggStJH32HK6za9GKBKlKgbaXqQgNSl8F6N6CCb3pgFhX95Z3dZXKu/dwXV6nsiJBhcrVx09u6C6I450bkc3FpXW+fN2I7nPaChKV3bfvP37++r0TVR3zlqqKpIelqrYx85kQm+o+SKSHb2WhqsjHTiJBITiJDQWJDAWpIkNBIkJBIkOhSnUShf4C9DyJBLzMYSsAAAAASUVORK5CYII=';
//        var jQuery = jQuery || window.jQuery || $;
//        /* Chosen v1.0.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
//        !function () {
//            var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty, d = function (a, b) {
//                function d() {
//                    this.constructor = a
//                }
//
//                for (var e in b)c.call(b, e) && (a[e] = b[e]);
//                return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
//            };
//            SelectParser = function () {
//                function SelectParser() {
//                    this.options_index = 0, this.parsed = []
//                }
//
//                return SelectParser.prototype.add_node = function (a) {
//                    return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
//                }, SelectParser.prototype.add_group = function (a) {
//                    var b, c, d, e, f, g;
//                    for (b = this.parsed.length, this.parsed.push({
//                        array_index: b,
//                        group: !0,
//                        label: this.escapeExpression(a.label),
//                        children: 0,
//                        disabled: a.disabled
//                    }), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++)c = f[d], g.push(this.add_option(c, b, a.disabled));
//                    return g
//                }, SelectParser.prototype.add_option = function (a, b, c) {
//                    return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({
//                        array_index: this.parsed.length,
//                        options_index: this.options_index,
//                        value: a.value,
//                        text: a.text,
//                        html: a.innerHTML,
//                        selected: a.selected,
//                        disabled: c === !0 ? c : a.disabled,
//                        group_array_index: b,
//                        classes: a.className,
//                        style: a.style.cssText
//                    })) : this.parsed.push({
//                        array_index: this.parsed.length,
//                        options_index: this.options_index,
//                        empty: !0
//                    }), this.options_index += 1) : void 0
//                }, SelectParser.prototype.escapeExpression = function (a) {
//                    var b, c;
//                    return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {
//                        "<": "&lt;",
//                        ">": "&gt;",
//                        '"': "&quot;",
//                        "'": "&#x27;",
//                        "`": "&#x60;"
//                    }, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function (a) {
//                        return b[a] || "&amp;"
//                    })) : a
//                }, SelectParser
//            }(), SelectParser.select_to_array = function (a) {
//                var b, c, d, e, f;
//                for (c = new SelectParser, f = a.childNodes, d = 0, e = f.length; e > d; d++)b = f[d], c.add_node(b);
//                return c.parsed
//            }, AbstractChosen = function () {
//                function AbstractChosen(a, b) {
//                    this.form_field = a, this.options = null != b ? b : {}, AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
//                }
//
//                return AbstractChosen.prototype.set_default_values = function () {
//                    var a = this;
//                    return this.click_test_action = function (b) {
//                        return a.test_active_click(b)
//                    }, this.activate_action = function (b) {
//                        return a.activate_field(b)
//                    }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
//                }, AbstractChosen.prototype.set_default_text = function () {
//                    return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text
//                }, AbstractChosen.prototype.mouse_enter = function () {
//                    return this.mouse_on_container = !0
//                }, AbstractChosen.prototype.mouse_leave = function () {
//                    return this.mouse_on_container = !1
//                }, AbstractChosen.prototype.input_focus = function () {
//                    var a = this;
//                    if (this.is_multiple) {
//                        if (!this.active_field)return setTimeout(function () {
//                            return a.container_mousedown()
//                        }, 50)
//                    } else if (!this.active_field)return this.activate_field()
//                }, AbstractChosen.prototype.input_blur = function () {
//                    var a = this;
//                    return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
//                        return a.blur_test()
//                    }, 100))
//                }, AbstractChosen.prototype.results_option_build = function (a) {
//                    var b, c, d, e, f;
//                    for (b = "", f = this.results_data, d = 0, e = f.length; e > d; d++)c = f[d], b += c.group ? this.result_add_group(c) : this.result_add_option(c), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(c.text));
//                    return b
//                }, AbstractChosen.prototype.result_add_option = function (a) {
//                    var b, c;
//                    return a.search_match ? this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = "" !== a.style.cssText ? ' style="' + a.style + '"' : "", '<li class="' + b.join(" ") + '"' + c + ' data-option-array-index="' + a.array_index + '">' + a.search_text + "</li>") : "" : ""
//                }, AbstractChosen.prototype.result_add_group = function (a) {
//                    return a.search_match || a.group_match ? a.active_options > 0 ? '<li class="group-result">' + a.search_text + "</li>" : "" : ""
//                }, AbstractChosen.prototype.results_update_field = function () {
//                    return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build(), this.results_showing ? this.winnow_results() : void 0
//                }, AbstractChosen.prototype.results_toggle = function () {
//                    return this.results_showing ? this.results_hide() : this.results_show()
//                }, AbstractChosen.prototype.results_search = function () {
//                    return this.results_showing ? this.winnow_results() : this.results_show()
//                }, AbstractChosen.prototype.winnow_results = function () {
//                    var a, b, c, d, e, f, g, h, i, j, k, l, m;
//                    for (this.no_results_clear(), e = 0, g = this.get_search_text(), a = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), d = this.search_contains ? "" : "^", c = new RegExp(d + a, "i"), j = new RegExp(a, "i"), m = this.results_data, k = 0, l = m.length; l > k; k++)b = m[k], b.search_match = !1, f = null, this.include_option_in_results(b) && (b.group && (b.group_match = !1, b.active_options = 0), null != b.group_array_index && this.results_data[b.group_array_index] && (f = this.results_data[b.group_array_index], 0 === f.active_options && f.search_match && (e += 1), f.active_options += 1), (!b.group || this.group_search) && (b.search_text = b.group ? b.label : b.html, b.search_match = this.search_string_match(b.search_text, c), b.search_match && !b.group && (e += 1), b.search_match ? (g.length && (h = b.search_text.search(j), i = b.search_text.substr(0, h + g.length) + "</em>" + b.search_text.substr(h + g.length), b.search_text = i.substr(0, h) + "<em>" + i.substr(h)), null != f && (f.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0)));
//                    return this.result_clear_highlight(), 1 > e && g.length ? (this.update_results_content(""), this.no_results(g)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
//                }, AbstractChosen.prototype.search_string_match = function (a, b) {
//                    var c, d, e, f;
//                    if (b.test(a))return !0;
//                    if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))for (e = 0, f = d.length; f > e; e++)if (c = d[e], b.test(c))return !0
//                }, AbstractChosen.prototype.choices_count = function () {
//                    var a, b, c, d;
//                    if (null != this.selected_option_count)return this.selected_option_count;
//                    for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++)a = d[b], a.selected && (this.selected_option_count += 1);
//                    return this.selected_option_count
//                }, AbstractChosen.prototype.choices_click = function (a) {
//                    return a.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
//                }, AbstractChosen.prototype.keyup_checker = function (a) {
//                    var b, c;
//                    switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
//                        case 8:
//                            if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)return this.keydown_backstroke();
//                            if (!this.pending_backstroke)return this.result_clear_highlight(), this.results_search();
//                            break;
//                        case 13:
//                            if (a.preventDefault(), this.results_showing)return this.result_select(a);
//                            break;
//                        case 27:
//                            return this.results_showing && this.results_hide(), !0;
//                        case 9:
//                        case 38:
//                        case 40:
//                        case 16:
//                        case 91:
//                        case 17:
//                            break;
//                        default:
//                            return this.results_search()
//                    }
//                }, AbstractChosen.prototype.container_width = function () {
//                    return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
//                }, AbstractChosen.prototype.include_option_in_results = function (a) {
//                    return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
//                }, AbstractChosen.browser_is_supported = function () {
//                    return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
//                }, AbstractChosen.default_multiple_text = "Select Some Options", AbstractChosen.default_single_text = "Select an Option", AbstractChosen.default_no_result_text = "No results match", AbstractChosen
//            }(), a = jQuery, a.fn.extend({
//                chosen: function (b) {
//                    return AbstractChosen.browser_is_supported() ? this.each(function () {
//                        var c, d;
//                        c = a(this), d = c.data("chosen"), "destroy" === b && d ? d.destroy() : d || c.data("chosen", new Chosen(this, b))
//                    }) : this
//                }
//            }), Chosen = function (c) {
//                function Chosen() {
//                    return b = Chosen.__super__.constructor.apply(this, arguments)
//                }
//
//                return d(Chosen, c), Chosen.prototype.setup = function () {
//                    return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
//                }, Chosen.prototype.set_up_html = function () {
//                    var b, c;
//                    return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = {
//                        "class": b.join(" "),
//                        style: "width: " + this.container_width() + ";",
//                        title: this.form_field.title
//                    }, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
//                }, Chosen.prototype.register_observers = function () {
//                    var a = this;
//                    return this.container.bind("mousedown.chosen", function (b) {
//                        a.container_mousedown(b)
//                    }), this.container.bind("mouseup.chosen", function (b) {
//                        a.container_mouseup(b)
//                    }), this.container.bind("mouseenter.chosen", function (b) {
//                        a.mouse_enter(b)
//                    }), this.container.bind("mouseleave.chosen", function (b) {
//                        a.mouse_leave(b)
//                    }), this.search_results.bind("mouseup.chosen", function (b) {
//                        a.search_results_mouseup(b)
//                    }), this.search_results.bind("mouseover.chosen", function (b) {
//                        a.search_results_mouseover(b)
//                    }), this.search_results.bind("mouseout.chosen", function (b) {
//                        a.search_results_mouseout(b)
//                    }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (b) {
//                        a.search_results_mousewheel(b)
//                    }), this.form_field_jq.bind("chosen:updated.chosen", function (b) {
//                        a.results_update_field(b)
//                    }), this.form_field_jq.bind("chosen:activate.chosen", function (b) {
//                        a.activate_field(b)
//                    }), this.form_field_jq.bind("chosen:open.chosen", function (b) {
//                        a.container_mousedown(b)
//                    }), this.search_field.bind("blur.chosen", function (b) {
//                        a.input_blur(b)
//                    }), this.search_field.bind("keyup.chosen", function (b) {
//                        a.keyup_checker(b)
//                    }), this.search_field.bind("keydown.chosen", function (b) {
//                        a.keydown_checker(b)
//                    }), this.search_field.bind("focus.chosen", function (b) {
//                        a.input_focus(b)
//                    }), this.is_multiple ? this.search_choices.bind("click.chosen", function (b) {
//                        a.choices_click(b)
//                    }) : this.container.bind("click.chosen", function (a) {
//                        a.preventDefault()
//                    })
//                }, Chosen.prototype.destroy = function () {
//                    return a(document).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
//                }, Chosen.prototype.search_field_disabled = function () {
//                    return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
//                }, Chosen.prototype.container_mousedown = function (b) {
//                    return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(document).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
//                }, Chosen.prototype.container_mouseup = function (a) {
//                    return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
//                }, Chosen.prototype.search_results_mousewheel = function (a) {
//                    var b, c, d;
//                    return b = -(null != (c = a.originalEvent) ? c.wheelDelta : void 0) || (null != (d = a.originialEvent) ? d.detail : void 0), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
//                }, Chosen.prototype.blur_test = function () {
//                    return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
//                }, Chosen.prototype.close_field = function () {
//                    return a(document).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
//                }, Chosen.prototype.activate_field = function () {
//                    return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
//                }, Chosen.prototype.test_active_click = function (b) {
//                    return this.container.is(a(b.target).closest(".chosen-container")) ? this.active_field = !0 : this.close_field()
//                }, Chosen.prototype.results_build = function () {
//                    return this.parsing = !0, this.selected_option_count = null, this.results_data = SelectParser.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
//                }, Chosen.prototype.result_do_highlight = function (a) {
//                    var b, c, d, e, f;
//                    if (a.length) {
//                        if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e)return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
//                        if (f > c)return this.search_results.scrollTop(c)
//                    }
//                }, Chosen.prototype.result_clear_highlight = function () {
//                    return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
//                }, Chosen.prototype.results_show = function () {
//                    return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results())
//                }, Chosen.prototype.update_results_content = function (a) {
//                    return this.search_results.html(a)
//                }, Chosen.prototype.results_hide = function () {
//                    return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
//                }, Chosen.prototype.set_tab_index = function () {
//                    var a;
//                    return this.form_field.tabIndex ? (a = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = a) : void 0
//                }, Chosen.prototype.set_label_behavior = function () {
//                    var b = this;
//                    return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (a) {
//                        return b.is_multiple ? b.container_mousedown(a) : b.activate_field()
//                    }) : void 0
//                }, Chosen.prototype.show_search_field_default = function () {
//                    return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
//                }, Chosen.prototype.search_results_mouseup = function (b) {
//                    var c;
//                    return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0
//                }, Chosen.prototype.search_results_mouseover = function (b) {
//                    var c;
//                    return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0
//                }, Chosen.prototype.search_results_mouseout = function (b) {
//                    return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
//                }, Chosen.prototype.choice_build = function (b) {
//                    var c, d, e = this;
//                    return c = a("<li />", {"class": "search-choice"}).html("<span>" + b.html + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {
//                        "class": "search-choice-close",
//                        "data-option-array-index": b.array_index
//                    }), d.bind("click.chosen", function (a) {
//                        return e.choice_destroy_link_click(a)
//                    }), c.append(d)), this.search_container.before(c)
//                }, Chosen.prototype.choice_destroy_link_click = function (b) {
//                    return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
//                }, Chosen.prototype.choice_destroy = function (a) {
//                    return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0
//                }, Chosen.prototype.results_reset = function () {
//                    return this.form_field.options[0].selected = !0, this.selected_option_count = null, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
//                }, Chosen.prototype.results_reset_cleanup = function () {
//                    return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
//                }, Chosen.prototype.result_select = function (a) {
//                    var b, c, d;
//                    return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? b.removeClass("active-result") : (this.result_single_selected && (this.result_single_selected.removeClass("result-selected"), d = this.result_single_selected[0].getAttribute("data-option-array-index"), this.results_data[d].selected = !1), this.result_single_selected = b), b.addClass("result-selected"), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(c.text), (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[c.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
//                }, Chosen.prototype.single_set_selected_text = function (a) {
//                    return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(a)
//                }, Chosen.prototype.result_deselect = function (a) {
//                    var b;
//                    return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[b.options_index].value}), this.search_field_scale(), !0)
//                }, Chosen.prototype.single_deselect_control_build = function () {
//                    return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
//                }, Chosen.prototype.get_search_text = function () {
//                    return this.search_field.val() === this.default_text ? "" : a("<div/>").text(a.trim(this.search_field.val())).html()
//                }, Chosen.prototype.winnow_results_set_highlight = function () {
//                    var a, b;
//                    return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0
//                }, Chosen.prototype.no_results = function (b) {
//                    var c;
//                    return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), c.find("span").first().html(b), this.search_results.append(c)
//                }, Chosen.prototype.no_results_clear = function () {
//                    return this.search_results.find(".no-results").remove()
//                }, Chosen.prototype.keydown_arrow = function () {
//                    var a;
//                    return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
//                }, Chosen.prototype.keyup_arrow = function () {
//                    var a;
//                    return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
//                }, Chosen.prototype.keydown_backstroke = function () {
//                    var a;
//                    return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
//                }, Chosen.prototype.clear_backstroke = function () {
//                    return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
//                }, Chosen.prototype.keydown_checker = function (a) {
//                    var b, c;
//                    switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
//                        case 8:
//                            this.backstroke_length = this.search_field.val().length;
//                            break;
//                        case 9:
//                            this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
//                            break;
//                        case 13:
//                            a.preventDefault();
//                            break;
//                        case 38:
//                            a.preventDefault(), this.keyup_arrow();
//                            break;
//                        case 40:
//                            a.preventDefault(), this.keydown_arrow()
//                    }
//                }, Chosen.prototype.search_field_scale = function () {
//                    var b, c, d, e, f, g, h, i, j;
//                    if (this.is_multiple) {
//                        for (d = 0, h = 0, f = "position:absolute; left: -1000px; top: -1000px; display:none;", g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], i = 0, j = g.length; j > i; i++)e = g[i], f += e + ":" + this.search_field.css(e) + ";";
//                        return b = a("<div />", {style: f}), b.text(this.search_field.val()), a("body").append(b), h = b.width() + 25, b.remove(), c = this.container.outerWidth(), h > c - 10 && (h = c - 10), this.search_field.css({width: h + "px"})
//                    }
//                }, Chosen
//            }(AbstractChosen)
//        }.call(this);
//        /* Chosen v1.0.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
//        GM_addStyle(".chosen-container{position:relative;display:inline-block;vertical-align:middle;font-size:13px;zoom:1;*display:inline;-webkit-user-select:none;-moz-user-select:none;user-select:none}.chosen-container .chosen-drop{position:absolute;top:100%;left:-9999px;z-index:1010;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;border:1px solid #aaa;border-top:0;background:#fff;box-shadow:0 4px 5px rgba(0,0,0,.15)}.chosen-container.chosen-with-drop .chosen-drop{left:0}.chosen-container a{cursor:pointer}.chosen-container-single .chosen-single{position:relative;display:block;overflow:hidden;padding:0 0 0 8px;height:23px;border:1px solid #aaa;border-radius:5px;background-color:#fff;background:-webkit-gradient(linear,50% 0,50% 100%,color-stop(20%,#fff),color-stop(50%,#f6f6f6),color-stop(52%,#eee),color-stop(100%,#f4f4f4));background:-webkit-linear-gradient(top,#fff 20%,#f6f6f6 50%,#eee 52%,#f4f4f4 100%);background:-moz-linear-gradient(top,#fff 20%,#f6f6f6 50%,#eee 52%,#f4f4f4 100%);background:-o-linear-gradient(top,#fff 20%,#f6f6f6 50%,#eee 52%,#f4f4f4 100%);background:linear-gradient(top,#fff 20%,#f6f6f6 50%,#eee 52%,#f4f4f4 100%);background-clip:padding-box;box-shadow:0 0 3px #fff inset,0 1px 1px rgba(0,0,0,.1);color:#444;text-decoration:none;white-space:nowrap;line-height:24px}.chosen-container-single .chosen-default{color:#999}.chosen-container-single .chosen-single span{display:block;overflow:hidden;margin-right:26px;text-overflow:ellipsis;white-space:nowrap}.chosen-container-single .chosen-single-with-deselect span{margin-right:38px}.chosen-container-single .chosen-single abbr{position:absolute;top:6px;right:26px;display:block;width:12px;height:12px;background:url('" + chosenSprite + "') -42px 1px no-repeat;font-size:1px}.chosen-container-single .chosen-single abbr:hover{background-position:-42px -10px}.chosen-container-single.chosen-disabled .chosen-single abbr:hover{background-position:-42px -10px}.chosen-container-single .chosen-single div{position:absolute;top:0;right:0;display:block;width:18px;height:100%}.chosen-container-single .chosen-single div b{display:block;width:100%;height:100%;background:url('" + chosenSprite + "') no-repeat 0 2px}.chosen-container-single .chosen-search{position:relative;z-index:1010;margin:0;padding:3px 4px;white-space:nowrap}.chosen-container-single .chosen-search input[type=text]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:1px 0;padding:4px 20px 4px 5px;width:100%;height:auto;outline:0;border:1px solid #aaa;background:#fff url('" + chosenSprite + "') no-repeat 100% -20px;background:url('" + chosenSprite + "') no-repeat 100% -20px,-webkit-gradient(linear,50% 0,50% 100%,color-stop(1%,#eee),color-stop(15%,#fff));background:url('" + chosenSprite + "') no-repeat 100% -20px,-webkit-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat 100% -20px,-moz-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat 100% -20px,-o-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat 100% -20px,linear-gradient(#eee 1%,#fff 15%);font-size:1em;font-family:sans-serif;line-height:normal;border-radius:0}.chosen-container-single .chosen-drop{margin-top:-1px;border-radius:0 0 4px 4px;background-clip:padding-box}.chosen-container-single.chosen-container-single-nosearch .chosen-search{position:absolute;left:-9999px}.chosen-container .chosen-results{position:relative;overflow-x:hidden;overflow-y:auto;margin:0 4px 4px 0;padding:0 0 0 4px;max-height:240px;-webkit-overflow-scrolling:touch}.chosen-container .chosen-results li{display:none;margin:0;padding:5px 6px;list-style:none;line-height:15px}.chosen-container .chosen-results li.active-result{display:list-item;cursor:pointer}.chosen-container .chosen-results li.disabled-result{display:list-item;color:#ccc;cursor:default}.chosen-container .chosen-results li.highlighted{background-color:#3875d7;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(20%,#3875d7),color-stop(90%,#2a62bc));background-image:-webkit-linear-gradient(#3875d7 20%,#2a62bc 90%);background-image:-moz-linear-gradient(#3875d7 20%,#2a62bc 90%);background-image:-o-linear-gradient(#3875d7 20%,#2a62bc 90%);background-image:linear-gradient(#3875d7 20%,#2a62bc 90%);color:#fff}.chosen-container .chosen-results li.no-results{display:list-item;background:#f4f4f4}.chosen-container .chosen-results li.group-result{display:list-item;font-weight:700;cursor:default}.chosen-container .chosen-results li.group-option{padding-left:15px}.chosen-container .chosen-results li em{font-style:normal;text-decoration:underline}.chosen-container-multi .chosen-choices{position:relative;overflow:hidden;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;width:100%;height:auto!important;height:1%;border:1px solid #aaa;background-color:#fff;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(1%,#eee),color-stop(15%,#fff));background-image:-webkit-linear-gradient(#eee 1%,#fff 15%);background-image:-moz-linear-gradient(#eee 1%,#fff 15%);background-image:-o-linear-gradient(#eee 1%,#fff 15%);background-image:linear-gradient(#eee 1%,#fff 15%);cursor:text}.chosen-container-multi .chosen-choices li{float:left;list-style:none}.chosen-container-multi .chosen-choices li.search-field{margin:0;padding:0;white-space:nowrap}.chosen-container-multi .chosen-choices li.search-field input[type=text]{margin:1px 0;padding:5px;height:15px;outline:0;border:0!important;background:transparent!important;box-shadow:none;color:#666;font-size:100%;font-family:sans-serif;line-height:normal;border-radius:0}.chosen-container-multi .chosen-choices li.search-field .default{color:#999}.chosen-container-multi .chosen-choices li.search-choice{position:relative;margin:3px 0 3px 5px;padding:3px 20px 3px 5px;border:1px solid #aaa;border-radius:3px;background-color:#e4e4e4;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(20%,#f4f4f4),color-stop(50%,#f0f0f0),color-stop(52%,#e8e8e8),color-stop(100%,#eee));background-image:-webkit-linear-gradient(#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-moz-linear-gradient(#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-o-linear-gradient(#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:linear-gradient(#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-clip:padding-box;box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,.05);color:#333;line-height:13px;cursor:default}.chosen-container-multi .chosen-choices li.search-choice .search-choice-close{position:absolute;top:4px;right:3px;display:block;width:12px;height:12px;background:url('" + chosenSprite + "') -42px 1px no-repeat;font-size:1px}.chosen-container-multi .chosen-choices li.search-choice .search-choice-close:hover{background-position:-42px -10px}.chosen-container-multi .chosen-choices li.search-choice-disabled{padding-right:5px;border:1px solid #ccc;background-color:#e4e4e4;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(20%,#f4f4f4),color-stop(50%,#f0f0f0),color-stop(52%,#e8e8e8),color-stop(100%,#eee));background-image:-webkit-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-moz-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-o-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);color:#666}.chosen-container-multi .chosen-choices li.search-choice-focus{background:#d4d4d4}.chosen-container-multi .chosen-choices li.search-choice-focus .search-choice-close{background-position:-42px -10px}.chosen-container-multi .chosen-results{margin:0;padding:0}.chosen-container-multi .chosen-drop .result-selected{display:list-item;color:#ccc;cursor:default}.chosen-container-active .chosen-single{border:1px solid #5897fb;box-shadow:0 0 5px rgba(0,0,0,.3)}.chosen-container-active.chosen-with-drop .chosen-single{border:1px solid #aaa;-moz-border-radius-bottomright:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;border-bottom-left-radius:0;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(20%,#eee),color-stop(80%,#fff));background-image:-webkit-linear-gradient(#eee 20%,#fff 80%);background-image:-moz-linear-gradient(#eee 20%,#fff 80%);background-image:-o-linear-gradient(#eee 20%,#fff 80%);background-image:linear-gradient(#eee 20%,#fff 80%);box-shadow:0 1px 0 #fff inset}.chosen-container-active.chosen-with-drop .chosen-single div{border-left:0;background:transparent}.chosen-container-active.chosen-with-drop .chosen-single div b{background-position:-18px 2px}.chosen-container-active .chosen-choices{border:1px solid #5897fb;box-shadow:0 0 5px rgba(0,0,0,.3)}.chosen-container-active .chosen-choices li.search-field input[type=text]{color:#111!important}.chosen-disabled{opacity:.5!important;cursor:default}.chosen-disabled .chosen-single{cursor:default}.chosen-disabled .chosen-choices .search-choice .search-choice-close{cursor:default}.chosen-rtl{text-align:right}.chosen-rtl .chosen-single{overflow:visible;padding:0 8px 0 0}.chosen-rtl .chosen-single span{margin-right:0;margin-left:26px;direction:rtl}.chosen-rtl .chosen-single-with-deselect span{margin-left:38px}.chosen-rtl .chosen-single div{right:auto;left:3px}.chosen-rtl .chosen-single abbr{right:auto;left:26px}.chosen-rtl .chosen-choices li{float:right}.chosen-rtl .chosen-choices li.search-field input[type=text]{direction:rtl}.chosen-rtl .chosen-choices li.search-choice{margin:3px 5px 3px 0;padding:3px 5px 3px 19px}.chosen-rtl .chosen-choices li.search-choice .search-choice-close{right:auto;left:4px}.chosen-rtl.chosen-container-single-nosearch .chosen-search,.chosen-rtl .chosen-drop{left:9999px}.chosen-rtl.chosen-container-single .chosen-results{margin:0 0 4px 4px;padding:0 4px 0 0}.chosen-rtl .chosen-results li.group-option{padding-right:15px;padding-left:0}.chosen-rtl.chosen-container-active.chosen-with-drop .chosen-single div{border-right:0}.chosen-rtl .chosen-search input[type=text]{padding:4px 5px 4px 20px;background:#fff url('" + chosenSprite + "') no-repeat -30px -20px;background:url('" + chosenSprite + "') no-repeat -30px -20px,-webkit-gradient(linear,50% 0,50% 100%,color-stop(1%,#eee),color-stop(15%,#fff));background:url('" + chosenSprite + "') no-repeat -30px -20px,-webkit-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat -30px -20px,-moz-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat -30px -20px,-o-linear-gradient(#eee 1%,#fff 15%);background:url('" + chosenSprite + "') no-repeat -30px -20px,linear-gradient(#eee 1%,#fff 15%);direction:rtl}.chosen-rtl.chosen-container-single .chosen-single div b{background-position:6px 2px}.chosen-rtl.chosen-container-single.chosen-with-drop .chosen-single div b{background-position:-12px 2px}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-resolution:144dpi){.chosen-rtl .chosen-search input[type=text],.chosen-container-single .chosen-single abbr,.chosen-container-single .chosen-single div b,.chosen-container-single .chosen-search input[type=text],.chosen-container-multi .chosen-choices .search-choice .search-choice-close,.chosen-container .chosen-results-scroll-down span,.chosen-container .chosen-results-scroll-up span{background-image:url('" + chosenSprite2 + "')!important;background-size:52px 37px!important;background-repeat:no-repeat!important}}");
//    }
//<-- $$055 End of delete 

//--> $$055 Begin of delete
//// Hideable souvenirs
//    try {
//        if (settings_hideable_souvenirs && (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/souvenirs\.aspx/) || (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//) && $('.ProfileSouvenirsList').length > 0) )) {
//            var souvenirIgnoreList = JSON.parse(getValue("HiddenSouvenirs", "{ }").replace(/, (?=,)/g, ",null"));
//            $('.ProfileSouvenirsList').children().css("position", "relative").append("<a title='Remove this souvenir' href='#' class='souvenirHideButton' style='position:absolute;top:0px;right:5px;height:22px;width:22px;'> <img style='height:22px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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' /> </a>").hover(
//                function () {
//                    $(this).find('.souvenirHideButton').show();
//                },
//                function () {
//                    $(this).find('.souvenirHideButton').hide();
//                }
//            ).each(function (i, e) {
//                    var text = $(e).text().trim();
//                    if (souvenirIgnoreList[text]) {
//                        $(e).hide();
//                    }
//
//                    $(e).find('.souvenirHideButton').click(function () {
//                        $(e).hide();
//                        souvenirIgnoreList[text] = true;
//                        setValue("HiddenSouvenirs", JSON.stringify(souvenirIgnoreList));
//                        $("#souvenirIgnoreList").append('<option selected value="' + text + '">' + text + '</option>').trigger("chosen:updated");
//                    }).hide();
//                });
//
//            $('#ctl00_divContentMain p').last().after('<div><a href="#" id="showSouvenirIgnoreList">Edit hidden souvenirs</a> <div id="souvenirIgnoreListContainer" style="display:none;"><p style="margin:0px;">Hidden souvenirs:</p><select style="height:68px;" title="Deselect and reload the page for making an souvenir visible again." id="souvenirIgnoreList" multiple="multiple" /></div></div>');
//
//            $("#showSouvenirIgnoreList").click(function () {
//                $("#souvenirIgnoreListContainer").fadeToggle();
//            });
//
//            for (name in souvenirIgnoreList) {
//                $("#souvenirIgnoreList").append('<option selected value="' + name + '">' + name + '</option>');
//            }
//
//            $("#souvenirIgnoreList").change(function () {
//                souvenirIgnoreList = {};
//                $("#souvenirIgnoreList option:selected").each(function () {
//                    souvenirIgnoreList[$(this).text()] = true;
//                });
//                setValue("HiddenSouvenirs", JSON.stringify(souvenirIgnoreList));
//            })
//
//            addChosenPlugin();
//
//            $("#souvenirIgnoreList").chosen({disable_search: true});
//            $('#souvenirIgnoreList_chosen').width("700px");
//            $('.chosen-drop').hide();
//            $('.search-field').hide();
//        }
//    } catch (e) {
//        gclh_error("Hide souvenirs", e);
//    }
//<-- $$055 End of delete 

// Activate fancybox for pictures in the description
    try {
        if (is_page("cache_listing") && typeof unsafeWindow.$.fancybox != "undefined") {
            unsafeWindow.$('a[rel="lightbox"]').fancybox();
        }
    } catch (e) {
        gclh_error("Activate fancybox", e);
    }

// Hide Disclaimer
    try {
        if (settings_hide_disclaimer && is_page("cache_listing")) {
//--> $$008 Begin of change
//            var disc = getElementsByClass('DisclaimerWidget')[0];
            var disc = getElementsByClass('Note Disclaimer')[0]; // New Listing design
//<-- $$008 End of change
            if (disc) {
                disc.parentNode.removeChild(disc);
            } else {
//--> $$008 Begin of change
//                var disc = getElementsByClass('Note Disclaimer')[0]; // New Listing design
                var disc = getElementsByClass('DisclaimerWidget')[0];
//<-- $$008 End of change
                if (disc) {
                    disc.parentNode.removeChild(disc);
                }
            }
        }
        if (settings_hide_disclaimer && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cdpf\.aspx/)) {
            var disc = getElementsByClass('TermsWidget no-print')[0];
            if (disc) {
                disc.parentNode.removeChild(disc);
            }
        }
    } catch (e) {
        gclh_error("Hide Disclaimer", e);
    }

// Hide on print-page
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cdpf\.aspx/)) {
            document.getElementById("pnlDisplay").removeChild(document.getElementById("Footer"));
        }
    } catch (e) {
        gclh_error("Hide on print-page", e);
    }

// remove paragraph containing the link to the advertisement instructions (not the advertisements itself!)
    try {
        if (settings_hide_advert_link) {
            var links = document.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.indexOf('advertising.aspx') > 0) {
                    var del = links[i];
//--> $$010 Begin of insert
//--> $$051 Begin of change
//                    if (is_page("messagecenter")) {
                    if ( is_page("messagecenter") || document.location.href.match(/^https:\/\/www\.geocaching\.com\/account\/lists/) ) {
//<-- $$051 End of change
                        while (del.parentNode != null && (del.parentNode.nodeName != 'ASIDE')) {
                           del = del.parentNode;
                        }    
                    }
                    else {                    
//<-- $$010 End of insert
                        while (del.parentNode != null && (del.parentNode.nodeName != 'P')) {
                            del = del.parentNode;
                        }    
//--> $$010 Begin of insert
                    }
//<-- $$010 End of insert
                    if (del.parentNode) {
                        del.parentNode.removeChild(del);
                    }
                    break;
                }
            }
        }
    } catch (e) {
        gclh_error("Hide Advert-Link", e);
    }

//--> $$055 Begin of delete
//// Hide Linebreaks
//    try {
//        if (settings_hide_line_breaks) {
//            //remove line break after "Print" label
//            var printHeader = document.getElementById('ctl00_ContentBody_uxPrintHeader');
//            if (printHeader) {
//                var br = printHeader.parentElement.nextElementSibling;
//                if (br && br.nodeName == 'BR') {
//                    br.parentNode.removeChild(br);
//                }
//            }
//        }
//    } catch (e) {
//        gclh_error("Hide Linebreaks", e);
//    }
//<-- $$055 End of delete 

// Improve calendar-Link in Events
    try {
        if (is_page("cache_listing") && document.getElementById("calLinks")) {
            function calendar_link() {
                var div = document.getElementById("calLinks");
                var links = div.getElementsByTagName("a");
                for (var i = 0; i < links.length; i++) {
                    if (links[i].title == "Google") {
                        var link = links[i].href.split("&");
                        var new_link = link[0] + "&" + link[1] + "&" + link[2];

                        var loc = link[4].split("(");

                        new_link += "&" + loc[0].substr(0, loc[0].length - 3) + "&details=" + loc[1].substr(0, loc[1].length - 1) + "&" + link[5];

                        links[i].href = new_link;
                    }
                }
            }

            window.addEventListener("load", calendar_link, false); // Div wird erst nachtraeglich gefuellt, deswegen auf load warten
        }
    } catch (e) {
        gclh_error("improve calendar-link", e);
    }

// remove "Warning! Spoilers may be included in the descriptions or links."
    try {
        if (settings_hide_spoilerwarning && is_page("cache_listing")) {
            var findCounts = document.getElementById('ctl00_ContentBody_lblFindCounts');
            if (findCounts) {
                var para = findCounts.nextSibling.nextSibling.nextSibling.nextSibling;
                if (para && para.nodeName == 'P') {
                    para.innerHTML = "&nbsp;";
                    para.style.height = "0";
                    para.className = para.className + ' Clear';
                    //get more space for links, when spoiler is hidden
                    document.getElementById('ctl00_ContentBody_uxLogbookLink').parentNode.style.width = "100%";
                }
            }
        }
    } catch (e) {
        gclh_error("Hide spoilerwarning", e);
    }

// Hide Cache Notes
    try {
        if (settings_hide_cache_notes && is_page("cache_listing")) {
            var disc = getElementsByClass('NotesWidget')[0];
            if (disc) {
                disc.parentNode.removeChild(disc);
            } else {
                var disc = getElementsByClass('Note PersonalCacheNote')[0]; // New Listing design
                if (disc) {
                    disc.parentNode.removeChild(disc);
                }
            }
        }
    } catch (e) {
        gclh_error("Hide Cache Notes (COMPLETE)", e);
    }

// Hide/Show Cache Notes
    try {
        if (settings_hide_empty_cache_notes && !settings_hide_cache_notes && is_page("cache_listing")) {
            var box = getElementsByClass('NotesWidget')[0];
            if (!box) box = getElementsByClass('Note PersonalCacheNote')[0]; // New Listing design
            if (box) {
//--> $$047 Begin of insert
                var description = decode_innerHTML( box.getElementsByTagName("strong")[0] );
                var description = description.replace(":", "");
//<-- $$047 End of insert
                var code =
                    "function hide_notes() {" +
                    "  if(document.getElementById('box_notes').style.display == 'none') {" +
                    "    document.getElementById('box_notes').style.display = 'block';" +
//--> $$047 Begin of insert
                    "    if ( document.getElementById('show_hide_personal_cache_notes') ) {" +
                    "      document.getElementById('show_hide_personal_cache_notes').innerHTML = 'Hide " + description + "'" +
                    "    }" +
//<-- $$047 End of insert
                    "  } else {" +
                    "    document.getElementById('box_notes').style.display = 'none';" +
//--> $$047 Begin of insert
                    "    if ( document.getElementById('show_hide_personal_cache_notes') ) {" +
                    "      document.getElementById('show_hide_personal_cache_notes').innerHTML = 'Show " + description + "'" +
                    "    }" +
//<-- $$047 End of insert
                    "  }" +
                    "}";

                var script = document.createElement("script");
                script.innerHTML = code;
                document.getElementsByTagName("body")[0].appendChild(script);

                box.setAttribute("id", "box_notes");
                var link = document.createElement("font");
//--> $$047 Begin of change
//                link.innerHTML = "<a href='javascript:void(0);' onClick='hide_notes();'>Show/Hide Cache Notes</a>";
//                link.setAttribute("style", "font-size: 10px;");
//                box.parentNode.insertBefore(link, box.nextSibling);
                link.innerHTML = "<a id='show_hide_personal_cache_notes' href='javascript:void(0);' onClick='hide_notes();'>Hide " + description + "</a>";
                link.setAttribute("style", "font-size: 12px;");
                box.parentNode.insertBefore(link, box);
//<-- $$047 End of change
//      getElementsByClass("UserSuppliedContent")[0].innerHTML = "<font style='font-size: 10px;'><a href='#' onClick='hide_notes();'>Show/Hide Cache Notes</a></font><br><br>"+getElementsByClass("UserSuppliedContent")[0].innerHTML;

                function hide_on_load() {
                    var notes = getElementsByClass('NotesWidget')[0];
                    if (!notes) notes = getElementsByClass('Note PersonalCacheNote')[0]; // New Listing design
                    var notesText = document.getElementById("cache_note").innerHTML;
                    if (notesText != null && (notesText == "Click to enter a note" || notesText == "Klicken zum Eingeben einer Notiz")) {
                        notes.style.display = "none";
//--> $$047 Begin of insert
                        if ( document.getElementById('show_hide_personal_cache_notes') ) { 
                            document.getElementById('show_hide_personal_cache_notes').innerHTML = 'Show ' + description;
                        }
//<-- $$047 End of insert
                    }
                }

                window.addEventListener("load", hide_on_load, false);
            }
        }
    } catch (e) {
        gclh_error("Hide Cache Notes", e);
    }

//--> $$055 Begin of delete
//// Show breaks in Cache Notes
//    try {
//        if (settings_breaks_in_cache_notes && !settings_hide_cache_notes && is_page("cache_listing")) {
//            $("#cache_note").replaceWith('<pre id="cache_note" class="" style="background-color: rgb(218, 215, 203);">' + $("#cache_note").text().trim() + '</pre>');
//
//            if (browser !== "firefox") {
//
//                var defaultNoteText = "Click to enter a note";
//                var errorNoteText = "There was an error saving page.  Please refresh the page and try again.";
//                var savingNoteText = "Please wait, saving your note...";
//
//                function notesEditInplace(defaultNoteText, errorNoteText, savingNoteText) {
//                    var unsafeWindow = unsafeWindow || window;
//                    $("#cache_note").editInPlace({
//                        callback: function (unused, enteredText) {
//                            var me = $(this);
//
//                            var newText = $.trim(enteredText);
//                            if (newText.length > 500) {
//                                newText = newText.substr(0, 500);
//                            }
//                            $.pageMethod("/seek/cache_details.aspx/SetUserCacheNote",
//                                JSON.stringify({
//                                    dto: {
//                                        et: newText,
//                                        ut: unsafeWindow.userToken
//                                    }
//                                }),
//                                function (r) {
//                                    var r = JSON.parse(r.d);
//                                    if (r.success == true) {
//                                        if ($.trim(r.note) == "") {
//                                            $("#cache_note").text(defaultNoteText);
//                                        } else {
//                                            $("#cache_note").text(r.note);
//                                        }
//
//                                        me.effect('highlight', {
//                                            color: '#ffb84c'
//                                        }, 'slow');
//                                    } else {
//                                        alert(errorNoteText);
//                                        $("#cache_note").text(defaultNoteText);
//                                    }
//                                });
//
//                            return savingNoteText;
//                        },
//                        default_text: defaultNoteText,
//                        field_type: "textarea",
//                        textarea_rows: "7",
//                        textarea_cols: "65",
//                        show_buttons: true,
//                        bg_over: "#dad7cb"
//                    });
//                }
//
//                if (browser == "chrome") {
//                    injectPageScriptFunction(notesEditInplace, "('" + defaultNoteText + "','" + errorNoteText + "','" + savingNoteText + "')");
//                }
//                else {
//                    notesEditInplace(defaultNoteText, errorNoteText, savingNoteText);
//                }
//            }
//        }
//    } catch (e) {
//        gclh_error("Show breaks in Cache Notes", e);
//    }
//<-- $$055 End of delete

// Hide Hint
    try {
        if (settings_hide_hint && is_page("cache_listing")) {
            //replace hint by a link which shows the hint dynamically
            var hint = document.getElementById('div_hint');
            if (hint) {
                var para = hint.previousSibling; // Neues Listing-Layout
                if (para.nodeName != "P") para = hint.previousSibling.previousSibling; // Altes Layout

                if (para && para.nodeName == 'P') {
                    if (trim(hint.innerHTML).length > 0) {
                        var label = para.getElementsByTagName('strong')[0];
                        var code =
                            "function hide_hint() {" +
                            "  var hint = document.getElementById('div_hint');" +
                            "  if(hint.style.display == 'none') {" +
                            "    hint.style.display = 'block';" +
//--> $$047 Begin of insert
                            "    if ( document.getElementById('ctl00_ContentBody_lnkDH') ) {" +
                            "      document.getElementById('ctl00_ContentBody_lnkDH').innerHTML = 'Hide'" +
                            "    }" +
//<-- $$047 End of insert
                            "  } else {" +
                            "    hint.style.display = 'none';" +
//--> $$047 Begin of insert
                            "    if ( document.getElementById('ctl00_ContentBody_lnkDH') ) {" +
                            "      document.getElementById('ctl00_ContentBody_lnkDH').innerHTML = 'Show'" +
                            "    }" +
//<-- $$047 End of insert
                            "  }" +
                            "    hint.innerHTML = convertROTStringWithBrackets(hint.innerHTML);" +
                            "  return false;" +
                            "}";

                        var script = document.createElement("script");
                        script.innerHTML = code;
                        document.getElementsByTagName("body")[0].appendChild(script);
//--> $$047 Begin of delete
//                        var link = document.createElement('a');
//                        link.setAttribute('href', 'javascript:void(0);');
//                        var text = document.createTextNode("" + label.innerHTML);
//                        link.appendChild(text);
//                        link.setAttribute('onclick', 'hide_hint();');
//                        para.previousSibling.previousSibling.appendChild(link);
//                        para.style.display = 'none';
//<-- $$047 End of delete
//--> $$047 Begin of insert
                        if ( document.getElementById("ctl00_ContentBody_lnkDH") ) {
                            var link = document.getElementById("ctl00_ContentBody_lnkDH");
                            link.setAttribute('onclick', 'hide_hint();');
                            link.setAttribute('title', 'Show/Hide ' + decode_innerHTML(label));
                            link.setAttribute('href', 'javascript:void(0);');
                            link.setAttribute('style', 'font-size: 12px;');
                            link.innerHTML = 'Show';
                        }
                        hint.style.marginBottom = '1.5em';
//<-- $$047 End of insert
                    }
                    hint.style.display = 'none';

                    // remove hint description
                    var decryptKey = document.getElementById('dk');
                    if (decryptKey) {
                        decryptKey.parentNode.removeChild(decryptKey);
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("Hide Hint", e);
    }

// Show disabled/archived caches with strikeout in title
    try {
        if (settings_strike_archived && is_page("cache_listing")) {
            var warnings = getElementsByClass('OldWarning');
            if (warnings[0]) {
                var cacheTitle = document.getElementById('ctl00_ContentBody_CacheName');
                if (cacheTitle) {
                    var parent = cacheTitle.parentNode;
                    if (parent) {
                        parent.removeChild(cacheTitle);
                        var strike = document.createElement('strike');
                        parent.appendChild(strike);
                        strike.appendChild(cacheTitle);
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("Strike Archived", e);
    }

// Highlight Usercoords
    try {
        if (settings_highlight_usercoords && is_page("cache_listing")) {
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
//--> $$047 Begin of change
//            style.innerHTML = ".myLatLon{ color: #FF0000; }";
            style.innerHTML = ".myLatLon{ color: #FF0000; font-style: unset; border-bottom: unset;}";
//<-- $$047 End of change
            head.appendChild(style);
        }
    } catch (e) {
        gclh_error("Highlight Usercoords", e);
    }

// Decrypt Hint
    try {
        if (settings_decrypt_hint && !settings_hide_hint && is_page("cache_listing")) {
            if (document.getElementById('ctl00_ContentBody_EncryptionKey')) {
                if (browser == "chrome") {
                    injectPageScript("(function(){ dht(); })()");
                }
                else {
                    unsafeWindow.dht(document.getElementById("ctl00_ContentBody_lnkDH"));
                }

                // remove hint description
                var decryptKey = document.getElementById('dk');
                if (decryptKey) {
                    decryptKey.parentNode.removeChild(decryptKey);
                }
            }
        }
        if (settings_decrypt_hint && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cdpf\.aspx/)) {
            if (document.getElementById('uxDecryptedHint')) document.getElementById('uxDecryptedHint').style.display = 'none';
            if (document.getElementById('uxEncryptedHint')) document.getElementById('uxEncryptedHint').style.display = '';
        }
    } catch (e) {
        gclh_error("Decrypt Hint", e);
    }


//--> $$006 Begin of delete
//// BBCode helper
//    var bbcode = "";
//    bbcode += "<a title='Bold' href='javascript:void(0);' onClick='gclh_insert(\"[b]\",\"[/b]\"); return false;' style='color: #000000; text-decoration: none;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg=='></a>&nbsp;";
//    bbcode += "<a title='Italic' href='javascript:void(0);' onClick='gclh_insert(\"[i]\",\"[/i]\"); return false;' style='color: #000000; text-decoration: none;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg=='></a>&nbsp;";
//    bbcode += "<a title='Strike' href='javascript:void(0);' onClick='gclh_insert(\"[s]\",\"[/s]\"); return false;' style='color: #000000; text-decoration: none;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII='></a>&nbsp;";
//    bbcode += "<a title='Underline' href='javascript:void(0);' onClick='gclh_insert(\"[u]\",\"[/u]\"); return false;' style='color: #000000; text-decoration: none;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY/jPgB8yEKmgPKH8ffn/0n4IL3F99P+QAjQTyveX/IexIwWCz2NYUbw/7z/CYK/9GApy92cgKXDEVJC+PxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9/7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL+fI39ivul+0UMSA/q/wza/1X+y/0X/y/0n+c/+3/m/6SbgAsCAM8i/W7eee6fAAAAAElFTkSuQmCC'></a>&nbsp;";
//    bbcode += "<a title='Link' href='javascript:void(0);' onClick='gclh_insert(\"[url=\"+prompt(\"URL\",\"http://\")+\"]\",\"[/url]\"); return false;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg=='></a>&nbsp;";
//    bbcode += "<a title='Quote' href='javascript:void(0);' onClick='gclh_insert(\"[quote]\",\"[/quote]\"); return false;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVDjLY/j//z8DJZhhmBpg2POQn2wDDDof8HvOe3osYtXzDzCxuM2vP3gvfn4MJIfXAP22e0Ies58eK9r2+r//3Kf3YOIhq17eK9v95j9ITrv2jhBWA/Ra7kVEr375vXDrq/9+s57eUy+4IY0kJx2w6Nk9kFzE0uffgXIRKAboNtxlC1/+/GPljjdABc9+q+ZcM0Z3qmb5LWOQXOmml/8DZz7+qJB0hQ3FBerFNyNC5z/9nrXqxX+Pvgf35OMuSSPJSXtPfXQPJBc089F3oFwE1jBQTLkiZNtw51jq4qf/XVvuwsPAa9Kjexkrnv8HyclFXxTCGwsyERf4LctvHvPuvAePBf8pDz/Y1N45BpIbKUmZFAwAR3nW32nUrY0AAAAASUVORK5CYII='></a>&nbsp;";
//    bbcode += "&nbsp;";
//    bbcode += "&nbsp;";
//    bbcode += "<a title='Left' href='javascript:void(0);' onClick='gclh_insert(\"[left]\",\"[/left]\"); return false;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYU/Ifphej8xbCLEaaAOBNS/yPbjIC3iHZD5P9faHqvk+gGbzQTYD76TLQbbP//hOqE6f5AvBsIRhYAysRMHy5Vf6kAAAAASUVORK5CYII='></a>&nbsp;";
//    bbcode += "<a title='Center' href='javascript:void(0);' onClick='gclh_insert(\"[center]\",\"[/center]\"); return false;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB8SURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYwMORk/54C0w2FOcemgmSIMyH1P7LNCHiLBDcEZ/+agqwXaFbOIxLc4P0f1e7fUPiZGDcw/AdD02z9/5r/Vf7L/Zf8L/Kf/z/3f/ZsiAwjxbEJAKUIVgAswNGVAAAAAElFTkSuQmCC'></a>&nbsp;";
//    bbcode += "<a title='Right' href='javascript:void(0);' onClick='gclh_insert(\"[right]\",\"[/right]\"); return false;'><img border='0' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSZAQNL/31CdMHiGaBNS/yPbjIC3SHSD+3+EXoh5z4k2wfs/qt2/ofAziW7Q+v8brhsSrn+IMYFgZAEAE0hMH/VkcbsAAAAASUVORK5CYII='></a>&nbsp;";
//    bbcode += "&nbsp;";
//    bbcode += "&nbsp;";
//    bbcode += "<select style='font-size: 10px;' onChange='gclh_insert(\"[font=\"+this.value+\"]\",\"\"); return false;'>";
//    bbcode += "  <option style='font-family: Arial;'>Arial</option>";
//    bbcode += "  <option style='font-family: Arial Black;'>Arial Black</option>";
//    bbcode += "  <option style='font-family: Comic Sans MS;'>Comic Sans MS</option>";
//    bbcode += "  <option style='font-family: Impact;'>Impact</option>";
//    bbcode += "  <option style='font-family: Lucida Console;'>Lucida Console</option>";
//    bbcode += "  <option style='font-family: Tahoma;'>Tahoma</option>";
//    bbcode += "  <option style='font-family: Verdana;'>Verdana</option>";
//    bbcode += "</select>&nbsp;";
//    bbcode += "<select style='font-size: 10px;' onChange='gclh_insert(\"[\"+ this.value +\"]\",\"[/\"+ this.value +\"]\"); return false;'>";
//    bbcode += "  <option style='background-color: black; color: white;'>black</option>";
//    bbcode += "  <option style='background-color: blue; color: white;'>blue</option>";
//    bbcode += "  <option style='background-color: gold;'>gold</option>";
//    bbcode += "  <option style='background-color: green; color: white;'>green</option>";
//    bbcode += "  <option style='background-color: maroon; color: white;'>maroon</option>";
//    bbcode += "  <option style='background-color: navy; color: white;'>navy</option>";
//    bbcode += "  <option style='background-color: orange;'>orange</option>";
//    bbcode += "  <option style='background-color: pink;'>pink</option>";
//    bbcode += "  <option style='background-color: purple; color: white;'>purple</option>";
//    bbcode += "  <option style='background-color: red;'>red</option>";
//    bbcode += "  <option style='background-color: teal; color: white;'>teal</option>";
//    bbcode += "  <option style='background-color: white;'>white</option>";
//    bbcode += "  <option style='background-color: yellow;'>yellow</option>";
//    bbcode += "</select>";
//<-- $$006 End of delete

// BBCode helper function
    function gclh_add_insert_fkt(id) {
        var code = "function gclh_insert(aTag,eTag){"; // http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
        code += "  var input = document.getElementById('" + id + "');";
        code += "  if(typeof input.selectionStart != 'undefined'){";
        code += "    var start = input.selectionStart;";
        code += "    var end = input.selectionEnd;";
        code += "    var insText = input.value.substring(start, end);";
        code += "    input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);";
        code += "    /* Anpassen der Cursorposition */";
        code += "    var pos;";
        code += "    if (insText.length == 0) {";
        code += "      pos = start + aTag.length;";
        code += "    } else {";
        code += "      pos = start + aTag.length + insText.length + eTag.length;";
        code += "    }";
        code += "    input.selectionStart = pos;";
        code += "    input.selectionEnd = pos;";
        code += "  }";
        code += "  input.focus();";
        code += "}";

        var script = document.createElement("script");
        script.innerHTML = code;
        document.getElementsByTagName("body")[0].appendChild(script);
    }

// Show Smilies & BBCode --- http://www.cachewiki.de/wiki/Formatierung
    try {
        if (settings_show_bbcode && (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(id|guid|ID|wp|LUID|PLogGuid)\=/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/log\.aspx\?(id|wid|guid|ID|LUID|PLogGuid)\=/)) && document.getElementById('litDescrCharCount')) {
            // Get finds to replace #found# variable
            finds = get_my_finds();
//--> $$052 Begin of insert
            // Aktuelles Datum und aktuelle Zeit ermitteln zum Ersetzen von #Date#, #Time# und #DateTime#.
            [ aDate, aTime, aDateTime ] = getDateTime();
//<-- $$052 End of insert
            var me = $('.li-user-info').children().first().text();            

            gclh_add_insert_fkt("ctl00_ContentBody_LogBookPanel1_uxLogInfo");

            var code = "function gclh_insert_from_div(id){";
            code += "  var finds = '" + finds + "';";
//--> $$052 Begin of insert
            code += "  var aDate = '" + aDate + "';";
            code += "  var aTime = '" + aTime + "';";
            code += "  var aDateTime = '" + aDateTime + "';";
//<-- $$052 End of insert
            code += "  var me = '" + me + "';";
            code += "  var settings_replace_log_by_last_log = " + settings_replace_log_by_last_log + ";";
            code += "  var owner = document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;";
            code += "  var input = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo');";
            code += "  var inhalt = document.getElementById(id).innerHTML;";
            code += "  inhalt = inhalt.replace(/\\&amp\\;/g,'&');";
            code += "  if(finds){";
            code += "    inhalt = inhalt.replace(/#found_no#/g,finds);";
            code += "    finds++;";
            code += "    inhalt = inhalt.replace(/#found#/g,finds);";
            code += "  }";
//--> $$052 Begin of insert
            code += "  if(aDate){";
            code += "    inhalt = inhalt.replace(/#Date#/ig, aDate);";
            code += "  }";
            code += "  if(aTime){";
            code += "    inhalt = inhalt.replace(/#Time#/ig, aTime);";
            code += "  }";
            code += "  if(aDateTime){";
            code += "    inhalt = inhalt.replace(/#DateTime#/ig, aDateTime);";
            code += "  }";
//<-- $$052 End of insert
            code += "  if(me){";
            code += "    inhalt = inhalt.replace(/#me#/g,me);";
            code += "  }";
            code += "  if(owner){";
            code += "    inhalt = inhalt.replace(/#owner#/g,owner);";
            code += "  }";
            code += "  if(id.match(/last_log/) && settings_replace_log_by_last_log){";
            code += "    input.value = inhalt;";
            code += "  }else{";
            code += "    if(typeof input.selectionStart != 'undefined' && inhalt){";
            code += "      var start = input.selectionStart;";
            code += "      var end = input.selectionEnd;";
            code += "      var insText = input.value.substring(start, end);";
            code += "      input.value = input.value.substr(0, start) + inhalt + input.value.substr(end);";
            code += "      /* Anpassen der Cursorposition */";
            code += "      var pos;";
            code += "      pos = start + inhalt.length;";
            code += "      input.selectionStart = pos;";
            code += "      input.selectionEnd = pos;";
            code += "    }";
            code += "  }";
            code += "  input.focus();";
            code += "}";

            var script = document.createElement("script");
            script.innerHTML = code;
            document.getElementsByTagName("body")[0].appendChild(script);

            var box = document.getElementById('litDescrCharCount');
            var liste = "<br><p style='margin: 5px;'>";
            liste += "<a href='#' onClick='gclh_insert(\"[:)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:D]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_big.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[8D]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_cool.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:I]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_blush.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:P]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_tongue.gif' border='0'></a>";
            liste += "</p><p style='margin: 5px;'>";
            liste += "<a href='#' onClick='gclh_insert(\"[}:)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_evil.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[;)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_wink.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:o)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_clown.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[B)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_blackeye.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[8]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_8ball.gif' border='0'></a>";
            liste += "</p><p style='margin: 5px;'>";
            liste += "<a href='#' onClick='gclh_insert(\"[:(]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_sad.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[8)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_shy.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:O]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_shock.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:(!]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_angry.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[xx(]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_dead.gif' border='0'></a>";
            liste += "</p><p style='margin: 5px;'>";
            liste += "<a href='#' onClick='gclh_insert(\"[|)]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_sleepy.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[:X]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_kisses.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[^]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_approve.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[V]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_dissapprove.gif' border='0'></a>&nbsp;&nbsp;";
            liste += "<a href='#' onClick='gclh_insert(\"[?]\",\"\"); return false;'><img src='" + http + "://www.geocaching.com/images/icons/icon_smile_question.gif' border='0'></a>";
            liste += "</p><br>";
            liste += "Templates:<br>";
            for (var i = 0; i < anzTemplates; i++) {
                if (getValue("settings_log_template_name[" + i + "]", "") != "") {
                    liste += "<div id='gclh_template[" + i + "]' style='display: none;'>" + getValue("settings_log_template[" + i + "]", "") + "</div>";
                    liste += "<a href='#' onClick='gclh_insert_from_div(\"gclh_template[" + i + "]\"); return false;' style='color: #000000; text-decoration: none; font-weight: normal;'> - " + getValue("settings_log_template_name[" + i + "]", "") + "</a><br>";
                }
            }
            if (getValue("last_logtext", "") != "") {
                liste += "<div id='gclh_template[last_log]' style='display: none;'>" + getValue("last_logtext", "") + "</div>";
                liste += "<a href='#' onClick='gclh_insert_from_div(\"gclh_template[last_log]\"); return false;' style='color: #000000; text-decoration: none; font-weight: normal;'> - [Last Cache-Log]</a><br>";
            }
            box.innerHTML = liste;

//--> $$006 Begin of delete
//            // BBCode
//            var bbc_dt = document.createElement("dt");
//            var bbc_dd = document.createElement("dd");
//            bbc_dt.innerHTML = "BBCode:";
//            bbc_dd.innerHTML = bbcode;
//            box.parentNode.parentNode.insertBefore(bbc_dt, box.parentNode);
//            box.parentNode.parentNode.insertBefore(bbc_dd, box.parentNode);
//<-- $$006 End of delete
        }
    } catch (e) {
        gclh_error("Show Smilies & BBCode", e);
    }

//--> $$006 Begin of delete
//// Show BBCode in Listing-Editor
//    try {
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/hide\/report\.aspx/) && document.getElementById("chkIsHtml") && !document.getElementById("chkIsHtml").checked) {
//            gclh_add_insert_fkt("tbLongDesc");
//
//            var textarea = document.getElementById("tbLongDesc");
//            var bbc_dd = document.createElement("dd");
//            bbc_dd.innerHTML = bbcode;
//            textarea.parentNode.insertBefore(bbc_dd, textarea);
//        }
//    } catch (e) {
//        gclh_error("Show BBCode (Listing-Editor)", e);
//    }
//<-- $$006 End of delete

// Maxlength of Logtext and unsaved warning
    try {
        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(id|guid|ID|wp|LUID|PLogGuid)\=/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/log\.aspx\?(id|wid|guid|ID|LUID|PLogGuid)\=/)) && document.getElementById('litDescrCharCount')) {
            var changed = false;

            function limitLogText(limitField) {
                changed = true; // Logtext hat sich geaendert - Warnung beim Seite verlassen
                // aus gc.com Funktion "checkLogInfoLength"
                var editor = $('#ctl00_ContentBody_LogBookPanel1_uxLogInfo');
                var limitNum = parseInt($('#ctl00_ContentBody_LogBookPanel1_uxLogInfo').attr("CKEMaxLength"));
                var length = editor.val().replace(/\n/g, "\r\n").length;
                var diff = length - editor.val().length;
                if (length > limitNum) {
                    limitField.value = limitField.value.substring(0, (limitNum - diff));
                    counterelement.innerHTML = '<font color="red">' + length + '/' + limitNum + '</font>';
                    limitField.scrollTop = limitField.scrollHeight;
                    limitField.selectionStart = 4000;
                    limitField.selectionEnd = 4000;
                } else {
                    counterelement.innerHTML = length + '/' + limitNum;
                }
            }

            // Meldung bei ungespeichertem Log
            window.onbeforeunload = function () {
                if (changed) {
                    return "You have changed a log and haven't saved it yet - Do you want to leave this page and lose your changes?"; // Text wird nicht angezeigt bei FF sondern deren default
                }
            }
            document.getElementById("ctl00_ContentBody_LogBookPanel1_btnSubmitLog").addEventListener("click", function () {
                changed = false;
            }, false); // Damit die Meldung nicht beim Submit kommt

            var logfield = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo');
            logfield.addEventListener("keyup", function () {
                limitLogText(logfield);
            }, false);
            logfield.addEventListener("change", function () {
                limitLogText(logfield);
            }, false);

            var counterpos = document.getElementById('litDescrCharCount').parentNode;
            var counterspan = document.createElement('p');
            counterspan.id = "logtextcounter";
            counterspan.innerHTML = "<b>Loglength:</b><br />";
            var counterelement = document.createElement('span');
            counterelement.innerHTML = "0/4000";
            counterspan.appendChild(counterelement);
            counterpos.appendChild(counterspan);
        }
    } catch (e) {
        gclh_error("Maxlength of Logtext and unsaved warning", e);
    }

// Show Eventday beside Date
    try {
//--> $$018 Begin of change
//        if (settings_show_eventday && is_page("cache_listing") && document.getElementById('cacheDetails') && document.getElementById('cacheDetails').getElementsByTagName("img")[0].src.match(/.*\/images\/WptTypes\/(6|453|13).gif/)) { //Event, MegaEvent, Cito
        if (settings_show_eventday && is_page("cache_listing") && document.getElementById('cacheDetails') && document.getElementById('cacheDetails').getElementsByTagName("img")[0].src.match(/.*\/images\/WptTypes\/(6|453|13|7005).gif/)) { //Event, MegaEvent, Cito, GigaEvent
//<-- $$018 End of change
            if (document.getElementById('cacheDetails').getElementsByTagName("span")) {
                var spanelem = document.getElementById("ctl00_ContentBody_mcd2");
                var datetxt = spanelem.innerHTML.substr(spanelem.innerHTML.indexOf(":") + 2).replace(/^\s+|\s+$/g, '');
                var month_names = new Object();
                month_names["Jan"] = 1;
                month_names["Feb"] = 2;
                month_names["Mrz"] = 3;
                month_names["Mar"] = 3;
                month_names["Apr"] = 4;
                month_names["May"] = 5;
                month_names["Jun"] = 6;
                month_names["Jul"] = 7;
                month_names["Aug"] = 8;
                month_names["Sep"] = 9;
                month_names["Oct"] = 10;
                month_names["Nov"] = 11;
                month_names["Dec"] = 12;
                // settings_date_format:
                //   yyyy-MM-dd
                //   yyyy/MM/dd
                //   MM/dd/yyyy
                //   dd/MM/yyyy
                //   dd/MMM/yyyy
                //   MMM/dd/yyyy
                //   dd MMM yy
                var day = 0;
                var month = 0;
                var year = 0;
                switch (settings_date_format) {
                    case "yyyy-MM-dd":
                        var match = datetxt.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})/);
                        if (match) {
                            day = match[3];
                            month = match[2];
                            year = match[1];
                        }
                        break;
                    case "yyyy/MM/dd":
                        var match = datetxt.match(/([0-9]{4})\/([0-9]{2})\/([0-9]{2})/);
                        if (match) {
                            day = match[3];
                            month = match[2];
                            year = match[1];
                        }
                        break;
                    case "MM/dd/yyyy":
                        var match = datetxt.match(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/);
                        if (match) {
                            day = match[2];
                            month = match[1];
                            year = match[3];
                        }
                        break;
                    case "dd/MM/yyyy":
                        var match = datetxt.match(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/);
                        if (match) {
                            day = match[1];
                            month = match[2];
                            year = match[3];
                        }
                        break;
                    case "dd/MMM/yyyy":
                        var match = datetxt.match(/([0-9]{2})\/([A-Za-z]{3})\/([0-9]{4})/);
                        if (match) {
                            day = match[1];
                            month = month_names[match[2]];
                            year = match[3];
                        }
                        break;
                    case "MMM/dd/yyyy":
                        var match = datetxt.match(/([A-Za-z]{3})\/([0-9]{2})\/([0-9]{4})/);
                        if (match) {
                            day = match[2];
                            month = month_names[match[1]];
                            year = match[3];
                        }
                        break;
                    case "dd MMM yy":
                        var match = datetxt.match(/([0-9]{2}) ([A-Za-z]{3}) ([0-9]{2})/);
                        if (match) {
                            day = match[1];
                            month = month_names[match[2]];
                            year = parseInt(match[3]) + 2000;
                        }
                        break;
                }

                if (month != 0) month--;
                var d = new Date(year, month, day);
                //alert(JSON.stringify(match)+"-"+day+"."+month+"."+year+"-"+d+"-"+d.getDay());
                if (d != "Invalid Date" && !(day == 0 && month == 0 && year == 0)) {
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var text = " (" + weekday[d.getDay()] + ") ";
                } else var text = " (date format mismatch - see settings) ";
                var text_elem = document.createTextNode(text);
                spanelem.insertBefore(text_elem, spanelem.childNodes[1]);
            }
        }
    } catch (e) {
        gclh_error("Show DoW on Events", e);
    }

//--> $$052 Begin of delete
//// Show Datepicker beside Date on Log-Page
//    try {
//        if (settings_show_datepicker && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/log|track\/log)\.aspx(\?)(id|ID|LUID|wid|WID)\=[a-zA-Z0-9-]*.*/)) {
//            var dpinput = document.createElement("input");
//            dpinput.id = "selectedPicker";
//            dpinput.type = "hidden";
//            if (document.getElementById("ctl00_ContentBody_LogBookPanel1_DateTimeLogged")) {
//                document.getElementById("ctl00_ContentBody_LogBookPanel1_DateTimeLogged").parentNode.appendChild(dpinput);
//
//                // Update three select controls to match a datepicker selection
//                var code = 'function updateSelected(date) {';
//                code += '  var dateform = $.datepicker.parseDate("m/d/yy", date);';
//                code += '  $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month option[value=\'" + (dateform.getMonth() + 1) + "\']").attr("selected",true);';
//                code += '  $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day option[value=\'" + dateform.getDate() + "\']").attr("selected",true);';
//                code += '  $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year option[value=\'" + dateform.getFullYear() + "\']").attr("selected",true);';
//                //Function of GC.com, do not know what it really does, but let us just trigger it
//                code += '  ChangeOptionDays("ctl00_ContentBody_LogBookPanel1_DateTimeLogged","yyyy-MM-dd");';
//                code += '}';
//                // Update datepicker from three select controls
//                code += '$("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month,#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day,#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year").change(function() {';
//                code += '  $( "#selectedPicker" ).val($("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month").val() + "/" + $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day").val() + "/" + $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year").val());';
//                code += '});';
//                //initialize datepicker
//                code += 'function initDatPick(){';
//                code += '  $( "#selectedPicker" ).val($("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month").val() + "/" + $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day").val() + "/" + $("#ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year").val());';
//                code += '  $( "#selectedPicker" ).datepicker({';
//                code += '    onSelect: updateSelected,';
//                code += '    showOn: "button",';
//                code += '    buttonImage: "data:image/png;base64,R0lGODlhEAAPAPQAAIyq7zlx3lqK5zFpznOe7/729fvh3/3y8e1lXt1jXO5tZe9zbLxeWfB6c6lbV/GDffKIgvKNh/OYkvSblvSinfWrp3dTUfawq/e1sf3r6v/8/P/9/f///////wAAAAAAACH5BAEAAB0ALAAAAAAQAA8AAAWK4GWJpDWN6KU8nNK+bsIxs3FdVUVRUhQ9wMUCgbhkjshbbkkpKnWSqC84rHA4kmsWu9lICgWHlQO5lsldSMEgrkAaknccQBAE4mKtfkPQaAIZFw4TZmZdAhoHAxkYg25wchABAQMDeIRYHF5gEkcSBo2YEGlgEEcQoI4SDRWrrayrFxCDDrW2t7ghADs=",';
//                code += '    buttonImageOnly: true';
//                code += '   });';
//                code += '};';
//
//                var script = document.createElement("script");
//                script.innerHTML = code;
//                document.getElementsByTagName("body")[0].appendChild(script);
//                unsafeWindow.initDatPick();
//            }
//        }
//    } catch (e) {
//        gclh_error("DatePicker on Logging", e);
//    }
//<-- $$052 End of delete 

//--> $$004 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Show eMail-Link beside Username
//    try {
//        if (settings_show_mail && (is_page("cache_listing") || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/log|track\/details|track\/log)\.aspx(\?|\?pf\=\&)(guid|wp|tracker|id|LUID|ID|PLogGuid)\=[a-zA-Z0-9-]*/))) {
//            var links = document.getElementsByTagName('a');
//
//            // Name des Caches herausfinden
//            if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?.*/)) {
//                var name = "";
//                var image = true;
//                for (var i = 0; i < links.length; i++) {
//                    if (is_link("cache_listing", links[i].href)) {
//                        if (image) {
//                            image = false;  // First hit is an Image
//                        } else {
//                            if (links[i].getElementsByTagName('span')[0] !== undefined) {
//                                name = links[i].getElementsByTagName('span')[0].innerHTML;
//                            } else {
//                                name = links[i].innerHTML
//                            }
//                        }
//                    }
//                }
//            } else if (document.getElementById('ctl00_ContentBody_CacheName')) {
//                var name = document.getElementById('ctl00_ContentBody_CacheName').innerHTML;
//                if (document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode')) {
//                    name += " ( ";
//                    if (settings_show_mail_coordslink)name += "http://coord.info/";
//                    name += document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML + " )";
//                }
//            } else if (document.getElementById('ctl00_ContentBody_lbHeading') && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek|track)\/log\.aspx\?.*/)) {
//                var name = document.getElementById('ctl00_ContentBody_lbHeading').innerHTML;
//                if (document.getElementById('ctl00_ContentBody_BugDetails_BugTBNum') && document.getElementById('ctl00_ContentBody_BugDetails_BugTBNum').getElementsByTagName('strong')) {
//                    var tbnr = document.getElementById('ctl00_ContentBody_BugDetails_BugTBNum').getElementsByTagName('strong')[0];
//                    if (tbnr != "") {
//                        name += " ( ";
//                        if (settings_show_mail_coordslink)name += "http://coord.info/";
//                        name += tbnr.innerHTML + " )";
//                    }
//                }
//            } else if (document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText')) {
//                var name = "";
//                try {
//                    name = document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4].innerHTML;
//                } catch (e) {
//                }
//            } else var name = "";
//
//            // Link hinzufuegen
//            for (var i = 0; i < links.length; i++) {
//                if (links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=/) && links[i].parentNode.className != "logOwnerStats" && !links[i].childNodes[0].src) {
//                    var guid = links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=(.*)/);
//                    guid = guid[1];
//
//                    var username = links[i].innerHTML;
//
//                    var mail_link = document.createElement("a");
//                    var mail_img = document.createElement("img");
//                    mail_img.setAttribute("border", "0");
//                    mail_img.setAttribute("title", "Send a mail to this user");
//                    mail_img.setAttribute("src", global_mail_icon);
//                    mail_link.appendChild(mail_img);
//                    mail_link.setAttribute("href", http + "://www.geocaching.com/email/?guid=" + guid + "&text=Hi " + username + ",%0A%0A" + name);
//
////        links[i].parentNode.appendChild(document.createTextNode("   "));
////        links[i].parentNode.appendChild(mail_link);
//                    links[i].parentNode.insertBefore(mail_link, links[i].nextSibling);
//                    links[i].parentNode.insertBefore(document.createTextNode("   "), links[i].nextSibling);
//                }
//            }
//
//            var global_cache_name = name;
//        }
//    } catch (e) {
//        gclh_error("Show Mail-Icon", e);
//    }
//<-- $$004 End of delete 
    
//--> $$004 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Show eMail-Link and Show Message-Center-Link beside Username. 
// (Nicht in den Logs zum Cache Listing, das erfolgt später bei Log-Template.)    
    show_mail_and_message_icon:
    try {
        // Nicht auf der Mail oder Message Seite selbst ausführen. 
        if ( document.getElementById("ctl00_ContentBody_SendMessagePanel1_SendEmailPanel") ||
             document.getElementById("messageArea")                                           ) {
            break show_mail_and_message_icon;
        }   
        
        // Cache, TB und Aktiv User Infos ermitteln.     
        [ global_gc, global_tb, global_code, global_name, global_info_mail, global_info_message, global_activ_username ] = getGcTbUserInfo();                            

        if ( ( settings_show_mail || settings_show_message ) ) {
            // Öffentliches Profil:
            if ( is_page("publicProfile") ) {
                if ( document.getElementById("ctl00_ContentBody_ProfilePanel1_lnkEmailUser") ) {
                    // guid ermitteln.  
                    var guid = document.getElementById("ctl00_ContentBody_ProfilePanel1_lnkEmailUser").href.match(/https?:\/\/www\.geocaching\.com\/email\/\?guid=(.*)/);
                    guid = guid[1];
                    // User und Side ermitteln.
                    if ( document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName") ) {
                        var username = decode_innerHTML(document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName")); 
                        var side = document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName");
                    }
                    // Message und Mail Icon aufbauen mit guid. 
                    buildSendIcons( side, username, "per guid" );
                }
            }
            // Restliche Seiten:
            else {
                // Alle Links zu Usern ermitteln und verarbeiten.
                var links = document.getElementsByTagName('a');
                for (var i = 0; i < links.length; i++) {
                    if ( links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=/) ) {
                        // Avatare werden auch mal mit guid versehen, hier sollen aber keine Icons erzeugt werden.
                        // Z.B. Avatar mit guid bei "Users Who Favorited This Cache".
                        if ( links[i].children[0] && ( links[i].children[0].tagName == "IMG" || links[i].children[0].tagName == "img" ) ) {
                            continue;
                        }
                        // guid ermitteln.  
                        var guid = links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=(.*)/);
                        guid = guid[1];
                        // User ermitteln.
                        var username = decode_innerHTML(links[i]);
                        // Message und Mail Icon aufbauen mit guid.
                        buildSendIcons( links[i], username, "per guid" );
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("show mail and message icon", e);
    }
//<-- $$004 End of insert
   
//--> $$004 Begin of insert
// Cache, TB, Aktiv User Infos ermitteln.     
    function getGcTbUserInfo() {
        var g_gc = false;
        var g_tb = false;
        var g_code = "";
        var g_name = "";
        var g_info_mail = "";
        var g_info_message = "";
        var g_activ_username = "";

        if ( ( settings_show_mail || settings_show_message ) ) {

            // Im Cache Listing: Cache Name und Cache Code ermitteln.
            if ( document.getElementById('ctl00_ContentBody_CacheName') ) {
                g_gc = true;
                g_name = document.getElementById('ctl00_ContentBody_CacheName').innerHTML;
                if ( document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode') ) {
                    g_code = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
                }
            } 
            // Im TB Listing: TB Name und TB Code ermitteln.
            else if ( document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode') ) {
                g_tb = true;
                g_code = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
                if ( document.getElementById('ctl00_ContentBody_lbHeading') ) {
                    g_name = document.getElementById('ctl00_ContentBody_lbHeading').innerHTML;
                }
            }
            // Im Log view. 
            else if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText') ) {
                // Im Log view vom Cache: Cache Name ermitteln.
                if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4] && 
                     document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4].href.match(/\/cache_details\.aspx\?guid=/) ) {
                    g_gc = true;
                    g_name = document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4].innerHTML;
                }    
                // Im Log view vom TB: TB Name ermitteln.
                if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4] && 
                     document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4].href.match(/\/track\/details\.aspx\?guid=/) ) {
                    g_tb = true;
                    g_name = document.getElementById('ctl00_ContentBody_LogBookPanel1_lbLogText').childNodes[4].innerHTML;
                }    
            }
            // Im Log post.
            else if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink') ) {
                // Im Log post vom Cache: Cache Name ermitteln.
                if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2] && 
                     document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2].href.match(/\/cache_details\.aspx\?guid=/) ) {
                    g_gc = true;
                    g_name = document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2].innerHTML;
                }
                // Im Log post vom TB: TB Name ermitteln.
                if ( document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2] && 
                     document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2].href.match(/\/track\/details\.aspx\?guid=/) ) {
                    g_tb = true;
                    g_name = document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').parentNode.children[2].innerHTML;
                }    
            }

            // Link zum Cache oder zum TB bzw. Coord Info zum Cache oder zum TB aufbauen.
            if ( g_name != "" ) {
                if ( g_code != "" ) {
//--> $$022 Begin of delete
//                    if ( settings_show_mail_coordslink ) g_info_mail = " ( http://coord.info/" + g_code + " )";  
//                    else g_info_mail = " ( " + g_code + " )";
//                    if ( settings_show_message_coordslink ) g_info_message = " ( http://coord.info/" + g_code + " )";  
//                    else g_info_message = " ( " + g_code + " )";
//<-- $$022 End of delete 
//--> $$022 Begin of insert
                    if ( settings_show_mail && settings_show_mail_coordslink ) g_info_mail = " ( http://coord.info/" + g_code + " )";  
                    else g_info_mail = " ( " + g_code + " )";
                    if ( settings_show_message && settings_show_message_coordslink ) g_info_message = " ( http://coord.info/" + g_code + " )";  
                    else g_info_message = " ( " + g_code + " )";
//<-- $$022 End of insert
                }
            }
                
            // Aktiven User Namen ermitteln.
            g_activ_username = $('.li-user-info').children().first().text();
        }
        return [ g_gc, g_tb, g_code, g_name, g_info_mail, g_info_message, g_activ_username ];
    }
//<-- $$004 End of insert
    
//--> $$004 Begin of insert
// Message Icon und Mail Icon aufbauen. 
    function buildSendIcons( b_side, b_username, b_art ) {
        if ( b_art == "per guid" ) {
            // guid prüfen.
            if ( guid == "" || guid == undefined ) return;
            if ( guid.match(/\#/) ) return;
            // Keine Verarbeitung für Stat Bar.
            if ( b_side.innerHTML.match(/https?:\/\/img\.geocaching\.com\/stats\/img\.aspx/) ) return;
        }
        else {
            if ( b_username == "" || b_username == undefined ) return;
        }
        
        // Side prüfen.
        if ( b_side == "" || b_side == undefined ) return;

        // User prüfen.
        if ( b_username == undefined ) return;
        if ( global_activ_username == "" || global_activ_username == undefined ) return;
        // User nur verarbeiten, wenn es sich nicht um den aktiven User handelt. Man schickt sich selbst keine Mail/Message.
        if ( b_username == global_activ_username ) return;
        // Wenn es sich um den Owner handelt, dann echten Owner setzen und nicht gegebenenfalls den abweichenden Owner aus dem Listing "A cache by". 
        // (Der Owner wird bereits in der Funktion get_real_owner dekodiert, die Funktion decode_innerHTML ist hier nicht notwendig.)
        if ( b_side.parentNode.id == "ctl00_ContentBody_mcd1" ) {
            var owner = get_real_owner();
            b_username = owner;
        }
        // Wenn es sich hier um den User "In the hands of ..." im TB Listing handelt, dann prüfen ob der Aktive Username dort enthalten ist und 
        // gegebenenfalls keine Mail, Message erzeugen. Außerdem darf kein Username übergeben werden, weil der nicht bekannt ist, es ist nur 
        // die guid des Users bekannt.
        var username_send = b_username;
        if ( b_side.id == "ctl00_ContentBody_BugDetails_BugLocation" ) {
            if ( b_username.match(global_activ_username) ) return;
            b_username = "";
            username_send = "user";
        }

        // Message Icon erzeugen.
        if ( settings_show_message && b_art == "per guid" ) {
            var message_link = document.createElement("a");
            var message_img = document.createElement("img");
            message_img.setAttribute("style", "margin-left: 0px; margin-right: 0px"); 
            message_img.setAttribute("title", "Send a message to " + username_send);
            message_img.setAttribute("src", global_message_icon);
            message_link.appendChild(message_img);
            // gcCode oder tbCode nicht nutzen, damit keine Standard Message aufgebaut wird. Die deaktivierten Punkte können 
            // dann aktiviert werden, wenn die Erzeugung des eigenen Inhaltes sich als nicht praktikabel herausstellt. 
            if ( global_gc && global_code != "" ) {
                // message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid + "&gcCode=" + global_code); 
                message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid + "&text=Hi " + b_username + ",%0A%0A" + global_name + global_info_message); 
            }    
            else if ( global_tb && global_code != ""  ) { 
                // message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid + "&tbCode=" + global_code);
                message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid + "&text=Hi " + b_username + ",%0A%0A" + global_name + global_info_message); 
            }
            else {
                // message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid);
                message_link.setAttribute("href", http + "://www.geocaching.com/account/messagecenter?recipientId=" + guid + "&text=Hi " + b_username + ",%0A%0A" + global_name + global_info_message);
            }
            b_side.parentNode.insertBefore(message_link, b_side.nextSibling);
            b_side.parentNode.insertBefore(document.createTextNode(" "), b_side.nextSibling);

            // "Message this owner" und das Icon entfernen, falls es da ist.             
            $('#ctl00_ContentBody_mcd1').find(".message__owner").remove();      // Im Cache Listing
            $('.BugDetailsList').find(".message__owner").remove();              // Im TB Listing
        }

        // Mail Icon erzeugen.
        if ( settings_show_mail ) {
            var mail_link = document.createElement("a");
            var mail_img = document.createElement("img");
            mail_img.setAttribute("style", "margin-left: 0px; margin-right: 0px"); 
            mail_img.setAttribute("title", "Send a mail to " + username_send);
            mail_img.setAttribute("src", global_mail_icon);
            mail_link.appendChild(mail_img);
            if ( b_art == "per guid" ) {
                mail_link.setAttribute("href", http + "://www.geocaching.com/email/?guid=" + guid + "&text=Hi " + b_username + ",%0A%0A" + global_name + global_info_mail);
                b_side.parentNode.insertBefore(mail_link, b_side.nextSibling);
                b_side.parentNode.insertBefore(document.createTextNode(" "), b_side.nextSibling);
            }
            else {
                b_side.appendChild(document.createTextNode(" "));
                mail_link.setAttribute("href", http + "://www.geocaching.com/email/?u=" + urlencode(b_username) + "&text=Hi " + b_username + ",%0A%0A" + global_name + global_info_mail);
                b_side.appendChild(mail_link);
                b_side.appendChild(document.createTextNode(" "));
            }
        }
        return;
    }    
//<-- $$004 End of insert

// Switch title-color to red, if cache is archived & rename the gallery-link to prevent destroying the layout on to many images ("view the " wegnehmen)
    try {
        if (is_page("cache_listing")) {

            if (document.getElementById("ctl00_ContentBody_uxGalleryImagesLink")) document.getElementById("ctl00_ContentBody_uxGalleryImagesLink").innerHTML = document.getElementById("ctl00_ContentBody_uxGalleryImagesLink").innerHTML.replace("View the ", "");

            var warnings = getElementsByClass("OldWarning");
            for (var i = 0; i < warnings.length; i++) {
                if (warnings[i].innerHTML.match(/(archived|archiviert)/)) {
                    if (document.getElementById("ctl00_ContentBody_CacheName")) document.getElementById("ctl00_ContentBody_CacheName").parentNode.style.color = '#8C0B0B';
                    break;
                }
            }
        }
    } catch (e) {
        gclh_error("Switch title-color", e);
    }

// Improve EMail-Site
    try {
        if (settings_show_mail && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/email\//) && document.getElementById("ctl00_ContentBody_SendMessagePanel1_tbMessage")) {
            // Prevent deleting content
            injectPageScriptFunction(function(){
                var oldClearSearch = clearSearch;
                clearSearch = function(obj) {
                    if (obj.id !== "ctl00_ContentBody_SendMessagePanel1_tbMessage"){
                        oldClearSearch(obj);
                    }
                };
            },"()");

            document.getElementById("ctl00_ContentBody_SendMessagePanel1_tbMessage").setAttribute("onfocus", "");

            // Default settings
            document.getElementById("ctl00_ContentBody_SendMessagePanel1_chkSendAddress").checked = getValue("email_sendaddress", "checked");
            document.getElementById("ctl00_ContentBody_SendMessagePanel1_chkEmailCopy").checked = getValue("email_mailcopy", "checked");

            function chgDefaultSendaddress() {
                setValue("email_sendaddress", document.getElementById("ctl00_ContentBody_SendMessagePanel1_chkSendAddress").checked);
            }

            function chgDefaultMailcopy() {
                setValue("email_mailcopy", document.getElementById("ctl00_ContentBody_SendMessagePanel1_chkEmailCopy").checked);
            }

            document.getElementById('ctl00_ContentBody_SendMessagePanel1_chkSendAddress').addEventListener("click", chgDefaultSendaddress, false);
            document.getElementById('ctl00_ContentBody_SendMessagePanel1_chkEmailCopy').addEventListener("click", chgDefaultMailcopy, false);

            // Grab Text from URL
            var matches = document.location.href.match(/&text=(.*)/);
            if (matches) document.getElementById("ctl00_ContentBody_SendMessagePanel1_tbMessage").innerHTML = decodeURIComponent(matches[1]);

            // Add Mail-Signature
            if (getValue("settings_mail_signature", "") != "") {
                var me = "#me#";
				var newName = $('.li-user-info').children().first().text();
                if (newName) me = newName;
                document.getElementById("ctl00_ContentBody_SendMessagePanel1_tbMessage").innerHTML += "\n\n" + getValue("settings_mail_signature").replace(/#me#/g, me);
            }
        }
    } catch (e) {
        gclh_error("Improve E-Mail-Site", e);
    }

//--> $$004 Begin of insert
// Improve Message Site.
// - Problematisch ist hier der verzögerte Aufbau der Seite. Das Textarea, zur Aufnahme des Message Inhaltes, wird erst später auf der 
//   Seite aufgebaut, so dass das Seiten Load Event schon längst erledigt ist. Nach 3 bis 6 Sekunden wird der Inhalt der Message offenbar 
//   auch gelöscht und es muß erneut ein Update durchgeführt werden. Das Ganze geht mit Feld value wie auch mit innerHTML. Im Moment werden 
//   10 Sekunden lang Updates durchgeführt, sofern das Feld leer ist. Das behindert den User nicht, es sei denn es ist wieder leer.   
// - Im Title des Message Center Icon oben rechts werden nach Ablauf der function Daten wie folgt hinterlegt: 
//   Werte in zehntel Sekunden, 20 bedeutet also 2,0 Sekunden, 3 bedeutet 0,3 Sekunden. Die Zeiten sind nur in etwa verläßlich, wenn eine
//   einzige Zeitmessung stattfindet. Wird diese Verarbeitung in mehreren Tabs quasi gleichzeitig ausgeführt, dann teilen sich scheinbar
//   alle die Zeiten, sodass dann als Zeitmessung nur entsprechende Teiler der Zeit angegeben werden.    
//   ( Textarea erstmals gefunden / Feld value erstmals gefüllt / Updates auf das Feld weil leer getrennt durch Komma ) 
//   ( 20                         / 21                          / 20,33,                                              )    
// - Zeitweise und nur bei bestimmten Usern hört der grüne Loader nicht mehr auf zu dudeln. Das hat nichts mit den hiesigen Dingen zu tun.
//   Am Besten den GClh abschalten und ohne nochmal versuchen - gleiches Verhalten. Womöglich haben diese User bisher noch nicht mit dem 
//   Message Center gearbeitet. Versucht man es fünf Minuten später nochmal identisch, dann funktioniert es. 
// - Ich kann das Ganze hier nicht besser. :)     
    try {
        if ( settings_show_message && is_page("messagecenter") && document.location.href.match(/&text=(.*)/) ) {      

            var val = "";
            // Grab Text from URL.
            var matches = document.location.href.match(/&text=(.*)/);
            val = decodeURIComponent(matches[1]);
            // Add Mail-Signature
            if ( getValue("settings_mail_signature", "" ) != "") {
                var me = "#me#";
	            var newName = $('.li-user-info > span:nth-child(2)').text();
                if (newName) me = newName;
                val += "\n\n" + getValue("settings_mail_signature").replace(/#me#/g, me);
            }
            
            function upd() {
                var checkafter = "Message Center";
                var firstUpd = "";
                var firstUpdDone = "";
                var allUpds = "";
                
                var rep = setInterval( tryUpdate, 100 ); 
                var repeatCounter = 0;
                
                function tryUpdate() {
                    repeatCounter++;
                    if ( repeatCounter > 100 ) {
                        checkafter += " ( " + firstUpd + " / " + firstUpdDone + " / " + allUpds + " )";
                        document.getElementsByClassName("message-center-icon")[1].setAttribute("title", checkafter); 
                        document.getElementsByClassName("messagecenterheaderwidget")[1].setAttribute("title", checkafter); 
                        clearInterval(rep);  
                    } else {
                        if ( document.getElementsByClassName("draft-textarea")[0] ) {
                            if ( document.getElementsByClassName("draft-textarea")[0].value == "" ) {
                                if ( firstUpd == "" ) firstUpd = repeatCounter;
                                allUpds += repeatCounter + ",";
                                document.getElementsByClassName("draft-textarea")[0].value = val;
                                if ( document.getElementsByClassName("draft-textarea autosize")[0] ) {
                                    document.getElementsByClassName("draft-textarea autosize")[0].setAttribute("style", "max-height: 200px; height: 180px;");
                                }
                            } else {
                                if ( firstUpdDone == "" )  firstUpdDone = repeatCounter;
                            }
                        }
                    }
                }
            }            
            upd();
        }
    } catch (e) {
        gclh_error("Improve Message Site", e);
    }
//<-- $$004 End of insert
    
// Default Log Type && Log Signature
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(id|guid|ID|PLogGuid|wp)\=/) && document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType') && $('#ctl00_ContentBody_LogBookPanel1_lbConfirm').length == 0) {
            if (!document.location.href.match(/\&LogType\=/) && !document.location.href.match(/PLogGuid/)) {
                var cache_type = document.getElementById("ctl00_ContentBody_LogBookPanel1_WaypointLink").nextSibling.childNodes[0].title;
                var select_val = "-1";

                if (cache_type.match(/event/i)) {
                    select_val = settings_default_logtype_event;
                }

                //Ownername == Username
                else if ($('.PostLogList').find('a[href*="https://www.geocaching.com/profile/?guid="]').text().trim() == $('.li-user-info').children().text().trim()) {
                    select_val = settings_default_logtype_owner;
                }
                else {
                    select_val = settings_default_logtype;
                }


                var select = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
                var childs = select.children;

                if (select.value == "-1") {
                    for (var i = 0; i < childs.length; i++) {
                        if (childs[i].value == select_val) {
                            select.selectedIndex = i;
                        }
                    }
                }
            }

            // Signature
//    if(document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML == ""){
            if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?PLogGuid\=/)) {
                if (settings_log_signature_on_fieldnotes) document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML += getValue("settings_log_signature", "");
            } else {
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML += getValue("settings_log_signature", "");
            }
//    }

            // Set Cursor to Pos1
            function gclh_setFocus() {
                var input = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo');
                if (input) {
                    try {
                        input.selectionStart = 0;
                        input.selectionEnd = 0;
                        input.focus();
                    }
                    catch (e) {
                        // TODO: according to Google this exception occurs if the text field is not visible,
                        // but I have no clue what exactly is wrong here
                    }
                }
            }

            window.addEventListener("load", gclh_setFocus, false);

            // Replace variable
            if ($('.li-user-info').children().length > 0) {
                var finds = get_my_finds();
                var me = $('.li-user-info').children().first().text();
                var owner = document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#found_no#/g, finds);
                finds++;
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#found#/g, finds);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#me#/g, me);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#owner#/g, owner);
//--> $$052 Begin of insert
                // Aktuelles Datum und aktuelle Zeit ermitteln und ersetzen von #Date#, #Time# und #DateTime#.
                [ aDate, aTime, aDateTime ] = getDateTime();
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#Date#/ig, aDate);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#Time#/ig, aTime);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#DateTime#/ig, aDateTime);
//<-- $$052 End of insert
            }
        }
    } catch (e) {
        gclh_error("Default Log-Type & Signature (CACHE)", e);
    }

// Default TB Log Type && Log Signature
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/log\.aspx/)) {
            if (settings_default_tb_logtype != "-1" && !document.location.href.match(/\&LogType\=/)) {
                var select = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
                var childs = select.children;

                for (var i = 0; i < childs.length; i++) {
                    if (childs[i].value == settings_default_tb_logtype) {
                        select.selectedIndex = i;
                    }
                }
            }

            // Signature
            if (document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo') && document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML == "") document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = getValue("settings_tb_signature", "");

            // Set Cursor to Pos1
            function gclh_setFocus() {
                var input = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo');
                if (input) {
                    try {
                        input.selectionStart = 0;
                        input.selectionEnd = 0;
                        input.focus();
                    } catch (e) {
                        // TODO: according to Google this exception occurs if the text field is not visible,
                        // but I have no clue what exactly is wrong here
                    }
                }
            }

            window.addEventListener("load", gclh_setFocus, false);

            // Replace variable
//--> $$052 Begin of change
//            if (getElementsByClass('SignedInText')[0] && document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo')) {
            if ($('.li-user-info').children().length > 0) {
//<-- $$052 End of change
                var finds = get_my_finds();
                var me = $('.li-user-info').children().first().text();
                var owner = document.getElementById('ctl00_ContentBody_LogBookPanel1_WaypointLink').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#found_no#/g, finds);
                finds++;
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#found#/g, finds);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#me#/g, me);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#owner#/g, owner);
//--> $$052 Begin of insert
                // Aktuelles Datum und aktuelle Zeit ermitteln und ersetzen von #Date#, #Time# und #DateTime#.
                [ aDate, aTime, aDateTime ] = getDateTime();
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#Date#/ig, aDate);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#Time#/ig, aTime);
                document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').innerHTML.replace(/#DateTime#/ig, aDateTime);
//<-- $$052 End of insert
            }
        }
    } catch (e) {
        gclh_error("Default Log-Type und Signature (TB)", e);
    }

// Show Coin-series in TB-Listing
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx/)) {
            var dl = getElementsByClass('BugDetailsList')[0];

            if (dl) {
                if (document.getElementById("ctl00_ContentBody_BugTypeImage") && document.getElementById("ctl00_ContentBody_BugTypeImage").alt) {
                    dl.innerHTML += "<dt>Series:</dt><dd>" + document.getElementById("ctl00_ContentBody_BugTypeImage").alt + "</dd>";
                }
            }
        }
    } catch (e) {
        gclh_error("Show Coin Series", e);
    }

// Improve Friendlist
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/myfriends\.aspx/)) {
            var friends = getElementsByClass("FriendText");
            var day = new Date().getDate();
            var last_check = parseInt(getValue("friends_founds_last", "0"), 10);

            if (settings_automatic_friend_reset && last_check != day) {
                for (var i = 0; i < friends.length; i++) {
                    var friend = friends[i];
                    var name = friend.getElementsByTagName("a")[0];

                    //Founds
                    if (getValue("friends_founds_new_" + name.innerHTML)) {
                        setValue("friends_founds_" + name.innerHTML, getValue("friends_founds_new_" + name.innerHTML));
                    }

                    //Hides
                    if (getValue("friends_hides_new_" + name.innerHTML)) {
                        setValue("friends_hides_" + name.innerHTML, getValue("friends_hides_new_" + name.innerHTML));
                    }
                }
                setValue("friends_founds_last", day);
            }

            for (var i = 0; i < friends.length; i++) {
                var friend = friends[i];
                var name = friend.getElementsByTagName("a")[0];
                var add = "";

                //founds
                var founds = parseInt(trim(friend.getElementsByTagName("dd")[4].innerHTML).replace(/[,.]*/g, ""));
                if (isNaN(founds))founds = 0;
                var last_founds = getValue("friends_founds_" + name.innerHTML);

                if (typeof(last_founds) == "undefined") last_founds = founds;
                if ((founds - last_founds) > 0) add = " <font color='#00AA00'><b>(+" + (founds - last_founds) + ")</b></font>";
                setValue("friends_founds_new_" + name.innerHTML, founds);
                if (founds == 0) {
                    friend.getElementsByTagName("dd")[4].innerHTML = founds + "&nbsp;";
                } else {
                    friend.getElementsByTagName("dd")[4].innerHTML = "<a href='/seek/nearest.aspx?ul=" + urlencode(name.innerHTML) + "&disable_redirect'>" + founds + "</a>&nbsp;" + add;
                }


                //hides
                add = "";
                var hides = parseInt(trim(friend.getElementsByTagName("dd")[5].innerHTML).replace(/[,.]*/g, ""));
                if (isNaN(hides))hides = 0;
                var last_hides = getValue("friends_hides_" + name.innerHTML);

                if (typeof(last_hides) == "undefined") last_hides = hides;
                if ((hides - last_hides) > 0) add = " <font color='#00AA00'><b>(+" + (hides - last_hides) + ")</b></font>";
                setValue("friends_hides_new_" + name.innerHTML, hides);
                if (hides == 0) {
                    friend.getElementsByTagName("dd")[5].innerHTML = hides + "&nbsp;";
                } else {
                    friend.getElementsByTagName("dd")[5].innerHTML = "<a href='/seek/nearest.aspx?u=" + urlencode(name.innerHTML) + "&disable_redirect'>" + hides + "</a>&nbsp;" + add;
                }


                //Location
                var friendlocation = trim(friend.getElementsByTagName("dd")[3].getElementsByTagName("span")[0].innerHTML);
                if (friendlocation != "" && friendlocation.length > 3) {
                    friend.getElementsByTagName("dd")[3].getElementsByTagName("span")[0].innerHTML = "<a href='http://maps.google.de/?q=" + (friendlocation.replace(/&/g, "")) + "' target='_blank'>" + friendlocation + "</a>";
                }


                //bottom line
                friend.getElementsByTagName("p")[0].innerHTML = "<a name='lnk_profilegallery2' href='" + name.href + "'>Gallery</a> | " + friend.getElementsByTagName("p")[0].innerHTML;
            }

            function gclh_reset_counter() {
                var friends = getElementsByClass("FriendText");

                for (var i = 0; i < friends.length; i++) {
                    var friend = friends[i];
                    var name = friend.getElementsByTagName("a")[0];
                    var founds = 0;
                    var hides = 0;

                    founds = getValue("friends_founds_new_" + name.innerHTML, 0);
                    setValue("friends_founds_" + name.innerHTML, founds);
                    if (founds == 0) friend.getElementsByTagName("dd")[4].innerHTML = "0&nbsp;";
                    else friend.getElementsByTagName("dd")[4].innerHTML = "<a href='/seek/nearest.aspx?ul=" + urlencode(name.innerHTML) + "&disable_redirect'>" + founds + "</a>";

                    hides = getValue("friends_hides_new_" + name.innerHTML, 0);
                    setValue("friends_hides_" + name.innerHTML, hides);
                    if (hides == 0) friend.getElementsByTagName("dd")[5].innerHTML = "0&nbsp;";
                    else friend.getElementsByTagName("dd")[5].innerHTML = "<a href='/seek/nearest.aspx?u=" + urlencode(name.innerHTML) + "&disable_redirect'>" + hides + "</a>&nbsp;";
                }
            }

            var button = document.createElement("input");
            button.setAttribute("type", "button");
            button.setAttribute("value", "Reset counter");
            button.addEventListener("click", gclh_reset_counter, false);

            document.getElementById('ctl00_ContentBody_FindUserPanel1_GetUsers').parentNode.insertBefore(button, document.getElementById('ctl00_ContentBody_FindUserPanel1_GetUsers').nextSibling);
        }
    } catch (e) {
        gclh_error("Improve Friendlist", e);
    }

// Show Google-Maps Link on Cache Listing Page
    try {
        if (settings_show_google_maps && is_page("cache_listing") && document.getElementById("ctl00_ContentBody_uxViewLargerMap") && document.getElementById("uxLatLon") && document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode")) {
            var ref_link = document.getElementById("ctl00_ContentBody_uxViewLargerMap");
            var box = ref_link.parentNode;

            box.appendChild(document.createElement("br"));

            var link = document.createElement("a");
            link.setAttribute("class", "lnk");
            link.setAttribute("target", "_blank");
            link.setAttribute("title", "Show area at Google Maps");
//--> $$053 Begin of change
//            link.setAttribute("href", "http://maps.google.com/maps?q=" + document.getElementById("uxLatLon").innerHTML + " (" + document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode").innerHTML + ")");
            var matches = ref_link.href.match(/\?lat=(-?[0-9.]*)&lng=(-?[0-9.]*)/);
            var latlng = matches[1] + "," + matches[2];
            // &ll sorgt für Zentrierung der Seite beim Marker auch wenn die linke Sidebar aufklappt. Zoom 18 setzen, weil GC Map eigentlich nicht mehr kann.
            link.setAttribute("href", "https://maps.google.de/maps?q=" + latlng + "&ll=" + latlng + "&z=18");
//<-- $$053 End of change

            var img = document.createElement("img");
            img.setAttribute("src", "/images/silk/map_go.png");
            link.appendChild(img);

            link.appendChild(document.createTextNode(" "));

            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Show area on Google Maps"));
            link.appendChild(span);

            box.appendChild(link);
        }
    } catch (e) {
        gclh_error("Show google maps link", e);
    }

// Show "Log It"-Button
    try {
        if (settings_show_log_it && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx\?/)) {
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx\?.*/) && links[i].innerHTML.match(/^<span>/)) {
                    links[i].parentNode.innerHTML = links[i].parentNode.innerHTML.replace("<br>", "<a title='Log it' href='" + links[i].href.replace("cache_details", "log") + "'><img src='/images/stockholm/16x16/add_comment.gif'></a><br>");
                } else if (links[i].href.match(/^https?:\/\/www\.geocaching\.com\/geocache\/.*/) && links[i].innerHTML.match(/^<span>/)) {
                    var match = links[i].href.match(/^https?:\/\/www\.geocaching\.com\/geocache\/([^_]*)/);
                    links[i].parentNode.innerHTML = links[i].parentNode.innerHTML.replace("<br>", "<a title='Log it' href='" + http + "://www.geocaching.com/seek/log.aspx?wp=" + match[1] + "'><img src='/images/stockholm/16x16/add_comment.gif'></a><br>");
                }
            }
        }
    } catch (e) {
        gclh_error("Log It Button", e);
    }

// Show Profile-Link on display of Caches found or created by user
    try {
        if (settings_show_nearestuser_profil_link && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx/) && document.location.href.match(/(ul|u)=/)) {
            if (document.getElementById("ctl00_ContentBody_LocationPanel1_OriginLabel")) {
//--> $$041 Begin of delete
//                var textelement = document.getElementById("ctl00_ContentBody_LocationPanel1_OriginLabel");
//                textelement.innerHTML += " (";
//                var linkelement = document.createElement("a");
//                var urluser = document.location.href.match(/(ul|u)=(.*)/);
//                linkelement.href = "/profile/?u=" + urluser[2].replace("&sc=n", "");
//                linkelement.innerHTML = "Profil";
//                textelement.appendChild(linkelement);
//                textelement.innerHTML += ")";
//<-- $$041 End of delete
//--> $$041 Begin of insert
                var urluser = document.location.href.match(/(ul|u)=(.*)/);
                urluser = urldecode( urluser[2].replace(/&([A-Za-z0-9]+)=(.*)/, "") );
                urluser = urluser.replace(/&disable_redirect/, "");
                urluser = urluser.replace(/#(.*)/, "");
                var linkelement = document.createElement("a");
                linkelement.href = "/profile/?u=" + urluser;
                linkelement.innerHTML = urluser;
                var textelement = document.getElementById("ctl00_ContentBody_LocationPanel1_OriginLabel");
                textelement.innerHTML = textelement.innerHTML.replace(/: (.*)/, ": ");
                textelement.appendChild(linkelement);
//<-- $$041 End of insert
            }
        }
    } catch (e) {
        gclh_error("Show Profile Link", e);
    }

// Improve Bookmark-List
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks\/view\.aspx\?guid=/)) {
            var box = document.getElementById("ctl00_ContentBody_lbHeading").parentNode.parentNode.parentNode;
            var matches = document.location.href.match(/guid=([a-zA-Z0-9-]*)/);
            var uuid = matches[1];

//--> $$034 Begin of change
            box.childNodes[3].innerHTML += "<br><a title=\"Download as kml\" href='" + http + "://www.geocaching.com/kml/bmkml.aspx?bmguid=" + uuid + "'>Download as kml</a><br><a title=\"Show in google maps\" href='http://maps.google.com/?q=https://www.geocaching.com/kml/bmkml.aspx?bmguid=" + uuid + "' target='_blank'>Show in google maps</a>";
//            box.childNodes[3].innerHTML += "<br><a title=\"Download as kml\" href='" + http + "://www.geocaching.com/kml/bmkml.aspx?bmguid=" + uuid + "'>Download as kml</a>";
//<-- $$034 End of change
        }
//--> $$034 Begin of delete
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks\/default\.aspx/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/lists\.aspx/)) {
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {
                if (links[i].title == "Download Google Earth KML") {

                    var matches = links[i].href.match(/guid=([a-zA-Z0-9-]*)/);
                    links[i].parentNode.innerHTML += "<br><a title='Show in google maps' href='http://maps.google.com/?q=https://www.geocaching.com/kml/bmkml.aspx?bmguid=" + matches[1] + "' target='_blank'>Show in google maps</a>";
                }
            }
        }
//<-- $$034 End of delete
    } catch (e) {
        gclh_error("Improve Bookmark-List", e);
    }

//--> $$032 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Add buttons to bookmarks-list to select caches
//    try {
//        var current_page;
//
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks/)) current_page = "bookmark"
//        else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/watchlist/)) current_page = "watch"
//
//        if (!!current_page) {
//            var checkbox_selector = 'input[type=checkbox]';
//            var table = $('table.Table').first(); //On watchlist, ignore the trackable-table so use only first table here
//            var rows = table.find('tbody tr');
//            var checkboxes = table.find(checkbox_selector);
//
//            if (table.length > 0 && rows.length > 0 && checkboxes.length > 0) {
//                //Add section to table
//                var button_wrapper = $('<td colspan="10">Select caches: </td>');
//                var button_template = $('<a style="cursor:pointer; margin-right: 10px;" />');
//
//                button_wrapper.append(button_template.clone().text('All').click(function () {
//                    checkboxes.prop('checked', 'true');
//                }));
//                button_wrapper.append(button_template.clone().text('None').click(function () {
//                    checkboxes.prop('checked', false);
//                }));
//                button_wrapper.append(button_template.clone().text('Invert').click(function () {
//                    checkboxes.each(function () {
//                        this.checked = !this.checked;
//                    });
//                }));
//
//                button_wrapper.append($('<span style="margin-right:10px">|</span>'));
//
//                if (current_page !== "watch") { // Hide on watchlist
//                    button_wrapper.append(button_template.clone().text('Found').click(function () {
//                        table.find('img[src*="found"]').closest('tr').find(checkbox_selector).prop('checked', 'true');
//                    }));
//                }
//                button_wrapper.append(button_template.clone().text('Archived').click(function () {
//                    table.find('span.Strike.OldWarning,span.Strike.Warning').closest('tr').find(checkbox_selector).prop('checked', 'true');
//                }));
//                button_wrapper.append(button_template.clone().text('Deactivated').click(function () {
//                    table.find('span.Strike:not(.OldWarning,.Warning)').closest('tr').find(checkbox_selector).prop('checked', 'true');
//                }));
//
//                var tfoot = $('<tfoot />').append($('<tr />').append(button_wrapper));
//                table.append(tfoot);
////--> $$007 Begin of insert
//                checkboxes.prop('checked', false);
////<-- $$007 End of insert
//            }
//        }
//    } catch (e) {
//        gclh_error("Add buttons to bookmark list", e);
//    }
//<-- $$032 End of delete
    
//--> $$032 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Add buttons to bookmarks-lists and watchlist to select caches
    try {
        var current_page;
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks/)) current_page = "bookmark"
        else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/watchlist/)) current_page = "watch"

        if (!!current_page) {
            var checkbox_selector = 'input[type=checkbox]';
            var table = $('table.Table').first(); //On watchlist, ignore the trackable-table so use only first table here
            var rows = table.find('tbody tr');
            var checkboxes = table.find(checkbox_selector);

            if (table.length > 0 && rows.length > 0 && checkboxes.length > 0) {
                //Add section to table
                var button_wrapper = $('<td colspan="10">Select caches: </td>');
                var button_template = $('<a style="cursor:pointer; margin-right: 10px;" />');
                if ( current_page == "bookmark" ) sums = sumsCreateFields( settings_show_sums_in_bookmark_lists );
                else sums = sumsCreateFields( settings_show_sums_in_watchlist );
                sumsCountAll();
                sumsSetEventsForCheckboxes( table.find('tbody tr').find(checkbox_selector) );

                button_wrapper.append(button_template.clone().text('All').click(function () {
                    checkboxes.prop('checked', 'true');
                    sumsCountChecked_SelectionAll();
                }));
                sumsOutputFields( button_wrapper, "All" );
                button_wrapper.append(button_template.clone().text('None').click(function () {
                    checkboxes.prop('checked', false);
                    sumsCountChecked_SelectionNone();
                }));
                button_wrapper.append(button_template.clone().text('Invert').click(function () {
                    checkboxes.each(function () {
                        this.checked = !this.checked;
                    });
                    sumsCountChecked_SelectionInvert();
                }));

                button_wrapper.append($('<span style="margin-right:10px">|</span>'));

                if (current_page !== "watch") { // Hide on watchlist
                    button_wrapper.append(button_template.clone().text('Found').click(function () {
                        table.find('img[src*="found"]').closest('tr').find(checkbox_selector).each(function () {
                            this.checked = !this.checked;
                        });
                        sumsCountCheckedAll();
                    }));
                    sumsOutputFields( button_wrapper, "Found" );
                }
                button_wrapper.append(button_template.clone().text('Archived').click(function () {
                    table.find('span.Strike.OldWarning,span.Strike.Warning').closest('tr').find(checkbox_selector).each(function () {
                        this.checked = !this.checked;
                    });
                    sumsCountCheckedAll();
                }));
                sumsOutputFields( button_wrapper, "Archived" );
                button_wrapper.append(button_template.clone().text('Deactivated').click(function () {
                    table.find('span.Strike:not(.OldWarning,.Warning)').closest('tr').find(checkbox_selector).each(function () {
                        this.checked = !this.checked;
                    });
                    sumsCountCheckedAll();
                }));
                sumsOutputFields( button_wrapper, "Deactivated" );

                var tfoot = $('<tfoot />').append($('<tr />').append(button_wrapper));
                table.append(tfoot);

                checkboxes.prop('checked', false);
                sumsChangeAllFields();
            }
        }
    } catch (e) {
        gclh_error("Add buttons to bookmark list and watchlist", e);
    }
//<-- $$032 End of insert

//--> $$032 Begin of insert
// Funktionen für die Ermittlung und Ausgabe der Anzahl Caches und der Anzahl der selektierten Caches in Bookmark Listen, Watchlist ...   
    // Summenfelder für Anzahl Caches definieren und Configparameter setzen.
    function sumsCreateFields( configParameter ) {
        var sums = new Object();
        sums["All"] = 0;
        sums["chAll"] = 0;
        sums["Found"] = 0;
        sums["chFound"] = 0;
        sums["Archived"] = 0;
        sums["chArchived"] = 0;
        sums["Deactivated"] = 0;
        sums["chDeactivated"] = 0;
        sums["configParameter"] = configParameter;
      return sums;
    }
    // Anzahl Caches ermitteln. 
    function sumsCountAll() {
        if ( sums["configParameter"] == false ) return;
        sums["All"] = table.find('tbody tr').find(checkbox_selector).length;
        sums["Found"] = table.find('tbody tr').find('img[src*="found"]').length;
        sums["Archived"] = table.find('tbody tr').find('span.Strike.OldWarning,span.Strike.Warning').length;
        sums["Deactivated"] = table.find('tbody tr').find('span.Strike:not(.OldWarning,.Warning)').length;
    }
    // Events für die Checkboxen setzen.
    function sumsSetEventsForCheckboxes( checkboxes ) {
        if ( sums["configParameter"] == false ) return;
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("click", function () { sumsCountChecked_Click( this ); } , false);
        }
    }
    // Platzhalter für die Anzahl Caches aufbauen.     
    function sumsOutputFields( side, kind ) {
        if ( sums["configParameter"] == false ) return;
        var out = document.createElement('span');
        out.setAttribute("style", "font-size: 85%; font-style: italic; margin-left: -6px; margin-right: 10px;");
        out.setAttribute("id", "sums_caches_" + kind);
        out.appendChild(document.createTextNode( "" ));
        side.append(out);
    }
    // Werte für die Anzahl Caches ändern.   
    function sumsChangeAllFields() {
        if ( sums["configParameter"] == false ) return;
        sumsChangeFields( "All", sums["chAll"], sums["All"] )
        sumsChangeFields( "Found", sums["chFound"], sums["Found"] )
        sumsChangeFields( "Archived", sums["chArchived"], sums["Archived"] )
        sumsChangeFields( "Deactivated", sums["chDeactivated"], sums["Deactivated"] )
    }
    // Werte für die Anzahl Caches ändern.  
    function sumsChangeFields( kind, sums_ch, sums ) {
        if ( sums["configParameter"] == false ) return;
        var outSums = "(" + sums_ch + "|" + sums + ")";
        var outTitle = sums_ch + " of " + sums + " caches selected"; 
        var outId = "sums_caches_" + kind; 
        if ( document.getElementById( outId ) ) {
            var side = document.getElementById( outId );
            side.setAttribute( "title", outTitle );
            side.innerHTML = outSums;
        }
    }
    // Anzahl markierte Caches für Selektion All ermitteln und setzen. 
    function sumsCountChecked_SelectionAll() {
        if ( sums["configParameter"] == false ) return;
        sums["chAll"] = sums["All"];
        sums["chFound"] = sums["Found"];
        sums["chArchived"] = sums["Archived"];
        sums["chDeactivated"] = sums["Deactivated"];
        sumsChangeAllFields();
    }
    // Anzahl markierte Caches für Selektion None ermitteln und setzen.
    function sumsCountChecked_SelectionNone() {
        if ( sums["configParameter"] == false ) return;
        sums["chAll"] = 0;
        sums["chFound"] = 0;
        sums["chArchived"] = 0;
        sums["chDeactivated"] = 0;
        sumsChangeAllFields();
    }
    // Anzahl markierte Caches für Selektion Invert ermitteln und setzen.
    function sumsCountChecked_SelectionInvert() {
        if ( sums["configParameter"] == false ) return;
        sums["chAll"] = sums["All"] - sums["chAll"];
        sums["chFound"] = sums["Found"] - sums["chFound"];
        sums["chArchived"] = sums["Archived"] - sums["chArchived"];
        sums["chDeactivated"] = sums["Deactivated"] - sums["chDeactivated"];
        sumsChangeAllFields();
    }
    // Anzahl markierte Caches für Click auf Checkbox ermitteln. 
    function sumsCountChecked_Click( checkbox ) {
        if ( checkbox.checked ) sums["chAll"]++;
        else  sums["chAll"]--;
        var cbId = checkbox.id; 
        if ( $('#'+cbId).closest('tr').find('img[src*="found"]').length > 0 ) {          
                if ( checkbox.checked ) sums["chFound"]++;
                else  sums["chFound"]--;
        }
        if ( $('#'+cbId).closest('tr').find('span.Strike.OldWarning,span.Strike.Warning').length > 0 ) {          
                if ( checkbox.checked ) sums["chArchived"]++;
                else  sums["chArchived"]--;
        }
        if ( $('#'+cbId).closest('tr').find('span.Strike:not(.OldWarning,.Warning)').length > 0 ) {          
                if ( checkbox.checked ) sums["chDeactivated"]++;
                else  sums["chDeactivated"]--;
        }
        sumsChangeAllFields();
    }
    // Anzahl markierter Caches für alles ermitteln. 
    function sumsCountCheckedAll() {
        if ( sums["configParameter"] == false ) return;
        sums["chAll"] = table.find('tbody tr').find(checkbox_selector + ':checked').length;
        sums["chFound"] = table.find('tbody tr').find('img[src*="found"]').closest('tr').find(checkbox_selector + ':checked').length;
        sums["chArchived"] = table.find('tbody tr').find('span.Strike.OldWarning,span.Strike.Warning').closest('tr').find(checkbox_selector + ':checked').length;
        sums["chDeactivated"] = table.find('tbody tr').find('span.Strike:not(.OldWarning,.Warning)').closest('tr').find(checkbox_selector + ':checked').length;
        sumsChangeAllFields();
    } 
//<-- $$032 End of insert
    
//--> $$054 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Hide Map Header
//    try {
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
//            if (settings_hide_map_header) {
//                // ... by default
//                hide_map_header();
//            }
//
//            // ... with button in sidebar
//            var sidebar = document.getElementById("searchtabs");
//            var link = document.createElement("a");
//
//            link.appendChild(document.createTextNode("Hide/Show Header"));
//            link.href = "#";
//            link.addEventListener("click", hide_map_header, false);
//
////--> $$019 Begin of change 
////            sidebar.setAttribute("style", "height: 58px !important"); // default: 56px
//            // Link in der Sidebar der Karten komplett anzeigen und auch nicht mehr überblenden.
//            sidebar.setAttribute("style", "height: 63px !important; margin-top: 6px !important;"); 
//            // Link in der Sidebar rechts orientieren wegen möglichem GC Tour script.
//            link.setAttribute("style", "float: right; padding-right: 3px;"); 
////<-- $$019 End of change
//            sidebar.appendChild(link);
//        }
//    } catch (e) {
//        gclh_error("Hide Map Header", e);
//    }
//<-- $$054 End of delete 
    
//--> $$054 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Hide Map Header
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
            function checkMapLeaflet( waitCount ) {
                if ( document.getElementsByClassName("leaflet-container")[0] ) {
                    // Map Header verbergen.
                    if (settings_hide_map_header) {
                        hide_map_header();
                    }
                    // Button in Sidebar aufbauen "Hide/Show Header".
                    var sidebar = document.getElementById("searchtabs");
                    var link = document.createElement("a");
                    link.appendChild(document.createTextNode("Hide/Show Header"));
                    link.href = "#";
                    link.addEventListener("click", hide_map_header, false);
                    // Link in der Sidebar der Karten komplett anzeigen und auch nicht mehr überblenden.
                    sidebar.setAttribute("style", "height: 63px !important; margin-top: 6px !important;"); 
                    // Link in der Sidebar rechts orientieren wegen möglichem GC Tour script.
                    link.setAttribute("style", "float: right; padding-right: 3px;"); 
                    sidebar.appendChild(link);
                } else {
                    waitCount++;
                    if ( waitCount <= 50 ) {  // 5 Sekunden lang
                        setTimeout( function () { checkMapLeaflet( waitCount ) }, 100); 
                    } else {
                        return;
                    }
                }
            }
            checkMapLeaflet( 0 );
        }
    } catch (e) {
        gclh_error("Hide Map Header", e);
    }
//<-- $$054 End of insert

// Map-Layers
    var all_map_layers = new Object();
// gc.com Default-Layers
    all_map_layers["OpenStreetMap Default"] = {
        tileUrl: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };
    all_map_layers["OpenStreetMap German Style"] = {
        tileUrl: "http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };
    all_map_layers["OpenStreetMap Black and White"] = {
        tileUrl: "http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };

    all_map_layers["Thunderforest OpenCycleMap"] = {
        tileUrl: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };
    all_map_layers["Thunderforest Transport"] = {
        tileUrl: "http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };
    all_map_layers["Thunderforest Landscape"] = {
        tileUrl: "http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    };

    all_map_layers["MapQuest OSM"] = {
        tileUrl: "http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data {attribution.OpenStreetMap}',
        subdomains: "1234"
    };
    all_map_layers["MapQuest Aerial"] = {
        tileUrl: "http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg",
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ' + "Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency",
        subdomains: "1234"
    };

    all_map_layers["Stamen Toner"] = {
        tileUrl: "http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png",
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + "Map data {attribution.OpenStreetMap}",
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 20
    };
    all_map_layers["Stamen Terrain"] = {
        tileUrl: "http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png",
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + "Map data {attribution.OpenStreetMap}",
        subdomains: "abcd",
        minZoom: 4,
        maxZoom: 18
    };
    all_map_layers["Stamen Watercolor"] = {
        tileUrl: "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png",
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + "Map data {attribution.OpenStreetMap}",
        subdomains: "abcd",
        minZoom: 3,
        maxZoom: 16
    };

    all_map_layers["Esri WorldStreetMap"] = {
        tileUrl: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri"
    };
    all_map_layers["Esri DeLorme"] = {
        tileUrl: "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; Copyright: \u00a92012 DeLorme",
        maxZoom: 11
    };
    all_map_layers["Esri WorldTopoMap"] = {
        tileUrl: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
    };
    all_map_layers["Esri WorldImagery"] = {
        tileUrl: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    };
    all_map_layers["Esri OceanBasemap"] = {
        tileUrl: "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri",
        maxZoom: 11
    };
    all_map_layers["Esri NatGeoWorldMap"] = {
        tileUrl: "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
    };

// GClh additional Layers
    all_map_layers["OpenStreetMap Hike and Bike"] = {
        tileUrl: "http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png",
        attribution: 'Map and map data \u00a9 2012 <a href="http://www.openstreetmap.org" target=\'_blank\'>OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>.',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 20
    };
    all_map_layers["Google Maps"] = {
        tileUrl: "http://mt.google.com/vt?x={x}&y={y}&z={z}",
        attribution: "Google Maps",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 20
    };
    all_map_layers["Google Maps Satellite"] = {
        tileUrl: "http://mt.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",
        attribution: "Google Maps",
        tileSize: 256,
        minZoom: 3,
        maxZoom: 20
    };
    all_map_layers["Google Maps Hybrid"] = {
        tileUrl: "http://mt0.google.com/vt/lyrs=s,m@110&hl=en&x={x}&y={y}&z={z}",
        attribution: "Google Maps",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 20
    };

// Map-Overlays
    var map_overlays = new Object();
    map_overlays["Hillshadow"] = {
        tileUrl: "http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png",
        attribution: 'hillshadow \u00a9 <a href="http://toolserver.org/" target=\'_blank\'>toolserver.org</a>',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 17
    };
    map_overlays["Public Transport Lines"] = {
        tileUrl: "http://openptmap.org/tiles/{z}/{x}/{y}.png",
        attribution: 'Public Transport Lines\u00a9 <a href="http://openptmap.org/" target=\'_blank\'>OpenPTMap</a>',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 17
    };

// Add additional Layers to Map & Select Default-Layer, add Hill-Shadow, add Homezone
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
            // Auswahl nur bestimmter Layer
            var map_layers = new Object();
            if (settings_map_layers == "" || settings_map_layers.length < 1) map_layers = all_map_layers;
            else {
                for (var i = 0; i < settings_map_layers.length; i++) map_layers[settings_map_layers[i]] = all_map_layers[settings_map_layers[i]];
            }

//--> $$053 Begin of change
//            function addLayer() {
            function addLayer( waitCount ) {
                // Prüfen, ob die Layer schon vorhanden sind. 
                if ( $('.leaflet-control-layers-base').find('input.leaflet-control-layers-selector')[0] ) {
//<-- $$053 End of change
                    injectPageScriptFunction(function (map_layers, map_overlays, settings_map_default_layer, settings_show_hillshadow) {
                        window["GCLittleHelper_MapLayerHelper"] = function (map_layers, map_overlays, settings_map_default_layer, settings_show_hillshadow) {
                            if (!window.MapSettings.Map) {
                                setTimeout(function () {
                                    window["GCLittleHelper_MapLayerHelper"](map_layers, map_overlays, settings_map_default_layer, settings_show_hillshadow)
                                }, 10);
                            }
                            else {
                                var layerControl = new window.L.Control.Layers();
                                var layerToAdd = null;
                                var defaultLayer = null;
                                var hillshadowLayer = null;
                                for (name in map_layers) {
                                    layerToAdd = new L.tileLayer(map_layers[name].tileUrl, map_layers[name]);
                                    layerControl.addBaseLayer(layerToAdd, name);
                                    if (name == settings_map_default_layer) {
                                        defaultLayer = layerToAdd;
                                    }
                                    else if (defaultLayer == null) {
                                        defaultLayer = layerToAdd;
                                    }
                                }
                                for (name in map_overlays) {
                                    layerToAdd = new L.tileLayer(map_overlays[name].tileUrl, map_overlays[name])
                                    layerControl.addOverlay(layerToAdd, name);
                                    if (name == "hillshadow") {
                                        hillshadowLayer = layerToAdd;
                                    }
                                }

                                window.MapSettings.Map.addControl(layerControl);
                                $(".leaflet-control-layers-base").first().find("input").attr('checked', false);
                                $(".leaflet-control-layers").first().remove();
                                for (layerId in window.MapSettings.Map._layers) {
                                    if (window.MapSettings.Map._layers[layerId]._url !== -1) {
                                        window.MapSettings.Map.removeLayer(window.MapSettings.Map._layers[layerId]);
                                        break;
                                    }
                                }
                                window.MapSettings.Map.addLayer(defaultLayer);
                                if (settings_show_hillshadow) {
                                    $(".leaflet-control-layers-overlays").find("input").first().click();
                                }

                            }
                        };

                        window["GCLittleHelper_MapLayerHelper"](map_layers, map_overlays, settings_map_default_layer, settings_show_hillshadow);
                    }, "(" + JSON.stringify(map_layers) + "," + JSON.stringify(map_overlays) + ",'" + settings_map_default_layer + "'," + settings_show_hillshadow + ")");

//--> $$053 Begin of insert
                } else {
                    waitCount++;
                    if ( waitCount <= 100 ) {  // 5 Sekunden lang
                        setTimeout( function () { addLayer( waitCount ) }, 50); 
                    } else return;
                }
//<-- $$053 End of insert
            }
//--> $$053 Begin of change
//            if (settings_use_gclh_layercontrol) setTimeout(addLayer, 1000); // 1 Sekunde warten, um Layercontrol von GC Map Enhancements zu ueberschreiben
            if (settings_use_gclh_layercontrol) setTimeout( function () { addLayer( 0 ) }, 1000); // 1 Sekunde warten, um Layercontrol von GC Map Enhancements zu ueberschreiben
//<-- $$053 End of change

            //Function called when map is loaded
            function gclh_map_loaded() {
                if (settings_map_hide_sidebar) {
                    var links = document.getElementsByTagName("a");
                    if (document.getElementById("searchtabs").parentNode.style.left != "-355px")
                        for (var i = 0; i < links.length; i++) {
                            if (links[i].className.match(/ToggleSidebar/)) {
                                links[i].click();
                                break;
                            }
                        }
//--> $$054 Begin of insert
                    function hideSidebarRest( waitCount ) {
                        if ( document.getElementsByClassName("groundspeak-control-findmylocation")[0] &&
                             document.getElementsByClassName("leaflet-control-scale")[0]              &&
                             document.getElementsByClassName("leaflet-control-zoom")[0]                  ) {
                            // Wenn externe Kartenfilter vorhanden sind, dann gibt es keinen Balken zur Sidebar.
                            if ( document.location.href.match(/&asq=/) ) var styleLeft = "15px";
                            else var styleLeft = "30px";
                            document.getElementsByClassName("groundspeak-control-findmylocation")[0].style.left = styleLeft;
                            document.getElementsByClassName("leaflet-control-scale")[0].style.left = styleLeft;
                            document.getElementsByClassName("leaflet-control-zoom")[0].style.left = styleLeft;
                        } else {
                            waitCount++;
                            if ( waitCount <= 50 ) {  // 10 Sekunden
                                setTimeout( function () { hideSidebarRest( waitCount ) }, 200); 
                            } else return;
                        }
                    } 
                    hideSidebarRest( 0 );
//<-- $$054 End of insert
                }
                
                function addHomeZoneMap(unsafeWindow, home_lat, home_lng, settings_homezone_radius, settings_homezone_color, settings_homezone_opacity) {
                    //remove duplicate # if exists
                    settings_homezone_color = settings_homezone_color.replace("##", "#");

                    if (unsafeWindow == "none") {
                        unsafeWindow = window;
                    }

                    if (typeof home_lat == "undefined" || typeof home_lng == "undefined" || home_lat == null || home_lng == null) {
                        return;
                    }

                    var opacity = settings_homezone_opacity / 100;
                    var opacity2 = opacity + 0.1;

                    var latlng = new unsafeWindow.L.LatLng((home_lat / 10000000), (home_lng / 10000000));
                    var options = {
                        color: settings_homezone_color,
                        weight: 1,
                        opacity: opacity2,
                        fillOpacity: opacity,
                        clickable: false
                    };
                    var circle = new unsafeWindow.L.Circle(latlng, settings_homezone_radius * 1000, options);
                    unsafeWindow.MapSettings.Map.addLayer(circle);
                }

//--> $$057 Begin of insert
                // Die Circles werden manchmal zu früh aufgebaut, dann blinken sie kurz auf und sind dann auch schon wieder verschwunden.
                // Das passiert insbesondere beim Kartenaufruf ohne Koordinaten, also beispielsweise aus dem Menü Play. Auf was man warten
                // soll ist mir nicht klar. Ich nehme Ähnliches wie oben bei hideSidebarRest.
                function checkForAddHomeZoneMap( waitCount ) {
                    if ( document.getElementsByClassName("groundspeak-control-findmylocation")[0] &&
                         document.getElementsByClassName("leaflet-control-scale")[0]                 ) {
//<-- $$057 End of insert
                        // Show Homezone-Circle on Map
                        if (settings_show_homezone) {
                            if (browser === "chrome" || browser === "firefox") {
                                injectPageScriptFunction(addHomeZoneMap, "('" + "none" + "', " + getValue("home_lat") + ", " + getValue("home_lng") + ", " + settings_homezone_radius + ", '#" + settings_homezone_color + "', " + settings_homezone_opacity + ")");
                            }
                            else {
                                addHomeZoneMap(unsafeWindow, getValue("home_lat"), getValue("home_lng"), settings_homezone_radius, "#" + settings_homezone_color, settings_homezone_opacity);
                            }
//--> $$057 Begin of delete
//                }
//<-- $$057 End of delete 
                            // Show Multi-Homezone-Circle on Map
                            for (var i in settings_multi_homezone) {
                                var curHz = settings_multi_homezone[i];
                                if (browser === "chrome" || browser === "firefox") {
                                    injectPageScriptFunction(addHomeZoneMap, "('" + "none" + "', " + curHz.lat + ", " + curHz.lng + ", " + curHz.radius + ", '#" + curHz.color + "', " + curHz.opacity + ")");
                                }
                                else {
                                    addHomeZoneMap(unsafeWindow, curHz.lat, curHz.lng, curHz.radius, "#" + curHz.color, curHz.opacity);
                                }
                            }
//--> $$057 Begin of insert
                        }
                    } else {
                        waitCount++;
                        if ( waitCount <= 50 ) {  // 10 Sekunden
                            setTimeout( function () { checkForAddHomeZoneMap( waitCount ) }, 200); 
                        } else return;
                    }
                }
                checkForAddHomeZoneMap( 0 );
//<-- $$057 End of insert
            }

            window.addEventListener("load", gclh_map_loaded, false);
//--> $$046 Begin of insert
            appendCssStyle(".leaflet-control-layers-base {min-width: 200px;}");
//<-- $$046 End of insert
        }
    } catch (e) {
        gclh_error("Add Layers & Homezone to map", e);
    }

//--> $$053 Begin of insert
// Add link to Google Maps on GC Map.
    try {
        if ( is_page("map") && settings_add_link_google_maps_on_gc_map ) {
            function addGoogleButton( waitCount ) {
                // Prüfen, ob die Layers schon vorhanden sind, erst dann den Button hinzufügen. 
                if ( $('.leaflet-control-layers-base').find('input.leaflet-control-layers-selector')[0] ) {
                    // Damit Button nicht ständig den Platz wechselt, um 1 Sekunde verzögern, dann sollte er links von den anderen Buttons stehen. 
                    setTimeout( function () { 
                        var code = "";
                        code += "    function openGoogleMaps(){";
                        // Mögliche URL Zusammensetzungen, Beispiele:
                        // 1. https://www.geocaching.com/map/default.aspx?lat=50.889233&lng=13.386967#?ll=50.89091,13.39551&z=14
                        //    https://www.geocaching.com/map/default.aspx?lat=50.889233&lng=13.386967#clist?ll=50.89172,13.36779&z=14
                        //    https://www.geocaching.com/map/default.aspx?lat=50.889233&lng=13.386967#pq?ll=50.89204,13.36667&z=14
                        //    https://www.geocaching.com/map/default.aspx?lat=50.889233&lng=13.386967#search?ll=50.89426,13.35955&z=14
                        // 2. https://www.geocaching.com/map/?ll=50.89093,13.38437#?ll=50.89524,13.35912&z=14
                        // 3. https://www.geocaching.com/map/#?ll=50.95397,6.9713&z=15
                        code += "        var matches = document.location.href.match(/\\?ll=(-?[0-9.]*),(-?[0-9.]*)&z=([0-9.]*)/);"; // Beispiel 1., 2. und 3. hinten
                        code += "        var matchesMarker = document.location.href.match(/\\?lat=(-?[0-9.]*)&lng=(-?[0-9.]*)/);";  // Beispiel 1. vorne
                        code += "        if (matchesMarker == null) {";  
                        code += "            var matchesMarker = document.location.href.match(/\\?ll=(-?[0-9.]*),(-?[0-9.]*)#/);";  // Beispiel 2. vorne
                        code += "            if (matchesMarker == null) {";  
                        code += "                var matchesMarker = matches;";                                                     // Beispiel 3.
                        code += "            }";
                        code += "        }";
                        code += "        if (matches != null && matchesMarker != null) {";
                        code += "            var url = 'https://maps.google.de/maps?q=' + matchesMarker[1] + ',' + matchesMarker[2] + '&z=' + matches[3] + '&ll=' + matches[1] + ',' + matches[2];";
                        if ( settings_switch_to_google_maps_in_same_tab ) {
                            code += "        location = url;"; 
                        } else {
                            code += "        window.open( url );"; 
                        }
                        code += "        } else {";
                        code += "            alert('This map has no geographical coordinates in its link. Just zoom or drag the map, afterwards this will work fine.');";
                        code += "        }";
                        code += "    }";
                        var script = document.createElement("script");
                        script.innerHTML = code;
    
                        var div = document.createElement("div");
                        div.setAttribute("class", "leaflet-control-layers leaflet-control");
                        var aTag = document.createElement("a");
                        aTag.setAttribute("id", "gclh_google_button");
                        aTag.setAttribute("class", "leaflet-control-layers-toggle");
                        aTag.setAttribute("onClick", "openGoogleMaps();");
                        aTag.setAttribute("title", "Show area on Google Maps");
                        aTag.setAttribute("style", "background-image: url('/images/silk/map_go.png'); cursor: pointer;");
                        var side = document.getElementsByClassName("leaflet-top leaflet-right")[0];

                        div.appendChild(script);
                        div.appendChild(aTag);
                        side.appendChild(div);
                    
                        // Damit auch mehr als 2 Buttons handlebar sind, also auch beispielsweise noch GC Vote.
                        appendCssStyle(".leaflet-control-layers + .leaflet-control {position: unset; right: unset;} .leaflet-control {clear: unset}");
                    }, 1000);
                } else {
                    waitCount++;
                    if ( waitCount <= 50 ) {  // 10 Sekunden lang
                        setTimeout( function () { addGoogleButton( waitCount ) }, 200); 
                    } else return;
                }
            }
            addGoogleButton( 0 );
        }
    } catch (e) {
        gclh_error("add link google maps on gc map", e);
    }
//<-- $$053 End of insert
      
// Hide found/hidden Caches on Map
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//) && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\/default.aspx\?pq/)) { // Nicht bei PQ-Anzeige
            function hideFoundCaches() {
//--> $$011 Begin of insert
                // Kartenfilter bei externen Filtern (beispielsweise aus play/search) nicht verändern.
                if ( document.location.href.match(/&asq=/) ) return;
//<-- $$011 End of insert
                var button = unsafeWindow.document.getElementById("m_myCaches").childNodes[1];
                if (button) {
                    button.click();
                }
            }

            if (settings_map_hide_found) {
                window.addEventListener("load", hideFoundCaches, false);
            }

            function hideHiddenCaches() {
//--> $$011 Begin of insert
                if ( document.location.href.match(/&asq=/) ) return;
//<-- $$011 End of insert
                var button = unsafeWindow.document.getElementById("m_myCaches").childNodes[3];
                if (button) {
                    button.click();
                }
            }

            if (settings_map_hide_hidden) {
                window.addEventListener("load", hideHiddenCaches, false);
            }

            // Apply Cache Type Filter
            function hideCacheTypes() {
//--> $$011 Begin of insert
                if ( document.location.href.match(/&asq=/) ) return;
//<-- $$011 End of insert
//--> $$018 Begin of delete
//                if (settings_map_hide_2 && document.getElementById("Legend2"))    document.getElementById("Legend2").click();
//                if (settings_map_hide_9 && document.getElementById("Legend9"))    document.getElementById("Legend9").click();
//                if (settings_map_hide_5 && document.getElementById("Legend5"))    document.getElementById("Legend5").click();
//                if (settings_map_hide_3 && document.getElementById("Legend3"))    document.getElementById("Legend3").click();
//                if (settings_map_hide_6 && document.getElementById("Legend6"))    document.getElementById("Legend6").click();
//                if (settings_map_hide_453 && document.getElementById("Legend453"))  document.getElementById("Legend453").click();
//                if (settings_map_hide_13 && document.getElementById("Legend13"))   document.getElementById("Legend13").click();
//                if (settings_map_hide_1304 && document.getElementById("Legend1304")) document.getElementById("Legend1304").click();
//                if (settings_map_hide_4 && document.getElementById("Legend4"))    document.getElementById("Legend4").click();
//                if (settings_map_hide_11 && document.getElementById("Legend11"))   document.getElementById("Legend11").click();
//                if (settings_map_hide_137 && document.getElementById("Legend137"))  document.getElementById("Legend137").click();
//                if (settings_map_hide_8 && document.getElementById("Legend8"))    document.getElementById("Legend8").click();
//                if (settings_map_hide_1858 && document.getElementById("Legend1858")) document.getElementById("Legend1858").click();
//<-- $$018 End of delete
//--> $$018 Begin of insert
                // Cache Types auf hidden setzen.
                if (settings_map_hide_2    && document.getElementById("Legend2"))    { document.getElementById("Legend2").click();    document.getElementById("Legend2").setAttribute("class", "ct_toggle ct2 ct_hidden"); }
                if (settings_map_hide_9    && document.getElementById("Legend9"))    { document.getElementById("Legend9").click();    document.getElementById("Legend9").setAttribute("class", "ct_toggle ct9 ct_hidden"); }
                if (settings_map_hide_5    && document.getElementById("Legend5"))    { document.getElementById("Legend5").click();    document.getElementById("Legend5").setAttribute("class", "ct_toggle ct5 ct_hidden"); }
                if (settings_map_hide_3    && document.getElementById("Legend3"))    { document.getElementById("Legend3").click();    document.getElementById("Legend3").setAttribute("class", "ct_toggle ct3 ct_hidden"); }
                if (settings_map_hide_6    && document.getElementById("Legend6"))    { document.getElementById("Legend6").click();    document.getElementById("Legend6").setAttribute("class", "ct_toggle ct6 ct_hidden"); }
                if (settings_map_hide_453  && document.getElementById("Legend453"))  { document.getElementById("Legend453").click();  document.getElementById("Legend453").setAttribute("class", "ct_toggle ct453 ct_hidden"); }
                if (settings_map_hide_7005 && document.getElementById("Legend7005")) { document.getElementById("Legend7005").click(); document.getElementById("Legend7005").setAttribute("class", "ct_toggle ct7005 ct_hidden"); }
                if (settings_map_hide_13   && document.getElementById("Legend13"))   { document.getElementById("Legend13").click();   document.getElementById("Legend13").setAttribute("class", "ct_toggle ct13 ct_hidden"); }
                if (settings_map_hide_1304 && document.getElementById("Legend1304")) { document.getElementById("Legend1304").click(); document.getElementById("Legend1304").setAttribute("class", "ct_toggle ct1304 ct_hidden"); }
                if (settings_map_hide_4    && document.getElementById("Legend4"))    { document.getElementById("Legend4").click();    document.getElementById("Legend4").setAttribute("class", "ct_toggle ct4 ct_hidden"); }
                if (settings_map_hide_11   && document.getElementById("Legend11"))   { document.getElementById("Legend11").click();   document.getElementById("Legend11").setAttribute("class", "ct_toggle ct11 ct_hidden"); }
                if (settings_map_hide_137  && document.getElementById("Legend137"))  { document.getElementById("Legend137").click();  document.getElementById("Legend137").setAttribute("class", "ct_toggle ct137 ct_hidden"); }
                if (settings_map_hide_8    && document.getElementById("Legend8"))    { document.getElementById("Legend8").click();    document.getElementById("Legend8").setAttribute("class", "ct_toggle ct8 ct_hidden"); }
                if (settings_map_hide_1858 && document.getElementById("Legend1858")) { document.getElementById("Legend1858").click(); document.getElementById("Legend1858").setAttribute("class", "ct_toggle ct1858 ct_hidden"); }
                // Gesamte Reihen zu den Cache Types auf hidden setzen.
                if (settings_map_hide_2 && settings_map_hide_9 && settings_map_hide_5 ) document.getElementById("LegendGreen").childNodes[0].setAttribute("class", "a_cat_displayed cat_hidden");
                if (settings_map_hide_3) document.getElementById("LegendYellow").childNodes[0].setAttribute("class", "a_cat_displayed cat_hidden");
                if (settings_map_hide_6 && settings_map_hide_453 && settings_map_hide_7005 && settings_map_hide_13 && settings_map_hide_1304) document.getElementById("LegendRed").childNodes[0].setAttribute("class", "a_cat_displayed cat_hidden");
                if (settings_map_hide_4 && settings_map_hide_11 && settings_map_hide_137) document.getElementById("chkLegendWhite").childNodes[0].setAttribute("class", "a_cat_displayed cat_hidden");
                if (settings_map_hide_8 && settings_map_hide_1858) document.getElementById("chkLegendBlue").childNodes[0].setAttribute("class", "a_cat_displayed cat_hidden");                
//<-- $$018 End of insert
            }
            window.addEventListener("load", hideCacheTypes, false);
        }
    } catch (e) {
        gclh_error("Hide found/hidden Caches / Cache Types on Map", e);
    }

//--> $$054 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Display Google-Maps warning (once)
//    try {
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
//            if (typeof(L) == "undefined" && typeof(unsafeWindow.L) == "undefined" && $(".leaflet-container").length == 0) {
//                if (!getValue("gclhWasGoogleAlertShown", false)) {
//                    function showGMapInfo() {
//                        if (typeof $ == "undefined") {
//                            $ = unsafeWindow.$;
//                        }
//
//                        if (typeof $.fancybox != "undefined") {
//                            $.fancybox({
//                                width: 780,
//                                height: 362,
//                                autoScale: false,
//                                padding: 0,
//                                margin: 0,
//                                href: "http://img43.imageshack.us/img43/8825/gcmapleaflet.png",
//                                scrolling: 'no',
//                                title: "GC Little Helper only supports the Leaflet-Map (you are using the Google-Map)",
//                                type: "image"
//                            });
//                        }
//                    }
//
//                    setTimeout(function () {
//                        if (browser == "chrome") {
//                            injectPageScriptFunction(showGMapInfo, "()");
//                        }
//                        else {
//                            showGMapInfo();
//                        }
//                        setValue("gclhWasGoogleAlertShown", true);
//                    }, 750);
//                }
//            }
//        }
//    } catch (e) {
//        gclh_error("Display Google-Maps warning", e);
//    }
//<-- $$054 End of delete 
            
//--> $$054 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Display Google-Maps warning. Hier wird eine Warnmeldung ausgegeben, wenn Leaflet-Map nicht aktiv ist.                        
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
            function checkMap( waitCount ) {
                // Wenn Leaflet-Map aktiv ist dann ist alles ok, aktiv merken.
                if ( document.getElementsByClassName("leaflet-container")[0] ) {
                    setValue("gclhLeafletMapActive", true);
                    return;
                }
                // Wenn die Auswahl zu "Set Map Preferences" gerade angezeigt wird, dann wird keine Leaflet-Map kommen,
                // deshalb machen wir hier nichts.
                if ( document.getElementsByClassName("container")[0] ) {
                    return;
                }
                waitCount++;
                if ( waitCount <= 5 ) {  // 5 Sekunden lang
                    setTimeout( function () { checkMap( waitCount ) }, 1000); 
                } else {
                    // Wenn Leaflet-Map nicht aktiv und die Auswahl zu "Set Map Preferences" auch nicht angezeigt wird,
                    // dann ist wohl Google aktiv. Prüfen, ob zuvor Leaflet-Map aktiv war, der Status sich also geändert 
                    // hat, dann Meldung ausgeben und neuen Status "nicht aktiv" merken.
                    if ( getValue("gclhLeafletMapActive", true) ) {
                        var mess = "Please note that GC little helper only supports\n"
                                 + "the Leaflet-Map. You are using the Google-Map.\n\n"
                                 + "You can change the map in the left sidebar with \n"
                                 + "the button \"Set Map Preferences\".";
                        alert( mess );
                        setValue("gclhLeafletMapActive", false);
                    }
                }
            }
            checkMap( 0 );
        }
    } catch (e) {
        gclh_error("Display Google-Maps warning", e);
    }
//<-- $$054 End of insert

// Count Fav-points
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/favorites\.aspx/)) {
            var table = getElementsByClass("Table BottomSpacing")[0];
            if (table) {
                var imgs = table.getElementsByTagName("img");
                var stats = new Object();
                var count = 0;
                if (imgs) {
                    for (var i = 0; i < imgs.length; i++) {
//--> $$004 Begin of insert
                        // Mail, Message und VIP Icons beim Zählen nicht beachten.
                        if ( imgs[i].title.match(/Send a m/) || imgs[i].title.match(/VIP/) ) continue;
//<-- $$004 End of insert
                        if (imgs[i].src) {
                            if (!stats[imgs[i].src]) stats[imgs[i].src] = 0;
                            stats[imgs[i].src]++;
                            count++;
                        }
                    }
                }

                var tr = document.createElement("tr");

                var td = document.createElement("td");
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                for (src in stats) {
                    var img = document.createElement("img");
                    img.src = src;
                    td.appendChild(img);
                    td.appendChild(document.createTextNode(" " + stats[src] + "  "));
                }
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                td.appendChild(document.createTextNode("Sum: " + count));
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                table.appendChild(tr);
            }
        }
    } catch (e) {
        gclh_error("Count Fav-Points", e);
    }

// Improve Fieldnotes
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/fieldnotes\.aspx/)) {
            function gclh_select_all() {
                var state = document.getElementById("gclh_all").checked;
                var all = document.getElementsByTagName("input");
                for (var i = 0; i < all.length; i++) {
                    if (all[i].id.match(/ctl00_ContentBody_LogList/)) {
                        all[i].checked = state;
                    }
                }
            }

            //Mark duplicate field notes
            var existingNotes = {};
            var link = null;
            var date = null;
            var type = null;
            $('.Table tr').each(function (i, e) {
                link = $(e).find('td a[href*="cache_details.aspx?guid"]');
                if (link.length > 0) {
                    date = $($(e).find('td')[2]).text();
                    type = $($(e).find('td')[3]).text();
                    if (existingNotes[link[0].href + date + type]) {
                        $(existingNotes[link[0].href + date + type]).find('td').css("background-color", "#FE9C9C");
                        $(e).find('td').css("background-color", "#FE9C9C");
                    }
                    else {
                        existingNotes[link[0].href + date + type] = e;
                    }
                }
            });

            var table = getElementsByClass("Table")[0];
            if (table) {
                var stats = new Object();
                var types = new Object();
                var count = 0;
                var imgs = table.getElementsByTagName("img");
                for (var i = 0; i < imgs.length; i++) {
                    if (imgs[i].src.match(/images\/logtypes/)) {
                        count++;
                        if (!stats[imgs[i].src]) stats[imgs[i].src] = 0;
                        stats[imgs[i].src]++;
                    } else {
                        if (!types[imgs[i].src]) types[imgs[i].src] = 0;
                        types[imgs[i].src]++;
                    }
                }

                // Select All - on Top
                var a = document.createElement("a");
                a.href = "javascript:void(0);";
                var img = document.createElement("img");
                img.width = 16;
                img.height = 16;
                img.src = "/images/silk/tick.png";
                img.alt = "Click to Check/Uncheck all Items";
                a.addEventListener("click", function () {
                    document.getElementById("gclh_all").click();
                }, false);
                a.appendChild(img);
                table.childNodes[1].childNodes[1].childNodes[1].appendChild(a);

                // Summenzeile
                var tr = document.createElement("tr");

                var td = document.createElement("td");
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.title = "Select All";
                checkbox.id = "gclh_all";
                checkbox.addEventListener("click", gclh_select_all, false);
                td.appendChild(checkbox);
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                for (src in types) {
                    var img = document.createElement("img");
                    img.src = src;
                    td.appendChild(img);
                    td.appendChild(document.createTextNode(" " + types[src] + "  "));
                }
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                td.style.verticalAlign = "top";
                var b = document.createElement("b");
                b.appendChild(document.createTextNode("Statistics"));
                td.appendChild(b);
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                for (src in stats) {
                    var img = document.createElement("img");
                    img.src = src;
                    td.appendChild(img);
                    td.appendChild(document.createTextNode(" " + stats[src] + "  "));
                }
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                var td = document.createElement("td");
                td.appendChild(document.createTextNode("Sum: " + count));
                td.style.backgroundColor = "#DFE1D2";
                tr.appendChild(td);

                table.appendChild(tr);
            }
        }
    } catch (e) {
        gclh_error("Improve Fieldnotes", e);
    }

// Edit-Link to own Caches in Profile
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/(default\.aspx|owned\.aspx)$/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/$/)) {
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/\/seek\/cache_details\.aspx\?/)) {
                    var headline = links[i].parentNode.parentNode.parentNode.childNodes[1].innerHTML;
                    if (headline) {
                        var match = links[i].href.match(/\/seek\/cache_details\.aspx\?guid=(.*)/);
                        if (match[1]) links[i].parentNode.innerHTML += " <a href='/hide/report.aspx?guid=" + match[1] + "'><img src='/images/stockholm/16x16/page_white_edit.gif'></a>";
                    }
                }
            }
        }

        // Image-Link at own caches
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/owned\.aspx/)) {
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/\/seek\/cache_details\.aspx\?/)) {
                    var headline = links[i].parentNode.parentNode.parentNode.childNodes[1].innerHTML;
                    if (headline) {
                        var match = links[i].href.match(/\/seek\/cache_details\.aspx\?guid=(.*)/);
                        if (match[1]) links[i].parentNode.innerHTML += " <a href='/seek/gallery.aspx?guid=" + match[1] + "'><img src='/images/stockholm/16x16/photos.gif'></a>";
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("Additinal Links to own Caches in Profile", e);
    }

// Hide TBs/Coins in Profile
    try {
        if (settings_hide_visits_in_profile && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\//)) {
            $(".Table.WordWrap tr").filter(function (index) {
                return $(this).find("img[src$='logtypes/75.png']").length !== 0;
            }).remove();
        }
    } catch (e) {
        gclh_error("Hide TBs/Coins in Profile", e);
    }

// Post log from Listing (inline)
    try {
        // iframe aufbauen und verbergen.             // $$047
        if (settings_log_inline && is_page("cache_listing") && document.getElementById("ctl00_ContentBody_MapLinks_MapLinks")) {
            var links = document.getElementsByTagName('a');

            var menu = false;
            var watch = false;
            var gallery = false;
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/log\.aspx\?ID/) && !menu) {
                    menu = links[i];
                } else if (links[i].href.match(/gallery\.aspx/) && !gallery && links[i].parentNode.tagName.toLowerCase() == "li") {
                    gallery = links[i];
                } else if (links[i].href.match(/watchlist\.aspx/) && !watch) {
                    watch = links[i];
                }
            }

            var head = document.getElementById("ctl00_ContentBody_MapLinks_MapLinks").parentNode.parentNode.nextSibling;

            function hide_iframe() {
                var frame = document.getElementById('gclhFrame');
                if (frame.style.display == "") frame.style.display = "none";
                else frame.style.display = "";
            }

            if (head && menu) {
                var match = menu.href.match(/\?ID=(.*)/);
                if (match && match[1]) {
                    var iframe = document.createElement("iframe");
                    iframe.setAttribute("id", "gclhFrame");
                    iframe.setAttribute("width", "100%");
                    iframe.setAttribute("height", "600px");
//--> $$047 Begin of change
//                    iframe.setAttribute("style", "border: 0px; overflow: auto; display: none;");
                    iframe.setAttribute("style", "border-top: 1px solid #b0b0b0; border-right: 0px; border-bottom: 1px solid #b0b0b0; border-left: 0px; overflow: auto; display: none;");
//<-- $$047 End of change
                    iframe.setAttribute("src", http + "://www.geocaching.com/seek/log.aspx?ID=" + match[1] + "&gclh=small");

                    var a = document.createElement("a");
                    a.setAttribute("href", "#gclhLogIt");
                    a.setAttribute("name", "gclhLogIt");
                    var img = document.createElement("img");
                    img.setAttribute("src", global_log_it_icon);
//--> $$047 Begin of insert
                    img.setAttribute("style", "margin-left: -10px;");
//<-- $$047 End of insert
                    img.setAttribute("border", "0");
                    a.appendChild(img);
                    a.addEventListener("click", hide_iframe, false);

                    head.parentNode.insertBefore(a, head);
                    head.parentNode.insertBefore(iframe, head);
                }

                var a = document.createElement("a");
                a.setAttribute("href", "#gclhLogIt");
                a.setAttribute("class", "lnk");
                a.setAttribute("style", "padding:0px;");
                a.innerHTML = "<img src='/images/stockholm/16x16/comment_add.gif'> <span style='padding-left:4px;'>Log your visit (inline)</span>";
                a.addEventListener("click", hide_iframe, false);

                var li = document.createElement('li');
                li.appendChild(a);

                var link = false;
                if (gallery) link = gallery;
                else link = watch;

                if (link) link.parentNode.parentNode.insertBefore(li, link.parentNode);
            }
        }
        
        // Im aufgebauten iframe, quasi nicht im Cache Listing.                   // $$047
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(.*)\&gclh\=small/)) { // Hide everything to be smart for the iframe :)
            if (document.getElementsByTagName('html')[0]) document.getElementsByTagName('html')[0].style.backgroundColor = "#FFFFFF";

            if (document.getElementsByTagName("header")[0]) document.getElementsByTagName("header")[0].style.display = "none";

            if (document.getElementById("Navigation")) document.getElementById("Navigation").style.display = "none";

            if (document.getElementById('ctl00_divBreadcrumbs')) document.getElementById('ctl00_divBreadcrumbs').style.display = "none";

            if (getElementsByClass('BottomSpacing')[0]) getElementsByClass('BottomSpacing')[0].style.display = "none";
            if (getElementsByClass('BottomSpacing')[1]) getElementsByClass('BottomSpacing')[1].style.display = "none";

            if (document.getElementById('divAdvancedOptions')) document.getElementById('divAdvancedOptions').style.display = "none";
            if (!settings_log_inline_tb && document.getElementById('ctl00_ContentBody_LogBookPanel1_TBPanel')) document.getElementById('ctl00_ContentBody_LogBookPanel1_TBPanel').style.display = "none";

            if (document.getElementById('ctl00_ContentBody_uxVistOtherListingLabel')) document.getElementById('ctl00_ContentBody_uxVistOtherListingLabel').style.display = "none";
            if (document.getElementById('ctl00_ContentBody_uxVistOtherListingGC')) document.getElementById('ctl00_ContentBody_uxVistOtherListingGC').style.display = "none";
            if (document.getElementById('ctl00_ContentBody_uxVisitOtherListingButton')) document.getElementById('ctl00_ContentBody_uxVisitOtherListingButton').style.display = "none";

            if (document.getElementById('ctl00_divContentSide')) document.getElementById('ctl00_divContentSide').style.display = "none";

            if (document.getElementById('UtilityNav')) document.getElementById('UtilityNav').style.display = "none";

            if (document.getElementsByTagName("footer")[0]) document.getElementsByTagName("footer")[0].style.display = "none";

            if (getElementsByClass('container')[1]) getElementsByClass('container')[1].style.display = "inline";

            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                links[i].setAttribute("target", "_blank");
            }
//--> $$047 Begin of insert
            var css = "";
            css += "#Content, #Content .container, .span-20 {width: " + ( parseInt( getValue("settings_new_width") ) - 60 ) + "px;} ";
            css += ".PostLogList .Textarea {height: 175px;} ";
            appendCssStyle(css);
//<-- $$047 End of insert
        }
    } catch (e) {
        gclh_error("Inline Logging", e);
    }

// Post log from PMO-Listing as Basic Member(inline)
    try {
        // iframe aufbauen und verbergen.             // $$048
//--> $$048 Begin of change
//        if (settings_log_inline_pmo4basic && is_page("cache_listing") && document.getElementById("ctl00_ContentBody_memberComparePanel")) {
        if ( settings_log_inline_pmo4basic && is_page("cache_listing") && 
             ( document.getElementById("ctl00_ContentBody_memberComparePanel") || 
               document.getElementsByClassName("pmo-banner")[0]                ||
               document.getElementsByClassName("pmo-upsell")[0]                   ) ) {
//<-- $$048 End of change
            function hide_iframe() {
                var frame = document.getElementById('gclhFrame');
                if (frame.style.display == "") frame.style.display = "none";
                else frame.style.display = "";
            }

            var idParameter = null;
            if (document.URL.match(/wp=[a-zA-Z0-9]*|guid=[a-zA-Z0-9-]*|id=[0-9]*/)) idParameter = document.URL.match(/wp=[a-zA-Z0-9]*|guid=[a-zA-Z0-9-]*|id=[0-9]*/)[0];
            if (!idParameter | idParameter == "") idParameter = "wp=" + document.URL.match(/\/geocache\/([^_]*)/)[1];

            var iframe = document.createElement("iframe");
            iframe.setAttribute("id", "gclhFrame");
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "600px");
//--> $$048 Begin of change
//            iframe.setAttribute("style", "border: 0px; overflow: auto; display: none;");
            iframe.setAttribute("style", "margin-bottom: 50px; border-top: 1px solid #b0b0b0; border-right: 0px; border-bottom: 1px solid #b0b0b0; border-left: 0px; overflow: auto; display: none;");
//<-- $$048 End of change
            iframe.setAttribute("src", http + "://www.geocaching.com/seek/log.aspx?" + idParameter + "&gclh=small");

            var a = document.createElement("a");
            a.setAttribute("href", "#gclhLogIt");
            a.setAttribute("name", "gclhLogIt");
//--> $$048 Begin of insert
            a.setAttribute("style", "border-bottom: 0px;");
//<-- $$048 End of insert
            var img = document.createElement("img");
            img.setAttribute("src", global_log_it_icon);
//--> $$048 Begin of insert
            img.setAttribute("style", "margin-left: 350px; margin-top: 40px; margin-bottom: 50px;");
//<-- $$048 End of insert
            img.setAttribute("border", "0");
            a.appendChild(img);
            a.addEventListener("click", hide_iframe, false);

//--> $$048 Begin of change
//            var banner = document.getElementById("ctl00_ContentBody_memberComparePanel");
            var banner = document.getElementsByClassName("pmo-banner")[0];
//<-- $$048 End of change

            banner.parentNode.insertBefore(a, banner);
            banner.parentNode.insertBefore(iframe, banner);
        }
        // Im aufgebauten iframe, quasi nicht im Cache Listing.                   // $$048
        else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?(ID|guid|wp)\=[a-zA-Z0-9-]*\&gclh\=small/)) { // Hide everything to be smart for the iframe :)
            if (document.getElementsByTagName('html')[0]) document.getElementsByTagName('html')[0].style.backgroundColor = "#FFFFFF";

            if (document.getElementsByTagName("header")[0]) document.getElementsByTagName("header")[0].style.display = "none";

            if (document.getElementById('ctl00_divBreadcrumbs')) document.getElementById('ctl00_divBreadcrumbs').style.display = "none";

            if (getElementsByClass('BottomSpacing')[0]) getElementsByClass('BottomSpacing')[0].style.display = "none";
            if (getElementsByClass('BottomSpacing')[1]) getElementsByClass('BottomSpacing')[1].style.display = "none";

            if (document.getElementById('divAdvancedOptions')) document.getElementById('divAdvancedOptions').style.display = "none";
            if (!settings_log_inline_tb && document.getElementById('ctl00_ContentBody_LogBookPanel1_TBPanel')) document.getElementById('ctl00_ContentBody_LogBookPanel1_TBPanel').style.display = "none";

            if (document.getElementById('ctl00_ContentBody_uxVistOtherListingLabel')) document.getElementById('ctl00_ContentBody_uxVistOtherListingLabel').style.display = "none";
            if (document.getElementById('ctl00_ContentBody_uxVistOtherListingGC')) document.getElementById('ctl00_ContentBody_uxVistOtherListingGC').style.display = "none";
            if (document.getElementById('ctl00_ContentBody_uxVisitOtherListingButton')) document.getElementById('ctl00_ContentBody_uxVisitOtherListingButton').style.display = "none";

            if (document.getElementById('ctl00_divContentSide')) document.getElementById('ctl00_divContentSide').style.display = "none";

            if (document.getElementById('UtilityNav')) document.getElementById('UtilityNav').style.display = "none";

            if (document.getElementsByTagName("footer")[0]) document.getElementsByTagName("footer")[0].style.display = "none";

            if (getElementsByClass('container')[1]) getElementsByClass('container')[1].style.display = "inline";

            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                links[i].setAttribute("target", "_blank");
            }
//--> $$048 Begin of insert
            var css = "";
            css += "#Content, #Content .container, .span-20 {width: 780px;} ";
            css += ".PostLogList .Textarea {height: 175px;} ";
            appendCssStyle(css);
//<-- $$048 End of insert
        }
    } catch (e) {
        gclh_error("Inline PMO Logging", e);
    }

//--> $$048 Begin of insert
// Loggen über Standard "Log It" Icons zu Premium Only Caches für Basic Members.  
    try {
        if ( settings_logit_for_basic_in_pmo ) {
            if ( document.getElementsByClassName('premium') ) { 
                var premiumTeile = document.getElementsByClassName('premium');
                for (var i = 0; i < premiumTeile.length; i++) {
                    if ( premiumTeile[i].href.match(/\/seek\/log\.aspx\?ID=/) ) {
                        premiumTeile[i].addEventListener("click", function() { buildLogItLink( this ); }, false);
                    }
                }
            }
        }
    } catch (e) {
        gclh_error("logit for basic in pmo", e);
    }

// Link ausführen trotz Tool Tipp.
    function buildLogItLink( premiumTeil ) {
        if ( premiumTeil.href.match(/\/seek\/log\.aspx\?ID=/) ) {
            if ( premiumTeil.href.match(/www\.geocaching\.com\//) ) { var href = premiumTeil.href; }
            else { var href = "https://www.geocaching.com" +  premiumTeil.href; }
            location = href;
        }
    }   
//<-- $$048 End of insert
    
// Append '&visitcount=1' to all geochecker.com links (on listing pages)
    try {
        if (settings_visitCount_geocheckerCom && is_page("cache_listing")) {
            $('a[href^="http://www.geochecker.com/index.php?code="]').filter(':not([href*="visitcount=1"])').attr('href', function (i, str) {
                return str + '&visitcount=1';
            }).attr('rel', 'noreferrer');
        }
    } catch (e) {
        gclh_error("Append '&visitcount=1' to all geochecker.com links (on listing pages)", e);
    }

// Show amount of different Coins in public profile
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//) && document.getElementById('ctl00_ContentBody_ProfilePanel1_lnkCollectibles') && document.getElementById('ctl00_ContentBody_ProfilePanel1_lnkCollectibles').className == "Active") {

            function gclh_coin_stats(table_id) {
                var table = document.getElementById(table_id).getElementsByTagName("table");
                table = table[0];
                var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                var sums = new Object();
                sums["tbs"] = 0;
                sums["coins"] = 0;
                sums["patches"] = 0;
                sums["signal"] = 0;
                sums["unknown"] = 0;
                var diff = new Object();
                diff["tbs"] = 0;
                diff["coins"] = 0;
                diff["patches"] = 0;
                diff["signal"] = 0;
                diff["unknown"] = 0;

                for (var i = 0; i < (rows.length - 1); i++) {
                    if (rows[i].innerHTML.match(/travel bug/i)) {
                        diff["tbs"]++;
                        sums["tbs"] += parseInt(rows[i].childNodes[5].innerHTML, 10);
                    } else if (rows[i].innerHTML.match(/geocoin/i)) {
                        diff["coins"]++;
                        sums["coins"] += parseInt(rows[i].childNodes[5].innerHTML, 10);
                    } else if (rows[i].innerHTML.match(/geopatch/i)) {
                        diff["patches"]++;
                        sums["patches"] += parseInt(rows[i].childNodes[5].innerHTML, 10);
                    } else if (rows[i].innerHTML.match(/signal/i)) {
                        diff["signal"]++;
                        sums["signal"] += parseInt(rows[i].childNodes[5].innerHTML, 10);
                    } else {
                        diff["unknown"]++;
                        sums["unknown"] += parseInt(rows[i].childNodes[5].innerHTML, 10);
                    }
                }

                var tfoot = table.getElementsByTagName("tfoot")[0];
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var new_table = "";
                td.colSpan = 3;

                new_table += "<table>";
                new_table += "  <tr>";
                new_table += "    <td></td>";
                new_table += "    <td><b>Sum</b></td>";
                new_table += "    <td><b>Different</b></td>";
                new_table += "  </tr>";
                new_table += "  <tr>";
                new_table += "    <td><b>Travel Bugs:</b></td>";
                new_table += "    <td style='text-align: center;'>" + sums["tbs"] + "</td>";
                new_table += "    <td style='text-align: center;'>" + diff["tbs"] + "</td>";
                new_table += "  </tr>";
                new_table += "  <tr>";
                new_table += "    <td><b>Geocoins:</b></td>";
                new_table += "    <td style='text-align: center;'>" + sums["coins"] + "</td>";
                new_table += "    <td style='text-align: center;'>" + diff["coins"] + "</td>";
                new_table += "  </tr>";
                new_table += "  <tr>";
                new_table += "    <td><b>Geopatches:</b></td>";
                new_table += "    <td style='text-align: center;'>" + sums["patches"] + "</td>";
                new_table += "    <td style='text-align: center;'>" + diff["patches"] + "</td>";
                new_table += "  </tr>";
                new_table += "  <tr>";
                new_table += "    <td><b>Signal Tags:</b></td>";
                new_table += "    <td style='text-align: center;'>" + sums["signal"] + "</td>";
                new_table += "    <td style='text-align: center;'>" + diff["signal"] + "</td>";
                new_table += "  </tr>";
                if (sums["unknown"] > 0 || diff["unknown"] > 0) {
                    new_table += "  <tr>";
                    new_table += "    <td><b>Unknown:</b></td>";
                    new_table += "    <td style='text-align: center;'>" + sums["unknown"] + "</td>";
                    new_table += "    <td style='text-align: center;'>" + diff["unknown"] + "</td>";
                    new_table += "  </tr>";
                    new_table += "</table>";
                }

                td.innerHTML = new_table;

                tr.appendChild(td);
                tfoot.appendChild(tr);
            }

//--> $$058 Begin of change
//            gclh_coin_stats("ctl00_ContentBody_ProfilePanel1_dlCollectibles");
//            gclh_coin_stats("ctl00_ContentBody_ProfilePanel1_dlCollectiblesOwned");
            if ( document.getElementById("ctl00_ContentBody_ProfilePanel1_dlCollectibles") ) gclh_coin_stats("ctl00_ContentBody_ProfilePanel1_dlCollectibles");
            if ( document.getElementById("ctl00_ContentBody_ProfilePanel1_dlCollectiblesOwned") ) gclh_coin_stats("ctl00_ContentBody_ProfilePanel1_dlCollectiblesOwned");
//<-- $$058 End of change
        }
    } catch (e) {
        gclh_error("Show Coin-Sums", e);
    }

// Auto-Visit
    try {
        if (settings_autovisit && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx/) && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/log\.aspx\?LUID=/) && !document.getElementById('ctl00_ContentBody_LogBookPanel1_CoordInfoLinkControl1_uxCoordInfoCode')) {
            function gclh_autovisit_save() {
                var match = this.value.match(/([0-9]*)/);
                if (!this.checked) {
                    setValue("autovisit_" + match[1], false);
                } else {
                    setValue("autovisit_" + match[1], true);
                }
            }

            // Add new option
            var selects = document.getElementsByTagName("select");
            for (var i = 0; i < selects.length; i++) {
                if (selects[i].id.match(/ctl00_ContentBody_LogBookPanel1_uxTrackables_repTravelBugs_ctl[0-9]*_ddlAction/)) {
                    var val = selects[i].childNodes[1].value;
                    var autovisit = document.createElement("input");
                    autovisit.setAttribute("type", "checkbox");
                    autovisit.setAttribute("id", selects[i].id + "_auto");
                    autovisit.setAttribute("value", val);
                    if (getValue("autovisit_" + val, false)) {
                        autovisit.setAttribute("checked", "checked");
                        selects[i].selectedIndex = 2;
                    }
                    autovisit.addEventListener("click", gclh_autovisit_save, false);

                    selects[i].parentNode.appendChild(autovisit);
                    selects[i].parentNode.appendChild(document.createTextNode(" AutoVisit"));
                }
            }

            // Select AutoVisit
            function gclh_autovisit() {
                var logtype = document.getElementById("ctl00_ContentBody_LogBookPanel1_ddLogType").value;
                if (logtype == 2 || logtype == 10 || logtype == 11) {
                    var selects = document.getElementsByTagName("select");
                    for (var i = 0; i < selects.length; i++) {
                        if (selects[i].id.match(/ctl00_ContentBody_LogBookPanel1_uxTrackables_repTravelBugs_ctl[0-9]*_ddlAction/)) {
                            var val = selects[i].childNodes[1].value;
                            if (getValue("autovisit_" + val, false)) {
                                var logoptions = selects[i].getElementsByTagName("option");
                                for (var k = 0; k < logoptions.length; k++) {
                                    if (logoptions[k].value == val + "_Visited") {
                                        selects[i].selectedIndex = k;
                                        break;
                                    }
                                }
                                document.getElementById("ctl00_ContentBody_LogBookPanel1_uxTrackables_hdnSelectedActions").value += val + "_Visited,";
                            }
                        }
                    }
                } else {
                    var selects = document.getElementsByTagName("select");
                    for (var i = 0; i < selects.length; i++) {
                        if (selects[i].id.match(/ctl00_ContentBody_LogBookPanel1_uxTrackables_repTravelBugs_ctl[0-9]*_ddlAction/) && selects[i].value.match(/_Visited/)) {
                            selects[i].selectedIndex = 0;
                        }
                    }
                }
                if (unsafeWindow.setSelectedActions) {
                    unsafeWindow.setSelectedActions();
                }
            }

            if (document.getElementById("ctl00_ContentBody_LogBookPanel1_ddLogType")) {
                window.addEventListener("load", gclh_autovisit, false);
                document.getElementById("ctl00_ContentBody_LogBookPanel1_ddLogType").addEventListener("click", gclh_autovisit, false);
            }
        }
    } catch (e) {
        gclh_error("Autovisit", e);
    }

// VIP
    try {
//--> $$003 Begin of change
//        if (settings_show_vip_list && $('.li-user-info').children().first() && (is_page("cache_listing") || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\//) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/myfriends\.aspx/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//))) {
        if ( settings_show_vip_list                                                                    && 
//--> $$048 Begin of insert
             !isMemberInPmoCache()                                                                     &&
//<-- $$048 End of insert
             $('.li-user-info').children().first()                                                     && 
             !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/geocaches\.aspx/)    &&         // Nicht bei Geocaching Logs
             !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/travelbugs\.aspx/)   &&         // Nicht bei Travelbugs
             !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/benchmarks\.aspx/)   &&         // Nicht bei Benchmarks
             ( is_page("cache_listing")                                                                   ||      // Cache Listing
//--> $$022 Begin of insert
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx/)     ||      // TB Listing
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek|track)\/log\.aspx/)  ||      // Post, Edit, View Cache-Logs und TB-Logs
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/email\/\?guid=/)           ||      // Mail schreiben
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/inventory\.aspx/)      ||      // TB Inventar
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/favorites\.aspx/)      ||      // Eigene Favoriten
//<-- $$022 End of insert
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my/)                       ||      // Profil
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/default\.aspx/)        ||      // Profil (Quicklist)
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//)                ||      // Öffentliches Profil
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/myfriends\.aspx/)         )) { // Friends
//<-- $$003 End of change
            var img_vip_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDhEzBX83tZcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAsElEQVQoz6WSsQ2DUAxEz4gdfkdBQQUlDAU9E0ALHQWLsMAfA8o/BNVLkYCS0ETkGstn6+kk2yShPxRLEtxjmJmio8nzXN57SZL3XkVRnEtHNTNlWaZ5nj9AAHRdR9M0ANR1Td/38Iz2UZdlIUmS0zsB67rinGPfd5xzbNt2AUgiTVOmaboCAMqypG1bqqo6ve8E77oAhmEgiiLGcbwHCCEQxzEhhJ8B9hrcPqP9+0gPbh/tf/c8szwAAAAASUVORK5CYII=";
            var img_vip_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDhE0Aq4StvMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAzklEQVQoz6WSwQvBcBTHP7/lanFT3DdzV9yw+RNc8E/s6A/YSa6KUrs4u4omB6KUKJoc5a+Q5rRlOCz7Xl7feu/zXu89AXjEUAKgszb/KrbKPSTfDJo2t8MdgNvhzrBlB0l+tMo9+o0R+8kxgASAgqFynrsAnGYumqF+deysTepmhZW9/QZouoLrXHk+nlwWVzRd+TnytOtQahfDOwBI51LImSTLwQo5I5POpn5O8Cnp3WiGyma8o1BXIi8yDKgpCEmQr0YHCMCLc0YR95Fe0bc6eQ97MqYAAAAASUVORK5CYII=";
            var vips = getValue("vips", false);
            if (!vips) vips = new Array();
            else {
                if (vips.match(/\\x/)) {  // Temporary fix for old data ..
                    vips = vips.replace(/\\x21/g, "!");
                    vips = vips.replace(/\\x22/g, "\"");
                    vips = vips.replace(/\\x23/g, "#");
                    vips = vips.replace(/\\x24/g, "$");
                    vips = vips.replace(/\\x25/g, "%");
                    vips = vips.replace(/\\x26/g, "&");
                    vips = vips.replace(/\\x27/g, "'");
                    vips = vips.replace(/\\x28/g, "(");
                    vips = vips.replace(/\\x29/g, ")");
                    vips = vips.replace(/\\x2A/g, "*");
                    vips = vips.replace(/\\x2B/g, "+");
                    vips = vips.replace(/\\x2C/g, ",");
                    vips = vips.replace(/\\x2F/g, "/");
                    vips = vips.replace(/\\x3A/g, ":");
                    vips = vips.replace(/\\x3B/g, ";");
                    vips = vips.replace(/\\x3C/g, "<");
                    vips = vips.replace(/\\x3D/g, "=");
                    vips = vips.replace(/\\x3E/g, ">");
                    vips = vips.replace(/\\x3F/g, "?");
                    vips = vips.replace(/\\x40/g, "@");
                    vips = vips.replace(/\\x5B/g, "[");
                    vips = vips.replace(/\\x5C/g, "\\");
                    vips = vips.replace(/\\x5D/g, "]");
                    vips = vips.replace(/\\x5E/g, "^");
                    vips = vips.replace(/\\x60/g, "`");
                    vips = vips.replace(/\\x7B/g, "{");
                    vips = vips.replace(/\\x7C/g, "|");
                    vips = vips.replace(/\\x7D/g, "}");
                    vips = vips.replace(/\\x7E/g, "~");
                    vips = vips.replace(/\\xA0/g, " ");
                    vips = vips.replace(/\\xA1/g, "¡");
                    vips = vips.replace(/\\xA2/g, "¢");
                    vips = vips.replace(/\\xA3/g, "£");
                    vips = vips.replace(/\\xA4/g, "¤");
                    vips = vips.replace(/\\xA5/g, "¥");
                    vips = vips.replace(/\\xA6/g, "¦");
                    vips = vips.replace(/\\xA7/g, "§");
                    vips = vips.replace(/\\xA8/g, "¨");
                    vips = vips.replace(/\\xA9/g, "©");
                    vips = vips.replace(/\\xAA/g, "ª");
                    vips = vips.replace(/\\xAB/g, "«");
                    vips = vips.replace(/\\xAC/g, "¬");
                    vips = vips.replace(/\\xAD/g, "­");
                    vips = vips.replace(/\\xAE/g, "®");
                    vips = vips.replace(/\\xAF/g, "¯");
                    vips = vips.replace(/\\xB0/g, "°");
                    vips = vips.replace(/\\xB1/g, "±");
                    vips = vips.replace(/\\xB2/g, "²");
                    vips = vips.replace(/\\xB3/g, "³");
                    vips = vips.replace(/\\xB4/g, "´");
                    vips = vips.replace(/\\xB5/g, "µ");
                    vips = vips.replace(/\\xB6/g, "¶");
                    vips = vips.replace(/\\xB7/g, "·");
                    vips = vips.replace(/\\xB8/g, "¸");
                    vips = vips.replace(/\\xB9/g, "¹");
                    vips = vips.replace(/\\xBA/g, "º");
                    vips = vips.replace(/\\xBB/g, "»");
                    vips = vips.replace(/\\xBC/g, "¼");
                    vips = vips.replace(/\\xBD/g, "½");
                    vips = vips.replace(/\\xBE/g, "¾");
                    vips = vips.replace(/\\xBF/g, "¿");
                    vips = vips.replace(/\\xC0/g, "À");
                    vips = vips.replace(/\\xC1/g, "Á");
                    vips = vips.replace(/\\xC2/g, "Â");
                    vips = vips.replace(/\\xC3/g, "Ã");
                    vips = vips.replace(/\\xC4/g, "Ä");
                    vips = vips.replace(/\\xC5/g, "Å");
                    vips = vips.replace(/\\xC6/g, "Æ");
                    vips = vips.replace(/\\xC7/g, "Ç");
                    vips = vips.replace(/\\xC8/g, "È");
                    vips = vips.replace(/\\xC9/g, "É");
                    vips = vips.replace(/\\xCA/g, "Ê");
                    vips = vips.replace(/\\xCB/g, "Ë");
                    vips = vips.replace(/\\xCC/g, "Ì");
                    vips = vips.replace(/\\xCD/g, "Í");
                    vips = vips.replace(/\\xCE/g, "Î");
                    vips = vips.replace(/\\xCF/g, "Ï");
                    vips = vips.replace(/\\xD0/g, "Ð");
                    vips = vips.replace(/\\xD1/g, "Ñ");
                    vips = vips.replace(/\\xD2/g, "Ò");
                    vips = vips.replace(/\\xD3/g, "Ó");
                    vips = vips.replace(/\\xD4/g, "Ô");
                    vips = vips.replace(/\\xD5/g, "Õ");
                    vips = vips.replace(/\\xD6/g, "Ö");
                    vips = vips.replace(/\\xD7/g, "×");
                    vips = vips.replace(/\\xD8/g, "Ø");
                    vips = vips.replace(/\\xD9/g, "Ù");
                    vips = vips.replace(/\\xDA/g, "Ú");
                    vips = vips.replace(/\\xDB/g, "Û");
                    vips = vips.replace(/\\xDC/g, "Ü");
                    vips = vips.replace(/\\xDD/g, "Ý");
                    vips = vips.replace(/\\xDE/g, "Þ");
                    vips = vips.replace(/\\xDF/g, "ß");
                    vips = vips.replace(/\\xE0/g, "à");
                    vips = vips.replace(/\\xE1/g, "á");
                    vips = vips.replace(/\\xE2/g, "â");
                    vips = vips.replace(/\\xE3/g, "ã");
                    vips = vips.replace(/\\xE4/g, "ä");
                    vips = vips.replace(/\\xE5/g, "å");
                    vips = vips.replace(/\\xE6/g, "æ");
                    vips = vips.replace(/\\xE7/g, "ç");
                    vips = vips.replace(/\\xE8/g, "è");
                    vips = vips.replace(/\\xE9/g, "é");
                    vips = vips.replace(/\\xEA/g, "ê");
                    vips = vips.replace(/\\xEB/g, "ë");
                    vips = vips.replace(/\\xEC/g, "ì");
                    vips = vips.replace(/\\xED/g, "í");
                    vips = vips.replace(/\\xEE/g, "î");
                    vips = vips.replace(/\\xEF/g, "ï");
                    vips = vips.replace(/\\xF0/g, "ð");
                    vips = vips.replace(/\\xF1/g, "ñ");
                    vips = vips.replace(/\\xF2/g, "ò");
                    vips = vips.replace(/\\xF3/g, "ó");
                    vips = vips.replace(/\\xF4/g, "ô");
                    vips = vips.replace(/\\xF5/g, "õ");
                    vips = vips.replace(/\\xF6/g, "ö");
                    vips = vips.replace(/\\xF7/g, "÷");
                    vips = vips.replace(/\\xF8/g, "ø");
                    vips = vips.replace(/\\xF9/g, "ù");
                    vips = vips.replace(/\\xFA/g, "ú");
                    vips = vips.replace(/\\xFB/g, "û");
                    vips = vips.replace(/\\xFC/g, "ü");
                    vips = vips.replace(/\\xFD/g, "ý");
                    vips = vips.replace(/\\xFE/g, "þ");
                    vips = vips.replace(/\\xFF/g, "ÿ");
                }
                vips = vips.replace(/, (?=,)/g, ",null");
                vips = JSON.parse(vips);
            }
            var myself = $('.li-user-info').children().first().text();
            var gclh_build_vip_list = function () {
            };

            // Add to VIP - image
            function gclh_add_vip() {
//              var user = trim(this.name);     // Es gibt wirklich User mit Leerzeichen am Ende ...
                var user = this.name;

                vips.push(user);
                vips.sort(caseInsensitiveSort);
                setValue("vips", JSON.stringify(vips));

                var icons = document.getElementsByName(user);
                for (var i = 0; i < icons.length; i++) {
                    var img = icons[i].childNodes[0];
                    img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                    img.setAttribute("title", "Remove User " + user + " from VIP-List");
                    img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                    icons[i].removeEventListener("click", gclh_add_vip, false);
                    icons[i].addEventListener("click", gclh_del_vip, false);
                }

                gclh_build_vip_list();
//--> $$040 Begin of insert
                setLinesColorVip( user );
//<-- $$040 End of insert
            }

            function gclh_del_vip() {
                var vips_new = new Array();
//              var user = trim(this.name);     // Es gibt wirklich User mit Leerzeichen am Ende ...
                var user = this.name;

                for (var i = 0; i < vips.length; i++) {
                    if (vips[i] != user) vips_new.push(vips[i]);
                }
                vips = vips_new;
                setValue("vips", JSON.stringify(vips));

                var icons = document.getElementsByName(user);
                for (var i = 0; i < icons.length; i++) {
                    var img = icons[i].childNodes[0];
                    img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                    img.setAttribute("title", "Add User " + user + " to VIP-List");
                    img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                    icons[i].removeEventListener("click", gclh_del_vip, false);
                    icons[i].addEventListener("click", gclh_add_vip, false);
                }

                gclh_build_vip_list();
//--> $$040 Begin of insert
                setLinesColorVip( user );
//<-- $$040 End of insert
            }

            // Listing
            if (is_page("cache_listing")) {
                var all_users = new Array();
                var log_infos = new Object();
                var log_infos_long = new Array();
                var index = 0;
                var links = document.getElementsByTagName('a');
                var owner = "";
                var owner_name = "";
                if (document.getElementById('ctl00_ContentBody_mcd1')) {
                    // ka, warum zwei Variablen - vllt. hab ich schonmal versucht das Freitext-Owner-Problem mit der GUID zu umgehen?!
                    owner = get_real_owner();
                    if (!owner) owner = urldecode(document.getElementById('ctl00_ContentBody_mcd1').childNodes[1].innerHTML);
                    owner_name = owner;
                }

                for (var i = 0; i < links.length; i++) {
                    if (links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=/) && links[i].parentNode.className != "logOwnerStats" && !links[i].childNodes[0].src) {
                        if (links[i].id) links[i].name = links[i].id; // To be able to jump to this location

                        var matches = links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=([a-zA-Z0-9]*)/);
//                      var user = trim(links[i].innerHTML);     // Es gibt wirklich User mit Leerzeichen am Ende ...
//--> $$004 Begin of change
//                        var user = links[i].innerHTML;
                        var user = decode_innerHTML(links[i]);
//<-- $$004 End of change
                        if (links[i].parentNode.id == "ctl00_ContentBody_mcd1") {
                            user = owner;
                        }

                        // Icon
                        var link = document.createElement("a");
                        var img = document.createElement("img");
                        img.setAttribute("border", "0");
                        link.appendChild(img);
                        link.setAttribute("href", "javascript:void(0);");
                        link.setAttribute("name", user);

                        if (in_array(user, vips)) {
                            img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                            img.setAttribute("title", "Remove User " + user + " from VIP-List");
                            img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                            link.addEventListener("click", gclh_del_vip, false);
                        } else {
                            img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                            img.setAttribute("title", "Add User " + user + " to VIP-List");
                            img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                            link.addEventListener("click", gclh_add_vip, false);
                        }

//                      links[i].parentNode.appendChild(document.createTextNode("   "));
//                      links[i].parentNode.appendChild(link);
                        links[i].parentNode.insertBefore(link, links[i].nextSibling);
//--> $$004 Begin of change
//                        links[i].parentNode.insertBefore(document.createTextNode("   "), links[i].nextSibling);
                        links[i].parentNode.insertBefore(document.createTextNode(" "), links[i].nextSibling);
//<-- $$004 End of change
                    }
                }

                // Show VIP List
                var map = document.getElementById("ctl00_ContentBody_detailWidget");
                var box = document.createElement("div");
                var headline = document.createElement("h3");
                var body = document.createElement("div");
                box.setAttribute("class", "CacheDetailNavigationWidget NoPrint");
                headline.setAttribute("class", "WidgetHeader");
                body.setAttribute("class", "WidgetBody");
                body.setAttribute("id", "gclh_vip_list");
                headline.innerHTML = "<img width=\"16\" height=\"16\" title=\"VIP-List\" alt=\"VIP-List\" src=\"" + http + "://www.geocaching.com/images/icons/icon_attended.gif\"> VIP-List";
                box.appendChild(headline);
                box.appendChild(body);
//--> $$045 Begin of change
//                box.innerHTML = "<br>" + box.innerHTML;
                box.setAttribute("style", "margin-top: 1.5em;");
//<-- $$045 End of change 
                map.parentNode.insertBefore(box, map);
//--> $$045 Begin of delete
//                map.parentNode.insertBefore(document.createElement("p"), map);
//<-- $$045 End of delete 

                // Show VIP List "not found"
                if (settings_vip_show_nofound) {
                    var box2 = document.createElement("div");
                    var headline2 = document.createElement("h3");
                    var body2 = document.createElement("div");
                    box2.setAttribute("class", "CacheDetailNavigationWidget NoPrint");
                    headline2.setAttribute("class", "WidgetHeader");
                    body2.setAttribute("class", "WidgetBody");
                    body2.setAttribute("id", "gclh_vip_list_nofound");
                    headline2.innerHTML = "<img width=\"16\" height=\"16\" title=\"VIP-List\" alt=\"VIP-List\" src=\"" + http + "://www.geocaching.com/images/icons/icon_attended.gif\"> VIP-List \"not found\"";
                    box2.appendChild(headline2);
                    box2.appendChild(body2);
                    box2.innerHTML = box2.innerHTML;
                    map.parentNode.insertBefore(box2, map);
//--> $$045 Begin of delete
//                    map.parentNode.insertBefore(document.createElement("p"), map);
//<-- $$045 End of delete 
                }

                var css = "a.gclh_log:hover { " +
                    "  text-decoration:underline;" +
                    "  position: relative;" +
                    "}" +
                    "a.gclh_log span {" +
                    "  display: none;" +
                    "  position: absolute;" +
                    "  top:-310px;" +
                    "  left:-705px;" +
                    "  width: 700px;" +
                    "  padding: 2px;" +
                    "  text-decoration:none;" +
                    "  text-align:left;" +
                    "  vertical-align:top;" +
                    "  color: #000000;" +
                    "}" +
                    "a.gclh_log:hover span { " +
                    "  display: block;" +
                    "  top: 10px;" +
                    "  border: 1px solid #8c9e65;" +
                    "  background-color:#dfe1d2;" +
                    "  z-index:10000;" +
                    "}";
                GM_addStyle(css);

                gclh_build_vip_list = function () {
                    var show_owner = settings_show_owner_vip_list;
                    var list = document.getElementById("gclh_vip_list");
                    list.innerHTML = "";

                    // Liste "not found"-VIPs
                    var list_nofound = false;
                    if (document.getElementById("gclh_vip_list_nofound")) {
                        list_nofound = document.getElementById("gclh_vip_list_nofound");
                        list_nofound.innerHTML = "";
                    }
                    users_found = new Array();

                    function gclh_build_long_list() {
//--> $$039 Begin of insert
                        if ( getValue("settings_load_logs_with_gclh") == false ) return;
//<-- $$039 End of insert
                        for (var i = 0; i < log_infos_long.length; i++) {
                            var user = log_infos_long[i]["user"];
                            if (in_array(user, vips) || user == owner_name) {
                                if (!log_infos_long[i]["date"]) continue;

                                if (log_infos_long[i]["icon"].match(/\/(2|10)\.png$/)) users_found.push(user); // fuer not found liste

                                var span = document.createElement("span");
                                var profile = document.createElement("a");
                                profile.setAttribute("href", http + "://www.geocaching.com/profile/?u=" + urlencode(user));
                                profile.innerHTML = user;
                                if (owner_name && owner_name == user) {
                                    profile.style.color = '#8C0B0B';
                                } else if (user == myself) {
                                    profile.style.color = '#778555';
                                }
//--> $$026 Begin of insert
                                if ( settings_show_mail_in_viplist && settings_show_mail && settings_show_vip_list ) noBreakInLine( profile, 93, user );
                                else noBreakInLine( profile, 112, user );
//<-- $$026 End of insert
                                span.appendChild(profile);

                                // VIP-Link
                                var link = document.createElement("a");
                                var img = document.createElement("img");
                                img.setAttribute("border", "0");
                                link.appendChild(img);
                                link.setAttribute("href", "javascript:void(0);");
                                link.setAttribute("name", user);

                                if (owner_name && owner_name == user && !in_array(user, vips)) {
                                    img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                                    img.setAttribute("title", "Add User " + user + " to VIP-List");
                                    img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                                    link.addEventListener("click", gclh_add_vip, false);
                                } else {
                                    img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                                    img.setAttribute("title", "Remove User " + user + " from VIP-List");
                                    img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                                    link.addEventListener("click", gclh_del_vip, false);
                                }

                                // Log-Date and Link
                                var log_text = document.createElement("span");
                                log_text.innerHTML = "<img src='" + log_infos_long[i]["icon"] + "'> <b>" + user + " - " + log_infos_long[i]["date"] + "</b><br/>" + log_infos_long[i]["log"];
                                var log_img = document.createElement("img");
                                var log_link = document.createElement("a");
                                log_link.setAttribute("href", "#" + log_infos_long[i]["id"]);
                                log_link.className = "gclh_log";
                                log_link.addEventListener("click", function () {
                                    document.getElementById("gclh_load_all_logs").click();
                                }, false);
                                log_img.setAttribute("src", log_infos_long[i]["icon"]);
                                log_img.setAttribute("border", "0");
                                log_link.appendChild(document.createTextNode(log_infos_long[i]["date"]));
                                log_link.appendChild(log_text);

                                list.appendChild(log_img);
                                list.appendChild(document.createTextNode("   "));
                                list.appendChild(log_link);
                                list.appendChild(document.createTextNode("   "));
                                list.appendChild(span);
                                list.appendChild(document.createTextNode("   "));
                                list.appendChild(link);
//--> $$025 Begin of insert
                                if ( settings_show_mail_in_viplist && settings_show_mail && settings_show_vip_list ) buildSendIcons( list, user, "per u" );
//<-- $$025 End of insert
                                list.appendChild(document.createElement("br"));
                            }
                        }
                    }

                    function gclh_build_list(user) {
//--> $$039 Begin of insert
                        if ( getValue("settings_load_logs_with_gclh") == false ) return;
//<-- $$039 End of insert
                        if (!show_owner && owner_name && owner_name == user) return true;
                        if (in_array(user, all_users) || (owner_name == user)) {
                            var span = document.createElement("span");
                            var profile = document.createElement("a");
                            profile.setAttribute("href", http + "://www.geocaching.com/profile/?u=" + urlencode(user));
                            profile.innerHTML = user;
                            if (show_owner && owner_name && owner_name == user) {
                                span.appendChild(document.createTextNode("Owner: "));
                                show_owner = false;
                            } else if (user == myself) {
                                span.appendChild(document.createTextNode("Me: "));
                            }
                            span.appendChild(profile);

                            // VIP-Link
                            var link = document.createElement("a");
                            var img = document.createElement("img");
                            img.setAttribute("border", "0");
                            link.appendChild(img);
                            link.setAttribute("href", "javascript:void(0);");
                            link.setAttribute("name", user);

                            if (owner_name && owner_name == user && !in_array(user, vips)) {
                                img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                                img.setAttribute("title", "Add User " + user + " to VIP-List");
                                img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                                link.addEventListener("click", gclh_add_vip, false);
                            } else {
                                img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                                img.setAttribute("title", "Remove User " + user + " from VIP-List");
                                img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                                link.addEventListener("click", gclh_del_vip, false);
                            }

                            list.appendChild(span);
                            list.appendChild(document.createTextNode("   "));
                            list.appendChild(link);
//--> $$025 Begin of insert
                            if ( settings_show_mail_in_viplist && settings_show_mail && settings_show_vip_list ) buildSendIcons( list, user, "per u" );
//<-- $$025 End of insert
 
                            // Log-Links
                            for (var x = 0; x < log_infos[user].length; x++) {
                                if (log_infos[user][x] && log_infos[user][x]["icon"] && log_infos[user][x]["id"]) {
                                    if (log_infos[user][x]["icon"].match(/\/(2|10)\.png$/)) users_found.push(user); // fuer not found liste

                                    var image = document.createElement("img");
                                    var log_text = document.createElement("span");
                                    log_text.innerHTML = "<img src='" + log_infos[user][x]["icon"] + "'> <b>" + user + " - " + log_infos[user][x]["date"] + "</b><br/>" + log_infos[user][x]["log"];
                                    image.setAttribute("src", log_infos[user][x]["icon"]);
                                    image.setAttribute("border", "0");

                                    if (log_infos[user][x]["date"]) {
                                        image.setAttribute("title", log_infos[user][x]["date"]);
                                        image.setAttribute("alt", log_infos[user][x]["date"]);
                                    }

                                    var a = document.createElement("a");
                                    a.setAttribute("href", "#" + log_infos[user][x]["id"]);
                                    a.className = "gclh_log";
                                    a.addEventListener("click", function () {
                                        document.getElementById("gclh_load_all_logs").click();
                                    }, false);
                                    a.appendChild(image);
                                    a.appendChild(log_text);

                                    list.appendChild(document.createTextNode(" "));
                                    list.appendChild(a);
                                }
                            }

                            list.appendChild(document.createElement("br"));
                        }
                    }

                    owner_name = html_to_str(owner_name);
                    if (settings_show_long_vip) {
                        gclh_build_long_list();
                    } else {
                        if (!log_infos[owner_name]) {
                            log_infos[owner_name] = new Array();
                        }
                        gclh_build_list(owner_name);
                        for (var i = 0; i < vips.length; i++) {
                            gclh_build_list(vips[i]);
                        }
                    }

                    // "Not found"-Liste erstellen
                    if (document.getElementById("gclh_vip_list_nofound")) {
                        for (var i = 0; i < vips.length; i++) {
//--> $$039 Begin of insert
                            if ( getValue("settings_load_logs_with_gclh") == false ) break;
//<-- $$039 End of insert
                            var user = vips[i];
                            if (in_array(user, users_found)) continue;

                            var span = document.createElement("span");
                            var profile = document.createElement("a");
                            profile.setAttribute("href", http + "://www.geocaching.com/profile/?u=" + urlencode(user));
                            profile.innerHTML = user;
                            if (owner_name && owner_name == user) {
                                continue;
                            } else if (user == myself) {
                                continue;
                            }
                            span.appendChild(profile);

                            // VIP-Link
                            var link = document.createElement("a");
                            var img = document.createElement("img");
                            img.setAttribute("border", "0");
                            link.appendChild(img);
                            link.setAttribute("href", "javascript:void(0);");
                            link.setAttribute("name", user);

                            img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                            img.setAttribute("title", "Remove User " + user + " from VIP-List");
                            img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                            link.addEventListener("click", gclh_del_vip, false);

                            list_nofound.appendChild(span);
                            list_nofound.appendChild(document.createTextNode("   "));
                            list_nofound.appendChild(link);
//--> $$025 Begin of insert
                            if ( settings_show_mail_in_viplist && settings_show_mail && settings_show_vip_list ) buildSendIcons( list_nofound, user, "per u" );
//<-- $$025 End of insert
                            list_nofound.appendChild(document.createElement("br"));
                        }
                    }
                }
                gclh_build_vip_list();
                
            } else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\//) && document.getElementById("ctl00_ContentBody_uxBanManWidget")) {
                var widget = document.createElement("div");
                var headline = document.createElement("h3");
                var box = document.createElement("div");

                widget.setAttribute("class", "YourProfileWidget");
                headline.setAttribute("class", "WidgetHeader");
                headline.appendChild(document.createTextNode("All my VIPs"));
//--> $$037 Begin of insert
                var box2 = document.createElement("div");
                box2.setAttribute("class", "WidgetBody");
                box2.setAttribute("style", "padding: 0;");   // Wegen 2 WidgetBodys
//<-- $$037 End of insert
                box.setAttribute("id", "box_vips");
                box.setAttribute("class", "WidgetBody");

                widget.appendChild(headline);
//--> $$037 Begin of change
//                widget.appendChild(box);
                widget.appendChild(box2);
                box2.appendChild(box);
//<-- $$037 End of change
                document.getElementById("ctl00_ContentBody_uxBanManWidget").parentNode.insertBefore(widget, document.getElementById("ctl00_ContentBody_uxBanManWidget"));

                gclh_build_vip_list = function () {
                    var box = document.getElementById("box_vips");
                    if (!box) return false;
                    box.innerHTML = "";

                    for (var i = 0; i < vips.length; i++) {
                        var user = vips[i];
                        var span = document.createElement("span");
                        var profile = document.createElement("a");
                        profile.setAttribute("href", http + "://www.geocaching.com/profile/?u=" + urlencode(user));
                        profile.innerHTML = user;
                        span.appendChild(profile);

                        // VIP-Link
                        var link = document.createElement("a");
                        var img = document.createElement("img");
                        img.setAttribute("border", "0");
                        link.appendChild(img);
                        link.setAttribute("href", "javascript:void(0);");
                        link.setAttribute("name", user);
                        img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                        img.setAttribute("title", "Remove User " + user + " from VIP-List");
                        img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                        link.addEventListener("click", gclh_del_vip, false);

                        box.appendChild(span);
                        box.appendChild(document.createTextNode("   "));
                        box.appendChild(link);
//--> $$024 Begin of insert
                        if ( settings_show_mail_in_allmyvips && settings_show_mail && settings_show_vip_list ) buildSendIcons( box, user, "per u" );
//<-- $$024 End of insert
                        box.appendChild(document.createElement("br"));
                    }
                }
                gclh_build_vip_list();
                
            } else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/myfriends\.aspx/)) {
                // Friendlist - VIP-Icon
                gclh_build_vip_list = function () {
                } // There is no list to show, but ths function will be called from gclh_del_vip/gclh_add_vip
                var links = document.getElementsByTagName('a');
                for (var i = 0; i < links.length; i++) {
                    if (links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=/) && links[i].id) {

                        // VIP-Link
//                      var user = trim(links[i].innerHTML).replace(/&amp;/,'&');     // Es gibt wirklich User mit Leerzeichen am Ende ...
                        var user = links[i].innerHTML.replace(/&amp;/, '&');
                        var link = document.createElement("a");
                        var img = document.createElement("img");
                        img.setAttribute("border", "0");
                        link.appendChild(img);
                        link.setAttribute("href", "javascript:void(0);");
                        link.setAttribute("name", user);

                        if (in_array(user, vips)) {
                            img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                            img.setAttribute("title", "Remove User " + user + " from VIP-List");
                            img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                            link.addEventListener("click", gclh_del_vip, false);
                        } else {
                            img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                            img.setAttribute("title", "Add User " + user + " to VIP-List");
                            img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                            link.addEventListener("click", gclh_add_vip, false);
                        }

//                      links[i].parentNode.appendChild(document.createTextNode("   "));
//                      links[i].parentNode.appendChild(link);
                        links[i].parentNode.insertBefore(link, links[i].nextSibling);
                        links[i].parentNode.insertBefore(document.createTextNode("   "), links[i].nextSibling);
                    }
                }
//--> $$022 Begin of insert
            } else if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx/)     ||
                        document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek|track)\/log\.aspx/)  ||
                        document.location.href.match(/^https?:\/\/www\.geocaching\.com\/email\/\?guid=/)           ||
                        document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/inventory\.aspx/)      ||
                        document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/favorites\.aspx/)         ) {
                // TB Listing. Post, Edit, View Cache-Logs und TB-Logs. Mail schreiben. Eigene Favoriten. - VIP-Icon.
                gclh_build_vip_list = function () {
                } // There is no list to show, but this function will be called from gclh_del_vip/gclh_add_vip
                var links = document.getElementsByTagName('a');
                
                for (var i = 0; i < links.length; i++) {
                    if (links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=/)) {

                        // Wenn es sich hier um den User "In the hands of ..." im TB Listing handelt, dann nicht weitermachen, weil der 
                        // Username nicht wirklich bekannt ist.
                        if ( links[i].id == "ctl00_ContentBody_BugDetails_BugLocation" ) continue;

                        var matches = links[i].href.match(/https?:\/\/www\.geocaching\.com\/profile\/\?guid=([a-zA-Z0-9]*)/);
                        var user = decode_innerHTML(links[i]);

                        // Icon
                        var link = document.createElement("a");
                        var img = document.createElement("img");
                        img.setAttribute("border", "0");
                        img.setAttribute("style", "margin-left: 0px; margin-right: 0px;");
                        link.appendChild(img);
                        link.setAttribute("href", "javascript:void(0);");
                        link.setAttribute("name", user);

                        if (in_array(user, vips)) {
                            img.setAttribute("src", img_vip_on);
                            img.setAttribute("title", "Remove " + user + " from VIP-List");
                            link.addEventListener("click", gclh_del_vip, false);
                        } else {
                            img.setAttribute("src", img_vip_off);
                            img.setAttribute("title", "Add " + user + " to VIP-List");
                            link.addEventListener("click", gclh_add_vip, false);
                        }

                        links[i].parentNode.insertBefore(link, links[i].nextSibling);
                        links[i].parentNode.insertBefore(document.createTextNode(" "), links[i].nextSibling);
                    }
                }
//<-- $$022 End of insert
            } else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//) && document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName")) {
                // Public Profile - VIP-Icon
                gclh_build_vip_list = function () {
                } // There is no list to show, but ths function will be called from gclh_del_vip/gclh_add_vip
//              var user = trim(document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName").innerHTML).replace(/&amp;/,'&');     // Es gibt wirklich User mit Leerzeichen am Ende ...
                var user = document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName").innerHTML.replace(/&amp;/, '&');
                var link = document.createElement("a");
                var img = document.createElement("img");
                img.setAttribute("border", "0");
                link.appendChild(img);
                link.setAttribute("href", "javascript:void(0);");
                link.setAttribute("name", user);

                if (in_array(user, vips)) {
                    img.setAttribute("src", img_vip_on);
//--> $$004 Begin of change
//                    img.setAttribute("title", "Remove User " + user + " from VIP-List");
                    img.setAttribute("title", "Remove " + user + " from VIP-List");
//<-- $$004 End of change
                    link.addEventListener("click", gclh_del_vip, false);
                } else {
                    img.setAttribute("src", img_vip_off);
//--> $$004 Begin of change
//                    img.setAttribute("title", "Add User " + user + " to VIP-List");
                    img.setAttribute("title", "Add " + user + " to VIP-List");
//<-- $$004 End of change
                    link.addEventListener("click", gclh_add_vip, false);
                }

//--> $$004 Begin of change
//                document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName").appendChild(document.createTextNode("   "));
                document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName").appendChild(document.createTextNode(" "));
                img.setAttribute("style", "margin-left: 0px; margin-right: 0px"); 
//<-- $$004 End of change
                document.getElementById("ctl00_ContentBody_ProfilePanel1_lblMemberName").appendChild(link);
            }
        }
    } catch (e) {
        gclh_error("VIP", e);
    }

//--> $$026 Begin of insert
// Improve inventory list in cache listing.
    try {
        if ( is_page("cache_listing") ) {
            // Trackable Namen kürzen, damit nicht umgebrochen wird, und Title setzen.
            if ( document.getElementById("ctl00_ContentBody_uxTravelBugList_uxInventoryLabel") ) {
                var inventoryWidget = document.getElementById("ctl00_ContentBody_uxTravelBugList_uxInventoryLabel").parentNode.parentNode;
                var inventoryWidgetBody = inventoryWidget.getElementsByClassName("WidgetBody")[0];
                var inventory = inventoryWidgetBody.getElementsByTagName("span");
                for ( var i = 0; i < inventory.length; i++ ) {
                    noBreakInLine( inventory[i], 203, inventory[i].innerHTML );
                }
            }
        }
    } catch (e) {
        gclh_error("improve inventory list in cache listing", e);
    }
//<-- $$026 End of insert
    
// Improve "My Profile"   
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my/)) {
            var code = "function hide_box(i){";
            code += "  if(document.getElementById('box_'+i).style.display == 'none'){";
            code += "    document.getElementById('box_'+i).style.display = 'block';";
            code += "    document.getElementById('lnk_'+i).src = '" + http + "://www.geocaching.com/images/minus.gif';";
            code += "    document.getElementById('lnk_'+i).title = 'hide';";
            code += "  }else{";
            code += "    document.getElementById('box_'+i).style.display = 'none';";
            code += "    document.getElementById('lnk_'+i).src = '" + http + "://www.geocaching.com/images/plus.gif';";
            code += "    document.getElementById('lnk_'+i).title = 'show';";
            code += "  }";
            code += "}";

//--> $$037 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//            if (getValue("show_box[0]", "" == "none")) setValue("show_box[0]", "block"); // Bugfix: First Box was hidden because of the temporary "+" beside Linklist
//
//            var script = document.createElement("script");
//            script.innerHTML = code;
//            document.getElementsByTagName("body")[0].appendChild(script);
//
//            var boxes = getElementsByClass("WidgetHeader");
//
//            function saveStates() {
//                for (var i = 1; i < boxes.length; i++) {
//                    var box = boxes[i].parentNode.childNodes[3];
//
//                    if (boxes[i].innerHTML.match(/Bookmarks/)) continue;
//
//                    if (typeof(box) == "undefined") continue;
//
//                    var show = box.style.display;
//                    if (typeof(show) == "undefined" || show != "none") show = "block";
//
//                    setValue("show_box[" + i + "]", show);
//                }
//            }
//
//            for (var i = 1; i < boxes.length; i++) {
//                var box = boxes[i].parentNode.childNodes[3];
//                if (typeof(box) != "undefined") {
//                    if (boxes[i].innerHTML.match(/Bookmarks/)) continue;
//
//                    box.setAttribute("id", "box_" + i);
//
//                    if (typeof(getValue("show_box[" + i + "]")) != "undefined") box.style.display = getValue("show_box[" + i + "]");
//
//                    if (box.style.display == "none")
//                        boxes[i].innerHTML = "<img id='lnk_" + i + "' src='" + http + "://www.geocaching.com/images/plus.gif' onClick='hide_box(\"" + i + "\");' title='show'> " + boxes[i].innerHTML;
//                    else
//                        boxes[i].innerHTML = "<img id='lnk_" + i + "' src='" + http + "://www.geocaching.com/images/minus.gif' onClick='hide_box(\"" + i + "\");' title='hide'> " + boxes[i].innerHTML;
//
//                    document.getElementById("lnk_" + i).addEventListener("click", saveStates, false);
//                }
//            }
//<-- $$037 End of delete 
//--> $$037 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
            var script = document.createElement("script");
            script.innerHTML = code;
            document.getElementsByTagName("body")[0].appendChild(script);

            var boxes = getElementsByClass("WidgetHeader");

            function saveStates() {
                // Wenn Linklist angezeigt wird, dann mit Speicherindex "i" von Linklist beginnen, er ist 0. Ansonsten mit 1 beginnen.                
                if ( settings_bookmarks_show ) var i = 0;
                else var i = 1;
                // Alle gefundenen WidgetBody "wb" verarbeiten und ihnen den zugehörigen Speicherindex "i" zuordnen. 
                for (var wb = 0; wb < boxes.length; wb++) {
                    var box = boxes[wb].parentNode.getElementsByClassName('WidgetBody')[0];
                    if (typeof(box) == "undefined") continue;
                    var show = box.style.display;
                    if (typeof(show) == "undefined" || show != "none") show = "block";
                    setValue("show_box[" + i + "]", show);
                    i++;
                }
            }

            // Wenn Linklist angezeigt wird, dann mit Speicherindex "i" von Linklist beginnen, er ist 0. Ansonsten mit 1 beginnen.                
            if ( settings_bookmarks_show ) var i = 0;
            else var i = 1;
            // Alle gefundenen WidgetBody "wb" verarbeiten und ihnen den zugehörigen Speicherindex "i" zuordnen. 
            for (var wb = 0; wb < boxes.length; wb++) {
                var box = boxes[wb].parentNode.getElementsByClassName('WidgetBody')[0];
                if (typeof(box) != "undefined") {
                    box.setAttribute("id", "box_" + i);
                    if (typeof(getValue("show_box[" + i + "]")) != "undefined") box.style.display = getValue("show_box[" + i + "]");
                    if (box.style.display == "none") {
                        boxes[wb].innerHTML = "<img id='lnk_" + i + "' src='" + http + "://www.geocaching.com/images/plus.gif' onClick='hide_box(\"" + i + "\");' title='show' style='cursor: pointer'> " + boxes[wb].innerHTML;
                    } else {
                        boxes[wb].innerHTML = "<img id='lnk_" + i + "' src='" + http + "://www.geocaching.com/images/minus.gif' onClick='hide_box(\"" + i + "\");' title='hide' style='cursor: pointer'> " + boxes[wb].innerHTML;
                    }
                    document.getElementById("lnk_" + i).addEventListener("click", saveStates, false);
                }
                i++;
            }
//<-- $$037 End of insert 
        }
    } catch (e) {
        gclh_error("Improve MyProfile", e);
    }

// Deactivated: Bookmark-Page needs guid of cache - this is not available anymore in nearest-List ...
//// Show Bookmark-It Icon
//    try {
//        // Deactivated: Bookmark-Page needs guid of cache - this is not available anymore in nearest-List ...
//        if (false && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx?/)) {
//            var links = document.getElementsByTagName("a");
//
//            for (var i = 0; i < links.length; i++) {
//                if (links[i].href.match(/^https?:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx\?.*/) && links[i].innerHTML.match(/^<span>/)) {
//                    var wpt = 2;
//                    try {
//                        var match = links[i].parentNode.previousSibling.childNodes[1].childNodes[0].src.match(/([0-9]*)\.gif/);
//                        if (match[1]) wpt = match[1];
//                    } catch (e) {
//                    }
//                    links[i].parentNode.innerHTML = links[i].parentNode.innerHTML.replace("<br>", "&nbsp;<a title='Bookmark it' href='" + links[i].href.replace("seek\/cache_details", "bookmarks\/mark") + "&WptTypeID=" + wpt + "'><img src='/images/stockholm/16x16/book_open_mark.gif'></a><br>");
//                }
//            }
//        }
//    } catch (e) {
//        gclh_error("Bookmark It", e);
//    }

// Show thumbnails
    try {
//--> $$023 Begin of change
//        if (settings_show_thumbnails && (is_page("cache_listing") || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|profile\/)/))) {
        if (settings_show_thumbnails && (is_page("cache_listing") || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|track\/details\.aspx?|track\/gallery\.aspx?|profile\/)/))) {
//<-- $$023 End of change
            function placeToolTip(element, stop) {
                $('a.gclh_thumb:hover span').position({
                    my: "top left",
                    at: "bottom left",
                    of: "a.gclh_thumb:hover",
                    collision: "flipfit flipfit"
                });
                if (!stop) {
                    $('a.gclh_thumb:hover span img').load(function () {
                        placeToolTip(element, true);
                    });
                }
            }

            var links = document.getElementsByTagName("a");

            var css = "a.gclh_thumb:hover { " +
                "  text-decoration:underline;" +
                "  position: relative;" +
                "}" +
                "a.gclh_thumb {" +
				"overflow: visible !important; max-width: none !important;}" +
				"a.gclh_thumb span {" +
                "  visibility: hidden;" +
                "  position: absolute;" +
                "  top:-310px;" +
                "  left:0px;" +
                "  padding: 2px;" +
                "  text-decoration:none;" +
                "  text-align:left;" +
                "  vertical-align:top;" +
                "}" +
                "a.gclh_thumb:hover span { " +
                "  visibility: visible;" +
                    //"  top: 10px;" +
                "  z-index: 100;" +
                "  border: 1px solid #8c9e65;" +
                "  background-color:#dfe1d2;" +
//--> $$023 Begin of insert
                "  text-decoration: none !important;" +
//<-- $$023 End of insert
                "}" +
//--> $$023 Begin of insert
                "a.gclh_thumb:hover img {margin-bottom: -4px;}" +
//<-- $$023 End of insert
                ".gclh_max {" +
                "  max-height: " + settings_hover_image_max_size + "px;" +
                "  max-width:  " + settings_hover_image_max_size + "px;" +
                "}";

            GM_addStyle(css);

//--> $$023 Begin of change
//            if (is_page("cache_listing")) {
            if (is_page("cache_listing") && settings_load_logs_with_gclh ) {
//<-- $$023 End of change
                var newImageTmpl = "<!-- .gclh_vip -->" +
                    "          <a class='tb_images lnk gclh_thumb' onmouseover='placeToolTip(this);' rel='fb_images_${LogID}' href='" + http + "://img.geocaching.com/cache/log/${FileName}' title='${Descr}'>" +
                    "              <img title='${Name}' alt='${Name}' src='" + http + "://img.geocaching.com/cache/log/thumb/${FileName}'/>";
                if (settings_imgcaption_on_top) {
                    newImageTmpl += "<span>${Name}<img class='gclh_max' src='" + http + "://img.geocaching.com/cache/log/thumb/large/${FileName}'></span>";
                } else {
                    newImageTmpl += "<span><img class='gclh_max' src='" + http + "://img.geocaching.com/cache/log/thumb/large/${FileName}'>${Name}</span>";
                }
                newImageTmpl += "</a>&nbsp;&nbsp;" +
                "";

                if (browser == "chrome") {
                    $("#tmpl_CacheLogImagesTitle").template("tmplCacheLogImagesTitle");
                    $("#tmpl_CacheLogImages").html(newImageTmpl).template("tmplCacheLogImages");
                    $("#tmpl_CacheLogRow").template("tmplCacheLogRow");
                }

                var code = "function gclh_updateTmpl() { " +
                    "  delete $.template['tmplCacheLogImages'];" +
                    "  $.template(\"tmplCacheLogImages\",\"" + newImageTmpl + "\");" +
                    "}" +
                    "gclh_updateTmpl();";

                code += placeToolTip.toString();

                var script = document.createElement("script");
                script.innerHTML = code;
                document.getElementsByTagName("body")[0].appendChild(script);
            }

//--> $$023 Begin of change - Disable Spoiler String
//            var regexp = new RegExp(settings_spoiler_strings, "i");
//<-- $$023 End of change
            for (var i = 0; i < links.length; i++) {
//--> $$023 Begin of insert
                // Das folgende Coding scheint nicht verwendet zu werden, weil die Logs zum hiesigen Zeitpunkt noch gar nicht geladen sind, zumindest nicht alle.
                // Das gilt für den Fall, dass die Logs im Standard geladen werden wie auch für den Fall, dass GClh die Logs läd. Das Coding scheint alt und noch
                // aus der Zeit vor dem eigenen Log Template, wo diese Funktionalität für das Cache Listing abgebildet ist.
                // Dass bei Spoilern die Bilder nicht aufgebaut werden, funktioniert deshalb auch nicht. Ein entsprechendes Coding im eigenen Log Template ist
                // derzeit nicht vorhanden.
//<-- $$023 End of insert
//--> $$023 Begin of delete
//                if (is_page("cache_listing") && links[i].href.match(/^https?:\/\/img\.geocaching\.com\/cache/) && !links[i].innerHTML.match(regexp)) {
//                    var span = document.createElement("span");
//                    var thumb = document.createElement("img");
//                    var thumb_link = links[i].href;
//
//                    if (thumb_link.match(/cache\/log/)) {
//                        thumb_link = thumb_link.replace(/cache\/log/, "cache/log/thumb");
//                    } else {
//                        thumb.style.height = "100px";
//                        thumb.style.border = "1px solid black";
//                    }
//                    thumb.src = thumb_link;
//                    thumb.title = links[i].innerHTML;
//                    thumb.alt = links[i].innerHTML;
//
//                    links[i].className = links[i].className + " gclh_thumb";
//                    links[i].onmouseover = placeToolTip;
//
//                    var big_img = document.createElement("img");
//                    big_img.src = links[i].href;
//                    big_img.className = "gclh_max";
//
//                    span.appendChild(big_img);
//
//                    var name = links[i].innerHTML;
//                    links[i].innerHTML = "";
//                    links[i].appendChild(thumb);
//                    links[i].innerHTML += "<br>" + name;
//
//                    links[i].appendChild(span);
//                } else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|profile\/)/) && links[i].href.match(/^https?:\/\/img\.geocaching\.com\/(cache|track)\//) && links[i].childNodes[1] && links[i].childNodes[1].tagName == 'IMG') {
//<-- $$023 End of delete 
//--> $$023 Begin of insert
                // Bilder Gallery Cache, TB und Profil:
                if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|track\/gallery\.aspx?|profile\/)/) && 
                     links[i].href.match(/^https?:\/\/img\.geocaching\.com\/(cache|track)\//) && links[i].childNodes[1] && links[i].childNodes[1].tagName == 'IMG') {
                    global_imageGallery = true;
//<-- $$023 End of insert
                    var thumb = links[i].childNodes[1];
                    var span = document.createElement('span');
                    var img = document.createElement('img');

                    img.src = thumb.src.replace(/thumb\//, "");
                    img.className = "gclh_max";

                    if (settings_imgcaption_on_top) {
//--> $$023 Begin of change
//                        span.appendChild(document.createTextNode(thumb.parentNode.parentNode.childNodes[7].childNodes[0].innerHTML));
                        // Bezeichnung des Bildes.
                        span.appendChild(document.createTextNode(thumb.parentNode.parentNode.childNodes[5].innerHTML));
//<-- $$023 End of change
                        span.appendChild(img);
                    } else {
                        span.appendChild(img);
//--> $$023 Begin of change
//                        span.appendChild(document.createTextNode(thumb.parentNode.parentNode.childNodes[7].childNodes[0].innerHTML));
                        // Bezeichnung des Bildes.
                        span.appendChild(document.createTextNode(thumb.parentNode.parentNode.childNodes[5].innerHTML));
//<-- $$023 End of change
                    }

                    links[i].className = links[i].className + " gclh_thumb";
                    links[i].onmouseover = placeToolTip;

                    links[i].appendChild(span);
                }
//--> $$023 Begin of insert
                // Bilder im TB Listing:
                else if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx?/) &&
                          links[i].href.match(/^https?:\/\/img\.geocaching\.com\/track/) ) {
                    // Bestehendes a tag (track/log/large) um class und Event ergänzen.
                    links[i].className = links[i].className + " gclh_thumb";
                    links[i].onmouseover = placeToolTip;
                    // Bestehendes img tag (track/log/thumb) um title ergänzen und Bezeichnung für Bild merken.
                    var imgDesc = "";
                    var imgTag = links[i].getElementsByTagName("img");
                    for (var j = 0; j < imgTag.length; j++) {
                        imgTag[j].title = imgTag[j].alt;
                        imgDesc = imgTag[j].alt;
                        break;
                    }
                    // Neues img tag mit großem Bild aufbauen.
                    var big_img = document.createElement("img");
                    big_img.className = "gclh_max";
                    big_img.src = links[i].href.replace(/track\/log\/large/, "track/log/thumb/large/");
                    big_img.setAttribute("style", "margin-right: unset; margin-bottom: unset;");
                    // Neues span tag mit neuem img tag mit großem Bild aufbauen.
                    var span = document.createElement("span");
                    if (settings_imgcaption_on_top) {
                        span.appendChild(document.createTextNode( imgDesc ));
                        span.appendChild(big_img);
                    } else {
                        span.appendChild(big_img);
                        span.appendChild(document.createTextNode( imgDesc ));
                    }
                    // Neues img und neues span einbauen.
                    links[i].appendChild(span);
                }
//<-- $$023 End of insert
            }
        }
        
//--> $$023 Begin of insert
        // Image Gallerien auf Fenstergröße einstellen, um mausaktivierten Bildwechsel zu vereinfachen. 
        if ( settings_show_thumbnails && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|track\/gallery\.aspx?|profile\/)/)) {
            if ( global_imageGallery ) appendCssStyle( "#Content .container {width: unset;} .span-20 {width: -moz-available;}" );
            else appendCssStyle( "#Content .container {width: unset;}" );
        }
//<-- $$023 End of insert
    } catch (e) {
        gclh_error("Show Thumbnails", e);
    }

// Show gallery-Images in 2 instead of 4 cols
    try {
//--> $$056 Begin of change
//        if (settings_show_big_gallery && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|profile\/)/)) {
        if (settings_show_big_gallery && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|track\/gallery\.aspx?|profile\/)/)) {
//<-- $$056 End of change
            var links = document.getElementsByTagName("a");
            var tds = new Array();
            // Make images bigger
            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/^https?:\/\/img\.geocaching\.com\/(cache|track)\//) && links[i].childNodes[1] && links[i].childNodes[1].tagName == 'IMG') {
                    var thumb = links[i].childNodes[1];
                    thumb.style.width = "300px";
                    thumb.style.height = "auto";
                    thumb.src = thumb.src.replace(/thumb\//, "");
                    tds.push(thumb.parentNode.parentNode);
                }
            }

            // Change from 4 Cols to 2
//--> $$056 Begin of change
//            if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/gallery\.aspx?/) && tds.length > 1 && document.getElementById("ctl00_ContentBody_GalleryItems_DataListGallery")) {
            if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(seek\/gallery\.aspx?|track\/gallery\.aspx?)/) && tds.length > 1 && document.getElementById("ctl00_ContentBody_GalleryItems_DataListGallery")) {
//<-- $$056 End of change
                var tbody = document.createElement("tbody");
                var tr = document.createElement("tr");
                var x = 0;
                for (var i = 0; i < tds.length; i++) {
                    if (x == 0) {
                        tr.appendChild(tds[i]);
                        x++;
                    } else {
                        tr.appendChild(tds[i]);
                        tbody.appendChild(tr);
                        tr = document.createElement("tr");
                        x = 0;
                    }
                }
                if (x != 0) { //einzelnes Bild uebrig
                    tr.appendChild(document.createElement("td"));
                    tbody.appendChild(tr);
                }
                document.getElementById("ctl00_ContentBody_GalleryItems_DataListGallery").removeChild(document.getElementById("ctl00_ContentBody_GalleryItems_DataListGallery").firstChild);
                document.getElementById("ctl00_ContentBody_GalleryItems_DataListGallery").appendChild(tbody);
            } else if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\//) && tds.length > 1 && document.getElementById("ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery")) {
                var tbody = document.createElement("tbody");
                var tr = document.createElement("tr");
                var x = 0;
                for (var i = 0; i < tds.length; i++) {
                    if (x == 0) {
                        tr.appendChild(tds[i]);
                        x++;
                    } else {
                        tr.appendChild(tds[i]);
                        tbody.appendChild(tr);
                        tr = document.createElement("tr");
                        x = 0;
                    }
                }
                if (x != 0) { //einzelnes Bild uebrig
                    tr.appendChild(document.createElement("td"));
                    tbody.appendChild(tr);
                }
                document.getElementById("ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery").removeChild(document.getElementById("ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery").firstChild);
                document.getElementById("ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery").appendChild(tbody);
            }
        }
    } catch (e) {
        gclh_error("Show Bigger Images", e);
    }

//--> $$004 $$005 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Log-Template definieren
//    if (is_page("cache_listing")) {
//        var new_tmpl = '<tr class="log-row" data-encoded="${IsEncoded}" >' +
//            '        <td>' +
//            '            <div class="FloatLeft LogDisplayLeft" >' +
//            '                <p class="logOwnerProfileName">' +
//            '                    <strong><a id="${LogID}" name="${LogID}" href="/profile/?guid=${AccountGuid}">${UserName}</a>';
//
//        if (settings_show_mail) new_tmpl += ' <a href="' + http + '://www.geocaching.com/email/?guid=${AccountGuid}&text=Hi ${UserName},%0A%0A' + global_cache_name + '"><img border=0 title="Send a mail to this user" src="' + global_mail_icon + '"></a>';
//        if (settings_show_vip_list) new_tmpl += ' <a href="javascript:void(0);" name="${UserName}" class="gclh_vip"><img class="gclh_vip" border=0></a>';
//
//        new_tmpl += '&nbsp;&nbsp;<a title="Top" href="#gclh_top" style="color: #000000; text-decoration: none;">↑</a>';
//
//        new_tmpl += '          </strong></p>' +
//        '                <p class="logOwnerBadge">' +
//        '                    {{if creator}}<img title="${creator.GroupTitle}" src="${creator.GroupImageUrl}" align="absmiddle" style="vertical-align:middle">${creator.GroupTitle}{{/if}}' +
//        '                </p>' +
//        '                <p class="logOwnerAvatar">' +
//        '                    <a href="/profile/?guid=${AccountGuid}">';
//
//        if (!settings_hide_avatar) {
//            new_tmpl += '            {{if AvatarImage}}' +
//            '                        <img width="48" height="48" src="' + http + '://img.geocaching.com/user/avatar/${AvatarImage}">' +
//            '                        {{else}}' +
//            '                        <img width="48" height="48" src="/images/default_avatar.jpg">' +
//            '                        {{/if}}';
//        }
//
//        new_tmpl += '          </a></p>' +
//        '                <p class="logOwnerStats">' +
//        '                    {{if GeocacheFindCount > 0 }}' +
//        '                      <img title="Caches Found" src="/images/icons/icon_smile.png"> ${GeocacheFindCount}' +
//        '                    {{/if}}' +
//        '                </p>' +
//        '            </div>' +
//        '            <div class="FloatLeft LogDisplayRight">' +
//        '                <div class="HalfLeft LogType">' +
//        '                    <strong>' +
//        '                        <img title="${LogType}" alt="${LogType}" src="/images/logtypes/${LogTypeImage}">&nbsp;${LogType}</strong></div>' +
//        '                <div class="HalfRight AlignRight">' +
//        '                    <span class="minorDetails LogDate">${Visited}</span></div>' +
//        '                <div class="Clear LogContent">' +
//        '                    {{if LatLonString.length > 0}}' +
//        '                    <strong>${LatLonString}</strong>' +
//        '                    {{/if}}' +
//        '                    <p class="LogText">{{html LogText}}</p>' +
//        '                    {{if Images.length > 0}}' +
//        '                        <table cellspacing="0" cellpadding="3" class="LogImagesTable">';
//        if (settings_show_thumbnails) new_tmpl += '<tr><td>';
//        new_tmpl += '              {{tmpl(Images) "tmplCacheLogImages"}}';
//        if (settings_show_thumbnails) new_tmpl += '</td></tr>';
//        new_tmpl += '             </table>' +
//        '                    {{/if}}' +
//        '                    <div class="AlignRight">' +
//        '                        <small><a title="View Log" href="/seek/log.aspx?LUID=${LogGuid}" target="_blank">' +
//        '                            {{if ("' + (userInfo == null ? 0 : userInfo.ID) + '"==AccountID)}}' +
//        '                               View / Edit Log / Images' +
//        '                            {{else}}' +
//        '                               View Log' +
//        '                            {{/if}}' +
//        '                        </a></small>&nbsp;' +
//        '                        {{if ("' + (userInfo == null ? 0 : userInfo.ID) + '"==AccountID)}}' +
//        '                        <small><a title="Upload Image" href="/seek/upload.aspx?LID=${LogID}" target="_blank">Upload Image</a></small>' +
//        '                        {{/if}}' +
//        '                    </div>' +
//        '                </div>' +
//        '            </div>' +
//        '        </td>' +
//        '    </tr>';
//    }    
//<-- $$004 $$005 End of delete

//--> $$004 $$005 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Log-Template definieren
    log_template:
    try {
        if ( !is_page("cache_listing") ) break log_template;
        
        var new_tmpl = "";
        new_tmpl += 
            '    <tr class="log-row" data-encoded="${IsEncoded}" >' +
            '        <td>' +
            '            <div class="FloatLeft LogDisplayLeft" >' +
            '                <p class="logOwnerProfileName">' +
            '                    <strong>' +
            '                        <a id="${LogID}" name="${LogID}" href="/profile/?guid=${AccountGuid}">${UserName}</a>' +
            '                    </strong>' +
            '                </p>' +
            '                <p class="logIcons">' +
            '                    <strong>' +
            '                        <a class="logOwnerBadge">' +
            '                            {{if creator}}<img title="${creator.GroupTitle}" src="${creator.GroupImageUrl}" style="vertical-align: baseline;">{{/if}}</a>';
        if (settings_show_vip_list) new_tmpl += 
            '                        <a href="javascript:void(0);" name="${UserName}" class="gclh_vip"><img class="gclh_vip" border=0 style="margin-left: 0px; margin-right: 0px"></a>';
        if (settings_show_mail) new_tmpl += 
            '                        {{if UserName !== "' + global_activ_username + '" }}' +
            '                        <a href="' + http + '://www.geocaching.com/email/?guid=${AccountGuid}&text=Hi ${UserName},%0A%0A' + global_name + global_info_mail + '"><img border=0 title="Send a mail to ${UserName}" src="' + global_mail_icon + '"></a>' +
            '                        {{/if}}';
        // gcCode oder tbCode nicht nutzen, damit keine Standard Message aufgebaut wird. Der deaktivierte Punkt kann 
        // dann aktiviert werden, wenn die Erzeugung des eigenen Inhaltes sich als nicht praktikabel herausstellt. 
        if (settings_show_message) new_tmpl += 
            '                        {{if UserName !== "' + global_activ_username + '" }}' +
            // '                        <a href="' + http + '://www.geocaching.com/account/messagecenter?recipientId=${AccountGuid}&gcCode=' + global_code + '"><img border=0 title="Send a message to ${UserName}" src="' + global_message_icon + '"></a>' +
            '                        <a href="' + http + '://www.geocaching.com/account/messagecenter?recipientId=${AccountGuid}&text=Hi ${UserName},%0A%0A' + global_name + global_info_message + '"><img border=0 title="Send a message to ${UserName}" src="' + global_message_icon + '"></a>' +
            '                        {{/if}}';
        new_tmpl += 
            '                        &nbsp;&nbsp;' +
            '                        <a title="Top" href="#gclh_top" style="color: #000000; text-decoration: none; float: right; padding-left: 6px;">↑</a>' +
            '                    </strong>' +
            '                </p>' +
            '                <p class="logOwnerAvatar">' +
            '                    <a href="/profile/?guid=${AccountGuid}">';
        if (!settings_hide_avatar) new_tmpl +=
            '                        {{if AvatarImage}}' +
            '                        <img width="48" height="48" src="' + http + '://img.geocaching.com/user/avatar/${AvatarImage}">' +
            '                        {{else}}' +
            '                        <img width="48" height="48" src="/images/default_avatar.jpg">' +
            '                        {{/if}}';
        new_tmpl += 
            '                </a></p>' +
            '                <p class="logOwnerStats">' +
            '                    {{if GeocacheFindCount > 0 }}' +
            '                    <img title="Caches Found" src="/images/icons/icon_smile.png"> ${GeocacheFindCount}' +
            '                    {{/if}}' +
            '                </p>' +
            '            </div>' +
            '            <div class="FloatLeft LogDisplayRight">' +
            '                <div class="HalfLeft LogType">' +
            '                    <strong>' +
            '                        <img title="${LogType}" alt="${LogType}" src="/images/logtypes/${LogTypeImage}">&nbsp;${LogType}</strong></div>' +
            '                <div class="HalfRight AlignRight">' +
            '                    <span class="minorDetails LogDate">${Visited}</span></div>' +
            // "markdown-output" sorgt für die richtige Aufbereitung der Logs, insbesondere nach unten und oben.
            // Gleichzeitig schneidet es aber auch die Bilder beim drüberfahren mit der Maus an den Rändern ab, 
            // entsprechend der Maße des Logs. Deshalb Bilder aus diesem Bereich rausnehmen class="TableLogContent".       
            '                <div class="Clear LogContent markdown-output">' +
            '                    {{if LatLonString.length > 0}}' +
            '                    <strong>${LatLonString}</strong>' +
            '                    {{/if}}' +
            '                    <p class="LogText">{{html LogText}}</p>' +
            '                </div>' +
            '                {{if Images.length > 0}}' +
            '                <div class="TableLogContent">' +
            '                    <table cellspacing="0" cellpadding="3" class="LogImagesTable">';
        if (settings_show_thumbnails) new_tmpl += 
            '                        <tr><td>';
        new_tmpl += 
            '                            {{tmpl(Images) "tmplCacheLogImages"}}';
        if (settings_show_thumbnails) new_tmpl += 
            '                        </td></tr>';
        new_tmpl += 
            '                    </table>' +
            '                </div>' +
            '                {{/if}}' +
            '                <div class="AlignRight">' +
            '                    <small><a title="View Log" href="/seek/log.aspx?LUID=${LogGuid}" target="_blank">' +
            '                    {{if (userInfo.ID==AccountID)}}' +
            '                    View / Edit Log / Images' +
            '                    {{else}}' +
            '                    View Log' +
            '                    {{/if}}' +
            '                    </a></small>&nbsp;' +
            '                    {{if (userInfo.ID==AccountID)}}' +
            '                    <small><a title="Upload Image" href="/seek/upload.aspx?LID=${LogID}" target="_blank">Upload Image</a></small>' +
            '                    {{/if}}' +
            '                </div>' +
            '            </div>' +
            '        </td>' +
            '    </tr>';
    
        var css = ""; 
        // Log Text noch etwas ausrichten, keinen Platz in der Höhe verlieren.    
        css += ".LogDisplayRight .LogText {min-height: unset; padding-top: 1.5em;}";
        css += ".markdown-output {margin: unset;}";  
        if ( !settings_hide_avatar ) css += ".markdown-output {min-height: 6em;}";
        // Bilderrahmen im Log noch etwas ausrichten und Trenner von Text und User auch hier einbauen. 
        css += ".TableLogContent {padding-left: 0.5em; border-left: 1px solid #d7d7d7;}";
//--> $$026 Begin of insert
        // Länge der Usernamen in den Logs beschränken, damit sie nicht umgebrochen werden. 
        css += ".logOwnerProfileName {max-width: 135px; display: inline-block; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;}";
//<-- $$026 End of insert
        appendCssStyle( css );
        
    } catch (e) {
        gclh_error("define log-template", e);
    }
//<-- $$004 $$005 End of insert

// Hide greenToTopButton
    if (settings_hide_top_button) {
        $("#topScroll").attr("id", "_topScroll").hide();
    }

// Overwrite Log-Template and Log-Load-Function
    try {
        if (settings_load_logs_with_gclh && is_page("cache_listing") && !document.getElementById("ctl00_divNotSignedIn") && document.getElementById('tmpl_CacheLogRow')) {
            // to Top Link
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("name", "gclh_top");
            document.getElementsByTagName("body")[0].insertBefore(a, document.getElementsByTagName("body")[0].childNodes[0]);

            var new_tmpl_block = document.createElement("script");
            new_tmpl_block.type = "text/x-jquery-tmpl";
            new_tmpl_block.innerHTML = new_tmpl;
            new_tmpl_block.setAttribute("id", "tmpl_CacheLogRow_gclh");
            document.getElementsByTagName("body")[0].appendChild(new_tmpl_block);

            //Override the standart templates (for pre-LogLoad use)
            document.getElementById('tmpl_CacheLogRow').innerHTML = new_tmpl;
            var elem = unsafeWindow.$('#tmpl_CacheLogRow')[0];
            unsafeWindow.$.removeData(elem, "tmpl");
            unsafeWindow.$("#tmpl_CacheLogRow").template("tmplCacheLogRow");

            if (browser === "chrome" || browser === "firefox") {
                injectPageScriptFunction(function () {
                    var elem = window.$('#tmpl_CacheLogRow')[0];
                    window.$.removeData(elem, "tmpl");
                    window.$("#tmpl_CacheLogRow").template("tmplCacheLogRow");
                }, "()");
            }

            //Reinit initalLogs
            var tbody = (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).getElementsByTagName("tbody");
            if (tbody.length > 0) {
                tbody = tbody[0];
                if (tbody.children.length > 0) {
                    var initialLogData = chromeUserData.initalLogs || unsafeWindow.initalLogs || initalLogs;
                    var inclAvatars = chromeUserData.includeAvatars || unsafeWindow.includeAvatars || includeAvatars;
                    var newInitalLogs = $("#tmpl_CacheLogRow").tmpl(initialLogData.data, {
                        includeAvatars: inclAvatars
                    });

                    for (var j = 0; j < newInitalLogs.length && j < tbody.children.length; j++) {
                        unsafeWindow.$(tbody.children[j]).replaceWith(newInitalLogs[j]);
                    }

                    injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");

                    gclh_add_vip_icon();
//--> $$040 Begin of insert
                    setLinesColorInCacheListing();
//<-- $$040 End of insert
                }
            }

            function loadListener(e) {
                gclh_add_vip_icon();
//--> $$040 Begin of insert
                setLinesColorInCacheListing();
//<-- $$040 End of insert
            }

            (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).addEventListener('DOMNodeInserted', loadListener);

            if (browser === "firefox") {
                window.addEventListener("message", function (ev) {
                    if (ev.origin !== "https://www.geocaching.com" && ev.origin !== "https://www.geocaching.com") {
                        return;
                    }

                    if (ev.data === "gclh_add_vip_icon") {
                        gclh_add_vip_icon();
                    }
//--> $$040 Begin of insert
                    if (ev.data === "setLinesColorInCacheListing") {
                        setLinesColorInCacheListing();
                    }
//<-- $$040 End of insert
                });

                function addNewLogLines(escapedLogLines) {
                    var unsafeWindow = unsafeWindow || window;
                    var logs = JSON.parse(decodeURIComponent(escapedLogLines));
                    var newBody = unsafeWindow.$(document.createElement("TBODY"));
                    unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs).appendTo(newBody);
                    unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                    $('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});
                }
            }

            function disablePageAutoScroll() {
                var unsafeWindow = (typeof(unsafeWindow) == "undefined" ? window : unsafeWindow);
                unsafeWindow.currentPageIdx = 2;
                unsafeWindow.totalPages = 1;
                unsafeWindow.isBusy = true;
                unsafeWindow.initalLogs = initalLogs = {
                    "status": "success",
                    "data": [],
                    "pageInfo": {"idx": 2, "size": 0, "totalRows": 1, "totalPages": 1, "rows": 1}
                };
            }

            /*// get userF
             var userToken = unsafeWindow.userToken;
             if(!userToken){ // Umgehung fuer Chrome
             var scripts = document.getElementsByTagName("script");
             for(var i=0; i<scripts.length; i++){
             var match = scripts[i].innerHTML.match(/userToken = \'([A-Za-z0-9]*)\'/);
             if(match){
             userToken = match[1];
             break;
             }
             }
             }*/

            // Helper: Add VIP-Icon
            function gclh_add_vip_icon() {
                var elements = $(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).find("a.gclh_vip").not(".gclh_vip_hasIcon");

                for (var i = 0; i < elements.length; i++) {
                    var link = elements[i];
                    var img = link.childNodes[0];
                    var user = link.name;
                    
                    if (in_array(user, vips)) {
                        img.src = img_vip_on;
//--> $$004 Begin of change
//                        img.title = "Remove User " + user + " from VIP-List";
                        img.title = "Remove " + user + " from VIP-List";
//<-- $$004 End of change
                        link.addEventListener("click", gclh_del_vip, false);
                    } else {
                        img.src = img_vip_off;
//--> $$004 Begin of change
//                        img.title = "Add User " + user + " to VIP-List";
                        img.title = "Add " + user + " to VIP-List";
//<-- $$004 End of change
                        link.addEventListener("click", gclh_add_vip, false);
                    }

                    unsafeWindow.$(link).addClass("gclh_vip_hasIcon");

                }
            }

            // Rebuild function - but with full control :)
            function gclh_dynamic_load(logs, num) {
                var isBusy = false;
                var gclh_currentPageIdx = 1, gclh_totalPages = 1;
                var logInitialLoaded = false;
                var browser = (typeof(chrome) !== "undefined") ? "chrome" : "firefox";

                unsafeWindow.$(window).endlessScroll({
                    fireOnce: true,
                    fireDelay: 500,
                    bottomPixels: (($(document).height() - $("#cache_logs_container").offset().top) + 50),
                    ceaseFire: function () {
                        // stop the scrolling if the last page is reached.
                        return (gclh_totalPages < gclh_currentPageIdx);
                    },
                    callback: function () {
                        if (!isBusy && !document.getElementById("gclh_all_logs_marker")) {
                            isBusy = true;
                            $("#pnlLazyLoad").show();

                            if (browser === "firefox") {
                                var logsToAdd = logs.slice(num, num + 10);
                                //injectPageScript("var unsafeWindow = unsafeWindow||window; "+gclh_dynamic_load.toString()+" var settings_hide_top_button="+settings_hide_top_button+"; ");
                                //injectPageScript("("+addNewLogLines.toString()+")(\""+encodeURIComponent(JSON.stringify(logsToAdd))+"\");");
                                addNewLogLines(encodeURIComponent(JSON.stringify(logsToAdd)));
                                num += logsToAdd.length;

                                //gclh_add_vip_icon();
                                window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
//--> $$040 Begin of insert
                                window.postMessage("setLinesColorInCacheListing", "https://www.geocaching.com");
//<-- $$040 End of insert
                            }
                            else {
                                for (var i = 0; i < 10; i++) {
                                    if (logs[num]) {
                                        var newBody = unsafeWindow.$(document.createElement("TBODY"));
                                        unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[num]).appendTo(newBody);
                                        injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
                                        unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                                    }
                                    num++; // num kommt vom vorherigen laden "aller" logs
                                }

                                gclh_add_vip_icon();
//--> $$040 Begin of insert
                                setLinesColorInCacheListing();
//<-- $$040 End of insert
                            }
                            if (!settings_hide_top_button) $("#topScroll").fadeIn();

                            $("#pnlLazyLoad").hide();
                            isBusy = false;
                        }
                    }
                });
            }

            // Load all Logs-Link
            function gclh_load_all_link(logs) {
                function gclh_load_all_logs() {
                    if (logs) {
                        var tbodys = (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).getElementsByTagName("tbody");
                        for (var i = 0; i < tbodys.length; i++) {
                            (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).removeChild(tbodys[i]);
                        }

                        if (browser === "firefox") {
                            injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
                            injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logs)) + "\");");

                            window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
//--> $$040 Begin of insert
                            window.postMessage("setLinesColorInCacheListing", "https://www.geocaching.com");
//<-- $$040 End of insert

                        }
                        else {
                            for (var i = 0; i < logs.length; i++) {
                                if (logs[i]) {
                                    var newBody = unsafeWindow.$(document.createElement("TBODY"));
                                    unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[i]).appendTo(newBody);
                                    injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
                                    unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                                }
                            }

                            gclh_add_vip_icon();
//--> $$040 Begin of insert
                            setLinesColorInCacheListing();
//<-- $$040 End of insert
                        }
                        // Marker to disable dynamic log-load
                        var marker = document.createElement("a");
                        marker.setAttribute("id", "gclh_all_logs_marker");
                        document.getElementsByTagName("body")[0].appendChild(marker);
                    }
                }

                var load_all = document.createElement("a");
                load_all.appendChild(document.createTextNode("Show all logs"));
                load_all.setAttribute("href", "javascript:void(0);");
                load_all.setAttribute("id", "gclh_load_all_logs");
                document.getElementById("ctl00_ContentBody_uxLogbookLink").parentNode.appendChild(document.createTextNode(" | "));
                document.getElementById("ctl00_ContentBody_uxLogbookLink").parentNode.appendChild(load_all);

// prevent line-break error
                document.getElementById("ctl00_ContentBody_uxLogbookLink").parentNode.style.margin = "0";
                var para = document.getElementById('ctl00_ContentBody_lblFindCounts').nextSibling.nextSibling.nextSibling.nextSibling;
                if (para && para.nodeName == 'P') {
                    para.className = para.className + ' Clear';
                }

                load_all.addEventListener("click", gclh_load_all_logs, false);
            }

            // Filter Log-Types
            function gclh_filter_logs(logs) {
                function gclh_filter_logs() {
                    if (!this.childNodes[0]) return false;
                    var log_type = this.childNodes[0].title;
                    if (!log_type) return false;
                    if (!logs) return false;

                    var tbodys = (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).getElementsByTagName("tbody");
                    for (var i = 0; i < tbodys.length; i++) {
                        (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).removeChild(tbodys[i]);
                    }
                    if (browser === "firefox") {
                        var logsToAdd = [];

                        for (var i = 0; i < logs.length; i++) {
                            if (logs[i] && logs[i].LogType == log_type) {
                                logsToAdd.push(logs[i]);
                            }
                        }

                        injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
                        injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logsToAdd)) + "\");");

                        window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
//--> $$040 Begin of insert
                        window.postMessage("setLinesColorInCacheListing", "https://www.geocaching.com");
//<-- $$040 End of insert
                    }
                    else {
                        for (var i = 0; i < logs.length; i++) {
                            if (logs[i] && logs[i].LogType == log_type) {
                                var newBody = unsafeWindow.$(document.createElement("TBODY"));
                                unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[i]).appendTo(newBody);
                                injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
                                unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                            }
                        }

                        gclh_add_vip_icon();
//--> $$040 Begin of insert
                        setLinesColorInCacheListing();
//<-- $$040 End of insert
                    }

                    // Marker to disable dynamic log-load
                    var marker = document.createElement("a");
                    marker.setAttribute("id", "gclh_all_logs_marker");
                    document.getElementsByTagName("body")[0].appendChild(marker);
                }

                if (!document.getElementById("ctl00_ContentBody_lblFindCounts").childNodes[0]) return false;
                var legend = document.getElementById("ctl00_ContentBody_lblFindCounts").childNodes[0];
                var new_legend = document.createElement("p");
                new_legend.className = "LogTotals";

                for (var i = 0; i < legend.childNodes.length; i++) {
                    if (legend.childNodes[i].tagName == "IMG") {
                        var link = document.createElement("a");
                        link.setAttribute("href", "javascript:void(0);");
                        link.style.textDecoration = 'none';
                        link.addEventListener("click", gclh_filter_logs, false);

                        link.appendChild(legend.childNodes[i].cloneNode(true));
                        i++;
                        link.appendChild(legend.childNodes[i].cloneNode(true));
                        new_legend.appendChild(link);
                    }
                }
                document.getElementById('ctl00_ContentBody_lblFindCounts').replaceChild(new_legend, legend);
            }

            function gclh_search_logs(logs) {
                function gclh_search(e) {
                    if (e.keyCode != 13) return false;
                    if (!logs) return false;
                    var search_text = this.value;
                    if (!search_text) return false;

                    var regexp = new RegExp("(" + search_text + ")", "i");

                    var tbodys = (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).getElementsByTagName("tbody");
                    for (var i = 0; i < tbodys.length; i++) {
                        (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).removeChild(tbodys[i]);
                    }
                    if (browser === "firefox") {
                        var logsToAdd = [];

                        for (var i = 0; i < logs.length; i++) {
                            if (logs[i] && (logs[i].UserName.match(regexp) || logs[i].LogText.match(regexp))) {
                                logsToAdd.push(logs[i]);
                            }
                        }

                        injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
                        injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logsToAdd)) + "\");");

                        window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
//--> $$040 Begin of insert
                        window.postMessage("setLinesColorInCacheListing", "https://www.geocaching.com");
//<-- $$040 End of insert

                    }
                    else {
                        for (var i = 0; i < logs.length; i++) {
                            if (logs[i] && (logs[i].UserName.match(regexp) || logs[i].LogText.match(regexp))) {
                                var newBody = unsafeWindow.$(document.createElement("TBODY"));
                                unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[i]).appendTo(newBody);
                                injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
                                unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                            }
                        }

                        gclh_add_vip_icon();
//--> $$040 Begin of insert
                        setLinesColorInCacheListing();
//<-- $$040 End of insert
                    }

                    // Marker to disable dynamic log-load
                    var marker = document.createElement("a");
                    marker.setAttribute("id", "gclh_all_logs_marker");
                    document.getElementsByTagName("body")[0].appendChild(marker);
                }

                if (!document.getElementById("ctl00_ContentBody_lblFindCounts").childNodes[0]) return false;
                var form = document.createElement("form");
                var search = document.createElement("input");
                form.setAttribute("action", "javascript:void(0);");
                form.appendChild(search);
                form.style.display = "inline";
                search.setAttribute("type", "text");
                search.setAttribute("size", "10");
                search.addEventListener("keyup", gclh_search, false);
                document.getElementById('ctl00_ContentBody_lblFindCounts').childNodes[0].appendChild(document.createTextNode("Search in logtext: "));
                document.getElementById('ctl00_ContentBody_lblFindCounts').childNodes[0].appendChild(form);
            }

            // Load "num" Logs
            function gclh_load_logs(num) {
                var data = new Array();
                var requestCount = 1;
                var logs = new Array();
                var numPages = 1;
                var curIdx = 1;

                if (document.getElementById("gclh_vip_list")) {
                    var span_loading = document.createElement("span");
                    span_loading.innerHTML = '<img src="/images/loading2.gif" class="StatusIcon" alt="Loading" />Loading Cache Logs...';
                    document.getElementById("gclh_vip_list").appendChild(span_loading);
                }
                if (document.getElementById("gclh_vip_list_nofound")) {
                    var span_loading = document.createElement("span");
                    span_loading.innerHTML = '<img src="/images/loading2.gif" class="StatusIcon" alt="Loading" />Loading Cache Logs...';
                    document.getElementById("gclh_vip_list_nofound").appendChild(span_loading);
                }

                function gclh_load_helper(count) {

                    var url = http + "://www.geocaching.com/seek/geocache.logbook?tkn=" + userToken + "&idx=" + curIdx + "&num=100&decrypt=false";
                    //$("#pnlLazyLoad").show();

                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        onload: function (response) {

                            requestCount--;
                            var dataElement = JSON.parse(response.responseText);
                            data[dataElement.pageInfo.idx] = dataElement;
                            gclh_log("Loading Logs Status: " + response.statusText + " - idx: " + dataElement.pageInfo.idx);

                            if (numPages == 1) {
                                numPages = data[count].pageInfo.totalPages;
                                for (curIdx = 2; curIdx <= numPages; curIdx++) {
                                    requestCount++;
                                    gclh_load_helper(curIdx);
                                }
                                ;
                            }

                            if (requestCount <= 0) {
                                gclh_load_dataHelper();
                            }
                        }
                    });
                }

                function gclh_load_dataHelper() {
                    logs = new Array();
                    // disable scroll Function on Page
                    if (browser === "chrome" || browser === "firefox") {
                        injectPageScriptFunction(disablePageAutoScroll, "()");
                    }
                    else {
                        disablePageAutoScroll();
                    }

                    if (browser !== "firefox") {
                        (document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).removeEventListener('DOMNodeInserted', loadListener);
                    }

                    // Hide initial Logs
                    var tbodys = document.getElementById("cache_logs_table").getElementsByTagName("tbody");
                    if (tbodys.length > 0) {
                        var shownLogs = tbodys[0].children.length;
                        if (shownLogs > 0 && num < shownLogs) {
                            num = shownLogs;
                        }
                    }
                    
                    var tableContent = unsafeWindow.$("#cache_logs_table").after('<table id="cache_logs_table2" class="LogsTable NoBottomSpacing"> </table>').hide().children().remove();
                    unsafeWindow.$(tableContent).find('tbody').children().remove();
                    unsafeWindow.$('#cache_logs_table2').append(tableContent);
                    $(tableContent).find('.log-row').remove();

                    //$("#pnlLazyLoad").hide();
                    for (var z = 1; z <= numPages; z++) {
                        var json = data[z];

                        logs = logs.concat(json.data);


                        for (var i = 0; i < json.data.length; i++) {
                            var user = json.data[i].UserName;

                            if (settings_show_vip_list) {
                                all_users.push(user);

                                if (!log_infos[user]) log_infos[user] = new Array();
                                log_infos[user][index] = new Object();
                                log_infos[user][index]["icon"] = "/images/logtypes/" + json.data[i].LogTypeImage;
                                log_infos[user][index]["id"] = json.data[i].LogID;
                                log_infos[user][index]["date"] = json.data[i].Visited;
                                log_infos[user][index]["log"] = json.data[i].LogText;
                                log_infos_long[index] = new Object();
                                log_infos_long[index]["user"] = user;
                                log_infos_long[index]["icon"] = "/images/logtypes/" + json.data[i].LogTypeImage;
                                log_infos_long[index]["id"] = json.data[i].LogID;
                                log_infos_long[index]["date"] = json.data[i].Visited;
                                log_infos_long[index]["log"] = json.data[i].LogText;
                                index++;
                            }
                        }

                    }

                    // Add Links
                    gclh_load_all_link(logs); // Load all Logs
                    gclh_filter_logs(logs); // Filter Logs
                    gclh_search_logs(logs); // Search Field

//--> $$005 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//                    if (browser === "firefox") {
//                        if (num == 0) {
//                            injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
//                            injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logs)) + "\");");
//                        } else {
//                            var logsToAdd = logs.slice(0, num - 1);
//                            if (browser === "firefox") {
//                                //injectPageScript("var unsafeWindow = unsafeWindow||window; "+gclh_dynamic_load.toString()+" "+gclh_add_vip_icon.toString()+ " " +in_array.toString()+" var vips=\""+encodeURIComponent(JSON.stringify(vips))+"\";"+" var img_vip_off=\""+encodeURIComponent(JSON.stringify(img_vip_off))+"\";"+" var img_vip_on=\""+encodeURIComponent(JSON.stringify(img_vip_on))+"\";");
//                                injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
//                                injectPageScript(addNewLogLines.toString());
//                                injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logsToAdd)) + "\"); gclh_dynamic_load(JSON.parse(decodeURIComponent(\"" + encodeURIComponent(JSON.stringify(logs)) + "\"))," + num + ");");
//                            }
//                            else {
//                                gclh_dynamic_load(logs, num);
//                            }
//                        }
//                        if (settings_show_vip_list) {
//                            gclh_build_vip_list();
//
//                            window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
//                            //(document.getElementById("cache_logs_table2")||document.getElementById("cache_logs_table")).addEventListener('DOMNodeInserted', loadListener);
//                        }
//                    }
//                    else {
//                        if (num == 0) {
//                            var newBody = unsafeWindow.$(document.createElement("TBODY"));
//                            unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs).appendTo(newBody);
//                            injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
//                            unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
//                        } else {
//                            for (var i = 0; i < num; i++) {
//                                if (logs[i]) {
//                                    var newBody = unsafeWindow.$(document.createElement("TBODY"));
//                                    unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[i]).appendTo(newBody);
//                                    injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
//                                    unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
//                                }
//                            }
//                            gclh_dynamic_load(logs, num);
//                        }
//
//                        if (settings_show_vip_list) {
//                            gclh_build_vip_list();
//
//                            gclh_add_vip_icon();
//                        }
//                    }
//                }
//
//                gclh_load_helper(1);
//            }
//
//            if (settings_show_all_logs) gclh_load_logs(settings_show_all_logs_count);
//            else gclh_load_logs(5);
//        }
//<-- $$005 End of delete 
                    
//--> $$005 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
                    if (browser === "firefox") {
                        var logsToAdd = logs.slice(0, num - 1);
                        injectPageScript("var unsafeWindow = unsafeWindow||window; " + gclh_dynamic_load.toString() + " var settings_hide_top_button=" + settings_hide_top_button + "; ");
                        injectPageScript(addNewLogLines.toString());
                        injectPageScript("(" + addNewLogLines.toString() + ")(\"" + encodeURIComponent(JSON.stringify(logsToAdd)) + "\"); gclh_dynamic_load(JSON.parse(decodeURIComponent(\"" + encodeURIComponent(JSON.stringify(logs)) + "\"))," + num + ");");

                        if (settings_show_vip_list) {
                            gclh_build_vip_list();
                            window.postMessage("gclh_add_vip_icon", "https://www.geocaching.com");
                        }
//--> $$040 Begin of insert
                        window.postMessage("setLinesColorInCacheListing", "https://www.geocaching.com");
//<-- $$040 End of insert
                    } else {
                        for (var i = 0; i < num; i++) {
                            if (logs[i]) {
                                var newBody = unsafeWindow.$(document.createElement("TBODY"));
                                unsafeWindow.$("#tmpl_CacheLogRow_gclh").tmpl(logs[i]).appendTo(newBody);
                                injectPageScript("$('a.tb_images').fancybox({'type': 'image', 'titlePosition': 'inside'});");
                                unsafeWindow.$(document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table")).append(newBody.children());
                            }
                        }
                        gclh_dynamic_load(logs, num);

                        if (settings_show_vip_list) {
                            gclh_build_vip_list();
                            gclh_add_vip_icon();
                        }
//--> $$040 Begin of insert
                        setLinesColorInCacheListing();
//<-- $$040 End of insert
                    }
                }
                gclh_load_helper(1);
            }
            if (settings_show_all_logs) {
                if (settings_show_all_logs_count == 0) gclh_load_logs(5000);
                else gclh_load_logs(settings_show_all_logs_count);
            } else gclh_load_logs(5);
        }
//<-- $$005 End of insert
    } catch (e) {
        gclh_error("Replace Log-Loading function", e);
    }

//--> $$040 Begin of insert
// Zeilen in Cache Listings in Zebra und für User, für Owner, für Reviewer und für VIP einfärben.
    function setLinesColorInCacheListing() {
        if ( is_page("cache_listing") ) {
            // ('find("tr")' reicht hier nicht wegen der Bilder.)               
            var lines = $( document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table") ).find("tbody").find("tr.log-row");
            var owner = get_real_owner();
            setLinesColorInZebra( settings_show_cache_listings_in_zebra, lines, 1 );
            setLinesColorUser( "settings_show_cache_listings_color", "user,owner,reviewer,vips", lines, 1, owner );
        }                
    }
//<-- $$040 End of insert
    
//--> $$040 Begin of insert
// Bei Click auf VIP Icon, Einfärbung für VIP neu machen.
    function setLinesColorVip( user ) {
        if ( is_page("cache_listing") ) {
            var lines = $( document.getElementById("cache_logs_table2") || document.getElementById("cache_logs_table") ).find("tbody").find("tr.log-row");
            var count = 1;
            var owner = get_real_owner();
            var parameterStamm = "settings_show_cache_listings_color";
        }
        else if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx/) ) {
            var lines = $("table.Table").find("tbody").find("tr");  
            var count = 2;
            var owner = document.getElementById("ctl00_ContentBody_BugDetails_BugOwner").innerHTML;
            var parameterStamm = "settings_show_tb_listings_color";
        }
        var linesNew = new Array();
        for (var i = 0; i < lines.length; i++) {
            var aTags = lines[i].getElementsByTagName("a");
            for (var j = 0; j < aTags.length; j++) {
                if ( aTags[j].getAttribute("name") == user ) { 
                    for (var k = 0; k < count; k++) {
                        linesNew.push(lines[i+k]);
                    }
                }
            }
        }
        if ( linesNew.length > 0 ) {
            setLinesColorUser( parameterStamm, "user,owner,reviewer,vips", linesNew, count, owner );
        }
    }
//<-- $$040 End of insert

//--> $$040 Begin of insert
// Farben für Zeilen in gewöhnlichen Listen und im TB Listing setzen. Nicht im Cache Listing.    
    try {
        // Hintergrund der Tabellenzeilen/Listzeilen einheitlich einfärben.
        var css = "table.Table tr.AlternatingRow td, .AlternatingRow, table.Table tr td.AlternatingRow { background-color: #" + getValue( "settings_lines_color_zebra") + " !important; }"
                + "table.Table tr.TertiaryRow td, .TertiaryRow, table.Table tr td.TertiaryRow { background-color: #" + getValue( "settings_lines_color_user") + " !important; }"
                + "table.Table tr.QuaternaryRow td, .QuaternaryRow, table.Table tr td.QuaternaryRow { background-color: #" + getValue( "settings_lines_color_owner") + " !important; }"
                + "table.Table tr.QuinaryRow td, .QuinaryRow, table.Table tr td.QuinaryRow { background-color: #" + getValue( "settings_lines_color_reviewer") + " !important; }"
                + "table.Table tr.SenaryRow td, .SenaryRow, table.Table tr td.SenaryRow { background-color: #" + getValue( "settings_lines_color_vip") + " !important; }";
        appendCssStyle( css );

        // Bookmarklisten: Zeilen in Bookmarklisten in Zebra einfärben und die Funde des Users einfärben.
        // Die Bookmarklisten scheinen die einzigen Listen, bei denen das nicht vorgesehen ist.
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/bookmarks\/view\.aspx\?guid=/)) {
            var lines = $("table.Table").find("tbody").find("tr");
            setLinesColorInZebra( settings_show_common_lists_in_zebra, lines, 2 );
            setLinesColorUser( "settings_show_common_lists_color", "user", lines, 2, "" );
        }
        // TB Listing: Zeilen in TB Listings in Zebra, für User, für Owner, für Reviewer und für VIP einfärben.
        else if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx\?/) ) {
            var lines = $("table.Table").find("tbody").find("tr");  
            if ( lines.length > 1 ) {
                var linesNew = lines.slice(0, -1);
                var owner = document.getElementById("ctl00_ContentBody_BugDetails_BugOwner").innerHTML;
                setLinesColorInZebra( settings_show_tb_listings_in_zebra, linesNew, 2 );
                setLinesColorUser( "settings_show_tb_listings_color", "user,owner,reviewer,vips", linesNew, 2, owner );
            }
        }
        // Andere Listen: Bei Zeilen in anderen Listen gegebenenfalls Einfärbung für Zebra oder User entfernen.
        else if ( !is_page("cache_listing") ) {
            if ( settings_show_common_lists_in_zebra == false ){
                var lines = $("table").find("tbody").find("tr");
                var replaceSpec = /(AlternatingRow)(\s*)/g;
                setLinesColorNone( lines, replaceSpec );
            }            
            if ( settings_show_common_lists_color_user == false ){
                var lines = $("table").find("tbody").find("tr");
                var replaceSpec = /(TertiaryRow)(\s*)/g;
                setLinesColorNone( lines, replaceSpec );

                // Wenn der User nicht eingefärbt werden soll, Zebra aber ausgewählt ist, dann muss Zebra leider explizit 
                // gesetzt werden, weil nur ein Wert im Standard gesetzt wurde, hier eben der Wert für User - blöd.
                if ( settings_show_common_lists_in_zebra ) {
                    if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/seek\/nearest\.aspx\?/)          ||      // - Pocket Query oder ähnlich 
                         document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/recentlyviewedcaches\.aspx/)    ) {  //   oder Recently Viewed,
                        var lines = $("table.Table").find("tbody").find("tr").slice(1);                                           //   dann Überschrift weglassen.
                        setLinesColorInZebra( settings_show_tb_listings_in_zebra, lines, 1 );                                     //   Einzeilig.
                    }
                }
            }            
        }
    } catch (e) {
        gclh_error("Color lines in lists", e);
    }
//<-- $$040 End of insert
    
//// Show Route-It button at Listing
//try{
//  if(document.location.href.match(/^http:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx/) && document.getElementById('uxLatLon') && getValue("home_lat")){
//    var coords = toDec(document.getElementById("uxLatLon").innerHTML);
//    var link;
//     if(document.getElementById("uxLatLonLink") != null){ //If server deliver userDefinedCoords.status="fail", then link will be null
//    link = document.getElementById("uxLatLonLink").parentNode;
//    }
//    else{
//    link = document.getElementById("uxLatLon").parentNode;
//    }
//    var a = document.createElement("a");
//    var small = document.createElement("small");
//    var name = "";
//    if(document.getElementById("ctl00_ContentBody_CacheName")) name = "+("+trim(document.getElementById("ctl00_ContentBody_CacheName").innerHTML)+")";
//    a.setAttribute("href","http://maps.google.com/?saddr="+(getValue("home_lat")/10000000)+","+(getValue("home_lng")/10000000)+"+(HomeCoords)&daddr="+coords[0]+","+coords[1]+name);
//    a.setAttribute("target","_blank");
//    a.appendChild(document.createTextNode("Route to this Location"));
//    small.appendChild(document.createTextNode(" - "));
//    small.appendChild(a);
//    link.appendChild(small);
//  }
//}catch(e){ gclh_error("Route It Button",e); }

// Fix decrypted Hint linefeeds
    try {
        if (document.getElementById('div_hint')) {
            function gclh_repair_hint() {
                document.getElementById('div_hint').innerHTML = document.getElementById('div_hint').innerHTML.replace(/<c>/g, "<p>");
                document.getElementById('div_hint').innerHTML = document.getElementById('div_hint').innerHTML.replace(/<\/c>/g, "</p>");
            }

            gclh_repair_hint();
            document.getElementById('ctl00_ContentBody_lnkDH').addEventListener("click", gclh_repair_hint, false);
        }
    } catch (e) {
        gclh_error("Fix decrypted Hint linefeed", e);
    }

//--> $$040 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Improve Search Lists color
//    try {
//        var css = "table.Table tr.TertiaryRow td, .TertiaryRow, table.Table tr td.TertiaryRow { background-color: #c2e0c3; }";
//        var head = document.getElementsByTagName('head')[0];
//        var style = document.createElement('style');
//        style.type = 'text/css';
//        style.innerHTML = css;
//        head.appendChild(style);
//    } catch (e) {
//        gclh_error("Improve Search List colors", e);
//    }
//<-- $$040 End of delete 

//--> $$040 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Improve Trackable Log Lists Color
//    try {
//        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/track\/details\.aspx\?/)) {
//            // css code copied from feature "Improve Search Lists color"
//            var css = "table.Table tr.QuaternaryRow td, .QuaternaryRow, table.Table tr td.QuaternaryRow { background-color: #e0e0c3; }";
//            var head = document.getElementsByTagName('head')[0];
//            var style = document.createElement('style');
//            style.type = 'text/css';
//            style.innerHTML = css;
//            head.appendChild(style);
//
//            var me = $('.li-user-info').children().first().text();
//            var owner = document.getElementById("ctl00_ContentBody_BugDetails_BugOwner").innerHTML;
//            var trLogs = document.getElementsByClassName("Data");
//            for (var i = 0; i < trLogs.length; i += 2) {
//                var aLog = trLogs[i].getElementsByTagName("a");
//                if (aLog.length == 0) break;
//                var logger = aLog[0].innerHTML;
//                if (logger === me)
//                    for (var j = 0; j < 2; j++)
//                        trLogs[i + j].className += " TertiaryRow";    // Das geht nicht mehr, weil teils AlternatingRow in der class steht, das Erste zählt.
//                else if (logger === owner)
//                    for (var j = 0; j < 2; j++)
//                        trLogs[i + j].className += " QuaternaryRow";  // Das geht nicht mehr, weil teils AlternatingRow in der class steht, das Erste zählt.
//            }
//        }
//    } catch (e) {
//        gclh_error("Improve Trackable Log Lists Color", e);
//    }
//<-- $$040 End of delete 

// Hide Navi on SignIn-Overlay
    try {
        function hide_navi() {
            var navi = document.getElementById('Navigation');
            if (navi.style.display == "") navi.style.display = "none";
            else navi.style.display = "";
        }

        if (document.getElementById('hlSignIn')) document.getElementById('hlSignIn').addEventListener("click", hide_navi, false);
        if (document.getElementById('ctl00_hlSignInClose')) document.getElementById('ctl00_hlSignInClose').addEventListener("click", hide_navi, false);
    } catch (e) {
        gclh_error("Hide Navi on SignIn-Overlay", e);
    }

// Save HomeCoords for special bookmarks - From Manage Home Location
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/account\/ManageLocations\.aspx/)) {
            function setCoordsHelper() {
                if (document.getElementById("LatLng")) {
                    var search_value = document.getElementById("LatLng").innerHTML;

                    if (search_value.match(/([0-9]+)°([0-9]+)\.([0-9]+)′(N|S), ([0-9]+)°([0-9]+)\.([0-9]+)′(W|E)/) || search_value.match(/^(N|S) ([0-9][0-9]). ([0-9][0-9])\.([0-9][0-9][0-9]) (E|W) ([0-9][0-9][0-9]). ([0-9][0-9])\.([0-9][0-9][0-9])$/)) {
                        var latlng = toDec(search_value);

                        if (getValue("home_lat", 0) != parseInt(latlng[0] * 10000000)) setValue("home_lat", parseInt(latlng[0] * 10000000)); // * 10000000 because GM don't know float
                        if (getValue("home_lng", 0) != parseInt(latlng[1] * 10000000)) setValue("home_lng", parseInt(latlng[1] * 10000000));
                    }
                }
            }

            window.addEventListener("load", setCoordsHelper, false); // On first hit, the search-field is filled after loading - so we have to wait
        }

        // Save HomeCoords - From Account Details
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/account\/default\.aspx/)) {
            var link = document.getElementById('ctl00_ContentBody_uxMapLocations_ctl01_uxMapLocation');

            if (link) {
                var match = link.innerHTML.match(/((N|S) [0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9] (E|W) [0-9][0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9])/);
                if (match[1]) {
                    var latlng = toDec(match[1]);

                    if (getValue("home_lat", 0) != parseInt(latlng[0] * 10000000)) setValue("home_lat", parseInt(latlng[0] * 10000000)); // * 10000000 because GM don't know float
                    if (getValue("home_lng", 0) != parseInt(latlng[1] * 10000000)) setValue("home_lng", parseInt(latlng[1] * 10000000));
                }
            }
        }
    } catch (e) {
        gclh_error("Save Homecoords", e);
    }

// Save uid for special bookmarks - From My Profile
    try {
        if (document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\//)) {
            var links = document.getElementsByTagName("a");

            for (var i = 0; i < links.length; i++) {
                if (links[i].href.match(/\/track\/search\.aspx\?o=1\&uid=/)) {
                    var uid = links[i].href.match(/\/track\/search\.aspx\?o=1\&uid=(.*)/);
                    uid = uid[1];

                    if (getValue("uid", "") != uid) setValue("uid", uid);
                }
            }
        }
    } catch (e) {
        gclh_error("Save uid", e);
    }

//--> $$049 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// count cache matrix on statistics page or profile page
//    try {
//        if (isLocation("my/statistics.aspx") || isLocation("profile/?guid")) {
//            var table = document.getElementById('ctl00_ContentBody_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable');
//            if (null == table) {
//                // on the profile page the ID is different than on the statistics page
//                table = document.getElementById("ctl00_ContentBody_ProfilePanel1_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable");
//            }
//            if (table) {
//                var zeros = 0;
//                var cells = table.getElementsByTagName('td');
//                for (var i = 0; i < cells.length; i++) {
//                    var cell = cells[i];
//                    if (cell.className == 'stats_cellzero') {
//                        zeros++;
//                    }
//                }
//                var foundMatrix = (9 * 9) - zeros;
//                var link = document.getElementById('uxDifficultyTerrainHelp');
//                if (link) {
//                    var headline = link.previousSibling;
//                    if (headline) {
//                        headline.nodeValue += (' (' + foundMatrix + '/' + (9 * 9) + ')');
//                    }
//                }
//            }
//        }
//    } catch (e) {
//        gclh_error("Count Cache Matrix", e);
//    }
//<-- $$049 End of delete 
    
//--> $$049 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Improve cache matrix on statistics page and profile page and handle cache search links in list or map.
    try {
        // Soll eigene Statistik gepimpt werden.
        if ( ( settings_count_own_matrix || settings_count_own_matrix_show_next ) && 
             ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/statistics\.aspx/)     ||
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/$/)               ||
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/#$/)              ||
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/default\.aspx$/)  ||
               document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/default\.aspx#$/) ||
               ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/(\?guid=|\?u=)/)   && 
                 document.getElementById('ctl00_ContentBody_lblUserProfile').innerHTML.match(": " + $('.li-user-info').children().first().text()) ) ) ) {
            var own = true;
        // Soll fremde Statistik gepimpt werden.
        } else if ( settings_count_foreign_matrix && 
                    document.location.href.match(/^https?:\/\/www\.geocaching\.com\/profile\/(\?guid=|\?u=)/) && 
                    !document.getElementById('ctl00_ContentBody_lblUserProfile').innerHTML.match(": " + $('.li-user-info').children().first().text()) ) {
            var own = false;
        } else var own = "";
        // Wenn Statistik gepimpt werden soll.
        if ( own !== "" ) {
            // Matrix ermitteln.
            if ( document.getElementById('ctl00_ContentBody_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable') ) {
                var table = document.getElementById('ctl00_ContentBody_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable');
            } else if ( document.getElementById("ctl00_ContentBody_ProfilePanel1_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable") ) {
                var table = document.getElementById("ctl00_ContentBody_ProfilePanel1_StatsDifficultyTerrainControl1_uxDifficultyTerrainTable");
            }
            if (table) {
                // Matrixerfüllung berechnen. 
                var smallest = parseInt(table.getElementsByClassName("stats_cellfooter_grandtotal")[0].innerHTML);
                var count = 0;
                var cells = table.getElementsByTagName('td');
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];
                    if ( cell.id.match(/^([1-9]{1})(_{1})([1-9]{1})$/) ) {
                        if ( parseInt(cell.innerHTML) == smallest ) {
                            count++;
                        } else if ( parseInt(cell.innerHTML) < smallest ) {
                            smallest = parseInt(cell.innerHTML);
                            count = 1;
                        }
                    }
                }
                // Matrixerfüllung ausgeben. 
                if ( ( own == true && settings_count_own_matrix == true )      ||
                     ( own == false && settings_count_foreign_matrix == true )    ) {
                    if ( smallest > 0 ) var matrix = " (" + smallest + " complete and (" + (81 - count) + "/81))";
                    else var matrix = " (" + (81 - count) + "/81)";
                    if ( document.getElementById('uxDifficultyTerrainHelp').previousSibling ) {
                        var side = document.getElementById('uxDifficultyTerrainHelp').previousSibling;
                        side.nodeValue += matrix;
                    }
                }
                // Nächste mögliche Matrixes farblich kennzeichnen und Search Link und Title setzen. 
                if ( own == true && settings_count_own_matrix_show_next == true ) {
                    var from = smallest;
                    var to = smallest - 1 + parseInt(settings_count_own_matrix_show_count_next);
                    var color = "#" + settings_count_own_matrix_show_color_next;
                    for (var i = 0; i < cells.length; i++) {
                        var cell = cells[i];
                        if ( cell.id.match(/^([1-9]{1})(_{1})([1-9]{1})$/) ) {
                            if ( from <= parseInt(cell.innerHTML) && parseInt(cell.innerHTML) <= to ) {
                                cell.style.color = "black";
                                var diff = parseInt(cell.innerHTML) - from;
                                switch (diff) {
                                    case 0: cell.style.backgroundColor = color;  break;
                                    case 1: cell.style.backgroundColor = color + "99"; break;
                                    case 2: cell.style.backgroundColor = color + "65"; break;
                                    case 3: cell.style.backgroundColor = color + "40"; break;
                                }
                                if ( settings_count_own_matrix_links_radius != 0 ) {
                                    var terrain = parseInt(cell.id.match(/^([1-9]{1})(_{1})([1-9]{1})$/)[3]) * 0.5 + 0.5;
                                    var difficulty = parseInt(cell.id.match(/^([1-9]{1})(_{1})([1-9]{1})$/)[1]) * 0.5 + 0.5;
                                    var user = $('.li-user-info').children().first().text();
                                    var aTag = document.createElement('a');
                                    aTag.href = "/play/search/?origin=" + DectoDeg(getValue("home_lat"), getValue("home_lng"))
                                              + "&radius=" + settings_count_own_matrix_links_radius + "km" 
                                              + "&t=" + terrain + "&d=" + difficulty + "&nfb[0]=" + user + "&f=2&o=2&nfb\[1\]=GClh";
                                    if ( settings_count_own_matrix_links == "map" ) aTag.href += "#GClhMap";
                                    else aTag.href += "#searchResultsTable";
                                    aTag.title = "Search D" + difficulty + "/T" + terrain + " radius " + settings_count_own_matrix_links_radius + " km from home";
                                    aTag.target = "_blank";
                                    aTag.style.color = "black";
                                    aTag.appendChild(document.createTextNode( cell.innerHTML ));
                                    cell.innerHTML = "";
                                    cell.appendChild(aTag);
                                }
                            }
                        }
                    }
                }
            }
        }
        // Handle cache search links in list or map.
        if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/play\/search\/@(.*)&nfb\[1\]=GClh/) ) {
            $('#map_container').remove();
            $('.selected-filters').remove();
            if ( document.location.href.match(/#GClhMap/) ) {
                if ( document.getElementsByClassName('btn-map-these') ) {
                    location.replace(document.getElementsByClassName('btn-map-these')[0].href);
                    $('.content-slide').remove();
                }
            }
        }
    } catch (e) {
        gclh_error("improve cache matrix", e);
    }
//<-- $$049 End of insert

// add mailto-link to profilpage
    try {
        if ((isLocation("/profile/?guid=") || isLocation("/profile/default.aspx?guid=") || isLocation("/profile/?u=") || isLocation("/profile/default.aspx?u=") || isLocation("/profile/?id=") || isLocation("/profile/default.aspx?id=")) && document.getElementById('ctl00_ContentBody_ProfilePanel1_lnkEmailUser')) {
            var messagelink = document.getElementById('ctl00_ContentBody_ProfilePanel1_lnkEmailUser');
            var messagelinktext = messagelink.innerHTML;
            if (messagelinktext.match(/^.+@.+\..+$/)) {
                var mailtolink = document.createElement('a');
                mailtolink.href = "mailto:" + messagelinktext + '?subject=[GC]';
                mailtolink.appendChild(document.createTextNode("(@)"));
                var messagelinkparent = messagelink.parentNode;
                messagelinkparent.appendChild(document.createTextNode(" "));
                messagelinkparent.appendChild(mailtolink);
            }
        }
    } catch (e) {
        gclh_error("add mailto-link to profilepage", e);
    }

//--> $$058 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Special Links
//    try {
//        // Redirect to Neares List/Map
//        function linkToNearesList() {
//            if (homeCoordinatesSet()) {
//                document.location.href = http + "://www.geocaching.com/seek/nearest.aspx?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000) + "&dist=25&disable_redirect";
//            }
//        }
//
//        addLinkEvent('lnk_nearestlist', linkToNearesList);
//
//        function linkToNearesMap() {
//            if (homeCoordinatesSet()) {
//                document.location.href = map_url + "?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000);
//            }
//        }
//
//        addLinkEvent('lnk_nearestmap', linkToNearesMap);
//
//        // Redirect to Neares List without Founds
//        function linkToNearesListWo() {
//            if (homeCoordinatesSet()) {
//                document.location.href = http + "://www.geocaching.com/seek/nearest.aspx?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000) + "&dist=25&f=1&disable_redirect";
//            }
//        }
//
//        addLinkEvent('lnk_nearestlist_wo', linkToNearesListWo);
//
//        // Redirect to My Trackables
//        function linkToMyTrackables() {
//            if (getValue("uid", "") == "") {
//                if (window.confirm("To use this Link, the script has to know your uid. Just load the \"My Profile\" site and the script will save it automatically.")) document.location.href = http + "://www.geocaching.com/my/";
//            } else {
//                document.location.href = http + "://www.geocaching.com/track/search.aspx?o=1&uid=" + getValue("uid");
//            }
//        }
//
//        addLinkEvent('lnk_my_trackables', linkToMyTrackables);
//
//        // Redirect + JS-Exec
//        function linkToGeocaches() {
//            setValue("doPostBack_after_redirect", 'ctl00$ContentBody$ProfilePanel1$lnkUserStats');
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profilegeocaches', linkToGeocaches);
//
//        function linkToTrackables() {
//            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkCollectibles");
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profiletrackables', linkToTrackables);
//
//        function linkToGallery() {
//            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkGallery");
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profilegallery', linkToGallery);
//        addLinkEvent('lnk_profilegallery2', linkToGallery);
//
//        function linkToBookmarks() {
//            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkLists");
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profilebookmarks', linkToBookmarks);
//
//        function linkToSouvenirs() {
//            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkSouvenirs");
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profilesouvenirs', linkToSouvenirs);
//
//        function linkToStatistics() {
//            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkStatistics");
////--> $$002 Begin of change
////            document.location.href = "/profile/default.aspx";
//            document.location.href = http + "://www.geocaching.com/profile/default.aspx";
////<-- $$002 End of change
//        }
//
//        addLinkEvent('lnk_profilestatistics', linkToStatistics);
//        
//        // Create and hide the "Find Player" Form
//        function createFindPlayerForm() {
//<-- $$058 End of delete 

//--> $$058 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Special Links in Linklist.
// ( Diese Links stehen in der Linklist zur Verfügung. Links zum Profile dann in zwei Schritten über href und dann über 
//   doPostBack_after_redirect zum entsprechenden Tab. Letzteres wird dann zu Beginn des Helpers bei "Run after Redirect" verarbeitet. )    
    try {
        // Links ausführen in Abhängigkeit vom Eventtype linke (click) oder rechte Maustaste (contextmenu).
        function linkToDo(event, link) {
            if ( event.type == "contextmenu" ) {
                window.open( link );
            } else {
                document.location.href = link;
            }
        }

        // Redirect to Neares List.
        function linkToNearesList(event) {
            if (homeCoordinatesSet()) {
                var link = http + "://www.geocaching.com/seek/nearest.aspx?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000) + "&dist=25&disable_redirect";
                linkToDo(event, link);
            }
        }
        addLinkEvent('lnk_nearestlist', linkToNearesList, true, true);
        addLinkEvent('lnk_nearestlist_profile', linkToNearesList, true, true);

        // Redirect to Neares Map.
        function linkToNearesMap(event) {
            if (homeCoordinatesSet()) {
                var link = map_url + "?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000);
                linkToDo(event, link);
            }
        }
        addLinkEvent('lnk_nearestmap', linkToNearesMap, true, true);
        addLinkEvent('lnk_nearestmap_profile', linkToNearesMap, true, true);

        // Redirect to Neares List without Founds.
        function linkToNearesListWo(event) {
            if (homeCoordinatesSet()) {
                var link = http + "://www.geocaching.com/seek/nearest.aspx?lat=" + (getValue("home_lat") / 10000000) + "&lng=" + (getValue("home_lng") / 10000000) + "&dist=25&f=1&disable_redirect";
                linkToDo(event, link);
            }
        }
        addLinkEvent('lnk_nearestlist_wo', linkToNearesListWo, true, true);
        addLinkEvent('lnk_nearestlist_wo_profile', linkToNearesListWo, true, true);

        // Redirect to Own Trackables.
        function linkToMyTrackables(event) {
            if (getValue("uid", "") == "") {
                if (window.confirm("To use this Link, the script has to know your uid. Just load the \"My Profile\" site and the script will save it automatically.")) document.location.href = http + "://www.geocaching.com/my/";
            } else {
                var link = http + "://www.geocaching.com/track/search.aspx?o=1&uid=" + getValue("uid");
                linkToDo(event, link);
            }
        }
        addLinkEvent('lnk_my_trackables', linkToMyTrackables, true, true);
        addLinkEvent('lnk_my_trackables_profile', linkToMyTrackables, true, true);

        // Redirect to Profile Geocaches.
        function linkToGeocaches(event) {
            setValue("doPostBack_after_redirect", 'ctl00$ContentBody$ProfilePanel1$lnkUserStats');
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profilegeocaches', linkToGeocaches, true, true);
        addLinkEvent('lnk_profilegeocaches_profile', linkToGeocaches, true, true);
        
        // Redirect to Profile Trackables.
        function linkToTrackables(event) {
            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkCollectibles");
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profiletrackables', linkToTrackables, true, true);
        addLinkEvent('lnk_profiletrackables_profile', linkToTrackables, true, true);

        // Redirect to Profile Souvenirs.
        function linkToSouvenirs(event) {
            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkSouvenirs");
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profilesouvenirs', linkToSouvenirs, true, true);
        addLinkEvent('lnk_profilesouvenirs_profile', linkToSouvenirs, true, true);
        
        // Redirect to own Profile Gallery bzw. to Profile Gallery eines Users aus der Freundeliste.
        function linkToGallery(event) {
            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkGallery");
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profilegallery', linkToGallery, true, true);
        addLinkEvent('lnk_profilegallery_profile', linkToGallery, true, true);
        addLinkEvent('lnk_profilegallery2', linkToGallery, true, false);  

        // Redirect to Profile Lists.
        function linkToBookmarks(event) {
            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkLists");
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profilebookmarks', linkToBookmarks, true, true);
        addLinkEvent('lnk_profilebookmarks_profile', linkToBookmarks, true, true);

        // Redirect to Profile Statistics.
        function linkToStatistics(event) {
            setValue("doPostBack_after_redirect", "ctl00$ContentBody$ProfilePanel1$lnkStatistics");
            var link = http + "://www.geocaching.com/profile/default.aspx";
            linkToDo(event, link);
        }
        addLinkEvent('lnk_profilestatistics', linkToStatistics, true, true);
        addLinkEvent('lnk_profilestatistics_profile', linkToStatistics, true, true);
        
        // Create and hide the "Find Player" Form
        function createFindPlayerForm(event) {
//<-- $$058 End of insert
//--> $$038 Begin of insert
            // Alle eventuellen Verarbeitungen schließen.
            btnClose();
            // Prüfen, ob die aktuelle Seite für eine Verarbeitung geeignet ist.
            if ( checkTaskAllowed( "Find Player", true ) == false ) return;
//<-- $$038 End of insert
            
            if (document.getElementById('bg_shadow')) {
                // If shadow-box already created, just show it
                if (document.getElementById('bg_shadow').style.display == "none") {
                    document.getElementById('bg_shadow').style.display = "";
                }
            } else {
//--> $$038 Begin of delete
//               var html = "";
//                // Seite abdunkeln
////--> $$021 Begin of change
////                html += "<div id='bg_shadow' style='width: 100%; height: 100%; background-color: #000000; position:fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50);'></div>";
////                document.getElementsByTagName('body')[0].innerHTML += html;     // Das hier geht nicht mehr.
//                var form_side = document.getElementsByTagName('body')[0];
//                var bg_shadow_div = document.createElement("div");
//                bg_shadow_div.setAttribute("id", "bg_shadow");
//                bg_shadow_div.setAttribute("style", "width: 100%; height: 100%; background-color: #000000; position:fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50);");
//                bg_shadow_div.appendChild(document.createTextNode(""));
//                form_side.appendChild(bg_shadow_div);
////<-- $$021 End of change 
//
//                document.getElementById('bg_shadow').addEventListener("click", btnClose, false);
//<-- $$038 End of delete 
//--> $$038 Begin of insert
                buildBgShadow();
//<-- $$038 End of insert
            }

            if (document.getElementById('findplayer_overlay') && document.getElementById('findplayer_overlay').style.display == "none") {
                // If menu already created, just show it
                document.getElementById('findplayer_overlay').style.display = "";
            } else {
                var html = "";
//--> $$021 Begin of delete
//                html += "<style>";
//<-- $$021 End of delete 
                html += "#findplayer_overlay {";
                html += "  background-color: #d8cd9d; ";
                html += "  width:350px;";
                html += "  border: 2px solid #778555; ";
                html += "  overflow: auto; ";
                html += "  padding:10px; ";
                html += "  position: absolute; ";
                html += "  left:30%; ";
                html += "  top:60px; ";
                html += "  z-index:101; ";
                html += "  -moz-border-radius:30px; ";
                html += "  -khtml-border-radius:30px; ";
                html += "  border-radius: 30px;";
                html += "  overflow: auto;";
                html += "}";
                html += ".gclh_form {";
                html += "  background-color: #d8cd9d;";
                html += "  border: 2px solid #778555;";
                html += "  -moz-border-radius: 7px;";
                html += "  -khtml-border-radius: 7px;";
                html += "  border-radius: 7px;";
                html += "  padding-left: 5px;";
                html += "  padding-right: 5px;";
                html += "}";
//--> $$021 Begin of change
//                html += "</style>";
//--> $$038 Begin of insert
                var form_side = document.getElementsByTagName('body')[0];
//<-- $$038 End of insert
                var form_style = document.createElement("style");
                form_style.appendChild(document.createTextNode(html));
                form_side.appendChild(form_style);

//<-- $$021 End of change 
                // Overlay erstellen
//--> $$021 Begin of change
                var html = "";
//                html += "<div id='findplayer_overlay' align='center'>";
//<-- $$021 End of change 
                html += "<h3 style='margin:5px;'>Find Player</h3>";
                html += "<form action=\"/find/default.aspx\" method=\"post\" name=\"aspnetForm\" " + (document.location.href.match(/https?:\/\/www\.geocaching\.com\/map/) ? "target='_blank'" : "") + ">";
                html += "<input class='gclh_form' type='hidden' name='__VIEWSTATE' value=''>";
                html += "<input class='gclh_form' id='findplayer_field' class=\"Text\" type=\"text\" maxlength=\"100\" name=\"ctl00$ContentBody$FindUserPanel1$txtUsername\"/>";
//--> $$021 Begin of change
//                html += "<input class='gclh_form' type=\"submit\" value=\"Go\" name=\"ctl00$ContentBody$FindUserPanel1$GetUsers\"/><input class='gclh_form' id='btn_close1' type='button' value='close'>";
                html += " <input style='cursor: pointer' class='gclh_form' type=\"submit\" value=\"Go\" name=\"ctl00$ContentBody$FindUserPanel1$GetUsers\"/> <input style='cursor: pointer' class='gclh_form' id='btn_close1' type='button' value='close'>";
//<-- $$021 End of change 
                html += "</form>";
//--> $$021 Begin of change
//                html += "</div>";
//                document.getElementsByTagName('body')[0].innerHTML += html;
                var form_div = document.createElement("div");
                form_div.setAttribute("id", "findplayer_overlay");
                form_div.setAttribute("align", "center");
                form_div.innerHTML = html;
                form_div.appendChild(document.createTextNode(""));
                form_side.appendChild(form_div);
//<-- $$021 End of change 

                document.getElementById("findplayer_field").focus();

                document.getElementById('btn_close1').addEventListener("click", btnClose, false);
            }
//--> $$038 Begin of change
            // Fokusierung auf Verarbeitung, damit Menüs einklappen. 
            document.getElementById("findplayer_overlay").click();
            // Stell den Cursor ins Feld. 
            document.getElementById("findplayer_field").focus();
//<-- $$038 End of change
        }
//--> $$058 Begin of change
//        addLinkEvent('lnk_findplayer', createFindPlayerForm);
        addLinkEvent('lnk_findplayer', createFindPlayerForm, true, true);
        addLinkEvent('lnk_findplayer_profile', createFindPlayerForm, true, true);
//<-- $$058 End of change
    } catch (e) {
        gclh_error("Apply Special Links", e);
    }

// Add Download Link to Labs cache Pages
    try {
        if (document.location.href.match(/^https?:\/\/labs\.geocaching\.com\/Adventures\/Details\/(\w|\-)*/)) {
            /*
             * removing -> background-image: -moz-linear-gradient(left center , rgba(157, 178, 81, 0) 0%, #9db251 100%);
             * This gets a clearer view, if more than one Navigation Button is Displayed
             */
            for(var i=0 ; i < document.styleSheets.length ; i++){
                if(document.styleSheets[i].href && document.styleSheets[i].href.match(/^https?:\/\/labs\.geocaching\.com\/Content\/css\/main\?[v]\=\w*/)){
                    document.styleSheets[i].cssRules[384].style['background-image'] = "none";
                }
            }

            /*
             * Example Path for Site      /Adventures/Details/90ced6d4-0a22-4c19-a491-7ae17d489c60
             * Example Path for Download  /Adventures/DetailsAsGPX/90ced6d4-0a22-4c19-a491-7ae17d489c60
             *
             * Get current Path with GUID and create download Path
             */
            pathName = window.location.pathname;
            pathValues = pathName.split("/");
            downloadPath = "/Adventures/DetailsAsGPX/" + pathValues[3];

            /*
             * Move existing Leaderboard Button to the left
             * Create new Button with Download Link
             */
            $('#leaderboard')
                .css({
                    "margin-right" : "0px",
                    "padding-right": "9px",
                    "padding-left" : "9px",
                    "right"        : "184px"
                })
                .parent()
                .append(
                    '<a id="dl_link" class="link-leaderboard" href="' + downloadPath + '" style="padding-left: 9px;">Download‌ as‌ GPX‌ File</a>'
                );
        }
    } catch (e) {
        gclh_error("Lab Gpx Downlad Link hinzufügen", e);
    }

////////////////////////////////////////////////////////////////////////////
// Functions (fun2)
////////////////////////////////////////////////////////////////////////////
//--> $$002 Begin of insert
// CSS Style hinzufügen.
    function appendCssStyle( css ) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.innerHTML = css;
        style.type = 'text/css';
        head.appendChild(style);
    }
//<-- $$002 End of insert

//--> $$004 Begin of insert
// HTML dekodieren, also beispielsweise: "&amp;" in "&" 
// (Beispiel: User "Rajko & Dominik".)
    function decode_innerHTML(variable_mit_innerHTML) {
        var elem = document.createElement('textarea');
        elem.innerHTML = variable_mit_innerHTML.innerHTML;
        variable_decode = elem.value;
        variable_new = variable_decode.trim();
        return variable_new;
    }
//<-- $$004 End of insert

//--> $$026 Begin of insert
// Zu lange Zeilen "kürzen", damit nicht umgebrochen wird.
    function noBreakInLine( n_side, n_maxwidth, n_title ) {
        if ( n_side == "" || n_side == undefined ) return;
        if ( n_maxwidth == 0 ) return;
        n_side.setAttribute("style", "max-width: " + n_maxwidth + "px; display: inline-block; overflow: hidden; vertical-align: bottom; white-space: nowrap; text-overflow: ellipsis;");
        if ( n_title != "" ) {
            n_side.setAttribute("title", n_title);
        }
        return;
    }
//<-- $$026 End of insert

//--> $$040 Begin of insert
// Tabellenzeilen in Zebra Look einfärben bzw. Einfärbung entfernen.    
    function setLinesColorInZebra( parameter, lines, linesTogether ) {
        if ( lines.length == 0 ) return;
        var replaceSpec = /(AlternatingRow)(\s*)/g;
        var setSpec = "AlternatingRow";
        
        // Wenn eine Einfärbung nicht stattfinden soll.
        if ( parameter == false ) {
            setLinesColorNone( lines, replaceSpec );
        }
        // Wenn eine Einfärbung stattfinden soll.
        else {
            // Die Zeilen im ersten Zeilenbereich gegebenenfalls auf hell zurücksetzen.        
            for ( var i = 0; i < lines.length; i += (2 * linesTogether) ) {
                for ( var j = 0; j < linesTogether; j++) {
                    if ( lines[i+j].className.match( replaceSpec ) ) {
                        var newClass = lines[i+j].className.replace( replaceSpec, "" );
                        lines[i+j].setAttribute("class", newClass);
                    }
                }        
            }
            // Die Zeilen im zweiten Zeilenbereich gegebenenfalls an erster Stelle auf dunkel setzen.
            for ( var i = linesTogether; i < lines.length; i += (2 * linesTogether) ) {
                for ( var j = 0; j < linesTogether; j++) {
                    if ( lines[i+j].className.match( replaceSpec ) );
                    else {
                        if ( lines[i+j].getAttribute("class") == (undefined|null|"") ) var oldClass = "";
                        else var oldClass = " " + lines[i+j].getAttribute("class");
                        lines[i+j].setAttribute("class", setSpec + oldClass);
                    }
                }
            }
        }
    }
//<-- $$040 End of insert
    
//--> $$040 Begin of insert
// Tabellenzeilen für User und Owner einfärben bzw. Einfärbung entfernen.    
    function setLinesColorUser( parameterStamm, tasks, lines, linesTogether, owner ) {
        if ( lines.length == 0 ) return;
        var user = $('.li-user-info').children().first().text();
        if ( owner == undefined ) var owner = "";
        var vips = getValue("vips");
        
        var setSpecUser = "TertiaryRow";
        var setSpecOwner = "QuaternaryRow";
        var setSpecReviewer = "QuinaryRow";
        var setSpecVip = "SenaryRow";
        var replaceSpecUser = /(TertiaryRow)(\s*)/g;
        var replaceSpecVip = /(SenaryRow)(\s*)/g;

        var parameter = new Array();
        if ( tasks.match("user") ) parameter["user"] = getValue( parameterStamm + "_user" );
        else parameter["user"] = "";
        if ( tasks.match("owner") ) parameter["owner"] = getValue( parameterStamm + "_owner" );
        else parameter["owner"] = "";
        if ( tasks.match("reviewer") ) parameter["reviewer"] = getValue( parameterStamm + "_reviewer" );
        else parameter["reviewer"] = "";
        if ( tasks.match("vip") ) parameter["vip"] = getValue( parameterStamm + "_vip" );
        else parameter["vip"] = "";

        // Wenn eine Einfärbung für den User nicht stattfinden soll, dann entfernen.
        if ( parameter["user"] == false ) {
            setLinesColorNone( lines, replaceSpecUser );
        }
        
        // Wenn eine Einfärbung stattfinden soll.
        if ( parameter["user"] == true || parameter["owner"] == true || parameter["reviewer"] == true || parameter["vip"] == true ) {
            for ( var i = 0; i < lines.length; i += linesTogether ) {
                var newClass = "";
                var aTags = lines[i].getElementsByTagName("a");
                var imgTags = lines[i].getElementsByTagName("img");
                
                // Anhand der guid prüfen, ob eine Einfärbung in diesem Zeilenbereich für User oder Owner notwendig ist.
                // Verarbeitung für die Seiten: Cache Listing, TB Listing
                if ( parameter["user"] || parameter["owner"] ) {
                    for (var j = 0; j < aTags.length; j++) {
                        if ( aTags[j].href.match(/\/profile\/\?guid=/) ) {
                            if ( decode_innerHTML( aTags[j] ) == user && parameter["user"] ) newClass = setSpecUser;
                            else if ( decode_innerHTML( aTags[j] ) == owner && parameter["owner"] ) newClass = setSpecOwner;
                            break;
                        }
                    }
                    // Anhand des Found Icons prüfen, ob eine Einfärbung in diesem Zeilenbereich für den User notwendig ist.
                    // Verarbeitung für die Seiten: Bookmark Listen
                    if ( newClass == "" && parameter["user"] ) {
                        for (var j = 0; j < imgTags.length; j++) {
                            if ( imgTags[j].src.match(/\/found\./) ) {
                                newClass = setSpecUser;
                                break;
                            }
                        }
                    }
                }                    
                // Anhand des Admin Icons prüfen, ob eine Einfärbung in diesem Zeilenbereich für den Reviewer notwendig ist.
                // Verarbeitung für die Seiten: Cache Listing, TB Listing
                if ( newClass == "" && parameter["reviewer"] ) {
                    for (var j = 0; j < imgTags.length; j++) {
                        if ( imgTags[j].src.match(/\/icon_admin\./) ) {
                            newClass = setSpecReviewer;
                            break;
                        }
                    }
                }
                // Anhand des titles zum VIP Icon und der guid der VIP prüfen, ob eine Einfärbung in diesem Zeilenbereich für eine VIP notwendig ist.
                // Beachten, dass sich eine VIP auch während der Seitendarstellung ändern kann.
                // Verarbeitung für die Seiten: Cache Listing, TB Listing
                if ( newClass == "" && parameter["vip"] && vips ) {
                    // Farbe für VIP zurücksetzen.
                    for (var j = 0; j < linesTogether; j++) {
                        if ( lines[i+j].className.match( replaceSpecVip ) ) {
                            var replaceClass = lines[i+j].className.replace( replaceSpecVip, "" );
                            lines[i+j].setAttribute("class", replaceClass);
                        }
                    }
                    // Wenn VIP Icon gesetzt ist und guid in der VIPS Area vorhanden ist, dann merken, dass Farbe für VIP gesetzt werden muss.
                    for (var j = 0; j < imgTags.length; j++) {
                        if ( imgTags[j].title.match(/from VIP-List/) ) {
                            for (var k = 0; k < aTags.length; k++) {
                                if ( aTags[k].href.match(/\/profile\/\?guid=/) ) {
                                    if ( vips.match( decode_innerHTML( aTags[k] ) ) ) {
                                        newClass = setSpecVip;
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                // Wenn eine Einfärbung notwendig ist. 
                // Prüfen, ob die Einfärbung noch nicht vorhanden ist, und gegebenenfalls dann an erster Stelle einbauen.
                if ( newClass != "" ) {
                    for (var j = 0; j < linesTogether; j++) {
                        if ( lines[i+j].className.match( newClass ) ); 
                        else {
                            if ( lines[i+j].getAttribute("class") == null ) var oldClass = "";
                            else var oldClass = " " + lines[i+j].getAttribute("class");
                            lines[i+j].setAttribute("class", newClass + oldClass );
                        }
                    }
                }
            }
        }
    }
//<-- $$040 End of insert

//--> $$040 Begin of insert 
// Spezifikation für die Einfärbung der Zeile entfernen.
    function setLinesColorNone( lines, replSpez ) {
        if ( lines.length == 0 ) return;
        for ( var i = 0; i < lines.length; i++ ) {
            if ( lines[i].className.match( replSpez ) ) {
                var newClass = lines[i].className.replace( replSpez, "" );
                lines[i].setAttribute("class", newClass);
            }
        }
    }
//<-- $$040 End of insert
    
//--> $$002 Begin of insert
// Neue Parameter im GClh Config hervorheben und Info setzen, zu welcher Version ein Parameter dazugekommen ist. 
// Info kann auch ohne Hervorhebung verwendet werden, muß dann aber in jeder Zeile hinterlegt werden.
// Aufbau idealerweise in eigenen Zeilen, damit man irgendwann man schnell Zeilen rausschmeißen kann, wenn die Infos alt sind: 
//   html += newParameterOn;  html += "<... checkbox ... <br/>";  html += newParameterVersionSetzen(11.7) + newParameterOff;  
    newParameterOn = "<div id='new parameter' style='width: 100%; height: 100%; background-color: rgba(240, 223, 198, 0.7);" 
                   + "padding: 2px 0px 2px 2px; margin-left: -2px;'>";
    function newParameterVersionSetzen(version) {
        var newParameterVers = "<span style='font-size: 70%; font-style: italic; float: right; margin-top: -14px; margin-right: 4px;' ";
        if ( version != "" ) { newParameterVers += "title='Implemented with version " + version + "'>" + version + "</span>"; }         
        else { newParameterVers += "></span>"; }
        return newParameterVers;
    }
    newParameterOff = "</div>";
    // Für Linklist/Bookmarks.
    newParameterLL = '<span style="float: right; background-color: rgba(240, 223, 198, 0.7); padding-top: 25px; width: 100%; margin: -22px 2px 0px 0px;"></span>'; 
    function newParameterLLVersionSetzen(version) {
        var newParameterVers = '<span style="font-size: 70%; font-style: italic; margin-top: 10px; margin-left: -192px; position: absolute; cursor: default;"';
        if ( version != "" ) { newParameterVers += 'title="Implemented with version ' + version + '">' + version + '</span>'; }         
        else { newParameterVers += '></span>'; }
        return newParameterVers;
    }
//<-- $$002 End of insert
    
//--> $$038 Begin of insert
// Seite abdunkeln. 
    function buildBgShadow() {
        var shadow = document.createElement("div");
        shadow.setAttribute("id", "bg_shadow");
        // z-index sorgt dafür, dass Menü auch nicht eingabebereit ist.
        shadow.setAttribute("style", "z-index:100; width: 100%; height: 100%; background-color: #000000; position:fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50);");
        document.getElementsByTagName('body')[0].appendChild(shadow);
        document.getElementById('bg_shadow').addEventListener("click", btnClose, false);
    }
//<-- $$038 End of insert

//--> $$028 Begin of insert
// Check, ob man sich im GClh Config befindet.
    function check_config_page () {
        var config_page = false;
        if ( document.getElementById('bg_shadow') && document.getElementById("bg_shadow").style.display == "" ) {
            if ( document.getElementById("settings_overlay") && document.getElementById("settings_overlay").style.display == "" ) {
                config_page = true;
            }
        }
        return config_page;            
    }
//<-- $$028 End of insert
    
//--> $$038 Begin of insert
// Prüfen, ob die spezielle Verarbeitung auf der aktuellen Seite erlaubt ist.
// Spezielle Verarbeitungen sind derzeit: GClh Config, GClh Config Sync, Find Player.
    function checkTaskAllowed( task, doAlert ) {
        if ( document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(map|play|account)\//) ||
             document.location.href.match(/^https?:\/\/labs\.geocaching\.com/)                      || 
             document.location.href.match(/^https?:\/\/www\.wherigo\.com/)                          || 
//--> $$048 Begin of insert
             isMemberInPmoCache()                                                                   ||
//<-- $$048 End of insert
             document.location.href.match(/^https?:\/\/www\.waymarking\.com/)                          ) {
            if ( doAlert != false ) {
                var mess = "This GC little helper functionality is not available at this page.\n\n"
                         + "Please go to the \"My profile\" page, there is anyway all of these \n"
                         + "functionality available. ( www.geocaching.com/my )";
                alert( mess );
            }
            return false;
        } 
        return true;
    }
//<-- $$038 End of insert
    
//--> $$038 Begin of insert
// Zusatz in der Url, eingeleitet durch "#", zurücksetzen bis auf "#". 
    function clearUrlAppendix( url, onlyTheFirst ) {
        var urlSplit = url.split('#');
        var newUrl = "";
        if ( onlyTheFirst ) {
            newUrl = url.replace(urlSplit[1], "").replace("##", "#");
        } else {
            newUrl = urlSplit[0] + "#";
        }
        return newUrl;
    }
//<-- $$038 End of insert
    
//--> $$048 Begin of insert
// Prüfen ob ein Basic Member in einem PMO Cache loggen möchte.
    function isMemberInPmoCache() {
        if ( is_page("cache_listing") &&
             document.getElementsByClassName("pmo-banner")[0] && document.getElementsByClassName("pmo-upsell")[0] ) {
            return true;
        } else {
            return false;
        }
    }            
//<-- $$048 End of insert

//--> $$052 Begin of insert
// Aktuelles Datum und aktuelle Zeit ermitteln und aufbereiten.
    function getDateTime() {
        var now = new Date();
        var aDate = $.datepicker.formatDate( 'dd.mm.yy', now );
        var hrs = now.getHours();
        var min = now.getMinutes();
        hrs = ((hrs < 10) ? '0' + hrs : hrs);
        min = ((min < 10) ? '0' + min : min);
        var aTime = hrs+':'+min;
        var aDateTime = aDate+' '+aTime;
        return [ aDate, aTime, aDateTime ];
    }
//<-- $$052 End of insert

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Config-Page
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
    function checkboxy(setting_id, label) {
//--> $$024 Begin of delete
//        return "<input type='checkbox' " + (getValue(setting_id) ? "checked='checked'" : "" ) + " id='" + setting_id + "'> " + label;
//<-- $$024 End of delete
//--> $$024 Begin of insert
        // Hier werden auch gegebenenfalls "Clone" von Parametern verarbeitet. (Siehe Erläuterung weiter unten bei "setEventsForDoubleParameters".) 
        var setting_idX = setting_id;
        setting_id = setting_idX.replace(/(X[0-9]*)/, "");
        return "<input type='checkbox' " + (getValue(setting_id) ? "checked='checked'" : "" ) + " id='" + setting_idX + "'> " + label;
//<-- $$024 End of insert
    }

    function show_help(text) {
//--> $$058 Begin of change
//        return " <a class='gclh_info' href='javascript:void(0);'><b>?</b><span class='gclh_span'>" + text + "</span></a>";
        return " <a class='gclh_info' style='cursor: help' href='javascript:void(0);'><b>?</b><span class='gclh_span'>" + text + "</span></a>";
//<-- $$058 End of change
    }

    function create_config_css() {
        var css = document.createElement("style");
        var html = "";
        html += ".settings_overlay {";
        html += "  background-color: #d8cd9d; ";
        html += "  width:600px;";
        html += "  border: 2px solid #778555; ";
        html += "  overflow: auto; ";
        html += "  padding:10px; ";
        html += "  position: absolute; ";
        html += "  left:30%; ";
        html += "  top:10px; ";
        html += "  z-index:101; ";
        html += "  -moz-border-radius:30px; ";
        html += "  -khtml-border-radius:30px; ";
        html += "  border-radius: 30px;";
        html += "  overflow: auto;";
        html += "}";
        html += "";
        html += ".gclh_headline {";
        html += "  height: 21px; ";
        html += "  margin:5px; ";
        html += "  background-color: #778555; ";
        html += "  color: #FFFFFF;";
        html += "  -moz-border-radius:30px; ";
        html += "  -khtml-border-radius:30px; ";
        html += "  border-radius: 30px;";
        html += "  text-align: center;";
        html += "}";
        html += "";
        html += ".gclh_headline2 {";
        html += "  margin: 5px;";
        html += "}";
        html += "";
        html += ".gclh_content {";
        html += "  padding: 10px;";
        html += "  font-family: Verdana;";
        html += "  font-size: 14px;";
        html += "}";
        html += "";
        html += ".gclh_form {";
        html += "  background-color: #d8cd9d;";
        html += "  border: 2px solid #778555;";
        html += "  -moz-border-radius: 7px;";
        html += "  -khtml-border-radius: 7px;";
        html += "  border-radius: 7px;";
        html += "  padding-left: 5px;";
        html += "  padding-right: 5px;";
        html += "}";
        html += ".gclh_ref {";
        html += "  color: #000000;";
        html += "  text-decoration: none;";
        html += "  border-bottom: dotted 1px black;";
        html += "}";
        html += "";
        html += ".gclh_small {";
        html += "  font-size: 10px;";
        html += "}";
        html += "";
        // Highlight
        html += "a.gclh_info {";
        html += "  color: #000000;";
        html += "  text-decoration: none;";
        html += "}";
        html += "";
        html += "a.gclh_info:hover {";
        html += "  position: relative;";
        html += "}";
        html += "";
        html += "a.gclh_info span {";
        html += "  visibility: hidden;";
        html += "  position: absolute; top:-310px; left:0px;";
        html += "  padding: 2px;";
        html += "  text-decoration: none;";
        html += "  text-align: left;";
        html += "  vertical-align: top;";
        html += "  font-size: 12px;";
//--> $$002 Begin of insert
        html += "  z-index: 105;";
//<-- $$002 End of insert
        html += "}";
        html += "";
        html += "a.gclh_info:hover span {";
        html += "  width: 250px;";
        html += "  visibility: visible;";
        html += "  top: 10px;";
        html += "  left: -125px;";
        html += "  font-weight: normal;";
        html += "  border: 1px solid #000000;";
        html += "  background-color: #d8cd9d;";
        html += "}";
        html += "";
        html += ".multi_homezone_settings {";
        html += "  width: 50%;";
        html += "  padding: 10px 0;";
        html += "  margin: 10px 0 10px 10px;";
        html += "  border: 1px solid #CFC0B8;";
        html += "  border-width: 1px 0;";
        html += "}";
        html += ".multi_homezone_element {";
        html += "  margin-bottom: 10px;";
        html += "}";
        css.innerHTML = html;
        document.getElementsByTagName('body')[0].appendChild(css);
    }

// Configuration Menu
    function gclh_showConfig() {
//--> $$038 Begin of insert
        // Alle eventuellen Verarbeitungen schließen ohne Url zu clearen.
        btnClose( false );
        // Prüfen, ob die aktuelle Seite für eine Verarbeitung geeignet ist. Dazu sollte es aber eigentlich gar nicht kommen.
        if ( checkTaskAllowed( "GClh Config", true ) == false ) return;
//<-- $$038 End of insert

        // the configuration is always displayed at the top, so scroll away from logs or other lower stuff
        window.scroll(0, 0);

        if (document.getElementById('bg_shadow')) {
            // If shadow-box already created, just show it
            if (document.getElementById('bg_shadow').style.display == "none") {
                document.getElementById('bg_shadow').style.display = "";
            }
        } else {
//--> $$038 Begin of delete
//            // Seite abdunkeln
//            var shadow = document.createElement("div");
//            shadow.setAttribute("id", "bg_shadow");
//            shadow.setAttribute("style", "width: 100%; height: 100%; background-color: #000000; position:fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50);");
//            document.getElementsByTagName('body')[0].appendChild(shadow);
//            document.getElementById('bg_shadow').addEventListener("click", btnClose, false);
//<-- $$038 End of delete 
//--> $$038 Begin of insert
            buildBgShadow();
//<-- $$038 End of insert
        }

        if (document.getElementById('settings_overlay') && document.getElementById('settings_overlay').style.display == "none") {
            // If menu already created, just show it
            document.getElementById('settings_overlay').style.display = "";
        } else {
            create_config_css();
            var div = document.createElement("div");
            div.setAttribute("id", "settings_overlay");
            div.setAttribute("class", "settings_overlay");
            var html = "";
//--> $$001 Begin of change
//            html += "<h3 class='gclh_headline'>GC little helper <font class='gclh_small'>v" + scriptVersion + "</font></h3>";
            html += "<h3 class='gclh_headline'>" + scriptNameConfig + " <font class='gclh_small'>v" + scriptVersion + "</font></h3>";
//<-- $$001 End of change
            html += "<div class='gclh_content'>";
            html += "&nbsp;" + "<font class='gclh_small'><a href='https://github.com/amshove/GC_little_helper/wiki/German-Help' target='_blank'>Hier</a> gibt es eine deutsche Anleitung zu den Einstellungen.</font><br>";
            html += "&nbsp;" + "<font class='gclh_small'>Contribute to GClh on <a href='https://github.com/amshove/GC_little_helper' target='_blank'>github.com</a></font>";
            html += "<br><br>";
            html += "<h4 class='gclh_headline2'>Global</h4>";
            html += "&nbsp;" + "Home-Coords: <input class='gclh_form' type='text' size='21' id='settings_home_lat_lng' value='" + DectoDeg(getValue("home_lat"), getValue("home_lng")) + "'>" + show_help("The Home-Coords are filled automatically if you update your Home-Coords on gc.com. If it doesn\'t work you can insert them here. These coords are used for some special links (nearest list, nearest map, ..) and for the homezone circle on the map.") + "<br>";
            html += checkboxy('settings_change_header_layout', "Change header layout") + show_help("Change the header layout to save some vertical space.") + "<br/>";
//--> $$002 Begin of insert
            html += newParameterOn;
            html += " &nbsp; " + checkboxy('settings_show_smaller_gc_link', 'Show smaller geocaching link top left') + show_help("With this option you can choose a smaller display of the geocaching link top left of every page. <br><br>This option requires \"Change header layout\".") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_show_smaller_area_top_right', 'Show smaller user, settings, message area top right') + show_help("With this option you can choose a smaller display of the area top right with the user, settings and message center icons and description of every page. <br><br>This option requires \"Change header layout\".") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_gc_tour_is_working', 'Reserve a place for GC Tour icon') + show_help("If the script GC Tour is running, you can reserve a place top left of every page for the GC Tour icon. <br><br>This option requires \"Change header layout\".") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$002 End of insert
			html += checkboxy('settings_bookmarks_on_top', "Show <a class='gclh_ref' href='#gclh_linklist' id='gclh_linklist_link_1'>Linklist</a> on top") + show_help("Show the Linklist on the top of the page - beside the other links of gc.com. You can configure the links at the end of this configuration page.<br><br>Some of the features of the linklist on top, like for example the font size or the distance between drop-down links, requires \"Change header layout\". Details you can see at the end of this configuration page by the features of the Linklist.") + "<br/>";
//--> $$050 Begin of delete
//            html += checkboxy('settings_bookmarks_show', "Show <a class='gclh_ref' href='#gclh_linklist' id='gclh_linklist_link_2'>Linklist</a> in profile") + show_help("Show the Linklist at the side in your profile. You can configure the Links at the end of this configuration-page.") + "<br/>";
//<-- $$050 End of delete 
            html += checkboxy('settings_hide_advert_link', 'Hide link to advertisement instructions') + "<br/>";
//--> $$055 Begin of delete
//            html += checkboxy('settings_hide_line_breaks', 'Hide superfluous line breaks') + "<br/>";
//<-- $$055 End of delete 
            html += "&nbsp;" + "Page-Width: <input class='gclh_form' type='text' size='2' id='settings_new_width' value='" + getValue("settings_new_width", 950) + "'> px" + show_help("With this option you can expand the small layout. The default value of gc.com is 950 px.") + "<br>";
            html += checkboxy('settings_automatic_friend_reset', 'Reset difference counter on friendlist automatically') + show_help("If you enable this option, the difference counter at friendlist will automatically reset if you have seen the difference and if the day changed.") + "<br/>";
//--> $$056 Begin of delete
//            html += checkboxy('settings_show_big_gallery', 'Show bigger images in gallery') + "<br/>";
//<-- $$056 End of delete 
            html += checkboxy('settings_hide_facebook', 'Hide Facebook login') + "<br/>";
//--> $$009 Begin of change
//            html += checkboxy('settings_hide_socialshare', 'Hide SocialShare-Box after Log') + "<br/>";
            html += checkboxy('settings_hide_socialshare', 'Hide social sharing Facebook and Twitter') + "<br/>";
//<-- $$009 End of change
//--> $$050 Begin of delete
//            html += checkboxy('settings_hideable_souvenirs', 'Make Souvenirs hideable') + "<br/>";
//            html += checkboxy('settings_hide_visits_in_profile', 'Hide TB/Coin-Visits in Profile') + "<br/>";
//<-- $$050 End of delete 
            html += checkboxy('settings_fixed_pq_header', 'Show fixed header in PQ list') + "<br/>";
//--> $$029 Begin of delete
//            html += checkboxy('settings_sync_autoImport', 'Auto apply DB config') + show_help("If you enable this option, settings from dropbox will be applied automatically.") + "<br/>";
//<-- $$029 End of delete 
//--> $$032 Begin of insert
            html += newParameterOn;
            html += checkboxy('settings_show_sums_in_bookmark_lists', 'Show number of caches in bookmark lists') + show_help("With this option the number of caches and the number of selected caches in the categories \"All\", \"Found\", \"Archived\" and \"Deactivated\", corresponding to the select buttons, are shown in bookmark lists at the end of the list.") + "<br/>";
//--> $$050 Begin of delete
//            html += checkboxy('settings_show_sums_in_watchlist', 'Show number of caches in watchlist') + show_help("With this option the number of caches and the number of selected caches in the categories \"All\", \"Archived\" and \"Deactivated\", corresponding to the select buttons, are shown in the watchlist at the end of the list.") + "<br/>";
//<-- $$050 End of delete 
//--> $$033 Begin of insert
            html += checkboxy('settings_hide_warning_message', 'Hide warning message') + show_help("With this option you can choose the possibility to hide a potential warning message of the masters of gc.com. <br><br>One example is the down time warning message which comes from time to time and is placed unnecessarily a lot of days at the top of pages. You can hide it except for a small line in the top right side of the pages. You can activate the warning message again if your mouse goes to this area. <br><br>If the warning message is deleted of the masters, this small area is deleted too.") + "<br/>";
//<-- $$033 End of insert
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$032 End of insert
//--> $$040 Begin of insert
            html += "<br>";
            html += newParameterOn;
            html += "&nbsp;" + "Show lines in";
            html += "<span style='margin-left: 40px;' >lists</span>" + show_help("Lists are all common lists but not the TB listing and not the cache listing.");
            html += "<span style='margin-left: 30px;' >cache listings</span>";
            html += "<span style='margin-left: 32px;' >TB listings</span>";
            html += "<span style='margin-left: 30px;' >in color</span>" + "<br>";
            html += "&nbsp;" + "- for zebra:";
            html += "<span style='margin-left: 14px;' ></span>" + show_help("With this options you can color every second line in the specified lists in the specified \"alternating\" color.");
            html += "<input type='checkbox' style='margin-left:  23px;' " + (getValue('settings_show_common_lists_in_zebra') ? "checked='checked'" : "" ) + " id='settings_show_common_lists_in_zebra'></span>";
            html += "<input type='checkbox' style='margin-left:  56px;' " + (getValue('settings_show_cache_listings_in_zebra') ? "checked='checked'" : "" ) + " id='settings_show_cache_listings_in_zebra'></span>" + show_help("This option requires \"Load logs with GClh\".");
            html += "<input type='checkbox' style='margin-left:  95px;' " + (getValue('settings_show_tb_listings_in_zebra') ? "checked='checked'" : "" ) + " id='settings_show_tb_listings_in_zebra'></span>";
            html += "<input class='gclh_form color' type='text' style='margin-left: 86px;' size=5 id='settings_lines_color_zebra' value='" + getValue("settings_lines_color_zebra", "EBECED") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_lines_color_zebra' title='back to default' style='width: 12px; cursor: pointer;'>" + "<br>";
            html += "&nbsp;" + "- for you:";
            html += "<span style='margin-left: 27px;' ></span>" + show_help("With this options you can color your logs respectively your founds in the specified lists in the specified color.");
            html += "<input type='checkbox' style='margin-left:  23px;' " + (getValue('settings_show_common_lists_color_user') ? "checked='checked'" : "" ) + " id='settings_show_common_lists_color_user'></span>";
            html += "<input type='checkbox' style='margin-left:  56px;' " + (getValue('settings_show_cache_listings_color_user') ? "checked='checked'" : "" ) + " id='settings_show_cache_listings_color_user'></span>" + show_help("This option requires \"Load logs with GClh\".");
            html += "<input type='checkbox' style='margin-left:  95px;' " + (getValue('settings_show_tb_listings_color_user') ? "checked='checked'" : "" ) + " id='settings_show_tb_listings_color_user'></span>";
            html += "<input class='gclh_form color' type='text' style='margin-left: 86px;' size=5 id='settings_lines_color_user' value='" + getValue("settings_lines_color_user", "C2E0C3") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_lines_color_user' title='back to default' style='width: 12px; cursor: pointer;'>" + "<br>";
            html += "&nbsp;" + "- for owners:";
            html += "<input type='checkbox' style='margin-left: 111px;' " + (getValue('settings_show_cache_listings_color_owner') ? "checked='checked'" : "" ) + " id='settings_show_cache_listings_color_owner'></span>" + show_help("This option requires \"Load logs with GClh\".");
            html += "<input type='checkbox' style='margin-left:  95px;' " + (getValue('settings_show_tb_listings_color_owner') ? "checked='checked'" : "" ) + " id='settings_show_tb_listings_color_owner'></span>";
            html += "<input class='gclh_form color' type='text' style='margin-left: 86px;' size=5 id='settings_lines_color_owner' value='" + getValue("settings_lines_color_owner", "E0E0C3") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_lines_color_owner' title='back to default' style='width: 12px; cursor: pointer;'>" + "<br>";
            html += "&nbsp;" + "- for reviewers:";
            html += "<input type='checkbox' style='margin-left:  96px;' " + (getValue('settings_show_cache_listings_color_reviewer') ? "checked='checked'" : "" ) + " id='settings_show_cache_listings_color_reviewer'></span>" + show_help("This option requires \"Load logs with GClh\".");
            html += "<input type='checkbox' style='margin-left:  95px;' " + (getValue('settings_show_tb_listings_color_reviewer') ? "checked='checked'" : "" ) + " id='settings_show_tb_listings_color_reviewer'></span>";
            html += "<input class='gclh_form color' type='text' style='margin-left: 86px;' size=5 id='settings_lines_color_reviewer' value='" + getValue("settings_lines_color_reviewer", "EAD0C3") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_lines_color_reviewer' title='back to default' style='width: 12px; cursor: pointer;'>" + "<br>";
            html += "&nbsp;" + "- for VIPs:";
            html += "<input type='checkbox' style='margin-left: 131px;' " + (getValue('settings_show_cache_listings_color_vip') ? "checked='checked'" : "" ) + " id='settings_show_cache_listings_color_vip'></span>" + show_help("This option requires \"Load logs with GClh\" and \"Show VIP list\".");
            html += "<input type='checkbox' style='margin-left:  95px;' " + (getValue('settings_show_tb_listings_color_vip') ? "checked='checked'" : "" ) + " id='settings_show_tb_listings_color_vip'></span>" + show_help("This option requires \"Show VIP list\".");
            html += "<input class='gclh_form color' type='text' style='margin-left: 72px;' size=5 id='settings_lines_color_vip' value='" + getValue("settings_lines_color_vip", "F0F0A0") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_lines_color_vip' title='back to default' style='width: 12px; cursor: pointer;'>" + "<br>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$040 End of insert
            html += "";
            html += "<br>";
            html += "";
//--> $$028 $$029 Begin of insert
            html += "<h4 class='gclh_headline2' title='this page'>GClh Config / Sync</h4>";
            html += newParameterOn;
            html += checkboxy('settings_f4_call_gclh_config', 'Call GClh Config on F4') + show_help("With this option you are able to call the GClh Config page (this page) by pressing F4 from all the allowed pages.") + "<br/>";
            html += checkboxy('settings_f2_save_gclh_config', 'Save GClh Config on F2') + show_help("With this option you are able to save the GClh Config page (this page) by pressing F2 instead of scrolling to the bottom and choose the save button.") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
            html += checkboxy('settings_sync_autoImport', 'Auto apply DB Sync') + show_help("If you enable this option, settings from dropbox will be applied automatically about GClh Sync every 10 hours.") + "<br/>";
//--> $$035 Begin of insert
            html += newParameterOn;
            html += checkboxy('settings_show_save_message', 'Show info message if GClh data are saved') + show_help("With this option an info message is displayed if the GClh Config data are saved respectively if the GClh Sync data are imported.") + "<br/>";
//--> $$058 Begin of insert // Sort Linklist
            html += checkboxy('settings_sort_default_bookmarks', 'Sort default links for the Linklist') + show_help("With this option you can sort the default links for the Linklist by description. Your selection, sort or not, will done first by the next new start of the GClh Config. You can configure these default links to use in your Linklist at the end of this configuration page.") + "<br/>";
//<-- $$058 End of insert
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$035 End of insert
            html += "";
            html += "<br>";
            html += "";
//<-- $$028 $$029 End of insert
            html += "<h4 class='gclh_headline2'>Nearest list</h4>";
            html += checkboxy('settings_redirect_to_map', 'Redirect to map') + show_help("If you enable this option, you will be automatically redirected from nearest list to map.") + "<br/>";
            html += checkboxy('settings_show_log_it', 'Show GClh \"Log it\" icon (too for basic members for PMO)') + show_help("The GClh \"Log it\" icon is displayed beside cache titles in nearest lists. If you click it, you will be redirected directly to the log form. <br><br>You can use it too as basic member to log Premium Member Only (PMO) caches.") + "<br/>";
            html += checkboxy('settings_show_nearestuser_profil_link', 'Show profile link on search for created / found by caches') + show_help("This option adds an link to the user profile when searching for caches created or found by a certain user") + "<br/>";
            html += "<br>";
            html += "";
            html += "<h4 class='gclh_headline2'>Maps</h4>";
            html += checkboxy('settings_show_homezone', 'Show Homezone') + "<br>";
            html += "&nbsp; " + "- Radius: <input class='gclh_form' type='text' size='1' id='settings_homezone_radius' value='" + settings_homezone_radius + "' style='margin-left: 5px;'> km" + show_help("This option draws a circle of X kilometers around your home coordinates on the map.") + "<br>";
            html += "&nbsp; " + "- Color: <input class='gclh_form color' type='text' size='5' id='settings_homezone_color' value='" + settings_homezone_color + "' style='margin-left: 15px'>" + show_help("Here you can change the color of your Homezone circle.") + "<br>";
            html += "&nbsp; " + "- Opacity: <input class='gclh_form' type='text' size='1' id='settings_homezone_opacity' value='" + settings_homezone_opacity + "'> %" + show_help("Here you can change the opacity of your Homezone circle.") + "<br>";
            //Multi-Homezone
            html += "<div class='multi_homezone_settings' style='width: 60%;'><b>Multi Homezone</b>"
            var multi_hz_el = "<div class='multi_homezone_element'>"
            multi_hz_el += "- Coords: <input class='gclh_form coords' type='text' size='21' value='" + DectoDeg(getValue("home_lat"), getValue("home_lng")) + " 'style='margin-left: 1px;'>" + "<br>";
            multi_hz_el += "- Radius: <input class='gclh_form radius' type='text' size='1' value='1' style='margin-left: 5px;'> km" + show_help("This option draws a circle of X kilometers around your home coordinates on the map.") + "<br>";
            multi_hz_el += "- Color: <input class='gclh_form color' type='text' size='5' value='#0000FF' style='margin-left: 15px;'>" + show_help("Here you can change the color of your Homezone circle.") + "<br>";
            multi_hz_el += "- Opacity: <input class='gclh_form opacity' type='text' size='1' value='10'> %" + show_help("Here you can change the opacity of your Homezone circle.") + "<br>";
            multi_hz_el += "<button class='remove' type='button' style='cursor: pointer; border: 2px solid #778555; border-radius: 7px;'>remove</button>";
            multi_hz_el += "</div>"
            for (var i in settings_multi_homezone) {
                var hzel = settings_multi_homezone[i];
                var newHzEl = $('<div>').append($(multi_hz_el));
                newHzEl.find('.coords').attr('value', DectoDeg(hzel.lat, hzel.lng));
                newHzEl.find('.radius').attr('value', hzel.radius);
                newHzEl.find('.color').attr('value', hzel.color);
                newHzEl.find('.opacity').attr('value', hzel.opacity);
                html += newHzEl.html();
            }
              html += "<div class='wrapper'></div><button type='button' class='addentry' style='cursor: pointer; border: 2px solid #778555; border-radius: 7px;'>create further Homezone</button></div>"

            html += checkboxy('settings_map_hide_found', 'Hide found caches by default') + show_help("This is a premium feature - it enables automatically the option to hide your found caches on map.") + "<br/>";
            html += checkboxy('settings_map_hide_hidden', 'Hide own caches by default') + show_help("This is a premium feature - it enables automatically the option to hide your caches on map.") + "<br/>";
            html += "&nbsp;" + "Hide cache types by default: " + show_help("This is a premium feature - it enables automatically the option to hide the specific cache type.") + "<br/>";
//--> $$018 Begin of change
//            html += " &nbsp; " + checkboxy('settings_map_hide_2', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/2.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_9', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/9.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_5', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/5.gif'>") + "<br/>";
//            html += " &nbsp; " + checkboxy('settings_map_hide_3', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/3.gif'>") + "<br/>";
//            html += " &nbsp; " + checkboxy('settings_map_hide_6', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/6.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_453', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/453.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_13', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/13.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_1304', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/1304.gif'>") + "<br/>";
//            html += " &nbsp; " + checkboxy('settings_map_hide_4', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/4.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_11', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/11.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_137', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/137.gif'>") + "<br/>";
//            html += " &nbsp; " + checkboxy('settings_map_hide_8', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/8.gif'>") + " &nbsp; " + checkboxy('settings_map_hide_1858', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/1858.gif'>") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_map_hide_2', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/2.gif' title='Traditional'>") + " &nbsp; " + checkboxy('settings_map_hide_9', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/9.gif' title='A.P.E.'>") + " &nbsp; " + checkboxy('settings_map_hide_5', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/5.gif' title='Letterbox'>") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_map_hide_3', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/3.gif' title='Multi-Cache'>") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_map_hide_6', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/6.gif' title='Event'>") + " &nbsp; " + checkboxy('settings_map_hide_453', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/453.gif' title='Mega-Event'>") + " &nbsp; " + checkboxy('settings_map_hide_7005', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/7005.gif' title='Giga-Event'>") + " &nbsp; " + checkboxy('settings_map_hide_13', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/13.gif' title='Cache In Trash Out'>") + " &nbsp; " + checkboxy('settings_map_hide_1304', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/1304.gif' title='GPS Adventures'>") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_map_hide_4', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/4.gif' title='Virtual'>") + " &nbsp; " + checkboxy('settings_map_hide_11', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/11.gif' title='Webcam'>") + " &nbsp; " + checkboxy('settings_map_hide_137', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/137.gif' title='EarthCache'>") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_map_hide_8', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/8.gif' title='Mystery'>") + " &nbsp; " + checkboxy('settings_map_hide_1858', "<img src='" + http + "://www.geocaching.com/images/WptTypes/sm/1858.gif' title='Wherigo'>") + "<br/>";
//<-- $$018 End of change
            html += "&nbsp;" + "Available layers in map: <font class='gclh_small'>(multiselect with strg)</font><br>&nbsp;<select class='gclh_form' id='settings_map_layers' multiple='multiple'>";
            for (name in all_map_layers) {
                html += "  <option value='" + name + "' " + (settings_map_layers.indexOf(name) != -1 ? "selected='selected'" : "") + ">" + name + "</option>";
            }
            html += "</select>" + show_help("Here you can select the maps which should be available to select with the map. With this option you can reduce the long list to the layers you really need. If none is select, all will be displayed. Option \"Replace layercontrol by GClh\" must be enabled.") + "<br>";
            html += "&nbsp;" + "Default layer: <select class='gclh_form' id='settings_map_default_layer'>";
            html += "  <option value='false' " + (settings_map_default_layer == 'false' ? "selected='selected'" : "") + ">-- no default --</option>";
            for (name in all_map_layers) {
                html += "  <option value='" + name + "' " + (settings_map_default_layer == name ? "selected='selected'" : "") + ">" + name + "</option>";
            }
            html += "</select>" + show_help("Here you can select the map source you want to use as default in the map. Option \"Replace layercontrol by GClh\" must be enabled.") + "<br>";
            html += checkboxy('settings_show_hillshadow', 'Show Hillshadow by default') + show_help("If you want 3D-like-Shadow to be displayed by default, activate this function. Option \"Replace layercontrol by GClh\" must be enabled.") + "<br/>";
            html += checkboxy('settings_use_gclh_layercontrol', 'Replace layercontrol by GClh') + show_help("If you use other scripts like \"Geocaching Map Enhancements\" GClh will overwrite its layercontrol. With this option you can disable GClh layers to use the layers from gc.com or GME.") + "<br/>";
            html += checkboxy('settings_map_hide_sidebar', 'Hide sidebar by default') + show_help("If you want to hide the sidebar on the map, just select this option.") + "<br/>";
            html += checkboxy('settings_hide_map_header', 'Hide header by default') + show_help("If you want to hide the header of the map, just select this option.") + "<br/>";
//--> $$053 Begin of insert
            html += newParameterOn;
            html += checkboxy('settings_add_link_google_maps_on_gc_map', 'Add link to Google Maps on GC Map') + show_help("With this option an icon are placed on the GC Map page to link to the same area in Google Maps.") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_switch_to_google_maps_in_same_tab', 'Switch to Google Maps in same browser tab') + show_help("With this option you can switch from GC Map to Google Maps in the same browser tab.<br><br>This option requires \"Add link to Google Maps on GC Map\".") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
            html += "<div style='margin-top: 9px;'><b>&nbsp;Google Maps page:</b></div>";
            html += newParameterOn;
            html += checkboxy('settings_hide_left_sidebar_on_google_maps', 'Hide left sidebar on Google Maps by default') + show_help("With this option you can blended the left sidebar on the Google Maps page out.") + "<br/>";
            html += checkboxy('settings_add_link_gc_map_on_google_maps', 'Add link to GC Map on Google Maps') + show_help("With this option an icon are placed on the Google Maps page to link to the same area in GC Map.") + "<br/>";
            html += " &nbsp; " + checkboxy('settings_switch_to_gc_map_in_same_tab', 'Switch to GC Map in same browser tab') + show_help("With this option you can switch from Google Maps to GC Map in the same browser tab.<br><br>This option requires \"Add link to GC Map on Google Maps\".") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$053 End of insert
            html += "";
            html += "<br>";
            html += "";
//--> $$049 $$050 Begin of insert
            html += "<h4 class='gclh_headline2'>Profile / Statistic <a style='margin-left: 0px'>" + show_help("This section include your profile pages (\/my\/ and \/profile\/ pages) with for example your founded caches and trackables, your earned souvenirs, your image gallery, your statistic ... <br><br>Also the section include the profile pages of the others.") + "</a></h4>";
            html += checkboxy('settings_bookmarks_show', "Show <a class='gclh_ref' href='#gclh_linklist' id='gclh_linklist_link_2'>Linklist</a> in your profile") + show_help("Show the Linklist at the right side in your profile. You can configure the links in the Linklist at the end of this page.") + "<br/>";
            html += checkboxy('settings_hide_visits_in_profile', 'Hide TB/Coin visits in your profile') + "<br/>";
//--> $$055 Begin of delete
//            html += checkboxy('settings_hideable_souvenirs', 'Make your souvenirs hideable') + "<br/>";
//<-- $$055 End of delete 
            html += checkboxy('settings_show_thumbnails', 'Show thumbnails of images') + show_help("With this option the images are displayed as thumbnails to have a preview. If you hover over a thumbnail, you can see the big one. <br><br>This works in cache and TB logs, in the cache and TB image galleries and in the profile image galleries. <br><br>The max size option prevents the hovered images from leaving the browser window.") + "&nbsp; Max size of big image: <input class='gclh_form' size=2 type='text' id='settings_hover_image_max_size' value='" + settings_hover_image_max_size + "'> px <br/>";
            html += "&nbsp; " + checkboxy('settings_imgcaption_on_top', 'Show caption on top') + show_help("This option requires \"Show thumbnails of images\".") + "<br/>";
//--> $$056 Begin of insert
            html += checkboxy('settings_show_big_gallery', 'Show bigger images in gallery') + show_help("With this option the images in the galleries of caches, TBs and profiles are displayed bigger and not in 4 columns, but in 2 columns.") + "<br/>";
//<-- $$056 End of insert 
            html += newParameterOn;
            content_settings_show_mail_in_allmyvips = checkboxy('settings_show_mail_in_allmyvips', 'Show mail link beside user in "All my VIPs" list in your profile') + show_help("With this option there will be an small mail icon beside every username in the list with all your VIPs (All my VIPs) on your profile page. With this icon you get directly to the mail page to mail to this user. <br><br>This option requires \"Show mail link beside usernames\" and \"Show VIP list\".") + "<br>";
            html += content_settings_show_mail_in_allmyvips;
            html += checkboxy('settings_show_sums_in_watchlist', 'Show number of caches in your watchlist') + show_help("With this option the number of caches and the number of selected caches in the categories \"All\", \"Archived\" and \"Deactivated\", corresponding to the select buttons, are shown in your watchlist at the end of the list.") + "<br/>";
            html += checkboxy('settings_count_own_matrix', 'Calculate your cache matrix') + show_help("With this option the count of found difficulty and terrain combinations and the count of complete matrixes are calculated and shown above the cache matrix on your statistic page.") + "<br/>";
            html += checkboxy('settings_count_foreign_matrix', 'Calculate other users cache matrix') + show_help("With this option the count of found difficulty and terrain combinations and the count of complete matrixes are calculated and shown above the cache matrix on other users statistic page.") + "<br/>";
            html += checkboxy('settings_count_own_matrix_show_next', 'Mark D/T combinations for your next possible cache matrix') + show_help("With this option the necessary difficulty and terrain combinations to reach the next possible complete matrixes are marked in your cache matrix on your statistic page.") + "<br/>";
            html += " &nbsp; &nbsp;" + "Highlight next <select class='gclh_form' id='settings_count_own_matrix_show_count_next' >";
            for ( var i = 1; i < 5; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_count_own_matrix_show_count_next == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> matrixes in color <input class='gclh_form color' type='text' size=5 id='settings_count_own_matrix_show_color_next' style='margin-left: 0px;' value='" + getValue("settings_count_own_matrix_show_color_next", "5151FB") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_count_own_matrix_show_color_next' title='back to default' style='width: 12px; cursor: pointer;'>" + show_help("With this option you can choose the count and the color of highlighted next possible complete matrixes in your cache matrix on your statistic page.<br><br>This option requires \"Mark D/T combinations for your next possible cache matrix\".") + "<br>";
            html += " &nbsp; &nbsp;" + "Generate cache search links with radius <select class='gclh_form' id='settings_count_own_matrix_links_radius' >";
            for ( var i = 0; i < 201; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_count_own_matrix_links_radius == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> km" + show_help("With this option cache search links with the inserted radius in km are generated for the highlighted difficulty and terrain combinations. With a radius of 0 km there are no links generated. The default radius is 25 km.<br><br>This option requires \"Mark D/T combinations for your next possible cache matrix\".") + "<br>";
            html += " &nbsp; &nbsp;" + "Show the searched caches in a <select class='gclh_form' id='settings_count_own_matrix_links'>";
            html += "  <option value='map' " + (settings_count_own_matrix_links == "map" ? "selected=\"selected\"" : "") + ">map</option>";
            html += "  <option value='list' " + (settings_count_own_matrix_links == "list" ? "selected=\"selected\"" : "") + ">list</option>";
            html += "</select>" + show_help("With this option the searched caches are shown in a map or in a list.<br><br>This option requires \"Mark D/T combinations for your next possible cache matrix\".") + "<br>";
            html += checkboxy('settings_logit_for_basic_in_pmo', 'Log PMO caches by standard \"Log It\" icon (for basic members)') + show_help("With this option basic members are able to choose the standard \"Log It\" icon to call the logging screen for premium only caches. The tool tipp blocked not longer this call. You can have the same result by using the right mouse across the \"Log It\" icon and then new tab. <br>The \"Log It\" icon is besides the caches for example in the \"Recently Viewed Caches\" list and in your profile.") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
            html += "";
            html += "<br>";
            html += "";
//<-- $$049 $$050 End of insert
            html += "<h4 class='gclh_headline2'>Listing</h4>";
//--> $$024 Begin of change
//            html += checkboxy('settings_log_inline', 'Log Cache from Listing (inline)') + show_help("With the inline-Log you can open a log-form inside the listing, without loading a new page.") + "<br/> &nbsp; " + checkboxy('settings_log_inline_tb', 'Show TB-List') + show_help("With this option you can select, if the TB-List should be shown in inline-Logs.<br><br>This option requires \"Log Cache from Listing (inline)\".") + "<br/> &nbsp; " + checkboxy('settings_log_inline_pmo4basic', 'Show also for PMO-Caches (for Basic-Members)') + show_help("With this option you can select, if inline-Logs should appear for Premium-Member-Only-Caches althought you are a basic member (logging of PMO-Caches by basic members is allowed by Groundspeak).<br><br>This option requires \"Log Cache from Listing (inline)\".") + "<br/>";
            html += checkboxy('settings_log_inline', 'Log cache from listing (inline)') + show_help("With the inline log you can open a log form inside the listing, without loading a new page.") + "<br/>"; 
            content_settings_log_inline_tb = "&nbsp; " + checkboxy('settings_log_inline_tb', 'Show TB list') + show_help("With this option you can select, if the TB list should be shown in inline logs.<br><br>This option requires \"Log cache from listing (inline)\" or \"Log cache from listing for PMO (for basic members)\".") + "<br>";
            html += content_settings_log_inline_tb;
            html += checkboxy('settings_log_inline_pmo4basic', 'Log cache from listing for PMO (for basic members)') + show_help("With this option you can select, if inline logs should appear for Premium-Member-Only caches althought you are a basic member (logging of PMO caches by basic members is allowed by Groundspeak).") + "<br/>";
            html += content_settings_log_inline_tb.replace("settings_log_inline_tb", "settings_log_inline_tbX0");  
//<-- $$024 End of change
//--> $$055 Begin of delete
//            html += checkboxy('settings_breaks_in_cache_notes', 'Show linebreaks in cache notes') + show_help("This is a premium feature - the cache notes are displayed in a flat line by default. This option displays the notes with all breaks as they were saved.") + "<br/>";
//<-- $$055 End of delete 
            html += checkboxy('settings_hide_empty_cache_notes', 'Hide cache notes if empty') + show_help("This is a premium feature - you can hide the personal cache notes if they are empty. There will be a link to show them to add a note.") + "<br/>";
            html += checkboxy('settings_hide_cache_notes', 'Hide cache notes completely') + show_help("This is a premium feature - you can hide the personal cache notes completely, if you don't want to use them.") + "<br/>";
            html += checkboxy('settings_hide_disclaimer', 'Hide disclaimer') + "<br/>";
            html += checkboxy('settings_hide_spoilerwarning', 'Hide spoiler warning') + "<br/>";
            html += checkboxy('settings_hide_top_button', 'Hide green top button') + show_help("Hides the green \"To Top\" button, which appears if you are reading logs.") + "<br/>";
            html += checkboxy('settings_show_all_logs', 'Show ') + " <input class='gclh_form' type='text' size='2' id='settings_show_all_logs_count' value='" + settings_show_all_logs_count + "'> logs (0 = all)" + show_help("With this option you can choose how many logs should be shown if you load the listing - if you type 0, all logs are shown by default.") + "<br>";
//--> $$047 Begin of change
//            html += checkboxy('settings_hide_hint', 'Hide hint behind a link') + show_help("This option hides the hint behind a link - you have to click it to display the hints (already decrypted).") + "<br/>";
//            html += checkboxy('settings_decrypt_hint', 'Decrypt hint') + "<br/>";
//            html += checkboxy('settings_visitCount_geocheckerCom', 'Modify geochecker.com links') + show_help("This option adds '&visitCount=1' to all geochecker.com links (This will show some statistics on this site). FireFox and all browser besides Chrome will use the redirector service anonym.to !") + "<br/>";
            html += checkboxy('settings_hide_hint', 'Hide hints behind a link') + show_help("This option hides the hints behind a link - you have to click it to display the hints (already decrypted). This option remove also the hint description.") + "<br/>";
            html += checkboxy('settings_decrypt_hint', 'Decrypt hints') + show_help("This option decrypt the hints and remove also the hint description.") + "<br/>";
            html += checkboxy('settings_visitCount_geocheckerCom', 'Show statistic on geochecker.com sites') + show_help("This option adds '&visitCount=1' to all geochecker.com links. This will show some statistics on geochecker.com site like the count of site visits and the count of right and wrong attempts. Firefox and all browser besides Chrome will use the redirector service anonym.to !") + "<br/>";
//<-- $$047 End of change
            html += checkboxy('settings_show_eventday', 'Show weekday of an event') + show_help("With this option the day of the week will be displayed next to the date.") + " Date format: <select class='gclh_form' id='settings_date_format'>";
            html += "  <option " + (settings_date_format == "yyyy-MM-dd" ? "selected='selected'" : "") + " value='yyyy-MM-dd'> 2012-01-21</option>";
            html += "  <option " + (settings_date_format == "yyyy/MM/dd" ? "selected='selected'" : "") + " value='yyyy/MM/dd'> 2012/01/21</option>";
            html += "  <option " + (settings_date_format == "MM/dd/yyyy" ? "selected='selected'" : "") + " value='MM/dd/yyyy'> 01/21/2012</option>";
            html += "  <option " + (settings_date_format == "dd/MM/yyyy" ? "selected='selected'" : "") + " value='dd/MM/yyyy'> 21/01/2012</option>";
            html += "  <option " + (settings_date_format == "dd/MMM/yyyy" ? "selected='selected'" : "") + " value='dd/MMM/yyyy'> 21/Jan/2012</option>";
            html += "  <option " + (settings_date_format == "MMM/dd/yyyy" ? "selected='selected'" : "") + " value='MMM/dd/yyyy'> Jan/21/2012</option>";
            html += "  <option " + (settings_date_format == "dd MMM yy" ? "selected='selected'" : "") + " value='dd MMM yy'> 21 Jan 12</option>";
            html += "</select>" + show_help("If you have changed the date format on gc.com, you have to change it here to. Instead the day of week may be wrong.") + "<br/>";
//--> $$052 Begin of delete
//            html += checkboxy('settings_show_datepicker', 'Show datepicker') + show_help("With this option a calender icon is shown next to the date on the logpage. After a click on this icon a calender is shown to select the logdate.") + "<br/>";
//<-- $$052 End of delete 
            html += checkboxy('settings_show_mail', 'Show mail link beside usernames') + show_help("With this option there will be an small mail icon beside every username. With this icon you get directly to the mail page to mail to this user. If you click it when you are in a listing, the cachename and GCID will be inserted into the mail form - you don't have to remember it :) ") + "<br/>";
            html += "&nbsp; " + checkboxy('settings_show_mail_coordslink', 'Show coord link in mail') + show_help("With this option the GC/TB code in the mail is displayed as coord.info link. <br><br>This option requires \"Show mail link beside usernames\".") + "<br/>";
//--> $$004 Begin of insert
            html += newParameterOn;
//--> $$025 Begin of insert
            content_settings_show_mail_in_viplist = "&nbsp; " + checkboxy('settings_show_mail_in_viplist', 'Show mail link beside user in "VIP-List" in listing') + show_help("With this option there will be an small mail icon beside every username in the VIP lists on the cache listing page. With this icon you get directly to the mail page to mail to this user. <br><br>This option requires \"Show mail link beside usernames\", \"Show VIP list\" and \"Load logs with GClh\".") + "<br>";
            html += content_settings_show_mail_in_viplist;
//<-- $$025 End of insert
//--> $$024 Begin of insert
            html += "&nbsp; " + content_settings_show_mail_in_allmyvips.replace("settings_show_mail_in_allmyvips", "settings_show_mail_in_allmyvipsX0"); 
//<-- $$024 End of insert
            html += checkboxy('settings_show_message', 'Show message link beside usernames') + show_help("With this option there will be an small message icon beside every username. With this icon you get directly to the message page to send a message to this user. If you click it when you are in a listing, the cachename and GC code respectively the TB name and the TB code will be inserted into the message form.") + "<br/>";
            html += "&nbsp; " + checkboxy('settings_show_message_coordslink', 'Show coord link in message') + show_help("With this option the GC/TB code in the message is displayed as coord.info link. <br><br>This option requires \"Show message link beside usernames\".") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$004 End of insert
//--> $$053 Begin of change
//            html += checkboxy('settings_show_google_maps', 'Show link to and from google maps') + show_help("This option makes two thing. First it shows a link at the top of the second map in the listing. With this link you get directly to google maps in the area, where the cache is. Second it adds an gc.com icon to google maps to jump from google maps to gc.com maps to the same location.") + "<br/>";
            html += checkboxy('settings_show_google_maps', 'Show link to Google Maps') + show_help("This option shows a link at the top of the second map in the listing. With this link you get directly to Google Maps in the area, where the cache is.") + "<br/>";
//<-- $$053 End of change
            html += checkboxy('settings_strike_archived', 'Strike through title of archived/disabled caches') + "<br/>";
            html += checkboxy('settings_highlight_usercoords', 'Highlight coordinates which are changed by the user with red textcolor') + "<br/>";
            html += checkboxy('settings_show_fav_percentage', 'Show percentage of favourite points') + show_help("This option loads the favourite stats of a cache in the backround and display the percentage under the amount of favourites a cache got.") + "<br/>";
//--> $$016 Begin of insert
            html += newParameterOn;
            html += checkboxy('settings_show_remove_ignoring_link', 'Show \"Stop Ignoring\", if cache is already ignored') + show_help("This option replace the \"Ignore\" link description with the \"Stop Ignoring\" link description in the cache listing, if the cache is already ignored.") + "<br/>";
//--> $$045 Begin of insert
            html += checkboxy('settings_map_overview_build', 'Show cache location in overview map') + show_help("With this option there will be an additional map top right in the cache listing as an overview of the cache location. This was available in the gc.com standard earlier.") + "<br/>";
            html += " &nbsp; &nbsp;" + "Map zoom value: <select class='gclh_form' id='settings_map_overview_zoom'>";
            for ( var i = 1; i < 20; i++ ){
                html += "  <option value='" + i + "' " + (settings_map_overview_zoom == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select>" + show_help("With this option you can choose the zoom value to start in the map. \"1\" is the hole world and \"19\" is the maximal enlargement. Default is \"11\". <br><br>This option requires \"Show cache location in overview map\".") + "<br>";
//<-- $$045 End of insert
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$016 End of insert
            html += checkboxy('settings_show_vip_list', 'Show VIP list') + show_help("The VIP list is a list, displayed at the right side on a cache listing. You can add any user to your VIP list by clicking the little VIP icon beside the username. If it is green, this person is a VIP. The VIP list only shows VIPs and the logs of VIPs, which already posted a log to this cache. With this option you are able to see which of your VIPs already found this cache. On your profile page there is an overview of all your VIPs.") + "<br/>";
            html += "&nbsp; " + checkboxy('settings_show_owner_vip_list', 'Show owner in VIP list')  + show_help("If you enable this option, the owner is a VIP for the cache, so you can see, what happened with the cache (disable, maint, enable, ..). <br><br>This option requires \"Show VIP list\".")+ "<br/>";
            html += "&nbsp; " + checkboxy('settings_show_long_vip', 'Show long VIP list (one row per log)') + show_help("This is another type of displaying the VIP list. If you disable this option you get the short list - one row per VIP and the logs as icons beside the VIP. If you enable this option, there is a row for every log.<br><br>This option requires \"Show VIP list\".") + "<br/>";
            html += "&nbsp; " + checkboxy('settings_vip_show_nofound', 'Show a list of VIPs who have not found the cache') + show_help("This option enables an additional VIP list with VIPs who have not found the cache.<br><br>This option requires \"Show VIP list\".") + "<br>";
//--> $$024 Begin of insert
            html += newParameterOn;
//--> $$025 Begin of insert
            html += content_settings_show_mail_in_viplist.replace("settings_show_mail_in_viplist", "settings_show_mail_in_viplistX0");  
//<-- $$025 End of insert
            html += "&nbsp; " + content_settings_show_mail_in_allmyvips.replace("settings_show_mail_in_allmyvips", "settings_show_mail_in_allmyvipsX1"); 
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$024 End of insert
//--> $$050 Begin of change
//            html += checkboxy('settings_show_thumbnails', 'Show thumbnails of images') + show_help("With this option the images are displayed as thumbnails to have a preview. If you hover over a thumbnail, you can see the big one. <br><br>This works in cache and TB logs, in the cache and TB image galleries and in the profile image galleries. <br><br>The max size option prevents the hovered images from leaving the browser window.") + "&nbsp; Max size of big image: <input class='gclh_form' size=2 type='text' id='settings_hover_image_max_size' value='" + settings_hover_image_max_size + "'> px <br/>";
            html += checkboxy('settings_show_thumbnailsX0', 'Show thumbnails of images') + show_help("With this option the images are displayed as thumbnails to have a preview. If you hover over a thumbnail, you can see the big one. <br><br>This works in cache and TB logs, in the cache and TB image galleries and in the profile image galleries. <br><br>The max size option prevents the hovered images from leaving the browser window.") + "&nbsp; Max size of big image: <input class='gclh_form' size=2 type='text' id='settings_hover_image_max_sizeX0' value='" + settings_hover_image_max_size + "'> px <br/>";
//<-- $$050 End of change
//--> $$023 Begin of change - Disable Spoiler String
//            html += " &nbsp; &nbsp;" + "Spoiler-Filter: <input class='gclh_form' type='text' id='settings_spoiler_strings' value='" + settings_spoiler_strings + "'> " + show_help("If one of these words is found in the caption of the image, there will be no thumbnail. It is to prevent seeing spoilers as thumbnails. Words have to be divided by |. <br>Default ist \"spoiler|hinweis|hint\".<br><br>This option requires \"Show Thumbnails of Images\".") + "<br/>";
//<-- $$023 End of change
//--> $$050 Begin of change
//            html += "&nbsp; " + checkboxy('settings_imgcaption_on_top', 'Show caption on top') + show_help("This option requires \"Show thumbnails of images\".") + "<br/>";
            html += "&nbsp; " + checkboxy('settings_imgcaption_on_topX0', 'Show caption on top') + show_help("This option requires \"Show thumbnails of images\".") + "<br/>";
//<-- $$050 End of change
//--> $$056 Begin of insert
            html += checkboxy('settings_show_big_galleryX0', 'Show bigger images in gallery') + show_help("With this option the images in the galleries of caches, TBs and profiles are displayed bigger and not in 4 columns, but in 2 columns.") + "<br/>";
//<-- $$056 End of insert 
            html += checkboxy('settings_hide_avatar', 'Hide avatars in listing') + show_help("This option hides the avatars in logs. This prevents loading the hundreds of images. You have to change the option here, because GClh overrides the log-load-logic of gc.com, so the avatar option of gc.com doesn't work with GClh.") + "<br/>";
            html += checkboxy('settings_load_logs_with_gclh', 'Load logs with GClh') + show_help("This option should be enabled. <br><br>You just should disable it, if you have problems with loading the logs. <br><br>If this option is disabled, there are no VIP-, mail-, message- and top icons, no line colors and no mouse activated big images at the logs. Also the VIP lists, hide avatars, log filter and log search won't work.") + "<br/>";
            html += checkboxy('settings_show_real_owner', 'Show real owner name') + show_help("If the option is enabled, GClh will replace the pseudonym a owner took to publish the cache with the real owner name.") + "<br/>";
            html += "<br>";
            html += "";
            html += "<h4 class='gclh_headline2'>Logging</h4>";
            html += checkboxy('settings_submit_log_button', 'Submit log, Pocket Query or Bookmark on F2') + show_help("With this option you are able to submit your log by pressing F2 instead of scrolling to the bottom and move the mouse to the button. This feature also works to save Pocket Queries or Bookmarks.") + "<br/>";
//--> $$006 Begin of change
//            html += checkboxy('settings_show_bbcode', 'Show Smilies and BBCode') + show_help("This option displays Smilies and BBCode-Options beside the log-form. If you click on a Smilie or BBCode, it is inserted into your log.") + "<br/>";
            html += checkboxy('settings_show_bbcode', 'Show smilies') + show_help("This option displays smilies options beside the log form. If you click on a smilie, it is inserted into your log.") + "<br/>";
//<-- $$006 End of change
            html += checkboxy('settings_autovisit', 'Enable \"AutoVisit\" feature for TBs/Coins') + show_help("With this option you are able to select TBs/Coins which should be automatically set to \"visited\" on every log. You can select \"AutoVisit\" for each TB/Coin in the list on the bottom of the log form.") + "<br/>";
            html += checkboxy('settings_replace_log_by_last_log', 'Replace log by last log template') + show_help("If you enable this option, the last log template will replace the whole log. If you disable it, it will be appended to the log.") + "<br/>";
//--> $$048 Begin of insert
            html += checkboxy('settings_show_log_itX0', 'Show GClh \"Log it\" icon (too for basic members for PMO)') + show_help("The GClh \"Log it\" icon is displayed beside cache titles in nearest lists. If you click it, you will be redirected directly to the log form. <br><br>You can use it too as basic member to log Premium Member Only (PMO) caches.") + "<br/>";
            html += newParameterOn;
            html += checkboxy('settings_logit_for_basic_in_pmoX0', 'Log PMO caches by standard \"Log It\" icon (for basic members)') + show_help("With this option basic members are able to choose the standard \"Log It\" icon to call the logging screen for premium only caches. The tool tipp blocked not longer this call. You can have the same result by using the right mouse across the \"Log It\" icon and then new tab. <br>The \"Log It\" icon is besides the caches for example in the \"Recently Viewed Caches\" list and in your profile.") + "<br/>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
//<-- $$048 End of insert
//--> $$006 Begin of change
//            html += "Log-Templates: <font class='gclh_small'>(BBCodes have to be enabled - #found# will be replaced with founds+1 - #found_no# will be replaced with founds - #me# with your username - #owner# with the name of the owner)</font>" + show_help("Log-Templates are pre-defined texts like \"!!! I got the FTF !!!\". All your templates are shown beside the log-form. You just have to click to a Template and it will be placed in your log. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner. The BBCode-Option has to be enabled. Note: You have to set a title and a text - click to the edit-icon beside the template to edit the text.") + "<br>";
//--> $$052 Begin of change
//            html += "&nbsp;" + "Log templates:" + show_help("Log templates are pre-defined texts like \"!!! I got the FTF !!!\". All your templates are shown beside the log form. You just have to click to a template and it will be placed in your log. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner. The smilies option has to be enabled. Note: You have to set a title and a text - click to the edit icon beside the template to edit the text.") + "<font class='gclh_small'> (Smilies have to be enabled - #found# will be replaced with founds+1 -</font>" + "<br>";
//            html += "&nbsp;" + "<font class='gclh_small'>#found_no# with founds - #me# with your username - #owner# with the name of the owner)</font>" + "<br>";
            html += "&nbsp;" + "Log templates:" + show_help("Log templates are pre-defined texts like \"!!! I got the FTF !!!\". All your templates are shown beside the log form. You just have to click to a template and it will be placed in your log. <br><br>Also you are able to use variables: #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 - #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner - #date#, #time# and #datetime# ... . The smilies option has to be enabled. <br><br>Note: You have to set a title and a text - click to the edit icon beside the template to edit the text.") + "<font class='gclh_small'> (Smilies have to be enabled - #found# will be replaced with founds+1 -</font>" + "<br>";
            html += "&nbsp;" + "<font class='gclh_small'>#found_no# with founds - #me# with you - #owner# ... - #date#, #time# and #datetime# ...)</font>" + "<br>";
//<-- $$052 End of change
//<-- $$006 End of change
            for (var i = 0; i < anzTemplates; i++) {
                html += "&nbsp;" + "<input class='gclh_form' type='text' size='15' id='settings_log_template_name[" + i + "]' value='" + getValue('settings_log_template_name[' + i + ']', '') + "'> ";
                html += "<a onClick=\"if(document.getElementById(\'settings_log_template_div[" + i + "]\').style.display == \'\') document.getElementById(\'settings_log_template_div[" + i + "]\').style.display = \'none\'; else document.getElementById(\'settings_log_template_div[" + i + "]\').style.display = \'\'; return false;\" href='#'><img src='" + http + "://www.geocaching.com/images/stockholm/16x16/page_white_edit.gif' border='0'></a><br>";
                html += "<div id='settings_log_template_div[" + i + "]' style='display: none;'>&nbsp;&nbsp;&nbsp;&nbsp;<textarea class='gclh_form' rows='6' cols='30' id='settings_log_template[" + i + "]'>&zwnj;" + getValue("settings_log_template[" + i + "]", "") + "</textarea></div>";
            }
            html += "&nbsp;" + "Default log type: &nbsp; &nbsp; &nbsp; &nbsp; <select class='gclh_form' id='settings_default_logtype' style='margin-left: 8px;'>";
            html += "  <option value=\"-1\" " + (settings_default_logtype == "-1" ? "selected=\"selected\"" : "") + ">- Select type of log -</option>";
            html += "  <option value=\"2\" " + (settings_default_logtype == "2" ? "selected=\"selected\"" : "") + ">Found it</option>";
            html += "  <option value=\"3\" " + (settings_default_logtype == "3" ? "selected=\"selected\"" : "") + ">Didn't find it</option>";
            html += "  <option value=\"4\" " + (settings_default_logtype == "4" ? "selected=\"selected\"" : "") + ">Write note</option>";
            html += "  <option value=\"7\" " + (settings_default_logtype == "7" ? "selected=\"selected\"" : "") + ">Needs archived</option>";
            html += "  <option value=\"45\" " + (settings_default_logtype == "45" ? "selected=\"selected\"" : "") + ">Needs maintenance</option>";
            html += "</select>" + show_help("If you set this option, the selected value will be selected automatically, if you open a log page.") + "<br>";

            html += "&nbsp;" + "Default event log type: <select class='gclh_form' id='settings_default_logtype_event' style='margin-left: 4px;'>";
            html += "  <option value=\"-1\" " + (settings_default_logtype_event == "-1" ? "selected=\"selected\"" : "") + ">- Select type of log -</option>";
            html += "  <option value=\"4\" " + (settings_default_logtype_event == "4" ? "selected=\"selected\"" : "") + ">Write note</option>";
            html += "  <option value=\"7\" " + (settings_default_logtype_event == "7" ? "selected=\"selected\"" : "") + ">Needs archived</option>";
            html += "  <option value=\"9\" " + (settings_default_logtype_event == "9" ? "selected=\"selected\"" : "") + ">Will attend</option>";
            html += "  <option value=\"10\" " + (settings_default_logtype_event == "10" ? "selected=\"selected\"" : "") + ">Attended</option>";
            html += "</select>" + show_help("If you set this option, the selected value will be selected automatically, if you open a log page of an event.") + "<br>";

            html += "&nbsp;" + "Default owner log type: <select class='gclh_form' id='settings_default_logtype_owner'>";
            html += "  <option value=\"-1\" " + (settings_default_logtype_owner == "-1" ? "selected=\"selected\"" : "") + ">- Select type of log -</option>";
            html += "  <option value=\"4\" " + (settings_default_logtype_owner == "4" ? "selected=\"selected\"" : "") + ">Write note</option>";
            html += "  <option value=\"5\" " + (settings_default_logtype_owner == "5" ? "selected=\"selected\"" : "") + ">Archive</option>";
            html += "  <option value=\"23\" " + (settings_default_logtype_owner == "23" ? "selected=\"selected\"" : "") + ">Enable listing</option>";
            html += "  <option value=\"18\" " + (settings_default_logtype_owner == "18" ? "selected=\"selected\"" : "") + ">Post reviewer note</option>";
            html += "</select>" + show_help("If you set this option, the selected value will be selected automatically, if you open a log page of one of your own caches.") + "<br>";

            html += "&nbsp;" + "Default TB log type: &nbsp; &nbsp; <select class='gclh_form' id='settings_default_tb_logtype' style='margin-left: 4px;'>";
            html += "  <option value=\"-1\" " + (settings_default_tb_logtype == "-1" ? "selected=\"selected\"" : "") + ">- Select type of log -</option>";
            html += "  <option value=\"13\" " + (settings_default_tb_logtype == "13" ? "selected=\"selected\"" : "") + ">Retrieve from ..</option>";
            html += "  <option value=\"19\" " + (settings_default_tb_logtype == "19" ? "selected=\"selected\"" : "") + ">Grab it from ..</option>";
            html += "  <option value=\"4\" " + (settings_default_tb_logtype == "4" ? "selected=\"selected\"" : "") + ">Write note</option>";
            html += "  <option value=\"48\" " + (settings_default_tb_logtype == "48" ? "selected=\"selected\"" : "") + ">Discovered it</option>";
            html += "</select>" + show_help("If you set this option, the selected value will be selected automatically, if you open a log page.") + "<br>";
//--> $$002 Begin of change
//            html += "Cache-Signature:" + show_help("The Signature will automatically be inserted into your logs. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner.") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# will be replaced with founds - #me# with your username - #owner# with the name of the owner)</font><br>";
//--> $$052 Begin of change
//            html += "&nbsp;" + "Cache log signature:" + show_help("The signature will automatically be inserted into your logs. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner.") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# with founds - </font><br>";
//            html += "&nbsp;" + "<font class='gclh_small'>#me# with your username - #owner# with the name of the owner)</font><br>";
            html += "&nbsp;" + "Cache log signature:" + show_help("The signature will automatically be inserted into your logs. <br><br>Also you are able to use variables: #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 - #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner - #date#, #time# and #datetime# ... .") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# with founds - </font><br>";
            html += "&nbsp;" + "<font class='gclh_small'>#me# with you - #owner# ... - #date#, #time# and #datetime# ...)</font><br>";
//<-- $$052 End of change
//<-- $$002 End of change
            html += "&nbsp;" + "<textarea class='gclh_form' rows='8' cols='40' id='settings_log_signature'>&zwnj;" + getValue("settings_log_signature", "") + "</textarea><br>";
            html += checkboxy('settings_log_signature_on_fieldnotes', 'Add log signature on Field Notes logs') + show_help('If this option is disabled, the log signature will not be used by logs out of Field Notes - you can use it, if you already have an signature in your Field Notes.') + "<br>";
//--> $$002 Begin of change
//            html += "TB-Signature:" + show_help("The Signature will automatically be inserted into your TB-logs. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner.") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# will be replaced with founds - #me# with your username - #owner# with the name of the owner)</font><br>";
//--> $$052 Begin of change
//            html += "&nbsp;" + "TB log signature:" + show_help("The signature will automatically be inserted into your TB logs. Also you are able to use variables. #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 and #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner.") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# with founds - </font><br>";
//            html += "&nbsp;" + "<font class='gclh_small'>#me# with your username - #owner# with the name of the owner)</font><br>";
            html += "&nbsp;" + "TB log signature:" + show_help("The signature will automatically be inserted into your TB logs. <br><br>Also you are able to use variables: #found# will be replaced with your amount of found caches and will be added with 1 - #found_no# is the same without the +1 - #me# with your username (useful for different accounts at one computer) - #owner# with the name of the owner - #date#, #time# and #datetime# ... .") + " <font class='gclh_small'>(#found# will be replaced with founds+1 - #found_no# with founds - </font><br>";
            html += "&nbsp;" + "<font class='gclh_small'>#me# with you - #owner# ... - #date#, #time# and #datetime# ...)</font><br>";
//<-- $$052 End of change
//<-- $$002 End of change
            html += "&nbsp;" + "<textarea class='gclh_form' rows='8' cols='40' id='settings_tb_signature'>&zwnj;" + getValue("settings_tb_signature", "") + "</textarea><br>";
            html += "<br>";
            html += "";
//--> $$002 Begin of change
//            html += "<h4 class='gclh_headline2'>Mail-Form</h4>";
//            html += "Signature: &nbsp; &nbsp; &nbsp; " + show_help("The Signature will automatically be inserted into your mails. #me# will be replaced with your username.") + "<br>";
            html += "<h4 class='gclh_headline2'>Mail/Message form</h4>";
            html += "&nbsp;" + "Signature: &nbsp; &nbsp; &nbsp; " + show_help("The signature will automatically be inserted into your mails and messages. #me# will be replaced with your username.") + " <font class='gclh_small'>(#me# will be replaced with your username.)</font><br>";
//<-- $$002 End of change
            html += "&nbsp;" + "<textarea class='gclh_form' rows='8' cols='40' id='settings_mail_signature'>&zwnj;" + getValue("settings_mail_signature", "") + "</textarea><br>";
            html += "<br>";
            html += "";
            html += "<h4 class='gclh_headline2'><a name='gclh_linklist'></a>Linklist / Navigation" + show_help("In this section you can configure your personal Linklist which is shown on the top of the page and/or in your profile. You can activate it on top of this configuration page respectively in the \"Profile / Statistic\" section.") + " <a class='gclh_small' href='#gclh_linklist' id='gclh_show_linklist_btn'>show</a></h4>";
            html += "<div id='gclh_settings_linklist' style='display: none;'>";
            html += "&nbsp;" + "Remove from Navigation:" + show_help("Here you can select, which of the original gc.com links should be removed to make room for your Linklist.") + "<br>";
            html += "<input type='checkbox' " + (getValue('remove_navi_learn') ? "checked='checked'" : "" ) + " id='remove_navi_learn'> Learn<br>";
//--> $$014 Begin of delete
//            html += "<input type='checkbox' " + (getValue('remove_navi_partnering') ? "checked='checked'" : "" ) + " id='remove_navi_partnering'> Partnering<br>";
//<-- $$014 End of delete
            html += "<input type='checkbox' " + (getValue('remove_navi_play') ? "checked='checked'" : "" ) + " id='remove_navi_play'> Play<br>";
//--> $$014 Begin of delete
//            html += "<input type='checkbox' " + (getValue('remove_navi_profile') ? "checked='checked'" : "" ) + " id='remove_navi_profile'> Your Profile<br>";
////    html += "<input type='checkbox' "+(getValue('remove_navi_join') ? "checked='checked'" : "" )+" id='remove_navi_join'> Join<br>";
//<-- $$014 End of delete
            html += "<input type='checkbox' " + (getValue('remove_navi_community') ? "checked='checked'" : "" ) + " id='remove_navi_community'> Community<br>";
//--> $$014 Begin of delete
//            html += "<input type='checkbox' " + (getValue('remove_navi_videos') ? "checked='checked'" : "" ) + " id='remove_navi_videos'> Videos<br>";
////    html += "<input type='checkbox' "+(getValue('remove_navi_resources') ? "checked='checked'" : "" )+" id='remove_navi_resources'> Resources<br>";
//<-- $$014 End of delete
            html += "<input type='checkbox' " + (getValue('remove_navi_shop') ? "checked='checked'" : "" ) + " id='remove_navi_shop'> Shop<br>";
//--> $$014 Begin of delete
//            html += "<input type='checkbox' " + (getValue('remove_navi_social', true) ? "checked='checked'" : "" ) + " id='remove_navi_social'> Follow Us<br>";
//<-- $$014 End of delete
            html += "<br>";
//--> $$002 Begin of delete
//            html += "<input type='checkbox' " + (settings_bookmarks_search ? "checked='checked'" : "" ) + " id='settings_bookmarks_search'> Show Searchfield - Default Value: <input class='gclh_form' type='text' id='settings_bookmarks_search_default' value='" + settings_bookmarks_search_default + "' size='4'>" + show_help("If you enable this option, then there will be a searchfield on the top of the page beside the links. In this field you can search for GCIDs, TBIDs, Tracking-Numbers, Coordinates, ... - also you can define a default-value if you want (like GC...).") + "<br>";
//            html += "<input type='checkbox' " + (settings_bookmarks_top_menu ? "checked='checked'" : "" ) + " id='settings_bookmarks_top_menu'> Show Linklist as Drop-Down" + show_help("If you enable this option, your Linklist will be shown as a drop-down list beside the other links. If you disable it, the Linklist will be shown like all other links on the top of the page - side by side.") + "<br>";
//<-- $$002 End of delete
//--> $$002 Begin of insert
            html += "<input type='checkbox' " + (settings_bookmarks_search ? "checked='checked'" : "" ) + " id='settings_bookmarks_search'> Show searchfield - Default value: <input class='gclh_form' type='text' id='settings_bookmarks_search_default' value='" + settings_bookmarks_search_default + "' size='4'>" + show_help("If you enable this option, there will be a searchfield on the top of the page beside the links. In this field you can search for GCIDs, TBIDs, tracking numbers, coordinates, ... - also you can define a default value if you want (like GC...).<br><br>This option requires \"Show Linklist on top\".") + "<br>";

            html += "<input type='radio' " + (settings_bookmarks_top_menu ? "checked='checked'" : "" ) + " name='top_menu' id='settings_bookmarks_top_menu' style='margin-top: 9px;'> Show Linklist at menu as drop-down list" + show_help("With this option your Linklist will be shown at the navigation menu as a drop-down list beside the others.<br><br>This option requires \"Change header layout\".") + "<br>";
            html += "<div id='box_top_menu_v' style='margin-left: 21px; margin-bottom: 2px; height: 141px;' >";
            html += newParameterOn;
            html += checkboxy('settings_menu_float_right', 'Arrange the menu right') + show_help("With this option you can arrange the navigation menu with the Linklist and the other drop-down lists in the right direction. The default is an orientation in the left direction.<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br/>";
            html += "&nbsp;" + "Font color: <input class='gclh_form color' type='text' size=5 id='settings_font_color_menu_submenu' value='" + getValue("settings_font_color_menu_submenu", "93B516") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_font_color_menu_submenu' title='back to default' style='width: 12px; cursor: pointer;'>" + show_help("With this option you can choose the font color at the navigation menu and the drop-down lists. The default font color is 93B516 (lime green).<br><br>This option requires \"Change header layout\".") + "<br>";
            html += "&nbsp;" + "Font size at menu: <select class='gclh_form' id='settings_font_size_menu' style='margin-left: 116px;'>";  
            for ( var i = 6; i < 17; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_font_size_menu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the font size at the navigation menu in pixel. The default font size is 15 pixel.<br><br>This option requires \"Change header layout\".") + "<br>";
            html += "&nbsp;" + "Distance between menu entries: <select class='gclh_form' id='settings_distance_menu' style='margin-left: 22px;'>";  
            for ( var i = 0; i < 100; i++ ) {
                html += "  <option value='" + i + "' " + (settings_distance_menu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the distance between the navigation menu entries in horizontal direction in pixel. <br><br>This option requires \"Change header layout\".") + "<br>";
            html += "&nbsp;" + "Font size at drop-down lists: <select class='gclh_form' id='settings_font_size_submenu' style='margin-left: 44px;'>";  
            for ( var i = 6; i < 17; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_font_size_submenu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the font size at the drop-down lists in pixel. The default font size is 13 pixel.<br><br>This option requires \"Change header layout\".") + "<br>";
            html += "&nbsp;" + "Distance between drop-down links: <select class='gclh_form' id='settings_distance_submenu'>";  
            for ( var i = 0; i < 33; i++ ) {
                html += "  <option value='" + i + "' " + (settings_distance_submenu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the distance between the drop-down links in vertical direction in pixel. <br><br>This option requires \"Change header layout\".") + "<br>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
            html += "</div>";
            
            html += "<input type='radio' " + (settings_bookmarks_top_menu ? "" : "checked='checked'" ) + " name='top_menu' id='settings_bookmarks_top_menu_h'> Show Linklist in horizontal direction" + show_help("If you enable this option, the links in your Linklist will be shown direct on the top of the page - side by side.<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "<div id='box_top_menu_h' style='margin-left: 21px; height: 138px;' >";
            html += newParameterOn;
            html += "&nbsp;" + "Font color: <input class='gclh_form color' type='text' size=5 id='settings_font_color_menu_submenuX0' value='" + getValue("settings_font_color_menu_submenu", "93B516") + "'>";
            html += "<img src=" + global_restore_icon + " id='restore_settings_font_color_menu_submenuX0' title='back to default' style='width: 12px; cursor: pointer;'>" + show_help("With this option you can choose the font color at the links. The default font color is 93B516 (lime green).<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "&nbsp;" + "Font size at the links: <select class='gclh_form' id='settings_font_size_menuX0' style='margin-left: 43px;'>";  
            for ( var i = 6; i < 17; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_font_size_menu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the font size at the links in pixel. The default font size is 15 pixel.<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "&nbsp;" + "Distance between the links: <select class='gclh_form' id='settings_distance_menuX0' style='margin-left: 2px;'>";  
            for ( var i = 0; i < 100; i++ ) {
                html += "  <option value='" + i + "' " + (settings_distance_menu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can choose the distance between the links in horizontal direction in pixel. <br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "&nbsp;" + "Number of lines for all links: <select class='gclh_form' id='settings_menu_number_of_lines'>";
            html += "  <option value=\"1\" " + (settings_menu_number_of_lines == "1" ? "selected=\"selected\"" : "") + ">1</option>";
            html += "  <option value=\"2\" " + (settings_menu_number_of_lines == "2" ? "selected=\"selected\"" : "") + ">2</option>";
            html += "  <option value=\"3\" " + (settings_menu_number_of_lines == "3" ? "selected=\"selected\"" : "") + ">3</option>";
            html += "</select>" + show_help("With this option you can choose the number of lines which are necessary to include all the links of the Linklist in the header of the page.<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "<input type='checkbox' " + (getValue('settings_menu_show_separator') ? "checked='checked'" : "" ) + " id='settings_menu_show_separator'> Show separator between the links" + show_help("This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "&nbsp;" + "Font size at gc.com drop-down lists: <select class='gclh_form' id='settings_font_size_submenuX0' style='margin-left: 44px;'>";  
            for ( var i = 6; i < 17; i++ ) { 
                html += "  <option value='" + i + "' " + (settings_font_size_submenu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can only choose the font size at the remaining gc.com drop-down lists in pixel. The default font size is 13 pixel.<br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += "&nbsp;" + "Distance between gc.com drop-down links: <select class='gclh_form' id='settings_distance_submenuX0'>";  
            for ( var i = 0; i < 33; i++ ) {
                html += "  <option value='" + i + "' " + (settings_distance_submenu == i ? "selected=\"selected\"" : "") + ">" + i + "</option>";
            }
            html += "</select> px" + show_help("With this option you can only choose the distance between the remaining gc.com drop-down links in vertical direction in pixel. <br><br>This option requires \"Change header layout\" and \"Show Linklist on top\".") + "<br>";
            html += newParameterVersionSetzen(11.7) + newParameterOff;
            html += "</div>";
//<-- $$002 End of insert
            html += "<br>";

//--> $$058 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//            html += "<div style='float:right; width:197px;margin-left:10px;' div>";
//
//            var firstCust = 0;
//            for (var j = 0; j < bookmarks.length; j++) {
//                if (bookmarks[j].custom) {
//                    firstCust = j;
//                    break;
//                }
//            }
//            html += "   <p style='margin-top:5px;margin-bottom:5px;font-family: Verdana;font-size: 14px;font-style: normal;font-weight: bold;'>Linklist" + show_help("The Linklist requires \"Show Linklist on top\" or \"Show Linklist in profile\".") + "</p>";
//            html += "   <table class='gclh_form' style='width:100%;'>";
//            html += "     <tbody id='gclh_LinkListTop'>";
//
//            var order = JSON.parse(getValue("settings_bookmarks_list", "[]").replace(/, (?=,)/g, ",null"));
//            if (order.length == 0) {
//                html += "        <tr class='gclh_LinkListPlaceHolder'>";
//                html += "          <td style='padding: 4px 2px;' >Drop here...</td>";
//                html += "        </tr>";
//            }
//            else {
//                for (var i = 0; i < order.length; i++) {
//                    if (typeof(order[i]) == "undefined") continue;
//                    if (typeof(order[i]) == "object") continue;
//                    if (typeof(bookmarks[order[i]]) == "undefined") continue;
//                    var text = (typeof(bookmarks_orig_title[order[i]]) != "undefined" && bookmarks_orig_title[order[i]] != "" ? bookmarks_orig_title[order[i]] : bookmarks[order[i]]['title']);
//                    if (bookmarks[order[i]].custom) {
//                        text = "Custom" + (order[i] - firstCust);
//                    }
//                    html += "<tr class='gclh_LinkListInlist' id='gclh_LinkListTop_" + order[i] + "' name='" + text + "'> <td style='padding: 4px 2px;' ><img style='height:12px;margin-right:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />" + text + "</td> <td style='width:24px;'><img class='gclh_LinkListDelIcon' style='height:22px;'src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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' /></td> </tr>";
//                }
//            }
//
//            html += "     </tbody>";
//            html += "   </table>";
//<-- $$058 End of delete 

//--> $$043 Begin of delete
//            html += "   <p style='margin-top:5px;margin-bottom:5px;font-family: Verdana;font-size: 14px;font-style: normal;font-weight: bold;'>Linklist Map</p>";
//            html += "   <table class='gclh_form' style='width:100%;'>";
//            html += "     <tbody id='gclh_LinkListMap'>";
//
//            var order = JSON.parse(getValue("settings_bookmarks_list_beta", "[]").replace(/, (?=,)/g, ",null"));
//            if (order.length == 0) {
//                html += "        <tr class='gclh_LinkListPlaceHolder'>";
//                html += "          <td style='padding: 4px 2px;' >Drop here...</td>";
//                html += "        </tr>";
//            }
//            else {
//
//                for (var i = 0; i < order.length; i++) {
//                    if (typeof(order[i]) == "undefined") continue;
//                    if (typeof(order[i]) == "object") continue;
//                    if (typeof(bookmarks[order[i]]) == "undefined") continue;
//                    var text = (typeof(bookmarks_orig_title[order[i]]) != "undefined" && bookmarks_orig_title[order[i]] != "" ? bookmarks_orig_title[order[i]] : bookmarks[order[i]]['title']);
//                    if (bookmarks[order[i]].custom) {
//                        text = "Custom" + (order[i] - firstCust);
//                    }
//                    html += "<tr class='gclh_LinkListInlist' id='gclh_LinkListMap_" + order[i] + "' name='" + text + "'> <td style='padding: 4px 2px;' ><img style='height:12px;margin-right:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />" + text + "</td> <td style='width:24px;'><img class='gclh_LinkListDelIcon' style='height:22px;'src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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' /></td> </tr>";
//                }
//            }
//
//            html += "     </tbody>";
//            html += "   </table>";
//<-- $$043 End of delete 

//--> $$058 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//            html += "</div>";
//            html += "<table>";
//            html += " <thead>";
//            html += "  <tr>";
//            html += "    <td align='center' style='padding-left: 60px;'>" + show_help("Here you can choose the links you want in your Linklist. Also you are able to select a custom name for the link (like PQ for Pocket Query).<br>If there is a text field, then it is a custom link. In this text field you can type any URL you want to be added to the Linklist. The checkbox behind defines, if the link should be opened in a new window.<br><br>If you have problems to drag & drop the lower links because the Linklist area is not on the screen, then use the arrow high button on your keyboard during you hold the mouseclick.") + "</td>";
//            html += "    <td>" + show_help("Here you can choose the link descriptions to your links.") + "</td>";
//            html += "  </tr>";
//            html += " </thead>";
//            html += " <tbody>";
//
//            // Create reverse-Array
//            var sort = new Array();
//            for (var i = 0; i < settings_bookmarks_list.length; i++) {
//                sort[settings_bookmarks_list[i]] = i;
//            }
////--> $$043 Begin of delete
////            var sort_beta = new Array();
////            for (var i = 0; i < settings_bookmarks_list_beta.length; i++) {
////                sort_beta[settings_bookmarks_list_beta[i]] = i;
////            }
////<-- $$043 End of delete 
//
//            // Create the Bookmark-Options
//            var cust = 0;
//            for (var i = 0; i < bookmarks.length; i++) {
//                var options = "";
//                for (var x = 0; x < bookmarks.length; x++) {
//                    options += "<option value='" + x + "' " + (sort[i] == x ? "selected='selected'" : "" ) + ">" + x + "</option>";
//                }
//
//                html += "  <tr>";
//                html += "    <td style='padding: 4px 2px;' align='left' class='gclh_LinkListElement' id='gclh_LinkListElement_" + i + "' >";
//                html += "<img style='height:12px;margin-right:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAtCAQAAACKL8qfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFESURBVHja7JbBR0RRFMZ/975piFZDiogYHi0eebxVDKVFJGJ280Srp/6A/oOIaVlDpX0UbYdhaFPEWw0xGiI9ZjXE8BieWkxp0+beU7R43+auvp9zr3O+e1QIUKGKTxETZcTc0AIVQoNdbHVG5HhbHGEvnyfHO2EBiSY0JWRyNV0hoqepkwkAGQeamB2GloAhEfcqBJhlDZ9JI/uImCb9cV8Ipd7FCE2O+F+IX+iLwue5zKKxN6VNMkZMc8mKVQEp+xyrEK6oCu6x6njznIueYkYLYw/Kmmd5ar1wLULUNRDRtLSn7NEuAAPWqRBQNk6tFkmeWjniz1MLXKYMvQn9b8QmDeYsCnhgm64KIeAOx3bUWXI8OMW1fogSrxoMJ/SHXQthbiUaOBRsWwkXGrilxpsV4JENBl+tVSQw/M9GxHQAPgYA/ixGIgPoxNsAAAAASUVORK5CYII=' />";
//                if (typeof(bookmarks[i]['custom']) != "undefined" && bookmarks[i]['custom'] == true) {
//                    html += "<input style='padding-left: 2px; padding-right: 2px;' class='gclh_form' type='text' id='settings_custom_bookmark[" + cust + "]' value='" + bookmarks[i]['href'] + "' size='15'> ";
//                    html += "<input type='checkbox' title='Open in new window' " + (bookmarks[i]['target'] == "_blank" ? "checked='checked'" : "" ) + " id='settings_custom_bookmark_target[" + cust + "]'>";
//                    cust++;
//                } else {
//                    html += "<a class='gclh_ref' ";
//                    for (attr in bookmarks[i]) {
//                        html += attr + "='" + bookmarks[i][attr] + "' ";
//                    }
//                    html += ">" + (typeof(bookmarks_orig_title[i]) != "undefined" && bookmarks_orig_title[i] != "" ? bookmarks_orig_title[i] : bookmarks[i]['title']) + "</a>";
//                }
//                html += "</td>";
//                html += "    <td align='left' style='padding: 4px 2px;'>  <input style='padding-left: 2px; padding-right: 2px;'  class='gclh_form' id='bookmarks_name[" + i + "]' type='text' size='15' value='" + getValue("settings_bookmarks_title[" + i + "]", "") + "'></td>";
//                html += "  </tr>";
//            }
//            html += " </tbody>";
//            html += "</table>";
//            html += "</div>";
//            html += "<br>";
//            html += "";
//            html += "<br>";
////--> $$030 Begin of change
////            html += "<input style='padding-left: 2px; padding-right: 2px;' class='gclh_form' type='button' value='save' id='btn_save'> <input style='padding-left: 2px; padding-right: 2px;' class='gclh_form' type='button' value='save&upload' id='btn_saveAndUpload'> <input class='gclh_form' type='button' value='close' id='btn_close2'> <div width='400px' align='right' class='gclh_small' style='float: right;'>GC little helper by <a href='http://www.amshove.net/' target='_blank'>Torsten Amshove</a></div>";
//            // Beim Aufbau der GClh Config Seite die Bezeichnung des Save Buttons (save bzw. save (F2))  
//            // über Function setValueInSaveButton versorgen. 
//            html += "&nbsp;" + "<input style='padding-left: 2px; padding-right: 2px; cursor: pointer;' class='gclh_form' type='button' value='" + setValueInSaveButton() + "' id='btn_save'> <input style='padding-left: 2px; padding-right: 2px; cursor: pointer;' class='gclh_form' type='button' value='save&upload' id='btn_saveAndUpload'> <input class='gclh_form' type='button' value='close' id='btn_close2' style='cursor: pointer;'> <div width='400px' align='right' class='gclh_small' style='float: right;'>GC little helper by <a href='http://www.amshove.net/' target='_blank'>Torsten Amshove</a></div>";
////<-- $$030 End of change
//            html += "</div>";
//            div.innerHTML = html;
//
//            document.getElementsByTagName('body')[0].appendChild(div);
//
//            $(".gclh_LinkListDelIcon").click(function () {
//                var row = this.parentNode.parentNode;
//                var tablebody = row.parentNode;
//                $(row).remove();
//                if (tablebody.children.length == 0) {
//                    $('<tr class="gclh_LinkListPlaceHolder"><td>Drop here...</td></tr>').appendTo(tablebody);
//                }
//            });
//
//            $(".gclh_LinkListElement").draggable({
//                revert: "invalid",
//                helper: "clone",
//                start: function (event, ui) {
//                    $(ui.helper).addClass("gclh_form");
//                },
//                stop: function (event, ui) {
//                    $(ui.helper).removeClass("gclh_form");
//                }
//            });
//
//            $("#gclh_LinkListTop").droppable({
//                accept: function (d) {
//                    if (!d.hasClass("gclh_LinkListInlist") && d.hasClass("gclh_LinkListElement")) {
//                        var text = d.text();
//                        if (text == "" || text == " ") {
//                            text = "Custom" + d[0].children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
//                        }
//                        if ($(this).find('tr[name="' + text + '"]').length == 0) {
//                            return true;
//                        }
//                    }
//                },
//                drop: function (event, ui) {
//                    $(this).find(".gclh_LinkListPlaceHolder").remove();
//                    var id = ui.draggable[0].id.replace("gclh_LinkListElement_", "");
//                    var text = ui.draggable.text();
//                    if (text == "" || text == " ") {
//                        text = "Custom" + ui.draggable[0].children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
//                    }
//                    var row = $("<tr class='gclh_LinkListInlist' id='gclh_LinkListTop_" + id + "' name='" + text + "'></tr>").html("<td style='padding: 4px 2px;' ><img style='height:12px;margin-right:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />" + text + '</td> <td style="width:24px;"><img class="gclh_LinkListDelIcon" style="height:22px;"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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" /></td>');
//                    row.find(".gclh_LinkListDelIcon").click(function () {
//                        var row = this.parentNode.parentNode;
//                        var tablebody = row.parentNode;
//                        $(row).remove();
//                        if (tablebody.children.length == 0) {
//                            $('<tr class="gclh_LinkListPlaceHolder"><td>Drop here...</td></tr>').appendTo(tablebody);
//                        }
//                    });
//                    $(row).appendTo(this);
//                }
//            }).sortable({
//                items: "tr:not(.gclh_LinkListPlaceHolder)"
//            });
//<-- $$058 End of delete 

//--> $$043 Begin of delete
//            $("#gclh_LinkListMap").droppable({
//                accept: function (d) {
//                    if (!d.hasClass("gclh_LinkListInlist") && d.hasClass("gclh_LinkListElement")) {
//                        var text = d.text();
//                        if (text == "" || text == " ") {
//                            text = "Custom" + d[0].children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
//                        }
//                        if ($(this).find('tr[name="' + text + '"]').length == 0) {
//                            return true;
//                        }
//                    }
//                },
//                drop: function (event, ui) {
//                    $(this).find(".gclh_LinkListPlaceHolder").remove();
//                    var id = ui.draggable[0].id.replace("gclh_LinkListElement_", "");
//                    var text = ui.draggable.text();
//                    if (text == "" || text == " ") {
//                        text = "Custom" + ui.draggable[0].children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
//                    }
//                    var row = $("<tr class='gclh_LinkListInlist' id='gclh_LinkListMap_" + id + "' name='" + text + "'></tr>").html("<td style='padding: 4px 2px;' ><img style='height:12px;margin-right:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />" + text + '</td> <td style="width:24px;"><img class="gclh_LinkListDelIcon" style="height:22px;"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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" /></td>');
//                    row.find(".gclh_LinkListDelIcon").click(function () {
//                        var row = this.parentNode.parentNode;
//                        var tablebody = row.parentNode;
//                        $(row).remove();
//                        if (tablebody.children.length == 0) {
//                            $('<tr class="gclh_LinkListPlaceHolder"><td>Drop here...</td></tr>').appendTo(tablebody);
//                        }
//                    });
//                    $(row).appendTo(this);
//                }
//            }).sortable({
//                items: "tr:not(.gclh_LinkListPlaceHolder)"
//            });
//<-- $$043 End of delete 

//--> $$058 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
            // Linklist/Bookmarks: (BEGIN) Rechte Spalte mit den für die Linklist ausgewählten Bookmarks.
            // -------------------
            var firstCust = 0;
            for (var j = 0; j < bookmarks.length; j++) {
                if (bookmarks[j].custom) {
                    firstCust = j;
                    break;
                }
            }
            html += "<div style='float:right; width:197px;margin-left:10px;' div>";
            // Überschrift, rechte Spalte:
            html += "    <p style='margin-top:5px;margin-bottom:3px;font-family: Verdana;font-size: 14px;font-style: normal;font-weight: bold;'>Linklist" + show_help("The Linklist requires \"Show Linklist on top\" or \"Show Linklist in profile\".") + "</p>";
            html += "    <table class='gclh_form' style='width:100%; margin-top: -1px;'>";
            // Ausgewählte Bookmarks für die Linklist, rechte Spalte:
            html += "        <tbody id='gclh_LinkListTop'>";
            var order = JSON.parse(getValue("settings_bookmarks_list", "[]").replace(/, (?=,)/g, ",null"));
            // Platzhalter, falls noch keine Bookmarks für die Linklist ausgewählt wurden.
            if (order.length == 0) {
                html += "        <tr style='height: 25px;' class='gclh_LinkListPlaceHolder'>";
                html += "            <td style='padding: 0px;' >Drop here...</td>";
                html += "        </tr>";
            }
            else {
                for (var i = 0; i < order.length; i++) {
                    if (typeof(order[i]) == "undefined") continue;
                    if (typeof(order[i]) == "object") continue;
                    if (typeof(bookmarks[order[i]]) == "undefined") continue;
                    // Wenn custom Bookmark.
                    if (bookmarks[order[i]].custom) {
                        var text = (typeof(bookmarks_orig_title[order[i]]) != "undefined" && bookmarks_orig_title[order[i]] != "" ? bookmarks_orig_title[order[i]] : bookmarks[order[i]]['title']);
                        var textTitle = "Custom" + (order[i] - firstCust);
                        if ( !text.match(/(\S+)/) ) text = textTitle;
                    // Wenn default Bookmark.
                    } else {
                        var text = bookmarks[order[i]]['title'];
                        var textTitle = (typeof(bookmarks_orig_title[order[i]]) != "undefined" && bookmarks_orig_title[order[i]] != "" ? bookmarks_orig_title[order[i]] : bookmarks[order[i]]['title']);
                    }
                    var textName = textTitle;
                    html += "    <tr style='height: 25px;' class='gclh_LinkListInlist' id='gclh_LinkListTop_" + order[i] + "' name='" + textName + "' title='" + textTitle + "'>";
                    html += "        <td style='padding: 0px; vertical-align: top; text-overflow: ellipsis; max-width: 166px; overflow: hidden; white-space: nowrap;'>";
                    html += "            <img style='height: 12px; margin-right: 3px; cursor: grab;' title='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />";
                    html +=              text;
                    html += "        </td>";
                    html += "        <td style='padding: 0px;'>";
                    html += "            <img style='height: 20px; margin-left: 0px; vertical-align: top; cursor: pointer;' title ='' class='gclh_LinkListDelIcon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIMbBwcDL9+/GD49uYNRMe3V68YIs5fZGDi4mJYr6kO5oMl/v7+zbACKMAJlPj+7RuYzwiz/Iah3n9mVlaGP0BBzfOXGAECiBGvq95lZ/7//uwJWOCRluFfy9YmFqasysb1v1+/YuATFQNjpdtXmRkZGZkYT2lr/pESFWWOuv8ArGOZogKDzOmrxxgZuYSV7ugr3+UVEgRLfH73nkHp2ElGBpDlrlw8H26aGPwHYUYuoQUgMYAAwnBVQGLW/BohrhhdcVGWnXfv/zgqJWfXWV91GiYP1/DYz/c/E9N/BhY2dgZmYFgyMzIx/P3/j+EvMEz//PrJcEld77dnZxsbWMNmJ+evRvxcXOzc3AzsXNwMrJwcDCysLMDA+cPw+/sPhp/fvjL8/PqVodfQ7hw4PPbevPNBXUqI6y9Qw18+IQYOfn4GBg5Ohp/AiPn1/hXD9y9fGH4ANUzc1rgN7iRHNrYfM/S02FmBTmIBO4kZ6KS/QOf8ZvgNdJLm5Ycr//18HwEODRgGAg4g1mNk41vKyCl4m5GVqxvIV0NWAxBAOOMOF2BBF6jwD3lTbKwr9BPoYYeDZ6/fObRNG1keboOxT/iNDf8+qDOzsDIwMjOBxf7/BQYrUH6SkZVjd2P1AbgNoWn5szb+/6jOzMnJwMLOxsDEzAzW8O/vXwbGn78Y8s8c3g8yHG7DIw+3/6CwZwWmWFZ2YBywQVz65xcwHn7+YPgNTMVn2Pm++a5Ywg2WYQI6AeQUZjY2BlYOdmDEsUPcy/ST4R8wtv8Bg9bw8xsuuJO+PHsGjmEuHm4G/2s3GJjYIBr+AcN/tZYGw7cvX8GxDdfw/x8wjP8BPQjE6y2tGTh5ecGS39+/Z/j5+T1YDqQGruH3v3//Wf78YQTFKvPHtwzff3yC+OHnb3BM//3zh0H76s1X/2AaDO69ZL+qIvkLmHGAbv7LwPwL4um/f/8ANf0Cp6l/f36Jo8QDE7eIxB5BtufS4mIMTEzQYP33l2HTlWv/S3/+YoLHHFpakmVkYY1jZBc4w8DOvw/INwViYWQ1AAFoK3fXKKIojJ87c2eyJgrx0QgiCOvKRoOviIqNKIggCIqiCKKgRjtJoQjxUVlsoVhY+A9YKGphp006BUmaEB+oGMgqPgj7uCab7Dzu+J0za9ZNopDChcMUw57X9/vOLJilhf70314c671450xGXdg6PdlW+zxGOCUYWAkeSToKKc+npZu30MaBwU+nDuztvnqprzY7z5wJdh06+eGBrWRhZwCjhVtGEacKi1QNAvEflpqhAZ7MtIUA3zdtix/6mQ2FG/3v5hRAh+rZ2fO1/JfRjBgCJ8PVmhwJFIAwjmpqwUQmEMlGHJGgkIT8DKlv9fqBR/du72kpcP346fI587UzRdwDrXjiaLuuJ/dJYQox1e8BpPNY7lYch3Lx2QKxcBdSobvnyN3CzcczGhwcfbM4hG8sOk4iJA3hUnjpxOALKMUFsH8HT8dpkB6B8Jju7+yhpM7JAxQLBG6e5vnLoX6kbRb4Ua4GHR1tWmMC63P4RAgDvyn+HvGa3Igdy16T7hOsJzJGkgZcQALuwQQfR4aqrRp4/vvX+dxaF+vQXromDUo8dM9HlgVPxRaAZEUsrBxddMzdyzcBzZTqQdj55OmyfC470UKRo/3iSFduldsQOA1PRHawGtdpisyHwnJgCt553BC6WDHxvm9mjZ0cL86LKSyd3R+Yt7e61uk0sSv3jTFVf2CazGBqxfLG/KQdY+Ov4np1+z99MKvYlaM0fe0w2faVK5bTEnzIFuFET0xNUalSpeFShS6r9mFAsBsdl+fL8d9PxS8BiK+a2JiiKHzve/PmxVRnaLURMdI0EW0kJLRIbCqxsbBoIrVCLCREbIifsED8kyAWFrpA2AgNiYoQxEIjUj+lSEuDJn4H1WlHO2/en/Od+5520qp2IZrczst7555z77nnfN93/3kATfzjv8hIH7fu3l/dcPvemaOV08rnlJaYJYXjZU/W8jvTPe6ljnfptqLSq1dOn1w95hTtPXIsdvba7danNXPLf7Q8IYzJcfEoLOUaYriITU0SnRZY9Vmv/uKpExtGFWDzzn01tXb2VrL1oS6pFAFyAkoAUC1D0gn+uQrwCsrKxOLOH+2PGi9UjBhg6+59FXW5/uelT5p1NBYwCN2LBkMf+DKcJLgHuNmoowkbyNYQdTLR0XT53PQ/HnJNJvOMnRMsCIIL4BJDd4CuRjDwjHf4BhvYEqQK8AhkzbABlq3deGdm6yNDrVxjDGKoiEYYk6BSNMPkgWf1TtnAFnMkYdMa31oh5QBxaAHZaKu6U/MBBcg5YYRKjYER5ZUa2FFUDTwzb+CboXgiwlCuCxDWum27GvICrN+yvXZ2dyqG1YcUKSI651XnQBQQABgNyAjPGLqygS0jLeaSj5LOtzV5fRAtTOzgTTHvKlDDBAV0FAAOcOABmgJFpXS4kjSAHtl4mstz4aMq9T6aF6Dx5h2x3s+QE0WPIBo9F+WDXN5MfUATOUBQpx45Bg8Lwv7zC6qUPAsJhyh0StbKD/D68cN+q3wyb9ujvHomqsUUkn7TpE8Zrt2IWqHaAjGaw1DtZHqZ0aD0WQuiKXO2zD9kq88aKCzVpdwfQY/43tAO/f0uVHm+CBWTSDmelbcDIvIm+rhoQPJ5/Ou5vrhcPV/oUN9UnqBSVq2UGtsmMY3V57J5czBu9vZ3Lxm8g+etLYfSru/wanBors9864LYcxnh/yRi7/0uct0pHnjGO8+12Aa2mMOamnwc//Ixk5cikPPC9o6ukP4UoUM1UBDbVYRuK63NB2rbwTtlE9pjru16dNGOLxkK12a86kPm59tkolB3SfNIRwoSKwKp1oA5VIYyqCKkIcQhED0TP82BXpr98tUH0u5vhgSACtDMiZdaYuOWR8kRrV3ovrpuaBFandSVNOUyFXwx8JwgCO/AE+tetFm00PIR4Vo3Ew/uJyfNixcWBFpIdSfDixxUaH4gWwLhu+lFm3PdiFfSQjv+SjhaQfGZA3bvyqWVM6QKoA/LB8j5p6/fxIGunvQtYVaQ88+jJn2SLBMJ5+8e9vtmzSqaIIomxMX4cTGRpTtSD13ZPn/rEg2+1ndRmHvI8cExqwo60GJch2gk6Jpd52vGXOqXJCU/TQfTLrz+G75jt9B36KGv5Cf7X2TLLwG6tbbYqIowPHPO2d1ul+1la6EtFAu0CoESQAk+qFyi0YioiS9q0MRoCQkJPJggoRqKWl2NL14i2MRLjIkmgomJEkkol+iDGLSyVKGtpVy7QMv2st3d7u45M87/z8zZpekSCRcTm0zPOXtO9/z/zH/5vm96019ws39umAObmrc/fmEgtnJwZLQ2NhyvHs+mi2Kj8RDcC5UEY0Ue33ioLBi9rbTkbFVl6MB7rdu++88ceKX17bo/Tpxs7e6/sLxt3qzKxVUVXkuQ+/RQTIRWktiJpKSFKclpTRHc0K4sgc3NYj/xloWIXeQnHRcGM+uO9w3cUVN1aNHc2c1vNL986qY5sGX7mwsOHonsfKmqfMkDtVV+58xpkor2SzaOKU5lQ5cJVPB73Pfp5iFOi2umE3NmHdl3Npp6Nxr7fcXdC9eHt23tvCEOAE490HHss7aFDbXVPSdMOz56hcFw5IBA4IjX0GColqPIxDbMADZzeDFD4ECZbrfSIStYQvrr5zrrIt1nVy5ufF4rYdfsAKD3Qx2d+1tur75rZmeHJZqKNNwwpdHAyUV7MPEzqnAxxXbBNU+cYD/8AoMZOqBauLhw8Fz0MkfBAVGgqegSp+YvsltOR39bvnjBqsk0loIOAKeJnLu4d8fw+VIzMWpQNdNgPFetB9kyQDF0Rt43cTVg/vPakubs7iIIPMiYMlo45MiVIEqeQ7yoGAc25UCQrS+tGVk4Y9pD+RpxQQc2t7Te13Vx6PsP+iJBMbNUGw70Bo6mRsYQ76A8wmwbFopI+JkKLzcNXOlK+qGRHOhAsquLZGeSJqE25EhHwAFNncQZ3zhzQfzOaeWPvtPS/FNBZlM3p77k1MDIN+Heo4GJxiP2BycAnoPiApwBBSuvrDBAUsRnFoooFmpMyCPUEa/deyY+D39HFe+A75NKjnwPUgc9aWIawn2RANgGNhakx8+8uGHnjPa9RQGLmpPNPIH4FwzJgnNAMnANYWTKZw0kRoab3LIoac2E5JIVQwXyAWAUhczAxwwBwmxhkcCuYDTRUBq+ISg+ur8r4mto2vCRuFw7qQORru7G1ZlkERMfcyZCwoB4NfDIGHAbjtfAYyAJicnIc+0/S0fBeFhQtN/AxdUIjSuQD/ATYhxQKEdQapMvHlyFQjEyjSwksiMlRofhOSAurpDyEof5w11/Lyq4AgfaD6Zer/RaaUPKWjSPCephIofS1xaJQw5QnEOFj1XwG5yQ/H5gYA3V7mCl4rDFMjJCbIX7EZYjemY5WK/ALqxasWNb7fv2Jws6MH4pmhoLVjOfZZpYWcBYMfOQTMR0JEWFSgSzJWafWwwVRjdx0RkIKwfDCPsDkXZTpsMHjo6S4UQyC34BHA9US64N1iJvHkeBdyYyNgMbCzrAWXL0+Hhm7N4p/nIuIzMnpmgQzbX+IQ3Ys2YNMl7qhaT0YrJS5OoeXCXoDRQpniONBXEYSNG4mMjxLElHz+TtEsjClP++XAXm5K90doyz1HDBMjq7cekyT2/X7m/n1E53hQSVqKZKZgOTGJIbqoUSDPA5y01it2/QvCR2nc4lMWOSXUOMQxiBRmMzyZWwfDr6WZkHj/WcPu80zHvi5NHDRwr1AcPwBsKbSqY0NdVUlqERygmXOyknDKxMSqV1KxH0BzO3e0HzMVCOpTMuQ4I5XB2h9uvQUfsELKfygvE7+geGPhyJt7FMYquKyoKdmBq+4MdrfebTW+pmTMl3Ag00jJzR6AR1qxCWWhdakBycUDCCK5ZKFO3FXROYaSb5HXeNvnLm3+o7N/Zl2v6KpePr842/OucrDm1caifCbQ11fq+IbarDQ9V7t0q5YUNxpxeVHkJRL4QEdnNAaYcM8RDDHWGJe5i708dUaHHlTEbky7ru3tSvVmALS8bev2Y0KojrVGpnd6/mqWWv1c/2+Dxy75S6s2wiFtJgjqjmJeH05GBOGq3DSRrPFJjTlSktiPGrPb3ZH6j/MLc8TwpSfOm6+ADsUAgG/skKnrxnc1mpt3baVBTtcrjHuCLu6VXgNFehRCYKUaJsnhu4RMKXhzMHafEvAmu8MFGDuG5GJhwBeetZEZhND7N041OcBWoqyklleRnxCbyjs/bfEJpMJksGhobJ+cEY+ZqaiR8N7zGxvJ+KW58Lw7O3hBMLh2pBgBbjkfkGa5jF7dBUZnsrHMdTwTkt51I5H6KUX4ZhWtlB08z0Eiv2JzN6xK09YuzSm1O3hBOL2YV/bQgAExTDr/7VATbkvWpYahh5aJepYauRUQOETtBjoLsCREgU0mf+t7LKP9duLNGdCMBeAAAAAElFTkSuQmCC' />";
                    html += "        </td>";
                    html += "    </tr>";
                }
            }
            html += "        </tbody>";
            html += "    </table>";
            html += "</div>";

            // Linklist/Bookmarks: Die beiden linken Spalten mit den möglichen Bookmarks und den gegebenenfalls abweichenden Bezeichnungen und Seitenbuttons.
            // -------------------
            // Bookmarks nach der Bezeichnung sortieren, falls gewünscht.                          // Sort Linklist
            sortBookmarksByDescription();                                                          // Sort Linklist
            
            html += "    <table>";
            // Überschrift.
            html += "        <thead>";
            html += "            <tr>";
            html += "                <td align='center' style='padding-left: 60px;'>" + show_help("Here you can choose the links you want to use in your Linklist. Also you are able to select a custom name for the link (like PQ for Pocket Query).<br>If there is a text field, then it is a custom link. In this text field you can type any URL you want to be added to the Linklist. The checkbox behind defines, if the link should be opened in a new window.<br><br>If you have problems to drag & drop the lower links because the Linklist area is not on the screen, then use the arrow high button on your keyboard during you hold the mouseclick.") + "</td>";
            html += "                <td>" + show_help("Here you can choose the link descriptions to your links.") + "</td>";
            html += "            </tr>";
            html += "        </thead>";
            // Zwei Spalten mit den möglichen Bookmarks und den gegebenenfalls abweichenden Bezeichnungen:
            html += "        <tbody>";

            var cust = 0;
            for (var i = 0; i < bookmarks.length; i++) {
                var num = bookmarks[i]['number'];                                                  // Sort Linklist
                html += "        <tr>";
                // Erste Spalte mit den möglichen Bookmarks:
                html += "            <td style='padding: 0px 2px 1px 2px; width: 201px; z-index: 1004;' align='left' class='gclh_LinkListElement' id='gclh_LinkListElement_" + num + "' >"; // Sort Linklist
                html += "                <img style='height:12px;margin-right:3px; cursor: grab;' title='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAtCAQAAACKL8qfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFESURBVHja7JbBR0RRFMZ/975piFZDiogYHi0eebxVDKVFJGJ280Srp/6A/oOIaVlDpX0UbYdhaFPEWw0xGiI9ZjXE8BieWkxp0+beU7R43+auvp9zr3O+e1QIUKGKTxETZcTc0AIVQoNdbHVG5HhbHGEvnyfHO2EBiSY0JWRyNV0hoqepkwkAGQeamB2GloAhEfcqBJhlDZ9JI/uImCb9cV8Ipd7FCE2O+F+IX+iLwue5zKKxN6VNMkZMc8mKVQEp+xyrEK6oCu6x6njznIueYkYLYw/Kmmd5ar1wLULUNRDRtLSn7NEuAAPWqRBQNk6tFkmeWjniz1MLXKYMvQn9b8QmDeYsCnhgm64KIeAOx3bUWXI8OMW1fogSrxoMJ/SHXQthbiUaOBRsWwkXGrilxpsV4JENBl+tVSQw/M9GxHQAPgYA/ixGIgPoxNsAAAAASUVORK5CYII=' />";
                // Wenn custom Bookmark.
                if (typeof(bookmarks[i]['custom']) != "undefined" && bookmarks[i]['custom'] == true) {
                    html += "            <input style='padding-left: 2px; padding-right: 2px;' class='gclh_form' type='text' id='settings_custom_bookmark[" + cust + "]' value='" + bookmarks[i]['href'] + "' size='15'> ";
                    html += "            <input type='checkbox' style='margin-left: 1px;' title='Open in new window' " + (bookmarks[i]['target'] == "_blank" ? "checked='checked'" : "" ) + " id='settings_custom_bookmark_target[" + cust + "]'>";
                    cust++;
                // Wenn default Bookmark.
                } else {
                    html += "            <a class='gclh_ref' ";
                    for (attr in bookmarks[i]) {
                        if (attr != "title") {
                            html +=      attr + "='" + bookmarks[i][attr] + "' ";
                        }
                    }
                    var outTitle = (typeof(bookmarks_orig_title[num]) != "undefined" && bookmarks_orig_title[num] != "" ? bookmarks_orig_title[num] : bookmarks[i]['title']);  // Sort Linklist
                    html += "            >" + outTitle + "</a>";                                   // Sort Linklist
                    if ( num >= 49 && num <= 65 ) {
                        html +=          newParameterLL;
                    }
                }
                html += "            </td>";
                // Zweite Spalte mit gegebenenfalls abweichenden Bezeichnungen:
                html += "            <td align='left' style='padding: 0px 2px 1px 2px;'>";
                html += "                <input style='padding-left: 2px; padding-right: 2px;' class='gclh_form' id='bookmarks_name[" + num + "]' type='text' size='15' value='" + getValue("settings_bookmarks_title[" + num + "]", "") + "'>"; // Sort Linklist
                if ( num >= 49 && num <= 65 ) {
                    html +=              newParameterLLVersionSetzen(11.7);
                }
                html += "            </td>";
                html += "        </tr>";
            }
            html += "        </tbody>";
            html += "    </table>";
            html += "</div>";

            html += "<br>";
            html += "";
            html += "<br>";
            // Beim Aufbau der GClh Config Seite die Bezeichnung des Save Buttons (save bzw. save (F2))  
            // über Function setValueInSaveButton versorgen. 
            html += "&nbsp;" + "<input style='padding-left: 2px; padding-right: 2px; cursor: pointer;' class='gclh_form' type='button' value='" + setValueInSaveButton() + "' id='btn_save'> <input style='padding-left: 2px; padding-right: 2px; cursor: pointer;' class='gclh_form' type='button' value='save&upload' id='btn_saveAndUpload'> <input class='gclh_form' type='button' value='close' id='btn_close2' style='cursor: pointer;'> <div width='400px' align='right' class='gclh_small' style='float: right;'>GC little helper by <a href='http://www.amshove.net/' target='_blank'>Torsten Amshove</a></div>";
            html += "</div>";

            // Linklist/Bookmarks: Linklist/Bookmarks und Events aufbauen. Anfangsbestand der Linklist bei den Bookmarks kennzeichnen.
            // -------------------
            // Linklist/Bookmarks aufbauen.
            div.innerHTML = html;
            document.getElementsByTagName('body')[0].appendChild(div);

            // Bookmarks.
            for (var i = 0; i < bookmarks.length; i++) {
                // Input Events in Bookmarks aufbauen, Spalte 2, abweichende Bezeichnungen.
                document.getElementById('bookmarks_name[' + i + ']').addEventListener("input", updateByInputDescription, false);
                // Anfangsbestand der Linklist bei den Bookmarks kennzeichnen.
                // Prüfen, ob Bookmark in der Linklist vorhanden ist. Cursor und Opacity entsprechend setzen.
                if ( document.getElementById('gclh_LinkListTop_' + i) ) {
                    flagBmInLl( document.getElementById('gclh_LinkListElement_' + i), false, "not-allowed", "0.4", "Already available in Linklist" );
                }
            }

            // Linklist.
            var elem = document.getElementsByClassName('gclh_LinkListInlist');
            for (var i = 0; i < elem.length; i++) {
                // Mousedown und Mouseup Events in Linklist aufbauen, rechte Spalte, Move Icon und Bezeichnung. 
                // (Delete Icon wird hier nicht berücksichtigt.)
                elem[i].children[0].children[0].addEventListener("mousedown", function(event){changeAttrMouse(event, this, "move")}, false); // Move Icon
                elem[i].children[0].addEventListener("mousedown", function(event){changeAttrMouse(event, this, "desc")}, false);             // Description
                elem[i].children[0].children[0].addEventListener("mouseup", function(event){changeAttrMouse(event, this, "move")}, false);   // Move Icon
                elem[i].children[0].addEventListener("mouseup", function(event){changeAttrMouse(event, this, "desc")}, false);               // Description
            }

            // Linklist/Bookmarks: Delete Icon in rechter Spalte.
            // -------------------
            $(".gclh_LinkListDelIcon").click(function () {
                var row = this.parentNode.parentNode;
                var tablebody = row.parentNode;
                $(row).remove();
                if (tablebody.children.length == 0) {
                    $('<tr class="gclh_LinkListPlaceHolder"><td>Drop here...</td></tr>').appendTo(tablebody);
                }
                // Entsprechende Bookmark als nicht vorhanden in der Linklist kennzeichnen.
                var index = this.parentNode.parentNode.id.replace("gclh_LinkListTop_", "");
                flagBmInLl( document.getElementById("gclh_LinkListElement_" + index), false, "grab", "1", "" );  
            });

            // Linklist/Bookmarks: Drag and Drop von linker Spalte in rechte Spalte und sortieren in rechter Spalte.
            // -------------------
            $(".gclh_LinkListElement").draggable({
                revert: "invalid",
                helper: "clone",
                start: function (event, ui) {
                    $(ui.helper).addClass("gclh_form");
                },
                stop: function (event, ui) {
                    $(ui.helper).removeClass("gclh_form");
                }
            });

            $("#gclh_LinkListTop").droppable({
                accept: function (d) {
                    if (!d.hasClass("gclh_LinkListInlist") && d.hasClass("gclh_LinkListElement")) {
                        // Wenn dragging stattfindet und nicht schon wenn click stattgefunden hat, Cursor und Opacity passend setzen.
                        if ( $('.gclh_LinkListElement.ui-draggable-dragging').length != 0 ) {
                            var index = d[0].id.replace("gclh_LinkListElement_", "");
                            if ( document.getElementById("gclh_LinkListTop_" + index) ) {
                                flagBmInLl( d[0].parentNode.children[2], true, "not-allowed", "1", "" ); 
                            } else {
                                flagBmInLl( d[0].parentNode.children[2], true, "grabbing", "1", "" );  
                                return true;
                            }
                        }
                    }
                },
                drop: function (event, ui) {
                    // Gegebenenfalls Platzhalter entfernen.
                    $(this).find(".gclh_LinkListPlaceHolder").remove();
                    // Index ermitteln.
                    var index = ui.draggable[0].id.replace("gclh_LinkListElement_", "");
                    // Wenn custom Bookmark.
                    if ( ui.draggable[0].children[1].id.match("custom") ) {
                        var textTitle = "Custom" + ui.draggable[0].children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
                    // Wenn default Bookmark.
                    } else {
                        var textTitle = ui.draggable[0].children[1].innerHTML;
                    }
                    // Abweichende Bezeichnung der Bookmark ermitteln. Falls leer, dann default Bezeichnung nehmen.
                    var text = document.getElementById("bookmarks_name["+index+"]").value;
                    if ( !text.match(/(\S+)/) ) text = textTitle;
                    var textName = textTitle;
                    // Bookmark in Linklist aufbauen.
                    var htmlRight = "";
                    htmlRight += "   <td style='padding: 0px; vertical-align: top; text-overflow: ellipsis; max-width: 166px; overflow: hidden; white-space: nowrap;'>";
                    htmlRight += "       <img style='height: 12px; margin-right: 3px; cursor: grab;' title ='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAQAAACo/wdSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA82lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjardA/SgNBHMXx70TULloE67mAgmu15eQPi2ARYopsqkxmBw1hd4fZn3/2Bh7B43iDFIIXUVJbqARLwU/1eM2DB+rZDPujzjGUlcRsYvJZPteHGw7YAwDrmmDG4yuAqq48vynYvqEAXk/NsD/ib/ZdiAK8AEnhGwd8AKsHCQJqAfSW6yCgBOitp5MBqCegK/5RAAZ1aOPq5lb0eZqm2hT10uvrthFfNvqycnUMdbTiC+B7A+Aoi7bVmS1Lq5OzhH83y+f6K71PUYA62ey6HXcX73/+7FzAJ0sbODDOTdGSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEsSURBVHjapNKrS4NhFAbw376NwUAQ1rwgiIJgcrjo/gLFNIs3lrSYlgxLgphsgrgiODStCA4Ei0EM8olNEARBsAriYEkw7OK34SX4hBPO87znOee8J7asCzNe3UcTQRdddCm0+L2g36ldcSnHDqR6BVNC8x3xmmvjUUE70aAVOw8CKYetktv2QEm5Y5kMFBTwZk7JGBi2blUDRfmmxa2MGgbBACqyHts9lOU86cW9jCoJFfu+R92CdKDuN7wG/sC/BfGEgqTyD/Smp0DKgaOvz+kg7cyOeNNiRWgC77TitNBss4eaG0wK5d2CO2uujeLCRWyZpF0b4MUQno2ALVs+Yq2TyzvUF12QJefRMauykVu8kWnS0T08yKqAPTnP7XQiUrZh1ZW6k+i0nwMAV0JH/Qo6+gQAAAAASUVORK5CYII=' />"; 
                    htmlRight +=         text;
                    htmlRight += "   </td>";
                    htmlRight += "   <td style='padding: 0px;'>";
                    htmlRight += "       <img class='gclh_LinkListDelIcon' style='height: 20px; margin-left: 0px; vertical-align: top; cursor: pointer;' title ='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADZBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cDovL2Jsb2cuYWRkaWN0ZWR0b2NvZmZlZS5kZSIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0iIj4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+wqkgICAgICAgICAgICYjeEE7IDIwMDkgYnkgT2xpdmVyIFR3YXJkb3dza2k8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5PbGl2ZXIgVHdhcmRvd3NraTwvcmRmOmxpPgogICAgPC9yZGY6U2VxPgogICA8L2RjOmNyZWF0b3I+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckV4dGFkcj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ2l0eT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT0iIgogICAgSXB0YzR4bXBDb3JlOkNpVGVsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSIiCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSIiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgiL5zQAABAwSURBVHjaYvz//z8DNsACYzz18fzPyMbK8P/XbwbpLdsZGUE6QIJcIiIM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' />";
                    htmlRight += "   </td>";
                    var row = $("<tr style='height: 25px;' class='gclh_LinkListInlist' id='gclh_LinkListTop_" + index + "' name='" + textName + "' title='" + textTitle + "'></tr>").html(htmlRight);
                    // Entsprechende Bookmark als vorhanden in der Linklist kennzeichnen.
                    flagBmInLl( document.getElementById("gclh_LinkListElement_" + index), false, "not-allowed", "0.4", "Already available in Linklist" );  
                    // Click Event für Delete Icon aufbauen.
                    row.find(".gclh_LinkListDelIcon").click(function () {
                        var row = this.parentNode.parentNode;
                        var tablebody = row.parentNode;
                        $(row).remove();
                        if (tablebody.children.length == 0) {
                            $('<tr class="gclh_LinkListPlaceHolder"><td>Drop here...</td></tr>').appendTo(tablebody);
                        }
                    });
                    $(row).appendTo(this);
                }
            }).sortable({
                items: "tr:not(.gclh_LinkListPlaceHolder)"
            });
            // Linklist/Bookmarks: (END)
            // -------------------
//<-- $$058 End of insert

            //Colorpicker
            if (typeof opera == "object" || typeof(chrome) != "undefined") {
                $('.gclh_form.color:not(.withPicker)').each(function (i, e) {
                    var homezonepic = new jscolor.color(e, {
                        required: true,
                        adjust: true,
                        hash: true,
                        caps: true,
                        pickerMode: 'HSV',
                        pickerPosition: 'right'
                    });
                    $(e).addClass("withPicker");
                });
            }
            else {
                var code = GM_getResourceText("jscolor");
                code += 'new jscolor.init();'
                var script = document.createElement("script");
                script.innerHTML = code;
                document.getElementsByTagName("body")[0].appendChild(script);
            }

            //Multi-Homezone
            function gclh_init_multi_homecoord_remove_listener($el) {
                $el.find('.remove').click(function () {
                    $(this).closest('.multi_homezone_element').remove()
                });
            }

            //initialize remove listener for present elements
            gclh_init_multi_homecoord_remove_listener($('.multi_homezone_settings'));
            //initialize add listener for multi homecoord entries
            $('.multi_homezone_settings .addentry').click(function () {
                var $newEl = $(multi_hz_el);
                $('.multi_homezone_settings .wrapper').append($newEl);
                //initialize remove listener for new element
                gclh_init_multi_homecoord_remove_listener($newEl);
                //reinit jscolor
                if (typeof opera == "object" || typeof(chrome) != "undefined") {
                    $('.gclh_form.color:not(.withPicker)').each(function (i, e) {
                        var homezonepic = new jscolor.color(e, {
                            required: true,
                            adjust: true,
                            hash: true,
                            caps: true,
                            pickerMode: 'HSV',
                            pickerPosition: 'right'
                        });
                        $(e).addClass("withPicker");
                    });
                }
                else {
                    var script = document.createElement("script");
                    script.innerHTML = 'new jscolor.init();';
                    document.getElementsByTagName("body")[0].appendChild(script);
                }
            });

            function gclh_show_linklist() {
                var linklist = document.getElementById('gclh_settings_linklist');
                var lnk = document.getElementById('gclh_show_linklist_btn');
//--> $$040 Begin of insert
                // Die Links zur Linklist hin sollen sie auch anzeigen, also nicht einklappen.
                if ( this.id == 'gclh_linklist_link_1' || this.id == 'gclh_linklist_link_2' ) {
                    if ( linklist.style.display == '' ) return;
                }
//<-- $$040 End of insert
                if (linklist.style.display == 'none') {
                    linklist.style.display = '';
                    lnk.innerHTML = "hide";
                } else {
                    linklist.style.display = 'none';
                    lnk.innerHTML = "show";
                }
            }

            document.getElementById('gclh_show_linklist_btn').addEventListener("click", gclh_show_linklist, false);
            document.getElementById('gclh_linklist_link_1').addEventListener("click", gclh_show_linklist, false);
            document.getElementById('gclh_linklist_link_2').addEventListener("click", gclh_show_linklist, false);

            // Give the buttons an function
            document.getElementById('btn_close2').addEventListener("click", btnClose, false);
            document.getElementById('btn_save').addEventListener("click", function () {
                btnSave("normal");
            }, false);
            document.getElementById('btn_saveAndUpload').addEventListener("click", function () {
                btnSave("upload");
            }, false);
//--> $$002 Begin of insert
            document.getElementById('settings_bookmarks_on_top').addEventListener("click", handleRadioTopMenu, false);
            document.getElementById('settings_bookmarks_top_menu').addEventListener("click", handleRadioTopMenu, false);
            document.getElementById('settings_bookmarks_top_menu_h').addEventListener("click", handleRadioTopMenu, false);
            handleRadioTopMenu( true );
//<-- $$002 End of insert
            
//--> $$040 Begin of insert
            document.getElementById('settings_load_logs_with_gclh').addEventListener("click", alert_settings_load_logs_with_gclh, false);
            document.getElementById('restore_settings_lines_color_zebra').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_lines_color_user').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_lines_color_owner').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_lines_color_reviewer').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_lines_color_vip').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_font_color_menu_submenu').addEventListener("click", restoreField, false);
            document.getElementById('restore_settings_font_color_menu_submenuX0').addEventListener("click", restoreField, false);
//<-- $$040 End of insert
//--> $$049 Begin of insert
            document.getElementById('restore_settings_count_own_matrix_show_color_next').addEventListener("click", restoreField, false);
//<-- $$049 End of insert
            
//--> $$024 Begin of insert
            // Events setzen für Parameter, die im GClh Config mehrfach ausgegeben wurden, weil sie zu mehreren Themen gehören. Es handelt sich hier 
            // um den Parameter selbst. In der Function werden die Events für den Parameter selbst (beispielsweise "settings_show_mail_in_viplist") und dessen 
            // "Clone" gesetzt, die hinten mit einem "X" und eine Nummerierung von 0 bis 9 enden können (beispielsweise "settings_show_mail_in_viplistX0").
            setEventsForDoubleParameters( "settings_show_mail_in_viplist", "click" );
            setEventsForDoubleParameters( "settings_show_mail_in_allmyvips", "click" );
            setEventsForDoubleParameters( "settings_log_inline_tb", "click" );
            setEventsForDoubleParameters( "settings_font_color_menu_submenu", "input" );
            setEventsForDoubleParameters( "settings_font_color_menu_submenu", "change" );
            setEventsForDoubleParameters( "settings_font_size_menu", "input" );
            setEventsForDoubleParameters( "settings_distance_menu", "input" );
            setEventsForDoubleParameters( "settings_font_size_submenu", "input" );
            setEventsForDoubleParameters( "settings_distance_submenu", "input" );
//<-- $$024 End of insert
//--> $$048 Begin of insert
            setEventsForDoubleParameters( "settings_show_log_it", "click" );
            setEventsForDoubleParameters( "settings_logit_for_basic_in_pmo", "click" );
//<-- $$048 End of insert
//--> $$050 Begin of insert
            setEventsForDoubleParameters( "settings_show_thumbnails", "click" );
            setEventsForDoubleParameters( "settings_hover_image_max_size", "input" );
            setEventsForDoubleParameters( "settings_imgcaption_on_top", "click" );
//<-- $$050 End of insert
//--> $$056 Begin of insert
            setEventsForDoubleParameters( "settings_show_big_gallery", "click" );
//<-- $$056 End of insert 

//--> $$040 Begin of insert
            // Events setzen für Parameter, die im GClh Config eine Abhängigkeit derart auslösen, dass andere Parameter aktiviert bzw. deaktiviert 
            // werden müssen. Beispielsweise können Mail Icons in der VIP List (Parameter "settings_show_mail_in_viplist") nur dann aufgebaut werden,
            // wenn Mail Icons überhaupt erzeugt werden sollen (Parameter "settings_show_mail"). 
            // Die angedachten "Clone" (siehe oben) müssen hier auch berücksichtigt werden.
            setEventsForDependentParameters( "settings_change_header_layout", "settings_show_smaller_gc_link" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_show_smaller_area_top_right" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_gc_tour_is_working" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_font_color_menu_submenu" );
            setEventsForDependentParameters( "settings_change_header_layout", "restore_settings_font_color_menu_submenu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_bookmarks_top_menu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_bookmarks_top_menu_h" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_menu_float_right" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_font_size_menu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_distance_menu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_font_size_submenu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_distance_submenu" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_menu_number_of_lines" );
            setEventsForDependentParameters( "settings_change_header_layout", "settings_menu_show_separator" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_bookmarks_top_menu_h" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_bookmarks_search" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_bookmarks_search_default" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_menu_float_right" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_menu_number_of_lines" );
            setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_menu_show_separator" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_mail_in_viplist" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_cache_listings_in_zebra" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_cache_listings_color_user" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_cache_listings_color_owner" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_cache_listings_color_reviewer" );
            setEventsForDependentParameters( "settings_load_logs_with_gclh", "settings_show_cache_listings_color_vip" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_cache_listings_color_vip" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_tb_listings_color_vip" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_owner_vip_list" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_long_vip" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_vip_show_nofound" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_mail_in_viplist" );
            setEventsForDependentParameters( "settings_show_vip_list", "settings_show_mail_in_allmyvips" );
            setEventsForDependentParameters( "settings_log_inline", "settings_log_inline_tb", false );
            setEventsForDependentParameters( "settings_log_inline_pmo4basic", "settings_log_inline_tb", false );
            setEventsForDependentParameters( "settings_show_mail", "settings_show_mail_coordslink" );
            setEventsForDependentParameters( "settings_show_mail", "settings_show_mail_in_viplist" );
            setEventsForDependentParameters( "settings_show_mail", "settings_show_mail_in_allmyvips" );
            setEventsForDependentParameters( "settings_show_message", "settings_show_message_coordslink" );
            setEventsForDependentParameters( "settings_show_thumbnails", "settings_hover_image_max_size" );
            setEventsForDependentParameters( "settings_show_thumbnails", "settings_imgcaption_on_top" );
//--> $$050 Begin of insert
            setEventsForDependentParameters( "settings_show_thumbnailsX0", "settings_hover_image_max_size" );
            setEventsForDependentParameters( "settings_show_thumbnailsX0", "settings_imgcaption_on_top" );
//<-- $$050 End of insert
//--> $$045 Begin of insert
            setEventsForDependentParameters( "settings_map_overview_build", "settings_map_overview_zoom" );
//<-- $$045 End of insert
//--> $$049 Begin of insert
            setEventsForDependentParameters( "settings_count_own_matrix_show_next", "settings_count_own_matrix_show_count_next" );
            setEventsForDependentParameters( "settings_count_own_matrix_show_next", "settings_count_own_matrix_show_color_next" );
            setEventsForDependentParameters( "settings_count_own_matrix_show_next", "restore_settings_count_own_matrix_show_color_next" );
            setEventsForDependentParameters( "settings_count_own_matrix_show_next", "settings_count_own_matrix_links_radius" );
            setEventsForDependentParameters( "settings_count_own_matrix_show_next", "settings_count_own_matrix_links" );
//<-- $$049 End of insert
//--> $$049 Begin of insert
            setEventsForDependentParameters( "settings_add_link_gc_map_on_google_maps", "settings_switch_to_gc_map_in_same_tab" );
            setEventsForDependentParameters( "settings_add_link_google_maps_on_gc_map", "settings_switch_to_google_maps_in_same_tab" );
//<-- $$049 End of insert
            // Abhängigkeiten der Linklist Parameter.            
            for (var i = 0; i < 100; i++) {
                // 2. Spalte: Links für die Custom Bookmarks.
                if ( document.getElementById("gclh_LinkListElement_" + i)) {
                    setEventsForDependentParameters( "settings_bookmarks_on_top", "gclh_LinkListElement_" + i, false );
                    setEventsForDependentParameters( "settings_bookmarks_show", "gclh_LinkListElement_" + i, false );
                }
                if ( document.getElementById("settings_custom_bookmark[" + i + "]")) {
                    setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_custom_bookmark[" + i + "]", false );
                    setEventsForDependentParameters( "settings_bookmarks_show", "settings_custom_bookmark[" + i + "]", false );
                }
                // 3. Spalte: Target für die Links für die Custom Bookmarks.
                if ( document.getElementById("settings_custom_bookmark_target[" + i + "]")) {
                    setEventsForDependentParameters( "settings_bookmarks_on_top", "settings_custom_bookmark_target[" + i + "]", false );
                    setEventsForDependentParameters( "settings_bookmarks_show", "settings_custom_bookmark_target[" + i + "]", false );
                }
                // 4. Spalte: Bezeichnungen.
                if ( document.getElementById("bookmarks_name[" + i + "]")) {
                    setEventsForDependentParameters( "settings_bookmarks_on_top", "bookmarks_name[" + i + "]", false );
                    setEventsForDependentParameters( "settings_bookmarks_show", "bookmarks_name[" + i + "]", false );
                } else {
                    break;
                }
            }
            // 5. Spalte: Linklist.
            setEventsForDependentParameters( "settings_bookmarks_on_top", "gclh_LinkListTop", false );
            setEventsForDependentParameters( "settings_bookmarks_show", "gclh_LinkListTop", false );
            
            // Anfangsbesetzung herstellen bei den Abhängigkeiten.
            setStartForDependentParameters();
//<-- $$040 End of insert

//--> $$030 Begin of insert
            // Die Checkbox settings_f2_save_gclh, die regelt, ob ein Save aus der GClh Config Seite per 
            // F2 Taste durchgeführt werden darf, mit Event versehen, um beim Anwählen der Checkbox die 
            // Bezeichnung im Save Button dynamisch anzupassen.
            document.getElementById('settings_f2_save_gclh_config').addEventListener("click", setValueInSaveButton, false);
//<-- $$030 End of insert
        }

//--> $$038 Begin of insert
        // Fokusierung auf Verarbeitung, damit Menüs einklappen. 
        document.getElementById("settings_overlay").click();
//<-- $$038 End of insert

//--> $$028 Begin of insert
        // Bei Taste F2 ein Save im GClh Config durchführen wie per "save" Button:
        // - Add Event dafür, wenn man sich im GClh Config befindet.
        if ( check_config_page() ) {
            window.addEventListener('keydown', keydown, true);
        }
        // - Event handling dafür.
        //   Das hinzugefügte Event wird nicht unbedingt ausgeführt, deshalb muss sichergestellt werden, dass man sich bei einem F2 immer noch im 
        //   GClh Config befindet, sonst würde hierfür ein Save durchgeführt, obwohl die F2 Taste irgendwo anders betätigt wurde!  
        function keydown(e) {
            if ( check_config_page() ) {
                if ( document.getElementById("settings_f2_save_gclh_config").checked ) {
                    if (e.keyCode == 113) {
                        document.getElementById("btn_save").click();
                    }
                }
            }
        }
//<-- $$028 End of insert

        // Save Button
        function btnSave(type) {
//--> $$020 Begin of insert
            // Scrolle zum Anfang der Seite und blende GClh Config aus.
            window.scroll(0, 0);
            $("#settings_overlay").fadeOut(400);    
//<-- $$020 End of insert
//--> $$038 Begin of insert
            document.location.href = clearUrlAppendix( document.location.href, false );
//<-- $$038 End of insert
//--> $$035 Begin of insert
            if ( document.getElementById("settings_show_save_message").checked ) {
                showSaveForm();
            }
//<-- $$035 End of insert
            var settings = {};

            function setValue(key, value) {
                settings[key] = value;
            }

            var value = document.getElementById("settings_home_lat_lng").value;
            var latlng = toDec(value);
            if (latlng) {
                if (getValue("home_lat", 0) != parseInt(latlng[0] * 10000000)) setValue("home_lat", parseInt(latlng[0] * 10000000)); // * 10000000 because GM don't know float
                if (getValue("home_lng", 0) != parseInt(latlng[1] * 10000000)) setValue("home_lng", parseInt(latlng[1] * 10000000));
            }
            setValue("settings_bookmarks_search_default", document.getElementById('settings_bookmarks_search_default').value);
            setValue("settings_show_all_logs_count", document.getElementById('settings_show_all_logs_count').value);
            //Homezone
            setValue("settings_homezone_radius", document.getElementById('settings_homezone_radius').value);
            setValue("settings_homezone_color", document.getElementById('settings_homezone_color').value);
            if (document.getElementById('settings_homezone_opacity').value <= 100 && document.getElementById('settings_homezone_opacity').value >= 0) setValue("settings_homezone_opacity", document.getElementById('settings_homezone_opacity').value);
            //Multi-Homezone

            var settings_multi_homezone = {};
            var $hzelements = $('.multi_homezone_element');
            for (var i = 0; i < $hzelements.length; i++) {
                var $curEl = $hzelements.eq(i);
                settings_multi_homezone[i] = {};
                var latlng = toDec($curEl.find('.coords:eq(0)').val());
                settings_multi_homezone[i].lat = parseInt(latlng[0] * 10000000);// * 10000000 because GM don't know float
                settings_multi_homezone[i].lng = parseInt(latlng[1] * 10000000);
                settings_multi_homezone[i].radius = $curEl.find('.radius:eq(0)').val();
                settings_multi_homezone[i].color = $curEl.find('.color:eq(0)').val();
                settings_multi_homezone[i].opacity = $curEl.find('.opacity:eq(0)').val();
            }
            setValue("settings_multi_homezone", JSON.stringify(settings_multi_homezone));

//    setValue("map_width",document.getElementById('map_width').value);
            setValue("settings_new_width", document.getElementById('settings_new_width').value);
            setValue("settings_date_format", document.getElementById('settings_date_format').value);
            setValue("settings_default_logtype", document.getElementById('settings_default_logtype').value);
            setValue("settings_default_logtype_event", document.getElementById('settings_default_logtype_event').value);
            setValue("settings_default_logtype_owner", document.getElementById('settings_default_logtype_owner').value);
            setValue("settings_default_tb_logtype", document.getElementById('settings_default_tb_logtype').value);
            setValue("settings_mail_signature", document.getElementById('settings_mail_signature').value.replace(/‌/g, "")); // Fix: Entfernt das Steuerzeichen
            setValue("settings_log_signature", document.getElementById('settings_log_signature').value.replace(/‌/g, ""));
            setValue("settings_tb_signature", document.getElementById('settings_tb_signature').value.replace(/‌/g, ""));
            setValue("settings_map_default_layer", document.getElementById('settings_map_default_layer').value);
            setValue("settings_hover_image_max_size", document.getElementById('settings_hover_image_max_size').value);
//--> $$023 Begin of change - Disable Spoiler String
//            setValue("settings_spoiler_strings", document.getElementById('settings_spoiler_strings').value);
//<-- $$023 End of change
//--> $$002 Begin of insert
            setValue("settings_font_size_menu", document.getElementById('settings_font_size_menu').value);
            setValue("settings_font_size_submenu", document.getElementById('settings_font_size_submenu').value);
            setValue("settings_distance_menu", document.getElementById('settings_distance_menu').value);
            setValue("settings_distance_submenu", document.getElementById('settings_distance_submenu').value);
            setValue("settings_font_color_menu_submenu", document.getElementById('settings_font_color_menu_submenu').value);
            setValue("settings_menu_number_of_lines", document.getElementById('settings_menu_number_of_lines').value);
//<-- $$002 End of insert
//--> $$040 Begin of insert
            setValue("settings_lines_color_zebra", document.getElementById('settings_lines_color_zebra').value);
            setValue("settings_lines_color_user", document.getElementById('settings_lines_color_user').value);
            setValue("settings_lines_color_owner", document.getElementById('settings_lines_color_owner').value);
            setValue("settings_lines_color_reviewer", document.getElementById('settings_lines_color_reviewer').value);
            setValue("settings_lines_color_vip", document.getElementById('settings_lines_color_vip').value);
//<-- $$040 End of insert
//--> $$045 Begin of insert
            setValue("settings_map_overview_zoom", document.getElementById('settings_map_overview_zoom').value);
//<-- $$045 End of insert
//--> $$049 Begin of insert
            setValue("settings_count_own_matrix_show_count_next", document.getElementById('settings_count_own_matrix_show_count_next').value);
            setValue("settings_count_own_matrix_show_color_next", document.getElementById('settings_count_own_matrix_show_color_next').value);
            setValue("settings_count_own_matrix_links_radius", document.getElementById('settings_count_own_matrix_links_radius').value);
            setValue("settings_count_own_matrix_links", document.getElementById('settings_count_own_matrix_links').value);
//<-- $$049 End of insert

            var new_map_layers = document.getElementById('settings_map_layers');
            var new_settings_map_layers = new Array();
            for (var i = 0; i < new_map_layers.options.length; i++) {
                if (new_map_layers.options[i].selected) new_settings_map_layers.push(new_map_layers.options[i].value);
            }
            setValue('settings_map_layers', new_settings_map_layers.join("###"));

            var checkboxes = new Array(
                'settings_submit_log_button',
                'settings_log_inline',
                'settings_log_inline_pmo4basic',
                'settings_log_inline_tb',
                'settings_bookmarks_show',
                'settings_bookmarks_on_top',
				'settings_change_header_layout',
                'settings_bookmarks_search',
                'settings_redirect_to_map',
                'settings_hide_facebook',
                'settings_hide_socialshare',
//--> $$055 Begin of delete
//                'settings_hideable_souvenirs',
//<-- $$055 End of delete 
//      'settings_hide_feedback',
                'settings_hide_disclaimer',
                'settings_hide_cache_notes',
                'settings_hide_empty_cache_notes',
//--> $$055 Begin of delete
//                'settings_breaks_in_cache_notes',
//<-- $$055 End of delete 
                'settings_show_all_logs',
                'settings_decrypt_hint',
                'settings_visitCount_geocheckerCom',
                'settings_show_bbcode',
                'settings_show_eventday',
//--> $$052 Begin of delete
//                'settings_show_datepicker',
//<-- $$052 End of delete 
                'settings_show_mail',
                'settings_show_mail_coordslink',
//--> $$002 Begin of insert
                'settings_gc_tour_is_working',
                'settings_show_smaller_gc_link',
                'settings_show_smaller_area_top_right',
                'settings_menu_show_separator',
                'settings_menu_float_right',
//<-- $$002 End of insert
//--> $$004 Begin of insert
                'settings_show_message',
                'settings_show_message_coordslink',
//<-- $$004 End of insert
//--> $$016 Begin of insert
                'settings_show_remove_ignoring_link',
//<-- $$016 End of insert
//--> $$040 Begin of insert
                'settings_show_common_lists_in_zebra',
                'settings_show_common_lists_color_user',
                'settings_show_cache_listings_in_zebra',
                'settings_show_cache_listings_color_user',
                'settings_show_cache_listings_color_owner',
                'settings_show_cache_listings_color_reviewer',
                'settings_show_cache_listings_color_vip',
                'settings_show_tb_listings_in_zebra',
                'settings_show_tb_listings_color_user',
                'settings_show_tb_listings_color_owner',
                'settings_show_tb_listings_color_reviewer',
                'settings_show_tb_listings_color_vip',
//<-- $$040 End of insert
//--> $$024 Begin of insert
                'settings_show_mail_in_allmyvips',
//<-- $$024 End of insert
//--> $$025 Begin of insert
                'settings_show_mail_in_viplist',
//<-- $$025 End of insert
//--> $$028 Begin of insert
                'settings_f2_save_gclh_config',
//<-- $$028 End of insert
//--> $$029 Begin of insert
                'settings_f4_call_gclh_config',
//<-- $$029 End of insert
//--> $$032 Begin of insert
                'settings_show_sums_in_bookmark_lists',
                'settings_show_sums_in_watchlist',
//<-- $$032 End of insert
//--> $$033 Begin of insert
                'settings_hide_warning_message',
//<-- $$033 End of insert
//--> $$035 Begin of insert
                'settings_show_save_message',
//<-- $$035 End of insert
//--> $$045 Begin of insert
                'settings_map_overview_build',
//<-- $$045 End of insert
//--> $$048 Begin of insert
                'settings_logit_for_basic_in_pmo',
//<-- $$048 End of insert
//--> $$049 Begin of insert
                'settings_count_own_matrix',
                'settings_count_foreign_matrix',
                'settings_count_own_matrix_show_next',
//<-- $$049 End of insert
//--> $$053 Begin of insert
                'settings_hide_left_sidebar_on_google_maps',
                'settings_add_link_gc_map_on_google_maps',
                'settings_switch_to_gc_map_in_same_tab',
                'settings_add_link_google_maps_on_gc_map',
                'settings_switch_to_google_maps_in_same_tab',
//<-- $$053 End of insert
//--> $$058 Begin of insert
                'settings_sort_default_bookmarks',                                                 // Sort Linklist
//<-- $$058 End of insert
                'settings_show_google_maps',
                'settings_show_log_it',
                'settings_show_nearestuser_profil_link',
//      'settings_dynamic_map',
                'settings_show_homezone',
                'settings_show_hillshadow',
//      'settings_old_map',
                'remove_navi_learn',
                'remove_navi_partnering',
                'remove_navi_play',
                'remove_navi_profile',
//      'remove_navi_join',
                'remove_navi_community',
                'remove_navi_videos',
//      'remove_navi_resources',
                'remove_navi_shop',
                'remove_navi_social',
                'settings_bookmarks_top_menu',
                'settings_hide_advert_link',
//--> $$055 Begin of delete
//                'settings_hide_line_breaks',
//<-- $$055 End of delete 
                'settings_hide_spoilerwarning',
                'settings_hide_top_button',
                'settings_hide_hint',
                'settings_strike_archived',
                'settings_highlight_usercoords',
                'settings_map_hide_found',
                'settings_map_hide_hidden',
                'settings_map_hide_2',
                'settings_map_hide_9',
                'settings_map_hide_5',
                'settings_map_hide_3',
                'settings_map_hide_6',
                'settings_map_hide_453',
//--> $$018 Begin of insert
                'settings_map_hide_7005',
//<-- $$018 End of insert
                'settings_map_hide_13',
                'settings_map_hide_1304',
                'settings_map_hide_4',
                'settings_map_hide_11',
                'settings_map_hide_137',
                'settings_map_hide_8',
                'settings_map_hide_1858',
//      'settings_map_add_layer',
                'settings_show_fav_percentage',
                'settings_show_vip_list',
                'settings_show_owner_vip_list',
                'settings_autovisit',
                'settings_show_thumbnails',
                'settings_imgcaption_on_top',
                'settings_hide_avatar',
                'settings_show_big_gallery',
                'settings_automatic_friend_reset',
                'settings_show_long_vip',
                'settings_load_logs_with_gclh',
                'settings_hide_map_header',
                'settings_replace_log_by_last_log',
                'settings_show_real_owner',
                'settings_hide_visits_in_profile',
                'settings_log_signature_on_fieldnotes',
                'settings_vip_show_nofound',
                'settings_use_gclh_layercontrol',
                'settings_fixed_pq_header',
                'settings_sync_autoImport',
                'settings_map_hide_sidebar'
//      'settings_hide_recentlyviewed'
            );
            for (var i = 0; i < checkboxes.length; i++) {
//--> $$027 Begin of change
//                setValue(checkboxes[i], document.getElementById(checkboxes[i]).checked);
                if ( document.getElementById(checkboxes[i]) ) {
                    setValue(checkboxes[i], document.getElementById(checkboxes[i]).checked);
                }
//<-- $$027 End of change
            }

            // Save Log-Templates
            for (var i = 0; i < anzTemplates; i++) {
                var name = document.getElementById('settings_log_template_name[' + i + ']');
                var text = document.getElementById('settings_log_template[' + i + ']');
                if (name && text) {
                    setValue('settings_log_template_name[' + i + ']', name.value);
                    setValue('settings_log_template[' + i + ']', text.value.replace(/‌/g, "")); // Fix: Entfernt das Steuerzeichen
                }
            }

            // Save Linklist/Bookmarks: Rechte Spalte.                                   // $$058 insert
            // Create the settings_bookmarks_list Array (gclh_LinkListTop) 
            var queue = $("#gclh_LinkListTop tr:not(.gclh_LinkListPlaceHolder)");
            var tmp = new Array();
            for (var i = 0; i < queue.length; i++) {
                tmp[i] = queue[i].id.replace("gclh_LinkListTop_", "");
            }
            setValue("settings_bookmarks_list", JSON.stringify(tmp));

//--> $$043 Begin of delete
//            // Create the settings_bookmarks_list_beta Array (gclh_LinkListMap)
//            var queue = $("#gclh_LinkListMap tr:not(.gclh_LinkListPlaceHolder)");
//            var tmp = new Array();
//            for (var i = 0; i < queue.length; i++) {
//                tmp[i] = queue[i].id.replace("gclh_LinkListMap_", "");
//            }
//            setValue("settings_bookmarks_list_beta", JSON.stringify(tmp));
//<-- $$043 End of delete 

            // Save Linklist/Bookmarks: Abweichende Bezeichnungen, mittlere Spalte.      // $$058 insert
            for (var i = 0; i < bookmarks.length; i++) {
                if (document.getElementById('bookmarks_name[' + i + ']') && document.getElementById('bookmarks_name[' + i + ']') != "") { // Set custom name
                    setValue("settings_bookmarks_title[" + i + "]", document.getElementById('bookmarks_name[' + i + ']').value);
                }
            }

            // Save Linklist/Bookmarks: Custom Links, URL und target, linke Spalte.      // $$058 change
            for (var i = 0; i < anzCustom; i++) {
                setValue("settings_custom_bookmark[" + i + "]", document.getElementById("settings_custom_bookmark[" + i + "]").value);
                if (document.getElementById('settings_custom_bookmark_target[' + i + ']').checked) setValue('settings_custom_bookmark_target[' + i + ']', "_blank");
                else setValue('settings_custom_bookmark_target[' + i + ']', "");
            }

            setValueSet(settings).done(function () {
                if (type === "upload") {
                    gclh_sync_DBSave().done(function () {
                        window.location.reload(false);
                    });
                }
                else {
                    window.location.reload(false);
                }
            });
//--> $$035 Begin of insert
            if ( getValue("settings_show_save_message") ) {
                document.getElementById("save_overlay_h3").innerHTML = "saved";
                if (type === "upload") $("#save_overlay").fadeOut(400);    
            }
//<-- $$035 End of insert
        }
    }

//--> $$002 Begin of insert
// Radio Buttons zur Linklist verarbeiten.
    function handleRadioTopMenu( first ) {
        if ( first == true ) {
            var time = 0;
            var timeShort = 0;
        } else {
            var time = 500;
            var timeShort = 450;
        }
        // Wenn Linklist nicht on top angezeigt werden soll, dann muss unbedingt vertikales Menu aktiv sein, falls nicht vertikales Menu setzen.
        if ( !document.getElementById("settings_bookmarks_on_top").checked && !document.getElementById("settings_bookmarks_top_menu").checked ) {
            document.getElementById("settings_bookmarks_top_menu").click();
        }
        if ( document.getElementById('settings_bookmarks_top_menu').checked ) {
            if ( document.getElementById('box_top_menu_v').style.display != "block" ) {
                $("#box_top_menu_v").animate({height: "141px"}, time);
                document.getElementById('box_top_menu_v').style.display = "block";
                setTimeout(function() {
                    $("#box_top_menu_h").animate({height: "0px"}, time);
                    setTimeout(function() {
                        document.getElementById('box_top_menu_h').style.display = "none";
                    }, timeShort);  
                }, time);  
            }
        }
        if ( document.getElementById('settings_bookmarks_top_menu_h').checked ) {
            if ( document.getElementById('box_top_menu_h').style.display != "block" ) {
                $("#box_top_menu_h").animate({height: "165px"}, time);
                document.getElementById('box_top_menu_h').style.display = "block";
                setTimeout(function() {
                    $("#box_top_menu_v").animate({height: "0px"}, time);  
                    setTimeout(function() {
                        document.getElementById('box_top_menu_v').style.display = "none";
                    }, timeShort);  
                }, time);  
            }
        }   
    }
//<-- $$002 End of insert

//--> $$024 Begin of insert
// Events setzen für Parameter, die im GClh Config mehrfach ausgegeben wurden, weil sie zu mehreren Themen gehören. Es handelt sich hier 
// um den Parameter selbst. Hier werden die Events für den Parameter selbst (beispielsweise "settings_show_mail_in_viplist") und dessen 
// "Clone" gesetzt, die hinten mit einem "X" und eine Nummerierung von 0 bis 9 enden können (beispielsweise "settings_show_mail_in_viplistX0").
    function setEventsForDoubleParameters( parameterName, event ) {
        var paId = parameterName;
        if ( document.getElementById( paId ) ) {
            document.getElementById( paId ).addEventListener(event, function () { handleEventsForDoubleParameters( this ); } , false);
            for (var i = 0; i < 10; i++) {
                var paIdX = paId + "X" + i;
                if ( document.getElementById( paIdX ) ) {
                    document.getElementById( paIdX ).addEventListener(event, function () { handleEventsForDoubleParameters( this ); } , false);
                }
            }
        }
    }

// Handling von Events zu Parametern, die im GClh Config mehrfach ausgegeben wurden, weil sie zu mehreren Themen gehören. Es kann sich hier
// um den Parameter selbst handeln (beispielsweise "settings_show_mail_in_viplist"), oder um dessen "Clone", die hinten mit einem "X" und 
// eine Nummerierung von 0 bis 9 enden können (beispielsweise "settings_show_mail_in_viplistX0"). Hier wird der Wert des eventauslösenden 
// Parameters, das kann auch ein Clon sein, an den eigentlichen Parameter und dessen Clone weitergereicht.    
    function handleEventsForDoubleParameters( parameter ) {
        var paId = parameter.id.replace(/(X[0-9]*)/, "");
        if ( document.getElementById( paId ) ) {
            if ( document.getElementById( paId ).type == "checkbox" ) {
                document.getElementById( paId ).checked = parameter.checked;
                for (var i = 0; i < 10; i++) {
                    var paIdX = paId + "X" + i;
                    if ( document.getElementById( paIdX ) ) {
                        document.getElementById( paIdX ).checked = parameter.checked;
                    }
                }
            } else if ( parameter.id.match(/_color_/) ) {
                document.getElementById( paId ).value = parameter.value;
                document.getElementById( paId ).style.backgroundColor = "#" + parameter.value;
                document.getElementById( paId ).style.color = parameter.style.color;
                for (var i = 0; i < 10; i++) {
                    var paIdX = paId + "X" + i;
                    if ( document.getElementById( paIdX ) ) {
                        document.getElementById( paIdX ).value = parameter.value;
                        document.getElementById( paIdX ).style.backgroundColor = "#" + parameter.value;
                        document.getElementById( paIdX ).style.color = parameter.style.color;
                    }
                }
            } else {
                document.getElementById( paId ).value = parameter.value;
                for (var i = 0; i < 10; i++) {
                    var paIdX = paId + "X" + i;
                    if ( document.getElementById( paIdX ) ) {
                        document.getElementById( paIdX ).value = parameter.value;
                    }
                }
            }
        }
    }
//<-- $$024 End of insert

//--> $$040 Beginn of insert
// Events setzen für Parameter, die im GClh Config eine Abhängigkeit derart auslösen, dass andere Parameter aktiviert bzw. deaktiviert 
// werden müssen. Beispielsweise können Mail Icons in der VIP List (Parameter "settings_show_mail_in_viplist") nur dann aufgebaut werden,
// wenn Mail Icons überhaupt erzeugt werden sollen (Parameter "settings_show_mail"). 
// Die angedachten "Clone" (siehe oben) müssen hier auch berücksichtigt werden.
    function setEventsForDependentParameters( parameterName, parameterNameDependent, allActivated ) {
        var paId = parameterName;
        var paIdDep = parameterNameDependent;
        var countDep = global_dependents.length;
        if ( allActivated != false ) allActivated = true;
        
        // Wenn Parameter und abhängiger Parameter existieren, dann für Parameter ein Event setzen, falls nicht schon vorhanden
        // und Parameter und abhängigen Parameter merken.
        if ( document.getElementById( paId ) && document.getElementById( paIdDep ) ) {
            var available = false;
            for (var i = 0; i < countDep; i++) {
                if ( global_dependents[i]["paId"] == paId ) {
                    available = true;
                    break;
                }
            }
            if ( available == false ) {
                document.getElementById( paId ).addEventListener("click", function () { handleEventsForDependentParameters( this ); } , false);
            }
            
            global_dependents[countDep] = new Object();
            global_dependents[countDep]["paId"] = paId;
            global_dependents[countDep]["paIdDep"] = paIdDep;
            global_dependents[countDep]["allActivated"] = allActivated;

            // Alle möglichen Clone zum abhängigen Parameter suchen.
            for (var i = 0; i < 10; i++) {
                var paIdDepX = paIdDep + "X" + i;

                // Wenn Clone zum abhängigen Parameter existiert, dann Parameter und Clone zum abhängigen Parameter merken.
                if ( document.getElementById( paIdDepX ) ) {
                    countDep++;
                    global_dependents[countDep] = new Object();
                    global_dependents[countDep]["paId"] = paId;
                    global_dependents[countDep]["paIdDep"] = paIdDepX;
                    global_dependents[countDep]["allActivated"] = allActivated;
                } else {
                    break;
                }
            }
        }
    }
// Anfangsbesetzung herstellen.    
    function setStartForDependentParameters() {
        var countDep = global_dependents.length;
        var paIdCompare = "";
        
        // Sort nach paId.
        global_dependents.sort(function(a, b){
            if(a.paId < b.paId) return -1;
            if(a.paId > b.paId) return 1;
            return 0;
        })
        var copy_global_dependents = global_dependents;

        for (var i = 0; i < countDep; i++) {
            if ( paIdCompare != copy_global_dependents[i]["paId"] ) {
                if ( document.getElementById( copy_global_dependents[i]["paId"] ) ) {     
                    var parameter = document.getElementById( copy_global_dependents[i]["paId"] );
                    handleEventsForDependentParameters( parameter );
                }
                paIdCompare = copy_global_dependents[i]["paId"];
            }
        }
    }
// Handling von Events zu Parametern, die im GClh Config eine Abhängigkeit derart auslösen, dass andere Parameter aktiviert bzw. deaktiviert 
// werden müssen. Beispielsweise können Mail Icons in der VIP List (Parameter "settings_show_mail_in_viplist") nur dann aufgebaut werden,
// wenn Mail Icons überhaupt erzeugt werden sollen (Parameter "settings_show_mail"). 
// Die angedachten "Clone" (siehe oben) müssen hier auch berücksichtigt werden.
    function handleEventsForDependentParameters( parameter ) {
        var paId = parameter.id;
        var countDep = global_dependents.length;
        var copy_global_dependents = global_dependents;

        // Wenn der Parameter existiert, dann im Array der abhängigen Parameter nachsehen, welche abhängigen Parameter es dazu gibt.
        if ( document.getElementById( paId ) ) {
            for (var i = 0; i < countDep; i++) {
                if ( global_dependents[i]["paId"] == paId ) {

                    // Wenn der abhängige Parameter existiert.
                    if ( document.getElementById( global_dependents[i]["paIdDep"] ) ) {

                        // Wenn der Parameter markiert ist, dann soll der abhängige Parameter aktiviert werden. Zuvor muß jedoch gegebenenfalls 
                        // geprüft werden, ob alle Parameter zu diesem abhängigen Parameter aktiviert werden sollen. Nur dann darf der abhängige 
                        // Parameter aktiviert werden. (Beispiel ist abhängiger Parameter "settings_show_mail_in_viplist", der von zwei 
                        // Parametern abhängig ist, nämlich "settings_show_mail" und "settings_show_vip_list".)
                        if ( parameter.checked ) {
                            if ( checkDisabledForDependentParameters( global_dependents[i]["paIdDep"] ) ) {
                                var activate = true;
                                if ( global_dependents[i]["allActivated"] ) {
                                    for (var k = 0; k < countDep; k++) {
                                        if ( copy_global_dependents[k]["paIdDep"] == global_dependents[i]["paIdDep"] &&
                                             copy_global_dependents[k]["paId"] != global_dependents[i]["paId"]          ) {
                                            if ( document.getElementById( copy_global_dependents[k]["paId"] ) &&
                                                 document.getElementById( copy_global_dependents[k]["paId"] ).checked );
                                            else {
                                                activate = false;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if ( activate ) {        
                                    disableDependentParameters( global_dependents[i]["paIdDep"], false );
                                }
                            }
                        }
                        
                        // Wenn der Parameter nicht markiert ist, dann soll der abhängige Parameter deaktiviert werden. Zuvor muß jedoch gegebenenfalls 
                        // geprüft werden, ob alle Parameter zu diesem abhängigen Parameter deaktiviert werden sollen. Nur dann darf der abhängige 
                        // Parameter deaktiviert werden. (Beispiel ist abhängiger Parameter Linklistparameter, die von zwei Parametern abhängig sind, 
                        // nämlich "settings_bookmarks_on_top" und "settings_bookmarks_show".)
                        else {
                            if ( !checkDisabledForDependentParameters( global_dependents[i]["paIdDep"] ) ) {
                                var deactivate = true;
                                if ( global_dependents[i]["allActivated"] != true ) {
                                    for (var k = 0; k < countDep; k++) {
                                        if ( copy_global_dependents[k]["paIdDep"] == global_dependents[i]["paIdDep"] &&
                                             copy_global_dependents[k]["paId"] != global_dependents[i]["paId"]          ) {
                                            if ( document.getElementById( copy_global_dependents[k]["paId"] ) &&
                                                 document.getElementById( copy_global_dependents[k]["paId"] ).checked ) {
                                                deactivate = false;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if ( deactivate ) {        
                                    disableDependentParameters( global_dependents[i]["paIdDep"], true );
                                }
                            }
                        }
                    }
                }                 
            }
        }
    }
// Prüfen, ob disabled.
    function checkDisabledForDependentParameters( id ) {
        var elem = document.getElementById( id );
        var elem$ = $("#"+id);
        if ( ( elem.disabled )                                                             ||
             ( elem$.hasClass("ui-droppable") && elem$.hasClass("ui-droppable-disabled") ) ||
             ( elem$.hasClass("ui-draggable") && elem$.hasClass("ui-draggable-disabled") )    ) {
            return true;
        } else {
            return false;
        }
    }
// Disabled setzen bzw. entfernen.
    function disableDependentParameters( id, set ) {
        var elem = document.getElementById( id );
        var elem$ = $("#"+id);
        if ( elem$.hasClass("ui-droppable") ) {
            elem$.droppable( "option", "disabled", set );
            elem$.sortable( "option", "disabled", set );
        } else if ( elem$.hasClass("ui-draggable") ) {
            elem$.draggable( "option", "disabled", set );
        } else {
            elem.disabled = set;
            if ( id.match(/_color_/) ) {
                if ( set == true ) elem.style.opacity = "0.5";
                else elem.style.opacity = "1";
            }
            // Alle möglichen Clone zum abhängigen Parameter suchen und ebenfalls verarbeiten.
            for (var j = 0; j < 10; j++) {
                var paIdDepX = id + "X" + j;
                if ( document.getElementById( paIdDepX ) ) {
                    document.getElementById( paIdDepX ).disabled = set;
                    if ( id.match(/_color_/) ) {
                        if ( set == true ) document.getElementById( paIdDepX ).style.opacity = "0.5";
                        else document.getElementById( paIdDepX ).style.opacity = "1";
                    }
                } else {
                    break;
                }
            }
        }
    }
//<-- $$040 End of insert

//--> $$040 Begin of insert
// Warnung ausgeben, wenn die Logs nicht durch GClh geladen werden sollen.
    function alert_settings_load_logs_with_gclh() {
        if ( !document.getElementById("settings_load_logs_with_gclh").checked ) {
            var mess = "If this option is disabled, there are no VIP-, mail-, message- and \n"
                     + "top icons, no line colors and no mouse activated big images at the \n"
                     + "logs. Also the VIP lists, hide avatars, log filter and log search \n"
                     + "won't work.";
            alert( mess );
        }
    }
//<-- $$040 End of insert

//--> $$040 Begin of insert
// Feldinhalt auf default zurücksetzen. 
    function restoreField() {
        if ( document.getElementById( this.id ).disabled ) return;
        var fieldId = this.id.replace(/restore_/, "");
        var field = document.getElementById( fieldId );
        if ( this.id.match(/_color/) ) {
            switch (fieldId) {
                case "settings_lines_color_zebra": field.value = "EBECED"; field.style.color = "black"; break;
                case "settings_lines_color_user": field.value = "C2E0C3"; field.style.color = "black";  break;
                case "settings_lines_color_owner": field.value = "E0E0C3"; field.style.color = "black";  break;  
                case "settings_lines_color_reviewer": field.value = "EAD0C3"; field.style.color = "black";  break;
                case "settings_lines_color_vip": field.value = "F0F0A0"; field.style.color = "black";  break;     
                case "settings_font_color_menu_submenu": 
                    field.value = "93B516"; 
                    field.style.color = "black"; 
                    if ( document.getElementById("restore_settings_font_color_menu_submenuX0") &&
                         document.getElementById("settings_font_color_menu_submenuX0").value != field.value ) {
                        document.getElementById("restore_settings_font_color_menu_submenuX0").click();
                    }
                    break;     
                case "settings_font_color_menu_submenuX0": 
                    field.value = "93B516"; 
                    field.style.color = "black"; 
                    if ( document.getElementById("restore_settings_font_color_menu_submenu") &&
                         document.getElementById("settings_font_color_menu_submenu").value != field.value ) {
                        document.getElementById("restore_settings_font_color_menu_submenu").click();
                    }
                    break;     
//--> $$049 Begin of insert
                case "settings_count_own_matrix_show_color_next": field.value = "5151FB"; field.style.color = "white"; break;     
//<-- $$049 End of insert
            }                
            field.style.backgroundColor = "#" + field.value;
        }
    }
//<-- $$040 End of insert

//--> $$030 Begin of insert
// Function, um die Bezeichnung des Save Buttons (save bzw. save (F2)) beim Aufbau der GClh Config Seite und 
// später dynamisch durch Checkbox Aktivitäten zu versorgen.
    function setValueInSaveButton() {
        wert = "save";
        // Nach dem Aufbau der GClh Config Seite.
        if ( document.getElementById("settings_f2_save_gclh_config") ) { 
            if ( document.getElementById("settings_f2_save_gclh_config").checked ) { 
                wert = "save (F2)"; 
            }
            document.getElementById('btn_save').setAttribute("value", wert);
            return;
        }
        // Vor dem Aufbau der GClh Config Seite.
        else {
            if ( settings_f2_save_gclh_config ) {
                wert = "save (F2)";
            }
            return wert;
        }
    }
//<-- $$030 End of insert
    
//--> $$035 Begin of insert
// Info ausgeben, dass gespeichert wurde.
    function showSaveForm() {
        if ( document.getElementById('save_overlay') ) {
        } else {
            var html = "";
            html += "#save_overlay {background-color: #d8cd9d; width:560px; margin-left: 20px; border: 2px solid #778555; overflow: auto; padding:10px; position: absolute; left:30%; top:70px; z-index:104; border-radius: 10px; }";
            html += ".gclh_form {background-color: #d8cd9d; border: 2px solid #778555; padding-left: 5px; padding-right: 5px; }";
            var form_side = document.getElementsByTagName('body')[0];
            var form_style = document.createElement("style");
            form_style.appendChild(document.createTextNode(html));
            form_side.appendChild(form_style);

            html = "<h3 id='save_overlay_h3'></h3>";
            var form_div = document.createElement("div");
            form_div.setAttribute("id", "save_overlay");
            form_div.setAttribute("align", "center");
            form_div.innerHTML = html;
            form_div.appendChild(document.createTextNode(""));
            form_side.appendChild(form_div);
        }
        document.getElementById("save_overlay_h3").innerHTML = "save...";       
        document.getElementById('save_overlay').style.display = "";
    }
//<-- $$035 End of insert

//--> $$058 Begin of insert
// Änderungen an abweichenden Bezeichnungen in Spalte 2, in Value in Spalte 3 updaten.
    function updateByInputDescription() {
        // Ids ermitteln für die linke und die rechte Spalte.
        var idColLeft = this.id.replace("bookmarks_name[", "gclh_LinkListElement_").replace("]", "");
        var idColRight = this.id.replace("bookmarks_name[", "gclh_LinkListTop_").replace("]", "");
        // Bezeichnung ermitteln.
        if ( this.value.match(/(\S+)/) ) var description = this.value;
        else {
            if ( document.getElementById(idColLeft).children[1].id.match("custom") ) {
                var description = "Custom" + document.getElementById(idColLeft).children[1].id.replace("settings_custom_bookmark[", "").replace("]", "");
                this.value = description;
            } else {
                var description = document.getElementById(idColLeft).children[1].innerHTML;
            }
        }
        // Änderung an abweichender Bezeichnung in Spalte 2 in Value in Spalte 3 updaten.
        if ( document.getElementById(idColRight).children[0].childNodes[2] ) {
            document.getElementById(idColRight).children[0].childNodes[2].nodeValue = description;
        }
    }

// Attribute ändern bei Mousedown und Mouseup in rechter Spalte, Move Icon und Bezeichnung.
    function changeAttrMouse( event, elem, obj ) {
        if ( event.type == "mousedown" ) {
            elem.style.cursor = "grabbing";
        } else {
            if ( obj == "move" )      elem.style.cursor = "grab"; 
            else if ( obj == "desc" ) elem.style.cursor = "unset"; 
        }
    }

// Bookmark kennzeichnen entsprechend ob sie, oder ob sie nicht, in der Linklist vorhanden ist.
    function flagBmInLl( tdBmEntry, doDragging, setCursor, setOpacity, setTitle ) {
        if ( doDragging ) {
            tdBmEntry.style.cursor = setCursor;
            tdBmEntry.style.opacity = setOpacity;
            tdBmEntry.children[0].style.cursor = setCursor;
            tdBmEntry.children[0].style.opacity = setOpacity;
            tdBmEntry.children[1].style.cursor = setCursor;
            tdBmEntry.children[1].style.opacity = setOpacity;
        } else {                                                        
            tdBmEntry.children[0].style.cursor = setCursor;
            tdBmEntry.children[0].style.opacity = setOpacity;
            tdBmEntry.children[0].title = setTitle;
        }
    }
//<-- $$058 End of insert

//--> $$058 Begin of insert // Sort Linklist
    function sortBookmarksByDescription() {
        // Bookmarks für eine Sortierung aufbereiten. Wird immer benötigt, auch wenn nicht sortiert wird.
        var cust = 0;
        for (var i = 0; i < bookmarks.length; i++) {
            bookmarks[i]['number'] = i;
            // Wenn custom Bookmark.
            if (typeof(bookmarks[i]['custom']) != "undefined" && bookmarks[i]['custom'] == true) {
                bookmarks[i]['sortTitle'] = cust;
                cust++;
            // Wenn default Bookmark.
            } else {
                bookmarks[i]['sortTitle'] = (typeof(bookmarks_orig_title[i]) != "undefined" && bookmarks_orig_title[i] != "" ? bookmarks_orig_title[i] : bookmarks[i]['title']);
                bookmarks[i]['sortTitle'] = bookmarks[i]['sortTitle'].toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"s");
            }
        }
        // Bookmarks nach sortTitle sortieren, falls gewünscht.
        if ( settings_sort_default_bookmarks ) {
            bookmarks.sort(function(a, b){
                if ( (typeof(a.custom) != "undefined" && a.custom == true) && !(typeof(b.custom) != "undefined" && b.custom == true) ) {
                    // Custom Bookmark a nach hinten transportieren, also  a > b.
                    return 1;  
                } else if ( !(typeof(a.custom) != "undefined" && a.custom == true) && (typeof(b.custom) != "undefined" && b.custom == true) ) {
                    // Custom Bookmark b nach hinten transportieren, also  a < b.
                    return -1;
                }
                if ( a.sortTitle < b.sortTitle ) return -1;
                if ( a.sortTitle > b.sortTitle ) return 1;
                return 0;
            })
        }
    }
//<-- $$058 End of insert
    
//--> $$038 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
//// Show Config-Links
//    try {
////--> $$015 Begin of change
////        if (this.GM_registerMenuCommand && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) GM_registerMenuCommand("little helper config", gclh_showConfig); // Hide on Beta-Map
//        if (this.GM_registerMenuCommand && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/(map|play|account)\//)) GM_registerMenuCommand("GC little helper config", gclh_showConfig); // Hide on Beta-Map
////<-- $$015 End of change
//        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/[#a-zA-Z-_]*$/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/default\.aspx/)) && document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink')) {
////--> $$037 Begin of change
////            var lnk = " | <a href='#' id='gclh_config_lnk'>GClh Config</a>";
//            var lnk = " | <a href='#' id='gclh_config_lnk' style='margin-left: 58px;'>GClh Config</a>";
////<-- $$037 End of change
//            document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink').parentNode.innerHTML += lnk;
//            document.getElementById('gclh_config_lnk').addEventListener("click", gclh_showConfig, false);
//            if (document.location.href.match(/#GClhShowConfig/)) {
//                setTimeout(gclh_showConfig, 5);
//            }
//        }
//    } catch (e) {
//        gclh_error("Show GClh-Config Links", e);
//    }
//<-- $$038 End of delete

//--> $$038 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Show Config-Links 
    try {
        // GClh Config bei Greasemonkey ins Menu eintragen.
        if (this.GM_registerMenuCommand) {
            if ( checkTaskAllowed( "GClh Config", false ) == true ) {
//--> $$001 Begin of change
//                GM_registerMenuCommand("little helper config", gclh_showConfig);
                GM_registerMenuCommand(scriptNameConfig, gclh_showConfig); 
//<-- $$001 End of change
            }
        } 

        // Seite "My Profile".
        if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/[#a-zA-Z-_]*$/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/default\.aspx/)) && document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink')) {

            // GClh Config Link auf Seite "My Profile" aufbauen und mit Event versehen.
//--> $$058 Begin of change
//            var lnk = " | <a href='#' id='gclh_config_lnk' style='margin-left: 58px;'>GClh Config</a>";
            var lnk = " | <a href='#' id='gclh_config_lnk' name='gclh_config_lnk' style='margin-left: 58px;'>GClh Config</a>";
//<-- $$058 End of change
            document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink').parentNode.innerHTML += lnk;
//--> $$058 Begin of change
//            document.getElementById('gclh_config_lnk').addEventListener("click", gclh_showConfig, false);
            addLinkEvent('gclh_config_lnk', gclh_showConfig, true, false );
//<-- $$058 End of change
            
            // Spezieller GClh Config Aufruf von der Seite "My Profile" aus der Linklist heraus, alternativer Aufruf.
            if ( document.getElementsByName("lnk_gclhconfig")[0] ) {
                addLinkEvent('lnk_gclhconfig', gclh_showConfig, false, false );
            } 
            
            // Spezielle GClh Config Aufrufe von anderen Seiten auf die Seite "My Profile" mit Zusatz #GClhShowConfig. 
            // Derzeit im Link bei Settings, Preferences Avatar anzeigen und im GClh Config Link aus der Linklist verwendet.    
            if (document.location.href.match(/#GClhShowConfig/)) {
                document.location.href = clearUrlAppendix( document.location.href, true );
                setTimeout(gclh_showConfig, 5);
            }
        }
    } catch (e) {
        gclh_error("Show GClh-Config Links", e);
    }
//<-- $$038 End of insert
    
//--> $$038 Begin of delete (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Hide Avatars option - must be placed here, because it has a link to the gclh_config page
//    try {
//        if (settings_load_logs_with_gclh && document.location.href.match(/^https?:\/\/www\.geocaching\.com\/account\/ManagePreferences\.aspx/) && document.getElementById("ctl00_ContentBody_uxShowCacheLogAvatars")) {
//            var avatar_checkbox = document.getElementById("ctl00_ContentBody_uxShowCacheLogAvatars");
//            var hinweis = document.createElement("font");
//            var link = document.createElement("a");
//            link.setAttribute("href", "javascript:void(0);");
//            link.appendChild(document.createTextNode("here"));
//            link.addEventListener("click", gclh_showConfig, false);
//            hinweis.setAttribute("color", "#FF0000");
//            hinweis.appendChild(document.createTextNode("You are using \"GC little helper\" - you have to change this option "));
//            hinweis.appendChild(link);
//            avatar_checkbox.checked = !settings_hide_avatar;
//            avatar_checkbox.disabled = "disabled";
//            avatar_checkbox.parentNode.appendChild(document.createElement("br"));
//            avatar_checkbox.parentNode.appendChild(hinweis);
//        }
//    } catch (e) {
//        gclh_error("Hide gc.com Avatar-Option", e);
//    }
//<-- $$038 End of delete 

//--> $$038 Begin of insert (Größere Anpassungen ohne zeilenweise Änderungsdokumentation.)
// Hide Avatars option - must be placed here, because it has a link to the gclh_config page
// Behandlung Checkbox zum Avatar in Settings, Preferences angepaßt, wenn GClh Logs laden soll: "Show other geocachers' profile photos in logs"  
    try {
        if ( settings_load_logs_with_gclh && 
             document.location.href.match(/^https?:\/\/www\.geocaching\.com\/account\/settings\/preferences/) && 
             document.getElementById("ShowAvatarsInCacheLogs")                                                   ) {
            
            var avatar_checkbox = document.getElementById("ShowAvatarsInCacheLogs");
            avatar_checkbox.checked = !settings_hide_avatar;
            avatar_checkbox.disabled = true;

            var avatar_head = avatar_checkbox.parentNode;
            avatar_head.style.cursor = "unset";
            avatar_head.style.opacity = "0.5";
            
            var link = document.createElement("a");
            link.setAttribute("href", "/my/#GClhShowConfig#settings_hide_avatar");
            link.setAttribute("target", "_blank");
            link.appendChild(document.createTextNode("here"));
            
            var hinweis = document.createElement("span");
            hinweis.setAttribute("class", "label");
            hinweis.appendChild(document.createTextNode("You are using \"GC little helper\" - you have to change this option "));
            hinweis.appendChild(link);
            hinweis.appendChild(document.createTextNode("."));

            avatar_head.appendChild(hinweis);
        }
    } catch (e) {
        gclh_error("Hide gc.com Avatar-Option", e);
    }
//<-- $$038 End of insert 

// Check for Updates
    function checkVersion() {
        var url = "https://www.amshove.net/greasemonkey/updates.php";
        var time = new Date().getTime();
        var next_check = 24 * 60 * 60 * 1000; // Milliseconds
        var last_check = parseInt(getValue("update_last_check"), 10);
        var token = getValue("token", "");
        if (token == "") setValue("token", "" + Math.random());

        if (!last_check) last_check = 0;

//--> $$001 Begin of insert
        if ( AS ) {
            next_check = 60 * 60 * 1000; // 1 Stunde
            if ((last_check + next_check) < time) {
                var url = "https://github.com/2Abendsegler/GC_little_helper_2AS/raw/master/gc_little_helper_(2As).user.js";
                if (GM_xmlhttpRequest) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        onload: function (result) {
                            try {
                                var version = result.responseText.match(/\/\/\s\@version(.*)/);
                                if ( version ) {
                                    var new_version = version[1].replace(/\s/g, "");
                                    setValue("new_version", new_version);
                                    if ( new_version != scriptVersion ) {
                                        var text = "Version " + new_version + " of " + scriptName + " greasemonkey script is available.\n" +
                                                   "You are currently using version " + scriptVersion + ".\n\n" +
                                                   "Click OK to upgrade.\n";
                                        if (window.confirm(text)) window.open(url, '_blank');
                                    }
                                }
                            } catch (e) { 
                                gclh_error("Check for Updates 2AS", e); 
                            }
                        }
                    });
                }
            }
            return;
        }
//<-- $$001 End of insert
        if ((last_check + next_check) < time) {
            if (GM_xmlhttpRequest) GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers: {'User-Agent': 'GM ' + scriptName + ' v' + scriptVersion + ' ' + last_check + ' ' + token},
                onload: function (result) {
                    try{
                        var version = result.responseText.match(/^([a-zA-Z0-9-_.]*)=([0-9.]*)/);
                        var changelog = result.responseText.match(/changelog=((.*\n*)*)/);

                        setValue("new_version", version[2]);

                        if (version[1] == scriptName && version[2] != scriptVersion) {
                            var text = "Version " + version[2] + " of " + scriptName + " greasemonkey script is available.\n" +
                                "You are currently using version " + scriptVersion + ".\n\n" +
                                "Click OK to upgrade.\n";
                            if (changelog) text += "\n\nChangelog:\n" + changelog[1];
                            if (window.confirm(text)) window.open(url, '_blank');
                        }
                    } catch (e) { gclh_error("Check for Updates", e); }
                }
            });
            setValue('update_last_check', time.toString());
        }
    }

    try {
        checkVersion();
    } catch (e) {
        gclh_error("Check for Updates", e);
    }

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Config Sync
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
    if (is_page("profile") || (settings_sync_autoImport && (settings_sync_last.toString() === "Invalid Date" || (new Date() - settings_sync_last) > settings_sync_time)) ){
        // Sync: get config data
        function sync_getConfigData() {
            var data = {};
            var value = null;
            for (key in CONFIG) {
                if (!gclhConfigKeysIgnoreForBackup[key]) {
                    value = getValue(key, null);
                    if (value != null) {
                        data[key] = value;
                    }
                }
            }

            return JSON.stringify(data, undefined, 2);
        }

        // Sync: Set config data
        function sync_setConfigData(data){
            var parsedData = JSON.parse(data);
            var settings = {};

            for(key in parsedData){
                if(!gclhConfigKeysIgnoreForBackup[key]){
                    settings[key] = parsedData[key];
                }
            }

            setValueSet(settings).done(function (){
                //Reload page
//--> $$042 Begin of delete
// Wenn ich den Reload bereits hier durchführe, dann gibts beim manuellen Import eine auf die Flossen "Invalid format".
//                window.location.reload(false);
//<-- $$042 End of delete 
            });
        }

        var gclh_sync_DB_Client = null;

        function gclh_sync_DB_CheckAndCreateClient(userToken) {
			var deferred = $.Deferred();
            if (gclh_sync_DB_Client != null && gclh_sync_DB_Client.isAuthenticated()) {
				deferred.resolve();
                return deferred.promise();
            }
            $('#syncDBLoader').show();
            setValue("dbToken", "");
            gclh_sync_DB_Client = null;
            if (document.getElementById('btn_DBSave') && document.getElementById('btn_DBLoad')) {
                document.getElementById('btn_DBSave').disabled = true;
                document.getElementById('btn_DBLoad').disabled = true;
            }

            var client = new Dropbox.Client({key: "b992jnfyidj32v3", sandbox: true, token: userToken});

            client.authDriver(new Dropbox.AuthDriver.Popup({
                rememberUser: true,
                receiverUrl: "https://www.geocaching.com/my/default.aspx"
            }));

            client.authenticate(function (error, client) {
                $('#syncDBLoader').hide();
                if (error || !client.isAuthenticated()) {
                    alert("Error connecting to dropbox");
                    return;
                }
                gclh_sync_DB_Client = client;
                if (document.getElementById('btn_DBSave') && document.getElementById('btn_DBLoad')) {
                    document.getElementById('btn_DBSave').disabled = false;
                    document.getElementById('btn_DBLoad').disabled = false;
                }

				deferred.resolve();
            });

			return deferred.promise();
        }

        function gclh_sync_DBSave() {
            var deferred = $.Deferred();
            gclh_sync_DB_CheckAndCreateClient().done(function(){
				$('#syncDBLoader').show();

				gclh_sync_DB_Client.writeFile("GCLittleHelperSettings.json", sync_getConfigData(), {}, function () {
					$('#syncDBLoader').hide();
					deferred.resolve();
				});
			}).fail(function(){deferred.reject();});
            return deferred.promise();
        }

        function gclh_sync_DBLoad() {
            var deferred = $.Deferred();
            gclh_sync_DB_CheckAndCreateClient().done(function(){
				$('#syncDBLoader').show();

				gclh_sync_DB_Client.readFile("GCLittleHelperSettings.json", {}, function (error, data) {
					if (data != null && data != "") {
						sync_setConfigData(data);
						$('#syncDBLoader').hide();
						deferred.resolve();
					}
				});
			}).fail(function(){deferred.reject();});
            return deferred.promise();
        }

        function gclh_sync_DBHash() {
            var deferred = $.Deferred();

            gclh_sync_DB_CheckAndCreateClient().done(function(){
				$('#syncDBLoader').show();

				gclh_sync_DB_Client.stat("GCLittleHelperSettings.json", {}, function (error, data) {
					if (data != null && data != "") {
						deferred.resolve(data.versionTag);
					}
				});
			}).fail(function(){deferred.reject();});;
            return deferred.promise();
        }

        // Sync: Configuration Menu
        function gclh_sync_showConfig() {
//--> $$038 Begin of insert
            // Alle eventuellen Verarbeitungen schließen.
            btnClose();
//<-- $$038 End of insert

            // the configuration is always displayed at the top, so scroll away from logs or other lower stuff
            scroll(0, 0);

            if (document.getElementById('bg_shadow')) {
                // If shadow-box already created, just show it
                if (document.getElementById('bg_shadow').style.display == "none") {
                    document.getElementById('bg_shadow').style.display = "";
                }
            } else {
//--> $$038 Begin of delete
//                // Seite abdunkeln
//                var shadow = document.createElement("div");
//                shadow.setAttribute("id", "bg_shadow");
//                shadow.setAttribute("style", "width: 100%; height: 100%; background-color: #000000; position:fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50);");
//                document.getElementsByTagName('body')[0].appendChild(shadow);
//                document.getElementById('bg_shadow').addEventListener("click", btnClose, false);
//<-- $$038 End of delete 
//--> $$038 Begin of insert
                buildBgShadow();
//<-- $$038 End of insert
            }

            if (document.getElementById('sync_settings_overlay') && document.getElementById('sync_settings_overlay').style.display == "none") {
                // If menu already created, just show it
                document.getElementById('sync_settings_overlay').style.display = "";
            } else {
                create_config_css();

                var div = document.createElement("div");
                div.setAttribute("id", "sync_settings_overlay");
                div.setAttribute("class", "settings_overlay");
                var html = "";
//--> $$042 Begin of change
//                html += "<h3 class='gclh_headline'>GC little helper - Configuration Sync</h3>";
//--> $$001 Begin of change
//                html += "<h3 class='gclh_headline'>GC little helper Sync <font class='gclh_small'>v" + scriptVersion + "</font></h3>";
                html += "<h3 class='gclh_headline'>" + scriptNameSync + " <font class='gclh_small'>v" + scriptVersion + "</font></h3>";
//<-- $$001 End of change
//<-- $$042 End of change
                html += "<div class='gclh_content'>";
//--> $$042 Begin of change
//                html += "<h3 id='syncDBLabel'>DropBox <font class='gclh_small'>(click to hide/show)</font></h3>";
                html += "<h3 id='syncDBLabel' style='cursor: pointer;'>DropBox <font class='gclh_small'>(Click to hide/show)</font></h3>";
//<-- $$042 End of change
                html += "<div style='display:none;' id='syncDB' >";
                html += "<img style='display:none;height: 40px;' id='syncDBLoader' src='data:image/gif;base64,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'>";
                html += "<br>";
                html += "<input class='gclh_form' type='button' value='save to DropBox' id='btn_DBSave' style='cursor: pointer;' disabled> ";
                html += "<input class='gclh_form' type='button' value='load from DropBox' id='btn_DBLoad' style='cursor: pointer;' disabled>";
                html += "</div>";
                html += "<br>";
//--> $$042 Begin of change
//                html += "<h3 id='syncManualLabel'>Manual <font class='gclh_small'>(click to hide/show)</font></h3>";
                html += "<h3 id='syncManualLabel' style='cursor: pointer;'>Manual <font class='gclh_small'>(Click to hide/show)</font></h3>";
//<-- $$042 End of change
                html += "<div style='display:none;'  id='syncManual' >";
                html += "<pre class='gclh_form' style='width: 550px; height: 300px; overflow: auto;' type='text' value='' id='configData' size='20' contenteditable='true'></pre>";
                html += "<br>";
                html += "<br>";
                html += "<input class='gclh_form' type='button' value='export' id='btn_ExportConfig' style='cursor: pointer;'> ";
                html += "<input class='gclh_form' type='button' value='import' id='btn_ImportConfig' style='cursor: pointer;'>";
                html += "</div>";
                html += "<br>";
                html += "<br>";
                html += "<input class='gclh_form' type='button' value='close' id='btn_close3' style='cursor: pointer;'>";
                html += "</div>";
                div.innerHTML = html;

                document.getElementsByTagName('body')[0].appendChild(div);
                document.getElementById('btn_close3').addEventListener("click", btnClose, false);

                document.getElementById('btn_ExportConfig').addEventListener("click", function () {
                    document.getElementById('configData').innerText = sync_getConfigData();
                }, false);
                document.getElementById('btn_ImportConfig').addEventListener("click", function () {
                    var data = document.getElementById('configData').innerText;
//--> $$042 Begin of change
//                    if (data == null || data == "") {
                    if (data == null || data == "" || data == " ") {
//<-- $$042 End of change
                        alert("No data");
                        return;
                    }
                    try {
                        sync_setConfigData(data);
//--> $$042 Begin of change
//                        alert("Successful");
                        $("#sync_settings_overlay").fadeOut(400);    
                        if ( settings_show_save_message ) {
                            showSaveForm();
                            document.getElementById("save_overlay_h3").innerHTML = "imported";       
                        }
//<-- $$042 End of change
                        //Reload page
                        if (document.location.href.indexOf("#") == -1 || document.location.href.indexOf("#") == document.location.href.length - 1) {
                            $('html, body').animate({scrollTop: 0}, 0);
                            document.location.reload(true);
                        }
                        else {
                            document.location.replace(document.location.href.slice(0, document.location.href.indexOf("#")));
                        }
                    } catch (e) {
                        alert("Invalid format");
                    }
                }, false);

                document.getElementById('btn_DBSave').addEventListener("click", function () {
                    gclh_sync_DBSave();
                }, false);

                document.getElementById('btn_DBLoad').addEventListener("click", function () {
                    gclh_sync_DBLoad().done(function () {
                        //Reload page
                        if (document.location.href.indexOf("#") == -1 || document.location.href.indexOf("#") == document.location.href.length - 1) {
                            $('html, body').animate({scrollTop: 0}, 0);
                            document.location.reload(true);
                        }
                        else {
                            document.location.replace(document.location.href.slice(0, document.location.href.indexOf("#")));
                        }
                    });
                }, false);

                $('#syncDBLabel').click(function () {
                    $('#syncDB').toggle();
                    gclh_sync_DB_CheckAndCreateClient();
                });
                $('#syncManualLabel').click(function () {
                    $('#syncManual').toggle();
                });

            }
//--> $$038 Begin of change
            // Fokusierung auf Verarbeitung, damit Menüs einklappen. 
            document.getElementById("sync_settings_overlay").click();
//<-- $$038 End of change
        }

        if (document.URL.indexOf("#access_token") != -1) {
            $("body").hide();
            Dropbox.AuthDriver.Popup.oauthReceiver();
        }
        else if (is_page("profile")) {
            if (this.GM_registerMenuCommand && !document.location.href.match(/^https?:\/\/www\.geocaching\.com\/map\//)) {
//--> $$015 Begin of change
//                GM_registerMenuCommand("little helper config sync", gclh_sync_showConfig); // Hide on Beta-Map
//--> $$001 Begin of change
//                GM_registerMenuCommand("GC little helper Sync", gclh_sync_showConfig); 
                GM_registerMenuCommand(scriptNameSync, gclh_sync_showConfig); 
//<-- $$001 End of change
//<-- $$015 End of change
            }
            if ((document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/[#a-zA-Z-_]*$/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/my\/default\.aspx/)) && document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink')) {
                var lnk = document.createElement("a");
                lnk.id = "gclh_sync_lnk";
//--> $$058 Begin of insert
                lnk.name = "gclh_sync_lnk";
//<-- $$058 End of insert
                lnk.href = "#";
                lnk.innerHTML = "GClh Sync";
                document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink').parentNode.appendChild(document.createTextNode(" | "));
                document.getElementById('ctl00_ContentBody_WidgetMiniProfile1_logOutLink').parentNode.appendChild(lnk);
//--> $$058 Begin of change
//                document.getElementById('gclh_sync_lnk').addEventListener("click", gclh_sync_showConfig, false);
                addLinkEvent('gclh_sync_lnk', gclh_sync_showConfig, true, false );
//<-- $$058 End of change
            }
        }

        if (settings_sync_autoImport && (settings_sync_last.toString() === "Invalid Date" || (new Date() - settings_sync_last) > settings_sync_time) && document.URL.indexOf("#access_token") === -1) {
            gclh_sync_DBHash().done(function (hash) {
                if (hash != settings_sync_hash) {
                    gclh_sync_DBLoad().done(function () {
                        settings_sync_last = new Date();
                        settings_sync_hash = hash;
                        setValue("settings_sync_last", settings_sync_last.toString()).done(function(){
							setValue("settings_sync_hash", settings_sync_hash).done(function(){
								if (is_page("profile")) {
									//Reload page
									if (document.location.href.indexOf("#") == -1 || document.location.href.indexOf("#") == document.location.href.length - 1) {
										$('html, body').animate({scrollTop: 0}, 0);
										document.location.reload(true);
									}
									else {
										document.location.replace(document.location.href.slice(0, document.location.href.indexOf("#")));
									}
								}
							});
						});
                    });
                }
            });
        }
    } // Config Sync
};

//NEW ENDE

/**
 * create a bookmark to a page in the geocaching.com name space
 * @param {String} title
 * @param {String} href
 * @returns {Object} bookmark
 */
function bookmark(title, href, bookmarkArray) {
    var bm = new Object();
    bookmarkArray[bookmarkArray.length] = bm;
    bm['href'] = href;
    bm['title'] = title;
    return bm;
}

/**
 * create a bookmark to an external site
 * @param {String} title
 * @param {String} href
 */
function externalBookmark(title, href, bookmarkArray) {
    var bm = bookmark(title, href, bookmarkArray);
    bm['rel'] = "external";
    bm['target'] = "_blank";
}

/**
 * create a bookmark to a profile sub site
 * @param {String} title
 * @param {String} id
 */
function profileBookmark(title, id, bookmarkArray) {
    var bm = bookmark(title, "#", bookmarkArray);
    bm['id'] = id;
    bm['name'] = id;
}

//--> $$038 Begin of insert
// Doppelte Linkbestückung mit "href" hier direkt und mit "name" für spätere Eventzuordnung.
// Derzeitige Nutzung nur für Aufruf GClh Config: 1. für "href" Link zu Seite "My Profile" von anderer Seite, per Link GClh Config
// in Linklist heraus und 2. für Event Verarbeitung auf Seite "My Profile" per Link GClh Config in Linklist heraus.
function profileSpecialBookmark(title, href, name, bookmarkArray) {
    var bm = bookmark(title, href, bookmarkArray);
    bm['name'] = name;
}
//<-- $$038 End of insert

/**
 * check if the current document location matches the given path
 * @param {String} path partial or full path to a geocaching.com web page
 * @returns {Boolean} true if the current page matches the path
 */
function isLocation(path) {
    path = path.toLowerCase();
    if (path.indexOf("http") != 0) {
        if (path.charAt(0) != '/') {
            path = "/" + path;
        }
        path = http + "://www.geocaching.com" + path;
    }
    return document.location.href.toLowerCase().indexOf(path) == 0;
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


// Logging function
function gclh_log(log) {
    var txt = "GClh_LOG - " + document.location.href + ": " + log;
    if (typeof(console) != "undefined") {
        console.info(txt);
    }
    else if (typeof(GM_log) != "undefined") {
        GM_log(txt);
    }
}

// Error-Logging function
function gclh_error(modul, err) {
    var txt = "GClh_ERROR - " + modul + " - " + document.location.href + ": " + err.message + "\nStacktrace:\n" + err.stack + (err.stacktrace ? ("\n" + err.stacktrace) : "");
    if (typeof(console) != "undefined") {
        console.error(txt);
    }
    if (typeof(GM_log) != "undefined") {
        GM_log(txt);
    }
}

function setValue(name, value) {
    var defer = $.Deferred();
    CONFIG[name] = value;
    /*if(gclhConfigKeys[name] === undefined && !gclhConfigKeysIgnoreForBackup[name]){
     gclhConfigKeys[name] = null;
     CONFIG["gclhConfigKeys"] = JSON.stringify(gclhConfigKeys);
     }*/
    if (browser === "chrome") {
		var data2Store = {};
		data2Store[name] = value;
        chrome.runtime.sendMessage({setGclhConfig: data2Store}, function () {
            defer.resolve();
        });
    }
    else {
        GM_setValue("CONFIG", JSON.stringify(CONFIG));
        defer.resolve();
    }

    return defer.promise();
}

function setValueSet(data) {
    var defer = $.Deferred();
	var data2Store = {};

    for (key in data) {
        CONFIG[key] = data[key];
        data2Store[key] = data[key];
    }

    if (browser === "chrome") {
        chrome.runtime.sendMessage({setGclhConfig: data2Store}, function (e) {
            defer.resolve();
        });
    }
    else {
        GM_setValue("CONFIG", JSON.stringify(CONFIG));
        defer.resolve();
    }

    return defer.promise();
}

function getValue(name, defaultValue) {
    if (CONFIG[name] === undefined) { // Zum Migrieren aus dem alten Speicherformat

        CONFIG[name] = GM_getValue(name, defaultValue);

        if (defaultValue === undefined) {
            return undefined;
        }

        setValue(name, CONFIG[name]);
    }

    return CONFIG[name];
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Wrapper, um zu pruefen auf welche Seite der Link zeigt - um zu vermeiden, die URL-Abfrage mehrfach im Quelltext wiederholen zu muessen
function is_link(name, url) {
    switch (name) {
        case "cache_listing":
            if (url.match(/^https?:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx/) || document.location.href.match(/^https?:\/\/www\.geocaching\.com\/geocache\//)) return true;
            else return false;
            break;
        case "profile":
            if (url.match(/^http:\/\/www\.geocaching\.com\/my\/default\.aspx/) || document.location.href.match(/^http:\/\/www\.geocaching\.com\/my/) || url.match(/^https:\/\/www\.geocaching\.com\/my\/default\.aspx/) || document.location.href.match(/^https:\/\/www\.geocaching\.com\/my/)) return true;
            else return false;
            break;
        case "publicProfile":
            if (url.match(/^http:\/\/www\.geocaching\.com\/profile/) || url.match(/^https:\/\/www\.geocaching\.com\/profile/)) return true;
            else return false;
            break;
		case "map":
			if (url.match(/^http:\/\/www\.geocaching\.com\/map/) || url.match(/^https:\/\/www\.geocaching\.com\/map/)) return true;
			else return false;
			break;
//--> $$002 Begin of insert
		case "find_cache":
			if (url.match(/^https:\/\/www\.geocaching\.com\/play\/search/)) return true;
			else return false;
			break;
		case "hide_cache":
            if (url.match(/^https:\/\/www\.geocaching\.com\/play\/hide/)) return true;
			else return false;
			break;
		case "settings":
            if (url.match(/^https:\/\/www\.geocaching\.com\/account\/settings/)) return true;
//--> $$051 Begin of insert
            else if (url.match(/^https:\/\/www\.geocaching\.com\/account\/lists/)) return true;
//<-- $$051 End of insert
			else return false;
			break;
		case "messagecenter":
            if (url.match(/^https:\/\/www\.geocaching\.com\/account\/messagecenter/)) return true;
			else return false;
			break;
        case "geotours":
			if (url.match(/^https:\/\/www\.geocaching\.com\/play\/geotours/)) return true;
			else return false;
			break;
        case "labs":
			if (url.match(/^https:\/\/labs\.geocaching\.com/)) return true;
			else return false;
			break;
//<-- $$002 End of insert
        default:
            return false;
    }
}

// Wrapper fuer die aktuelle Seite (siehe is_link)
function is_page(name) {
    return is_link(name, document.location.href);
}

//Helperfunctions to inject functions into site context
function injectPageScript(scriptContent) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = scriptContent;
    var pageHead = document.getElementsByTagName("head")[0];
    pageHead.appendChild(script);
}

function injectPageScriptFunction(funct, functCall) {
    injectPageScript("(" + funct.toString() + ")" + functCall + ";");
}

start(this);
