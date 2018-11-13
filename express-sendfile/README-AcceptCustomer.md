# Accept Customer Description

Accept Customer is a fully hosted payment information that allows the creation of customer profile, payment profile and shipping profile with hosted functionality. 

The functionality for Accept Customer is written in pure JavaScript and pages are designed using Bootstrap classes.

## Accessing Accept Customer Page

There are two ways to navigate to Accept.js page.

* The Accept Customer page can be accessed from the dashboard page by clicking on the Accept Customer tab. 
* Access directly by providing the product type and customer ID query strings in the URL.
 
The URL format for Accept Customer is as follows,

https://IPAddress:PortNumber/index.html?ProductType=AcceptCustomer&CustomerId=1813212446

## Workflow

Accept Customer will utilize existing ANET Customer Profiles API methods.Customer profile ID is mandatory to access Accept Customer product type. 

When the user clicks on the Accept Customer Tab in the dashboard, he/she will be asked to provide the customer profile ID.
By default, a customer ID is already populated in the input field.

![Image of CustomerPopUp](Github-Images/CustomerPopUp.PNG)

There is an information icon beside the input field, on click of it the scenarios on how Customer profile ID can be found (existing) or created are shown to the user.

![Image of Scenarios](Github-Images/Scenarios.PNG)

After providing the customer ID and click on Continue button, background script will be executed.

First the customer ID will be validated. An Ajax call is made by passing the provided customer ID to the web API to the URL ValidateCustomerRequestUrl in constants file for validating the ID.  

![Image of ValidateCustomer](Github-Images/ValidateCustomer.PNG)

On loading the page by directly providing the query strings in URL also, it first validates the customer ID parameter in the URL. If it is valid
then only the page is loaded.

If it is not a valid customer, then an error message is displayed on the screen.

![Image of InvalidCustomer](Github-Images/InvalidCustomer.PNG)

On click of Back to Home Page button, the page will be redirected to dashboard page.

If it is a valid customer, then AcceptCustomer method is invoked.
In this an Ajax call is made to the web API by passing the required parameters like customer ID, apiLoginId and apiTransactionKey.IframeCommunicator URL is also passed in Ajax for communicating between the hosted form and the web page.
As a response we will get the token value. 

![Image of AcceptCustomerAjax](Github-Images/AcceptCustomerAjax.PNG)

A iframe is defined in the HTML which is used to embed the hosted payment form in the web page. 

![Image of CustomerIframe](Github-Images/CustomerIframe.PNG)

A form is also defined in the HTML with target ID of the above iframe. This form contains an input field for token. The action URL of the form is CustomerFormUrl in constants file which is defined dynamically on loading the Accept Customer page.

![Image of CustomerForm](Github-Images/CustomerForm.PNG)

After receiving the token, the form is submitted by passing the received token to the input in the form.
When the form is posted, the hosted payment form is automatically displayed on the screen.

![Image of CustomerPaymentForm](Github-Images/CustomerPaymentForm.PNG)

This form contains a Cancel button. On click of Cancel, the page will be redirected to the dashboard page.

In the hosted Accept Customer form, we can see the payment details and shipping details of the customer.
These payment and shipping details can be added, edited and deleted.

## Accessing Payment Profiles

The payment details section has both card payment details and bank account details.

![Image of PaymentList](Github-Images/PaymentList.PNG)

### Adding a Payment Profile

On click of Add a New Payment Method, a pop up is displayed with the payment fields. User can select between Card and Bank payment options and fill the respective details.
This form has Save and Cancel buttons. 

![Image of AddPaymentProfile](Github-Images/AddPaymentProfile.PNG)

On click of Save, the payment details are saved and displays in the payment profiles list.

On click of Cancel, the pop up closes.

### Updating a Payment Profile

To edit the payment details we can click on the Edit button of the respective payment profile. Then a pop up with the payment details appears, we can edit these values.
This form has Save and Cancel buttons. 

The edit payment profile for Card details is as below,

![Image of EditPayment](Github-Images/EditPayment.PNG)

The edit payment profile for Bank details is as below,

![Image of EditBankPayment](Github-Images/EditBankPayment.PNG)

On click of Save, the payment details are updated and displays in the payment profiles list.

On click of Cancel, the pop up closes.

### Deleting a Payment Profile

We can also delete the existing payment details by clicking on the Delete button of the respective payment profile.

On click of Delete button, it asks for confirmation of the user to proceed.

![Image of PaymentDeleteConfirmation](Github-Images/PaymentDeleteConfirmation.PNG)

## Accessing Shipping Profiles

The shipping profiles contains the shipping addresses of the customer.

![Image of ShippingDetails](Github-Images/ShippingDetails.PNG)

### Adding a Shipping Address

On click of Add a New Shipping Address, a pop up is displayed with the address fields. User can fill the required fields and save the information.
This form has Save and Cancel buttons. 

On click of Save, the shipping address details are saved and displays in the shipping profiles list.

On click of Cancel, the pop up closes.

![Image of AddShipping](Github-Images/AddShipping.PNG)

### Editing a Shipping Address

To edit the shipping address details we can click on the Edit button of the respective shipping profile. Then a pop up with the address details appears, we can edit these values.
This form has Save and Cancel buttons. 

On click of Save, the shipping address details are updated and displays in the shipping profiles list.

On click of Cancel, the pop up closes.

![Image of EditShipping](Github-Images/EditShipping.PNG)

### Deleting a Shipping Address

We can also delete the existing shipping address by clicking on the Delete button of the respective shipping profile.

On click of Delete button, it asks for confirmation of the user to proceed.

![Image of ShippingDeleteConfirmation](Github-Images/ShippingDeleteConfirmation.PNG)