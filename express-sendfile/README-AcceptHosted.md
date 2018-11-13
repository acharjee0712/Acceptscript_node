# Accept Hosted Step by Step

## Description

Accept Hosted provides a fully hosted, mobile-optimized payment form that uses an iframe for redirect or direct post of cardholder data to Authorize.Net.

Passing customer profile ID is optional in case of Accept Hosted. User can access Accept Hosted product type screen with or without passing customer profile ID. 

If a customer wants to send customer ID, it should be passed as a query string in the URL. The payment form will be displayed only if it is a valid customer ID.

The functionality for Accept Hosted is written in pure JavaScript and pages are designed using Bootstrap classes.

## Accessing Accept Hosted Page

There are two ways to navigate to Accept Hosted page.

* The Accept Hosted page can be accessed from the dashboard page by clicking on the Accept Hosted tab. This give the hosted form without customer ID.
* Access directly by providing the product type query string in the URL. 
 
The URL format for Accept Hosted is as follows,

https://IPAddress:PortNumber/index.html?ProductType=AcceptHosted

The URL format for Accept Hosted without Customer ID is as follows,
https://10.173.192.248:5008/index.html?producttype=AcceptHosted

The URL format for Accept Hosted with passing customer ID is as follows,
https://10.173.192.248:5008/index.html?ProductType=AcceptHosted&CustomerId=1813212446

## Workflow

Step 1 : On loading of the page, there are two cases to be checked.

* The page request contains Customer ID in the URL. 
* The page request does not provide Customer ID in the URL. 

### Case 1 : 

If customer ID is passed in the request URL then first the customer ID is validated by making an Ajax call to a web API to the URL ValidateCustomerRequestUrl in constants file. 

![Image of ValidateCustomer](Github-Images/ValidateCustomer.PNG)

If it is a valid customer ID then only the AcceptHosted method is called. 
If the customer ID is not valid we will display the error message on the screen.

![Image of InvalidCustomer](Github-Images/InvalidCustomer.PNG)

On click of Back to Home Page button, the page will be redirected to dashboard page.

### Case 2 : 

If customer ID is not provided in the request URL then on loading the page, AcceptHosted method is called. In this method we request the token by calling the Authorize.Net API "Get Hosted Payment Page Request" by using the parameter AcceptHostedRequestUrl in constants file.
As a response token is received.

![Image of HostedAjax](Github-Images/HostedAjax.PNG)

iFrameCommunicatorUrl is also passed through Ajax, which will be explained in detail further.

Step 2 : A iframe is defined in the HTML which is used to embed the Accept Hosted payment form in the web page. 

![Image of hostedIframe](Github-Images/hostedIframe.PNG)

Step 3 : A form is also defined in the HTML with target ID of the above iframe. This form contains an input field for token. The action URL of the form is HostedFormUrl in constants file which is defined dynamically on loading the Accept Hosted page.

![Image of hostedForm](Github-Images/hostedForm.PNG)

Step 4 : After receiving the token, the form is submitted by passing the received token to the input in the form.
When the form is posted, the hosted payment form is automatically displayed on the screen.

![Image of HostedPaymentForm](Github-Images/HostedPaymentForm.PNG)

Accept Hosted will have Credit card and Bank account as payment options. There are two buttons Pay and Cancel.

## Iframe Communicator

IFrameCommunicator is a small html page hosted on domain containing a JavaScript that listens for events we can receive inputs related to response and this parameter has to be set in hostedPaymentSettings.

To securely communicate between our Accept Hosted form and your web page, we need a communicator page which will be hosted on your site alongside your checkout/payment page. This enables a channel of communication that allows to send messages to IFrameCommunicator page. Then, as long as IFrameCommunicator page is hosted on the same domain as main page, it can communicate back to main page.

The URL of the communicator page is passed in your token request, which will allow Authorize.Net to embed the communicator page in the payment form.

A communication handler is written to receive the messages of iframe communicator and executes the script based on the message received.

![Image of CommunicatorFunction](Github-Images/CommunicatorFunction.PNG)

This channel of communication is used to pass a few basic messages back to a listener script running on main page (the page that calls the form):

*	Ideal height and width of the window - enables you to resize the frame and avoid any scrollbars from appearing.
    
	Here resizeWindow function is called in communication handler where we can set custom height and width of the hosted payment form in the iframe .
	
	![Image of ResizeWindow](Github-Images/ResizeWindow.PNG)
	
*	Request Succeeded - returned when the transaction is completed at Authorize.Net. You can use this notification to know when to look for those changes through the Transaction Reporting API. Transaction response parameters (such as transaction ID) are returned with this notification.

    When we click on Pay button the payment happens in the background and the iframeCommunicator html page receives a message on successful payment.
    Then the transactResponse function is called in communication handler which gives the transaction response with requires parameters like transaction ID and transaction date and time.
	
	![Image of TransactResponse](Github-Images/TransactResponse.PNG)
	
	A confirmation page with transaction details is displayed on successful payment.
	
	![Image of ConfirmationPage](Github-Images/ConfirmationPage.PNG)
	
*	Request Cancelled - returned when the customer cancels the hosted form.
    
	On click of Cancel button in the payment form, the cancel function in communication handler is invoked which redirects the page to dashboard page.
    
	![Image of Cancel](Github-Images/Cancel.PNG)
	
When accessing Accepted Hosted product type if customer profile ID is passed via Query string, we are displaying four most recent payment profiles associated with the customer profile ID. The customer can choose between these payment methods or choose to use a new payment method. 

![Image of HostedWithCustomer](Github-Images/HostedWithCustomer.PNG)