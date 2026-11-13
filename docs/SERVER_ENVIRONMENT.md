# Server environment

Last verified: 2026-11-13

## Production hosting

The project is hosted on Webzdarma.

| Item | Verified value |
|---|---|
| PHP version | 8.3.36 |
| PHP SAPI | `fpm-fcgi` |
| MySQL server version | 8.0.46-37 |
| MySQL client library | `mysqlnd 8.3.36` |
| `mysqli` extension | Available |
| PDO extension | Available |
| PDO MySQL driver | Available |
| Server `.env` file | Found |
| Database connection | Successful |

These values were confirmed by the server-side diagnostic script `server-info.php`. The diagnostic connected to MySQL using the server's existing `.env` configuration. Credentials and other secret values were not displayed or stored in this document.

## Development compatibility

- Keep PHP code compatible with PHP 8.3.
- Target MySQL 8.0 for SQL and database features.
- PDO and the PDO MySQL driver are available. Prefer PDO consistently for application database access rather than mixing database APIs without a clear reason.
- `mysqli` is also available if a specific implementation requires it.
- The hosting environment uses PHP-FPM (`fpm-fcgi`); do not assume unrestricted server-level configuration or shell access.

## Environment file and deployment security

- The production `.env` file already exists on the server.
- Never commit, overwrite, delete, or include `.env` or any `.env.*` file in deployment.
- The GitHub Actions FTP deployment excludes `.env` and `.env.*`.
- The root `.htaccess` denies direct HTTP access to files whose names begin with `.env`.
- Application code may read the server-side `.env` file, but must never expose its contents, credentials, or secrets in responses, logs, diagnostics, or browser output.
- Do not use `putenv()` for loading environment configuration.

## Deployment

- The production deployment is triggered by pushes to the `main` branch and can also be started manually with `workflow_dispatch`.
- GitHub Actions deploys the repository to Webzdarma using FTP.
- Keep deployment exclusions for Git metadata, GitHub workflow files, dependencies not intended for production, and all `.env` files.

## Maintenance note

Re-run the server diagnostic after hosting or PHP/MySQL upgrades. Update this document only with verified values; never add credentials or secret configuration values.
