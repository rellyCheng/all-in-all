import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddPermissionForm from '@/pages/SystemManage/AddPermissionForm'
@connect(({ permission, loading }) => ({
  permission,
  loading: loading.effects['permission/fetchList'],
}))

class Permisson extends Component {

  state = {}
  componentDidMount() {
    this.requestList();
  }
  requestList = (page,values)=>{
    const { dispatch } = this.props;
    if(page==null){
        page = 1
    }
    dispatch({
      type: 'permission/fetchList',
      payload: {
        pageCurrent:page,
        pageSize:5
      },
    });
  }
  render() {
    const { permission, loading } = this.props;
    console.log(permission);
    const columns = [{
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '权限代码',
      dataIndex: 'permission',
      key: 'permission',
    }, {
      title: '权限类别',
      dataIndex: 'resource_type',
      key: 'resource_type',
      render(resource_type) {
          return resource_type=='oneMenu'?'一级菜单':resource_type=='twoMenu'?'二级菜单':resource_type=='threeMenu'?'三级菜单':'按钮权限'
      }
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span>
    //       <a href="javascript:;" onClick={()=> this.delPermission()}>删除权限</a>
    //     </span>
    //   ),
    // }
  ];
    
    return (
      <div>
      <PageHeaderWrapper title="权限管理">
        <Card>
          <Button onClick={()=>this.setState({openAddPermissionForm:true})}>添加权限</Button>
        </Card>
        <Table
        dataSource={permission.permissionList}
        style={{ marginBottom: 24 }}
        pagination={true}
        loading={loading}
        rowKey="id"
        columns={columns} 
        />
      </PageHeaderWrapper>
      <Modal
        title='添加权限'
        visible={this.state.openAddPermissionForm}
        width={500}
        onCancel={()=>{
            this.setState({
              openAddPermissionForm:false,
            })
        }}
        footer={false}
      >
        <AddPermissionForm _this={this}/>
      </Modal>
      </div>
    );
  }
}
export default Permisson;
