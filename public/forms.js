const UI = {
	welcomeWrapper: $("#welcome-wrapper"),
	votingWrapper: $("#voting-wrapper"),
	submitNameBtn: $("#submit-name"),
	field: $("#name"),
	yesBtn: $("#yes"),
	noBtn: $("#no"),
	idkBtn: $("#idk"),
	selected: $("#idk")
};

var URL = '/gary/join';
const sub = 'ws.';
const WS_PORT = "";
console.log('forms');

const conn = {};

const ROOM = window.location.pathname.split("/")[1];

UI.submitNameBtn.click(function(ev) {
	console.log('click');
	console.log(UI.field.val());
	$.ajax({
		url: "http://" + window.location.hostname + URL,
			type: "POST",
			headers: {
					"Content-Type": "application/json",
			},
			contentType: "application/json",
			data: JSON.stringify({
				"name": UI.field.val()
			}),
			dataType: "json"
	})
	.done(function(data, textStatus, jqXHR) {
		console.log("HTTP Request Succeeded: " + jqXHR.status);
		console.log(data);
		UI.welcomeWrapper.hide();
		UI.votingWrapper.show();
		const id = data.id;
		console.log(id);

		conn.ws = new WebSocket('ws://' + sub + location.hostname + WS_PORT);

		console.log(conn.ws);
		conn.ws.onopen = function() {
			console.log('connected');
			function Choice (choice) {
				this.choice = choice;
				this.id = id;
				this.room = ROOM;
			}
			UI.yesBtn.click(function(ev) {
				console.log('yes');
				UI.yesBtn.addClass("selected");
				console.log(new Choice('yes'));
				conn.ws.send(JSON.stringify(new Choice('yes')));
				UI.noBtn.removeClass("selected");
				UI.idkBtn.removeClass("selected");
			});
			UI.noBtn.click(function(ev) {
				console.log('no');
				UI.noBtn.addClass("selected");
				conn.ws.send(JSON.stringify(new Choice('no')));
				UI.yesBtn.removeClass("selected");
				UI.idkBtn.removeClass("selected");
			});
			UI.idkBtn.click(function(ev) {
				console.log('idk');
				UI.idkBtn.addClass("selected");
				conn.ws.send(JSON.stringify(new Choice('idk')));
				UI.noBtn.removeClass("selected");
				UI.yesBtn.removeClass("selected");
			});

			conn.ws.onmessage = function(msg) {
				console.log(msg);
				msg.data = JSON.parse(msg.data);
				console.log(msg.data.people);
				updateArray(msg.data.people);
			}
		};

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("HTTP Request Failed");
	})
	.always(function() {
			/* ... */
	});
});


