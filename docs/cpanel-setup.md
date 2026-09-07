# cPanel preview setup

This branch deploys into a separate preview document root: `/home/travelby/travel-by-grace-preview/`.

1. Create a preview subdomain in cPanel and give it the document root above. Keep the existing website’s document root as it is.
2. In **Git Version Control**, create a separate checkout of `https://github.com/aiadopt50-zar/travel-by-grace-website.git`, for example under `repositories/travel-by-grace-preview`.
3. Check out `preview/boutique-weekends` in that preview repository. From the cPanel Terminal, the command inside that checkout is `git switch --track origin/preview/boutique-weekends`.
4. In the preview repository’s **Pull or Deploy** view, use **Update from Remote**, confirm the branch and commit, then **Deploy HEAD Commit**.
5. Open your configured preview hostname over HTTPS. Check the homepage, Lucille’s portrait, the Mamma Mia story, photo navigation and the WhatsApp draft form.

Only `public/` is published. There is no build step or server-side form service. The `.cpanel.yml` in this branch points to the preview folder, while the production configuration remains on `main`.

The site uses root-relative paths, so the preview should have its own hostname. A subfolder such as `/preview/` on the existing website needs path adaptation and is not the configuration of this branch.

Before a future production release, agree the target deployment separately and update the preview-only robots/header settings and deployment destination.
