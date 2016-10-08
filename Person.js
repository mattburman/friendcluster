const Person = function(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;

	this.scores = {};
	this.responses = [];
	this.response = undefined;
	this.addResponse = (response) => {
		if (response === true || response === false) responses.push(response);
		else responses.push(undefined);
		this.response = undefined;
	};
}

module.exports = Person;

