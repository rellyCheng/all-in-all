import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal,Avatar,List,Comment,Form,Input,Popover,Mention,Tooltip, message ,Icon   } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import moment from'moment';
import {isEmpty} from '@/utils/utils'
const { Meta } = Card;
const { toString,toContentState  } = Mention;

@connect(({ myArticle, loading,articleDetail,user }) => ({
    myArticle,
    articleDetail,
    loading: loading.effects['articleDetail/articleDetail'],
    currentUser: user.currentUser,
}))

class ArticleDetail extends Component {
  state = { 
    parentItem:{},
    sItem:{}
  };
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
            pageSize:5,
            pageCurrent:pageCurrent
        },
    });
    this.setState({
        pageCurrent:pageCurrent,
        parentItem:{},
        sItem:{},
        commentContent1:null,
        commentContent:null
    })
  }
  handleCancelComment=()=>{
    this.setState({
        parentItem:{},
        sItem:{},
        aite:null,
        defaultMention:null,
    })
  }
  handleReply=(item,sitem={})=>{
    if( typeof sitem.name !=='undefined'){
        this.setState({
            defaultMention:toContentState('@'+sitem.name+"  "),
            parentItem:item,
            aite:item.userId||sitem.userId,
            sItem:sitem
        })
    }else{
        this.setState({
            defaultMention:null,
            parentItem:item,
            aite:item.userId||sitem.userId,
        })
    }
  }
  handleComment=()=>{
    const {parentItem} = this.state;
    console.log(parentItem);
    const { dispatch,articleDetail,myArticle } = this.props;
    dispatch({
        type: 'articleDetail/fetchAddArticleComment',
        payload: {
            articleId:myArticle.articleId,
            parentId:parentItem.id,
            aite:this.state.aite,
            content:this.state.commentContent||this.state.commentContent1
        },
        callback: (res) => {
            
            if(res.state!='OK'){
                message.error("评论失败!");
            }
            this.fetchComment(this.state.pageCurrent)
        }
    });

  }
  handleChangeComment=(e)=>{
    this.setState({
        commentContent:toString(e)
    })
  }
  handleChangeEditor=(e)=>{
    console.log(e.target.value);
    this.setState({
        commentContent1:e.target.value
    })
    
  }
  render() {
    const { loading,articleDetail } = this.props;
    const { articleDetail1 } = this.state;
    if(articleDetail1==null){
        return ''
    }
    const content = (
        <div style={{width:1000}} >
            <Form.Item>
                <Mention
                    style={{ width: '100%', height: 100 }}
                    defaultValue={this.state.defaultMention}
                    onChange={this.handleChangeComment}
                />
            </Form.Item>
            <Button
                type="primary"
                onClick={this.handleComment}
            >
                Reply
            </Button>
            <Button
            style={{marginLeft:'10px'}}
                onClick={this.handleCancelComment}
            >
                Cancel
            </Button>
        </div>
    );

    const commentList = articleDetail.articleComment.pageData || [];
    const CommentChildren = ({ childrenList,item1 }) => {
        if(childrenList!=null){
            return childrenList.map((item,index)=>{
                return  <Comment
                             key={index}
                             actions={[<Popover placement="bottomLeft"  content={content} trigger="click" ><span onClickCapture={()=>this.handleReply(item1,item)}>Reply to</span></Popover>]}
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
    const currentUser = this.props.currentUser;
    return (
      <div>
      <PageHeaderWrapper title="文章详情">
            <Card style={{ width: '100%', marginTop: 10 }}
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
            <Card  bordered = {false}   title={<p><Icon type="smile" /> 发表一点想法</p>} style={{  marginTop: 10 }}>
            <div style={{width:1000}}  >
                <Comment
                    avatar={currentUser.avatar != null ? (
                        <Avatar alt="" src={currentUser.avatar} />
                      ) : (
                        <Avatar  style={{ backgroundColor: currentUser.bgColor }}>
                          <span >{currentUser.name.substring(0, 1)}</span>
                        </Avatar>
                      )}
                    content={
                        <div>
                        <Form.Item>
                        <Input.TextArea ref={node => {this.inputTextArea = node}} value={this.state.commentContent1} rows={4} onChange={this.handleChangeEditor} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                            htmlType="submit"
                            onClick={this.handleComment}
                            type="primary"
                            >
                            Add Comment
                            </Button>
                        </Form.Item>
                        </div>
                    }
                />
            </div>
            </Card>
            <Card style={{marginTop: 10 }} 
            bordered = {false}
            title={<p><Icon type="message" /> 精彩评论</p>}
            >
               
                    {
                          articleDetail.articleComment.rowCount==0?(
                            <div style={{textAlign:'center'}}>
                                <p>智慧如你，不想<a onClick={()=>this.inputTextArea.focus()}>发表一点想法</a>咩~</p>
                            </div>
                          ):(
                            <List
                                itemLayout="horizontal"
                                dataSource={commentList}
                                pagination={articleDetail.articleComment.rowCount==0?null:{
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
                                    renderItem={(item1) =>{
                                    
                                        return (
                                            <Comment
                                            actions={[<Popover placement="bottomLeft"  visible={item1.id==this.state.parentItem.id&&isEmpty(this.state.sItem)?true:false} content={content}  trigger="click"><span onClick={()=>this.handleReply(item1)}>Reply to</span></Popover>]}
                                            author={<div><a>{item1.name}</a> <span>{item1.rank}楼</span></div>}
                                            avatar={item1.avatar != null ? (
                                                <Avatar alt="" src={item1.avatar} />
                                              ) : (
                                                <Avatar  style={{ backgroundColor: item1.bgColor }}>
                                                  <span >{item1.name.substring(0, 1)}</span>
                                                </Avatar>
                                              )}
                                            datetime={
                                                <Tooltip title={moment(item1.createTime).format('YYYY-MM-DD HH:mm:ss')}>
                                                <span>{moment(item1.createTime).fromNow()}</span>
                                                </Tooltip>
                                            }
                                            content={<p>{item1.commentContent}.</p>}
                                            >
                                            {
                                                item1.children.map((item,index)=>{
                                                    return  <Comment
                                                                    key={index}
                                                                    actions={[<Popover placement="bottomLeft" visible={item.id==this.state.sItem.id&&!isEmpty(this.state.parentItem)?true:false} content={content}  trigger="click"><span onClick={()=>this.handleReply(item1,item)}>Reply to</span></Popover>]}
                                                                    author={<div><a>{item.name}</a></div>}
                                                                    avatar={item.avatar != null ? (
                                                                        <Avatar alt="" src={item.avatar} />
                                                                      ) : (
                                                                        <Avatar  style={{ backgroundColor: item.bgColor }}>
                                                                          <span >{item.name.substring(0, 1)}</span>
                                                                        </Avatar>
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
                                        )
                                    } }
                            />
                          )
                             
                            
                    }
                    
            </Card>
      </PageHeaderWrapper>
      </div>
    );
  }
}
export default ArticleDetail;
