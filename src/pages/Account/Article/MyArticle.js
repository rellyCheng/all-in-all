import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Row, Col, Button,Avatar } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './MyArticle.less';
import router from 'umi/router';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@connect(({ myArticle, loading }) => ({
  myArticle,
  loading: loading.models.myArticle,
}))
@Form.create({
  // onValuesChange({ dispatch }, changedValues, allValues) {
  //   // 表单项变化时请求数据
  //   // eslint-disable-next-line
  //   console.log(changedValues, allValues);
  //   // 模拟查询表单生效
  //   dispatch({
  //     type: 'myArticle/getMyArticleListMore',
  //     payload: {
  //       pageCurrent: 1,
  //     },
  //   });
  // },
})
class MyArticle extends Component {
  componentDidMount() {
    const { dispatch,myArticle } = this.props;
    console.log(myArticle);
    myArticle.pageCurrent = 1;
    dispatch({
      type: 'myArticle/getMyArticleListMore',
      payload: {
        pageCurrent: myArticle.pageCurrent,
      },
    });
  }


  fetchMore = () => {
    const { dispatch,myArticle } = this.props;
    dispatch({
      type: 'myArticle/appendFetch',
      payload: {
        pageCurrent: myArticle.pageCurrent+1,
      },
    });
  };

  handleWrite=()=>{
    router.push(`/account/addArticle`);
  }
  handleArticleDetail = (id)=>{
    const { dispatch,myArticle } = this.props;
    myArticle.articleId=id;
    router.push(`/account/articleDetail`);
  }
  render() {
    const {
      form,
      myArticle,
      loading,
    } = this.props;
    const list = myArticle.list || [];
    console.log(list)
    const { getFieldDecorator } = form;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
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
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                    <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                    <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                    <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                    <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                    <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                    <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                    <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                    <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                    <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                    <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                    <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="活跃用户">
                    {getFieldDecorator('user', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">李三</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="好评度">
                    {getFieldDecorator('rate', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="good">优秀</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
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
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.likeNum} />,
                  <IconText type="message" text={item.message} />,
                ]}
                extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
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
                      <Avatar alt="" src={item.avatar} />
                    ) : (
                      <Avatar  style={{ backgroundColor: item.bgColor }}>
                        <span style={{ fontSize: '12px' }}>{item.ownerName.substring(0, 1)}</span>
                      </Avatar>
                    )
                  }
                  description={
                    <span>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
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

export default MyArticle;
