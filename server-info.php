<?php
declare(strict_types=1);

/*
 * Temporary hosting diagnostic.
 * Remove this file after checking the server because it exposes software versions.
 */

header('Content-Type: text/plain; charset=utf-8');

echo "DAMA SERVER DIAGNOSTICS\n";
echo "PHP version: " . PHP_VERSION . "\n";
echo "PHP SAPI: " . PHP_SAPI . "\n";
echo "mysqli extension: " . (extension_loaded('mysqli') ? 'available' : 'not available') . "\n";
echo "PDO extension: " . (extension_loaded('pdo') ? 'available' : 'not available') . "\n";
echo "PDO MySQL driver: " . (extension_loaded('pdo_mysql') ? 'available' : 'not available') . "\n";

if (extension_loaded('mysqli')) {
    echo "MySQL client library: " . mysqli_get_client_info() . "\n";
}

$dbHost = getenv('DB_HOST') ?: '';
$dbName = getenv('DB_NAME') ?: '';
$dbUser = getenv('DB_USER') ?: '';
$dbPass = getenv('DB_PASSWORD');

if (extension_loaded('mysqli') && $dbHost !== '' && $dbName !== '' && $dbUser !== '' && $dbPass !== false) {
    mysqli_report(MYSQLI_REPORT_OFF);
    $db = @new mysqli($dbHost, $dbUser, $dbPass, $dbName);

    if ($db->connect_errno) {
        echo "MySQL server version: connection failed (" . $db->connect_errno . ")\n";
    } else {
        echo "MySQL server version: " . $db->server_info . "\n";
        $db->close();
    }
} else {
    echo "MySQL server version: not checked (DB_HOST, DB_NAME, DB_USER and DB_PASSWORD environment variables are not all configured)\n";
}
