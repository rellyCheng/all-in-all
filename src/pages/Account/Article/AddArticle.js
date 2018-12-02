import React, { Component } from 'react';
import E from 'wangeditor';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Input, Button, Switch, Icon, Upload, Modal, Select, Form, message } from 'antd';
import token from '@/utils/token';
const FormItem = Form.Item;


@connect(({ global,loading,myArticle }) => ({
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
      isPublic:true
    };
  }
  componentDidMount() {
    const elem = this.refs.editorElem;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      console.log(html.replace(/<[^>]+>/g,""))
      this.setState({
        editorContent: html,
      });
    };
    editor.customConfig.uploadImgServer = '/upload';
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
  
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.description = this.state.editorContent.replace(/<[^>]+>/g,"").substring(0,50);
        values.content = this.state.editorContent;
        values.cover =  values.file[0].response.data.filePath;
        console.log(values)
        const { dispatch } = this.props;
        dispatch({
          type: 'myArticle/save',
          payload: values
        });
        this.setState({
          open:false
        })
        
      }
    });
  }
  handleNext=()=>{
    if(this.state.title==null||this.state.title==''){
      message.error("文章标题不能为空！")
      return;
    }
    if(this.state.editorContent==null||this.state.editorContent==''){
      message.error("文章内容不能为空！")
      return;
    }
    this.setState({
      open:true
    })
  }
  onChangeInput=(e)=>{
    this.setState({
      title:e.target.value
    })
  }
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
    const tokenVal = token.get();
    return (
      <PageHeaderWrapper title="写文章">
      <Card bordered={false}>
      <Form  hideRequiredMark style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '',
                },
              ],
            })( <Input onChange={this.onChangeInput} placeholder="请输入文章标题" />)}
        </FormItem>
        {/* 将生成编辑器 */}
        <div  ref="editorElem" style={{ textAlign: 'left',display:this.state.open?'none':'block' }} />
          
        <div style={{ textAlign: 'center' ,marginTop:'20px'}}>
          <Button type="primary" onClick={this.handleNext}>
            下一步
          </Button>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.open} 
          onCancel={()=>{
            this.setState({open:false})
          }}
          footer={null}
        >
          <FormItem
          {...formItemLayout}
          label="封面图"
          >
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
            action='/api/upload/singleUpload'
            listType="picture-card"
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            headers={{'Authorization':'Bearer '+tokenVal}}
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
              initialValue:true
            })( <Switch
              defaultChecked
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />)}
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
              onChange={(value)=>this.setState({type:value})}
              >
                <Select.Option value="1">IT</Select.Option>
                <Select.Option value="2">科技</Select.Option>
                <Select.Option value="3">体育</Select.Option>
                <Select.Option value="4">汽车</Select.Option>
                <Select.Option value="5">八卦</Select.Option>
                <Select.Option value="6">军事</Select.Option>
                <Select.Option value="7">随笔</Select.Option>
              </Select>
              )}
            </FormItem>
            <div style={{ textAlign: 'center' ,marginTop:'20px'}}>
              <Button type="primary" onClick={this.handleSubmit} htmlType='submit'>
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
