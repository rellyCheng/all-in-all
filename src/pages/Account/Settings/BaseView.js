import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button, Avatar } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import token from '@/utils/token';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;
const tokenVal = token.get();

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatarType,bgColor,name,avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div style={{display:avatarType==3?'none':'block'}} className={styles.avatar}>
    {
      avatarType==1?<Avatar size={120} style={{backgroundColor:bgColor}}><span style={{fontSize:'70px'}}>{name}</span></Avatar>
      : avatarType==2?<Avatar size={130} src={avatar} alt="avatar" />:''
    }
    </div>
  </Fragment>
);

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }
  state = {
    fileData:[]
  }
  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    console.log(currentUser)
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };
  handleSubmit = () =>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          const { dispatch } = this.props;
          if(this.state.fileData.length>0){
            values.avatar = this.state.fileData[0].response.data.key;
          }
          dispatch({
            type: 'user/updateUserDetail',
            payload:values
          });
      }
    });
  }
  handleUpload = (fileList)=>{
    console.log(fileList)
    this.setState({
      fileData:fileList.fileList
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const currentUser = this.props.currentUser
    let avatarType;
    console.log(this.state.fileData)
    if(this.state.fileData.length>0){
      avatarType = 3
    }else{
      if(currentUser.avatar){
        avatarType = 2
      }else{
        avatarType = 1
      }
    }
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit = {this.handleSubmit} hideRequiredMark>
          <FormItem label={formatMessage({ id: 'app.settings.basic.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input disabled/>)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.profile' })}>
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.profile-message' }, {}),
                  },
                ],
              })(
                <Input.TextArea
                  placeholder={formatMessage({ id: 'app.settings.basic.profile-placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.country' })}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.country-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button  htmlType='submit' type="primary">
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          {/* <AvatarView avatar={this.getAvatarURL()} /> */}
          {
            <div>
           <AvatarView avatarType={avatarType} bgColor = {currentUser.bgColor} name = {currentUser.name.substring(0,1)} avatar = {SERVER_IP.FILE+currentUser.avatar}></AvatarView>
           <Upload  
              action='/api/qiNiu/upload'
              onChange = {this.handleUpload}
              listType="picture"
              headers={{'Authorization':'Bearer '+tokenVal}}>
                <Button style={{display: this.state.fileData.length>0?'none':'block'}} icon="upload">
                  <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
                </Button>
            </Upload>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default BaseView;
