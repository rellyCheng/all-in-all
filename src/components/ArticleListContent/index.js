import React from 'react';
import moment from 'moment';
import { Avatar, Typography } from 'antd';
import styles from './index.less';
import Highlighter from 'react-highlight-words';
const { Paragraph } = Typography;

const ArticleListContent = ({
  searchKey,
  data: { content, updateTime, cover, ownerName, href, description, avatar, bgColor },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>
      <Paragraph ellipsis={{ rows: 3 }}>
        <Highlighter
          highlight="true"
          searchWords={searchKey || []}
          autoEscape={true}
          textToHighlight={description}
        />
      </Paragraph>
    </div>
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
      <a>{ownerName}</a> 发布在 <a>{href}</a>
      <em>{moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}</em>
    </div>
  </div>
);

export default ArticleListContent;
