import { lazy } from 'react';
import Home from '@/pages/home';

interface ViewRouter {
  path: string;
  meta?: {
    auth?: boolean;
  };
  name: string;
  component: any;
}

/**路由必须以 /view 开头 */

const viewRouters: ViewRouter[] = [
  {
    path: '/view/welcome',
    name: 'Home',
    component: Home,
  },
  {
    path: '/view/ozon/fixPrice',
    name: '定价工具',
    component: lazy(() => import('@/views/FixPrice')),
  },
];

interface ViewRouter {
  path: string;
  meta?: {
    auth?: boolean;
  };
  name: string;
  component: any;
}

export default viewRouters;
