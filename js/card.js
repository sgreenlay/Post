
function params(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec(window.location.href); 
	if (results == null) {
		return null;
	}
	return results[1];
}

function setCardState(json) {
	if (json.img) {
		var card_img = document.getElementById('card-front-img');
		card_img.src = json.img;
	}
	if (json.text) {
		var card_txt = document.getElementById('card-back-txt');
		var text = json.text.replace(/\r/g, '<br/>');
		card_txt.innerHTML = text;
	}
	if (json.stamp) {
		var card_stamp = document.getElementById('card-stamp');
		card_stamp.src = json.stamp;
	}
	if (json.location) {
		var mapOptions = {
		  center: new google.maps.LatLng(json.location[0], json.location[1]),
		  zoom: 7,
		  mapTypeId: google.maps.MapTypeId.TERRAIN,
		  disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById("map"),
			mapOptions);
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(json.location[0], json.location[1])
		});
		marker.setMap(map);
	}
}

function setToDefaultCardState() {
	var card = {
		img : 'img/error.jpg',
		text : "Hey!\rUnfortunately you do not have a valid URL, but thanks for checking this out!\r- Scott",
		stamp : 'img/error_stamp.jpg'
	}
	setCardState(card);
}

var cardID = params('card');
if (cardID != null) {
	var script = document.createElement('script');
	script.src = 'http://data.greenlay.net/Cards/' + cardID + '.json';
	script.onerror = function () {
	   setToDefaultCardState();
	}
	document.body.appendChild(script);
}
else {
	setToDefaultCardState();
}

function flipCard() {
	var card = document.getElementById('card');
	card.toggleClassName('flipped');
}

var card_container = document.getElementById('container');
card_container.style.visibility = 'visible';
