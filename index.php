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
    'homeHtml' => 'pages/home.html',
    'homeJs' => 'assets/js/screens/home.js',
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
    'gameEngine' => 'assets/js/game-engine.js',
    'engine_classic' => 'assets/js/variants/classic/engine.js',
    'engine_giveaway' => 'assets/js/variants/giveaway/engine.js',
    'engine_czech-8' => 'assets/js/variants/czech-8/engine.js',
    'ai_czech-8' => 'assets/js/variants/czech-8/ai.js',
    'engine_czech-zapletal' => 'assets/js/variants/czech-zapletal/engine.js',
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

</main>
<footer class="app-footer"><span>Dáma</span><span>První vývojová verze</span></footer>
</div>
</body>
</html>
