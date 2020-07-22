import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../page/Login';
import Home from '../page/Home';
import New from '../page/New';
import Message from '../page/Message';
import passwordChange from '../page/passwordChange';

let routers = [
    { path: '/', component: Login, exact: true },
    { path: '/login', component: Login, exact: true },
    { path: '/home', component: Home, exact: true },
    { path: '/new', component: New, exact: true },
    { path: '/message', component: Message, exact: true },
    { path: '/passwordchange', component: passwordChange, exact: true },
]

class RouterConfig extends React.Component {
    render() {
        return (
            <Router>
                {
                    routers.map((item,idx)=><Route key={idx} path={item.path} exact={item.exact} render = {props => {
                        // 这里处理token
                        return <item.component {...props} />
                    }} />)
                }
                {/* <Route path="/" exact component={Login}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path='/home' exact component={Home} ></Route>
                <Route path='/new' component={New}></Route>
                <Route path='/message' component={Message} />
                <Route path='/passwordchange' component={passwordChange} /> */}
            </Router>
        )
    }
}

export default RouterConfig;