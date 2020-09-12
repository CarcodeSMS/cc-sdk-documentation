# SDK 2.0 for developers

## Agenda
* [Getting started](#getting-started)
* [Widget settings](#widget-settings)
* [Style settings](#style-settings)
* [Public API](#public-api)

## Getting started

[Default SDK instruction](https://docs.google.com/document/d/11WVvjKUNsnZx3BnDH0Ttav-ac8mesgU3U7QZovGaKSA/edit)

To get started with the Carcode widget SDK, first go to your dealer settings in the Carcode dashboard to grab your "Default Widget Embed Code" (or create a new configured widget to get a new embed code). The embed code will have the format 

``` html
<script src='https://www.carcodesms.com/widgets/s/[id].js' type='text/javascript' async defer></script>
```

Once you have the embed code above, you can use it to embed the Carcode widget JavaScript toolkit into your website by simply inserting it either right before the closing `</head>` tag or in the HTML body right before the closing `</body>` tag in your site layout's HTML.

#### Custom SDK elements
Carcode widget it finds all elements containing the class `sms-button` and attaches Carcode widget click handlers to them.

Example of custom element with default behavior:

``` html
<a class="sms-button" href="sms://+15551234567" data-make="Volkswagen" data-model="Golf R"
  data-stock_no="12345" data-vin="ABC123" data-year="2015" data-status="New">Text Us</a>
```

You can specify which widget should be opened by clicking on SDK button using  `data-widget` attribute. Possible options one of:
* 'livechat'
* 'sms'
* 'facebook'

Example of custom element to open SMS form:

``` html
<a class="sms-button" href="sms://+15551234567" data-make="Volkswagen"  
  data-model="Golf R" data-stock_no="12345" data-vin="ABC123"  
  data-year="2015" data-status="New" data-widget="sms">Text Us</a>
```

#### Override phone numbers

`data-numbers` attribute overrides phone numbers from widget config for sending SMS. Examples below show all formats supported in data-numbers attribute.

Override only sales phone number:
``` html
<a class="sms-button" data-numbers="sales=sms://+15551234567">Text Us</a>
<a class="sms-button" data-numbers="sms://+15551234567">Text Us</a>
<a class="sms-button" data-numbers="sales=sms:+15551234567">Text Us</a>
<a class="sms-button" data-numbers="sms:+15551234567">Text Us</a>
```

Override only service phone number:  
``` html
<a class="sms-button" data-numbers="service=sms://+15551234567">Text Us</a>
<a class="sms-button" data-numbers="service=sms:+15551234567">Text Us</a>
```

Override both sales and service phone numbers:  
``` html
<a class="sms-button" data-numbers="sales=sms://+15551234567|service=sms://+15551234568">Text Us</a>
<a class="sms-button" data-numbers="sales=sms:+15551234567|service=sms:+15551234568">Text Us</a>
```

## Widget settings
With the Carcode JavaScript widget toolkit embedded into the page, you’ll be able to customize the behavior of your SMS texting button(s) using the global configuration variable `__carcode` introduced into the page. 

`__carcode` should be defined before loading embed code: 

``` html
<script type='text/javascript'>
  window.__carcode = {
    skipButton: true
  };
</script>

<script src='https://www.carcodesms.com/widgets/s/[id].js' type='text/javascript' async defer></script>
```

#### Options

| Setting | Type | Default value | Description |
| -------- | -------- | -------- | -------- |
| skipButton | Boolean| false | Indicates if carcode widget should skip the default fixed button or not |
| sdkWidget | String| 'default' | Indicates which widget should be opened by clicking on SDK button. Possible options one of ['livechat', 'sms', 'facebook'] |
| sdkButtonDefaultClass | String| 'sms-button' | css class that will be used to look up SDK buttons on the page |
| appendWidgetTo | String | document.body | Id of the container where carcode widget will be rendered |
| manualControl | Boolean | false | Indicates if carcode widget should automatically init and render to the container |
| skipHeader | Boolean | false | Indicates if carcode widget should not append all it's headers |
| skipPiiForm | Boolean | false | Indicates if carcode widget should not append pii form |
| skipChatBackButton | Boolean | false | Indicates if carcode widget should not append back button in chat view |
| skipSdkButtons | Boolean | false | Indicates if carcode widget should not try to look for sdk buttons on the page |
| skipMobileApp | Boolean | false | Indicates if carcode widget should not try to open sms messenger on mobile phones |
| tracking | Object | {} | Object with params to override or extend gtm or edw events. E.g. { edw: { param1: 'test' }, gtm: { param1: 'test' } } |
| disableGoogleAnalytics | Boolean | false | Indicates if carcode widget should disable all GA tracking |
| disableEdwAnalytics | Boolean | false | Indicates if carcode widget should disable all EDW tracking |
| disableGtmAnalytics | Boolean | false | Indicates if carcode widget should disable all GTM tracking |
| cannedMessagesType | String | 'default' | Indicates the type of canned messages view. Right now we support 'default' or 'bubble' type |
| alwaysOpenForm | Boolean | The value configured in widget settings using carcode admin app | Indicates if carcode widget should always open form even for mobile experience |
| optOutText | String | Don't worry - you can opt-out by texting STOP when you don't want to receive any more texts from us. | Configure the opt out text below the phone input for sms form |
| phoneNumberPolicy | String | 'default' | Specify phone number policy. <br><br>For `'edmunds-only'` policy carcode widget will only try to use edmunds.com phone number. If no edmunds.com number, then widget will not work; <br><br>For `'edmunds-first'` policy carcode widget will firstly try to use edmunds.com number, if it exists then no additional actions. If edmunds.com number doesn't exist, then carcode widget will use sales phone number for chat and sales form, and service for service form;<br><br>For `'default'` policy carcode widget will use sales number for chat and sales form, service number for service form. |
| skipDraggable | Boolean | false | Indicates if carcode widget should not be draggable |
| introText | String | The value configured in widget settings using carcode admin app | Text for the primary input placeholder |
| floatingButtonPosition | String | The value configured in widget settings using carcode admin app | Position of default floating widget button. Possible options one of ['bottom right', 'bottom center', 'bottom left', 'side left center', 'side lower left', 'side right center', 'side lower right'] |
| enableCallOut | Boolean | The value configured in widget settings using carcode admin app | Indicates if carcode widget should append callout popup |
| useGlobalCalloutStatus  | Boolean | false | Indicates if closing of callout popup is remembered for all carcode widgets regardless widget slug |
| callOutDelay | Number | The value configured in widget settings using carcode admin app | Number of seconds until callout popup will be displayed |
| callOutAgentNamesOption | String | The value configured in widget settings using carcode admin app | Specify agent names used in callout popup. Possible values: <br> ```DISABLED``` - do not show agent names, dealership name only; <br> ```STANDARD``` - show one of predefined names; <br> ```DEALER_AGENT``` - show one of active users from the dealership. |
| callOutDisplayText | String | The value configured in widget settings using carcode admin app | Text which should be displayed on callout popup (supports links in format [link\|www.example.com] and vehicle tags: {vin}, {vehicle_make}, {vehicle_model}, {vehicle_year}) |
| zIndex | Number | 2147483647 | Maximum value of 'z-index' css property for widget elements. |
| widgetButtonChannel | String | 'sms_first' | Channel of default widget button. Possible values: <br> `livechat` - becomes the sole channel for the widget; <br> `sms` - SMS becomes the sole channel for the widget; <br> `facebook` - FB Messenger becomes the sole channel for the widget; <br> `chat_first` - Chat is moved to the primary position on the widget; <br> `sms_first` - SMS is moved to the primary position on the widget; <br> `facebook_first` - FB Messenger is moved to the primary position on the widget; | 
| chatClickHandler | Function | undefined | Function overrides default behaviour of chat button. |
| themeConfiguration | Object | {} | Object with theme configuration for the widget. These settings will override all widget default settings. Please see [next section](#Theme) for more details.|

#### Example of the SDK configuration
``` javascript
window.__carcode = {
  skipButton: true, /*doesn't attach default floating button to page*/
  appendWidgetTo: 'edmundsCarcodeWidgetContainer',
  manualControl: true,
  skipHeader: true,
  skipSdkButtons: true,
  disableGoogleAnalytics: true,
  disableEdwAnalytics: true,
  disableGtmAnalytics: true,
  tracking: {
    gtm: {
      synpartner: 'some_test_synpartner',
    },
  },
  themeConfiguration: {
    formBackgroundColor: '#f3f3f3',
    formLightBackgroundColor: '#ffffff',
  },
};
```

## Style settings
Carcode widget is installed on thousands of dealerships pages and we should have some protect mechanism for our styles. We decided to not use iframe, that's why we add !important with webpack loader to all our styles. But we provide you mechanisms to customize styles: global CSS classes and `__carcode.themeConfiguration` variable.

#### SDK global classes
You may use these classes to add custom css styles.
You should use `!important` for all styles. 

| Setting | Description |
| -------- | -------- |
| .CarcodeWidgetGlobalSmsContainer | Appended to container of sms forms |
| .CarcodeWidgetGlobalChatContainer | Appended to container of chat views |
| .CarcodeWidgetGlobalButtonContainer | Appended to container of carcode widget button |
| .CarcodeWidgetGlobalCallOutContainer | Appended to container of callOut views|

In this example we add shadow to widget button:
``` css
.CarcodeWidgetGlobalButtonContainer button {
    box-shadow: 0 8px 6px -6px #1c1c1c;
}
```

#### Theme

Widget theme is configured in widget settings using carcode admin app. You may use `__carcode.themeConfiguration` to override it.

Values for color options should be valid [css color value](https://css-tricks.com/almanac/properties/c/color/).

##### Options
| Setting | Description |
| -------- | -------- |
| width | The width of carcode default button in pixels. |
| height | The height of carcode default button in pixels. |
| offsetX | Add offset of n pixles of X axis |
| offsetY | Add offset of n pixels of Y axis |
| buttonTextColor | Button text color |
| primaryColor | Background color of floating button |
| secondaryColor | Secondary widget color |
| buttonBoxShadow | Box shadow of floating button |
| fontSize | Font size of button text |
| fontFamily | Font family for widget |
| formButtonBackgroundColor | Background color of form button |
| formHeaderBackgroundColor | Background color of form header |
| formBackgroundColor | Backgorund color of form |
| formBoxShadow | Box shadow for form |
| callOutFontFamily | Font family of text elements in callout popup. ```fontFamily``` value is used by default. |
| calloutBgColor | Background color for callout |
| callOutBorderRadius | Callout border radius |
| calloutBubbleBorderRadius | Callout bubble border radius |
| calloutBubbleBgColor | Bg color of callout bubble |
| callOutImageBgColor | Bg color of call out image |
| thanksMessageDescriptionColor | Color of the message on thanks view |
| termsBackgroundColor | Background color for terms view |
| chatBackgroundColor | Background color of chat |
| chatInteractiveOptionColor | Color of chat starters and other interective options |
| chatMenuOptionColor | Color of chat menu options |
| chatHeaderSubtitleColor | Color of chat header subtitle |
| chatInputAreaBackgroundColor | Bg Color of chat input area |
| chatReplyMessageBackground | Bg Color of chat reply message |
| chatMessageBackground | Bg color of chat message |
| cannedMessagesActiveColor | Color of active canned messages |
| cannedMessagesColor | Color of canned messages |
| cannedMessagesBorder | Color of canne messages border |
| textLightColor | Light text color |
| textDarkerColor | Darker text color |
| textDarkColor | Dark text color |
| textDarkestColor | Darkest text color |
| warningColor | Color of warning message |
| errorColor | Color of error message |
| successColor | Color of sucess message |
| infoColor | Color of info message |
| separatorColor | Separator color |
| formTitleColor | Color of form title |
| inventorySearchTabBackgroundColor | Background color of inventory search tab |
| inventoriesTabsBgColor | Background color of inventories tabs |
| smsDepartmentSelectorBgColor | Background color of sms departments selector |
| smsFormFooterBgColor | Background color of sms form footer |
| leaseDealsHeaderBgColor | Background color of lease deals header |
| privacyStatementLinkColor | Color of privacy statement link |
| privacyStatementTextColor | Color of privacy statement text |
| disclaimerText | Color of disclaimer text |
| consentFollowUp | Color of consent follow up text |
| borderRadiusXs | Border radius extra small |
| borderRadiusSm | Border radius small |
| borderRadiusMd | Border radius medium |
| borderRadiusLg | Border radius large |
| borderRadiusXlg | Border radius extra large |
| borderRadiusMlg | Border radius mega large |
| toolbarBorderRadius | Border radius of toolbar |
| mainContainerBottomBorderRadius | Bottom border radius of main container |
| scrollBarColor | Color of scroll bar |
| scrollBarBackground | Bg color of scroll bar |

#### Example of the SDK theme configuration:
``` javascript
window.__carcode = {
  themeConfiguration: {
    width: 250,
    height: 50,
    buttonBorderRadius: '3',
    offsetX: 0,
    offsetY: 0,
    formBackgroundColor: '#f3f3f3',
    formLightBackgroundColor: '#ffffff',
    formLightColor: '#555',
    formTextColor: '#999999',
    separatorColor: '#e8ede8',
    backgroundButtonColor: '#007EE5',
    buttonTextColor: '#ffffff',
    fontSize: '16px',
    fontFamily: '\'Open Sans\', \'Arial\', \'Helvetica\', \'sans-serif\'',
    formButtonBackgroundColor: '#007EE5',
    dotColor: '#f3f3f3',
    formBoxShadow: 'rgba(85,85,85,0.5)',
    cannedMessagesColor: '#4A4A4A',
    cannedMessagesBorder: '#d8d8d8',
    chatReplyMessageBackground: '#fff',
    chatMessageBackground: '#e3eaec',
    scrollBarColor: '#c1c1c1',
    scrollBarBackground: '#e9e9e9',
    inventoryButtonBackground: '#777',
    inventoryPrimaryLightColor: '#999',
    inventoryPrimaryDarkColor: '#555',
    inventoryButtonBorderColor: '#eee',
  },
};
```

## Public API

### Constructor
<i>CarcodeWidget()</i><br>
creates a new instance of the widget.
Example of usage:
``` javascript
const widget = new CarcodeWidget();
```

### Custom events
[destroy](#-destroy-i-)  
#### <i>destroy</i>
generate this event if you do not have carcode widget instance object, but want to remove all widgets on the page.
Example of usage:
``` javascript
var event = new CustomEvent('carcode', { detail: 'destroy' });
document.dispatchEvent(event);
```
___

### Methods

[init](#-i-init-callback-i-)  
[destroy](#-i-destroy-i-)  
[attachSmsWidget](#-i-attachsmswidget-i-)  
[detachSmsWidget](#-i-detachsmswidget-i-)  
[openSms](#-i-opensms-i-)  
[openSmsSalesForm](#-i-opensmssalesform-i-)  
[openSmsServiceForm](#-i-opensmsserviceform-i-)  
[openSmsHubForm](#-i-opensmshubform-i-)  
[openChat](#-i-openchat-i-)  
[closeChat](#-i-closechat-i-)  
[openFacebook](#-i-openfacebook-i-)  
[handleChatBack](#-i-handlechatback-i-)  
[getSalesPhoneNumber](#-i-getSalesPhoneNumber-i-)  
[getServicePhoneNumber](#-i-getServicePhoneNumber-i-)  

#### <i>init(callback)</i>
initialize carcode widget. Callback argument will be executed once widget initialized. **This method should be always executed before all actions for manual mode.**  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => console.log('carcode widget has initialized'));
```
___

#### <i>destroy</i>
remove carcode widget from page and free all taken by widget resources.
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.destroy();
});
```
___

#### <i>attachSmsWidget()</i>
render sms form to the widget container  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.attachSmsWidget(); // sms form will be attached to the widget container
});
```
___

#### <i>detachSmsWidget()</i>
remove sms form from the widget container  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.attachSmsWidget(); // sms form will be attached to the widget container
    widget.detachSmsWidget(); // sms form will be removed from the widget container
});
```
___

#### <i>openSms()</i>
trigger openning of the sms channel
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openSms(); // open sms channel
});
```
___

#### <i>openSmsSalesForm()</i>
open sales form inside the sms widget  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openSmsSalesForm(); // open sales form inside sms widget
    widget.attachSmsWidget(); // sms form will be attached to the widget container and sales form will be shown
});
```
___

#### <i>openSmsServiceForm()</i>
open service form inside the sms widget  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openSmsServiceForm(); // open service form inside sms widget
    widget.attachSmsWidget(); // sms form will be attached to the widget container and service form will be shown
});
```
___

#### <i>openSmsHubForm()</i>
open hub form to select between sales and service departments  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openSmsHubForm(); // open hub selector
    widget.attachSmsWidget(); // sms form will be attached to the widget container and hub selector will be shown
});
```
___

#### <i>openChat()</i>
render chat to the container  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openChat();
});
```
___

#### <i>closeChat()</i>
remove chat from the container  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openChat(); // chat renderred
    widget.closeChat(); // chat element removed
});
```
___

#### <i>openFacebook()</i>
open Facebook meesenger in new tab  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openFacebook(); // fb messenger will be opened in new tab
});
```
___

#### <i>handleChatBack()</i>
handle one back button inside the chat view. Can be usefull when client has configured skipHeader to true, but still wants to use 'Inventory Search' feature.  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    widget.openChat(); // chat opened
    // let's assume that customer clicks on inventory search button
    // if client configured skipHeader = true, then client doesn't have the option to go back
    widget.handleChatBack(); // will handle one back click, as a result inventory search will be closed
});
```
___

#### <i>getSalesPhoneNumber()</i>
method returns sales phone number that are used by widget to send messages and estabilish a chat connection. Please, note that if you plan to use this method, you should configure manualControl to true through [sdk settings](#widget-settings).  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    const carcodeSalesPhoneNumber = widget.getSalesPhoneNumber(); // get number
});
```
___

#### <i>getServicePhoneNumber()</i>
method returns service phone number that are used by widget to send service messages. Please, note that if you plan to use this method, you should configure manualControl to true through [sdk settings](#widget-settings).  
Example of usage:
``` javascript
const widget = new CarcodeWidget();
widget.init(() => {
    const carcodeServicePhoneNumber = widget.getServicePhoneNumber(); // get number
});
```
