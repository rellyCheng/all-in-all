import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider,Button,Modal  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddRoleForm from '@/pages/SystemManage/AddRoleForm';
import RoleUser from '@/pages/SystemManage/RoleUser';
import RolePermission from '@/pages/SystemManage/RolePermission';
@connect(({ role, loading }) => ({
    role,
  loading: loading.effects['role/fetchList'],
}))

class Role extends Component {

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
      type: 'role/fetchList',
      payload: {
        pageCurrent:page,
        pageSize:5
      },
    });
  }
  openRolePermission=(record)=>{
    const { dispatch } = this.props;
    new Promise((resolve) => {
        dispatch({
            type:'role/getPermissionByRole',
            payload:{
                resolve,
                params:record.id
            }
        })
    }).then((res) => {
      if(res.state=='OK'){
        this.setState({
          permissionRes : res.data,
          openRolePermission:true,
          record:record
        })
      }
    })
  }

  openRoleUser=(record)=>{
    const { dispatch } = this.props;
    new Promise((resolve) => {
        dispatch({
            type:'role/getUserByRole',
            payload:{
                resolve,
                params:record.id
            }
        })
    }).then((res) => {
      if(res.state=='OK'){
        this.setState({
          userRes : res.data,
          openRoleUser:true,
          record:record
        })
      }
    })
  }
  render() {
    const { role, loading } = this.props;
    console.log(role);
    const columns = [{
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },{
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=>this.openRolePermission(record)}>分配权限</a>
          <Divider type='vertical'/>
          <a href="javascript:;" onClick={()=>this.openRoleUser(record)}>分配用户</a>
        </span>
      ),
    }];
    
    return (
      <div>
      <PageHeaderWrapper title="角色管理">
         <Card>
          <Button onClick={()=>this.setState({openAddRoleForm:true})}>添加角色</Button>
        </Card>
        <Table
          dataSource={role.roleList}
          style={{ marginBottom: 24 }}
          pagination={{
            current:role.pageCurrent,
            pageSize:5,
            total: role.rowCount,
            showTotal:()=>{
                return `共${role.rowCount}条`
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
          title='添加角色'
          visible={this.state.openAddRoleForm}
          width={500}
          onCancel={()=>this.setState({openAddRoleForm:false})}
          footer={false}
        >
          <AddRoleForm _this={this}/>
      </Modal>
      <Modal
          title='分配用户'
          visible={this.state.openRoleUser}
          width={'54%'}
          onCancel={()=>this.setState({openRoleUser:false})}
          footer={false}
          destroyOnClose={true}
        >
          <RoleUser _this={this} record = {this.state.record} userRes = {this.state.userRes}/>
      </Modal>
      <Modal
          title='分配权限'
          visible={this.state.openRolePermission}
          width={695}
          onCancel={()=>this.setState({openRolePermission:false})}
          footer={false}
          destroyOnClose={true}
        >
          <RolePermission _this={this} record = {this.state.record} permissionRes = {this.state.permissionRes}/>
      </Modal>
     </div>
    );
  }
}
export default Role;
