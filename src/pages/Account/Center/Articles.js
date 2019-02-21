import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

@connect(({ list }) => ({
  list,
}))
class Center extends PureComponent {
  render() {
    const {
      list: { list },
    } = this.props;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    console.log(list)
    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="star-o" text={item.starNum} />,
              <IconText type="like-o" text={item.likeNum} />,
              <IconText type="message" text={item.messageNum} />,
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
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
    );
  }
}

export default Center;
