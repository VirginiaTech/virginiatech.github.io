
// This is in the "Add Repository" section
function sendAddRepoReq(){
	var userVal = getUserVal();
    var failedExtras = verifyAddExtras();
    verifyUsername(true);

    if(userVal <= 0){
    	document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
    }

    if(failedExtras.length == 0 && userVal > 0){
    	send_message.text = "";
    	send_message.style.color = "";

        var formData = {};
        formData["userName"] = document.querySelector("#name_field").value;
        formData["userEmail"] = document.querySelector("#email_field").value;
        formData["gitHubName"] = document.querySelector("#username_field").value;
        formData["repoName"] = document.querySelector("#repository_field").value;
        formData["description"] = document.querySelector("#description_field").value;
        formData["license"] = document.querySelector("#license_field").value;

        var jsonObj = JSON.stringify(formData);

        awsCall(CallTypeEnum.ADD_REPO, jsonObj);
    }else if(failedExtras.length >= 1 && userVal <= 0 || failedExtras.length > 1){
    	send_message.text = "Required credentials are missing";
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }else{
    	if(failedExtras.length <= 0 && userVal < 0){
    		send_message.text = "GitHub user is not a [public] member of this organization.";
    	}else if(userVal == 0){
    		send_message.text = "Missing GitHub Username field";
    	}
    	switch(failedExtras[0]){
    		case "N":
    			send_message.text = "Missing Name field";
    			break;
    		case "R":
    			send_message.text = "Missing Repository Name field";
    			break;
    		case "D":
    	    	send_message.text = "Missing Description field";
    	    	break;
            case "E":
                send_message.text = "Missing Contact Email field";
    	}
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }
}

// This is the "About Us - Contact Us" section
function sendContactReq(){
    var failedExtras = verifyContactExtras();
    
    console.log(failedExtras);

    if(failedExtras.length == 0){
        send_message.text = "...";
        send_message.style.color = "";
        var formData = {};
        formData["userName"] = document.querySelector("#name_field").value;
        formData["userEmail"] = document.querySelector("#email_field").value;
        formData["userSubject"] =  document.querySelector("#subject_field").value;
        formData["userMessage"] = document.querySelector("#message_field").value;

        var jsonObj = JSON.stringify(formData);

        awsCall(CallTypeEnum.CONTACT_US, jsonObj);
    }else if(failedExtras.length > 1){
        send_message.text = "Required credentials are missing";
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }else{
        switch(failedExtras[0]){
            case "N":
                send_message.text = "Missing Name field";
                break;
            case "E":
                send_message.text = "Missing Repository Name field";
                break;
            case "S":
                send_message.text = "Missing Subject field";
                break;
            case "M":
                send_message.text = "Missing Message field";
                break;
        }
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }
}

function sendFeaturedReq(){
    console.log("Featured Req");
    var failedExtras = verifyFeaturedExtras();
    console.log(failedExtras);

    if(failedExtras.length > 1){
        send_message.text = "Required credentials are missing";
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }else if(failedExtras.length == 0){
        send_message.text = "...";
        send_message.style.backgroundColor = "";
        var formData = {};
        formData["repoName"] = document.querySelector("#repository_field").value;
        formData["userEmail"] = document.querySelector("#email_field").value;
        formData["description"] =  document.querySelector("#description_field").value;
        formData["license"] = document.querySelector("#license_field").value;
        formData["notes"] = document.querySelector("#notes_field").value;

        /* Have jsonObj be in the following format
        {
            userEmail: "val@vt.edu",
            repoName: "val",
            description: "val",
            license: "val",
            notes: "val"
        }
        */
        var jsonObj = JSON.stringify(formData);

        awsCall(CallTypeEnum.FEATURD_REPO, jsonObj);
    }
    else{
        switch(failedExtras[0]){
            case "D":
                send_message.text = "Missing Description field";
                break;
            case "R":
                send_message.text = "Missing Repository Name field";
                break;
            case "E":
                send_message.text = "Missing Contact Email field";
                break;
            case "N":
                send_message.text = "Missing Name field";
                break;
        }
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }
}

var CallTypeEnum = {
    ADD_REPO: 1,
    CONTACT_US: 2,
    FEATURD_REPO: 3
}

function awsCall(callType, jsonObj){
    var verifyReq = new XMLHttpRequest();
    verifyReq.onload = function(jEvent){
        if(this.status === 200){
            send_message.text = "Verifcation Email Sent!";
            send_message.style.color = "green";
            send_message.style.fontWeight = "900";
        }
        else if(this.status === 400){
            send_message.text = "Application request not sent. - 400 server error";
            send_message.style.color = "red";
            send_message.style.fontWeight = "900";    
        }else{
            send_message.text = "Something broke: status error " + this.status +
                                "<br>Consider contacting us directly at github-g@vt.edu";
            send_message.style.color = "orange";
            send_message.style.fontWeight = "900";
        }
    };

    var endPoint = "";
    switch(callType){
        case CallTypeEnum.ADD_REPO:
            endPoint = "https://rjg9b60429.execute-api.us-east-1.amazonaws.com/dev/add_repo";
            break;
        case CallTypeEnum.CONTACT_US:
            endPoint = "https://rjg9b60429.execute-api.us-east-1.amazonaws.com/dev/contact_us";
            break;
        case CallTypeEnum.FEATURD_REPO:
            endPoint = "https://rjg9b60429.execute-api.us-east-1.amazonaws.com/dev/feature_repo";
            break;
    }


    verifyReq.open("POST", endPoint, true);
    verifyReq.setRequestHeader("Accept", "1");
    verifyReq.send(jsonObj);

    send_message.text = "...";
    send_message.style.color = "";
    send_message.style.fontWeight = "900";
}