When using NexGEN CRM forms, you are provided with two snippets of code to get started; the global code snippet and the individual form code snippet

---

### Global Form Snippet

The global form snippet should be pasted within the `<head>` of your websites html, and should be included on all pages on the website. This code only needs to be included once regardless of how many form codes you install.

```html
<script src="https://storage.smarttouchinteractive.com/source/forms/smarttouch.js"></script>
<script>smarttouch.visistat(######);</script>
```

`######` is a numeric id assigned to your account and is shown in the form builder snippet.  Not all accounts will have the visistat script included.

---

### Individual Form Code Tag

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
></smarttouch-nexgen>
```
||| Example
![](/assets/form-default.png)
|||

`####` is a numeric id for the __form__ and __client__ parameters, and is shown in the form builder snippet.

---

### Customizing Form Code Tag

The form code tag includes optional parameters which you can use to change the layout of the form displayed on your website.

#### Change width of individual fields

Forms are generated in a grid layout with 12 columns.  By default, the width of each field is 12 columns wide.  To specify an alternative width for each field, you can use the __span#__ parameter, where __#__ is the number of columns a field should occupy.  Using the __spanmobile#__ parameter, you can specify an alternative column width for mobile.  The value is a comma separated list of field IDs.  In the example below, we will take the fields First Name (1), Last Name (2), Email (7), and Phone Number (4) and have them occupy 6 columns on desktop, and 12 columns on mobile.  

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	span6="1,2,7,4"
	spanmobile12="1,2,7,4"
></smarttouch-nexgen>
```
||| Example
![](/assets/form-fieldwidths.png)
|||

---

#### Use placeholders instead of Labels

Adding the __placeholders__ parameter will display the form fields using placeholders instead of labels.  Keep in mind, that some fields will still have labels in place of placeholders (date & time fields).

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	span6="1,2,7,4"
	spanmobile12="1,2,7,4"
	placeholders
></smarttouch-nexgen>
```
||| Example
![](/assets/form-placeholders.png)
|||

---

#### Change the label of the submit button

The __submit__ parameter can be set to a text value which will replace the form's submit button label.

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	span6="1,2,7,4"
	spanmobile12="1,2,7,4"
	placeholders
	submit="Contact Us"
></smarttouch-nexgen>
```
||| Example
![](/assets/form-submitbutton.png)
|||

---

#### Add a disclaimer to the form

The __disclaimer__ parameter allows you to set a disclaimer which will appear next to the submit button.

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	span6="1,2,7,4"
	spanmobile12="1,2,7,4"
	placeholders
	submit="Contact Us"
	disclaimer="By submitting this form, you agree to receive marketing communications from SmartTouch Interactive. You may unsubscribe at any time."
></smarttouch-nexgen>
```
||| Example
![](/assets/form-disclaimer.png)
|||

---

#### Callback Functions

The __onsubmit__, __onsuccess__, __onfail__, __onchange__, __onload__  parameters can be set to a function name will be called whenever the trigger has occured.  The function includes the form DOM element as the passed function parameter, with the exception of the __onchange__ callback, which also passes the field element that has changed.

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	span6="1,2,7,4"
	spanmobile12="1,2,7,4"
	placeholders
	submit="Contact Us"
	disclaimer="By submitting this form, you agree to receive marketing communications from SmartTouch Interactive. You may unsubscribe at any time."
	onsubmit="form_submit"
	onsuccess="form_success"
	onfail="form_fail"
	onchange="form_onchange"
	onload="form_onload"
></smarttouch-nexgen>
```
||| Callbacks (JavaScript)
```js
window.form_submit = (form) => {
	console.log('Form is being submitted');
}
window.form_success = (form) => {
	console.log('Form submission succeeded');
}
window.form_fail = (form) => {
	console.log('Form submission failed');
}
window.form_onchange = (field, form) => {
	console.log('A field in the form has changed');
}
window.form_onload = (form) => {
	console.log('Form has finished loading');
}
```
|||

---

#### GA4 Event Tracking via Google Tag Manager

If GTM is detected, the form will automatically send a GTM event (via DataLayer), which can be used in GTM for tracking a form submission.  There are 4 parameters that can be set to add additional tracking parameters to the datalayer object.  __builder__, __community__, __floorplan__, and __spec__.  The __label__ paramater can be used to customize the event label.  The __location__ parameter can be used to customize the location of the form.

||| Source
```html
<smarttouch-nexgen
	form="####"
	client="####"
	location="Landing Page"
	label="Contact Us Form"
	builder="SmartTouch Homes"
	community="SmartTouch Grove"
	floorplan="The Duchess"
	spec="123 Main St"
></smarttouch-nexgen>
```
||| Resulting Datalayer Event
```js
dataLayer.push({
	event: 'GA4 Event', // Does not change
	stEventName: 'Form Submission', // Does not change
	stLabel: 'Contact Us Form', // Defaults to form name from CRM if 'label' parameter not included
	stLocation: 'Landing Page', // Defaults to 'Website' if 'location' parameter not included
	stAbsoluteTracking: 'Direct', // Defaults to 'Direct' when SmartTouch absolute tracking is not triggered
	stBuilder: 'SmartTouch Homes', // Defaults to empty string if 'builder' parameter not included
	stCommunity: 'SmartTouch Grove', // Defaults to empty string if 'community' parameter not included
	stFloorplan: 'The Duchess', // Defaults to empty string if 'floorplan' parameter not included
	stSpec: '123 Main St' // Defaults to empty string if 'spec' parameter not included
});
```
|||