import '../styles/Header.less';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
const crane = require("../images/crane.jpg");
const menu = (
    <Menu>
        <Menu.Item>
            账户设置
        </Menu.Item>
        <Menu.Item>
            修改密码
        </Menu.Item>
    </Menu>
)

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: '1'
        }
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

    logout = () => {
        console.log(this.props)
        this.props.history.push('/login')
    }




    render() {
        // const { current } = this.state;
        const { history, match, location }  = this.props;
        console.log(history,match,location)
        return (
            <div>
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
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
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

export default withRouter(Header); // 非路由组件可通过withRouter访问history location match staticContext