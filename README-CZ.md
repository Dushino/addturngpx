# AddTurn GPX

English version: [README.md](README.md)

**Varování!!!**

1. Testuji pouze na Suunto Race 2
2. Na firmware 2.56.28 se mi doposud nepodařilo najít postup, který spolehlivě vede k tomu, aby hodinky ukazovaly vzdálenost k další odbočce. V tomto firmware je více chyb a cesta k úspěchu spočívá v přesně daném postupu plánování trasy. V podstatě se mi podařilo jen jednou dosáhnout toho, že pole "Vzdálenost k dalšímu POI/Waypointu" ukazovala správně vzdálenost. Bohužel jsem si nepoznamenal nastavení a od té doby nejsem schopen tento pokus zopakovat. Vím pouze, že to jde, ale netuším, jak. Počet kombinací je velmi velký...

Aplikace: <https://dushino.github.io/addturngpx/>

AddTurn GPX přidává do tras GPX navigační pokyny pro **hodinky Suunto**. Běží celá v prohlížeči, bez serveru a bez registrace.

Hodinky Suunto při navigaci po trase ukazují pokyn (odboč vlevo, na rozcestí vpravo…) a vzdálenost k němu. Dělají to ale jen u waypointů, které splňují přísné podmínky. Většina souborů GPX, včetně souborů z jiných plánovačů, tak skončí úplně bez pokynů. V AddTurn GPX si trasu otevřeš, pokyny přidáš ručně nebo je necháš vygenerovat automaticky na skutečných křižovatkách a uložíš soubor, který aplikace Suunto správně načte. Soubor se vždy uloží ve stejném formátu, jaký používá aplikace Suunto při sdílení trasy. U tohoto formátu je ověřené, že na hodinkách funguje.

![AddTurn GPX s trasou a vygenerovanými pokyny](docs/img/overview.jpg)

## Doporučený postup (ověřeno na hodinkách)

**Aplikace Suunto → sdílený odkaz → AddTurn GPX → import do aplikace Suunto**

Tenhle postup je vyzkoušený na skutečných hodinkách: hodinky ukazovaly každý pokyn s jeho ikonou a vzdálenost k dalšímu. Drž se ho přesně. Trasy odjinud (třeba GPX export přímo ze Suunto Routeplanneru nebo z jiných plánovačů) se při otevření převedou do formátu aplikace Suunto. Tenhle převod ale zatím na hodinkách vyzkoušený není.

1. **Naplánuj trasu v aplikaci Suunto** (nebo ji naplánuj v Suunto Routeplanneru a ulož do svého účtu Suunto, aby se objevila v aplikaci).
2. **V aplikaci Suunto trasu nasdílej.** Dostaneš odkaz ve tvaru `https://api.sports-tracker.com/apiserver/v2/routes/export/…?brand=SUUNTOAPP&format=gpx-route`.
3. **V AddTurn GPX klikni na Open URL a odkaz vlož.** Aplikace stáhne trasu přesně tak, jak ji aplikace Suunto exportuje.
4. **Přidej pokyny:** v panelu klikni na **Turns generator** a pak na **Generate turns**, zkontroluj náhled na mapě a klikni na **Apply**. Nebo je přidej sám kliknutím na trasu.
5. **Klikni na Save.** Změní se jen waypointy, zbytek souboru zůstane přesně takový, jak ho aplikace Suunto vyexportovala.
6. **Uložený soubor naimportuj do aplikace Suunto** jako trasu a synchronizuj do hodinek.
7. **Zkontroluj [nastavení hodinek](#na-hodinkách)** a nenaviguj trasu pozpátku.

## Otevření trasy

- **Open URL**: vlož odkaz na soubor GPX. Trasa sdílená z aplikace Suunto dá odkaz ve tvaru `https://api.sports-tracker.com/apiserver/v2/routes/export/…?brand=SUUNTOAPP&format=gpx-route`, který aplikace umí stáhnout přímo. Fungují i odkazy na soubory na `github.com`. Jiné weby fungují jen tehdy, když dovolí ostatním webům své soubory stahovat. Pokud ne, aplikace to ohlásí a soubor si můžeš stáhnout v prohlížeči a otevřít přes **Open**.
- **Open**: vyber soubor `.gpx` v zařízení. Na počítači ho můžeš také přetáhnout do okna.
- **Odkaz, který rovnou otevře trasu**: k adrese aplikace přidej `?url=` a zakódovanou adresu souboru GPX, například `https://dushino.github.io/addturngpx/?url=https%3A%2F%2F…`.

Aplikace si pamatuje otevřený soubor i neuložené úpravy, takže zavřením záložky nebo obnovením stránky o práci nepřijdeš.

## Obrazovka

- **Mapa**: trasa se šipkami ve směru jízdy a waypointy. Tlačítka vlevo přibližují a oddalují, ukážou tvou polohu a **⤢ Fit route** ukáže celou trasu. Tlačítkem vrstev vpravo přepínáš mezi **OpenStreetMap**, **OpenTopoMap** (turistická mapa s vrstevnicemi) a **Satellite (Esri)**.
- **Panel** (na počítači vpravo, na telefonu vysouvací panel dole): údaje o souboru, **název trasy**, který ukáže aplikace Suunto a hodinky (můžeš ho kdykoli upravit; Zpět funguje jako u ostatních úprav), a seznam waypointů v pořadí, v jakém na ně na trase narazíš.
- **Lišta**: Open, Open URL, Undo, Redo, Save. Název (nebo ikona) aplikace vlevo otevře tuto stránku projektu na GitHubu.

<img src="docs/img/mobile.jpg" alt="AddTurn GPX na telefonu" width="260">

Rozložení se přizpůsobí obrazovce (počítač, tablet, telefon) a ovládání se řídí světlým nebo tmavým režimem systému. Samotná mapa zůstává vždy světlá.

## Barvy a ikony

| Značka | Význam |
| --- | --- |
| Oranžové kolečko se šipkou | Pokyn k odbočení. Šipka je natočená podle směru příjezdu, takže „odboč vpravo“ ukazuje doprava tak, jak to uvidíš v terénu. |
| Oranžové kolečko s kroužkem a číslem | Kruhový objezd, číslo je výjezd |
| Modré kolečko se symbolem | Bod zájmu – voda a moře (voda, zdroj vody, řeka, jezero, vodopád, pláž…) |
| Zelené kolečko se symbolem | Bod zájmu – příroda, terén a zvěř (les, vrchol, jeskyně, houby, zvěř, místo k rybaření…) |
| Hnědé kolečko se symbolem | Bod zájmu – jídlo a nocleh (kavárna, restaurace, hotel, tábořiště, ohniště…) |
| Tyrkysové kolečko se symbolem | Bod zájmu – orientace a doprava (informace, vyhlídka, parkoviště, silnice, stezka, křižovatka, geocache) |
| Červené kolečko se symbolem | Bezpečnost: nebezpečí, lavina, nouze, občerstvovací stanice |
| Fialové kolečko se špendlíkem | Obecný waypoint (bez typu nebo s typem, který hodinky neznají) |
| Zelené **S** / červené **F** | Začátek a konec trasy (*Begin* a *End* ze Suunto). Zobrazují se, ale needitují. |
| Šedá s červeným čárkovaným okrajem | **Waypoint neleží na bodu trasy, a Suunto ho proto ignoruje.** Seznam ukáže vzdálenost k nejbližšímu bodu trasy a editor nabídne tlačítko *Snap to nearest route point*. |
| Modrý obrys, mírně zvětšený | Vybraný waypoint (ponechá si barvu svého typu) |

Všech 78 typů waypointů, které Suunto zná, má vlastní ikonu. V editoru jsou body zájmu seřazené do stejných skupin. Další upozornění v seznamu:

- **Neznámý typ**: Suunto waypoint ukáže jako obecný *Waypoint*.
- **Více tras v jednom souboru**: Suunto každou naimportuje jako samostatnou trasu.

## Úpravy waypointů

![Úprava waypointu](docs/img/editor.jpg)

- **Přidání**: klikni (nebo klepni) na čáru trasy tam, kde ještě žádný waypoint není. Nový waypoint se přichytí k nejbližšímu bodu trasy a otevře se jeho editor.
  - Když v místě kliknutí žádný bod trasy není (dlouhý rovný úsek), aplikace vloží nový bod trasy přesně na čáru. Tvar trasy se nezmění.
  - Typ se navrhne podle úhlu trasy v daném místě. Když je vybraný waypoint s typem bodu zájmu (třeba *Water point*), nový dostane stejný typ, takže jich rychle přidáš víc.
  - S myší kurzor ukazuje, co kliknutí udělá: **kříž** nad trasou (přidá waypoint), **ukazováček** u waypointu (vybere ho) a otevřená ruka jinde (tažením posuneš mapu).
- **Úprava**: klikni na waypoint na mapě (nebo těsně vedle něj) či v seznamu a otevře se editor. Kliknutím do prázdného místa mapy nebo klávesou Esc editor zavřeš.
  - **Type (typ)**: nahoře pokyny k odbočení a kruhové objezdy, pod *Points of interest* body zájmu. Zelená tečka označuje typ navržený podle úhlu trasy.
  - **Name (název)** je nepovinný. Hodinky mohou dlouhé názvy zkrátit.
  - **◀ Previous point / Next point ▶** posunou waypoint po trase.
  - **Delete waypoint** smaže waypoint, s potvrzením.
- **Tažení**: značku můžeš na počítači přetáhnout myší. Po puštění se přichytí na trasu.
- **Undo / Redo**: každou úpravu jde vrátit, i automatické generování jedním krokem.
- **Modified** u názvu souboru znamená, že změny ještě nejsou uložené do souboru. Aplikace se zeptá, než soubor zavřeš nebo otevřeš jiný.

## Automatické pokyny

![Generování pokynů](docs/img/generator.jpg)

Tlačítko **Turns generator** v panelu s údaji o souboru otevře kartu generátoru. Nastav parametry a stiskni **Generate turns**, aplikace navrhne pokyny:

- Stáhne z **OpenStreetMap** síť silnic a cest v okolí trasy a pokyny dává **jen na křižovatky**. Zatáčka bez křižovatky pokyn nedostane.
- Síť cest čte z **vektorových mapových dlaždic** OpenStreetMap kolem trasy: nejdřív z [OpenFreeMap](https://openfreemap.org), a když není dostupné, z [vektorových dlaždic OpenStreetMap](https://vector.openstreetmap.org). Teprve když selžou oba zdroje, zeptá se datového serveru [Overpass API](https://overpass-api.de). Karta ukazuje, který zdroj byl použit.
- Na křižovatce, kde trasa změní směr aspoň o *minimální úhel*, přidá odbočku (mírně, vlevo/vpravo, ostře, otočit se). Pozná i **rozcestí**, kde se cesta dělí do dvou podobných směrů, a přidá *Keep left / right at fork*, i když trasa jede skoro rovně. To je přesně případ, kdy hodinky obvykle žádný pokyn nedají.
- **Add missing turns** ponechá všechny existující waypointy a přidá jen nové. **Replace all turns** nejdřív smaže stávající odbočky a rozcestí a vypočítá je znovu. Kruhové objezdy, „rovně“, body zájmu a začátek/konec zůstávají vždy.
- **Minimum angle** (minimální úhel, výchozí 20°) a **Minimum spacing** (minimální rozestup, výchozí 15 m) jde změnit. Rozestup zabrání tomu, aby vznikly waypointy pár centimetrů od sebe.
- Návrh se nejdřív zobrazí na mapě jako náhled a zapíše se až po **Apply**. Jedno **Undo** ho celý vrátí.
- Změna parametru náhled smaže a zamkne **Apply**. Pro nový návrh stiskni znovu **Generate turns**; data o cestách už jsou načtená, takže je hned hotový.
- Kruhové objezdy a „rovně“ z tvaru sítě poznat nejde, ty případně přidej ručně.
- Generování napoprvé potřebuje internet. Načtení mapových dlaždic obvykle trvá sekundu nebo dvě. Když některý zdroj selže, aplikace automaticky zkusí další a ukazuje průběh; server Overpass bývá často vytížený, takže dostane až 3 pokusy. Když selže všechno, zkus později **Try again**.
- Stažená data o cestách kolem trasy si aplikace **uloží v prohlížeči na 30 dní**, takže další generování (i po znovuotevření aplikace nebo přidání waypointů) server nepotřebuje. **Refresh road data** je stáhne znovu, třeba když se mapa změnila.

## Uložení

- **Save** (Ctrl+S):
  - V Chrome a Edge na počítači přepíše otevřený soubor.
  - U trasy otevřené z URL se zeptá, kam uložit.
  - V ostatních prohlížečích a na telefonu se soubor stáhne.
- **Save as…** (Ctrl+Shift+S) se vždy zeptá na nový soubor.
- Když vzniká nový soubor (Save as… nebo stažení), jeho název se navrhne podle názvu trasy, například *Ranní okruh.gpx*.
- **Na telefonu**: Chrome na Androidu neumí soubory GPX sdílet do jiných aplikací. Soubor ulož a pak ho otevři ze *Stažených* v aplikaci Suunto. Kde prohlížeč sdílení souborů GPX umí, objeví se tlačítko **Share…**.

**Soubory se ukládají ve formátu aplikace Suunto.** Je to formát trasy sdílené z aplikace Suunto a u něj je ověřené, že na hodinkách funguje.

- **Soubor sdílený z aplikace Suunto zůstane přesně takový, jaký byl.** Aplikace mění jen waypointy (a body trasy, které přidáš). Všechno ostatní zůstane bajt po bajtu stejné.
- **Každý jiný soubor se při otevření převede**, třeba GPX export ze Suunto Routeplanneru nebo jiného plánovače, nebo track. Aplikace na převod upozorní a označí soubor jako *Modified*. Výsledek si ulož. Převedený soubor obsahuje:
  - jednu trasu (`<rte>`) se všemi body původních tras a tracků, každý s polohou a výškou;
  - waypointy v pořadí trasy od *Begin* po *End*, každý s výškou, názvem, popisem a typem. *Begin* a *End* se doplní, když je soubor nemá, stejně jako to dělá aplikace Suunto. Body trasy, které měly název nebo typ, se stanou samostatnými waypointy;
  - název trasy v metadatech.

  Všechno ostatní se vynechá: komentáře, rozšíření (včetně dat Suunto Routeplanneru, jako je `suunto-rp:waypointIndices`) a další údaje bodů.
- Nové waypointy dostanou výšku svého bodu trasy, stejně jako waypointy v souboru z aplikace Suunto.
- Soubor v jiném kódování než UTF-8 (například `windows-1250`) se načte správně a uloží jako UTF-8.

## Jak Suunto čte waypointy

Podle [specifikace tras Suunto](https://apizone.suunto.com/route-description) se waypoint naimportuje, jen když:

- je to `<wpt>` se **stejnými souřadnicemi jako některý bod trasy** (`rtept`/`trkpt`), nebo
- je to bod trasy, který má `name` nebo `type`.

První podmínka je nejčastější důvod, proč waypointy z ostatních souborů GPX při importu zmizí. AddTurn GPX waypointy vždy umisťuje na body trasy, souřadnice kopíruje přesně a upozorní na každý waypoint, který na bodu trasy neleží. Waypoint bez názvu dá pokyn bez jména. Waypoint bez typu se stane obecným *Waypoint*. Ověřeno v praxi na hodinkách: trasu navigovaly a ukazovaly vzdálenost k dalšímu pokynu.

## Na hodinkách

![Hodinky Suunto při navigaci po trase hlásí ostré odbočení vpravo za 10 m](docs/img/watch-navigation.jpg)

Při navigaci po trase hodinky hlásí pokyny ze souboru:

- **Modré pole dole**: blíží se waypoint. Ukazuje jeho ikonu (tady ostré odbočení vpravo) a vzdálenost k němu (10 m).
- **Pravé spodní pole**: zbývající vzdálenost k dalšímu waypointu.
- Ostatní pole (tep, tempo…) závisí na tom, jak máš nastavený displej hodinek.

**Nastavení hodinek:** v hodinkách **vypni** navigaci po trase, ale **zapni** upozornění na body zájmu (POI). Jinak se pokyny ze souboru nehlásí.

> **⚠ Nenaviguj trasu pozpátku.** Pokyny platí pro směr, ve kterém byla trasa naplánovaná. Když v hodinkách zvolíš průchod trasou v opačném směru, šipky ukazují špatně: z „odboč vpravo“ se při příjezdu z druhé strany stane odbočka vlevo. Chceš-li trasu jet obráceně, naplánuj ji nejdřív v tomto směru a pokyny přidej do ní.

## Instalace na telefon a provoz offline

Aplikaci jde nainstalovat jako běžnou aplikaci s vlastní ikonou a pak funguje i bez internetu. Mapové podklady a automatické generování internet potřebují dál.

Aplikace se vždy spustí hned z kopie uložené v zařízení, i při slabém signálu nebo bez něj. Nové verze se stahují na pozadí; když je nová verze připravená, objeví se lišta *New version available* – klepnutím na **Reload** se přepneš na novou verzi (otevřená trasa i úpravy zůstanou), ✕ ji odloží na příští spuštění.

- **Android (Chrome)**: otevři aplikaci a v menu ⋮ zvol instalaci aplikace (případně přidání na plochu).
- **iPhone / iPad (Safari)**: tlačítko Sdílet → přidat na plochu.

Pokud Chrome na Androidu hlásí *„This app is already installed“*, i když nainstalovaná není, nebo *„Could not open app“*, smaž v Chrome údaje o prohlížení (v nastavení ochrany soukromí, v anglickém Chrome *Delete browsing data*) a nainstaluj ji znovu.

## Data a soukromí

Aplikace nemá server ani uživatelské účty a nic nesleduje. Otevřená trasa, neuložené úpravy, nastavení a stažená data o cestách se ukládají jen v tvém prohlížeči, v tvém zařízení.

S jinými službami aplikace komunikuje jen kvůli těmto úkolům:

- **Mapové podklady**: OpenStreetMap, OpenTopoMap nebo Esri, podle zvolené mapy.
- **Open URL**: stáhne soubor z adresy, kterou zadáš.
- **Turns generator**: stáhne mapové dlaždice kolem trasy z [OpenFreeMap](https://openfreemap.org) nebo z [vektorových dlaždic OpenStreetMap](https://vector.openstreetmap.org), takže tyto služby uvidí oblast trasy. Teprve když selžou oba zdroje, pošle souřadnice trasy na [Overpass API](https://overpass-api.de).

## Klávesové zkratky

| Zkratka | Akce |
| --- | --- |
| Ctrl+Z | Zpět (Undo) |
| Ctrl+Y / Ctrl+Shift+Z | Znovu (Redo) |
| Ctrl+S | Uložit |
| Ctrl+Shift+S | Uložit jako… |
| Esc | Zavřít editor nebo kartu Turns generator |

Na Macu místo Ctrl použij Cmd.

## Licence a poděkování

- AddTurn GPX je pod licencí [GNU GPL v3](LICENSE).
- Mapová knihovna: [Leaflet](https://leafletjs.com) (BSD 2-Clause, `vendor/leaflet/LICENSE`).
- Ikony bodů zájmu: [Tabler Icons](https://tabler.io/icons) (MIT, `vendor/tabler-icons/LICENSE`).
- Mapová data a mapy:
  - © přispěvatelé [OpenStreetMap](https://www.openstreetmap.org/copyright) (ODbL)
  - [OpenTopoMap](https://opentopomap.org) (CC-BY-SA)
  - satelitní snímky © Esri (Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community)
- Data o křižovatkách: © přispěvatelé OpenStreetMap, přes [OpenFreeMap](https://openfreemap.org) (© [OpenMapTiles](https://openmaptiles.org)), [vektorové dlaždice OpenStreetMap](https://vector.openstreetmap.org) nebo [Overpass API](https://overpass-api.de).

## Pro vývojáře

- Celá aplikace je jeden soubor `index.html` (HTML, CSS a JavaScript) bez build kroku a bez závislostí kromě přiloženého Leafletu. `sw.js` je service worker pro provoz offline. Při každé změně souborů aplikace zvyš `CACHE_NAME`.
- Spouštěj ji přes HTTP, například `python3 -m http.server` ve složce projektu, a otevři `http://localhost:8000`. Při otevření přímo ze souboru (`file://`) OpenStreetMap mapové dlaždice blokuje.
- `samples/` obsahuje testovací soubory GPX: exporty ze Suunto, všechny typy odboček, kruhové objezdy a body zájmu, waypointy v bodech trasy, soubor ve `windows-1250` a vadné soubory.
- `tests/` obsahuje automatické testy. Spouštějí se příkazem `node tests/run.mjs tests/tiles.json tests/generator.json tests/editing.json tests/clicks.json tests/categories.json tests/offline.json`, viz [tests/README.md](tests/README.md).
- `docs/dev/` obsahuje vývojové poznámky: rozhodnutí o návrhu, postup a seznam úkolů.
