import React, { Fragment } from 'react';
import { connect } from 'dva';
import {  Transfer, Button, message   } from 'antd';


@connect(({ role }) => ({
    role
}))
class RolePermission extends React.PureComponent {
  
    constructor(props){
        super(props)
        console.log(this.props.permissionRes)
        this.state={
            targetData:this.props.permissionRes.haveList,
            originData:this.props.permissionRes.haveList,
            dataSource:this.props.permissionRes.allPermissionList
        }
    }
    
    //提交添加权限
    handleSubmitRolePermission=()=>{
        let a = this.state.originData
        let b = this.state.targetData
        let deletePermissions = a.filter(item => !b.includes(item))
        let addPermissions = b.filter(item => !a.includes(item))
        console.log(addPermissions);
        console.log(deletePermissions);
        
        const { dispatch,record } = this.props;
        new Promise((resolve) => {
            dispatch({
              type: 'role/addPermissionForRole',
              payload: {
                resolve,
                params: {
                    addPermissions:addPermissions,
                    roleId:record.id,
                    deletePermissions:deletePermissions
                }
              }
            }) 
          }).then((res) => {
              console.log(res);
              if(res.state=='OK'){
                this.props._this.requestList();
                this.props._this.setState({
                    openRolePermission:false
                })
              }else{
                  message.error(res.message)
              }
          })
         
    }
    //穿梭框 搜索
    filterOption = (inputValue, option) => {
        return option.name.indexOf(inputValue) > -1;
    }
    //穿梭框 穿梭
    handleChange = (targetKeys) => {
        this.setState({ targetData:targetKeys });
    }
  render() {
    const { role } = this.props;
    console.log(this.state)
    return (
      <div>
        <Transfer
            titles={['未拥有的权限', '已拥有的权限']}
            dataSource={this.state.dataSource}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetData}
            onChange={this.handleChange}
            render={item => item.name}
            listStyle={{width:'300px',height:'400px'}}
         />
         <div style={{textAlign:'center',marginTop:'10px'}}>
         <Button onClick = {this.handleSubmitRolePermission}>提交</Button>
         </div>
      </div>
    );
  }
}

export default RolePermission;
