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
