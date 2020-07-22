import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Header from '../component/Header'

// export default class passwordChange extends Component {
//     constructor(props){
//         super(props);
//         state = {

//         }
//     }


//     render(){
//         return (
//             <div>

//             </div>
//         )
//     }
// }

function passwordChange(){
    return (
        <div>
            <Header />
            <div className='panel'>
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
                        <Button type='primary'>确认</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default passwordChange;