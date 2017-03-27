/* ---For development purposes only--- */
var queryString = "";
var token = "";

function getToken(){
    return $.getJSON("data/OAuthTokens.json", function(data){
        token = data.Organization_Read_Access;
    })
}

function setQueryString(){
    if(token != ""){
        queryString = "?access_token=" + token;
    }
}

$.when(getToken()).then(setQueryString);
/* ----------------------------------- */

// This is in the "Add Repository" section
function sendAddRepoReq(){
	var userVal = getUserVal();
    var failedExtras = verifyAddExtras();
    verifyUsername(true);

    if(userVal <= 0){
    	document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
    }

    if(failedExtras.length == 0 && userVal > 0){
        var formData = {};
        formData["userName"] = document.querySelector("#name_field").value;
        formData["userEmail"] = document.querySelector("#email_field").value;
        formData["gitHubName"] = document.querySelector("#username_field").value;
        formData["repoName"] = document.querySelector("#repository_field").value;
        formData["description"] = document.querySelector("#description_field").value;
        formData["license"] = document.querySelector("#license_field").value;

        var jsonObj = JSON.stringify(formData);

        // console.log(jsonObj);

        awsCall(CallTypeEnum.ADD_REPO, jsonObj);
    }else if(failedExtras.length >= 1 && userVal <= 0 || failedExtras.length > 1){
    	req_message.text = "Required credentials are missing";
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }else{
    	if(failedExtras.length <= 0 && userVal < 0){
    		req_message.text = "GitHub user is not a [public] member of this organization.";
    	}else if(userVal == 0){
    		req_message.text = "Missing GitHub Username field";
    	}
    	switch(failedExtras[0]){
    		case "N":
    			req_message.text = "Missing Name field";
    			break;
    		case "R":
    			req_message.text = "Missing Repository Name field";
    			break;
    		case "D":
    	    	req_message.text = "Missing Description field";
    	    	break;
            case "E":
                req_message.text = "Missing Contact Email field";
    	}
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }
}

// This is the "About Us - Contact Us" section
function sendContactReq(){
    var failedExtras = verifyContactExtras();
    
    // console.log(failedExtras);

    if(failedExtras.length == 0){
        var formData = {};
        formData["userName"] = document.querySelector("#name_field").value;
        formData["userEmail"] = document.querySelector("#email_field").value;
        formData["userSubject"] =  document.querySelector("#subject_field").value;
        formData["userMessage"] = document.querySelector("#message_field").value;

        var jsonObj = JSON.stringify(formData);

        awsCall(CallTypeEnum.CONTACT_US, jsonObj);
    }else if(failedExtras.length > 1){
        req_message.text = "Required credentials are missing";
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }else{
        switch(failedExtras[0]){
            case "N":
                req_message.text = "Missing Name field";
                break;
            case "E":
                req_message.text = "Missing Contact Email field";
                break;
            case "S":
                req_message.text = "Missing Subject field";
                break;
            case "M":
                req_message.text = "Missing Message field";
                break;
        }
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }
}

function sendFeaturedReq(){
    // console.log("Featured Req");
    var failedExtras = verifyFeaturedExtras();
    // console.log(failedExtras);

    if(failedExtras.length > 1){
        req_message.text = "Required credentials are missing";
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }else if(failedExtras.length === 0){
        var formData = {};
        formData["userName"] = document.querySelector("#name_field").value;
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
                req_message.text = "Missing Description field";
                break;
            case "R":
                req_message.text = "Missing Repository Name field";
                break;
            case "E":
                req_message.text = "Missing Contact Email field";
                break;
            case "N":
                req_message.text = "Missing Name field";
                break;
        }
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }
}

function sendOrgReq(){
    var failedExtras = verifyApplyOrgExtras();
    if(failedExtras.length > 1){
        req_message.text = "Required credentials are missing";
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }else if(failedExtras.length === 0){
        var formData = {};
        formData["vtEmail"] = document.querySelector("#email_field").value;
        formData["githubHandle"] = document.querySelector("#username_field").value;

        /* Have jsonObj be in the following format
        {
            vtEmail: "email@vt.edu",
            githubHandle: "username"
        }
        */
        var jsonObj = JSON.stringify(formData);
        awsCall(CallTypeEnum.APPLY_TO_ORG, jsonObj);
    }else{
        var failed = failedExtras[0];
        if(failed === "E"){
            req_message.text = "Missing Contact Email field";
        }else if(failed <= 0){
            req_message.text = "Invalid GitHub Username";
        }
        req_message.style.color = "red";
        req_message.style.fontWeight = "900";
    }
}

var CallTypeEnum = {
    ADD_REPO: 1,
    CONTACT_US: 2,
    FEATURD_REPO: 3,
    APPLY_TO_ORG: 4
}

function awsCall(callType, jsonObj){
    req_message.text = "...";
    req_message.style.color = "";
    req_message.style.fontWeight = "900";

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
        case CallTypeEnum.APPLY_TO_ORG:
            console.log("checking username: " + document.querySelector("#username_field").value);
            pollGitHub(document.querySelector("#username_field").value, jsonObj); //APPLY_TO_ORG is a special case
            return;
    }
    var verifyReq = createCORSRequest("POST", endPoint);

    if (!verifyReq) {
        alert('CORS not supported -- Contact us at <github-g@vt.edu>');
        return;
    }

    var messages = createOnLoadMessages(callType);

    verifyReq.setRequestHeader("Content-Type", "application/json");
    // verifyReq.setRequestHeader("Accept", "application/json");

    verifyReq.onload = function(jEvent){
        if(this.status === 200){
            req_message.text = messages[0];
            req_message.style.color = "green";
            req_message.style.fontWeight = "900";
        }
        else if(this.status === 400){
            req_message.text = messages[1];
            req_message.style.color = "red";
            req_message.style.fontWeight = "900";    
        }else{
            req_message.text = "Something broke: status error " + this.status +
                                "<br>Consider contacting us directly at github-g@vt.edu";
            req_message.style.color = "orange";
            req_message.style.fontWeight = "900";
        }
        // console.log("testing");
    };

    // console.log(verifyReq);
    verifyReq.send(jsonObj);
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// TODO: Polish this up a bit
function pollGitHub(gitHubUsername, jsonObj){
    var gitHubReq = new XMLHttpRequest();
    gitHubReq.open("GET", "https://api.github.com/orgs/VirginiaTech/members/" + gitHubUsername + queryString, true);
    gitHubReq.setRequestHeader("Accept", "1");
    gitHubReq.onload = function(oEvent) {
        if (gitHubReq.status === 200) {
            // console.log("success");
        } else if (gitHubReq.status === 204) {
            req_message.text = "User \"" + gitHubUsername + "\" is already a member.";
            req_message.style.color = "";
            req_message.style.fontWeight = "900";
        } else if (gitHubReq.status === 404 || gitHubReq.status === 302) {
            req_message.text = "...";
            req_message.style.color = "grey";
            req_message.style.fontWeight = "900";

            var verifyReq = new XMLHttpRequest();
            verifyReq.onload = function(jEvent){
                console.log(this);
                if(this.status === 200){
                    req_message.text = "Verifcation Email Sent!";
                    req_message.style.color = "green";
                    req_message.style.fontWeight = "900";
                }
                else if(this.status === 400){
                    req_message.text = "Application request not sent.";
                    req_message.style.color = "red";
                    req_message.style.fontWeight = "900";    
                }else{
                    req_message.text = "Something broke: status error " + this.status +
                                "Consider contacting us directly at github-g@vt.edu";
                    req_message.style.color = "orange";
                    req_message.style.fontWeight = "900";
                }
            };
            verifyReq.open("POST", "https://vq6t7mxduh.execute-api.us-east-1.amazonaws.com/production/sendConfirmationEmail", true);
            // verifyReq.setRequestHeader("Accept", "application/json");
            // verifyReq.setRequestHeader("Content-Type", "application/json");
            // verifyReq.setRequestHeader("X-Amz-Date", "");
            // verifyReq.setRequestHeader("Authorization", "");
            // verifyReq.setRequestHeader("X-Api-Key", "");
            // verifyReq.setRequestHeader("X-Amz-Security-Token", "");
            // console.log("Sending...");
            console.log(jsonObj);
            verifyReq.send(jsonObj);

            // console.log("Given user: " + jsonObj + " is not a member.");
        } else {
            req_message.text = "Something broke: status error " + gitHubReq.status + "Consider contacting us directly at github-g@vt.edu";
            req_message.style.color = "orange";
            req_message.style.fontWeight = "900";
        }
    };

    gitHubReq.send();
}

function createOnLoadMessages(callType){
    var messages = [];

    switch(callType){
        case CallTypeEnum.ADD_REPO:
            messages.push("Success! Add Repository request sent!");
            messages.push("Add Repository request failed to send -- 404 error");
            break;
        case CallTypeEnum.CONTACT_US:
            messages.push("Success! Contact email sent!");
            messages.push("Contact email failed to send -- 404 error");
            break;
        case CallTypeEnum.FEATURD_REPO:
            messages.push("Success! Featured Repository application sent!");
            messages.push("Featured Repository application failed to send -- 404 error");
            break;
        case CallTypeEnum.APPLY_TO_ORG:
            messages.push("Apply to Organization request sent!");
            messages.push("Apply to Organization reuqest failed to send -- 404 error");
    }

    return messages;
}