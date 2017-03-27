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

function applyToOrg() {
    if(userVal <= 0){
        document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
    }
    var apply_message = document.getElementById("apply_message");

    var formData = {};
    var formEmail = document.querySelector("#email_field").value;
    var formUsername = document.querySelector("#username_field").value;

    // console.log(formEmail);

    formData["vtEmail"] = formEmail + "@vt.edu";
    formData["githubHandle"] = formUsername;

    // console.log(formEmail);

    /* Have jsonObj be in the following format
    {
        vtEmail: "email@vt.edu",
        githubHandle: "username"
    }
    */
    var jsonObj = JSON.stringify(formData);

    if(!isValidEmail() && getUserVal() <= 0){
        apply_message.text = "Required credentials are invalid";
        document.getElementById("email_field").style.backgroundColor= "#ffb3b3";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    } else if(!isValidEmail()){
        apply_message.text = "Invalid @vt.edu email address";
        document.getElementById("email_field").style.backgroundColor= "#ffb3b3";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    } else if(getUserVal() <= 0){
        apply_message.text = "Invalid GitHub Username";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    }
    var gitHubReq = new XMLHttpRequest();
    gitHubReq.open("GET", "https://api.github.com/orgs/VirginiaTech/members/" + formUsername + queryString, true);
    gitHubReq.setRequestHeader("Accept", "1");
    gitHubReq.onload = function(oEvent) {
        if (gitHubReq.status === 200) {
            // console.log("success");
        } else if (gitHubReq.status === 204) {
            apply_message.text = "User \"" + formUsername + "\" is already a member.";
            apply_message.style.color = "";
            apply_message.style.fontWeight = "900";
        } else if (gitHubReq.status === 404 || gitHubReq.status === 302) {
            apply_message.text = "...";
            apply_message.style.color = "grey";
            apply_message.style.fontWeight = "900";

            var verifyReq = new XMLHttpRequest();
            verifyReq.onload = function(jEvent){
                var jsonResp = JSON.parse(verifyReq.responseText);

                apply_message.text = jsonResp.message;
                apply_message.style.fontWeight = "900";

                if(this.status === 200){
                    apply_message.style.color = "green";
                }
                else if(this.status === 400){
                    apply_message.style.color = "red";   
                }else{
                    apply_message.text = "Something broke: status error " + this.status +
                                "Consider contacting us directly at github-g@vt.edu";
                    apply_message.style.color = "orange";
                }
            };
            verifyReq.open("POST", "https://vq6t7mxduh.execute-api.us-east-1.amazonaws.com/production/sendConfirmationEmail", true);
            verifyReq.setRequestHeader("Accept", "application/json");
            verifyReq.setRequestHeader("Content-Type", "application/json");

            verifyReq.send(jsonObj);
            // console.log("Given user: " + jsonObj + " is not a member.");
        } else {
            apply_message.text = "Something broke: status error " + gitHubReq.status + "Consider contacting us directly at github-g@vt.edu";
            apply_message.style.color = "orange";
            apply_message.style.fontWeight = "900";
        }
    };

    gitHubReq.send();
}

// Data logging function for debugging purposes
function logData(data){
  for(var key in data){
    if (data.hasOwnProperty(key)){
      console.log(key + ": " + data[key]);
    }
  }
}