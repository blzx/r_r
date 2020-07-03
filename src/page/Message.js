import Header from '../component/Header';
import React, { Component } from 'react';
import { Button, Table, Tag, Space} from 'antd';
import '../styles/Message.less'


export default class Meaasge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [
                {
                    key: '1',
                    level: '重要',
                    types: ['吃'],
                    status: '已读',
                    detail: '',
                },
                {
                    key: '2',
                    level: '一般',
                    types: ['吃','喝'],
                    status: '未读',
                    detail: '',
                },
                {
                    key: '3',
                    level: '逗你玩',
                    types: ['睡觉'],
                    status: '未读',
                    detail: '',
                },
            ],
            columns : [
                {
                    title: '级别',
                    dataIndex: 'level',
                    key: 'level'
                },
                {
                    title: '类型',
                    dataIndex: 'types',
                    key: 'types',
                    render: types => (
                        <>
                            {types.map(type => {
                                let color = type.length > 5 ? 'geekblue' : 'green';
                                if(type === '吃'){
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={type}>
                                        {type}
                                    </Tag>
                                )
                            })}
                        </>
                    )
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status'
                },
                {
                    title: '查看详情',
                    key: 'detail',
                    render: (text, record) => (
                        <Space size="middle">
                            <a onClick={this.toDetail}>{record.level}</a>
                        </Space>
                    )
                }
            ]
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    toDetail = () => {
        // this.props.
    }


    render () {
        const { dataSource, columns } = this.state;
        return (
            <div>
                <Header />
                <section className="wraper">
                    <div className="title">
                        <span>消息中心</span>
                        <Button onClick={this.goBack}>返回首页</Button>
                    </div>
                    <div className="panel">
                        <Table dataSource={dataSource} columns={columns}></Table>
                    </div>
                </section>
            </div>
        )
    }
}