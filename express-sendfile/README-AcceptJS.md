# Accept.js Description

Accept.js is a JavaScript-based solution for sending secure payment data directly to Authorize.Net. The Accept JavaScript library intercepts the payment data before it is passed to merchant server and instead submits it directly to Authorize.Net.

## Prerequisite

* In Order to utilize the functionality, please provide the below plugin in the HTML file.

SANDBOX: https://jstest.authorize.net/v1/Accept.js  

* The functionality for Accept.js is written in pure JavaScript and pages are designed using Bootstrap classes.

## Accessing Accept.js Page

There are two ways to navigate to Accept.js page.

* The Accept.js page can be accessed from the dashboard page by clicking on the Accept.js tab. 
* Access directly by providing the product type query string in the URL.
 
The URL format for Accept.js is as follows,

https://IPAddress:PortNumber/index.html?ProductType=Acceptjs

## Workflow

Accept.js accepts both card and bank payments. A screen/form is created with the below mentioned fields for card and bank payment with required validations.  

### Card Payment Fields

![Image of CardDetails](Github-Images/CardDetails.PNG)

Below are the sample card details for reference,

* CardNumber : 4111111111111111
* ExpMonth : 10
* ExpYear : 18
* CardCode : 123

Here Card number , Expiry month and Expiry year are mandatory fields and Card code is optional field.

### Bank Payment Fields

![Image of BankDetails](Github-Images/BankDetails.PNG)

Below are the sample bank details for reference,

* AccountNumber =  4111111
* RoutingNumber =   122235821
* NameOnAccount = John Doe
* AccountType = checking

Here all the four fields in bank details are mandatory.

Shopping cart information is also provided beside the payment form with static content.

![Image of CartDetails](Github-Images/CartDetails.PNG)

On click of Cancel button, the page will be redirected to dashboard page.

When click on Pay button in the payment form, sendPaymentDataToAnet function is called.

![Image of SendPaymentData](Github-Images/SendPaymentData.PNG)

In this function, based on the selection of payment type between Credit card and Bank Account, Accept.js extracts the payment details from customer’s form as an object named secureData and sends them directly from the customer's web browser.
A response handler function is also written to handle the response of Dispatch Data which returns payment nonce or token.

Accept JS plugin is an existing plugin and Dispatch Data functionality is already present in that plugin. 

The payment data object and response handler function are passed to Authorize.Net using Dispatch Data functionality. 

![Image of DispatchData](Github-Images/DispatchData.PNG)

The response handler gets the response from Dispatch Data. This function checks whether the response has any error, if so the errors are displayed on the page.

If there are no errors then the response handler calls the paymentFormUpdate function by passing the response to it.

![Image of ResponseHandler](Github-Images/ResponseHandler.PNG)

The paymentFormUpdate function resets all the values in the payment form and gets the opaqueData from the response which contains dataValue field which is the token value.

![Image of PaymentFormUpdate](Github-Images/PaymentFormUpdate.PNG)

After receiving the payment nonce / token, we will pass this token and other required details like ApiLoginID, ApiTransactionKey and AcceptJSRequestUrl through Ajax to invoke the Accept JS web API.

![Image of AcceptUIRequest](Github-Images/AcceptUIRequest.PNG)

Based on the response code of the API call whether Success / Failed we will read the response and will display the confirmation page with Thank You message on the screen and with other details like transaction ID and transaction date on successful transaction.

![Image of ConfirmationPage](Github-Images/ConfirmationPage.PNG)

On click of Done button, the page will be redirected to dashboard page.