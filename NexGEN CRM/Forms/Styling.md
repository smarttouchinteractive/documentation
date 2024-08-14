The style of the form can be customized in CSS via CSS3 variables (recommended) or directly customizing the selector itself.

### Individual CSS Variables

```css
.stForm {
	--stform-font-style: normal;
	--stform-font-weight: 400;
	--stform-font-size: 16px;
	--stform-font-line-height: 1.2em;
	--stform-font-family: sans-serif;
	--stform-label-font-style: normal;
	--stform-label-font-weight: 400;
	--stform-label-font-size: 16px;
	--stform-label-font-line-height: 1.2em;
	--stform-label-font-family: sans-serif;
	--stform-field-padding: 10px;
	--stform-field-color: #444;
	--stform-field-background: #fff;
	--stform-field-radius: 0px;
	--stform-field-border-size: 1px;
	--stform-field-border-style: solid;
	--stform-field-border-color: #ccc;
	--stform-field-font-style: normal;
	--stform-field-font-weight: 400;
	--stform-field-font-size: 16px;
	--stform-field-font-line-height: 1.2em;
	--stform-field-font-family: sans-serif;
	--stform-button-padding: 15px 30px;
	--stform-button-radius: 4px;
	--stform-button-color: #fff;
	--stform-button-background: var(--primaryColor);
	--stform-button-border-size: 0;
	--stform-button-border-style: solid;
	--stform-button-border-color: var(--primaryColor);
	--stform-button-font-style: normal;
	--stform-button-font-weight: 400;
	--stform-button-font-size: 16px;
	--stform-button-font-line-height: 1.2em;
	--stform-button-font-family: sans-serif;
	--stform-disclaimer-font-style: italic;
	--stform-disclaimer-font-weight: 400;
	--stform-disclaimer-font-size: 14px;
	--stform-disclaimer-font-line-height: 1.2em;
	--stform-disclaimer-font-family: sans-serif;
	--stform-checkbox-size: 24px;
}
```

### Combined CSS Variables

These variables can be used if you prefer to use combined CSS variable rather than the individual CSS variables above.  The defaults use the individual variables above to create a combined variable, so it is recommended to use the individual variables unless you need more control of the values.

```css
.stForm {
	--stform-field-border: var(--stform-field-border-size) var(--stform-field-border-style) var(--stform-field-border-color);
	--stform-button-border: var(--stform-button-border-size) var(--stform-button-border-style) var(--stform-button-border-color);
	--stform-font: var(--stform-font-style) var(--stform-font-weight) var(--stform-font-size) / var(--stform-font-line-heigh	(--stform-font-family);
	--stform-label-font: var(--stform-label-font-style) var(--stform-label-font-weight) var(--stform-label-font-size)	(--stform-label-font-line-height) var(--stform-label-font-family);
	--stform-field-font: var(--stform-field-font-style) var(--stform-field-font-weight) var(--stform-field-font-size)	(--stform-field-font-line-height) var(--stform-field-font-family);
	--stform-button-font: var(--stform-button-font-style) var(--stform-button-font-weight) var(--stform-button-font-size)	(--stform-button-font-line-height) var(--stform-button-font-family);
	--stform-disclaimer-font: var(--stform-disclaimer-font-style) var(--stform-disclaimer-font-weight) var(--stform-disclaimer-font-size)	(--stform-disclaimer-font-line-height) var(--stform-disclaimer-font-family);
}

```