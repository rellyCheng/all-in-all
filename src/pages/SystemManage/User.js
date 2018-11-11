import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
@connect(({ sysUser, loading }) => ({
    sysUser,
  loading: loading.effects['sysUser/fetchList'],
}))

class Permisson extends Component {

  state={
    pageCurrent:1
  }
  componentDidMount() {
    this.requestList();
  }
  requestList = (page,values)=>{
    const { dispatch } = this.props;
    if(page==null){
        page = this.state.pageCurrent
    }
    this.setState({
      pageCurrent:page
    })
    dispatch({
      type: 'sysUser/fetchList',
      payload: {
        pageCurrent:page,
        pageSize:5
      },
    });
  
  }
  render() {
    const { sysUser, loading } = this.props;
    console.log(sysUser);
    const columns = [{
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.editUser()}>编辑</a>
        </span>
      ),
    }];
    
    return (
      <Table
      dataSource={sysUser.userList}
      style={{ marginBottom: 24 }}
      pagination={{
        current:this.state.pageCurrent,
        pageSize:5,
        total: sysUser.rowCount,
        showTotal:()=>{
            return `共${sysUser.rowCount}条`
        },
        showQuickJumper:true,
        onChange:(current)=>{
          this.requestList(current);
        },
      }}
      loading={loading}
      rowKey="id"
      columns={columns} 
    />
    );
  }
}
export default Permisson;
