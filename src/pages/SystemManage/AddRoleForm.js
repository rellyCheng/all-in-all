import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Avatar, message  } from 'antd';
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

@connect(({ permission,role }) => ({
    permission,
    role
}))
@Form.create()
class AddRoleForm extends React.PureComponent {
  
    state ={
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            new Promise((resolve) => {
                dispatch({
                  type: 'role/addRole',
                  payload: {
                    resolve,
                    params:values
                  },
                }) 
              }).then((res) => {
                  console.log(res);
                  if(res.state=='OK'){
                    this.props._this.requestList();
                    this.props._this.setState({
                        openAddRoleForm:false
                    })
                  }else{
                      message.error(res.message)
                  }
              })
          }
        });
    }
    translate = e => {
        let value = e.target.value;
        const { dispatch } = this.props;
        dispatch({
          type: 'permission/fetchTranslate',
          payload: value,
        });
      };
  render() {
    const { form,permission } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const pValue = permission.translateValue.replace(/\s+/g, '');
    return (
      <Fragment>
        <Form layout="horizontal" onSubmit={this.handleSubmit}  hideRequiredMark>
          <Form.Item {...formItemLayout} label="角色描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入角色描述' }],
            })(
                <Input onBlur={e => this.translate(e)}  placeholder="请输入角色描述"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="角色">
            {getFieldDecorator('role', {
              rules: [{ required: true, message: '请输入角色' }],
              initialValue: pValue,
            })(
                <Input placeholder="请输入角色"/>
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

export default AddRoleForm;
