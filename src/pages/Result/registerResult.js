import React, { Fragment,Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Card } from 'antd';
import Result from '@/components/Result';
import Link from 'umi/link';

export default class registerResult extends Component {
  render() {
    const actions = (
        <Fragment>
          <Button type="primary">
              <Link to='/user/login'>赶快去登陆吧</Link>
          </Button>
        </Fragment>
    );
    const {name,userName} = this.props.location.query;
    return (
        <Card bordered={false}>
            <Result
            type="success"
            title="激活成功"
            description={`${name}欢迎来到all in all，你的用户名为：${userName}，初始密码：123123`}
            // extra={extra}
            actions={actions}
            style={{ marginTop: 48, marginBottom: 16 }}
            />
        </Card>
    )
  }
}


