import React, { lazy } from 'react';

import Login from '@/pages/login';

interface PageRouter {
  path: string;
  name?: string;
  meta?: {
    auth?: boolean;
  };
  component: any;
}

const pageRouters: PageRouter[] = [
  {
    path: '/login',
    meta: {
      auth: false,
    },
    component: <Login />,
  },
];

export default pageRouters;
