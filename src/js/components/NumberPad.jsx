'use strict';

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Animation = require('../Animation');

var NumberPad = React.createClass({

	// getInitialState: function() {
	// 	return {
	// 		value: this.props.initialValue
	// 	};
	// },

	componentDidMount: function() {
		// Animation.animateValue(this.state.value, this.props.targetValue, this.onAnimationProgress);
	},

	onAnimationProgress: function(value) {
		// this.setState({ value: value });
	},

	render: function() {
		// const value = this.state.value;
		const value = this.props.value;

		return (
			<div className="number-container">
				<ReactCSSTransitionGroup
					transitionName="transition"
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
				>
					<div
						className="number-value"
						key={value}
					>
						{value}
					</div>
				</ReactCSSTransitionGroup>
			</div>
		); 
	}
});

module.exports = NumberPad;