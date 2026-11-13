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

$assets = [
    'createHtml' => 'pages/create.html',
    'createJs' => 'assets/js/screens/create.js',
    'gameHtml' => 'pages/game.html',
    'gameJs' => 'assets/js/screens/game.js',
    'roomsHtml' => 'pages/rooms.html',
    'roomsJs' => 'assets/js/screens/rooms.js',
    'onlineHtml' => 'pages/online.html',
    'onlineJs' => 'assets/js/screens/online.js',
    'rulesHtml' => 'pages/rules.html',
    'rulesJs' => 'assets/js/screens/rules.js',
    'loginHtml' => 'pages/login.html',
    'loginJs' => 'assets/js/screens/login.js',
    'boardCss' => 'assets/css/board-2d.css',
    'boardJs' => 'assets/js/board-2d.js',
];
$assetVersions = [];
foreach ($assets as $key => $path) {
    $assetVersions[$key] = assetVersion($path);
}
?>
<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#172033">
<meta name="description" content="Dáma – česká dáma a další herní varianty.">
<title>Dáma</title>
<link rel="stylesheet" href="assets/css/app.css?v=<?= htmlspecialchars(assetVersion('assets/css/app.css'), ENT_QUOTES, 'UTF-8') ?>">
<script type="module" src="assets/js/app.js?v=<?= htmlspecialchars(assetVersion('assets/js/app.js'), ENT_QUOTES, 'UTF-8') ?>"></script>
</head>
<body>
<div class="app-shell">
<header class="topbar">
<a class="brand" href="./" aria-label="Dáma – úvodní stránka" data-screen="home">Dáma</a>
<button class="button button-outline login-button" type="button" data-screen="login">Přihlásit se</button>
</header>
<main id="app-view" data-assets="<?= htmlspecialchars((string) json_encode($assetVersions, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT), ENT_QUOTES, 'UTF-8') ?>" aria-live="polite">
<section class="screen is-active" aria-labelledby="home-title">
<div class="home-content">
<p class="eyebrow">Herní centrum</p>
<h1 id="home-title">Dáma</h1>
<p class="intro">Vyberte si způsob hry.</p>
<nav class="main-menu" aria-label="Hlavní nabídka">
<button class="menu-button menu-primary" type="button" data-screen="create">Místní hra</button>
<button class="menu-button" type="button" data-action="my-games" disabled>Moje hry</button>
<button class="menu-button" type="button" data-screen="rooms">Místnosti</button>
<button class="menu-button" type="button" data-screen="online">Online hra</button>
<button class="menu-button" type="button" data-screen="rules">Pravidla</button>
</nav>
<p class="muted-note">Moje hry budou dostupné po přihlášení.</p>
</div>
</section>
</main>
<footer class="app-footer"><span>Dáma</span><span>První vývojová verze</span></footer>
</div>
</body>
</html>
