
function sendRepoReq(){
	var userVal = getUserVal();
    var failedExtras = verifyExtras();
    verifyUsername(true);

    if(userVal <= 0){
    	document.getElementById("username_field").style.backgroundColor= "#ffb3b3";
    }

    if(failedExtras.length == 0 && userVal > 0){
    	send_message.text = "";
    	send_message.style.color = "";

    	// Do the sending of the Repository Request Here
    }else if(failedExtras.length >= 1 && userVal <= 0 || failedExtras.length > 1){
    	send_message.text = "Required credentials are missing";
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }else{
    	if(failedExtras.length <= 0 && userVal < 0){
    		send_message.text = "GitHub user is not a [public] member of this organization.";
    	}else if(userVal == 0){
    		send_message.text = "Missing GitHub Username field";
    	}
    	switch(failedExtras[0]){
    		case "N":
    			send_message.text = "Missing Name field";
    			break;
    		case "R":
    			send_message.text = "Missing Repository Name field";
    			break;
    		case "D":
    	    	send_message.text = "Missing Description field";
    	    	break;
    	}
        send_message.style.color = "red";
        send_message.style.fontWeight = "900";
    }
}