# Event Tracking

The SmartTouch script (`smarttouch.js`) tracks user engagement events and pushes them to:

- `window.dataLayer` as a `GA4 Event` (for Google Tag Manager / GA4)
- `window.uetq` (Microsoft/Bing UET tag), and
- an internal `events` array used for form-submission reporting.

Every tracked event carries a common set of properties:

| Property                                               | Description                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `stEventName`                                          | The event/action name (e.g. `Click to Call`, `Driving Directions`, custom name)                                  |
| `stLabel`                                              | Human readable label for the element/event                                                                       |
| `stLocation`                                           | Site identifier, from `smarttouch.website` (default `'Website'`)                                                 |
| `stAbsoluteTracking`                                   | Lead source, from `smarttouch.leadSource` (default `'Direct'`)                                                   |
| `stCommunity` / `stBuilder` / `stFloorplan` / `stSpec` | Optional context, auto-filled if `smarttouch.community` / `.builder` / `.floorplan` / `.spec` are set as strings |

Each element is only tracked once per page load (deduplicated via an internal flag on the element).

---

## Automatic Tracking (no setup required)

These fire automatically without any attributes or code, based on link `href`:

| Event                | Trigger                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `Click to Call`      | Any `a[href^="tel:"]` link                                         |
| `Click to Email`     | Any `a[href^="mailto:"]` link                                      |
| `Driving Directions` | Any link to `google.com/maps`, `goo.gl/maps`, or `maps.app.goo.gl` |
| `Form Submission`    | Fires automatically when a SmartTouch form successfully submits    |

To disable any of these, set the corresponding flag to `false` before the elements render:

```js
window.smarttouch.trackCalls = false; // disable Click to Call
window.smarttouch.trackEmails = false; // disable Click to Email
window.smarttouch.trackMaps = false; // disable Driving Directions
```

---

## 1. Data Attribute Tracking (recommended)

The simplest way to track a custom engagement event is to add a `data-sttrack` attribute to any clickable element. No JavaScript is required, and it works on elements added to the page at any time (SmartTouch watches the DOM for new matches).

```html
<button data-sttrack="Brochure Download">Download Brochure</button>
```

Clicking this button tracks an `Engagement` event named `Brochure Download`, using the element's text as the label.

### Supported data attributes

| Attribute          | Required | Description                                                                                         |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `data-sttrack`     | Yes      | The event name (`stEventName`). Presence of this attribute is what enables tracking on the element. |
| `data-stlabel`     | No       | Overrides the auto-detected label (`stLabel`).                                                      |
| `data-stcommunity` | No       | Overrides `stCommunity` for this event only.                                                        |
| `data-stbuilder`   | No       | Overrides `stBuilder` for this event only.                                                          |
| `data-stfloorplan` | No       | Overrides `stFloorplan` for this event only.                                                        |
| `data-stspec`      | No       | Overrides `stSpec` for this event only.                                                             |

### Example with overrides

```html
<a
	href="/floorplans/the-oakwood"
	data-sttrack="Floorplan View"
	data-stlabel="The Oakwood"
	data-stcommunity="Sunset Ridge"
	data-stfloorplan="The Oakwood">
	View Floorplan
</a>
```

> `data-sttrack` events are dispatched directly to `dataLayer`/`uetq` and are **not** added to the internal `events` array (which only tracks calls, emails, directions, and form submissions).

---

## 2. JavaScript API Tracking

Use the `window.smarttouch` instance methods when you need tracking logic driven from code (e.g. inside a framework component, or when a data attribute isn't practical).

### `smarttouch.trackEvent(name, label, extraProps)`

Tracks a generic `Engagement` event.

```js
window.smarttouch.trackEvent('Brochure Download', 'Sunset Ridge Brochure', { stCommunity: 'Sunset Ridge' });
```

### `smarttouch.trackCall(el, label, extraProps)` / `smarttouch.trackEmail(el, label, extraProps)` / `smarttouch.trackMap(el, label, extraProps)`

Manually track a call, email, or maps link click (useful if automatic tracking was disabled, or the link is generated dynamically). `el` must be the anchor element; `label` and `extraProps` are optional overrides.

```js
document.querySelector('#custom-call-link').addEventListener('click', (e) => {
	window.smarttouch.trackCall(e.currentTarget);
});
```

### `smarttouch.trackForm(label, extraProps)`

Manually track a `Form Submission` event (SmartTouch forms do this automatically).

```js
window.smarttouch.trackForm('Contact Us', { stCommunity: 'Sunset Ridge' });
```

### `smarttouch.track(category, action, label, el)`

Generic dispatcher mirroring legacy Google Analytics `category`/`action`/`label` events. Routes to the correct method above based on `category`/`action`:

```js
window.smarttouch.track('Engagement', 'Brochure Download', 'Sunset Ridge Brochure');
window.smarttouch.track('Contact', 'Click to Call', 'Sales Line', linkElement);
```

### `smarttouch.trackClick(selector, name, label, extraProps)`

Registers a persistent click listener for any current or future element matching `selector`. Fires `trackEvent(name, label, extraProps)` whenever a matching element is clicked.

```js
window.smarttouch.trackClick('.hero .cta-button', 'Hero CTA Click', 'View Homes');
```

### `smarttouch.onClick(selector, callback)`

Registers a click callback for elements matching `selector`. `callback(el)` receives the clicked element; call any tracking method yourself inside it.

```js
window.smarttouch.onClick('.gallery-thumb', (el) => {
	window.smarttouch.trackEvent('Gallery Image View', el.dataset.imageTitle);
});
```

### `smarttouch.onLoad(selector, callback)`

Fires `callback(el)` once, as soon as an element matching `selector` appears in the DOM (does not require a click).

```js
window.smarttouch.onLoad('.virtual-tour-embed', (el) => {
	window.smarttouch.trackEvent('Virtual Tour Viewed', el.dataset.community);
});
```

### `smarttouch.trackAdvanced(selector, target, callback)`

For a container matching `selector`, listens for clicks on any descendant matching `target`. `callback(container)` must return an array of arguments to pass to `trackEvent(...)`, or a falsy value to skip tracking. Works on elements added to the page at any time.

```js
window.smarttouch.trackAdvanced('.community-card', 'a.details-link', (card) => {
	return ['Community Details Click', card.dataset.communityName];
});
```

### `smarttouch.trackEventAdvanced(base, target, callback)`

Same behavior as `trackAdvanced`, but binds immediately to elements present at call time (does not watch for elements added later). Use this only when the elements already exist on the page when it's called.

---

## Global Helper Functions

Convenience wrappers around the API above, exposed on `window` for use in inline `onclick` handlers or non-module scripts:

| Function                                  | Equivalent                                  |
| ----------------------------------------- | ------------------------------------------- |
| `window.stTrack(category, action, label)` | `smarttouch.track(category, action, label)` |
| `window.stTrackCall(el, label)`           | `smarttouch.trackCall(el, label)`           |
| `window.stTrackMap(el, label)`            | `smarttouch.trackMap(el, label)`            |

```html
<a
	href="tel:+18005551234"
	onclick="stTrackCall(this, 'Sales Hotline')"
	>Call Us</a
>
```

---

## Configuring Global Context

Set these on `window.smarttouch` (typically once, near the top of the page) so they're automatically included on every tracked event:

```js
window.smarttouch.website = 'Sunset Ridge Microsite'; // stLocation
window.smarttouch.community = 'Sunset Ridge'; // stCommunity
window.smarttouch.builder = 'ABC Homes'; // stBuilder
window.smarttouch.floorplan = 'The Oakwood'; // stFloorplan
window.smarttouch.spec = 'Lot 42'; // stSpec
```
