# Travel By Grace Website

Official website source for **Travel By Grace**, an owner-operated personal travel and transport service based in Klein Brak River, Western Cape.

## Deployment

The repository is connected to cPanel Git Version Control.

1. In cPanel, open **Git Version Control**.
2. Manage `travel-by-grace-website`.
3. Select **Pull or Deploy**.
4. Click **Update from Remote**.
5. After the new commit appears, click **Deploy HEAD Commit**.

The `.cpanel.yml` deployment file copies the contents of `public/` to `/home/travelby/public_html/`.

## Website structure

- `public/index.html` — main website
- `public/privacy.html` — privacy policy
- `public/booking-terms.html` — booking terms
- `public/contact.php` — contact-form mail handler
- `public/assets/` — styles, JavaScript and brand artwork

## Important

Do not store passwords, access tokens, customer information or payment credentials in this public repository.
