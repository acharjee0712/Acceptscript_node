'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;



function getAcceptCustomerProfilePage(apiloginid,transactionkey,customerProfileId,hostedPaymentIFrameCommunicatorUrl,callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(apiloginid);
	merchantAuthenticationType.setTransactionKey(transactionkey);
	
	var setting1 = new ApiContracts.SettingType();
	setting1.setSettingName('hostedProfileReturnUrl');
	setting1.setSettingValue('https://returnurl.com/return/');

	var setting2 = new ApiContracts.SettingType();
	setting2.setSettingName('hostedProfileIFrameCommunicatorUrl');
	setting2.setSettingValue(hostedPaymentIFrameCommunicatorUrl);

	var settingList = [];
	settingList.push(setting1);
	settingList.push(setting2);

	var alist = new ApiContracts.ArrayOfSetting();
	alist.setSetting(settingList);

	var getRequest = new ApiContracts.GetHostedProfilePageRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setCustomerProfileId(customerProfileId);
	getRequest.setHostedProfileSettings(alist);

	//console.log(JSON.stringify(getRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.GetHostedProfilePageController(getRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetHostedProfilePageResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Hosted profile page token :');
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
	getAcceptCustomerProfilePage('1813212446', function(){
	//getHostedProfilePage('1813212446', function(){	
		console.log('getHostedProfilePage call complete.');
	});
}


module.exports.getAcceptCustomerProfilePage=getAcceptCustomerProfilePage
