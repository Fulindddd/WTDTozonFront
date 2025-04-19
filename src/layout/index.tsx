import React, { useState } from 'react';
import { Layout } from 'antd';
import LeftMenu from './leftMenu';
import TopNav from './topNav';
import './index.less';
// import WSocket from '@/common/websocket';
// import E2 from '@/common/event-emitter';

interface WsMessage {
  data: boolean;
  type: string;
}
export interface ITodoList {
  menuId: number;
  parentId: number;
  time: string;
  type: number;
  name?: string;
  parentName?: string;
  routerPath: string;
}

const { Sider, Content } = Layout;
function AppLayout(props: any): React.ReactElement {
  const [collapseState, setCollapseState] = useState(false);

  return (
    <Layout className="layout-page">
      <Sider collapsed={collapseState} trigger={null} width={240} className="sider">
        <LeftMenu collapseState={collapseState} />
      </Sider>
      <Layout>
        <TopNav collapseState={collapseState} onChangeCollapse={() => setCollapseState(!collapseState)} />
        <Content className="content-wrap" id="view">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
