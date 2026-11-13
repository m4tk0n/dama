# Závazné pracovní pokyny pro AI – projekt Dáma

Tento dokument stanovuje, jak má AI postupovat při každé práci na projektu Dáma. Pokyny platí při pokračování v tomto chatu i při zahájení práce v novém chatu. Jsou závazné spolu s ostatní projektovou dokumentací.

## 1. Hierarchie zdrojů

Přednost mají v tomto pořadí:

1. Výslovné aktuální zadání uživatele pro právě řešený úkol.
2. Autoritativní pravidla a technická rozhodnutí uložená v dokumentaci projektu.
3. Aktuální implementace v repozitáři na větvi `main`.
4. Roadmapa a historie změn.

Pokud si zadání, dokumentace a kód odporují, AI nesmí rozpor potichu vyřešit odhadem. Musí určit konkrétní rozpor, upozornit na něj a vyžádat si rozhodnutí, pokud jej nelze jednoznačně vyřešit z novějšího výslovného pokynu uživatele.

## 2. Povinná příprava před prací

Před každým novým úkolem, který se týká projektu:

1. Ověřit, že pracuje v repozitáři `m4tk0n/dama` a na správné větvi.
2. Načíst tento dokument `docs/AI_WORK_INSTRUCTIONS.md`.
3. Načíst aktuální `docs/ROADMAP.md`.
4. Podle úkolu načíst související dokumentaci, zejména:
   - `docs/SERVER_ENVIRONMENT.md` při práci se serverem, PHP, databází, konfigurací nebo nasazením.
   - `docs/AI_DEVELOPMENT_STRUCTURE.md` při práci s AI, trénováním, vahami, modely nebo daty.
   - `docs/REQUIREMENTS.md` při práci na funkcích, rozhraní nebo architektuře aplikace.
5. Zkontrolovat aktuální stav dotčených souborů a související implementace na `main`. Nespoléhat na staré výpisy, předchozí odpovědi ani předpoklad, že se repozitář nezměnil.
6. Zkontrolovat relevantní historii commitů nebo testů, pokud je to potřebné pro bezpečné pokračování.

Pokud některý dokument nebo soubor není dostupný, AI to musí uvést a nesmí předstírat, že jej načetla.

## 3. Plánování a rozsah práce

- Nejprve určit, co přesně má být výsledkem úkolu.
- Rozdělit větší práci na malé, ověřitelné kroky.
- Zachovat stávající funkční části a architekturu, pokud uživatel výslovně neschválí jejich změnu.
- Neprovádět nesouvisející úpravy, hromadné přepisy ani kosmetické změny bez důvodu.
- Nezakládat duplicitní zdroje pravidel, konfigurace ani logiky.
- Pokud existuje autoritativní dokument nebo modul, rozšiřovat jej místo vytváření druhé konkurenční verze.
- Při nejasnosti, která může změnit pravidla hry, architekturu, data nebo chování aplikace, nejprve vyžádat rozhodnutí uživatele.

## 4. Implementace

- Pokud uživatel žádá o provedení změny a dostupné nástroje to umožňují, změnu skutečně provést v repozitáři; neomezit odpověď na návrh nebo ukázkový kód.
- Před úpravou souboru načíst jeho aktuální obsah a při aktualizaci použít aktuální SHA.
- Měnit pouze nezbytné části a zachovat nesouvisející obsah.
- Dodržovat kompatibilitu s ověřeným produkčním prostředím uvedeným v `SERVER_ENVIRONMENT.md`.
- Nikdy nepoužívat `putenv()`.
- Nikdy nezveřejnit, nevypsat, necommitovat ani nepřepsat produkční tajemství nebo obsah `.env`.
- Při nasazení vždy zachovat pravidla ochrany a vyloučení `.env`.
- Neodstraňovat soubory ani funkce bez jasného důvodu a opory v zadání.
- Nevkládat do projektu diagnostický nebo testovací kód, který by se spouštěl běžným uživatelům, pokud to není výslovně zamýšleno.
- U změn AI respektovat oddělení vývojového/trénovacího prostředí a produkční AI podle `AI_DEVELOPMENT_STRUCTURE.md`.

### 4.1 CSS, JavaScript a načítání

- CSS se nesmí nekontrolovaně rozrůstat. Před vytvořením nového CSS souboru zkontrolovat, zda lze úpravu provést v existujícím souboru.
- Přednostně upravovat původní pravidla a odstraňovat duplicity, překryvy a nepoužívané styly; nepřidávat opakované přepisovací vrstvy.
- Nový CSS soubor vytvořit jen pro jasně oddělenou funkční oblast nebo samostatně načítanou část, pokud to skutečně zlepšuje architekturu.
- Společné vizuální hodnoty držet v centrálních CSS proměnných.
- 2D a 3D styly i vykreslování musí zůstat oddělené. Společné styly smějí obsahovat pouze skutečně společné prvky.
- 3D CSS a JavaScript se nesmějí načítat při používání 2D. Načítat pouze prostředky potřebné pro aktuální obrazovku a režim.
- Stejná zásada platí pro JavaScript a PHP: nezdvojovat funkce ani moduly, nepřidávat nové soubory bez důvodu a uklízet nepoužívaný kód.
- Výkon a malá velikost aplikace mají přednost před nadměrným dělením do mnoha drobných souborů.

### 4.2 Povinné oddělení obrazovek a skutečný lazy loading

- `index.php` smí obsahovat pouze základní HTML dokument a společnou kostru aplikace (hlavičku, navigační prvky, prázdný hlavní kontejner, patičku). Nesmí obsahovat HTML žádné obrazovky včetně úvodní; i úvodní obrazovka se načte jako samostatná stránka po spuštění navigátoru.
- Do `index.php` se nesmějí vkládat HTML obsahy dalších obrazovek, dialogů ani herní plochy.
- Každá samostatná obrazovka včetně úvodní musí mít vlastní HTML soubor v `pages/` a vlastní JavaScriptový modul v `assets/js/screens/`. HTML se stáhne a modul se importuje až při otevření dané obrazovky.
- `assets/js/app.js` je pouze malý spouštěč/navigátor. Nesmí obsahovat logiku jednotlivých obrazovek ani herní logiku.
- Obrazovky se nesmějí předem načítat skrytě ani vkládat všechny do jednoho PHP/HTML/JS souboru.
- HTML a modul konkrétní obrazovky se mají načítat až při otevření dané obrazovky. Opakované otevření může využít již načtený obsah a modul z cache.
- Herní obrazovka načítá vykreslování a herní prostředky až při spuštění hry. AI se načte pouze pro hru proti AI. 2D a 3D prostředky se načítají pouze pro zvolený režim zobrazení.
- Verze všech odloženě načítaných HTML, CSS a JS souborů se generují podle jejich vlastního `filemtime()`, aby se po změně obnovila cache.
- Nové obrazovky nesmějí být přidávány zpět do `index.php` ani jejich logika do centrálního `app.js`. Výjimku tvoří pouze skutečně globální chování aplikace.

## 5. Varianty hry a architektura pravidel

Projekt obsahuje čtyři samostatné herní varianty:
- Klasická dáma (classic).
- Žravá dáma (giveaway).
- Česká dáma (czech).
- Mezinárodní dáma (international).

Každá varianta musí mít vlastní úplný a autoritativní dokument pravidel, vlastní počáteční rozestavení a vlastní herní engine. Pravidla jedné varianty se nikdy nesmějí automaticky použít pro jinou variantu. Přehled variant, jejich stav a vazby na dokumentaci určuje docs/GAME_VARIANTS.md.

### Oddělení společné a variantní části
- Společné jsou pouze technické komponenty: vykreslení herní desky, vykreslení kamene, obecné ovládání, animace a prezentace stavu.
- Vykreslovač přijímá rozměry desky, její konfiguraci a stav partie. Nesmí určovat legální tahy, povinné braní, proměnu ani konec hry.
- Vzhled jednoho kamene je společný; renderer musí umět zobrazit jeho vlastnosti (strana, obyčejný kámen/dáma) podle dat varianty.
- Každá varianta samostatně určuje rozměr a geometrii desky, aktivní políčka, počet hráčů a kamenů, počáteční rozestavení, pohyb, braní, proměnu, pokračování tahu, vítězství a remízu.
- Každá varianta má vlastní engine a vlastní testovací sadu. Sdílet lze pouze obecné technické pomocné funkce, které samy neobsahují pravidlová rozhodnutí.
- AI musí znát a používat pravidla právě zvolené varianty. Strategie a vyhodnocovací parametry AI se nesmějí zaměňovat mezi variantami.
- Lokální hra, AI, ukládání a online hra musí vždy nést jednoznačný identifikátor varianty a používat její engine.
- Uložená partie musí zachovat identifikátor varianty a verzi pravidel, podle kterých byla vytvořena.

### Povinné rozdělení zdrojů
- Dokumentace: docs/RULES_CLASSIC.md, docs/RULES_GIVEAWAY.md, docs/RULES_CZECH.md, docs/RULES_INTERNATIONAL.md.
- Variantní implementace: assets/js/variants/{variant-id}/setup.js a engine.js.
- Společné vykreslování a ovládání zůstává v assets/js/core/ nebo ve stávajících společných modulech podle aktuální struktury.
- Stávající assets/js/game-engine.js je současná implementace české dámy; nesmí být považován za univerzální engine. Při oddělení variant se přesune nebo nahradí variantním modulem české dámy bez změny pravidel.

Každá změna pravidel musí být promítnuta do dokumentu příslušné varianty, jejího enginu a testů. Pokud pravidla nejsou jednoznačně potvrzena, AI je nesmí domýšlet ani kopírovat z jiné varianty.

## 6. Testování a ověřování

- Po každé změně spustit nejvhodnější dostupné testy, kontroly syntaxe nebo CI workflow.
- Při změně herních pravidel nebo logiky ověřit také související hraniční případy a regrese.
- Při opravě chyby ověřit původní chybový scénář, nejen to, že kód projde kompilací nebo syntaxí.
- Pokud testy selžou, zjistit příčinu a opravit ji, pokud to spadá do rozsahu úkolu.
- Pokud test nelze spustit, výslovně uvést proč a co nebylo ověřeno.
- Rozlišovat mezi stavem „změna zapsána“, „test prošel“, „nasazení proběhlo“ a „funkčnost ověřena na živém webu“. Tyto stavy nejsou zaměnitelné.
- Nikdy neoznačit neověřenou změnu jako HOTOVO.

## 7. GitHub, commity a nasazení

- Preferované cílové umístění dokončených změn je větev `main`, protože je napojena na automatické nasazení.
- Před zápisem ověřit aktuální stav větve a souborů.
- Používat výstižné commit zprávy.
- Po commitu ověřit výsledek a podle potřeby stav GitHub Actions.
- Pokud zápis do `main` není bezpečný nebo jej nelze provést, neprovádět jej naslepo. Uvést překážku a navrhnout bezpečný postup.
- Úspěšný commit sám o sobě nepotvrzuje úspěšné nasazení.
- O živém nasazení nebo funkčnosti na serveru tvrdit pouze to, co bylo skutečně ověřeno.

## 8. Roadmapa a projektové verzování

Při každé významné změně:

1. Zkontrolovat `docs/ROADMAP.md`.
2. Podle rozsahu určit další projektovou verzi ve formátu `MAJOR.MINOR.PATCH`; nikdy nepoužít již přidělené číslo.
3. Zapsat datum, název, důvod, popis, dotčené soubory, testy a jejich skutečné výsledky.
4. Doplnit commit SHA, jakmile je znám.
5. Aktualizovat stav příslušné položky roadmapy.
6. Označit HOTOVO pouze tehdy, když je změna skutečně ověřena.

Drobné změny bez významného dopadu nemusí mít samostatnou verzi. Významné změny kódu nebo dokumentace musí být dohledatelné. Starší záznamy se nemažou; opravy se zapisují novým záznamem.

## 9. Práce v novém chatu a předání

Na začátku práce v novém chatu AI nesmí předpokládat, že si pamatuje poslední stav projektu. Musí znovu načíst tento dokument, roadmapu, související dokumentaci a aktuální stav repozitáře.

Při předání práce musí stručně uvést:
- co bylo změněno,
- které soubory byly dotčeny,
- jaké testy proběhly a s jakým výsledkem,
- zda byl vytvořen commit a jeho SHA,
- zda bylo ověřeno nasazení,
- co zůstává nedokončené nebo neověřené.

## 10. Komunikace s uživatelem

- Odpovídat přímo a věcně.
- Nezaměňovat plán, návrh, provedenou změnu a ověřený výsledek.
- Neopakovat stále návrhy, pokud uživatel žádá skutečnou implementaci a nástroje ji umožňují.
- Neprovádět zásadní rozhodnutí za uživatele, pokud zadání připouští více odlišných řešení.
- Nezahlcovat uživatele dlouhými průběžnými výpisy; předávat malé a konkrétní výsledky.
- Přiznat omezení nástrojů nebo chybějící přístup. Nikdy netvrdit, že byla provedena operace, která ve skutečnosti neproběhla.

## 11. Povinná kontrola před dokončením úkolu

Před oznámením dokončení ověřit:

- [ ] Změna odpovídá aktuálnímu zadání.
- [ ] Byla respektována závazná dokumentace.
- [ ] Nebyly nechtěně změněny nesouvisející funkce.
- [ ] Byly spuštěny relevantní testy nebo je popsáno, proč to nebylo možné.
- [ ] Roadmapa a projektová verze byly aktualizovány, pokud to rozsah vyžaduje.
- [ ] Commit a jeho SHA jsou ověřené, pokud byl vytvořen.
- [ ] Stav nasazení je popsán pravdivě.
- [ ] V odpovědi jsou jasně odděleny hotové, neověřené a zbývající části.

---

**Základní pravidlo:** AI má na projektu Dáma postupovat podle této dokumentace, nejprve ověřovat skutečný stav, následně provádět požadované změny, testovat je a zaznamenávat. Nesmí vydávat domněnky za fakta ani tvrdit, že něco udělala, pokud to neprovedla.
