import React, { Component } from 'react';
import E from 'wangeditor';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Input, Button, Switch, Icon, Upload, Modal, Select, Form, message } from 'antd';
import token from '@/utils/token';
const FormItem = Form.Item;
const tokenVal = token.get();

@connect(({ global, loading, myArticle }) => ({
  global,
  myArticle,
  submitting: loading.effects['myArticle/submitAddArticleForm'],
}))
@Form.create()
class AddArticle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      isPublic: true,
    };
  }
  componentDidMount() {
    const elem = this.refs.editorElem;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      console.log(html.replace(/<[^>]+>/g, ''));
      this.setState({
        editorContent: html,
      });
    };
    editor.customConfig.uploadImgServer = '/api/qiNiu/upload1';
    editor.customConfig.uploadFileName = 'file';
    editor.customConfig.uploadImgTimeout = 3000000;
    editor.customConfig.uploadImgHeaders = {
      Authorization: 'Bearer ' + tokenVal,
    };

    editor.customConfig.uploadImgHooks = {
      before: function(xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function(xhr, editor, result) {
        console.log(result);
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function(xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        if (result.state == 'OK') {
          var url = SERVER_IP.FILE + '/' + result.data.key;
          insertImg(url);
        }
        // result 必须是一个 JSON 格式字符串！！！否则报错
      },
    };
    editor.create();
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log(fileList);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.description = this.state.editorContent.replace(/<[^>]+>/g, '');
        values.content = this.state.editorContent;
        values.cover = values.file[0].response.data.key;
        console.log(values);
        const { dispatch } = this.props;
        dispatch({
          type: 'myArticle/save',
          payload: values,
        });
        this.setState({
          open: false,
        });
      }
    });
  };
  handleNext = () => {
    if (this.state.title == null || this.state.title == '') {
      message.error('文章标题不能为空！');
      return;
    }
    if (this.state.editorContent == null || this.state.editorContent == '') {
      message.error('文章内容不能为空！');
      return;
    }
    this.setState({
      open: true,
    });
  };
  onChangeInput = e => {
    this.setState({
      title: e.target.value,
    });
  };
  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper title="写文章">
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(<Input onChange={this.onChangeInput} placeholder="请输入文章标题" />)}
            </FormItem>
            {/* 将生成编辑器 */}
            <div
              ref="editorElem"
              style={{ textAlign: 'left', display: this.state.open ? 'none' : 'block' }}
            />

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button type="primary" onClick={this.handleNext}>
                下一步
              </Button>
            </div>
            <Modal
              title="Basic Modal"
              visible={this.state.open}
              onCancel={() => {
                this.setState({ open: false });
              }}
              footer={null}
            >
              <FormItem {...formItemLayout} label="封面图">
                {getFieldDecorator('file', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [
                    {
                      required: true,
                      message: '',
                    },
                  ],
                })(
                  <Upload
                    action="/api/qiNiu/upload"
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    headers={{ Authorization: 'Bearer ' + tokenVal }}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                )}
              </FormItem>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              <FormItem {...formItemLayout} label="是否公开">
                {getFieldDecorator('isPublic', {
                  rules: [
                    {
                      required: true,
                      message: '',
                    },
                  ],
                  initialValue: true,
                })(
                  <Switch
                    defaultChecked
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                  />
                )}
                <span style={{ fontSize: '8px', marginLeft: '10px', color: 'green' }}>
                  将会展示到本站文献中
                </span>
              </FormItem>
              <FormItem {...formItemLayout} label="所属分类">
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '',
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="文章分类"
                    onChange={value => this.setState({ type: value })}
                  >
                    <Select.Option value="0">文集</Select.Option>
                    <Select.Option value="1">科学理论</Select.Option>
                    <Select.Option value="2">每日英语</Select.Option>
                    <Select.Option value="3">学习小技巧</Select.Option>
                    <Select.Option value="4">生活感悟</Select.Option>
                    <Select.Option value="5">随笔</Select.Option>
                    <Select.Option value="6">体育</Select.Option>
                    <Select.Option value="7">其他</Select.Option>
                  </Select>
                )}
              </FormItem>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary" onClick={this.handleSubmit} htmlType="submit">
                  发布文章
                </Button>
              </div>
            </Modal>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AddArticle;
