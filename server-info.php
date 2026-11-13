<?php
declare(strict_types=1);

/* Temporary hosting diagnostic. Remove after checking; it exposes software versions. */
header('Content-Type: text/plain; charset=utf-8');

$config = [];
$envFile = __DIR__ . '/.env';
if (is_readable($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        if (preg_match('/^(?:export\\s+)?([A-Za-z_][A-Za-z0-9_]*)\\s*=\\s*(.*)$/', $line, $m)) {
            $value = trim($m[2]);
            if (strlen($value) >= 2 && (($value[0] === '"' && str_ends_with($value, '"')) || ($value[0] === "'" && str_ends_with($value, "'")))) {
                $value = substr($value, 1, -1);
            } else {
                $value = preg_replace('/\\s+#.*$/', '', $value);
            }
            $config[$m[1]] = $value;
        }
    }
}

$getConfig = static function (array $keys) use ($config): string {
    foreach ($keys as $key) {
        $value = getenv($key);
        if ($value !== false && $value !== '') return (string) $value;
        if (isset($_ENV[$key]) && $_ENV[$key] !== '') return (string) $_ENV[$key];
        if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') return (string) $_SERVER[$key];
        if (isset($config[$key]) && $config[$key] !== '') return (string) $config[$key];
    }
    return '';
};

echo "DAMA SERVER DIAGNOSTICS\\n";
echo "PHP version: " . PHP_VERSION . "\\n";
echo "PHP SAPI: " . PHP_SAPI . "\\n";
echo "mysqli extension: " . (extension_loaded('mysqli') ? 'available' : 'not available') . "\\n";
echo "PDO extension: " . (extension_loaded('pdo') ? 'available' : 'not available') . "\\n";
echo "PDO MySQL driver: " . (extension_loaded('pdo_mysql') ? 'available' : 'not available') . "\\n";
if (extension_loaded('mysqli')) echo "MySQL client library: " . mysqli_get_client_info() . "\\n";

$dbHost = $getConfig(['DB_HOST', 'MYSQL_HOST']);
$dbName = $getConfig(['DB_NAME', 'DB_DATABASE', 'MYSQL_DATABASE']);
$dbUser = $getConfig(['DB_USER', 'DB_USERNAME', 'MYSQL_USER']);
$dbPass = $getConfig(['DB_PASSWORD', 'DB_PASS', 'MYSQL_PASSWORD']);

if (extension_loaded('mysqli') && $dbHost !== '' && $dbName !== '' && $dbUser !== '') {
    mysqli_report(MYSQLI_REPORT_OFF);
    $db = @new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($db->connect_errno) {
        echo "MySQL server version: connection failed (" . $db->connect_errno . ")\\n";
    } else {
        echo "MySQL server version: " . $db->server_info . "\\n";
        $db->close();
    }
} else {
    echo "MySQL server version: not checked (database connection settings not found in .env or server environment)\\n";
}
