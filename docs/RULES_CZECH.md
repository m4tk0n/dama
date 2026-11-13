# Pravidla České dámy podle ČFD

Tento dokument je autoritativním zdrojem pravidel varianty Česká dáma podle ČFD. Platí pro lokální hru, AI, ukládání i online hru. Vykreslování nesmí pravidla samostatně implementovat.

## 1. Deska a počáteční postavení
- Hraje se na šachovnici 8×8.
- Hraje se pouze na černých polích.
- Každý hráč začíná s 12 obyčejnými kameny ve třech řadách na protilehlých stranách šachovnice.
- Kameny obou hráčů stojí na černých polích.
- Konkrétní orientace barev a stran v aplikaci: bílé kameny jsou nahoře a táhnou dolů; černé kameny jsou dole a táhnou nahoru.
- První tah má bílý hráč. Hráči se dále střídají.

## 2. Pohyb obyčejného kamene
- Obyčejný kámen se pohybuje diagonálně po černých polích pouze vpřed.
- Při běžném tahu se posune o jedno volné políčko.
- Nesmí vstoupit na obsazené políčko ani přeskočit vlastní kámen.
- Při braní přeskočí sousední soupeřův kámen nebo dámu diagonálně vpřed a přistane na volném políčku bezprostředně za přeskočenou figurou.

## 3. Proměna a pohyb dámy
- Kámen, který dojde na poslední řadu šachovnice, se promění v dámu.
- Dáma se pohybuje diagonálně dopředu i dozadu o libovolný počet volných polí.
- Při braní může dáma přeskočit soupeřův kámen nebo dámu na stejné diagonále, pokud je za ní volné pole.
- Po přeskočení může dáma přistát na kterémkoliv volném poli za přeskočenou figurou na stejné diagonále, dokud jí v cestě nestojí další figura nebo okraj desky.
- Vlastní figury ani již přeskočené figury nesmí přeskočit.

## 4. Povinné a vícenásobné braní
- Braní je povinné. Pokud hráč může brát, nesmí místo toho provést obyčejný tah.
- Pokud může brát obyčejným kamenem i dámou, musí zvolit braní dámou.
- Pokud existuje více různých možností braní, hráč si může vybrat. Není povinné vybrat cestu s nejvyšším počtem braných figur.
- Po prvním přeskočení musí stejná figura pokračovat v braní, pokud má další možnost.
- Dáma musí po přeskočení zvolit takové volné dopadové pole, ze kterého může v braní pokračovat, pokud takové pole existuje. Pokud pokračování možné není z žádného dopadového pole, může zvolit libovolné volné pole za přeskočenou figurou.
- Vícenásobné braní je jeden tah. Během něj se nesmí přejít na jinou vlastní figuru.
- Přes jednu soupeřovu figuru nelze v rámci jednoho tahu skákat vícekrát.
- Přeskočené soupeřovy figury zůstávají na desce jako překážky až do dokončení celé sekvence braní; potom se odstraní najednou.
- Kámen, který během braní dosáhne poslední řady, tím ukončí svůj tah a promění se v dámu. V témže tahu již nepokračuje jako dáma; nové pohybové možnosti využije až v následujícím tahu.

## 5. Konec partie
- Hráč, který je na tahu a nemůže provést legální tah, prohrál. To platí, pokud nemá žádné kameny nebo má všechny své kameny zablokované.
- Partie končí remízou, pokud již teoreticky nelze při pozorné hře vzít soupeři žádný kámen ani dámu.
- Další pravidla remízy nejsou v dodaném znění specifikována a nesmějí se domýšlet.

## 6. Chybný tah
- Pokud hráč zahraje tah v rozporu s pravidly, například opomene povinné braní, soupeř může požadovat opravu tahu.
- Podrobnější postup opravy (časové a procesní podmínky) není v dodaném znění specifikován.

## 7. Ovládání v aplikaci
- Hráč vybere vlastní figuru; aplikace zvýrazní pouze legální cílová políčka.
- Při vícenásobném braní zůstává vybraná stejná figura a aplikace nabídne pouze legální pokračování.
- Zobrazovací vrstva pouze předává požadavek na tah enginu a zobrazuje jeho výsledek. Sama nesmí rozhodovat o legálnosti tahu.

## 8. Zdroj
- Text pravidel České dámy podle ČFD dodal uživatel v zadání projektu.
- [Česká Wikipedie – Dáma (desková hra)](https://cs.wikipedia.org/wiki/Dáma_(desková_hra)), oddíl „Česká dáma podle pravidel České federace dámy“.
