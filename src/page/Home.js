import '../styles/Home.less';
import Header from '../component/Header';
import React, { Component } from 'react';
// import {Redirect,BrowserRouter as Router,Route} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import New from './New.js'
const { SubMenu } = Menu;
const { Content, Sider } = Layout;


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
            
		}
    }
    
    clickHandler = () => {
        console.log(this.props)
        // this.props.history.push('./new')
	}

	render() {
		return (
			<Layout>
                <Header />
                <div className="content">
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="sub2" icon={<LaptopOutlined />}>subnav 2</Menu.Item>
                                
                            <Menu.Item key="sub3" icon={<NotificationOutlined />}>subnav 3</Menu.Item>
                                
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
                </div>
                
            </Layout>
		)
	}
}