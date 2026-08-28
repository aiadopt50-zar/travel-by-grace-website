# cPanel Git Setup

## Recommended private-repository method

The GitHub repository is private, so cPanel should connect through SSH with a repository deploy key.

### Clone details

- **Clone URL:** `git@github.com:aiadopt50-zar/travel-by-grace-website.git`
- **Repository Path:** `repositories/travel-by-grace-website`
- **Repository Name:** `Travel By Grace Website`

Do not use `public_html` as the repository path. The repository includes development and documentation files; `.cpanel.yml` copies only the live files from `public/` into `/home/travelby/public_html/`.

## SSH key outline

1. Open cPanel Terminal or connect through SSH.
2. Create a dedicated SSH key for this repository.
3. Add the public key in GitHub under repository **Settings → Deploy keys**.
4. Read-only access is enough when cPanel only pulls from GitHub.
5. Test the GitHub SSH connection.
6. Clone the repository through cPanel Git Version Control.

Never put a GitHub password or personal-access token into the Clone URL.

## Deployment

After a successful clone:

1. Open the repository under cPanel Git Version Control.
2. Pull or update from the `main` branch.
3. Use **Deploy HEAD Commit** where available.
4. The `.cpanel.yml` tasks copy the website files to `public_html`.

Before first deployment, keep a backup of any existing files in `public_html`.
