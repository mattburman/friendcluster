const OPTIONS = [true, false, undefined];

function Person(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;

	this.scores = {};
	this.responses = [];
}

function People() {
	this.list = [];

	this.addPerson = person => this.list.push(person);
	this.displayPeople = () => console.log(this.list);
	this.addRandomResponses = () => {
		this.list.forEach(person => {
			const choice = OPTIONS[Math.floor(Math.random()*OPTIONS.length)];
			person.responses.push(choice);
		});
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
			this.list[mainPerson.id].x = (scoreSum * xVec) / (numOthers*numOthers);
			this.list[mainPerson.id].y = (scoreSum * yVec) / (numOthers*numOthers);
		});
	};
}

/*
const people = new People();

people.displayPeople();
let id = 0;
for (let i = 0.1; i < 1; i+=0.1) {
	for (let j = 0.1; j < 1; j += 0.1) people.addPerson(new Person(id++, i, j));
}

for (let i = 0; i < 1; i++) {
	people.addRandomResponses();
	people.addScoresToLastResponses();
	people.movePeople();
}
people.displayPeople();

*/

