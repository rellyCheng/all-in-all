import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider,Avatar  } from 'antd';
import router from 'umi/router';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class AddUserForm extends React.PureComponent {
  
    state ={
        name:"",
        bgColor:"#00EE00"
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.onAddUser(values);
          }
        });
    }
    //名字图
    tranColor = (name) => {
        var str ='';
        for(var i=0; i<name.length; i++) {
          str += parseInt(name[i].charCodeAt(0), 10).toString(16);
        }
        return '#' + str.slice(1, 4);
    }

  changeName = (e) =>{
    const name = e.target.value.substring(0,1);
    const bgColor = this.tranColor(name);
    this.setState({
        name:name,
        bgColor
    })
  }


  render() {
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const name = this.state.name;
    return (
      <Fragment>
        <Form layout="horizontal" onSubmit={this.handleSubmit}  hideRequiredMark>
          <Form.Item {...formItemLayout} label="真实姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入真实姓名' }],
            })(
                <Input onBlur={(e)=>this.changeName(e)} placeholder="请输入真实姓名"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="账号">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
                <Input placeholder="请输入账号"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
                <Input placeholder="请输入密码"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{display:'none'}} label="头像">
            {getFieldDecorator('bgColor', {
                initialValue:this.state.bgColor,
              rules: [{ required: true, message: '请输入头像' }],
            })(
                <Avatar size={50} style={{  backgroundColor: this.state.bgColor }}>{name}</Avatar>
            )}
          </Form.Item>
          <div style={{textAlign:'center'}}>
            <Button htmlType="submit" type="primary" >
              提交
            </Button>
          </div>
        </Form>
      </Fragment>
    );
  }
}

export default AddUserForm;
