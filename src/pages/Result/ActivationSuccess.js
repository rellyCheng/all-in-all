import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Card } from 'antd';
import Result from '@/components/Result';
import Link from 'umi/link';

const actions = (
  <Fragment>
    <Button type="primary">
        <Link to='/user/login'>赶快去登陆吧</Link>
    </Button>
  </Fragment>
);

export default () => (
    <Card bordered={false}>
      <Result
        type="success"
        title="激活成功"
        description="欢迎来到all in all，知识推动发展，快把你所知道的让大家都知道吧！"
        // extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
);
