const OPTIONS = [true, false, undefined];
const Person = require('./Person.js');

const People = function() {
	this.list = [];

	this.addPerson = (name, id) => {
		const person = new Person(name, id, Math.random(), Math.random());
		console.log(person.x, person.y);
		this.list.push(person);
	}
	this.displayPeople = () => console.log(this.list);
	this.changeChoice = (id, response) => {
		this.list[id].addRoundResponse(response);
	};
	this.addRandomResponses = () => {
		this.list.forEach(person => {
			const choice = OPTIONS[Math.floor(Math.random()*OPTIONS.length)];
			person.responses.push(choice);
		});
	};
	this.addRoundResponses = () => {
		this.list.forEach(person => person.addResponse());
	};
	this.addScoresToLastResponses = () => {
		this.list.forEach(mainPerson => {
			this.list.forEach(person => {
				if (!Number.isInteger(mainPerson.scores[person.id])) mainPerson.scores[person.id] = 0;

				const lastResponseIndex = mainPerson.responses.length - 1;
				if (mainPerson.responses[lastResponseIndex] === undefined || person.responses[lastResponseIndex] === undefined) return;

				if (mainPerson.responses[lastResponseIndex] === person.responses[lastResponseIndex]) {
					return mainPerson.scores[person.id]++;
				}
				return mainPerson.scores[person.id]--;
			});
		});
	}
	this.movePeople = () => {
		const listCopy = JSON.parse(JSON.stringify(this.list));

		listCopy.forEach(mainPerson => {
			const xVec = listCopy.reduce((prev, person) => prev + person.x - mainPerson.x, 0);
			const yVec = listCopy.reduce((prev, person) => prev + person.y - mainPerson.y, 0);

			const scoreSum = listCopy.reduce((prev, person) => prev + mainPerson.scores[person.id], 0);

			const numOthers = listCopy.length - 1;
			console.log("numOthers: ", numOthers);
			console.log('xVec: ', xVec);
			console.log('scoreSum: ', scoreSum);
			if (numOthers === 0) return;
			this.list[mainPerson.id].x = (scoreSum * xVec) / (numOthers*numOthers);
			this.list[mainPerson.id].y = (scoreSum * yVec) / (numOthers*numOthers);
			console.log('movePeople X: ', this.list[mainPerson.id].x);
		});
	}
	this.getPeople = () => {
		console.log(this.list);
		return this.list.map(person => {
			console.log("person: " + JSON.stringify(person));
			console.log("name: " + person.name);
			return {
				x: person.x, y: person.y, name: person.name
			}
	});
	}
}

module.exports = People;

