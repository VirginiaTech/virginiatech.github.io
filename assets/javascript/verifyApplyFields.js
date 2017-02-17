var formUsername = document.querySelector("#username_field");
var formEmail = document.querySelector("#email_field");
var checkDelay = 300;

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

var userVal = 0;
var searchUsernameTimeout;
var lastUsernameLength;
document.getElementById("username_field").onkeydown = function() {
    if (searchUsernameTimeout != undefined) {
        clearTimeout(searchUsernameTimeout);
    }
    if((window.location + "").includes("apply_to_organization")){
        searchUsernameTimeout = setTimeout(verifyUsername.bind(null, false), checkDelay);
    }else if((window.location + "").includes("add_repository")){
        searchUsernameTimeout = setTimeout(verifyUsername.bind(null, true), checkDelay);
    }
};


function getUserVal(){
    return userVal;
}

function verifyUsername(inOrg = false) {
    if (lastUsernameLength == formUsername.value.length || formUsername.value.length <= 0) {
        if(formUsername.value.length <= 0){
            userVal = 0;
            //  0 = No value in GitHub username field
            // >0 = Not valid GitHub username
            // <0 = Valid GitHub username
        }

        if(userVal > 1){
            document.getElementById("username_field").style.backgroundColor= "#e6ffe6";
        }else if(userVal == 0){
            document.getElementById("username_field").style.backgroundColor= "";
        }
        else if(userVal < 0) {
            document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
        }
        return;
    }else{
        lastUsernameLength = formUsername.value.length;
    }

    var pageReq = new XMLHttpRequest();

    pageReq.timeout = 2000;

    pageReq.onreadystatechange = function(e) {
        if (pageReq.readyState == 4) {
            if (pageReq.status == 200 || pageReq.status == 204) {
                document.getElementById("username_field").style.backgroundColor= "#e6ffe6";
                document.getElementById("username_field").style.outlineColor= "#606C71";
                userVal = 1;
            } else {
                document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
                userVal = -1;
            }
        }
    }

    pageReq.ontimeout = function() {
        console.error("Request timeout: ", pageReq);
    }

    var url = "";

    if(inOrg){
        url = "https://api.github.com/orgs/VirginiaTech/members/" + formUsername.value;
    }else{
        url = "https://api.github.com/users/" + formUsername.value;
    }
    url = url + queryString;

    pageReq.open("GET", url, true);
    pageReq.send();
}

var searchEmailTimeout;
var lastEmailLength;
var validEmail = false;
var regEx = new RegExp(".*@.*");

if(document.getElementById("email_field") != null){
    document.getElementById("email_field").onkeydown = function() {
        if (searchEmailTimeout != undefined) {
            clearTimeout(searchEmailTimeout);
        }
        searchEmailTimeout = setTimeout(verifyEmail, checkDelay);
    };
}

function isValidEmail(){
    return validEmail;
}

function verifyEmail(){
    if(formEmail.value.length <= 0){
        document.getElementById("email_field").style.backgroundColor= "";
        validEmail = false;      
    }else if(regEx.test(formEmail.value)){
        document.getElementById("email_field").style.backgroundColor= "#ffb3b3";
        validEmail = false;
    }else{
        document.getElementById("email_field").style.backgroundColor= "#e6ffe6";
        validEmail = true;
    }
}

