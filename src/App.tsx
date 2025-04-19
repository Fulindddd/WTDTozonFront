import React, { ReactElement, useReducer } from 'react';
import { ConfigProvider } from 'antd';
import './App.less';
import router from '@/router';
import Context, { reducer, initState } from '@/context';
import { getStorage } from '@/utils/utils';
import theme from '@/common/theme/index';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

dayjs.locale('zh-cn');

function App(): ReactElement {
  // useEffect(() => {
  let arr = getStorage({
    name: 'tags',
    type: 'session',
  });
  let obj = getStorage({
    name: 'currentTag',
    type: 'session',
  });
  arr ? null : (arr = initState.tags);
  obj ? null : (obj = initState.currentTag);
  const [state, dispatch] = useReducer(reducer, {
    currentTag: obj,
    tags: arr,
  });

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Context.Provider value={{ state, dispatch }}>
        <div id="App">{router()}</div>
      </Context.Provider>
    </ConfigProvider>
  );
}

export default App;
