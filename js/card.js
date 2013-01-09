
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

function defaultCardState() {
	var card_img = document.getElementById('card-front-img');
	card_img.src = 'img/error.jpg'
	
	var card_txt = document.getElementById('card-back-txt');
	card_txt.innerHTML = "Hey!<br/>Unfortunately you do not have a valid URL, but thanks for checking this out!</br>- Scott";
	
	var card_stamp = document.getElementById('card-stamp');
	card_stamp.src = 'img/error_stamp.jpg';
}

var cardID = params('card');

if (cardID != null) {
	var req = new XMLHttpRequest();
	req.open("GET", "http://data.greenlay.net/Cards/" + cardID + '.json', true);
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var json = eval('(' + req.responseText + ')');
				
				var card_img = document.getElementById('card-front-img');
				card_img.src = json.img;
				
				var card_txt = document.getElementById('card-back-txt');
				var text = json.text.replace(/\r/g, '<br/>');
				card_txt.innerHTML = text;
				
				var card_stamp = document.getElementById('card-stamp');
				card_stamp.src = json.stamp;
				
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
			else {
				defaultCardState();
			}
		}
	};
	req.send(null);
}
else {
	defaultCardState();
}

function flipCard() {
	var card = document.getElementById('card');
	card.toggleClassName('flipped');
}

var card_container = document.getElementById('container');
card_container.style.visibility = 'visible';
