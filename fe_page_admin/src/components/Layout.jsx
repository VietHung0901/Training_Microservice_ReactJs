import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-layout">
      <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
      <div className="main-container">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
