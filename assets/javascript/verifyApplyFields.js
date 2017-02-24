var formUsername = document.querySelector("#username_field");
var formEmail = document.querySelector("#email_field");
var formName = document.querySelector("#name_field");
var formRepoName = document.querySelector("#repository_field");
var formDescription = document.querySelector("#description_field");
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
        //  0 = No value in GitHub username field
        // <0 = Not valid GitHub username
        // >0 = Valid GitHub username
var searchUsernameTimeout;
var lastUsernameLength;
document.getElementById("username_field").onkeydown = function() {
    if(document.getElementById("username_field").style.backgroundColor!= ""){
        document.getElementById("username_field").style.backgroundColor= "";
    }
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
    if (lastUsernameLength == formUsername.value || formUsername.value.length <= 0) {
        if(formUsername.value.length <= 0){
            userVal = 0;
            lastUsernameLength = formUsername.value;
        }

        console.log(userVal);

        if(userVal > 0){
            console.log("Turn green");
            document.getElementById("username_field").style.backgroundColor= "#e6ffe6";
        }else if(userVal == 0){
            console.log("Turn nothing");
            document.getElementById("username_field").style.backgroundColor= "";
        }
        else if(userVal < 0) {
            console.log("Turn red");
            document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
        }
        return;
    }else{
        lastUsernameLength = formUsername.value;
    }

    var pageReq = new XMLHttpRequest();

    pageReq.timeout = 2000;

    pageReq.onreadystatechange = function(e) {
        if (pageReq.readyState == 4) {
            console.log("Request sent!");
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
var regEx = new RegExp(".*@.*");

if(document.getElementById("email_field") != null){
    document.getElementById("email_field").onkeydown = function() {
        if (searchEmailTimeout != undefined) {
            clearTimeout(searchEmailTimeout);
        }
        searchEmailTimeout = setTimeout(verifyEmail, checkDelay);
    };
}

var validEmail = false;
function isValidEmail(){
    verifyEmail();
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


// Function below this comment are typically only used in the add_repository page
var validName
function isValidName(){
    verifyName();
    return validName;
}

function verifyName(){
    if(formName.value.length <= 0){
        document.getElementById("name_field").style.backgroundColor= "#ffb3b3";
        validName = false;      
    }else{
        document.getElementById("name_field").style.backgroundColor= "";
        validName = true;
    }
}

var validRepoName
function isValidRepoName(){
    verifyRepoName();
    return validRepoName;
}

function verifyRepoName(){
    if(formRepoName.value.length <= 0){
        document.getElementById("repository_field").style.backgroundColor= "#ffb3b3";
        validRepoName = false;      
    }else{
        document.getElementById("repository_field").style.backgroundColor= "";
        validRepoName = true;
    }
}

var validDescription
function isValidDescription(){
    verifyDescription();
    return validDescription;
}

function verifyDescription(){
    if(formDescription.value.length <= 0){
        document.getElementById("description_field").style.backgroundColor= "#ffb3b3";
        validDescription = false;      
    }else{
        document.getElementById("description_field").style.backgroundColor= "";
        validDescription = true;
    }
}



function verifyExtras(){
    var extras = [];

    if(!isValidName()){
        extras.push("N");
    }
    if(!isValidRepoName()){
        extras.push("R");
    }
    if(!isValidDescription()){
        extras.push("D");
    }

    return extras;
}

if((window.location + "").includes("add_repository")){
    document.getElementById("name_field").onkeydown = function() {
        if(formName.value.length > 0 &&
            document.getElementById("name_field").style.backgroundColor != ""){
            document.getElementById("name_field").style.backgroundColor = ""
        }
    };

    document.getElementById("repository_field").onkeydown = function() {
        if(formRepoName.value.length > 0 &&
            document.getElementById("repository_field").style.backgroundColor != ""){
            document.getElementById("repository_field").style.backgroundColor = ""
        }
    };

    document.getElementById("description_field").onkeydown = function() {
        if(formDescription.value.length > 0 &&
            document.getElementById("description_field").style.backgroundColor != ""){
            document.getElementById("description_field").style.backgroundColor = ""
        }
    };
}