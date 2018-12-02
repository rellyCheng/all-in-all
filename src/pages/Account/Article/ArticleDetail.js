import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal,Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
const { Meta } = Card;
@connect(({ myArticle, loading,articleDetail }) => ({
    myArticle,
    articleDetail,
    loading: loading.effects['articleDetail/articleDetail'],
}))

class ArticleDetail extends Component {
  state = {}
  componentDidMount(){
    const { dispatch,myArticle } = this.props;
    new Promise((resolve) => {
        dispatch({
        type: 'articleDetail/articleDetail',
        payload: {
            resolve,
            params:myArticle.articleId
          }
        })
    }).then((res) => {
        console.log(res);
        this.setState({
            articleDetail:res.data
        })
    })
  }
 
  render() {
    const { loading } = this.props;
    const { articleDetail } = this.state;
    if(articleDetail==null){
        return ''
    }
    console.log(articleDetail);
    return (
      <div>
      <PageHeaderWrapper title="文章详情">
            <Card style={{ width: '100%', marginTop: 16 }} loading={loading}
            bordered = {false}
            title={
            <div style={{textAlign:'center'}}>
            <span>{articleDetail.title}</span>
            </div>
            }
            // extra={<a onClick={this.handleEdite}>编辑</a>}
            cover={<div style={{textAlign:'center'}}><img style={{width:'50%',marginTop:'10px'}} src={articleDetail.cover} /></div>}
            >
                <div dangerouslySetInnerHTML={{__html: articleDetail.content}} />
            </Card>
      </PageHeaderWrapper>
      </div>
    );
  }
}
export default ArticleDetail;
