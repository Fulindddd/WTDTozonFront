import React, { useEffect, useState, useContext } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '@/context';
import { menuList } from './menu';
import { intersection } from 'lodash-es';
import { getUserData } from '@/axiosInstance/api';

const { SubMenu } = Menu;

interface Props {
  collapseState: boolean;
}
function LeftMenu(props: Props) {
  const { collapseState } = props;
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [permission, setPermission] = useState([1]);

  const switchPage = (item: any) => {
    navigate(item.routerPath);
  };
  useEffect(() => {
    let index = state.tags.findIndex((item: any, i: number) => {
      return location.pathname == item.pathname;
    });
    if (index == -1) {
      dispatch({
        type: 'updateTags',
        data: {
          ...state,
          currentTag: location,
          tags: state.tags.concat([location]),
        },
      });
    } else {
      dispatch({
        type: 'updateCurrentTag',
        data: {
          ...state,
          currentTag: location,
        },
      });
    }
    for (let i = 0; i < menuList.length; i++) {
      const item = menuList[i];
      if (item.menuChild?.length) {
        for (let k = 0; k < item.menuChild.length; k++) {
          const element = item.menuChild[k];
          if ('/view/' + item.path + '/' + element.path == location.pathname) {
            let index = openKeys.findIndex((key) => {
              return key == item.path;
            });
            if (index == -1) {
              openKeys.push(item.path);
            }
            setOpenKeys(openKeys);
            return;
          }
        }
      }
    }
  }, [location.pathname]);

  const getPermissions = async () => {
    const res = await getUserData();
    if (res.data) {
      setPermission(res.data);
    }
  };

  useEffect(() => {
    // getPermissions();
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <div className={collapseState ? 'fold-logo' : 'logo-wrap'}></div>
      <Menu
        openKeys={openKeys}
        selectedKeys={[state.currentTag.pathname]}
        mode="inline"
        theme="dark"
        className="menu-wrap"
        onOpenChange={(openkeys) => {
          setOpenKeys(openkeys);
        }}
      >
        {menuList.map((item: any) => {
          if (item.menuChild?.length && intersection(item.permission, permission).length > 0) {
            if (intersection(item.permission, permission).length > 0) {
              return (
                <SubMenu
                  className="sub-menu"
                  key={item.path}
                  title={<div>{item.name}</div>}
                  icon={<i className={'iconfont ' + item.icon}></i>}
                >
                  {item.menuChild.map((element: any) => {
                    if (intersection(element.permission, permission).length > 0) {
                      return (
                        <Menu.Item
                          onClick={() => switchPage(element)}
                          key={'/view/' + item.path + '/' + element.path}
                          icon={<i className={'iconfont ' + element.icon}></i>}
                        >
                          {element.name}
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            }
          } else {
            if (intersection(item.permission, permission).length > 0) {
              return (
                <Menu.Item
                  onClick={() => switchPage(item)}
                  key={item.id}
                  icon={<i className={'iconfont ' + item.icon}></i>}
                >
                  {item.name}
                </Menu.Item>
              );
            }
          }
        })}
      </Menu>
    </div>
  );
}

export default LeftMenu;
