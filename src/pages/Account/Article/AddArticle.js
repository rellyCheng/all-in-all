import React, { Component } from 'react';
import E from 'wangeditor';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card,Input,Button, Switch, Icon,Upload,Modal  } from 'antd';

class App extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: '',
        previewVisible:false,
        previewImage:'',
        fileList:[]
      }
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.customConfig.uploadImgServer = '/upload'
    editor.create();
   
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log(fileList);
  }   
 
  handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }
    clickHandle() {
        alert(this.state.editorContent)
    }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    return (
        <PageHeaderWrapper title="写文章">
         <Input placeholder='请输入文章标题'/>
        {/* 将生成编辑器 */}
        <div  ref="editorElem" style={{textAlign: 'left'}}></div>
        
        <br/>
        <br/>
        <div className="clearfix">
        <span style={{float:'left'}}>封面图：</span>
            <Upload
            action={"/ftp/uploadBatch"}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            // headers={{'Authorization':'Bearer '+token}}
            data={{
                fromPlace:'b7cdc099-3721-11e8-b0aa-88d7f6c46d53',
                userId:'b7cdc099-3721-11e8-b0aa-88d7f6c46d53',
            }}
            >
            {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        <div>
        <br/>
        <span>是否公开：</span>
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
        <span style={{fontSize:'8px',marginLeft:'10px',color:'green'}}>将会展示到本站文献中</span>
        </div>
        <div style={{textAlign: 'center'}}>
        <Button type='primary' onClick={this.clickHandle.bind(this)}>发布文章</Button>
        </div>
        </PageHeaderWrapper>
    );
  }
}

export default App;
