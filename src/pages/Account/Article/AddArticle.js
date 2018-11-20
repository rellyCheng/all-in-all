import React, { Component } from 'react';
import E from 'wangeditor';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card,Input } from 'antd';

class App extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
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
    editor.create()
  }
  clickHandle() {
      alert(this.state.editorContent)
  }
  render() {
    return (
        <PageHeaderWrapper title="写文章">
        {/* 将生成编辑器 */}
        <Input placeholder='请输入文章标题'/>
        <div  ref="editorElem" style={{textAlign: 'left'}}></div>
        <button onClick={this.clickHandle.bind(this)}>获取内容</button>
        </PageHeaderWrapper>
    );
  }
}

export default App;
