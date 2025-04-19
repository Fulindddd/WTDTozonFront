import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import pageRouters from './pages';
import viewRouters from './views';

import Layout from '@/layout';

function router() {
  let location = useLocation();

  return (
    <>
      {location.pathname.split('/')[1] == 'view' ? (
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            {viewRouters.map((item: any, index: number) => {
              let Component = item.component;
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <Component />
                    </React.Suspense>
                  }
                />
              );
            })}
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/view/welcome" replace />}></Route>
          {pageRouters.map((item: any, index: number) => {
            return <Route key={index} path={item.path} element={item.component} />;
          })}
        </Routes>
      )}
    </>
  );
}

export default router;
