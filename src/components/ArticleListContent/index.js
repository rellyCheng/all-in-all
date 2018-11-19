import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { content, updateTime, cover, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content.substring(0, 10)}</div>
    <div className={styles.extra}>
      <Avatar src={cover} size="small" />
      <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
      <em>{moment(updateTime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
