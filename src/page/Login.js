import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import loginService from '../server/login';

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 8 }
// }

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16
    }
}

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentWillMount = () => {
        console.log(React.$http)
        
    }

    login = () => {
        loginService.login().then(
            data => {
                console.log(data);
                // this.props.history.push('./home')
            },
            err => {
                console.log(err)
            }
        );
    }

    formRef = React.createRef();
    onFinish = values => {
        console.log('Success:', values);
        // this.props.history.push('./home')
        this.login();
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    onReset = () => {
        console.log(this.formRef)
        this.formRef.current.resetFields()
    }

    


    render() {
        
        
        return (
            <div>
                <Form
                    // {...layout}
                    labelCol={{span:8}}
                    wrapperCol={{span:8}}
                    ref={this.formRef}
                    name="basic"
                    // size='large' // 设置字段组件（input）尺寸
                    hideRequiredMark="true"  // 表单必填项标记是否隐藏
                    // labelAlign="left" // label 的对齐方式
                    initialValues={{remember:true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                                validateTrigger: 'blur'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" placeholder="请输入用户名" />}/>
                    </Form.Item>
                    
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" placeholder="请输入密码" />} />
                        {/* <Input type="password" prefix={<LockOutlined className="site-form-item-icon" placeholder="请输入密码" />} /> */}
                    </Form.Item>
                    
                    {/* <Form.Item
                        {...tailLayout}
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>保存账号</Checkbox>
                    </Form.Item> */}

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button onClick={this.onReset} style={{marginLeft:'5px'}} >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}