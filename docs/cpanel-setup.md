# cPanel preview deployment

The preview domain and Git checkout are already configured in cPanel. The deployment path below matches the Domains screenshot supplied on 8 September 2026.

| Setting | Value |
| --- | --- |
| Shareable preview URL | https://preview.travelbygrace.co.za |
| Document root shown in cPanel | `/public_html/preview` |
| Full deployment destination | `/home/travelby/public_html/preview/` |
| Preview Git checkout | `/home/travelby/repositories/travel-by-grace-preview` |
| Branch | `preview/boutique-weekends` |

## Publish the latest preview

1. Open **Git Version Control** in cPanel and manage **Travel By Grace Preview**.
2. Confirm the checked-out branch is `preview/boutique-weekends`.
3. Open **Pull or Deploy** and click **Update from Remote**.
4. Confirm HEAD shows the latest commit, then click **Deploy HEAD Commit**.
5. Check that **Last Deployed SHA** matches HEAD.
6. Open [the preview website](https://preview.travelbygrace.co.za) in a private browser tab and check the homepage, portrait, Mamma Mia gallery and WhatsApp draft form.

Only `public/` is copied into the document root. There is no build step or server-side form service. The website uses root-relative paths, so use the preview subdomain URL above rather than the `/preview/` path on the main domain.

An earlier branch revision copied files into `/home/travelby/travel-by-grace-preview/`, which did not match the configured domain. Pull and redeploy the corrected configuration to update the browser-visible preview. No domain-root change is needed for this correction.

Before a future production release, agree the target deployment separately and update the preview-only robots/header settings and deployment destination.
