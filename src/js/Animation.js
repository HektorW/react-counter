
var Animation = {
	animateValue: function(from, to, callback, done) {

		if (from === to) {
			return done();
		}

		var id = setInterval(function() {
			from = (from + 1) % 10;
			callback(from);

			if (from === to) {
				clearInterval(id);
				done();
			}
		}, 250);

		return id;
	},

	animateLoop: function(to, loops, callback, done) {
		var value = 0;
		var target = to + loops * 10;

		var id = setInterval(() => {
			++value;

			callback(value % 10);

			if (value >= target) {
				clearInterval(id);
				done && done();
			}

		}, 200);
	}
};

module.exports = Animation;
