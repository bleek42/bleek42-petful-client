import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	submitName = (ev) => {
		ev.preventDefault();
		const person = this.state.name;
		this.props.addPerson(person);
		this.props.enqueue();
		this.setState({
			name: person,
		});
	};

	render() {
		return (
			<div className="queue-form">
				<form onSubmit={(ev) => this.submitName}>
					<label htmlFor="user">Enter name to get in line</label>
					<input type="text" name="user" />
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

export default Form;
