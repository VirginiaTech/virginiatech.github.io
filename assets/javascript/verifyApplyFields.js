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
var searchUsernameTimeout;
var lastUsernameLength;
if(document.getElementById("username_field") != null){
    document.getElementById("username_field").onkeydown = function() {
        if(document.getElementById("username_field").style.backgroundColor!= ColorEnum.NONE){
            document.getElementById("username_field").style.backgroundColor= ColorEnum.NONE;
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


function getUserVal(){
    return userVal;
}

function verifyUsername(inOrg = false) {
    if (lastUsernameLength === formUsername.value || formUsername.value.length <= 0) {
        if(formUsername.value.length <= 0){
            userVal = 0;
            lastUsernameLength = formUsername.value;
        }

        if(userVal > 0){
            document.getElementById("username_field").style.backgroundColor= ColorEnum.LIGHT_GREEN;
        }else if(userVal === 0){
            document.getElementById("username_field").style.backgroundColor= ColorEnum.NONE;
        }
        else if(userVal < 0) {
            document.getElementById("username_field").style.backgroundColor= ColorEnum.LIGHT_RED;
        }
        return;
    }else{
        lastUsernameLength = formUsername.value;
    }

    var pageReq = new XMLHttpRequest();

    pageReq.timeout = 2000;

    pageReq.onreadystatechange = function(e) {
        if (pageReq.readyState === 4) {
            if (pageReq.status === 200 || pageReq.status === 204) {
                document.getElementById("username_field").style.backgroundColor= ColorEnum.LIGHT_GREEN;
                document.getElementById("username_field").style.outlineColor= "#606C71";
                userVal = 1;
            } else {
                document.getElementById("username_field").style.backgroundColor= ColorEnum.LIGHT_RED;
                userVal = -1;
            }
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

var searchEmailTimeout;
var lastEmailLength;

if(document.getElementById("email_field") != null){
    document.getElementById("email_field").onkeydown = function() {
        if(document.getElementById("email_field").style.backgroundColor!= ColorEnum.NONE){
            document.getElementById("email_field").style.backgroundColor= ColorEnum.NONE;
        }
        if (searchEmailTimeout != undefined) {
            clearTimeout(searchEmailTimeout);
        }

        searchEmailTimeout = setTimeout(isValidEmail.bind(null, true), checkDelay);
    };
}

// 
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

    if(allowEmpty && formEmail.value.length == 0){
        // console.log("Setting color to none");
        document.getElementById("email_field").style.backgroundColor= ColorEnum.NONE;
        return false;
    }
    else if(!allowEmpty && formEmail.value.length == 0){
        // console.log("Setting color to red");
        document.getElementById("email_field").style.backgroundColor = ColorEnum.LIGHT_RED;
        return false;
    }
    
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var validEmail = pattern.test(emailAddress);
    
    if(validEmail){
        document.getElementById("email_field").style.backgroundColor= ColorEnum.LIGHT_GREEN;
    }else{
        document.getElementById("email_field").style.backgroundColor= ColorEnum.LIGHT_RED;
    }

    return validEmail;
};

// Functions below this comment are typically only used in the add_repository page
var validName
function isValidName(){
    verifyName();
    return validName;
}

function verifyName(){
    if(formName.value.length <= 0){
        document.getElementById("name_field").style.backgroundColor= ColorEnum.LIGHT_RED;
        validName = false;      
    }else{
        document.getElementById("name_field").style.backgroundColor= ColorEnum.NONE;
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
        document.getElementById("repository_field").style.backgroundColor= ColorEnum.LIGHT_RED;
        validRepoName = false;      
    }else{
        document.getElementById("repository_field").style.backgroundColor= ColorEnum.NONE;
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
        document.getElementById("description_field").style.backgroundColor= ColorEnum.LIGHT_RED;
        validDescription = false;      
    }else{
        document.getElementById("description_field").style.backgroundColor= ColorEnum.NONE;
        validDescription = true;
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

if((window.location + "").includes("add_repository")){
    document.getElementById("name_field").onkeydown = function() {
        if(formName.value.length > 0 &&
            document.getElementById("name_field").style.backgroundColor != ColorEnum.NONE){
            document.getElementById("name_field").style.backgroundColor = ColorEnum.NONE;
        }
    };

    document.getElementById("repository_field").onkeydown = function() {
        if(formRepoName.value.length > 0 &&
            document.getElementById("repository_field").style.backgroundColor != ColorEnum.NONE){
            document.getElementById("repository_field").style.backgroundColor = ColorEnum.NONE;
        }
    };

    document.getElementById("description_field").onkeydown = function() {
        if(formDescription.value.length > 0 &&
            document.getElementById("description_field").style.backgroundColor != ColorEnum.NONE){
            document.getElementById("description_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
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

var validSubject;
function isValidSubject(){
    verifySubject();
    return validSubject;
}

function verifySubject(){
    if(formSubject.value.length > 0){
        validSubject = true;
        formSubject.style.backgroundColor = ColorEnum.NONE;
    }else{
        validSubject = false;
        formSubject.style.backgroundColor = ColorEnum.LIGHT_RED;
    }
}

var validMessage;
function isValidMessage(){
    verifyMessage();
    return validSubject;
}

function verifyMessage(){
    if(formMessage.value.length > 0){
        validMessage = true;
        formMessage.style.backgroundColor = ColorEnum.NONE;
    }else{
        validMessage = false;
        formMessage.style.backgroundColor = ColorEnum.LIGHT_RED;
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


if(document.getElementById("name_field") != null){
    document.getElementById("name_field").onkeyup = function() {
        if(formName.value.length > 0 &&
            document.getElementById("name_field").style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting name_field color to NONE");
            document.getElementById("name_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(document.getElementById("repository_field") != null){
    document.getElementById("repository_field").onkeyup = function() {
        if(formRepoName.value.length > 0 &&
            document.getElementById("repository_field").style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting repository_field color to NONE");
            document.getElementById("repository_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(document.getElementById("description_field") != null){
    document.getElementById("description_field").onkeyup = function() {
        if(formDescription.value.length > 0 &&
            document.getElementById("description_field").style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting description_field color to NONE");
            document.getElementById("description_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(document.getElementById("message_field") != null){
    document.getElementById("message_field").onkeyup = function() {
        if(formMessage.value.length > 0 &&
            document.getElementById("message_field").style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting message_field color to NONE");
            document.getElementById("message_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
}
if(document.getElementById("subject_field") != null){
    document.getElementById("subject_field").onkeyup = function() {
        if(formSubject.value.length > 0 &&
            document.getElementById("subject_field").style.backgroundColor != ColorEnum.NONE){
            // console.log("Setting subject_field color to NONE");
            document.getElementById("subject_field").style.backgroundColor = ColorEnum.NONE;
        }
    };
}
