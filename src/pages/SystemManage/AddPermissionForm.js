import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
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

@connect(({ permission }) => ({
  permission,
}))
@Form.create()
class AddPermissionForm extends React.PureComponent {
  state = {
    parentIdShow: false,
  };

  changeSourceType = value => {
    const { dispatch } = this.props;
    console.log(value);
    if (value == 'twoMenu' || value == 'threeMenu') {
        this.setState({
          parentIdShow: true,
        });
        dispatch({
          type: 'permission/getParentPermissionList',
          payload:value
        });
    } else {
      this.setState({
        parentIdShow: false,
      });
    }
  
  };
  translate = e => {
    let value = e.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/fetchTranslate',
      payload: value,
    });
  };
  handleSubmitForm=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log(values);
          const { dispatch } =this.props;
        new Promise((resolve) => {
          dispatch({
            type:'permission/addPermission',
            payload:{
              resolve,
              values
            }
          })
        }).then((res)=>{
          this.props._this.requestList(1);
          this.props._this.setState({
            openAddPermissionForm:false
          })
        })
      }
    });
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const permission = this.props.permission;
    const parentPermissionList = permission.parentPermissionList || [];
    console.log(permission);
    const pValue = permission.translateValue.replace(/\s+/g, '');
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmitForm} layout="horizontal" hideRequiredMark>
          <Form.Item {...formItemLayout} label="权限类型">
            {getFieldDecorator('resource_type', {
              rules: [{ required: true, message: '请选择权限类型' }],
            })(
              <Select onChange={this.changeSourceType} placeholder="请选择权限类型">
                <Option value="oneMenu">一级菜单</Option>
                <Option value="twoMenu">二级菜单</Option>
                <Option value="threeMenu">三级菜单</Option>
                <Option value="button">按钮</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            style={{ display: this.state.parentIdShow?'block':'none' }}
            {...formItemLayout}
            label="父级菜单"
          >
            {getFieldDecorator('parent_id', {
              rules: [{ required: this.state.parentIdShow, message: '请选择父级菜单' }],
            })(
              <Select placeholder="请选择父级菜单">
                {parentPermissionList.map(item => {
                  return <Option key={item.id}>{item.name}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="权限名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入权限名称' }],
            })(<Input onBlur={e => this.translate(e)} placeholder="请输入权限名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="权限代码">
            {getFieldDecorator('permission', {
              initialValue: pValue,
              rules: [{ required: true, message: '请输入权限(英文)' }],
            })(<Input placeholder="请输入权限(英文)" />)}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button htmlType='submit' type="primary">提交</Button>
          </div>
        </Form>
      </Fragment>
    );
  }
}

export default AddPermissionForm;
