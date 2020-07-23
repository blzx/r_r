import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

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
    constructor(props){
        super(props);
        this.state = {
            token: false
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    {/* {
                        routers.map((item,idx)=><Route key={idx} path={item.path} exact={item.exact} render = {props => (
                            // 这里处理token
                            (<item.component {...props} />)
                        )} />)
                    } */}

                    <Route path="/" exact component={Login}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path='/home' exact component={Home} ></Route>
                    <Route path='/new' component={New}></Route>
                    <Route path='/message' component={Message} />
                    <Route path='/passwordchange' component={passwordChange} />
                    {/* 如果以上都无法匹配将将重定向到登录页 */}
                    <Redirect to='/login'/>
                </Switch>
            </Router>
        )
    }
}

export default RouterConfig;