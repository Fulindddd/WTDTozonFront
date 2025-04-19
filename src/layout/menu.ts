export const menuList = [
  // 菜单示例
  {
    path: 'moldMaxx',
    name: 'OZON',
    icon: '',
    id: 1,
    routerPath: '/view/ozon',
    permission: [1], // 可显示的角色id
    menuChild: [
      {
        path: 'orderList',
        name: '定价工具',
        icon: '',
        routerPath: '/view/ozon/fixPrice',
        permission: [1],
        id: 2,
      },
    ],
  },
];
