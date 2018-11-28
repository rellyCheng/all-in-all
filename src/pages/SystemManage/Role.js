import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider,Button,Modal  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddRoleForm from '@/pages/SystemManage/AddRoleForm'
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
          <a href="javascript:;" onClick={()=> this.editRole()}>编辑</a>
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
     </div>
    );
  }
}
export default Role;
