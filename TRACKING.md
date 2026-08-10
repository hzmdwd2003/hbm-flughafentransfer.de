# HBM WhatsApp Conversion Tracking

## Ziel

Primäre Lead-Aktion der Website: Klick auf einen WhatsApp-Anfragebutton bzw. Absenden eines Website-Anfrageformulars, das anschließend WhatsApp mit einer vorgefüllten Nachricht öffnet.

Die Website kann technisch erkennen, dass WhatsApp geöffnet wurde. Sie kann nicht zuverlässig erkennen, ob der Nutzer die Nachricht in WhatsApp anschließend tatsächlich abgesendet hat.

## Bereits im Code vorhanden

- Google Analytics 4 ID: `G-7REXSWTTEM`
- Google Ads ID: `AW-18239011094`
- Consent standardmäßig `denied`
- Google-Tag wird erst nach Zustimmung geladen
- Event `whatsapp_click`
- Event `generate_lead`
- Google-Ads-Conversion-Event vorbereitet
- separate `Ref:`-Kennungen für Button/Page-Herkunft
- deutsche und englische WhatsApp-Nachrichten

In `script.js` fehlt nur noch:

```js
googleAdsConversionLabel: ''
```

Dort wird später ausschließlich das Label aus `AW-18239011094/LABEL` eingetragen.

## Google Ads – Conversion-Aktion anlegen

1. Google Ads → **Zielvorhaben** → **Conversions** → **Zusammenfassung**.
2. **+ Conversion-Aktion erstellen**.
3. **Website** auswählen.
4. Website: `https://hbm-flughafentransfer.de`.
5. Nach dem Website-Scan die manuelle Einrichtung / Einrichtung mit Code wählen.
6. Conversion-Kategorie: **Angebot anfordern / Request quote**. Falls diese Kategorie in der Oberfläche nicht angeboten wird: **Kontakt**.
7. Conversion-Name: **WhatsApp Anfrage**.
8. Optimierung: **Primär**.
9. Wert: zunächst **keinen Wert verwenden**. Keine fiktiven Umsätze hinterlegen.
10. Zählmethode: **Eine** Conversion pro Anzeigeninteraktion.
11. Attributionsmodell: **Datengetrieben**, sofern Google Ads dies anbietet; ansonsten Standardeinstellung belassen.
12. Speichern und zur manuellen Tag-Einrichtung gehen.

## Was aus Google Ads benötigt wird

Google zeigt anschließend einen Event-Snippet bzw. einen `send_to`-Wert in dieser Form:

```text
AW-18239011094/XXXXXXXXXXXX
```

Benötigt wird nur der Teil nach dem `/`:

```text
XXXXXXXXXXXX
```

Dieser Wert wird in `script.js` eingetragen:

```js
googleAdsConversionLabel: 'XXXXXXXXXXXX'
```

Danach feuert jeder relevante WhatsApp-Klick nach erteilter Tracking-Einwilligung zusätzlich:

```js
gtag('event', 'conversion', {
  send_to: 'AW-18239011094/XXXXXXXXXXXX'
});
```

## Kampagnenziel

Nach erfolgreichem Test soll die Conversion-Aktion **WhatsApp Anfrage** als primäre Conversion für die betreffenden Airport-Transfer-Kampagnen genutzt werden.

Nicht gleichzeitig irrelevante Ziele wie allgemeine Seitenaufrufe, Klicks ohne Lead-Absicht oder falsche Call-Ziele für Smart Bidding verwenden.

## Test nach Einbau des Labels

1. Neue Website auf einer Test-/Produktions-URL öffnen.
2. Cookie-/Tracking-Einwilligung akzeptieren.
3. Google Tag Assistant öffnen.
4. Einen grünen WhatsApp-Button klicken.
5. Prüfen, dass `whatsapp_click` erscheint.
6. Prüfen, dass `generate_lead` erscheint.
7. Prüfen, dass die Google-Ads-Conversion mit `AW-18239011094/<LABEL>` ausgelöst wird.
8. WhatsApp-Nachricht prüfen: am Ende muss die passende `Ref:` stehen.
9. In Google Ads den Diagnose-/Statusbereich der Conversion-Aktion kontrollieren. Der Status kann nach dem Test zeitverzögert aktualisiert werden.

## Ref-Beispiele

- `START-HERO`
- `START-FORM`
- `START-PREISE`
- `FRA-HEADER`
- `FRA-FORM`
- `HHN-FRANKFURT`
- `HHN-MAINZ`
- `HHN-WIESBADEN`
- `HHN-OFFENBACH`
- `XL-FORM`
- `EN-FRA-FORM`
- `EN-HHN-FRANKFURT`
- `EN-XL-FORM`

Damit ist auch ohne Google Ads direkt in WhatsApp erkennbar, von welcher Seite bzw. welchem CTA die Anfrage stammt.
