import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, List, Tag, Icon, Row, Col, Button, Avatar } from 'antd';
import styles from './MyArticle.less';
import ArticleListContent from '@/components/ArticleListContent';
import router from 'umi/router';
import Highlighter from 'react-highlight-words';

@connect(({ allArticle, loading }) => ({
  allArticle,
  loading: loading.effects['allArticle/fetchArticleByKey'],
}))
export default class SearchResult extends Component {
  handleArticleDetail = id => {
    const { dispatch, allArticle } = this.props;
    allArticle.articleId = id;
    router.push(`/index/articleDetail?articleId=${id}`);
  };
  render() {
    const { allArticle, loading } = this.props;
    const { searchList } = allArticle;
    console.log(allArticle.searchKey);
    const searchKey = allArticle.searchKey.split('');
    return (
      <Fragment>
        <Card bordered={false}>
          <List
            size="small"
            loading={searchList.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            dataSource={searchList}
            renderItem={item => (
              <List.Item
                key={item.id}
                extra={
                  <img
                    style={{ borderRadius: '5px' }}
                    width={272}
                    height={180}
                    alt="logo"
                    src={SERVER_IP.FILE + item.cover}
                  />
                }
                onClick={() => this.handleArticleDetail(item.articleId)}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle}>
                      <Highlighter
                        highlight="true"
                        searchWords={searchKey || []}
                        autoEscape={true}
                        textToHighlight={item.title}
                      />
                    </a>
                  }
                />
                <ArticleListContent searchKey={searchKey} data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}
