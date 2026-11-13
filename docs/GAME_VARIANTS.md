# Herní varianty projektu Dáma

Tento dokument je centrální registr všech variant zahrnutých do výběru nové hry. Každá varianta má vlastní identifikátor a vlastní autoritativní pravidla, rozestavení, engine a testy.

## 1. Seznam variant

Seznam vychází z pojmenovaných variant uvedených v českém článku Wikipedie „Dáma (desková hra)“. „Dámová notace“ a obecný pojem „další varianty“ nejsou samostatné hry, proto nejsou nabídkami. Všechny konkrétně pojmenované hry z článku jsou zahrnuty.

| ID | Název ve výběru | Pravidla | Stav implementace |
|---|---|---|---|
| classic | Klasická dáma | docs/RULES_CLASSIC.md | Upřesněná pravidla podle dodaného znění; začínající hráč a některé procedurální detaily zůstávají neurčené |
| giveaway | Žravá dáma | docs/RULES_GIVEAWAY.md | Přebírá pravidla Klasické dámy; obrácená je pouze podmínka vítězství |
| czech-8 | Česká dáma podle ČFD | docs/RULES_CZECH.md | Pravidla upřesněna podle dodaného znění; engine 8×8 |
| czech-zapletal | Česká dáma dle Zapletala | docs/RULES_CZECH_ZAPLETAL.md | 8 kamenů ve dvou řadách, začíná černý; pohybová pravidla shodná s ČFD, konec partie k potvrzení |
| english | Anglická dáma | docs/RULES_ENGLISH.md | Odlišnosti z Wikipedie přeneseny; úplná pravidla k doplnění |
| international-10 | Mezinárodní dáma | docs/RULES_INTERNATIONAL.md | Odlišnosti z Wikipedie přeneseny; pouze vizuální náhled 10×10 |
| brazilian | Brazilská dáma | docs/RULES_BRAZILIAN.md | Odlišnosti z Wikipedie přeneseny; úplná pravidla k doplnění |
| spanish | Španělská dáma | docs/RULES_SPANISH.md | Odlišnosti z Wikipedie přeneseny; úplná pravidla k doplnění |
| turkish | Turecká (Keny) dáma | docs/RULES_TURKISH.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| corner | Rohová dáma | docs/RULES_CORNER.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| twenty-ten | Dvacet proti deseti | docs/RULES_TWENTY_TEN.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| medieval-battle | Středověká bitva | docs/RULES_MEDIEVAL_BATTLE.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| knight | Jezdecká dáma | docs/RULES_KNIGHT.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| dam | Dám | docs/RULES_DAM.md | Wikipedie uvádí pouze název; přesný význam a pravidla k ověření |
| canadian | Kanadská dáma | docs/RULES_CANADIAN.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |
| double | Dvojitá dáma | docs/RULES_DOUBLE.md | Wikipedie uvádí pouze název; úplná pravidla k doplnění |

## 2. Rozsah pravidel dostupných na Wikipedii

Český článek obsahuje konkrétní popis pravidel pouze pro prvních osm variant v registru: Klasickou, Žravou, Českou podle ČFD, Českou dle Zapletala, Anglickou, Mezinárodní, Brazilskou a Španělskou dámu. Tyto informace jsou přeneseny do příslušných souborů `RULES_*.md`. U některých z nich jde pouze o stručný přehled odlišností, nikoli úplnou specifikaci potřebnou pro engine.

Dalších osm herních názvů (Turecká/Keny, Rohová, Dvacet proti deseti, Středověká bitva, Jezdecká, Dám, Kanadská a Dvojitá) článek pouze vyjmenovává. Jejich pravidla na této stránce napsána nejsou; nesmějí se proto označovat za převzatá z Wikipedie ani domýšlet.

## 3. Zásadní pravidlo výběru

Všech 16 variant je viditelných a lze je vybrat při vytváření místní hry. Výběr však neznamená, že je hra implementována.

- Česká dáma podle ČFD je jediná aktuálně hratelná varianta.
- Mezinárodní dáma 10×10 je pouze statický vizuální náhled.
- U ostatních variant se zobrazí informace, že se připravují; nesmějí se spustit s enginem jiné varianty.
- Neimplementovaná varianta nesmí být tiše nahrazena českou dámou.
- Výchozí předvolbou zůstává Česká dáma podle ČFD.

## 4. Společné a samostatné části

Společné zůstává pouze vykreslení desky, vykreslení jednoho kamene, obecné ovládání, animace a prezentace stavu. Každá varianta samostatně určuje rozměr a geometrii desky, aktivní pole, počet a počáteční rozmístění kamenů, začínající stranu, pohyb, braní, proměnu, pokračování tahu, vítězství, remízu a strategii AI.

Renderer nikdy nevyhodnocuje pravidla ani legální tahy. Dostává konfiguraci desky a stav hry od enginu vybrané varianty.

## 5. Cílová struktura enginů

Každá varianta bude mít vlastní modul `setup.js` a `engine.js` pod `assets/js/variants/{id}/`. Společné vykreslování a ovládání zůstává ve společných modulech. Stávající `assets/js/game-engine.js` je pouze současný engine české dámy podle ČFD, nikoli univerzální engine.

## 6. Testování a AI

Každá varianta musí mít vlastní testy rozestavení, pohybu, braní, vícenásobných sekvencí, proměny, konce hry a remízy podle svých pravidel. AI musí používat legální tahy a strategii varianty, kterou uživatel vybral. Tréninkové modely a váhy se mezi variantami nesmějí zaměňovat.

## 7. Zdroj katalogu

Česká Wikipedie, „Dáma (desková hra)“:
https://cs.wikipedia.org/wiki/Dáma_(desková_hra)

Stručný přehled Wikipedie nestačí k implementaci úplného enginu. Pravidla každé varianty se musí ověřit z odpovídajících autoritativních zdrojů.
