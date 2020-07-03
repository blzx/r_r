import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
import { Button } from 'antd';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="App">
				新页面
                <Button type="primary" onClick={() => {this.props.history.go(-1)}}>返回</Button>
			</div>
		)
	}
}
