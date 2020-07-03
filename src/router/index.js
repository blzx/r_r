import Login from '../page/Login'
import Home from '../page/Home';
import New from '../page/New';
import Message from '../page/Message'

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class RouterConfig extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Login}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path='/home' exact component={Home} ></Route>
                {/* <Route path='/home' component={Home}></Route> */}
                <Route path='/new' component={New}></Route>
                <Route path='/message' component={Message} />
            </Router>
        )
    }
}

export default RouterConfig;