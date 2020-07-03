import React, { Component } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './styles/App.less';

import RouterConfig from './router'


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="App">
				<RouterConfig />
			</div>
		)
	}
}

