import React, { Fragment } from 'react';
import { connect } from 'dva';
import {  Transfer, Button, message   } from 'antd';


@connect(({ role }) => ({
    role
}))
class RoleUser extends React.PureComponent {
  
    constructor(props){
        super(props)
        console.log(this.props.userRes)
        this.state={
            targetData:this.props.userRes.haveList,
            originData:this.props.userRes.haveList,
            dataSource:this.props.userRes.allUserList
        }
    }
    
    //提交添加权限
    handleSubmitRoleUser=()=>{
        let a = this.state.originData
        let b = this.state.targetData
        let deleteUsers = a.filter(item => !b.includes(item))
        let addUsers = b.filter(item => !a.includes(item))
        console.log(addUsers);
        console.log(deleteUsers);
        
        const { dispatch,record } = this.props;
        new Promise((resolve) => {
            dispatch({
              type: 'role/addUserForRole',
              payload: {
                resolve,
                params: {
                    addUsers:addUsers,
                    roleId:record.id,
                    deleteUsers:deleteUsers
                }
              }
            }) 
          }).then((res) => {
              console.log(res);
              if(res.state=='OK'){
                this.props._this.requestList();
                this.props._this.setState({
                    openRoleUser:false
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
            titles={['未分配的用户', '已分配的用户']}
            dataSource={this.state.dataSource}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetData}
            onChange={this.handleChange}
            render={item => item.name}
            listStyle={{width:'300px',height:'400px'}}
         />
         <div style={{textAlign:'center',marginTop:'10px'}}>
         <Button onClick = {this.handleSubmitRoleUser}>提交</Button>
         </div>
      </div>
    );
  }
}

export default RoleUser;
