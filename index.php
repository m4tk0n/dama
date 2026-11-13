<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');

function assetVersion(string $relativePath): string
{
    $absolutePath = __DIR__ . '/' . ltrim($relativePath, '/');
    $modifiedAt = is_file($absolutePath) ? filemtime($absolutePath) : false;

    return (string) ($modifiedAt !== false ? $modifiedAt : 0);
}
?>
<!doctype html>
<html lang="cs"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#172033"><meta name="description" content="Dáma – česká dáma a další herní varianty.">
<title>Dáma</title>
<link rel="stylesheet" href="assets/css/app.css?v=<?= htmlspecialchars(assetVersion('assets/css/app.css'), ENT_QUOTES, 'UTF-8') ?>">
<script type="module" src="assets/js/app.js?v=<?= htmlspecialchars(assetVersion('assets/js/app.js'), ENT_QUOTES, 'UTF-8') ?>"></script>
</head><body><div class="app-shell">
<header class="topbar"><a class="brand" href="./" aria-label="Dáma – úvodní stránka" data-screen-link="home">Dáma</a><button class="button button-outline login-button" type="button" data-action="login">Přihlásit se</button></header>
<main id="app-main"
 data-board-2d-css-version="<?= htmlspecialchars(assetVersion('assets/css/board-2d.css'), ENT_QUOTES, 'UTF-8') ?>"
 data-board-2d-js-version="<?= htmlspecialchars(assetVersion('assets/js/board-2d.js'), ENT_QUOTES, 'UTF-8') ?>">
<section class="screen is-active" id="screen-home" aria-labelledby="home-title"><div class="home-content">
<p class="eyebrow">Herní centrum</p><h1 id="home-title">Dáma</h1><p class="intro">Vyberte si způsob hry.</p>
<nav class="main-menu" aria-label="Hlavní nabídka">
<button class="menu-button menu-primary" type="button" data-screen="create">Místní hra</button>
<button class="menu-button" type="button" data-action="my-games" disabled>Moje hry</button>
<button class="menu-button" type="button" data-screen="rooms">Místnosti</button>
<button class="menu-button" type="button" data-screen="online">Online hra</button>
<button class="menu-button" type="button" data-screen="rules">Pravidla</button>
</nav><p class="muted-note">Moje hry budou dostupné po přihlášení.</p></div></section>
<section class="screen" id="screen-create" aria-labelledby="create-title" hidden><div class="content-panel">
<button class="back-button" type="button" data-screen="home">← Zpět</button><p class="eyebrow">Nová partie</p><h1 id="create-title">Vytvořit místní hru</h1>
<div class="field-group"><label for="game-variant">Varianta hry</label><select id="game-variant">
<option value="czech-8">Česká dáma 8×8</option><option value="international-10" disabled>Mezinárodní dáma 10×10 – připravujeme</option><option value="other" disabled>Další varianty – připravujeme</option></select></div>
<fieldset class="field-group"><legend>Proti komu chcete hrát?</legend>
<label class="choice-row"><input type="radio" name="opponent" value="human" checked> Dva hráči na jednom zařízení</label>
<label class="choice-row"><input type="radio" name="opponent" value="ai"> Proti počítači</label></fieldset>
<fieldset class="field-group" id="difficulty-group" hidden><legend>Obtížnost počítače</legend>
<label class="choice-row"><input type="radio" name="difficulty" value="easy" checked> Lehká</label>
<label class="choice-row"><input type="radio" name="difficulty" value="medium"> Střední</label>
<label class="choice-row"><input type="radio" name="difficulty" value="hard"> Těžká</label></fieldset>
<button class="button button-primary button-wide" type="button" data-action="start-local">Pokračovat</button>
</div></section>
<section class="screen" id="screen-game" aria-labelledby="game-title" hidden>
<div class="game-header"><button class="back-button" type="button" data-screen="create">← Nastavení</button><div><p class="eyebrow">Místní hra</p><h1 id="game-title">Česká dáma 8×8</h1></div><span class="mode-label" id="game-mode-label">2 hráči</span></div>
<div class="board-wrap"><div id="board-2d" class="board-2d" role="grid" aria-label="Hrací deska 8 krát 8"></div></div>
<p class="board-caption">Základní náhled desky. Herní tahy a pravidla budou doplněny v další etapě.</p></section>
<section class="screen" id="screen-rooms" aria-labelledby="rooms-title" hidden><div class="content-panel"><button class="back-button" type="button" data-screen="home">← Zpět</button><p class="eyebrow">Online hraní</p><h1 id="rooms-title">Místnosti</h1><p>Veřejné čekárny budou dostupné po dokončení účtů a online her.</p><span class="status-label">Připravujeme</span></div></section>
<section class="screen" id="screen-online" aria-labelledby="online-title" hidden><div class="content-panel"><button class="back-button" type="button" data-screen="home">← Zpět</button><p class="eyebrow">Online hraní</p><h1 id="online-title">Online hra</h1><p>Veřejné a soukromé online partie budou doplněny v další etapě.</p><span class="status-label">Připravujeme</span></div></section>
<section class="screen" id="screen-rules" aria-labelledby="rules-title" hidden><div class="content-panel"><button class="back-button" type="button" data-screen="home">← Zpět</button><p class="eyebrow">Nápověda</p><h1 id="rules-title">Pravidla</h1><p>Autoritativní pravidla české dámy budou doplněna před implementací herních tahů.</p><span class="status-label">Pravidla se připravují</span></div></section>
</main><footer class="app-footer"><span>Dáma</span><span>První vývojová verze</span></footer></div>
<dialog class="modal" id="login-dialog" aria-labelledby="login-title"><form method="dialog"><h2 id="login-title">Přihlášení</h2><p>Přihlašování a registrace budou doplněny v další etapě.</p><button class="button button-primary button-wide" value="close">Zavřít</button></form></dialog>
</body></html>
