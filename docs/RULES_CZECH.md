# Pravidla české dámy 8×8

Tento dokument je autoritativním zdrojem pravidel první herní varianty projektu. Produkční herní engine, lokální hra, budoucí AI a online hra musí používat stejná pravidla. Vykreslování desky nesmí pravidla samostatně implementovat.

## 1. Deska a výchozí postavení

- Hraje se na desce 8×8.
- Hraje se pouze na tmavých políčkách.
- Každý hráč začíná s 12 obyčejnými kameny ve třech řadách na své straně.
- Hráč 1 má bílé kameny, Hráč 2 černé.
- V této implementaci začínají bílé nahoře a táhnou směrem dolů; černé začínají dole a táhnou směrem nahoru.
- První tah má Hráč 1 (bílé). Hráči se dále střídají.

## 2. Obyčejný kámen

- Pohybuje se o jedno volné diagonální políčko dopředu.
- Nesmí se pohybovat dozadu.
- Nesmí vstoupit na obsazené políčko ani přeskočit vlastní kámen.
- Při braní přeskočí sousední soupeřův kámen pouze dopředu a přistane na volném políčku bezprostředně za ním.

## 3. Dáma

- Kámen se stane dámou po dokončení tahu, kterým dosáhne poslední řady soupeřovy strany.
- Dáma se pohybuje po diagonále dopředu i dozadu o libovolný počet volných polí.
- Při braní může přeskočit soupeřovu figuru na stejné diagonále, pokud je za ní alespoň jedno volné pole.
- Po přeskočení může přistát na kterémkoliv volném políčku za přeskočenou figurou na stejné diagonále, dokud jí v cestě nestojí další figura nebo okraj desky.
- Vlastní figury ani již přeskočené figury nesmí přeskočit.

## 4. Povinné a vícenásobné braní

- Braní je povinné. Pokud hráč může brát, nesmí místo toho provést obyčejný tah.
- Pokud může brát obyčejným kamenem i dámou, musí zvolit braní dámou.
- Pokud existuje více různých možností braní, hráč si může vybrat. Není povinné vybrat cestu s nejvyšším počtem braných figur.
- Po prvním přeskočení musí stejná figura pokračovat v braní, pokud má další možnost.
- Vícenásobné braní je jeden tah. Během něj se nesmí přejít na jinou vlastní figuru.
- Stejnou soupeřovu figuru nelze přeskočit vícekrát v jednom tahu.
- Přeskočené soupeřovy figury zůstávají na desce jako překážky až do dokončení celé sekvence braní; potom se odstraní najednou.
- Kámen, který během braní dosáhne poslední řady, se stane dámou až po dokončení celé sekvence. Zbytek tohoto tahu dokončuje jako obyčejný kámen.

## 5. Konec partie

- Hráč vyhrává, pokud soupeř nemá žádnou figuru nebo nemá žádný legální tah.
- Automatické rozpoznávání remízy zatím není implementováno. Remíza ani pravidla opakování pozic se nesmějí domýšlet v zobrazovací vrstvě; musí být doplněna jako samostatné pravidlo a testy.

## 6. Ovládání v aplikaci

- Hráč klepne na vlastní figuru. Vybraná figura se vizuálně zvedne nad desku.
- Aplikace zvýrazní pouze legální cílová políčka.
- Hráč klepne na cílové políčko a figura se přesune.
- Při vícenásobném braní zůstává vybraná stejná figura a aplikace nabídne pouze další legální skoky.
- Po dokončení tahu se zobrazí další hráč na tahu.
- Zobrazovací vrstva pouze předává požadavek na tah hernímu enginu a zobrazuje jeho výsledek. Sama nesmí rozhodovat o legálnosti tahu.

## 7. Rozsah implementace

- Tato pravidla platí pro českou dámu 8×8.
- Mezinárodní dáma 10×10 je zatím pouze vizuální testovací náhled. Nesmí používat pravidla 8×8.
- AI, ukládání a online synchronizace nejsou součástí samotného enginu pravidel; jejich budoucí implementace musí používat tento engine a nesmí vytvářet vlastní kopii pravidel.

## 8. Podklady pro vymezení pravidel

- [VUT – práce popisující českou variantu dámy](https://dspace.vut.cz/bitstreams/364088fd-ae02-44bb-bdca-a1673741d763/download)
- [Technická univerzita v Liberci – česká dáma podle pravidel České federace dámy](https://dspace.tul.cz/bitstreams/28113781-8209-4288-b1cc-ec32e3ecf083/download)
- [Česká dáma – přehled pravidel braní](https://new.deskovehry.cz/index.php?title=%C4%8Cesk%C3%A1_d%C3%A1ma)
