import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Header from '../component/Header'

function passwordChange(){
    let modifyPassword = ()=> {
        let data = {username: 'q',password: '123'}
        React.$http.post('/api/modifipassword',data)
    }
    return (
        <div>
            <Header />
            <div className='panel'>
                <Link to='/home'>
                    <Button style={{position: 'fixed',right:20,bottom:20}} >回到首页</Button>
                </Link>
                <Form
                    labelCol={{span:8}}
                    wrapperCol={{span:8}}
                    name= 'passwordF'
                    rules={[
                        
                    ]}
                >
                    <Form.Item label='原密码'>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label='新密码'>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label='确认密码'>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 16,offset:4}}>
                        <Button type='primary' onClick={modifyPassword}>确认</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default passwordChange;