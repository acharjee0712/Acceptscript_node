# Accept Suite
Developer Guide to deploy the Node.js using Express.js Web API Application 


 
 
## Prerequisite:
* Sublime Text or  visual studio code 2017 or any editor of your choice.
* Node.js version 4.8.4 or higher
* Express.js

## Steps to deploy the web API 

* open the visual studiocode or any other editor & navigate to the myapp folder
* run "acceptsuite.js" using the command "node acceptsuite.js"
* Displayed on successful deployment in console:-
 server started in 8080
 
## URL format of Accept Suite WEB

https://ipaddress:portnumber/myapp/acceptsuite/METHODNAME?REQUIREDQUERYPARAMETERS
0r
https://localhost:portnumber/myapp/acceptsuite/METHODNAME?REQUIREDQUERYPARAMETERS


Eg:- https://10.173.102.22:1482/myapp/acceptsuite/AcceptJs?apiLoginId=VALUE&apiTransactionKey=VALUE&Token=VALUE
     https://localhost:1482/myapp/acceptsuite/AcceptJs?apiLoginId=VALUE&apiTransactionKey=VALUE&Token=VALUE

## QueryParameter Details

AcceptJs and AcceptJS UI - apiLoginId, apiTransactionKey, Token
AcceptHosted without customer profile - apiLoginId, apiTransactionKey, iframeCommunicatorUrl
AcceptHosted with customer profile - apiLoginId, apiTransactionKey, customerId, iframeCommunicatorUrl
AcceptCustomer - apiLoginId, apiTransactionKey, iframeCommunicatorUrl, customerId

 