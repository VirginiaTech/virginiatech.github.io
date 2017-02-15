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

function tempFunc() {
    var apply_message = document.getElementById("apply_message");

    var formData = {};
    var formEmail = document.querySelector("#email_field");
    var formUsername = document.querySelector("#username_field");

    formData["email_field"] = formEmail.value;
    formData["username_field"] = formUsername.value;

    var jsonObj = JSON.stringify(formData);

    if(!isValidEmail() && getUserVal() <= 0){
        apply_message.text = "Required credentials are invalid";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    } else if(!isValidEmail()){
        apply_message.text = "Invalid @vt.edu email address";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    } else if(getUserVal() <= 0){
        apply_message.text = "Invalid GitHub Username";
        apply_message.style.color = "red";
        apply_message.style.fontWeight = "900";
        return;
    }
    var pageReq = new XMLHttpRequest();
    pageReq.open("GET", "https://api.github.com/orgs/VirginiaTech/members/" + formUsername.value + queryString, true);
    pageReq.setRequestHeader("Accept", "1");
    pageReq.onload = function(oEvent) {
        if (pageReq.status == 200) {
            console.log("success");
        } else if (pageReq.status == 204) {
            apply_message.text = "User \"" + formUsername.value + "\" is already a member.";
            apply_message.style.color = "";
            apply_message.style.fontWeight = "900";
        } else if (pageReq.status == 404 || pageReq.status == 302) {
            // Start email varification process here...
            apply_message.text = "";
            console.log("Given user: " + formUsername.value + " is not a member.");
        } else {
            apply_message.text = "Hmm... That shouldn't have happened... Consider contacting us, status: " + pageReq.status;
            apply_message.style.color = "orange";
            apply_message.style.fontWeight = "900";
        }
    };

    pageReq.send(jsonObj);
}
