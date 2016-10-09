const People = require('./People.js');
const Person = require('./Person.js');

const questions = ['Node.js', 'AR', 'VR', 'Java', 'Ruby', 'Scala', 'C', 'C++', 'F#', 'Haskell'];
const nQuestions = questions.length;

const Room = function(name, wss) {
	let id = -1;
	this.name = name;
	this.people = new People();
	id += 1;
	this.addPerson = name => {
		console.log('people list length: ' + this.people.list.length);
		this.people.addPerson(name, id, Math.random(), Math.random());
		console.log('after people list length: ' + this.people.list.length);
		return id;
	}
	this.changeChoice = this.people.changeChoice;

	let q = 1;
	setInterval(() => {
			console.log('interval' + q);
			q++;
			this.people.addRoundResponses();
			this.people.addScoresToLastResponses();
			this.people.movePeople();
			const people = this.people.getPeople();
			wss.clients.forEach(client => client.send(`{ "room": "${this.name}", "ev": "refresh", "q": "${questions[q%nQuestions]}", "people": ${JSON.stringify(people)}}`));
		},
		3000
	);
};

module.exports = Room;

