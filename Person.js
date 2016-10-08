const Person = function(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;

	this.scores = {};
	this.responses = [];
}

module.exports = Person;

