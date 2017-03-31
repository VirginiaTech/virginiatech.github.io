/*
Contains general functionality for various portions of the website

Name will probably change as more methods are added.
 */


function openClick(url, newTab = false){
	ctrlKeyPressed = event.ctrlKey;
	if(!url){
		return;
	}
	
	if(!ctrlKeyPressed && !newTab){
		window.location.href = url;
	}else{
		window.open(url, '_blank');
	}
}