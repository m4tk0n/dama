# Roadmapa a verzovaný přehled změn projektu Dáma

Tento dokument je centrální evidence plánovaných postupů, důležitých rozhodnutí a významných změn v kódu projektu Dáma.

**Toto je závazný pracovní přehled projektu.** Při každé důležité změně kódu musí být odpovídající záznam doplněn nebo aktualizován. Záznam musí uvádět, co se změnilo, proč, kterých částí projektu se změna týká a jak byla ověřena.

## 1. Pravidla verzování

Používáme číselné označení ve formátu:

`MAJOR.MINOR.PATCH`

Počáteční verze: **01.00.000**

| Část | Význam | Kdy se zvyšuje |
|---|---|---|
| `MAJOR` | Hlavní etapa nebo zásadní změna architektury projektu | Při zahájení nové hlavní etapy nebo zásadní změně základní koncepce |
| `MINOR` | Nová funkční oblast, větší funkce nebo ucelený postup | Při přidání nové významné funkce či dokončení většího celku |
| `PATCH` | Menší důležitá změna, oprava, úprava nebo doplnění | Při každé samostatné významné změně kódu či dokumentace |

Pravidla číslování:

- Číslujeme postupně; verze se nikdy zpětně nepoužívají ani nepřepisují.
- Při zvýšení MAJOR se MINOR a PATCH nastaví na nulu.
- Při zvýšení MINOR se PATCH nastaví na nulu.
- Při zvýšení PATCH se zvýší pouze poslední část.
- Běžné drobné změny bez dopadu na funkčnost nemusí dostat vlastní verzi. Významné změny kódu však záznam dostat musí.
- Jedna verze označuje jeden ucelený balík změn. Pokud změna vyžaduje více commitů, všechny se uvedou u stejného záznamu.
- Číslo verze v tomto dokumentu je projektová evidence; samo o sobě nenahrazuje Git commit, Git tag ani verzi aplikace.

## 2. Stav položek roadmapy

Každá plánovaná nebo rozpracovaná položka používá jeden z těchto stavů:

- **PLÁN** – schválený záměr, zatím nezačala implementace.
- **ROZPRACOVÁNO** – implementace probíhá.
- **HOTOVO** – implementováno a ověřeno.
- **BLOKOVÁNO** – nelze pokračovat bez vyřešení uvedené překážky.
- **ZRUŠENO** – záměr se již nebude realizovat; důvod zůstává zaznamenán.

Položka se označí jako HOTOVO až po ověření. Samotné vytvoření souboru nebo úspěšný commit neznamená, že je funkce dokončená.

## 3. Povinný obsah záznamu změny

Každý významný záznam musí podle dostupnosti obsahovat:

1. Verzi a datum.
2. Název a stručný popis změny.
3. Důvod a očekávaný výsledek.
4. Dotčené soubory, moduly nebo části aplikace.
5. Vazby na pravidla, architekturu nebo jiné položky roadmapy.
6. Provedené testy a výsledek ověření.
7. Git commit SHA nebo odkaz na commit.
8. Stav: HOTOVO, pokud byla změna skutečně ověřena; jinak odpovídající stav.

U plánovaných položek se uvede očekávaný výsledek a závislosti. Nevyplněné údaje se nesmějí domýšlet.

## 4. Aktuální verze

**Aktuální projektová verze: 01.00.010**

<details>
<summary>Počáteční záznam – 01.00.000</summary>

- **Verze:** 01.00.000
- **Datum založení:** 2026-11-13
- **Název:** Zavedení centrální roadmapy a evidence změn
- **Stav:** HOTOVO
- **Popis:** Založena pravidla projektového verzování a centrální dokument pro evidenci plánů, rozhodnutí a významných změn.
- **Výsledek:** Každá další důležitá změna projektu bude mít dohledatelný záznam v tomto dokumentu.
- **Ověření:** Dokument uložen do GitHub repozitáře.

</details>

<details>
<summary>Verze 01.00.001 – Zavedení závazných pracovních pokynů pro AI</summary>

- **Datum:** 2026-11-13
- **Stav:** HOTOVO
- **Změna:** Vytvořen dokument `docs/AI_WORK_INSTRUCTIONS.md`, který stanovuje povinný postup AI při přípravě, implementaci, testování, verzování, nasazování a předávání práce.
- **Důvod:** Zajistit jednotný a opakovatelný pracovní postup při každém pokračování projektu, včetně nových chatů.
- **Dotčené soubory:** `docs/AI_WORK_INSTRUCTIONS.md`, `docs/ROADMAP.md`
- **Commit AI_WORK_INSTRUCTIONS.md:** `71f40045a980741e70f5a6be68ead34ad0042623`
- **Commit ROADMAP.md:** viz historie GitHubu.

</details>

### 01.00.002 – První aplikační kostra

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Přidána první navigační kostra aplikace, obrazovka vytvoření místní hry, výběr české dámy 8×8 a tří úrovní AI, počáteční statické vykreslení desky 8×8 a oddělené lazy načítání 2D stylů a vykreslovače. Založena počáteční specifikace požadavků a pravidla CSS údržby.
- **Důvod:** Zahájit implementaci po malých ověřitelných částech a současně udržet architekturu připravenou pro další varianty a 3D.
- **Dotčené soubory:** `index.php`, `assets/css/app.css`, `assets/css/board-2d.css`, `assets/js/app.js`, `assets/js/board-2d.js`, `install/README.md`, `docs/REQUIREMENTS.md`, `docs/AI_WORK_INSTRUCTIONS.md`, `docs/ROADMAP.md`
- **Ověření:** GitHub API potvrdilo zápisy do `main`. Lokálně prošla kontrola syntaxe `php -l index.php`, `node --check assets/js/app.js` a `node --check assets/js/board-2d.js`. GitHub Actions: FTP synchronizace proběhla úspěšně, ale následný krok kontroly serverového diagnostického endpointu selhal; živé zobrazení proto není potvrzeno. Herní tahy, pravidla a AI zatím nejsou implementovány.
- **Commity:** `cc36d2aae472b129c048e82f6e7eb8457faa9caf`, `906ae6223519d9561f92fdfe14529f83db33c467`, `fc368e4590eadf2829f4b85899981faec8973c8d`, `6f9ce1a48efca7241a979a28947267e6cfd595da`, `c7fb3a9fffda1c836a230695b4b5c673200e8bd6`, `abaac27ab7330c2a2a976c5cc305ae23f00564c9`, `63f77b122a8c22b05e46bb0334db9c85ae3c875a`, `dea4c452bb10807906b99787cbe75442ed819684`, `3ba913c672fe801f60af457a0f505cd70c2eebaa`, `f0ba880a3d57bb9e87e8d84cb724b02978234ff3`, `6509fb5c5b8952e9746159c2915ddc8755d6dcb5`

### 01.00.010 – Přepis pravidel variant dostupných na české Wikipedii

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Do samostatných dokumentů pravidel byly přeneseny informace z článku české Wikipedie pro Klasickou, Žravou, Českou podle ČFD, Českou dle Zapletala, Anglickou, Mezinárodní, Brazilskou a Španělskou dámu. U každé varianty je odděleno, co zdroj skutečně uvádí a co v něm chybí. Registr variant a požadavky byly opraveny tak, aby neoznačovaly pouhý seznam názvů za úplná pravidla.
- **Důvod:** Mít pravidla z dostupného zdroje zapsaná v projektu a zabránit domýšlení údajů, které článek neobsahuje.
- **Dotčené soubory:** `docs/RULES_CLASSIC.md`, `docs/RULES_GIVEAWAY.md`, `docs/RULES_CZECH.md`, `docs/RULES_CZECH_ZAPLETAL.md`, `docs/RULES_ENGLISH.md`, `docs/RULES_INTERNATIONAL.md`, `docs/RULES_BRAZILIAN.md`, `docs/RULES_SPANISH.md`, `docs/GAME_VARIANTS.md`, `docs/REQUIREMENTS.md`, `docs/ROADMAP.md`
- **Zdroj:** https://cs.wikipedia.org/wiki/Dáma_(desková_hra)
- **Ověření:** Obsah článku byl zkontrolován včetně oddílů pro osm variant s pravidlovým popisem a oddílu „Další varianty“, který uvádí pouze názvy. Byla provedena kontrola zápisů dokumentace do větve `main`. Automatické testy a deployment této dokumentační změny zatím nebyly ověřeny.
- **Commity pravidel:** `f9a4212f905df05998877246e0e92c13f3e49e19`, `4549b8f908ef90cdecc8053afa9ca358e44cc0a5`, `df12549730a2dc589a69099c36b06d07a4e008a6`, `8e315be49172edc44f42194a726f86d4224f7dce`, `92f61153f3d4b1df6b03c349243a48d32a056520`, `5b15ace2e5205fe62e2f74397a41b6860acd0e4b`, `945f644335d0d6e97ed18248eabd3cefef000a19`, `e5ccfde7418dce9fe5b30e1880efad9867ec68dc`

## 5. Roadmapa – plánované a rozpracované oblasti

Následující seznam je pracovní přehled. Stav se musí změnit až podle skutečného postupu implementace.

| ID | Oblast | Cíl / další postup | Stav |
|---|---|---|---|
| R-001 | Základ aplikace | Základní layout je oddělen; každá další obrazovka se načítá z vlastního HTML a JS modulu až při otevření. Doplnit konfiguraci a bezpečné routování | ROZPRACOVÁNO |
| R-002 | Databáze | Navrhnout schéma, migrace a bezpečné připojení přes serverový `.env`; prefix načítat z `table_prefix` | PLÁN |
| R-003 | Pravidla Dámy | Autoritativní pravidla české dámy 8×8 jsou sepsána v `docs/RULES_CZECH.md`; doplnit pravidla remízy a jejich testy | ROZPRACOVÁNO |
| R-004 | Herní logika | Základní engine `assets/js/game-engine.js` počítá legální tahy, povinné braní, vícenásobné braní, prioritu dámy, proměnu a konec hry; doplnit další hraniční případy a remízu | ROZPRACOVÁNO |
| R-005 | Herní rozhraní | 2D deska 8×8 podporuje výběr figurky, zvýraznění legálních cílů, vizuální zvednutí a provedení tahu; doplnit další herní ovládání a ověření na zařízení | ROZPRACOVÁNO |
| R-006 | AI – základ | Navrhnout rozhodování AI nad legálními tahy podle autoritativních pravidel | PLÁN |
| R-007 | AI – vývojové prostředí | Vytvořit oddělené prostředí `dama-ai-vyvoj/` pro trénování, experimenty a vyhodnocování | PLÁN |
| R-008 | AI – učení | Připravit sběr partií, self-play, trénování, váhy a měření výkonnosti | PLÁN |
| R-009 | Testování | Zavést automatické testy pravidel, herní logiky, API a regresí | PLÁN |
| R-010 | Nasazení | Ověřit bezpečné automatické nasazení na Webzdarma bez přepsání `.env` | PLÁN |
| R-011 | Variantní architektura | Všech 16 pojmenovaných variant z Wikipedie má samostatnou položku ve výběru a vlastní pravidla, rozestavení, engine a testy; sdílet pouze vykreslení desky, kamenů a obecné ovládání | ROZPRACOVÁNO |

## 6. Záznamy významných změn

### 01.00.009 – Kompletní výběr variant z české Wikipedie

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Výběr místní hry obsahuje všech 16 pojmenovaných variant uvedených v článku české Wikipedie. Každá má samostatné ID a vlastní soubor pravidel nebo osnovu. Herní obrazovka spustí pouze implementovanou Českou dámu podle ČFD; Mezinárodní dáma zůstává testovacím náhledem a ostatní varianty zobrazí informaci o chybějícím enginu, místo aby nesprávně použily česká pravidla.
- **Důvod:** Zobrazit kompletní katalog variant a zabránit záměně pouhé dostupnosti ve výběru za dokončenou implementaci.
- **Dotčené soubory:** pages/create.html, assets/js/screens/game.js, docs/GAME_VARIANTS.md, docs/REQUIREMENTS.md, docs/AI_WORK_INSTRUCTIONS.md, docs/ROADMAP.md a samostatné osnovy pravidel nových variant.
- **Zdroj katalogu:** https://cs.wikipedia.org/wiki/Dáma_(desková_hra)
- **Ověření:** GitHub Actions run [43411252517](https://github.com/m4tk0n/dama/actions/runs/43411252517) úspěšně dokončil kontrolu syntaxe PHP/JavaScriptu, automatické testy, FTP synchronizaci a HTTP health check.
- **Commity:** `b63bc3b68e9648a9fe035a90bdf6f171666a9ff1` (výběr), `64e34c03f83030fb6630318fc0a2e95452b129a3` (ochrana enginu), `1b97ef79595d339a23b66acba0b4adff5506dc0c` (registr), `8fdd15d6e54469c279017ff40b214d19c1ecf70f` (požadavky), `e5b854c73ffa74e17093d05ce1475ebb59b1ac87` (pokyny), `d59a8230383d70c09fe349899671b9ff6becb054` (roadmapa) a commity samostatných osnov pravidel.
- **Ověření:** GitHub Actions run [43411252517](https://github.com/m4tk0n/dama/actions/runs/43411252517) úspěšně dokončil kontrolu syntaxe PHP/JavaScriptu, všech automatických testů, FTP synchronizaci a HTTP health check.

### 01.00.008 – Oddělení čtyř herních variant

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Architektura projektu je nově výslovně rozdělena na čtyři samostatné varianty: Klasická, Žravá, Česká a Mezinárodní dáma. Každá varianta musí mít vlastní pravidla, počáteční rozestavení, herní engine a testy. Společné zůstává pouze technické vykreslení desky, vzhled kamenů, obecné ovládání, animace a prezentace stavu.
- **Důvod:** Zabránit přenášení pravidel jedné varianty do jiné a umožnit jejich nezávislý vývoj.
- **Dotčené soubory:** docs/GAME_VARIANTS.md, docs/AI_WORK_INSTRUCTIONS.md, docs/REQUIREMENTS.md, docs/ROADMAP.md
- **Ověření:** Provedena kontrola návaznosti dokumentace a aktuální implementace. Herní kód zatím nebyl rozdělen do variantních modulů; současný assets/js/game-engine.js zůstává enginem české dámy. Klasická a Žravá pravidla je nutné ještě přesně specifikovat. Automatické testy a nasazení této dokumentační změny budou ověřeny po commitu.
- **Commity:** `0ccbd3d6cb97b38d13c28624616933a859a9fab9`, `7535d52f5c8fd5301428f6d75daa4163b5144829`, `f3c6c81f0cba82b8789350e4b1fa6bec97a5a480`, `07651f25e8dae86a7eb19812002c6d6a76a16e56`, `3414834404d7438db5d79d45838554cac3a2a456`, `eb663b768fe7e60f68fab43a4f8a2358946a0e8f`, `12b66a4ad2142961f0306728ef907a5c04a36861`, `37ba905ca1ef6a5a5d0523795b9f6d87f476d2fd`
- **Ověření dokumentace:** Znovu načteny všechny čtyři variantní soubory pravidel a registr variant z `main`; tři nové soubory jsou záměrně označené jako neúplné. Žádná pravidla nebyla domyšlena.
- **Testy:** Nebyl měněn aplikační kód; automatické herní testy nebyly pro tuto dokumentační změnu spuštěny.

### 01.00.007 – Interaktivní česká dáma 8×8 a herní engine

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Přidán samostatný herní engine pro českou dámu 8×8 a oddělený autoritativní dokument pravidel. Hráč vybírá figurku kliknutím, vybraná figurka se opticky zvedne, legální cíle se zvýrazní a kliknutím na cíl se tah provede. Podporováno je povinné braní, vícenásobné braní, priorita braní dámou, létající dáma, proměna kamene, odstranění braných figur po dokončení sekvence a výhra při ztrátě všech figur nebo zablokování.
- **Důvod:** Převést statický náhled desky na skutečně ovladatelnou hru a oddělit výpočty pravidel od vykreslování.
- **Dotčené soubory:** `assets/js/game-engine.js`, `assets/js/board-2d.js`, `assets/js/screens/game.js`, `assets/css/board-2d.css`, `pages/game.html`, `index.php`, `tests/game-engine.test.mjs`, `.github/workflows/deploy.yml`, `docs/RULES_CZECH.md`, `docs/REQUIREMENTS.md`, `docs/AI_WORK_INSTRUCTIONS.md`, `docs/ROADMAP.md`
- **Omezení:** 10×10 zůstává pouze statickým náhledem. AI není implementována; při volbě režimu AI lze prozatím ovládat obě barvy ručně. Automatické rozpoznávání remízy zatím není implementováno.
- **Ověření:** GitHub Actions run `43408776973` úspěšně provedl PHP lint, syntaktickou kontrolu JavaScriptu, všech 8 automatických testů (8 úspěšných, 0 chybných), FTP synchronizaci a HTTP health check (200). Vizuální ověření ovládání na mobilu ještě čeká.
- **Commity:** `f37840b2f07431f20c2293a01eb8448bdf45104d`, `acf0731f06c0e689e5baf1f0ada9235b6c3f5f1f`, `45a72411dc8450a0ff95677edbe2ca73c4b49bc7`, `8fb40792d7883f814d94fb480d42b266a21769f4`, `f9853070afe3615d255ca57e174cf599bf8351ae`, `cc70d94980d3deb9fd1c9be1a7dbd1b83a98ed82`, `7e480c7e8d8ad635f20a2d0462e807e387f7dc99`, `e148e936783b0264989bae9e13aaefb1961aa6fc`, `5c4456d152f8cb85a902b06aa8ad50d3b833ca84`, `df921c77e658eb8880fee12f99c72c6a40396148`, `29eebd5a0e41db8e473809a068a01b6d88e8da05`, `a85aa7ea4dde5684b17dfa12e25789da23c41afd`, `dead347b7e073f9d27626eaf54554dc3cc312c0b`, `2386934e9c589d1ed0f31c482382f50586b9cc16`

### 01.00.006 – Dočasné zpřístupnění náhledu desky 10×10

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** Ve výběru místní hry je aktivní volba Mezinárodní dáma 10×10 – test zobrazení. Vybraná varianta se předává do herní obrazovky a renderer vykreslí mřížku 10×10 se čtyřmi úvodními řadami kamenů na každé straně. Nadpis a popis obrazovky rozlišují testovací náhled.
- **Omezení:** Jde pouze o vizuální test desky. Pravidla mezinárodní dámy, validace tahů, herní logika a AI pro 10×10 nejsou implementované.
- **Důvod:** Umožnit uživateli otestovat velikost a zobrazení desky 10×10 bez předstírání, že je varianta plně hratelná.
- **Dotčené soubory:** `pages/create.html`, `assets/js/screens/create.js`, `assets/js/screens/game.js`, `assets/js/board-2d.js`, `docs/REQUIREMENTS.md`, `docs/ROADMAP.md`
- **Ověření:** Čeká na GitHub Actions a vizuální kontrolu na zařízení.
- **Commity:** `08aa22e87c57775e93ea84b261484f4ad801c44a`, `e8ab3b648e69d844ab23567c99332f81bef8c1cc`, `0ae3b5e41452e9ceb3f4e6fd237773b94b697115`, `2f3a857a94ee00a40d0398f2346646c2274e21a7`, `ddc79f8f1354ae5f1b79f68ff170c6a7a3efb448`

### 01.00.005 – Stejné rozměry všech políček 2D desky

- **Datum:** 2026-11-13
- **Stav:** ROZPRACOVÁNO
- **Změna:** 2D deska má explicitně definovaných osm stejně vysokých řad i osm stejně širokých sloupců. Výška desky se odvozuje od její šířky pomocí poměru stran 1:1; výška okolního prostoru ji neroztahuje.
- **Důvod:** Zajistit, aby všech 64 políček bylo přesně čtvercových na mobilu i desktopu.
- **Dotčené soubory:** `assets/css/board-2d.css`, `docs/REQUIREMENTS.md`, `docs/ROADMAP.md`
- **Ověření:** Čeká na kontrolu GitHub Actions po commitu.
- **Commity:** CSS `fae4b0cafa2cb6a956dd28356f51da7167bb0c9b`, požadavky `518eaa1e4372b6265443c247d46a7e2228478b48`

Nejnovější záznam patří vždy nahoru. Starší záznamy se nemažou; v případě chyby se přidá opravný záznam.

### 01.00.004 – Skutečné oddělení obrazovek a načítání na vyžádání

- **Datum:** 2026-11-13
- **Stav:** HOTOVO
- **Změna:** `index.php` obsahuje pouze základní layout, navigaci a prázdný kontejner. I úvodní obrazovka má vlastní HTML soubor v `pages/` a vlastní JS modul v `assets/js/screens/`; stejně tak každá další obrazovka. Malý `app.js` stáhne HTML a importuje modul až při otevření obrazovky; opakované otevření může využít cache. Hra načítá 2D CSS a renderer až při otevření herní obrazovky. Verze odložených souborů se odvozují z jejich vlastního `filemtime()`.
- **Důvod:** Zabránit stahování a parsování obsahu a logiky všech obrazovek při prvním otevření aplikace. Zachovat přehledné oddělení obrazovek a připravit architekturu pro pozdější samostatné herní moduly.
- **Dotčené soubory:** `index.php`, `assets/js/app.js`, `assets/css/app.css`, `assets/js/screens/*.js`, `pages/*.html`, `.github/workflows/deploy.yml`, `docs/AI_WORK_INSTRUCTIONS.md`, `docs/REQUIREMENTS.md`, `docs/ROADMAP.md`
- **Commity:** `ffe574508f6c3d142a0fba2d22209d34d72f5acc`, `4c5dcb3e5bf415f2624ee5bd788a1c7eac82fecc`, `b087a63552584f684d714a70a7e4cf61c6bbda75`, `51c84c40f7502f5a87fc37da54775069335f405d`, `441a069d0d838fe4de4c57acd03cab7ba48e05b2`, `301f46dd6d6cca78d9afc013387e895f06112cc0`, `593eda41f5b637f6eed4f840517b57724850c7fe`, `49d5bf2796f6637272c86f26e667f0f39071c498`, `af45a485cfb3e51e7ab19404dc5706751e99bb3d`, `a7615af97bc94e7aeed3f2341562e73635d37ecc`, `d8c90f380aeb6da32ba222c39d059bca40f98542`, `1fdcbe6b8538684458755652175fecfa61183b81`, `b85db3401a354ba3f835571a48e6b0620a2270e3`, `c05e6abc822a7d8d4e2e88df48fa612b5e4d1a44`, `22cd498406eef93dae83a2d996277d5c9544e347`, `01a53372d8fc33b1509a1d9ed41eb9af72c8e60a`, `faf1faeff16724d193a0a26473c226613ecd7251`, `eb19db7055e817c4e541462d4db97ddf4e2ce943`, `e8c69a6abda058275035d6d557ced4bd26c90849`, `6c165c7858e73ef37bb6c7749bc65ff141ed427c`, `833ea85d1b9d73b5326a04f125e0ea5a346d5f97`, `151cdf2875fface4f175f6cd11c6dd8161416708`, `7bf7f4ce1eb94a7392c2ef0c73ba28e5af803b0a`, `c0e87c1efef3dc75658a4b8d7623fdfd0d665d00`
- **Ověření:** GitHub Actions run `43407168651` úspěšně provedl PHP lint, syntaktickou kontrolu všech JavaScriptových modulů, FTP synchronizaci a HTTP health check (HTTP 200 a očekávaný titulek aplikace).

### 01.00.003 – Automatické verzování assetů podle filemtime

- **Datum:** 2026-11-13
- **Stav:** HOTOVO
- **Změna:** Verzování hlavního CSS a JavaScriptu i odloženě načítaných souborů podle času poslední změny konkrétního souboru pomocí PHP `filemtime()`.
- **Dotčené soubory:** `index.php`, `assets/js/app.js`
- **Commity:** `847100466e8fd5ca6a05f0da3584e81e3aaa9b9c`, `1152714277f674791722e2ae8285db2267a9fd47`
- **Ověření:** FTP synchronizace i krok `Verify deployed application` proběhly úspěšně v GitHub Actions run `43406664668`.

### 01.00.000 – Zavedení roadmapy a verzování

- **Datum:** 2026-11-13
- **Stav:** HOTOVO
- **Změna:** Vytvořena centrální roadmapa a pravidla verzování projektu.
- **Dotčené soubory:** `docs/ROADMAP.md`
- **Ověření:** Dokument vytvořen v repozitáři.
- **Commit:** viz historie GitHubu – commit, kterým byl tento dokument založen.

## 7. Povinný pracovní postup při změně projektu

1. Před implementací zkontrolovat roadmapu a související pravidla.
2. U nové funkce nebo většího úkolu založit či aktualizovat položku roadmapy.
3. Implementovat změnu v odpovídajících souborech.
4. Spustit relevantní testy a zaznamenat skutečný výsledek.
5. Přidělit další projektovou verzi podle pravidel verzování.
6. Zapsat verzi, popis, dotčené soubory, ověření a commit SHA do tohoto dokumentu.
7. Teprve po ověření označit jako HOTOVO.

**Bez aktualizace tohoto dokumentu není významná změna projektu řádně zdokumentovaná.**

## 8. Související dokumentace

- [Přehled herních variant a jejich architektura](GAME_VARIANTS.md)
- [Požadavky projektu](REQUIREMENTS.md)
- [Závazné pracovní pokyny pro AI](AI_WORK_INSTRUCTIONS.md)
- [Prostředí produkčního serveru](SERVER_ENVIRONMENT.md)
- [Struktura vývoje AI](AI_DEVELOPMENT_STRUCTURE.md)
