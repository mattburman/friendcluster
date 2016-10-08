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
}

const people = new People();

people.displayPeople();

let id = 0;
for (let i = 0.1; i < 1; i+=0.1) {
	for (let j = 0.1; j < 1; j+=0.1) people.addPerson(new Person(id++, i, j));
}

people.displayPeople();

console.log(people.list.length);

for (let i = 0; i < 100; i++) {
	people.addRandomResponses();
	people.addScoresToLastResponses();
}
people.displayPeople();

