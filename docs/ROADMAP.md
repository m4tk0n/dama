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

## 5. Roadmapa – plánované a rozpracované oblasti

Následující seznam je pracovní přehled. Stav se musí změnit až podle skutečného postupu implementace.

| ID | Oblast | Cíl / další postup | Stav |
|---|---|---|---|
| R-001 | Základ aplikace | Připravit vstupní bod aplikace, konfiguraci a základní strukturu PHP projektu | PLÁN |
| R-002 | Databáze | Navrhnout databázové schéma a bezpečné připojení přes serverový `.env` | PLÁN |
| R-003 | Pravidla Dámy | Sepsat a zavést jeden autoritativní zdroj pravidel hry | PLÁN |
| R-004 | Herní logika | Oddělit pravidla a výpočty tahů od vykreslování herní desky | PLÁN |
| R-005 | Herní rozhraní | Připravit uživatelské rozhraní a vykreslování desky | PLÁN |
| R-006 | AI – základ | Navrhnout rozhodování AI nad legálními tahy podle autoritativních pravidel | PLÁN |
| R-007 | AI – vývojové prostředí | Vytvořit oddělené prostředí `dama-ai-vyvoj/` pro trénování, experimenty a vyhodnocování | PLÁN |
| R-008 | AI – učení | Připravit sběr partií, self-play, trénování, váhy a měření výkonnosti | PLÁN |
| R-009 | Testování | Zavést automatické testy pravidel, herní logiky, API a regresí | PLÁN |
| R-010 | Nasazení | Ověřit bezpečné automatické nasazení na Webzdarma bez přepsání `.env` | PLÁN |

## 6. Záznamy významných změn

Nejnovější záznam patří vždy nahoru. Starší záznamy se nemažou; v případě chyby se přidá opravný záznam.

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
7. Teprve po ověření označit položku jako HOTOVO.

**Bez aktualizace tohoto dokumentu není významná změna projektu řádně zdokumentovaná.**

## 8. Související dokumentace

- [Prostředí produkčního serveru](SERVER_ENVIRONMENT.md)
- [Struktura vývoje AI](AI_DEVELOPMENT_STRUCTURE.md)
