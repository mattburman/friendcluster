const Room = require('./Room.js');

const express = require('express');
const app = express();

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', ws => {
	ws.on('choice', data => {
		console.log(`[${data.id}][${data.choice}]`);
	});
})

const rooms = {};

app.get('/:room', (req, res) => {
	if (!rooms[req.params.room]) rooms[req.params.room] = new Room(req.params.room, wss);
	console.log(rooms[req.params.room]);
	res.render('/public');
});

app.get('/:room/id', (req, res) => {
	console.log(`[${req.params.room}]`);
	res.status(200).send({ id: rooms[req.params.room].addPerson() })
});

app.post('/:room/choice', (req, res) => {
	rooms[req.params.room].changeChoice(req.body.id, req.body.choice);
	res.status(200).send({ success: true });
});

const PORT = process.env.port || 8084;
app.listen(PORT);
console.log(`Listening on ${PORT}`);

/*
people.displayPeople();
let id = 0;
for (let i = 0.1; i < 1; i+=0.1) {
	for (let j = 0.1; j < 1; j += 0.1) people.addPerson(new Person(id++, i, j));
}

for (let i = 0; i < 1; i++) People{
	people.addRandomResponses();
	people.addScoresToLastResponses();
	people.movePeople();
}
people.displayPeople();
*/

