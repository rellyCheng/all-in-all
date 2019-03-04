import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';

@connect(({ loading, user, project, list }) => ({
  // listLoading: loading.effects['list/fetch'],
  listLoading: loading.effects['list/getArticleListByUser'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
  list,
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/getArticleListByUser',
    });
  }


  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'myStarArticles':
        router.push(`${match.url}/myStarArticles`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    const { dispatch } = this.props;
    new Promise(resolve => {
      if (inputValue) {
        dispatch({
          type: 'user/updateTags',
          payload: {
            resolve,
            params: inputValue,
          },
        });
      } else {
        this.setState({
          inputVisible: false,
        });
      }
    }).then(res => {
      console.log(res);
      if (res.message == 'OK') {
        let { newTags } = state;
        if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
          newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
        }
        this.setState({
          newTags,
          inputVisible: false,
          inputValue: '',
        });
      }
    });
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      listLoading,
      // currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children,
      list,
    } = this.props;
    const currentUser = this.props.currentUser;
    const articleListLength = list.list.length;
    const myStarArticlesLength = this.props.list.myStarArticles.rowCount;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>({articleListLength})</span>
          </span>
        ),
      },
      {
        key: 'myStarArticles',
        tab: (
          <span>
            我的Star<span style={{ fontSize: 14 }}>({myStarArticlesLength})</span>
          </span>
        ),
      },
      // {
      //   key: 'projects',
      //   tab: (
      //     <span>
      //       项目 <span style={{ fontSize: 14 }}>(8)</span>
      //     </span>
      //   ),
      // },
    ];

    const color = [
      '#EE0000',
      '#EE7600',
      '#EEEE00',
      '#006400',
      '#48D1CC',
      '#436EEE',
      '#7D26CD',
      '#FFE4E1',
    ];
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    {currentUser.avatar != null ? (
                      <img alt="" src={SERVER_IP.FILE+currentUser.avatar} />
                    ) : (
                      <Avatar size={100} style={{ backgroundColor: currentUser.bgColor }}>
                        <span style={{ fontSize: '60px' }}>{currentUser.name.substring(0, 1)}</span>
                      </Avatar>
                    )}
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {currentUser.group}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {currentUser.geographic.province.label || ''}
                      {currentUser.geographic.city.label || ''}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tagsList.concat(newTags).map((item, index) => (
                      <Tag color={color[index]} key={item.key}>
                        {item.label}
                      </Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    {/* <div className={styles.teamTitle}>团队</div>
                    <Spin spinning={projectLoading}>
                      <Row gutter={36}>
                        {notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Spin> */}
                  </div>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
