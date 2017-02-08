function tempFunc() {

    var formData = {};

    var formEmail = document.querySelector("#email_field");
    var formUsername = document.querySelector("#username_field");

    formData["email_field"] = formEmail.value;
    formData["username_field"] = formUsername.value;

    for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
            console.log(key + " -> " + formData[key]);
        }
    }

    var jsonObj = JSON.stringify(formData);

    //https://api.github.com/orgs/VirginiaTech/members/

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "https://api.github.com/users/" + formUsername.value, true);
    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            console.log("success");
        } else if (oReq.status == 204) {
            console.log("Given user: " + formUsername.value + " is a member!");
        } else if (oReq.status == 404) {
            console.log("Given user: " + formUsername.value + " is not a member.");
        } else if (oReq.status == 302) {
            console.log("You're not even a member...");
        } else {
            console.log("failure");
        }
    };

    oReq.send(jsonObj);
}
