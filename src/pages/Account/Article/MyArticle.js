import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddPermissionForm from '@/pages/SystemManage/AddPermissionForm'
@connect(({ list, loading }) => ({
    list,
  loading: loading.effects['list/fetchList'],
}))

class MyArticle extends Component {

  render() {
    
    return (
      <div>
        我的文章列表
      </div>
    );
  }
}
export default MyArticle;
