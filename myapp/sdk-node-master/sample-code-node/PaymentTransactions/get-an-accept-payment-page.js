 'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');


function getAnAcceptPaymentPage(apiloginid,transactionkey,customerProfileId,hostedPaymentIFrameCommunicatorUrl,callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(apiloginid);
	merchantAuthenticationType.setTransactionKey(transactionkey);
	var getRequest = new ApiContracts.GetCustomerProfileRequest();
	getRequest.setCustomerProfileId(customerProfileId);
	

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
	transactionRequestType.setAmount("99");
	
	
	
	var setting1 = new ApiContracts.SettingType();
	setting1.setSettingName('hostedPaymentButtonOptions');
	setting1.setSettingValue('{\"text\": \"Pay\"}');

	var setting2 = new ApiContracts.SettingType();
	setting2.setSettingName('hostedPaymentOrderOptions');
	setting2.setSettingValue('{\"show\": false}');

	var setting3 = new ApiContracts.SettingType();
	setting3.setSettingName('hostedPaymentIFrameCommunicatorUrl');
	var val1='{\"url\":\"';
	val1+=hostedPaymentIFrameCommunicatorUrl+'\"}'
	setting3.setSettingValue(val1)
	console.log(val1)

    var setting4 = new ApiContracts.SettingType();
	setting4.setSettingName('hostedPaymentBillingAddressOptions');
	setting4.setSettingValue('{\"show\": false}');
	
	var setting5 = new ApiContracts.SettingType();
	setting5.setSettingName('hostedPaymentReturnOptions');
	var val='{\"showReceipt\": false,\"url\":\"';
	var val2=val+=hostedPaymentIFrameCommunicatorUrl+'\",\"urlText\":\"Continue\",\"cancelUrl\":\"';
	val2+=hostedPaymentIFrameCommunicatorUrl+'\",\"cancelUrlText\":\"Cancel\"}';
	setting5.setSettingValue(val2)
    console.log(val2)
	
	
	var settingList = [];
	settingList.push(setting1);
	settingList.push(setting2);
	settingList.push(setting3);
	settingList.push(setting4);
	settingList.push(setting5);

	var alist = new ApiContracts.ArrayOfSetting();
	alist.setSetting(settingList);

	var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setTransactionRequest(transactionRequestType);
	getRequest.setHostedPaymentSettings(alist);

	//console.log(JSON.stringify(getRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.GetHostedPaymentPageController(getRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Hosted payment page token :');
				console.log(response.getToken());
			}
			else
			{
				
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
			}
		}
		else
		{
			console.log('Null response received');
		}

		callback(response);
	});
}

if (require.main === module) {
	getAnAcceptPaymentPage(function(){
		console.log('getAnAcceptPaymentPage call complete.');
	});
}

module.exports.getAnAcceptPaymentPage = getAnAcceptPaymentPage;
