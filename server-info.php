<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');

$config = [];
$envFileFound = false;
$searchRoot = dirname(__DIR__); // Webzdarma web root; stays inside open_basedir.
$skipDirs = ['.git', 'node_modules', 'vendor', 'cache', 'tmp'];
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($searchRoot, FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);
foreach ($iterator as $item) {
    if ($iterator->getDepth() > 5) {
        if ($item->isDir()) $iterator->next();
        continue;
    }
    if ($item->isDir() && in_array($item->getFilename(), $skipDirs, true)) {
        continue;
    }
    if ($item->isFile() && $item->getFilename() === '.env' && is_readable($item->getPathname())) {
        $envFileFound = true;
        foreach (file($item->getPathname(), FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) continue;
            if (!preg_match('/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/', $line, $m)) continue;
            $value = trim($m[2]);
            if (strlen($value) >= 2 && (($value[0] === '"' && str_ends_with($value, '"')) || ($value[0] === "'" && str_ends_with($value, "'")))) {
                $value = substr($value, 1, -1);
            } else {
                $value = preg_replace('/\s+#.*$/', '', $value);
            }
            $config[$m[1]] = $value;
        }
        break;
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
echo "Server .env file found: " . ($envFileFound ? 'yes' : 'no') . "\n";

$dbHost = $getConfig(['DB_HOST', 'DB_HOSTNAME', 'DB_SERVER', 'MYSQL_HOST', 'DATABASE_HOST']);
$dbName = $getConfig(['DB_NAME', 'DB_DATABASE', 'MYSQL_DATABASE', 'DATABASE_NAME']);
$dbUser = $getConfig(['DB_USER', 'DB_USERNAME', 'MYSQL_USER', 'DATABASE_USER']);
$dbPass = $getConfig(['DB_PASSWORD', 'DB_PASS', 'DB_PASSWD', 'MYSQL_PASSWORD', 'DATABASE_PASSWORD']);

if (extension_loaded('mysqli') && $dbHost !== '' && $dbName !== '' && $dbUser !== '') {
    mysqli_report(MYSQLI_REPORT_OFF);
    $db = @new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($db->connect_errno) {
        echo "MySQL server version: connection failed (error " . $db->connect_errno . ")\n";
    } else {
        echo "MySQL server version: " . $db->server_info . "\n";
        $db->close();
    }
} else {
    echo "MySQL server version: not checked (database settings unavailable)\n";
    echo "Recognized database keys: " . implode(', ', array_values(array_intersect(array_keys($config), ['DB_HOST','DB_HOSTNAME','DB_SERVER','MYSQL_HOST','DATABASE_HOST','DB_NAME','DB_DATABASE','MYSQL_DATABASE','DATABASE_NAME','DB_USER','DB_USERNAME','MYSQL_USER','DATABASE_USER','DB_PASSWORD','DB_PASS','DB_PASSWD','MYSQL_PASSWORD','DATABASE_PASSWORD']))) . "\n";
}
