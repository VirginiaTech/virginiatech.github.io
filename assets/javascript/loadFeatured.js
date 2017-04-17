f1 = document.getElementById("featured_1");
f2 = document.getElementById("featured_2");
f3 = document.getElementById("featured_3");
f4 = document.getElementById("featured_4");
f5 = document.getElementById("featured_5");

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'FeaturedUsers/fData.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
function generateFeatured(){
	var fData;
	loadJSON(function(response) {
		fData = JSON.parse(response);
		
		var numFeatured = 0;

		for (var key in fData) {
			if (fData.hasOwnProperty(key)) {
				if(fData[key]["title"] != "" && numFeatured < 6){
					numFeatured = numFeatured + 1;
					fillFeaturedSpot(numFeatured, fData[key]);
					console.log(numFeatured);
				}

			}
		}

		clearLoading(numFeatured);
	});
}

// Fill a featured object with data, set it to visible, and remove it's loading.gif
// given it's feature number and jsonObj data
function fillFeaturedSpot(numFeatured, jsonObj){
	var featureKey = "f_" + numFeatured + "_";
	document.getElementById(featureKey + "loading").style.display = "none";
	document.getElementById(featureKey + "title").innerHTML = jsonObj["title"];
	document.getElementById(featureKey + "body").innerHTML = jsonObj["body"];
	if(jsonObj["type"] == "default"){
		var base_url = window.location.origin;

		document.getElementById(featureKey + "btn").innerHTML = "Apply for Featured";
		document.getElementById(featureKey + "btn").onclick = openClick.bind(null, base_url + "/featured_repos" , false);;
	}else{
		var base_url = window.location.origin;
		document.getElementById(featureKey + "btn").innerHTML = "See on GitHub";
		document.getElementById(featureKey + "btn").onclick = openClick.bind(null, jsonObj["btnUrl"] , true);
	}

	document.getElementById("featured_" + numFeatured).style.display = "";
}

// Removes loading.gif from un-loaded featured objects
function clearLoading(numLoaded){
	for(i = numLoaded + 1; i <= 6; i++){
		document.getElementById("featured_" + i + "_parent").style.display = "none";
	}
}

window.onload = generateFeatured;