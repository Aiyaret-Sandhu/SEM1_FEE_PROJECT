// Load the Google Maps API
	function initMap() {
		// Specify the coordinates of the location you want to show on the map
		var myLatLng = {lat: 30.516363390637334,  lng: 76.66009962586715};

		// Create a new map object
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: myLatLng
		});

		// Add a marker to the map
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'My Location'
		});
	}

	// Set up the API call
	function loadScript() {
		var script = document.createElement("script");
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQB43CyH1JAWH9HauihG2zyyMK1wZYlQ&callback=initMap";
		document.head.appendChild(script);
	}



	// Load the API when the page is loaded
	window.onload = loadScript;

	function changeInner(){
		var element1 = getElementById('#btn2');
		element1.innerHTML = "Added to cart";
	}
