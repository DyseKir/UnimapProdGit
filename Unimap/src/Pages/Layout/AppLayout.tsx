import React from 'react';
import type { PropsWithChildren } from 'react';
import './AppLayout.css';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="site-header" role="banner" />
      <main className="site-main" role="main">
        {children}
      </main>
      <footer className="site-footer" role="contentinfo" />
    </div>
  );
};

export default AppLayout;


