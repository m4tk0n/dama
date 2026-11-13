# Herní varianty projektu Dáma

Tento dokument je centrální registr variant. Neobsahuje náhradní kopii jejich pravidel; ukazuje, kde je autoritativní zdroj pravidel, implementace a testy.

## 1. Základní architektonické pravidlo

Projekt obsahuje čtyři odlišné hry:

| ID | Název | Autoritativní pravidla | Stav |
|---|---|---|---|
| classic | Klasická dáma | docs/RULES_CLASSIC.md | PLÁN – pravidla je nutné přesně specifikovat |
| giveaway | Žravá dáma | docs/RULES_GIVEAWAY.md | PLÁN – pravidla je nutné přesně specifikovat |
| czech | Česká dáma | docs/RULES_CZECH.md | ROZPRACOVÁNO – pravidla zdokumentována, základní engine existuje |
| international | Mezinárodní dáma | docs/RULES_INTERNATIONAL.md | PLÁN – současná deska 10×10 je pouze vizuální náhled |

Každá varianta musí mít vlastní úplný dokument pravidel, vlastní definici počátečního rozestavení, vlastní engine a vlastní automatické testy. Žádná varianta nesmí používat pravidla jiné varianty jako výchozí nebo nouzovou náhradu.

## 2. Co je společné

Pouze technické a prezentační části:

- vykreslení desky libovolné podporované geometrie;
- vykreslení jednoho kamene a jeho vizuálních vlastností;
- obecné ovládání (výběr kamene, požadavek na tah, zobrazení cílových polí);
- animace pohybu a vizualizace výsledku tahu;
- společné UI, zvukové a přístupnostní funkce.

Společný renderer nesmí obsahovat pravidla pohybu, braní, povinného braní, proměny, pokračování tahu, vítězství ani remízy. Nesmí odvozovat pravidla z rozměru desky.

## 3. Co je samostatné pro každou variantu

Každá varianta nezávisle definuje:

- rozměry desky, tvar a orientaci;
- aktivní/herní políčka;
- počet hráčů a počet kamenů;
- počáteční rozestavení a stranu, která začíná;
- druhy kamenů a jejich proměnu;
- pohyb obyčejných kamenů a dam;
- braní, povinnost braní, prioritu a volbu mezi sekvencemi;
- pravidla vícenásobného braní a odstraňování braných kamenů;
- podmínky ukončení, vítězství a remízy;
- variantní nastavení AI a její strategické vyhodnocování.

## 4. Doporučené rozdělení implementace

```text
assets/js/
├── core/
│   ├── board-renderer.js
│   ├── piece-renderer.js
│   └── game-controller.js
└── variants/
    ├── classic/
    │   ├── setup.js
    │   └── engine.js
    ├── giveaway/
    │   ├── setup.js
    │   └── engine.js
    ├── czech/
    │   ├── setup.js
    │   └── engine.js
    └── international/
        ├── setup.js
        └── engine.js
```

Toto je cílové rozdělení, nikoliv tvrzení, že uvedené moduly již existují. Stávající assets/js/game-engine.js je současná implementace české dámy. Při migraci se jeho pravidla musí zachovat a přesunout pod variantu czech; nesmí se změnit na obecný engine obsahující skryté přepínače pravidel.

Každý engine musí poskytovat jasné rozhraní pro vytvoření počátečního stavu, získání legálních tahů, provedení tahu a vyhodnocení stavu partie. Konkrétní implementace těchto operací zůstává variantní.

## 5. Výběr varianty a ukládání

- Každá hra nese stabilní identifikátor varianty (classic, giveaway, czech, international).
- Při vytvoření hry se načte pouze engine a konfigurace zvolené varianty.
- Stav uložené partie obsahuje identifikátor varianty a verzi pravidel.
- Při načtení partie se nesmí automaticky použít jiný engine, pokud původní varianta není dostupná.
- 2D a 3D renderer zobrazují stejný stav hry; žádný renderer nesmí měnit pravidla.

## 6. AI a testování

- AI musí před rozhodnutím používat legální tahy enginu konkrétní varianty.
- Každá varianta má vlastní testy počátečního rozestavení, pohybu, braní, vícenásobných sekvencí, proměny a konce hry podle svých pravidel.
- Testy jedné varianty nesmějí být považovány za důkaz správnosti jiné varianty.
- Vývoj a trénování AI zůstává oddělené v dama-ai-vyvoj/; produkční AI musí mít oddělené modely/strategie podle varianty.

## 7. Závazné autoritativní dokumenty

- Klasická dáma: docs/RULES_CLASSIC.md (zatím nevytvořen – pravidla musí být specifikována).
- Žravá dáma: docs/RULES_GIVEAWAY.md (zatím nevytvořen – pravidla musí být specifikována).
- Česká dáma: docs/RULES_CZECH.md.
- Mezinárodní dáma: docs/RULES_INTERNATIONAL.md (zatím nevytvořen – pravidla musí být specifikována).

Dokumenty pro neimplementované varianty se nesmějí doplnit odhadem. Po ověření úplných pravidel se každý dokument stane jediným autoritativním zdrojem dané varianty.
