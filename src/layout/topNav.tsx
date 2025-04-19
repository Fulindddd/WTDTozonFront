import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Tabs, Modal, Popover, Tooltip } from 'antd';
import viewRouters from '@/router/views';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Context from '@/context';
import { setStorage, getStorage, removeStorage } from '@/utils/utils';
import { logout } from '@/axiosInstance/api';
import { CloseOutlined, SoundOutlined } from '@ant-design/icons';
import { ITodoList } from './index';
import IconFont from '@/assets/icon/iconfont';

const topNavData = [
  {
    title: '后台管理',
    icon: 'icon-yonghuguanli',
  },
];
const { TabPane } = Tabs;

interface Props {
  collapseState: boolean;
  onChangeCollapse: () => void;
}
function TopNav(props: Props) {
  const { collapseState, onChangeCollapse } = props;
  const location = useLocation();
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const switchPage = (key: string) => {
    navigate(key);
  };

  const closePage = (key: string) => {
    let index = state.tags.findIndex((item) => {
      return item.pathname == key;
    });
    let arr = state.tags;
    arr.splice(index, 1);
    dispatch({
      type: 'updateTags',
      data: {
        ...state,
        tags: arr,
      },
    });
    if (key == state.currentTag.pathname) {
      index == arr.length ? navigate(state.tags[index - 1].pathname) : navigate(state.tags[index].pathname);
    }
  };

  const userLogout = async () => {
    Modal.confirm({
      title: '确认退出？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        removeStorage({
          name: 'tags',
          type: 'sesssion',
        });
        return logout().then((res) => {
          dispatch({
            type: 'updateTags',
            data: {
              ...state,
              tags: [],
            },
          });
          dispatch({
            type: 'updateCurrentTag',
            data: {
              ...state,
              currentTag: location,
            },
          });
          removeStorage({
            name: 'tags',
            type: 'sesssion',
          });
          removeStorage({
            name: 'currentTag',
            type: 'sesssion',
          });
          removeStorage({
            name: 'token',
          });
          navigate('/login');
        });
      },
    });
  };

  useEffect(() => {
    setStorage({
      name: 'tags',
      content: state.tags,
      type: 'session',
    });
  }, [state.tags]);
  useEffect(() => {
    setStorage({
      name: 'currentTag',
      content: state.currentTag,
      type: 'session',
    });
  }, [state.currentTag]);

  useEffect(() => {
    dispatch({
      type: 'updateCurrentTag',
      data: {
        ...state,
        currentTag: location,
      },
    });
  }, [location.pathname]);

  return (
    <div>
      <div className="top-wrap g-flex-between">
        <div className="g-flex-start">
          <div className="fold-icon-wrap g-flex-start">
            <i
              style={{
                cursor: 'pointer',
                transform: collapseState ? 'rotateZ(90deg)' : '',
                transition: 'all 0.3s',
              }}
              className="iconfont icon-hanbaocaidanzhedie"
              onClick={onChangeCollapse}
            ></i>
          </div>
          {topNavData.map((item, index) => {
            return (
              <div className="top-menu-item" key={index}>
                <i className={'iconfont ' + item.icon} style={{ marginRight: '3px' }}></i>
                <span style={{ fontSize: '14px' }}>{item.title}</span>
              </div>
            );
          })}
          {/* <Popover
            content={contentPopover}
            title={
              <h1>
                待办事项<span style={{ color: '#ccc', marginLeft: 6 }}>({todoListInfo.length})</span>
              </h1>
            }
            placement="right"
          >
            <i className="iconfont icon-tongzhi1" style={{ color: todoListInfo.length > 0 ? 'red' : '#ccc' }} />
          </Popover> */}
        </div>
        <div className="g-flex-start">
          <Tooltip title="ozon">
            <IconFont
              type="iconkuapingtai"
              style={{ marginRight: 20, cursor: 'pointer' }}
              onClick={() => {
                window.open('https://seller.ozon.ru/app/products');
              }}
            />
          </Tooltip>
          <div
            onClick={() => {
              userLogout();
            }}
            className="logout-btn g-flex-end"
          >
            <i className="iconfont icon-logout"></i>
            <div>退出</div>
          </div>
        </div>
      </div>
      <div className="tags-wrap">
        <Tabs activeKey={state.currentTag.pathname} size="small" type="card">
          {state.tags.map((item: any, index: number) => {
            return (
              <TabPane
                key={item.pathname}
                tab={
                  <div className="tab-pane">
                    <span
                      onClick={() => {
                        switchPage(item.pathname);
                      }}
                      style={{ fontSize: '14px' }}
                    >
                      {
                        viewRouters.find((routerItem) => {
                          return routerItem.path == item.pathname;
                        })?.name
                      }
                    </span>
                    {state.tags.length && (index !== 0 || item.pathname !== '/view/welcome') ? (
                      <CloseOutlined
                        onClick={(e) => {
                          e.nativeEvent.stopImmediatePropagation();
                          closePage(item.pathname);
                        }}
                        className="iconfont icon-close2 close-tab-icon"
                      />
                    ) : null}
                  </div>
                }
              ></TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default TopNav;
