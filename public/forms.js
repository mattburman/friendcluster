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
console.log('forms');

const conn = {};

UI.submitNameBtn.click(function(ev) {
	console.log('click');
	$.ajax({
			url: "/" + window.location.pathname.split("/")[1] + "/join",
			type: "POST",
			headers: {
					"Content-Type": "application/json",
			},
			contentType: "application/json",
			data: JSON.stringify({
					"name": UI.field.value
			})
	})
	.done(function(data, textStatus, jqXHR) {
		console.log("HTTP Request Succeeded: " + jqXHR.status);
		console.log(data);
		UI.welcomeWrapper.hide();
		UI.votingWrapper.show();
		const id = data.id;

		conn.ws = new WebSocket('ws://' + location.hostname + ':8085');

		conn.ws.onconnect = function(msg) {
			UI.yesBtn.click(function(ev) {
				UI.yesBtn.addClass("selected");
				conn.ws.send(JSON.stringify({ choice:"yes", id: id }));
				UI.noBtn.removeClass("selected");
				UI.idkBtn.removeClass("selected");
			});
			UI.noBtn.click(function(ev) {
				UI.noBtn.addClass("selected");
				conn.ws.send(JSON.stringify({ choice:"no", id: id }));
				UI.yesBtn.removeClass("selected");
				UI.idkBtn.removeClass("selected");
			});
			UI.idkBtn.addClass(function(ev) {
				UI.idkBtn.addClass("selected");
				conn.ws.send(JSON.stringify({ choice:"idk", id: id }));
				UI.noBtn.removeClass("selected");
				UI.yesBtn.removeClass("selected");
			});

			conn.ws.onmessage = function(msg) {
				console.log(msg);
				msg = JSON.parse(msg.data);
			}
		}

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("HTTP Request Failed");
	})
	.always(function() {
			/* ... */
	});
});


