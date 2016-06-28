$("#error").hide();
$("#hud").show();

if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(gotLocation);
} else {
	displayError("Your browser doesnt support geolocation");
}

navigator.gelocation.getCurrentPosition(gotLocation);

function gotLocation(currentPostion){
	$("#hud").hide();

	var $restaurants = $("span");

  $restaurants.each(function(){
    var restaurantLatitude = $(this).data("lat");
    var restaurantLongitude = $(this).data("lon");
    
    var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, restaurantLatitude, restaurantLongitude);
    
    $(this).text(distanceInMiles + " miles");
  });
}

function gotError(error) {
	var message;

	switch(error.code) {
		case error.PERMISSION_DENIED:
			message = "You need to give permission to your location to calculate distances";
			break;
		case error.POSITION_UNAVAILABLE:
			message = "There was an issue getting yoru location form your device. PLease try again";
			break;
		case error.TIMEOUT:
			message = "It took too long getting your position.";
			break;
		default:
		message = "An unknown error has occured, please refresh the page";
			break;
	}
	displayError(message);
}


function displayError(message) {
	$("#hud").hide();
  $("#error").text(message).slideDown("slow");
}