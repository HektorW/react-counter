'use strict';

var React = require('react');
var NumberPad = require('./NumberPad.jsx');
var Animation = require('../Animation');

var App = React.createClass({

	getInitialState: function() {
		this.animationIntervals = [];

		return {
			targetValues: [7, 6, 5, 2, 1],
			currentValues: ['-', '-', '-', '-', '-'],
			index: 4
		}
	},

	componentDidMount: function() {
		this.animateIndex(this.state.index);
		window.addEventListener('click', this.onClick, false);
		// this.setupLoops();
	},

	setupLoops: function() {
		this.state.targetValues.forEach((value, index) => {
			const loops = 1 + this.state.targetValues.length - index;
			Animation.animateLoop(value, loops, current => this.onProgress(index, current));
		});
	},

	animateIndex: function(index) {
		Animation.animateValue(
			typeof this.state.currentValues[index] === 'number' ? this.state.currentValues[index] : 0,
			this.state.targetValues[index],
			value => this.onProgress(index, value),
			this.onDone
		);
	},

	onClick: function() {
		const add = Math.round(Math.random() * 1000);
		const value = parseInt(this.state.targetValues.reduce((v, t) => v.toString() + t.toString()), 10) + add;
		const arr = value.toString().split('').map(v => parseInt(v, 10));

		this.setState({
			targetValues: arr,
			index: arr.length - 1
		});
		this.animateIndex(arr.length - 1);
	},

	onDone: function() {
		if (this.state.index > 0) {
			const index = this.state.index - 1;
			this.setState({ index });
			this.animateIndex(index);
		}
	},

	onProgress: function(index, value) {
		const copy = this.state.currentValues.slice();
		copy[index] = value;
		this.setState({ currentValues: copy });
	},

	render: function() {

		return (
			<div className="container">
				{this.state.currentValues.map((value, index) => {
					return <NumberPad key={index} value={value}/>;
				})}
			</div>
		); 
	}
});

module.exports = App;