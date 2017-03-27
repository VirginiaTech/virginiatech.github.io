var formUsername = document.querySelector("#username_field");
var formEmail = document.querySelector("#email_field");
var formName = document.querySelector("#name_field");
var formRepoName = document.querySelector("#repository_field");
var formDescription = document.querySelector("#description_field");
var formSubject = document.querySelector("#subject_field");
var formMessage = document.querySelector("#message_field");
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

var ColorEnum = {
    LIGHT_GREEN: "#e6ffe6",
    LIGHT_RED : "#ffb3b3",
    NONE : ""
}

var userVal = 0;
        //  0 = No value in GitHub username field
        // <0 = Not valid GitHub username
        // >0 = Valid GitHub username

// Username fields call to a server, so the server requests are throttled to once every
// "checkDelay" milliseconds
var searchUsernameTimeout;
var lastUsernameLength;
if(formUsername != null){
    formUsername.onkeyup = function() {
        if(formUsername.style.backgroundColor!= ColorEnum.NONE){
            formUsername.style.backgroundColor= ColorEnum.NONE;
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
}

// Check if the input GitHub username exists and 
// 1) inOrg == true -> is in the Organization
// 2) inOrg == false -> is not in the Organization
function verifyUsername(inOrg = false) {
    if (lastUsernameLength === formUsername.value || formUsername.value.length <= 0) {
        if(formUsername.value.length <= 0){
            userVal = 0;
            lastUsernameLength = formUsername.value;
        }
        if(userVal > 0){
            formUsername.style.backgroundColor= ColorEnum.LIGHT_GREEN;
        }else if(userVal === 0){
            formUsername.style.backgroundColor= ColorEnum.NONE;
        }else if(userVal < 0) {
            formUsername.style.backgroundColor= ColorEnum.LIGHT_RED;
        }
        return;
    }else{
        lastUsernameLength = formUsername.value;
    }

    var pageReq = new XMLHttpRequest();
    
    pageReq.timeout = 2000;
    pageReq.onload = function(e) {
        if (pageReq.status === 200 || pageReq.status === 204) {
            formUsername.style.backgroundColor= ColorEnum.LIGHT_GREEN;
            userVal = 1;
        } else {
            formUsername.style.backgroundColor= ColorEnum.LIGHT_RED;
            userVal = -1;
        }
    }
    pageReq.ontimeout = function() {
        alert("Request timeout: " + pageReq);
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

function getUserVal(){
    return userVal;
}

// Email fields (will eventually) call to a server, so the server requests are throttled
// to once every "checkDelay" milliseconds
var searchEmailTimeout;
var lastEmailLength;
if(formEmail != null){
    formEmail.onkeyup = function() {
        if(formEmail.style.backgroundColor != ColorEnum.NONE){
            formEmail.style.backgroundColor = ColorEnum.NONE;
        }
        if (searchEmailTimeout != undefined) {
            clearTimeout(searchEmailTimeout);
        }

        searchEmailTimeout = setTimeout(isValidEmail.bind(null, true), checkDelay);
    };
}

function isValidEmail(allowEmpty){
    var appendAtSign = false;
    if((window.location + "").includes("apply_to_organization")){
        appendAtSign = true;
    }

    email = formEmail.value;
    if(appendAtSign){
        email = email + "@vt.edu";
    }
    return isValidEmailAddress(email, allowEmpty);
}

function isValidEmailAddress(emailAddress, allowEmpty) {
    // console.log("Checking email, allowEmpty: " + allowEmpty);

    if(allowEmpty && formEmail.value.length === 0){
        // console.log("Setting color to none");
        formEmail.style.backgroundColor= ColorEnum.NONE;
        return false;
    }
    else if(!allowEmpty && formEmail.value.length === 0){
        // console.log("Setting color to red");
        formEmail.style.backgroundColor = ColorEnum.LIGHT_RED;
        return false;
    }
    
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var validEmail = pattern.test(emailAddress);
    
    if(validEmail){
        formEmail.style.backgroundColor= ColorEnum.LIGHT_GREEN;
    }else{
        formEmail.style.backgroundColor= ColorEnum.LIGHT_RED;
    }

    return validEmail;
};

// Functions below this comment are typically only used in the add_repository page
function isValidName(){
    return verifyName();
}

function verifyName(){
    if(formName.value.length <= 0){
        formName.style.backgroundColor= ColorEnum.LIGHT_RED;
        return false;      
    }else{
        formName.style.backgroundColor= ColorEnum.NONE;
        return true;
    }
}

function isValidRepoName(){
    return verifyRepoName();
}

function verifyRepoName(){
    if(formRepoName.value.length <= 0){
        formRepoName.style.backgroundColor= ColorEnum.LIGHT_RED;
        return false;      
    }else{
        formRepoName.style.backgroundColor= ColorEnum.NONE;
        return true;
    }
}

function isValidDescription(){
    return verifyDescription();
}

function verifyDescription(){
    if(formDescription.value.length <= 0){
        formDescription.style.backgroundColor= ColorEnum.LIGHT_RED;
        return false;      
    }else{
        formDescription.style.backgroundColor= ColorEnum.NONE;
        return true;
    }
}

function verifyAddExtras(){
    var extras = [];

    if(!isValidEmail(false)){
        extras.push("E");
    }
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

// Functions below this comment are typically only used in the contact_us page
function verifyContactExtras(){
    var extras = [];

    if(!isValidEmail(false)){
        extras.push("E");
    }
    if(!isValidSubject()){
        extras.push("S");
    }
    if(!isValidName()){
        extras.push("N");
    }
    if(!isValidMessage()){
        extras.push("M");
    }

    return extras;
}

function isValidSubject(){
    return verifySubject();
}

function verifySubject(){
    if(formSubject.value.length > 0){
        formSubject.style.backgroundColor = ColorEnum.NONE;
        return true;
    }else{
        formSubject.style.backgroundColor = ColorEnum.LIGHT_RED;
        return false;
    }
}

function isValidMessage(){
    return verifyMessage();
}

function verifyMessage(){
    if(formMessage.value.length > 0){
        formMessage.style.backgroundColor = ColorEnum.NONE;
        return true;
    }else{
        formMessage.style.backgroundColor = ColorEnum.LIGHT_RED;
        return false;
    }
}

// Functions below this comment are typically only used in the featured_repos page
function verifyFeaturedExtras(){
    var extras = [];

    if(!isValidName()){
        extras.push("N");
    }
    if(!isValidEmail(false)){
        extras.push("E");
    }
    if(!isValidRepoName()){
        extras.push("R");
    }
    if(!isValidDescription()){
        extras.push("D");
    }

    return extras;
}

// Functions below this comment are typically only used in the apply_to_organization page
function verifyApplyOrgExtras(){
    var extras = [];

    if(!isValidEmail(false)){
        extras.push("E");
    }
    if(getUserVal() <= 0){
        extras.push(getUserVal());
    }

    return extras;
}


if(formName != null){
    formName.onkeyup = function() {
        if(formName.value.length > 0 &&
            formName.style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting name_field color to NONE");
            formName.style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(formRepoName != null){
    formRepoName.onkeyup = function() {
        if(formRepoName.value.length > 0 &&
            formRepoName.style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting repository_field color to NONE");
            formRepoName.style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(formDescription != null){
    formDescription.onkeyup = function() {
        if(formDescription.value.length > 0 &&
            formDescription.style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting description_field color to NONE");
            formDescription.style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(formMessage != null){
    formMessage.onkeyup = function() {
        if(formMessage.value.length > 0 &&
            formMessage.style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting message_field color to NONE");
            formMessage.style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(formSubject != null){
    formSubject.onkeyup = function() {
        if(formSubject.value.length > 0 &&
            formSubject.style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting subject_field color to NONE");
            formSubject.style.backgroundColor = ColorEnum.NONE;
        }
    };
}
