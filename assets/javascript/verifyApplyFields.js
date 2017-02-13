var searchTimeout;
var lastLength;
var formUsername = document.querySelector("#username_field");
var bgColor = document.getElementById("username_field").style.backgroundColor;

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
document.getElementById("username_field").onkeydown = function() {
    if (searchTimeout != undefined) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(verifyUsername, 350);
};

document.getElementById("email_field").onkeydown = function() {
    if (searchTimeout != undefined) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(verifyEmail, 350);
};

function getUserVal(){
    return userVal;
}

function verifyUsername() {
    if (lastLength == formUsername.value.length || formUsername.value.length <= 0) {
        if(formUsername.value.length <= 0){
            userVal = 0;
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
        lastLength = formUsername.value.length;
    }

    var pageReq = new XMLHttpRequest();

    pageReq.timeout = 2000;

    pageReq.onreadystatechange = function(e) {
        if (pageReq.readyState == 4) {
            if (pageReq.status == 200) {
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

    var url = "https://api.github.com/users/" + formUsername.value;
    url = url + queryString;

    pageReq.open("GET", url, true);
    pageReq.send();
}

function verifyEmail(){
    console.log("Something!");
}

