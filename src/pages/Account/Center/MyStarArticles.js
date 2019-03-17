import React, { PureComponent } from 'react';
import { List, Icon, Tag,Skeleton } from 'antd';
import { connect } from 'dva';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

@connect(({ list,loading }) => ({
  list,
  loading:loading.effects['list/getMyStarArticles'],
}))
class Center extends PureComponent {
    componentDidMount(){
      this.fetchMyStarArticles();
    }
    fetchMyStarArticles=(page = 1)=>{
        const { dispatch } = this.props;
        dispatch({
          type: 'list/getMyStarArticles',
          payload:{
            pageCurrent:page,
            pageSize:2
          }
        });
      }
  render() {
    const myStarArticles = this.props.list.myStarArticles;
    const { loading } = this.props;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={myStarArticles.pageData}
        pagination={{
            current:myStarArticles.pageCurrent,
            pageSize:5,
            total: myStarArticles.rowCount,
            showTotal:()=>{
                return `共${myStarArticles.rowCount}条`
            },
            showQuickJumper:true,
            onChange:(current)=>{
              this.requestList(current);
            },
        }}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="like-o" text={item.likeNum} />,
              <IconText type="message" text={item.messageNum} />,
            ]}
            extra={<img style={{borderRadius:'5px'}} width={272} height={180} alt="logo" src={SERVER_IP.FILE+item.cover} />}

          >
           <Skeleton loading={loading} active avatar>
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
            </Skeleton>
          </List.Item>
          
        )}
      />
    );
  }
}

export default Center;
