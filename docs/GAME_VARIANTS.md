# Herní varianty projektu Dáma

Tento dokument je centrální registr všech variant zahrnutých do výběru nové hry. Každá varianta má vlastní identifikátor a vlastní autoritativní pravidla, rozestavení, engine a testy.

## 1. Seznam variant

Seznam vychází z pojmenovaných variant uvedených v českém článku Wikipedie „Dáma (desková hra)“. „Dámová notace“ a obecný pojem „další varianty“ nejsou samostatné hry, proto nejsou nabídkami. Všechny konkrétně pojmenované hry z článku jsou zahrnuty.

| ID | Název ve výběru | Pravidla | Stav implementace |
|---|---|---|---|
| classic | Klasická dáma | docs/RULES_CLASSIC.md | Osnova, nehratelná |
| giveaway | Žravá dáma | docs/RULES_GIVEAWAY.md | Osnova, nehratelná |
| czech-8 | Česká dáma podle ČFD | docs/RULES_CZECH.md | Základní engine 8×8 |
| czech-zapletal | Česká dáma dle Zapletala | docs/RULES_CZECH_ZAPLETAL.md | Osnova, nehratelná |
| english | Anglická dáma | docs/RULES_ENGLISH.md | Osnova, nehratelná |
| international-10 | Mezinárodní dáma | docs/RULES_INTERNATIONAL.md | Pouze vizuální náhled 10×10 |
| brazilian | Brazilská dáma | docs/RULES_BRAZILIAN.md | Osnova, nehratelná |
| spanish | Španělská dáma | docs/RULES_SPANISH.md | Osnova, nehratelná |
| turkish | Turecká (Keny) dáma | docs/RULES_TURKISH.md | Osnova, nehratelná |
| corner | Rohová dáma | docs/RULES_CORNER.md | Osnova, nehratelná |
| twenty-ten | Dvacet proti deseti | docs/RULES_TWENTY_TEN.md | Osnova, nehratelná |
| medieval-battle | Středověká bitva | docs/RULES_MEDIEVAL_BATTLE.md | Osnova, nehratelná |
| knight | Jezdecká dáma | docs/RULES_KNIGHT.md | Osnova, nehratelná |
| dam | Dám | docs/RULES_DAM.md | Název převzat doslova z Wikipedie; pravidla nutno ověřit |
| canadian | Kanadská dáma | docs/RULES_CANADIAN.md | Osnova, nehratelná |
| double | Dvojitá dáma | docs/RULES_DOUBLE.md | Osnova, nehratelná |

## 2. Zásadní pravidlo výběru

Všech 16 variant je viditelných a lze je vybrat při vytváření místní hry. Výběr však neznamená, že je hra implementována.

- Česká dáma podle ČFD je jediná aktuálně hratelná varianta.
- Mezinárodní dáma 10×10 je pouze statický vizuální náhled.
- U ostatních variant se zobrazí informace, že se připravují; nesmějí se spustit s enginem jiné varianty.
- Neimplementovaná varianta nesmí být tiše nahrazena českou dámou.
- Výchozí předvolbou zůstává Česká dáma podle ČFD.

## 3. Společné a samostatné části

Společné zůstává pouze vykreslení desky, vykreslení jednoho kamene, obecné ovládání, animace a prezentace stavu. Každá varianta samostatně určuje rozměr a geometrii desky, aktivní pole, počet a počáteční rozmístění kamenů, začínající stranu, pohyb, braní, proměnu, pokračování tahu, vítězství, remízu a strategii AI.

Renderer nikdy nevyhodnocuje pravidla ani legální tahy. Dostává konfiguraci desky a stav hry od enginu vybrané varianty.

## 4. Cílová struktura enginů

Každá varianta bude mít vlastní modul `setup.js` a `engine.js` pod `assets/js/variants/{id}/`. Společné vykreslování a ovládání zůstává ve společných modulech. Stávající `assets/js/game-engine.js` je pouze současný engine české dámy podle ČFD, nikoli univerzální engine.

## 5. Testování a AI

Každá varianta musí mít vlastní testy rozestavení, pohybu, braní, vícenásobných sekvencí, proměny, konce hry a remízy podle svých pravidel. AI musí používat legální tahy a strategii varianty, kterou uživatel vybral. Tréninkové modely a váhy se mezi variantami nesmějí zaměňovat.

## 6. Zdroj katalogu

Česká Wikipedie, „Dáma (desková hra)“:
https://cs.wikipedia.org/wiki/Dáma_(desková_hra)

Stručný přehled Wikipedie nestačí k implementaci úplného enginu. Pravidla každé varianty se musí ověřit z odpovídajících autoritativních zdrojů.
