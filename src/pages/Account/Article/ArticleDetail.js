import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal,Avatar,List,Comment,Form,Input,Popover,Mention,Tooltip    } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import moment from'moment';
const { Meta } = Card;
const { toString,toContentState  } = Mention;

@connect(({ myArticle, loading,articleDetail }) => ({
    myArticle,
    articleDetail,
    loading: loading.effects['articleDetail/articleDetail'],
}))

class ArticleDetail extends Component {
  state = { };
  componentDidMount(){
    const { dispatch,myArticle } = this.props;
    new Promise((resolve) => {
        dispatch({
        type: 'articleDetail/articleDetail',
        payload: {
            resolve,
            params:{
                articleId:myArticle.articleId,
            }
          }
        })
    }).then((res) => {
        console.log(res);
        this.setState({
            articleDetail1:res.data
        })
    })
    this.fetchComment();
  }
  fetchComment=(pageCurrent=1)=>{
    const { dispatch,myArticle } = this.props;
    dispatch({
        type: 'articleDetail/fetchArticleComment',
        payload: {
            articleId:myArticle.articleId,
            pageSize:2,
            pageCurrent:pageCurrent
        },
    });
  }
  handleReply=(item,name)=>{
    if( typeof name !=='undefined'){
        this.setState({
            defaultMention:toContentState('@'+name+"  "),
        })
    }else{
        this.setState({
            defaultMention:null,
        })
    }
  }
  render() {
    const { loading,articleDetail } = this.props;
    const { articleDetail1 } = this.state;
    if(articleDetail1==null){
        return ''
    }
    const content = (
        <div style={{width:1000}} >
             <Mention
                style={{ width: '100%', height: 100 }}
                defaultValue={this.state.defaultMention}
            />
            <br/>
            <br/>
            <Button
                type="primary"
            >
                Reply
            </Button>
        </div>
    );

    const commentList = articleDetail.articleComment.pageData || [];
    console.log(commentList);
    const CommentChildren = ({ childrenList,item1 }) => {
        console.log(item1)
        if(childrenList!=null){
            return childrenList.map((item,index)=>{
                return  <Comment
                             key={index}
                             actions={[<Popover placement="bottomLeft"  content={content} trigger="click" ><span onClickCapture={()=>this.handleReply(item1,item.name)}>Reply to</span></Popover>]}
                             author={<div><a>{item.name}</a> <span>{item.createTime}</span></div>}
                             avatar={(
                             <Avatar
                                 src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                 alt="Han Solo"
                             />
                             )}
                             content={<p>{item.commentContent}.</p>}
                         >
                         </Comment>
             })
        }else{
            return ''
        }
    }
     
    return (
      <div>
      <PageHeaderWrapper title="文章详情">
            <Card style={{ width: '100%', marginTop: 16 }} loading={loading}
            bordered = {false}
            title={
            <div style={{textAlign:'center'}}>
            <span>{articleDetail1.title}</span>
            </div>
            }
            cover={<div style={{textAlign:'center'}}><img style={{width:'50%',marginTop:'10px'}} src={articleDetail1.cover} /></div>}
            >
                <div dangerouslySetInnerHTML={{__html: articleDetail1.content}} />
            </Card>
            <Card style={{ width: '100%', marginTop: 16 }} loading={loading}
            bordered = {false}
            title='评论'
            >
               
                    
                    <List
                        itemLayout="horizontal"
                        dataSource={commentList}
                        pagination={{
                            current:articleDetail.articleComment.pageCurrent,
                            pageSize:articleDetail.articleComment.pageSize,
                            total: parseInt(articleDetail.articleComment.rowCount),
                            showTotal:()=>{
                                return `共${articleDetail.articleComment.rowCount}条`
                            },
                            showQuickJumper:true,
                            onChange:(pageCurrent)=>{
                                this.setState({
                                    pageCurrent:pageCurrent
                                })
                                this.fetchComment(pageCurrent);
                            },
                            }}
                            renderItem={item1 => (
                            <Comment
                            actions={[<Popover placement="bottomLeft"  content={content}  trigger="click"><span onClick={()=>this.handleReply(item1)}>Reply to</span></Popover>]}
                            author={<div><a>{item1.name}</a> <span>{item1.rank}楼</span></div>}
                            avatar={(
                                <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                                />
                            )}
                            datetime={
                                <Tooltip title={moment(item1.createTime).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(item1.createTime).fromNow()}</span>
                                </Tooltip>
                            }
                            content={<p>{item1.commentContent}.</p>}
                            >
                            {/* <CommentChildren childrenList={item1.children} item1 ={item1}/> */}
                            {
                                item1.children.map((item,index)=>{
                                    return  <Comment
                                                    key={index}
                                                    actions={[<Popover placement="bottomLeft"  content={content}  trigger="click"><span onClick={()=>this.handleReply(item1,item.name)}>Reply to</span></Popover>]}
                                                    author={<div><a>{item.name}</a></div>}
                                                    avatar={(
                                                    <Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                        alt="Han Solo"
                                                    />
                                                    )}
                                                    datetime={
                                                        <Tooltip title={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}>
                                                        <span>{moment(item.createTime).fromNow()}</span>
                                                        </Tooltip>
                                                    }
                                                    content={<p>{item.commentContent}.</p>}
                                                >
                                                </Comment>
                                    })
                            }
                            </Comment>
                        )}
                    />
            </Card>
      </PageHeaderWrapper>
      </div>
    );
  }
}
export default ArticleDetail;
