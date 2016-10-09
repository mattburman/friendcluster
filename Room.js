const People = require('./People.js');
const Person = require('./Person.js');

const questions = ['Node.js', 'AR', 'VR', 'Java', 'Ruby', 'Scala', 'C', 'C++', 'F#', 'Haskell'];
const nQuestions = questions.length;

const Room = function(name, wss) {
	let id = -1;
	this.name = name;
	this.people = new People();
	this.addPerson = () => this.people.addPerson(++id, Math.random(), Math.random()) && id;
	this.changeChoice = this.people.changeChoice;

	let q = 1;
	setInterval(
		function() {
			console.log('interval' + q);
			q++;
			wss.clients.forEach(client => client.send(`{ "room": "${this.name}", "ev": "refresh", "q": "${questions[q%nQuestions]}"}`));
		},
		3000
	);
};

module.exports = Room;

