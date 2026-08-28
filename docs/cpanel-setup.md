# cPanel Git Setup

The repository is public and is connected to cPanel through HTTPS.

## Clone details

- **Clone URL:** `https://github.com/aiadopt50-zar/travel-by-grace-website.git`
- **Repository Path:** `repositories/travel-by-grace-website`
- **Repository Name:** `Travel By Grace Website`

Do not use `public_html` as the repository path. The `.cpanel.yml` file copies the finished website from `public/` to `/home/travelby/public_html/`.

## Deploying an update

1. Open **Git Version Control** in cPanel.
2. Manage the Travel By Grace repository.
3. Open **Pull or Deploy**.
4. Click **Update from Remote**.
5. Confirm the newest commit is checked out.
6. Click **Deploy HEAD Commit**.

The live website should then reflect the new GitHub version. Never place passwords, customer data, access tokens or payment credentials in this public repository.
