# HBM Website – Deployment Checklist

## Current status

The redesigned HBM website is prepared on a separate branch. The current live site/domain must remain untouched until advertising, conversion tracking and hosting are ready.

Do **not** add a CNAME or change DNS yet.

## Pages prepared

### German
- `/` – main page
- `/flughafentransfer-frankfurt.html` – Frankfurt Airport (FRA)
- `/flughafentransfer-frankfurt-hahn.html` – Frankfurt-Hahn (HHN)
- `/xl-flughafentransfer.html` – XL transfer, up to 8 passengers
- `/impressum.html`
- `/datenschutz.html`

### English
- `/en/`
- `/en/frankfurt-airport-transfer.html`
- `/en/frankfurt-hahn-airport-transfer.html`
- `/en/xl-airport-transfer.html`

## Before go-live

1. **Google Ads WhatsApp conversion**
   - Create/verify the Google Ads conversion action `WhatsApp Anfrage`.
   - Copy the conversion label from `AW-18239011094/<LABEL>`.
   - Add only `<LABEL>` to `HBM.googleAdsConversionLabel` in `script.js`.
   - Test one consented WhatsApp click with Google Tag Assistant / Google Ads diagnostics.

2. **Analytics check**
   - Confirm GA4 receives `whatsapp_click` and `generate_lead`.
   - Confirm Google Ads receives the WhatsApp conversion only after consent.
   - Verify the `Ref:` value in the generated WhatsApp message identifies the source button/page.

3. **Hosting / privacy**
   - Decide the production hosting provider.
   - Add the concrete hosting-provider information to `datenschutz.html` if required by the final setup.
   - Recheck the final production tracking configuration against the privacy policy.

4. **Smoke test**
   - Desktop: Chrome, Safari, Edge.
   - Mobile: iPhone/Safari and Android/Chrome.
   - Check all forms, WhatsApp buttons, phone/email links, language switch and legal pages.
   - Check that FRA / Hahn / XL cards are white by default and black only on hover/focus.

5. **SEO check**
   - Verify canonical URLs after the domain is connected.
   - Verify `robots.txt` and `sitemap.xml` return HTTP 200.
   - Submit `https://hbm-flughafentransfer.de/sitemap.xml` in Google Search Console.
   - Request indexing for the German and English landing pages.

6. **Domain connection – only when approved**
   - Configure the chosen host first.
   - Then configure DNS/custom domain according to that host.
   - Only add a repository `CNAME` file if the chosen hosting solution specifically requires it.
   - Do not remove the old live site until the new deployment is reachable and tested.

7. **Campaign rollout**
   - Existing PMax: repair conversion goal before scaling.
   - Search FRA → `/flughafentransfer-frankfurt.html`
   - Search Frankfurt-Hahn → `/flughafentransfer-frankfurt-hahn.html`
   - Search XL → `/xl-flughafentransfer.html`
   - English FRA campaign → `/en/frankfurt-airport-transfer.html`
   - Meta Ads only after tracking and landing pages are live and tested.

## Tracking already configured

- GA4: `G-7REXSWTTEM`
- Google Ads: `AW-18239011094`
- Google Ads conversion label: intentionally left blank until the new `WhatsApp Anfrage` conversion is confirmed.

## Intentional non-actions

- No production-domain/DNS change.
- No CNAME added.
- No merge into the live branch until explicitly approved.
