<?php
declare(strict_types=1);

/* Temporary hosting diagnostic. Remove after checking; it exposes software versions. */
header('Content-Type: text/plain; charset=utf-8');

$config = [];
$envFound = false;
$envPaths = [
    __DIR__ . '/.env',
    dirname(__DIR__) . '/.env',
    dirname(dirname(__DIR__)) . '/.env',
];
foreach ($envPaths as $envFile) {
    if (!is_readable($envFile)) continue;
    $envFound = true;
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

echo "DAMA SERVER DIAGNOSTICS\n";
echo "PHP version: " . PHP_VERSION . "\n";
echo "PHP SAPI: " . PHP_SAPI . "\n";
echo "mysqli extension: " . (extension_loaded('mysqli') ? 'available' : 'not available') . "\n";
echo "PDO extension: " . (extension_loaded('pdo') ? 'available' : 'not available') . "\n";
echo "PDO MySQL driver: " . (extension_loaded('pdo_mysql') ? 'available' : 'not available') . "\n";
if (extension_loaded('mysqli')) echo "MySQL client library: " . mysqli_get_client_info() . "\n";
echo "Server .env file found: " . ($envFound ? 'yes' : 'no') . "\n";

$dbHost = $getConfig(['DB_HOST', 'DB_HOSTNAME', 'DB_SERVER', 'MYSQL_HOST', 'DATABASE_HOST']);
$dbName = $getConfig(['DB_NAME', 'DB_DATABASE', 'MYSQL_DATABASE', 'DATABASE_NAME']);
$dbUser = $getConfig(['DB_USER', 'DB_USERNAME', 'MYSQL_USER', 'DATABASE_USER']);
$dbPass = $getConfig(['DB_PASSWORD', 'DB_PASS', 'DB_PASSWD', 'MYSQL_PASSWORD', 'DATABASE_PASSWORD']);

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
    echo "MySQL server version: not checked (connection settings not found)\\n";
    echo "Recognized database keys in .env: " . implode(', ', array_values(array_intersect(array_keys($config), ['DB_HOST','DB_HOSTNAME','DB_SERVER','MYSQL_HOST','DATABASE_HOST','DB_NAME','DB_DATABASE','MYSQL_DATABASE','DATABASE_NAME','DB_USER','DB_USERNAME','MYSQL_USER','DATABASE_USER','DB_PASSWORD','DB_PASS','DB_PASSWD','MYSQL_PASSWORD','DATABASE_PASSWORD']))) . "\\n";
}
