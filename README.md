# Travel By Grace — boutique weekend preview

Preview branch: `preview/boutique-weekends`

[Open the private design preview](https://travel-by-grace-weekends.milanbasson9.chatgpt.site)

This branch contains the complete redesigned website in `public/`. It is ready to serve as a static site; there is no build step, package installation, PHP dependency, or private API key.

## Included

- A boutique homepage led by weekend experiences, with Garden Route transport and airport transfers still visible.
- Lucille’s clean, real portrait replacing the corrupted JPEG.
- A dedicated Mamma Mia weekend story containing all 30 Facebook album captures.
- Ten original supplied photographs, including Lucille and the vehicle.
- Eleven earlier generated travel illustrations, explicitly labelled as inspiration.
- Photo galleries with keyboard, touch-swipe and native dialog controls.
- A WhatsApp enquiry form that prepares a draft for the visitor to send.
- Responsive layouts, image alternatives, booking information and a privacy page.

## Preview locally

From this checkout, run:

```sh
python3 -m http.server 8000 --directory public
```

Open `http://localhost:8000`. Use a web server so that the root-relative asset paths and trip-story routes resolve correctly.

## Deploy for preview

Publish directory: **`public`**. Build command: **none**. Serve this directory at the root of a preview hostname, not inside a URL subfolder.

The branch’s `.cpanel.yml` copies the site to `/home/travelby/travel-by-grace-preview/`. Configure a separate preview subdomain with that document root and deploy this branch from a separate cPanel Git checkout. See [cPanel preview setup](docs/cpanel-setup.md).

This branch does not replace the existing production `main` branch or its website. The preview uses `noindex` headers and a disallowing `robots.txt`; review those before a later public launch.

## Editing and media

Edit the checked-in HTML, CSS and JavaScript in `public/` directly. Every displayed image is committed locally; there are no expiring Facebook CDN URLs. `public/assets/gallery.json` lists the 30-photo trip album, 10-photo camera roll and 11 illustrated ideas. The same gallery data is embedded in each HTML page to keep the static galleries self-contained.

The Facebook files are browser captures from the supplied album, not original camera downloads. The preserved original source files and image-generation inputs remain in the new Site source checkout; this deployable branch includes all 51 optimised full images and their thumbnails.

## Validation

The five HTML pages have been checked for missing local files, broken internal anchors and gallery indices. All 102 WebP files decode successfully, including the replacement portrait. JavaScript syntax passes Node’s syntax check. Browser interaction and layout review remain for the preview.
