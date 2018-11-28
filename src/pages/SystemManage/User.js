import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider,Button,Modal  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddUserForm from '@/pages/SystemManage/AddUserForm'
@connect(({ sysUser, loading }) => ({
    sysUser,
  loading: loading.effects['sysUser/fetchList'],
}))

class User extends Component {

  state={
    page:1
  }
  componentDidMount() {
    this.requestList();
  }
  requestList = (page,values)=>{
    const { dispatch } = this.props;
    if(page==null){
        page = 1
    }
    dispatch({
      type: 'sysUser/fetchList',
      payload: {
        pageCurrent:page,
        pageSize:5
      },
    });
  }
  handleAddUser =(values)=>{
    const { dispatch } = this.props;
      new Promise((resolve) => {
        dispatch({
          type: 'sysUser/addUser',
          payload: {
            resolve,
            params:values
          },
        }) 
      }).then((res) => {
          console.log(res);
          if(res.state=='OK'){
            this.requestList();
            this.setState({
                openAddUserForm:false
            })
          }
      })
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
      <div>
      <PageHeaderWrapper title="用户管理">
         <Card>
          <Button onClick={()=>this.setState({openAddUserForm:true})}>添加用户</Button>
        </Card>
        <Table
          dataSource={sysUser.userList}
          style={{ marginBottom: 24 }}
          pagination={{
            current:sysUser.pageCurrent,
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
      </PageHeaderWrapper>
      <Modal
          title='添加用户'
          visible={this.state.openAddUserForm}
          width={500}
          onCancel={()=>this.setState({openAddUserForm:false})}
          footer={false}
        >
          <AddUserForm onAddUser = {this.handleAddUser}/>
        </Modal>
     </div>
    );
  }
}
export default User;
