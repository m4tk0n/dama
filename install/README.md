# Instalace databáze

SQL instalace aplikace bude umístěna v tomto adresáři.

- Konfigurace databáze se načítá ze serverového `.env` v kořenovém adresáři projektu.
- Prefix tabulek se načítá výhradně z proměnné `table_prefix`.
- Prefix nesmí být pevně zapsán v SQL ani v PHP a před použitím se ověří jako bezpečný SQL identifikátor.
- `.env` se nesmí vypisovat, kopírovat, měnit ani zpřístupnit přes HTTP.
- Instalátor musí rozpoznat již provedenou instalaci a nesmí bez potvrzení mazat nebo přepisovat data.
- Po úspěšné instalaci musí být instalační akce zablokována.
- SQL schéma vznikne společně s návrhem skutečných datových struktur účtů, her a ukládání rozehraných partií.

V této počáteční etapě zde není spustitelný instalátor ani databázové schéma. Nejsou známy přesné názvy všech databázových proměnných v produkčním `.env`, proto je nelze bezpečně předpokládat.
