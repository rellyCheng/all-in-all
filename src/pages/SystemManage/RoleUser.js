import React, { Fragment } from 'react';
import { connect } from 'dva';
import {  Transfer, Button  } from 'antd';


@connect(({ role }) => ({
    role
}))
class RoleUser extends React.PureComponent {
  
    componentDidMount(){
        const roleId = this.props._this.state.selectRecord.id;
        this.handleAddPermissionForRole(roleId);
    }
    state ={

    }

    
    //提交添加权限
    handleSubmitRolePermission=()=>{
        let a = this.state.originData
        let b = this.state.targetData
        let deletePermissions = a.filter(item => !b.includes(item))
        let addPermissions = b.filter(item => !a.includes(item))
        console.log(addPermissions);
        console.log(deletePermissions);

         
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
    return (
      <Fragment>
        <Transfer
            titles={['未拥有此角色', '已拥有此角色']}
            dataSource={this.state.dataSource}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetData}
            onChange={this.handleChange}
            render={item => item.name}
            listStyle={{width:'300px',height:'400px'}}
         />
         <Button onClick = {this.handleSubmitRolePermission}>提交</Button>
      </Fragment>
      
    );
  }
}

export default RoleUser;
