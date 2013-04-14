//Important Objects:
function publisher() {
	var subscribers = {};
	var obj = {};
	
	//Allows one to subscribe to an event on this object:
	obj.subscribe = function(type, fn) {
		if(subscribers[type] === undefined){
			subscribers[type] = [];
		}
		subscribers[type].push(fn);
	};
	
	// Allows one to unsubscribe from an event on this object:
	
	obj.unsubscribe = function(type, fn) {
		if(subscribers[type] === undefined) {
			return false;
		}
		var s = subscribers[type];
		for(var i = 0; i < s.length; i++){
			if(s[i] === fn){
				delete s[i];
				return true;
			}
		}
		
		return false;
	};
	
	//Allows the object to publish to subscribers on the event type with the given arguments
	obj.publish = function(type, arg) {
		if(subscribers[type] === undefined){
			return false;
		}
		
		//Iterates over subscriber functions and invokes them.
		var s = subscribers[type];
		for(var i = 0; i < s.length; i++){
			var fn = s[i];
			fn(arg);
		}
		return true;
	};
	
	return obj;
}

function myChirps() {
	var obj = Object.create(publisher());
	obj.elm = $('#chirp-post-button');
	
	//Handles a click event on the UI button:
	obj.elm.click(function (event) {
		// Log the event to the console
		console.log('Submit button pressed!');
		// Publish the event to any subscribers.
		obj.publish('submit');
		//Circumvent default behaviour:
		return false;
	});
	
	return obj;
}

//The chirp list that corresponds with the message list defined in the view:
function chirpList(){
	var obj = Object.create(publisher());
	obj.elm = $('#chirp-list');
	
	//A method to add a message to the list:
	obj.addMessage = function(msg){
		var next = $('<li>');
		next.text(msg);
		obj.elm.prepend(next);
	};
	
	return obj;
}

// The application that creates all necessary graphical widgets and connects them together in the correct way.

function chirpApp(socket){
	var obj = Object.create(publisher());
	obj.elm = $('div#chirp-app');
	
	//Create each of the important UI objects:
	obj.text = chirpTextArea();
	obj.post = chirpPostButton();
	obj.list = chirpList();
	
	//We let the post button deal with its own click event.
	// We simply subscribe to the submit event on the post button.
	//It will invoke our callback when it is ready to do so:
	
	obj.post.subscribe('submit', function() {
		//Get the textarea's text and send to server:
		var message = obj.text.getText();
		socket.emit('post', {post : message});
		
		//Clear the text box and add the message locally:
		obj.text.clearText();
		obj.list.addMessage(message);
	});
	
	//Handle incoming post messages from the server:
	socket.on('post', function(data) {
		obj.list.addMessage(data.post);
	});
	
	return obj;
}

//This is the chirp module to avoid name conflicts:

var Chirp = {};

$(function() {
	//Connect with WebSockets:
	var socket = io.connect();
	//Instantiate a new Chirp app
	Chirp.app = chirpApp(socket);
});