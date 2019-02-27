import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Row, Col, Button,Avatar, Input } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './MyArticle.less';
import router from 'umi/router';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@connect(({ allArticle, loading }) => ({
  allArticle,
  loading: loading.models.allArticle,
  appendLoading:loading.effects['allArticle/appendFetch'],
}))
@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues) {
      // 表单项变化时请求数据
      // eslint-disable-next-line
      console.log(changedValues, allValues);
      // 模拟查询表单生效
      if(changedValues.type.length==0){
        delete changedValues.type
      }
      dispatch({
        type: 'allArticle/getAllArticleListMore',
        payload: {
          pageCurrent: 1,
          articleFilter:changedValues
        },
      });
    },
  })
class Index extends Component {
    state={
        articleFilter:{}
    }
  componentDidMount() {
    const { dispatch,allArticle } = this.props;
    console.log(allArticle);
    allArticle.pageCurrent = 1;
    dispatch({
      type: 'allArticle/getAllArticleListMore',
      payload: {
        pageCurrent: allArticle.pageCurrent,
        articleFilter:allArticle.articleFilter
      },
    });
  }


  fetchMore = () => {
    const { dispatch,allArticle } = this.props;
    dispatch({
      type: 'allArticle/appendFetch',
      payload: {
        pageCurrent: allArticle.pageCurrent+1,
        articleFilter:allArticle.articleFilter
      },
    });
  };

  handleWrite=()=>{
    router.push(`/account/addArticle`);
  }
  handleArticleDetail = (id)=>{
    const { dispatch,allArticle } = this.props;
    allArticle.articleId=id;
    router.push(`/account/articleDetail?articleId=${id}`);
  }
  handleLike=(e,item)=>{
    e.stopPropagation();
    const { dispatch,allArticle } = this.props;
    dispatch({
      type: 'allArticle/fetchLikeArticle',
      payload: {
        articleId: item.articleId,
      },
      callback:(res)=>{
        console.log(res);
        allArticle.list.map((item1,index1)=>{
          if(item.articleId==item1.articleId){
            item1.likeNum++;
          }
        })
      }
    });
  }
  handleStar=(e,item)=>{
    e.stopPropagation();
    const { dispatch,allArticle } = this.props;
    dispatch({
      type: 'allArticle/fetchStarArticle',
      payload: {
        articleId: item.articleId,
      },
      callback:(res)=>{
        console.log(res);
        allArticle.list.map((item1,index1)=>{
          if(item.articleId==item1.articleId){
            if(res.message=="star"){
              item1.isStar = true;
              item1.starNum ++;
            }else{
              item1.isStar = false;
              item1.starNum --;
            }
          }
        })
      }
    });
  }
  render() {
    const {
      form,
      allArticle,
      loading,
      appendLoading
    } = this.props;
    const list = allArticle.list || [];
    const { getFieldDecorator } = form;
    const IconText = ({ type, text,theme }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} theme = {theme} />
        {text}
      </span>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {appendLoading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;
      console.log(SERVER_IP.API)
    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('type')(
                  <TagSelect>
                    <TagSelect.Option value="0">文集</TagSelect.Option>
                    <TagSelect.Option value="1">科学理论</TagSelect.Option>
                    <TagSelect.Option value="2">每日英语</TagSelect.Option>
                    <TagSelect.Option value="3">学习小技巧</TagSelect.Option>
                    <TagSelect.Option value="4">生活感悟</TagSelect.Option>
                    <TagSelect.Option value="5">随笔</TagSelect.Option>
                    <TagSelect.Option value="6">体育</TagSelect.Option>
                    <TagSelect.Option value="7">其他</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            {/* <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="作者">
                    {getFieldDecorator('ownerName', {})(
                    <Input placeholder="请输入作者姓名" allowClear />
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="标题">
                    {getFieldDecorator('title', {})(
                        <Input placeholder="请输入文章标题" allowClear />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow> */}
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="edit"
              onClick={this.handleWrite}
            >
              写文章
          </Button>
          <List
            size="small"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <p  onClick={(e)=>this.handleStar(e,item)}>
                  <IconText theme={item.isStar?'twoTone':'outlined'} type="star-o" text={item.starNum==0?'':item.starNum} />
                  </p>,
                  <p  onClick={(e)=>this.handleLike(e,item)}>
                    <IconText type="like-o" text={item.likeNum} />
                  </p>,
                   <p  onClick={(e)=>this.handleMessage(e,item)}>
                  <IconText type="message" text={item.messageNum} />
                  </p>,
                ]}
                extra={<img style={{borderRadius:'5px'}} width={272} height={180} alt="logo" src={SERVER_IP.FILE+item.cover} />}
                onClick={()=>this.handleArticleDetail(item.articleId)} 
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  avatar={
                    item.avatar != null ? (
                      <Avatar alt="" src={SERVER_IP.FILE+item.avatar} />
                    ) : (
                      <Avatar  style={{ backgroundColor: item.bgColor }}>
                        <span style={{ fontSize: '12px' }}>{item.ownerName.substring(0, 1)}</span>
                      </Avatar>
                    )
                  }
                  description={
                    <span>
                      <Tag>{item.articleTypeStr}</Tag>
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default Index;
