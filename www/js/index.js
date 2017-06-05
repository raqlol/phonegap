/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
// event listener for submit
document.getElementById("submitBtn").addEventListener("mousedown", sendZip);
// event action on submit to post zipcode to api
function sendZip() {
	// get zipcode value and convert to number
	var newZip = document.forms["zipForm"]["zipInput"].value;
	var converted = parseFloat(newZip);
	//AJAX
	var http = new XMLHttpRequest();
	var url = "https://localhost:8000/api/zip";
	var params = "zipcode="+ newZip;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if ((newZip.length === 5) && !isNaN(converted)) {
		http.send(params);
	}
	else {
		alert ('Enter a valid 5 digit zipcode please');
		return false
	}
	setTimeout(getConditions, 500);
}

function getConditions () {
	var wu = new XMLHttpRequest();
	wu.open("GET", 'https://localhost:8000/api/conditions', true);
	wu.send();
	wu.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
	 		var myArr = JSON.parse(this.responseText);
			var lastNum = myArr.length -1;
			var lastEntry = myArr[lastNum];
			var location = lastEntry.location;
			var weather = lastEntry.weather;
			var feelslike = Math.round(lastEntry.feelslike);
			var display = "It looks like you're in " + location + ".</br> Right now it feels like " + feelslike + "&deg; F.";
			if (feelslike > 85) {
				if (weather == "Clear") {
					document.body.style.backgroundColor  = "#FF7A69";
					document.getElementById("advice").innerHTML = "put on sunscreen and hit the pool because it's " + weather;
				}
				else {
				document.body.style.backgroundColor  = "#FF69a3";
				document.getElementById("advice").innerHTML = "It is hot! But I don't need to tell you that. Do you even care that it's " + weather + "?";
			}
			}
			else if (feelslike > 70) {

			 	if (weather == "Overcast" || weather == "Partly Cloudy" || weather == "Mostly Cloudy") {
					document.body.style.backgroundColor  = "#ffd750";
					document.getElementById("advice").innerHTML = "It's tank top weather but it's also " + weather;
				}
				else {
					document.body.style.backgroundColor  = "coral";
					document.getElementById("advice").innerHTML = "tank top weather! It's " + weather;
				}
			}
			else if (feelslike > 61) {
				document.body.style.backgroundColor  = "goldenrod";
				if (weather == "Raining") {
					document.getElementById("advice").innerHTML = "Stay in or dress for " + weather;
				}
				else {
					document.getElementById("advice").innerHTML = "bring a light sweater, It's " + weather;
				}
			}
			else if (feelslike > 48) {
				if (weather == "Rain" || weather == "Light Rain") {
					document.body.style.backgroundColor  = "#0000ff";
					document.getElementById("advice").innerHTML ="I'd bundle up and bring an umbrella, there's " + weather;
				}
				else {
					document.body.style.backgroundColor  = "lightseagreen";
					document.getElementById("advice").innerHTML = "It's " + weather + ". I'd put on a heavy sweater." ;
				}
			}
			else {
				document.body.style.backgroundColor  = "0000b3";
				if (weather == "Light Rain" || weather == "Rain") {
					document.getElementById("advice").innerHTML = "stay inside you fool it's cold and there's " + weather;
				}
				else {
					document.getElementById("advice").innerHTML = "stay inside you fool it's cold and " + weather;
				}
			}
			document.getElementById("feels").innerHTML = display;
		}
	};
}
