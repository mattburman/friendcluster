const Person = function(name, id, x, y) {
	this.name = name;
	this.id = id;
	this.x = x;
	this.y = y;

	console.log('X: ', this.x);
	console.log('Y: ', this.y);
	this.scores = {};
	this.responses = [];
	this.response = undefined;
	this.addRoundResponse = response => {
		if (response === true || response === false) this.response = response;
		else this.response = undefined;
	};
	this.addResponse = () => {
		this.responses.push(this.response);
	};
}

module.exports = Person;

