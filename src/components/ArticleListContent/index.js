import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { content, updateTime, cover, ownerName, href, description,avatar,bgColor } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{description}</div>
    <div className={styles.extra}>
      {/* {
          avatar != null ? (
            <Avatar alt="" src={avatar} />
          ) : (
            <Avatar  style={{ backgroundColor: bgColor }}>
              <span style={{ fontSize: '12px' }}>{ownerName.substring(0, 1)}</span>
            </Avatar>
          )
      } */}
      <a href={href}>{ownerName}</a> 发布在 <a href={href}>{href}</a>
      <em>{moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}</em>
    </div>
  </div>
);

export default ArticleListContent;
