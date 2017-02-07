function tempFunc() {

	var formData = {};

	var formEmail = document.querySelector("#email_field");
	var formUsername = document.querySelector("#username_field");

	formData["email_field"] = formEmail.value;
	formData["username_field"] = formUsername.value;

	for (var key in formData) {
  		if (formData.hasOwnProperty(key)) {
    		console.log(key + " -> " + formData[key]);
  		}
	}

	var jsonObj = JSON.stringify(formData);

	var oReq = new XMLHttpRequest();
	oReq.open("POST", "http://httpbin.org/post", true);
	oReq.onload = function(oEvent){
		if(oReq.status == 200){
			console.log("success");
		}else{
			console.log("failure");
		}
	};

	oReq.send(jsonObj);
}