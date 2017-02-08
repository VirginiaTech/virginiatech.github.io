var searchTimeout;
var formUsername = document.querySelector("#username_field");

document.getElementById("username_field").onkeydown = function() {
    if (searchTimeout != undefined) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(callServerScript, 350);
};

function callServerScript() {

    if (formUsername.value.length <= 0) {
        return;
    }

    var pageReq = new XMLHttpRequest();

    console.log("length is: " + formUsername.value.length);

    pageReq.timeout = 2000;
    pageReq.onreadystatechange = function(e) {
        if (pageReq.readyState == 4) {
            if (pageReq.status == 200) {
                console.log("A User!");
            } else {
                console.log("Not a user");
            }
        }
    }

    pageReq.ontimeout = function() {
        console.error("Request timeout: ", pageReq);
    }

    pageReq.open("GET", "https://api.github.com/users/" + formUsername.value, true);
    pageReq.send();
}
