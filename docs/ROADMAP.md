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

**Aktuální projektová verze: 01.00.006**

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

## 5. Roadmapa – plánované a rozpracované oblasti

Následující seznam je pracovní přehled. Stav se musí změnit až podle skutečného postupu implementace.

| ID | Oblast | Cíl / další postup | Stav |
|---|---|---|---|
| R-001 | Základ aplikace | Základní layout je oddělen; každá další obrazovka se načítá z vlastního HTML a JS modulu až při otevření. Doplnit konfiguraci a bezpečné routování | ROZPRACOVÁNO |
| R-002 | Databáze | Navrhnout schéma, migrace a bezpečné připojení přes serverový `.env`; prefix načítat z `table_prefix` | PLÁN |
| R-003 | Pravidla Dámy | Sepsat a zavést jeden autoritativní zdroj úplných pravidel české dámy 8×8 | PLÁN |
| R-004 | Herní logika | Oddělit pravidla a výpočty tahů od vykreslování herní desky | PLÁN |
| R-005 | Herní rozhraní | Základní navigace a počáteční statická 2D deska jsou založeny; doplnit plnohodnotné UI a tahy | ROZPRACOVÁNO |
| R-006 | AI – základ | Navrhnout rozhodování AI nad legálními tahy podle autoritativních pravidel | PLÁN |
| R-007 | AI – vývojové prostředí | Vytvořit oddělené prostředí `dama-ai-vyvoj/` pro trénování, experimenty a vyhodnocování | PLÁN |
| R-008 | AI – učení | Připravit sběr partií, self-play, trénování, váhy a měření výkonnosti | PLÁN |
| R-009 | Testování | Zavést automatické testy pravidel, herní logiky, API a regresí | PLÁN |
| R-010 | Nasazení | Ověřit bezpečné automatické nasazení na Webzdarma bez přepsání `.env` | PLÁN |

## 6. Záznamy významných změn

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

- [Požadavky projektu](REQUIREMENTS.md)
- [Závazné pracovní pokyny pro AI](AI_WORK_INSTRUCTIONS.md)
- [Prostředí produkčního serveru](SERVER_ENVIRONMENT.md)
- [Struktura vývoje AI](AI_DEVELOPMENT_STRUCTURE.md)
