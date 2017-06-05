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
window.onload =function autoIp() {
	var wu = new XMLHttpRequest();
	var autoip = "http://api.wunderground.com/api/0e8203c8987c2d46/geolookup/conditions/q/autoip.json";
	wu.open("GET", autoip, true);
	wu.send();
	wu.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			getConditions(this);
		}
	}
};
var submitBnt = document.getElementById("submitBtn");
submitBtn.addEventListener("mousedown", validateForm);
function validateForm () {
	sendZip ();
};
function sendZip () {
	var newZip = document.forms["zipForm"]["zipInput"].value;
	var converted = parseFloat(newZip);
	if ((newZip.length !== 5) || isNaN(converted)) {
		alert ('Enter a valid 5 digit zipcode please');
	}
	else {
		var wu = new XMLHttpRequest();
		var url = 'http://api.wunderground.com/api/0e8203c8987c2d46/geolookup/conditions/q/' + newZip + '.json';
		wu.open("GET", url, true);
		wu.send();
		wu.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				getConditions(this);
			}
		}
	}
}

function getConditions (response) {
	var myArr = JSON.parse(response.responseText);
	var location = myArr.location.city;
	var feelslike = Math.round(myArr.current_observation.feelslike_f);
	var weather = myArr.current_observation.weather;
	var display = "It looks like you're in " + location + ".</br> Right now it feels like " + feelslike + "&deg; F.";
	if (feelslike > 85) {
		document.body.style.backgroundColor  = "#FF7A69";
		document.getElementById("advice").innerHTML = "put on sunscreen and hit the pool because it's " + weather;
	}
	else if (feelslike > 73) {
		document.body.style.backgroundColor  = "coral";
		document.getElementById("advice").innerHTML = "tank top weather! It's " + weather;
	}
	else if (feelslike > 61) {
		document.body.style.backgroundColor  = "goldenrod";
		document.getElementById("advice").innerHTML = "bring a light sweater it's " + weather;
	}
	else if (feelslike > 48) {
		document.body.style.backgroundColor  = "lightseagreen";
		document.getElementById("advice").innerHTML = "It's " + weather + ". I'd put on a heavy sweater." ;
	}
	else {
		document.body.style.backgroundColor  = "blue";
		document.getElementById("advice").innerHTML = "stay inside you fool it's " + weather;
	}
document.getElementById("feels").innerHTML = display;
};
