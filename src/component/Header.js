import '../styles/Header.less';

import React, { Component } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // 在函数组件使用
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Avatar, Badge, Dropdown, Input, Button } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { increment, decrement } from '../store/headerSlice';

// const { SubMenu } = Menu;
const crane = require("../images/crane.jpg");





// const dispatch = useDispatch()
const mapStateToProps = (state) => {
    return{state: state}
}

const mapDispatchToProps = dispatch => {
    return{
        addOne: () => {
            dispatch(increment())
        },
        addTwo: () => {
            dispatch(decrement())
        }
    }
}

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: '1'
        }

    }

    componentWillMount = () => {
        console.log(this.props)
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    messagePage = () => {
        this.props.history.push('/message')
    }


    handleClick = e => {
        console.log(e);
        this.setState({ current: e.key })
    }

    settings = ({key,index}) => {
        console.log(123)
        console.log(key,index)
        if(key === 'item_1'){
            this.props.history.push('/passwordChange')
        }
    }

    logout = () => {
        console.log(this.props)
        this.props.history.push('/login')
    }

    addNumOne = () => {
        this.props.addOne();
        console.log(this.props);
    }

    addNumTwo = () => {
        this.props.addTwo();
        console.log(this.props)
    }




    render() {
        // const { current } = this.state;
        const menu = (
            <Menu onClick={this.settings}>
                <Menu.Item>
                    账户设置
                </Menu.Item>
                <Menu.Item>
                    修改密码
                </Menu.Item>
            </Menu>
        )
        const { history, match, location }  = this.props;
        console.log(history,match,location)
        return (
            <div>
                {/* <div>
                    <Button onClick={this.addNumOne}>+1</Button>
                    <Input value={this.props.state.headerReducer.num}></Input>
                    <Button onClick={this.addNumTwo}>+2</Button>
                </div> */}
                <div className="nav">
                    <div className="navItem">
                        <Avatar src={crane} />
                    </div>
                    <div className="navItem" onClick={this.messagePage}>
                        <Badge count={10} dot>
                            <MailOutlined  style={{color: "#fff"}} />
                        </Badge>
                    </div>
                    <div className="navItem">
                        <Dropdown overlay={menu} placement="bottomCenter" arrow >
                            <SettingOutlined style={{color: '#fff'}}/>
                        </Dropdown>
                    </div>
                    <div className="navItem" style={{color: '#fff'}} onClick={this.logout}>退出</div>
                </div>
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} onClick={this.handleClick}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <SubMenu key="2" title="" icon={<SettingOutlined />}>
                        <Menu.Item key="settint1">个人设置</Menu.Item>
                        <Menu.Item key="settint2">修改密码</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3" icon={<MailOutlined />}></Menu.Item>
                </Menu> */}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header)); // 非路由组件可通过withRouter访问history location match staticContext