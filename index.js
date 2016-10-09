const Room = require('./Room.js');

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('html', require('ejs').renderFile);

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8085 });

const rooms = {};
const ROOM = 'defaultRoom';
const DEFAULT_ROOM = new Room(ROOM, wss)

wss.on('connection', ws => {
	ws.on('message', data => {
		data = JSON.parse(data);
		console.log(`[${data.id}][${data.choice}]`);
		rooms[data.room].changeChoice(data.id, data.choice);
	});
});

app.post('/:room/join', function(req, res) {
	/*
	console.log(req.body);
	console.log(`[${req.params.room}][${req.body.name}]`);
	if (!rooms[req.params.room]) rooms[req.params.room] = new Room(req.params.room, wss);
	console.log('req.body: ' + JSON.stringify(req.body));
	console.log(`req.params: ${req.params}`);
	console.log(`rooms[req.params.room]: ${rooms[req.params.room]}`);
	const id = rooms[req.params.room].addPerson(req.body.name);
	console.log('ID@@: ', id);
	*/
	const id = DEFAULT_ROOM.addPerson(req.body.name);
	res.status(200).send({ id: id})
});

app.get('/:room', (req, res) => {

//	if (!rooms[req.params.room]) rooms[req.params.room] = new Room(req.params.room, wss);
//	if (!rooms[ROOM]) rooms[ROOM] = new Room(ROOM, wss);
	res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.post('/:room/choice', (req, res) => {
//	if (!rooms[ROOM])
//	rooms[ROOM].changeChoice(req.body.id, req.body.choice);
	ROOM.changeChoice(req.body.id, req.body.choice);
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

