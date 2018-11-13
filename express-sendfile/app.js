var activeCont="";
window.onload=loadpage();

function loadpage()
{
  var pageurl=window.location.href;
   var elements = document.getElementsByClassName("productCont");
   for(var x=0; x < elements.length; x++)
        {
            elements[x].style.display="none";
        }
  var product = getParameterByName('producttype',window.location.href.toLowerCase());
  if(pageurl.toLowerCase().indexOf("?producttype=")>0)
  {
    if(product=="acceptjs")
    {
      debugger;
      if(pageurl.toLowerCase().indexOf("&customerid=")>0)
       {
        var elements = document.getElementsByClassName("productCont");
  for(var x=0; x < elements.length; x++)
        {
            elements[x].style.display="none";
        }
             //Show on invalid page request
             document.getElementById("invalidPage").innerHTML="";
             document.getElementById("invalidPage").innerHTML="Product Type not Found";
             document.getElementById("invalidProduct").style.display="block";
        
       }
       else
       {
        document.getElementById("acceptjs").style.display="block";
        activeCont="acceptjs";
        //Show card information by default
        document.getElementById("rdCard").click();
       }
    }
    else if(product=="acceptui")
    {
      if(pageurl.toLowerCase().indexOf("&customerid=")>0)
       {
        for (var el in document.querySelectorAll('.productCont')) el.style.display="none";
             //Show on invalid page request
             document.getElementById("invalidPage").innerHTML="";
             document.getElementById("invalidPage").innerHTML="Product Type not Found";
              document.getElementById("invalidProduct").style.display="block";
       }
       else
       {
      activeCont="acceptui";
      document.getElementById("acceptui").style.display="block";
      AcceptUI();
    }
    }
    else if(product=="accepthosted")
    {
      activeCont="accepthosted";
      //if customer id is provided, validate id and proceed
      if(pageurl.toLowerCase().indexOf("&")>0)
       {
       if(pageurl.toLowerCase().indexOf("&customerid=")>0)
       {
         var id = getParameterByName('customerid',window.location.href.toLowerCase());
          var result= ValidateCustomer(id);
            if(result.valid)//if it is valid customer
            {
              AcceptHosted(id);
            }
            else
            {  //For invalid customer
               for (var el in document.querySelectorAll('.productCont')) el.style.display="none";
              document.getElementById("invalidPage").innerHTML="";
              document.getElementById("invalidPage").innerHTML="Customer not Found";
              document.getElementById("invalidProduct").style.display="block";
            }
        }
        else
        { //For invalid product type
          for (var el in document.querySelectorAll('.productCont')) el.style.display="none";
              document.getElementById("invalidPage").innerHTML="";
              document.getElementById("invalidPage").innerHTML="Product Type not Found";
              document.getElementById("invalidProduct").style.display="block";
            
        }
       }
       else
       {
         AcceptHosted('');
       }
    }
    else if(product=="acceptcustomer")
    {
      activeCont="acceptcustomer";
      
       document.getElementById("txtCustomerId").value=globalVars.ValidCustomer;
      if(pageurl.toLowerCase().indexOf("&customerid=")>0)
       {
        document.getElementById("acceptCustomer").style.display="none";
        //to get customer id from url 
         var id = getParameterByName('customerid',window.location.href.toLowerCase());
         //if id is provided directly in url AS query string instead of going through the accept customer pop up
         var customerIdValidationStatus = sessionStorage.getItem('isValidated');
         //if customer id is not validated before
         if(customerIdValidationStatus!="true")
         {
            var result= ValidateCustomer(id);
            if(result.valid)// if it is valid customer
            {
              AcceptCustomer(id);
            }
            else
            {//For invalid customer
               for (var el in document.querySelectorAll('.productCont')) el.style.display="none";
              document.getElementById("invalidPage").innerHTML="";
              document.getElementById("invalidPage").innerHTML="Customer not Found";
              document.getElementById("invalidProduct").style.display="block";
            }

         }
         //if it is already validated in dashboard page
         else
         {
            AcceptCustomer(id);
            sessionStorage.setItem('isValidated', 'false');
         }
       }
       else{
        document.getElementById("acceptCustomer").style.display="block";
       }
    }
    else{
      //For invalid product type
       document.getElementById("invalidPage").innerHTML="";
       document.getElementById("invalidPage").innerHTML="Product Type not Found";
      document.getElementById("invalidProduct").style.display="block";
    }
  }
  else
  {
      //For invalid product type
	   if(document.getElementById("invalidPage")!=null)
	  {
    document.getElementById("invalidPage").innerHTML="";
       document.getElementById("invalidPage").innerHTML="Product Type not Found";
      document.getElementById("invalidProduct").style.display="block";
	  }
  }
}

//Navigation to accept suite pages on button click from dashboard page
function LoadAcceptPage(pageType)
{
    switch(pageType)
  {
    case "acceptJs" : window.location.href = "index.html?producttype=acceptjs"; break;
    case "acceptUi" : window.location.href = "index.html?producttype=acceptui"; break;
    case "acceptHosted" : window.location.href = "index.html?producttype=accepthosted"; break;
    case "acceptCustomer" : window.location.href = "index.html?producttype=acceptcustomer"; break;
  }
  
}

//Redircetion on cancel click
function RedirectToDashboard()
{
  // window.setTimeout(function(){
  //   window.location.href = window.location.origin+"/index_all.html";
  // },1000);
   window.location.href = window.location.origin+"/index_all.html";
}

//To get query string parameter value based on name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function AcceptUI()
{
     var form=document.getElementById("paymentForm");
     form.setAttribute("action",globalVars.PageUrl);
     //set values for accept UI button
     var ele=document.getElementById("btnAcceptUI");
     ele.setAttribute("data-apiLoginID",globalVars.ApiLoginID);
     ele.setAttribute("data-clientKey",globalVars.ClientKey);
}

function AcceptHosted(id)
{
  var customerId=id;
  // Ajax call for API to get token
   $.ajax({
    type: 'GET',  
    url:globalVars.AcceptHostedRequestUrl,
    data:{
      apiLoginId: globalVars.ApiLoginID, 
      apiTransactionKey: globalVars.ApiTransactionKey,
      iFrameCommunicatorUrl: globalVars.IFrameCommunicatorUrl,
      customerId: customerId
    },
    contentType: "application/json; charset=utf-8",
    success: function (data, textStatus, jqXHR) {
      if(data.status)//if payment is succeeded
      {
           document.getElementById("hostedtoken").value=data.successValue;
           document.getElementById("send_hptoken").setAttribute("action",globalVars.HostedFormUrl);
            //submit form with token to get iframe
            document.getElementById("send_hptoken").submit();
            document.getElementById("acceptHosted").style.display="block";
            document.getElementById("load_payment").style.display="block";
            // var iframe = document.getElementById("load_payment");
            // var form = document.getElementById("send_hptoken");
            // iframe.style.height = form.offsetHeight + 'px';
      }
      else
      {
              //on failure, show error message
             // document.getElementById("noteHS").style.display="none";
              document.getElementById("msgHS").innerHTML ="";
              document.getElementById("msgHS").innerHTML =data.errorMessage;
              var element = document.getElementById("alertHS");
              element.classList.remove("alert-success");
              element.classList.add("alert-danger");
              element.style.display="block";
              document.getElementById("acceptHosted").style.display="block";
      }
            
        },
    error: function (jqXHR, textStatus, errorThrown) {
          document.getElementById("msgHS").innerHTML ="";
              document.getElementById("msgHS").innerHTML =textStatus;
              var element = document.getElementById("alertHS");
              element.classList.remove("alert-success");
              element.classList.add("alert-danger");
              element.style.display="block";
    }
  });
}

//to clear the modal dialog window values on reload
function ShowModal()
{
  document.getElementById("txtCustomerId").value="1813212446";
  document.getElementById("invalidCustomer").style.display="none";
}

//On click of proceed in accept customet pop up 
function Redirect()
{
   document.getElementById("invalidCustomer").style.display="none";
   customerId = document.getElementById("txtCustomerId").value;
   if(customerId=="")
   {  
      document.getElementById("txtCustomerId").focus();
      document.getElementById("invalidCustomer").style.display="inherit";
      document.getElementById("invalidCustomer").innerHTML="Please enter Customer ID";
   }
   else
   {
   var result=ValidateCustomer(customerId);
   if(result.valid)//if it is a valid customer id
   {
      if(result.status)
      {
        // document.getElementById("acceptCustomerId").style.display = "none";
        // document.getElementById("acceptCustomerManage").style.display = "block";
        window.location.href= "index.html?producttype=acceptcustomer&customerid="+customerId;
        //if Customer id is already validated
        sessionStorage.setItem('isValidated', 'true');
      }
    else
    {
          document.getElementById("invalidCustomer").style.display="inherit";
          document.getElementById("invalidCustomer").innerHTML=result.message; 
     }
  }
  else
  {
      document.getElementById("invalidCustomer").style.display="inherit";
      document.getElementById("invalidCustomer").innerHTML=result.message;
  }
}
}

//To Validate customer id
function ValidateCustomer(id)
{
     var customerId;
    customerId=id;
    var result={};
    $.ajax({
     type: 'GET',
     url: globalVars.ValidateCustomerRequestUrl,
     data:{
      apiLoginId: globalVars.ApiLoginID, 
      apiTransactionKey: globalVars.ApiTransactionKey,
      customerId: customerId
    },
    async: false,
    contentType: "application/json; charset=utf-8",
    success:function(data,textStatus,jqXHR){
      var valid;
      if(data.status)// if it is valid id
      {
       valid=true;
     }
     else
     {
       valid=false;
     }
     result={
      valid:valid,
      status:data.status,
      message:data.errorMessage
    };
  },
  error:function(data,textStatus,errorThrown){
    result={
      valid:false,
      status:false,
      message:textStatus
    };
  }
});
  return result;
}

function AcceptCustomer(id)
{
  var customerId=id;
  // Ajax call for API to get token
   $.ajax({
    type: 'GET',  
    url:globalVars.AcceptCustomerRequestUrl,
    data:{
      apiLoginId: globalVars.ApiLoginID, 
      apiTransactionKey: globalVars.ApiTransactionKey,
      customerId : customerId,
      iFrameCommunicatorUrl: globalVars.IFrameCommunicatorUrl
    },
    contentType: "application/json; charset=utf-8",
    success: function (data, textStatus, jqXHR) {
      if(data.status)//if payment is succeeded
      {
            document.getElementById("custtoken").value=data.successValue;
            document.getElementById("send_token").setAttribute("action",globalVars.CustomerFormUrl);
            //Submit form with token to get iframe
            document.getElementById("send_token").submit();
            document.getElementById("load_profile").style.display="block";
      }
      else
      {  
              //on failure, show error message
              document.getElementById("noteCS").style.display="none";
              document.getElementById("msgCS").innerHTML ="";
              document.getElementById("msgCS").innerHTML =data.errorMessage;
              var element = document.getElementById("alertCS");
              element.classList.remove("alert-success");
              element.classList.add("alert-danger");
              element.style.display="block";
      }
      document.getElementById("acceptCustomer").style.display="block";
      document.getElementById("acceptCustomerId").style.display = "none";
      document.getElementById("acceptCustomerManage").style.display = "block";
    },
    error: function (jqXHR, textStatus, errorThrown) {
          document.getElementById("msgCS").innerHTML ="";
              document.getElementById("msgHS").innerHTML =textStatus;
              var element = document.getElementById("alertCS");
              element.classList.remove("alert-success");
              element.classList.add("alert-danger");
              element.style.display="block";
    }
  });
}

//Show details on click of info icon in accept customer pop up
function showInfo()
{
  var display=document.getElementById("idScenarios").style.display;
  if(display=="block")
  {
    document.getElementById("idScenarios").style.display="none";
  }
  else
  {
    document.getElementById("idScenarios").style.display="block";
  }
}


//On click of radio buttons
function showData(option)
{
  document.getElementById("msg").innerHTML="";
  document.getElementById("alert").style.display="none";
     if(option=="card")
     {
        document.getElementById("bank").style.display="none";
        document.getElementById("card").style.display = "block";
     }
    else{
     document.getElementById("card").style.display = "none";
     document.getElementById("bank").style.display = "block";
    }
  document.getElementById("btns").style.display = "block";
}

//To validate fields in Accept JS form
function validatePaymentFields()
{
  var sel=document.querySelector('input[name="optradio"]:checked').value;
  if(sel=="card")
  {
   var cardNo = document.getElementById("cardNumber");
   var expMonth = document.getElementById("expMonth");
   var expYear = document.getElementById("expYear");
   var currentYear= new Date();
       if(cardNo.value=="") 
         cardNo.classList.add("error");
       else
       {
         cardNo.classList.remove("error");
         cardNo.classList.add("success");
       }
       if(expMonth.value=="")  
         expMonth.classList.add("error");
      
       else
       {
         expMonth.classList.remove("error");
         expMonth.classList.add("success");
       }
       if(expYear.value=="")  
         expYear.classList.add("error");
       
       else
       {
          expYear.classList.remove("error");
          expYear.classList.add("success");
       }
   }
   else{
     var accountNumber = document.getElementById("accountNumber");
     var routingNumber = document.getElementById("routingNumber");
     var nameOnAccount = document.getElementById("nameOnAccount");

        if(accountNumber.value=="")  
          accountNumber.classList.add("error");
       else
       {
         accountNumber.classList.remove("error");
         accountNumber.classList.add("success");
       }
       if(routingNumber.value=="")
         routingNumber.classList.add("error");
       else
       {
        routingNumber.classList.remove("error");
         routingNumber.classList.add("success");
       }
       if(nameOnAccount.value=="")
         nameOnAccount.classList.add("error");
       else
       {
          nameOnAccount.classList.remove("error");
          nameOnAccount.classList.add("success");
       }
       //To get selected value of account type
       var radios = document.getElementsByName('acntradio');
        var val;
        for (var i = 0, length = radios.length; i < length; i++)
        {
         if (radios[i].checked)
         {
          val=radios[i].value;
          break;
         }
         else{
          val="";
         }
        }
 
        if(val=="" || val=== null)  
         document.querySelector('input[name="acntradio"]').classList.add("error");
        else
        {
          document.querySelector('input[name="acntradio"]').classList.remove("error");
          document.querySelector('input[name="acntradio"]').classList.add("success");
        }
   }

   var iserror=document.getElementById(sel).getElementsByClassName("error");
   if(iserror.length>0)//if an element with error class exists
   {
         document.getElementById("note").style.display="none";
         document.getElementById("msg").innerHTML ="";
         document.getElementById("msg").innerHTML = "Please provide all required fields";
          var element = document.getElementById("alert");
          element.classList.remove("alert-success");
          element.classList.add("alert-danger");
          element.style.display="block";
         return "false";
   }
   else
   {
    return "true";
   }
}

//To restrict inputs to allow only numbers
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//On entering value validate input
function onTextInput(id)
{
   var visa = ["4"];
   var JCb=["3088"];
   var discover = ["6011","64","65"];
   var amex = ["37","34"];
   var dinersClub = ["38"];
   var masterCard=["51","52","53","54","55","2221","2222","2223"];
   var element = document.getElementById(id);
   var cardNumElem=document.querySelector('input[name="cardNumber"]');
   var currentYear=new Date();
   if(element.value=="")
      {
        cardNumElem.classList.remove("icon-type-mastercard");
        cardNumElem.classList.remove("icon-type-dinersclub");
        cardNumElem.classList.remove("icon-type-amex");
        cardNumElem.classList.remove("icon-type-discover");
        cardNumElem.classList.remove("icon-type-jcb");
        cardNumElem.classList.remove("icon-type-visa");
      }

  
   if(id == "cardNumber" && element.value!="")
    {
      
      if(visa.indexOf(element.value)>-1|| visa.indexOf((element.value).substring(0,1))>-1)
      {
       cardNumElem.classList.add("icon-type-visa");
      }
      else if(JCb.indexOf(element.value)>-1|| JCb.indexOf((element.value).substring(0,4))>-1)
      {
        cardNumElem.classList.add("icon-type-jcb");
      }
      else if(discover.indexOf(element.value)>-1 || discover.indexOf((element.value).substring(0,4))>-1 || discover.indexOf((element.value).substring(0,2))>-1)
      {
        cardNumElem.classList.add("icon-type-discover");
      }
      else if(amex.indexOf(element.value)>-1|| amex.indexOf((element.value).substring(0,2))>-1)
      {
        cardNumElem.classList.add("icon-type-amex");
      }
      else if(dinersClub.indexOf(element.value)>-1 || dinersClub.indexOf((element.value).substring(0,2))>-1)
      {
        cardNumElem.classList.add("icon-type-dinersclub");
      }
      else if(masterCard.indexOf(element.value)>-1 || masterCard.indexOf((element.value).substring(0,4))>-1 || masterCard.indexOf((element.value).substring(0,2))>-1)
      {
        cardNumElem.classList.add("icon-type-mastercard");
      }
      else
      {
        cardNumElem.classList.remove("icon-type-mastercard");
        cardNumElem.classList.remove("icon-type-dinersclub");
        cardNumElem.classList.remove("icon-type-amex");
        cardNumElem.classList.remove("icon-type-discover");
        cardNumElem.classList.remove("icon-type-jcb");
        cardNumElem.classList.remove("icon-type-visa");
      }
    }
   
    if(id=="expMonth")
   {
      var data=element.value;
      if(!(data >= 1 && data<=12))//To check month in range 1-12
      {
        document.getElementById("expMonth").value="";
          element.classList.remove("success");
          element.classList.add("invalid");
      }
      else
      {
         if(element.value!="")
         {
           element.classList.remove("invalid");
           element.classList.add("success");
         }
      }
   }
   
   else
   {
    if(element.value!="")
   {
     element.classList.remove("invalid");
     element.classList.remove("error");
     element.classList.add("success");
   }
   else{
     element.classList.remove("invalid");
     element.classList.remove("success");
     element.classList.add("error");
   }
  }
}

//Send payment information on Pay click in Accept Js
function sendPaymentDataToAnet()
{
  var isvalid=validatePaymentFields();
  //if all fields are valid
  if(isvalid=="true")
  {
   var authData = {};
   authData.clientKey = globalVars.ClientKey;
   authData.apiLoginID = globalVars.ApiLoginID;

    var sel=document.querySelector('input[name="optradio"]:checked').value;
    
    if(sel=="card")
    {
        var cardData={};
        cardData.cardNumber = document.getElementById("cardNumber").value;
        cardData.month = document.getElementById("expMonth").value;
        cardData.year = document.getElementById("expYear").value;
        cardData.cardCode = document.getElementById("cardCode").value;
    }
    else
    {
       var bankData={};
       bankData.accountNumber = document.getElementById('accountNumber').value;
       bankData.routingNumber = document.getElementById('routingNumber').value;
       bankData.nameOnAccount = document.getElementById('nameOnAccount').value;
       bankData.accountType = document.querySelector('input[name="acntradio"]:checked').value;
   }
   var secureData = {};
   secureData.authData = authData;
   if(sel=="card")
    secureData.cardData = cardData;
   else
   secureData.bankData = bankData;
   //sanding payment data to dispatch method of built in accept JS
   Accept.dispatchData(secureData, responseHandler);
   
 }
}

//Response handler for accept js and accept ui
function responseHandler(response) {
    //if errors occured
    if (response.messages.resultCode === "Error") {
        var i = 0;
        var container= document.getElementById("msg");
        container.innerHTML="";
        var value="";
        var element ;
        var node ;
        document.getElementById("note").style.display="none";
        element = document.createElement("p");
        node = document.createTextNode("Error Details :");
        element.appendChild(node);
        container.appendChild(element);
        //To display all errors occured
        while (i < response.messages.message.length) {
          var value=response.messages.message[i].code + ": " +
                response.messages.message[i].text;
            //To add error messages to a div
            element = document.createElement("p");
            node = document.createTextNode(value);
            element.appendChild(node);
            
            container.appendChild(element);
            i = i + 1;
        }
          var msgdiv = document.getElementById("alert");
          msgdiv.classList.remove("alert-success");
          msgdiv.classList.add("alert-danger");
          msgdiv.style.display="block";
    } 
    else {
      //if it is accpet ui
         if(activeCont=="acceptui")
         {
            document.getElementById("dataDescriptor").value = response.opaqueData.dataDescriptor;
            document.getElementById("dataValue").value = response.opaqueData.dataValue;
            document.getElementById("alertUI").style.display="none";
            var tokenVal=document.getElementById("dataValue").value;
            // Ajax call for API by passing token
              $.ajax({
              type: 'GET',  
              url:globalVars.AcceptJSRequestUrl,
              data: {
                apiLoginId: globalVars.ApiLoginID, 
                apiTransactionKey: globalVars.ApiTransactionKey,
                token: tokenVal

              },
              contentType: "application/json; charset=utf-8",
              success: function (data, textStatus, jqXHR) {
                

                      document.getElementById("msgUI").innerHTML ="";
                      if(data.status)//if payment succeeded
                      {
                        //To disable pay button
                       document.getElementById("btnAcceptUI").disabled = true;
                       //To append current time and date in confirmation page
                       var currentdate = new Date();
                       document.getElementById("orderIDUI").innerHTML=data.successValue;
                       document.getElementById("orderDateUI").innerHTML=currentdate;
                       document.getElementById("cartUI").style.display="none";
                       document.getElementById("confirmDivUI").style.display="block";

                      }
                      else
                      {
                        //on failure, show error message
                        document.getElementById("noteUI").style.display="none";
                        document.getElementById("msgUI").innerHTML=data.errorMessage;
                        var element = document.getElementById("alertUI");
                      
                        element.classList.remove("alert-success");
                        element.classList.add("alert-danger");
                      
                        element.style.display="block";

                      }
                  },
              error: function (jqXHR, textStatus, errorThrown) {
                    document.getElementById("msgUI").innerHTML ="";
                    document.getElementById("msgUI").innerHTML =textStatus;
                    var element = document.getElementById("alertUI");
                    element.classList.remove("alert-success");
                    element.classList.add("alert-danger");
                    element.style.display="block";
                  }
            });

         }
         //if it is accept js
         else{
          paymentFormUpdate(response.opaqueData);
         }
    }
}

//Reset fields on submit in accept js
function paymentFormUpdate(opaqueData) {

    document.getElementById("dataDescriptor").value = opaqueData.dataDescriptor;
    document.getElementById("dataValue").value = opaqueData.dataValue;

    // If using your own form to collect the sensitive data from the customer,
    // blank out the fields before submitting them to your server.
    document.getElementById("cardNumber").value = "";
    document.getElementById("expMonth").value = "";
    document.getElementById("expYear").value = "";
    document.getElementById("cardCode").value = "";
    document.getElementById("accountNumber").value = "";
    document.getElementById("routingNumber").value = "";
    document.getElementById("nameOnAccount").value = "";
     var rds = document.getElementsByName("acntradio");
    var cardNumElem=document.querySelector('input[name="cardNumber"]');
   if(cardNumElem.value=="")
      {
        cardNumElem.classList.remove("icon-type-mastercard");
        cardNumElem.classList.remove("icon-type-dinersclub");
        cardNumElem.classList.remove("icon-type-amex");
        cardNumElem.classList.remove("icon-type-discover");
        cardNumElem.classList.remove("icon-type-jcb");
        cardNumElem.classList.remove("icon-type-visa");
      }
      //Remove all error and success classes for fields
   for(var i=0;i<rds.length;i++)
      rds[i].checked = false;

    var element=document.getElementsByClassName('error');
    while (element.length)
    element[0].classList.remove("error");
    
    element=document.getElementsByClassName('success');
    while (element.length)
    element[0].classList.remove("success");
    
    document.getElementById("alert").style.display = "none";

   var tokenVal=document.getElementById("dataValue").value;

   // Ajax call for API by passing token
   $.ajax({
    type: 'GET',  
    url:globalVars.AcceptJSRequestUrl,
    data: {
      apiLoginId: globalVars.ApiLoginID, 
      apiTransactionKey: globalVars.ApiTransactionKey,
      token: tokenVal
    },
    contentType: "application/json; charset=utf-8",
    success: function (data, textStatus, jqXHR) {
            document.getElementById("msg").innerHTML ="";
             
            if(data.status)//if payment succeeded
            {
               //To disable pay button
              document.getElementById("btnPayJS").disabled = true;
              //To append current time and date in confirmation page
             var currentdate = new Date();
             document.getElementById("orderIDJS").innerHTML=data.successValue;
             document.getElementById("orderDateJS").innerHTML=currentdate;
             document.getElementById("cartJS").style.display="none";
             document.getElementById("paymentDivJS").style.display="none";
             document.getElementById("confirmDivJS").style.display="block";
            }
            else
            {
              //on failure, show error message
              document.getElementById("note").style.display="none";
              document.getElementById("msg").innerHTML=data.errorMessage;
            
              var element = document.getElementById("alert");
              element.classList.remove("alert-success");
              element.classList.add("alert-danger");
              element.style.display="block";
            }
            
        },
    error: function (jqXHR, textStatus, errorThrown) {
          document.getElementById("msg").innerHTML ="";
          document.getElementById("msg").innerHTML =textStatus;
          var element = document.getElementById("alert");
          element.classList.remove("alert-success");
          element.classList.add("alert-danger");
          element.style.display="block";
        }
  });
}

//To close accept customer pop up on cancel button click
function CloseAcceptCustomer()
{
  window.location.href="index_all.html";
}

//iframeCommunicator for accept hosted
window.CommunicationHandler = {};
function parseQueryString(str) {
    var vars = [];
    var arr = str.split('&');
    var pair;
    for (var i = 0; i < arr.length; i++) {
      pair = arr[i].split('=');
      vars[pair[0]] = unescape(pair[1]);
    }
    return vars;
  }
//Methods for accept hosted iframes that executes on receiving message in iframeCommunicator
CommunicationHandler.onReceiveCommunication = function (argument) {
    params = parseQueryString(argument.qstr)
    parentFrame = argument.parent.split('/')[4];
    frame = null;
    switch(parentFrame){
      case "manage"     : frame = document.getElementById("load_profile");break;
      case "payment"    : frame = document.getElementById("load_payment");break;
    }

    switch(params['action']){
      //To resize iframe
      case "resizeWindow"   :   if( parentFrame== "manage" && parseInt(params['height'])<1150)
                         {
                        //params['height']=450;
                        //params['width']=800;
                      }
                    if( parentFrame== "payment" && parseInt(params['height'])<1000) 
                      {
                        //params['height']=330;
                        //params['width']=50;
                      }
                      if(parentFrame== "payment" && getComputedStyle(document.querySelector(".w100")).width != "687.297px")
                      {
                        params['height']=+params['height'] + 100; 
                        frame.height=parseInt(params['height']);
                        frame.width=parseInt(params['width']);
                      }
                      else
                      {
                        frame.height=parseInt(params['height']);
                      frame.width=parseInt(params['width']);
                      }
                    
                    break;

      case "successfulSave"   :   $('#myModal').modal('hide'); location.reload(false); break;

      case "cancel"       : 
            if( parentFrame== "payment") 
            {
             window.location.href='index_all.html';
            }
                  /*  switch(parentFrame){
                    case "manage"       : alert("manage");$("#send_token").attr({"action":baseUrl+"manage","target":"load_profile" }).submit(); break;
                    case "payment"    :alert("cancel"); window.location.href='index_all.html';break; //sessionStorage.removeItem("HPTokenTime"); $('#HostedPayment').attr('src','about:blank'); break; 
                    }
                    break;*/
      //On successful payment in hosted
      case "transactResponse" : 
      var transResponse = JSON.parse(params['response']); 
            if( parentFrame== "payment") 
            {
              //To hive payment and cart panels and show confirmation page
              document.getElementById("cartHosted").style.display="none";
              document.getElementById("hostedPayment").style.display="none";
              //To append current time and date in confirmation page
              var currentdate = new Date(transResponse.dateTime+ ' UTC');
              document.getElementById("orderIDHosted").innerHTML=transResponse.transId;
              document.getElementById("orderDateHosted").innerHTML=currentdate;
              document.getElementById("confirmDivHosted").classList.add("hostedPage");
              document.getElementById("confirmDivHosted").style.display="block";
            }
             
    }
  }
