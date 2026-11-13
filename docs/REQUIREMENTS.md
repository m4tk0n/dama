# Požadavky projektu Dáma

Tento dokument shrnuje uživatelem potvrzené požadavky. Stav implementace se eviduje v `ROADMAP.md`; uvedení požadavku zde neznamená, že je hotový.

## 1. První herní verze
- První implementovanou variantou bude česká dáma na desce 8×8.
- Při vytváření hry je dostupná česká dáma 8×8.
- Mezinárodní dáma 10×10 je dočasně zpřístupněna pouze pro testování rozměrů a zobrazení desky. Její pravidla, herní logika a tahy zatím nejsou implementované; aplikace to musí v rozhraní jasně označit.
- Ostatní budoucí varianty zůstávají deaktivované, dokud nebudou implementované a otestované.
- První grafické zobrazení bude 2D; v budoucnu bude možné přepnout na 3D.

## 2. Obtížnost AI
Hra proti počítači nabídne tři úrovně: Lehká, Střední a Těžká.

## 3. Zobrazení a CSS
- 2D a 3D vykreslování i jejich styly musí být oddělené.
- V 2D desce 8×8 musí mít všechna políčka shodnou šířku i výšku. Deska zachovává poměr stran 1:1; její výška se odvozuje od dostupné šířky, nikoli od výšky okolního prostoru.
- Společné styly patří do společné vrstvy pouze tehdy, pokud jsou skutečně sdílené.
- Nepřidávat další CSS soubory kvůli jednotlivým opravám. Přednostně upravovat existující soubory a odstraňovat duplicity a nepoužívaná pravidla.
- Nový CSS soubor je přípustný pouze pro jasně oddělenou funkční oblast nebo samostatně načítanou část.
- CSS pro 3D se nebude načítat při používání 2D.
- Stejný princip střídmého načítání a odstraňování duplicit platí pro JavaScript a PHP.

## 4. Architektura hry
- Herní pravidla a stav partie mají jeden autoritativní zdroj.
- Herní logika nesmí být součástí vykreslování.
- 2D a 3D jsou dvě zobrazení stejného herního stavu.
- Lokální hra, AI a budoucí online hra musí používat stejný herní engine a pravidla.
- Produkční AI bude uložena v herní části projektu.
- Vývoj, trénování a vyhodnocování AI bude v odděleném adresáři `dama-ai-vyvoj/`.
- Vývojová AI nesmí přímo měnit produkční AI. Přenos nové verze bude řízený, otestovaný a vratný.

## 5. Režimy a navigace
Hlavní nabídka má obsahovat přihlášení, Místní hru, Moje hry, Místnosti, Online hru a Pravidla.
Po přihlášení se přihlašovací tlačítko změní na kruhový avatar s prvním písmenem jména. Nabídka avataru bude obsahovat nastavení a odhlášení.
Moje hry budou dostupné přihlášenému uživateli a mají zahrnovat jeho rozehrané hry proti AI i soukromé online hry.

## 6. Místní hra a ukládání
- Místní hra bude podporovat dva hráče na jednom zařízení a jednoho hráče proti AI.
- Rozehraná místní hra se má ukládat automaticky a umožnit pozdější pokračování.
- U nepřihlášeného hráče se počítá s uložením v zařízení/prohlížeči.
- U přihlášeného hráče se počítá s uložením na server a možností pokračovat na jiném zařízení.

## 7. Online hra a účty
- Online hra bude mít veřejné a soukromé partie.
- Soukromá hra bude určena přihlášeným uživatelům a bude možné pozvat soupeře odkazem.
- Místnosti budou zobrazovat veřejné hry čekající na soupeře.
- Veřejná hra bude mít záznam při čekání na soupeře i během aktivní partie.
- Jeden účet smí mít nejvýše jednu veřejnou čekající nebo aktivní hru.
- Je nutné navrhnout expiraci čekajících místností a bezpečné ukončení neaktivních partií.
- Server musí ověřovat legálnost online tahů; klient nesmí být autoritou pro stav hry.

## 8. Účty a bezpečnost
- Registrace musí být chráněna proti botům a hromadnému zakládání účtů.
- Počítá se s omezením četnosti požadavků, ochranou formulářů a vhodným ověřením registrace.
- Hesla musí být ukládána bezpečným hashováním.
- Citlivé akce musí být autorizované na serveru.

## 9. Databáze a instalace
- SQL instalace bude v adresáři `install/`.
- Databázové připojení bude číst konfiguraci ze serverového `.env` v kořeni projektu.
- Prefix tabulek se načte z proměnné `table_prefix`; nesmí být pevně zakódovaný.
- `.env` nesmí být commitován, zveřejněn, přepsán ani zahrnut do FTP deploymentu.
- Instalátor musí zabránit nechtěnému opakovanému spuštění a po instalaci zablokovat instalační akce.
- Databázové tabulky a čištění dočasných dat se navrhnou podle skutečných funkcí.

## 10. Výkon a údržba
- Aplikace má používat lazy loading; načítat pouze prostředky potřebné pro aktuální obrazovku a režim.
- Nezavádět duplicitní kód, CSS ani JavaScript.
- Zachovávat malé a přehledné soubory a upravovat existující kód před vytvářením dalších souborů.
- Společné vizuální hodnoty mají být centrálně konfigurovatelné pomocí CSS proměnných.
- Mobilní zobrazení musí být použitelné i na úzkých displejích.

## 11. Oddělení obrazovek a lazy loading

- `index.php` obsahuje pouze základní layout aplikace, společnou navigaci, prázdný kontejner pro obsah a patičku. Ani úvodní obrazovka není vložena do indexu; načítá se jako samostatná stránka.
- Každá obrazovka včetně úvodní má vlastní HTML soubor v `pages/` a vlastní JS modul v `assets/js/screens/`.
- HTML a JS konkrétní obrazovky se načítají až při jejím prvním otevření; opakované otevření může využít cache.
- `assets/js/app.js` zůstává pouze malým navigátorem a načítacím bodem. Nesmí obsahovat všechny obrazovky ani jejich aplikační logiku.
- Herní prostředky, AI, 2D a 3D vykreslování se načítají až tehdy, když jsou skutečně potřeba.
- Odloženě načítané soubory používají vlastní verzi odvozenou z `filemtime()`.

## 12. Otevřené technické otázky
- Přesná úplná pravidla české dámy, včetně povinnosti braní, směru braní, volby mezi více braními, proměny na dámu a ukončení partie. Před implementací enginu musí vzniknout samostatný autoritativní dokument pravidel.
- Přesné názvy databázových proměnných v existujícím `.env`, kromě potvrzeného `table_prefix`.
- Konečné databázové schéma a způsob migrací.
- Konkrétní mechanismus synchronizace online her a časové limity neaktivních partií.
- Přesný algoritmus a výkonnostní limity jednotlivých obtížností AI.

Tyto otázky se nesmějí vyřešit odhadem, pokud ovlivňují pravidla hry, bezpečnost, ukládání dat nebo architekturu.
